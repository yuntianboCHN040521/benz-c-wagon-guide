/* ==========================================================================
   p-fitment.en.js —— English copy (page-level dictionary: wheel fitment page)
   Keys: pg.fitment.section.element
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};

Object.assign(window.I18N_DATA.en = window.I18N_DATA.en || {}, {

  /* ---------------- Document ---------------- */
  'pg.fitment.docTitle': 'Wheel Fitment & Brand Database · Mercedes-Benz C-Class Estate Database',
  'pg.fitment.docDesc': 'Fitment ratings, available sizes and ET offsets, reference prices for BBS, OZ, RAYS, Enkei, Work and AMG OEM wheels on the Mercedes-Benz C-Class Estate S203/S204/S205/S206, plus per-generation recommended setups.',

  /* ---------------- Hero ---------------- */
  /* 收尾的 & 与右侧 .accent 标题相接，用不换行空格避免被 HTML 空白折叠吞掉 */
  'pg.fitment.hero.title.before': 'Wheel Fitment &\u00a0',
  'pg.fitment.hero.title.accent': 'Brand Database',
  'pg.fitment.hero.desc': 'Which wheels fit, what they do to the car, and whether they are worth the money. This page covers the Mercedes-compatible models from BBS, OZ, RAYS, Enkei, Work and other mainstream brands, plus AMG OEM wheels and three tiered upgrade plans for each generation.',

  /* ---------------- 1. How fitment is judged ---------------- */
  'pg.fitment.method.title': '1. How Fitment Is Judged',
  'pg.fitment.method.tag': 'Method',
  'pg.fitment.method.lead': 'The fitment ratings on this site are not subjective impressions — they are calculated from the five hard criteria below.',

  'pg.fitment.method.c1.meta': 'Criterion 01',
  'pg.fitment.method.c1.title': 'Mounting parameters match',
  'pg.fitment.method.c1.desc': 'PCD must be 5×112; centre bore ≥66.6 (larger needs a spigot ring); the bolt seat must be ball-seat R14; bolt thread must match the model (M12×1.5 on the W203, M14×1.5 from the W204 on).',
  'pg.fitment.method.c1.badge': 'Any mismatch = will not fit',

  'pg.fitment.method.c2.meta': 'Criterion 02',
  'pg.fitment.method.c2.title': 'Outward poke',
  'pg.fitment.method.c2.desc': 'How far the sidewall sits outboard of the factory position. This is the primary rubbing-risk indicator, and the basis for deciding between "flush" and "poking out".',
  'pg.fitment.method.c2.b1': '≤6 mm flush',
  'pg.fitment.method.c2.b2': '6–12 mm full',
  'pg.fitment.method.c2.b3': '>12 mm risky',

  'pg.fitment.method.c3.meta': 'Criterion 03',
  'pg.fitment.method.c3.title': 'Inner clearance',
  'pg.fitment.method.c3.desc': 'How far the wheel intrudes inboard decides whether it fouls the strut and the arch liner. Big-brake AMG models have larger calipers and therefore less margin.',
  'pg.fitment.method.c3.b1': '≥−8 mm safe',
  'pg.fitment.method.c3.b2': '−8 ~ −15 mm measure first',
  'pg.fitment.method.c3.b3': '<−15 mm high risk',

  'pg.fitment.method.c4.meta': 'Criterion 04',
  'pg.fitment.method.c4.title': 'Diameter and speedometer',
  'pg.fitment.method.c4.desc': 'Change in tyre overall diameter versus stock. Beyond ±3% it affects ESP decisions and shift logic; beyond ±5% it counts as a dangerous modification.',
  'pg.fitment.method.c4.b1': 'within ±2% ideal',
  'pg.fitment.method.c4.b2': '±2–3% acceptable',
  'pg.fitment.method.c4.b3': '>3% not advised',

  'pg.fitment.method.c5.meta': 'Criterion 05',
  'pg.fitment.method.c5.title': 'Load rating and weight',
  'pg.fitment.method.c5.desc': 'The wheel\'s rated load must be at least 1.2× the per-corner requirement; weight affects unsprung mass, so lighter is better at the same size (without sacrificing load rating).',
  'pg.fitment.method.c5.b1': 'forged 7–9.5 kg',
  'pg.fitment.method.c5.b2': 'flow-formed 8.5–11.5 kg',
  'pg.fitment.method.c5.b3': 'cheap cast >13 kg',

  'pg.fitment.method.c6.meta': 'Criterion 06',
  'pg.fitment.method.c6.title': 'Type approval',
  'pg.fitment.method.c6.desc': 'In Germany, TÜV requires a Gutachten (an ABE covering the Mercedes model) or a single-vehicle Einzelabnahme; the Chinese annual inspection looks at tyre size and overall dimensions. Reputable brands publish a fitment list — ask for it before you buy.',
  'pg.fitment.method.c6.badge': 'Insist on a Gutachten / ABE',

  /* ---------------- 2. Recommended setups ---------------- */
  'pg.fitment.plans.title': '2. Recommended Setups by Generation',
  'pg.fitment.plans.tag': 'Presets',
  'pg.fitment.plans.lead': 'Every tier is calculated live by the calculator for poke and speedometer error — the numbers in the table are computed, not estimated.',
  'pg.fitment.plans.chip.all': 'All generations',
  'pg.fitment.plans.note': '<strong>What the three tiers mean:</strong> <span class="badge ok">OEM style</span> keeps the same-generation factory size — zero risk, zero hassle, just a different look. <span class="badge warn">Stage fit</span> goes slightly wider within the arch margins, balancing stance and usability; this is the most popular choice. <span class="badge bad">Aggressive stance</span> chases maximum visual impact, usually needs negative camber, rolled arches or suspension changes, and inevitably sacrifices comfort and clearance.',

  /* ---------------- 3. Availability matrix ---------------- */
  'pg.fitment.matrix.title': '3. Wheel Size Availability Matrix',
  'pg.fitment.matrix.tag': 'Matrix',
  'pg.fitment.matrix.lead': 'Every common rim width × ET combination, worked out in one go. Each cell is the <strong>sidewall movement relative to stock (mm)</strong>; a positive value means further outboard than stock. This table answers the first sizing question: <em>for a rim this wide, which ET should I choose?</em>',
  'pg.fitment.matrix.safe.k': 'Safe zone',
  'pg.fitment.matrix.safe.v': 'Poke −8 ~ +6 mm',
  'pg.fitment.matrix.safe.d': 'From the stock position out to "flush" — no extra work needed',
  'pg.fitment.matrix.measure.k': 'Needs measuring',
  'pg.fitment.matrix.measure.v': 'Poke +6 ~ +12 mm or −8 ~ −15 mm<br>Inboard −10 ~ −18 mm',
  'pg.fitment.matrix.measure.d': 'Needs a clay dynamic test; with a large negative poke the tyre visibly sinks into the arch',
  'pg.fitment.matrix.bad.k': 'Not advised',
  'pg.fitment.matrix.bad.v': 'Poke > +12 mm or < −15 mm<br>Inboard < −18 mm',
  'pg.fitment.matrix.bad.d': 'Needs wide-body work or rolled arches, or will inevitably foul the struts or liners',
  'pg.fitment.matrix.note': '<strong>How to use this table:</strong> decide the visual width you want (8.5J, for example), then scan across that row for the green cells to read the approximate ET range. <strong>Note that this table covers lateral position only — it does not include brake caliper clearance or tyre diameter</strong> — before deciding, go back to the <a href="calculator.html">calculator</a> for a full configuration comparison.',

  /* ---------------- 4. Brand database ---------------- */
  'pg.fitment.brands.title': '4. Wheel Brand Database',
  'pg.fitment.brands.tag': 'Brands',
  'pg.fitment.brands.lead': 'Only models that genuinely offer a 5×112 bolt pattern and can be used on a Mercedes C-Class are listed. Click a brand to filter.',

  /* ---------------- 4. AMG OEM ---------------- */
  'pg.fitment.amg.title': '4. AMG OEM Wheels',
  'pg.fitment.amg.tag': 'OEM+',
  'pg.fitment.amg.lead': 'Factory AMG wheels are the least troublesome "upgrade" route: load rating, ET, centre bore and bolts all match from the factory. The only problems are the price and the scarcity of new stock (most are take-offs).',
  'pg.fitment.amg.note': '<strong>Why recommend factory AMG wheels?</strong> Because they were designed for this chassis: ET and track match precisely, the load rating was validated against the vehicle\'s maximum gross mass, balance and roundness come with a factory guarantee, and most carry a TÜV-recognised Gutachten. The downsides are the price of new parts (often above 5,000 CNY each) and the number of fakes on the used market (especially so-called "AMG style" replicas). When buying used, always check the <strong>OEM part number (A2xx401xxxx)</strong> and the casting marks on the inner face.',

  /* ---------------- 5. Myths ---------------- */
  'pg.fitment.myths.title': '5. Six Common Misconceptions',
  'pg.fitment.myths.tag': 'Myths',
  'pg.fitment.myths.m1.title': 'Myth 1: the smaller the ET, the better the look',
  'pg.fitment.myths.m1.desc': 'Too small an ET pushes the tyre out against the arch, while the scrub radius changes sharply, making steering heavier and wearing the tyre shoulder; the extra bending moment also shortens wheel-bearing life. A visually "flush" fit usually means 5–8 mm of poke, not 20 mm.',
  'pg.fitment.myths.m2.title': 'Myth 2: bigger wheels make the car faster',
  'pg.fitment.myths.m2.desc': 'The moment of inertia of a larger-diameter wheel grows with the square of the radius, so even at the same total weight acceleration and braking get worse. Unless you also cut weight substantially (forged wheels), "bigger means slower" is the norm.',
  'pg.fitment.myths.m3.title': 'Myth 3: any bolt will do as long as it threads on',
  'pg.fitment.myths.m3.desc': 'A ball seat on a cone seat self-loosens while driving; too little thread strips; too much thread bottoms out on the wheel bearing. This is the most serious — and most easily avoided — of all modification mistakes.',
  'pg.fitment.myths.m4.title': 'Myth 4: no spigot rings needed, the bolts centre the wheel',
  'pg.fitment.myths.m4.desc': 'Bolts only clamp; radial location comes from the centre bore and the hub spigot. Without spigot rings you get high-speed vibration, bolts loaded in shear, wheel eccentricity and, eventually, fatigue failure.',
  'pg.fitment.myths.m5.title': 'Myth 5: wider tyres always grip more',
  'pg.fitment.myths.m5.desc': 'Contact area is constrained by rim width and tyre pressure together. Fit an oversize tyre to a narrow rim and the tread crowns into a doughnut shape, so the actual contact patch gets smaller and both wet performance and wear suffer.',
  'pg.fitment.myths.m6.title': 'Myth 6: alignment does not matter after a wheel change',
  'pg.fitment.myths.m6.desc': 'Changing wheel position also changes where camber and toe land on the tyre, and skipping the alignment usually means scrapped tyres a few thousand kilometres later. An alignment after fitting should be standard practice.',

  /* ---------------- JS-rendered: plan table ---------------- */
  'pg.fitment.plan.empty': 'No recommended setups for this generation yet.',
  'pg.fitment.plan.th.gen': 'Generation',
  'pg.fitment.plan.th.level': 'Tier',
  'pg.fitment.plan.th.oem': 'OEM baseline',
  'pg.fitment.plan.th.front': 'Recommended front',
  'pg.fitment.plan.th.frontMove': 'Front poke',
  'pg.fitment.plan.th.frontDia': 'Front dia. change',
  'pg.fitment.plan.th.rear': 'Rear poke / dia. change',
  'pg.fitment.plan.th.grade': 'Rating',
  'pg.fitment.plan.th.note': 'Notes',
  'pg.fitment.plan.sameFb': 'same front and rear',
  'pg.fitment.plan.foot': 'A positive poke means further outboard than stock. The rating rules are explained under "How fitment is judged" above. Real clearance still depends on a <strong>clay test on the actual car</strong>, especially at the rear under full load.',

  /* ---------------- JS-rendered: brands ---------------- */
  'pg.fitment.brands.empty': 'No brand data yet.',
  'pg.fitment.brands.chip.all': 'All brands',
  'pg.fitment.brands.cb.ring': 'Spigot ring needed',
  'pg.fitment.brands.cb.direct': 'Direct fit',
  'pg.fitment.brands.th.size': 'Size',
  'pg.fitment.brands.th.pcd': 'PCD',
  'pg.fitment.brands.th.et': 'Offset',
  'pg.fitment.brands.th.cb': 'Centre bore',
  'pg.fitment.brands.th.weight': 'Weight per wheel (kg)',
  'pg.fitment.brands.th.cbFit': 'Centre bore fit',
  'pg.fitment.brands.th.note': 'Notes',
  'pg.fitment.brands.noData': 'No 5×112 size data available for this model — see the explanation above.',
  'pg.fitment.brands.load.k': 'Rated load',
  'pg.fitment.brands.price.k': 'Reference price (each)',
  'pg.fitment.brands.price.src': 'Price source: ',

  /* ---------------- JS-rendered: AMG OEM ---------------- */
  'pg.fitment.amg.empty': 'No AMG OEM wheel data yet.',
  'pg.fitment.amg.th.part': 'OEM part number',
  'pg.fitment.amg.th.name': 'Name',
  'pg.fitment.amg.th.size': 'Size',
  'pg.fitment.amg.th.et': 'Offset',
  'pg.fitment.amg.th.tyre': 'Tyre',
  'pg.fitment.amg.th.models': 'Fits',
  'pg.fitment.amg.th.price': 'Reference price (each)',

  /* ---------------- JS-rendered: matrix ---------------- */
  'pg.fitment.matrix.th.rim': 'Rim width (tyre width)',
  'pg.fitment.matrix.tip': '{rim}J with {tyre} tyre / ET{et}: outer {move} mm, inner {inner} mm',
  'pg.fitment.matrix.foot': 'Baseline: <span class="mono">{chassis}</span> OEM front <span class="mono">{size} ET{et} + {tyre}</span>. Cell values are the <strong>sidewall outer edge movement relative to stock (mm)</strong>; a positive value means further outboard. Hover a cell to see the exact inner and outer shifts.',

  /* ---------------- JS-rendered: gaps and sources ---------------- */
  'pg.fitment.notes.title': 'Data gaps: what this brand data is missing and why',
  'pg.fitment.notes.src': 'Source list ({n} entries, all actually fetched pages)'

});
