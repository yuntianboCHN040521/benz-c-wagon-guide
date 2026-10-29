/* ==========================================================================
   controls.js —— 灯光操作 / 车内按键 / 仪表故障灯 页面渲染
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /** 取翻译（I18N 未就绪时优雅降级到中文原文） */
  function t(key, fallback) {
    if (window.I18N) return window.I18N.t(key, fallback);
    return fallback !== undefined ? fallback : key;
  }

  /** 取翻译并做 {name} 变量插值 */
  function tf(key, fallback, vars) {
    var s = t(key, fallback);
    if (window.I18N && typeof window.I18N.interpolate === 'function') return window.I18N.interpolate(s, vars);
    return String(s).replace(/\{(\w+)\}/g, function (whole, name) {
      return (vars && vars[name] !== undefined) ? vars[name] : whole;
    });
  }

  /* label / zh 是颜色徽标的字典键与中文兜底 */
  var COLOR_META = {
    red: { badge: 'bad', label: 'pg.controls.color.red', zh: '红色' },
    amber: { badge: 'warn', label: 'pg.controls.color.amber', zh: '黄色' },
    green: { badge: 'ok', label: 'pg.controls.color.green', zh: '绿色' },
    blue: { badge: 'info', label: 'pg.controls.color.blue', zh: '蓝色' },
    gray: { badge: 'gray', label: 'pg.controls.color.gray', zh: '其他' }
  };

  function colorLabel(m) { return t(m.label, m.zh); }

  ready(function () {
    var D = window.CONTROL_DATA;
    var CI = window.CarIcons;
    if (!D || !CI) return;

    function icon(id, color, size) { return CI.icon(id, color, size); }

    /* ================= 一、灯光开关各代对比 ================= */
    var swHost = document.getElementById('light-switch');
    if (swHost && D.lighting) {
      swHost.innerHTML = D.lighting.switchByGen.map(function (g) {
        var hasPos = (g.positions || []).length > 0;
        return '<div class="card">' +
          '<div class="card-meta">' + esc(g.chassis) + ' · ' + esc(g.years) + '</div>' +
          '<h3 class="mt0">' + esc(g.type) + '</h3>' +
          (g.verified ? '<p class="small"><span class="badge ' +
            (/^(未核实|Not verified)/.test(String(g.verified)) ? 'warn' : 'ok') + '">' + esc(g.verified) + '</span></p>' : '') +
          '<p class="small muted"><strong>' + t('pg.controls.sw.location', '位置：') + '</strong>' + esc(g.location) + '</p>' +
          (hasPos
            ? '<div class="table-scroll"><table style="min-width:auto"><thead><tr><th>' +
              t('pg.controls.sw.th.pos', '档位') + '</th><th>' + t('pg.controls.sw.th.meaning', '含义') + '</th></tr></thead><tbody>' +
              g.positions.map(function (p) {
                return '<tr><td class="mono nowrap">' + esc(p.pos) + '</td><td class="small">' + esc(p.meaning) + '</td></tr>';
              }).join('') + '</tbody></table></div>'
            : '<div class="note warn">' + t('pg.controls.sw.empty', '这一代的开关形式与档位我们没有拿到可靠来源，因此留空而不猜测。') + '</div>') +
          (g.highBeam ? '<p class="small muted mt16"><strong>' + t('pg.controls.sw.highBeam', '远近光：') + '</strong>' + esc(g.highBeam) + '</p>' : '') +
          (g.fog ? '<p class="small muted"><strong>' + t('pg.controls.sw.fog', '雾灯：') + '</strong>' + esc(g.fog) + '</p>' : '') +
          (g.drl ? '<p class="small muted"><strong>' + t('pg.controls.sw.drl', '日行灯：') + '</strong>' + esc(g.drl) + '</p>' : '') +
          (g.notes ? '<div class="note mt16">' + esc(g.notes) + '</div>' : '') +
          '</div>';
      }).join('');
    }

    /* ================= 二、驻车灯操作步骤 ================= */
    var plHost = document.getElementById('parking-light');
    if (plHost && D.lighting && D.lighting.parkingLight) {
      var p = D.lighting.parkingLight;
      plHost.innerHTML =
        '<div class="grid cols-2">' +
        '<div class="card">' +
        '<h3 class="mt0">' + t('pg.controls.pl.what', '驻车灯是什么') + '</h3>' +
        '<p class="small muted">' + esc(p.what) + '</p>' +
        '<div class="note"><strong>' + t('pg.controls.pl.diff', '与示宽灯的区别：') + '</strong>' + esc(p.diffFromPosition) + '</div>' +
        (p.correction ? '<div class="note bad"><strong>' + t('pg.controls.pl.correction', '更正一个流传说法：') + '</strong>' + esc(p.correction) + '</div>' : '') +
        '<p class="small muted mb0"><strong>' + t('pg.controls.pl.when', '什么时候用：') + '</strong>' + esc(p.when) + '</p>' +
        '</div>' +
        '<div class="card">' +
        '<h3 class="mt0">' + t('pg.controls.pl.steps', '怎么只点亮一侧（操作步骤）') + '</h3>' +
        '<ol class="small muted" style="padding-left:20px">' +
        (p.steps || []).map(function (s) { return '<li style="margin-bottom:8px">' + esc(s) + '</li>'; }).join('') +
        '</ol>' +
        (p.notes ? '<div class="note warn mt16">' + esc(p.notes) + '</div>' : '') +
        '</div>' +
        '</div>';
    }

    /* ================= 三、灯具在车身上的位置 ================= */
    var locHost = document.getElementById('lamp-location');
    if (locHost && D.lighting) {
      locHost.innerHTML = '<div class="table-scroll"><table><thead><tr><th>' +
        t('pg.controls.lamp.th.name', '灯具') + '</th><th>' +
        t('pg.controls.lamp.th.where', '装在车身什么位置') + '</th></tr></thead><tbody>' +
        (D.lighting.lampsLocation || []).map(function (l) {
          return '<tr><td class="nowrap"><strong>' + esc(l.name) + '</strong></td><td class="small muted">' + esc(l.where) + '</td></tr>';
        }).join('') +
        '</tbody></table></div>';
    }

    /* ================= 四、灯光指示灯 ================= */
    var indHost = document.getElementById('light-indicators');
    if (indHost && D.lighting) {
      indHost.innerHTML = '<div class="grid cols-3">' +
        (D.lighting.indicators || []).map(function (it) {
          var m = COLOR_META[it.color] || COLOR_META.gray;
          return '<div class="card">' +
            '<div class="wl-row">' +
            '<div class="wl-icon">' + icon(it.id, it.color, 40) + '</div>' +
            '<div><h3 class="mt0" style="font-size:15px">' + esc(it.name) + '</h3>' +
            '<span class="badge ' + m.badge + '">' + colorLabel(m) + '</span></div>' +
            '</div>' +
            '<p class="small muted mb0 mt16">' + esc(it.meaning) + '</p>' +
            '<p class="small faint mb0">' + t('pg.controls.ind.when', '何时点亮：') + esc(it.when) + '</p>' +
            '</div>';
        }).join('') + '</div>';
    }

    /* ================= 五、车内按键 ================= */
    var ctHost = document.getElementById('controls-list');
    if (ctHost && D.controls) {
      ctHost.innerHTML = D.controls.map(function (area) {
        return '<div class="card">' +
          '<h3 class="mt0">' + esc(area.area) + '</h3>' +
          '<div class="table-scroll"><table style="min-width:auto"><tbody>' +
          (area.items || []).map(function (it) {
            return '<tr><td class="nowrap" style="width:34%"><strong>' + esc(it.name) + '</strong></td>' +
              '<td class="small muted">' + esc(it.desc) + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          (area.note ? '<div class="note mt16">' + esc(area.note) + '</div>' : '') +
          '</div>';
      }).join('');
    }

    /* ================= 六、颜色分级 ================= */
    var crHost = document.getElementById('color-rule');
    if (crHost && D.colorRule) {
      crHost.innerHTML = '<div class="grid cols-2">' +
        D.colorRule.map(function (c) {
          return '<div class="wl-rule wl-rule-' + esc(c.color) + '">' +
            '<div class="wl-rule-head">' + icon('unknown', c.color, 30) +
            '<strong>' + esc(c.name) + '</strong></div>' +
            '<p class="small mb0"><strong>' + t('pg.controls.cr.meaning', '含义：') + '</strong>' + esc(c.meaning) + '</p>' +
            '<p class="small muted mb0"><strong>' + t('pg.controls.cr.action', '该怎么做：') + '</strong>' + esc(c.action) + '</p>' +
            '</div>';
        }).join('') + '</div>';
    }

    /* ================= 七、故障灯网格 ================= */
    var gridHost = document.getElementById('warning-grid');
    var chipsHost = document.getElementById('warning-chips');
    var searchEl = document.getElementById('warning-search');
    var countEl = document.getElementById('warning-count');
    var filter = 'all';

    function renderWarnings() {
      if (!gridHost) return;
      var kw = (searchEl && searchEl.value ? searchEl.value : '').trim().toLowerCase();
      var list = (D.warningLights || []).filter(function (w) {
        if (filter !== 'all' && w.color !== filter) return false;
        if (!kw) return true;
        var hay = [w.name, w.meaning, w.canDrive, (w.causes || []).join(' '),
          (w.actions || []).join(' '), w.note || ''].join(' ').toLowerCase();
        return hay.indexOf(kw) !== -1;
      });
      if (countEl) {
        var total = (D.warningLights || []).length;
        countEl.textContent = kw || filter !== 'all'
          ? tf('pg.controls.warn.count.match', '匹配 {shown} / {total} 个警告灯', { shown: list.length, total: total })
          : tf('pg.controls.warn.count.total', '共 {total} 个警告灯', { total: total });
      }
      if (!list.length) {
        gridHost.innerHTML = '<div class="note">' +
          t('pg.controls.warn.empty', '没有匹配的条目。可以换个说法，或点上面的「全部」。') + '</div>';
        return;
      }

      gridHost.innerHTML = list.map(function (w) {
        var m = COLOR_META[w.color] || COLOR_META.gray;
        return '<div class="wl-card wl-' + esc(w.color) + '">' +
          '<div class="wl-head">' +
          '<div class="wl-icon">' + icon(w.id, w.color, 48) + '</div>' +
          '<div class="wl-title">' +
          '<h3>' + esc(w.name) + '</h3>' +
          '<div class="wl-badges">' +
          '<span class="badge ' + m.badge + '">' + colorLabel(m) + '</span>' +
          '<span class="badge gray">' + esc(w.canDrive) + '</span>' +
          '</div></div></div>' +
          '<p class="small">' + esc(w.meaning) + '</p>' +
          '<div class="grid cols-2">' +
          '<div><h4>' + t('pg.controls.warn.causes', '可能原因') + '</h4><ul class="small muted">' +
          (w.causes || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') +
          '</ul></div>' +
          '<div><h4>' + t('pg.controls.warn.actions', '怎么处理') + '</h4><ol class="small muted">' +
          (w.actions || []).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') +
          '</ol></div>' +
          '</div>' +
          (w.cost
            ? '<div class="stat mt16" style="border-left-color:var(--warn)"><div class="k">' +
              t('pg.controls.warn.cost', '维修参考价') + '</div><div class="v small">' +
              (Array.isArray(w.cost)
                ? tf('pg.controls.warn.costRange', '{min} – {max} 元', { min: w.cost[0], max: w.cost[1] })
                : esc(w.cost)) + '</div></div>'
            : '') +
          (w.note ? '<div class="note mt16"><strong>' + t('pg.controls.warn.note', '补充：') + '</strong>' + esc(w.note) + '</div>' : '') +
          '</div>';
      }).join('');
    }

    if (gridHost) {
      var colors = [
        { k: 'all', label: 'pg.controls.warn.chip.all', zh: '全部' },
        { k: 'red', label: 'pg.controls.warn.chip.red', zh: '红色 · 立即处理' },
        { k: 'amber', label: 'pg.controls.warn.chip.amber', zh: '黄色 · 尽快检修' },
        { k: 'green', label: 'pg.controls.warn.chip.green', zh: '绿色 · 信息提示' },
        { k: 'blue', label: 'pg.controls.warn.chip.blue', zh: '蓝色 · 提示' }
      ];
      if (chipsHost) {
        chipsHost.innerHTML = colors.map(function (c) {
          return '<span class="chip' + (c.k === 'all' ? ' active' : '') + '" data-wl="' + c.k + '">' + esc(t(c.label, c.zh)) + '</span>';
        }).join('');
        Array.prototype.forEach.call(chipsHost.querySelectorAll('.chip'), function (chip) {
          chip.addEventListener('click', function () {
            Array.prototype.forEach.call(chipsHost.querySelectorAll('.chip'), function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            filter = chip.getAttribute('data-wl');
            renderWarnings();
          });
        });
      }
      renderWarnings();
      if (searchEl) {
        searchEl.addEventListener('input', renderWarnings);
      }
    }
    /* ================= 奔驰特有系统 ================= */
    var spHost = document.getElementById('special-systems');
    if (spHost && D.special) {
      spHost.innerHTML = D.special.map(function (s) {
        return '<div class="card">' +
          '<h3 class="mt0">' + esc(s.system) + '</h3>' +
          '<p class="small muted"><strong>' + t('pg.controls.sys.models', '适用车型：') + '</strong>' + esc(s.models) + '</p>' +
          '<p class="small"><strong>' + t('pg.controls.sys.symptom', '症状：') + '</strong>' + esc(s.symptom) + '</p>' +
          '<p class="small muted mb0"><strong>' + t('pg.controls.sys.action', '怎么处理：') + '</strong>' + esc(s.action) + '</p>' +
          '</div>';
      }).join('');
    }
  });
})();
