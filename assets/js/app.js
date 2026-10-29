/* ==========================================================================
   app.js —— 站点公共脚本：导航、页脚、语言切换、通用渲染工具
   ========================================================================== */
(function (global) {
  'use strict';

  /** 取翻译（I18N 未就绪时优雅降级到中文原文） */
  function t(key, fallback) {
    if (global.I18N && typeof global.I18N.t === 'function') return global.I18N.t(key, fallback);
    return fallback !== undefined ? fallback : key;
  }

  /* 导航定义：key 是字典键，zh 是兜底原文（字典缺失时仍显示中文） */
  var NAV_DEFS = [
    { href: 'index.html',    key: 'nav.home',       zh: '总览' },
    { href: 'guide.html',    key: 'nav.guide',      zh: '用车指南' },
    { href: 'specs.html',    key: 'nav.specs',      zh: '车身数据' },
    { href: 'wheels.html',   key: 'nav.wheels',     zh: '轮毂数据' },
    { href: 'fitment.html',  key: 'nav.fitment',    zh: '轮毂适配' },
    { href: 'calculator.html', key: 'nav.calculator', zh: '计算器' },
    { href: 'controls.html', key: 'nav.controls',   zh: '操作与仪表' },
    { href: 'assistant.html', key: 'nav.assistant', zh: 'AI 助手' },
    { href: 'parts.html',    key: 'nav.parts',      zh: '配件机油' }
  ];

  function navItems() {
    return NAV_DEFS.map(function (n) {
      return { href: n.href, label: t(n.key, n.zh) };
    });
  }

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function navHtml(cur) {
    return navItems().map(function (n) {
      var active = (n.href === cur) ? ' class="active"' : '';
      return '<a href="' + n.href + '"' + active + '>' + n.label + '</a>';
    }).join('');
  }

  function renderNav() {
    var host = document.getElementById('site-nav');
    if (!host) return;
    host.innerHTML = navHtml(currentPage());
  }

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var cur = currentPage();
    var title = t('site.title', '奔驰 C 级旅行车数据库');
    var subtitle = t('site.subtitle', 'S203 / S204 / S205 / S206');
    var switcher = (global.I18N && global.I18N.switchHtml) ? global.I18N.switchHtml() : '';

    host.innerHTML =
      '<div class="topbar-inner">' +
      '<a class="brand" href="index.html">' +
      '<span class="mark">C</span>' +
      '<span>' + title + '<br><small>' + subtitle + '</small></span>' +
      '</a>' +
      '<nav class="nav" id="site-nav">' + navHtml(cur) + '</nav>' +
      switcher +
      '</div>';

    // 绑定语言切换按钮
    if (global.I18N && typeof global.I18N.bindSwitches === 'function') {
      global.I18N.bindSwitches(host);
    }
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var line3 = t('footer.line3', '数据版本：{v} · 页面均为纯静态，可离线使用。');
    if (global.I18N && typeof global.I18N.interpolate === 'function') {
      line3 = global.I18N.interpolate(line3, { v: global.DATA_VERSION || 'v1.0' });
    } else {
      line3 = line3.replace('{v}', global.DATA_VERSION || 'v1.0');
    }

    host.innerHTML =
      '<div class="footer-inner">' +
      '<p>' + t('footer.line1', '') + '</p>' +
      '<p>' + t('footer.line2', '') + '</p>' +
      '<p class="faint">' + line3 + '</p>' +
      '</div>';
  }

  /* ---------------------------------------------------------- 渲染工具 */

  /** 安全转义 */
  function esc(s) {
    if (s === null || s === undefined) return '—';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /** 数值或占位符 */
  function v(x, unit, dash) {
    if (x === null || x === undefined || x === '') return '<span class="faint">' + (dash || '—') + '</span>';
    if (Array.isArray(x)) return x.join(' / ') + (unit ? ' ' + unit : '');
    return esc(x) + (unit ? ' ' + unit : '');
  }

  /** 根据偏差百分比给出颜色 class */
  function pctClass(pct, okThr, warnThr) {
    var a = Math.abs(pct);
    if (a <= okThr) return 'ok';
    if (a <= (warnThr || okThr * 1.5)) return 'warn';
    return 'bad';
  }

  /**
   * 渲染一个简单数据表
   * @param {string} sel 容器选择器
   * @param {string[]} headers 表头
   * @param {Array<Array<string>>} rows 行（已是 HTML）
   */
  function renderTable(sel, headers, rows) {
    var host = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!host) return;
    host.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
      headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>';
  }

  /** 生成锚点小标题 */
  function anchor(id, text, tag) {
    return '<h2 id="' + id + '">' + esc(text) + (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') + '</h2>';
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  global.App = {
    t: t,
    NAV: navItems,
    esc: esc,
    v: v,
    pctClass: pctClass,
    renderTable: renderTable,
    anchor: anchor,
    ready: ready,
    currentPage: currentPage
  };

  ready(function () {
    // 先把 HTML 里的静态文案翻译掉，再渲染页头页脚
    if (global.I18N && typeof global.I18N.apply === 'function') global.I18N.apply(document);
    renderHeader();
    renderNav();
    renderFooter();
  });
})(window);
