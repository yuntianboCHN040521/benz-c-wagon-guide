/* ==========================================================================
   assistant.js —— AI 助手：意图识别 → 知识库检索 → 回答生成
   --------------------------------------------------------------------------
   两种模式：
     1) 离线检索模式（默认）：完全在浏览器内跑，答案只来自本站数据，不需要联网
     2) LLM 模式（可选）：填入自己的 API key 后，把检索到的本站资料作为上下文
        交给大模型组织语言，避免幻觉；调用失败会自动回落到离线模式
   ========================================================================== */
(function (global) {
  'use strict';

  var D = global.CDATA || {};
  var WC = global.WheelCalc;
  var KB = global.KB;
  var ITEMS = [];

  var esc = (global.App && global.App.esc) ? global.App.esc : function (s) {
    return String(s === null || s === undefined ? '' : s);
  };

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function num(v, unit) {
    if (v === null || v === undefined || v === '') return '<span class="faint">未核实</span>';
    if (Array.isArray(v)) return '<span class="mono">' + v.join(' – ') + '</span>' + (unit ? ' ' + unit : '');
    return '<span class="mono">' + esc(v) + '</span>' + (unit ? ' ' + unit : '');
  }

  /* -------------------------------------------------------- 实体提取 --- */
  var TYRE_RE = /(\d{3})\s*\/\s*(\d{2})\s*(?:Z\s*)?R\s*(\d{2})/gi;
  function extractTyres(q) {
    var out = [], m, seen = {};
    TYRE_RE.lastIndex = 0;
    while ((m = TYRE_RE.exec(q)) !== null) {
      var key = m[1] + '/' + m[2] + 'R' + m[3];
      if (seen[key]) continue;
      seen[key] = 1;
      out.push({ width: +m[1], aspect: +m[2], rim: +m[3], raw: key });
    }
    return out;
  }

  var WHEEL_RE = /(\d{1,2}(?:\.\d)?)\s*[Jj]?\s*[xX×]\s*(\d{2})(?:\s*(?:ET|et)\s*(-?\d{1,3}(?:\.\d)?))?/g;
  function extractWheels(q) {
    var out = [], m, seen = {};
    WHEEL_RE.lastIndex = 0;
    while ((m = WHEEL_RE.exec(q)) !== null) {
      var rim = +m[2];
      if (rim < 15 || rim > 22) continue;       // 排除 225/50R17 这类误匹配
      var key = m[1] + 'Jx' + rim + 'ET' + (m[3] || '');
      if (seen[key]) continue;
      seen[key] = 1;
      out.push({ width: +m[1], rim: rim, et: m[3] !== undefined ? +m[3] : null, raw: m[0].replace(/\s+/g, '') });
    }
    return out;
  }

  function findBrand(q) {
    var n = KB.normalize(q);
    var hit = null;
    (D.brands || []).forEach(function (b) {
      if (hit) return;
      var names = [b.brand].concat(KB.normalize(b.brand).split(/\s+/));
      if (names.some(function (x) { return x && n.indexOf(x.toLowerCase()) !== -1; })) hit = b.brand;
    });
    if (!hit && n.indexOf('amg') !== -1) hit = 'AMG';
    return hit;
  }

  /* -------------------------------------------------------- 意图解析 --- */
  function parse(q) {
    var n = KB.normalize(q);
    var chasses = KB.detectChassis(q);
    var tyres = extractTyres(q);
    var wheels = extractWheels(q);
    var brand = findBrand(q);
    var has = function () {
      for (var i = 0; i < arguments.length; i++) if (n.indexOf(arguments[i]) !== -1) return true;
      return false;
    };

    var intent = 'search';

    var asksFitment = has('换', '改装', '升级', '适配', '匹配', '能装', '装得下', '合适', '会不会',
      '刮', '蹭', '误差', '码表', '速表', '差多少', '行不行', '可以吗', '干涉', '怎么样', '装不装');

    if (tyres.length >= 2 ||
      (tyres.length >= 1 && (wheels.length >= 1 || asksFitment)) ||
      (wheels.length >= 1 && asksFitment)) {
      intent = 'calc';
    } else if (chasses.length >= 2) {
      intent = 'compare';
    } else if (brand) {
      // 品牌优先于「轮毂」这类泛词，否则「BBS 有哪些适配的轮毂」会被当成通用轮毂问答
      intent = 'brand';
    } else if (has('缺口', '未核实', '没核实', '没有核实', '数据来源', '哪些数据', '靠谱', '可信', '准不准')) {
      intent = 'gap';
    } else if (has('故障灯', '警告灯', '报警灯', '灯亮了', '亮灯', '指示灯亮', '仪表灯', '仪表报警')) {
      intent = 'warning';
    } else if (has('示宽灯', '驻车灯', '小灯', '近光', '远光', '大灯', '雾灯', '转向灯', '日行灯', '灯光', '车灯', '双闪', '危险警示')) {
      intent = 'lighting';
    } else if (has('按键', '按钮', '怀挡', '拨杆', '中控', '电子手刹', '自动驻车', 'auto hold', '座椅调节', '天窗开关')) {
      intent = 'control';
    } else if (has('通病', '故障', '毛病', '缺陷', '召回', '异响', '漏油')) {
      intent = 'issue';
    } else if (has('价格', '多少钱', '费用', '报价', '售价', '工时')) {
      intent = 'price';
    } else if (has('机油', '用油', '认证', '229')) {
      intent = 'oil';
    } else if (has('保养', '周期', '多少公里换', '多久换', '更换周期')) {
      intent = 'interval';
    } else if (has('轮毂', '偏距', '孔距', '中心孔', '螺栓', '变径环', '轮辋')) {
      intent = 'wheel';
    } else if (has('发动机', '马力', '功率', '扭矩', '排量', '机头')) {
      intent = 'engine';
    } else if (has('轴距', '车长', '车宽', '车高', '轮距', '尺寸', '重量', '车重', '后备箱', '油箱', '离地间隙', '转弯', '风阻')) {
      intent = 'body';
    } else if (has('推荐', '方案', '怎么改', '改多大')) {
      intent = 'plan';
    }

    return { intent: intent, chasses: chasses, tyres: tyres, wheels: wheels, brand: brand, n: n, q: q };
  }

  /* ------------------------------------------------------ 回答生成 --- */
  function srcLink(link, label) {
    return '<a class="src" href="' + link + '">' + esc(label || '查看详情') + ' →</a>';
  }

  function result(html, links) {
    return { html: html, links: links || [] };
  }

  /* ---- 车身尺寸 ---- */
  function answerBody(p) {
    var fields = KB.BODY_FIELDS.filter(function (f) {
      return f[3].some(function (k) { return p.n.indexOf(KB.normalize(k)) !== -1; }) ||
        p.n.indexOf(KB.normalize(f[1])) !== -1;
    });

    // 未指定具体字段 → 给全景
    if (!fields.length) fields = KB.BODY_FIELDS;

    var gens = (D.generations || []).filter(function (g) {
      return !p.chasses.length || p.chasses.indexOf(g.chassis) !== -1;
    });
    if (!gens.length) gens = D.generations || [];

    var html = '';
    if (p.chasses.length === 1 && fields.length === 1) {
      var g = gens[0], f = fields[0];
      html += '<p><strong>' + esc(g.chassis) + '</strong> 的' + esc(f[1]) + '是 ' +
        num(g.body[f[0]], f[2]) + '。</p>';
    } else {
      html += '<p>' + (p.chasses.length ? esc(p.chasses.join(' / ')) + ' 的' : '四代车型的') +
        (fields.length === 1 ? esc(fields[0][1]) : '车身尺寸') + '如下：</p>';
    }

    html += '<div class="table-scroll"><table><thead><tr><th>项目</th>' +
      gens.map(function (g) { return '<th>' + esc(g.chassis) + '</th>'; }).join('') + '</tr></thead><tbody>';
    fields.forEach(function (f) {
      html += '<tr><td>' + esc(f[1]) + '</td>' + gens.map(function (g) {
        return '<td>' + num(g.body[f[0]], f[2]) + '</td>';
      }).join('') + '</tr>';
    });
    html += '</tbody></table></div>';

    return result(html, [['specs.html#dim', '车身数据页']]);
  }

  /* ---- 轮毂参数 ---- */
  function answerWheel(p) {
    var gens = (D.generations || []).filter(function (g) {
      return !p.chasses.length || p.chasses.indexOf(g.chassis) !== -1;
    });
    if (!gens.length) gens = D.generations || [];

    var wantsOem = p.n.indexOf('原厂') !== -1 || p.n.indexOf('规格') !== -1 || p.n.indexOf('尺寸') !== -1;
    var html = '';

    // 安装参数总表
    html += '<p><strong>通用安装参数</strong>（四代一致的部分）：PCD <span class="mono">5×112</span>、' +
      '中心孔 <span class="mono">66.6 mm</span>、球面 R14 螺栓座。</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>代际</th><th>螺栓</th><th>原厂 ET 范围</th>' +
      '<th>典型原厂配置</th></tr></thead><tbody>';
    gens.forEach(function (g) {
      var w = g.wheels, o = (w.oem || [])[0];
      html += '<tr><td class="mono">' + esc(g.chassis) + '</td>' +
        '<td class="mono">' + esc(String(w.bolt_thread).split('（')[0]) + '</td>' +
        '<td class="mono">ET ' + (w.et_range || []).join(' ～ ') + '</td>' +
        '<td class="mono">' + (o ? esc(o.size) + ' ET' + esc(o.et) + ' · ' + esc(o.tyre) : '—') + '</td></tr>';
    });
    html += '</tbody></table></div>';

    if (wantsOem || gens.length === 1) {
      gens.forEach(function (g) {
        html += '<p class="mt16"><strong>' + esc(g.chassis) + '</strong> 的原厂轮毂清单：</p>';
        html += '<div class="table-scroll"><table><thead><tr><th>规格</th><th>ET</th><th>轮胎</th>' +
          '<th>背距/前距 (mm)</th><th>适用</th></tr></thead><tbody>';
        (g.wheels.oem || []).forEach(function (o) {
          var pw = WC ? WC.parseWheel(o.size) : null;
          var et = (o.et !== null && o.et !== undefined) ? o.et : (pw ? pw.et : null);
          var geo = (WC && pw && et !== null && et !== undefined) ? WC.fitmentGeometry(pw.width, et) : null;
          html += '<tr><td class="mono">' + esc(o.size) + '</td><td class="mono">' +
            (et !== null && et !== undefined ? 'ET ' + et : '—') + '</td><td class="mono">' + esc(o.tyre) + '</td>' +
            '<td class="mono">' + (geo ? geo.backspace + ' / ' + geo.frontspace : '—') + '</td>' +
            '<td class="small muted">' + esc(o.models || '') + '</td></tr>';
        });
        html += '</tbody></table></div>';
      });
    }
    return result(html, [['wheels.html#install', '轮毂数据页']]);
  }

  /* ---- 改装计算 ---- */
  function answerCalc(p) {
    if (!WC) return result('<p>计算引擎未加载。</p>');

    // 基准：优先用户指定的车型，否则默认 S205
    var chassis = p.chasses[0] || 'W205/S205';
    var gen = (D.generations || []).filter(function (g) { return g.chassis === chassis; })[0] || D.generations[0];
    var oem = (gen.wheels.oem || [])[0];
    var oemW = WC.parseWheel(oem.size);
    var oemTyre = WC.parseTyre(oem.tyre);
    var oemEt = (oem.et !== null && oem.et !== undefined) ? oem.et : oemW.et;

    var base = null, target = null, note = '';

    if (p.tyres.length >= 2) {
      var w = p.wheels;
      base = { tyre: p.tyres[0], rimWidth: null, et: null };
      target = { tyre: p.tyres[1], rimWidth: null, et: null };
      if (w.length >= 1) { target.rimWidth = w[0].width; target.et = w[0].et; }
      if (w.length >= 2) { base.rimWidth = w[1].width; base.et = w[1].et; }
    } else if (p.tyres.length === 1 && p.wheels.length >= 1) {
      target = { tyre: p.tyres[0], rimWidth: p.wheels[0].width, et: p.wheels[0].et };
    } else if (p.wheels.length >= 1) {
      // 只给了轮毂规格：胎宽按辋宽推算，扁平比反算以保持外径接近原厂
      var w0 = p.wheels[0];
      var oemDia = oemTyre.rim * 25.4 + 2 * oemTyre.width * oemTyre.aspect / 100;
      var tw = Math.round(w0.width * 25.4 * 1.15 / 5) * 5;
      var aspect = Math.round(((oemDia - w0.rim * 25.4) / 2 / tw * 100) / 5) * 5;
      aspect = Math.max(25, Math.min(65, aspect));
      target = { tyre: { width: tw, aspect: aspect, rim: w0.rim }, rimWidth: w0.width, et: w0.et };
      note += '（你没给轮胎规格，按辋宽推算为 ' + tw + '/' + aspect + 'R' + w0.rim + '，仅供参考）';
    }
    if (!target) return answerWheel(p);

    if (!base) {
      base = { tyre: oemTyre, rimWidth: oemW.width, et: oemEt };
    } else {
      base.tyre = WC.parseTyre(base.tyre.raw || (base.tyre.width + '/' + base.tyre.aspect + 'R' + base.tyre.rim)) || base.tyre;
      if (base.rimWidth === null || base.et === null) {
        base.rimWidth = oemW.width; base.et = oemEt;
        note += '（对比基准轮辋按 ' + oem.size + ' ET' + oemEt + ' 计）';
      }
    }
    if (target.rimWidth === null || target.rimWidth === undefined) {
      target.rimWidth = oemW.width; note += '（目标轮辋宽度未给出，按原厂 ' + oemW.width + 'J 计）';
    }
    if (target.et === null || target.et === undefined) {
      target.et = oemEt; note += '（目标 ET 未给出，按原厂 ET' + oemEt + ' 计）';
    }

    var cmp, grade;
    try {
      cmp = WC.compare(base, target);
      grade = WC.grade(cmp, { rimWidthInch: target.rimWidth, tyreWidth: target.tyre.width });
    } catch (e) {
      return result('<p>这两个规格我没法解析，请按 <span class="mono">225/50R17</span> 或 ' +
        '<span class="mono">8.5Jx19 ET45</span> 这样的格式提供。</p>');
    }

    var sign = function (v) { return (v > 0 ? '+' : '') + v; };
    var html = '<p>以 <strong>' + esc(gen.chassis) + '</strong> 原厂 ' +
      '<span class="mono">' + esc(oem.size) + ' ET' + esc(oem.et) + ' + ' + esc(oem.tyre) + '</span> 为基准：' +
      (note ? '<span class="small faint">' + esc(note) + '</span>' : '') + '</p>';

    html += '<div class="result-box">' +
      '<div class="line"><span class="lbl">综合结论</span><span class="badge ' + grade.cls + '">' + grade.label + '</span></div>' +
      '<div class="line"><span class="lbl">轮胎外径</span><span class="val">' + cmp.oem.tyreGeo.diameter + ' → ' + cmp.target.tyreGeo.diameter + ' mm</span></div>' +
      '<div class="line"><span class="lbl">外径变化</span><span class="val ' + (Math.abs(cmp.diameterPct) <= 2 ? 'ok' : Math.abs(cmp.diameterPct) <= 3 ? 'warn' : 'bad') + '">' + sign(cmp.diameterDelta) + ' mm（' + sign(cmp.diameterPct) + '%）</span></div>' +
      '<div class="line"><span class="lbl">离地间隙变化</span><span class="val">' + sign(cmp.rideHeightDelta) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">胎壁外移（估算）</span><span class="val ' + (cmp.tyreOuterMove <= 6 ? 'ok' : cmp.tyreOuterMove <= 12 ? 'warn' : 'bad') + '">' + sign(cmp.tyreOuterMove) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">胎壁内移（估算）</span><span class="val ' + (cmp.tyreInnerMove >= -8 ? 'ok' : cmp.tyreInnerMove >= -15 ? 'warn' : 'bad') + '">' + sign(cmp.tyreInnerMove) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">单轴轮距变化</span><span class="val">' + sign(cmp.trackChangePerAxle) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">码表 100 km/h 时真实车速</span><span class="val ' + (Math.abs(cmp.speedoPct) <= 2 ? 'ok' : 'warn') + '">' + cmp.trueSpeedAt100 + ' km/h</span></div>' +
      '<div class="line"><span class="lbl">轮辋外缘外移</span><span class="val">' + sign(cmp.rimOuterMove) + ' mm</span></div>' +
      '</div>';

    html += '<p class="mt16 small muted">逐项检查：</p><div class="result-box">' +
      grade.issues.map(function (i) {
        var cls = i.t === 'ok' ? 'ok' : (i.t === 'warn' ? 'warn' : 'bad');
        return '<div class="line"><span class="lbl" style="flex:1">' + esc(i.m) + '</span><span class="badge ' + cls + '">' +
          (i.t === 'ok' ? '通过' : i.t === 'warn' ? '注意' : '风险') + '</span></div>';
      }).join('') + '</div>';

    return result(html, [['calculator.html', '计算器（可调更多参数）']]);
  }

  /* ---- 两代对比 ---- */
  function answerCompare(p) {
    var gens = (D.generations || []).filter(function (g) { return p.chasses.indexOf(g.chassis) !== -1; });
    if (gens.length < 2) return answerBody(p);

    var fields = KB.BODY_FIELDS.filter(function (f) {
      return f[3].some(function (k) { return p.n.indexOf(KB.normalize(k)) !== -1; });
    });
    if (!fields.length) fields = KB.BODY_FIELDS;

    var a = gens[0], b = gens[1];
    var html = '<p><strong>' + esc(a.chassis) + '</strong> 与 <strong>' + esc(b.chassis) + '</strong> 对比：</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>项目</th><th>' + esc(a.chassis) + '</th><th>' +
      esc(b.chassis) + '</th><th>差值</th></tr></thead><tbody>';
    fields.forEach(function (f) {
      var va = a.body[f[0]], vb = b.body[f[0]];
      var diff = '—';
      if (Array.isArray(va) && Array.isArray(vb)) diff = '上限 ' + (vb[1] - va[1]) + ' / 下限 ' + (vb[0] - va[0]);
      else if (typeof va === 'number' && typeof vb === 'number') diff = (vb - va > 0 ? '+' : '') + Math.round((vb - va) * 100) / 100 + (f[2] ? ' ' + f[2] : '');
      html += '<tr><td>' + esc(f[1]) + '</td><td>' + num(va, f[2]) + '</td><td>' + num(vb, f[2]) +
        '</td><td class="mono">' + esc(diff) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['specs.html#dim', '车身数据页']]);
  }

  /* ---- 通病 ---- */
  function answerIssue(p) {
    // 只有在问到具体部件时才按相关度排序；泛问「某代有什么通病」时按数据顺序全列，
    // 否则「澄清／不适用」这类条目会因为命中了车型代号而被排到最前面
    var specificWords = ['正时', '链条', '凸轮轴', '平衡轴', '变速箱', '导体板', '阀体', '变矩器', '涡轮',
      '天窗', '减震', '弹簧', '转向', '冷却', '水泵', '节温器', '喷油', '积碳', '锁', '漏水', '异响',
      '漏油', '机脚', 'pcv', 'egr', 'dpf', '翻板', 'sam', 'comand', '锈', '油管', '电动机', '召回'];
    var isSpecific = specificWords.some(function (k) { return p.n.indexOf(k) !== -1; });

    var found;
    if (!isSpecific) {
      found = ITEMS.filter(function (x) {
        return x.type === 'issue' && (!p.chasses.length || p.chasses.indexOf(x.chassis) !== -1);
      });
    } else {
      found = KB.search(ITEMS, p.q, { cats: ['通病故障'], limit: 20 });
      if (p.chasses.length) {
        var strict = found.filter(function (x) { return p.chasses.indexOf(x.chassis) !== -1; });
        if (strict.length) found = strict;
      }
    }
    var total = found.length;
    found = found.slice(0, 14);
    if (!found.length) return answerSearch(p);

    var html = '<p>找到 <strong>' + total + '</strong> 条通病记录' +
      (total > found.length ? '，下面显示前 ' + found.length + ' 条' : '') + '：</p>';
    found.forEach(function (it) {
      var d = it.data;
      var cost = d.cost_cny
        ? '<span class="badge warn">维修参考 ' + (Array.isArray(d.cost_cny) ? d.cost_cny[0] + '–' + d.cost_cny[1] + ' 元' : esc(d.cost_cny)) + '</span>'
        : '<span class="badge gray">无可靠价格来源</span>';
      html += '<div class="card mt16"><div class="card-meta">' + esc(it.chassis || '通用') + ' · 通病</div>' +
        '<h3 class="mt0" style="font-size:15px">' + esc(d.title) + '</h3>' +
        (d.symptom ? '<p class="small"><span class="badge bad">现象</span> ' + esc(d.symptom) + '</p>' : '') +
        (d.cause ? '<p class="small muted"><span class="badge gray">原因</span> ' + esc(d.cause) + '</p>' : '') +
        (d.fix ? '<p class="small muted"><span class="badge ok">对策</span> ' + esc(d.fix) + '</p>' : '') +
        '<p class="mb0">' + cost + '</p></div>';
    });
    return result(html, [['guide.html#issues', '用车指南 · 通病速查']]);
  }

  /* ---- 机油 ---- */
  function answerOil(p) {
    var html = '';

    // 匹配发动机用油
    var eo = (D.engineOil || []).filter(function (e) {
      var key = KB.normalize(p.q);
      if (p.chasses.length) {
        var g = (D.generations || []).filter(function (x) { return p.chasses.indexOf(x.chassis) !== -1; })[0];
        if (g) {
          var hit = (g.engines || []).some(function (en) {
            return key.indexOf(KB.normalize(en.code || '')) !== -1 || key.indexOf(KB.normalize(en.name || '')) !== -1;
          });
          if (hit) return true;
          // 没点名发动机时，返回该代涉及的机型（按代号前缀粗匹配）
          var codes = (g.engines || []).map(function (en) { return (en.code || '').split(/[（(\s]/)[0]; });
          return codes.some(function (c) { return c && KB.normalize(e.engine).indexOf(KB.normalize(c)) !== -1; });
        }
      }
      return key.indexOf(KB.normalize(e.engine)) !== -1;
    });
    if (!eo.length) eo = (D.engineOil || []).slice(0, 6);

    if (eo.length) {
      html += '<p><strong>用油要求</strong>（认证比粘度更重要）：</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>发动机</th><th>搭载车型</th>' +
        '<th>认证</th><th>粘度</th><th>容量</th></tr></thead><tbody>';
      eo.forEach(function (e) {
        html += '<tr><td class="mono">' + esc(e.engine) + '</td><td class="small">' + esc(e.models || '') +
          '</td><td class="mono">' + esc(e.cert) + '</td><td class="mono">' + esc(e.viscosity) + '</td>' +
          '<td class="mono">' + (e.capacity_l ? e.capacity_l + ' L' : '未核实') + '</td></tr>';
      });
      html += '</tbody></table></div>';
      var cap = eo.filter(function (e) { return e.capacity_l; });
      if (cap.length) {
        html += '<p class="small muted mt16">容量说明：' + cap.slice(0, 3).map(function (e) {
          return esc(e.engine) + ' ' + e.capacity_l + ' L（' + esc(e.note || '') + '）';
        }).join('；') + '</p>';
      }
    }

    // 机油产品价格
    var oils = (D.oils || []).slice(0, 6);
    if (oils.length && p.n.indexOf('价格') !== -1 || p.n.indexOf('多少钱') !== -1 || !eo.length) {
      html += '<p class="mt16"><strong>机油参考价格</strong>（中国市场，随渠道与促销波动）：</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>品牌</th><th>产品</th><th>粘度</th>' +
        '<th>认证</th><th>参考价</th><th>单价</th></tr></thead><tbody>';
      oils.forEach(function (o) {
        html += '<tr><td>' + esc(o.brand) + '</td><td class="small">' + esc(o.product) + '</td>' +
          '<td class="mono">' + esc(o.viscosity) + '</td><td class="small">' + esc(o.cert) + '</td>' +
          '<td class="mono">' + (o.price_cny ? o.price_cny + ' 元' : '—') + '</td>' +
          '<td class="mono">' + (o.price_per_l ? o.price_per_l + ' 元/L' : '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    if (!html) return answerSearch(p);
    return result(html, [['guide.html#oil', '机油认证体系'], ['parts.html#oil', '机油价格对比']]);
  }

  /* ---- 保养周期 ---- */
  function answerInterval(p) {
    var all = (D.intervals || []);
    // 判断是在问某个具体项目，还是泛问整个周期表
    var keys = ['机油', '空气滤', '空调滤', '燃油滤', '火花塞', '刹车', '制动', '变速箱',
      '冷却液', '蓄电池', '雨刮', '轮胎', '正时'];
    var asked = keys.filter(function (k) { return p.n.indexOf(k) !== -1; });
    var show = all;
    if (asked.length) {
      var hit = all.filter(function (i) {
        var n = KB.normalize(i.item);
        return asked.some(function (k) { return n.indexOf(k) !== -1; });
      });
      if (hit.length) show = hit;
    }

    var html = '<p>' + (show.length < all.length ? '匹配到的保养项目：' : '本站收录的保养周期总表：') + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>项目</th><th>周期</th><th>参考价</th>' +
      '<th>说明</th></tr></thead><tbody>';
    show.slice(0, 16).forEach(function (i) {
      html += '<tr><td><strong>' + esc(i.item) + '</strong></td><td class="mono nowrap">' + esc(i.interval || '—') +
        '</td><td class="mono">' + (i.price_cny ? (Array.isArray(i.price_cny) ? i.price_cny.join('–') : i.price_cny) + ' 元' : '—') +
        '</td><td class="small muted">' + esc(i.note || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['guide.html#system', '保养体系'], ['parts.html#labour', '工时费']]);
  }

  /* ---- 价格 ---- */
  function answerPrice(p) {
    var found = KB.search(ITEMS, p.q, { limit: 8 })
      .filter(function (x) { return ['oil', 'filter', 'spark', 'brake', 'atf', 'brakeFluid', 'labour', 'interval', 'brand'].indexOf(x.type) !== -1; });
    if (!found.length) found = KB.search(ITEMS, p.q, { limit: 6 });
    if (!found.length) return answerSearch(p);

    var html = '<p>与「' + esc(p.q) + '」相关的价格信息：</p><div class="table-scroll"><table>' +
      '<thead><tr><th>类别</th><th>项目</th><th>明细</th><th>来源页</th></tr></thead><tbody>';
    found.forEach(function (it) {
      var detail = it.text.length > 160 ? it.text.slice(0, 160) + '…' : it.text;
      html += '<tr><td class="nowrap">' + esc(it.cat) + '</td><td><strong>' + esc(it.title) + '</strong></td>' +
        '<td class="small muted">' + esc(detail) + '</td>' +
        '<td>' + srcLink(it.link, '查看') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<div class="note mt16"><strong>价格性质：</strong>本站所有价格均为参考区间，' +
      '随地区、渠道与时间波动明显（通常 ±30%），部分为历史促销价，不是报价单。</div>';
    return result(html, [['parts.html', '配件与机油页']]);
  }

  /* ---- 品牌 ---- */
  function answerBrand(p) {
    if (p.brand === 'AMG') {
      var amg = D.amgOem || [];
      var html = '<p>本站收录 <strong>' + amg.length + '</strong> 款奔驰 AMG 原厂轮毂（含零件号）：</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>零件号</th><th>名称</th><th>规格</th>' +
        '<th>ET</th><th>适用</th></tr></thead><tbody>';
      amg.forEach(function (a) {
        html += '<tr><td class="mono">' + esc(a.part_no || '—') + '</td><td class="small">' + esc(a.name || '') +
          '</td><td class="mono">' + esc(a.size || '—') + '</td><td class="mono">' +
          (a.et !== null && a.et !== undefined ? a.et : '—') + '</td><td class="small muted">' + esc(a.models || '') + '</td></tr>';
      });
      return result(html + '</tbody></table></div>', [['fitment.html#amg', 'AMG 原厂轮毂']]);
    }

    var brand = (D.brands || []).filter(function (b) { return b.brand === p.brand; })[0];
    var found = brand ? [{ data: { brand: brand, model: null } }] : KB.search(ITEMS, p.q, { cats: ['品牌轮毂'], limit: 6 });
    if (!found.length) return answerSearch(p);

    var html = '';
    found.forEach(function (it) {
      var b = it.data.brand;
      html += '<p><strong>' + esc(b.brand) + '</strong> · ' + esc(b.country || '') + ' —— ' + esc(b.positioning || '') + '</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>型号</th><th>工艺</th><th>5×112 规格（含 ET / 中心孔）</th>' +
        '<th>标称载荷</th><th>参考价（单只）</th></tr></thead><tbody>';
      (b.models || []).forEach(function (m) {
        var sizes = (m.sizes || []).length
          ? m.sizes.map(function (s) {
            return s.size + (s.et ? ' ET' + (Array.isArray(s.et) ? s.et.join('/') : s.et) : '') +
              (s.cb_mm ? ' CB' + s.cb_mm : '') + (s.weight_kg ? ' ' + s.weight_kg + 'kg' : '');
          }).join('<br>')
          : '<span class="faint">未取得 5×112 数据</span>';
        html += '<tr><td><strong>' + esc(m.name) + '</strong></td><td class="small muted">' + esc(m.process || '—') +
          '</td><td class="mono small">' + sizes + '</td><td class="small">' + esc(m.load_rating || '—') +
          '</td><td class="small">' + (m.price_display ? esc(m.price_display) : '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
      html += '<p class="small muted">适配提示：中心孔大于 66.6 mm 必须加铝制变径环；' +
        '球面/锥面座面务必与螺栓匹配；标称载荷应 ≥ 单轮需求的 1.2 倍。</p>';
    });
    return result(html, [['fitment.html#brands', '品牌轮毂数据库']]);
  }

  /* ---- 推荐方案 ---- */
  function answerPlan(p) {
    var plans = (D.plans || []).filter(function (x) {
      return !p.chasses.length || p.chasses.indexOf(x.chassis) !== -1;
    });
    if (!plans.length) plans = D.plans || [];

    var html = '<p>本站为每代车型准备了三个档位的推荐方案（表格里的外移量是实时算出来的）：</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>代际</th><th>档位</th><th>前轮</th>' +
      '<th>后轮</th><th>外移量</th><th>说明</th></tr></thead><tbody>';
    plans.forEach(function (x) {
      var gen = (D.generations || []).filter(function (g) { return g.chassis === x.chassis; })[0];
      var oemW = WC ? WC.parseWheel(((gen.wheels.oem || [])[0] || {}).size || '7Jx17') : null;
      var calc = null;
      try {
        var bT = WC.parseTyre((x.oemFront || (gen.wheels.oem || [])[0]).tyre);
        var nT = WC.parseTyre(x.front.tyre);
        var pw = WC.parseWheel(x.front.size);
        calc = WC.compare(
          { tyre: bT, rimWidth: (x.oemFront || {}).rimWidth || oemW.width, et: (x.oemFront || {}).et || 0 },
          { tyre: nT, rimWidth: pw.width, et: pw.et }
        );
      } catch (e) { calc = null; }
      html += '<tr><td class="mono">' + esc(x.chassis) + '</td><td><strong>' + esc(x.level) + '</strong></td>' +
        '<td class="mono small">' + esc(x.front.size) + '<br>' + esc(x.front.tyre) + '</td>' +
        '<td class="mono small">' + (x.rear ? esc(x.rear.size) + '<br>' + esc(x.rear.tyre) : '同前轮') + '</td>' +
        '<td class="mono">' + (calc ? (calc.tyreOuterMove > 0 ? '+' : '') + calc.tyreOuterMove + ' mm' : '—') + '</td>' +
        '<td class="small muted">' + esc(x.note || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['fitment.html#plans', '推荐方案'], ['calculator.html', '自己算一遍']]);
  }

  /* ---- 发动机 ---- */
  function answerEngine(p) {
    var found = KB.search(ITEMS, p.q, { cats: ['发动机'], limit: 8 });
    if (p.chasses.length) {
      var strict = found.filter(function (x) { return p.chasses.indexOf(x.chassis) !== -1; });
      if (strict.length) found = strict;
    }
    if (!found.length) {
      found = ITEMS.filter(function (x) { return x.type === 'engine' && (!p.chasses.length || p.chasses.indexOf(x.chassis) !== -1); }).slice(0, 10);
    }
    if (!found.length) return answerSearch(p);

    var html = '<div class="table-scroll"><table><thead><tr><th>代际</th><th>代号</th><th>名称</th>' +
      '<th>排量</th><th>功率</th><th>扭矩</th><th>年份</th></tr></thead><tbody>';
    found.forEach(function (it) {
      var e = it.data;
      html += '<tr><td class="mono">' + esc(it.chassis) + '</td><td class="mono small">' + esc(e.code || '—') +
        '</td><td><strong>' + esc(e.name || '') + '</strong></td><td class="mono">' + esc(e.displacement || '—') +
        '</td><td class="mono">' + (e.power_kw ? e.power_kw + ' kW / ' + Math.round(e.power_kw * 1.36) + ' PS' : '—') +
        '</td><td class="mono">' + (e.torque_nm ? e.torque_nm + ' N·m' : '—') + '</td><td class="mono small">' +
        esc(e.years || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['specs.html#engine', '发动机阵容']]);
  }

  /* ---- 数据缺口 ---- */
  function answerGap() {
    var gaps = (D.dataGaps || []).concat(D.brandNotes || []);
    var html = '<p>本站对拿不到可靠来源的数据一律留空，而不是估算。当前记录在案的缺口：</p><ul>';
    gaps.forEach(function (g) { html += '<li class="small">' + esc(g) + '</li>'; });
    html += '</ul>';
    return result(html, [['parts.html#gaps', '配件页缺口清单'], ['fitment.html#brands', '品牌页缺口说明']]);
  }

  /* ---- 灯光操作 ---- */
  function answerLighting(p) {
    var DC = global.CONTROL_DATA;
    if (!DC || !DC.lighting) return answerSearch(p);
    var L = DC.lighting, n = p.n, html = '';

    // 驻车灯专项（问得最多）
    if (n.indexOf('驻车灯') !== -1 && L.parkingLight) {
      var pl = L.parkingLight;
      html += '<p>' + esc(pl.what) + '</p>';
      html += '<div class="note">' + esc(pl.diffFromPosition) + '</div>';
      html += '<p><strong>怎么只点亮一侧：</strong></p><ol class="small" style="padding-left:20px">' +
        (pl.steps || []).map(function (s) { return '<li style="margin-bottom:6px">' + esc(s) + '</li>'; }).join('') +
        '</ol>';
      html += '<p class="small muted">什么时候用：' + esc(pl.when) + '</p>';
      if (pl.correction) html += '<div class="note bad"><strong>更正一个流传说法：</strong>' + esc(pl.correction) + '</div>';
      if (pl.notes) html += '<div class="note warn">' + esc(pl.notes) + '</div>';
      return result(html, [['controls.html#parking-light-sec', '灯光与按键页']]);
    }

    // 示宽灯：位置 + 与驻车灯的区别
    if (n.indexOf('示宽灯') !== -1 || n.indexOf('小灯') !== -1) {
      var loc = (L.lampsLocation || []).filter(function (x) { return x.name.indexOf('示宽灯') !== -1; })[0];
      html += '<p><strong>示宽灯（小灯）</strong>是灯光开关的一个档位，打开后前部的小灯与尾灯同时点亮（亮度低于刹车灯）。</p>';
      if (loc) html += '<p class="small muted"><strong>装在车身哪里：</strong>' + esc(loc.where) + '</p>';
      if (L.parkingLight) html += '<div class="note">' + esc(L.parkingLight.diffFromPosition) + '</div>';
      html += '<p class="small muted">各代灯光开关位置与档位见下表。</p>';
    }

    // 开关位置与档位
    html += '<p><strong>灯光开关位置与档位（四代对比）</strong></p>';
    html += '<div class="table-scroll"><table><thead><tr><th>代际</th><th>开关形式</th><th>位置</th>' +
      '<th>档位</th></tr></thead><tbody>';
    (L.switchByGen || []).forEach(function (g) {
      html += '<tr><td class="mono">' + esc(g.chassis) + '</td><td class="small">' + esc(g.type) + '</td>' +
        '<td class="small muted">' + esc(g.location) + '</td>' +
        '<td class="small">' + (g.positions || []).map(function (x) { return esc(x.pos); }).join(' / ') + '</td></tr>';
    });
    html += '</tbody></table></div>';

    // 灯具物理位置
    html += '<p class="mt16"><strong>这些灯分别装在车身哪里</strong></p>';
    html += '<div class="table-scroll"><table><thead><tr><th>灯具</th><th>位置</th></tr></thead><tbody>' +
      (L.lampsLocation || []).map(function (l) {
        return '<tr><td class="nowrap"><strong>' + esc(l.name) + '</strong></td><td class="small muted">' + esc(l.where) + '</td></tr>';
      }).join('') + '</tbody></table></div>';

    return result(html, [['controls.html#parking-light-sec', '灯光与按键页（含操作步骤）']]);
  }

  /* ---- 车内按键 ---- */
  function answerControl(p) {
    var DC = global.CONTROL_DATA;
    if (!DC || !DC.controls) return answerSearch(p);

    var areas = DC.controls;
    // 命中具体区域时优先
    var hit = areas.filter(function (a) {
      return p.n.indexOf(KB.normalize(a.area)) !== -1 ||
        (a.items || []).some(function (i) { return p.n.indexOf(KB.normalize(i.name)) !== -1; });
    });
    var show = hit.length ? hit : areas;

    var html = '<p>' + (hit.length ? '匹配到的按键区域：' : '车内按键按区域整理如下：') + '</p>';
    show.forEach(function (a) {
      html += '<p class="mt16"><strong>' + esc(a.area) + '</strong></p>';
      html += '<div class="table-scroll"><table style="min-width:auto"><tbody>' +
        (a.items || []).map(function (i) {
          return '<tr><td class="nowrap" style="width:34%"><strong>' + esc(i.name) + '</strong></td>' +
            '<td class="small muted">' + esc(i.desc) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      if (a.note) html += '<div class="note mt16">' + esc(a.note) + '</div>';
    });
    return result(html, [['controls.html#controls-list-sec', '灯光与按键页']]);
  }

  /* ---- 仪表故障灯 ---- */
  // 故障灯的常见叫法（车主不一定说得出正式名称）
  var WL_ALIAS = {
    oil: ['机油', '油壶', '机油压力'],
    battery: ['电池', '电瓶', '充电', '蓄电池'],
    brake: ['制动', '刹车', '制动系统'],
    coolant: ['水温', '冷却液', '温度过高', '过热', '开锅'],
    airbag: ['气囊', '安全气囊', 'srs'],
    seatbelt: ['安全带'],
    'parking-brake': ['手刹', '驻车制动', '电子手刹'],
    steering: ['转向', '助力', '方向变沉'],
    door: ['车门', '门未关', '尾门', '行李厢未关'],
    engine: ['发动机', 'check engine', '排放', '发动机故障'],
    abs: ['abs', '防抱死'],
    esp: ['esp', '防滑', '稳定程序'],
    tpms: ['胎压', '轮胎气压', 'tpms'],
    'brake-pad': ['刹车片', '制动片', '摩擦片'],
    bulb: ['灯泡', '外部灯'],
    gearbox: ['变速箱', '波箱', '变速器'],
    'glow-plug': ['预热', '预热塞'],
    dpf: ['dpf', '颗粒', '捕集器'],
    adblue: ['adblue', '尿素'],
    fuel: ['燃油', '油量'],
    hybrid: ['48v', '轻混', 'isg', 'bsg'],
    'brake-assist': ['主动制动', '碰撞预警', '辅助不可用']
  };

  function answerWarning(p) {
    var DC = global.CONTROL_DATA;
    if (!DC || !DC.warningLights) return answerSearch(p);
    var CI = global.CarIcons;

    // 先按颜色筛选判断
    var colorWant = null;
    if (p.n.indexOf('红色') !== -1 || p.n.indexOf('红灯') !== -1) colorWant = 'red';
    else if (p.n.indexOf('黄色') !== -1 || p.n.indexOf('橙色') !== -1 || p.n.indexOf('黄灯') !== -1) colorWant = 'amber';

    // 命中具体故障灯：正式名称片段 或 常见叫法
    var hits = DC.warningLights.filter(function (w) {
      var key = KB.normalize(w.name);
      if (p.n.indexOf(key) !== -1) return true;
      var short = key.replace('警告灯', '').replace('指示灯', '').replace('灯', '');
      if (short.length >= 2 && p.n.indexOf(short) !== -1) return true;
      var alias = WL_ALIAS[w.id] || [];
      return alias.some(function (a) { return p.n.indexOf(a) !== -1; });
    });
    // 如果用户明确说了颜色，就把颜色不符的命中项排除掉
    // （否则「红色故障灯有哪些」会因为「发动机故障灯」的别名含「发动机故障」而只返回那一条）
    if (colorWant) hits = hits.filter(function (w) { return w.color === colorWant; });

    // 颜色分级专项
    if (p.n.indexOf('颜色') !== -1 || p.n.indexOf('分级') !== -1) {
      var h0 = '<p>故障灯按颜色分级，<strong>颜色决定处置优先级</strong>：</p><div class="table-scroll">' +
        '<table><thead><tr><th>颜色</th><th>含义</th><th>该怎么做</th></tr></thead><tbody>' +
        (DC.colorRule || []).map(function (c) {
          return '<tr><td><strong>' + esc(c.name) + '</strong></td><td class="small">' + esc(c.meaning) +
            '</td><td class="small muted">' + esc(c.action) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      return result(h0, [['controls.html#warning-lights', '故障灯速查']]);
    }

    var list;
    if (hits.length) list = hits.slice(0, 6);
    else if (colorWant) list = DC.warningLights.filter(function (w) { return w.color === colorWant; });
    else list = DC.warningLights.filter(function (w) { return w.color === 'red' || w.color === 'amber'; }).slice(0, 10);

    var html = '<p>' + (hits.length ? '找到这个故障灯：' : (colorWant ? '该颜色的故障灯：' : '本站收录的仪表警告灯（先列红色与黄色）：')) + '</p>';
    list.forEach(function (w) {
      var cmap = { red: 'bad', amber: 'warn', green: 'ok', blue: 'info', gray: 'gray' };
      var cname = { red: '红色', amber: '黄色', green: '绿色', blue: '蓝色', gray: '其他' };
      html += '<div class="wl-card wl-' + esc(w.color) + '">' +
        '<div class="wl-head">' +
        (CI ? '<div class="wl-icon">' + CI.icon(w.id, w.color, 44) + '</div>' : '') +
        '<div class="wl-title"><h3>' + esc(w.name) + '</h3>' +
        '<div class="wl-badges"><span class="badge ' + cmap[w.color] + '">' + cname[w.color] + '</span>' +
        '<span class="badge gray">' + esc(w.canDrive) + '</span></div></div></div>' +
        '<p class="small">' + esc(w.meaning) + '</p>' +
        '<div class="grid cols-2">' +
        '<div><h4>可能原因</h4><ul class="small muted">' +
        (w.causes || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div>' +
        '<div><h4>怎么处理</h4><ol class="small muted">' +
        (w.actions || []).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></div>' +
        '</div>' +
        (w.cost
          ? '<div class="stat mt16" style="border-left-color:var(--warn)"><div class="k">维修参考价</div><div class="v small">' +
            (Array.isArray(w.cost) ? w.cost[0] + ' – ' + w.cost[1] + ' 元' : esc(w.cost)) + '</div></div>'
          : '') +
        (w.note ? '<div class="note mt16"><strong>补充：</strong>' + esc(w.note) + '</div>' : '') +
        '</div>';
    });
    return result(html, [['controls.html#warning-lights', '故障灯速查（可按颜色筛选）']]);
  }

  /* ---- 通用检索兜底 ---- */
  function answerSearch(p) {
    var found = KB.search(ITEMS, p.q, { limit: 6 });
    if (!found.length) {
      return result('<p>我没有在这份数据库里找到和「' + esc(p.q) + '」直接相关的内容。</p>' +
        '<p class="small muted">可以试着换个说法，或者问这些：</p>' +
        '<ul class="small">' +
        '<li>S205 的轴距是多少？</li>' +
        '<li>225/50R17 换成 245/40R18 会怎样？</li>' +
        '<li>W204 有什么通病？</li>' +
        '<li>W205 用什么机油？</li>' +
        '<li>BBS 有哪些适配的轮毂？</li>' +
        '<li>刹车片多少钱？</li></ul>', []);
    }

    var html = '<p>找到 ' + found.length + ' 条相关内容：</p>';
    found.forEach(function (it) {
      var t = it.text.length > 220 ? it.text.slice(0, 220) + '…' : it.text;
      html += '<div class="card mt16"><div class="card-meta">' + esc(it.cat) +
        (it.chassis ? ' · ' + esc(it.chassis) : '') + '</div>' +
        '<h3 class="mt0" style="font-size:15px">' + esc(it.title) + '</h3>' +
        '<p class="small muted mb0">' + esc(t) + '</p>' +
        '<p class="mb0 mt16">' + srcLink(it.link, '查看原文') + '</p></div>';
    });
    return result(html, []);
  }

  /* ------------------------------------------------------ 主入口 --- */
  function respond(query) {
    var p = parse(query);
    switch (p.intent) {
      case 'calc': return answerCalc(p);
      case 'compare': return answerCompare(p);
      case 'issue': return answerIssue(p);
      case 'oil': return answerOil(p);
      case 'interval': return answerInterval(p);
      case 'price': return answerPrice(p);
      case 'brand': return answerBrand(p);
      case 'plan': return answerPlan(p);
      case 'engine': return answerEngine(p);
      case 'gap': return answerGap(p);
      case 'warning': return answerWarning(p);
      case 'lighting': return answerLighting(p);
      case 'control': return answerControl(p);
      case 'wheel': return answerWheel(p);
      case 'body': return answerBody(p);
      default: return answerSearch(p);
    }
  }

  /* ------------------------------------------------------ LLM 模式 --- */
  var CFG_KEY = 'dsh-c-wagon-llm-cfg';

  function loadCfg() {
    try { return JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveCfg(c) {
    try { localStorage.setItem(CFG_KEY, JSON.stringify(c)); } catch (e) {}
  }

  function buildContext(query) {
    var found = KB.search(ITEMS, query, { limit: 10 });
    if (!found.length) return { ctx: '（本次未在站内检索到相关条目）', items: [] };
    return {
      ctx: found.map(function (it, i) {
        return '[' + (i + 1) + '] 分类：' + it.cat + (it.chassis ? '｜车型：' + it.chassis : '') +
          '\n标题：' + it.title + '\n内容：' + it.text;
      }).join('\n\n'),
      items: found
    };
  }

  function askLLM(query, cfg) {
    var built = buildContext(query);
    var sys = '你是「奔驰 C 级旅行车数据库」网站的站内助手，服务对象是奔驰 C 级旅行车（S203/S204/S205/S206）车主。\n' +
      '规则：\n' +
      '1. 只依据下面提供的站内资料回答，不要引入资料之外的事实，也不要凭记忆补充数字。\n' +
      '2. 如果资料里没有答案，直接说「站内没有这项数据」，并建议可以查哪个页面。\n' +
      '3. 回答用简体中文，简洁专业；涉及数字时保留原始单位与精度。\n' +
      '4. 不要编造价格、扭矩、ET 值等具体数字。\n\n' +
      '=== 站内资料 ===\n' + built.ctx + '\n=== 资料结束 ===';

    return fetch(cfg.base.replace(/\/+$/, '') + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'system', content: sys }, { role: 'user', content: query }],
        temperature: 0.2,
        max_tokens: 1200
      })
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error('HTTP ' + r.status + '：' + t.slice(0, 200)); });
      return r.json();
    }).then(function (j) {
      var txt = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
      if (!txt) throw new Error('返回内容为空');
      return { text: txt, items: built.items };
    });
  }

  /* ------------------------------------------------------------ UI --- */
  var logEl, inputEl, settingsEl;

  function addMsg(role, html, links, meta) {
    var wrap = document.createElement('div');
    wrap.className = 'msg msg-' + role;
    var av = role === 'user' ? '你' : 'AI';
    wrap.innerHTML =
      '<div class="msg-av">' + av + '</div>' +
      '<div class="msg-body">' + html +
      (links && links.length ? '<div class="msg-links">' + links.map(function (l) {
        return '<a href="' + l[0] + '">' + esc(l[1]) + ' →</a>';
      }).join('') + '</div>' : '') +
      (meta ? '<div class="msg-meta">' + esc(meta) + '</div>' : '') +
      '</div>';
    logEl.appendChild(wrap);
    logEl.scrollTop = logEl.scrollHeight;
    return wrap;
  }

  function addTyping() {
    var wrap = document.createElement('div');
    wrap.className = 'msg msg-ai';
    wrap.innerHTML = '<div class="msg-av">AI</div><div class="msg-body"><span class="dot"></span>' +
      '<span class="dot"></span><span class="dot"></span></div>';
    logEl.appendChild(wrap);
    logEl.scrollTop = logEl.scrollHeight;
    return wrap;
  }

  function handle(query) {
    if (!query || !query.trim()) return;
    query = query.trim();
    window.__lastQuery = query;
    addMsg('user', '<p class="mb0">' + esc(query) + '</p>');

    var cfg = loadCfg();
    var useLLM = cfg.enabled && cfg.key && cfg.model && cfg.base;

    if (!useLLM) {
      var r = respond(query);
      setTimeout(function () { addMsg('ai', r.html, r.links, '离线检索模式 · 答案全部来自本站数据'); }, 120);
      return;
    }

    var typing = addTyping();
    askLLM(query, cfg).then(function (out) {
      typing.remove();
      addMsg('ai', '<p class="mb0" style="white-space:pre-wrap">' + esc(out.text) + '</p>',
        out.items.slice(0, 4).map(function (it) { return [it.link, it.title]; }),
        'LLM 模式（' + cfg.model + '）· 已附带 ' + out.items.length + ' 条站内资料');
    }).catch(function (err) {
      typing.remove();
      var r = respond(query);
      addMsg('ai', '<div class="note bad mb0"><strong>LLM 调用失败，已回落到离线检索：</strong>' +
        esc(err.message) + '<br><span class="small">常见原因：API key 无效、余额不足、' +
        '或该服务不允许浏览器直接调用（CORS）。</span></div>' + r.html, r.links, '离线检索模式');
    });
  }

  /* ------------------------------------------------------ 初始化 --- */
  ready(function () {
    if (!KB || !D.generations) return;
    ITEMS = KB.build(D);

    logEl = document.getElementById('chat-log');
    inputEl = document.getElementById('chat-input');
    settingsEl = document.getElementById('llm-settings');
    if (!logEl || !inputEl) return;

    // 欢迎语
    addMsg('ai',
      '<p>你好。我是这个数据库的站内助手，可以回答关于 <strong>S203 / S204 / S205 / S206</strong> ' +
      '四代奔驰 C 级旅行车的任何问题——车身尺寸、轮毂 ET、改装能不能装、通病、保养周期、机油与配件价格。</p>' +
      '<p class="mb0 small muted">默认使用<strong>离线检索模式</strong>：答案只来自本站已核实的数据，' +
      '不需要联网也不需要 key。你也可以在右上角填入自己的 API key，切换成大模型对话模式。</p>',
      [], '已索引 ' + ITEMS.length + ' 条知识条目');

    // 推荐问题
    Array.prototype.forEach.call(document.querySelectorAll('[data-ask]'), function (btn) {
      btn.addEventListener('click', function () { handle(btn.getAttribute('data-ask')); });
    });

    // 发送
    document.getElementById('chat-send').addEventListener('click', function () {
      var v = inputEl.value;
      inputEl.value = '';
      handle(v);
    });
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        var v = inputEl.value;
        inputEl.value = '';
        handle(v);
      }
    });

    // 设置面板
    var cfg = loadCfg();
    var f = {
      enabled: document.getElementById('llm-enabled'),
      base: document.getElementById('llm-base'),
      key: document.getElementById('llm-key'),
      model: document.getElementById('llm-model')
    };
    if (f.enabled) {
      f.enabled.checked = !!cfg.enabled;
      f.base.value = cfg.base || 'https://api.deepseek.com/v1';
      f.key.value = cfg.key || '';
      f.model.value = cfg.model || 'deepseek-chat';
    }
    var toggle = document.getElementById('llm-toggle');
    if (toggle && settingsEl) {
      toggle.addEventListener('click', function () { settingsEl.classList.toggle('hidden'); });
      if (/[?&]settings=1/.test(location.search || '')) settingsEl.classList.remove('hidden');
    }
    var saveBtn = document.getElementById('llm-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        saveCfg({
          enabled: f.enabled.checked,
          base: f.base.value.trim(),
          key: f.key.value.trim(),
          model: f.model.value.trim()
        });
        addMsg('ai', '<p class="mb0">设置已保存到本机浏览器（localStorage）。' +
          (f.enabled.checked ? '下次提问将使用大模型模式。' : '当前使用离线检索模式。') + '</p>', []);
      });
    }
    var copyBtn = document.getElementById('llm-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var q = inputEl.value.trim() || (window.__lastQuery || '');
        if (!q) { addMsg('ai', '<p class="mb0">请先在输入框里写下你的问题。</p>', []); return; }
        var built = buildContext(q);
        var text = '请根据以下资料回答问题，资料之外的内容不要编造。\n\n' + built.ctx +
          '\n\n=== 我的问题 ===\n' + q;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            addMsg('ai', '<p class="mb0">已复制「资料 + 问题」到剪贴板（' + built.items.length +
              ' 条站内资料）。粘贴到任意 AI 对话框即可。</p>', []);
          });
        } else {
          addMsg('ai', '<p class="mb0">当前浏览器不支持自动复制，请手动复制。</p>', []);
        }
      });
    }

    // 记录最后一次提问，供「复制资料」用
    inputEl.addEventListener('change', function () { window.__lastQuery = inputEl.value.trim(); });

    // 支持 ?q=问题 直接提问（便于把某个问题分享给别人）
    var m = (location.search || '').match(/[?&]q=([^&]+)/);
    if (m) {
      var q = decodeURIComponent(m[1].replace(/\+/g, ' '));
      if (q) setTimeout(function () { handle(q); }, 200);
    }
  });

  global.Assistant = { respond: respond, parse: parse, items: function () { return ITEMS; } };
})(window);
