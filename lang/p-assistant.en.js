/* ==========================================================================
   p-assistant.en.js —— 页面级文案：AI 助手页（assistant.html）· 英文
   --------------------------------------------------------------------------
   与 p-assistant.zh.js 键一一对应。
   说明：站内数据（data/、知识库字段名）本身仍是中文，本文件只翻译界面文字
        与助手脚本生成的回答骨架，不翻译数据内容本身。
   ========================================================================== */
Object.assign(window.I18N_DATA.en = window.I18N_DATA.en || {}, {

  /* ================================================================
     Page head
     ================================================================ */
  'pg.assistant.docTitle': 'AI Assistant · Mercedes-Benz C-Class Estate Database',
  'pg.assistant.docDesc': 'The built-in AI assistant of the Mercedes-Benz C-Class Estate database: ask about body dimensions, wheel ET, whether a modification fits, known faults, service intervals, oil and parts prices. Every answer comes from data verified on this site.',

  /* ================================================================
     Hero
     ================================================================ */
  'pg.assistant.hero.eyebrow': 'Assistant',
  'pg.assistant.hero.title.before': 'Built-in ',
  'pg.assistant.hero.title.accent': 'AI Assistant',
  'pg.assistant.hero.desc': 'Just ask. The assistant answers by retrieving data already verified on this site — <strong>body dimensions, wheel ET and fitment, whether a modification will fit, known faults and repair costs, service intervals, oil approvals and parts prices</strong>. Specification questions are calculated live by the calculation engine.',
  'pg.assistant.hero.btnSettings': '⚙ Model settings',
  'pg.assistant.hero.btnCopy': 'Copy "material + question" for someone else',

  /* ================================================================
     Model settings panel
     ================================================================ */
  'pg.assistant.settings.title': 'Model settings',
  'pg.assistant.settings.tag': 'optional',
  'pg.assistant.settings.lead': 'The default <strong>offline retrieval mode</strong> needs no configuration at all — answers come straight from this site. If you would rather have the assistant phrase its answers more naturally, enter your own API key to switch to <strong>LLM mode</strong>: the on-site material it retrieves is sent along as context, so it still answers only from this site.',
  'pg.assistant.settings.enabled': 'Enable LLM mode',
  'pg.assistant.settings.base.label': 'API Base URL <span class="hint">OpenAI-compatible endpoint</span>',
  'pg.assistant.settings.key.label': 'API Key <span class="hint">stored only in your own browser</span>',
  'pg.assistant.settings.model.label': 'Model name',
  'pg.assistant.settings.save': 'Save settings',
  'pg.assistant.settings.presets': 'Common setups: DeepSeek <span class="mono">https://api.deepseek.com/v1</span> + <span class="mono">deepseek-chat</span>; OpenAI <span class="mono">https://api.openai.com/v1</span> + <span class="mono">gpt-4o-mini</span>; OpenRouter <span class="mono">https://openrouter.ai/api/v1</span>.',

  /* ---- Privacy ---- */
  'pg.assistant.privacy.title': 'About the key and your privacy',
  'pg.assistant.privacy.li1': 'The key lives only in your browser <span class="mono">localStorage</span> and is never uploaded to this site — this is a purely static site with <strong>no backend at all</strong>.',
  'pg.assistant.privacy.li2': 'Requests go straight from your browser to the API provider you configure; this site is not involved.',
  'pg.assistant.privacy.li3': 'If a provider does not allow direct browser access (CORS), the failure is reported and the assistant <strong>falls back to offline retrieval automatically</strong>, so nothing breaks.',
  'pg.assistant.privacy.li4': 'If you would rather not set up a key, use "Copy material + question" at the top right and paste the result into any AI chat window.',
  'pg.assistant.privacy.warn': '<strong>Why is there no built-in key?</strong> Any key inside a static page is published together with the source code — that is a leak. Letting every visitor supply their own key is the only safe pattern for a site like this.',

  /* ================================================================
     Chat area
     ================================================================ */
  'pg.assistant.chat.title': 'Ask a question',
  'pg.assistant.chat.placeholder': 'e.g. 225/50R17 → 245/40R18 ／ 8.5Jx19 ET45 on a W205?',
  'pg.assistant.chat.send': 'Send',
  'pg.assistant.chat.note': 'Press Enter to send. The assistant answers only from data verified on this site; if the site does not hold a number it says so instead of inventing one. The offline engine matches Chinese keywords, so tyre and wheel specs (such as 225/50R17) are the most reliable English input.',

  /* ---- Suggested questions (labels only; the submitted query stays in Chinese so the offline engine recognises it) ---- */
  'pg.assistant.chip.wheelbase': 'S205 wheelbase',
  'pg.assistant.chip.issue': 'W204 known faults',
  'pg.assistant.chip.oil': 'W205 engine oil',
  'pg.assistant.chip.brand': 'BBS wheels',
  'pg.assistant.chip.calc': 'Tyre size change',
  'pg.assistant.chip.brake': 'Brake pad price',
  'pg.assistant.chip.compare': 'Compare two generations',
  'pg.assistant.chip.gap': 'Data gaps',

  /* ================================================================
     What it can answer
     ================================================================ */
  'pg.assistant.ability.title': 'What it can answer',
  'pg.assistant.ability.tag': 'Capability',

  'pg.assistant.ability.query.title': 'Structured lookups',
  'pg.assistant.ability.query.li1': '"<span class="mono">S206 front track</span>" → the figure, plus a four-generation comparison table',
  'pg.assistant.ability.query.li2': '"<span class="mono">What is the ET of the factory 17-inch wheel on the W204</span>" → the spec plus backspace / frontspace',
  'pg.assistant.ability.query.li3': '"<span class="mono">What are the common faults on the W203</span>" → symptom, cause, fix and reference cost',
  'pg.assistant.ability.query.li4': '"<span class="mono">C63 engine specs</span>" → power, torque, years and factory wheel set',

  'pg.assistant.ability.calc.title': 'Live calculation',
  'pg.assistant.ability.calc.li1': '"<span class="mono">225/50R17 to 245/40R18</span>" → diameter delta, sidewall movement, track change, speedometer error',
  'pg.assistant.ability.calc.li2': '"<span class="mono">Will 8.5Jx19 ET45 rub on a W205</span>" → graded against that generation of factory setup',
  'pg.assistant.ability.calc.li3': 'With no model given it defaults to the <strong>S205 factory setup</strong> and says so explicitly',

  'pg.assistant.ability.price.title': 'Prices and consumables',
  'pg.assistant.ability.price.li1': '"<span class="mono">How much is engine oil</span>" → brand, approval, capacity and unit price side by side',
  'pg.assistant.ability.price.li2': '"<span class="mono">Brake pad price</span>" → factory and aftermarket part numbers',
  'pg.assistant.ability.price.li3': '"<span class="mono">Which gearbox oil</span>" → the approval differences between 722.6 / 722.9 / 725.0',

  'pg.assistant.ability.light.title': 'Lights and controls',
  'pg.assistant.ability.light.li1': '"<span class="mono">Where is the side light</span>" → switch position, detent, and how it differs from the parking light',
  'pg.assistant.ability.light.li2': '"<span class="mono">How to switch on the parking light</span>" → the full procedure for one-sided parking lights',
  'pg.assistant.ability.light.li3': '"<span class="mono">Where is the light switch</span>" → four-generation comparison table',
  'pg.assistant.ability.light.li4': '"<span class="mono">How does the column shifter work</span>" → in-car buttons listed by area',

  'pg.assistant.ability.warn.title': 'Dashboard warning lights',
  'pg.assistant.ability.warn.li1': '"<span class="mono">The oil pressure light came on, what now</span>" → meaning, whether you can keep driving, causes and steps',
  'pg.assistant.ability.warn.li2': '"<span class="mono">Which warning lights are red</span>" → filter by colour',
  'pg.assistant.ability.warn.li3': '"<span class="mono">Warning light colour grading</span>" → red / amber / green / blue handling priority',

  'pg.assistant.ability.gap.title': 'Honest limits',
  'pg.assistant.ability.gap.li1': 'Ask "<span class="mono">which data is not verified</span>" and it lists every data gap',
  'pg.assistant.ability.gap.li2': 'When nothing is retrieved it says "the site does not hold that data" and suggests another way to ask',
  'pg.assistant.ability.gap.li3': 'In LLM mode the system prompt requires it to <strong>answer only from on-site material and never invent numbers</strong>',

  'pg.assistant.ability.note': '<strong>Where answers come from:</strong> the assistant reads the same data sources as the <a href="wheels.html">wheel data</a>, <a href="specs.html">body data</a>, <a href="guide.html">ownership guide</a>, <a href="fitment.html">wheel fitment</a> and <a href="parts.html">parts and oil</a> pages, so it is always in sync with the pages. Fields marked "unverified" on the pages are reported as unverified here too.',

  /* ================================================================
     assistant.js: UI strings
     ================================================================ */
  'pg.assistant.ui.me': 'You',
  'pg.assistant.ui.ai': 'AI',
  'pg.assistant.ui.metaOffline': 'Offline retrieval mode · all answers come from this site',
  'pg.assistant.ui.metaOfflineShort': 'Offline retrieval mode',
  'pg.assistant.ui.metaLlm': 'LLM mode ({model}) · {n} on-site entries attached',
  'pg.assistant.ui.errTitle': 'LLM call failed, fell back to offline retrieval:',
  'pg.assistant.ui.errHint': 'Common causes: invalid API key, no balance left, or the provider does not allow direct browser calls (CORS).',
  'pg.assistant.ui.httpError': 'HTTP {status}: {body}',
  'pg.assistant.ui.emptyResponse': 'The response was empty',

  'pg.assistant.ui.welcome.p1': 'Hello. I am the built-in assistant of this database and can answer anything about the four generations of Mercedes-Benz C-Class Estate — <strong>S203 / S204 / S205 / S206</strong>: body dimensions, wheel ET, whether a modification fits, known faults, service intervals, oil and parts prices.',
  'pg.assistant.ui.welcome.p2': 'The default is <strong>offline retrieval mode</strong>: answers come only from data verified on this site, with no network and no key needed. You can also enter your own API key at the top right to switch to LLM chat mode.',
  'pg.assistant.ui.indexed': '{n} knowledge entries indexed',

  'pg.assistant.ui.savedOn': 'Settings saved to this browser (localStorage). The next question will use LLM mode.',
  'pg.assistant.ui.savedOff': 'Settings saved to this browser (localStorage). Currently using offline retrieval mode.',
  'pg.assistant.ui.copyNeedQuery': 'Please type your question in the box first.',
  'pg.assistant.ui.copyOk': 'Copied "material + question" to the clipboard ({n} on-site entries). Paste it into any AI chat window.',
  'pg.assistant.ui.copyUnsupported': 'This browser does not support automatic copying — please copy manually.',

  /* ---- Clipboard prompt frame ---- */
  'pg.assistant.copy.promptHead': 'Answer the question using the material below; do not invent anything outside it.',
  'pg.assistant.copy.promptQ': '=== My question ===',

  /* ================================================================
     assistant.js: system prompt sent to the LLM ({ctx} is filled with retrieved material)
     ================================================================ */
  'pg.assistant.sys.rules': 'You are the built-in assistant of the "Mercedes-Benz C-Class Estate Database" website, serving owners of Mercedes-Benz C-Class Estate cars (S203/S204/S205/S206).\nRules:\n1. Answer only from the on-site material given below. Do not introduce facts beyond it, and do not supplement numbers from memory.\n2. If the material does not contain the answer, say plainly "the site does not hold that data" and suggest which page to check.\n3. Answer in English, concisely and professionally. Keep the original units and precision for any numbers.\n4. Do not invent specific figures such as prices, torque or ET values.\n\n',
  'pg.assistant.sys.ctxStart': '=== On-site material ===',
  'pg.assistant.sys.ctxEnd': '=== End of material ===',
  'pg.assistant.sys.emptyCtx': '(no matching on-site entries were retrieved for this question)',
  'pg.assistant.sys.ctxItem': '[{i}] Category: {cat}{chassis}\nTitle: {title}\nContent: {text}',
  'pg.assistant.sys.ctxChassis': ' | Chassis: {chassis}',

  /* ================================================================
     assistant.js: offline answer templates — shared
     ================================================================ */
  'pg.assistant.common.unverified': 'not verified',
  'pg.assistant.common.item': 'Item',
  'pg.assistant.common.detail': 'View details',
  'pg.assistant.common.view': 'View',
  'pg.assistant.common.yuan': '{n} CNY',
  'pg.assistant.common.perL': '{n} CNY/L',
  'pg.assistant.common.general': 'General',

  /* ---- Body dimensions ---- */
  'pg.assistant.body.single': '<strong>{chassis}</strong> {field} is {value}.',
  'pg.assistant.body.ofChassis': ' — ',
  'pg.assistant.body.allFour': 'All four generations — ',
  'pg.assistant.body.allDims': 'body dimensions',
  'pg.assistant.body.tableHead': ' listed below:',

  /* ---- Wheel specs ---- */
  'pg.assistant.wheel.common': '<strong>Shared mounting specs</strong> (identical across all four generations): PCD <span class="mono">5×112</span>, centre bore <span class="mono">66.6 mm</span>, R14 ball-seat bolts.',
  'pg.assistant.wheel.th.gen': 'Generation',
  'pg.assistant.wheel.th.bolt': 'Bolts',
  'pg.assistant.wheel.th.etRange': 'Factory ET range',
  'pg.assistant.wheel.th.oem': 'Typical factory setup',
  'pg.assistant.wheel.oemList': 'Factory wheel list for <strong>{chassis}</strong>:',
  'pg.assistant.wheel.th.size': 'Size',
  'pg.assistant.wheel.th.tyre': 'Tyre',
  'pg.assistant.wheel.th.spacing': 'Backspace / frontspace (mm)',
  'pg.assistant.wheel.th.fit': 'Fits',

  /* ---- Fitment calculation ---- */
  'pg.assistant.calc.noEngine': 'The calculation engine did not load.',
  'pg.assistant.calc.noteTyre': '(no tyre size was given, so {tyre} is derived from the rim width — for reference only)',
  'pg.assistant.calc.noteBase': '(baseline rim counted as {size} ET{et})',
  'pg.assistant.calc.noteWidth': '(target rim width not given, using factory {w}J)',
  'pg.assistant.calc.noteEt': '(target ET not given, using factory ET{et})',
  'pg.assistant.calc.parseFail': 'I could not parse those specs. Please use a format such as <span class="mono">225/50R17</span> or <span class="mono">8.5Jx19 ET45</span>.',
  'pg.assistant.calc.baseline': 'Baseline: the factory <span class="mono">{oem}</span> of the <strong>{chassis}</strong>:',
  'pg.assistant.calc.lbl.grade': 'Overall verdict',
  'pg.assistant.calc.lbl.diameter': 'Tyre outer diameter',
  'pg.assistant.calc.lbl.diameterDelta': 'Diameter change',
  'pg.assistant.calc.lbl.rideHeight': 'Ride height change',
  'pg.assistant.calc.lbl.outer': 'Sidewall movement outwards (est.)',
  'pg.assistant.calc.lbl.inner': 'Sidewall movement inwards (est.)',
  'pg.assistant.calc.lbl.track': 'Track change per axle',
  'pg.assistant.calc.lbl.speedo': 'True speed at an indicated 100 km/h',
  'pg.assistant.calc.lbl.rimOuter': 'Rim outer edge movement',
  'pg.assistant.calc.valDelta': '{mm} mm ({pct}%)',
  'pg.assistant.calc.checkTitle': 'Item-by-item checks:',
  'pg.assistant.calc.grade.ok': 'Pass',
  'pg.assistant.calc.grade.warn': 'Caution',
  'pg.assistant.calc.grade.bad': 'Risk',

  /* ---- Two-generation comparison ---- */
  'pg.assistant.compare.title': '<strong>{a}</strong> vs <strong>{b}</strong>:',
  'pg.assistant.compare.th.diff': 'Difference',
  'pg.assistant.compare.range': 'upper {hi} / lower {lo}',

  /* ---- Known faults ---- */
  'pg.assistant.issue.found': 'Found <strong>{n}</strong> known-fault records:',
  'pg.assistant.issue.foundMore': 'Found <strong>{n}</strong> known-fault records; showing the first {shown}:',
  'pg.assistant.issue.tag': 'known fault',
  'pg.assistant.issue.cost': 'repair cost {v} CNY',
  'pg.assistant.issue.noCost': 'No reliable price source',
  'pg.assistant.issue.symptom': 'Symptom',
  'pg.assistant.issue.cause': 'Cause',
  'pg.assistant.issue.fix': 'Fix',

  /* ---- Engine oil ---- */
  'pg.assistant.oil.title': '<strong>Oil requirements</strong> (the approval matters more than the viscosity):',
  'pg.assistant.oil.th.engine': 'Engine',
  'pg.assistant.oil.th.models': 'Models',
  'pg.assistant.oil.th.cert': 'Approval',
  'pg.assistant.oil.th.viscosity': 'Viscosity',
  'pg.assistant.oil.th.capacity': 'Capacity',
  'pg.assistant.oil.capTitle': 'Capacity notes: ',
  'pg.assistant.oil.capItem': '{engine} {cap} L ({note})',
  'pg.assistant.oil.capJoin': '; ',
  'pg.assistant.oil.priceTitle': '<strong>Reference oil prices</strong> (Chinese market, varying with channel and promotions):',
  'pg.assistant.oil.th.brand': 'Brand',
  'pg.assistant.oil.th.product': 'Product',
  'pg.assistant.oil.th.price': 'Reference price',
  'pg.assistant.oil.th.unitPrice': 'Unit price',

  /* ---- Service intervals ---- */
  'pg.assistant.iv.matched': 'Matching service items:',
  'pg.assistant.iv.all': 'Service interval table collected on this site:',
  'pg.assistant.iv.th.item': 'Item',
  'pg.assistant.iv.th.interval': 'Interval',
  'pg.assistant.iv.th.price': 'Reference price',
  'pg.assistant.iv.th.note': 'Notes',

  /* ---- Prices ---- */
  'pg.assistant.price.title': 'Price information related to "{q}":',
  'pg.assistant.price.th.cat': 'Category',
  'pg.assistant.price.th.item': 'Item',
  'pg.assistant.price.th.detail': 'Details',
  'pg.assistant.price.th.source': 'Source page',
  'pg.assistant.price.note': '<strong>On prices:</strong> every price on this site is a reference range that varies markedly with region, channel and time (typically ±30%); some are historic promotional prices, not quotations.',

  /* ---- Aftermarket wheel brands ---- */
  'pg.assistant.brand.amgTitle': 'This site lists <strong>{n}</strong> genuine Mercedes-AMG wheels (part numbers included):',
  'pg.assistant.brand.th.partNo': 'Part number',
  'pg.assistant.brand.th.name': 'Name',
  'pg.assistant.brand.th.size': 'Size',
  'pg.assistant.brand.th.fit': 'Fits',
  'pg.assistant.brand.th.model': 'Model',
  'pg.assistant.brand.th.process': 'Process',
  'pg.assistant.brand.th.sizes': '5×112 specs (ET / centre bore)',
  'pg.assistant.brand.th.load': 'Rated load',
  'pg.assistant.brand.th.price': 'Reference price (each)',
  'pg.assistant.brand.noSizes': 'No 5×112 data available',
  'pg.assistant.brand.summary': '<strong>{brand}</strong> · {country} — {positioning}',
  'pg.assistant.brand.tip': 'Fitment notes: a centre bore larger than 66.6 mm needs an aluminium spigot ring; ball or cone seat profiles must match the bolts; the rated load should be at least 1.2× the per-wheel requirement.',

  /* ---- Recommended fitments ---- */
  'pg.assistant.plan.title': 'This site lists three fitment levels for every generation (the outward offsets in the table are calculated live):',
  'pg.assistant.plan.th.gen': 'Generation',
  'pg.assistant.plan.th.level': 'Level',
  'pg.assistant.plan.th.front': 'Front',
  'pg.assistant.plan.th.rear': 'Rear',
  'pg.assistant.plan.th.offset': 'Outward offset',
  'pg.assistant.plan.th.note': 'Notes',
  'pg.assistant.plan.sameRear': 'Same as front',

  /* ---- Engines ---- */
  'pg.assistant.engine.th.gen': 'Generation',
  'pg.assistant.engine.th.code': 'Code',
  'pg.assistant.engine.th.name': 'Name',
  'pg.assistant.engine.th.displacement': 'Displacement',
  'pg.assistant.engine.th.power': 'Power',
  'pg.assistant.engine.th.torque': 'Torque',
  'pg.assistant.engine.th.years': 'Years',

  /* ---- Data gaps ---- */
  'pg.assistant.gap.title': 'Where no reliable source exists this site leaves the field empty instead of estimating. The gaps on record:',

  /* ---- Lighting ---- */
  'pg.assistant.light.howOneSide': 'How to light only one side:',
  'pg.assistant.light.when': 'When to use it: ',
  'pg.assistant.light.correction': 'Correcting a widely repeated claim:',
  'pg.assistant.light.positionLamp': '<strong>Side lights (position lamps)</strong> are one detent of the light switch: switching them on lights the front side lamps and the tail lights together (dimmer than the brake lights).',
  'pg.assistant.light.whereFitted': '<strong>Where they sit on the car:</strong>',
  'pg.assistant.light.genTableNote': 'Switch positions and detents by generation are in the table below.',
  'pg.assistant.light.switchTitle': '<strong>Light switch position and detents (four-generation comparison)</strong>',
  'pg.assistant.light.th.gen': 'Generation',
  'pg.assistant.light.th.type': 'Switch type',
  'pg.assistant.light.th.location': 'Position',
  'pg.assistant.light.th.positions': 'Detents',
  'pg.assistant.light.lampsTitle': '<strong>Where each lamp sits on the car</strong>',
  'pg.assistant.light.th.lamp': 'Lamp',
  'pg.assistant.light.th.lampLocation': 'Position',

  /* ---- In-car buttons ---- */
  'pg.assistant.ctrl.matched': 'Matching button areas:',
  'pg.assistant.ctrl.all': 'In-car buttons grouped by area:',

  /* ---- Dashboard warning lights ---- */
  'pg.assistant.wl.colorIntro': 'Warning lights are graded by colour, and <strong>the colour sets the priority</strong>:',
  'pg.assistant.wl.th.color': 'Colour',
  'pg.assistant.wl.th.meaning': 'Meaning',
  'pg.assistant.wl.th.action': 'What to do',
  'pg.assistant.wl.hit': 'Found this warning light:',
  'pg.assistant.wl.byColor': 'Warning lights in that colour:',
  'pg.assistant.wl.list': 'Dashboard warning lights collected on this site (red and amber first):',
  'pg.assistant.wl.c.red': 'Red',
  'pg.assistant.wl.c.amber': 'Amber',
  'pg.assistant.wl.c.green': 'Green',
  'pg.assistant.wl.c.blue': 'Blue',
  'pg.assistant.wl.c.gray': 'Other',
  'pg.assistant.wl.causes': 'Possible causes',
  'pg.assistant.wl.actions': 'What to do',
  'pg.assistant.wl.costLabel': 'Reference repair cost',
  'pg.assistant.wl.costRange': '{a} – {b} CNY',
  'pg.assistant.wl.note': '<strong>Note:</strong> ',

  /* ---- Generic search fallback ---- */
  'pg.assistant.search.none': 'I could not find anything directly related to "{q}" in this database.',
  'pg.assistant.search.try': 'Try rephrasing, or ask one of these (the offline retrieval engine matches Chinese keywords, so the examples are in Chinese):',
  'pg.assistant.search.ex1': 'S205 的轴距是多少？',
  'pg.assistant.search.ex2': '225/50R17 换成 245/40R18 会怎样？',
  'pg.assistant.search.ex3': 'W204 有什么通病？',
  'pg.assistant.search.ex4': 'W205 用什么机油？',
  'pg.assistant.search.ex5': 'BBS 有哪些适配的轮毂？',
  'pg.assistant.search.ex6': '刹车片多少钱？',
  'pg.assistant.search.found': 'Found {n} related entries:',
  'pg.assistant.search.view': 'View source',

  /* ================================================================
     Source link labels inside answers
     ================================================================ */
  'pg.assistant.link.specs': 'Body data page',
  'pg.assistant.link.wheels': 'Wheel data page',
  'pg.assistant.link.calculator': 'Calculator (more parameters)',
  'pg.assistant.link.issues': 'Ownership guide · known faults',
  'pg.assistant.link.oilCert': 'Oil approval system',
  'pg.assistant.link.oilPrice': 'Oil price comparison',
  'pg.assistant.link.interval': 'Service schedule',
  'pg.assistant.link.labour': 'Labour rates',
  'pg.assistant.link.parts': 'Parts and oil page',
  'pg.assistant.link.amg': 'Genuine AMG wheels',
  'pg.assistant.link.brands': 'Aftermarket wheel database',
  'pg.assistant.link.plans': 'Recommended fitments',
  'pg.assistant.link.calcSelf': 'Run the numbers yourself',
  'pg.assistant.link.engine': 'Engine line-up',
  'pg.assistant.link.gapParts': 'Parts page gap list',
  'pg.assistant.link.gapBrands': 'Brand page gap notes',
  'pg.assistant.link.lights': 'Lights and buttons page',
  'pg.assistant.link.lightsSteps': 'Lights and buttons page (with step-by-step)',
  'pg.assistant.link.controls': 'Lights and buttons page',
  'pg.assistant.link.wl': 'Warning light reference',
  'pg.assistant.link.wlFilter': 'Warning light reference (filter by colour)'
,

  /* ---- chip 的 data-ask ---- */
  'pg.assistant.ask.wheelbase': "What is the wheelbase of the S205?",
  'pg.assistant.ask.issue': "What are the common faults on the W204?",
  'pg.assistant.ask.oil': "What oil does the W205 use?",
  'pg.assistant.ask.brand': "Which BBS wheels fit?",
  'pg.assistant.ask.calc': "What happens if I change 225/50R17 to 245/40R18?",
  'pg.assistant.ask.brake': "How much do brake pads cost?",
  'pg.assistant.ask.compare': "What is the wheelbase difference between the S204 and S205?",
  'pg.assistant.ask.gap': "Which data is still unverified?"
});
