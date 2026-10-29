/* ==========================================================================
   wheel-calc.js —— 轮胎 / 轮毂数据计算引擎
   奔驰 C 级旅行车改装计算器核心逻辑（纯函数 + 页面绑定）
   --------------------------------------------------------------------------
   坐标约定：以「轮毂安装面」（轮毂贴合刹车盘/轮毂轴承的那个平面）为原点 0，
             x 轴指向车身外侧为正，单位 mm。
             ET 为正值时，轮辋中心线位于安装面内侧（x = -ET）。
   ========================================================================== */
(function (global) {
  'use strict';

  /* ---------------------------------------------------------------- 常量表 */

  // 载重指数（ETRTO）→ 单胎最大承载 kg
  const LOAD_INDEX = {
    75: 387, 76: 400, 77: 412, 78: 425, 79: 437, 80: 450,
    81: 462, 82: 475, 83: 487, 84: 500, 85: 515, 86: 530,
    87: 545, 88: 560, 89: 580, 90: 600, 91: 615, 92: 630,
    93: 650, 94: 670, 95: 690, 96: 710, 97: 730, 98: 750,
    99: 775, 100: 800, 101: 825, 102: 850, 103: 875, 104: 900,
    105: 925, 106: 950, 107: 975, 108: 1000, 109: 1030, 110: 1060,
    111: 1090, 112: 1120, 113: 1150, 114: 1180, 115: 1215, 116: 1250,
    117: 1285, 118: 1320, 119: 1360, 120: 1400, 121: 1450
  };

  // 速度等级 → 最高时速 km/h
  const SPEED_RATING = {
    L: 120, M: 130, N: 140, P: 150, Q: 160, R: 170, S: 180,
    T: 190, U: 200, H: 210, V: 240, W: 270, Y: 300, ZR: 240
  };

  // 奔驰 C 级通用轮毂安装参数（四代通用）
  const MB_COMMON = {
    pcd: '5x112',
    centerBore: 66.6,
    boltThread: 'M14x1.5',
    boltSeat: '球面 R14（Ball seat）'
  };

  const INCH = 25.4;

  /* ------------------------------------------------------------ 解析函数 */

  /**
   * 解析轮胎规格字符串，例如 "225/45R17 91W"、"225/45 ZR17"、"245/40R18"
   * @returns {{width:number, aspect:number, rim:number, load:?number, speed:?string, raw:string}|null}
   */
  function parseTyre(str) {
    if (!str) return null;
    const s = String(str).toUpperCase().replace(/\s+/g, ' ').trim();
    const m = s.match(/(\d{3})\s*\/\s*(\d{2})\s*(?:Z?\s*R)\s*(\d{2}(?:\.\d)?)\s*(?:(\d{2,3})\s*([A-Z]{1,2})?)?/);
    if (!m) return null;
    return {
      width: +m[1],
      aspect: +m[2],
      rim: +m[3],
      load: m[4] ? +m[4] : null,
      speed: m[5] || null,
      raw: s
    };
  }

  /**
   * 解析轮毂规格字符串，例如 "7.5Jx17 ET45.5"、"8.0J x 18 ET 44"、"7.5Jx17H2 ET47"
   * @returns {{width:number, rim:number, et:?number, raw:string}|null}
   */
  function parseWheel(str) {
    if (!str) return null;
    const s = String(str).toUpperCase().replace(/\s+/g, ' ').trim();
    // 轮辋类型码：J / JJ（乘用车）、B（5° 斜底，常见于钢制备胎圈）、D / K 等
    const m = s.match(/(\d{1,2}(?:\.\d)?)\s*[JBDK]{0,2}\s*[X×]\s*(\d{2})(?:\s*(?:H2|EH2|ZR))?\s*(?:ET\s*(-?\d{1,3}(?:\.\d)?))?/);
    if (!m) return null;
    return { width: +m[1], rim: +m[2], et: m[3] !== undefined ? +m[3] : null, raw: s };
  }

  /* ------------------------------------------------------- 几何计算核心 */

  /**
   * 由轮胎规格算外径 / 周长等
   */
  function tyreGeometry(t) {
    const sidewall = t.width * t.aspect / 100;              // 单侧胎壁高度 mm
    const dia = t.rim * INCH + 2 * sidewall;                // 外径 mm
    const circ = Math.PI * dia;                             // 周长 mm
    return {
      sidewall: round(sidewall, 1),
      diameter: round(dia, 1),
      radius: round(dia / 2, 1),
      circumference: round(circ, 1),
      revsPerKm: Math.round(1e6 / circ),
      revsPerMile: Math.round(1609344 / circ)
    };
  }

  /**
   * 轮毂 + 轮胎相对安装面的几何位置
   * @param {number} rimWidthInch 轮辋宽度（J 值，英寸）
   * @param {number} et 偏距 mm
   * @param {number} [tyreWidthMm] 轮胎名义截面宽 mm（用于胎壁外缘估算）
   */
  function fitmentGeometry(rimWidthInch, et, tyreWidthMm) {
    const rimMm = rimWidthInch * INCH;
    // 保留 2 位小数：足够展示精度，同时避免多次舍入导致差值累积误差
    const g = {
      rimMm: round(rimMm, 2),
      backspace: round(rimMm / 2 + et, 2),      // 安装面 → 轮辋内缘
      frontspace: round(rimMm / 2 - et, 2),     // 安装面 → 轮辋外缘
      rimOuterX: round(rimMm / 2 - et, 2),      // 轮辋外缘坐标（+ 为向车外）
      rimInnerX: round(-(rimMm / 2 + et), 2)    // 轮辋内缘坐标（- 为向车内）
    };
    if (tyreWidthMm) {
      // 轮胎对称于轮辋中心线，胎壁总宽按名义截面宽估算
      const bulge = (tyreWidthMm - rimMm) / 2;
      g.tyreBulge = round(bulge, 2);
      g.tyreOuterX = round(tyreWidthMm / 2 - et, 2);
      g.tyreInnerX = round(-(tyreWidthMm / 2 + et), 2);
    }
    return g;
  }

  /**
   * 新旧配置对比
   */
  function compare(oem, target) {
    const oT = oem.tyre, nT = target.tyre;
    const oG = tyreGeometry(oT), nG = tyreGeometry(nT);
    const oW = fitmentGeometry(oem.rimWidth, oem.et, oT.width);
    const nW = fitmentGeometry(target.rimWidth, target.et, nT.width);

    const diaDelta = nG.diameter - oG.diameter;
    const diaPct = diaDelta / oG.diameter * 100;
    // 速度表：仪表按原厂外径标定，实车换胎后真实车速 = 仪表车速 × (新径/原径)
    const speedoPct = (nG.diameter / oG.diameter - 1) * 100;
    const trueSpeedAt100 = 100 * (nG.diameter / oG.diameter);

    const outX = nW.rimOuterX - oW.rimOuterX;   // 轮辋外缘外移量
    const inX = nW.rimInnerX - oW.rimInnerX;    // 轮辋内缘移动量（- 更靠内）
    const tOutX = (nW.tyreOuterX !== undefined && oW.tyreOuterX !== undefined)
      ? nW.tyreOuterX - oW.tyreOuterX : outX;
    const tInX = (nW.tyreInnerX !== undefined && oW.tyreInnerX !== undefined)
      ? nW.tyreInnerX - oW.tyreInnerX : inX;

    return {
      oem: { tyre: oT, tyreGeo: oG, wheel: oW },
      target: { tyre: nT, tyreGeo: nG, wheel: nW },
      diameterDelta: round(diaDelta, 1),
      diameterPct: round(diaPct, 2),
      sidewallDelta: round(nG.sidewall - oG.sidewall, 1),
      rideHeightDelta: round(diaDelta / 2, 1),        // 离地间隙/车身高度变化
      clearanceDelta: round(diaDelta / 2, 1),         // 轮拱间隙变化（负=更满）
      circumferenceDelta: round(nG.circumference - oG.circumference, 1),
      speedoPct: round(speedoPct, 2),
      trueSpeedAt100: round(trueSpeedAt100, 1),
      trueSpeedAt120: round(120 * (nG.diameter / oG.diameter), 1),
      rimOuterMove: round(outX, 1),
      rimInnerMove: round(inX, 1),
      tyreOuterMove: round(tOutX, 1),
      tyreInnerMove: round(tInX, 1),
      trackChangePerAxle: round(tOutX * 2, 1),
      scrubRadiusDelta: round(tOutX, 1),
      absDeltaPct: Math.abs(round(speedoPct, 2)),
      revsPerKmDelta: nG.revsPerKm - oG.revsPerKm
    };
  }

  /* ----------------------------------------------------------- 评级规则 */

  /**
   * 综合合规性评级
   */
  function grade(cmp, opts) {
    opts = opts || {};
    const issues = [];
    let level = 0; // 0=ok 1=注意 2=不建议 3=禁止/严重

    const absDia = Math.abs(cmp.diameterPct);
    if (absDia > 5) { level = Math.max(level, 3); issues.push({ t: 'bad', m: '轮胎外径偏差 ' + cmp.diameterPct + '%，远超 ±5% 安全范围，ABS/ESP/变速箱换挡逻辑均会受严重影响，且可能刮蹭轮拱。' }); }
    else if (absDia > 3) { level = Math.max(level, 2); issues.push({ t: 'bad', m: '外径偏差 ' + cmp.diameterPct + '%，超过 ±3% 通用安全线，可能出现 ESP/ABS 报警与码表明显误差。' }); }
    else if (absDia > 2) { level = Math.max(level, 1); issues.push({ t: 'warn', m: '外径偏差 ' + cmp.diameterPct + '%，处于 ±2%～3% 的边缘区间，可接受但建议校正码表。' }); }
    else { issues.push({ t: 'ok', m: '外径偏差 ' + cmp.diameterPct + '%，在 ±2% 理想范围内。' }); }

    // 外侧外移量：轮胎胎壁相对原厂外移 >12mm 在 C 级旅行车上通常已接近轮拱极限
    if (cmp.tyreOuterMove > 20) { level = Math.max(level, 3); issues.push({ t: 'bad', m: '胎壁外移 ' + cmp.tyreOuterMove + ' mm，前轮极易顶到翼子板/内衬，后轮可能刮轮眉。' }); }
    else if (cmp.tyreOuterMove > 12) { level = Math.max(level, 2); issues.push({ t: 'bad', m: '胎壁外移 ' + cmp.tyreOuterMove + ' mm，接近轮拱极限，满载或打方向时可能刮蹭，需配合负倾角或卷边。' }); }
    else if (cmp.tyreOuterMove > 6) { level = Math.max(level, 1); issues.push({ t: 'warn', m: '胎壁外移 ' + cmp.tyreOuterMove + ' mm，属于常见的“齐边”范围，建议检查满载与打死方向的间隙。' }); }
    else { issues.push({ t: 'ok', m: '外侧外移 ' + cmp.tyreOuterMove + ' mm，处于安全范围。' }); }

    // 内侧内移量：>15mm 需重点检查避震筒、内衬、刹车油管
    if (cmp.tyreInnerMove < -25) { level = Math.max(level, 3); issues.push({ t: 'bad', m: '内侧侵入 ' + Math.abs(cmp.tyreInnerMove) + ' mm，几乎必然与避震筒/内衬干涉。' }); }
    else if (cmp.tyreInnerMove < -15) { level = Math.max(level, 2); issues.push({ t: 'bad', m: '内侧侵入 ' + Math.abs(cmp.tyreInnerMove) + ' mm，需实测避震筒与内衬间隙（AMG 大刹车车型更紧张）。' }); }
    else if (cmp.tyreInnerMove < -8) { level = Math.max(level, 1); issues.push({ t: 'warn', m: '内侧侵入 ' + Math.abs(cmp.tyreInnerMove) + ' mm，一般可行，建议打满方向检查。' }); }
    else { issues.push({ t: 'ok', m: '内侧间隙变化 ' + cmp.tyreInnerMove + ' mm，无干涉风险。' }); }

    // 轮距变化与主销偏移
    if (Math.abs(cmp.trackChangePerAxle) > 40) { level = Math.max(level, 2); issues.push({ t: 'bad', m: '轮距单轴变化 ' + cmp.trackChangePerAxle + ' mm，主销偏移量改变过大，转向回正与轮胎磨损会明显劣化，且可能超出法规轮距变更限值。' }); }
    else if (Math.abs(cmp.trackChangePerAxle) > 24) { level = Math.max(level, 1); issues.push({ t: 'warn', m: '轮距变化 ' + cmp.trackChangePerAxle + ' mm，转向手感与胎肩磨损会有所变化，建议重做四轮定位。' }); }

    // 轮辋宽度与轮胎宽度匹配（J 值容差 ±0～2 英寸范围内需合理）
    const rimMm = opts.rimWidthInch ? opts.rimWidthInch * INCH : null;
    if (rimMm && opts.tyreWidth) {
      const ratio = opts.tyreWidth / rimMm;
      if (ratio < 1.0) { issues.push({ t: 'bad', m: '轮胎宽度小于轮辋宽度，属于“拉伸胎”（stretch），胎唇受力异常、脱圈风险高，且不合规。' }); level = Math.max(level, 2); }
      else if (ratio > 1.35) { issues.push({ t: 'warn', m: '轮胎相对轮辋过宽（比 ' + round(ratio, 2) + '），胎侧过度鼓出、转向响应变差，建议轮辋加宽。' }); level = Math.max(level, 1); }
      else { issues.push({ t: 'ok', m: '胎宽/辋宽比 ' + round(ratio, 2) + '，属于合理匹配区间（建议 1.06～1.25）。' }); }
    }

    // 载荷余量
    if (opts.loadCapacity && opts.requiredLoad) {
      const margin = (opts.loadCapacity - opts.requiredLoad) / opts.requiredLoad * 100;
      if (margin < 0) { level = Math.max(level, 3); issues.push({ t: 'bad', m: '轮胎载重指数不足：单胎承载 ' + opts.loadCapacity + ' kg < 需求 ' + round(opts.requiredLoad, 0) + ' kg，严重安全隐患。' }); }
      else if (margin < 5) { level = Math.max(level, 2); issues.push({ t: 'bad', m: '载重余量仅 ' + round(margin, 1) + '%，满载/高速工况偏紧，建议提升载重指数。' }); }
      else { issues.push({ t: 'ok', m: '载重余量 ' + round(margin, 1) + '%，满足需求。' }); }
    }

    // 速度等级
    if (opts.speedRating && opts.requiredSpeed) {
      if (SPEED_RATING[opts.speedRating] < opts.requiredSpeed) {
        level = Math.max(level, 2);
        issues.push({ t: 'bad', m: '速度等级 ' + opts.speedRating + '（' + SPEED_RATING[opts.speedRating] + ' km/h）低于车辆最高车速所需的 ' + opts.requiredSpeed + ' km/h。' });
      } else {
        issues.push({ t: 'ok', m: '速度等级 ' + opts.speedRating + '（' + SPEED_RATING[opts.speedRating] + ' km/h）满足要求。' });
      }
    }

    const label = ['可以安装', '基本可行，注意细节', '风险较高，不建议', '不可安装'][level];
    const cls = ['ok', 'warn', 'bad', 'bad'][level];
    return { level: level, label: label, cls: cls, issues: issues };
  }

  /* ------------------------------------------------- 轮胎升级规格推荐器 */

  /**
   * 给定目标轮辋直径与原厂外径，找出外径偏差在容差内的候选规格
   */
  function recommendTyres(rimInch, targetDiameter, tolerancePct, opts) {
    opts = opts || {};
    const minW = opts.minWidth || 185;
    const maxW = opts.maxWidth || 325;
    const tol = targetDiameter * (tolerancePct / 100);
    const out = [];
    for (let w = minW; w <= maxW; w += 5) {
      for (let a = 25; a <= 75; a += 5) {
        const sidewall = w * a / 100;
        const dia = rimInch * INCH + 2 * sidewall;
        const diff = dia - targetDiameter;
        if (Math.abs(diff) <= tol) {
          // 合理的胎宽/辋宽关系需要轮辋宽度，此处仅做几何筛选
          out.push({
            size: w + '/' + a + 'R' + rimInch,
            width: w,
            aspect: a,
            diameter: round(dia, 1),
            diff: round(diff, 1),
            pct: round(diff / targetDiameter * 100, 2),
            sidewall: round(sidewall, 1)
          });
        }
      }
    }
    out.sort(function (x, y) { return Math.abs(x.diff) - Math.abs(y.diff); });
    return out;
  }

  /**
   * 推荐与给定胎宽匹配的轮辋宽度区间（英寸）
   */
  function recommendRimWidth(tyreWidth) {
    // 经验：轮辋宽度 ≈ 胎宽 / 25.4 × 0.82 ～ 0.95
    const ideal = tyreWidth / INCH;
    return {
      min: round(ideal * 0.82, 1),
      ideal: round(ideal * 0.88, 1),
      max: round(ideal * 0.95, 1)
    };
  }

  /* ------------------------------------------------------------- 小工具 */

  function round(v, d) {
    const f = Math.pow(10, d || 0);
    return Math.round(v * f) / f;
  }

  function loadCapacity(li) { return LOAD_INDEX[li] || null; }

  function speedLimit(sr) { return SPEED_RATING[sr] || null; }

  /**
   * 载重需求：按单轴荷/2 计算，含安全系数
   */
  function requiredLoadPerTyre(axleLoadKg, factor) {
    return round(axleLoadKg / 2 * (factor || 1), 0);
  }

  /**
   * 轮毂螺栓长度建议
   * @param {number} oemBoltLen 原厂螺栓螺纹长度 mm
   * @param {number} oemPadThickness 原厂轮毂安装盘厚度 mm
   * @param {number} newPadThickness 新轮毂安装盘厚度 mm
   */
  function boltLength(oemBoltLen, oemPadThickness, newPadThickness) {
    const need = oemBoltLen + (newPadThickness - oemPadThickness);
    // 安全啮合圈数：M14x1.5 至少 8 圈 ≈ 12mm，推荐 10 圈 ≈ 15mm
    const minEngage = 12;
    return {
      recommend: round(need, 0),
      tolerance: round(need - 3, 0) + ' ～ ' + round(need + 3, 0),
      minEngagement: minEngage,
      note: 'M14×1.5 螺栓建议最小啮合长度 ' + minEngage + ' mm（约 8 圈螺纹），赛道/激烈驾驶建议 15 mm 以上。'
    };
  }

  /* ------------------------------------------------------ 页面 UI 绑定 */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function setVal(sel, v) { const el = $(sel); if (el && v !== undefined && v !== null) el.value = v; }
  function num(sel) { const el = $(sel); if (!el) return NaN; const v = parseFloat(el.value); return isNaN(v) ? NaN : v; }

  function initCalculator() {
    const form = $('#calc-form');
    if (!form) return;

    /* ---- 从数据层载入车型原厂配置选项 ---- */
    const genSel = $('#calc-generation');
    const trimSel = $('#calc-trim');
    const DATA = global.CDATA || {};

    function fillTrims() {
      if (!genSel || !trimSel || !DATA.generations) return;
      const gen = DATA.generations.find(function (g) { return g.chassis === genSel.value; });
      trimSel.innerHTML = '';
      if (!gen || !gen.wheels || !gen.wheels.oem) return;
      gen.wheels.oem.forEach(function (o, i) {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = o.size + ' ET' + o.et + ' · ' + o.tyre + (o.models ? ' （' + o.models + '）' : '');
        trimSel.appendChild(opt);
      });
    }

    function applyOem(idx) {
      if (!DATA.generations) return;
      const gen = DATA.generations.find(function (g) { return g.chassis === genSel.value; });
      if (!gen || !gen.wheels || !gen.wheels.oem) return;
      const o = gen.wheels.oem[idx || 0];
      if (!o) return;
      setVal('#oem-tyre', o.tyre);
      const pw = parseWheel(o.size) || {};
      setVal('#oem-rimwidth', pw.width);
      setVal('#oem-et', o.et);
      setVal('#oem-track', gen.body && gen.body.track_front_mm ? gen.body.track_front_mm : '');
      compute();
    }

    if (genSel) {
      genSel.addEventListener('change', function () { fillTrims(); applyOem(0); });
      fillTrims();
    }
    if (trimSel) trimSel.addEventListener('change', function () { applyOem(+trimSel.value); });

    /* ---- 输入变化实时计算 ---- */
    $$('#calc-form input, #calc-form select').forEach(function (el) {
      el.addEventListener('input', compute);
      el.addEventListener('change', compute);
    });

    const presetBtn = $('#btn-preset');
    if (presetBtn) presetBtn.addEventListener('click', function () { applyOem(trimSel ? +trimSel.value : 0); });

    function readTyre(prefix) {
      const direct = $('#' + prefix + '-tyre');
      if (direct) {
        const t = parseTyre(direct.value);
        if (t) return t;
      }
      const w = num('#' + prefix + '-width');
      const a = num('#' + prefix + '-aspect');
      const r = num('#' + prefix + '-rim');
      if (isNaN(w) || isNaN(a) || isNaN(r)) return null;
      return { width: w, aspect: a, rim: r, load: num('#' + prefix + '-load') || null, speed: null, raw: w + '/' + a + 'R' + r };
    }

    function compute() {
      const oT = readTyre('oem');
      const nT = readTyre('target');
      const oRW = num('#oem-rimwidth'), oET = num('#oem-et');
      const nRW = num('#target-rimwidth'), nET = num('#target-et');
      const out = $('#calc-result');
      if (!out) return;
      if (!oT || !nT || isNaN(oRW) || isNaN(oET) || isNaN(nRW) || isNaN(nET)) {
        out.innerHTML = '<div class="line"><span class="lbl">请完整填写原厂与目标配置</span></div>';
        return;
      }

      const cmp = compare(
        { tyre: oT, rimWidth: oRW, et: oET },
        { tyre: nT, rimWidth: nRW, et: nET }
      );

      // 载荷
      const axleLoad = num('#calc-axleload');
      const oemLI = num('#oem-load'), newLI = num('#target-load');
      const loadCap = newLI ? loadCapacity(newLI) : (nT.load ? loadCapacity(nT.load) : null);
      const reqLoad = (!isNaN(axleLoad) && axleLoad > 0) ? requiredLoadPerTyre(axleLoad, 1.1) : null;

      const g = grade(cmp, {
        rimWidthInch: nRW,
        tyreWidth: nT.width,
        loadCapacity: loadCap,
        requiredLoad: reqLoad,
        speedRating: nT.speed,
        requiredSpeed: 240
      });

      function line(lbl, val, cls) {
        return '<div class="line"><span class="lbl">' + lbl + '</span><span class="val ' + (cls || '') + '">' + val + '</span></div>';
      }
      function sign(v) { return (v > 0 ? '+' : '') + v; }

      let html = '';
      html += '<div class="line"><span class="lbl">综合结论</span><span class="badge ' + g.cls + '">' + g.label + '</span></div>';
      html += line('轮胎外径', cmp.oem.tyreGeo.diameter + ' → ' + cmp.target.tyreGeo.diameter + ' mm', '');
      html += line('外径变化', sign(cmp.diameterDelta) + ' mm（' + sign(cmp.diameterPct) + '%）',
        Math.abs(cmp.diameterPct) <= 2 ? 'ok' : (Math.abs(cmp.diameterPct) <= 3 ? 'warn' : 'bad'));
      html += line('胎壁高度', cmp.oem.tyreGeo.sidewall + ' → ' + cmp.target.tyreGeo.sidewall + ' mm（' + sign(cmp.sidewallDelta) + '）', '');
      html += line('离地间隙变化', sign(cmp.rideHeightDelta) + ' mm', '');
      html += line('轮拱填充（视觉）', sign(-cmp.clearanceDelta) + ' mm', '');
      html += line('周长', cmp.oem.tyreGeo.circumference + ' → ' + cmp.target.tyreGeo.circumference + ' mm', '');
      html += line('每公里转数', cmp.oem.tyreGeo.revsPerKm + ' → ' + cmp.target.tyreGeo.revsPerKm + '（' + sign(cmp.revsPerKmDelta) + '）', '');
      html += line('码表 100 km/h 时真实车速', cmp.trueSpeedAt100 + ' km/h',
        Math.abs(cmp.speedoPct) <= 2 ? 'ok' : (Math.abs(cmp.speedoPct) <= 3 ? 'warn' : 'bad'));
      html += line('码表 120 km/h 时真实车速', cmp.trueSpeedAt120 + ' km/h', '');
      html += '<div class="line"><span class="lbl">轮辋相对原厂</span><span class="val"></span></div>';
      html += line('外缘外移', sign(cmp.rimOuterMove) + ' mm', Math.abs(cmp.rimOuterMove) <= 12 ? 'ok' : 'warn');
      html += line('内缘移动', sign(cmp.rimInnerMove) + ' mm', cmp.rimInnerMove >= -20 ? 'ok' : 'warn');
      html += line('胎壁外移（估算）', sign(cmp.tyreOuterMove) + ' mm',
        cmp.tyreOuterMove <= 6 ? 'ok' : (cmp.tyreOuterMove <= 12 ? 'warn' : 'bad'));
      html += line('胎壁内移（估算）', sign(cmp.tyreInnerMove) + ' mm',
        cmp.tyreInnerMove >= -8 ? 'ok' : (cmp.tyreInnerMove >= -15 ? 'warn' : 'bad'));
      html += line('单轴轮距变化', sign(cmp.trackChangePerAxle) + ' mm', Math.abs(cmp.trackChangePerAxle) <= 24 ? 'ok' : 'warn');
      html += line('主销偏移量变化', sign(cmp.scrubRadiusDelta) + ' mm', '');
      html += line('新轮辋背距 / 前距', cmp.target.wheel.backspace + ' / ' + cmp.target.wheel.frontspace + ' mm', '');
      html += line('原厂轮辋背距 / 前距', cmp.oem.wheel.backspace + ' / ' + cmp.oem.wheel.frontspace + ' mm', '');
      if (loadCap || reqLoad) {
        html += line('单胎承载能力', (loadCap || '—') + ' kg', '');
        html += line('需求（轴荷/2×1.1）', (reqLoad || '—') + ' kg', '');
      }
      out.innerHTML = html;

      // 评级明细
      const detail = $('#calc-issues');
      if (detail) {
        detail.innerHTML = g.issues.map(function (i) {
          const cls = i.t === 'ok' ? 'ok' : (i.t === 'warn' ? 'warn' : 'bad');
          return '<div class="line"><span class="lbl" style="flex:1">' + i.m + '</span><span class="badge ' + cls + '">' + (i.t === 'ok' ? '通过' : i.t === 'warn' ? '注意' : '风险') + '</span></div>';
        }).join('');
      }

      // 速度表误差条
      const bar = $('#calc-speedbar');
      if (bar) {
        const pct = Math.max(-6, Math.min(6, cmp.speedoPct));
        const w = Math.abs(pct) / 6 * 100;
        const cls = Math.abs(pct) <= 2 ? '' : (Math.abs(pct) <= 3 ? 'warn' : 'bad');
        bar.innerHTML = '<div class="small muted">码表误差 ' + sign(cmp.speedoPct) + '%（正值 = 码表偏慢，实际车速更快）</div>' +
          '<div class="gauge"><span class="' + cls + '" style="width:' + w + '%"></span></div>';
      }
    }

    /* ---- 轮胎规格推荐器 ---- */
    const recBtn = $('#btn-recommend');
    if (recBtn) {
      recBtn.addEventListener('click', function () {
        const rim = num('#rec-rim');
        const base = parseTyre($('#rec-base').value);
        const tol = num('#rec-tol') || 2;
        const box = $('#rec-result');
        if (!box) return;
        if (isNaN(rim) || !base) {
          box.innerHTML = '<div class="small bad">请输入原厂轮胎规格与目标轮辋直径</div>';
          return;
        }
        const baseGeo = tyreGeometry(base);
        const list = recommendTyres(rim, baseGeo.diameter, tol);
        if (!list.length) {
          box.innerHTML = '<div class="small muted">在该容差下没有找到合适的规格，请放宽容差。</div>';
          return;
        }
        box.innerHTML = '<div class="table-scroll"><table><thead><tr>' +
          '<th>轮胎规格</th><th class="num">外径 mm</th><th class="num">与原厂差</th><th class="num">偏差 %</th><th class="num">推荐辋宽</th><th>说明</th>' +
          '</tr></thead><tbody>' +
          list.slice(0, 30).map(function (r) {
            const rw = recommendRimWidth(r.width);
            const note = Math.abs(r.pct) <= 1 ? '<span class="badge ok">最接近</span>' :
              Math.abs(r.aspect - base.aspect) === 0 ? '<span class="badge info">同扁平比</span>' :
                (r.aspect < base.aspect ? '<span class="badge warn">更薄胎壁</span>' : '<span class="badge gray">更厚胎壁</span>');
            return '<tr><td class="mono">' + r.size + '</td><td class="num">' + r.diameter + '</td><td class="num">' + (r.diff > 0 ? '+' : '') + r.diff + '</td><td class="num">' + (r.pct > 0 ? '+' : '') + r.pct + '</td><td class="num">' + rw.min + '–' + rw.max + 'J</td><td>' + note + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      });
    }

    /* ---- 载重指数查询 ---- */
    const liTable = $('#li-table-body');
    if (liTable) {
      liTable.innerHTML = Object.keys(LOAD_INDEX).map(function (k) {
        return '<tr><td class="mono">' + k + '</td><td class="num">' + LOAD_INDEX[k] + '</td><td class="num">' + (LOAD_INDEX[k] * 2) + '</td></tr>';
      }).join('');
    }

    /* ---- 螺栓长度计算 ---- */
    const boltBtn = $('#btn-bolt');
    if (boltBtn) {
      boltBtn.addEventListener('click', function () {
        const l = num('#bolt-oem-len'), a = num('#bolt-oem-pad'), b = num('#bolt-new-pad');
        const box = $('#bolt-result');
        if (!box) return;
        if (isNaN(l)) { box.textContent = '请填写原厂螺栓螺纹长度'; return; }
        const r = boltLength(l, isNaN(a) ? 0 : a, isNaN(b) ? 0 : b);
        box.innerHTML = '<div class="line"><span class="lbl">建议螺纹长度</span><span class="val ok">' + r.recommend + ' mm</span></div>' +
          '<div class="line"><span class="lbl">可用范围</span><span class="val">' + r.tolerance + ' mm</span></div>' +
          '<div class="line"><span class="lbl">最小啮合</span><span class="val">' + r.minEngagement + ' mm</span></div>' +
          '<div class="small muted" style="margin-top:8px">' + r.note + '</div>';
      });
    }

    // 首次计算
    applyOem(0);
  }

  /* -------------------------------------------------------------- 导出 */

  const API = {
    LOAD_INDEX: LOAD_INDEX,
    SPEED_RATING: SPEED_RATING,
    MB_COMMON: MB_COMMON,
    parseTyre: parseTyre,
    parseWheel: parseWheel,
    tyreGeometry: tyreGeometry,
    fitmentGeometry: fitmentGeometry,
    compare: compare,
    grade: grade,
    recommendTyres: recommendTyres,
    recommendRimWidth: recommendRimWidth,
    loadCapacity: loadCapacity,
    speedLimit: speedLimit,
    requiredLoadPerTyre: requiredLoadPerTyre,
    boltLength: boltLength,
    round: round,
    init: initCalculator
  };

  global.WheelCalc = API;

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCalculator);
    } else {
      initCalculator();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
