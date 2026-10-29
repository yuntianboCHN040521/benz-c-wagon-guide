/* ==========================================================================
   home.js —— 首页渲染：通用安装参数、代际时间线、尺寸快速对比
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /** 取翻译 */
  function t(key, fallback) {
    if (window.I18N) return window.I18N.t(key, fallback);
    return fallback !== undefined ? fallback : key;
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
        { k: t('home.stats.pcd.k'), v: w.pcd || '5x112', s: t('home.stats.pcd.s') },
        { k: t('home.stats.cb.k'), v: (w.center_bore_mm || 66.6) + ' mm', s: t('home.stats.cb.s') },
        { k: t('home.stats.bolt.k'), v: 'M12→M14', s: t('home.stats.bolt.s') },
        { k: t('home.stats.seat.k'), v: t('home.stats.seat.v', '球面 R14'), s: t('home.stats.seat.s') }
      ];
      keyHost.innerHTML = stats.map(function (s) {
        return '<div class="stat"><div class="k">' + s.k + '</div><div class="v">' + s.v +
          '</div><div class="small faint">' + s.s + '</div></div>';
      }).join('');
    }

    /* ---------------- 代际时间线 ---------------- */
    var tl = document.getElementById('timeline');
    if (tl) {
      var unitMm = t('home.tl.unit.mm', 'mm');
      tl.innerHTML = gens.map(function (g) {
        var b = g.body || {}, w = g.wheels || {};
        var chips = [];
        if (b.length_mm) chips.push('<span class="badge gray">' + t('home.tl.len', '长') + ' ' + b.length_mm + ' ' + unitMm + '</span>');
        if (b.wheelbase_mm) chips.push('<span class="badge gray">' + t('home.tl.wb', '轴距') + ' ' + b.wheelbase_mm + ' ' + unitMm + '</span>');
        if (b.track_front_mm) chips.push('<span class="badge gray">' + t('home.tl.tf', '前轮距') + ' ' + b.track_front_mm + ' ' + unitMm + '</span>');
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
        [t('home.qc.year', '生产年份'), function (g) { return g.years; }],
        [t('home.qc.gen', '代际'), function (g) { return g.generation; }],
        [t('home.qc.length', '车长 (mm)'), function (g) { return g.body.length_mm; }],
        [t('home.qc.width', '车宽 (mm)'), function (g) { return g.body.width_mm; }],
        [t('home.qc.height', '车高 (mm)'), function (g) { return g.body.height_mm; }],
        [t('home.qc.wheelbase', '轴距 (mm)'), function (g) { return g.body.wheelbase_mm; }],
        [t('home.qc.trackF', '前轮距 (mm)'), function (g) { return g.body.track_front_mm; }],
        [t('home.qc.trackR', '后轮距 (mm)'), function (g) { return g.body.track_rear_mm; }],
        [t('home.qc.weight', '整备质量 (kg)'), function (g) { return g.body.kerb_weight_kg; }],
        [t('home.qc.boot', '后备箱 (L)'), function (g) { return g.body.boot_litres; }],
        [t('home.qc.tank', '油箱 (L)'), function (g) { return g.body.fuel_tank_l; }],
        [t('home.qc.clearance', '最小离地间隙 (mm)'), function (g) { return g.body.ground_clearance_mm; }],
        [t('home.qc.bolt', '轮毂螺栓'), function (g) { return String(g.wheels.bolt_thread || '').split('（')[0] || null; }],
        [t('home.qc.et', '原厂 ET 范围'), function (g) {
          return g.wheels.et_range ? 'ET ' + g.wheels.et_range[0] + '～' + g.wheels.et_range[1] : null;
        }],
        [t('home.qc.tyre', '原厂轮胎'), function (g) {
          return (g.tyres || []).slice(0, 3).map(function (x) { return x.size; }).join(' / ') || null;
        }]
      ];

      var head = '<thead><tr><th>' + t('home.qc.item', '项目') + '</th>' + gens.map(function (g) {
        return '<th>' + g.chassis + '<br><span class="faint small">' + g.years + '</span></th>';
      }).join('') + '</tr></thead>';

      var body = '<tbody>' + rows.map(function (r) {
        return '<tr><td>' + r[0] + '</td>' + gens.map(function (g) {
          var val = r[1](g);
          if (val === null || val === undefined) return '<td class="faint">—</td>';
          if (Array.isArray(val)) val = val.join(' / ');
          return '<td class="mono">' + val + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';

      qc.innerHTML = '<div class="table-scroll"><table>' + head + body + '</table></div>';
      var noteHost = document.getElementById('compare-note');
      if (noteHost) {
        noteHost.innerHTML = '<div class="small faint mt16">' + t('home.compare.note', '') + '</div>';
      }
    }
  });
})();
