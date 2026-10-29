/* ==========================================================================
   p-parts.en.js —— 配件与机油页（parts.html）页面级英文字典
   键命名：pg.parts.区块.元素（与 p-parts.zh.js 一一对应）
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};

Object.assign(window.I18N_DATA.en = window.I18N_DATA.en || {}, {

  /* ---------------- Document ---------------- */
  'pg.parts.docTitle': 'Parts & Oil Prices · Mercedes-Benz C-Class Estate Database',
  'pg.parts.description': 'Mercedes-Benz C-Class Estate parts replacement guide and prices: engine oil brand, spec and price comparison (MB 229.5/229.51/229.52), filters, spark plugs, brake pads and discs, transmission fluid, brake fluid, plus dealer and independent garage labour cost references.',

  /* ---------------- Hero ---------------- */
  'pg.parts.hero.eyebrow': 'Parts & Oil Prices',
  'pg.parts.hero.title': 'Parts Replacement & <span class="accent">Oil Prices</span>',
  'pg.parts.hero.desc': 'What a service costs depends on the spec you buy, where you buy it and who fits it. This page lays out oil, filter, spark plug, brake and transmission fluid prices and specs in tables you can compare side by side, so you can judge whether a dealer quote is reasonable.',
  'pg.parts.priceNote': '<strong>On prices:</strong> the figures below are <strong>market reference ranges</strong>. They vary noticeably with channel (dealer / Tuhu / JD self-operated / Tmall flagship store / parts market), region, brand and promotions — typically by ±30%. Use them to <strong>gauge the order of magnitude and compare quotes</strong>, not as a quotation.',

  /* ---------------- 1. Oil ---------------- */
  'pg.parts.s1.title': '1. Oil Price Comparison<span class="tag">Oil</span>',
  'pg.parts.s1.lead': 'When choosing oil, look at the approval (MB 229.x) first, then the viscosity, and only then the brand. Under the same approval, prices between brands can differ by more than double.',
  'pg.parts.s1.card1.title': 'How many litres does one service take',
  'pg.parts.s1.card1.desc': 'Most Mercedes four-cylinder turbo engines take 5.5–6.5 L of oil; six-cylinders take 6.5–8 L. The usual approach is to buy <strong>one 4 L can plus one 1 L can</strong>, or a 5 L pack topped up with a 1 L can.',
  'pg.parts.s1.card1.note': '<strong>Money-saving tip:</strong> during big e-commerce promotions (618, Double 11) 4 L fully synthetic oil often sells for 50–60% of list price — stocking up for two or three services at once is the cheapest approach. Oil keeps for 4–5 years unopened at room temperature.',
  'pg.parts.s1.card2.title': 'Genuine oil vs brand oil',
  'pg.parts.s1.th.option': 'Option',
  'pg.parts.s1.th.pro': 'Pros',
  'pg.parts.s1.th.con': 'Cons',
  'pg.parts.s1.row1.option': '<strong>Mercedes genuine oil</strong>',
  'pg.parts.s1.row1.pro': 'No doubt about the approval; hassle-free while the warranty lasts',
  'pg.parts.s1.row1.con': 'Highest unit price (often 100–160 CNY/L), usually made by a supplier',
  'pg.parts.s1.row2.option': '<strong>Mobil / Castrol / Shell</strong>',
  'pg.parts.s1.row2.pro': 'Full approvals, many channels, cheap during promotions',
  'pg.parts.s1.row2.con': 'Plenty of counterfeits; buy only from self-operated or flagship stores',
  'pg.parts.s1.row3.option': '<strong>Motul / Fuchs / Liqui Moly</strong>',
  'pg.parts.s1.row3.pro': 'Performance-oriented; some products designed specifically for European cars',
  'pg.parts.s1.row3.con': 'Higher unit price, fewer channels',
  'pg.parts.s1.row4.option': '<strong>Domestic brands (Great Wall / Kunlun)</strong>',
  'pg.parts.s1.row4.pro': 'Low price, few counterfeits',
  'pg.parts.s1.row4.con': 'Incomplete Mercedes approval line-up; check the approval on the bottle',

  /* ---------------- 2. Filters ---------------- */
  'pg.parts.s2.title': '2. Filters<span class="tag">Filters</span>',
  'pg.parts.s2.lead': 'Filters are the classic "genuine part = big-name supplier" category. Mann, Mahle, Bosch and Hengst are the suppliers Mercedes uses most; prices are usually half, or even a third, of the dealer price for identical quality.',

  /* ---------------- 3. Spark plugs ---------------- */
  'pg.parts.s3.title': '3. Spark Plugs<span class="tag">Spark Plugs</span>',
  'pg.parts.s3.lead': 'Turbocharged direct-injection engines need spark plugs far more often than naturally aspirated ones. The wrong part number causes misfires, rough running and can even damage the ignition coils.',
  'pg.parts.s3.note': '<strong>What to look for:</strong> choose by <strong>engine code</strong> — heat range and gap must not be substituted at will. Mercedes genuine plugs are mostly made by NGK or Bosch, so buying the matching NGK/Bosch part gives the same quality for less money. When replacing, fit <strong>four from the same batch</strong> — do not mix brands, or old and new plugs.',

  /* ---------------- 4. Brakes ---------------- */
  'pg.parts.s4.title': '4. Brake Pads and Discs<span class="tag">Brakes</span>',
  'pg.parts.s4.lead': 'Brakes are safety parts; this is not where to save. But between "4000 CNY for pads at the dealer" and "1500 CNY for the same-quality ATE parts at a good independent garage", the difference comes mostly from channel mark-up, not from the parts themselves.',
  'pg.parts.s4.card1.title': 'Brand positioning',
  'pg.parts.s4.th.brand': 'Brand',
  'pg.parts.s4.th.feature': 'Character',
  'pg.parts.s4.th.tier': 'Price tier',
  'pg.parts.s4.row1.brand': '<strong>Mercedes genuine</strong>',
  'pg.parts.s4.row1.feature': 'Mostly made by Textar / Brembo, in genuine packaging',
  'pg.parts.s4.row1.tier': 'Highest',
  'pg.parts.s4.row2.brand': '<strong>Brembo</strong>',
  'pg.parts.s4.row2.feature': 'Benchmark braking performance; original equipment on AMG models',
  'pg.parts.s4.row2.tier': 'High',
  'pg.parts.s4.row3.brand': '<strong>ATE</strong>',
  'pg.parts.s4.row3.feature': 'Major original-equipment supplier to German brands; good value',
  'pg.parts.s4.row3.tier': 'Upper mid',
  'pg.parts.s4.row4.brand': '<strong>Textar / TRW</strong>',
  'pg.parts.s4.row4.feature': 'Original-equipment manufacturers; reliable quality',
  'pg.parts.s4.row4.tier': 'Mid',
  'pg.parts.s4.row5.brand': '<strong>Domestic (Jinqilin etc.)</strong>',
  'pg.parts.s4.row5.feature': 'Low price; dust and noise control varies',
  'pg.parts.s4.row5.tier': 'Low',
  'pg.parts.s4.card2.title': 'When to replace',
  'pg.parts.s4.card2.li1': 'Pad friction material <strong>below 3 mm</strong> must be replaced (new pads are about 10–12 mm).',
  'pg.parts.s4.card2.li2': 'A pad wear warning appears on the instrument cluster (most models have sensors).',
  'pg.parts.s4.card2.li3': 'Disc thickness below the minimum allowed value (the min value is stamped on the disc), or visible scoring, warping or judder.',
  'pg.parts.s4.card2.li4': 'A sharp metallic scraping noise when braking, or a noticeably longer stopping distance.',
  'pg.parts.s4.card2.li5': '<strong>New discs must come with new pads</strong>; if the disc has a lip or uneven wear when only the pads are changed, deal with it at the same time.',

  /* ---------------- 5. Transmission fluid ---------------- */
  'pg.parts.s5.title': '5. Transmission Fluid<span class="tag">ATF</span>',
  'pg.parts.s5.lead': 'Each generation of Mercedes transmission uses a completely different fluid approval — <strong>the wrong fluid causes shift shock and can destroy the transmission</strong>.',
  'pg.parts.s5.note': '<strong>Red line:</strong> Mercedes transmission fluid approvals are <strong>not interchangeable</strong>, and 722.9 itself has two phases:<ul style="margin:8px 0 0;padding-left:20px"><li><strong>722.6</strong> (5G-TRONIC) → <span class="mono">MB 236.10</span> (236.12 / 236.14 also acceptable)</li><li><strong>722.9</strong> (7G-TRONIC, before 2010-06) → <span class="mono">MB 236.14</span></li><li><strong>722.9</strong> (7G-TRONIC PLUS, from 2010-06) → <span class="mono">MB 236.15</span></li><li><strong>725.0</strong> (9G-TRONIC) → <span class="mono">MB 236.17</span></li></ul><p style="margin:10px 0 0">"All 722.9 use 236.15" is the most common mistake. Always check the transmission model and the fluid approval number before filling, and do not believe "all Mercedes ATF is the same". There are two change methods — drain and refill (about 5–7 L) and machine flush (about 10–12 L); on an older, high-mileage car that has never had the fluid changed, a drain and refill first carries less risk.</p>',

  /* ---------------- 6. Brake fluid ---------------- */
  'pg.parts.s6.title': '6. Brake Fluid<span class="tag">Brake Fluid</span>',
  'pg.parts.s6.lead': 'The cheapest item, the easiest to postpone, and the most direct consequences. Brake fluid keeps absorbing moisture from the air, and rising water content drops the boiling point sharply — on a long descent or during hard driving, boiling fluid creates vapour bubbles and the pedal goes straight to the floor.',
  'pg.parts.s6.note': '<strong>Key points:</strong> the interval is <strong>2 years</strong> (or 40,000 km). It must be changed with a pressure bleeder — pedal bleeding rarely gets all the old fluid out of the ABS pump and lines. Mercedes models need DOT4 or higher; models with ESP/ABS are best served by DOT4 Plus (genuine spec Blatt 331.0). <strong>Never mix DOT5 (silicone based) into a DOT4 system</strong> — the two are incompatible.',

  /* ---------------- 7. Labour ---------------- */
  'pg.parts.s7.title': '7. Labour Cost and Total Service Cost Reference<span class="tag">Labour</span>',
  'pg.parts.s7.lead': 'For the same job, the price difference between a dealer and a good independent garage can be 2–3 times. Keep a new car under warranty at the dealer; once it is out of warranty, a specialist shop that knows Mercedes is the mainstream choice.',
  'pg.parts.s7.card1.title': 'You can do it yourself',
  'pg.parts.s7.card1.desc': 'Cabin filter, air filter, wiper blades, battery (coding is needed on some models), bulbs. Dealer labour on these is often several times the price of the part itself, so doing it yourself saves most of the cost.',
  'pg.parts.s7.card2.title': 'Leave it to the professionals',
  'pg.parts.s7.card2.desc': 'Transmission fluid (needs special equipment and oil-temperature calibration), brake fluid (needs pressure bleeding and a diagnostic tool), timing chain, air suspension, and anything involving the high-voltage system.',
  'pg.parts.s7.card3.title': 'Affects resale value',
  'pg.parts.s7.card3.desc': 'A complete service history (ideally stamped dealer or specialist invoices) is worth several thousand CNY when you sell. The money saved by moving from a good independent to a back-street shop usually gets paid back double at sale time.',

  /* ---------------- 8. Buying rules ---------------- */
  'pg.parts.s8.title': '8. Six Rules for Buying Parts<span class="tag">Rules</span>',
  'pg.parts.s8.card1.title': '1. Never skimp on safety parts',
  'pg.parts.s8.card1.desc': 'Brakes (pads/discs/fluid), tyres, wheels, steering and suspension parts. These are the only parts that directly decide life or death.',
  'pg.parts.s8.card2.title': '2. Approval before brand',
  'pg.parts.s8.card2.desc': 'For oil look at MB 229.x, for transmission fluid MB 236.x, for brake fluid DOT4 Plus. An approved no-name beats an unapproved big name.',
  'pg.parts.s8.card3.title': '3. Go by the part number',
  'pg.parts.s8.card3.desc': 'A Mercedes genuine part number looks like <span class="mono">A2711800009</span>. Looking up the equivalent part by that number is the most reliable route and avoids buying the wrong item.',
  'pg.parts.s8.card4.title': '4. Channel matters more than price',
  'pg.parts.s8.card4.desc': 'Oil, brake pads and spark plugs are the most heavily counterfeited items. Prefer JD self-operated, Tmall official flagship stores and authorised distributors; do not buy the same item "40% cheaper than market price".',
  'pg.parts.s8.card5.title': '5. Replace in pairs or sets',
  'pg.parts.s8.card5.desc': 'Brake pads in axle pairs, spark plugs four from the same batch, dampers in axle pairs. Replacing one side only leaves braking force or damping uneven left to right.',
  'pg.parts.s8.card6.title': '6. Keep the paperwork',
  'pg.parts.s8.card6.desc': 'Keep the invoice and parts receipt for every service — it makes tracking the next service easy and is the strongest evidence of condition when selling.',

  /* ---------------- 9. Data gaps ---------------- */
  'pg.parts.s9.title': '9. Data Gaps and Sources<span class="tag">Honesty</span>',
  'pg.parts.s9.lead': 'Every price, part number and specification on this page comes from e-commerce pages actually scraped, owner test posts and parts platform records. Where no reliable source could be found, the field is left blank rather than filled with a plausible-looking number.',
  'pg.parts.s9.note': '<strong>Note on price timeliness:</strong> some quotes are 2015–2019 promotional records and differ noticeably from today. Promotional prices (especially during big e-commerce events) are usually 30%–40% below normal. Treat the figures here as an <strong>order-of-magnitude reference</strong> and check the current price before ordering.',

  /* ---------------- JS: empty state ---------------- */
  'pg.parts.tbl.empty.prefix': 'No ',
  'pg.parts.tbl.empty.suffix': ' data available yet.',

  /* ---------------- JS: item names (for empty state) ---------------- */
  'pg.parts.item.oil': 'engine oil',
  'pg.parts.item.filter': 'filter',
  'pg.parts.item.spark': 'spark plug',
  'pg.parts.item.brake': 'brake',
  'pg.parts.item.atf': 'transmission fluid',
  'pg.parts.item.brakeFluid': 'brake fluid',
  'pg.parts.item.labour': 'labour cost',

  /* ---------------- JS: units ---------------- */
  'pg.parts.unit.yuan': 'CNY',
  'pg.parts.unit.yuanPerPiece': 'CNY each',
  'pg.parts.unit.qty': 'pcs',
  'pg.parts.unit.interval': '×10k km',

  /* ---------------- JS: oil table ---------------- */
  'pg.parts.tbl.oil.th.brand': 'Brand',
  'pg.parts.tbl.oil.th.product': 'Full product name',
  'pg.parts.tbl.oil.th.viscosity': 'Viscosity',
  'pg.parts.tbl.oil.th.cert': 'Approval',
  'pg.parts.tbl.oil.th.volume': 'Volume',
  'pg.parts.tbl.oil.th.price': 'Ref. price',
  'pg.parts.tbl.oil.th.unitPrice': 'Unit price (CNY/L)',
  'pg.parts.tbl.oil.th.channel': 'Channel / notes',
  'pg.parts.tbl.oil.footnote': 'Unit price = reference price ÷ volume, for comparing value across pack sizes. During promotions it is often 50–60% of list, so stocking up noticeably lowers the cost per service.',

  /* ---------------- JS: filter table ---------------- */
  'pg.parts.tbl.filter.th.item': 'Item',
  'pg.parts.tbl.filter.th.oemPart': 'Genuine part no.',
  'pg.parts.tbl.filter.th.oemPrice': 'Genuine price',
  'pg.parts.tbl.filter.th.brand': 'Brand',
  'pg.parts.tbl.filter.th.partNo': 'Aftermarket part no.',
  'pg.parts.tbl.filter.th.price': 'Ref. price',
  'pg.parts.tbl.filter.th.note': 'Notes',
  'pg.parts.tbl.filter.footnote': 'Mercedes filters are mostly made by Mann, Mahle, Hengst and Bosch; buying the matching brand part usually saves 40%–60% at identical quality.',

  /* ---------------- JS: spark plug table ---------------- */
  'pg.parts.tbl.spark.th.engine': 'Engine',
  'pg.parts.tbl.spark.th.brand': 'Brand',
  'pg.parts.tbl.spark.th.partNo': 'Part number',
  'pg.parts.tbl.spark.th.price': 'Ref. unit price',
  'pg.parts.tbl.spark.th.qty': 'Qty',
  'pg.parts.tbl.spark.th.interval': 'Change interval',
  'pg.parts.tbl.spark.th.note': 'Notes',

  /* ---------------- JS: brake table ---------------- */
  'pg.parts.tbl.brake.th.position': 'Position',
  'pg.parts.tbl.brake.th.brand': 'Brand',
  'pg.parts.tbl.brake.th.partNo': 'Part number',
  'pg.parts.tbl.brake.th.price': 'Ref. price',
  'pg.parts.tbl.brake.th.interval': 'Change interval',
  'pg.parts.tbl.brake.th.note': 'Notes',

  /* ---------------- JS: transmission fluid table ---------------- */
  'pg.parts.tbl.atf.th.trans': 'Transmission',
  'pg.parts.tbl.atf.th.spec': 'Fluid approval',
  'pg.parts.tbl.atf.th.capacity': 'Capacity',
  'pg.parts.tbl.atf.th.oemPrice': 'Genuine fluid ref. price',
  'pg.parts.tbl.atf.th.alts': 'Alternative brands',
  'pg.parts.tbl.atf.th.note': 'Notes',

  /* ---------------- JS: brake fluid table ---------------- */
  'pg.parts.tbl.brakeFluid.th.spec': 'Specification',
  'pg.parts.tbl.brakeFluid.th.brand': 'Brand',
  'pg.parts.tbl.brakeFluid.th.volume': 'Volume',
  'pg.parts.tbl.brakeFluid.th.price': 'Ref. price',
  'pg.parts.tbl.brakeFluid.th.note': 'Notes',

  /* ---------------- JS: labour table ---------------- */
  'pg.parts.tbl.labour.th.type': 'Job',
  'pg.parts.tbl.labour.th.channel': 'Type',
  'pg.parts.tbl.labour.th.price': 'Ref. price',
  'pg.parts.tbl.labour.th.note': 'Notes',

  /* ---------------- JS: data-gap block ---------------- */
  'pg.parts.tbl.missing.title': 'Data we could not obtain (listed honestly)',
  'pg.parts.tbl.missing.footnote': 'These fields show "—" on the page because scraping was limited, not because the data does not exist. Better to tell you clearly that it is missing than to fill in a plausible but unreliable number.'

});
