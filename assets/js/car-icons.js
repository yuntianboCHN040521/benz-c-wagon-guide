/* ==========================================================================
   car-icons.js —— 仪表警告灯 / 灯光指示灯 SVG 图标库
   --------------------------------------------------------------------------
   全部图标为几何图形手绘（48×48 视框），不引用任何厂商素材，可自由使用。
   颜色通过 CSS currentColor 传入，便于按警告等级（红/黄/绿/蓝）统一着色。
   ========================================================================== */
(function (global) {
  'use strict';

  var S = {
    /* ---------------- 红色：通常需立即处理 ---------------- */

    // 机油压力：机油壶侧视（梯形壶身 + 弧形提手 + 左下方壶嘴 + 滴油 + 底部油波），无圆圈无感叹号
    'oil':
      '<path d="M15 24h13l3 14H12z"/>' +
      '<path d="M18 24a6 6 0 0 1 10 0"/>' +
      '<path d="M15 27l-6-4v6z"/>' +
      '<circle cx="8" cy="34" r="1.6" fill="currentColor" stroke="none"/>' +
      '<path d="M6 44c3-2 6-2 9 0s6 2 9 0 6-2 9 0"/>',

    // 蓄电池 / 充电系统
    'battery':
      '<rect x="9" y="17" width="30" height="18" rx="2.5"/>' +
      '<path d="M15 12v5M33 12v5"/>' +
      '<path d="M15 26h7"/>' +
      '<path d="M29 26h7"/>' +
      '<path d="M32.5 22.5v7"/>',

    // 制动系统 ( ! )
    'brake':
      '<circle cx="24" cy="24" r="11"/>' +
      '<path d="M24 18v8"/>' +
      '<circle cx="24" cy="30.5" r="1.6" fill="currentColor" stroke="none"/>' +
      '<path d="M9 15c-3 6-3 12 0 18M39 15c3 6 3 12 0 18"/>',

    // 冷却液温度过高
    'coolant':
      '<path d="M21 12v20M27 12v20M21 12h6"/>' +
      '<circle cx="24" cy="35" r="6"/>' +
      '<path d="M28 18h5M28 24h5"/>' +
      '<path d="M13 45c3-2 5-2 8 0s5 2 8 0"/>',

    // 安全气囊 / SRS
    'airbag':
      '<circle cx="15" cy="13" r="4.5"/>' +
      '<path d="M15 18v9"/>' +
      '<path d="M15 27l-5 11M15 27l5 11"/>' +
      '<path d="M15 22l-6 5"/>' +
      '<circle cx="34" cy="20" r="8"/>' +
      '<path d="M27 17a8 8 0 0 1 0 6"/>',

    // 安全带未系
    'seatbelt':
      '<circle cx="18" cy="13" r="4.5"/>' +
      '<path d="M18 18v11"/>' +
      '<path d="M18 29l-4 11M18 29l5 11"/>' +
      '<path d="M11 20l23 16"/>',

    // 电子驻车制动 / 手刹
    'parking-brake':
      '<circle cx="24" cy="24" r="13"/>' +
      '<text x="24" y="30" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">P</text>',

    // 转向系统：方向盘轮廓（外圈 + 辐条）+ 右侧感叹号
    'steering':
      '<circle cx="19" cy="22" r="11"/>' +
      '<circle cx="19" cy="22" r="3"/>' +
      '<path d="M8 22h8M22 22h8"/>' +
      '<path d="M19 25v7"/>' +
      '<path d="M36 15v13"/>' +
      '<circle cx="36" cy="33" r="1.6" fill="currentColor" stroke="none"/>',

    // 车门未关
    'door':
      '<rect x="16" y="15" width="20" height="19" rx="2"/>' +
      '<path d="M16 19L8 26v10h8"/>' +
      '<circle cx="30" cy="25" r="1.4" fill="currentColor" stroke="none"/>',

    /* ---------------- 黄色 / 橙色：尽快检查 ---------------- */

    // 发动机故障 / Check Engine
    'engine':
      '<path d="M8 31v-8h6v-6h10l5 6h7v-4h4v4h2v8h-2v4h-4v-4h-7l-5 6H14v-6z"/>',

    // ABS
    'abs':
      '<circle cx="24" cy="24" r="13"/>' +
      '<text x="24" y="29" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">ABS</text>',

    // ESP / 电子稳定程序
    'esp':
      '<path d="M14 25h11l4-6h8v6h4v8H14z"/>' +
      '<circle cx="20" cy="35" r="3.5"/>' +
      '<circle cx="34" cy="35" r="3.5"/>' +
      '<path d="M7 43c2-3 5-3 7 0s5 3 7 0"/>',

    // 胎压监测 TPMS
    'tpms':
      '<path d="M14 16v15a10 10 0 0 0 20 0V16"/>' +
      '<path d="M9 16h5M34 16h5"/>' +
      '<path d="M24 20v10"/>' +
      '<circle cx="24" cy="34" r="1.6" fill="currentColor" stroke="none"/>',

    // 制动片磨损
    'brake-pad':
      '<circle cx="24" cy="24" r="10"/>' +
      '<path d="M11 16a15 15 0 0 0 0 16M37 16a15 15 0 0 1 0 16"/>' +
      '<path d="M24 20v7"/>' +
      '<circle cx="24" cy="30" r="1.5" fill="currentColor" stroke="none"/>',

    // 灯泡故障
    'bulb':
      '<path d="M24 10a10 10 0 0 1 6 18v4H18v-4a10 10 0 0 1 6-18z"/>' +
      '<path d="M19 36h10M20 40h8"/>',

    // 变速箱故障
    'gearbox':
      '<circle cx="24" cy="24" r="9"/>' +
      '<path d="M24 15v-3M24 36v-3M15 24h-3M36 24h-3"/>' +
      '<path d="M18 18l-2.5-2.5M30 30l2.5 2.5M30 18l2.5-2.5M18 30l-2.5 2.5"/>',

    // 柴油预热塞
    'glow-plug':
      '<path d="M7 26h5c3 0 3-9 7.5-9s4.5 9 8 9h2c3 0 3-9 7.5-9s4.5 9 8 9"/>',

    // DPF 颗粒捕集器
    'dpf':
      '<rect x="12" y="18" width="24" height="14" rx="2.5"/>' +
      '<circle cx="18" cy="25" r="1.7" fill="currentColor" stroke="none"/>' +
      '<circle cx="24" cy="25" r="1.7" fill="currentColor" stroke="none"/>' +
      '<circle cx="30" cy="25" r="1.7" fill="currentColor" stroke="none"/>' +
      '<path d="M7 25h5M36 25h5"/>',

    // AdBlue / 尿素
    'adblue':
      '<path d="M15 19h18v15a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5z"/>' +
      '<path d="M20 19v-5h8v5"/>' +
      '<path d="M24 26v7"/>' +
      '<circle cx="24" cy="35" r="1.5" fill="currentColor" stroke="none"/>',

    // 燃油不足
    'fuel':
      '<rect x="11" y="14" width="15" height="24" rx="2"/>' +
      '<path d="M15 20h7"/>' +
      '<path d="M26 20h4v14a3.5 3.5 0 0 0 7 0V22l-3-3"/>',

    // 48V 轻混系统
    'hybrid':
      '<rect x="7" y="18" width="34" height="16" rx="2.5"/>' +
      '<text x="24" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" stroke="none" font-family="system-ui,sans-serif">48V</text>',

    // 主动制动辅助不可用
    'brake-assist':
      '<path d="M6 28h15l4-6h10v6h7v8H6z"/>' +
      '<circle cx="14" cy="38" r="3.5"/>' +
      '<circle cx="33" cy="38" r="3.5"/>' +
      '<path d="M43 18a9 9 0 0 1 0 12"/>',

    // 车道保持辅助不可用
    'lane-keeping':
      '<path d="M9 41L18 7M39 41L30 7"/>' +
      '<path d="M17 31h14l2-6H15z"/>' +
      '<circle cx="20" cy="35" r="2.6"/>' +
      '<circle cx="28" cy="35" r="2.6"/>',

    // 盲区监测不可用
    'blind-spot':
      '<path d="M5 27h15l3-6h9v6h5v8H5z"/>' +
      '<circle cx="13" cy="37" r="3"/>' +
      '<circle cx="29" cy="37" r="3"/>' +
      '<path d="M40 22a9 9 0 0 1 0 14"/>',

    // 通用警告（兜底）
    'unknown':
      '<circle cx="24" cy="24" r="13"/>' +
      '<path d="M24 17v10"/>' +
      '<circle cx="24" cy="32" r="1.7" fill="currentColor" stroke="none"/>',

    /* ---------------- 绿色 / 蓝色：信息提示 ---------------- */

    // 远光灯（蓝）
    'high-beam':
      '<path d="M11 15v18"/>' +
      '<path d="M11 15c8 0 13 4 13 9s-5 9-13 9"/>' +
      '<path d="M29 15h12M29 24h12M29 33h12"/>',

    // 近光灯（绿）
    'low-beam':
      '<path d="M11 15v18"/>' +
      '<path d="M11 15c8 0 13 4 13 9s-5 9-13 9"/>' +
      '<path d="M29 15l11 10M29 23l8 5"/>',

    // 示宽灯（绿）
    'position':
      '<circle cx="15" cy="24" r="4.5"/>' +
      '<circle cx="33" cy="24" r="4.5"/>' +
      '<path d="M7 17v14M41 17v14"/>',

    // 前雾灯（绿）
    'fog-front':
      '<path d="M9 13v22"/>' +
      '<path d="M9 13c8 0 13 5 13 11s-5 11-13 11"/>' +
      '<path d="M27 17l10 10M27 25h10"/>' +
      '<path d="M26 37c2-2 4-2 6 0s4 2 6 0"/>',

    // 后雾灯（橙）
    'fog-rear':
      '<path d="M9 13v22"/>' +
      '<path d="M9 13c8 0 13 5 13 11s-5 11-13 11"/>' +
      '<path d="M27 22h11"/>' +
      '<path d="M26 37c2-2 4-2 6 0s4 2 6 0"/>',

    // 转向灯（绿）
    'indicator':
      '<path d="M8 24h16"/>' +
      '<path d="M18 16l8 8-8 8"/>' +
      '<path d="M32 17v14M39 20v8"/>',

    // 日间行车灯
    'drl':
      '<path d="M10 16v16"/>' +
      '<path d="M10 16c7 0 11 4 11 8s-4 8-11 8"/>' +
      '<path d="M28 20h12M28 28h12"/>'
  };

  var COLORS = {
    red: '#f85149',
    amber: '#d29922',
    yellow: '#d29922',
    orange: '#e3803a',
    green: '#3fb950',
    blue: '#4c9aff',
    gray: '#8b949e'
  };

  function color(name) { return COLORS[name] || name || COLORS.gray; }

  /**
   * 生成一个图标
   * @param {string} id   图标 id（见 CarIcons.ids()）
   * @param {string} c    颜色名（red/amber/green/blue/gray）或任意 CSS 颜色
   * @param {number} [size] 边长，默认 44
   */
  function icon(id, c, size) {
    var shape = S[id] || S.unknown;
    var col = color(c);
    return '<svg class="wl-svg" viewBox="0 0 48 48" width="' + (size || 44) + '" height="' + (size || 44) +
      '" style="color:' + col + '" fill="none" stroke="' + col +
      '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="' + id + '">' +
      shape + '</svg>';
  }

  global.CarIcons = {
    icon: icon,
    COLORS: COLORS,
    has: function (id) { return !!S[id]; },
    ids: function () { return Object.keys(S); }
  };
})(window);
