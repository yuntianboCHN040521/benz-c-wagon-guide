/* ==========================================================================
   specs.js —— 车身数据页渲染
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

  /** 带变量插值 */
  function ti(key, vars, fallback) {
    var raw = t(key, fallback);
    if (window.I18N && window.I18N.interpolate) return window.I18N.interpolate(raw, vars);
    return raw;
  }

  function val(x, unit) {
    if (x === null || x === undefined || x === '') return '<span class="faint">—</span>';
    if (Array.isArray(x)) return '<span class="mono">' + x.join(' / ') + '</span>' + (unit ? ' <span class="faint small">' + unit + '</span>' : '');
    return '<span class="mono">' + x + '</span>' + (unit ? ' <span class="faint small">' + unit + '</span>' : '');
  }

  ready(function () {
    var D = window.CDATA;
    if (!D || !D.generations) return;
    var gens = D.generations;

    /* ---------------- 尺寸总览 ---------------- */
    var dimHost = document.getElementById('dim-table');
    if (dimHost) {
      var rows = [
        [t('specs.row.years', '生产年份'), function (g) { return g.years; }, ''],
        [t('specs.row.chassis', '底盘代号'), function (g) { return g.chassis; }, ''],
        [t('specs.row.length', '车长'), function (g) { return g.body.length_mm; }, 'mm'],
        [t('specs.row.width', '车宽（不含后视镜）'), function (g) { return g.body.width_mm; }, 'mm'],
        [t('specs.row.height', '车高'), function (g) { return g.body.height_mm; }, 'mm'],
        [t('specs.row.wheelbase', '轴距'), function (g) { return g.body.wheelbase_mm; }, 'mm'],
        [t('specs.row.trackF', '前轮距'), function (g) { return g.body.track_front_mm; }, 'mm'],
        [t('specs.row.trackR', '后轮距'), function (g) { return g.body.track_rear_mm; }, 'mm'],
        [t('specs.row.trackDelta', '前/后轮距差'), function (g) {
          if (g.body.track_front_mm === null || g.body.track_rear_mm === null) return null;
          var d = g.body.track_front_mm - g.body.track_rear_mm;
          return (d > 0 ? '+' : '') + d;
        }, 'mm'],
        [t('specs.row.clearance', '最小离地间隙'), function (g) { return g.body.ground_clearance_mm; }, 'mm'],
        [t('specs.row.turning', '转弯直径'), function (g) { return g.body.turning_circle_m; }, 'm'],
        [t('specs.row.cd', '风阻系数 Cd'), function (g) { return g.body.cd; }, '']
      ];

      var head = '<thead><tr><th>' + t('specs.item', '项目') + '</th>' + gens.map(function (g) {
        return '<th>' + g.chassis + '<br><span class="faint small">' + g.generation + '</span></th>';
      }).join('') + '</tr></thead>';

      var body = '<tbody>' + rows.map(function (r) {
        return '<tr><td>' + r[0] + '</td>' + gens.map(function (g) {
          return '<td>' + val(r[1](g), r[2]) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';

      dimHost.innerHTML = '<div class="table-scroll"><table>' + head + body + '</table></div>';

      // 尺寸演变小结
      var first = gens[0].body, last = gens[gens.length - 1].body;
      var noteHost = document.getElementById('dim-note');
      if (noteHost && first.length_mm && last.length_mm) {
        noteHost.innerHTML = '<div class="note mt16">' + ti('specs.dim.note', {
          len: last.length_mm - first.length_mm,
          width: last.width_mm - first.width_mm,
          wb: last.wheelbase_mm - first.wheelbase_mm,
          track: last.track_front_mm - first.track_front_mm
        }) + '</div>';
      }
    }

    /* ---------------- 重量与装载 ---------------- */
    var massHost = document.getElementById('mass-table');
    if (massHost) {
      var rows2 = [
        [t('specs.row.kerb', '整备质量区间'), function (g) { return g.body.kerb_weight_kg; }, 'kg'],
        [t('specs.row.gross', '最大允许总质量'), function (g) { return g.body.gross_weight_kg; }, 'kg'],
        [t('specs.row.payload', '有效载荷（推算）'), function (g) {
          if (!g.body.gross_weight_kg || !g.body.kerb_weight_kg) return null;
          var lo = g.body.gross_weight_kg - g.body.kerb_weight_kg[1];
          var hi = g.body.gross_weight_kg - g.body.kerb_weight_kg[0];
          return lo + ' – ' + hi;
        }, 'kg'],
        [t('specs.row.boot', '后备箱容积（后排立起/放倒）'), function (g) { return g.body.boot_litres; }, 'L'],
        [t('specs.row.tank', '油箱容积'), function (g) { return g.body.fuel_tank_l; }, 'L'],
        [t('specs.row.range', '理论续航（按 8L/100km）'), function (g) {
          if (!g.body.fuel_tank_l) return null;
          return Math.round(g.body.fuel_tank_l / 8 * 100) + ' km';
        }, '']
      ];

      var head2 = '<thead><tr><th>' + t('specs.item', '项目') + '</th>' + gens.map(function (g) {
        return '<th>' + g.chassis + '</th>';
      }).join('') + '</tr></thead>';
      var body2 = '<tbody>' + rows2.map(function (r) {
        return '<tr><td>' + r[0] + '</td>' + gens.map(function (g) {
          return '<td>' + val(r[1](g), r[2]) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';

      massHost.innerHTML = '<div class="table-scroll"><table>' + head2 + body2 + '</table></div>' +
        '<div class="small faint mt16">' + t('specs.mass.footnote', '') + '</div>';
    }

    /* ---------------- 发动机阵容 ---------------- */
    var engHost = document.getElementById('engine-table');
    var engFilter = 'all';

    function renderEngines() {
      var rows = [];
      gens.forEach(function (g) {
        if (engFilter !== 'all' && g.chassis !== engFilter) return;
        (g.engines || []).forEach(function (e) {
          rows.push([
            '<span class="mono">' + g.chassis + '</span>',
            '<span class="mono">' + (e.code || '—') + '</span>',
            '<strong>' + (e.name || '—') + '</strong>',
            '<span class="mono">' + (e.displacement || '—') + '</span>',
            e.power_kw ? '<span class="mono">' + e.power_kw + ' kW / ' + Math.round(e.power_kw * 1.36) + ' PS</span>' : '—',
            e.torque_nm ? '<span class="mono">' + e.torque_nm + ' N·m</span>' : '—',
            '<span class="mono">' + (e.years || '—') + '</span>',
            e.note || ''
          ]);
        });
      });

      if (!rows.length) {
        engHost.innerHTML = '<div class="note">' + t('specs.eng.empty', '该代际暂无发动机数据。') + '</div>';
        return;
      }

      engHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
        [
          t('specs.eng.th.gen', '代际'),
          t('specs.eng.th.code', '发动机代号'),
          t('specs.eng.th.name', '市场名称'),
          t('specs.eng.th.disp', '排量'),
          t('specs.eng.th.power', '最大功率'),
          t('specs.eng.th.torque', '最大扭矩'),
          t('specs.eng.th.years', '年份'),
          t('specs.eng.th.note', '备注')
        ].map(function (h) {
          return '<th>' + h + '</th>';
        }).join('') + '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
    }

    if (engHost) {
      renderEngines();
      Array.prototype.forEach.call(document.querySelectorAll('.chip[data-eng]'), function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(document.querySelectorAll('.chip[data-eng]'), function (c) {
            c.classList.remove('active');
          });
          chip.classList.add('active');
          engFilter = chip.getAttribute('data-eng');
          renderEngines();
        });
      });
    }

    /* ---------------- 代际差异卡片 ---------------- */
    var diffHost = document.getElementById('diff-cards');
    if (diffHost) {
      diffHost.innerHTML = gens.map(function (g) {
        var b = g.body, w = g.wheels;
        return '<div class="card">' +
          '<div class="card-meta">' + g.chassis + ' · ' + g.years + '</div>' +
          '<h3>' + g.generation + '</h3>' +
          '<p class="small muted">' + (g.intro || '') + '</p>' +
          '<div class="table-scroll"><table style="min-width:auto"><tbody>' +
          '<tr><td class="muted">' + t('specs.diff.wheelbase', '轴距') + '</td><td class="mono">' + val(b.wheelbase_mm) + ' mm</td>' +
          '<td class="muted">' + t('specs.diff.trackF', '前轮距') + '</td><td class="mono">' + val(b.track_front_mm) + ' mm</td></tr>' +
          '<tr><td class="muted">' + t('specs.diff.kerb', '整备质量') + '</td><td class="mono">' + val(b.kerb_weight_kg) + ' kg</td>' +
          '<td class="muted">' + t('specs.diff.et', '原厂 ET') + '</td><td class="mono">' + (w.et_range ? w.et_range[0] + '～' + w.et_range[1] : '—') + '</td></tr>' +
          '<tr><td class="muted">' + t('specs.diff.bolt', '螺栓') + '</td><td class="mono">' + (w.bolt_thread || '—') + '</td>' +
          '<td class="muted">' + t('specs.diff.tyre', '典型轮胎') + '</td><td class="mono">' + ((g.tyres && g.tyres[0]) ? g.tyres[0].size : '—') + '</td></tr>' +
          '</tbody></table></div>' +
          (g.highlight ? '<div class="note mt16">' + t('specs.diff.tip', '') + g.highlight + '</div>' : '') +
          '</div>';
      }).join('');
    }

    /* ---------------- chip 锚点跳转 ---------------- */
    Array.prototype.forEach.call(document.querySelectorAll('.chip[data-jump]'), function (chip) {
      chip.addEventListener('click', function () {
        Array.prototype.forEach.call(document.querySelectorAll('.chip[data-jump]'), function (c) {
          c.classList.remove('active');
        });
        chip.classList.add('active');
        var target = chip.getAttribute('data-jump');
        if (target === 'all') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        var el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
})();
