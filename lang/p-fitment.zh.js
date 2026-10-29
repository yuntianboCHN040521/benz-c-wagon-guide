/* ==========================================================================
   p-fitment.zh.js —— 中文文案（页面级字典：轮毂适配页）
   键命名：pg.fitment.区块.元素
   说明：本文件只补充 fitment.html 专属文案，核心字典仍在 lang/zh.js
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};

Object.assign(window.I18N_DATA.zh = window.I18N_DATA.zh || {}, {

  /* ---------------- 文档信息 ---------------- */
  'pg.fitment.docTitle': '轮毂适配度与品牌数据库 · 奔驰 C 级旅行车数据库',
  'pg.fitment.docDesc': 'BBS、OZ、RAYS、Enkei、Work、AMG 原厂轮毂在奔驰 C 级旅行车 S203/S204/S205/S206 上的适配度评级、可选尺寸与 ET、参考价格，以及按代际推荐的改装方案。',

  /* ---------------- Hero ---------------- */
  'pg.fitment.hero.title.before': '轮毂适配度与',
  'pg.fitment.hero.title.accent': '品牌数据库',
  'pg.fitment.hero.desc': '哪些轮毂能装、装了会怎样、值不值这个价。本页收录 BBS、OZ、RAYS、Enkei、Work 等主流品牌的奔驰适配型号，以及 AMG 原厂轮毂与按代际划分的三档改装方案。',

  /* ---------------- 一、适配度判定 ---------------- */
  'pg.fitment.method.title': '一、适配度怎么判定',
  'pg.fitment.method.tag': 'Method',
  'pg.fitment.method.lead': '本站的适配度评级不是主观印象，而是由下面五个硬指标算出来的。',

  'pg.fitment.method.c1.meta': '指标 01',
  'pg.fitment.method.c1.title': '安装参数匹配',
  'pg.fitment.method.c1.desc': 'PCD 必须为 5×112；中心孔 ≥66.6（大于则需变径环）；螺栓座面必须为球面 R14；螺栓螺纹与车型一致（W203 为 M12×1.5，W204 起为 M14×1.5）。',
  'pg.fitment.method.c1.badge': '任一不符 = 不可装',

  'pg.fitment.method.c2.meta': '指标 02',
  'pg.fitment.method.c2.title': '外移量',
  'pg.fitment.method.c2.desc': '胎壁相对原厂的外移量。这是刮蹭风险的第一指标，也是判断「齐边」还是「爆龟」的依据。',
  'pg.fitment.method.c2.b1': '≤6 mm 齐边',
  'pg.fitment.method.c2.b2': '6–12 mm 饱满',
  'pg.fitment.method.c2.b3': '>12 mm 风险',

  'pg.fitment.method.c3.meta': '指标 03',
  'pg.fitment.method.c3.title': '内侧间隙',
  'pg.fitment.method.c3.desc': '内侧侵入量决定会不会蹭避震筒与内衬。AMG 大刹车车型的卡钳占位更大，余量更小。',
  'pg.fitment.method.c3.b1': '≥−8 mm 安全',
  'pg.fitment.method.c3.b2': '−8 ~ −15 mm 需实测',
  'pg.fitment.method.c3.b3': '<−15 mm 高危',

  'pg.fitment.method.c4.meta': '指标 04',
  'pg.fitment.method.c4.title': '外径与码表',
  'pg.fitment.method.c4.desc': '轮胎外径相对原厂的变化。超过 ±3% 会影响 ESP 判定与换挡逻辑，超过 ±5% 属于危险改装。',
  'pg.fitment.method.c4.b1': '±2% 内理想',
  'pg.fitment.method.c4.b2': '±2–3% 可接受',
  'pg.fitment.method.c4.b3': '>3% 不建议',

  'pg.fitment.method.c5.meta': '指标 05',
  'pg.fitment.method.c5.title': '载荷与重量',
  'pg.fitment.method.c5.desc': '轮毂的标称载荷必须 ≥ 单轮需求的 1.2 倍；重量影响簧下质量，同尺寸下越轻越好（但不能牺牲载荷）。',
  'pg.fitment.method.c5.b1': '锻造 7–9.5 kg',
  'pg.fitment.method.c5.b2': '旋压 8.5–11.5 kg',
  'pg.fitment.method.c5.b3': '廉价铸造 >13 kg',

  'pg.fitment.method.c6.meta': '指标 06',
  'pg.fitment.method.c6.title': '法规适配',
  'pg.fitment.method.c6.desc': '德国 TÜV 需要轮毂带 Gutachten（含奔驰车型的 ABE）或做 Einzelabnahme 单件认证；中国年检关注轮胎规格与外廓尺寸。正规品牌都会提供适配清单，购买前索取。',
  'pg.fitment.method.c6.badge': '认准 Gutachten / ABE',

  /* ---------------- 二、按代际推荐方案 ---------------- */
  'pg.fitment.plans.title': '二、按代际的推荐改装方案',
  'pg.fitment.plans.tag': '预设方案',
  'pg.fitment.plans.lead': '每一档方案都由计算器实时核算出外移量与码表误差——表格里的数字是算出来的，不是估的。',
  'pg.fitment.plans.chip.all': '全部代际',
  'pg.fitment.plans.note': '<strong>三档位说明：</strong> <span class="badge ok">原厂风格</span>直接沿用同代原厂尺寸，零风险、零折腾，只是换个造型。 <span class="badge warn">进阶合装</span>在轮拱余量内适度加大加宽，兼顾姿态与可用性，是最主流的选择。 <span class="badge bad">激进姿态</span>追求最大视觉冲击，通常需要配合负倾角、卷边或改悬挂，且必然牺牲舒适性与通过性。',

  /* ---------------- 三、可用性矩阵 ---------------- */
  'pg.fitment.matrix.title': '三、轮毂尺寸可用性矩阵',
  'pg.fitment.matrix.tag': 'Matrix',
  'pg.fitment.matrix.lead': '把「辋宽 × ET」的所有常见组合一次性算完。单元格里的数字是<strong>胎壁相对原厂的外移量（mm）</strong>，正数表示比原厂更靠车外。这张表回答的是选型时第一个问题：<em>这个宽度的轮毂，ET 该选多少？</em>',
  'pg.fitment.matrix.safe.k': '安全区间',
  'pg.fitment.matrix.safe.v': '外移 −8 ~ +6 mm',
  'pg.fitment.matrix.safe.d': '从原厂位置到「齐边」，无需额外处理',
  'pg.fitment.matrix.measure.k': '需要实测',
  'pg.fitment.matrix.measure.v': '外移 +6 ~ +12 mm 或 −8 ~ −15 mm<br>内侵 −10 ~ −18 mm',
  'pg.fitment.matrix.measure.d': '需做橡皮泥动态测试；外移为较大负值时轮胎会明显「陷进」轮拱',
  'pg.fitment.matrix.bad.k': '不建议',
  'pg.fitment.matrix.bad.v': '外移 > +12 mm 或 < −15 mm<br>内侵 < −18 mm',
  'pg.fitment.matrix.bad.d': '需要改宽体/卷边，或必然与避震、内衬干涉',
  'pg.fitment.matrix.note': '<strong>怎么用这张表：</strong>先定你想要的外观宽度（例如 8.5J），然后横着找他行里的绿色格子，就能读出 ET 的大致可选范围。<strong>注意这张表只算横向位置，不含刹车卡钳间隙与轮胎外径</strong>—— 最终决定前请回到<a href="calculator.html">计算器</a>做完整的配置对比。',

  /* ---------------- 四、品牌数据库 ---------------- */
  'pg.fitment.brands.title': '四、品牌轮毂数据库',
  'pg.fitment.brands.tag': 'Brands',
  'pg.fitment.brands.lead': '只收录确实提供 5×112 孔距、可用于奔驰 C 级的型号。点击品牌筛选。',

  /* ---------------- 四、AMG 原厂 ---------------- */
  'pg.fitment.amg.title': '四、AMG 原厂轮毂',
  'pg.fitment.amg.tag': 'OEM+',
  'pg.fitment.amg.lead': '原厂 AMG 轮毂是最省心的「升级」路线：载荷、ET、中心孔、螺栓全部原厂匹配，唯一的问题是价格与新货稀缺（多为拆车件）。',
  'pg.fitment.amg.note': '<strong>为什么推荐原厂 AMG 轮毂？</strong>因为它们是为这个底盘设计的：ET 与轮距精确匹配、载荷按车辆最大总质量校核过、动平衡与真圆度有原厂保证，而且大多带 TÜV 认可的 Gutachten。缺点是新件贵（单只常 5000 元以上）、二手市场假货多（尤其是所谓「AMG 风格」的仿制品）。购买二手件务必核对<strong>原厂零件号（A2xx401xxxx）</strong>与内侧铸造标记。',

  /* ---------------- 五、常见误区 ---------------- */
  'pg.fitment.myths.title': '五、六个常见误区',
  'pg.fitment.myths.tag': 'Myths',
  'pg.fitment.myths.m1.title': '误区 1：ET 越小越帅，越小越好',
  'pg.fitment.myths.m1.desc': 'ET 过小会让轮胎外凸刮轮眉，同时主销偏移量剧变使转向变沉、胎肩异常磨损，轮毂轴承的附加弯矩也会显著缩短寿命。视觉上的「齐边」通常对应外移 5～8 mm，而不是 20 mm。',
  'pg.fitment.myths.m2.title': '误区 2：轮毂大了车就快了',
  'pg.fitment.myths.m2.desc': '大直径轮毂的转动惯量按半径平方增长，即使总重不变也会让起步与制动变差。除非同时大幅减重（锻造毂），否则「加大即变慢」是常态。',
  'pg.fitment.myths.m3.title': '误区 3：螺栓随便用，能拧上就行',
  'pg.fitment.myths.m3.desc': '球面配锥面会在行驶中自行松脱；螺纹长度不足会滑牙；过长会顶到轮毂轴承。这是所有改装错误里后果最严重、也最容易避免的一项。',
  'pg.fitment.myths.m4.title': '误区 4：不用变径环，靠螺栓定位就行',
  'pg.fitment.myths.m4.desc': '螺栓只负责压紧，径向定位靠中心孔与轴承凸台的配合。缺变径环会导致高速抖动、螺栓承受剪切力、轮毂偏心，长期会疲劳断裂。',
  'pg.fitment.myths.m5.title': '误区 5：宽胎抓地力一定更强',
  'pg.fitment.myths.m5.desc': '接地面积受轮毂宽度与胎压共同约束。窄轮辋上装超宽胎，胎面会呈「甜甜圈」形，实际接地印痕反而变小，湿地性能与耐磨性都会下降。',
  'pg.fitment.myths.m6.title': '误区 6：改完做不做四轮定位无所谓',
  'pg.fitment.myths.m6.desc': '轮毂位置改变会连带改变倾角与前束在轮胎上的落点，不做定位的结果通常是几千公里后轮胎报废。改装后做定位应该是标配动作。',

  /* ---------------- JS 渲染：推荐方案表 ---------------- */
  'pg.fitment.plan.empty': '暂无该代际的推荐方案数据。',
  'pg.fitment.plan.th.gen': '代际',
  'pg.fitment.plan.th.level': '档位',
  'pg.fitment.plan.th.oem': '原厂基准',
  'pg.fitment.plan.th.front': '推荐前轮',
  'pg.fitment.plan.th.frontMove': '前轮外移',
  'pg.fitment.plan.th.frontDia': '前轮外径差',
  'pg.fitment.plan.th.rear': '后轮外移 / 外径差',
  'pg.fitment.plan.th.grade': '评级',
  'pg.fitment.plan.th.note': '说明',
  'pg.fitment.plan.sameFb': '前后同规格',
  'pg.fitment.plan.foot': '外移量为正表示比原厂更靠车外。评级的判定规则见上方「适配度怎么判定」。实际间隙仍以<strong>实车橡皮泥测试</strong>为准，尤其是后轮满载状态。',

  /* ---------------- JS 渲染：品牌库 ---------------- */
  'pg.fitment.brands.empty': '暂无品牌数据。',
  'pg.fitment.brands.chip.all': '全部品牌',
  'pg.fitment.brands.cb.ring': '需变径环',
  'pg.fitment.brands.cb.direct': '直装',
  'pg.fitment.brands.th.size': '规格',
  'pg.fitment.brands.th.pcd': 'PCD',
  'pg.fitment.brands.th.et': '偏距',
  'pg.fitment.brands.th.cb': '中心孔',
  'pg.fitment.brands.th.weight': '单只重量 (kg)',
  'pg.fitment.brands.th.cbFit': '中心孔适配',
  'pg.fitment.brands.th.note': '备注',
  'pg.fitment.brands.noData': '未取得该型号的 5×112 规格数据，原因见上方说明。',
  'pg.fitment.brands.load.k': '标称载荷',
  'pg.fitment.brands.price.k': '参考价格（单只）',
  'pg.fitment.brands.price.src': '价格来源：',

  /* ---------------- JS 渲染：AMG 原厂 ---------------- */
  'pg.fitment.amg.empty': '暂无 AMG 原厂轮毂数据。',
  'pg.fitment.amg.th.part': '原厂零件号',
  'pg.fitment.amg.th.name': '名称',
  'pg.fitment.amg.th.size': '规格',
  'pg.fitment.amg.th.et': '偏距',
  'pg.fitment.amg.th.tyre': '配套轮胎',
  'pg.fitment.amg.th.models': '适用车型',
  'pg.fitment.amg.th.price': '参考价（单只）',

  /* ---------------- JS 渲染：可用性矩阵 ---------------- */
  'pg.fitment.matrix.th.rim': '辋宽（配胎宽）',
  'pg.fitment.matrix.tip': '{rim}J 配 {tyre} 胎 / ET{et}：外侧 {move} mm，内侧 {inner} mm',
  'pg.fitment.matrix.foot': '基准：<span class="mono">{chassis}</span> 原厂前轮 <span class="mono">{size} ET{et} + {tyre}</span>。单元格数值为<strong>胎壁外缘相对原厂的外移量（mm）</strong>，正数代表更靠车外；鼠标悬停可看内外两侧的具体位移。',

  /* ---------------- JS 渲染：数据缺口与来源 ---------------- */
  'pg.fitment.notes.title': '数据缺口：这份品牌数据缺什么、为什么缺',
  'pg.fitment.notes.src': '数据来源清单（{n} 条，均为实际抓取页面）'

});
