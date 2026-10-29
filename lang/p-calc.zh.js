/* ==========================================================================
   p-calc.zh.js —— 计算器页（calculator.html）中文文案
   键命名：pg.calc.页面.元素   （页面级字典，与核心 zh.js / en.js 互不干扰）
   用法：先引入 lang/zh.js、lang/en.js，再引入本文件
   ========================================================================== */
Object.assign(window.I18N_DATA.zh = window.I18N_DATA.zh || {}, {

  /* ---------------- 页头信息 ---------------- */
  'pg.calc.docTitle': '轮毂轮胎改装计算器 · 奔驰 C 级旅行车数据库',
  'pg.calc.description': '奔驰 C 级旅行车（S203/S204/S205/S206）轮毂轮胎改装计算器：外径与码表误差、ET 偏距外移量、轮距与主销偏移变化、载重指数校验、轮胎规格推荐。',

  /* ---------------- Hero ---------------- */
  'pg.calc.hero.eyebrow': 'Calculator',
  'pg.calc.hero.title': '轮毂轮胎改装<span class="accent">计算器</span>',
  'pg.calc.hero.desc': '改装轮毂第一个要回答的问题不是“好不好看”，而是“装上去会动到哪里”。本页实时计算轮胎外径与码表误差、ET 偏距带来的内外侧位移、轮距与主销偏移量变化、载重与速度等级是否够用，并给出综合结论。',

  'pg.calc.note.coord': '<strong>坐标约定：</strong>以轮毂安装面为基准，向车身外侧为正。ET 是轮辋中心线到安装面的距离（正值表示轮毂向车内缩）。“胎壁外移”指轮胎最外侧相对原厂的位移，是判断会不会刮翼子板的直接指标。',

  /* ---------------- 一节：配置对比 ---------------- */
  'pg.calc.s1.title': '配置对比<span class="tag">原厂 → 目标</span>',
  'pg.calc.s1.lead': '先选车型自动填入原厂轮毂轮胎，也可以完全手动输入。',

  'pg.calc.oem.title': '原厂配置（OEM）',
  'pg.calc.oem.gen': '车型代际 <span class="hint">自动填入原厂规格</span>',
  'pg.calc.oem.opt.s203': 'S203 · W203 第二代（2001–2007）',
  'pg.calc.oem.opt.s204': 'S204 · W204 第三代（2007–2014）',
  'pg.calc.oem.opt.s205': 'S205 · W205 第四代（2014–2021）',
  'pg.calc.oem.opt.s206': 'S206 · W206 第五代（2021–）',
  'pg.calc.oem.trim': '原厂配置项',
  'pg.calc.oem.tyre': '原厂轮胎规格',
  'pg.calc.oem.tyrePh': '225/50R17 98W',
  'pg.calc.oem.preset': '重新载入原厂预设',

  'pg.calc.tgt.title': '目标配置（改装）',
  'pg.calc.tgt.tyre': '目标轮胎规格',
  'pg.calc.tgt.tyrePh': '245/40R18 97Y',
  'pg.calc.tgt.axle': '该轴荷 <span class="hint">kg，可选，用于载重校验（行驶证整备质量或地磅实测单轴）</span>',
  'pg.calc.tgt.axlePh': '例如 1000',
  'pg.calc.tgt.axleTip': '提示：前轴荷一般为整备质量的 52%～57%，后轴荷 43%～48%。取较大的一轴做校验最保险。',

  'pg.calc.label.rimWidth': '轮辋宽 <span class="hint">J</span>',
  'pg.calc.label.et': 'ET <span class="hint">mm</span>',
  'pg.calc.label.load': '载重指数',

  'pg.calc.result.title': '计算结果',
  'pg.calc.issues.title': '逐项检查',

  /* ---------------- 二节：规格推荐器 ---------------- */
  'pg.calc.s2.title': '轮胎规格推荐器<span class="tag">保持外径</span>',
  'pg.calc.s2.lead': '换了更大直径的轮辋，需要换更薄的胎来维持外径。输入原厂轮胎与目标轮辋直径，列出所有外径偏差在容差内的候选规格，并按接近程度排序。',
  'pg.calc.rec.base': '原厂轮胎规格 <span class="hint">作为外径基准</span>',
  'pg.calc.rec.rim': '目标轮辋直径 <span class="hint">英寸</span>',
  'pg.calc.rec.tol': '允许偏差 <span class="hint">%</span>',
  'pg.calc.rec.btn': '生成推荐规格',
  'pg.calc.rec.tip': '经验值：外径偏差控制在 <strong>±2%</strong> 内最理想；±2%～3% 需接受码表误差；超过 ±3% 不建议，超过 ±5% 属于危险改装。',
  'pg.calc.rec.candidates': '候选规格',
  'pg.calc.rec.empty': '点击左侧按钮生成。',

  /* ---------------- 三节：载重指数 ---------------- */
  'pg.calc.s3.title': '载重指数对照表<span class="tag">Load Index</span>',
  'pg.calc.s3.lead': '载重指数是改装中最容易被忽略、后果最严重的一项。指数每差 1 级约差 2.5% 承载能力，四条胎的总承载能力必须大于车辆最大允许总质量（GVWR）。',
  'pg.calc.li.th.index': '载重指数',
  'pg.calc.li.th.single': '单胎 kg',
  'pg.calc.li.th.four': '四胎合计 kg',
  'pg.calc.li.how.title': '怎么用这张表',
  'pg.calc.li.how.li1': '查行驶证上的<strong>最大允许总质量</strong>（GVWR），例如 2150 kg。',
  'pg.calc.li.how.li2': '四胎合计承载必须 ≥ GVWR。2150 / 4 ≈ 538 kg/条，查表得载重指数 <strong>86</strong>（530 kg）不够，需要 <strong>87</strong>（545 kg）。',
  'pg.calc.li.how.li3': '但真实工况下前后轴荷不均，应按<strong>较重的一轴</strong>核算：前轴 1150 kg → 每条需 ≥575 kg → 指数 <strong>89</strong>。',
  'pg.calc.li.how.li4': '再留 10% 余量，实际选 90（600 kg）以上更稳妥。',
  'pg.calc.li.wagonNote': '<strong>旅行车的额外负担：</strong>旅行版比三厢版整备质量通常多 30～60 kg，且后备箱满载概率高得多。经常满员+满载长途的，建议比理论值再高 1～2 级。',
  'pg.calc.speed.title': '速度等级',
  'pg.calc.speed.th.grade': '等级',
  'pg.calc.speed.th.max': '最高 km/h',
  'pg.calc.speed.note': '奔驰 C 级旅行车（含 AMG）原厂多为 <strong>W（270 km/h）</strong> 或 <strong>Y（300 km/h）</strong>。降级到 H/V 在德国不限速高速上属于不合规，但日常代步可接受——前提是别超等级上限。',

  /* ---------------- 四节：螺栓长度 ---------------- */
  'pg.calc.s4.title': '螺栓长度计算<span class="tag">Bolt Length</span>',
  'pg.calc.s4.lead': '换装非原厂轮毂最常见的致命错误是沿用原厂螺栓。轮毂安装盘（pad）厚度不同，螺栓的有效啮合长度就会不足或过长顶到刹车盘。',
  'pg.calc.bolt.oemLen': '原厂螺栓螺纹长度 <span class="hint">mm，C 级四代原厂球面螺栓通常 24～27 mm</span>',
  'pg.calc.bolt.oemPad': '原厂轮毂安装盘厚 <span class="hint">mm</span>',
  'pg.calc.bolt.newPad': '新轮毂安装盘厚 <span class="hint">mm</span>',
  'pg.calc.bolt.btn': '计算螺栓长度',
  'pg.calc.bolt.tip': '轮毂安装盘厚度是指轮毂中心盘与轮毂轴承面贴合处的实际厚度（含垫片）。改装轮毂为追求凹面（concave）常把这里做薄，于是同一个螺栓就会“多出头”，可能顶到轮毂轴承或刹车盘背面。',
  'pg.calc.bolt.plan': '建议规格',
  'pg.calc.bolt.placeholder': '填写左侧参数后点击计算',
  'pg.calc.bolt.seatNote': '<strong>球面 vs 锥面：</strong>奔驰原厂使用 <strong>球面（R14，球半径 14 mm）</strong> 螺栓。绝大多数改装轮毂（BBS、OZ、RAYS、Work 等）也采用球面座，可以直接沿用；但部分日系/美系或赛道用轮毂是 <strong>60° 锥面座</strong>，必须换用对应螺栓，混用会导致螺栓自动松脱。',

  /* ---------------- 五节：公式说明 ---------------- */
  'pg.calc.s5.title': '计算公式说明<span class="tag">Formula</span>',
  'pg.calc.f.od.title': '轮胎外径',
  'pg.calc.f.od.pre': '外径 = 轮辋直径 × 25.4 + 2 × (胎宽 × 扁平比 / 100)\n\n例：225/50R17\n= 17 × 25.4 + 2 × (225 × 0.50)\n= 431.8 + 225 = 656.8 mm',
  'pg.calc.f.speedo.title': '码表误差',
  'pg.calc.f.speedo.pre': '真实车速 = 仪表车速 × (新外径 / 原外径)\n\n新胎更大 → 实际比码表快（更容易吃罚单）\n新胎更小 → 实际比码表慢',
  'pg.calc.f.et.title': 'ET 与外移量',
  'pg.calc.f.et.pre': '轮辋外缘位移 = (新辋宽 − 原辋宽)/2 × 25.4 − (新ET − 原ET)\n轮辋内缘位移 = (新辋宽 − 原辋宽)/2 × 25.4 + (新ET − 原ET)\n\n背距(backspace) = 辋宽/2 × 25.4 + ET\n前距(frontspace) = 辋宽/2 × 25.4 − ET',
  'pg.calc.f.bulge.title': '胎壁位置估算',
  'pg.calc.f.bulge.pre': '胎壁外缘 ≈ 胎宽/2 − ET\n胎壁内缘 ≈ −(胎宽/2 + ET)\n\n轮胎近似对称于轮辋中心线，故用名义截面宽估算。\n实际胎壁因胎体结构会略窄或略宽，实测为准。',
  'pg.calc.hardline': '<strong>三条硬性红线：</strong>① 轮胎外径偏差不要超过 ±3%；② 胎壁外移量不要超过 12 mm；③ 载重指数不得低于按轴荷核算的需求值。触犯任何一条，就不是“风格问题”而是安全问题。',

  /* ---------------- 计算结果（wheel-calc.js 输出） ---------------- */
  'pg.calc.out.incomplete': '请完整填写原厂与目标配置',
  'pg.calc.out.summary': '综合结论',
  'pg.calc.out.oemTyreDia': '轮胎外径',
  'pg.calc.out.diaDelta': '外径变化',
  'pg.calc.out.sidewall': '胎壁高度',
  'pg.calc.out.rideHeight': '离地间隙变化',
  'pg.calc.out.archFill': '轮拱填充（视觉）',
  'pg.calc.out.circumference': '周长',
  'pg.calc.out.revsPerKm': '每公里转数',
  'pg.calc.out.speedo100': '码表 100 km/h 时真实车速',
  'pg.calc.out.speedo120': '码表 120 km/h 时真实车速',
  'pg.calc.out.rimVsOem': '轮辋相对原厂',
  'pg.calc.out.rimOuter': '外缘外移',
  'pg.calc.out.rimInner': '内缘移动',
  'pg.calc.out.tyreOuter': '胎壁外移（估算）',
  'pg.calc.out.tyreInner': '胎壁内移（估算）',
  'pg.calc.out.trackPerAxle': '单轴轮距变化',
  'pg.calc.out.scrubRadius': '主销偏移量变化',
  'pg.calc.out.newBackFront': '新轮辋背距 / 前距',
  'pg.calc.out.oemBackFront': '原厂轮辋背距 / 前距',
  'pg.calc.out.loadCap': '单胎承载能力',
  'pg.calc.out.loadReq': '需求（轴荷/2×1.1）',

  'pg.calc.val.diaPct': '{a} mm（{b}%）',
  'pg.calc.val.sidewall': '{oem} → {tgt} mm（{delta}）',
  'pg.calc.val.revs': '{oem} → {tgt}（{delta}）',

  'pg.calc.badge.pass': '通过',
  'pg.calc.badge.warn': '注意',
  'pg.calc.badge.risk': '风险',

  'pg.calc.gauge.pct': '码表误差 {pct}%（正值 = 码表偏慢，实际车速更快）',

  'pg.calc.grade.ok': '可以安装',
  'pg.calc.grade.warn': '基本可行，注意细节',
  'pg.calc.grade.bad': '风险较高，不建议',
  'pg.calc.grade.no': '不可安装',

  /* ---- 逐项检查明细 ---- */
  'pg.calc.issue.dia5': '轮胎外径偏差 {p}%，远超 ±5% 安全范围，ABS/ESP/变速箱换挡逻辑均会受严重影响，且可能刮蹭轮拱。',
  'pg.calc.issue.dia3': '外径偏差 {p}%，超过 ±3% 通用安全线，可能出现 ESP/ABS 报警与码表明显误差。',
  'pg.calc.issue.dia2': '外径偏差 {p}%，处于 ±2%～3% 的边缘区间，可接受但建议校正码表。',
  'pg.calc.issue.diaOk': '外径偏差 {p}%，在 ±2% 理想范围内。',
  'pg.calc.issue.out20': '胎壁外移 {v} mm，前轮极易顶到翼子板/内衬，后轮可能刮轮眉。',
  'pg.calc.issue.out12': '胎壁外移 {v} mm，接近轮拱极限，满载或打方向时可能刮蹭，需配合负倾角或卷边。',
  'pg.calc.issue.out6': '胎壁外移 {v} mm，属于常见的“齐边”范围，建议检查满载与打死方向的间隙。',
  'pg.calc.issue.outOk': '外侧外移 {v} mm，处于安全范围。',
  'pg.calc.issue.in25': '内侧侵入 {v} mm，几乎必然与避震筒/内衬干涉。',
  'pg.calc.issue.in15': '内侧侵入 {v} mm，需实测避震筒与内衬间隙（AMG 大刹车车型更紧张）。',
  'pg.calc.issue.in8': '内侧侵入 {v} mm，一般可行，建议打满方向检查。',
  'pg.calc.issue.inOk': '内侧间隙变化 {v} mm，无干涉风险。',
  'pg.calc.issue.track40': '轮距单轴变化 {v} mm，主销偏移量改变过大，转向回正与轮胎磨损会明显劣化，且可能超出法规轮距变更限值。',
  'pg.calc.issue.track24': '轮距变化 {v} mm，转向手感与胎肩磨损会有所变化，建议重做四轮定位。',
  'pg.calc.issue.stretch': '轮胎宽度小于轮辋宽度，属于“拉伸胎”（stretch），胎唇受力异常、脱圈风险高，且不合规。',
  'pg.calc.issue.wide': '轮胎相对轮辋过宽（比 {r}），胎侧过度鼓出、转向响应变差，建议轮辋加宽。',
  'pg.calc.issue.ratioOk': '胎宽/辋宽比 {r}，属于合理匹配区间（建议 1.06～1.25）。',
  'pg.calc.issue.loadLow': '轮胎载重指数不足：单胎承载 {have} kg < 需求 {need} kg，严重安全隐患。',
  'pg.calc.issue.loadTight': '载重余量仅 {m}%，满载/高速工况偏紧，建议提升载重指数。',
  'pg.calc.issue.loadOk': '载重余量 {m}%，满足需求。',
  'pg.calc.issue.speedLow': '速度等级 {sr}（{kmh} km/h）低于车辆最高车速所需的 {need} km/h。',
  'pg.calc.issue.speedOk': '速度等级 {sr}（{kmh} km/h）满足要求。',

  /* ---- 规格推荐器 ---- */
  'pg.calc.rec.errInput': '请输入原厂轮胎规格与目标轮辋直径',
  'pg.calc.rec.errEmpty': '在该容差下没有找到合适的规格，请放宽容差。',
  'pg.calc.rec.th.size': '轮胎规格',
  'pg.calc.rec.th.dia': '外径 mm',
  'pg.calc.rec.th.diff': '与原厂差',
  'pg.calc.rec.th.pct': '偏差 %',
  'pg.calc.rec.th.rim': '推荐辋宽',
  'pg.calc.rec.th.note': '说明',
  'pg.calc.rec.badge.closest': '最接近',
  'pg.calc.rec.badge.sameAspect': '同扁平比',
  'pg.calc.rec.badge.thinner': '更薄胎壁',
  'pg.calc.rec.badge.thicker': '更厚胎壁',

  /* ---- 螺栓长度 ---- */
  'pg.calc.bolt.errLen': '请填写原厂螺栓螺纹长度',
  'pg.calc.bolt.out.recommend': '建议螺纹长度',
  'pg.calc.bolt.out.range': '可用范围',
  'pg.calc.bolt.out.minEngage': '最小啮合',
  'pg.calc.bolt.rangeFmt': '{min} ～ {max}',
  'pg.calc.bolt.note': 'M14×1.5 螺栓建议最小啮合长度 {min} mm（约 8 圈螺纹），赛道/激烈驾驶建议 15 mm 以上。'
});
