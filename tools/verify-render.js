/* ==========================================================================
   verify-render.js —— 渲染层自检（按页面独立加载，模拟真实浏览器环境）
   --------------------------------------------------------------------------
   运行：node tools/verify-render.js

   与上一版的关键区别：不再把所有脚本堆在一个共享环境里跑，而是
     · 从每个 HTML 解析出它真正引入的 <script> 与它真正拥有的 id
     · 清空 require 缓存后只加载该页面的脚本
     · 从 HTML 解析 input / select 的默认值
   这样「页面漏引脚本」「容器 id 拼错」这类集成缺陷才会暴露出来。
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ------------------------------------------------------------ DOM 桩 ---- */

let store = new Map();

function makeEl(id, tag) {
  return {
    id: id || '',
    tagName: (tag || 'div').toUpperCase(),
    _html: '',
    _text: '',
    value: '',
    style: {},
    attrs: {},
    classList: {
      _set: new Set(),
      add(c) { this._set.add(c); },
      remove(c) { this._set.delete(c); },
      contains(c) { return this._set.has(c); }
    },
    get innerHTML() { return this._html; },
    set innerHTML(v) { this._html = String(v); },
    get textContent() { return this._text; },
    set textContent(v) { this._text = String(v); },
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    insertAdjacentHTML() {},
    setAttribute(k, v) { this.attrs[k] = v; },
    getAttribute(k) { return this.attrs[k] !== undefined ? this.attrs[k] : null; },
    scrollIntoView() {},
    querySelector() { return null; },
    querySelectorAll() { return []; }
  };
}

function readPage(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

/** 页面引入的脚本（按出现顺序） */
function scriptsOf(file) {
  return [...readPage(file).matchAll(/<script\s+src="([^"]+)"\s*>/g)].map(m => m[1]);
}

/** 页面真实存在的元素 id */
function idsOf(file) {
  return [...readPage(file).matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
}

/** 页面上 input / select 的初始值（模拟浏览器解析 HTML 属性） */
function initialValuesOf(file) {
  const src = readPage(file);
  const vals = {};
  for (const m of src.matchAll(/<input\b[^>]*>/g)) {
    const tag = m[0];
    const id = tag.match(/\sid="([^"]+)"/);
    if (!id) continue;
    const v = tag.match(/\svalue="([^"]*)"/);
    vals[id[1]] = v ? v[1] : '';
  }
  for (const m of src.matchAll(/<select\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    const id = m[1];
    const optTags = [...m[2].matchAll(/<option\b[^>]*>/g)].map(x => x[0]);
    const chosen = optTags.find(t => /\sselected/.test(t)) || optTags[0];
    if (!chosen) continue;
    const v = chosen.match(/\svalue="([^"]*)"/);
    vals[id] = v ? v[1] : '';
  }
  return vals;
}

/** 重置为「某个页面的真实 DOM + 真实脚本」 */
function loadPage(file) {
  store = new Map();
  idsOf(file).forEach(id => store.set(id, makeEl(id)));

  const vals = initialValuesOf(file);
  Object.keys(vals).forEach(id => {
    if (store.has(id)) store.get(id).value = vals[id];
  });

  globalThis.document = {
    readyState: 'complete',
    getElementById(id) { return store.get(id) || null; },
    querySelector(sel) {
      if (sel && sel[0] === '#') return store.get(sel.slice(1)) || null;
      return null;
    },
    querySelectorAll() { return []; },
    createElement(tag) { return makeEl('', tag); },
    addEventListener() {}
  };
  globalThis.location = { pathname: '/' + file, search: '', hash: '' };
  globalThis.window = globalThis;
  globalThis.scrollTo = () => {};

  // 清掉上一页残留的全局状态与模块缓存
  delete globalThis.CDATA;
  delete globalThis.WheelCalc;
  delete globalThis.App;
  delete globalThis.DATA_VERSION;
  Object.keys(require.cache).forEach(k => {
    if (k.indexOf(ROOT) === 0) delete require.cache[k];
  });

  const scripts = scriptsOf(file);
  scripts.forEach(s => require(path.join(ROOT, s.split('/').join(path.sep))));
  return scripts;
}

/* ------------------------------------------------------------ 断言 ---- */

let pass = 0, fail = 0;

function check(label, fn) {
  try {
    const r = fn();
    if (r === false) { fail++; console.log('  ✗ ' + label); }
    else { pass++; console.log('  ✓ ' + label + (typeof r === 'string' ? ' → ' + r : '')); }
  } catch (e) {
    fail++;
    console.log('  ✗ ' + label + ' → 抛异常：' + e.message);
  }
}

function html(id) { const el = store.get(id); return el ? el._html : null; }
function has(id, needle) { const h = html(id); return h !== null && h.indexOf(needle) !== -1; }

/* ------------------------------------------------------- 页面与断言 ---- */

const PAGES = [
  {
    file: 'index.html', label: '首页',
    checks: [
      ['通用安装参数卡已渲染', () => has('key-stats', '5x112') && has('key-stats', '66.6')],
      ['时间线含四个代际', () => ['W203/S203', 'W204/S204', 'W205/S205', 'W206/S206'].every(c => has('timeline', c))],
      ['时间线含轴距与轮距', () => has('timeline', '轴距') && has('timeline', '前轮距')],
      ['时间线螺栓标签已截断（不含件号长文本）', () => !has('timeline', 'A0009905407')],
      ['快速对比表含车长/轴距/前轮距行', () => has('quick-compare', '车长') && has('quick-compare', '轴距') && has('quick-compare', '前轮距')],
      ['快速对比表列出四代列头', () => has('quick-compare', 'W206/S206')],
      ['快速对比表脚注已渲染', () => has('compare-note', '代表性配置')],
      ['导航与页脚已渲染', () => has('site-header', 'nav') && has('site-footer', '仅供选型参考')]
    ]
  },
  {
    file: 'wheels.html', label: '轮毂数据页',
    checks: [
      ['安装参数卡含中心孔 66.6', () => has('install-stats', '66.6')],
      ['原厂轮毂表包含四代', () => has('oem-table', 'W203/S203') && has('oem-table', 'W206/S206')],
      // 关键：背距/前距必须算出真实数值，不能全是占位符
      ['背距/前距列有真实数值（7.5J ET45.5 → 140.75 / 49.75）',
        () => has('oem-table', '140.75') && has('oem-table', '49.75')],
      ['背距/前距列另有其他尺寸的数值（7J ET37 → 125.9；8.5J ET54 → 161.95）',
        () => has('oem-table', '125.9') && has('oem-table', '161.95')],
      ['原厂轮胎规格已列出', () => has('oem-table', '225/50R17')],
      ['备胎钢圈规格可解析（4.5Bx15 ET12 → 69.15 / 45.15）',
        () => has('oem-table', '69.15')],
      ['ET 区间表含四代 ET 段', () => has('et-table', 'ET 31 ～ 44') && has('et-table', 'ET 39 ～ 58') && has('et-table', 'ET 40 ～ 58')],
      ['ET 区间表螺栓列已截断为规范值', () => has('et-table', 'M14x1.5') && !has('et-table', 'A0009905407')]
    ]
  },
  {
    file: 'specs.html', label: '车身数据页',
    checks: [
      ['尺寸表含车长/轴距/轮距行', () => has('dim-table', '车长') && has('dim-table', '轴距') && has('dim-table', '前轮距')],
      ['尺寸表含四代数值', () => has('dim-table', '4541') && has('dim-table', '4751')],
      ['尺寸演变小结已生成', () => has('dim-note', '二十年演变')],
      ['重量表含整备质量与有效载荷', () => has('mass-table', '整备质量区间') && has('mass-table', '有效载荷')],
      ['发动机表含 M274 / M254 / M156', () => has('engine-table', 'M274') && has('engine-table', 'M254') && has('engine-table', 'M156')],
      ['发动机功率含 PS 换算', () => has('engine-table', 'PS')],
      ['代际差异卡片为 4 张', () => (html('diff-cards').match(/card-meta/g) || []).length === 4]
    ]
  },
  {
    file: 'guide.html', label: '用车指南页',
    checks: [
      ['保养周期表含机油与变速箱油', () => has('interval-table', '机油 + 机油滤芯') && has('interval-table', '变速箱油')],
      ['MB 认证表含 229.5 / 229.51 / 229.71', () => has('mb-spec-table', 'MB 229.5') && has('mb-spec-table', 'MB 229.51') && has('mb-spec-table', 'MB 229.71')],
      ['MB 认证表标注低灰分与 GPF', () => has('mb-spec-table', 'GPF')],
      ['发动机用油表含 M254 与 0W-20', () => has('engine-oil-table', 'M254') && has('engine-oil-table', '0W-20')],
      ['发动机用油表含 M274 容量 7 L', () => has('engine-oil-table', '7</td>') || has('engine-oil-table', '>7<')],
      ['通病列表含四代标题', () => has('issue-list', 'W203/S203') && has('issue-list', 'W206/S206')],
      ['通病卡片含现象/原因/对策', () => has('issue-list', '现象') && has('issue-list', '原因') && has('issue-list', '对策')],
      ['通病卡片含参考维修价与召回条目', () => has('issue-list', '参考维修价') && has('issue-list', '官方召回')]
    ]
  },
  {
    file: 'parts.html', label: '配件与机油页',
    checks: [
      ['机油表含主流品牌', () => has('oil-table', '美孚') && has('oil-table', '壳牌') && has('oil-table', '福斯') && has('oil-table', '昆仑')],
      ['机油表含 MB-Approval 认证信息', () => has('oil-table', 'MB-Approval 229.53')],
      ['机油表单价列已改为纯数值', () => has('oil-table', '单价 (元/L)')],
      ['滤芯表含原厂号与品牌件号', () => has('filter-table', 'A2711800009') && has('filter-table', 'HU 718/5 x') && has('filter-table', '曼牌')],
      ['滤芯表原厂号只在首行出现一次', () => (html('filter-table').match(/A2710940304/g) || []).length === 1],
      ['火花塞表含 NGK 型号与价格', () => has('spark-table', 'SILZKFR8D7S') && has('spark-table', '430')],
      ['刹车表含原厂与替代品牌件号', () => has('brake-table', 'A0004208100') && has('brake-table', '13.0460-4883.2') && has('brake-table', 'P50145')],
      ['变速箱油表含四类变速箱与认证', () => has('atf-table', '722.6') && has('atf-table', '236.14') && has('atf-table', '236.15') && has('atf-table', '236.17')],
      ['变速箱油表含替代品牌', () => has('atf-table', 'Titan ATF 4134')],
      ['刹车油表含 DOT4 与品牌', () => has('brakefluid-table', 'DOT4') && has('brakefluid-table', '博世')],
      ['工时费表含 4S 与修理厂对比', () => has('labour-table', '4S') && has('labour-table', '途虎')],
      ['数据缺口说明已生成', () => has('data-gaps', '本站没拿到的数据')]
    ]
  },
  {
    file: 'fitment.html', label: '轮毂适配页',
    checks: [
      ['推荐方案表含三档位', () => has('plan-table', '原厂风格') && has('plan-table', '进阶合装') && has('plan-table', '激进姿态')],
      ['推荐方案表含实时计算的外移量', () => has('plan-table', 'mm')],
      ['推荐方案共 12 条（每代 3 档）', () => (html('plan-table').match(/<tr>/g) || []).length === 13],
      ['评级取前后轮较差者（含风险等级）', () => has('plan-table', '风险较高') || has('plan-table', '不可安装')],
      ['可用性矩阵含 ET 列与基准说明', () => has('fit-matrix', 'ET 20') && has('fit-matrix', '原厂前轮')],
      ['可用性矩阵含辋宽行', () => has('fit-matrix', '8.5J') && has('fit-matrix', '9.5J')],
      ['矩阵代际切换按钮已生成', () => (html('matrix-chips').match(/chip/g) || []).length >= 4],
      ['品牌库含 BBS / OZ / RAYS', () => has('brand-list', 'BBS') && has('brand-list', 'OZ Racing') && has('brand-list', 'RAYS')],
      ['品牌库含中心孔适配提示', () => has('brand-list', '变径环')],
      ['品牌价格以原币种展示并折算人民币', () => has('brand-list', 'EUR') && has('brand-list', '≈')],
      ['品牌数据缺口说明已渲染', () => has('brand-notes', '数据缺口') && has('brand-notes', 'Enkei')],
      ['来源清单已渲染', () => has('brand-notes', '数据来源清单')],
      ['AMG 原厂表含零件号与 W204 条目', () => has('amg-table', 'A20540111007X21') && has('amg-table', 'A2044014102')]
    ]
  },
  {
    file: 'assistant.html', label: 'AI 助手页',
    checks: [
      ['聊天容器与输入框存在', () => !!store.get('chat-log') && !!store.get('chat-input') && !!store.get('chat-send')],
      ['推荐问题按钮共 8 个', () => (readPage('assistant.html').match(/data-ask=/g) || []).length === 8],
      ['模型设置面板字段齐全', () => ['llm-settings', 'llm-enabled', 'llm-base', 'llm-key', 'llm-model', 'llm-save', 'llm-copy']
        .every(id => !!store.get(id))],
      ['知识库已建立（助手模块可用）', () => typeof globalThis.Assistant === 'object' && globalThis.Assistant.items().length > 200],
      ['助手能回答车身问题', () => globalThis.Assistant.respond('S205 的轴距').html.indexOf('2840') !== -1]
    ]
  },
  {
    file: 'controls.html', label: '灯光/按键/故障灯页',
    checks: [
      ['灯光开关四代卡片已渲染', () => ['W203/S203', 'W204/S204', 'W205/S205', 'W206/S206'].every(c => has('light-switch', c))],
      ['驻车灯给出旋钮档位（W / X）而非流传的拨杆做法',
        () => has('parking-light', 'W 档') && has('parking-light', 'X 档')],
      ['驻车灯明确更正了流传说法', () => has('parking-light', '更正一个流传说法')],
      ['W205/W206 如实标注为未核实', () => has('light-switch', '未核实') && has('light-switch', '不猜测')],
      ['已核实的代际标注了核实状态', () => has('light-switch', '已核实')],
      ['远近光与雾灯操作已列出', () => has('light-switch', '远近光') && has('light-switch', '雾灯')],
      ['奔驰特有系统已渲染（SBC 不在 C 级）',
        () => has('special-systems', 'SBC') && has('special-systems', '没有 SBC')],
      ['驻车灯说明与示宽灯的区别', () => has('parking-light', '示宽灯')],
      ['灯具物理位置表已渲染', () => has('lamp-location', '前雾灯') && has('lamp-location', '日间行车灯')],
      ['灯光指示灯含 SVG 图标', () => has('light-indicators', '<svg') && has('light-indicators', '示宽灯')],
      ['车内按键分区已渲染', () => has('controls-list', '方向盘') && has('controls-list', '顶棚')],
      ['按键含怀挡说明', () => has('controls-list', '怀挡')],
      ['颜色分级已渲染', () => has('color-rule', '立即') && has('color-rule', '黄色')],
      ['故障灯网格已渲染', () => has('warning-grid', '机油压力') && has('warning-grid', 'ABS')],
      ['故障灯图标为 SVG', () => has('warning-grid', '<svg')],
      ['故障灯含原因与处理', () => has('warning-grid', '可能原因') && has('warning-grid', '怎么处理')],
      ['故障灯数量不少于 24 条', () => (html('warning-grid').match(/wl-card/g) || []).length >= 24],
      ['灯光信息指示条目已列出', () => has('light-indicators', '后雾灯') || has('light-indicators', '示宽灯')],
      ['故障灯含价格区间', () => has('warning-grid', '元') || has('warning-grid', '750')],
      ['颜色筛选按钮共 5 个', () => (html('warning-chips').match(/chip/g) || []).length === 5],
      ['故障灯搜索框已渲染', () => !!store.get('warning-search')],
      ['故障灯计数已更新', () => String(store.get('warning-count').textContent || '').indexOf('共') !== -1]
    ]
  },
  {
    file: 'calculator.html', label: '改装计算器页',
    checks: [
      ['原厂预设已自动填充', () => store.get('oem-tyre').value === '225/50R17' && store.get('target-tyre').value === '245/40R18'],
      ['计算结果已产出（外径 656.8 → 653.2）', () => has('calc-result', '656.8') && has('calc-result', '653.2')],
      ['外径偏差计算正确（-3.6 mm / -0.55%）', () => has('calc-result', '-3.6') && has('calc-result', '-0.55%')],
      ['胎壁外移计算正确（相对官方 7Jx17 ET48.5 基准为 +13.5 mm）', () => has('calc-result', '+13.5 mm')],
      ['单轴轮距变化计算正确（+27 mm）', () => has('calc-result', '+27 mm')],
      ['码表 100 时真实车速正确（99.5）', () => has('calc-result', '99.5')],
      ['背距/前距已算出（152.95 / 62.95）', () => has('calc-result', '152.95') && has('calc-result', '62.95')],
      ['载重校验已计算（730 kg / 561 kg）', () => has('calc-result', '730') && has('calc-result', '561')],
      ['逐项检查带结论徽章', () => has('calc-issues', 'badge')],
      ['码表误差条已渲染', () => has('calc-speedbar', '码表误差')],
      ['载重指数表已渲染（含 88 / 120）', () => has('li-table-body', '>88<') && has('li-table-body', '>120<')]
    ]
  }
];

/* ------------------------------------------------- 静态依赖完整性检查 ---- */

// 渲染脚本 → 它运行时必须已经存在的依赖
const SCRIPT_DEPS = {
  'assets/js/wheels.js': ['data/c-class-data.js', 'assets/js/wheel-calc.js'],
  'assets/js/fitment.js': ['data/c-class-data.js', 'data/wheel-brands.js', 'assets/js/wheel-calc.js'],
  'assets/js/assistant.js': ['data/c-class-data.js', 'data/wheel-brands.js', 'data/controls-data.js', 'assets/js/wheel-calc.js', 'assets/js/kb.js', 'assets/js/car-icons.js'],
  'assets/js/kb.js': ['data/c-class-data.js', 'data/wheel-brands.js'],
  'assets/js/controls.js': ['data/controls-data.js', 'assets/js/car-icons.js'],
  'assets/js/car-icons.js': [],
  'assets/js/home.js': ['data/c-class-data.js'],
  'assets/js/specs.js': ['data/c-class-data.js'],
  'assets/js/guide.js': ['data/c-class-data.js'],
  'assets/js/parts.js': ['data/c-class-data.js'],
  'assets/js/wheel-calc.js': [],
  'assets/js/app.js': []
};

console.log('\n=== 页面脚本依赖完整性 ===');
PAGES.forEach(p => {
  const list = scriptsOf(p.file);
  Object.keys(SCRIPT_DEPS).forEach(s => {
    if (list.indexOf(s) === -1) return;
    SCRIPT_DEPS[s].forEach(dep => {
      check(p.file + ' 引入了 ' + dep + '（' + s + ' 的依赖）', () => list.indexOf(dep) !== -1);
    });
  });
});

/* ------------------------------------------------------- 逐页渲染测试 ---- */

PAGES.forEach(p => {
  loadPage(p.file);
  console.log('\n=== ' + p.label + '（' + p.file + '） ===');
  p.checks.forEach(c => check(c[0], c[1]));
});

console.log('\n' + '='.repeat(60));
console.log('渲染自检：通过 ' + pass + ' 项，失败 ' + fail + ' 项');
console.log('='.repeat(60) + '\n');
process.exit(fail === 0 ? 0 : 1);
