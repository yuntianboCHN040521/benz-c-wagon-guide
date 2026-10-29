/* ==========================================================================
   guide.js —— 用车指南页渲染：保养周期、MB 机油认证、各代通病
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

  function dash(x) { return (x === null || x === undefined || x === '') ? '<span class="faint">—</span>' : x; }

  ready(function () {
    var D = window.CDATA;
    if (!D) return;

    /* ================= 保养项目周期 ================= */
    var ivHost = document.getElementById('interval-table');
    if (ivHost) {
      var items = D.intervals || [];
      if (!items.length) {
        ivHost.innerHTML = '<div class="note">' + t('guide.iv.empty', '暂无保养周期数据。') + '</div>';
      } else {
        ivHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          [
            t('guide.iv.th.item', '项目'),
            t('guide.iv.th.interval', '周期'),
            t('guide.iv.th.note', '各代差异 / 说明'),
            t('guide.iv.th.price', '参考价（元）')
          ].map(function (h) {
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
        mbHost.innerHTML = '<div class="note">' + t('guide.mb.empty', '暂无 MB 认证数据。') + '</div>';
      } else {
        mbHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          [
            t('guide.mb.th.code', '认证编号'),
            t('guide.mb.th.fuel', '适用燃料'),
            t('guide.mb.th.lowSaps', '低灰分'),
            t('guide.mb.th.viscosity', '典型粘度'),
            t('guide.mb.th.notes', '说明')
          ].map(function (h) {
            return '<th>' + h + '</th>';
          }).join('') + '</tr></thead><tbody>' +
          specs.map(function (s) {
            var low = s.low_saps
              ? t('guide.mb.yes', '<span class="badge ok">是（保护 GPF/DPF）</span>')
              : t('guide.mb.no', '<span class="badge gray">否</span>');
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
        eoHost.innerHTML = '<div class="note">' + t('guide.eo.empty', '暂无发动机用油数据。') + '</div>';
      } else {
        eoHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          [
            t('guide.eo.th.engine', '发动机'),
            t('guide.eo.th.models', '搭载车型'),
            t('guide.eo.th.cert', '认证要求'),
            t('guide.eo.th.viscosity', '推荐粘度'),
            t('guide.eo.th.capacity', '机油容量 (L)'),
            t('guide.eo.th.note', '备注')
          ].map(function (h) {
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
              var unit = t('guide.issue.cny', '元');
              var costText = Array.isArray(it.cost_cny)
                ? it.cost_cny[0] + '–' + it.cost_cny[1] + ' ' + unit
                : (typeof it.cost_cny === 'number' ? it.cost_cny + ' ' + unit : it.cost_cny);
              cost = '<div class="stat" style="margin-top:10px"><div class="k">' +
                t('guide.issue.cost', '参考维修价') + '</div><div class="v small">' +
                costText + '</div></div>';
            }
            return '<div class="card">' +
              '<h3 class="mt0" style="font-size:15px">' + it.title + '</h3>' +
              (it.symptom ? '<p class="small">' + t('guide.issue.symptom', '') + it.symptom + '</p>' : '') +
              (it.cause ? '<p class="small muted">' + t('guide.issue.cause', '') + it.cause + '</p>' : '') +
              (it.fix ? '<p class="small muted">' + t('guide.issue.fix', '') + it.fix + '</p>' : '') +
              cost +
              '</div>';
          }).join('') + '</div>');
      });

      if (!blocks.length) {
        isHost.innerHTML = '<div class="note">' + t('guide.issue.empty', '暂无该代际的通病数据。') + '</div>';
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
