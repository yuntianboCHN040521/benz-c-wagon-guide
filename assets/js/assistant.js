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

  /* -------------------------------------------------------- i18n --- */
  // 界面文案与回答模板统一走字典（lang/p-assistant.zh.js、lang/p-assistant.en.js）。
  // I18N 未就绪（例如 Node 自检环境）或字典缺键时回落到中文原文，
  // 保证改造前后行为完全一致。逻辑（检索、计算、fetch、localStorage）不变。
  function t(key, fallback) {
    if (global.I18N && typeof global.I18N.t === 'function') return global.I18N.t(key, fallback);
    return fallback !== undefined ? fallback : key;
  }

  /** 带 {var} 插值的翻译；vars 的值由调用方负责（含 HTML 的已转义） */
  function tf(key, fallback, vars) {
    var s = t(key, fallback);
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (whole, name) {
      return vars[name] !== undefined ? vars[name] : whole;
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function num(v, unit) {
    if (v === null || v === undefined || v === '') return '<span class="faint">' + esc(t('pg.assistant.common.unverified', '未核实')) + '</span>';
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
    return '<a class="src" href="' + link + '">' + esc(label || t('pg.assistant.common.detail', '查看详情')) + ' →</a>';
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
      html += '<p>' + tf('pg.assistant.body.single',
        '<strong>{chassis}</strong> 的{field}是 {value}。',
        { chassis: esc(g.chassis), field: esc(f[1]), value: num(g.body[f[0]], f[2]) }) + '</p>';
    } else {
      var who = p.chasses.length
        ? esc(p.chasses.join(' / ')) + t('pg.assistant.body.ofChassis', ' 的')
        : t('pg.assistant.body.allFour', '四代车型的');
      var what = fields.length === 1 ? esc(fields[0][1]) : t('pg.assistant.body.allDims', '车身尺寸');
      html += '<p>' + who + what + t('pg.assistant.body.tableHead', '如下：') + '</p>';
    }

    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.common.item', '项目')) + '</th>' +
      gens.map(function (g) { return '<th>' + esc(g.chassis) + '</th>'; }).join('') + '</tr></thead><tbody>';
    fields.forEach(function (f) {
      html += '<tr><td>' + esc(f[1]) + '</td>' + gens.map(function (g) {
        return '<td>' + num(g.body[f[0]], f[2]) + '</td>';
      }).join('') + '</tr>';
    });
    html += '</tbody></table></div>';

    return result(html, [['specs.html#dim', t('pg.assistant.link.specs', '车身数据页')]]);
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
    html += '<p>' + t('pg.assistant.wheel.common',
      '<strong>通用安装参数</strong>（四代一致的部分）：PCD <span class="mono">5×112</span>、' +
      '中心孔 <span class="mono">66.6 mm</span>、球面 R14 螺栓座。') + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.wheel.th.gen', '代际')) + '</th><th>' +
      esc(t('pg.assistant.wheel.th.bolt', '螺栓')) + '</th><th>' +
      esc(t('pg.assistant.wheel.th.etRange', '原厂 ET 范围')) + '</th><th>' +
      esc(t('pg.assistant.wheel.th.oem', '典型原厂配置')) + '</th></tr></thead><tbody>';
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
        html += '<p class="mt16">' +
          tf('pg.assistant.wheel.oemList', '<strong>{chassis}</strong> 的原厂轮毂清单：', { chassis: esc(g.chassis) }) + '</p>';
        html += '<div class="table-scroll"><table><thead><tr><th>' +
          esc(t('pg.assistant.wheel.th.size', '规格')) + '</th><th>ET</th><th>' +
          esc(t('pg.assistant.wheel.th.tyre', '轮胎')) + '</th><th>' +
          esc(t('pg.assistant.wheel.th.spacing', '背距/前距 (mm)')) + '</th><th>' +
          esc(t('pg.assistant.wheel.th.fit', '适用')) + '</th></tr></thead><tbody>';
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
    return result(html, [['wheels.html#install', t('pg.assistant.link.wheels', '轮毂数据页')]]);
  }

  /* ---- 改装计算 ---- */
  function answerCalc(p) {
    if (!WC) return result('<p>' + esc(t('pg.assistant.calc.noEngine', '计算引擎未加载。')) + '</p>');

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
      note += tf('pg.assistant.calc.noteTyre', '（你没给轮胎规格，按辋宽推算为 {tyre}，仅供参考）',
        { tyre: tw + '/' + aspect + 'R' + w0.rim });
    }
    if (!target) return answerWheel(p);

    if (!base) {
      base = { tyre: oemTyre, rimWidth: oemW.width, et: oemEt };
    } else {
      base.tyre = WC.parseTyre(base.tyre.raw || (base.tyre.width + '/' + base.tyre.aspect + 'R' + base.tyre.rim)) || base.tyre;
      if (base.rimWidth === null || base.et === null) {
        base.rimWidth = oemW.width; base.et = oemEt;
        note += tf('pg.assistant.calc.noteBase', '（对比基准轮辋按 {size} ET{et} 计）',
          { size: oem.size, et: oemEt });
      }
    }
    if (target.rimWidth === null || target.rimWidth === undefined) {
      target.rimWidth = oemW.width;
      note += tf('pg.assistant.calc.noteWidth', '（目标轮辋宽度未给出，按原厂 {w}J 计）', { w: oemW.width });
    }
    if (target.et === null || target.et === undefined) {
      target.et = oemEt;
      note += tf('pg.assistant.calc.noteEt', '（目标 ET 未给出，按原厂 ET{et} 计）', { et: oemEt });
    }

    var cmp, grade;
    try {
      cmp = WC.compare(base, target);
      grade = WC.grade(cmp, { rimWidthInch: target.rimWidth, tyreWidth: target.tyre.width });
    } catch (e) {
      return result('<p>' + t('pg.assistant.calc.parseFail',
        '这两个规格我没法解析，请按 <span class="mono">225/50R17</span> 或 ' +
        '<span class="mono">8.5Jx19 ET45</span> 这样的格式提供。') + '</p>');
    }

    var sign = function (v) { return (v > 0 ? '+' : '') + v; };
    var html = '<p>' + tf('pg.assistant.calc.baseline',
      '以 <strong>{chassis}</strong> 原厂 <span class="mono">{oem}</span> 为基准：',
      { chassis: esc(gen.chassis), oem: esc(oem.size) + ' ET' + esc(oem.et) + ' + ' + esc(oem.tyre) }) +
      (note ? '<span class="small faint">' + esc(note) + '</span>' : '') + '</p>';

    html += '<div class="result-box">' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.grade', '综合结论')) + '</span><span class="badge ' + grade.cls + '">' + grade.label + '</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.diameter', '轮胎外径')) + '</span><span class="val">' + cmp.oem.tyreGeo.diameter + ' → ' + cmp.target.tyreGeo.diameter + ' mm</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.diameterDelta', '外径变化')) + '</span><span class="val ' + (Math.abs(cmp.diameterPct) <= 2 ? 'ok' : Math.abs(cmp.diameterPct) <= 3 ? 'warn' : 'bad') + '">' + tf('pg.assistant.calc.valDelta', '{mm} mm（{pct}%）', { mm: sign(cmp.diameterDelta), pct: sign(cmp.diameterPct) }) + '</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.rideHeight', '离地间隙变化')) + '</span><span class="val">' + sign(cmp.rideHeightDelta) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.outer', '胎壁外移（估算）')) + '</span><span class="val ' + (cmp.tyreOuterMove <= 6 ? 'ok' : cmp.tyreOuterMove <= 12 ? 'warn' : 'bad') + '">' + sign(cmp.tyreOuterMove) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.inner', '胎壁内移（估算）')) + '</span><span class="val ' + (cmp.tyreInnerMove >= -8 ? 'ok' : cmp.tyreInnerMove >= -15 ? 'warn' : 'bad') + '">' + sign(cmp.tyreInnerMove) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.track', '单轴轮距变化')) + '</span><span class="val">' + sign(cmp.trackChangePerAxle) + ' mm</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.speedo', '码表 100 km/h 时真实车速')) + '</span><span class="val ' + (Math.abs(cmp.speedoPct) <= 2 ? 'ok' : 'warn') + '">' + cmp.trueSpeedAt100 + ' km/h</span></div>' +
      '<div class="line"><span class="lbl">' + esc(t('pg.assistant.calc.lbl.rimOuter', '轮辋外缘外移')) + '</span><span class="val">' + sign(cmp.rimOuterMove) + ' mm</span></div>' +
      '</div>';

    html += '<p class="mt16 small muted">' + esc(t('pg.assistant.calc.checkTitle', '逐项检查：')) + '</p><div class="result-box">' +
      grade.issues.map(function (i) {
        var cls = i.t === 'ok' ? 'ok' : (i.t === 'warn' ? 'warn' : 'bad');
        return '<div class="line"><span class="lbl" style="flex:1">' + esc(i.m) + '</span><span class="badge ' + cls + '">' +
          (i.t === 'ok' ? esc(t('pg.assistant.calc.grade.ok', '通过')) : i.t === 'warn' ? esc(t('pg.assistant.calc.grade.warn', '注意')) : esc(t('pg.assistant.calc.grade.bad', '风险'))) + '</span></div>';
      }).join('') + '</div>';

    return result(html, [['calculator.html', t('pg.assistant.link.calculator', '计算器（可调更多参数）')]]);
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
    var html = '<p>' + tf('pg.assistant.compare.title',
      '<strong>{a}</strong> 与 <strong>{b}</strong> 对比：',
      { a: esc(a.chassis), b: esc(b.chassis) }) + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.common.item', '项目')) + '</th><th>' + esc(a.chassis) + '</th><th>' +
      esc(b.chassis) + '</th><th>' + esc(t('pg.assistant.compare.th.diff', '差值')) + '</th></tr></thead><tbody>';
    fields.forEach(function (f) {
      var va = a.body[f[0]], vb = b.body[f[0]];
      var diff = '—';
      if (Array.isArray(va) && Array.isArray(vb)) {
        diff = tf('pg.assistant.compare.range', '上限 {hi} / 下限 {lo}', { hi: (vb[1] - va[1]), lo: (vb[0] - va[0]) });
      } else if (typeof va === 'number' && typeof vb === 'number') diff = (vb - va > 0 ? '+' : '') + Math.round((vb - va) * 100) / 100 + (f[2] ? ' ' + f[2] : '');
      html += '<tr><td>' + esc(f[1]) + '</td><td>' + num(va, f[2]) + '</td><td>' + num(vb, f[2]) +
        '</td><td class="mono">' + esc(diff) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['specs.html#dim', t('pg.assistant.link.specs', '车身数据页')]]);
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

    var html = '<p>' + (total > found.length
      ? tf('pg.assistant.issue.foundMore', '找到 <strong>{n}</strong> 条通病记录，下面显示前 {shown} 条：',
        { n: total, shown: found.length })
      : tf('pg.assistant.issue.found', '找到 <strong>{n}</strong> 条通病记录：', { n: total })) + '</p>';
    found.forEach(function (it) {
      var d = it.data;
      var costVal = Array.isArray(d.cost_cny) ? d.cost_cny[0] + '–' + d.cost_cny[1] : esc(d.cost_cny);
      var cost = d.cost_cny
        ? '<span class="badge warn">' + tf('pg.assistant.issue.cost', '维修参考 {v} 元', { v: costVal }) + '</span>'
        : '<span class="badge gray">' + esc(t('pg.assistant.issue.noCost', '无可靠价格来源')) + '</span>';
      html += '<div class="card mt16"><div class="card-meta">' +
        esc(it.chassis || t('pg.assistant.common.general', '通用')) + ' · ' +
        esc(t('pg.assistant.issue.tag', '通病')) + '</div>' +
        '<h3 class="mt0" style="font-size:15px">' + esc(d.title) + '</h3>' +
        (d.symptom ? '<p class="small"><span class="badge bad">' + esc(t('pg.assistant.issue.symptom', '现象')) + '</span> ' + esc(d.symptom) + '</p>' : '') +
        (d.cause ? '<p class="small muted"><span class="badge gray">' + esc(t('pg.assistant.issue.cause', '原因')) + '</span> ' + esc(d.cause) + '</p>' : '') +
        (d.fix ? '<p class="small muted"><span class="badge ok">' + esc(t('pg.assistant.issue.fix', '对策')) + '</span> ' + esc(d.fix) + '</p>' : '') +
        '<p class="mb0">' + cost + '</p></div>';
    });
    return result(html, [['guide.html#issues', t('pg.assistant.link.issues', '用车指南 · 通病速查')]]);
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
      html += '<p>' + t('pg.assistant.oil.title', '<strong>用油要求</strong>（认证比粘度更重要）：') + '</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>' +
        esc(t('pg.assistant.oil.th.engine', '发动机')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.models', '搭载车型')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.cert', '认证')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.viscosity', '粘度')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.capacity', '容量')) + '</th></tr></thead><tbody>';
      eo.forEach(function (e) {
        html += '<tr><td class="mono">' + esc(e.engine) + '</td><td class="small">' + esc(e.models || '') +
          '</td><td class="mono">' + esc(e.cert) + '</td><td class="mono">' + esc(e.viscosity) + '</td>' +
          '<td class="mono">' + (e.capacity_l ? e.capacity_l + ' L' : esc(t('pg.assistant.common.unverified', '未核实'))) + '</td></tr>';
      });
      html += '</tbody></table></div>';
      var cap = eo.filter(function (e) { return e.capacity_l; });
      if (cap.length) {
        html += '<p class="small muted mt16">' + esc(t('pg.assistant.oil.capTitle', '容量说明：')) +
          cap.slice(0, 3).map(function (e) {
            return tf('pg.assistant.oil.capItem', '{engine} {cap} L（{note}）',
              { engine: esc(e.engine), cap: e.capacity_l, note: esc(e.note || '') });
          }).join(t('pg.assistant.oil.capJoin', '；')) + '</p>';
      }
    }

    // 机油产品价格
    var oils = (D.oils || []).slice(0, 6);
    if (oils.length && p.n.indexOf('价格') !== -1 || p.n.indexOf('多少钱') !== -1 || !eo.length) {
      html += '<p class="mt16">' + t('pg.assistant.oil.priceTitle', '<strong>机油参考价格</strong>（中国市场，随渠道与促销波动）：') + '</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>' +
        esc(t('pg.assistant.oil.th.brand', '品牌')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.product', '产品')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.viscosity', '粘度')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.cert', '认证')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.price', '参考价')) + '</th><th>' +
        esc(t('pg.assistant.oil.th.unitPrice', '单价')) + '</th></tr></thead><tbody>';
      oils.forEach(function (o) {
        html += '<tr><td>' + esc(o.brand) + '</td><td class="small">' + esc(o.product) + '</td>' +
          '<td class="mono">' + esc(o.viscosity) + '</td><td class="small">' + esc(o.cert) + '</td>' +
          '<td class="mono">' + (o.price_cny ? tf('pg.assistant.common.yuan', '{n} 元', { n: o.price_cny }) : '—') + '</td>' +
          '<td class="mono">' + (o.price_per_l ? tf('pg.assistant.common.perL', '{n} 元/L', { n: o.price_per_l }) : '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
    }

    if (!html) return answerSearch(p);
    return result(html, [['guide.html#oil', t('pg.assistant.link.oilCert', '机油认证体系')], ['parts.html#oil', t('pg.assistant.link.oilPrice', '机油价格对比')]]);
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

    var html = '<p>' + esc(show.length < all.length
      ? t('pg.assistant.iv.matched', '匹配到的保养项目：')
      : t('pg.assistant.iv.all', '本站收录的保养周期总表：')) + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.iv.th.item', '项目')) + '</th><th>' +
      esc(t('pg.assistant.iv.th.interval', '周期')) + '</th><th>' +
      esc(t('pg.assistant.iv.th.price', '参考价')) + '</th><th>' +
      esc(t('pg.assistant.iv.th.note', '说明')) + '</th></tr></thead><tbody>';
    show.slice(0, 16).forEach(function (i) {
      html += '<tr><td><strong>' + esc(i.item) + '</strong></td><td class="mono nowrap">' + esc(i.interval || '—') +
        '</td><td class="mono">' + (i.price_cny ? tf('pg.assistant.common.yuan', '{n} 元',
          { n: Array.isArray(i.price_cny) ? i.price_cny.join('–') : i.price_cny }) : '—') +
        '</td><td class="small muted">' + esc(i.note || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['guide.html#system', t('pg.assistant.link.interval', '保养体系')], ['parts.html#labour', t('pg.assistant.link.labour', '工时费')]]);
  }

  /* ---- 价格 ---- */
  function answerPrice(p) {
    var found = KB.search(ITEMS, p.q, { limit: 8 })
      .filter(function (x) { return ['oil', 'filter', 'spark', 'brake', 'atf', 'brakeFluid', 'labour', 'interval', 'brand'].indexOf(x.type) !== -1; });
    if (!found.length) found = KB.search(ITEMS, p.q, { limit: 6 });
    if (!found.length) return answerSearch(p);

    var html = '<p>' + tf('pg.assistant.price.title', '与「{q}」相关的价格信息：', { q: esc(p.q) }) +
      '</p><div class="table-scroll"><table>' +
      '<thead><tr><th>' + esc(t('pg.assistant.price.th.cat', '类别')) + '</th><th>' +
      esc(t('pg.assistant.price.th.item', '项目')) + '</th><th>' +
      esc(t('pg.assistant.price.th.detail', '明细')) + '</th><th>' +
      esc(t('pg.assistant.price.th.source', '来源页')) + '</th></tr></thead><tbody>';
    found.forEach(function (it) {
      var detail = it.text.length > 160 ? it.text.slice(0, 160) + '…' : it.text;
      html += '<tr><td class="nowrap">' + esc(it.cat) + '</td><td><strong>' + esc(it.title) + '</strong></td>' +
        '<td class="small muted">' + esc(detail) + '</td>' +
        '<td>' + srcLink(it.link, t('pg.assistant.common.view', '查看')) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<div class="note mt16">' + t('pg.assistant.price.note',
      '<strong>价格性质：</strong>本站所有价格均为参考区间，' +
      '随地区、渠道与时间波动明显（通常 ±30%），部分为历史促销价，不是报价单。') + '</div>';
    return result(html, [['parts.html', t('pg.assistant.link.parts', '配件与机油页')]]);
  }

  /* ---- 品牌 ---- */
  function answerBrand(p) {
    if (p.brand === 'AMG') {
      var amg = D.amgOem || [];
      var html = '<p>' + tf('pg.assistant.brand.amgTitle', '本站收录 <strong>{n}</strong> 款奔驰 AMG 原厂轮毂（含零件号）：',
        { n: amg.length }) + '</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>' +
        esc(t('pg.assistant.brand.th.partNo', '零件号')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.name', '名称')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.size', '规格')) + '</th>' +
        '<th>ET</th><th>' + esc(t('pg.assistant.brand.th.fit', '适用')) + '</th></tr></thead><tbody>';
      amg.forEach(function (a) {
        html += '<tr><td class="mono">' + esc(a.part_no || '—') + '</td><td class="small">' + esc(a.name || '') +
          '</td><td class="mono">' + esc(a.size || '—') + '</td><td class="mono">' +
          (a.et !== null && a.et !== undefined ? a.et : '—') + '</td><td class="small muted">' + esc(a.models || '') + '</td></tr>';
      });
      return result(html + '</tbody></table></div>', [['fitment.html#amg', t('pg.assistant.link.amg', 'AMG 原厂轮毂')]]);
    }

    var brand = (D.brands || []).filter(function (b) { return b.brand === p.brand; })[0];
    var found = brand ? [{ data: { brand: brand, model: null } }] : KB.search(ITEMS, p.q, { cats: ['品牌轮毂'], limit: 6 });
    if (!found.length) return answerSearch(p);

    var html = '';
    found.forEach(function (it) {
      var b = it.data.brand;
      html += '<p>' + tf('pg.assistant.brand.summary', '<strong>{brand}</strong> · {country} —— {positioning}',
        { brand: esc(b.brand), country: esc(b.country || ''), positioning: esc(b.positioning || '') }) + '</p>';
      html += '<div class="table-scroll"><table><thead><tr><th>' +
        esc(t('pg.assistant.brand.th.model', '型号')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.process', '工艺')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.sizes', '5×112 规格（含 ET / 中心孔）')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.load', '标称载荷')) + '</th><th>' +
        esc(t('pg.assistant.brand.th.price', '参考价（单只）')) + '</th></tr></thead><tbody>';
      (b.models || []).forEach(function (m) {
        var sizes = (m.sizes || []).length
          ? m.sizes.map(function (s) {
            return s.size + (s.et ? ' ET' + (Array.isArray(s.et) ? s.et.join('/') : s.et) : '') +
              (s.cb_mm ? ' CB' + s.cb_mm : '') + (s.weight_kg ? ' ' + s.weight_kg + 'kg' : '');
          }).join('<br>')
          : '<span class="faint">' + esc(t('pg.assistant.brand.noSizes', '未取得 5×112 数据')) + '</span>';
        html += '<tr><td><strong>' + esc(m.name) + '</strong></td><td class="small muted">' + esc(m.process || '—') +
          '</td><td class="mono small">' + sizes + '</td><td class="small">' + esc(m.load_rating || '—') +
          '</td><td class="small">' + (m.price_display ? esc(m.price_display) : '—') + '</td></tr>';
      });
      html += '</tbody></table></div>';
      html += '<p class="small muted">' + esc(t('pg.assistant.brand.tip',
        '适配提示：中心孔大于 66.6 mm 必须加铝制变径环；' +
        '球面/锥面座面务必与螺栓匹配；标称载荷应 ≥ 单轮需求的 1.2 倍。')) + '</p>';
    });
    return result(html, [['fitment.html#brands', t('pg.assistant.link.brands', '品牌轮毂数据库')]]);
  }

  /* ---- 推荐方案 ---- */
  function answerPlan(p) {
    var plans = (D.plans || []).filter(function (x) {
      return !p.chasses.length || p.chasses.indexOf(x.chassis) !== -1;
    });
    if (!plans.length) plans = D.plans || [];

    var html = '<p>' + esc(t('pg.assistant.plan.title',
      '本站为每代车型准备了三个档位的推荐方案（表格里的外移量是实时算出来的）：')) + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.plan.th.gen', '代际')) + '</th><th>' +
      esc(t('pg.assistant.plan.th.level', '档位')) + '</th><th>' +
      esc(t('pg.assistant.plan.th.front', '前轮')) + '</th><th>' +
      esc(t('pg.assistant.plan.th.rear', '后轮')) + '</th><th>' +
      esc(t('pg.assistant.plan.th.offset', '外移量')) + '</th><th>' +
      esc(t('pg.assistant.plan.th.note', '说明')) + '</th></tr></thead><tbody>';
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
        '<td class="mono small">' + (x.rear ? esc(x.rear.size) + '<br>' + esc(x.rear.tyre) : esc(t('pg.assistant.plan.sameRear', '同前轮'))) + '</td>' +
        '<td class="mono">' + (calc ? (calc.tyreOuterMove > 0 ? '+' : '') + calc.tyreOuterMove + ' mm' : '—') + '</td>' +
        '<td class="small muted">' + esc(x.note || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['fitment.html#plans', t('pg.assistant.link.plans', '推荐方案')], ['calculator.html', t('pg.assistant.link.calcSelf', '自己算一遍')]]);
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

    var html = '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.engine.th.gen', '代际')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.code', '代号')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.name', '名称')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.displacement', '排量')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.power', '功率')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.torque', '扭矩')) + '</th><th>' +
      esc(t('pg.assistant.engine.th.years', '年份')) + '</th></tr></thead><tbody>';
    found.forEach(function (it) {
      var e = it.data;
      html += '<tr><td class="mono">' + esc(it.chassis) + '</td><td class="mono small">' + esc(e.code || '—') +
        '</td><td><strong>' + esc(e.name || '') + '</strong></td><td class="mono">' + esc(e.displacement || '—') +
        '</td><td class="mono">' + (e.power_kw ? e.power_kw + ' kW / ' + Math.round(e.power_kw * 1.36) + ' PS' : '—') +
        '</td><td class="mono">' + (e.torque_nm ? e.torque_nm + ' N·m' : '—') + '</td><td class="mono small">' +
        esc(e.years || '') + '</td></tr>';
    });
    html += '</tbody></table></div>';
    return result(html, [['specs.html#engine', t('pg.assistant.link.engine', '发动机阵容')]]);
  }

  /* ---- 数据缺口 ---- */
  function answerGap() {
    var gaps = (D.dataGaps || []).concat(D.brandNotes || []);
    var html = '<p>' + esc(t('pg.assistant.gap.title',
      '本站对拿不到可靠来源的数据一律留空，而不是估算。当前记录在案的缺口：')) + '</p><ul>';
    gaps.forEach(function (g) { html += '<li class="small">' + esc(g) + '</li>'; });
    html += '</ul>';
    return result(html, [['parts.html#gaps', t('pg.assistant.link.gapParts', '配件页缺口清单')], ['fitment.html#brands', t('pg.assistant.link.gapBrands', '品牌页缺口说明')]]);
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
      html += '<p>' + t('pg.assistant.light.howOneSide', '<strong>怎么只点亮一侧：</strong>') +
        '</p><ol class="small" style="padding-left:20px">' +
        (pl.steps || []).map(function (s) { return '<li style="margin-bottom:6px">' + esc(s) + '</li>'; }).join('') +
        '</ol>';
      html += '<p class="small muted">' + esc(t('pg.assistant.light.when', '什么时候用：')) + esc(pl.when) + '</p>';
      if (pl.correction) {
        html += '<div class="note bad">' + t('pg.assistant.light.correction', '<strong>更正一个流传说法：</strong>') +
          esc(pl.correction) + '</div>';
      }
      if (pl.notes) html += '<div class="note warn">' + esc(pl.notes) + '</div>';
      return result(html, [['controls.html#parking-light-sec', t('pg.assistant.link.lights', '灯光与按键页')]]);
    }

    // 示宽灯：位置 + 与驻车灯的区别
    if (n.indexOf('示宽灯') !== -1 || n.indexOf('小灯') !== -1) {
      var loc = (L.lampsLocation || []).filter(function (x) { return x.name.indexOf('示宽灯') !== -1; })[0];
      html += '<p>' + t('pg.assistant.light.positionLamp',
        '<strong>示宽灯（小灯）</strong>是灯光开关的一个档位，打开后前部的小灯与尾灯同时点亮（亮度低于刹车灯）。') + '</p>';
      if (loc) {
        html += '<p class="small muted">' + t('pg.assistant.light.whereFitted', '<strong>装在车身哪里：</strong>') +
          esc(loc.where) + '</p>';
      }
      if (L.parkingLight) html += '<div class="note">' + esc(L.parkingLight.diffFromPosition) + '</div>';
      html += '<p class="small muted">' + esc(t('pg.assistant.light.genTableNote', '各代灯光开关位置与档位见下表。')) + '</p>';
    }

    // 开关位置与档位
    html += '<p>' + t('pg.assistant.light.switchTitle', '<strong>灯光开关位置与档位（四代对比）</strong>') + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.light.th.gen', '代际')) + '</th><th>' +
      esc(t('pg.assistant.light.th.type', '开关形式')) + '</th><th>' +
      esc(t('pg.assistant.light.th.location', '位置')) + '</th><th>' +
      esc(t('pg.assistant.light.th.positions', '档位')) + '</th></tr></thead><tbody>';
    (L.switchByGen || []).forEach(function (g) {
      html += '<tr><td class="mono">' + esc(g.chassis) + '</td><td class="small">' + esc(g.type) + '</td>' +
        '<td class="small muted">' + esc(g.location) + '</td>' +
        '<td class="small">' + (g.positions || []).map(function (x) { return esc(x.pos); }).join(' / ') + '</td></tr>';
    });
    html += '</tbody></table></div>';

    // 灯具物理位置
    html += '<p class="mt16">' + t('pg.assistant.light.lampsTitle', '<strong>这些灯分别装在车身哪里</strong>') + '</p>';
    html += '<div class="table-scroll"><table><thead><tr><th>' +
      esc(t('pg.assistant.light.th.lamp', '灯具')) + '</th><th>' +
      esc(t('pg.assistant.light.th.lampLocation', '位置')) + '</th></tr></thead><tbody>' +
      (L.lampsLocation || []).map(function (l) {
        return '<tr><td class="nowrap"><strong>' + esc(l.name) + '</strong></td><td class="small muted">' + esc(l.where) + '</td></tr>';
      }).join('') + '</tbody></table></div>';

    return result(html, [['controls.html#parking-light-sec', t('pg.assistant.link.lightsSteps', '灯光与按键页（含操作步骤）')]]);
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

    var html = '<p>' + esc(hit.length
      ? t('pg.assistant.ctrl.matched', '匹配到的按键区域：')
      : t('pg.assistant.ctrl.all', '车内按键按区域整理如下：')) + '</p>';
    show.forEach(function (a) {
      html += '<p class="mt16"><strong>' + esc(a.area) + '</strong></p>';
      html += '<div class="table-scroll"><table style="min-width:auto"><tbody>' +
        (a.items || []).map(function (i) {
          return '<tr><td class="nowrap" style="width:34%"><strong>' + esc(i.name) + '</strong></td>' +
            '<td class="small muted">' + esc(i.desc) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      if (a.note) html += '<div class="note mt16">' + esc(a.note) + '</div>';
    });
    return result(html, [['controls.html#controls-list-sec', t('pg.assistant.link.controls', '灯光与按键页')]]);
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
      var h0 = '<p>' + t('pg.assistant.wl.colorIntro',
        '故障灯按颜色分级，<strong>颜色决定处置优先级</strong>：') + '</p><div class="table-scroll">' +
        '<table><thead><tr><th>' + esc(t('pg.assistant.wl.th.color', '颜色')) + '</th><th>' +
        esc(t('pg.assistant.wl.th.meaning', '含义')) + '</th><th>' +
        esc(t('pg.assistant.wl.th.action', '该怎么做')) + '</th></tr></thead><tbody>' +
        (DC.colorRule || []).map(function (c) {
          return '<tr><td><strong>' + esc(c.name) + '</strong></td><td class="small">' + esc(c.meaning) +
            '</td><td class="small muted">' + esc(c.action) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      return result(h0, [['controls.html#warning-lights', t('pg.assistant.link.wl', '故障灯速查')]]);
    }

    var list;
    if (hits.length) list = hits.slice(0, 6);
    else if (colorWant) list = DC.warningLights.filter(function (w) { return w.color === colorWant; });
    else list = DC.warningLights.filter(function (w) { return w.color === 'red' || w.color === 'amber'; }).slice(0, 10);

    var html = '<p>' + esc(hits.length
      ? t('pg.assistant.wl.hit', '找到这个故障灯：')
      : (colorWant ? t('pg.assistant.wl.byColor', '该颜色的故障灯：')
        : t('pg.assistant.wl.list', '本站收录的仪表警告灯（先列红色与黄色）：'))) + '</p>';
    list.forEach(function (w) {
      var cmap = { red: 'bad', amber: 'warn', green: 'ok', blue: 'info', gray: 'gray' };
      var cname = {
        red: t('pg.assistant.wl.c.red', '红色'),
        amber: t('pg.assistant.wl.c.amber', '黄色'),
        green: t('pg.assistant.wl.c.green', '绿色'),
        blue: t('pg.assistant.wl.c.blue', '蓝色'),
        gray: t('pg.assistant.wl.c.gray', '其他')
      };
      html += '<div class="wl-card wl-' + esc(w.color) + '">' +
        '<div class="wl-head">' +
        (CI ? '<div class="wl-icon">' + CI.icon(w.id, w.color, 44) + '</div>' : '') +
        '<div class="wl-title"><h3>' + esc(w.name) + '</h3>' +
        '<div class="wl-badges"><span class="badge ' + cmap[w.color] + '">' + esc(cname[w.color]) + '</span>' +
        '<span class="badge gray">' + esc(w.canDrive) + '</span></div></div></div>' +
        '<p class="small">' + esc(w.meaning) + '</p>' +
        '<div class="grid cols-2">' +
        '<div><h4>' + esc(t('pg.assistant.wl.causes', '可能原因')) + '</h4><ul class="small muted">' +
        (w.causes || []).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></div>' +
        '<div><h4>' + esc(t('pg.assistant.wl.actions', '怎么处理')) + '</h4><ol class="small muted">' +
        (w.actions || []).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></div>' +
        '</div>' +
        (w.cost
          ? '<div class="stat mt16" style="border-left-color:var(--warn)"><div class="k">' +
            esc(t('pg.assistant.wl.costLabel', '维修参考价')) + '</div><div class="v small">' +
            (Array.isArray(w.cost)
              ? tf('pg.assistant.wl.costRange', '{a} – {b} 元', { a: w.cost[0], b: w.cost[1] })
              : esc(w.cost)) + '</div></div>'
          : '') +
        (w.note ? '<div class="note mt16">' + t('pg.assistant.wl.note', '<strong>补充：</strong>') + esc(w.note) + '</div>' : '') +
        '</div>';
    });
    return result(html, [['controls.html#warning-lights', t('pg.assistant.link.wlFilter', '故障灯速查（可按颜色筛选）')]]);
  }

  /* ---- 通用检索兜底 ---- */
  function answerSearch(p) {
    var found = KB.search(ITEMS, p.q, { limit: 6 });
    if (!found.length) {
      return result('<p>' + tf('pg.assistant.search.none',
        '我没有在这份数据库里找到和「{q}」直接相关的内容。', { q: esc(p.q) }) + '</p>' +
        '<p class="small muted">' + esc(t('pg.assistant.search.try', '可以试着换个说法，或者问这些：')) + '</p>' +
        '<ul class="small">' +
        '<li>' + esc(t('pg.assistant.search.ex1', 'S205 的轴距是多少？')) + '</li>' +
        '<li>' + esc(t('pg.assistant.search.ex2', '225/50R17 换成 245/40R18 会怎样？')) + '</li>' +
        '<li>' + esc(t('pg.assistant.search.ex3', 'W204 有什么通病？')) + '</li>' +
        '<li>' + esc(t('pg.assistant.search.ex4', 'W205 用什么机油？')) + '</li>' +
        '<li>' + esc(t('pg.assistant.search.ex5', 'BBS 有哪些适配的轮毂？')) + '</li>' +
        '<li>' + esc(t('pg.assistant.search.ex6', '刹车片多少钱？')) + '</li></ul>', []);
    }

    var html = '<p>' + tf('pg.assistant.search.found', '找到 {n} 条相关内容：', { n: found.length }) + '</p>';
    found.forEach(function (it) {
      var excerpt = it.text.length > 220 ? it.text.slice(0, 220) + '…' : it.text;
      html += '<div class="card mt16"><div class="card-meta">' + esc(it.cat) +
        (it.chassis ? ' · ' + esc(it.chassis) : '') + '</div>' +
        '<h3 class="mt0" style="font-size:15px">' + esc(it.title) + '</h3>' +
        '<p class="small muted mb0">' + esc(excerpt) + '</p>' +
        '<p class="mb0 mt16">' + srcLink(it.link, t('pg.assistant.search.view', '查看原文')) + '</p></div>';
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
    if (!found.length) {
      return { ctx: t('pg.assistant.sys.emptyCtx', '（本次未在站内检索到相关条目）'), items: [] };
    }
    return {
      ctx: found.map(function (it, i) {
        return tf('pg.assistant.sys.ctxItem', '[{i}] 分类：{cat}{chassis}\n标题：{title}\n内容：{text}', {
          i: i + 1,
          cat: it.cat,
          chassis: it.chassis
            ? tf('pg.assistant.sys.ctxChassis', '｜车型：{chassis}', { chassis: it.chassis })
            : '',
          title: it.title,
          text: it.text
        });
      }).join('\n\n'),
      items: found
    };
  }

  function askLLM(query, cfg) {
    var built = buildContext(query);
    var sys = t('pg.assistant.sys.rules',
      '你是「奔驰 C 级旅行车数据库」网站的站内助手，服务对象是奔驰 C 级旅行车（S203/S204/S205/S206）车主。\n' +
      '规则：\n' +
      '1. 只依据下面提供的站内资料回答，不要引入资料之外的事实，也不要凭记忆补充数字。\n' +
      '2. 如果资料里没有答案，直接说「站内没有这项数据」，并建议可以查哪个页面。\n' +
      '3. 回答用简体中文，简洁专业；涉及数字时保留原始单位与精度。\n' +
      '4. 不要编造价格、扭矩、ET 值等具体数字。\n\n') +
      t('pg.assistant.sys.ctxStart', '=== 站内资料 ===') + '\n' + built.ctx + '\n' +
      t('pg.assistant.sys.ctxEnd', '=== 资料结束 ===');

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
      if (!r.ok) {
        return r.text().then(function (t2) {
          throw new Error(tf('pg.assistant.ui.httpError', 'HTTP {status}：{body}',
            { status: r.status, body: t2.slice(0, 200) }));
        });
      }
      return r.json();
    }).then(function (j) {
      var txt = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
      if (!txt) throw new Error(t('pg.assistant.ui.emptyResponse', '返回内容为空'));
      return { text: txt, items: built.items };
    });
  }

  /* ------------------------------------------------------------ UI --- */
  var logEl, inputEl, settingsEl;

  function addMsg(role, html, links, meta) {
    var wrap = document.createElement('div');
    wrap.className = 'msg msg-' + role;
    var av = role === 'user' ? t('pg.assistant.ui.me', '你') : t('pg.assistant.ui.ai', 'AI');
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
    wrap.innerHTML = '<div class="msg-av">' + t('pg.assistant.ui.ai', 'AI') + '</div><div class="msg-body"><span class="dot"></span>' +
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
      setTimeout(function () {
        addMsg('ai', r.html, r.links, t('pg.assistant.ui.metaOffline', '离线检索模式 · 答案全部来自本站数据'));
      }, 120);
      return;
    }

    var typing = addTyping();
    askLLM(query, cfg).then(function (out) {
      typing.remove();
      addMsg('ai', '<p class="mb0" style="white-space:pre-wrap">' + esc(out.text) + '</p>',
        out.items.slice(0, 4).map(function (it) { return [it.link, it.title]; }),
        tf('pg.assistant.ui.metaLlm', 'LLM 模式（{model}）· 已附带 {n} 条站内资料',
          { model: cfg.model, n: out.items.length }));
    }).catch(function (err) {
      typing.remove();
      var r = respond(query);
      addMsg('ai', '<div class="note bad mb0">' +
        t('pg.assistant.ui.errTitle', '<strong>LLM 调用失败，已回落到离线检索：</strong>') +
        esc(err.message) + '<br><span class="small">' +
        esc(t('pg.assistant.ui.errHint', '常见原因：API key 无效、余额不足、' +
          '或该服务不允许浏览器直接调用（CORS）。')) + '</span></div>' + r.html,
        r.links, t('pg.assistant.ui.metaOfflineShort', '离线检索模式'));
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
      '<p>' + t('pg.assistant.ui.welcome.p1',
        '你好。我是这个数据库的站内助手，可以回答关于 <strong>S203 / S204 / S205 / S206</strong> ' +
        '四代奔驰 C 级旅行车的任何问题——车身尺寸、轮毂 ET、改装能不能装、通病、保养周期、机油与配件价格。') + '</p>' +
      '<p class="mb0 small muted">' + t('pg.assistant.ui.welcome.p2',
        '默认使用<strong>离线检索模式</strong>：答案只来自本站已核实的数据，' +
        '不需要联网也不需要 key。你也可以在右上角填入自己的 API key，切换成大模型对话模式。') + '</p>',
      [], tf('pg.assistant.ui.indexed', '已索引 {n} 条知识条目', { n: ITEMS.length }));

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
        addMsg('ai', '<p class="mb0">' + esc(f.enabled.checked
          ? t('pg.assistant.ui.savedOn', '设置已保存到本机浏览器（localStorage）。下次提问将使用大模型模式。')
          : t('pg.assistant.ui.savedOff', '设置已保存到本机浏览器（localStorage）。当前使用离线检索模式。')) + '</p>', []);
      });
    }
    var copyBtn = document.getElementById('llm-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var q = inputEl.value.trim() || (window.__lastQuery || '');
        if (!q) {
          addMsg('ai', '<p class="mb0">' + esc(t('pg.assistant.ui.copyNeedQuery', '请先在输入框里写下你的问题。')) + '</p>', []);
          return;
        }
        var built = buildContext(q);
        var text = t('pg.assistant.copy.promptHead', '请根据以下资料回答问题，资料之外的内容不要编造。') +
          '\n\n' + built.ctx +
          '\n\n' + t('pg.assistant.copy.promptQ', '=== 我的问题 ===') + '\n' + q;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            addMsg('ai', '<p class="mb0">' + tf('pg.assistant.ui.copyOk',
              '已复制「资料 + 问题」到剪贴板（{n} 条站内资料）。粘贴到任意 AI 对话框即可。',
              { n: built.items.length }) + '</p>', []);
          });
        } else {
          addMsg('ai', '<p class="mb0">' + esc(t('pg.assistant.ui.copyUnsupported', '当前浏览器不支持自动复制，请手动复制。')) + '</p>', []);
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
