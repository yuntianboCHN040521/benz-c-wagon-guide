/* ==========================================================================
   p-calc.en.js —— English copy for calculator.html
   Keys: pg.calc.page.element   (page-scoped dictionary, mirrors p-calc.zh.js)
   ========================================================================== */
Object.assign(window.I18N_DATA.en = window.I18N_DATA.en || {}, {

  /* ---------------- Document head ---------------- */
  'pg.calc.docTitle': 'Wheel & Tyre Upgrade Calculator · Mercedes-Benz C-Class Estate Database',
  'pg.calc.description': 'Wheel and tyre upgrade calculator for the Mercedes-Benz C-Class Estate (S203/S204/S205/S206): outer diameter and speedometer error, ET offset poke, track and scrub radius change, load index check and tyre size recommendations.',

  /* ---------------- Hero ---------------- */
  'pg.calc.hero.eyebrow': 'Calculator',
  'pg.calc.hero.title': 'Wheel &amp; Tyre Upgrade <span class="accent">Calculator</span>',
  'pg.calc.hero.desc': 'The first question about aftermarket wheels is not "does it look good" but "what does it move once it is bolted on". This page calculates it live: tyre outer diameter and speedometer error, the inner and outer shift caused by the ET offset, changes in track width and scrub radius, whether the load and speed ratings are sufficient — and then gives an overall verdict.',

  'pg.calc.note.coord': '<strong>Sign convention:</strong> measured from the wheel mounting face, positive towards the outside of the car. ET is the distance from the rim centreline to the mounting face (a larger ET pulls the wheel further inboard). Tyre poke is how far the outer face of the tyre moves relative to stock, and it is the first indicator of whether the fender will be rubbed.',

  /* ---------------- Section 1: configuration comparison ---------------- */
  'pg.calc.s1.title': 'Configuration Comparison<span class="tag">OEM → Target</span>',
  'pg.calc.s1.lead': 'Pick a generation to auto-fill the OEM wheels and tyres, or enter everything manually.',

  'pg.calc.oem.title': 'OEM setup',
  'pg.calc.oem.gen': 'Generation <span class="hint">fills in the OEM spec</span>',
  'pg.calc.oem.opt.s203': 'S203 · W203 Mk2 (2001–2007)',
  'pg.calc.oem.opt.s204': 'S204 · W204 Mk3 (2007–2014)',
  'pg.calc.oem.opt.s205': 'S205 · W205 Mk4 (2014–2021)',
  'pg.calc.oem.opt.s206': 'S206 · W206 Mk5 (2021–)',
  'pg.calc.oem.trim': 'OEM configuration',
  'pg.calc.oem.tyre': 'OEM tyre size',
  'pg.calc.oem.tyrePh': '225/50R17 98W',
  'pg.calc.oem.preset': 'Reload OEM preset',

  'pg.calc.tgt.title': 'Target setup (modified)',
  'pg.calc.tgt.tyre': 'Target tyre size',
  'pg.calc.tgt.tyrePh': '245/40R18 97Y',
  'pg.calc.tgt.axle': 'Axle load <span class="hint">kg, optional — used for the load check (kerb weight from the registration, or one axle on a weighbridge)</span>',
  'pg.calc.tgt.axlePh': 'e.g. 1000',
  'pg.calc.tgt.axleTip': 'Tip: front axle load is usually 52%–57% of kerb weight and rear axle 43%–48%. Checking the heavier axle is the safe choice.',

  'pg.calc.label.rimWidth': 'Rim width <span class="hint">J</span>',
  'pg.calc.label.et': 'ET <span class="hint">mm</span>',
  'pg.calc.label.load': 'Load index',

  'pg.calc.result.title': 'Results',
  'pg.calc.issues.title': 'Item-by-item checks',

  /* ---------------- Section 2: size recommender ---------------- */
  'pg.calc.s2.title': 'Tyre Size Recommender<span class="tag">Keep the OD</span>',
  'pg.calc.s2.lead': 'A larger rim diameter needs a lower-profile tyre to keep the outer diameter. Enter the OEM tyre and the target rim diameter, and every candidate size within the diameter tolerance is listed, sorted by how close it comes.',
  'pg.calc.rec.base': 'OEM tyre size <span class="hint">the diameter baseline</span>',
  'pg.calc.rec.rim': 'Target rim diameter <span class="hint">inch</span>',
  'pg.calc.rec.tol': 'Allowed deviation <span class="hint">%</span>',
  'pg.calc.rec.btn': 'Generate recommendations',
  'pg.calc.rec.tip': 'Rule of thumb: keeping the outer diameter within <strong>±2%</strong> is ideal; ±2%–3% means accepting speedometer error; beyond ±3% is not advisable, and beyond ±5% is a dangerous modification.',
  'pg.calc.rec.candidates': 'Candidate sizes',
  'pg.calc.rec.empty': 'Click the button on the left to generate.',

  /* ---------------- Section 3: load index ---------------- */
  'pg.calc.s3.title': 'Load Index Chart<span class="tag">Load Index</span>',
  'pg.calc.s3.lead': 'The load index is the most easily overlooked part of a wheel upgrade, and the one with the most serious consequences. Each step is worth roughly 2.5% of load capacity, and the combined capacity of the four tyres must exceed the gross vehicle weight rating (GVWR).',
  'pg.calc.li.th.index': 'Load index',
  'pg.calc.li.th.single': 'Per tyre kg',
  'pg.calc.li.th.four': 'Four tyres kg',
  'pg.calc.li.how.title': 'How to use this chart',
  'pg.calc.li.how.li1': 'Look up the <strong>gross vehicle weight rating</strong> (GVWR) on the registration document — 2150 kg, for example.',
  'pg.calc.li.how.li2': 'The four tyres combined must be ≥ GVWR. 2150 / 4 ≈ 538 kg each, so load index <strong>86</strong> (530 kg) is not enough — you need <strong>87</strong> (545 kg).',
  'pg.calc.li.how.li3': 'In the real world the front and rear axle loads differ, so calculate from the <strong>heavier axle</strong>: 1150 kg on the front → at least 575 kg per tyre → index <strong>89</strong>.',
  'pg.calc.li.how.li4': 'Add another 10% of margin; picking 90 (600 kg) or above is the safer choice.',
  'pg.calc.li.wagonNote': '<strong>The estate carries extra weight:</strong> a wagon is usually 30–60 kg heavier than the equivalent saloon, and its boot is far more likely to be fully loaded. If the car often runs full of people and luggage on long trips, go 1–2 load index steps above the theoretical figure.',
  'pg.calc.speed.title': 'Speed rating',
  'pg.calc.speed.th.grade': 'Rating',
  'pg.calc.speed.th.max': 'Max km/h',
  'pg.calc.speed.note': 'C-Class Estates (AMG included) come on <strong>W (270 km/h)</strong> or <strong>Y (300 km/h)</strong> tyres from the factory. Downgrading to H/V is not compliant on unlimited German motorways but is acceptable for everyday driving — provided the rating is never exceeded.',

  /* ---------------- Section 4: bolt length ---------------- */
  'pg.calc.s4.title': 'Bolt Length Calculator<span class="tag">Bolt Length</span>',
  'pg.calc.s4.lead': 'The most common fatal mistake when fitting aftermarket wheels is reusing the OEM bolts. Wheel pad thickness differs, so the effective thread engagement ends up either too short or so long that the bolt bottoms out against the brake disc.',
  'pg.calc.bolt.oemLen': 'OEM bolt thread length <span class="hint">mm; C-Class OEM ball-seat bolts are usually 24–27 mm</span>',
  'pg.calc.bolt.oemPad': 'OEM wheel pad thickness <span class="hint">mm</span>',
  'pg.calc.bolt.newPad': 'New wheel pad thickness <span class="hint">mm</span>',
  'pg.calc.bolt.btn': 'Calculate bolt length',
  'pg.calc.bolt.tip': 'Pad thickness is the real thickness where the wheel face seats against the hub face (spacers included). Aftermarket wheels are often made thinner here to get a concave face, so the same bolt protrudes further and may hit the hub or the back of the brake disc.',
  'pg.calc.bolt.plan': 'Recommended spec',
  'pg.calc.bolt.placeholder': 'Fill in the fields on the left, then calculate',
  'pg.calc.bolt.seatNote': '<strong>Ball seat vs cone seat:</strong> Mercedes-Benz uses <strong>ball-seat (R14, 14 mm radius)</strong> bolts. Most aftermarket wheels (BBS, OZ, RAYS, Work and others) also use a ball seat and can reuse them, but some Japanese/US or track wheels use a <strong>60° cone seat</strong> and need matching bolts — mixing the two will make the bolts work loose.',

  /* ---------------- Section 5: formulas ---------------- */
  'pg.calc.s5.title': 'How It Is Calculated<span class="tag">Formula</span>',
  'pg.calc.f.od.title': 'Tyre outer diameter',
  'pg.calc.f.od.pre': 'OD = rim diameter × 25.4 + 2 × (tyre width × aspect ratio / 100)\n\nExample: 225/50R17\n= 17 × 25.4 + 2 × (225 × 0.50)\n= 431.8 + 225 = 656.8 mm',
  'pg.calc.f.speedo.title': 'Speedometer error',
  'pg.calc.f.speedo.pre': 'True speed = gauge reading × (new OD / original OD)\n\nLarger new tyre → actual speed is higher than the gauge (easier to get a ticket)\nSmaller new tyre → actual speed is lower than the gauge',
  'pg.calc.f.et.title': 'ET and poke',
  'pg.calc.f.et.pre': 'Rim outer edge shift = (new width − old width)/2 × 25.4 − (new ET − old ET)\nRim inner edge shift = (new width − old width)/2 × 25.4 + (new ET − old ET)\n\nBackspace = width/2 × 25.4 + ET\nFrontspace = width/2 × 25.4 − ET',
  'pg.calc.f.bulge.title': 'Estimating sidewall position',
  'pg.calc.f.bulge.pre': 'Sidewall outer edge ≈ tyre width/2 − ET\nSidewall inner edge ≈ −(tyre width/2 + ET)\n\nThe tyre is roughly symmetric about the rim centreline, so the nominal section width is used. Real sidewalls sit a little narrower or wider depending on the carcass — measure to be sure.',
  'pg.calc.hardline': '<strong>Three hard limits:</strong> ① outer diameter deviation must stay within ±3%; ② tyre poke must not exceed 12 mm; ③ the load index must not fall below what the axle load requires. Break any one of them and it stops being a style question and becomes a safety question.',

  /* ---------------- Calculator output (wheel-calc.js) ---------------- */
  'pg.calc.out.incomplete': 'Please fill in both the OEM and the target setup',
  'pg.calc.out.summary': 'Verdict',
  'pg.calc.out.oemTyreDia': 'Tyre outer diameter',
  'pg.calc.out.diaDelta': 'OD change',
  'pg.calc.out.sidewall': 'Sidewall height',
  'pg.calc.out.rideHeight': 'Ride height change',
  'pg.calc.out.archFill': 'Arch fill (visual)',
  'pg.calc.out.circumference': 'Circumference',
  'pg.calc.out.revsPerKm': 'Revs per km',
  'pg.calc.out.speedo100': 'True speed at 100 km/h shown',
  'pg.calc.out.speedo120': 'True speed at 120 km/h shown',
  'pg.calc.out.rimVsOem': 'Rim vs OEM',
  'pg.calc.out.rimOuter': 'Outer edge shift',
  'pg.calc.out.rimInner': 'Inner edge shift',
  'pg.calc.out.tyreOuter': 'Tyre poke (est.)',
  'pg.calc.out.tyreInner': 'Tyre inner shift (est.)',
  'pg.calc.out.trackPerAxle': 'Track change per axle',
  'pg.calc.out.scrubRadius': 'Scrub radius change',
  'pg.calc.out.newBackFront': 'New rim backspace / frontspace',
  'pg.calc.out.oemBackFront': 'OEM rim backspace / frontspace',
  'pg.calc.out.loadCap': 'Load capacity per tyre',
  'pg.calc.out.loadReq': 'Required (axle load/2×1.1)',

  'pg.calc.val.diaPct': '{a} mm ({b}%)',
  'pg.calc.val.sidewall': '{oem} → {tgt} mm ({delta})',
  'pg.calc.val.revs': '{oem} → {tgt} ({delta})',

  'pg.calc.badge.pass': 'Pass',
  'pg.calc.badge.warn': 'Caution',
  'pg.calc.badge.risk': 'Risk',

  'pg.calc.gauge.pct': 'Speedometer error {pct}% (positive = gauge reads low, actual speed is higher)',

  'pg.calc.grade.ok': 'Fits',
  'pg.calc.grade.warn': 'Workable, mind the details',
  'pg.calc.grade.bad': 'High risk, not advisable',
  'pg.calc.grade.no': 'Do not fit',

  /* ---- item-by-item checks ---- */
  'pg.calc.issue.dia5': 'Outer diameter is off by {p}% — far beyond the ±5% safe limit. ABS/ESP and gearbox shift logic are all seriously affected, and the tyre may rub the arch.',
  'pg.calc.issue.dia3': 'Diameter deviation {p}% exceeds the general ±3% safety line; ESP/ABS warnings and obvious speedometer error are likely.',
  'pg.calc.issue.dia2': 'Diameter deviation {p}% sits in the marginal ±2–3% band — acceptable, but recalibrating the speedometer is advisable.',
  'pg.calc.issue.diaOk': 'Diameter deviation {p}%, inside the ideal ±2% band.',
  'pg.calc.issue.out20': 'Tyre poke {v} mm — the front wheel will almost certainly hit the wing/liner and the rear may catch the arch lip.',
  'pg.calc.issue.out12': 'Tyre poke {v} mm, close to the arch limit; it may rub when fully loaded or on full lock, and needs negative camber or rolled lips.',
  'pg.calc.issue.out6': 'Tyre poke {v} mm — the usual flush range; check clearance at full load and on full lock.',
  'pg.calc.issue.outOk': 'Outer shift {v} mm, within the safe range.',
  'pg.calc.issue.in25': 'Inner intrusion {v} mm — interference with the strut/liner is almost certain.',
  'pg.calc.issue.in15': 'Inner intrusion {v} mm — measure the clearance to the strut and liner (tighter still on big-brake AMG cars).',
  'pg.calc.issue.in8': 'Inner intrusion {v} mm — generally workable; check on full lock.',
  'pg.calc.issue.inOk': 'Inner clearance change {v} mm, no risk of interference.',
  'pg.calc.issue.track40': 'Track change per axle {v} mm — the scrub radius changes too much, steering self-centring and tyre wear degrade noticeably, and it may exceed the legal track-width limit.',
  'pg.calc.issue.track24': 'Track change {v} mm — steering feel and shoulder wear will change; a fresh four-wheel alignment is advisable.',
  'pg.calc.issue.stretch': 'The tyre is narrower than the rim — a stretch, with abnormal bead loading, a high risk of unseating and a non-compliant fitment.',
  'pg.calc.issue.wide': 'The tyre is too wide for the rim (ratio {r}): the sidewall bulges, turn-in suffers, and a wider rim is recommended.',
  'pg.calc.issue.ratioOk': 'Tyre/rim width ratio {r}, a sensible match (1.06–1.25 recommended).',
  'pg.calc.issue.loadLow': 'Load index insufficient: {have} kg per tyre < {need} kg required — a serious safety hazard.',
  'pg.calc.issue.loadTight': 'Load margin of only {m}% — tight when fully loaded or at speed; raise the load index.',
  'pg.calc.issue.loadOk': 'Load margin {m}%, meets the requirement.',
  'pg.calc.issue.speedLow': 'Speed rating {sr} ({kmh} km/h) is below the {need} km/h the car is capable of.',
  'pg.calc.issue.speedOk': 'Speed rating {sr} ({kmh} km/h) meets the requirement.',

  /* ---- size recommender ---- */
  'pg.calc.rec.errInput': 'Enter the OEM tyre size and the target rim diameter',
  'pg.calc.rec.errEmpty': 'No suitable size found within this tolerance — please widen it.',
  'pg.calc.rec.th.size': 'Tyre size',
  'pg.calc.rec.th.dia': 'OD mm',
  'pg.calc.rec.th.diff': 'vs OEM',
  'pg.calc.rec.th.pct': 'Deviation %',
  'pg.calc.rec.th.rim': 'Rim width',
  'pg.calc.rec.th.note': 'Note',
  'pg.calc.rec.badge.closest': 'Closest',
  'pg.calc.rec.badge.sameAspect': 'Same aspect',
  'pg.calc.rec.badge.thinner': 'Thinner sidewall',
  'pg.calc.rec.badge.thicker': 'Taller sidewall',

  /* ---- bolt length ---- */
  'pg.calc.bolt.errLen': 'Enter the OEM bolt thread length',
  'pg.calc.bolt.out.recommend': 'Recommended thread length',
  'pg.calc.bolt.out.range': 'Usable range',
  'pg.calc.bolt.out.minEngage': 'Min. engagement',
  'pg.calc.bolt.rangeFmt': '{min} – {max}',
  'pg.calc.bolt.note': 'M14×1.5 bolts need at least {min} mm of engagement (about 8 threads); 15 mm or more is advisable for track or hard driving.'
});
