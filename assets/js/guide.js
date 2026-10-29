/* ==========================================================================
   guide.js —— 用车指南页渲染：保养周期、MB 机油认证、各代通病
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function dash(x) { return (x === null || x === undefined || x === '') ? '<span class="faint">—</span>' : x; }

  ready(function () {
    var D = window.CDATA;
    if (!D) return;

    /* ================= 保养项目周期 ================= */
    var ivHost = document.getElementById('interval-table');
    if (ivHost) {
      var items = D.intervals || [];
      if (!items.length) {
        ivHost.innerHTML = '<div class="note">暂无保养周期数据。</div>';
      } else {
        ivHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          ['项目', '周期', '各代差异 / 说明', '参考价（元）'].map(function (h) {
            return '<th>' + h + '</th>';
          }).join('') + '</tr></thead><tbody>' +
          items.map(function (i) {
            var price = i.price_cny
              ? (Array.isArray(i.price_cny) ? '<span class="mono">' + i.price_cny[0] + '–' + i.price_cny[1] + '</span>' : '<span class="mono">' + i.price_cny + '</span>')
              : '<span class="faint">—</span>';
            return '<tr><td><strong>' + i.item + '</strong></td><td class="mono nowrap">' + dash(i.interval) +
              '</td><td class="small muted">' + dash(i.note) + '</td><td>' + price + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
    }

    /* ================= MB 机油认证 ================= */
    var mbHost = document.getElementById('mb-spec-table');
    if (mbHost) {
      var specs = D.mbSpecs || [];
      if (!specs.length) {
        mbHost.innerHTML = '<div class="note">暂无 MB 认证数据。</div>';
      } else {
        mbHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          ['认证编号', '适用燃料', '低灰分', '典型粘度', '说明'].map(function (h) {
            return '<th>' + h + '</th>';
          }).join('') + '</tr></thead><tbody>' +
          specs.map(function (s) {
            var low = s.low_saps
              ? '<span class="badge ok">是（保护 GPF/DPF）</span>'
              : '<span class="badge gray">否</span>';
            return '<tr><td class="mono"><strong>' + s.code + '</strong></td><td>' + dash(s.fuel) +
              '</td><td>' + low + '</td><td class="mono">' + dash(s.viscosity) + '</td>' +
              '<td class="small muted">' + dash(s.notes) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
    }

    /* ================= 各发动机用油 ================= */
    var eoHost = document.getElementById('engine-oil-table');
    if (eoHost) {
      var eo = D.engineOil || [];
      if (!eo.length) {
        eoHost.innerHTML = '<div class="note">暂无发动机用油数据。</div>';
      } else {
        eoHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          ['发动机', '搭载车型', '认证要求', '推荐粘度', '机油容量 (L)', '备注'].map(function (h) {
            return '<th>' + h + '</th>';
          }).join('') + '</tr></thead><tbody>' +
          eo.map(function (e) {
            return '<tr><td class="mono"><strong>' + dash(e.engine) + '</strong></td><td>' + dash(e.models) +
              '</td><td class="mono">' + dash(e.cert) + '</td><td class="mono">' + dash(e.viscosity) +
              '</td><td class="num">' + dash(e.capacity_l) + '</td><td class="small muted">' + dash(e.note) + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
    }

    /* ================= 通病速查 ================= */
    var isHost = document.getElementById('issue-list');
    var gens = D.generations || [];
    var issueFilter = 'all';

    function renderIssues() {
      var blocks = [];
      gens.forEach(function (g) {
        if (issueFilter !== 'all' && g.chassis !== issueFilter) return;
        var list = g.issues || [];
        if (!list.length) return;
        blocks.push('<h3>' + g.chassis + ' · ' + g.generation + ' <span class="badge gray">' + g.years + '</span></h3>' +
          '<div class="grid cols-2">' +
          list.map(function (it) {
            var cost = '';
            if (it.cost_cny) {
              var costText = Array.isArray(it.cost_cny)
                ? it.cost_cny[0] + '–' + it.cost_cny[1] + ' 元'
                : (typeof it.cost_cny === 'number' ? it.cost_cny + ' 元' : it.cost_cny);
              cost = '<div class="stat" style="margin-top:10px"><div class="k">参考维修价</div><div class="v small">' +
                costText + '</div></div>';
            }
            return '<div class="card">' +
              '<h3 class="mt0" style="font-size:15px">' + it.title + '</h3>' +
              (it.symptom ? '<p class="small"><span class="badge warn">现象</span> ' + it.symptom + '</p>' : '') +
              (it.cause ? '<p class="small muted"><span class="badge gray">原因</span> ' + it.cause + '</p>' : '') +
              (it.fix ? '<p class="small muted"><span class="badge info">对策</span> ' + it.fix + '</p>' : '') +
              cost +
              '</div>';
          }).join('') + '</div>');
      });

      if (!blocks.length) {
        isHost.innerHTML = '<div class="note">暂无该代际的通病数据。</div>';
        return;
      }
      isHost.innerHTML = blocks.join('');
    }

    if (isHost) {
      renderIssues();
      Array.prototype.forEach.call(document.querySelectorAll('.chip[data-issue]'), function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(document.querySelectorAll('.chip[data-issue]'), function (c) {
            c.classList.remove('active');
          });
          chip.classList.add('active');
          issueFilter = chip.getAttribute('data-issue');
          renderIssues();
        });
      });
    }
  });
})();
