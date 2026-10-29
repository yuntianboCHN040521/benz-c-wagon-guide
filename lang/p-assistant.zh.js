/* ==========================================================================
   p-assistant.zh.js —— 页面级文案：AI 助手页（assistant.html）· 中文基准
   --------------------------------------------------------------------------
   覆盖范围：
     1) assistant.html 上的静态界面文案
     2) assets/js/assistant.js 里的界面文案（消息标签、状态提示、错误提示、按钮反馈）
     3) 离线检索模式的回答模板（骨架文字，数据本身来自 data/，不在此翻译）
     4) 发给大模型的系统提示词与检索上下文标签
   键命名：pg.assistant.区块.元素
   ========================================================================== */
Object.assign(window.I18N_DATA.zh = window.I18N_DATA.zh || {}, {

  /* ================================================================
     页面头 <head>
     ================================================================ */
  'pg.assistant.docTitle': 'AI 助手 · 奔驰 C 级旅行车数据库',
  'pg.assistant.docDesc': '奔驰 C 级旅行车数据库的站内 AI 助手：可以直接提问车身尺寸、轮毂 ET、改装能不能装、通病、保养周期、机油与配件价格，答案全部来自本站已核实数据。',

  /* ================================================================
     Hero
     ================================================================ */
  'pg.assistant.hero.eyebrow': 'Assistant',
  'pg.assistant.hero.title.before': '站内 ',
  'pg.assistant.hero.title.accent': 'AI 助手',
  'pg.assistant.hero.desc': '直接问就行。助手会检索本站已核实的数据来回答——<strong>车身尺寸、轮毂 ET 与适配、改装能不能装、通病与维修价、保养周期、机油认证与配件价格</strong>，涉及规格的问题还会现场调用计算引擎算出结果。',
  'pg.assistant.hero.btnSettings': '⚙ 模型设置',
  'pg.assistant.hero.btnCopy': '复制「资料 + 问题」给别人',

  /* ================================================================
     模型设置面板
     ================================================================ */
  'pg.assistant.settings.title': '模型设置',
  'pg.assistant.settings.tag': '可选',
  'pg.assistant.settings.lead': '默认的<strong>离线检索模式</strong>不需要任何配置，答案完全来自本站数据。如果你希望助手用更自然的语言组织回答，可以填入自己的 API key 切换到<strong>大模型模式</strong>——检索到的本站资料会作为上下文一起发送，所以它仍然只依据本站数据回答。',
  'pg.assistant.settings.enabled': '启用大模型模式',
  'pg.assistant.settings.base.label': 'API Base URL <span class="hint">OpenAI 兼容接口</span>',
  'pg.assistant.settings.key.label': 'API Key <span class="hint">只保存在你自己的浏览器里</span>',
  'pg.assistant.settings.model.label': '模型名',
  'pg.assistant.settings.save': '保存设置',
  'pg.assistant.settings.presets': '常用配置：DeepSeek <span class="mono">https://api.deepseek.com/v1</span> + <span class="mono">deepseek-chat</span>；OpenAI <span class="mono">https://api.openai.com/v1</span> + <span class="mono">gpt-4o-mini</span>；OpenRouter <span class="mono">https://openrouter.ai/api/v1</span>。',

  /* ---- 隐私说明 ---- */
  'pg.assistant.privacy.title': '关于 key 与隐私',
  'pg.assistant.privacy.li1': 'key 只存在你浏览器的 <span class="mono">localStorage</span> 里，不会上传到本站——本站是纯静态页面，<strong>根本没有后端</strong>。',
  'pg.assistant.privacy.li2': '请求由你的浏览器直接发往你填的 API 服务商，本站不经手。',
  'pg.assistant.privacy.li3': '如果服务商不允许浏览器直连（CORS 限制），会提示失败并<strong>自动回落到离线检索</strong>，功能不受影响。',
  'pg.assistant.privacy.li4': '不想配 key 也可以用右上角的「复制资料 + 问题」，粘贴到任意 AI 对话框里。',
  'pg.assistant.privacy.warn': '<strong>为什么不内置 key？</strong>静态页面里的任何 key 都会随源码公开，等于泄露。让每个使用者填自己的 key 是这类站点唯一安全的做法。',

  /* ================================================================
     聊天区
     ================================================================ */
  'pg.assistant.chat.title': '开始提问',
  'pg.assistant.chat.placeholder': '例如：S203 用 M12 还是 M14 螺栓？／ 8.5Jx19 ET45 装 W205 会刮吗？',
  'pg.assistant.chat.send': '发送',
  'pg.assistant.chat.note': '回车发送。助手只依据本站已核实的数据回答；站内没有的数据它会直接说没有，而不是编一个。',

  /* ---- 推荐问题（只翻译显示文字，data-ask 提交的查询语句保持中文，以保证离线检索引擎能识别）---- */
  'pg.assistant.chip.wheelbase': 'S205 轴距',
  'pg.assistant.chip.issue': 'W204 通病',
  'pg.assistant.chip.oil': 'W205 用什么机油',
  'pg.assistant.chip.brand': 'BBS 轮毂',
  'pg.assistant.chip.calc': '换胎计算',
  'pg.assistant.chip.brake': '刹车片价格',
  'pg.assistant.chip.compare': '两代对比',
  'pg.assistant.chip.gap': '数据缺口',

  /* ================================================================
     能力说明
     ================================================================ */
  'pg.assistant.ability.title': '它能回答什么',
  'pg.assistant.ability.tag': 'Capability',

  'pg.assistant.ability.query.title': '结构化查询',
  'pg.assistant.ability.query.li1': '「<span class="mono">S206 的前轮距</span>」→ 直接给数值，并附四代对比表',
  'pg.assistant.ability.query.li2': '「<span class="mono">W204 原厂 17 寸的 ET 是多少</span>」→ 给规格 + 背距/前距',
  'pg.assistant.ability.query.li3': '「<span class="mono">W203 有什么通病</span>」→ 列出现象、原因、对策、参考价',
  'pg.assistant.ability.query.li4': '「<span class="mono">C63 的发动机参数</span>」→ 功率、扭矩、年份、原厂轮组',

  'pg.assistant.ability.calc.title': '实时计算',
  'pg.assistant.ability.calc.li1': '「<span class="mono">225/50R17 换成 245/40R18</span>」→ 外径差、胎壁外移、轮距变化、码表误差',
  'pg.assistant.ability.calc.li2': '「<span class="mono">8.5Jx19 ET45 装 W205 会刮吗</span>」→ 以该代原厂为基准给出评级',
  'pg.assistant.ability.calc.li3': '没给车型时会默认以 <strong>S205 原厂配置</strong>为基准并明确说明',

  'pg.assistant.ability.price.title': '价格与耗材',
  'pg.assistant.ability.price.li1': '「<span class="mono">机油多少钱</span>」→ 品牌、认证、容量、单价对比',
  'pg.assistant.ability.price.li2': '「<span class="mono">刹车片价格</span>」→ 原厂与替代品牌零件号',
  'pg.assistant.ability.price.li3': '「<span class="mono">变速箱油怎么选</span>」→ 722.6 / 722.9 / 725.0 的认证区别',

  'pg.assistant.ability.light.title': '灯光与操作',
  'pg.assistant.ability.light.li1': '「<span class="mono">示宽灯在哪里</span>」→ 开关位置、档位，以及与驻车灯的区别',
  'pg.assistant.ability.light.li2': '「<span class="mono">驻车灯怎么开</span>」→ 单侧驻车灯的完整操作步骤',
  'pg.assistant.ability.light.li3': '「<span class="mono">灯光开关在哪</span>」→ 四代差异对比表',
  'pg.assistant.ability.light.li4': '「<span class="mono">怀挡怎么用</span>」→ 按区域列出车内按键功能',

  'pg.assistant.ability.warn.title': '仪表故障灯',
  'pg.assistant.ability.warn.li1': '「<span class="mono">机油压力灯亮了怎么办</span>」→ 含义、能否继续行驶、原因与处理步骤',
  'pg.assistant.ability.warn.li2': '「<span class="mono">红色故障灯有哪些</span>」→ 按颜色筛选',
  'pg.assistant.ability.warn.li3': '「<span class="mono">故障灯颜色分级</span>」→ 红/黄/绿/蓝各自的处置优先级',

  'pg.assistant.ability.gap.title': '诚实边界',
  'pg.assistant.ability.gap.li1': '问「<span class="mono">哪些数据没有核实</span>」会列出全部数据缺口',
  'pg.assistant.ability.gap.li2': '检索不到时会明说「站内没有这项数据」，并给可替代的问法',
  'pg.assistant.ability.gap.li3': '大模型模式下，系统提示明确要求<strong>只依据站内资料回答、不得编造数字</strong>',

  'pg.assistant.ability.note': '<strong>回答的边界：</strong>助手读取的是<a href="wheels.html">轮毂数据</a>、<a href="specs.html">车身数据</a>、<a href="guide.html">用车指南</a>、<a href="fitment.html">轮毂适配</a>、<a href="parts.html">配件与机油</a>五个页面的数据源，与页面内容完全同源。页面上标注为「未核实」的字段，助手也会如实回答未核实。',

  /* ================================================================
     assistant.js：界面文案（消息、状态、反馈）
     ================================================================ */
  'pg.assistant.ui.me': '你',
  'pg.assistant.ui.ai': 'AI',
  'pg.assistant.ui.metaOffline': '离线检索模式 · 答案全部来自本站数据',
  'pg.assistant.ui.metaOfflineShort': '离线检索模式',
  'pg.assistant.ui.metaLlm': 'LLM 模式（{model}）· 已附带 {n} 条站内资料',
  'pg.assistant.ui.errTitle': 'LLM 调用失败，已回落到离线检索：',
  'pg.assistant.ui.errHint': '常见原因：API key 无效、余额不足、或该服务不允许浏览器直接调用（CORS）。',
  'pg.assistant.ui.httpError': 'HTTP {status}：{body}',
  'pg.assistant.ui.emptyResponse': '返回内容为空',

  'pg.assistant.ui.welcome.p1': '你好。我是这个数据库的站内助手，可以回答关于 <strong>S203 / S204 / S205 / S206</strong> 四代奔驰 C 级旅行车的任何问题——车身尺寸、轮毂 ET、改装能不能装、通病、保养周期、机油与配件价格。',
  'pg.assistant.ui.welcome.p2': '默认使用<strong>离线检索模式</strong>：答案只来自本站已核实的数据，不需要联网也不需要 key。你也可以在右上角填入自己的 API key，切换成大模型对话模式。',
  'pg.assistant.ui.indexed': '已索引 {n} 条知识条目',

  'pg.assistant.ui.savedOn': '设置已保存到本机浏览器（localStorage）。下次提问将使用大模型模式。',
  'pg.assistant.ui.savedOff': '设置已保存到本机浏览器（localStorage）。当前使用离线检索模式。',
  'pg.assistant.ui.copyNeedQuery': '请先在输入框里写下你的问题。',
  'pg.assistant.ui.copyOk': '已复制「资料 + 问题」到剪贴板（{n} 条站内资料）。粘贴到任意 AI 对话框即可。',
  'pg.assistant.ui.copyUnsupported': '当前浏览器不支持自动复制，请手动复制。',

  /* ---- 复制到剪贴板的提示词框架 ---- */
  'pg.assistant.copy.promptHead': '请根据以下资料回答问题，资料之外的内容不要编造。',
  'pg.assistant.copy.promptQ': '=== 我的问题 ===',

  /* ================================================================
     assistant.js：发给大模型的系统提示词（{ctx} 由检索上下文填充）
     ================================================================ */
  'pg.assistant.sys.rules': '你是「奔驰 C 级旅行车数据库」网站的站内助手，服务对象是奔驰 C 级旅行车（S203/S204/S205/S206）车主。\n规则：\n1. 只依据下面提供的站内资料回答，不要引入资料之外的事实，也不要凭记忆补充数字。\n2. 如果资料里没有答案，直接说「站内没有这项数据」，并建议可以查哪个页面。\n3. 回答用简体中文，简洁专业；涉及数字时保留原始单位与精度。\n4. 不要编造价格、扭矩、ET 值等具体数字。\n\n',
  'pg.assistant.sys.ctxStart': '=== 站内资料 ===',
  'pg.assistant.sys.ctxEnd': '=== 资料结束 ===',
  'pg.assistant.sys.emptyCtx': '（本次未在站内检索到相关条目）',
  'pg.assistant.sys.ctxItem': '[{i}] 分类：{cat}{chassis}\n标题：{title}\n内容：{text}',
  'pg.assistant.sys.ctxChassis': '｜车型：{chassis}',

  /* ================================================================
     assistant.js：离线检索回答模板 —— 公共
     ================================================================ */
  'pg.assistant.common.unverified': '未核实',
  'pg.assistant.common.item': '项目',
  'pg.assistant.common.detail': '查看详情',
  'pg.assistant.common.view': '查看',
  'pg.assistant.common.yuan': '{n} 元',
  'pg.assistant.common.perL': '{n} 元/L',
  'pg.assistant.common.general': '通用',

  /* ---- 车身尺寸 ---- */
  'pg.assistant.body.single': '<strong>{chassis}</strong> 的{field}是 {value}。',
  'pg.assistant.body.ofChassis': ' 的',
  'pg.assistant.body.allFour': '四代车型的',
  'pg.assistant.body.allDims': '车身尺寸',
  'pg.assistant.body.tableHead': '如下：',

  /* ---- 轮毂参数 ---- */
  'pg.assistant.wheel.common': '<strong>通用安装参数</strong>（四代一致的部分）：PCD <span class="mono">5×112</span>、中心孔 <span class="mono">66.6 mm</span>、球面 R14 螺栓座。',
  'pg.assistant.wheel.th.gen': '代际',
  'pg.assistant.wheel.th.bolt': '螺栓',
  'pg.assistant.wheel.th.etRange': '原厂 ET 范围',
  'pg.assistant.wheel.th.oem': '典型原厂配置',
  'pg.assistant.wheel.oemList': '<strong>{chassis}</strong> 的原厂轮毂清单：',
  'pg.assistant.wheel.th.size': '规格',
  'pg.assistant.wheel.th.tyre': '轮胎',
  'pg.assistant.wheel.th.spacing': '背距/前距 (mm)',
  'pg.assistant.wheel.th.fit': '适用',

  /* ---- 改装计算 ---- */
  'pg.assistant.calc.noEngine': '计算引擎未加载。',
  'pg.assistant.calc.noteTyre': '（你没给轮胎规格，按辋宽推算为 {tyre}，仅供参考）',
  'pg.assistant.calc.noteBase': '（对比基准轮辋按 {size} ET{et} 计）',
  'pg.assistant.calc.noteWidth': '（目标轮辋宽度未给出，按原厂 {w}J 计）',
  'pg.assistant.calc.noteEt': '（目标 ET 未给出，按原厂 ET{et} 计）',
  'pg.assistant.calc.parseFail': '这两个规格我没法解析，请按 <span class="mono">225/50R17</span> 或 <span class="mono">8.5Jx19 ET45</span> 这样的格式提供。',
  'pg.assistant.calc.baseline': '以 <strong>{chassis}</strong> 原厂 <span class="mono">{oem}</span> 为基准：',
  'pg.assistant.calc.lbl.grade': '综合结论',
  'pg.assistant.calc.lbl.diameter': '轮胎外径',
  'pg.assistant.calc.lbl.diameterDelta': '外径变化',
  'pg.assistant.calc.lbl.rideHeight': '离地间隙变化',
  'pg.assistant.calc.lbl.outer': '胎壁外移（估算）',
  'pg.assistant.calc.lbl.inner': '胎壁内移（估算）',
  'pg.assistant.calc.lbl.track': '单轴轮距变化',
  'pg.assistant.calc.lbl.speedo': '码表 100 km/h 时真实车速',
  'pg.assistant.calc.lbl.rimOuter': '轮辋外缘外移',
  'pg.assistant.calc.valDelta': '{mm} mm（{pct}%）',
  'pg.assistant.calc.checkTitle': '逐项检查：',
  'pg.assistant.calc.grade.ok': '通过',
  'pg.assistant.calc.grade.warn': '注意',
  'pg.assistant.calc.grade.bad': '风险',

  /* ---- 两代对比 ---- */
  'pg.assistant.compare.title': '<strong>{a}</strong> 与 <strong>{b}</strong> 对比：',
  'pg.assistant.compare.th.diff': '差值',
  'pg.assistant.compare.range': '上限 {hi} / 下限 {lo}',

  /* ---- 通病 ---- */
  'pg.assistant.issue.found': '找到 <strong>{n}</strong> 条通病记录：',
  'pg.assistant.issue.foundMore': '找到 <strong>{n}</strong> 条通病记录，下面显示前 {shown} 条：',
  'pg.assistant.issue.tag': '通病',
  'pg.assistant.issue.cost': '维修参考 {v} 元',
  'pg.assistant.issue.noCost': '无可靠价格来源',
  'pg.assistant.issue.symptom': '现象',
  'pg.assistant.issue.cause': '原因',
  'pg.assistant.issue.fix': '对策',

  /* ---- 机油 ---- */
  'pg.assistant.oil.title': '<strong>用油要求</strong>（认证比粘度更重要）：',
  'pg.assistant.oil.th.engine': '发动机',
  'pg.assistant.oil.th.models': '搭载车型',
  'pg.assistant.oil.th.cert': '认证',
  'pg.assistant.oil.th.viscosity': '粘度',
  'pg.assistant.oil.th.capacity': '容量',
  'pg.assistant.oil.capTitle': '容量说明：',
  'pg.assistant.oil.capItem': '{engine} {cap} L（{note}）',
  'pg.assistant.oil.capJoin': '；',
  'pg.assistant.oil.priceTitle': '<strong>机油参考价格</strong>（中国市场，随渠道与促销波动）：',
  'pg.assistant.oil.th.brand': '品牌',
  'pg.assistant.oil.th.product': '产品',
  'pg.assistant.oil.th.price': '参考价',
  'pg.assistant.oil.th.unitPrice': '单价',

  /* ---- 保养周期 ---- */
  'pg.assistant.iv.matched': '匹配到的保养项目：',
  'pg.assistant.iv.all': '本站收录的保养周期总表：',
  'pg.assistant.iv.th.item': '项目',
  'pg.assistant.iv.th.interval': '周期',
  'pg.assistant.iv.th.price': '参考价',
  'pg.assistant.iv.th.note': '说明',

  /* ---- 价格 ---- */
  'pg.assistant.price.title': '与「{q}」相关的价格信息：',
  'pg.assistant.price.th.cat': '类别',
  'pg.assistant.price.th.item': '项目',
  'pg.assistant.price.th.detail': '明细',
  'pg.assistant.price.th.source': '来源页',
  'pg.assistant.price.note': '<strong>价格性质：</strong>本站所有价格均为参考区间，随地区、渠道与时间波动明显（通常 ±30%），部分为历史促销价，不是报价单。',

  /* ---- 品牌轮毂 ---- */
  'pg.assistant.brand.amgTitle': '本站收录 <strong>{n}</strong> 款奔驰 AMG 原厂轮毂（含零件号）：',
  'pg.assistant.brand.th.partNo': '零件号',
  'pg.assistant.brand.th.name': '名称',
  'pg.assistant.brand.th.size': '规格',
  'pg.assistant.brand.th.fit': '适用',
  'pg.assistant.brand.th.model': '型号',
  'pg.assistant.brand.th.process': '工艺',
  'pg.assistant.brand.th.sizes': '5×112 规格（含 ET / 中心孔）',
  'pg.assistant.brand.th.load': '标称载荷',
  'pg.assistant.brand.th.price': '参考价（单只）',
  'pg.assistant.brand.noSizes': '未取得 5×112 数据',
  'pg.assistant.brand.summary': '<strong>{brand}</strong> · {country} —— {positioning}',
  'pg.assistant.brand.tip': '适配提示：中心孔大于 66.6 mm 必须加铝制变径环；球面/锥面座面务必与螺栓匹配；标称载荷应 ≥ 单轮需求的 1.2 倍。',

  /* ---- 推荐方案 ---- */
  'pg.assistant.plan.title': '本站为每代车型准备了三个档位的推荐方案（表格里的外移量是实时算出来的）：',
  'pg.assistant.plan.th.gen': '代际',
  'pg.assistant.plan.th.level': '档位',
  'pg.assistant.plan.th.front': '前轮',
  'pg.assistant.plan.th.rear': '后轮',
  'pg.assistant.plan.th.offset': '外移量',
  'pg.assistant.plan.th.note': '说明',
  'pg.assistant.plan.sameRear': '同前轮',

  /* ---- 发动机 ---- */
  'pg.assistant.engine.th.gen': '代际',
  'pg.assistant.engine.th.code': '代号',
  'pg.assistant.engine.th.name': '名称',
  'pg.assistant.engine.th.displacement': '排量',
  'pg.assistant.engine.th.power': '功率',
  'pg.assistant.engine.th.torque': '扭矩',
  'pg.assistant.engine.th.years': '年份',

  /* ---- 数据缺口 ---- */
  'pg.assistant.gap.title': '本站对拿不到可靠来源的数据一律留空，而不是估算。当前记录在案的缺口：',

  /* ---- 灯光 ---- */
  'pg.assistant.light.howOneSide': '怎么只点亮一侧：',
  'pg.assistant.light.when': '什么时候用：',
  'pg.assistant.light.correction': '更正一个流传说法：',
  'pg.assistant.light.positionLamp': '<strong>示宽灯（小灯）</strong>是灯光开关的一个档位，打开后前部的小灯与尾灯同时点亮（亮度低于刹车灯）。',
  'pg.assistant.light.whereFitted': '<strong>装在车身哪里：</strong>',
  'pg.assistant.light.genTableNote': '各代灯光开关位置与档位见下表。',
  'pg.assistant.light.switchTitle': '<strong>灯光开关位置与档位（四代对比）</strong>',
  'pg.assistant.light.th.gen': '代际',
  'pg.assistant.light.th.type': '开关形式',
  'pg.assistant.light.th.location': '位置',
  'pg.assistant.light.th.positions': '档位',
  'pg.assistant.light.lampsTitle': '<strong>这些灯分别装在车身哪里</strong>',
  'pg.assistant.light.th.lamp': '灯具',
  'pg.assistant.light.th.lampLocation': '位置',

  /* ---- 车内按键 ---- */
  'pg.assistant.ctrl.matched': '匹配到的按键区域：',
  'pg.assistant.ctrl.all': '车内按键按区域整理如下：',

  /* ---- 仪表故障灯 ---- */
  'pg.assistant.wl.colorIntro': '故障灯按颜色分级，<strong>颜色决定处置优先级</strong>：',
  'pg.assistant.wl.th.color': '颜色',
  'pg.assistant.wl.th.meaning': '含义',
  'pg.assistant.wl.th.action': '该怎么做',
  'pg.assistant.wl.hit': '找到这个故障灯：',
  'pg.assistant.wl.byColor': '该颜色的故障灯：',
  'pg.assistant.wl.list': '本站收录的仪表警告灯（先列红色与黄色）：',
  'pg.assistant.wl.c.red': '红色',
  'pg.assistant.wl.c.amber': '黄色',
  'pg.assistant.wl.c.green': '绿色',
  'pg.assistant.wl.c.blue': '蓝色',
  'pg.assistant.wl.c.gray': '其他',
  'pg.assistant.wl.causes': '可能原因',
  'pg.assistant.wl.actions': '怎么处理',
  'pg.assistant.wl.costLabel': '维修参考价',
  'pg.assistant.wl.costRange': '{a} – {b} 元',
  'pg.assistant.wl.note': '<strong>补充：</strong>',

  /* ---- 通用检索兜底 ---- */
  'pg.assistant.search.none': '我没有在这份数据库里找到和「{q}」直接相关的内容。',
  'pg.assistant.search.try': '可以试着换个说法，或者问这些：',
  'pg.assistant.search.ex1': 'S205 的轴距是多少？',
  'pg.assistant.search.ex2': '225/50R17 换成 245/40R18 会怎样？',
  'pg.assistant.search.ex3': 'W204 有什么通病？',
  'pg.assistant.search.ex4': 'W205 用什么机油？',
  'pg.assistant.search.ex5': 'BBS 有哪些适配的轮毂？',
  'pg.assistant.search.ex6': '刹车片多少钱？',
  'pg.assistant.search.found': '找到 {n} 条相关内容：',
  'pg.assistant.search.view': '查看原文',

  /* ================================================================
     回答里的来源链接标签
     ================================================================ */
  'pg.assistant.link.specs': '车身数据页',
  'pg.assistant.link.wheels': '轮毂数据页',
  'pg.assistant.link.calculator': '计算器（可调更多参数）',
  'pg.assistant.link.issues': '用车指南 · 通病速查',
  'pg.assistant.link.oilCert': '机油认证体系',
  'pg.assistant.link.oilPrice': '机油价格对比',
  'pg.assistant.link.interval': '保养体系',
  'pg.assistant.link.labour': '工时费',
  'pg.assistant.link.parts': '配件与机油页',
  'pg.assistant.link.amg': 'AMG 原厂轮毂',
  'pg.assistant.link.brands': '品牌轮毂数据库',
  'pg.assistant.link.plans': '推荐方案',
  'pg.assistant.link.calcSelf': '自己算一遍',
  'pg.assistant.link.engine': '发动机阵容',
  'pg.assistant.link.gapParts': '配件页缺口清单',
  'pg.assistant.link.gapBrands': '品牌页缺口说明',
  'pg.assistant.link.lights': '灯光与按键页',
  'pg.assistant.link.lightsSteps': '灯光与按键页（含操作步骤）',
  'pg.assistant.link.controls': '灯光与按键页',
  'pg.assistant.link.wl': '故障灯速查',
  'pg.assistant.link.wlFilter': '故障灯速查（可按颜色筛选）'
,

  /* ---- chip 的 data-ask ---- */
  'pg.assistant.ask.wheelbase': "S205 的轴距是多少",
  'pg.assistant.ask.issue': "W204 有什么通病",
  'pg.assistant.ask.oil': "W205 用什么机油",
  'pg.assistant.ask.brand': "BBS 有哪些适配的轮毂",
  'pg.assistant.ask.calc': "225/50R17 换成 245/40R18 会怎样",
  'pg.assistant.ask.brake': "刹车片多少钱",
  'pg.assistant.ask.compare': "S204 和 S205 的轴距差多少",
  'pg.assistant.ask.gap': "哪些数据没有核实"
});
