/* ==========================================================================
   fitment.js —— 轮毂适配页渲染：推荐方案（实时计算）、品牌库、AMG 原厂
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ---------------------------------------------------------- i18n 取词 */
  /* 字典缺失时回落到中文原文，保证页面在无 i18n 环境下仍然完整 */
  function t(key, fallback) {
    if (window.I18N && typeof window.I18N.t === 'function') return window.I18N.t(key, fallback);
    return fallback !== undefined ? fallback : key;
  }

  /* 带 {变量} 插值的取词 */
  function tf(key, fallback, vars) {
    var s = t(key, fallback);
    if (window.I18N && typeof window.I18N.interpolate === 'function') {
      return window.I18N.interpolate(s, vars);
    }
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (whole, name) {
      return vars[name] !== undefined ? vars[name] : whole;
    });
  }

  function esc(s) { return s === null || s === undefined ? '—' : String(s); }
  function money(v) {
    if (!v) return '<span class="faint">—</span>';
    if (Array.isArray(v)) return '<span class="mono">' + v[0] + ' – ' + v[1] + '</span>';
    return '<span class="mono">' + v + '</span>';
  }

  ready(function () {
    var D = window.CDATA;
    if (!D) return;
    var gens = D.generations || [];
    var calc = window.WheelCalc;

    /* ================= 推荐方案 ================= */
    var planHost = document.getElementById('plan-table');
    var planFilter = 'all';

    function gradeBadge(g) {
      var map = { 0: 'ok', 1: 'warn', 2: 'bad', 3: 'bad' };
      return '<span class="badge ' + map[g.level] + '">' + g.label + '</span>';
    }

    function computeRow(oemTyre, oemSize, oemEt, planWheel, planTyre) {
      if (!calc) return null;
      var oT = calc.parseTyre(oemTyre);
      var nT = calc.parseTyre(planTyre);
      var pw = calc.parseWheel(planWheel);
      if (!oT || !nT || !pw) return null;
      var et = (pw.et !== null && pw.et !== undefined) ? pw.et : oemEt;
      var cmp = calc.compare(
        { tyre: oT, rimWidth: oemSize, et: oemEt },
        { tyre: nT, rimWidth: pw.width, et: et }
      );
      var g = calc.grade(cmp, { rimWidthInch: pw.width, tyreWidth: nT.width });
      return { cmp: cmp, g: g };
    }

    function renderPlans() {
      var plans = D.plans || [];
      var rows = [];

      plans.forEach(function (p) {
        if (planFilter !== 'all' && p.chassis !== planFilter) return;
        var gen = gens.filter(function (g) { return g.chassis === p.chassis; })[0];
        if (!gen) return;

        // 前轮对比基准：优先用方案指定的原厂基准，否则取该代最常见的原厂配置
        var baseF = p.oemFront;
        if (!baseF) {
          var o0 = (gen.wheels.oem || [])[0];
          if (!o0) return;
          var o0w = calc ? calc.parseWheel(o0.size) : null;
          baseF = { tyre: o0.tyre, et: o0.et, size: o0.size, rimWidth: o0w ? o0w.width : null };
        }
        // 后轮基准：优先独立指定，否则与前轮相同
        var baseR = p.oemRear || baseF;

        var fr = computeRow(baseF.tyre, baseF.rimWidth, baseF.et, p.front.size, p.front.tyre);
        var rr = p.rear ? computeRow(baseR.tyre, baseR.rimWidth, baseR.et, p.rear.size, p.rear.tyre) : null;

        var badgeCls = p.level === '原厂风格' ? 'ok' : (p.level === '进阶合装' ? 'warn' : 'bad');

        // 评级取前后轮中较差的一侧——后轮风险不能被前轮的绿灯掩盖
        var worst = fr ? fr.g : (rr ? rr.g : null);
        if (fr && rr && rr.g.level > fr.g.level) worst = rr.g;

        function sgn(v) { return (v > 0 ? '+' : '') + v; }

        rows.push([
          '<span class="mono">' + p.chassis + '</span><br><span class="faint small">' + gen.years + '</span>',
          '<span class="badge ' + badgeCls + '">' + p.level + '</span>',
          '<span class="mono">' + baseF.size + ' ET' + baseF.et + '<br>' + baseF.tyre + '</span>',
          '<span class="mono">' + p.front.size + '<br>' + p.front.tyre + '</span>',
          fr ? '<span class="mono">' + sgn(fr.cmp.tyreOuterMove) + ' mm</span>' : '—',
          fr ? '<span class="mono">' + sgn(fr.cmp.diameterPct) + '%</span>' : '—',
          rr ? '<span class="mono">' + sgn(rr.cmp.tyreOuterMove) + ' mm</span><br><span class="faint small">' + sgn(rr.cmp.diameterPct) + '%</span>' : '<span class="faint">' + t('pg.fitment.plan.sameFb', '前后同规格') + '</span>',
          worst ? gradeBadge(worst) : '—',
          p.note || ''
        ]);
      });

      if (!rows.length) {
        planHost.innerHTML = '<div class="note">' + t('pg.fitment.plan.empty', '暂无该代际的推荐方案数据。') + '</div>';
        return;
      }

      planHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
        [
          t('pg.fitment.plan.th.gen', '代际'),
          t('pg.fitment.plan.th.level', '档位'),
          t('pg.fitment.plan.th.oem', '原厂基准'),
          t('pg.fitment.plan.th.front', '推荐前轮'),
          t('pg.fitment.plan.th.frontMove', '前轮外移'),
          t('pg.fitment.plan.th.frontDia', '前轮外径差'),
          t('pg.fitment.plan.th.rear', '后轮外移 / 外径差'),
          t('pg.fitment.plan.th.grade', '评级'),
          t('pg.fitment.plan.th.note', '说明')
        ]
          .map(function (h) { return '<th>' + h + '</th>'; }).join('') +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>' +
        '<div class="small faint mt16">' +
        t('pg.fitment.plan.foot', '外移量为正表示比原厂更靠车外。评级的判定规则见上方「适配度怎么判定」。' +
          '实际间隙仍以<strong>实车橡皮泥测试</strong>为准，尤其是后轮满载状态。') +
        '</div>';
    }

    if (planHost) {
      renderPlans();
      Array.prototype.forEach.call(document.querySelectorAll('.chip[data-plan]'), function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(document.querySelectorAll('.chip[data-plan]'), function (c) {
            c.classList.remove('active');
          });
          chip.classList.add('active');
          planFilter = chip.getAttribute('data-plan');
          renderPlans();
        });
      });
    }

    /* ================= 品牌库 ================= */
    var brands = D.brands || [];
    var chipsHost = document.getElementById('brand-chips');
    var listHost = document.getElementById('brand-list');
    var brandFilter = 'all';

    function renderBrands() {
      if (!listHost) return;
      var list = brands.filter(function (b) {
        return brandFilter === 'all' || b.brand === brandFilter;
      });
      if (!list.length) {
        listHost.innerHTML = '<div class="note">' + t('pg.fitment.brands.empty', '暂无品牌数据。') + '</div>';
        return;
      }

      listHost.innerHTML = list.map(function (b) {
        var models = (b.models || []).map(function (m) {
          var sizeRows = (m.sizes || []).map(function (s) {
            var cbWarn = (typeof s.cb_mm === 'number' && s.cb_mm > 66.6)
              ? '<span class="badge warn">' + t('pg.fitment.brands.cb.ring', '需变径环') + '</span>'
              : '<span class="badge ok">' + t('pg.fitment.brands.cb.direct', '直装') + '</span>';
            var ets = Array.isArray(s.et) ? s.et.join(' / ') : s.et;
            return '<tr>' +
              '<td class="mono">' + s.size + '</td>' +
              '<td class="mono">' + (s.pcd || '5×112') + '</td>' +
              '<td class="mono">ET ' + (ets || '—') + '</td>' +
              '<td class="mono">' + (s.cb_mm || '—') + '</td>' +
              '<td class="mono">' + (s.weight_kg || '—') + '</td>' +
              '<td>' + cbWarn + '</td>' +
              '<td class="small muted">' + (s.note || '') + '</td>' +
              '</tr>';
          }).join('');

          return '<div class="card" style="margin-bottom:16px">' +
            '<div class="card-meta">' + esc(b.brand) + ' · ' + esc(b.country) + '</div>' +
            '<h3 class="mt0">' + esc(m.name) + ' ' +
            (m.process ? '<span class="badge gray">' + m.process + '</span>' : '') +
            (m.bolt_seat ? '<span class="badge info">' + m.bolt_seat + '</span>' : '') +
            '</h3>' +
            (m.fitment_note ? '<p class="small muted">' + m.fitment_note + '</p>' : '') +
            (sizeRows ? '<div class="table-scroll"><table><thead><tr>' +
              [
                t('pg.fitment.brands.th.size', '规格'),
                t('pg.fitment.brands.th.pcd', 'PCD'),
                t('pg.fitment.brands.th.et', '偏距'),
                t('pg.fitment.brands.th.cb', '中心孔'),
                t('pg.fitment.brands.th.weight', '单只重量 (kg)'),
                t('pg.fitment.brands.th.cbFit', '中心孔适配'),
                t('pg.fitment.brands.th.note', '备注')
              ]
                .map(function (h) { return '<th>' + h + '</th>'; }).join('') +
              '</tr></thead><tbody>' + sizeRows + '</tbody></table></div>'
              : '<div class="note">' + t('pg.fitment.brands.noData', '未取得该型号的 5×112 规格数据，原因见上方说明。') + '</div>') +
            '<div class="grid cols-2 mt16">' +
            '<div class="stat"><div class="k">' + t('pg.fitment.brands.load.k', '标称载荷') + '</div><div class="v small">' + (m.load_rating || '—') + '</div></div>' +
            '<div class="stat"><div class="k">' + t('pg.fitment.brands.price.k', '参考价格（单只）') + '</div><div class="v small">' +
            (m.price_display ? m.price_display : money(m.price_cny)) + '</div></div>' +
            '</div>' +
            (m.price_note ? '<div class="small faint mt16">' + t('pg.fitment.brands.price.src', '价格来源：') + m.price_note + '</div>' : '') +
            '</div>';
        }).join('');

        return '<section style="margin-bottom:28px">' +
          '<h3 style="font-size:20px;color:var(--text)">' + esc(b.brand) +
          ' <span class="badge gray">' + esc(b.country) + '</span></h3>' +
          (b.positioning ? '<p class="muted small">' + b.positioning + '</p>' : '') +
          models + '</section>';
      }).join('');
    }

    if (chipsHost && listHost) {
      chipsHost.innerHTML = '<span class="chip active" data-brand="all">' + t('pg.fitment.brands.chip.all', '全部品牌') + '</span>' +
        brands.map(function (b) {
          return '<span class="chip" data-brand="' + b.brand + '">' + b.brand + '</span>';
        }).join('');
      renderBrands();
      Array.prototype.forEach.call(chipsHost.querySelectorAll('.chip'), function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(chipsHost.querySelectorAll('.chip'), function (c) {
            c.classList.remove('active');
          });
          chip.classList.add('active');
          brandFilter = chip.getAttribute('data-brand');
          renderBrands();
        });
      });
    }

    /* ================= AMG 原厂 ================= */
    var amgHost = document.getElementById('amg-table');
    if (amgHost) {
      var amg = D.amgOem || [];
      if (!amg.length) {
        amgHost.innerHTML = '<div class="note">' + t('pg.fitment.amg.empty', '暂无 AMG 原厂轮毂数据。') + '</div>';
      } else {
        var rows = amg.map(function (a) {
          return [
            '<span class="mono">' + (a.part_no || '—') + '</span>',
            a.name || '—',
            '<span class="mono">' + (a.size || '—') + '</span>',
            a.et !== null && a.et !== undefined ? '<span class="mono">ET ' + a.et + '</span>' : '—',
            '<span class="mono">' + (a.tyre || '—') + '</span>',
            a.models || '—',
            money(a.price_cny)
          ];
        });
        amgHost.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          [
            t('pg.fitment.amg.th.part', '原厂零件号'),
            t('pg.fitment.amg.th.name', '名称'),
            t('pg.fitment.amg.th.size', '规格'),
            t('pg.fitment.amg.th.et', '偏距'),
            t('pg.fitment.amg.th.tyre', '配套轮胎'),
            t('pg.fitment.amg.th.models', '适用车型'),
            t('pg.fitment.amg.th.price', '参考价（单只）')
          ]
            .map(function (h) { return '<th>' + h + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      }
    }

    /* ================= 轮毂尺寸可用性矩阵 ================= */
    var matrixHost = document.getElementById('fit-matrix');
    var matrixChips = document.getElementById('matrix-chips');
    if (matrixHost && calc) {
      // 常见「辋宽 → 搭配胎宽」对应关系
      var RIM_TYRE = [
        { rim: 6.5, tyre: 205 }, { rim: 7, tyre: 215 }, { rim: 7.5, tyre: 225 },
        { rim: 8, tyre: 235 }, { rim: 8.5, tyre: 245 }, { rim: 9, tyre: 255 },
        { rim: 9.5, tyre: 265 }, { rim: 10, tyre: 275 }, { rim: 10.5, tyre: 285 },
        { rim: 11, tyre: 295 }
      ];
      var ETS = [];
      for (var ei = 20; ei <= 60; ei += 5) ETS.push(ei);

      var mFilter = gens.filter(function (g) { return g.chassis === 'W205/S205'; }).length
        ? 'W205/S205' : gens[0].chassis;

      function renderMatrix() {
        var gen = gens.filter(function (g) { return g.chassis === mFilter; })[0];
        if (!gen) return;
        var base = (gen.wheels.oem || [])[0];
        if (!base) return;
        var baseW = calc.parseWheel(base.size);
        var baseT = calc.parseTyre(base.tyre);
        if (!baseW || !baseT) return;
        var baseEt = (base.et !== null && base.et !== undefined) ? base.et : baseW.et;
        var baseGeo = calc.fitmentGeometry(baseW.width, baseEt, baseT.width);

        var head = '<thead><tr><th>' + t('pg.fitment.matrix.th.rim', '辋宽（配胎宽）') + '</th>' +
          ETS.map(function (x) { return '<th class="num">ET ' + x + '</th>'; }).join('') + '</tr></thead>';

        var body = RIM_TYRE.map(function (rt) {
          var cells = ETS.map(function (et) {
            var g2 = calc.fitmentGeometry(rt.rim, et, rt.tyre);
            var move = calc.round(g2.tyreOuterX - baseGeo.tyreOuterX, 1);
            var inner = calc.round(g2.tyreInnerX - baseGeo.tyreInnerX, 1);
            var cls = 'ok';
            // 过大外移会刮轮眉；过大内缩（外移为较大负值）会显得轮胎「陷进去」或蹭内侧
            if (move > 12 || move < -15 || inner < -18) cls = 'bad';
            else if (move > 6 || move < -8 || inner < -10) cls = 'warn';
            var bg = cls === 'ok' ? 'rgba(63,185,80,.16)' : (cls === 'warn' ? 'rgba(210,153,34,.18)' : 'rgba(248,81,73,.16)');
            var fg = cls === 'ok' ? 'var(--ok)' : (cls === 'warn' ? 'var(--warn)' : 'var(--bad)');
            var tip = tf('pg.fitment.matrix.tip',
              '{rim}J 配 {tyre} 胎 / ET{et}：外侧 {move} mm，内侧 {inner} mm',
              {
                rim: rt.rim, tyre: rt.tyre, et: et,
                move: (move > 0 ? '+' : '') + move,
                inner: (inner > 0 ? '+' : '') + inner
              });
            return '<td class="num" style="background:' + bg + ';color:' + fg + '" title="' + tip + '">' +
              (move > 0 ? '+' : '') + move + '</td>';
          }).join('');
          return '<tr><td class="nowrap"><span class="mono">' + rt.rim + 'J</span> ' +
            '<span class="faint small">(' + rt.tyre + ')</span></td>' + cells + '</tr>';
        }).join('');

        matrixHost.innerHTML = '<div class="table-scroll"><table style="min-width:900px">' + head +
          '<tbody>' + body + '</tbody></table></div>' +
          '<div class="small faint mt16">' +
          tf('pg.fitment.matrix.foot',
            '基准：<span class="mono">{chassis}</span> 原厂前轮 ' +
            '<span class="mono">{size} ET{et} + {tyre}</span>。' +
            '单元格数值为<strong>胎壁外缘相对原厂的外移量（mm）</strong>，正数代表更靠车外；' +
            '鼠标悬停可看内外两侧的具体位移。',
            { chassis: gen.chassis, size: base.size, et: baseEt, tyre: base.tyre }) +
          '</div>';
      }

      if (matrixChips) {
        matrixChips.innerHTML = gens.map(function (g) {
          return '<span class="chip' + (g.chassis === mFilter ? ' active' : '') +
            '" data-mx="' + g.chassis + '">' + g.chassis + '</span>';
        }).join('');
        Array.prototype.forEach.call(matrixChips.querySelectorAll('.chip'), function (chip) {
          chip.addEventListener('click', function () {
            Array.prototype.forEach.call(matrixChips.querySelectorAll('.chip'), function (c) {
              c.classList.remove('active');
            });
            chip.classList.add('active');
            mFilter = chip.getAttribute('data-mx');
            renderMatrix();
          });
        });
      }
      renderMatrix();
    }

    /* ================= 数据缺口说明与来源清单 ================= */
    var notesHost = document.getElementById('brand-notes');
    if (notesHost) {
      var esc2 = (window.App && window.App.esc) ? window.App.esc : function (s) { return s; };
      var notes = D.brandNotes || [];
      var sources = D.brandSources || [];
      var html = '';
      if (notes.length) {
        html += '<h3>' + t('pg.fitment.notes.title', '数据缺口：这份品牌数据缺什么、为什么缺') + '</h3>' +
          '<div class="note warn"><ul style="padding-left:20px;margin:0">' +
          notes.map(function (n) { return '<li class="small">' + esc2(n) + '</li>'; }).join('') +
          '</ul></div>';
      }
      if (sources.length) {
        html += '<details class="mt16"><summary class="small muted" style="cursor:pointer">' +
          tf('pg.fitment.notes.src', '数据来源清单（{n} 条，均为实际抓取页面）', { n: sources.length }) +
          '</summary>' +
          '<ul class="small faint" style="padding-left:20px;word-break:break-all">' +
          sources.map(function (s) {
            return '<li><a href="' + esc2(s) + '" target="_blank" rel="noopener">' + esc2(s) + '</a></li>';
          }).join('') +
          '</ul></details>';
      }
      notesHost.innerHTML = html;
    }
  });
})();
