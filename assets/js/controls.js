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

  var COLOR_META = {
    red: { badge: 'bad', label: '红色' },
    amber: { badge: 'warn', label: '黄色' },
    green: { badge: 'ok', label: '绿色' },
    blue: { badge: 'info', label: '蓝色' },
    gray: { badge: 'gray', label: '其他' }
  };

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
            (g.verified.indexOf('未核实') === 0 ? 'warn' : 'ok') + '">' + esc(g.verified) + '</span></p>' : '') +
          '<p class="small muted"><strong>位置：</strong>' + esc(g.location) + '</p>' +
          (hasPos
            ? '<div class="table-scroll"><table style="min-width:auto"><thead><tr><th>档位</th><th>含义</th></tr></thead><tbody>' +
              g.positions.map(function (p) {
                return '<tr><td class="mono nowrap">' + esc(p.pos) + '</td><td class="small">' + esc(p.meaning) + '</td></tr>';
              }).join('') + '</tbody></table></div>'
            : '<div class="note warn">这一代的开关形式与档位我们没有拿到可靠来源，因此留空而不猜测。</div>') +
          (g.highBeam ? '<p class="small muted mt16"><strong>远近光：</strong>' + esc(g.highBeam) + '</p>' : '') +
          (g.fog ? '<p class="small muted"><strong>雾灯：</strong>' + esc(g.fog) + '</p>' : '') +
          (g.drl ? '<p class="small muted"><strong>日行灯：</strong>' + esc(g.drl) + '</p>' : '') +
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
        '<h3 class="mt0">驻车灯是什么</h3>' +
        '<p class="small muted">' + esc(p.what) + '</p>' +
        '<div class="note"><strong>与示宽灯的区别：</strong>' + esc(p.diffFromPosition) + '</div>' +
        (p.correction ? '<div class="note bad"><strong>更正一个流传说法：</strong>' + esc(p.correction) + '</div>' : '') +
        '<p class="small muted mb0"><strong>什么时候用：</strong>' + esc(p.when) + '</p>' +
        '</div>' +
        '<div class="card">' +
        '<h3 class="mt0">怎么只点亮一侧（操作步骤）</h3>' +
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
      locHost.innerHTML = '<div class="table-scroll"><table><thead><tr><th>灯具</th><th>装在车身什么位置</th></tr></thead><tbody>' +
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
            '<span class="badge ' + m.badge + '">' + m.label + '</span></div>' +
            '</div>' +
            '<p class="small muted mb0 mt16">' + esc(it.meaning) + '</p>' +
            '<p class="small faint mb0">何时点亮：' + esc(it.when) + '</p>' +
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
            '<p class="small mb0"><strong>含义：</strong>' + esc(c.meaning) + '</p>' +
            '<p class="small muted mb0"><strong>该怎么做：</strong>' + esc(c.action) + '</p>' +
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
        countEl.textContent = kw || filter !== 'all'
          ? '匹配 ' + list.length + ' / ' + (D.warningLights || []).length + ' 个警告灯'
          : '共 ' + (D.warningLights || []).length + ' 个警告灯';
      }
      if (!list.length) {
        gridHost.innerHTML = '<div class="note">没有匹配的条目。可以换个说法，或点上面的「全部」。</div>';
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
          '<span class="badge ' + m.badge + '">' + m.label + '</span>' +
          '<span class="badge gray">' + esc(w.canDrive) + '</span>' +
          '</div></div></div>' +
          '<p class="small">' + esc(w.meaning) + '</p>' +
          '<div class="grid cols-2">' +
          '<div><h4>可能原因</h4><ul class="small muted">' +
          (w.causes || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') +
          '</ul></div>' +
          '<div><h4>怎么处理</h4><ol class="small muted">' +
          (w.actions || []).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') +
          '</ol></div>' +
          '</div>' +
          (w.cost
            ? '<div class="stat mt16" style="border-left-color:var(--warn)"><div class="k">维修参考价</div><div class="v small">' +
              (Array.isArray(w.cost) ? w.cost[0] + ' – ' + w.cost[1] + ' 元' : esc(w.cost)) + '</div></div>'
            : '') +
          (w.note ? '<div class="note mt16"><strong>补充：</strong>' + esc(w.note) + '</div>' : '') +
          '</div>';
      }).join('');
    }

    if (gridHost) {
      var colors = [
        { k: 'all', label: '全部' },
        { k: 'red', label: '红色 · 立即处理' },
        { k: 'amber', label: '黄色 · 尽快检修' },
        { k: 'green', label: '绿色 · 信息提示' },
        { k: 'blue', label: '蓝色 · 提示' }
      ];
      if (chipsHost) {
        chipsHost.innerHTML = colors.map(function (c) {
          return '<span class="chip' + (c.k === 'all' ? ' active' : '') + '" data-wl="' + c.k + '">' + esc(c.label) + '</span>';
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
          '<p class="small muted"><strong>适用车型：</strong>' + esc(s.models) + '</p>' +
          '<p class="small"><strong>症状：</strong>' + esc(s.symptom) + '</p>' +
          '<p class="small muted mb0"><strong>怎么处理：</strong>' + esc(s.action) + '</p>' +
          '</div>';
      }).join('');
    }
  });
})();
