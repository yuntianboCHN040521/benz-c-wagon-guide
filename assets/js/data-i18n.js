/* ==========================================================================
   data-i18n.js —— 数据层多语言
   --------------------------------------------------------------------------
   思路：不改任何渲染代码。
   英文模式下，把数据对象里的中文字段按路径原地替换成英文，
   之后所有渲染函数照常读数据，自然就是英文。

   覆盖表在 data/i18n-en-*.js，键是「全局对象名 + 路径」，例如：
     'CDATA.generations[0].generation'      -> window.CDATA.generations[0].generation
     'CONTROL_DATA.categories[0].title'     -> window.CONTROL_DATA.categories[0].title
   ========================================================================== */
(function (global) {
  'use strict';

  /** 解析 'generations[0].wheels.oem[2].note' 这种路径为 token 数组 */
  function parsePath(pathStr) {
    var tokens = [];
    String(pathStr).split('.').forEach(function (seg) {
      var nameMatch = /^([^\[\]]+)/.exec(seg);
      if (nameMatch) tokens.push(nameMatch[1]);
      var re = /\[(\d+)\]/g;
      var m;
      while ((m = re.exec(seg)) !== null) tokens.push(Number(m[1]));
    });
    return tokens;
  }

  function setPath(root, pathStr, value) {
    var tokens = parsePath(pathStr);
    var node = root;
    for (var i = 0; i < tokens.length - 1; i++) {
      if (node === null || node === undefined) return false;
      node = node[tokens[i]];
    }
    var last = tokens[tokens.length - 1];
    if (node === null || node === undefined || !(last in node)) return false;
    node[last] = value;
    return true;
  }

  var stats = { ok: 0, miss: 0, missing: [] };

  function applyDataI18n() {
    // 只在英文模式生效
    if (!global.I18N || global.I18N.lang !== 'en') return stats;

    var table = global.I18N_CDATA_EN;
    if (!table) return stats;

    Object.keys(table).forEach(function (key) {
      var dotIndex = key.indexOf('.');
      if (dotIndex < 0) { stats.miss++; return; }
      var rootName = key.slice(0, dotIndex);
      var rest = key.slice(dotIndex + 1);
      var root = global[rootName];
      if (!root) {
        stats.miss++;
        if (stats.missing.length < 15) stats.missing.push(key + ' (root missing)');
        return;
      }
      if (setPath(root, rest, table[key])) {
        stats.ok++;
      } else {
        stats.miss++;
        if (stats.missing.length < 15) stats.missing.push(key);
      }
    });

    if (stats.miss && global.console && console.warn) {
      console.warn('[data-i18n] ' + stats.miss + ' 条未匹配，示例：', stats.missing);
    }
    return stats;
  }

  global.DataI18n = { apply: applyDataI18n, stats: stats };

  // 必须在数据文件之后、各页渲染脚本之前执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDataI18n);
  } else {
    applyDataI18n();
  }
})(window);
