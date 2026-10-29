/* ==========================================================================
   wheels.js —— 轮毂数据页渲染：安装参数、原厂轮毂全表、ET 区间对照
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

    /* ---------------- 安装参数卡 ---------------- */
    var host = document.getElementById('install-stats');
    if (host) {
      var w0 = gens[0].wheels || {};
      var items = [
        { k: 'PCD 孔距', v: w0.pcd || '5×112', s: '四代通用' },
        { k: '中心孔', v: (w0.center_bore_mm || 66.6) + ' mm', s: '大于此值必须加变径环' },
        { k: '螺栓规格', v: 'M12 / M14', s: 'W203 用 M12×1.5，W204 起 M14×1.5' },
        { k: '螺栓座面', v: '球面 R14', s: '奔驰原厂与主流改装毂一致' }
      ];
      host.innerHTML = items.map(function (i) {
        return '<div class="stat"><div class="k">' + i.k + '</div><div class="v">' + i.v +
          '</div><div class="small faint">' + i.s + '</div></div>';
      }).join('');
    }

    /* ---------------- 原厂轮毂全表 ---------------- */
    var tableHost = document.getElementById('oem-table');
    var filter = 'all';

    function renderOem() {
      var rows = [];
      gens.forEach(function (g) {
        if (filter !== 'all' && g.chassis !== filter) return;
        (g.wheels.oem || []).forEach(function (o) {
          var pw = window.WheelCalc ? window.WheelCalc.parseWheel(o.size) : null;
          // ET 可能写在规格串里（如 "8.5Jx19 ET43"），也可能单独存放在 et 字段
          var et = (o.et !== null && o.et !== undefined) ? o.et : (pw ? pw.et : null);
          var geo = null;
          if (window.WheelCalc && pw && et !== null && et !== undefined) {
            var t = window.WheelCalc.parseTyre(o.tyre);
            geo = window.WheelCalc.fitmentGeometry(pw.width, et, t ? t.width : null);
          }
          rows.push([
            '<span class="mono">' + g.chassis + '</span><br><span class="faint small">' + g.years + '</span>',
            '<span class="mono">' + o.size + '</span>',
            '<span class="mono">ET ' + (o.et !== null && o.et !== undefined ? o.et : '—') + '</span>',
            '<span class="mono">' + (o.tyre || '—') + '</span>',
            geo ? '<span class="mono">' + geo.backspace + ' / ' + geo.frontspace + '</span>' : '—',
            o.models || '—',
            o.note || ''
          ]);
        });
      });

      if (!rows.length) {
        tableHost.innerHTML = '<div class="note">该代际暂无原厂轮毂数据。</div>';
        return;
      }

      var head = ['代际', '轮毂规格', '偏距', '原厂轮胎', '背距/前距 (mm)', '适用型号', '备注'];
      tableHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
        head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('') +
        '</tbody></table></div>' +
        '<div class="small faint mt16">「背距 / 前距」= 轮毂安装面到轮辋内缘 / 外缘的距离（mm）。' +
        '改装时把新轮毂的这两个数字与原厂对比，就能算出租装位置差多少——这也是<a href="calculator.html">计算器</a>做的事。</div>';
    }

    if (tableHost) {
      renderOem();
      Array.prototype.forEach.call(document.querySelectorAll('.chip[data-gen]'), function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(document.querySelectorAll('.chip[data-gen]'), function (c) {
            c.classList.remove('active');
          });
          chip.classList.add('active');
          filter = chip.getAttribute('data-gen');
          renderOem();
        });
      });
    }

    /* ---------------- ET 区间对照 ---------------- */
    var etHost = document.getElementById('et-table');
    if (etHost) {
      var rows2 = gens.map(function (g) {
        var w = g.wheels || {};
        var r = w.et_range || [null, null];
        var spread = (r[0] !== null && r[1] !== null) ? Math.abs(r[1] - r[0]) : null;
        var base = w.oem && w.oem.length ? w.oem[0] : null;
        return [
          '<span class="mono">' + g.chassis + '</span>',
          '<span class="faint small">' + g.years + '</span>',
          '<span class="mono">ET ' + r[0] + ' ～ ' + r[1] + '</span>',
          base ? '<span class="mono">' + base.size + ' ET' + base.et + '</span>' : '—',
          base ? '<span class="mono">' + base.tyre + '</span>' : '—',
          String(w.bolt_thread || '—').split('（')[0],
          spread !== null ? '<span class="mono">' + spread + ' mm</span>' : '—'
        ];
      });

      etHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
        ['代际', '年份', '原厂 ET 区间', '典型原厂配置', '典型原厂轮胎', '螺栓', 'ET 可调跨度'].map(function (h) {
          return '<th>' + h + '</th>';
        }).join('') + '</tr></thead><tbody>' +
        rows2.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>' +
        '<div class="small faint mt16">「ET 可调跨度」= 原厂配置中最大 ET 与最小 ET 之差，' +
        '反映了原厂留给轮拱的余量。跨度越大，说明该代车型的轮拱空间越宽裕，越容易改大尺寸或外凸。</div>';
    }
  });
})();
