/* ==========================================================================
   app.js —— 站点公共脚本：导航、页脚、通用渲染工具
   ========================================================================== */
(function (global) {
  'use strict';

  var SITE = {
    title: '奔驰 C 级旅行车数据库',
    subtitle: 'S203 / S204 / S205 / S206'
  };

  var NAV = [
    { href: 'index.html', label: '总览' },
    { href: 'guide.html', label: '用车指南' },
    { href: 'specs.html', label: '车身数据' },
    { href: 'wheels.html', label: '轮毂数据' },
    { href: 'fitment.html', label: '轮毂适配' },
    { href: 'calculator.html', label: '计算器' },
    { href: 'controls.html', label: '操作与仪表' },
    { href: 'assistant.html', label: 'AI 助手' },
    { href: 'parts.html', label: '配件机油' }
  ];

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function renderNav() {
    var host = document.getElementById('site-nav');
    if (!host) return;
    var cur = currentPage();
    host.innerHTML = NAV.map(function (n) {
      var active = (n.href === cur) ? ' class="active"' : '';
      return '<a href="' + n.href + '"' + active + '>' + n.label + '</a>';
    }).join('');
  }

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var cur = currentPage();
    host.innerHTML =
      '<div class="topbar-inner">' +
      '<a class="brand" href="index.html">' +
      '<span class="mark">C</span>' +
      '<span>' + SITE.title + '<br><small>' + SITE.subtitle + '</small></span>' +
      '</a>' +
      '<nav class="nav" id="site-nav">' +
      NAV.map(function (n) {
        return '<a href="' + n.href + '"' + (n.href === cur ? ' class="active"' : '') + '>' + n.label + '</a>';
      }).join('') +
      '</nav></div>';
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    host.innerHTML =
      '<div class="footer-inner">' +
      '<p><strong>' + SITE.title + '</strong> · S203 / S204 / S205 / S206 四代奔驰 C 级旅行车（Estate / T-Modell）用车与改装数据站</p>' +
      '<p>本站数据整理自公开技术资料、厂商技术文档与车主社区实测，<strong>仅供选型参考</strong>。轮毂轮胎改装涉及行车安全，' +
      '实际安装前请以实车测量、车辆铭牌、轮毂厂商标称载荷与当地法规为准。</p>' +
      '<p class="faint">数据版本：' + (global.DATA_VERSION || 'v1.0') + ' · 页面均为纯静态，可离线使用。</p>' +
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
    SITE: SITE,
    NAV: NAV,
    esc: esc,
    v: v,
    pctClass: pctClass,
    renderTable: renderTable,
    anchor: anchor,
    ready: ready,
    currentPage: currentPage
  };

  ready(function () {
    renderHeader();
    renderNav();
    renderFooter();
  });
})(window);
