/* ==========================================================================
   p-controls.en.js —— "Controls & Warning Lights" page-level English copy
   --------------------------------------------------------------------------
   Page-scoped dictionary for controls.html; keys mirror p-controls.zh.js.
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};
Object.assign(window.I18N_DATA.en = window.I18N_DATA.en || {}, {

  /* ---------------- Page head ---------------- */
  'pg.controls.docTitle': 'Lights, Buttons & Warning Lights · Mercedes-Benz C-Class Estate Database',
  'pg.controls.description': 'Where the side-marker and parking light switches are on the C-Class Estate (S203/S204/S205/S206), how to light up only one side, what every interior button does, and what each dashboard warning light means and what to do when it comes on.',

  /* ---------------- Hero ---------------- */
  'pg.controls.hero.eyebrow': 'Controls & Warning Lights',
  'pg.controls.hero.title': 'Lights, Buttons & <span class="accent">Warning Lights</span>',
  'pg.controls.hero.desc': 'Where the side-marker switch is, how to light up just one side with the parking light, what all those buttons in the cabin actually do, and whether the lamp that just lit up means stopping right now — this page answers all of it.',
  'pg.controls.hero.btnParking': 'How to use the parking light',
  'pg.controls.hero.btnWarnings': 'Warning light lookup',
  'pg.controls.hero.btnControls': 'Button functions',

  /* ---------------- 1. Parking / side-marker lights ---------------- */
  'pg.controls.pl.title': '1. Side-marker and parking lights<span class="tag">where &amp; how</span>',
  'pg.controls.pl.lead': 'These are the two most frequently asked "where is the light?" questions. Remember one sentence first: <strong>the side-marker light lights both sides, the parking light lights one side only</strong> — and what makes the parking light so useful is that it can light only the side facing the traffic.',

  /* ---------------- 2. Lamp locations ---------------- */
  'pg.controls.lamp.title': '2. Where each lamp sits on the body<span class="tag">physical location</span>',
  'pg.controls.lamp.lead': 'When the dash reports a "bulb failure", walk around the car with this table and you will find which lamp is out.',

  /* ---------------- 3. Light switch by generation ---------------- */
  'pg.controls.sw.title': '3. Light switch position and settings<span class="tag">four generations compared</span>',
  'pg.controls.sw.lead': 'The four generations differ noticeably in how the light switch is built. <strong>For the W203 / W204 the official manuals confirm a rotary knob on the left of the dashboard</strong>; the official online manuals for the W205 / W206 are JavaScript-rendered pages, so we could retrieve only the chapter headings, which means the exact form on those two generations <strong>is not verified, and we do not guess</strong> — judging by the chapter structure, the W205 may still keep a separate light switch, while the W206 more likely has integrated lighting control into the left-hand steering-column combination switch.',

  /* ---------------- 4. Lighting indicators ---------------- */
  'pg.controls.ind.title': '4. What these dashboard lights mean<span class="tag">lighting indicators</span>',
  'pg.controls.ind.lead': 'Green and blue are "function switched on" information, nothing to act on. Only the bulb-failure light is an amber warning.',
  'pg.controls.ind.note': '<strong>The icons are hand-drawn illustrations for this site.</strong> Details differ slightly between model years and markets, so treat the pictograms in your owner\'s manual as authoritative; the shapes here are enough to match the one that lit up on your cluster.',

  /* ---------------- 5. Interior buttons ---------------- */
  'pg.controls.cl.title': '5. Interior buttons at a glance<span class="tag">by area</span>',
  'pg.controls.cl.lead': 'Organised by "where you see it when you get into the car". Button counts vary with equipment, but the function layout is basically the same.',

  /* ---------------- 6. Warning lights ---------------- */
  'pg.controls.warn.title': '6. Dashboard warning lights, quick lookup<span class="tag">what to do</span>',
  'pg.controls.warn.lead': 'Colour sets the priority. First use colour to decide "can I keep driving", then look up the specific light.',
  'pg.controls.warn.filterTitle': 'Filter by colour or search',
  'pg.controls.warn.searchPlaceholder': 'Type a lamp name or symptom, e.g. tyre pressure, leak, shudder, no start',

  /* ---------------- 7. Procedure ---------------- */
  'pg.controls.proc.title': '7. A warning light is on — the general procedure<span class="tag">5 steps</span>',
  'pg.controls.proc.step1.title': 'Step 1: read the colour',
  'pg.controls.proc.step1.desc': 'Red = act immediately; amber = check soon, but you can usually keep driving; green/blue = information.',
  'pg.controls.proc.step2.title': 'Step 2: check for accompanying symptoms',
  'pg.controls.proc.step2.desc': 'If <strong>any one</strong> of loss of power, shuddering, unusual noises, smoke, a soft pedal, heavy steering or a climbing coolant temperature appears, treat the light as red whatever its colour and stop somewhere safe as soon as you can.',
  'pg.controls.proc.step3.title': 'Step 3: confirm what you can yourself',
  'pg.controls.proc.step3.item1': 'Is the fuel cap tightened properly? (it can trigger the engine light)',
  'pg.controls.proc.step3.item2': 'Is the parking brake fully released?',
  'pg.controls.proc.step3.item3': 'Are the windscreen camera area and the front bumper radar covered in mud or snow?',
  'pg.controls.proc.step3.item4': 'Does any of the four tyres look visibly low?',
  'pg.controls.proc.step3.item5': 'Are all doors and the tailgate fully shut?',
  'pg.controls.proc.step4.title': 'Step 4: read the codes, do not guess',
  'pg.controls.proc.step4.desc': 'One light on the dash can have a dozen causes. Have the fault codes read with a dedicated diagnostic tool at a workshop — <strong>locate first, then repair</strong>. Equally, do not let a garage "just clear the codes and see": clearing them throws the evidence away.',
  'pg.controls.proc.step5.title': 'Step 5: record it and keep evidence',
  'pg.controls.proc.step5.item1': 'Photograph the cluster message (icon and text together)',
  'pg.controls.proc.step5.item2': 'Note the conditions it appeared in: cold or warm engine, idle or accelerating, mileage',
  'pg.controls.proc.step5.item3': 'Keep the repair order and screenshots of the fault codes',
  'pg.controls.proc.note': '<strong>About "clearing the codes":</strong> some faults (a sporadic oxygen sensor, a loose fuel cap) really do not come back after clearing; but if the fault is real, clearing only puts the light out for a few hundred kilometres, after which it returns — and you may have lost valuable time.',
  'pg.controls.proc.tow.title': 'In these cases do not hesitate — call a tow truck',
  'pg.controls.proc.tow.th.symptom': 'Symptom',
  'pg.controls.proc.tow.th.why': 'Why you cannot drive on',
  'pg.controls.proc.tow.r1.symptom': '<strong>Oil pressure light + engine noise</strong>',
  'pg.controls.proc.tow.r1.why': 'A few more minutes of driving can score the bearing shells; the overhaul costs far more than a tow.',
  'pg.controls.proc.tow.r2.symptom': '<strong>Coolant temperature warning + white smoke</strong>',
  'pg.controls.proc.tow.r2.why': 'A warped cylinder head or blown head gasket can turn a few thousand into tens of thousands.',
  'pg.controls.proc.tow.r3.symptom': '<strong>Brake warning + soft pedal / longer travel</strong>',
  'pg.controls.proc.tow.r3.why': 'The brake system may be leaking; driving on directly endangers your life.',
  'pg.controls.proc.tow.r4.symptom': '<strong>Engine light flashing (not steady)</strong>',
  'pg.controls.proc.tow.r4.why': 'A misfire is happening right now; unburnt petrol will destroy the catalytic converter.',
  'pg.controls.proc.tow.r5.symptom': '<strong>Heavy steering + steering warning light</strong>',
  'pg.controls.proc.tow.r5.why': 'Once the assistance has failed, steering effort jumps and high-speed driving becomes extremely dangerous.',
  'pg.controls.proc.tow.r6.symptom': '<strong>A burning smell or visible smoke</strong>',
  'pg.controls.proc.tow.r6.why': 'Wiring or fluid may have caught fire — stop, switch off and get out of the car immediately.',

  /* ---------------- 8. Mercedes-specific systems ---------------- */
  'pg.controls.sp.title': '8. Two systems specific to Mercedes-Benz<span class="tag">do not mix up models</span>',
  'pg.controls.sp.lead': 'Online discussions of Mercedes brake and suspension faults often drag in E-Class and SL content. How these two systems stand on the C-Class needs to be spelled out.',

  /* ---------------- 9. Data notes ---------------- */
  'pg.controls.dn.title': '9. Notes on this page\'s data<span class="tag">check against your car</span>',
  'pg.controls.dn.p1': '<strong>On lights and buttons:</strong> the same generation differs between markets (EU / China / US), model years and equipment lines (Avantgarde / AMG Line / option packages), so light switch design and button layout do vary. What is shown here is the most common form for each generation — <strong>your owner\'s manual and the actual car take precedence</strong>.',
  'pg.controls.dn.p2': '<strong>On warning lights:</strong> the icon shapes are drawn after ISO standard symbols and manufacturer pictograms; the meanings and recommended actions are general conclusions. The same icon can differ slightly between brands and model years, and Mercedes often also shows a <strong>text message</strong> — when text appears on the cluster, follow the text.',
  'pg.controls.dn.p3': '<strong>On prices:</strong> reference repair prices vary enormously by region and channel; entries for which this site found no reliable source are left <strong>blank</strong> rather than filled with estimates.',

  /* ---------------- JS: colour badges ---------------- */
  'pg.controls.color.red': 'Red',
  'pg.controls.color.amber': 'Amber',
  'pg.controls.color.green': 'Green',
  'pg.controls.color.blue': 'Blue',
  'pg.controls.color.gray': 'Other',

  /* ---------------- JS: light switch ---------------- */
  'pg.controls.sw.location': 'Location: ',
  'pg.controls.sw.th.pos': 'Position',
  'pg.controls.sw.th.meaning': 'Meaning',
  'pg.controls.sw.empty': 'We could not obtain a reliable source for this generation\'s switch design and positions, so it is left blank rather than guessed.',
  'pg.controls.sw.highBeam': 'High beam: ',
  'pg.controls.sw.fog': 'Fog lights: ',
  'pg.controls.sw.drl': 'Daytime running lights: ',

  /* ---------------- JS: parking light ---------------- */
  'pg.controls.pl.what': 'What the parking light is',
  'pg.controls.pl.diff': 'Difference from the side-marker light: ',
  'pg.controls.pl.correction': 'Correcting a widespread claim: ',
  'pg.controls.pl.when': 'When to use it: ',
  'pg.controls.pl.steps': 'How to light one side only (procedure)',

  /* ---------------- JS: lamp locations ---------------- */
  'pg.controls.lamp.th.name': 'Lamp',
  'pg.controls.lamp.th.where': 'Where it sits on the body',

  /* ---------------- JS: indicators ---------------- */
  'pg.controls.ind.when': 'Lights up when: ',

  /* ---------------- JS: colour grading ---------------- */
  'pg.controls.cr.meaning': 'Meaning: ',
  'pg.controls.cr.action': 'What to do: ',

  /* ---------------- JS: warning grid ---------------- */
  'pg.controls.warn.count.match': 'Matching {shown} / {total} warning lights',
  'pg.controls.warn.count.total': '{total} warning lights in total',
  'pg.controls.warn.empty': 'No matching entries. Try other wording, or tap "All" above.',
  'pg.controls.warn.causes': 'Possible causes',
  'pg.controls.warn.actions': 'What to do',
  'pg.controls.warn.cost': 'Reference repair cost',
  'pg.controls.warn.costRange': '{min} – {max} CNY',
  'pg.controls.warn.note': 'Note: ',
  'pg.controls.warn.chip.all': 'All',
  'pg.controls.warn.chip.red': 'Red · act now',
  'pg.controls.warn.chip.amber': 'Amber · check soon',
  'pg.controls.warn.chip.green': 'Green · information',
  'pg.controls.warn.chip.blue': 'Blue · notice',

  /* ---------------- JS: Mercedes-specific systems ---------------- */
  'pg.controls.sys.models': 'Models: ',
  'pg.controls.sys.symptom': 'Symptom: ',
  'pg.controls.sys.action': 'What to do: '
});
