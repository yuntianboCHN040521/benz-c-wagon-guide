/* ==========================================================================
   parts.js —— 配件与机油页渲染
   ========================================================================== */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function empty(host, what) {
    host.innerHTML = '<div class="note">暂无' + (what || '') + '数据。</div>';
  }

  function table(headers, rows) {
    return '<div class="table-scroll"><table><thead><tr>' +
      headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  function money(v, unit) {
    if (v === null || v === undefined || v === '') return '<span class="faint">—</span>';
    if (Array.isArray(v)) return '<span class="mono">' + v[0] + '–' + v[1] + '</span>' + (unit ? ' <span class="faint small">' + unit + '</span>' : '');
    return '<span class="mono">' + v + '</span>' + (unit ? ' <span class="faint small">' + unit + '</span>' : '');
  }

  function d(x) { return (x === null || x === undefined || x === '') ? '<span class="faint">—</span>' : x; }

  ready(function () {
    var D = window.CDATA;
    if (!D) return;

    /* ================= 机油 ================= */
    var oilHost = document.getElementById('oil-table');
    if (oilHost) {
      var oils = D.oils || [];
      if (!oils.length) empty(oilHost, '机油');
      else {
        var rows = oils.map(function (o) {
          var cert = o.cert ? String(o.cert).split(/[\/、,]/).map(function (c) {
            return '<span class="badge info">' + c.trim() + '</span>';
          }).join(' ') : '<span class="faint">—</span>';
          return [
            '<strong>' + d(o.brand) + '</strong>',
            d(o.product),
            '<span class="mono">' + d(o.viscosity) + '</span>',
            cert,
            o.volume_l ? '<span class="mono">' + o.volume_l + ' L</span>' : '<span class="faint">—</span>',
            money(o.price_cny, '元'),
            o.price_per_l ? '<span class="mono">' + o.price_per_l + '</span>' : '<span class="faint">—</span>',
            d(o.channel) + (o.note ? '<div class="faint" style="font-size:11.5px;line-height:1.5;margin-top:3px">' + o.note + '</div>' : '')
          ];
        });
        oilHost.innerHTML = table(
          ['品牌', '产品全称', '粘度', '认证', '容量', '参考价', '单价 (元/L)', '渠道 / 说明'],
          rows
        ) + '<div class="small faint mt16">单价 = 参考价 ÷ 容量，用来横向比较不同包装规格的性价比。' +
          '大促期间常有 5～6 折，囤货可显著降低单次保养成本。</div>';
      }
    }

    /* ================= 滤芯 ================= */
    var fHost = document.getElementById('filter-table');
    if (fHost) {
      var filters = D.filters || [];
      if (!filters.length) empty(fHost, '滤芯');
      else {
        var frows = [];
        filters.forEach(function (f) {
          var am = f.aftermarket || [];
          if (!am.length) {
            frows.push([
              '<strong>' + d(f.item) + '</strong>',
              '<span class="mono">' + d(f.oem_part_no) + '</span>',
              money(f.oem_price_cny, '元'),
              '<span class="faint">—</span>', '<span class="faint">—</span>', '<span class="faint">—</span>',
              d(f.note)
            ]);
          } else {
            am.forEach(function (a, i) {
              frows.push([
                i === 0 ? '<strong>' + d(f.item) + '</strong>' : '',
                i === 0 ? '<span class="mono">' + d(f.oem_part_no) + '</span>' : '',
                i === 0 ? money(f.oem_price_cny, '元') : '',
                d(a.brand),
                '<span class="mono">' + d(a.part_no) + '</span>',
                money(a.price_cny, '元'),
                i === 0 ? d(f.note) : ''
              ]);
            });
          }
        });
        fHost.innerHTML = table(
          ['项目', '原厂零件号', '原厂价', '品牌', '品牌件号', '参考价', '备注'],
          frows
        ) + '<div class="small faint mt16">奔驰的滤芯多由曼牌（Mann）、马勒（Mahle）、汉格斯特（Hengst）、博世代工，' +
          '买对应品牌件通常能省 40%～60% 且品质一致。</div>';
      }
    }

    /* ================= 火花塞 ================= */
    var sHost = document.getElementById('spark-table');
    if (sHost) {
      var sp = D.sparkPlugs || [];
      if (!sp.length) empty(sHost, '火花塞');
      else {
        sHost.innerHTML = table(
          ['发动机', '品牌', '型号', '参考单价', '数量', '更换周期', '备注'],
          sp.map(function (s) {
            return [
              '<span class="mono"><strong>' + d(s.engine) + '</strong></span>',
              d(s.brand),
              '<span class="mono">' + d(s.part_no) + '</span>',
              money(s.price_cny, '元/支'),
              s.qty ? '<span class="mono">' + s.qty + ' 支</span>' : '<span class="faint">—</span>',
              s.interval_km ? '<span class="mono">' + (s.interval_km / 10000) + ' 万 km</span>' : '<span class="faint">—</span>',
              d(s.note)
            ];
          })
        );
      }
    }

    /* ================= 刹车 ================= */
    var bHost = document.getElementById('brake-table');
    if (bHost) {
      var br = D.brakes || [];
      if (!br.length) empty(bHost, '刹车');
      else {
        bHost.innerHTML = table(
          ['位置', '品牌', '零件号', '参考价', '更换周期', '备注'],
          br.map(function (b) {
            return [
              '<strong>' + d(b.position) + '</strong>',
              d(b.brand),
              '<span class="mono">' + d(b.part_no) + '</span>',
              money(b.price_cny, '元'),
              d(b.interval),
              d(b.note)
            ];
          })
        );
      }
    }

    /* ================= 变速箱油 ================= */
    var aHost = document.getElementById('atf-table');
    if (aHost) {
      var atf = D.transmissionFluids || [];
      if (!atf.length) empty(aHost, '变速箱油');
      else {
        var arows = [];
        atf.forEach(function (t) {
          var alts = t.alternatives || [];
          var altStr = alts.length ? alts.map(function (a) {
            return '<div class="small">' + d(a.brand) + ' ' + d(a.product) +
              (a.price_cny ? ' · <span class="mono">' + a.price_cny + ' 元</span>' : '') +
              (a.volume_l ? '<span class="faint">/' + a.volume_l + 'L</span>' : '') + '</div>';
          }).join('') : '<span class="faint">—</span>';
          arows.push([
            '<strong>' + d(t.trans) + '</strong>',
            '<span class="mono">' + d(t.spec) + '</span>',
            t.capacity_l ? '<span class="mono">' + t.capacity_l + ' L</span>' : '<span class="faint">—</span>',
            money(t.oem_price_cny, '元'),
            altStr,
            d(t.note)
          ]);
        });
        aHost.innerHTML = table(
          ['变速箱', '油品认证', '容量', '原厂油参考价', '替代品牌', '备注'],
          arows
        );
      }
    }

    /* ================= 刹车油 ================= */
    var bfHost = document.getElementById('brakefluid-table');
    if (bfHost) {
      var bf = D.brakeFluid || [];
      if (!bf.length) empty(bfHost, '刹车油');
      else {
        bfHost.innerHTML = table(
          ['规格', '品牌', '容量', '参考价', '说明'],
          bf.map(function (b) {
            return [
              '<strong>' + d(b.spec) + '</strong>',
              d(b.brand),
              b.volume_l ? '<span class="mono">' + b.volume_l + ' L</span>' : '<span class="faint">—</span>',
              money(b.price_cny, '元'),
              '<span class="small muted">' + d(b.note) + '</span>'
            ];
          })
        );
      }
    }

    /* ================= 工时费 ================= */
    var lHost = document.getElementById('labour-table');
    if (lHost) {
      var lab = D.labour || [];
      if (!lab.length) empty(lHost, '工时费');
      else {
        lHost.innerHTML = table(
          ['项目', '类型', '参考价格', '说明'],
          lab.map(function (l) {
            return [
              '<strong>' + d(l.type) + '</strong>',
              d(l.channel || l.category),
              money(l.price_cny, '元'),
              d(l.note)
            ];
          })
        );
      }
    }

    /* ================= 数据缺口记录 ================= */
    var gHost = document.getElementById('data-gaps');
    if (gHost) {
      var gaps = D.dataGaps || [];
      if (gaps.length) {
        gHost.innerHTML = '<div class="note warn"><h3 class="mt0" style="color:var(--text)">本站没拿到的数据（如实列出）</h3>' +
          '<ul style="padding-left:20px;margin:0">' +
          gaps.map(function (g) { return '<li class="small">' + g + '</li>'; }).join('') +
          '</ul><p class="small faint mb0" style="margin-top:10px">' +
          '这些字段在页面上显示为「—」，是抓取受限的结果，而不是没有这项数据。' +
          '与其填一个看起来合理但不可靠的数字，不如明确告诉你这里缺。</p></div>';
      }
    }
  });
})();
