/* ==========================================================================
   home.js —— 首页渲染：通用安装参数、代际时间线、尺寸快速对比
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    var D = window.CDATA;
    if (!D || !D.generations) return;
    var gens = D.generations;

    /* ---------------- 通用安装参数 ---------------- */
    var keyHost = document.getElementById('key-stats');
    if (keyHost) {
      var w = gens[0].wheels || {};
      var stats = [
        { k: 'PCD 孔距', v: w.pcd || '5x112', s: '2001 年至今未变' },
        { k: '中心孔 CB', v: (w.center_bore_mm || 66.6) + ' mm', s: '改装轮毂大于此值需变径环' },
        { k: '螺栓螺纹', v: 'M12→M14', s: 'W203 为 M12×1.5，W204 起 M14×1.5' },
        { k: '螺栓座面', v: '球面 R14', s: '奔驰原厂与主流改装毂通用' }
      ];
      keyHost.innerHTML = stats.map(function (s) {
        return '<div class="stat"><div class="k">' + s.k + '</div><div class="v">' + s.v +
          '</div><div class="small faint">' + s.s + '</div></div>';
      }).join('');
    }

    /* ---------------- 代际时间线 ---------------- */
    var tl = document.getElementById('timeline');
    if (tl) {
      tl.innerHTML = gens.map(function (g, i) {
        var b = g.body || {}, w = g.wheels || {};
        var chips = [];
        if (b.length_mm) chips.push('<span class="badge gray">长 ' + b.length_mm + ' mm</span>');
        if (b.wheelbase_mm) chips.push('<span class="badge gray">轴距 ' + b.wheelbase_mm + ' mm</span>');
        if (b.track_front_mm) chips.push('<span class="badge gray">前轮距 ' + b.track_front_mm + ' mm</span>');
        if (w.bolt_thread) chips.push('<span class="badge info">' + String(w.bolt_thread).split('（')[0] + '</span>');
        if (w.et_range) chips.push('<span class="badge info">ET ' + w.et_range[0] + '～' + w.et_range[1] + '</span>');

        var kw = null;
        if (g.engines && g.engines.length) {
          var p = g.engines.map(function (e) { return e.power_kw; })
            .filter(function (x) { return typeof x === 'number' && x > 0; });
          if (p.length) kw = Math.min.apply(null, p) + '–' + Math.max.apply(null, p) + ' kW';
        }

        return '<a class="gen-card" href="specs.html#' + String(g.chassis).replace(/[^\w]/g, '') + '">' +
          '<div class="gen-id">' +
          '<div class="code">' + g.chassis.replace('W', 'S').split('/')[1] + '</div>' +
          '<div class="yrs">' + g.years + '</div>' +
          '<div class="ord">' + g.generation + '</div>' +
          (kw ? '<div class="ord mono">' + kw + '</div>' : '') +
          '</div>' +
          '<div>' +
          '<h3>' + g.chassis + ' · ' + g.generation + '</h3>' +
          '<p>' + (g.intro || '') + '</p>' +
          '<div class="chips">' + chips.join('') + '</div>' +
          '</div></a>';
      }).join('');
    }

    /* ---------------- 尺寸快速对比 ---------------- */
    var qc = document.getElementById('quick-compare');
    if (qc) {
      var rows = [
        ['生产年份', function (g) { return g.years; }],
        ['代际', function (g) { return g.generation; }],
        ['车长 (mm)', function (g) { return g.body.length_mm; }],
        ['车宽 (mm)', function (g) { return g.body.width_mm; }],
        ['车高 (mm)', function (g) { return g.body.height_mm; }],
        ['轴距 (mm)', function (g) { return g.body.wheelbase_mm; }],
        ['前轮距 (mm)', function (g) { return g.body.track_front_mm; }],
        ['后轮距 (mm)', function (g) { return g.body.track_rear_mm; }],
        ['整备质量 (kg)', function (g) { return g.body.kerb_weight_kg; }],
        ['后备箱 (L)', function (g) { return g.body.boot_litres; }],
        ['油箱 (L)', function (g) { return g.body.fuel_tank_l; }],
        ['最小离地间隙 (mm)', function (g) { return g.body.ground_clearance_mm; }],
        ['轮毂螺栓', function (g) { return String(g.wheels.bolt_thread || '').split('（')[0] || null; }],
        ['原厂 ET 范围', function (g) {
          return g.wheels.et_range ? 'ET ' + g.wheels.et_range[0] + '～' + g.wheels.et_range[1] : null;
        }],
        ['原厂轮胎', function (g) {
          return (g.tyres || []).slice(0, 3).map(function (t) { return t.size; }).join(' / ') || null;
        }]
      ];

      var head = '<thead><tr><th>项目</th>' + gens.map(function (g) {
        return '<th>' + g.chassis + '<br><span class="faint small">' + g.years + '</span></th>';
      }).join('') + '</tr></thead>';

      var body = '<tbody>' + rows.map(function (r) {
        return '<tr><td>' + r[0] + '</td>' + gens.map(function (g) {
          var v = r[1](g);
          if (v === null || v === undefined) return '<td class="faint">—</td>';
          if (Array.isArray(v)) v = v.join(' / ');
          return '<td class="mono">' + v + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';

      qc.innerHTML = '<div class="table-scroll"><table>' + head + body + '</table></div>';
      var noteHost = document.getElementById('compare-note');
      if (noteHost) {
        noteHost.innerHTML = '<div class="small faint mt16">数值为各代代表性配置，不同发动机、不同市场版本会略有差异；' +
          '详情见<a href="specs.html">车身数据</a>页。</div>';
      }
    }
  });
})();
