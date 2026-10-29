/* ==========================================================================
   i18n.js —— 多语言核心：字典查询、DOM 替换、语言切换
   --------------------------------------------------------------------------
   用法：
     1) 页面引入 lang/zh.js、lang/en.js，再引入本文件
     2) HTML 标记：
          <h2 data-i18n="home.key.title">四代通用安装参数</h2>     纯文本
          <p data-i18n-html="home.key.summary">…</p>                含 HTML
          <meta data-i18n-attr="content:site.description">          属性
          <html data-i18n-title="site.docTitle">                    标题
     3) JS 渲染动态内容时用 I18N.t('key')
     4) 切换语言：I18N.setLang('en')  —— 会写 localStorage 并重载页面
   ========================================================================== */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'mbc-lang';
  var SUPPORTED = ['zh', 'en'];
  var DEFAULT_LANG = 'zh';

  /* ------------------------------------------------------------ 语言检测 */

  function detectLang() {
    // 1) URL 参数优先（便于分享 ?lang=en 链接）
    var m = /[?&]lang=([^&#]+)/.exec(global.location.search);
    if (m) {
      var fromUrl = decodeURIComponent(m[1]).toLowerCase();
      if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    }
    // 2) 用户上次的选择
    try {
      var saved = global.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* 隐私模式下 localStorage 可能不可用 */ }
    // 3) 默认中文
    return DEFAULT_LANG;
  }

  var lang = detectLang();

  /* ------------------------------------------------------------ 字典查询 */

  function rawDict(code) {
    return (global.I18N_DATA && global.I18N_DATA[code]) || {};
  }

  /**
   * 取翻译。找不到英文时自动回落到中文，再找不到返回 fallback 或 key 本身。
   */
  function t(key, fallback) {
    if (!key) return fallback !== undefined ? fallback : '';
    var hit = rawDict(lang)[key];
    if (hit !== undefined) return hit;
    var zhHit = rawDict(DEFAULT_LANG)[key];
    if (zhHit !== undefined) return zhHit;
    return fallback !== undefined ? fallback : key;
  }

  /* ------------------------------------------------------------ 变量插值 */

  /** 把 {name} 替换成 vars.name */
  function interpolate(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, function (whole, name) {
      return vars[name] !== undefined ? vars[name] : whole;
    });
  }

  /* ------------------------------------------------------------ DOM 替换 */

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  /**
   * 扫描并替换节点。
   * @param {Node} [root] 默认为 document
   */
  function apply(root) {
    var scope = root || document;

    // ---- 文档标题 ----
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) document.title = t(titleKey);

    // ---- 纯文本 ----
    each(scope.querySelectorAll('[data-i18n]'), function (node) {
      var key = node.getAttribute('data-i18n');
      if (key) node.textContent = t(key);
    });

    // ---- 含标记 ----
    each(scope.querySelectorAll('[data-i18n-html]'), function (node) {
      var key = node.getAttribute('data-i18n-html');
      if (key) node.innerHTML = t(key);
    });

    // ---- 属性 ----
    each(scope.querySelectorAll('[data-i18n-attr]'), function (node) {
      var spec = node.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        var attr = bits[0].trim();
        var key = bits[1].trim();
        if (attr && key) node.setAttribute(attr, t(key));
      });
    });

    // ---- <html lang> ----
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
  }

  /* ------------------------------------------------------------ 语言切换 */

  function setLang(next) {
    var target = String(next || '').toLowerCase();
    if (SUPPORTED.indexOf(target) === -1) return;

    try { global.localStorage.setItem(STORAGE_KEY, target); } catch (e) { /* ignore */ }

    // 同步到 URL，方便把英文链接直接发给别人
    var url = new URL(global.location.href);
    if (target === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', target);

    global.location.href = url.toString();
  }

  function toggle() {
    setLang(lang === 'zh' ? 'en' : 'zh');
  }

  /* ------------------------------------------------------------ 切换按钮 */

  /**
   * 生成语言切换按钮的 HTML（供页头插入）
   */
  function switchHtml() {
    function btn(code, label, short) {
      var active = (code === lang) ? ' active' : '';
      return '<button type="button" class="lang-btn' + active + '" data-lang="' + code +
        '" title="' + label + '">' + short + '</button>';
    }
    return '<div class="lang-switch" role="group" aria-label="' + t('lang.switch') + '">' +
      btn('zh', '简体中文', '中文') +
      btn('en', 'English', 'EN') +
      '</div>';
  }

  /** 给容器内所有 [data-lang] 绑定点击 */
  function bindSwitches(root) {
    each((root || document).querySelectorAll('[data-lang]'), function (node) {
      if (node.getAttribute('data-bound') === '1') return;
      node.setAttribute('data-bound', '1');
      node.addEventListener('click', function (event) {
        event.preventDefault();
        setLang(node.getAttribute('data-lang'));
      });
    });
  }

  /* ------------------------------------------------------------ 导出 */

  global.I18N = {
    lang: lang,
    t: t,
    apply: apply,
    setLang: setLang,
    toggle: toggle,
    interpolate: interpolate,
    switchHtml: switchHtml,
    bindSwitches: bindSwitches,
    supported: SUPPORTED.slice()
  };

  // 自动执行一次替换（DOM 就绪后）
  function onReady() {
    apply(document);
    bindSwitches(document);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})(window);
