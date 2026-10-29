/* ==========================================================================
   c-class-data.js —— 奔驰 C 级旅行车数据库（S203 / S204 / S205 / S206）
   --------------------------------------------------------------------------
   数据来源：奔驰公开技术资料、原厂技术附件目录、轮毂厂商标称参数、
             车主社区实测反馈。整理日期见 DATA_VERSION。
   注意：不同市场（欧规/中规/美规）与年款配置存在差异，尺寸为代表性数值。
        价格均为参考区间，不作为报价依据。
   ========================================================================== */
window.DATA_VERSION = 'v1.0 · 2025';

window.CDATA = {

  /* ======================================================================
     一、四代车型
     ====================================================================== */
  generations: [
    /* ---------------------------------------------------- S203 / W203 --- */
    {
      chassis: 'W203/S203',
      generation: '第二代 C 级旅行车',
      years: '2001–2007',
      intro: 'C 级旅行版的开端。S203 于 2001 年推出，用上了当年的 5G-TRONIC 与后多连杆悬挂，' +
        '整备质量比同期三厢版高约 50 kg。2004 年中期改款（Mopf）换了前脸、内饰与部分发动机，' +
        '并明显改善了防锈工艺，是选车时优先考虑的年款。尺寸数据取自各型号技术表与 W203 原厂维修手册' +
        '（表中为改款前数值；2004 改款后为 4626 × 1744 × 1470 mm，轴距不变）。',
      highlight: 'W203 是唯一使用 <strong>M12×1.5</strong> 螺栓的一代，买二手轮毂务必确认孔位规格——' +
        'W204 起的 M14 螺栓装不进来，反过来也插不进 W203 的孔。' +
        '另外这一代的原厂 ET 只有 <strong>31 / 37 / 44</strong> 三档（网上流传的「ET36」查不到任何来源），' +
        '且轮距是四代中最窄的（前 1505 mm），所以 W203 的轮毂装到后续几代会明显外凸。' +
        '最大的两个坑是 M271 正时链轮与 M272 平衡轴链轮，购车前务必查有没有做过。',
      body: {
        length_mm: 4541,
        width_mm: 1728,
        height_mm: 1465,
        wheelbase_mm: 2715,
        track_front_mm: 1505,
        track_rear_mm: 1476,
        ground_clearance_mm: null,
        turning_circle_m: 10.76,
        kerb_weight_kg: [1430, 1630],
        gross_weight_kg: 2230,
        boot_litres: [470, 1384],
        fuel_tank_l: 62,
        cd: null
      },
      wheels: {
        pcd: '5x112',
        center_bore_mm: 66.6,
        bolt_thread: 'M12x1.5',
        bolt_seat: '球面 R14（球座）',
        et_range: [31, 44],
        notes: 'W203 原厂手册实际给出的 ET 只有 31 / 37 / 44 三档——网上流传的「7.5Jx17 ET36」' +
          '在任何来源中都查不到，本站不采用。螺栓 M12×1.5 球面座，扭矩 110 N·m，' +
          '必须使用带奔驰三叉星标记的螺栓且不可涂油。原厂不配轮距垫片。' +
          '改装时若 ET 比原厂小 8～10 mm 以上（例如从 ET37 换到 ET30 且宽度上到 8J），' +
          '前轮容易蹭内衬与轮拱；旅行版后轴载荷更高，后轮更容易刮到内衬。',
        oem: [
          { size: '7Jx16', et: 37, tyre: '205/55R16', models: 'C240 / C320 / C270 CDI；2004 改款后多数型号', note: '最常见的主力原厂配置' },
          { size: '6Jx15', et: 31, tyre: '195/65R15', models: 'C180 / C180K / C200K / C220 CDI（2001–2004）', note: '入门配置' },
          { size: '6.5Jx15', et: 37, tyre: '195/65R15', models: 'C180 / C200 部分配置', note: '官方手册列为轻合金轮圈' },
          { size: '7.5Jx17', et: 37, tyre: '225/45R17', models: 'C320 CDI V6 / C350；AMG 特别装备前轴', note: '' },
          { size: '8Jx17', et: 30, tyre: '245/40R17', models: 'AMG 特别装备后轴', note: 'AMG 专属，普通版后轮拱空间不足' },
          { size: '8Jx18', et: 44, tyre: '225/40R18', models: '官方手册列出的 18 寸规格', note: 'AMG 特别装备' },
          { size: '4.5Bx15', et: 12, tyre: '165/70R16', models: '钢制备胎轮圈（C280 / C320 / C400 CDI 折叠备胎）', note: '应急使用，不可当正常轮组' }
        ]
      },
      tyres: [
        { size: '195/65R15', load_speed: '91H / 91V', note: '原厂标准夏季胎；冬季 M+S 为 91T' },
        { size: '205/55R16', load_speed: '91H / 91V / 91W', note: '主力配置；C320 V6 为 91W' },
        { size: '225/50R16', load_speed: '92V', note: '官方手册列出的可选规格' },
        { size: '225/45R17', load_speed: '91W', note: 'C320 CDI V6 / C350 原厂；AMG 特别装备前轴' },
        { size: '245/40R17', load_speed: '91W', note: 'AMG 特别装备后轴' },
        { size: '225/40R18', load_speed: null, note: 'AMG C55 V8 前轴' },
        { size: '165/70R16', load_speed: '92P', note: '轻量折叠备胎（8PR，应急使用）' }
      ],
      engines: [
        { code: 'M111.951', name: 'C180', displacement: '2.0L', power_kw: 95, torque_nm: 190, years: '2001–2002', note: '注意排量是 2.0L 而非 1.8L；自然吸气，机械可靠但动力偏弱。' },
        { code: 'M111.955', name: 'C200 Kompressor', displacement: '2.0L', power_kw: 120, torque_nm: 230, years: '2001–2002', note: '机械增压' },
        { code: 'M271.946', name: 'C180 Kompressor', displacement: '1.8L', power_kw: 105, torque_nm: 220, years: '2002–2007', note: '正时链轮与链条是已知薄弱点，购车前必查' },
        { code: 'M271.940', name: 'C200 Kompressor', displacement: '1.8L', power_kw: 120, torque_nm: 240, years: '2002–2007', note: '' },
        { code: 'M271.942', name: 'C200 CGI', displacement: '1.8L', power_kw: 125, torque_nm: 250, years: '2003–2007', note: '缸内直喷版本' },
        { code: 'M271.948', name: 'C230 Kompressor', displacement: '1.8L', power_kw: 141, torque_nm: 260, years: '2004–2007', note: '' },
        { code: 'M112.912', name: 'C240 V6', displacement: '2.6L', power_kw: 125, torque_nm: 240, years: '2001–2007', note: '另有 4MATIC 版本（M112.916）' },
        { code: 'M272.920', name: 'C230 V6', displacement: '2.5L', power_kw: 150, torque_nm: 245, years: '2005–2007', note: '平衡轴链轮缺陷批次，需按发动机号核对' },
        { code: 'M272.940', name: 'C280 V6', displacement: '3.0L', power_kw: 170, torque_nm: 300, years: '2005–2007', note: '同上，另有 4MATIC 版本' },
        { code: 'M112.946', name: 'C320 V6', displacement: '3.2L', power_kw: 160, torque_nm: 308, years: '2001–2007', note: '另有 4MATIC 版本' },
        { code: 'M272.960', name: 'C350 V6', displacement: '3.5L', power_kw: 200, torque_nm: 350, years: '2005–2007', note: '' },
        { code: 'M112.961', name: 'AMG C32', displacement: '3.2L V6 机械增压', power_kw: 260, torque_nm: 450, years: '2001–2004', note: '旅行版稀少' },
        { code: 'M113.988', name: 'AMG C55', displacement: '5.4L V8', power_kw: 270, torque_nm: 510, years: '2004–2007', note: '旅行版产量极少' },
        { code: 'OM611.962', name: 'C200 CDI / C220 CDI', displacement: '2.1L 柴油', power_kw: 85, torque_nm: 250, years: '2001–2003', note: '欧洲市场为主；同期 C220 CDI 为 105 kW / 315 N·m' },
        { code: 'OM646.962', name: 'C200 CDI', displacement: '2.1L 柴油', power_kw: 90, torque_nm: 270, years: '2003–2007', note: '' },
        { code: 'OM646.963', name: 'C220 CDI', displacement: '2.1L 柴油', power_kw: 110, torque_nm: 340, years: '2004–2007', note: '' },
        { code: 'OM612.962', name: 'C270 CDI', displacement: '2.7L 柴油', power_kw: 125, torque_nm: 400, years: '2001–2007', note: '' },
        { code: 'OM642.910', name: 'C320 CDI V6', displacement: '3.0L 柴油', power_kw: 165, torque_nm: 510, years: '2005–2007', note: '' }
      ],
      issues: [
        { title: 'M271 正时链轮与链条磨损（最典型通病）', symptom: '冷启动最初 3–5 秒发动机前部发出哗啦或嗒嗒的金属敲击声，热车后消失；故障灯亮，报 P0011 / P0016 / P0340 等凸轮轴相位故障码（常被误判为凸轮轴传感器）；怠速偶发抖动，严重时冷车启动剧烈抖动十几秒', cause: 'M271 单排滚子链条长期使用后链板孔与铰销磨损导致链条拉长，链轮齿面同步磨损，张紧器行程到底失去张紧力，凸轮轴相位偏离目标值。未使用 MB 229.5 认证机油会加剧磨损' , fix: '必须同步更换链轮、正时链条、张紧器与导轨整套，使用原厂改进型部件；用 XENTRY 读取凸轮轴实际与目标相位差，需回到 ±2° 以内。严禁只换链轮不换链条与张紧器', cost_cny: [4000, 8000] },
        { title: 'M272 V6 平衡轴链轮早期磨损', symptom: '故障灯亮，报 P0016 / P0017（曲轴与凸轮轴不同步），怠速不稳、失火，最严重时金属屑进入机油并导致发动机报废或行驶中熄火', cause: '2004–2007 年生产的 M272（C230 V6 / C280 / C350）平衡轴链轮材质过软，齿面提前磨损；据美方集体诉讼，发动机号在 2729..30 468993 之前的机器基本都在范围内', fix: '先读取发动机号比对是否落在缺陷批次；确认后需拆解更换平衡轴链轮与正时链条，并检查机油内是否有金属屑', cost_cny: [30000, 45000] },
        { title: '722.6 变速箱电子控制板与电子插头漏油', symptom: '换挡顿挫、冲击、闯挡，进入故障保护模式（锁在 2 挡或 3 挡），部分挡位缺失；变速箱电子插头处渗油并沿线束向上爬油，报 P0715 / P0720 / P0730 及电磁阀类故障码', cause: '722.6 内部电子控制板焊点开裂导致电磁阀控制异常；电子插头密封圈老化，变速箱油经插头渗入线束造成短路', fix: '更换电子控制板（A1402700861 / A1402701161）或仅更换电子插头（A2035400253），同时更换变速箱油与滤芯', cost_cny: [2500, 6000] },
        { title: '车身锈蚀（W203 的知名软肋，旅行版尾门尤其明显）', symptom: '后翼子板前缘（轮拱处）由内向外起泡生锈、车门下沿与门槛边锈穿孔、尾门牌照灯与饰条周围及玻璃窗框锈蚀；底盘与弹簧座锈蚀，最老车款可锈至报废级', cause: '2000–2004 年出厂的 W203 防锈工艺与防腐涂层不足，2004 年改款后明显改善；融雪盐与潮湿环境加速', fix: '轻度锈斑打磨除锈后做防腐与喷漆；已穿孔需切割补焊门槛或轮拱并整片喷漆；建议每年检查底盘并及时做防锈处理', cost_cny: [4000, 13000] },
        { title: 'S203 旅行版尾门线束断裂', symptom: '尾门与行李厢照明灯不亮或时亮时灭，牌照灯、后雨刮、后窗加热、尾门中控锁或高位刹车灯间歇失效，仪表报尾灯故障；尾门自行开启或无法锁止', cause: '尾门与车身之间的线束随尾门开合反复弯折，在橡胶波纹管内绝缘层与铜丝疲劳断裂，属旅行车特有的结构性问题', fix: '剥开尾门铰链处波纹管查找断点，逐根焊接加长并做热缩绝缘，或更换整段尾门线束；修复后用诊断仪清码', cost_cny: [500, 2000] },
        { title: '车门锁气动泵（PSE）与门锁执行器', symptom: '个别车门无法上锁或解锁，锁门时听不到气动声或声音微弱，中央锁动作迟缓，行李厢锁失灵，遥控反应异常', cause: 'W203 中央锁采用气动助力，PSE 泵膜片老化、管路漏气或门锁气动执行器失效', fix: '先做管路保压查漏，更换损坏的气动执行器或 PSE 泵；同时检查门控模块 SAM 与线束接头氧化', cost_cny: [800, 3500] },
        { title: '天窗滑轨卡滞与漏水', symptom: '天窗开关动作迟缓、异响、卡在中途或完全不动，严重时关闭不严导致车内漏水、顶棚受潮', cause: '滑轨与滑块缺润滑、积尘结垢，排水管堵塞，滑块塑料件磨损', fix: '官方保养要求每 3 年清洁导轨与滑块并润滑导向件；磨损滑块需更换，同时疏通排水管', cost_cny: [300, 2500] },
        { title: '前多连杆悬挂球头与衬套磨损', symptom: '过减速带或烂路时前部咯噔异响，转向虚位变大，高速发飘，轮胎偏磨', cause: 'W203 前悬挂为多连杆结构，控制臂衬套、球头、稳定杆连接杆数量多，通常 12–15 万公里开始出现；弹簧断裂（ADAC 点名的通病）与刹车软管老化也多见', fix: '上举升机逐件检查球头与衬套旷量，按需更换控制臂总成、衬套、球头与稳定杆连杆，之后做四轮定位', cost_cny: [3500, 9000] },
        { title: '刹车油管锈蚀', symptom: '年检或举升检查发现刹车硬管锈蚀起皮，严重时渗漏导致制动液位下降、制动踏板变软', cause: '底盘刹车硬管与接头长期受融雪盐与湿气侵蚀；W203 与 W204 均为高发项（英国 MOT 数据中的高频不合格项）', fix: '更换锈蚀的刹车硬管（建议整段更换并做防腐），同步更换制动液', cost_cny: [500, 2500] },
        { title: '电子模块 SAM 进水氧化与线束老化', symptom: '大灯、雨刮、车窗升降、中央锁等单个或多个用电设备随机失效，仪表报各种故障，偶发无法启动；报 U 开头通讯类或 B 开头车身电子类故障码', cause: 'W203 电子架构复杂，前 SAM 与后 SAM 模块随车龄与湿气导致插脚氧化，门线束与机舱线束磨损', fix: '用奔驰专用诊断仪读全车模块故障码，逐路排查供电与搭铁，清洁或更换 SAM 模块（前 SAM 例 A2035450201），修复受损线束', cost_cny: [1500, 6500] },
        { title: '转向机渗漏与助力泵损坏', symptom: '底盘下方有助力油渗漏痕迹，转向变沉，转向时咯噔异响，方向盘旷量变大', cause: 'W203 转向机（A2034600600）密封件老化渗油，助力油缺失后助力泵（A0024668601）干磨损坏，通常 18–25 万公里出现', fix: '更换转向机修理包或更换翻新/拆车转向机，必要时同时更换助力泵与油管，补充 MB 236.3 规格助力油', cost_cny: [3500, 8000] },
        { title: '冷却系统渗漏（塑料件脆化）', symptom: '膨胀壶液位下降、地面有防冻液痕迹，水温偏高，暖风偏弱，水泵或节温器处渗漏，严重时冲缸垫冒白烟', cause: '散热器、节温器壳体、膨胀壶等塑料件老化开裂，水泵轴封与水管老化，15–20 万公里后集中出现', fix: '更换散热器（A2035000503）、节温器（A1112000015）、水泵（A1112000401）与老化水管，按 MB 325.0 / Q1 03 0002 规格补充冷却液', cost_cny: [1700, 7000] }
      ]
    },

    /* ---------------------------------------------------- S204 / W204 --- */
    {
      chassis: 'W204/S204',
      generation: '第三代 C 级旅行车',
      years: '2007–2014',
      intro: '销量最大、保有量最高的一代。轴距增加到 2760 mm，轮距显著加宽，' +
        '底盘质感与安全性比 W203 有质变。2011 年中期改款换了内饰与发动机阵容，' +
        '也是这一代开始出现 C63 AMG 的 6.2L V8 旅行版。' +
        '发动机与轮组数据多取自奔驰官方档案站（mercedes-benz-publicarchive.com）的车型页。',
      highlight: '这一代最大的变化是螺栓从 M12 升级到 <strong>M14×1.5</strong>，且原厂 ET 从 30 段跳到 <strong>39–58</strong> 段。' +
        '所以 W204 的轮毂装不上 W203（螺栓不对，而且会内缩），W203 的轮毂装到 W204 上则会外凸 12 mm 以上。' +
        '另外 C63 AMG 的高性能版本（Edition 507）原厂就用 <strong>19 寸前 235/35R19 + 后 255/30R19</strong>，' +
        '说明这一代的轮拱在 AMG 上是能吃到 19 寸的，普通版则要保守得多。',
      body: {
        length_mm: 4596,
        width_mm: 1770,
        height_mm: 1459,
        wheelbase_mm: 2760,
        track_front_mm: 1541,
        track_rear_mm: 1544,
        ground_clearance_mm: 133,
        turning_circle_m: 10.8,
        kerb_weight_kg: [1470, 1720],
        gross_weight_kg: 2105,
        boot_litres: [485, 1500],
        fuel_tank_l: 66,
        cd: null
      },
      wheels: {
        pcd: '5x112',
        center_bore_mm: 66.6,
        bolt_thread: 'M14x1.5（螺纹长 27 mm、总长 48.5～49 mm，SW17）',
        bolt_seat: '球面 R14（Kugelbund D28，10.9 级）',
        et_range: [39, 58],
        notes: '原厂 ET 覆盖 39（6J×16）到 58（8.5J×17 / 8.5J×18 后轴），原厂组合直上无需垫片。' +
          '改装实测：可直上区间约 ET40–54，前轴最大 8.5J、后轴最大 9.5J；' +
          'ET 小于约 35（配 245 以上胎、降悬挂、满载）开始蹭轮眉或内衬，ET 大于约 50–52 则有碰减振器与内衬的风险。' +
          '加垫片超过 5 mm 必须换加长螺栓（原厂 A0009908307 M14×45，加长 A0009901807 M14×65）。' +
          '卡钳避让取决于轮辐背面形状与 ET：原厂 AMG 17 寸 ET47 无法避让 CLS 350 的四活塞卡钳，' +
          '需 15 mm 垫片把等效 ET 降到 32。',
        oem: [
          { size: '7Jx16', et: 43, tyre: '205/55R16', models: 'S204 全系基础配置（C180/C200/C250/C350 CDI 等）', note: '原厂零件号 A2044011102；最常见的原厂配置' },
          { size: '6Jx16', et: 39, tyre: '195/60R16', models: 'W204 入门配置', note: '原厂零件号 A2044011002' },
          { size: '7.5Jx16', et: 53, tyre: '225/50R16', models: 'W204 / S204 选装', note: '' },
          { size: '7.5Jx17', et: 47, tyre: '225/45R17', models: 'C350 / C320 CDI / C350 CDI 等中高配', note: '原厂零件号 A2044011000；最主流的主力配置' },
          { size: '8.5Jx17', et: 58, tyre: '245/40R17', models: 'W204 后轴前后配', note: '' },
          { size: '7.5Jx18', et: 47, tyre: '225/40R18', models: 'W204 / S204 18 寸', note: '' },
          { size: '8Jx18', et: 50, tyre: '225/40R18', models: 'AMG 双五辐（前轴）', note: '原厂零件号 A2044014102' },
          { size: '8.5Jx18', et: 54, tyre: '255/35R18', models: 'AMG / C63 AMG 后轴', note: '原厂零件号 A2044014202 / A2044015402 / A2044019902' },
          { size: '8.5Jx18', et: 58, tyre: '245/35R18', models: 'W204 后轴前后配', note: '' },
          { size: '8Jx18', et: 45, tyre: '235/40R18', models: 'C63 AMG 前轴', note: '原厂零件号 B66030098' },
          { size: '9Jx18', et: 54, tyre: '255/35R18', models: 'C63 AMG 后轴', note: '原厂零件号 B66030099' },
          { size: '8Jx19', et: 45, tyre: '235/35R19', models: 'C63 AMG Edition 507 前轴', note: '原厂零件号 A2044014802' },
          { size: '9Jx19', et: 54, tyre: '255/30R19', models: 'C63 AMG Edition 507 后轴', note: '原厂零件号 A2044014902' },
          { size: '8Jx20', et: 40, tyre: '235/30R20', models: 'C63 AMG 20 寸组合前轴', note: '' },
          { size: '9Jx20', et: 50, tyre: '265/25R20', models: 'C63 AMG 20 寸后轴', note: '' }
        ]
      },
      tyres: [
        { size: '195/60R16', load_speed: null, note: '配 6J×16 ET39（入门）' },
        { size: '205/55R16', load_speed: '91H / 91V', note: 'S204 官方档案基础规格，配 7J×16 ET43' },
        { size: '225/50R16', load_speed: null, note: '配 7.5J×16 ET53（选装）' },
        { size: '225/45R17', load_speed: '91W', note: '配 7.5J×17 ET47，主力规格' },
        { size: '245/40R17', load_speed: null, note: '后轴，配 8.5J×17 ET58' },
        { size: '225/40R18', load_speed: null, note: '配 7.5J×18 ET47 或 AMG 8J×18 ET50' },
        { size: '235/40R18', load_speed: null, note: 'C63 AMG 前轴，配 8J×18 ET45' },
        { size: '255/35R18', load_speed: null, note: '后轴，配 8.5J×18 ET54（AMG）或 9J×18 ET54（C63）' },
        { size: '235/35R19', load_speed: null, note: 'C63 AMG Edition 507 前轴' },
        { size: '255/30R19', load_speed: null, note: 'C63 AMG Edition 507 后轴' },
        { size: '265/25R20', load_speed: null, note: 'C63 AMG 20 寸后轴' }
      ],
      engines: [
        { code: 'M271（271.952）', name: 'C180 Kompressor', displacement: '1.8L（1796 cc）', power_kw: 115, torque_nm: 230, years: '2007–2008', note: '机械增压；6MT 标配 / 5G-TRONIC 选配；原厂轮组 7J×16 + 205/55R16。' },
        { code: 'M271（271.950）', name: 'C200 Kompressor', displacement: '1.8L（1796 cc）', power_kw: 135, torque_nm: 250, years: '2007–2010', note: '机械增压。' },
        { code: 'M271（271.820）', name: 'C180 CGI BlueEFFICIENCY', displacement: '1.8L（1796 cc）', power_kw: 115, torque_nm: 250, years: '2009–2012', note: '涡轮直喷；改款后 6MT 标配 + 7G-TRONIC PLUS 选配。' },
        { code: 'M271 EVO（271.860）', name: 'C200 CGI / C200 BlueEFFICIENCY', displacement: '1.8L（1796 cc）', power_kw: 135, torque_nm: 270, years: '2009–2014', note: '涡轮直喷，凸轮轴调节器需重点关注。' },
        { code: 'M271 EVO（271.860 高功率）', name: 'C250 CGI BlueEFFICIENCY', displacement: '1.8L（1796 cc）', power_kw: 150, torque_nm: 310, years: '2009–2014', note: '改款后 7G-TRONIC PLUS 标配。' },
        { code: 'M272（272.947）', name: 'C280 / C300（2009.04 起改名 C300）', displacement: '3.0L（2996 cc）', power_kw: 170, torque_nm: 300, years: '2007–2011', note: '6MT 标配 / 7G-TRONIC 选配；中国市场的六缸主力。' },
        { code: 'M272（272.961）', name: 'C350', displacement: '3.5L（3498 cc）', power_kw: 200, torque_nm: 350, years: '2007–2011', note: '7G-TRONIC 标配。' },
        { code: 'M276（276.957）', name: 'C350 BlueEFFICIENCY（改款）', displacement: '3.5L（3498 cc）', power_kw: 225, torque_nm: 370, years: '2011–2014', note: '直喷 V6；7G-TRONIC PLUS 标配。' },
        { code: 'M274（274.910）', name: 'C180（2012 起 1.6T）', displacement: '1.6L（1595 cc）', power_kw: 115, torque_nm: 250, years: '2012–2014', note: '' },
        { code: 'M156（156.985）', name: 'C63 AMG', displacement: '6.2L（6208 cc）', power_kw: 336, torque_nm: 600, years: '2008–2014', note: '自然吸气 V8；原厂前 8J×18 ET45 + 235/40R18、后 9J×18 ET54 + 255/35R18。旅行版是这一代的经典之作。' },
        { code: 'M156（Edition 507）', name: 'C63 AMG Edition 507 / Performance Package', displacement: '6.2L（6208 cc）', power_kw: 373, torque_nm: 610, years: '2013–2014', note: '原厂前 8J×19 ET45 + 235/35R19、后 9J×19 ET54 + 255/30R19。' },
        { code: 'OM651（651.911）', name: 'C220 / C250 CDI BlueEFFICIENCY', displacement: '2.1L（2143 cc）柴油', power_kw: 125, torque_nm: 400, years: '2009–2014', note: 'C250 CDI 为双级涡轮，150 kW / 500 N·m。' },
        { code: 'OM642（642.830 / 642.834）', name: 'C350 CDI BlueEFFICIENCY', displacement: '3.0L（2987 cc）柴油', power_kw: 170, torque_nm: 540, years: '2009–2014', note: '改款后（642.834）为 195 kW / 620 N·m。' }
      ],
      issues: [
        { title: 'M271 凸轮轴调节器（正时链轮）磨损——这一代最高发的通病', symptom: '故障码 P034062；冷启动困难伴异响抖动；点火延迟（最长超过 3 秒）；冷车无高怠速直接停在 800 rpm', cause: '进/排气凸轮轴调节器内部磨损泄压、齿面失圆；只换链条不换链轮会在 1～2 万公里内复发', fix: '进排气链轮成对更换，同时换链条、张紧器、中央阀与气门室盖垫；换后用诊断仪确认相位偏差 ≤±2°（>±5° 判链轮报废）', cost_cny: [10000, 15000] },
        { title: 'M271 / M271 EVO 正时链条拉长', symptom: '冷启动瞬间发动机前部哗啦或哒哒金属异响，1～3 秒后消失；故障灯亮；加速无力、点火延迟；严重时跳齿顶气门', cause: '约 8～12 万公里起高发，链节变形使凸轮轴实际相位偏离目标值，报 P0016 / P0017 / P0340 类码', fix: '更换链条套装（链条 + 张紧器 + 导轨）；链轮齿面磨损必须成套更换；8 万公里起主动检查正时', cost_cny: [8000, 12000] },
        { title: 'M271 平衡轴齿轮磨损', symptom: '10～15 万公里高发：怠速抖动、故障灯亮、轻微噪音；机油压力可低至 0.2 bar，1500 rpm 附近出现异响', cause: '平衡轴齿轮材料与设计耐久不足导致磨损，链板或张紧部位泄压造成机油压力异常', fix: '更换升级版齿轮组；4S 走发动机解体大修', cost_cny: [6000, 20000] },
        { title: '722.9 导体板 / VGS 转速传感器失效', symptom: '换挡延迟后突然粗暴接合（2–4 挡最明显）；偶发锁 2 挡跛行；行驶中跳回 N 挡；报 P0717 / P0718、P2767 / P2768', cause: 'TCU 与导体板集成在油底壳内长期浸泡 ATF，霍尔转速传感器受高温与金属磨屑污染而失效', fix: 'VGS1（2004–2007）必须导体板与阀体一起换；VGS2/VGS3 可单换 TCU（需空白件 + SCN 编码）；或对原车导体板做电子维修（换传感器、补焊，保留编码）', cost_cny: [3500, 12000] },
        { title: '722.9 阀体磨损导致顿挫 / 冲击 / 锁档', symptom: '1 升 2 挡生硬或撞击，冷车轻踩油门起步最明显；挂 D/R 需停顿才接合；打滑、锁单挡、变速箱警告灯', cause: '阀体内部磨损或污染导致换挡压力控制不精确；高里程车的导体板也是接合延迟的常见原因', fix: '阀体维修或更换（只换油通常不能解决已磨损的阀体）；用奔驰专用诊断读故障码、自适应值、离合器磨损参数与电磁阀电流', cost_cny: [4000, 6000] },
        { title: '722.9 液力变矩器锁止离合器（TCC）磨损引起低速抖动', symptom: '红绿灯起步咯噔一下、低速挪车顿一下、80→90 km/h 加速车身抖；D 挡停车时方向盘与车身共振', cause: '变矩器内锁止离合片 8～12 万公里磨损，TCC 在升档瞬间工作加剧摩擦片磨损与扭转减震器热衰退', fix: '先关闭锁止离合器路试：现象消失则更换或翻新液力变矩器；仍重现则查变速箱换挡逻辑', cost_cny: [2800, 8000] },
        { title: '转向柱锁（ESL / ELV）故障——无法启动、方向盘锁死', symptom: '仪表显示 Steering Lock Defective；方向盘锁死、无法启动但钥匙正常；渐进式表现：先解锁变慢、需多次尝试，转向柱处有咔哒或研磨声', cause: 'ELV 模块内小直流电机约 5～10 万次循环后碳刷磨损、塑料齿轮崩裂；微动开关失效或线束断裂', fix: '① 拆开更换电机、微动开关与齿轮（约 90% 案例可修，换电机无需匹配）；② 整体更换 ELV 并用 Xentry/DAS 与 EIS 编程配对；③ 加装模拟器取消机械锁止（注意法规与保险）', cost_cny: [1000, 5000] },
        { title: '天窗 / 全景天窗排水管堵塞导致车内进水', symptom: '大雨或洗车后脚垫潮湿甚至积水、副驾地毯积水、顶棚与立柱湿、霉味；地板下的电气部件可能失效', cause: '天窗排水孔与排水管（通常 4 根）被树叶灰尘砂土堵塞；出水口橡皮开口太小易反复堵塞，雨水倒灌', fix: '用风枪从天窗排水孔吹通；拆前轮内衬处理前出水口、拆后杠处理后出水口，并去掉出水口橡皮后上胶固定防回缩；已进水需拆座椅掀地毯，海绵压干曝晒 3～5 天', cost_cny: [700, 1800] },
        { title: '后减震器漏油 / 阻尼失效', symptom: '后减震筒身有油迹；过坎咣当响、静止压后备箱有起伏；车身歪斜、过弯侧倾', cause: '密封油封老化渗油（只能更换不可修复）；原厂寿命约 6～9 万公里；顶胶磨损后失去缓冲也会异响', fix: '左右成对更换后减震器，同时检查或更换顶胶、缓冲胶与防尘套，更换后做四轮定位', cost_cny: [300, 900] },
        { title: '后螺旋弹簧断圈', symptom: '约 4.6 万公里即可出现：右后弹簧断一圈、车尾低于车头；同平台车型曾出现两侧后弹簧断超过一圈', cause: '金属疲劳加上下部线圈涂层磨掉后锈蚀；线圈间出现磨亮接触痕说明弹簧已疲软', fix: '成对更换后弹簧，必须同时更换下弹簧垫（A2043240184 / A2033240084），必要时换后稳定杆连杆（A2043200589 / A2043200489）', cost_cny: null },
        { title: '进气歧管翻板断裂（塑料三角板 / 旋流阀连杆）', symptom: '动力不足、加速无力、易熄火、油耗升高、故障灯亮；M272 报 P2004 / P2006 / P0410，M271 报充气运动风门故障', cause: '塑料翻板长期受热老化断裂或连杆脱落；M271 EVO 的可变进气翻板机构约 12～18 万公里磨损卡滞', fix: '4S 惯例是换进气歧管总成；出保后可买改进型铝制翻板维修包单独更换，或拆检翻板马达、连杆与线路', cost_cny: [1000, 10000] },
        { title: '冷却液泵与节温器漏水、水温上不到工作点', symptom: '水温长期升不到工作温度，到 90 ℃ 后开暖风即掉到 60 ℃；膨胀壶、水泵与水管接头有冷却液痕迹；严重时过热', cause: '节温器卡滞或失效（低温常开），水泵水封与水管接头老化渗漏；节温器失常会拖累水泵', fix: '更换节温器（需拆装饰盖、附件皮带、催化器吹扫泵与惰轮）、水泵及老化水管，清洗冷却系统并重新加注防冻液', cost_cny: [1480, 5000] },
        { title: '曲轴箱通风阀（PCV）膜片破裂', symptom: '冷车或怠速时发动机舱吹哨或啸叫（开关机油盖声音会变化），怠速游车、混合气偏稀报 P0171 / P0174；曲轴箱压力顶出机油尺、机油沿油尺管渗出', cause: 'PCV 膜片破裂或阀体被油泥卡滞、管路裂纹漏气；冬季冷凝结冰也会堵死通风通道', fix: '先查管路接头密封，再更换 PCV 阀或膜片总成；更换后做混合气自适应复位并路试；压力仍高需测曲轴箱背压、查活塞环窜气', cost_cny: null },
        { title: '发动机机脚胶老化', symptom: '车龄超 10 年或 7～8 万公里后热车怠速车内噪音大、规律震动，D 挡停车抖动、开空调加重；共 3 个机脚（含变速箱侧）', cause: '机脚胶为橡胶或液压件，老化塌陷后失去减振能力；变速箱侧机脚承受扭矩反作用更易先坏', fix: '无需吊发动机，可从车底直接更换，建议连变速箱侧一并检查更换', cost_cny: [1500, 3000] },
        { title: 'SAM 模块故障（高频电气问题）', symptom: '莫名故障灯、灯光乱跳、电瓶经常亏电', cause: 'SAM（信号采集与控制）模块电子故障；同期无钥匙系统耗电较高，原厂电瓶 3～4 年即需更换，亏电会引发大量莫名故障', fix: '刷模块或更换（可用二手 SAM）；按 3 年周期更换电瓶', cost_cny: [2000, 4000] },
        { title: '澄清：S204 没有空气悬挂，也没有电子手刹', symptom: '不适用', cause: 'W204/S204 采用传统钢弹簧加减震器，驻车制动为脚踩式，未配备 AIRMATIC 空气悬挂或电子手刹', fix: '预算应放在钢弹簧、后减震器、顶胶与后弹簧断圈这几项上', cost_cny: null }
      ]
    },

    /* ---------------------------------------------------- S205 / W205 --- */
    {
      chassis: 'W205/S205',
      generation: '第四代 C 级旅行车',
      years: '2014–2021',
      intro: '全面涡轮化与轻量化的一代。车身大幅加长到 4702 mm，轴距 2840 mm，' +
        '铝合金件比例显著提升，整备质量反而比上代更轻。产品线覆盖 C180 到 C63 S AMG，' +
        '还有 C350e 插电混动旅行版。2018 年中期改款（Mopf）换了灯组与内饰。',
      highlight: '这一代的原厂轮组数据有官方手册背书（W205 车主手册 2014-05 版的 Rad-Reifen-Kombinationen 表），' +
        '所以本站把它完整列了出来——包括后轮那些非常大的 ET 值（18 寸后轮 ET56、19 寸后轮 ET56.5）。' +
        '这意味着<strong>后轮的改装余量其实比前轮大得多</strong>，而前轮 7.5J×18 ET44 已经相当靠外，' +
        '再加宽就要格外小心。另外提醒：改装圈常说的「原厂 7.5J×17 ET45.5」在官方手册里并不存在，' +
        '官方 17 寸是 7.0J×17 ET48.5。',
      body: {
        length_mm: 4702,
        width_mm: 1810,
        height_mm: 1457,
        wheelbase_mm: 2840,
        track_front_mm: 1584,
        track_rear_mm: 1566,
        ground_clearance_mm: null,
        turning_circle_m: null,
        kerb_weight_kg: [1470, 1785],
        gross_weight_kg: null,
        boot_litres: [490, 1510],
        fuel_tank_l: 66,
        cd: 0.27
      },
      wheels: {
        pcd: '5x112',
        center_bore_mm: 66.6,
        bolt_thread: 'M14x1.5',
        bolt_seat: '球面 R14（Ball seat）',
        et_range: [36, 56.5],
        notes: '下表取自奔驰官方《Rad-Reifen-Kombinationen》轮组表（W205 车主手册 2014-05 版），' +
          '是原厂允许的组合范围，不等于改装允许范围。' +
          '特别提示：改装圈广泛流传的「7.5J×17 ET45.5」并未出现在该官方手册中（手册的 17 寸主力为 7.0J×17 ET48.5），' +
          '本站以官方手册为准，同时把流传值一并列出供对照。' +
          'TPMS 为直接式，频率 433.92 MHz。螺栓 M14×1.5 与球面 R14 座面未能在官方手册中直接核实，' +
          '但与原厂件与行业通行做法一致。',
        oem: [
          { size: '7Jx17', et: 48.5, tyre: '225/50R17', models: 'C180 / C200 / C250（夏季，前后同规格）', note: '官方手册中的 17 寸主力配置' },
          { size: '7.5Jx17', et: 45.5, tyre: '225/50R17', models: '改装圈广泛流传的「原厂 17 寸」', note: '⚠ 未出现在官方手册中，与官方 7.0J×17 ET48.5 差 3 mm，仅供对照' },
          { size: '6Jx16', et: 36, tyre: '195/65R16', models: 'C180（夏季，入门）', note: '' },
          { size: '6.5Jx16', et: 38, tyre: '205/60R16', models: 'C180（夏季）', note: '' },
          { size: '7Jx16', et: 48, tyre: '225/55R16', models: 'C180（夏季）', note: '' },
          { size: '8Jx17', et: 48.5, tyre: '245/45R17', models: 'C180 后轮（前后配，前轮 7.0J×17 ET48.5）', note: '' },
          { size: '7.5Jx18', et: 44, tyre: '225/45R18', models: 'C180 / C200 / C300 等 18 寸前轮', note: '后轮为 8.5J×18' },
          { size: '8.5Jx18', et: 56, tyre: '245/40R18', models: '18 寸后轮', note: '另有 ET49 版本，但需加装后轮拱护唇' },
          { size: '7.5Jx19', et: 44, tyre: '225/40R19', models: '19 寸前轮', note: '' },
          { size: '8.5Jx19', et: 56.5, tyre: '255/35R19', models: '19 寸后轮', note: '另有 ET52 版本，但需加装后轮拱护唇' }
        ]
      },
      tyres: [
        { size: '195/65R16', load_speed: '92V', note: '官方手册 C180 夏季（前后同规格）' },
        { size: '205/60R16', load_speed: '92V', note: '官方手册 C180 夏季' },
        { size: '225/55R16', load_speed: '95V', note: '官方手册 C180 夏季' },
        { size: '225/50R17', load_speed: '94W / 94H M+S', note: '官方手册 17 寸主力（前后同规格或前轮）' },
        { size: '245/45R17', load_speed: '95W', note: '17 寸前后配的后轮' },
        { size: '225/45R18', load_speed: '95Y XL', note: '18 寸前轮' },
        { size: '245/40R18', load_speed: '97Y XL', note: '18 寸后轮' },
        { size: '225/40R19', load_speed: '93Y XL', note: '19 寸前轮' },
        { size: '245/35R19', load_speed: '93Y XL', note: '19 寸后轮；C63 S AMG Estate 前轮亦为此规格' },
        { size: '255/35R19', load_speed: '96Y XL', note: '19 寸后轮（需加装后轮拱护唇）' },
        { size: '265/35R19', load_speed: null, note: 'C63 S AMG Estate 后轮标配' }
      ],
      engines: [
        { code: 'M274 E16', name: 'C180', displacement: '1.6L（1595 cc）', power_kw: 115, torque_nm: 250, years: '2014–2018', note: '发动机转速 5300 rpm 达最大功率、1250–4000 rpm 输出峰值扭矩；S205 旅行版整备 1470 kg（6MT）/ 1500 kg（7G）。' },
        { code: 'M274 E20', name: 'C200', displacement: '2.0L（1991 cc）', power_kw: 135, torque_nm: 300, years: '2014–2018', note: '中国市场主力；S205 整备 1495 kg（6MT）/ 1525 kg（7G）。' },
        { code: 'M274 E20', name: 'C250', displacement: '2.0L', power_kw: null, torque_nm: null, years: '2014–2018', note: '功率未取得可靠来源；S205 C250 7G 的 0–100 km/h 为 6.8 s、极速 244 km/h、整备 1545 kg。' },
        { code: 'M264 + 48V', name: 'C200 / C300（2018 改款后）', displacement: '2.0L', power_kw: null, torque_nm: null, years: '2018–2021', note: '改款后引入 48V 轻混，电气系统复杂度明显上升；具体功率扭矩未取得可靠来源。' },
        { code: 'M276', name: 'C400 / C43 AMG', displacement: '3.0L V6 双涡轮', power_kw: 270, torque_nm: 520, years: '2015–2021', note: 'AMG 入门性能版；其 19 寸轮毂 ET 未取得来源。' },
        { code: 'M177', name: 'C63 S AMG', displacement: '4.0L V8 双涡轮', power_kw: 375, torque_nm: 700, years: '2015–2021', note: '核实数据：375 kW/5500 rpm、700 N·m/1750 rpm；旅行版整备 1785 kg，油耗 8.7 L/100km，原厂前 245/35R19 + 后 265/35R19。' },
        { code: 'M274 + 电机', name: 'C350e（插混）', displacement: '2.0L + 电机', power_kw: null, torque_nm: null, years: '2015–2018', note: '后悬为空气悬挂；功率与油箱数据未取得可靠来源。' },
        { code: 'OM626', name: 'C180 / C200 BlueTEC', displacement: '1.6L（1598 cc）柴油', power_kw: 85, torque_nm: 280, years: '2014–2018', note: 'C200 BlueTEC 为 100 kW / 300 N·m；S205 整备 1545–1550 kg。' },
        { code: 'OM651', name: 'C220 / C250 BlueTEC', displacement: '2.1L（2143 cc）柴油', power_kw: 125, torque_nm: 400, years: '2014–2018', note: 'C220 BlueTEC 为 125 kW / 400 N·m；C250 BlueTEC 功率未核实，其 7G 旅行版 0–100 km/h 6.9 s、整备 1660 kg。' }
      ],
      issues: [
        { title: '9G-TRONIC（725.0）换挡顿挫与电控异常', symptom: '降挡顿挫，典型为约 60 km/h 时 6 挡降 5 挡的冲击；或挂挡延迟、偶发进入应急模式', cause: '阀体 / 电液控制单元与变速箱自适应值异常', fix: '先更换变速箱油与滤芯、重置自适应值并读取故障码；必要时维修或更换阀体总成', cost_cny: [2500, 12000] },
        { title: 'OM651 2.1L 柴油机正时链条拉长 / 张紧器故障（2018 改款前）', symptom: '冷启动瞬间出现金属敲击或咔嗒声', cause: '正时链条张紧器失效导致链条拉长；法国 L\'Argus 报道该问题存在于 2018 年改款前的四代柴油车，且无专门官方召回', fix: '冷启动听诊；若异响则测量链条伸长量，判断只换张紧器还是整套链条', cost_cny: null },
        { title: 'Airmatic 空气悬挂（选装，含 C350e / C43）停放后塌陷', symptom: '停放一夜后车身一侧或整体下沉、升降缓慢、压缩机长时间工作并报悬挂故障', cause: '空气弹簧或气路泄漏、高度传感器或压缩机故障', fix: '先做气密性检漏，再更换空气弹簧或压缩机。这类故障必须逐车检测后报价，不存在通用价格', cost_cny: null },
        { title: '48V 轻混系统（2018 改款后四缸汽油机）电气故障排查复杂', symptom: '偶发电气警告、启停功能异常、需要频繁诊断', cause: '48V 系统由双电池、DC/DC 转换器与电控组成，系统复杂度高', fix: '检查两块电池状态、完整读取各控制单元故障码。买二手时避开有反复电气报警且电池无更换记录的车', cost_cny: null },
        { title: '柴油机后处理系统（NOx 传感器 / EGR / DPF / AdBlue）', symptom: '故障灯亮、动力下降、AdBlue 剩余里程警告、限制启动', cause: 'NOx 传感器失效、EGR 积碳、DPF 堵塞；有个案显示 3.2 万公里即更换 NOx 传感器（约 700 欧元）', fix: '读取故障码与 DPF 数据，清洗或更换相关部件，检修 AdBlue 系统', cost_cny: [3000, 15000] },
        { title: 'M274 涡轮增压器冷却水管渗漏', symptom: '冷却液液位缓慢下降、停车后地面有水渍、涡轮区域有水垢痕迹', cause: '涡轮冷却水管接头与管路受热老化，是 M274 的高频问题', fix: '更换改进型冷却水管与接头，尽早处理避免缺液高温', cost_cny: [1500, 4000] },
        { title: '气门室盖垫漏油', symptom: '发动机顶部渗油、有焦糊味、火花塞孔内进油', cause: '气门室盖垫与火花塞密封圈老化', fix: '更换气门室盖垫与火花塞密封圈', cost_cny: [1200, 3000] },
        { title: '全景天窗异响与排水堵塞', symptom: '颠簸路面天窗咯吱响、地毯潮湿、A 柱水渍', cause: '导轨润滑不足、排水管堵塞或脱落', fix: '清洁润滑导轨、疏通排水管，必要时更换密封条', cost_cny: [300, 1500] },
        { title: '官方召回（需按 VIN 核对是否已执行）', symptom: '—', cause: '水泵皮带张紧器召回、汽油四缸发电机召回（法国 RappelConso 记录）', fix: '按 VIN 在官方渠道确认召回是否已完成；未执行的应尽快到店免费处理', cost_cny: '免费（厂家召回）' }
      ]
    },

    /* ---------------------------------------------------- S206 / W206 --- */
    {
      chassis: 'W206/S206',
      generation: '第五代 C 级旅行车',
      years: '2021–',
      intro: '全面电气化的一代。M254 发动机全系带 48V ISG 集成启动发电一体机，' +
        '内饰换用 MBUX 大屏。旅行版 2021 年 7 月起生产，含 2025 年改款。' +
        'AMG 版本改为 2.0T 四缸 + 插混的 C63 S E Performance，是史上最复杂的 C 级。' +
        '尺寸数据取自法国 L\'argus 的 S206 Break 技术表与官方首发资料（日本目录的轮距记为 1590/1575，' +
        '与欧洲口径的前后顺序相反，此处采用欧洲口径）。',
      highlight: 'W206 的原厂 ET 分布比上一代更分散：前轮 7.5J ET40 左右，后轮 8.5J ET52～54，' +
        'S206 旅行版 18 寸后轮甚至到 ET58。这意味着<strong>前轮的外移余量很小</strong>——' +
        '原厂前轮已经是 ET40，换成 8.5J 而 ET 不变，胎壁就会外移 12 mm 以上，直接进入风险区。' +
        '后轮则相反，原厂给足了内缩量，改装空间相对宽裕。' +
        '另外 C63 S E Performance 原厂即 20 寸锻造轮毂，但普通版的轮拱与刹车并不支持照搬。',
      body: {
        length_mm: 4751,
        width_mm: 1820,
        height_mm: 1455,
        wheelbase_mm: 2865,
        track_front_mm: 1579,
        track_rear_mm: 1601,
        ground_clearance_mm: 94,
        turning_circle_m: 11.1,
        kerb_weight_kg: [1730, 2190],
        gross_weight_kg: 2325,
        boot_litres: [490, 1510],
        fuel_tank_l: 66,
        cd: 0.27
      },
      wheels: {
        pcd: '5x112',
        center_bore_mm: 66.6,
        bolt_thread: 'M14x1.5（长度约 45 mm，原厂件号 A0009905407）',
        bolt_seat: '球面 R14（Kugelbund / Ball seat）',
        et_range: [40, 58],
        notes: '原厂前轮 7.5J×17 ET40～42、后轮 8.5J×18 ET52～54；C300e 4MATIC 旅行版为前 7J×17 ET44.5 / 后 8J×17 ET49.5。' +
          '螺栓 M14×1.5 球面 R14，扭矩 130 N·m。中心孔实际 66.6 mm（部分资料写 66.5），' +
          '售后轮毂中心孔普遍偏大，务必加装铝制（不要塑料）变径环。' +
          'TPMS 为直接式（气门嘴内置传感器），换轮毂需移装或更换，再通过仪表菜单「重新启动胎压监测系统」完成学习。',
        oem: [
          { size: '7.5Jx17', et: 40, tyre: '225/50R17', models: 'C180 / C200 / C300 前轮', note: 'ET 标称 40～42，是这代最常见的原厂基准' },
          { size: '7.5Jx18', et: 40, tyre: '225/45R18', models: 'C200 / C300 18 寸前轮', note: '' },
          { size: '8.5Jx18', et: 52, tyre: '245/40R18', models: 'C200 / C300 18 寸后轮', note: 'ET 标称 52～54' },
          { size: '9Jx18', et: 58, tyre: '255/40R18', models: 'S206 旅行版 18 寸后轮', note: '后轮 ET 明显大于前轮，后轮拱空间更紧' },
          { size: '7Jx17', et: 44.5, tyre: '225/50R17', models: 'C300e 4MATIC 旅行版前轮', note: '插混版本专用规格' },
          { size: '8Jx17', et: 49.5, tyre: '245/45R17', models: 'C300e 4MATIC 旅行版后轮', note: '' },
          { size: '9.5Jx20', et: null, tyre: '265/35R20', models: 'C63 S E Performance 前轮（20 寸锻造）', note: '原厂锻造轮毂；ET 未取得可靠来源' },
          { size: '10.5Jx20', et: null, tyre: '275/35R20', models: 'C63 S E Performance 后轮（20 寸锻造）', note: 'ET 未取得可靠来源' }
        ]
      },
      tyres: [
        { size: '225/50R17', load_speed: '95W 起 / 98W', note: '原厂 17 寸前轮' },
        { size: '225/45R18', load_speed: '95W XL', note: '原厂 18 寸前轮（日本 C200 标配）' },
        { size: '245/40R18', load_speed: null, note: '原厂 18 寸后轮' },
        { size: '255/40R18', load_speed: null, note: '18 寸后轮（S206 旅行版）' },
        { size: '245/45R17', load_speed: null, note: 'C300e 4MATIC 旅行版后轮' },
        { size: '225/40R19', load_speed: null, note: '19 寸前轮（高配 / 改装）' },
        { size: '255/35R19', load_speed: null, note: '19 寸后轮（高配 / 改装）' },
        { size: '265/35R20', load_speed: '99Y', note: 'C63 S E Performance 前轮（20 寸锻造）' },
        { size: '275/35R20', load_speed: '102Y', note: 'C63 S E Performance 后轮' }
      ],
      engines: [
        { code: 'M254', name: 'C180', displacement: '1.5L（1496 cc）', power_kw: 125, torque_nm: 250, years: '2022–', note: '48V ISG 轻混，后驱，9G-TRONIC。' },
        { code: 'M254', name: 'C200 / C200 4MATIC', displacement: '1.5L（1494–1496 cc）', power_kw: 150, torque_nm: 300, years: '2021–', note: '注意排量是 1.5L 而非 2.0L。48V ISG 可短时附加 15 kW / 200 N·m；旅行版 0–100 km/h 7.5 s，WLTP 6.2–6.7 L/100km。' },
        { code: 'M254', name: 'C300 / C300 4MATIC', displacement: '2.0L（1999 cc）', power_kw: 190, torque_nm: 400, years: '2021–', note: '0–100 km/h 6.0 s，极速 250 km/h，WLTP 6.6–7.0 L/100km。' },
        { code: 'M254 + P2 电机', name: 'C300e / C300e 4MATIC（插混）', displacement: '2.0L（1999 cc）+ 电机', power_kw: 230, torque_nm: 550, years: '2021–', note: '发动机 150 kW / 320 N·m + 电机 95 kW / 440 N·m；25.4 kWh 电池，纯电约 100–116 km；后悬标配空气悬挂；旅行版整备质量 2140 kg。' },
        { code: 'OM654M', name: 'C220d / C220d 4MATIC', displacement: '2.0L 柴油（1992 cc）', power_kw: 147, torque_nm: 440, years: '2021–', note: '奔驰首次在柴油机上配 48V ISG（15 kW / 200 N·m），WLTP 最低 4.9 L/100km。' },
        { code: 'OM654M', name: 'C300d / C300d 4MATIC', displacement: '2.0L 柴油', power_kw: 195, torque_nm: 550, years: '2021–', note: '' },
        { code: 'M139l', name: 'C43 AMG 4MATIC', displacement: '2.0L + 48V', power_kw: null, torque_nm: null, years: '2022–', note: '四缸取代上代六缸；本次未取得可核实的官方功率数据，故留空。' },
        { code: 'AMG 2.0T + 后轴 EDU 电机', name: 'C63 S E Performance', displacement: '2.0L（1991 cc）+ 插混', power_kw: 500, torque_nm: 1020, years: '2023–', note: '发动机 350 kW / 545 N·m + 后轴电机 150 kW，系统综合 500 kW / 1020 N·m；400V 6.1 kWh 电池，后轮转向；极速 280 km/h；整备质量 2190 kg；标配 20 寸锻造轮毂。' }
      ],
      issues: [
        { title: '前排安全带端部固定盖未正确安装（官方召回）', symptom: '安全带锚点固定盖可能随使用年限松脱，安全带不再固定在锚点上；碰撞或急减速时约束效果丧失', cause: '生产偏差：驾驶员座椅安全带端部固定盖未按规定安装（BR 206，生产期 2021-09 至 2024-07）', fix: '到授权维修站检查并重新处理固定盖，工时不超过 30 分钟', cost_cny: '免费（官方召回）' },
        { title: '48V 系统失火检测软件缺陷（中国召回 S2024M0244V）', symptom: '退出滑行模式时可能误判失火，特定负载下喷油中断、车辆失去动力', cause: '发动机控制单元软件中失火检测逻辑不符合规范', fix: '授权经销商免费升级发动机控制单元软件，召回实施期 2025-02-18 至 2026-02-18', cost_cny: '免费（官方召回）' },
        { title: '信息娱乐系统控制单元意外重置导致黑屏（全球约 14.4 万辆）', symptom: '仪表盘与中控屏空白或短暂中断，故障发生前无预警', cause: '信息娱乐控制单元在特定情况下触发系统重置', fix: '软件升级（2025 年 7 月已发布优化版本）；NHTSA 已要求按正式召回程序处理', cost_cny: '免费（官方召回）' },
        { title: 'M254 凸轮轴调节电磁阀前端滤网脱落', symptom: '发动机故障灯亮、动力下降加速发闷、怠速抖动；常见故障码 P06DA00、P052B/P052C、P0520', cause: 'VVT 进油滤网固定结构在高温机油长期浸泡下老化碎裂，碎片卡滞 VVT 柱塞或堵塞凸轮轴轴承油道，严重时拉伤凸轮轴', fix: '需拆正时链条前盖更换中心阀滤网或整个阀体，并拆油底壳清洗油道；属准大修级别，工时约 10–15 小时。2024 年 7 月后出厂车辆已使用改良件', cost_cny: [8000, 25000] },
        { title: '早期 48V 轻混（BSG 皮带式）故障率偏高', symptom: '启停失效、48V 系统报警、启动困难；出保后维修费用高', cause: '2019–2021 款采用 BSG 皮带式电机的车型故障率较高；2022 年后改用 ISG 集成式电机后显著下降', fix: '到店诊断 48V 电池与电机；专修店费用明显低于 4S', cost_cny: null },
        { title: '后差速器通气孔偏低导致进水、油液乳化', symptom: '差速器壳体渗油、停车滴油、行驶中后桥嗡嗡异响，严重时齿轮与轴承报废', cause: '通气孔位置偏低，涉水、雨季或高压水枪冲洗底盘时水汽进入，润滑油乳化后润滑能力下降', fix: '加装差速器通气延长管（约半小时，成本极低）；已渗漏者换油封并换油；已异响者需拆检差速器', cost_cny: [200, 8000] },
        { title: '9G-TRONIC 低速顿挫 / 换挡冲击', symptom: '低速行驶顿挫、换挡冲击', cause: '油品劣化、阀体磨损与自适应学习值偏移', fix: '先更换变速箱油并升级软件，必要时检修阀体', cost_cny: [2500, 12000] }
      ]
    }
  ],

  /* ======================================================================
     二、推荐改装方案（由计算器实时核算）
     oemFront / oemRear 用于指定该方案的对比基准
     ====================================================================== */
  plans: [
    /* --- S203 --- */
    {
      chassis: 'W203/S203', level: '原厂风格',
      oemFront: { size: '7Jx16', et: 37, tyre: '205/55R16', rimWidth: 7 },
      front: { size: '7Jx16 ET37', tyre: '205/55R16' },
      rear: null,
      note: '直接沿用原厂 16 寸数据，换个造型即可。零风险，但视觉提升有限。'
    },
    {
      chassis: 'W203/S203', level: '进阶合装',
      oemFront: { size: '7Jx16', et: 37, tyre: '205/55R16', rimWidth: 7 },
      front: { size: '7.5Jx17 ET35', tyre: '225/45R17' },
      rear: null,
      note: '17 寸是 S203 的甜点尺寸：外移量约 8 mm，外径几乎不变，舒适性损失很小，' +
        '而且原厂本来就有 7.5J×17 ET37 的配置，属于官方验证过的尺寸段。'
    },
    {
      chassis: 'W203/S203', level: '激进姿态',
      oemFront: { size: '7Jx16', et: 37, tyre: '205/55R16', rimWidth: 7 },
      front: { size: '8Jx18 ET35', tyre: '225/40R18' },
      rear: { size: '8.5Jx18 ET40', tyre: '245/35R18' },
      note: '参照 W203 原厂 17/18 寸 AMG 装备的尺寸段。由于 W203 原厂 ET 已经偏小（37），' +
        '再加宽到 8J / 8.5J 会让胎壁相对原厂外移 12～17 mm：前轮接近轮拱极限，后轮通常需要卷边或做负倾角。' +
        '旅行版后轴载荷更高，满载时后轮刮内衬的概率明显大于三厢版——这一档属于「知道代价再上」的选择。'
    },

    /* --- S204 --- */
    {
      chassis: 'W204/S204', level: '原厂风格',
      oemFront: { size: '7.5Jx17', et: 47, tyre: '225/45R17', rimWidth: 7.5 },
      front: { size: '7.5Jx17 ET47', tyre: '225/45R17' },
      rear: null,
      note: 'W204 的 17 寸原厂配置已经很协调，换同规格的造型件性价比最高。'
    },
    {
      chassis: 'W204/S204', level: '进阶合装',
      oemFront: { size: '7.5Jx17', et: 47, tyre: '225/45R17', rimWidth: 7.5 },
      oemRear: { size: '8.5Jx18', et: 54, tyre: '255/35R18', rimWidth: 8.5 },
      front: { size: '8Jx18 ET45', tyre: '225/40R18' },
      rear: { size: '8.5Jx18 ET48', tyre: '255/35R18' },
      note: '前 8J ET45、后 8.5J ET48 是 W204 上最经典的 18 寸组合，前轮外移约 5 mm，' +
        '后轮相对原厂 8.5J ET54 外移约 6 mm，属于「齐边不刮」的黄金区间。'
    },
    {
      chassis: 'W204/S204', level: '激进姿态',
      oemFront: { size: '7.5Jx17', et: 47, tyre: '225/45R17', rimWidth: 7.5 },
      oemRear: { size: '8.5Jx18', et: 54, tyre: '255/35R18', rimWidth: 8.5 },
      front: { size: '8.5Jx19 ET42', tyre: '235/35R19' },
      rear: { size: '9.5Jx19 ET45', tyre: '265/30R19' },
      note: '19 寸在 W204 上已经属于激进改装：胎壁很薄，必须配合较硬的弹簧或绞牙，' +
        '否则刮轮眉概率很高。后轮 265 宽胎在旅行版上还容易蹭到内衬前部。'
    },

    /* --- S205 --- */
    {
      chassis: 'W205/S205', level: '原厂风格',
      oemFront: { size: '7Jx17', et: 48.5, tyre: '225/50R17', rimWidth: 7 },
      front: { size: '7Jx17 ET48.5', tyre: '225/50R17' },
      rear: null,
      note: 'S205 的 17 寸配 225/50R17 胎壁较厚，是舒适性最好的选择，也最适合国内路况。' +
        '官方手册的 17 寸就是 7.0J×17 ET48.5。'
    },
    {
      chassis: 'W205/S205', level: '进阶合装',
      oemFront: { size: '7Jx17', et: 48.5, tyre: '225/50R17', rimWidth: 7 },
      oemRear: { size: '8.5Jx18', et: 56, tyre: '245/40R18', rimWidth: 8.5 },
      front: { size: '8Jx18 ET42', tyre: '235/45R18' },
      rear: { size: '8.5Jx18 ET50', tyre: '255/40R18' },
      note: '前 8J×18 ET42 相对官方 17 寸基准外移约 11.5 mm，后 8.5J×18 ET50 相对官方 18 寸后轮外移约 11 mm，' +
        '两侧都落在「需要实测但通常可行」的区间。235/45R18 与原厂 225/50R17 外径差在 2% 以内，码表误差可忽略。'
    },
    {
      chassis: 'W205/S205', level: '激进姿态',
      oemFront: { size: '7.5Jx17', et: 45.5, tyre: '225/50R17', rimWidth: 7.5 },
      oemRear: { size: '8.5Jx18', et: 49, tyre: '245/40R18', rimWidth: 8.5 },
      front: { size: '8.5Jx19 ET40', tyre: '235/35R19' },
      rear: { size: '9.5Jx19 ET45', tyre: '265/30R19' },
      note: '参照 AMG 19 寸风格。前轮外移约 18 mm，已经接近 S205 前轮拱的极限，' +
        '必须配合橡皮泥测试；后轮 265 宽胎需要确认与内衬前部、燃油加注管的间隙。'
    },

    /* --- S206 --- */
    {
      chassis: 'W206/S206', level: '原厂风格',
      oemFront: { size: '7.5Jx17', et: 40, tyre: '225/50R17', rimWidth: 7.5 },
      front: { size: '7.5Jx17 ET40', tyre: '225/50R17' },
      rear: null,
      note: 'W206 底盘更紧致，原厂 17 寸的舒适性优势更明显。不建议为了造型牺牲日常可用性。'
    },
    {
      chassis: 'W206/S206', level: '进阶合装',
      oemFront: { size: '7.5Jx17', et: 40, tyre: '225/50R17', rimWidth: 7.5 },
      oemRear: { size: '8.5Jx18', et: 52, tyre: '245/40R18', rimWidth: 8.5 },
      front: { size: '8Jx18 ET42', tyre: '235/45R18' },
      rear: { size: '8.5Jx18 ET45', tyre: '255/40R18' },
      note: '与 S205 相同思路：18 寸 + 适度加宽，外径保持接近，是稳妥的升级路线。' +
        '注意 W206 的 TPMS 为直接式且支持自动定位，移装传感器后行驶一段会自动识别。'
    },
    {
      chassis: 'W206/S206', level: '激进姿态',
      oemFront: { size: '7.5Jx17', et: 40, tyre: '225/50R17', rimWidth: 7.5 },
      oemRear: { size: '8.5Jx18', et: 52, tyre: '245/40R18', rimWidth: 8.5 },
      front: { size: '8.5Jx19 ET35', tyre: '235/35R19' },
      rear: { size: '9.5Jx19 ET45', tyre: '265/30R19' },
      note: '参照日本改装圈对 W206 的普遍建议（前 8.5J ET+35 / 后 9.5J ET+45 接近齐平）。' +
        '实测反馈是前轮大角度转向会蹭内衬、后轮全压缩会蹭轮眉，降低车身时必须配合负倾角或轮眉加工。' +
        '19 寸已是 S206 普通版的实用上限——再往上（20 寸）只有 C63 S E Performance 的轮拱与刹车配置才真正支持。'
    }
  ],

  /* ======================================================================
     三、MB 机油认证体系
     ====================================================================== */
  mbSpecs: [
    { code: 'MB 229.1', fuel: '汽油 / 柴油', low_saps: false, viscosity: '10W-40 / 15W-40', notes: '早期标准（1990 年代末），严于 ACEA A2/A3、B2/B3。仅适用于老款轻负荷发动机，现代涡轮机不建议使用。' },
    { code: 'MB 229.3', fuel: '汽油 / 柴油', low_saps: false, viscosity: '0W-40 / 5W-40 / 5W-30', notes: '标准灰分，对应 ACEA A3/B4，适合长换油周期（约 3 万 km）。W203/W204 的 M271、M272 常用此认证。' },
    { code: 'MB 229.5', fuel: '汽油 / 柴油', low_saps: false, viscosity: '0W-40 / 5W-40 / 5W-30', notes: '节能型标准灰分主力认证，须符合 ACEA A3/B3/B4 并进入戴姆勒批准清单；HTHS ≥3.5，不强制 40 粘度，满足 A3/B4 或 C3 的 30 粘度亦可。覆盖 2000–2015 年绝大多数汽油机。' },
    { code: 'MB 229.31', fuel: '汽油 / 柴油', low_saps: true, viscosity: '0W-30 / 5W-30', notes: '低灰分多级油，汽油与柴油机均可用；须通过 M111 燃油经济性试验（CEC L-54-T-96）节油 1.0%。' },
    { code: 'MB 229.51', fuel: '汽油 / 柴油', low_saps: true, viscosity: '0W-30 / 5W-30 / 0W-40', notes: 'Low SAPS 长寿命油，面向 EU-4 带 DPF 的柴油机；同样适用于国六汽油车以保护 GPF。目前最通用的低灰分认证之一。' },
    { code: 'MB 229.52', fuel: '汽油 / 柴油', low_saps: true, viscosity: '0W-30 / 5W-30', notes: '为 BlueTEC（OM642 等）制定，要求严于 229.51：氯含量 ≤0.0100%（229.51 为 0.0150%）、倾点 −36 ℃（229.51 为 −27 ℃）。' },
    { code: 'MB 229.53', fuel: '汽油 / 柴油', low_saps: true, viscosity: '5W-30', notes: '低灰分，对应 ACEA C3/C2。国产油也有正式认证产品（如昆仑天润 KR8 PLUS 5W-30 标注 MB-Approval 229.53/229.51/229.31）。' },
    { code: 'MB 229.6', fuel: '汽油', low_saps: false, viscosity: '0W-30 / 5W-30', notes: '节能型标准灰分油，对应 ACEA A5/B5。' },
    { code: 'MB 229.61', fuel: '汽油', low_saps: true, viscosity: '0W-30', notes: '节能型低灰分油，是 M282 / M254 等新一代发动机的 0W-30 标准。' },
    { code: 'MB 229.71', fuel: '汽油', low_saps: true, viscosity: '0W-20', notes: '最新一代低灰分低粘度标准，对应 ACEA C5，适配 M254 / W206 等。' },
    { code: 'MB 229.72', fuel: '汽油', low_saps: true, viscosity: '0W-20', notes: '与 229.71 同属 ACEA C5 低灰分 0W-20，产品标签常成对标注（如「MB-Approval 229.71/229.72」）。' }
  ],

  /* ======================================================================
     四、各发动机用油要求
     ====================================================================== */
  engineOil: [
    { engine: 'M111（自然吸气）', models: 'W203 C180 / C200（2001–2002）', cert: 'MB 229.1 / 229.3', viscosity: '5W-40 / 0W-40', capacity_l: 7.0, note: '容量 7.0 L 来自 W203 官方维修手册（含滤芯）。官方手册对汽油机给的是 MB 229.1 或 229.3。' },
    { engine: 'M271（机械增压）', models: 'W203 C180 Kompressor / C200 Kompressor / C200 CGI（2002–2007）', cert: 'MB 229.3 / 229.5', viscosity: '5W-30 / 0W-40 / 5W-40', capacity_l: 5.5, note: '容量 5.5 L 来自 W203 官方维修手册。正时链与链轮建议使用 MB 229.5 认证机油（中文维修资料的建议，非官方手册要求）。' },
    { engine: 'M271 EVO（涡轮直喷）', models: 'W204 C180 / C200 / C260 CGI（2010–2014）', cert: 'MB 229.5 / 229.51', viscosity: '5W-30 / 5W-40', capacity_l: 5.5, note: '涡轮直喷建议用低灰分 229.51 保护后处理系统；容量为常见值。' },
    { engine: 'M272（V6 2.5 / 3.0）', models: 'W203 C230/C280、W204 C230/C280/C300/C350', cert: 'MB 229.3 / 229.5', viscosity: '5W-30 / 0W-40 / 5W-40', capacity_l: 8.0, note: '容量为常见值，未取得官方来源核实。' },
    { engine: 'M112（V6 2.6 / 3.2）', models: 'W203 C240 / C320', cert: 'MB 229.3 / 229.5', viscosity: '0W-40 / 5W-40', capacity_l: 7.5, note: '' },
    { engine: 'M156（6.2L V8）', models: 'W204 C63 AMG', cert: 'MB 229.5', viscosity: '0W-40 / 5W-40', capacity_l: 8.5, note: '容量 8.5 L 来自奔驰官方档案（W204 C63 AMG 车型页）。自然吸气高转 V8，务必用足量高品质全合成。' },
    { engine: 'M274（2.0T）', models: 'W205 C180 / C200 / C260 / C300', cert: 'MB 229.5 / 229.51 / 229.52', viscosity: '5W-30（亦常用 0W-40 / 5W-40）', capacity_l: 7.0, note: '已核实：奔驰官方 W205 车主手册标注汽油机一律 7.0 L（含滤芯），车主实测放出 6.5 L，按 7 L 备油最稳妥。注意 W204 后期的 M274 1.6T（C180 2012+）容量为 6.0 L。' },
    { engine: 'M276（3.5L V6 自然吸气）', models: 'W204 C350 BlueEFFICIENCY（改款）', cert: 'MB 229.5', viscosity: '5W-30 / 0W-40', capacity_l: 6.5, note: '容量 6.5 L 来自奔驰官方档案。' },
    { engine: 'M276（3.0T V6）', models: 'W205 C400 / C43 AMG', cert: 'MB 229.5 / 229.52', viscosity: '5W-30 / 0W-40', capacity_l: 7.5, note: '容量为常见值，未取得官方来源核实。' },
    { engine: 'M177（4.0T V8）', models: 'W205 C63 / C63 S AMG', cert: 'MB 229.5', viscosity: '0W-40 / 5W-40', capacity_l: 9.0, note: 'AMG 高性能机型，建议严格按周期更换。' },
    { engine: 'M254（2.0T + 48V ISG）', models: 'W206 C200 / C260 / C300', cert: 'MB 229.71 / 229.72（0W-20）；MB 229.61（0W-30）', viscosity: '0W-20（另有 0W-30 选项）', capacity_l: null, note: '已核实 M254 需使用 0W-20 全合成油（对应 MB 229.71/229.72）。容量未取得可靠来源，故留空。' },
    { engine: 'M139l（2.0T 高性能）', models: 'W206 C43 / C63 S E Performance', cert: 'MB 229.52', viscosity: '0W-40 / 5W-30', capacity_l: null, note: '高升功率机型，必须使用指定认证机油；容量未核实。' },
    { engine: 'OM651（2.1 CDI）', models: 'W204 C200 CDI / C220 CDI、W205 C200d / C250d', cert: 'MB 229.51 / 229.52', viscosity: '5W-30', capacity_l: null, note: '带 DPF 必须使用低灰分机油，否则会堵塞颗粒捕集器。' },
    { engine: 'OM654 / OM654M（2.0 CDI）', models: 'W205 / W206 C200d / C220d / C300d', cert: 'MB 229.51 / 229.52', viscosity: '5W-30', capacity_l: null, note: '带 DPF / SCR 必须使用低灰分机油。' }
  ],

  /* ======================================================================
     五、保养项目周期
     ====================================================================== */
  intervals: [
    { item: '机油 + 机油滤芯', interval: '1 年 / 1–1.5 万 km', note: '以 Assyst 系统提示为准；国内拥堵路况建议按 1 年或 1 万 km 保守执行。', price_cny: [600, 1500] },
    { item: '空气滤芯', interval: '2–4 万 km', note: '灰尘大的地区缩短到 1.5–2 万 km。属于可自行更换的项目。', price_cny: [120, 400] },
    { item: '空调滤芯', interval: '1–2 万 km / 1 年', note: '带活性炭的滤芯建议每年更换，梅雨季前更换效果最明显。', price_cny: [150, 500] },
    { item: '燃油滤芯', interval: '4–6 万 km', note: '部分车型为油箱内置式（更换周期可延长至 8 万 km 以上），工程量与价格差异大。', price_cny: [400, 2000] },
    { item: '火花塞', interval: '涡轮机 4–6 万 km / 自然吸气 6–8 万 km', note: '涡轮直喷发动机周期明显更短，必须按发动机代号选型号。', price_cny: [400, 1200] },
    { item: '刹车油', interval: '2 年', note: '吸水后沸点下降，是成本最低的安全项目，不要拖。', price_cny: [200, 600] },
    { item: '刹车片（前轴）', interval: '3–5 万 km（视驾驶习惯）', note: '厚度低于 3 mm 必须更换。', price_cny: [600, 2500] },
    { item: '刹车片（后轴）', interval: '5–8 万 km', note: '后片寿命通常长于前片。', price_cny: [500, 2000] },
    { item: '刹车盘', interval: '6–10 万 km', note: '换盘应同换片；盘面低于最小厚度或有沟槽、抖动时更换。', price_cny: [1200, 5000] },
    { item: '变速箱油', interval: '6–8 万 km（官方标称终身免维护）', note: '强烈建议更换，尤其是拥堵路况多的车。注意 722.9 分两阶段：2010-06 之前用 MB 236.14，之后的 7G-TRONIC PLUS 用 MB 236.15；9G（725.0）用 MB 236.17。四者互不通用。', price_cny: [1500, 4500] },
    { item: '冷却液', interval: '5 年 / 15 万 km', note: '长效冷却液；缺液时须用同规格补充，不要加水。', price_cny: [400, 1200] },
    { item: '正时链条', interval: '免维护（建议 15–20 万 km 检查）', note: '出现冷启动异响应立即检查，跳齿会顶气门造成大修。', price_cny: [3000, 12000] },
    { item: '蓄电池', interval: '4–6 年', note: '带启停的车型为 AGM 电池，价格明显高于普通电池；更换后部分车型需注册。', price_cny: [600, 2500] },
    { item: '雨刮片', interval: '1 年', note: '可自行更换。', price_cny: [100, 400] },
    { item: '轮胎', interval: '5–6 年或磨损至 1.6 mm', note: '同时关注生产日期（DOT 编码），橡胶老化与磨损同样重要。', price_cny: [2000, 8000] }
  ],

  /* ======================================================================
     六、机油品牌与价格（中国市场，均为实际抓取到的报价，价格随渠道与促销波动）
     ====================================================================== */
  oils: [
    { brand: '美孚', product: 'Mobil 1 ESP 5W-30 C3 SN 4L', viscosity: '5W-30', cert: 'ACEA C3；对应 MB 229.31 / 229.51 级别', volume_l: 4, price_cny: 222.56, price_per_l: 55.64, channel: '京东全球购', note: '2019-04 促销价，含税包邮；时间较早，仅作量级参考。' },
    { brand: '美孚', product: '美孚 1 号 金美孚 SN 0W-40 1L（4S 升级加价项）', viscosity: '0W-40', cert: 'MB 229.5 级', volume_l: 1, price_cny: 328, price_per_l: 328, channel: '奔驰 4S 店（升级补差价）', note: '4S 小保养 958 元，升级金美孚需额外加 328 元差价。' },
    { brand: '壳牌', product: 'Shell Helix Ultra 超凡喜力 2 代 5W-30 SP GF-6A 4L', viscosity: '5W-30', cert: 'API SP / GF-6A（非 MB 认证版本，购买需核对标签）', volume_l: 4, price_cny: 165.82, price_per_l: 41.46, channel: '京东自营', note: '2026-10 活动价，叠加补贴与晒单返豆后的到手价。' },
    { brand: '壳牌', product: 'Shell Helix Ultra 超凡喜力 0W-20 C5 SP 4L', viscosity: '0W-20', cert: 'ACEA C5（对应 MB 229.71 / 229.72 方向）', volume_l: 4, price_cny: 209, price_per_l: 52.25, channel: '京东', note: '价格来自收录页摘要，可用于判断 0W-20 的价格量级。' },
    { brand: '福斯', product: 'Fuchs Titan GT1 PRO C-3 5W-30 4L', viscosity: '5W-30', cert: 'ACEA C3（对应 MB 229.51 / 229.52 方向）', volume_l: 4, price_cny: 269, price_per_l: 67.25, channel: '京东', note: '2015-08 促销价，用券后 239 元，时间较早。' },
    { brand: '福斯', product: '福斯 泰坦 GT1 极畅版 5W-30 SP C2/C3 4L', viscosity: '5W-30', cert: 'ACEA C2/C3；API SP', volume_l: 4, price_cny: 280.08, price_per_l: 70.02, channel: '京东养车', note: '' },
    { brand: 'Motul 摩特', product: 'Motul 8100 X-CLEAN EFE 5W-30 SP 5L', viscosity: '5W-30', cert: 'ACEA C2/C3；API SP（对应 MB 229.31 / 229.51 方向）', volume_l: 5, price_cny: 788, price_per_l: 157.6, channel: '京东', note: '单价明显高于其他品牌，属性能取向产品。' },
    { brand: '长城（中石化）', product: '金吉星 J700 SP/GF-6 5W-30 全合成 4L', viscosity: '5W-30', cert: 'API SP / GF-6（美亚系规格，非 MB 认证）', volume_l: 4, price_cny: 122.64, price_per_l: 30.66, channel: '京东自营', note: '2023-06 活动价，需买 2 件。注意非 MB 认证，奔驰车需自行核对标签。' },
    { brand: '昆仑（中石油）', product: '天润 KR8 PLUS 5W-30 SP/C3 全合成 4L', viscosity: '5W-30', cert: 'MB-Approval 229.53 / 229.51 / 229.31；ACEA C3/C2；API SP', volume_l: 4, price_cny: 169, price_per_l: 42.25, channel: '易单网（京东商品页镜像）', note: '页面明码标价。国产油中少见的带正式 MB-Approval 的产品，性价比突出。' },
    { brand: '嘉实多', product: 'Castrol 极护 C3 5W-30 4L', viscosity: '5W-30', cert: 'ACEA C3；VW 504 00 / 507 00（对应 MB 229.51 方向）', volume_l: 4, price_cny: null, price_per_l: null, channel: '中驰车福汽配商城', note: '页面价格为「会员可见」，未登录无法获取，故留空。' }
  ],

  /* ======================================================================
     七、滤芯
     ====================================================================== */
  filters: [
    {
      item: '空气滤芯（M271）', oem_part_no: 'A2710940304', oem_price_cny: null,
      aftermarket: [
        { brand: '马勒', part_no: 'LX3976', price_cny: null },
        { brand: '马勒', part_no: 'LX2813', price_cny: null },
        { brand: '曼牌', part_no: 'C3210', price_cny: null },
        { brand: '博世', part_no: 'F026400134', price_cny: null }
      ],
      note: '适用 W204 C 级 2008–2015 1.8T。汇配页面标注马勒 4S 店参考价 221.16 元（4S 价，非电商零售价）；电商零售价本轮未取到。'
    },
    {
      item: '空气滤芯（M274）', oem_part_no: 'A2740940004', oem_price_cny: null,
      aftermarket: [
        { brand: '曼牌', part_no: 'C25114', price_cny: null },
        { brand: '曼牌', part_no: 'C28004（对应 A2740940104）', price_cny: null },
        { brand: '马勒', part_no: 'LX3811', price_cny: null }
      ],
      note: '适用 W205 C200/C260/C300 2.0T。曼牌 C25114 尺寸 243×178×58 mm；价格未取到。'
    },
    {
      item: '机油滤芯（M271 / M272）', oem_part_no: 'A2711800009（亦见 2711800109）', oem_price_cny: null,
      aftermarket: [
        { brand: '曼牌', part_no: 'HU 718/5 x', price_cny: null },
        { brand: '曼牌', part_no: 'HU 711/6 Z', price_cny: null }
      ],
      note: '适用 W203、W204 C180/C200/C230/C280/C300；价格未取到。'
    },
    {
      item: '机油滤芯（M274）', oem_part_no: 'A2741800009（待核）', oem_price_cny: null,
      aftermarket: [
        { brand: '曼牌', part_no: 'HU 7020 z', price_cny: null },
        { brand: '凤凰', part_no: '25005（国产，车主实装）', price_cny: null }
      ],
      note: '适用 W205 C200/C260/C300。汽车之家车主实装凤凰 25005（含 3 个密封圈）；人民币零售价未取到。'
    },
    {
      item: '空调滤芯', oem_part_no: 'A2058350147', oem_price_cny: null,
      aftermarket: [
        { brand: '曼牌', part_no: 'CUK 25007（活性炭）', price_cny: 75 },
        { brand: '曼牌', part_no: 'FP 26 023（活性炭 / 抗过敏）', price_cny: null }
      ],
      note: '适用 W205 / X253 / W213 等；W205 为内外双滤，需买两件。曼牌 CUK25007 曾 75 元促销，参与满 200-100 后约 37.5 元/个。'
    },
    {
      item: '燃油滤芯（W203，外置）', oem_part_no: null, oem_price_cny: 730,
      aftermarket: [],
      note: 'W203 的汽油滤为外置式，可单独更换，4S 套餐价约 730 元（人民币，来源为北京 4S 报价明细），周期 12 万 km 或 4 年；柴油机为 6 万 km 或 4 年。原厂零件号未核实。'
    },
    {
      item: '燃油滤芯（W204 及以后，内置）', oem_part_no: null, oem_price_cny: null, aftermarket: [],
      note: '内置式（与油泵总成一体），更换工程量与价格高得多，4S 参考价约 2500–3200 元。本轮未取到可靠的原厂零件号与第三方报价。'
    },
    {
      item: '空调滤芯（W203，内外双滤）', oem_part_no: null, oem_price_cny: 1359,
      aftermarket: [],
      note: '人民币，原厂内部空调滤清器套餐价（来源同上报价明细），同来源列外部滤清器套餐 392 元。W203 分内部与外部两个滤芯；配套品牌合计约 100–300 元，自己换能省一大半。原厂零件号未核实。'
    },
    {
      item: '转向助力油（MB 236.3 / ATF D）', oem_part_no: null, oem_price_cny: 303,
      aftermarket: [],
      note: 'W203 助力油容量约 1 L，4S 保养套餐价约 303 元（人民币）；按检查结果更换。MB 236.3 规格来自 W203 官方维修手册。'
    },
    {
      item: '防冻液（MB Q1 03 0002 / Glysantin G48）', oem_part_no: null, oem_price_cny: 753,
      aftermarket: [],
      note: 'W203 4S 套餐价约 753 元（人民币），周期 25 万 km 或 15 年。容量：M111 8.5 L、M271 7.5 L、M112 10.5 L、OM611 11.9 L、OM612 12.4 L。规格来自官方维修手册。'
    },
    {
      item: '空气滤芯保养套餐（W203 M271）', oem_part_no: null, oem_price_cny: 323,
      aftermarket: [],
      note: '人民币，原厂套餐价（来源同上），周期 10 万 km 或 4 年。更换需拆 6 颗 T25 Torx 螺钉（官方手册）。原厂零件号未核实。'
    },
    {
      item: '火花塞保养套餐（W203 M271）', oem_part_no: null, oem_price_cny: 641,
      aftermarket: [
        { brand: 'Bosch', part_no: 'F6MPP（M271 1.8L，官方手册指定）', price_cny: null },
        { brand: 'Bosch', part_no: 'F7DPP332（2.0/2.3L 与 2.6/3.2L 非 AMG，间隙 1.0 mm）', price_cny: null },
        { brand: 'NGK', part_no: 'IFR6D-10（间隙 0.8 mm）', price_cny: null }
      ],
      note: '人民币，原厂火花塞保养套餐价（来源同上），周期 6–9 万 km 或 4 年，拧紧力矩 25 N·m（M271）/ 28 N·m（其他）。型号来自 W203 官方维修手册。'
    }
  ],

  /* ======================================================================
     八、火花塞
     ====================================================================== */
  sparkPlugs: [
    { engine: 'M274', brand: 'NGK', part_no: 'SILZKFR8D7S / 90654（铱铂金，4 支装）', price_cny: 430, qty: 4, interval_km: null, note: '京东四支装实付价（2023-12），标题明确适用奔驰 C180/C200 等。' },
    { engine: 'M274', brand: 'NGK', part_no: '90654（单支，对应 SILZKFR8D7S）', price_cny: null, qty: 1, interval_km: null, note: '俄配件站确认适配 W205 C200/C250/C350，该站无人民币价格。' },
    { engine: '多款（含 C 级）', brand: '奔驰原厂', part_no: 'A0041596803', price_cny: 15, qty: 1, interval_km: null, note: '汽配人网批发价 15 元/只（2021 年上架），属汽配批发价；4S 单支通常在 100 元以上。' },
    { engine: 'M274 / M254（工时）', brand: '修理厂工时', part_no: null, price_cny: 80, qty: null, interval_km: null, note: '汽车之家 W205 车主实测：换火花塞工时 80 元。' },
    { engine: 'M254（W206 C260L）', brand: '4S 参考', part_no: null, price_cny: 800, qty: null, interval_km: 40000, note: '新浪汽车：每 4 万公里更换火花塞约 800 元。另有来源称 2 万公里、1500–2000 元，两者冲突，以随车保养手册为准。' },
    { engine: 'M271（1.8L，W203 / W204）', brand: 'Bosch', part_no: 'F6MPP', price_cny: 500, qty: 4, interval_km: 75000, note: 'W203 原厂维修手册指定型号之一；4S 火花塞保养套餐约 400–641 元（四支）。周期 6–9 万 km 或 4 年，拧紧力矩 25 N·m。' },
    { engine: 'M111 / M112（2.0 / 2.6 / 3.2L）', brand: 'Bosch / NGK', part_no: 'F7DPP332（间隙 1.0 mm）或 NGK IFR6D-10（间隙 0.8 mm）', price_cny: null, qty: 4, interval_km: 100000, note: 'W203 原厂维修手册指定型号；周期 9–11 万 km 或 4 年，拧紧力矩 28 N·m。C32 AMG 同用 F7DPP332。' }
  ],

  /* ======================================================================
     九、刹车片与刹车盘
     ====================================================================== */
  brakes: [
    { position: '前', brand: '奔驰原厂', part_no: 'A0004208100（同族 0084201920 / 0004208000）', price_cny: null, interval: '厚度 <3 mm 或报警时', note: '汇配平台确认用于 W205 C300、W253 GLC 等前轴；平台未显示价格。' },
    { position: '前', brand: 'ATE', part_no: '13.0460-4883.2 / 13.0470-4883.2 / 13.0466-4883.2', price_cny: null, interval: '同上', note: '原厂件的通用替换号，德系原厂配套大户。' },
    { position: '前', brand: '泰明顿 Textar', part_no: '2206103 / 2206101', price_cny: null, interval: '同上', note: '原厂代工厂之一，品质与原厂接近。' },
    { position: '前', brand: '布雷博 Brembo', part_no: 'P50145 / P50145N / P 50 120', price_cny: null, interval: '同上', note: '制动性能标杆，AMG 车型原厂配套。' },
    { position: '前', brand: '菲罗多 / 天合 / 博世', part_no: 'FDB4608 / GDB2081 / 0986T11248', price_cny: null, interval: '同上', note: '同价位替代选择；耐磨士 1604.00、雷贝斯托 PGD1796M、海拉 8DB 355 037-971 等亦在替换清单中。' },
    { position: '后', brand: '布雷博 Brembo', part_no: 'P50122N（对应原厂 000 420 86 03）', price_cny: null, interval: '同上', note: '汽车之家 W205 车主 2023 年实装记录。' },
    { position: '前', brand: '奔驰原厂（含感应线）', part_no: null, price_cny: 400, interval: '同上', note: '淘宝渠道，车主论坛口径「400 左右包含保险线」；途虎适配的多为非原厂片。' },
    { position: '前 / 后', brand: '刹车盘（多品牌）', part_no: '布雷博 09.D526.13（W205 前盘）', price_cny: null, interval: '6–10 万 km', note: '有人民币报价的中文配件站本轮返回 403 验证，海外站无人民币价，故留空而未编造。' }
  ],

  /* ======================================================================
     十、变速箱油（认证互不通用，务必按变速箱型号选油）
     ====================================================================== */
  transmissionFluids: [
    {
      trans: '722.6（5G-TRONIC，5 速自动）', spec: 'MB 236.10（236.12 / 236.14 亦可）', capacity_l: 8.0, oem_price_cny: null,
      alternatives: [
        { brand: 'Fuchs', product: 'Titan ATF 4134', price_cny: 100, volume_l: 1 },
        { brand: 'Shell', product: 'Shell ATF 134', price_cny: 80, volume_l: 1 },
        { brand: 'Liqui Moly 力魔', product: 'Top Tec ATF 1600', price_cny: 200, volume_l: 1 }
      ],
      note: '福斯中国官网明确 ATF 4134（MB-Approval 236.14）兼容旧规格 236.12，并「专门推荐给 5 速自动变速器 722.6」；即 236.10 / 236.12 / 236.14 在 722.6 上均可使用。'
    },
    {
      trans: '722.9（7G-TRONIC，早期，2010-06 之前）', spec: 'MB 236.14', capacity_l: 9.0, oem_price_cny: 250,
      alternatives: [
        { brand: '奔驰原厂', product: 'A0019896803（原厂 6803）', price_cny: 250, volume_l: 1 },
        { brand: 'Fuchs', product: 'Titan ATF 4134', price_cny: 100, volume_l: 1 },
        { brand: 'Mobil', product: 'Mobil ATF 134', price_cny: 23.22, volume_l: 1 }
      ],
      note: '重要更正：并非所有 722.9 都用 236.15。bevo.mercedes-benz.com 官方 PDF 明确 236.14 适用于 722.6 与 722.9，但不适用于 7G-TRONIC PLUS。原厂油 4S 约 250 元/L、淘宝约 100 元/L；美孚 134 为 18 L 装 418 元折算。'
    },
    {
      trans: '722.9（7G-TRONIC PLUS，2010-06 起）', spec: 'MB 236.15', capacity_l: null, oem_price_cny: null,
      alternatives: [
        { brand: 'Fuchs', product: 'Titan ATF 7134 FE', price_cny: null, volume_l: 1 }
      ],
      note: '福斯官网注明 7134 FE「只可适用于 MB 236.15，不可与其他规格 ATF 混合」，为 NAG II+ 初装油。'
    },
    {
      trans: '725.0（9G-TRONIC，9 速自动）', spec: 'MB 236.17（亦可用于要求 236.16 的变速箱）', capacity_l: 6, oem_price_cny: null,
      alternatives: [
        { brand: 'Shell', product: '壳牌施倍力 D971（与初装油同款，重力换油推荐）', price_cny: null, volume_l: 1 },
        { brand: 'Fuchs', product: 'Titan ATF 9134 FE', price_cny: null, volume_l: 1 }
      ],
      note: '重力换油（不换液力变矩器）约 6 L；连变矩器一起换约 9–10 L，4S 常规按 10 L 计价。车主实测：放出 5 升多，先加 5 L，行驶后再补 1 L。'
    }
  ],

  /* ======================================================================
     十一、刹车油
     ====================================================================== */
  brakeFluid: [
    { spec: 'DOT4', brand: '博世 Bosch', price_cny: 61.51, volume_l: 2, note: '京东 1L×2 瓶到手 61.51 元（约 30.8 元/L）；平衡回流沸点 ≥250 ℃、湿沸点 ≥160 ℃，周期 2 年或 4 万公里。' },
    { spec: 'DOT4 Plus（奔驰原厂 Blatt 331.0）', brand: '奔驰原厂', price_cny: null, volume_l: 1, note: '原厂件号 A0009890807 / A000989080711；俄站无人民币报价故留空。4S 更换约 400 元/次（含工时），自带油在修理店工时约 100 元。' },
    { spec: 'DOT4 / DOT5.1 替代', brand: '爱信 AISIN', price_cny: null, volume_l: 1, note: '汽车之家 W205 车主自带爱信 DOT5.1 更换，工时 100 元。' }
  ],

  /* ======================================================================
     十二、工时费与保养总价参考
     ====================================================================== */
  labour: [
    { type: '小保养（A 保：机油 + 机滤 + 工时）', channel: '4S 店（W205 C200L）', price_cny: [958, 1000], note: '4S 用原厂指定美孚 SN 5W-30（5L）+ 机滤 + 工时 958 元；W206 C260L 的 A 保约 1000 元。' },
    { type: '小保养（A 保）', channel: '4S 店（26 款 W206 C260L / W205 进口）', price_cny: [1200, 1500], note: '26 款 C260L 小保养单次 1200 元；W205 进口 C 级 A 保约 1500 元。' },
    { type: '大保养（B 保：A 保 + 空滤 + 空调滤）', channel: '4S 店', price_cny: [1245, 2800], note: 'W206 C260L 约 1800 元；W205 进口约 2800 元；易车口径大保养约 1245 元。' },
    { type: '保养套餐（逸蓝修养 3A+3B，覆盖 6 万 km）', channel: '4S 店', price_cny: [7000, 8000], note: '折算单次比散买节省 15%–20%。' },
    { type: '小保养（机油三滤套餐）', channel: '途虎 / 连锁', price_cny: [169, 407], note: '途虎机油三滤套餐 407 元（4S 同类约 880 元）；换机油含工时不超 200 元；单次小保养卡 169 元。' },
    { type: '大保养套餐（金美孚 5W-30 5L + 机滤 + 空滤 + 空调滤 + 工时）', channel: '京东养车', price_cny: [339, 476], note: '金美孚套装活动到手 476.1 元；银美套装 339 元。' },
    { type: '单项工时费', channel: '综合修理厂（W205 实测）', price_cny: [80, 150], note: '换机油 80 元、换火花塞 80 元、换刹车油 100 元、换后刹车片 150 元。' },
    { type: '9AT（725.0）变速箱油更换', channel: '4S 店', price_cny: [3200, 4900], note: '有星徽保养套餐不到 3200 元，无套餐 4900 元以上（含 10 L 油 + 油底壳，重力更换）。' },
    { type: '6 万公里大保养累计', channel: '4S 店（W206 C260L）', price_cny: [12000, 15000], note: '含变速箱油、防冻液等项目。' }
  ],

  /* ======================================================================
     十三、数据缺口记录（如实标注哪些数据没有拿到可靠来源）
     ====================================================================== */
  dataGaps: [
    'W203 / W204 / W206 的机油容量未取得可靠来源，相关字段留空或标注为「常见值」。',
    '机油滤芯与刹车盘的人民币零售价未取到：京东 / 天猫 / 途虎 / 苏宁商品页为 JS 渲染，比价站有滑块验证，alvadi.cn 等返回 403。',
    '燃油滤芯的原厂零件号与价格未取得可信来源。',
    'W206 的官方 17/18 寸逐项 ET、M254 官方机油加注量均因官方 PDF 与车主手册为 JS 渲染而无法抓取。',
    '品牌轮毂的螺栓座面（球面/锥面）除奔驰原厂前提外均无法从抓取页面确认，一律留空。'
  ]
};
