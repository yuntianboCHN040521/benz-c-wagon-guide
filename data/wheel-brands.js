/* ==========================================================================
   wheel-brands.js —— 品牌轮毂与 AMG 原厂轮毂数据库
   --------------------------------------------------------------------------
   数据来源：BBS / OZ Racing / RAYS 官网与授权经销商页面、JMS Fahrzeugteile、
             Blackhawk Japan、bbswheels.ru、Mercedes-Benz 官方配件站
             （originalteile.mercedes-benz.de）、reifen.com、ATS 官方 Gutachten。
   采集日期：2026-10。所有字段均取自实际抓取的页面，抓不到的字段一律为 null。
   汇率仅用于给出人民币量级参考（1 EUR ≈ 7.8 元，1 JPY ≈ 0.048 元）。
   10 个品牌 / 13 款 AMG 原厂轮毂。
   ========================================================================== */
(function () {
  'use strict';
  var D = window.CDATA || (window.CDATA = {});
  D.brands = [
    {
      "brand": "BBS",
      "country": "德国（BBS GmbH；另有独立运营的日本 BBS 株式会社）",
      "positioning": "高端锻造/铸造，F1 与整车厂 OEM 供应商",
      "models": [
        {
          "name": "CH-R",
          "process": "Flow Formed 旋压（bbswheels.ru 产品页明确写明采用 flow forming 工艺降低重量）",
          "sizes": [
            {
              "size": "8.5x18",
              "pcd": "5x112",
              "et": [
                47
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "数据源为检索结果标题（Amazon.sg 商品页），正文未解析"
            },
            {
              "size": "8.5x19",
              "pcd": "5x112",
              "et": [
                43
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "CH-R Nürburgring Edition 版本，ET43「nach Fahrzeugtyp」"
            },
            {
              "size": "9.5x19",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "检索结果标题（Amazon.sg）"
            },
            {
              "size": "9.0x20",
              "pcd": "5x112",
              "et": [
                25
              ],
              "cb_mm": 82,
              "weight_kg": null,
              "note": "需 82→66.6 变径环"
            },
            {
              "size": "10.5x20",
              "pcd": "5x112",
              "et": [
                25
              ],
              "cb_mm": 82,
              "weight_kg": null,
              "note": "需 82→66.6 变径环"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 527.52/只（含德国 19% 增值税，≈4115 元）",
          "price_note": "8.5x19 Nürburgring Edition：527.52 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile）；9.0x20：84,900 RUB/只（来源 bbswheels.ru）。均为原币种，未换算",
          "fitment_note": "CB 82mm，必须配 82→66.6 变径环并确认螺栓座；ET25 的 20 寸对 C 级车身外扩极大，属宽体/姿态取向"
        },
        {
          "name": "CH-R II",
          "process": null,
          "sizes": [
            {
              "size": "9.5x21",
              "pcd": "5x112",
              "et": [
                33
              ],
              "cb_mm": 82,
              "weight_kg": null,
              "note": "数据取自检索结果标题（bbswheels.ru 商品页 URL 与标题）；需 82→66.6 变径环"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得可靠报价",
          "fitment_note": "21 寸对 W205 需大幅缩胎并多半需改避震，仅姿态改装参考"
        },
        {
          "name": "CI-R",
          "process": null,
          "sizes": [
            {
              "size": "8.5x19",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": 82,
              "weight_kg": null,
              "note": "需 82→66.6 变径环（powerwerks.at 商品页标题：8,5x19 LK 5x112 ET45 NB 82,0）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 564.14/只（含德国 19% 增值税，≈4400 元）",
          "price_note": "564.14 EUR/只（含税，来源 powerwerks.at 商品页标题，正文未解析）",
          "fitment_note": "8.5x19 ET45 为 W205 前轮经典齐边规格；CB 82 需变径环"
        },
        {
          "name": "SR",
          "process": "低压铸造（bbswheels.ru 产品页：литья под низким давлением / Low pressure casting，并采用 BBS FEM 分析优化重量）",
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": 82,
              "weight_kg": 11.2,
              "note": "需 82→66.6 变径环；厂商标称最大载荷 750（bbswheels.ru 参数表）"
            }
          ],
          "load_rating": "750（bbswheels.ru 参数表标注「Макс. нагрузка 750」，单位未在页面写明，应为 kg）",
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得该规格可靠报价",
          "fitment_note": "铸造入门款，单只 11.2kg 偏重；8.0x18 ET45 可直接上 C200/C300 原厂胎（225/45R18 级）"
        },
        {
          "name": "CC-R",
          "process": null,
          "sizes": [
            {
              "size": "8.0x19",
              "pcd": "5x112",
              "et": [
                17
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "ET17 为深度外扩规格，C 级装车会明显出车体"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 611.78/只（含德国 19% 增值税，≈4772 元）",
          "price_note": "611.78 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile，已抓取产品页）",
          "fitment_note": "8.0x19 ET17 在 C 级上远超出原厂轮距，通常需宽体或负外倾，非原厂直装方案"
        },
        {
          "name": "XR",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                44
              ],
              "cb_mm": 82,
              "weight_kg": null,
              "note": "需 82→66.6 变径环；数据取自检索结果标题（bbswheels.ru / bulletproofautomotive 商品页）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得可靠报价",
          "fitment_note": "8.0x18 ET44 接近 W205 原厂 18 寸 ET44，属稳妥直装规格"
        }
      ]
    },
    {
      "brand": "OZ Racing",
      "country": "意大利",
      "positioning": "赛车血统，勒芒/WRC 供应商；铸造为主+HLT 旋压，另有镁合金限量锻造",
      "models": [
        {
          "name": "Ultraleggera HLT",
          "process": "低压铸造 + 热处理 + HLT 旋压（OZ 官网 Product Details 原文：Low pressure casting process + Heat Treatment + HLT；材质 Al Si 7 Mg）",
          "sizes": [
            {
              "size": "8.0x19",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": 9.17,
              "note": "重量取自 OZ 官网官方 Weight table"
            },
            {
              "size": "8.5x19",
              "pcd": "5x112",
              "et": [
                47
              ],
              "cb_mm": null,
              "weight_kg": 10.5,
              "note": "JMS 标注 Gewicht ca. 10,5 kg；Traglast/axle load 625 KG"
            },
            {
              "size": "9.0x19",
              "pcd": "5x112",
              "et": null,
              "cb_mm": null,
              "weight_kg": null,
              "note": "JMS 在售规格（产品页标题 9x19 5x112），ET 未在抓取页面写明"
            },
            {
              "size": "11.0x19",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": 11.29,
              "note": "重量取自 OZ 官网官方 Weight table"
            }
          ],
          "load_rating": "625（JMS 对 8.5x19 标注 Traglast/axle load: 625 KG，原文如此，可能为单轮载荷）",
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 587.54/只（含德国 19% 增值税，≈4583 元）",
          "price_note": "8.5x19 ET47：587.54 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile，已抓取产品页）",
          "fitment_note": "8.0x19 ET45 单只仅 9.17kg，是 C 级 19 寸里很轻的选择；OZ 常见 CB 大于 66.6，装车需确认变径环"
        },
        {
          "name": "Superturismo LM",
          "process": "低压铸造 + 热处理（OZ 官网原文：Low pressure casting process + Heat Treatment + HLT (21\")；材质 Al Si 7 Mg）",
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": 10.7,
              "note": "JMS 标注 Gewicht ca. 10,7 kg；Traglast/axle load 690 KG"
            }
          ],
          "load_rating": "690（JMS 原文 Traglast/axle load: 690 KG）",
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 386.69/只（含德国 19% 增值税，≈3016 元）",
          "price_note": "8.0x18 ET45 5x112：386.69 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile，已抓取产品页）",
          "fitment_note": "8.0x18 ET45 是 W205 最经典的直装规格之一，配 225/45R18 前轮齐边；铸造重量 10.7kg 偏重"
        },
        {
          "name": "Superturismo GT",
          "process": "低压铸造（同系列工艺，OZ 官网未单列该型号工艺页）",
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                50
              ],
              "cb_mm": null,
              "weight_kg": 11.5,
              "note": "JMS 原文 Weight about 11,5 kg，8x18 offset 50 5x112"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 339.36/只（含德国 19% 增值税，≈2647 元）",
          "price_note": "339.36 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile，已抓取英文产品页）",
          "fitment_note": "ET50 比原厂更内缩，适合原厂姿态；11.5kg 属同价位偏重"
        },
        {
          "name": "Leggera HLT",
          "process": null,
          "sizes": [
            {
              "size": "8.0x19",
              "pcd": "5x112",
              "et": null,
              "cb_mm": null,
              "weight_kg": null,
              "note": "数据取自检索结果标题（eBay 商品页：FOR MERCEDES-BENZ CLASSE C 8X19 5X112）"
            },
            {
              "size": "7.5x17",
              "pcd": "5x112",
              "et": [
                35
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "数据取自检索结果标题（eBay.fr：Leggera HLT 7.5x17 ET35 Mercedes C-klasse SW 5x112）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得可靠报价",
          "fitment_note": "7.5x17 ET35 是冬季胎/小尺寸取向；8.0x19 用于 C 级需确认 ET 与变径环"
        },
        {
          "name": "Hyper GT HLT (I-Tech)",
          "process": "HLT 旋压（型号名称含 HLT）",
          "sizes": [
            {
              "size": "8.5x19",
              "pcd": "5x112",
              "et": [
                38
              ],
              "cb_mm": 75,
              "weight_kg": null,
              "note": "需 75→66.6 变径环；数据取自检索结果标题（tegiwa.com 商品页：19x8.5 ET38 5x112 Gloss Black 75mm CB）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得可靠报价",
          "fitment_note": "CB 75mm 必须配 75→66.6 变径环；ET38 相对原厂 ET44 外移 6mm"
        },
        {
          "name": "Ultraleggera（Sport 线）",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "数据取自检索结果标题（driftshop.com 商品页，该站抓取返回 403）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得可靠报价",
          "fitment_note": "与 Ultraleggera HLT 不同的产品线，同为 8.0x18 ET45 5x112"
        }
      ]
    },
    {
      "brand": "RAYS",
      "country": "日本",
      "positioning": "高端锻造（Volk Racing 全锻造）与铸造（Gram Lights）双线，JWL+R 认证",
      "models": [
        {
          "name": "Volk Racing ZE40",
          "process": "锻造（抓取到的官方规格文字：Construction method: Forged 1-piece wheel *Knurled；安全标准 JWL+R Spec 2）",
          "sizes": [
            {
              "size": "18x8.5J",
              "pcd": "5x112",
              "et": [
                44
              ],
              "cb_mm": 73.1,
              "weight_kg": null,
              "note": "FACE F1；需 73.1→66.6 变径环；钻径 29-15；货号 05918854435SZ"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "¥ 80515/只（含日本税，≈3865 元）",
          "price_note": "80,515 JPY/只（原价 112,200 JPY，来源 Blackhawk Japan 商品 JSON；价格含日本税，单只价）",
          "fitment_note": "CB 73.1 需变径环；18x8.5 ET44 在 W205 上接近齐边，是 RAYS 里最贴合 C 级的规格之一"
        },
        {
          "name": "Volk Racing TE37 Ultra Track Edition II",
          "process": "锻造（官方规格文字：Forged one-piece wheel (reverse rim) *Knurled；JWL+R Spec 2）",
          "sizes": [
            {
              "size": "19x9.5J",
              "pcd": "5x112",
              "et": [
                20
              ],
              "cb_mm": 66.6,
              "weight_kg": null,
              "note": "FACE F4；CB 66.6 直上无需变径环；钻径 29-15；货号 05029952020BC"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "¥ 95512/只（含日本税，≈4585 元）",
          "price_note": "95,512 JPY/只（原价 133,100 JPY，来源 Blackhawk Japan 商品 JSON）",
          "fitment_note": "官方备注该 5H-PCD112 系列适配奔驰 GL/GLS/GLE/V 级等，C 级未列入官方适配清单；ET20 对 C 级为极限外扩（tuner size），需宽体/大负倾角"
        },
        {
          "name": "Volk Racing TE37 SAGA S-plus",
          "process": "锻造（同 TE37 系列工艺）",
          "sizes": [
            {
              "size": "20x10.5J",
              "pcd": "5x112",
              "et": [
                15
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "货号 06440051520GB；厂方规格表中 Compatible Car/Engine/Product Description 为空"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "¥ 122351/只（含日本税，≈5873 元）",
          "price_note": "122,351 JPY/只（原价 170,500 JPY，来源 Blackhawk Japan suggest.json 接口）",
          "fitment_note": "20x10.5 ET15 属极端宽体规格，C 级原厂车身无法直装"
        },
        {
          "name": "Gram Lights 57CR SPEC D",
          "process": "铸造（官方规格文字：Construction: Cast 1-piece wheel *Knurled；JWL+R Spec 1）",
          "sizes": [
            {
              "size": "19x10.5J",
              "pcd": "5x112",
              "et": [
                25
              ],
              "cb_mm": 73.1,
              "weight_kg": null,
              "note": "需 73.1→66.6 变径环；货号 58389053535AZZ。注意 18 寸 5x112 规格未在抓取数据中出现"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "¥ 54465/只（含日本税，≈2614 元）",
          "price_note": "54,465 JPY/只（原价 75,900 JPY，来源 Blackhawk Japan suggest.json 接口）",
          "fitment_note": "官方明确列出 5H-PCD112 全尺寸不适用于部分奔驰车型（GL/GLS/GLE/V 级等），C 级未列入；19x10.5 ET25 为宽体规格"
        },
        {
          "name": "Gram Lights 57NR",
          "process": "锻造（官方规格文字：Construction: Forged one-piece wheel；JWL+R Spec 1）",
          "sizes": [
            {
              "size": "18x7.5J",
              "pcd": "5x112",
              "et": [
                42
              ],
              "cb_mm": 66.6,
              "weight_kg": null,
              "note": "FACE F1；CB 66.6 直上；货号 584187542206NJ"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "¥ 43414/只（含日本税，≈2084 元）",
          "price_note": "43,414 JPY/只（原价 60,500 JPY，来源 Blackhawkjapan suggest.json 接口）",
          "fitment_note": "18x7.5 ET42 + CB66.6 是本次抓到的 RAYS 中最「原厂直装」的规格；锻造且价格最低，C 级实用性最好"
        }
      ]
    },
    {
      "brand": "Enkei",
      "country": "日本",
      "positioning": "MAT 旋压/铸造，OEM 与赛事供应",
      "models": [
        {
          "name": "PF01",
          "process": null,
          "sizes": [],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": null,
          "fitment_note": "未能取得 5x112 规格官方数据"
        },
        {
          "name": "RS05RR",
          "process": null,
          "sizes": [],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": null,
          "fitment_note": "未能取得 5x112 规格官方数据"
        },
        {
          "name": "TS-10",
          "process": null,
          "sizes": [],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": null,
          "fitment_note": "未能取得 5x112 规格官方数据"
        },
        {
          "name": "Racing RPF1",
          "process": null,
          "sizes": [],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": null,
          "fitment_note": "抓到的在售规格均为 5x114.3（17x7.5J +48，BORE φ73，7.1kg），未出现 5x112"
        }
      ]
    },
    {
      "brand": "WORK",
      "country": "日本",
      "positioning": "两片/三片式定制为主，JDM 姿态改装代表",
      "models": [
        {
          "name": "Gnosis GR203",
          "process": "2 片式（JMS 商品数据原文：2-teilig nur Motorsport ohne Zulassung / 两片式，仅赛道用无 TÜV 认证）",
          "sizes": [
            {
              "size": "8.5x19",
              "pcd": "5x112",
              "et": "定制范围 -16 到 67 mm（JMS 原文 Einpresstiefe: -16-67 mm）",
              "cb_mm": null,
              "weight_kg": null,
              "note": "WORK 日本定制生产，JMS 说明下单需 75% 预付定金，交货期长"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 1107.22/只（含德国 19% 增值税，≈8636 元）",
          "price_note": "1,107.22 EUR/只（含 19% 增值税，来源 JMS Fahrzeugteile，已抓取产品页）",
          "fitment_note": "ET 可完全定制，理论上可做出 C 级任意齐边方案；但无 TÜV/ECE 认证，中国上路年检有风险，且单只超 1100 欧"
        },
        {
          "name": "Emotion CR Kiwami",
          "process": null,
          "sizes": [],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": null,
          "fitment_note": "抓到的在售规格均为 5x100 / 5x114.3（如 Emotion T7R 18x8.5J +45/+38 5H-114.3，中心孔 73.3，重量 9.7kg），未取得 5x112 规格数据"
        }
      ]
    },
    {
      "brand": "MoTec",
      "country": "德国",
      "positioning": "德国轮圈品牌，走性价比改装路线",
      "models": [
        {
          "name": "MCR3-Hyper Mesh",
          "process": null,
          "sizes": [
            {
              "size": "8.5Jx19",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "货号 MCR3-8519 MB ET45 STEELGREY"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": "€ 309.6/只（含德国 19% 增值税，≈2415 元）",
          "price_note": "309.60 EUR/只（原价 344.01，含 19% 增值税，来源 JMS Fahrzeugteile，已抓取产品页）",
          "fitment_note": "8.5x19 ET45 5x112 是德国品牌里价格最低的 C 级方案之一；CB 未在抓取页面写明，下单需确认"
        }
      ]
    },
    {
      "brand": "AEZ",
      "country": "德国/奥地利（ALCAR Wheels GmbH）",
      "positioning": "欧洲中端铸造轮圈，ECE 认证齐全",
      "models": [
        {
          "name": "Porto black",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                30
              ],
              "cb_mm": null,
              "weight_kg": null,
              "note": "reifen.com 技术规格页明确 max. wheel load 780 kg；冬季适用；厂商件号 APRG8KA30E，EAN 4026569045203"
            }
          ],
          "load_rating": "780 kg（reifen.com 技术规格栏「max. wheel load」）",
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "抓取页面显示该规格在瑞士站「Not available」，未显示价格",
          "fitment_note": "8.0x18 ET30 比 C 级原厂 ET44 外移 14mm，装车大概率需要滚边或换更窄胎，非直装规格"
        }
      ]
    },
    {
      "brand": "Rial",
      "country": "德国",
      "positioning": "德国老牌铸造轮圈，OEM 与替换市场",
      "models": [
        {
          "name": "X10",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                30
              ],
              "cb_mm": 66.5,
              "weight_kg": null,
              "note": "数据取自检索结果标题（catalog.onliner.by 商品页：Rial X10 18x8 5x112 DIA 66.5mm ET 30mm Polar Silver）；CB 66.5 与奔驰 66.6 基本直配"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得价格（该页正文未成功解析）",
          "fitment_note": "CB 66.5 是本次抓到的欧洲品牌中最贴近奔驰 66.6 中心孔的值，几乎不需要变径环；但 ET30 偏外扩"
        }
      ]
    },
    {
      "brand": "ATS",
      "country": "德国",
      "positioning": "德国 ATS Leichtmetallräder，赛事与街道",
      "models": [
        {
          "name": "Racelight (RL858)",
          "process": "旋压/轻量化铸造（型号命名 Racelight）",
          "sizes": [
            {
              "size": "8.5x18",
              "pcd": "5x112",
              "et": [
                38
              ],
              "cb_mm": 66.5,
              "weight_kg": null,
              "note": "数据取自 ATS 官方 Gutachten PDF 的文件路径与标题（RL858_5x112_ET38_Y7_66,5.pdf）；PDF 本身无法解析正文"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得价格",
          "fitment_note": "CB 66.5 直配奔驰；ET38 比原厂外移 6mm"
        },
        {
          "name": "Radial (RD858)",
          "process": null,
          "sizes": [
            {
              "size": "8.5x18",
              "pcd": "5x112",
              "et": [
                50
              ],
              "cb_mm": 66.6,
              "weight_kg": null,
              "note": "数据取自 ATS 官方 Gutachten PDF 文件路径（RD858_5x112_ET50_M1_66,6.pdf）；PDF 正文无法解析"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得价格",
          "fitment_note": "CB 66.6 完全直配；ET50 偏内缩，属原厂替换取向"
        },
        {
          "name": "Twister (TS808)",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                50
              ],
              "cb_mm": 66.6,
              "weight_kg": null,
              "note": "数据取自 ATS 官方 Gutachten PDF 文件路径（TS808_5x112_ET50_B7_66,6）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得价格",
          "fitment_note": "CB 66.6 直配，ET50 原厂姿态"
        }
      ]
    },
    {
      "brand": "Momo",
      "country": "意大利",
      "positioning": "意大利改装品牌，轮圈为代工铸造线",
      "models": [
        {
          "name": "Revenge EVO 2.0",
          "process": null,
          "sizes": [
            {
              "size": "8.0x18",
              "pcd": "5x112",
              "et": [
                45
              ],
              "cb_mm": 72.3,
              "weight_kg": null,
              "note": "需 72.3→66.6 变径环；数据取自检索结果标题（blast.lv 商品页：Momo REVENGE EVO 2.0 Matt Black Polished 8x18 5x112 ET45 CB72,3）"
            }
          ],
          "load_rating": null,
          "bolt_seat": null,
          "price_cny": null,
          "price_display": null,
          "price_note": "未取得价格（blast.lv 正文未成功解析）",
          "fitment_note": "8.0x18 ET45 5x112 是 C 级标准规格，仅需 72.3→66.6 变径环"
        }
      ]
    }
  ];

  D.amgOem = [
    {
      "part_no": "A20540111007X21",
      "name": "AMG 5 辐 18 寸（titangrau 钛灰）",
      "size": "7.5J x 18",
      "et": 44,
      "tyre": null,
      "models": "W205/S205 C 级 AMG 18 寸选装",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: originalteile.mercedes-benz.de"
    },
    {
      "part_no": "A20540188007X45",
      "name": "5 辐 18 寸（vanadiumsilber 钒银，漆面）",
      "size": "7.5J x 18",
      "et": 44,
      "tyre": null,
      "models": "W205/S205 C 级 18 寸",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: originalteile.mercedes-benz.de（非 AMG 徽标款）"
    },
    {
      "part_no": "A20540196007X44",
      "name": "AMG 5 双辐 18 寸（tremolit-metallic）",
      "size": "8.5J x 18",
      "et": 49,
      "tyre": null,
      "models": "W205/S205 C 级（后轮规格）",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: originalteile.mercedes-benz.de"
    },
    {
      "part_no": "A20540118007X71",
      "name": "AMG 锻造十字辐（Kreuzspeichen）19 寸，轮辋抛光，schwarz matt（Edition 1 同款设计）",
      "size": "9.5J x 19",
      "et": 56,
      "tyre": null,
      "models": "C63/C63S W205 后轮（锻造 Schmiederad）",
      "price_cny": null,
      "weight_kg": null,
      "process": "锻造（Schmiederad）",
      "note": "source: originalteile.mercedes-benz.de；德国改装商 kunzmann.de 有 W205 19 寸锻造套装在售"
    },
    {
      "part_no": "A20540118009Y15",
      "name": "AMG 锻造 19 寸（锻造 Y 辐，9Y15 颜色代码，后轮）",
      "size": "19",
      "et": null,
      "tyre": null,
      "models": "C63 AMG S W205（mbparts 归类为 Rear）",
      "price_cny": null,
      "weight_kg": null,
      "process": "锻造",
      "note": "source: mbparts.mbusa.com 商品标题（页面被 Cloudflare 拦截，未取到价格）"
    },
    {
      "part_no": "A20540108017Y51",
      "name": "AMG 5 双辐 19 寸",
      "size": "19",
      "et": null,
      "tyre": null,
      "models": "C63 AMG W205",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mbparts.mbusa.com 商品标题"
    },
    {
      "part_no": "A20540121017Y51",
      "name": "AMG 5 辐 19x10（Wheel Alloy 19x10 5-spoke）",
      "size": "10.0x19",
      "et": null,
      "tyre": null,
      "models": "W205 C63/C63S 后轮",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mbparts.mbusa.com 商品标题（标题含 19x10）"
    },
    {
      "part_no": "A20540165007X23",
      "name": "AMG 5 双辐 19x8.5（Wheel Alloy 19x8.5 5-double spoke，黑色）",
      "size": "8.5x19",
      "et": null,
      "tyre": null,
      "models": "W205 C63 AMG 前轮（mbparts 归类 front-suspension）",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mbparts.mbusa.com 商品标题（标题含 19x8.5）"
    },
    {
      "part_no": "A20540166007X71",
      "name": "AMG 多辐（Multi-Spoke）19 寸",
      "size": "19",
      "et": null,
      "tyre": null,
      "models": "W205 C63 AMG",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mbparts.mbusa.com 商品标题"
    },
    {
      "part_no": "A2044014102",
      "name": "AMG 18 寸（W204/S204/C204 前轮）",
      "size": "18",
      "et": null,
      "tyre": null,
      "models": "W204/S204/C204 C 级（AMG 18 寸套装前轮）",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: or24.de 商品页标题（AMG Mercedes Benz C-Class W204 S204 C204 18 inch rims A2044014102 A2044014202）"
    },
    {
      "part_no": "A2044014202",
      "name": "AMG 18 寸（W204 C63 后轮）",
      "size": "18",
      "et": null,
      "tyre": null,
      "models": "W204 C63 AMG 后轮",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: or24.de 商品页标题；eBay 商品标注 Genuine MERCEDES BENZ C Class 18\" AMG W204 Rear Alloy Wheel Rim A2044014202"
    },
    {
      "part_no": "A204401410280",
      "name": "Wheel Alloy（W204 原厂铝合金轮毂）",
      "size": null,
      "et": null,
      "tyre": null,
      "models": "W204 车系",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mbparts.mbusa.com 商品标题"
    },
    {
      "part_no": "A20540125027X45",
      "name": "原厂 16 寸轮毂（非 AMG，作参考）",
      "size": "6.5J x 16",
      "et": 38,
      "tyre": null,
      "models": "C-Klasse Kombi BR205（奔驰官方轮毂/轮胎组合表）",
      "price_cny": null,
      "weight_kg": null,
      "process": null,
      "note": "source: mercedes-benz.de 官方 Rad-und-Reifenkombinationen PDF（PDF 正文未解析，数据取自检索结果中该 PDF 的表格片段）"
    }
  ];

  D.brandNotes = [
    "Enkei：官方 enkei.com 产品页为 JS 动态渲染，抓取仅返回标题；Enkei 日本/美国 5x112 规格表以 PDF 形式发布，本工具不支持解析 PDF。Blackhawk Japan 上在售的 Enkei 规格（PF01 18x8J、Racing RPF1 17x7.5J、Racing GTC02 19x9.5J）均为 5x114.3，未出现 5x112。故 Enkei 的 5x112 数据全部为 null，不做推测。",
    "WORK：Blackhawk Japan 抓到的 EMOTION 系列均为 5x100/5x114.3，未出现 5x112；仅 JMS 在售的 Gnosis GR203 有 5x112 且 ET 可完全定制。",
    "BBS 与 OZ 的螺栓座类型（球面 R14 / 锥面）：BBS 德国官网首页存在轮毂紧固件参数查询模块（Radbefestigung：Lochkreis / Nabenbohrung / Gewinde / Bund），但具体数值为由车型数据库动态查询，抓取未取得数值；OZ 官网配件页同时销售 ball seat 与 cone seat 两种螺栓，说明其座型按车型不同。因此这两个字段一律留 null，未按记忆填写。",
    "价格均为原币种（EUR / JPY / RUB），未做汇率换算；JMS 报价含 19% 德国增值税，Blackhawk Japan 报价为日本含税单只价。",
    "Blackhawk Japan 商品 JSON 中的 grams=19000 为 Shopify 物流计费重量，非轮毂净重，故全部 weight_kg 留 null。",
    "W204/W205 原厂 AMG 轮毂的配套轮胎规格与单只重量：本次抓取到的页面均未列出，留 null。"
  ];

  D.brandSources = [
    "https://bbswheels.ru/product/80x18-5x1120x820-et450-sr-satin-himalaya-grey",
    "https://bbswheels.ru/collection/ch-r",
    "https://bbswheels.ru/product/disk-kolesnyy-bbs-xr-8x18-5x112-et44-cb820-platinum-silver",
    "https://www.jms-fahrzeugteile.de/print_product_info.php?products_id=2846099",
    "https://www.jms-fahrzeugteile.de/print_product_info.php?products_id=1011741",
    "https://www.jms-fahrzeugteile.de/print_product_info.php?products_id=945925",
    "https://www.jms-fahrzeugteile.de/print_product_info.php?products_id=2745422",
    "https://www.jms-fahrzeugteile.de/print_product_info.php?products_id=1795331",
    "https://www.jms-fahrzeugteile.de/Alufelgen/OZ-Felgen/18-Zoll/1-teilig/5x112/OZ-SUPERTURISMO-LM-matt-schwarz-silber-Schriftzug-Felge-8x18-18-Zoll-5x112-Lochkreis::768916.html",
    "https://www.jms-fahrzeugteile.de/Alloy-wheels/OZ-wheels/18-inch/1-teilig/5x112/OZ-SUPERTURISMO-GT-MATT-BLACK-Wheel-8x18-18-inch-5x112-bold-circle::768905.html",
    "https://www.ozracing.com/alloy-wheels/oz-racing/i-tech/ultraleggera-hlt",
    "https://www.ozracing.com/alloy-wheels/oz-racing/sport/superturismo-lm",
    "https://powerwerks.at/Rad-Design-CI-R-CI2103-schwarz-matt-85x19-LK-5x112-ET45-NB-820-PFS",
    "https://blackhawkjapan.com/products/rays-05029952020bc.json",
    "https://blackhawkjapan.com/products/rays-05918854435sz.json",
    "https://blackhawkjapan.com/search/suggest.json?q=5X112&resources[type]=product&resources[limit]=10",
    "https://blackhawkjapan.com/search/suggest.json?q=57CR%205X112&resources[type]=product&resources[limit]=4",
    "https://blackhawkjapan.com/search/suggest.json?q=WORK%20EMOTION%205X112&resources[type]=product&resources[limit]=4",
    "https://blackhawkjapan.com/search/suggest.json?q=ENKEI%205X112&resources[type]=product&resources[limit]=4",
    "https://www.originalteile.mercedes-benz.de/amg-5-speichen-rad-18-zoll-7-5-j-x-18-et-44-titangrau/a20540111007x21",
    "https://www.reifen.com/en-ch/aez-porto-black-8-x-18-et30-4026569045203",
    "https://catalog.onliner.by/wheel/rial/x1080830w610",
    "https://www.tegiwa.com/products/oz-i-tech-hyper-gt-hlt-alloy-wheel-19x8-5-et38-5x112-gloss-black-75mm-cb",
    "https://enkei.com/shop/wheels/performance/pf01/",
    "https://enkei.com/shop/wheels/racingrevolution/rs05rr/",
    "https://www.rayswheels.co.jp/en/products/brand/detail/188",
    "https://mbparts.mbusa.com/oem-parts/mercedes-benz-wheel-amg-forged-48-3-cm-19-inch-20540118007x71",
    "https://www.or24.de/en/mercedes-benz/amg-mercedes-benz-c-class-w204-s204-c204-18-inch-rims/a-35586/",
    "https://www.kunzmann.de/shop/en-gb/p/tires-wheels-light-alloy-rims-mercedes-benz-c-class-w205-rims-amg-19-inch-forged-wheel-cross-spoke-design-edition-1-red-genuine-8597.htm"
  ];

})();
