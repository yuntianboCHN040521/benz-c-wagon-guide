/* ==========================================================================
   p-parts.zh.js —— 配件与机油页（parts.html）页面级中文字典
   键命名：pg.parts.区块.元素
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};

Object.assign(window.I18N_DATA.zh = window.I18N_DATA.zh || {}, {

  /* ---------------- 文档信息 ---------------- */
  'pg.parts.docTitle': '配件更换与机油价格 · 奔驰 C 级旅行车数据库',
  'pg.parts.description': '奔驰 C 级旅行车配件更换指南与价格：机油品牌规格价格对比（MB 229.5/229.51/229.52）、滤芯、火花塞、刹车片盘、变速箱油、刹车油，以及 4S 与修理厂工时费参考。',

  /* ---------------- Hero ---------------- */
  'pg.parts.hero.eyebrow': 'Parts & Oil Prices',
  'pg.parts.hero.title': '配件更换与<span class="accent">机油价格</span>',
  'pg.parts.hero.desc': '保养花多少钱，取决于你买什么规格、在哪买、在哪装。本页把机油、滤芯、火花塞、刹车、变速箱油的价格与规格排成可对比的表格，方便你判断 4S 报价是否合理。',
  'pg.parts.priceNote': '<strong>关于价格：</strong>下表价格为<strong>市场参考区间</strong>，随渠道（4S / 途虎 / 京东自营 / 天猫旗舰店 / 汽配城）、地区、品牌与促销波动明显，通常有 ±30% 的浮动。用途是<strong>判断量级与比价</strong>，不是报价单。',

  /* ---------------- 一、机油 ---------------- */
  'pg.parts.s1.title': '一、机油价格对比<span class="tag">Oil</span>',
  'pg.parts.s1.lead': '选机油先看认证（MB 229.x），再看粘度，最后才看品牌。同一认证下的不同品牌价格可以差一倍以上。',
  'pg.parts.s1.card1.title': '怎么算一次保养用几升',
  'pg.parts.s1.card1.desc': '奔驰四缸涡轮机的机油容量大多在 5.5～6.5 L，六缸机 6.5～8 L。常见做法是买<strong>一桶 4L + 一桶 1L</strong>，或直接买 5L 装再补一桶 1L。',
  'pg.parts.s1.card1.note': '<strong>省钱提示：</strong>电商大促（618、双 11）时的 4L 装全合成常有 5～6 折，一次囤两三次保养的量是最划算的做法。机油保质期通常 4～5 年，未开封常温存放没问题。',
  'pg.parts.s1.card2.title': '原厂机油 vs 品牌机油',
  'pg.parts.s1.th.option': '选项',
  'pg.parts.s1.th.pro': '优点',
  'pg.parts.s1.th.con': '缺点',
  'pg.parts.s1.row1.option': '<strong>奔驰原厂机油</strong>',
  'pg.parts.s1.row1.pro': '认证无疑问、4S 保修期内省心',
  'pg.parts.s1.row1.con': '单价最高（常 100～160 元/L）、多为代工产品',
  'pg.parts.s1.row2.option': '<strong>美孚 / 嘉实多 / 壳牌</strong>',
  'pg.parts.s1.row2.pro': '认证齐全、渠道多、大促便宜',
  'pg.parts.s1.row2.con': '假货多，必须走自营/旗舰店',
  'pg.parts.s1.row3.option': '<strong>Motul / 福斯 / 力魔</strong>',
  'pg.parts.s1.row3.pro': '性能取向、部分产品专为欧系设计',
  'pg.parts.s1.row3.con': '单价偏高、渠道相对少',
  'pg.parts.s1.row4.option': '<strong>国产品牌（长城/昆仑）</strong>',
  'pg.parts.s1.row4.pro': '价格低、假货少',
  'pg.parts.s1.row4.con': '奔驰认证产品线不全，需核对瓶身认证',

  /* ---------------- 二、滤芯 ---------------- */
  'pg.parts.s2.title': '二、滤芯类<span class="tag">Filters</span>',
  'pg.parts.s2.lead': '滤芯是典型的「原厂件 = 大牌代工」品类。曼牌（Mann）、马勒（Mahle）、博世、汉格斯特是奔驰最常见的代工方，价格往往只有 4S 的一半甚至三分之一，品质一致。',

  /* ---------------- 三、火花塞 ---------------- */
  'pg.parts.s3.title': '三、火花塞<span class="tag">Spark Plugs</span>',
  'pg.parts.s3.lead': '涡轮增压直喷发动机的火花塞更换周期比自然吸气短得多。用错型号会导致失火、抖动甚至损坏点火线圈。',
  'pg.parts.s3.note': '<strong>选购要点：</strong>必须按<strong>发动机代号</strong>选型号，热值与间隙不能随意替换。奔驰原厂火花塞多由 NGK 或博世代工，直接买对应型号的 NGK/博世产品是同质低价的选择。更换时建议<strong>四支同批</strong>，不要混用不同品牌或新旧混装。',

  /* ---------------- 四、刹车 ---------------- */
  'pg.parts.s4.title': '四、刹车片与刹车盘<span class="tag">Brakes</span>',
  'pg.parts.s4.lead': '刹车是安全件，这里的钱不该省。但「4S 换刹车片 4000 元」和「靠谱修理厂换同品质 ATE 件 1500 元」之间，差别主要来自渠道加价而非零件本身。',
  'pg.parts.s4.card1.title': '品牌定位',
  'pg.parts.s4.th.brand': '品牌',
  'pg.parts.s4.th.feature': '特点',
  'pg.parts.s4.th.tier': '价格档',
  'pg.parts.s4.row1.brand': '<strong>奔驰原厂</strong>',
  'pg.parts.s4.row1.feature': '多为 Textar / Brembo 代工，带原厂包装',
  'pg.parts.s4.row1.tier': '最高',
  'pg.parts.s4.row2.brand': '<strong>Brembo</strong>',
  'pg.parts.s4.row2.feature': '制动性能标杆，AMG 车型原厂配套',
  'pg.parts.s4.row2.tier': '高',
  'pg.parts.s4.row3.brand': '<strong>ATE</strong>',
  'pg.parts.s4.row3.feature': '德系车原厂配套大户，性价比好',
  'pg.parts.s4.row3.tier': '中高',
  'pg.parts.s4.row4.brand': '<strong>Textar / TRW</strong>',
  'pg.parts.s4.row4.feature': '原厂代工厂，品质可靠',
  'pg.parts.s4.row4.tier': '中',
  'pg.parts.s4.row5.brand': '<strong>国产（金麒麟等）</strong>',
  'pg.parts.s4.row5.feature': '价格低，粉尘与噪音控制参差',
  'pg.parts.s4.row5.tier': '低',
  'pg.parts.s4.card2.title': '什么时候该换',
  'pg.parts.s4.card2.li1': '刹车片摩擦材料厚度<strong>小于 3 mm</strong>必须换（新片约 10～12 mm）。',
  'pg.parts.s4.card2.li2': '仪表出现刹车片磨损报警（多数车型有传感器）。',
  'pg.parts.s4.card2.li3': '刹车盘厚度低于最小允许值（盘面有刻印 min 值）、或出现明显沟槽、翘曲抖动。',
  'pg.parts.s4.card2.li4': '刹车时有尖锐金属摩擦声、或制动距离明显变长。',
  'pg.parts.s4.card2.li5': '<strong>换盘必须同换片</strong>；换片时若盘有台阶或偏磨，也应一并处理。',

  /* ---------------- 五、变速箱油 ---------------- */
  'pg.parts.s5.title': '五、变速箱油<span class="tag">ATF</span>',
  'pg.parts.s5.lead': '奔驰不同代变速箱使用的油品认证完全不同，<strong>加错油会直接导致换挡冲击甚至变速箱损坏</strong>。',
  'pg.parts.s5.note': '<strong>红线提醒：</strong>奔驰变速箱油的认证<strong>互不通用</strong>，而且 722.9 本身还要分两个阶段：<ul style="margin:8px 0 0;padding-left:20px"><li><strong>722.6</strong>（5G-TRONIC）→ <span class="mono">MB 236.10</span>（236.12 / 236.14 亦可）</li><li><strong>722.9</strong>（7G-TRONIC，2010-06 之前）→ <span class="mono">MB 236.14</span></li><li><strong>722.9</strong>（7G-TRONIC PLUS，2010-06 起）→ <span class="mono">MB 236.15</span></li><li><strong>725.0</strong>（9G-TRONIC）→ <span class="mono">MB 236.17</span></li></ul><p style="margin:10px 0 0">「722.9 一律用 236.15」是最常见的错误说法。加油前务必核对变速箱型号与油品认证号，不要听信「都是奔驰 ATF 通用」。更换方式分重力换油（约 5～7 L）与循环机换油（约 10～12 L）两种，老车里程高且从未换过油的，建议先做重力换油，风险更低。</p>',

  /* ---------------- 六、刹车油 ---------------- */
  'pg.parts.s6.title': '六、刹车油<span class="tag">Brake Fluid</span>',
  'pg.parts.s6.lead': '成本最低、最容易被拖延、后果最直接的一项。刹车油会持续吸收空气中的水分，含水量上升会让沸点大幅下降——连续下坡或激烈驾驶时，沸腾产生的气泡会让刹车踏板直接踩空。',
  'pg.parts.s6.note': '<strong>更换要点：</strong>周期为 <strong>2 年</strong>（或 4 万公里）。必须用压力排气机更换，靠脚踩排气很难把 ABS 泵与管路里的旧油彻底换净。奔驰车型需要 DOT4 及以上，带 ESP/ABS 的车型建议使用 DOT4 Plus（原厂 Blatt 331.0 规格）。<strong>不要把 DOT5（硅油基）混进 DOT4 系统</strong>，两者不兼容。',

  /* ---------------- 七、工时费 ---------------- */
  'pg.parts.s7.title': '七、工时费与保养总价参考<span class="tag">Labour</span>',
  'pg.parts.s7.lead': '同样的项目，4S 店与综合修理厂的价格差可以达到 2～3 倍。保修期内的新车建议留在 4S，出保后找一家熟悉奔驰的专修店是主流选择。',
  'pg.parts.s7.card1.title': '可以自己动手',
  'pg.parts.s7.card1.desc': '空调滤芯、空气滤芯、雨刮片、蓄电池（部分车型需注册）、灯泡。这几项在 4S 的工时费往往是零件本身的数倍，自己换能省一大半。',
  'pg.parts.s7.card2.title': '必须交给专业',
  'pg.parts.s7.card2.desc': '变速箱油（需要专用设备与油温校准）、刹车油（需要压力排气与诊断仪）、正时链条、空气悬挂、任何涉及高压系统的项目。',
  'pg.parts.s7.card3.title': '影响残值',
  'pg.parts.s7.card3.desc': '完整的保养记录（最好有 4S 或专修店的盖章工单）在二手交易时值几千元。从小修理厂换到路边摊省下的钱，往往在卖车时加倍还回去。',

  /* ---------------- 八、选购原则 ---------------- */
  'pg.parts.s8.title': '八、配件选购的六条原则<span class="tag">Rules</span>',
  'pg.parts.s8.card1.title': '1. 安全件不省',
  'pg.parts.s8.card1.desc': '刹车（片/盘/油）、轮胎、轮毂、转向与悬挂件。这些是唯一直接决定生死的部分。',
  'pg.parts.s8.card2.title': '2. 认证优先于品牌',
  'pg.parts.s8.card2.desc': '机油看 MB 229.x，变速箱油看 MB 236.x，刹车油看 DOT4 Plus。有认证的杂牌，好过没认证的大牌。',
  'pg.parts.s8.card3.title': '3. 认准零件号',
  'pg.parts.s8.card3.desc': '奔驰原厂零件号形如 <span class="mono">A2711800009</span>。用它去查代工件是最可靠的方式，能避免买错型号。',
  'pg.parts.s8.card4.title': '4. 渠道比价格重要',
  'pg.parts.s8.card4.desc': '机油、刹车片、火花塞是假货重灾区。优先京东自营、天猫官方旗舰店、品牌授权经销商，不要买「比市场价便宜 40%」的同款。',
  'pg.parts.s8.card5.title': '5. 成对/成套更换',
  'pg.parts.s8.card5.desc': '刹车片同轴成对换、火花塞四支同批、减震器同轴成对换。单侧更换会导致左右制动力或阻尼不一致。',
  'pg.parts.s8.card6.title': '6. 留好工单',
  'pg.parts.s8.card6.desc': '每次保养保留工单与零件发票，既方便追踪下次保养时间，也是卖车时最有力的车况证明。',

  /* ---------------- 九、数据缺口 ---------------- */
  'pg.parts.s9.title': '九、数据缺口与来源说明<span class="tag">Honesty</span>',
  'pg.parts.s9.lead': '本页的价格、零件号与规格全部来自实际抓取的电商页面、车主实测帖与配件平台记录。抓不到可靠来源的项目，这里选择留空而不是填一个看起来合理的数字。',
  'pg.parts.s9.note': '<strong>价格时效提醒：</strong>部分报价来自 2015–2019 年的促销记录，与今天的价格会有明显差距；促销价（尤其电商大促）通常比日常价低 30%–40%。请把这里的数字当作<strong>量级参考</strong>，实际下单前再核对当前价格。',

  /* ---------------- JS 渲染：空状态 ---------------- */
  'pg.parts.tbl.empty.prefix': '暂无',
  'pg.parts.tbl.empty.suffix': '数据。',

  /* ---------------- JS 渲染：项目名（空状态用） ---------------- */
  'pg.parts.item.oil': '机油',
  'pg.parts.item.filter': '滤芯',
  'pg.parts.item.spark': '火花塞',
  'pg.parts.item.brake': '刹车',
  'pg.parts.item.atf': '变速箱油',
  'pg.parts.item.brakeFluid': '刹车油',
  'pg.parts.item.labour': '工时费',

  /* ---------------- JS 渲染：单位 ---------------- */
  'pg.parts.unit.yuan': '元',
  'pg.parts.unit.yuanPerPiece': '元/支',
  'pg.parts.unit.qty': '支',
  'pg.parts.unit.interval': '万 km',

  /* ---------------- JS 渲染：机油表 ---------------- */
  'pg.parts.tbl.oil.th.brand': '品牌',
  'pg.parts.tbl.oil.th.product': '产品全称',
  'pg.parts.tbl.oil.th.viscosity': '粘度',
  'pg.parts.tbl.oil.th.cert': '认证',
  'pg.parts.tbl.oil.th.volume': '容量',
  'pg.parts.tbl.oil.th.price': '参考价',
  'pg.parts.tbl.oil.th.unitPrice': '单价 (元/L)',
  'pg.parts.tbl.oil.th.channel': '渠道 / 说明',
  'pg.parts.tbl.oil.footnote': '单价 = 参考价 ÷ 容量，用来横向比较不同包装规格的性价比。大促期间常有 5～6 折，囤货可显著降低单次保养成本。',

  /* ---------------- JS 渲染：滤芯表 ---------------- */
  'pg.parts.tbl.filter.th.item': '项目',
  'pg.parts.tbl.filter.th.oemPart': '原厂零件号',
  'pg.parts.tbl.filter.th.oemPrice': '原厂价',
  'pg.parts.tbl.filter.th.brand': '品牌',
  'pg.parts.tbl.filter.th.partNo': '品牌件号',
  'pg.parts.tbl.filter.th.price': '参考价',
  'pg.parts.tbl.filter.th.note': '备注',
  'pg.parts.tbl.filter.footnote': '奔驰的滤芯多由曼牌（Mann）、马勒（Mahle）、汉格斯特（Hengst）、博世代工，买对应品牌件通常能省 40%～60% 且品质一致。',

  /* ---------------- JS 渲染：火花塞表 ---------------- */
  'pg.parts.tbl.spark.th.engine': '发动机',
  'pg.parts.tbl.spark.th.brand': '品牌',
  'pg.parts.tbl.spark.th.partNo': '型号',
  'pg.parts.tbl.spark.th.price': '参考单价',
  'pg.parts.tbl.spark.th.qty': '数量',
  'pg.parts.tbl.spark.th.interval': '更换周期',
  'pg.parts.tbl.spark.th.note': '备注',

  /* ---------------- JS 渲染：刹车表 ---------------- */
  'pg.parts.tbl.brake.th.position': '位置',
  'pg.parts.tbl.brake.th.brand': '品牌',
  'pg.parts.tbl.brake.th.partNo': '零件号',
  'pg.parts.tbl.brake.th.price': '参考价',
  'pg.parts.tbl.brake.th.interval': '更换周期',
  'pg.parts.tbl.brake.th.note': '备注',

  /* ---------------- JS 渲染：变速箱油表 ---------------- */
  'pg.parts.tbl.atf.th.trans': '变速箱',
  'pg.parts.tbl.atf.th.spec': '油品认证',
  'pg.parts.tbl.atf.th.capacity': '容量',
  'pg.parts.tbl.atf.th.oemPrice': '原厂油参考价',
  'pg.parts.tbl.atf.th.alts': '替代品牌',
  'pg.parts.tbl.atf.th.note': '备注',

  /* ---------------- JS 渲染：刹车油表 ---------------- */
  'pg.parts.tbl.brakeFluid.th.spec': '规格',
  'pg.parts.tbl.brakeFluid.th.brand': '品牌',
  'pg.parts.tbl.brakeFluid.th.volume': '容量',
  'pg.parts.tbl.brakeFluid.th.price': '参考价',
  'pg.parts.tbl.brakeFluid.th.note': '说明',

  /* ---------------- JS 渲染：工时费表 ---------------- */
  'pg.parts.tbl.labour.th.type': '项目',
  'pg.parts.tbl.labour.th.channel': '类型',
  'pg.parts.tbl.labour.th.price': '参考价格',
  'pg.parts.tbl.labour.th.note': '说明',

  /* ---------------- JS 渲染：数据缺口块 ---------------- */
  'pg.parts.tbl.missing.title': '本站没拿到的数据（如实列出）',
  'pg.parts.tbl.missing.footnote': '这些字段在页面上显示为「—」，是抓取受限的结果，而不是没有这项数据。与其填一个看起来合理但不可靠的数字，不如明确告诉你这里缺。'

});
