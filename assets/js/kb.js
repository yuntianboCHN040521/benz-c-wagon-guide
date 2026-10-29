/* ==========================================================================
   kb.js —— 站点知识库：把 CDATA 全量数据展平成可检索条目
   --------------------------------------------------------------------------
   设计目标：让助手「问得到本站的任何信息」。
     · 所有条目由数据遍历生成，不手写、不遗漏
     · 每条保留结构化 payload，供回答生成器渲染成表格/数值/列表
     · 提供分词、同义词归一、车型识别与打分排序
   ========================================================================== */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------ 同义词 --- */
  // 每个数组的第一项是归一化后的主词
  var SYN_GROUPS = [
    ['轮毂', '轮圈', '轮辋', '铝圈', '铝毂', '铃', '轮鼓', '毂'],
    ['轮胎', '车胎', '外胎', '胎'],
    ['胎压', '轮胎气压', 'tpms', '胎压监测'],
    ['偏距', 'offset', 'et值', 'et'],
    ['孔距', 'pcd', '孔位', '螺丝孔'],
    ['中心孔', 'cb', '中心孔径'],
    ['螺栓', '螺丝', '轮毂螺栓', '轮螺栓'],
    ['变速箱', '波箱', '变速器', '牙箱'],
    ['发动机', '引擎', '机器', '动力总成'],
    ['机油', '润滑油', '发动机油', '润滑油'],
    ['保养', '维护', '养护', '保养周期'],
    ['通病', '故障', '毛病', '缺陷', '常见问题', '问题', '召回'],
    ['价格', '多少钱', '费用', '价位', '报价', '售价'],
    ['尺寸', '大小', '多大', '多少毫米'],
    ['旅行车', '旅行版', 'estate', 't-modell', '瓦罐', '旅行'],
    ['改装', '升级', '换装', '换轮毂', '换胎'],
    ['后备箱', '行李厢', '行李箱', '尾箱', '后备厢'],
    ['刹车', '制动'],
    ['火花塞', '火嘴'],
    ['滤芯', '滤清器', '过滤器', '三滤'],
    ['整备质量', '车重', '自重', '重量'],
    ['轴距', '轴矩'],
    ['轮距', '轮矩'],
    ['燃油滤', '汽油滤', '柴油滤'],
    ['空调滤', '花粉滤'],
    ['空气滤', '空滤'],
    ['蓄电池', '电瓶'],
    ['减震器', '避震', '减振器', '避震器'],
    ['千斤顶', '工具'],
    ['适配', '匹配', '兼容', '能装', '装得下', '可不可以装'],
    // 这一组必须存在且先于「故障」被替换，否则「故障灯」会被拆成「通病灯」
    ['故障灯', '警告灯', '报警灯', '仪表灯', '故障指示灯']
  ];

  var SYN = {};
  var MAIN_LIST = [];
  SYN_GROUPS.forEach(function (g) {
    var main = g[0];
    if (MAIN_LIST.indexOf(main) === -1) MAIN_LIST.push(main);
    g.forEach(function (w) { if (!SYN[w]) SYN[w] = main; });
  });
  var SYN_KEYS = Object.keys(SYN).sort(function (a, b) { return b.length - a.length; });

  // 替换时用控制字符占位，避免「替换结果再被短词命中」——例如
  // 「故障灯」替换后若不加保护，接着处理「故障」时会被改写成「通病灯」。
  var PH = {};
  MAIN_LIST.forEach(function (m, i) { PH[m] = '\u0001' + i + '\u0002'; });

  function normalize(s) {
    if (s === null || s === undefined) return '';
    var t = String(s).toLowerCase();
    for (var i = 0; i < SYN_KEYS.length; i++) {
      var w = SYN_KEYS[i];
      if (t.indexOf(w) !== -1) t = t.split(w).join(PH[SYN[w]]);
    }
    for (var j = 0; j < MAIN_LIST.length; j++) {
      var m = MAIN_LIST[j];
      if (t.indexOf(PH[m]) !== -1) t = t.split(PH[m]).join(m);
    }
    return t;
  }

  /* ------------------------------------------------------- 车型识别 --- */
  var CHASSIS = ['W203/S203', 'W204/S204', 'W205/S205', 'W206/S206'];
  var CHASSIS_ALIAS = {
    'W203/S203': ['w203', 's203', 'c203', 'cl203', '第二代', '二代', '2代'],
    'W204/S204': ['w204', 's204', 'c204', '第三代', '三代', '3代'],
    'W205/S205': ['w205', 's205', 'c205', '第四代', '四代', '4代'],
    'W206/S206': ['w206', 's206', 'c206', '第五代', '五代', '5代']
  };

  /** 从文本里找出提到的车型代际（返回数组，可能 0～2 个） */
  function detectChassis(text) {
    var t = String(text || '').toLowerCase().replace(/\s+/g, '');
    var found = [];
    Object.keys(CHASSIS_ALIAS).forEach(function (c) {
      var hit = CHASSIS_ALIAS[c].some(function (a) { return t.indexOf(a) !== -1; });
      if (hit && found.indexOf(c) === -1) found.push(c);
    });
    return found;
  }

  /* ------------------------------------------------------------ 分词 --- */
  var STOP = {};
  ('的 是 了 吗 呢 啊 请问 请 我想 想 知道 告诉 一下 帮我 查 看 问 关于 方面 相关 情况 介绍 说明 下 这个 那个 这些 那些 什么 怎么 如何 有没有 可以 能 会 和 与 及 以及 还有 就是 我要 我 你 他 它 这 那 个 多少 几 一些 一个 现在 目前 一般 通常 大概 大约 左右 呀 吧 哦 嗯'
  ).split(/\s+/).forEach(function (w) { STOP[w] = true; });

  /** 中文按 2-gram、英文数字按整词切分 */
  function tokenize(s) {
    var t = normalize(s);
    var tokens = [];
    (t.match(/[a-z0-9][a-z0-9._/-]*/g) || []).forEach(function (w) {
      if (w.length > 1 && !STOP[w]) tokens.push(w);
    });
    var zhSegs = t.replace(/[^\u4e00-\u9fa5]+/g, ' ').split(/\s+/);
    zhSegs.forEach(function (seg) {
      if (!seg) return;
      if (seg.length <= 3) {
        if (!STOP[seg] && seg.length >= 2) tokens.push(seg);
        if (seg.length === 3) tokens.push(seg.substr(0, 2), seg.substr(1, 2));
      } else {
        for (var i = 0; i < seg.length - 1; i++) {
          var g = seg.substr(i, 2);
          if (!STOP[g]) tokens.push(g);
        }
      }
    });
    // 去重
    var seen = {}, out = [];
    tokens.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } });
    return out;
  }

  /* -------------------------------------------------- 车身字段定义 --- */
  var BODY_FIELDS = [
    ['length_mm', '车长', 'mm', ['车长', '长度', '多长', '长多少']],
    ['width_mm', '车宽（不含后视镜）', 'mm', ['车宽', '宽度', '多宽']],
    ['height_mm', '车高', 'mm', ['车高', '高度', '多高']],
    ['wheelbase_mm', '轴距', 'mm', ['轴距']],
    ['track_front_mm', '前轮距', 'mm', ['前轮距']],
    ['track_rear_mm', '后轮距', 'mm', ['后轮距']],
    ['ground_clearance_mm', '最小离地间隙', 'mm', ['离地间隙', '底盘高度', '通过性']],
    ['turning_circle_m', '转弯直径', 'm', ['转弯直径', '转弯半径', '掉头']],
    ['kerb_weight_kg', '整备质量', 'kg', ['整备质量', '车重', '重量', '自重', '空车重']],
    ['gross_weight_kg', '最大允许总质量', 'kg', ['最大总质量', '总质量', '允许总质量']],
    ['boot_litres', '后备箱容积', 'L', ['后备箱', '行李厢', '行李箱', '尾箱', '容积']],
    ['fuel_tank_l', '油箱容积', 'L', ['油箱', '油箱容积']],
    ['cd', '风阻系数 Cd', '', ['风阻', '风阻系数', 'cd']]
  ];

  /* ------------------------------------------------------ 构建知识库 --- */
  function build(D) {
    var items = [];
    var push = function (o) { o._i = items.length; items.push(o); return o; };

    function txt(v) {
      if (v === null || v === undefined || v === '') return null;
      if (Array.isArray(v)) return v.join(' / ');
      return String(v);
    }

    /* ---------- 代际：概览 / 车身 / 轮毂 / 轮胎 / 发动机 / 通病 ---------- */
    (D.generations || []).forEach(function (g) {
      var c = g.chassis;

      push({
        type: 'gen', chassis: c, cat: '车型概览',
        title: c + ' ' + g.generation,
        text: g.years + ' ' + (g.intro || '') + ' ' + (g.highlight || ''),
        link: 'specs.html#dim',
        data: g
      });

      BODY_FIELDS.forEach(function (f) {
        var v = g.body ? g.body[f[0]] : null;
        var shown = txt(v);
        push({
          type: 'body', chassis: c, cat: '车身尺寸',
          title: '车身 · ' + f[1],
          keywords: f[3],
          text: f[1] + ' ' + (shown || '未核实'),
          link: 'specs.html#dim',
          data: { field: f[0], label: f[1], unit: f[2], value: shown }
        });
      });

      if (g.wheels) {
        var w = g.wheels;
        push({
          type: 'wheelInfo', chassis: c, cat: '轮毂数据',
          title: '轮毂安装参数（PCD / 中心孔 / 螺栓 / ET）',
          keywords: ['孔距', '中心孔', '螺栓', '偏距', '扭矩', '变径环'],
          text: 'PCD ' + w.pcd + ' 中心孔 ' + w.center_bore_mm + 'mm 螺栓 ' + w.bolt_thread +
            ' 座面 ' + w.bolt_seat + ' ET ' + (w.et_range || []).join('～') + ' ' + (w.notes || ''),
          link: 'wheels.html#install',
          data: w
        });
        (w.oem || []).forEach(function (o) {
          push({
            type: 'wheelOem', chassis: c, cat: '原厂轮毂',
            title: '原厂轮毂 ' + o.size + ' ET' + o.et,
            text: o.size + ' ET' + o.et + ' ' + o.tyre + ' ' + (o.models || '') + ' ' + (o.note || ''),
            link: 'wheels.html#oem',
            data: o
          });
        });
      }

      (g.tyres || []).forEach(function (t) {
        push({
          type: 'tyre', chassis: c, cat: '轮胎规格',
          title: '轮胎 ' + t.size,
          text: t.size + ' ' + (t.load_speed || '') + ' ' + (t.note || ''),
          link: 'specs.html#dim',
          data: t
        });
      });

      (g.engines || []).forEach(function (e) {
        push({
          type: 'engine', chassis: c, cat: '发动机',
          title: '发动机 ' + (e.name || e.code),
          keywords: [e.code || '', e.name || ''],
          text: (e.code || '') + ' ' + (e.name || '') + ' ' + (e.displacement || '') + ' ' +
            (e.power_kw ? e.power_kw + 'kW' : '') + ' ' + (e.torque_nm ? e.torque_nm + 'Nm' : '') + ' ' +
            (e.years || '') + ' ' + (e.note || ''),
          link: 'specs.html#engine',
          data: e
        });
      });

      (g.issues || []).forEach(function (it) {
        push({
          type: 'issue', chassis: c, cat: '通病故障',
          title: '通病 ' + it.title,
          text: it.title + ' ' + (it.symptom || '') + ' ' + (it.cause || '') + ' ' + (it.fix || ''),
          link: 'guide.html#issues',
          data: it
        });
      });
    });

    /* ---------- 推荐方案 ---------- */
    (D.plans || []).forEach(function (p) {
      push({
        type: 'plan', chassis: p.chassis, cat: '改装方案',
        title: '推荐方案 ' + p.level + '（' + p.chassis + '）',
        text: p.level + ' ' + (p.front ? p.front.size + ' ' + p.front.tyre : '') + ' ' +
          (p.rear ? p.rear.size + ' ' + p.rear.tyre : '') + ' ' + (p.note || ''),
        link: 'fitment.html#plans',
        data: p
      });
    });

    /* ---------- 品牌轮毂 ---------- */
    (D.brands || []).forEach(function (b) {
      (b.models || []).forEach(function (m) {
        var sizes = (m.sizes || []).map(function (s) {
          return s.size + (s.et ? ' ET' + (Array.isArray(s.et) ? s.et.join('/') : s.et) : '') +
            (s.cb_mm ? ' CB' + s.cb_mm : '');
        }).join('；');
        push({
          type: 'brand', cat: '品牌轮毂',
          title: b.brand + ' ' + m.name,
          keywords: [b.brand, m.name, m.process || ''],
          text: b.brand + ' ' + m.name + ' ' + (b.country || '') + ' ' + (m.process || '') + ' ' +
            sizes + ' ' + (m.load_rating || '') + ' ' + (m.price_display || '') + ' ' +
            (m.fitment_note || '') + ' ' + (b.positioning || ''),
          link: 'fitment.html#brands',
          data: { brand: b, model: m }
        });
      });
    });

    /* ---------- AMG 原厂轮毂 ---------- */
    (D.amgOem || []).forEach(function (a) {
      push({
        type: 'amgOem', cat: 'AMG 原厂轮毂',
        title: 'AMG 原厂 ' + (a.name || a.part_no),
        text: (a.part_no || '') + ' ' + (a.name || '') + ' ' + (a.size || '') + ' ET' + (a.et || '') + ' ' +
          (a.tyre || '') + ' ' + (a.models || ''),
        link: 'fitment.html#amg',
        data: a
      });
    });

    /* ---------- MB 机油认证 ---------- */
    (D.mbSpecs || []).forEach(function (s) {
      push({
        type: 'mbSpec', cat: '机油认证',
        title: s.code,
        keywords: [s.code],
        text: s.code + ' ' + (s.fuel || '') + ' 低灰分:' + (s.low_saps ? '是' : '否') + ' ' +
          (s.viscosity || '') + ' ' + (s.notes || ''),
        link: 'guide.html#oil',
        data: s
      });
    });

    /* ---------- 各发动机用油 ---------- */
    (D.engineOil || []).forEach(function (e) {
      push({
        type: 'engineOil', cat: '用油要求',
        title: '用油 ' + e.engine,
        keywords: [e.engine],
        text: e.engine + ' ' + (e.models || '') + ' ' + (e.cert || '') + ' ' + (e.viscosity || '') + ' ' +
          (e.capacity_l ? e.capacity_l + 'L' : '') + ' ' + (e.note || ''),
        link: 'guide.html#oil',
        data: e
      });
    });

    /* ---------- 保养周期 ---------- */
    (D.intervals || []).forEach(function (i) {
      push({
        type: 'interval', cat: '保养周期',
        title: '保养 · ' + i.item,
        text: i.item + ' ' + (i.interval || '') + ' ' + (i.note || '') + ' ' +
          (i.price_cny ? (Array.isArray(i.price_cny) ? i.price_cny.join('-') : i.price_cny) + '元' : ''),
        link: 'guide.html#system',
        data: i
      });
    });

    /* ---------- 机油产品与价格 ---------- */
    (D.oils || []).forEach(function (o) {
      push({
        type: 'oil', cat: '机油价格',
        title: '机油 ' + o.brand + ' ' + o.product,
        keywords: [o.brand],
        text: o.brand + ' ' + o.product + ' ' + o.viscosity + ' ' + o.cert + ' ' +
          (o.price_cny ? o.price_cny + '元' : '') + ' ' + (o.channel || '') + ' ' + (o.note || ''),
        link: 'parts.html#oil',
        data: o
      });
    });

    /* ---------- 滤芯 ---------- */
    (D.filters || []).forEach(function (f) {
      push({
        type: 'filter', cat: '滤芯',
        title: '滤芯 ' + f.item,
        text: f.item + ' ' + (f.oem_part_no || '') + ' ' +
          (f.aftermarket || []).map(function (a) { return a.brand + ' ' + a.part_no; }).join(' ') + ' ' +
          (f.note || ''),
        link: 'parts.html#filters',
        data: f
      });
    });

    /* ---------- 火花塞 ---------- */
    (D.sparkPlugs || []).forEach(function (s) {
      push({
        type: 'spark', cat: '火花塞',
        title: '火花塞 ' + s.engine,
        text: (s.engine || '') + ' ' + (s.brand || '') + ' ' + (s.part_no || '') + ' ' +
          (s.price_cny ? s.price_cny + '元' : '') + ' ' + (s.note || ''),
        link: 'parts.html#spark',
        data: s
      });
    });

    /* ---------- 刹车 ---------- */
    (D.brakes || []).forEach(function (b) {
      push({
        type: 'brake', cat: '刹车',
        title: '刹车 ' + b.position + ' ' + b.brand,
        text: (b.position || '') + ' ' + (b.brand || '') + ' ' + (b.part_no || '') + ' ' +
          (b.price_cny ? b.price_cny + '元' : '') + ' ' + (b.note || ''),
        link: 'parts.html#brake',
        data: b
      });
    });

    /* ---------- 变速箱油 ---------- */
    (D.transmissionFluids || []).forEach(function (t) {
      push({
        type: 'atf', cat: '变速箱油',
        title: '变速箱油 ' + t.trans,
        text: t.trans + ' ' + (t.spec || '') + ' ' + (t.capacity_l || '') + 'L ' + (t.note || '') + ' ' +
          (t.alternatives || []).map(function (a) { return a.brand + ' ' + a.product; }).join(' '),
        link: 'parts.html#atf',
        data: t
      });
    });

    /* ---------- 刹车油 ---------- */
    (D.brakeFluid || []).forEach(function (b) {
      push({
        type: 'brakeFluid', cat: '刹车油',
        title: '刹车油 ' + b.spec,
        text: (b.spec || '') + ' ' + (b.brand || '') + ' ' + (b.price_cny ? b.price_cny + '元' : '') + ' ' + (b.note || ''),
        link: 'parts.html#brakefluid',
        data: b
      });
    });

    /* ---------- 工时费 ---------- */
    (D.labour || []).forEach(function (l) {
      push({
        type: 'labour', cat: '工时费',
        title: '工时 ' + l.type,
        text: (l.type || '') + ' ' + (l.channel || '') + ' ' +
          (Array.isArray(l.price_cny) ? l.price_cny.join('-') : l.price_cny) + '元 ' + (l.note || ''),
        link: 'parts.html#labour',
        data: l
      });
    });

    /* ---------- 数据缺口 ---------- */
    (D.dataGaps || []).forEach(function (g) {
      push({ type: 'gap', cat: '数据缺口', title: '数据缺口', text: g, link: 'parts.html#gaps', data: g });
    });
    (D.brandNotes || []).forEach(function (g) {
      push({ type: 'gap', cat: '数据缺口', title: '品牌数据缺口', text: g, link: 'fitment.html#brands', data: g });
    });

    /* ---------- 灯光 / 按键 / 仪表故障灯（CONTROL_DATA） ---------- */
    var C = global.CONTROL_DATA;
    if (C) {
      var L = C.lighting || {};

      (L.switchByGen || []).forEach(function (g) {
        push({
          type: 'lightSwitch', chassis: g.chassis, cat: '灯光操作',
          title: '灯光开关位置与档位 ' + g.chassis,
          keywords: ['灯光开关', '大灯', '示宽灯', '近光', '远光', '雾灯', 'AUTO', '车灯'],
          text: '灯光开关 ' + g.chassis + ' ' + g.years + ' ' + g.type + ' ' + g.location + ' 档位：' +
            (g.positions || []).map(function (p) { return p.pos + '=' + p.meaning; }).join('；') +
            ' 雾灯：' + (g.fog || '') + ' ' + (g.notes || ''),
          link: 'controls.html#light-switch-sec',
          data: g
        });
      });

      if (L.parkingLight) {
        var pl = L.parkingLight;
        push({
          type: 'parkingLight', cat: '灯光操作',
          title: '驻车灯（单侧驻车灯）怎么开',
          keywords: ['驻车灯', '示宽灯', '小灯', '单侧', '路边停车'],
          text: '驻车灯 ' + pl.what + ' ' + pl.diffFromPosition + ' 操作步骤：' +
            (pl.steps || []).join(' ') + ' 使用场景：' + pl.when + ' ' + (pl.notes || ''),
          link: 'controls.html#parking-light-sec',
          data: pl
        });
      }

      (L.lampsLocation || []).forEach(function (l) {
        push({
          type: 'lampLocation', cat: '灯光操作',
          title: '灯具位置 · ' + l.name,
          keywords: [l.name],
          text: l.name + ' 装在车身什么位置：' + l.where,
          link: 'controls.html#lamp-location-sec',
          data: l
        });
      });

      (L.indicators || []).forEach(function (it) {
        push({
          type: 'lightIndicator', cat: '灯光操作',
          title: '灯光指示灯 · ' + it.name,
          keywords: [it.name],
          text: it.name + '（' + it.color + '）' + it.meaning + ' 何时点亮：' + it.when,
          link: 'controls.html#light-indicators-sec',
          data: it
        });
      });

      (C.controls || []).forEach(function (a) {
        push({
          type: 'controlArea', cat: '车内按键',
          title: '车内按键 · ' + a.area,
          keywords: ['按键', '按钮', '功能', a.area],
          text: a.area + '：' + (a.items || []).map(function (i) { return i.name + '——' + i.desc; }).join('；') +
            ' ' + (a.note || ''),
          link: 'controls.html#controls-list-sec',
          data: a
        });
      });

      (C.warningLights || []).forEach(function (w) {
        var cost = w.cost ? (Array.isArray(w.cost) ? w.cost.join('-') + '元' : w.cost + '元') : '';
        push({
          type: 'warningLight', cat: '仪表故障灯',
          title: '故障灯 · ' + w.name,
          keywords: ['故障灯', '警告灯', '报警', w.name],
          text: w.name + '（' + w.color + '色，' + w.canDrive + '）含义：' + w.meaning +
            ' 可能原因：' + (w.causes || []).join('；') +
            ' 处理方法：' + (w.actions || []).join('；') + ' ' + (w.note || '') + ' ' + cost,
          link: 'controls.html#warning-lights',
          data: w
        });
      });
    }

    /* ---------- 预计算归一化文本 ---------- */
    items.forEach(function (it) {
      var chassisTxt = it.chassis ? ' ' + it.chassis + ' ' + it.chassis.replace('/', ' ') : '';
      it._titleNorm = normalize(it.title + ' ' + (it.keywords || []).join(' '));
      it._norm = normalize(it.title + ' ' + (it.keywords || []).join(' ') + ' ' + it.text + ' ' + it.cat + chassisTxt);
    });

    return items;
  }

  /* ------------------------------------------------------------ 检索 --- */
  /**
   * @param {Array} items 知识库
   * @param {string} query 用户问题
   * @param {object} [opts] { chassis: 强制代际, cats: 限定分类, limit: 条数 }
   */
  function search(items, query, opts) {
    opts = opts || {};
    var tokens = tokenize(query);
    var chasses = detectChassis(query);
    var forceChassis = opts.chassis || (chasses.length === 1 ? chasses[0] : null);
    var cats = opts.cats || null;
    var limit = opts.limit || 8;

    var scored = [];
    items.forEach(function (it) {
      if (cats && cats.indexOf(it.cat) === -1) return;
      var s = 0;
      var matched = 0;
      tokens.forEach(function (tk) {
        if (it._titleNorm.indexOf(tk) !== -1) { s += 4; matched++; }
        else if (it._norm.indexOf(tk) !== -1) { s += 1.5; matched++; }
      });
      if (!matched) return;
      // 覆盖度加成：命中的 token 占比越高越相关
      s += (matched / tokens.length) * 6;
      if (forceChassis) {
        if (it.chassis === forceChassis) s += 8;
        else if (it.chassis && it.chassis !== forceChassis) s -= 4;
        else s -= 0.5;
      }
      if (tokens.length) s = s / Math.sqrt(tokens.length) * 2;
      scored.push({ item: it, score: s });
    });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, limit).map(function (x) { return x.item; });
  }

  /** 返回带分数的结果（供调试/展示） */
  function searchScored(items, query, opts) {
    opts = opts || {};
    var tokens = tokenize(query);
    var chasses = detectChassis(query);
    var forceChassis = opts.chassis || (chasses.length === 1 ? chasses[0] : null);
    var out = [];
    items.forEach(function (it) {
      var s = 0, matched = 0;
      tokens.forEach(function (tk) {
        if (it._titleNorm.indexOf(tk) !== -1) { s += 4; matched++; }
        else if (it._norm.indexOf(tk) !== -1) { s += 1.5; matched++; }
      });
      if (!matched) return;
      s += (matched / tokens.length) * 6;
      if (forceChassis) {
        if (it.chassis === forceChassis) s += 8;
        else if (it.chassis) s -= 4;
      }
      if (tokens.length) s = s / Math.sqrt(tokens.length) * 2;
      out.push({ item: it, score: s });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, opts.limit || 8);
  }

  global.KB = {
    build: build,
    search: search,
    searchScored: searchScored,
    normalize: normalize,
    tokenize: tokenize,
    detectChassis: detectChassis,
    BODY_FIELDS: BODY_FIELDS,
    CHASSIS: CHASSIS,
    SYN: SYN
  };
})(window);
