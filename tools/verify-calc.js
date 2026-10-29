/* ==========================================================================
   verify-calc.js —— 计算引擎自检脚本
   运行：node tools/verify-calc.js
   用途：验证轮胎/轮毂几何计算、码表误差、外移量、载重指数等关键公式是否自洽。
   ========================================================================== */
'use strict';

const path = require('path');
const fs = require('fs');

// 浏览器脚本通过 IIFE 挂到 window / globalThis，这里直接 require 即可
require(path.join(__dirname, '..', 'assets', 'js', 'wheel-calc.js'));
const W = globalThis.WheelCalc;

let pass = 0, fail = 0;

function approx(actual, expected, tol, label) {
  const ok = Math.abs(actual - expected) <= (tol === undefined ? 0.05 : tol);
  if (ok) { pass++; console.log('  ✓ ' + label + ' → ' + actual); }
  else { fail++; console.log('  ✗ ' + label + ' → 实际 ' + actual + '，期望 ' + expected); }
}

function eq(actual, expected, label) {
  const ok = String(actual) === String(expected);
  if (ok) { pass++; console.log('  ✓ ' + label + ' → ' + actual); }
  else { fail++; console.log('  ✗ ' + label + ' → 实际 ' + actual + '，期望 ' + expected); }
}

function truthy(v, label) {
  if (v) { pass++; console.log('  ✓ ' + label); }
  else { fail++; console.log('  ✗ ' + label); }
}

console.log('\n=== 1. 轮胎规格解析 ===');
const t1 = W.parseTyre('225/50R17 98W');
eq(t1.width, 225, 'parseTyre 宽度');
eq(t1.aspect, 50, 'parseTyre 扁平比');
eq(t1.rim, 17, 'parseTyre 轮辋直径');
eq(t1.load, 98, 'parseTyre 载重指数');
eq(t1.speed, 'W', 'parseTyre 速度等级');

const t2 = W.parseTyre('245/40 ZR18');
eq(t2.width, 245, 'parseTyre 带 ZR 标记');
eq(t2.rim, 18, 'parseTyre ZR 轮辋直径');

const t3 = W.parseTyre('255/35R19 96Y');
eq(t3.aspect, 35, 'parseTyre 低扁平比');

console.log('\n=== 2. 轮毂规格解析 ===');
const w1 = W.parseWheel('7.5Jx17 ET45.5');
approx(w1.width, 7.5, 0.001, 'parseWheel 宽度');
eq(w1.rim, 17, 'parseWheel 直径');
approx(w1.et, 45.5, 0.001, 'parseWheel ET');

const w2 = W.parseWheel('8Jx18 ET42');
approx(w2.width, 8, 0.001, 'parseWheel 整数宽度');
approx(w2.et, 42, 0.001, 'parseWheel ET 整数');

// 钢制备胎圈：B 型轮辋码
const w3 = W.parseWheel('4.5Bx15 ET12');
approx(w3.width, 4.5, 0.001, 'parseWheel B 型轮辋宽度');
eq(w3.rim, 15, 'parseWheel B 型轮辋直径');
approx(w3.et, 12, 0.001, 'parseWheel B 型 ET');

const w4 = W.parseWheel('7.5Jx17H2 ET47');
approx(w4.et, 47, 0.001, 'parseWheel 带 H2 标记');

console.log('\n=== 3. 轮胎几何 ===');
// 225/50R17：17×25.4 + 2×(225×0.50) = 431.8 + 225 = 656.8
const g1 = W.tyreGeometry({ width: 225, aspect: 50, rim: 17 });
approx(g1.sidewall, 112.5, 0.05, '胎壁高度 225/50');
approx(g1.diameter, 656.8, 0.05, '外径 225/50R17');
approx(g1.circumference, Math.PI * 656.8, 0.1, '周长 225/50R17');
// 245/40R18：457.2 + 196 = 653.2
const g2 = W.tyreGeometry({ width: 245, aspect: 40, rim: 18 });
approx(g2.diameter, 653.2, 0.05, '外径 245/40R18');

console.log('\n=== 4. 轮毂几何（背距 / 前距）===');
// 7.5J = 190.5mm，ET45.5 → 背距 = 95.25 + 45.5 = 140.75，前距 = 95.25 - 45.5 = 49.75
const f1 = W.fitmentGeometry(7.5, 45.5, 225);
approx(f1.rimMm, 190.5, 0.05, '轮辋宽度 mm (7.5J)');
approx(f1.backspace, 140.75, 0.05, '背距 7.5J ET45.5');
approx(f1.frontspace, 49.75, 0.05, '前距 7.5J ET45.5');
approx(f1.rimOuterX, 49.75, 0.05, '轮辋外缘坐标');
approx(f1.tyreOuterX, 67, 0.05, '胎壁外缘坐标 225 胎');

console.log('\n=== 5. 配置对比（S205 原厂 17 → 改装 18）===');
// 原厂：7.5J ET45.5 + 225/50R17；目标：8.5J ET45 + 245/40R18
const cmp = W.compare(
  { tyre: { width: 225, aspect: 50, rim: 17 }, rimWidth: 7.5, et: 45.5 },
  { tyre: { width: 245, aspect: 40, rim: 18 }, rimWidth: 8.5, et: 45 }
);
approx(cmp.diameterDelta, -3.6, 0.1, '外径变化 mm');
approx(cmp.diameterPct, -0.55, 0.02, '外径变化 %');
approx(cmp.rideHeightDelta, -1.8, 0.1, '离地间隙变化 mm');
// 轮辋外缘：原 49.75 → 新 215.9/2 - 45 = 62.95，外移 13.2
approx(cmp.rimOuterMove, 13.2, 0.1, '轮辋外缘外移 mm');
// 胎壁：原 67 → 新 122.5 - 45 = 77.5，外移 10.5
approx(cmp.tyreOuterMove, 10.5, 0.1, '胎壁外移 mm');
// 单轴轮距变化 = 10.5 × 2 = 21
approx(cmp.trackChangePerAxle, 21, 0.1, '单轴轮距变化 mm');
// 码表 100 时真实车速 = 100 × 653.2/656.8 = 99.4518 → 保留 1 位小数 99.5
approx(cmp.trueSpeedAt100, 99.5, 0.02, '码表 100 时真实车速');

console.log('\n=== 6. ET 变化方向性校验 ===');
// ET 减小（外凸）→ 外移量增大
const cmpA = W.compare(
  { tyre: { width: 225, aspect: 45, rim: 17 }, rimWidth: 7.5, et: 50 },
  { tyre: { width: 225, aspect: 45, rim: 17 }, rimWidth: 7.5, et: 40 }
);
truthy(cmpA.tyreOuterMove > 0, 'ET 减小 10mm → 胎壁外移为正（' + cmpA.tyreOuterMove + ' mm）');
approx(cmpA.tyreOuterMove, 10, 0.1, 'ET 减小 10mm → 外移正好 10mm');
approx(cmpA.trackChangePerAxle, 20, 0.1, '轮距变化 20mm');

// 轮辋加宽 1 英寸、ET 不变 → 内外各外移 12.7mm
const cmpB = W.compare(
  { tyre: { width: 225, aspect: 45, rim: 17 }, rimWidth: 7.5, et: 45 },
  { tyre: { width: 225, aspect: 45, rim: 17 }, rimWidth: 8.5, et: 45 }
);
approx(cmpB.rimOuterMove, 12.7, 0.05, '辋宽 +1 英寸 → 外缘外移 12.7mm');
approx(cmpB.rimInnerMove, -12.7, 0.05, '辋宽 +1 英寸 → 内缘内移 12.7mm');

console.log('\n=== 7. 载重指数 ===');
eq(W.loadCapacity(91), 615, '载重指数 91');
eq(W.loadCapacity(98), 750, '载重指数 98');
eq(W.loadCapacity(100), 800, '载重指数 100');
eq(W.loadCapacity(88), 560, '载重指数 88');
eq(W.speedLimit('W'), 270, '速度等级 W');
eq(W.speedLimit('Y'), 300, '速度等级 Y');
eq(W.requiredLoadPerTyre(1000, 1.1), 550, '单胎需求（轴荷 1000kg × 1.1 安全系数）');

console.log('\n=== 8. 评级逻辑 ===');
const good = W.grade(
  W.compare(
    { tyre: { width: 225, aspect: 50, rim: 17 }, rimWidth: 7.5, et: 45.5 },
    { tyre: { width: 235, aspect: 45, rim: 18 }, rimWidth: 8, et: 42 }
  ), { rimWidthInch: 8, tyreWidth: 235 }
);
truthy(good.level <= 2, '温和改装评级为「' + good.label + '」(level ' + good.level + ')');

const bad = W.grade(
  W.compare(
    { tyre: { width: 225, aspect: 50, rim: 17 }, rimWidth: 7.5, et: 45.5 },
    { tyre: { width: 285, aspect: 30, rim: 21 }, rimWidth: 10.5, et: 15 }
  ), { rimWidthInch: 10.5, tyreWidth: 285 }
);
truthy(bad.level >= 2, '激进改装评级为「' + bad.label + '」(level ' + bad.level + ')');

console.log('\n=== 9. 轮胎规格推荐器 ===');
const recs = W.recommendTyres(18, 656.8, 2);
truthy(recs.length > 0, '18 寸在 ±2% 内找到 ' + recs.length + ' 个候选规格');
const best = recs[0];
truthy(Math.abs(best.pct) <= 2, '最佳候选 ' + best.size + '（偏差 ' + best.pct + '%）');
truthy(recs.some(r => r.size === '225/45R18'), '候选中包含原厂 18 寸规格 225/45R18');

const rimW = W.recommendRimWidth(235);
approx(rimW.ideal, 8.1, 0.2, '235 胎宽的理想辋宽');

console.log('\n=== 10. 螺栓长度 ===');
const b = W.boltLength(25, 30, 22);
eq(b.recommend, 17, '安装盘薄 8mm → 建议螺栓长度');
truthy(b.tolerance.indexOf('14') === 0, '可用范围 ' + b.tolerance);

console.log('\n=== 11. 数据文件一致性 ===');
global.window = {};
require(path.join(__dirname, '..', 'data', 'c-class-data.js'));
const D = global.window.CDATA;
eq(D.generations.length, 4, '代际数量');
eq(D.generations.map(g => g.chassis).join(','), 'W203/S203,W204/S204,W205/S205,W206/S206', '代际顺序');
truthy(D.generations.every(g => g.wheels.pcd === '5x112'), '全部代际 PCD 均为 5x112');
truthy(D.generations.every(g => g.wheels.center_bore_mm === 66.6), '全部代际中心孔均为 66.6mm');
eq(String(D.generations[0].wheels.bolt_thread).slice(0, 8), 'M12x1.5', 'W203 螺栓为 M12x1.5');
truthy(D.generations.slice(1).every(g => String(g.wheels.bolt_thread).indexOf('M14x1.5') === 0), 'W204 起螺栓均为 M14x1.5');
truthy(D.plans.every(p => {
  const pw = W.parseWheel(p.front.size);
  return pw && pw.et !== null;
}), '全部推荐方案的前轮规格都含可解析的 ET');
truthy(D.generations.every(g => (g.wheels.oem || []).every(o => W.parseWheel(o.size) && W.parseTyre(o.tyre))),
  '全部原厂轮毂与轮胎规格均可解析');
truthy(D.engineOil.every(e => e.cert && e.cert.indexOf('MB 229') === 0), '全部发动机用油都标注了 MB 229.x 认证');

console.log('\n' + '='.repeat(56));
console.log('结果：通过 ' + pass + ' 项，失败 ' + fail + ' 项');
console.log('='.repeat(56) + '\n');
process.exit(fail === 0 ? 0 : 1);
