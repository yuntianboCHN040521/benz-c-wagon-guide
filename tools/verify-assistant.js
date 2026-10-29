/* ==========================================================================
   verify-assistant.js —— AI 助手自检
   运行：node tools/verify-assistant.js
   用途：在最小 DOM 环境下加载数据层与助手引擎，验证典型提问能否得到
         「正确且来自站内数据」的回答。
   ========================================================================== */
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ------------------------------------------------------------ DOM 桩 --- */
globalThis.window = globalThis;
globalThis.document = {
  readyState: 'complete',
  getElementById() { return null; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement() {
    return {
      style: {}, classList: { add() {}, remove() {}, toggle() {} },
      appendChild() {}, remove() {}, addEventListener() {},
      set innerHTML(v) {}, get innerHTML() { return ''; }
    };
  },
  addEventListener() {}
};
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
// Node 24 起 globalThis.navigator 是只读的，助手只在「复制」按钮里用到它，测试无需 stub

/* --------------------------------------------------------------- 加载 --- */
['data/c-class-data.js', 'data/wheel-brands.js', 'data/controls-data.js', 'assets/js/app.js',
  'assets/js/wheel-calc.js', 'assets/js/car-icons.js', 'assets/js/kb.js', 'assets/js/assistant.js'
].forEach(f => require(path.join(ROOT, f.split('/').join(path.sep))));

const A = globalThis.Assistant;
const KB = globalThis.KB;

let pass = 0, fail = 0;

function check(label, fn) {
  try {
    const r = fn();
    if (r === false) { fail++; console.log('  ✗ ' + label); }
    else { pass++; console.log('  ✓ ' + label + (typeof r === 'string' ? '  → ' + r : '')); }
  } catch (e) {
    fail++;
    console.log('  ✗ ' + label + ' → 抛异常：' + e.message);
  }
}

/** 问一个问题，返回回答 HTML */
function ask(q) {
  const r = A.respond(q);
  if (!r || typeof r.html !== 'string') throw new Error('未返回回答');
  return r;
}
function has(q, needle) { return ask(q).html.indexOf(needle) !== -1; }

/* ------------------------------------------------------------ 用例 --- */
console.log('\n=== 知识库构建 ===');
const items = A.items();
check('知识库已构建', () => items.length > 200 || (() => { throw new Error('条目过少：' + items.length); })());
check('条目数与分类统计', () => {
  const cats = {};
  items.forEach(i => { cats[i.cat] = (cats[i.cat] || 0) + 1; });
  return items.length + ' 条 / ' + Object.keys(cats).length + ' 类';
});
check('覆盖全部四代车型', () => ['W203/S203', 'W204/S204', 'W205/S205', 'W206/S206']
  .every(c => items.some(i => i.chassis === c)));
check('包含品牌轮毂条目', () => items.some(i => i.type === 'brand'));
check('包含价格类条目', () => items.some(i => ['oil', 'brake', 'labour'].indexOf(i.type) !== -1));

console.log('\n=== 车身数据查询 ===');
check('S205 轴距 → 2840 mm', () => has('S205 的轴距是多少', '2840'));
check('S206 前轮距 → 1579', () => has('S206 的前轮距', '1579'));
check('S203 车长 → 4541', () => has('S203 车长多少', '4541'));
check('问「各代车长」→ 四代都有', () => {
  const h = ask('各代的车长分别是多少').html;
  return h.includes('4541') && h.includes('4596') && h.includes('4702') && h.includes('4751');
});
check('未核实的字段如实回答', () => has('S205 的最小离地间隙', '未核实'));

console.log('\n=== 通病与故障 ===');
check('W204 通病 → 含凸轮轴调节器', () => has('W204 有什么通病', '凸轮轴调节器'));
check('W204 通病 → 含转向柱锁', () => has('W204 有什么通病', '转向柱锁'));
check('W203 通病 → 含 M271 正时链', () => has('W203 有哪些常见故障', '正时链'));
check('W206 通病 → 含召回', () => has('W206 有什么问题', '召回'));
check('泛问通病按数据顺序（真实通病排在「澄清」之前）', () => {
  const h = ask('W204 有什么通病').html;
  const m271 = h.indexOf('凸轮轴调节器');
  const clarify = h.indexOf('澄清');
  if (m271 === -1) throw new Error('未包含凸轮轴调节器条目');
  return clarify === -1 || m271 < clarify;
});
check('泛问通病显示总数', () => has('W204 有什么通病', '条通病记录'));

console.log('\n=== 机油与保养 ===');
check('W205 机油 → 含 MB 229.5', () => has('W205 用什么机油', 'MB 229.5'));
check('W205 机油 → 容量 7.0 L', () => has('W205 用什么机油', '7.0 L') || has('W205 用什么机油', '7</td>'));
check('W206 M254 → 0W-20 / 229.71', () => has('W206 C200 用什么机油', '0W-20'));
check('保养周期 → 含变速箱油', () => has('保养周期是多久', '变速箱油'));
check('变速箱油认证 → 236.17', () => has('变速箱油怎么选', '236.17'));
check('变速箱油 → 区分 722.9 两阶段', () => has('722.9 用什么变速箱油', '236.14'));

console.log('\n=== 轮毂与安装参数 ===');
check('W203 螺栓 → M12x1.5', () => has('W203 用什么螺栓', 'M12x1.5'));
check('W204 螺栓 → M14x1.5', () => has('W204 的螺栓规格', 'M14x1.5'));
check('轮毂孔距 → 5×112', () => has('轮毂孔距是多少', '5×112') || has('轮毂孔距是多少', '5x112'));
check('中心孔 → 66.6', () => has('中心孔多大', '66.6'));
check('S203 原厂 ET 范围', () => has('S203 的 ET 范围', '31') && has('S203 的 ET 范围', '44'));
check('原厂轮毂清单含背距', () => has('W205 原厂轮毂规格', '背距'));

console.log('\n=== 改装计算（实时调用计算引擎）===');
check('换胎 → 外径 656.8 → 653.2', () => {
  const h = ask('225/50R17 换成 245/40R18 会怎样').html;
  return h.includes('656.8') && h.includes('653.2');
});
check('换胎 → 码表误差 99.5', () => has('225/50R17 换成 245/40R18', '99.5'));
check('换轮毂 → 含评级与胎壁外移', () => {
  const h = ask('8.5Jx19 ET45 装 W205 会刮吗').html;
  return h.includes('综合结论') && h.includes('胎壁外移');
});
check('指定车型作为基准', () => has('W204 上 8Jx18 ET42 能不能装', 'W204/S204'));
check('未给车型时说明默认基准', () => has('225/45R18 换成 235/40R18', 'W205/S205'));

console.log('\n=== 价格 ===');
check('刹车片价格', () => has('刹车片多少钱', '刹车') && has('刹车片多少钱', '元'));
check('机油价格 → 含品牌', () => has('机油价格', '美孚') || has('机油价格', '壳牌'));
check('价格免责提示', () => has('刹车片多少钱', '参考区间'));
check('工时费', () => has('保养工时费多少', '工时'));

console.log('\n=== 品牌轮毂 ===');
check('BBS → 含型号与尺寸', () => has('BBS 有哪些适配的轮毂', 'BBS'));
check('BBS → 含中心孔提示', () => has('BBS 有哪些适配的轮毂', '变径环'));
check('OZ → 命中品牌', () => has('OZ 轮毂', 'OZ'));
check('AMG 原厂 → 含零件号', () => has('AMG 原厂轮毂', 'A20540111007X21'));
check('RAYS → 命中品牌', () => has('RAYS 有什么型号', 'RAYS'));

console.log('\n=== 对比与方案 ===');
check('两代对比 → 轴距差值', () => {
  const h = ask('S204 和 S205 的轴距差多少').html;
  return h.includes('2760') && h.includes('2840') && h.includes('+80');
});
check('推荐方案 → 三档位', () => {
  const h = ask('有什么改装推荐方案').html;
  return h.includes('原厂风格') && h.includes('进阶合装') && h.includes('激进姿态');
});
check('方案含实时外移量', () => has('W205 的改装方案', 'mm'));

console.log('\n=== 数据缺口与边界 ===');
check('数据缺口查询', () => has('哪些数据没有核实', 'Enkei'));
check('无关问题不崩溃且给建议', () => {
  const h = ask('今天星期几').html;
  return (h.includes('没有') && h.includes('可以试着')) || h.includes('找到');
});
check('空输入不崩溃', () => { A.respond(''); return true; });
check('纯符号输入不崩溃', () => { A.respond('???'); return true; });

console.log('\n=== 灯光与按键 ===');
check('驻车灯 → 给出旋钮档位操作步骤', () => has('驻车灯在哪里怎么开', 'W 档') && has('驻车灯在哪里怎么开', 'X 档'));
check('驻车灯 → 更正流传的拨杆做法', () => has('驻车灯怎么用', '更正一个流传说法'));
check('驻车灯 → 说明与示宽灯的区别', () => has('驻车灯怎么用', '示宽灯'));
check('示宽灯 → 给出灯具位置', () => has('示宽灯在哪里', '大灯总成'));
check('灯光开关 → 四代对比', () => {
  const h = ask('灯光开关在哪里').html;
  return h.includes('W203/S203') && h.includes('W206/S206');
});
check('车内按键 → 怀挡', () => has('怀挡怎么用', '怀挡'));
check('车内按键 → 方向盘区域', () => has('方向盘上的按键是干什么的', '方向盘'));

console.log('\n=== 仪表故障灯 ===');
check('机油压力灯 → 立即停车 + 处理步骤', () => {
  const h = ask('机油压力警告灯亮了怎么办').html;
  return h.includes('立即停车') && h.includes('机油');
});
check('胎压灯 → 命中胎压条目', () => has('胎压灯亮了', '胎压'));
check('发动机故障灯 → 含闪烁说明', () => has('发动机故障灯亮了怎么修', '闪烁'));
check('ABS 灯 → 含原因与处理', () => {
  const h = ask('ABS 灯亮了怎么办').html;
  return h.includes('可能原因') && h.includes('怎么处理');
});
check('故障灯颜色分级查询', () => {
  const h = ask('故障灯颜色分级是什么意思').html;
  return h.includes('红色') && h.includes('黄色');
});
check('按红色筛选故障灯', () => has('红色故障灯有哪些', '红色'));
check('故障灯回答带 SVG 图标', () => has('机油压力警告灯亮了怎么办', '<svg'));

console.log('\n=== 意图识别正确性 ===');
const cases = [
  ['S205 的轴距是多少', 'body'],
  ['W204 有什么通病', 'issue'],
  ['W205 用什么机油', 'oil'],
  ['BBS 有哪些轮毂', 'brand'],
  ['刹车片多少钱', 'price'],
  ['225/50R17 换成 245/40R18', 'calc'],
  ['S204 和 S205 对比', 'compare'],
  ['保养周期', 'interval'],
  ['轮毂孔距', 'wheel'],
  ['M274 发动机参数', 'engine'],
  ['哪些数据没核实', 'gap'],
  ['驻车灯在哪里', 'lighting'],
  ['机油压力警告灯亮了', 'warning'],
  ['怀挡怎么用', 'control']
];
cases.forEach(([q, expect]) => {
  check('意图「' + expect + '」：' + q, () => {
    const got = A.parse(q).intent;
    if (got !== expect) throw new Error('实际为 ' + got);
    return true;
  });
});

console.log('\n' + '='.repeat(60));
console.log('助手自检：通过 ' + pass + ' 项，失败 ' + fail + ' 项');
console.log('='.repeat(60) + '\n');
process.exit(fail === 0 ? 0 : 1);
