/* ==========================================================================
   p-controls.zh.js —— 「操作与仪表」页面级中文文案
   --------------------------------------------------------------------------
   只存放 controls.html 及其渲染脚本用到的文案，键统一 pg.controls.* 前缀。
   值同时是 controls.html 里的原始兜底文案，两者保持一致。
   ========================================================================== */
window.I18N_DATA = window.I18N_DATA || {};
Object.assign(window.I18N_DATA.zh = window.I18N_DATA.zh || {}, {

  /* ---------------- 页面头 ---------------- */
  'pg.controls.docTitle': '灯光、按键与仪表故障灯 · 奔驰 C 级旅行车数据库',
  'pg.controls.description': '奔驰 C 级旅行车（S203/S204/S205/S206）示宽灯与驻车灯开关在哪、单侧驻车灯怎么点亮、车内各按键功能、仪表故障灯含义与亮灯后的处理方法。',

  /* ---------------- Hero ---------------- */
  'pg.controls.hero.eyebrow': 'Controls & Warning Lights',
  'pg.controls.hero.title': '灯光、按键与<span class="accent">仪表故障灯</span>',
  'pg.controls.hero.desc': '示宽灯的开关在哪、单侧驻车灯怎么只点亮一边、车里那么多按键分别干什么、仪表上突然亮起的那个灯要不要马上停车——这一页集中回答。',
  'pg.controls.hero.btnParking': '驻车灯怎么开',
  'pg.controls.hero.btnWarnings': '故障灯速查',
  'pg.controls.hero.btnControls': '按键功能',

  /* ---------------- 一、示宽灯与驻车灯 ---------------- */
  'pg.controls.pl.title': '一、示宽灯与驻车灯<span class="tag">在哪、怎么开</span>',
  'pg.controls.pl.lead': '这两个是最容易被问到的「灯在哪」问题。先记住一句话：<strong>示宽灯是两侧一起亮的小灯，驻车灯是只亮一侧的小灯</strong>——而驻车灯最实用的地方，正是它可以只点亮靠车道的那一边。',

  /* ---------------- 二、灯具位置 ---------------- */
  'pg.controls.lamp.title': '二、这些灯分别装在车身哪里<span class="tag">物理位置</span>',
  'pg.controls.lamp.lead': '仪表报「灯泡故障」时，照着这张表绕车一圈就能找到是哪个灯不亮。',

  /* ---------------- 三、灯光开关各代差异 ---------------- */
  'pg.controls.sw.title': '三、灯光开关的位置与档位<span class="tag">四代对比</span>',
  'pg.controls.sw.lead': '四代车型在灯光开关的形式上有明显差异。<strong>W203 / W204 已由官方手册核实为仪表台左侧的旋转旋钮</strong>；W205 / W206 的官方在线手册是 JS 渲染页面，我们只能取到章节标题，因此这两代的具体形式<strong>没有核实，也不做猜测</strong>——从章节结构看，W205 可能仍保留独立的灯光开关，而 W206 更可能已经把灯光控制整合进方向盘左侧的组合开关。',

  /* ---------------- 四、灯光指示灯 ---------------- */
  'pg.controls.ind.title': '四、仪表上这些灯是什么意思<span class="tag">灯光指示</span>',
  'pg.controls.ind.lead': '绿色和蓝色都是「功能已开启」的信息提示，不需要处理。只有灯泡故障灯是黄色警告。',
  'pg.controls.ind.note': '<strong>图标为本站手绘示意。</strong>不同年款与市场的图标细节会略有差别，以随车说明书的图例为准；这里的形状足以让你对上仪表上亮起的那一个。',

  /* ---------------- 五、车内按键 ---------------- */
  'pg.controls.cl.title': '五、车内按键功能一览<span class="tag">按区域</span>',
  'pg.controls.cl.lead': '按「你一坐进车里会看到的位置」分区整理。配置不同按键数量会有差异，但功能分配基本一致。',

  /* ---------------- 六、故障灯速查 ---------------- */
  'pg.controls.warn.title': '六、仪表故障灯速查<span class="tag">亮了怎么办</span>',
  'pg.controls.warn.lead': '颜色决定处置优先级。先用颜色判断「能不能继续开」，再看具体是哪个灯。',
  'pg.controls.warn.filterTitle': '按颜色筛选或直接搜',
  'pg.controls.warn.searchPlaceholder': '输入灯名或症状，例如：胎压、漏水、抖动、无法启动',

  /* ---------------- 七、处理流程 ---------------- */
  'pg.controls.proc.title': '七、故障灯亮了，通用处理流程<span class="tag">5 步</span>',
  'pg.controls.proc.step1.title': '第 1 步：看颜色',
  'pg.controls.proc.step1.desc': '红色 = 立即处理；黄色 = 尽快检查但通常能开；绿色/蓝色 = 信息提示。',
  'pg.controls.proc.step2.title': '第 2 步：看有没有伴随症状',
  'pg.controls.proc.step2.desc': '同时出现<strong>动力下降、抖动、异响、冒烟、踏板变软、方向变沉、水温飙升</strong>中任意一项，不管灯是什么颜色，都按红色对待，就近安全停车。',
  'pg.controls.proc.step3.title': '第 3 步：能自己确认的先确认',
  'pg.controls.proc.step3.item1': '油箱盖是否拧紧（会触发发动机故障灯）',
  'pg.controls.proc.step3.item2': '手刹是否完全释放',
  'pg.controls.proc.step3.item3': '前风挡摄像头区域、前保险杠雷达是否被泥雪遮挡',
  'pg.controls.proc.step3.item4': '四个轮胎外观是否明显缺气',
  'pg.controls.proc.step3.item5': '所有车门与尾门是否关严',
  'pg.controls.proc.step4.title': '第 4 步：读码，不要猜',
  'pg.controls.proc.step4.desc': '仪表上一个灯可能对应十几种原因。到店用专用诊断仪读故障码，<strong>先定位再动手</strong>。反过来，也不要让修理厂「先清码看看」——清掉码等于把线索丢了。',
  'pg.controls.proc.step5.title': '第 5 步：记录并留证',
  'pg.controls.proc.step5.item1': '用手机拍下仪表提示（图标 + 文字一起拍）',
  'pg.controls.proc.step5.item2': '记下出现时的工况：冷车/热车、怠速/加速、多少公里',
  'pg.controls.proc.step5.item3': '保存维修工单与故障码截图',
  'pg.controls.proc.note': '<strong>关于「消码」：</strong>有些故障（如氧传感器偶发、油箱盖未紧）清码后确实不再出现；但如果是真实故障，清码只是让灯暂时熄灭，几百公里后会再次点亮，而且可能耽误处理时机。',
  'pg.controls.proc.tow.title': '这些情况别犹豫，直接叫拖车',
  'pg.controls.proc.tow.th.symptom': '现象',
  'pg.controls.proc.tow.th.why': '为什么不能开',
  'pg.controls.proc.tow.r1.symptom': '<strong>机油压力灯 + 发动机异响</strong>',
  'pg.controls.proc.tow.r1.why': '继续行驶几分钟就可能拉伤轴瓦，大修代价远高于拖车费',
  'pg.controls.proc.tow.r2.symptom': '<strong>水温警告 + 冒白烟</strong>',
  'pg.controls.proc.tow.r2.why': '缸盖变形、冲缸垫，可能从几千元变成几万元',
  'pg.controls.proc.tow.r3.symptom': '<strong>制动警告 + 踏板变软/行程变长</strong>',
  'pg.controls.proc.tow.r3.why': '制动系统可能正在泄漏，继续行驶直接危及生命',
  'pg.controls.proc.tow.r4.symptom': '<strong>发动机故障灯闪烁（不是常亮）</strong>',
  'pg.controls.proc.tow.r4.why': '正在发生失火，未燃烧的汽油会烧毁三元催化',
  'pg.controls.proc.tow.r5.symptom': '<strong>转向沉重 + 转向警告灯</strong>',
  'pg.controls.proc.tow.r5.why': '助力失效后转向力急剧增大，高速行驶极其危险',
  'pg.controls.proc.tow.r6.symptom': '<strong>闻到焦糊味或看到冒烟</strong>',
  'pg.controls.proc.tow.r6.why': '可能是线束或油液泄漏引燃，立即停车熄火离开车辆',

  /* ---------------- 八、奔驰特有系统 ---------------- */
  'pg.controls.sp.title': '八、奔驰特有的两个系统<span class="tag">别对错车</span>',
  'pg.controls.sp.lead': '网上讨论奔驰制动与悬挂故障时，经常混进 E 级、SL 的内容。这两个系统在 C 级上的情况需要说清楚。',

  /* ---------------- 九、数据说明 ---------------- */
  'pg.controls.dn.title': '九、这一页的数据说明<span class="tag">请对照实车</span>',
  'pg.controls.dn.p1': '<strong>关于灯光与按键：</strong>同一代车型在不同市场（欧规 / 中规 / 美规）、不同年款、不同配置（Avantgarde / AMG Line / 选装包）下，灯光开关形式与按键布局会有差异。本页给出的是各代最常见的形态，<strong>具体以你的随车说明书与实车为准</strong>。',
  'pg.controls.dn.p2': '<strong>关于故障灯：</strong>图标形状参照 ISO 标准符号与厂商图例绘制，含义与处置建议为通用结论。同一图标在不同品牌、不同年款上可能有细微差别，奔驰也常同时给出<strong>文字提示</strong>——仪表上出现文字时，以文字提示为准。',
  'pg.controls.dn.p3': '<strong>关于价格：</strong>维修参考价随地区与渠道差异极大，本站没有取得可靠来源的条目一律<strong>留空</strong>，不填估算值。',

  /* ---------------- JS 渲染：颜色徽标 ---------------- */
  'pg.controls.color.red': '红色',
  'pg.controls.color.amber': '黄色',
  'pg.controls.color.green': '绿色',
  'pg.controls.color.blue': '蓝色',
  'pg.controls.color.gray': '其他',

  /* ---------------- JS 渲染：灯光开关 ---------------- */
  'pg.controls.sw.location': '位置：',
  'pg.controls.sw.th.pos': '档位',
  'pg.controls.sw.th.meaning': '含义',
  'pg.controls.sw.empty': '这一代的开关形式与档位我们没有拿到可靠来源，因此留空而不猜测。',
  'pg.controls.sw.highBeam': '远近光：',
  'pg.controls.sw.fog': '雾灯：',
  'pg.controls.sw.drl': '日行灯：',

  /* ---------------- JS 渲染：驻车灯 ---------------- */
  'pg.controls.pl.what': '驻车灯是什么',
  'pg.controls.pl.diff': '与示宽灯的区别：',
  'pg.controls.pl.correction': '更正一个流传说法：',
  'pg.controls.pl.when': '什么时候用：',
  'pg.controls.pl.steps': '怎么只点亮一侧（操作步骤）',

  /* ---------------- JS 渲染：灯具位置 ---------------- */
  'pg.controls.lamp.th.name': '灯具',
  'pg.controls.lamp.th.where': '装在车身什么位置',

  /* ---------------- JS 渲染：指示灯 ---------------- */
  'pg.controls.ind.when': '何时点亮：',

  /* ---------------- JS 渲染：颜色分级 ---------------- */
  'pg.controls.cr.meaning': '含义：',
  'pg.controls.cr.action': '该怎么做：',

  /* ---------------- JS 渲染：故障灯网格 ---------------- */
  'pg.controls.warn.count.match': '匹配 {shown} / {total} 个警告灯',
  'pg.controls.warn.count.total': '共 {total} 个警告灯',
  'pg.controls.warn.empty': '没有匹配的条目。可以换个说法，或点上面的「全部」。',
  'pg.controls.warn.causes': '可能原因',
  'pg.controls.warn.actions': '怎么处理',
  'pg.controls.warn.cost': '维修参考价',
  'pg.controls.warn.costRange': '{min} – {max} 元',
  'pg.controls.warn.note': '补充：',
  'pg.controls.warn.chip.all': '全部',
  'pg.controls.warn.chip.red': '红色 · 立即处理',
  'pg.controls.warn.chip.amber': '黄色 · 尽快检修',
  'pg.controls.warn.chip.green': '绿色 · 信息提示',
  'pg.controls.warn.chip.blue': '蓝色 · 提示',

  /* ---------------- JS 渲染：奔驰特有系统 ---------------- */
  'pg.controls.sys.models': '适用车型：',
  'pg.controls.sys.symptom': '症状：',
  'pg.controls.sys.action': '怎么处理：'
});
