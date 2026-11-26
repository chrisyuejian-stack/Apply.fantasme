var Ye = {
  templates: [{
    id: "tpl-docs",
    title: "\u6536\u96C6\u62A4\u7167\u3001\u6210\u7EE9\u5355\u4E0E\u8BED\u8A00\u6210\u7EE9\u5355",
    category: "materials",
    scope: "student",
    cond: "all",
    offset: -35,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-account",
    title: "\u6CE8\u518C\u7533\u8BF7\u5E73\u53F0\u8D26\u53F7\u5E76\u6838\u5BF9\u4E2A\u4EBA\u4FE1\u606F",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: -40,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-ref",
    title: "\u9080\u8BF7\u63A8\u8350\u4EBA\u5E76\u8DDF\u8FDB\u63D0\u4EA4",
    category: "materials",
    scope: "submission",
    cond: "all",
    offset: -21,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-submit",
    title: "\u590D\u6838\u7533\u8BF7\u8868\u5E76\u6B63\u5F0F\u63D0\u4EA4",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: -5,
    effect: "submission:submitted",
    after: ["tpl-account", "tpl-ref", "tpl-docs"],
    active: !0
  }, {
    id: "tpl-received",
    title: "\u786E\u8BA4\u5B66\u6821\u5DF2\u6536\u5230\u7533\u8BF7",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: 10,
    effect: "submission:received",
    after: ["tpl-submit"],
    active: !0
  }, {
    id: "tpl-rep",
    title: "\u786E\u5B9A\u672C\u6821\u66F2\u76EE / \u4F5C\u54C1\u5E76\u5B89\u6392\u5F55\u5236",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -30,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-teacher",
    title: "\u4E13\u4E1A\u8001\u5E08\u5BA1\u6838\u672C\u6821\u5F55\u50CF / \u4F5C\u54C1\uFF08\u987E\u95EE\u767B\u8BB0\u610F\u89C1\uFF09",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -14,
    effect: "",
    after: ["tpl-rep"],
    active: !0
  }, {
    id: "tpl-upload",
    title: "\u4E0A\u4F20\u672C\u6821\u5F55\u50CF / \u4F5C\u54C1\u96C6",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -3,
    effect: "round:submitted",
    after: ["tpl-teacher"],
    active: !0
  }, {
    id: "tpl-live",
    title: "\u51C6\u5907\u73B0\u573A / \u7EBF\u4E0A\u8003\u8BD5\uFF08\u884C\u7A0B\u3001\u4F34\u594F\u3001\u5F69\u6392\uFF09",
    category: "audition",
    scope: "application",
    cond: "live",
    offset: -10,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-offer",
    title: "\u8DDF\u8FDB\u5F55\u53D6\u7ED3\u679C\u4E0E Offer \u6761\u4EF6",
    category: "offer",
    scope: "application",
    cond: "all",
    offset: 75,
    effect: "",
    after: [],
    active: !0
  }],
  reqdb: {
    format: "fantasme-reqdb",
    version: 1,
    exportedAt: "2026-10-16",
    taxonomy: {
      version: 2,
      levels: [{
        id: "UG",
        zh: "\u672C\u79D1",
        en: "Undergraduate"
      }, {
        id: "PG",
        zh: "\u7814\u7A76\u751F",
        en: "Postgraduate"
      }],
      countries: [{
        id: "UK",
        zh: "\u82F1\u56FD",
        en: "United Kingdom"
      }, {
        id: "US",
        zh: "\u7F8E\u56FD",
        en: "United States"
      }, {
        id: "DE",
        zh: "\u5FB7\u56FD",
        en: "Germany"
      }, {
        id: "AT",
        zh: "\u5965\u5730\u5229",
        en: "Austria"
      }, {
        id: "IT",
        zh: "\u610F\u5927\u5229",
        en: "Italy"
      }],
      groups: [{
        id: "classical",
        zh: "\u53E4\u5178",
        en: "Classical"
      }, {
        id: "pop",
        zh: "\u6D41\u884C / \u5F53\u4EE3",
        en: "Popular & Contemporary"
      }],
      majors: [{
        id: "piano",
        group: "classical",
        zh: "\u53E4\u5178\u94A2\u7434",
        en: "Piano"
      }, {
        id: "voice",
        group: "classical",
        zh: "\u53E4\u5178\u58F0\u4E50",
        en: "Classical Voice"
      }, {
        id: "violin",
        group: "classical",
        sub: "strings",
        zh: "\u5C0F\u63D0\u7434",
        en: "Violin"
      }, {
        id: "viola",
        group: "classical",
        sub: "strings",
        zh: "\u4E2D\u63D0\u7434",
        en: "Viola"
      }, {
        id: "cello",
        group: "classical",
        sub: "strings",
        zh: "\u5927\u63D0\u7434",
        en: "Cello"
      }, {
        id: "doublebass",
        group: "classical",
        sub: "strings",
        zh: "\u4F4E\u97F3\u63D0\u7434",
        en: "Double Bass"
      }, {
        id: "collab",
        group: "classical",
        zh: "\u94A2\u7434\u4F34\u594F / \u827A\u672F\u6307\u5BFC",
        en: "Collaborative Piano"
      }, {
        id: "popvoice",
        group: "pop",
        zh: "\u6D41\u884C\u6F14\u5531",
        en: "Popular Voice"
      }, {
        id: "popinst",
        group: "pop",
        zh: "\u6D41\u884C\u5668\u4E50",
        en: "Popular Instruments"
      }, {
        id: "songwriting",
        group: "pop",
        zh: "\u8BCD\u66F2\u521B\u4F5C",
        en: "Songwriting"
      }, {
        id: "production",
        group: "pop",
        zh: "\u97F3\u4E50\u5236\u4F5C",
        en: "Music Production"
      }, {
        id: "musictech",
        group: "pop",
        zh: "\u97F3\u4E50\u79D1\u6280",
        en: "Music Technology"
      }],
      cats: [{
        id: "academic",
        zh: "\u5B66\u672F\u8981\u6C42",
        en: "Academic Entry Requirements"
      }, {
        id: "english",
        zh: "\u8BED\u8A00\u8981\u6C42",
        en: "English Language Requirements"
      }, {
        id: "audition",
        zh: "\u8003\u8BD5\u8981\u6C42",
        en: "Audition Requirements"
      }, {
        id: "portfolio",
        zh: "\u4F5C\u54C1\u96C6\u8981\u6C42",
        en: "Portfolio Requirements"
      }, {
        id: "process",
        zh: "\u7533\u8BF7\u6D41\u7A0B\u4E0E\u622A\u6B62",
        en: "Application & Deadlines"
      }, {
        id: "fees",
        zh: "\u5B66\u8D39\u4E0E\u8D39\u7528",
        en: "Tuition & Fees"
      }],
      stages: [{
        id: "all",
        zh: "\u5404\u8F6E\u901A\u7528",
        en: "All rounds"
      }, {
        id: "pre",
        zh: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u63D0\u4EA4",
        en: "Round 1 \xB7 Pre-screening"
      }, {
        id: "rec",
        zh: "\u5F55\u50CF\u8003\u8BD5",
        en: "Recorded audition"
      }, {
        id: "live",
        zh: "\u73B0\u573A\u8003\u8BD5",
        en: "In-person audition"
      }, {
        id: "online",
        zh: "\u7EBF\u4E0A\u8003\u8BD5 / \u9762\u8BD5",
        en: "Online audition / interview"
      }]
    },
    schools: [{
      id: "rcm",
      order: 1,
      country: "UK",
      abbr: "RCM",
      zh: "\u7687\u5BB6\u97F3\u4E50\u5B66\u9662",
      en: "Royal College of Music",
      city_zh: "\u4F26\u6566",
      city_en: "London",
      web: "https://www.rcm.ac.uk",
      system: "UCAS Conservatoires \xB7 Acceptd",
      china: "\u5317\u4EAC\u3001\u4E0A\u6D77\u8BBE\u73B0\u573A\u8003\u70B9\uFF082027 \u5165\u5B66\uFF1A\u4E0A\u6D77 2026 \u5E74 10 \u6708 30\u201331 \u65E5\uFF0C\u5317\u4EAC 11 \u6708 3\u20134 \u65E5\uFF09",
      verified: "2026-09-21",
      cycle: "2027 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u9636\u6BB5\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF0C\u4EC5\u7814\u7A76\u751F\u5F00\u8BBE Collaborative Piano\u3002",
        "ALL:@pop": "RCM \u4E3A\u7EAF\u53E4\u5178\u97F3\u4E50\u5B66\u9662\uFF0C\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u5747\u672A\u5F00\u8BBE\u6D41\u884C / \u5F53\u4EE3\u65B9\u5411\uFF1B\u58F0\u4E50\u7CFB\u660E\u786E\u4E0D\u63A5\u53D7\u6D41\u884C\u66F2\u76EE\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "ram",
      order: 2,
      country: "UK",
      abbr: "RAM",
      zh: "\u82F1\u56FD\u7687\u5BB6\u97F3\u4E50\u5B66\u9662",
      en: "Royal Academy of Music",
      city_zh: "\u4F26\u6566",
      city_en: "London",
      web: "https://www.ram.ac.uk",
      system: "UCAS Conservatoires \xB7 Acceptd",
      china: "\u65E0\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u70B9\uFF0C\u4E2D\u56FD\u8003\u751F\u8D70\u89C6\u9891\u7533\u8BF7",
      verified: "2026-09-21",
      cycle: "2027 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u9636\u6BB5\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF1B\u7814\u7A76\u751F\u9636\u6BB5\u5F00\u8BBE\uFF0CRAM \u79F0\u4E3A Ensemble Piano\u3002",
        "ALL:@pop": "RAM \u672A\u5F00\u8BBE\u6D41\u884C / \u5546\u4E1A\u58F0\u4E50\u3001\u8BCD\u66F2\u521B\u4F5C\u3001\u97F3\u4E50\u5236\u4F5C\u3001\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1B\u4EC5\u6709 Jazz Voice\uFF08\u7235\u58EB\u58F0\u4E50\uFF09\uFF0C\u5C5E\u7235\u58EB\u65B9\u5411\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["@strings"],
        d: "2026-10-02"
      }, {
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "guildhall",
      order: 3,
      country: "UK",
      abbr: "Guildhall",
      zh: "\u5E02\u653F\u5385\u97F3\u4E50\u4E0E\u620F\u5267\u5B66\u9662",
      en: "Guildhall School of Music & Drama",
      city_zh: "\u4F26\u6566",
      city_en: "London",
      web: "https://www.gsmd.ac.uk",
      system: "Guildhall \u81EA\u6709\u76F4\u7533\u7CFB\u7EDF\uFF08\u975E UCAS\uFF09",
      china: "\u9752\u5C9B\u73B0\u573A\u8003\u70B9\uFF082026 \u5E74 11 \u6708 14 \u65E5\uFF0C\u6885\u7EBD\u56E0\u5B66\u6821\uFF09\uFF0C\u53E6\u6709\u9999\u6E2F\u3001\u9996\u5C14\u3001\u4E1C\u4EAC",
      verified: "2026-09-21",
      cycle: "2027 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "production", "songwriting"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass", "production", "songwriting"]
      },
      related: {
        UG: ["popvoice", "popinst", "musictech"],
        PG: ["popvoice", "popinst", "musictech"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u9636\u6BB5\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF0C\u4EC5\u7814\u7A76\u751F\uFF08MMus / MPerf\u3001Advanced Certificate\u3001Advanced Artist Diploma\uFF09\u5F00\u8BBE\u3002",
        "ALL:popvoice": "\u65E0\u6D41\u884C / \u5546\u4E1A\u58F0\u4E50\u5B66\u4F4D\uFF1B\u6700\u63A5\u8FD1\u7684\u662F Jazz\uFF08\u542B Jazz Vocals\uFF09\uFF0C\u6309\u7235\u58EB\u65B9\u5411\u8003\u8BD5\u3002",
        "ALL:popinst": "\u65E0\u6D41\u884C\u5668\u4E50\u5B66\u4F4D\uFF1B\u6700\u63A5\u8FD1\u7684\u662F Jazz \u5668\u4E50\u65B9\u5411\u3002",
        "ALL:musictech": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1B\u76F8\u5173\u5185\u5BB9\u5728 Electronic & Produced Music \u65B9\u5411\u4E2D\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["production", "songwriting", "musictech"],
        d: "2027-01-05",
        p: "Electronic & Produced Music",
        pen: "Electronic & Produced Music"
      }, {
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "rncm",
      order: 4,
      country: "UK",
      abbr: "RNCM",
      zh: "\u7687\u5BB6\u5317\u65B9\u97F3\u4E50\u5B66\u9662",
      en: "Royal Northern College of Music",
      city_zh: "\u66FC\u5F7B\u65AF\u7279",
      city_en: "Manchester",
      web: "https://www.rncm.ac.uk",
      system: "UCAS Conservatoires \xB7 Acceptd",
      china: "\u65E0\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u70B9\uFF0C\u4EE5\u5F55\u50CF + \u7EBF\u4E0A\u9762\u8BD5\u4E3A\u4E3B",
      verified: "2026-09-21",
      cycle: "2027 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "popvoice", "popinst", "songwriting", "production"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass", "popvoice", "popinst", "songwriting", "production"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u9636\u6BB5\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF0C\u4EC5\u7814\u7A76\u751F\u5F00\u8BBE\uFF08Collaborative Piano / R\xE9p\xE9titeurs\uFF09\u3002",
        "UG:musictech": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1B\u5F55\u97F3\u3001\u5236\u4F5C\u76F8\u5173\u5185\u5BB9\u5728 BMus Popular Music \u7684 Production \u4E3B\u4FEE\u4E2D\u3002",
        "PG:musictech": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1B\u53EF\u8003\u8651 Popular Music \u7814\u7A76\u751F\u7684 Production \u65B9\u5411\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "rcs",
      order: 5,
      country: "UK",
      abbr: "RCS",
      zh: "\u82CF\u683C\u5170\u7687\u5BB6\u97F3\u4E50\u5B66\u9662",
      en: "Royal Conservatoire of Scotland",
      city_zh: "\u683C\u62C9\u65AF\u54E5",
      city_en: "Glasgow",
      web: "https://www.rcs.ac.uk",
      system: "UCAS Conservatoires (R58) \xB7 Acceptd",
      china: "\u9752\u5C9B\u73B0\u573A\u8003\u70B9\uFF082026 \u5E74 11 \u6708 18\u201320 \u65E5\uFF09",
      verified: "2026-09-21",
      cycle: "2027/28 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u9636\u6BB5\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF0C\u4EC5\u7814\u7A76\u751F\u5F00\u8BBE MMus / MA Collaborative Piano\uFF08\u53E6\u6709 Repetiteurship\uFF09\u3002",
        "ALL:@pop": "RCS \u672A\u5F00\u8BBE\u6D41\u884C\u58F0\u4E50\u3001\u8BCD\u66F2\u521B\u4F5C\u3001\u97F3\u4E50\u5236\u4F5C\u6216\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1B\u5F53\u4EE3\u76F8\u5173\u65B9\u5411\u53EA\u6709 Jazz \u4E0E\u82CF\u683C\u5170\u4F20\u7EDF\u97F3\u4E50\uFF0CMusical Theatre \u5C5E\u620F\u5267\u5B66\u9662\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["piano", "collab"],
        d: "2026-10-01",
        p: "\u952E\u76D8 / \u94A2\u7434\u4F34\u594F\u7EDF\u4E00\u622A\u6B62",
        pen: "Keyboard / Collaborative Piano"
      }, {
        lv: "ALL",
        mj: ["*"],
        d: "2026-12-01",
        p: "\u56FD\u9645\u7533\u8BF7\u8005\uFF1B\u53C2\u52A0\u9752\u5C9B / \u65B0\u52A0\u5761 / \u9996\u5C14\u8003\u70B9\u987B\u4E8E 2026 \u5E74 10 \u6708 1 \u65E5\u524D\u63D0\u4EA4\u9884\u5BA1\u5F55\u50CF",
        pen: "International applicants; for the Qingdao / Singapore / Seoul centres the pre-screening video is due 1 October 2026"
      }]
    }, {
      id: "rbc",
      order: 6,
      country: "UK",
      abbr: "RBC",
      zh: "\u4F2F\u660E\u7FF0\u7687\u5BB6\u97F3\u4E50\u5B66\u9662",
      en: "Royal Birmingham Conservatoire",
      city_zh: "\u4F2F\u660E\u7FF0",
      city_en: "Birmingham",
      web: "https://www.bcu.ac.uk/conservatoire",
      system: "UCAS Conservatoires (B34) \xB7 YouTube/Vimeo \u5F55\u50CF",
      china: "\u5B98\u7F51\u63D0\u53CA\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u5BA1\u6838\u70B9\uFF0C\u573A\u6B21\u4EE5\u5B98\u7F51\u901A\u77E5\u4E3A\u51C6\uFF1B\u4E5F\u53EF\u7EBF\u4E0A\u5BA1\u6838",
      verified: "2026-09-21",
      cycle: "2027/28 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "production", "musictech"],
        PG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "production", "musictech"]
      },
      related: {
        UG: ["songwriting", "popvoice", "popinst"],
        PG: ["collab", "songwriting", "popvoice", "popinst"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\u3002",
        "PG:collab": "\u65E0\u72EC\u7ACB MMus Collaborative Piano\uFF1B\u4EC5\u5728 Post-Masters \u7684 AdvPgDip Professional Performance \u4E0B\u8BBE Collaborative Piano \u4E0E Opera R\xE9p\xE9titeurship \u4E13\u4FEE\u65B9\u5411\u3002",
        "ALL:songwriting": "\u65E0\u8BCD\u66F2\u521B\u4F5C\u5B66\u4F4D\uFF1B\u6700\u63A5\u8FD1\u7684\u662F Composition\uFF08\u4F5C\u66F2\uFF09\u4E3B\u4FEE\uFF0C\u4EFB\u610F\u98CE\u683C\u4F5C\u54C1\u96C6\u3002",
        "ALL:popvoice": "\u65E0\u6D41\u884C\u58F0\u4E50\u5B66\u4F4D\uFF1B\u58F0\u4E50\u7CFB\u4E3A\u7EAF\u53E4\u5178 / \u6B4C\u5267\u8DEF\u7EBF\uFF0C\u7235\u58EB\u58F0\u4E50\u5728 Jazz \u7CFB\u3002",
        "ALL:popinst": "\u65E0\u6D41\u884C\u5668\u4E50\u5B66\u4F4D\uFF1B\u6700\u63A5\u8FD1\u7684\u662F Jazz \u65B9\u5411\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01",
        p: "\u5E73\u7B49\u8003\u8651\u622A\u6B62",
        pen: "Equal consideration"
      }]
    }, {
      id: "trinity",
      order: 7,
      country: "UK",
      abbr: "Trinity Laban",
      zh: "\u5723\u4E09\u4E00\u62C9\u90A6\u97F3\u4E50\u821E\u8E48\u5B66\u9662",
      en: "Trinity Laban Conservatoire of Music and Dance",
      city_zh: "\u4F26\u6566",
      city_en: "London",
      web: "https://www.trinitylaban.ac.uk",
      system: "UCAS Conservatoires (T75) \xB7 Embark",
      china: "\u65E0\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u70B9\uFF0C\u4EE5\u5F55\u50CF\uFF08Embark\uFF09\u4E3A\u4E3B",
      verified: "2026-09-21",
      cycle: "2027/28 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass", "songwriting"]
      },
      related: {
        UG: ["popvoice", "popinst", "songwriting", "production", "musictech"],
        PG: []
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF1B\u7814\u7A76\u751F MMus \u8BBE Collaborative Piano pathway\u3002",
        "UG:@pop": "\u65E0\u5355\u72EC\u7684\u6D41\u884C\u58F0\u4E50\u3001\u8BCD\u66F2\u521B\u4F5C\u3001\u5236\u4F5C\u6216\u97F3\u4E50\u79D1\u6280\u672C\u79D1\uFF1B\u7EDF\u4E00\u901A\u8FC7 BA (Hons) Music Performance and Industry \u5165\u5B66\uFF0C\u8BFE\u7A0B\u878D\u5408\u6F14\u51FA\u3001\u5236\u4F5C\u3001\u5531\u4F5C\u4E0E\u97F3\u4E50\u4EA7\u4E1A\u3002",
        "PG:popvoice": "\u7814\u7A76\u751F\u9636\u6BB5\u65E0\u6D41\u884C\u58F0\u4E50\u5B66\u4F4D\u3002",
        "PG:popinst": "\u7814\u7A76\u751F\u9636\u6BB5\u65E0\u6D41\u884C\u5668\u4E50\u5B66\u4F4D\u3002",
        "PG:production": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u5236\u4F5C\u7814\u7A76\u751F\u5B66\u4F4D\u3002",
        "PG:musictech": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u7814\u7A76\u751F\u5B66\u4F4D\u3002"
      },
      deadlines: [{
        lv: "PG",
        mj: ["songwriting"],
        d: "",
        p: "MA Songwriting \u65F6\u95F4\u7EBF\u72EC\u7ACB\uFF0C\u5F85\u5B98\u7F51\u516C\u5E03",
        pen: "MA Songwriting: separate timeline, to be announced"
      }, {
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "rwcmd",
      order: 8,
      country: "UK",
      abbr: "RWCMD",
      zh: "\u5A01\u5C14\u58EB\u7687\u5BB6\u97F3\u4E50\u4E0E\u620F\u5267\u5B66\u9662",
      en: "Royal Welsh College of Music & Drama",
      city_zh: "\u5361\u8FEA\u592B",
      city_en: "Cardiff",
      web: "https://www.rwcmd.ac.uk",
      system: "UCAS Conservatoires (R59) \xB7 Acceptd",
      china: "\u4E0A\u6D77\u3001\u6210\u90FD\u3001\u5E7F\u5DDE\u3001\u5317\u4EAC\u73B0\u573A\u8003\u70B9\uFF082026 \u5E74 10 \u6708 24 \u65E5\u201311 \u6708 6 \u65E5\uFF09",
      verified: "2026-09-21",
      cycle: "2027/28 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
        PG: ["piano", "collab", "voice", "violin", "viola", "cello", "doublebass"]
      },
      related: {
        UG: ["musictech"],
        PG: ["musictech"]
      },
      notOffered: {
        "UG:collab": "\u672C\u79D1\u4E0D\u8BBE\u94A2\u7434\u4F34\u594F\u65B9\u5411\uFF1B\u7814\u7A76\u751F\u5F00\u8BBE MMus Collaborative Piano\u3002",
        "ALL:musictech": "\u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\uFF1BComposition and Creative Music Technology \u662F\u4F5C\u66F2\u5B66\u4F4D\u4E0B\u7684\u6559\u5B66\u65B9\u5411\uFF0C\u987B\u8D70\u4F5C\u66F2\u7533\u8BF7\u901A\u9053\uFF08\u4F5C\u54C1\u96C6 + \u7EBF\u4E0A\u9762\u8BD5\uFF09\u3002",
        "ALL:production": "\u65E0\u97F3\u4E50\u5236\u4F5C\u5B66\u4F4D\uFF1BMA Sound Design & Production \u5C5E\u5267\u573A\u58F0\u97F3\u8BBE\u8BA1\u65B9\u5411\uFF0C\u4E0D\u5BF9\u53E3\u6D41\u884C\u97F3\u4E50\u5236\u4F5C\u3002",
        "ALL:popvoice": "\u65E0\u6D41\u884C\u58F0\u4E50\u5B66\u4F4D\uFF1B\u4EC5\u6709 BMus / MA Jazz \u4F5C\u4E3A\u80CC\u666F\u53C2\u8003\u3002",
        "ALL:popinst": "\u65E0\u6D41\u884C\u5668\u4E50\u5B66\u4F4D\uFF1B\u4EC5\u6709 BMus / MA Jazz \u4F5C\u4E3A\u80CC\u666F\u53C2\u8003\u3002",
        "ALL:songwriting": "\u65E0\u8BCD\u66F2\u521B\u4F5C\u5B66\u4F4D\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["*"],
        d: "2026-10-01"
      }]
    }, {
      id: "leeds",
      order: 9,
      country: "UK",
      abbr: "Leeds Conservatoire",
      zh: "\u5229\u5179\u97F3\u4E50\u5B66\u9662",
      en: "Leeds Conservatoire",
      city_zh: "\u5229\u5179",
      city_en: "Leeds",
      web: "https://www.leedsconservatoire.ac.uk",
      system: "UCAS Conservatoires / UCAS Undergraduate \xB7 Acceptd",
      china: "\u65E0\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u70B9\uFF0C\u4EE5\u7EBF\u4E0A\u63D0\u4EA4 / \u9762\u8BD5\u4E3A\u4E3B\uFF1B\u8003\u8BD5\u514D\u8D39",
      verified: "2026-09-21",
      cycle: "2027 Entry",
      offers: {
        UG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "collab", "popvoice", "popinst", "songwriting", "production", "musictech"],
        PG: ["piano", "voice", "violin", "viola", "cello", "doublebass", "popvoice", "popinst", "songwriting", "production", "musictech"]
      },
      notOffered: {
        "PG:collab": "MA Music (Classical) \u8003\u8BD5\u6307\u5357\u53EA\u5217 Performer \u4E0E Conductor\uFF0C\u672A\u89C1 Repetiteur / \u94A2\u7434\u4F34\u594F\u6761\u6B3E\uFF0C\u7814\u7A76\u751F\u662F\u5426\u5F00\u8BBE\u987B\u5411\u62DB\u751F\u529E\u786E\u8BA4\uFF08hello@leedsconservatoire.ac.uk\uFF09\u3002"
      },
      deadlines: [{
        lv: "ALL",
        mj: ["*"],
        d: "",
        p: "\u5B98\u7F51\u672A\u516C\u5E03 2027/28 \u622A\u6B62\u65E5\u671F\uFF0C\u4EE5 UCAS \u65E5\u5386\u4E3A\u51C6",
        pen: "Not yet published; follow the UCAS calendar"
      }]
    }],
    records: [{
      id: "rcm-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons)",
      zh: `- \u65E0\u5F3A\u5236 UCAS Tariff \u5206\u6570\uFF0C\u5F55\u53D6\u4EE5\u8003\u8BD5\u8868\u73B0\u4E3A\u6838\u5FC3\u4F9D\u636E
- \u82F1\u56FD\u5B66\u5386\u6700\u4F4E\u7EBF\uFF1A2 \u95E8 A-level \u8FBE E \u7EA7\u53CA\u4EE5\u4E0A\uFF1B\u6216 1 \u95E8 A-level\uFF08E\uFF09+ 2 \u95E8 AS-level\uFF08D\u3001E \u53CA\u4EE5\u4E0A\uFF09
- \u4EA6\u63A5\u53D7\uFF1A3 \u95E8\u82CF\u683C\u5170 Higher\uFF08D+\uFF09\u3001Cambridge Pre-U\u3001BTEC Level 3 National Diploma\u3001IB \u6587\u51ED\uFF0824 \u5206\u4EE5\u4E0A\uFF09\u3001Welsh Bacc\u3001RSL Level 3 \u7B49\uFF1B\u56FD\u9645\u5B66\u5386\u6709\u5BF9\u7167\u8868\uFF0C\u4E2A\u6848\u53EF\u54A8\u8BE2\u62DB\u751F\u529E
- \u5F55\u53D6\u8005\u6F14\u594F\u6C34\u5E73\u901A\u5E38\u76F8\u5F53\u4E8E ABRSM 8 \u7EA7\u4F18\u79C0\uFF08Distinction\uFF09\u6216\u66F4\u9AD8\uFF0C\u4F46\u8003\u7EA7\u8BC1\u4E66\u4E0D\u662F\u786C\u6027\u524D\u7F6E\u6761\u4EF6\uFF1B\u65E0\u72EC\u7ACB\u4E50\u7406\u7B14\u8BD5`,
      en: `Candidates require two A levels at grade E or above, or one A Level at grade E or above and two AS levels, one at grade D and grade E and above.
Three Scottish Higher grade passes at grade D or above; Cambridge Pre-U certificate in at least two principal subjects at P3 level or above; BTEC Level 3 National Diploma; International Baccalaureate Diploma (at least 24 points); Welsh Baccalaureate (accepted as equivalent to one A Level); RSL Level 3 Diploma for Music Practitioners; RSL Level 3 Diploma in Creative Music Industries.
All offers for performers and composers are made on the basis of their performance at audition, or portfolio and interview for composers.
Successful applicants tend to be at a standard equivalent to distinction at ABRSM grade 8 and those who have developed further. We don't use ABRSM or other graded exams as a prerequisite for our BMus(Hons) course, as they are not available to all applicants.`,
      enType: "original",
      src: ["https://www.rcm.ac.uk/bmus", "https://www.rcm.ac.uk/media/UG-Applicant-Guide-2026.pdf"],
      school: "rcm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MMus in Performance / MPerf / Artist Diploma",
      zh: `- \u987B\u6301\u6709\u672C\u79D1\u5B66\u4F4D\u6216\u56FD\u9645\u540C\u7B49\u5B66\u5386\uFF0C\u901A\u5E38\u4E3A\u97F3\u4E50\u4E13\u4E1A\uFF1B\u975E\u5E38\u89C4\u80CC\u666F\u53EF\u4E2A\u6848\u8003\u8651
- **MMus**\uFF1A\u53E6\u4EA4\u4E24\u7BC7\u8FD1\u671F\u82F1\u6587\u957F\u7BC7\u5199\u4F5C\u6837\u672C\uFF08\u5982\u8BBA\u6587 / \u6587\u7AE0\uFF09\uFF0C\u7528\u4E8E\u8BC4\u4F30\u5B66\u672F\u82F1\u8BED\u5199\u4F5C
- **MPerf**\uFF08\u7EAF\u6F14\u594F\uFF09\uFF1A\u65E0\u5199\u4F5C\u6837\u672C\u8981\u6C42`,
      en: `Candidates require an undergraduate degree or an equivalent international qualification, usually in music.
(MMus) two recent examples of extended written work in English, such as essays. (Not required for MPerf.)
The RCM welcomes applicants from all backgrounds and alternative qualifications may be considered.`,
      enType: "original",
      src: ["https://www.rcm.ac.uk/courses/postgraduate/mmusperformance/"],
      school: "rcm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus (Hons) \xB7 CEFR B2",
      zh: `- CEFR B2\uFF08\u56DB\u9879\u5747\u8FBE\u6807\uFF09\uFF0C\u5373 **IELTS \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT\uFF1A\u65B0\u8BA1\u5206\u5236\u603B\u5206 4.0\u3001\u5404\u5355\u9879 4.0\uFF082026 \u5E74 1 \u6708 21 \u65E5\u8D77\uFF09\uFF1B\u65E7\u5236 72 \u5206\uFF08\u9605\u8BFB 18 / \u542C\u529B 17 / \u53E3\u8BED 20 / \u5199\u4F5C 17\uFF09
- PTE Academic 59\uFF08\u5404\u5355\u9879 59\uFF09\uFF1BCambridge FCE / CAE 160+\uFF1BLanguageCert \u5404\u5355\u9879 60\uFF1BTrinity ISE II \u56DB\u9879\u901A\u8FC7
- \u56DB\u9879\u987B\u5728\u540C\u4E00\u6B21\u8003\u8BD5\u4E2D\u8FBE\u6807\uFF1B**\u4E0D\u63A5\u53D7 Duolingo**`,
      en: `The requirement for this course is to speak English to B2 standard on the Common European Framework of Reference for Languages (CEFR) in all four components (reading, writing, speaking, listening). This is equivalent to an overall IELTS score of 5.5 in all four components.
All applicants must pass all four components of their test (reading, writing, speaking and listening) in a single sitting.`,
      enType: "original",
      src: ["https://www.rcm.ac.uk/apply/englishlanguagerequirements/"],
      school: "rcm",
      country: "UK",
      ielts: [{
        p: "BMus",
        pen: "BMus",
        o: "5.5",
        m: "5.5",
        n: "\u4E0D\u63A5\u53D7 Duolingo",
        nen: "Duolingo not accepted"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MMus (C1) / MPerf \xB7 GradDip \xB7 Artist Diploma (B2)",
      zh: `## MMus in Performance\uFF08C1\uFF09
- **IELTS \u603B\u5206 7.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT \u65B0\u5236 5.0\uFF08\u5404\u5355\u9879 5.0\uFF09/ \u65E7\u5236 95 \u5206\uFF1BPTE 76\uFF08\u5404\u5355\u9879 59\uFF09\uFF1BCambridge CAE 180+\uFF1BTrinity ISE III
## MPerf\u3001Graduate Diploma in Vocal Performance\u3001Artist Diploma\uFF08Performance / Opera\uFF09\uFF08B2\uFF09
- **IELTS \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT \u65B0\u5236 4.0 / \u65E7\u5236 72\uFF1BPTE 59
\u56DB\u9879\u987B\u4E00\u6B21\u8003\u51FA\uFF1B**\u4E0D\u63A5\u53D7 Duolingo**\u3002TOEFL 2026 \u5E74 1 \u6708 21 \u65E5\u8D77\u6539\u7528\u65B0\u8BA1\u5206\u5236\uFF0C\u4E34\u754C\u6210\u7EE9\u8BF7\u5411 admissions@rcm.ac.uk \u786E\u8BA4\u3002`,
      en: `B2 level required for: Bachelor of Music(Hons), Graduate Diploma in Vocal Performance, Master of Performance, Master of Composition, Artist Diploma in Performance, Artist Diploma in Composition, Artist Diploma in Opera \u2014 equivalent to an overall IELTS score of 5.5 in all four components.
C1 level required for: Master of Music in Performance, Master of Music in Composition, Master of Science in Performance Science, Artist Diploma in Conducting, PhD \u2014 equivalent to an overall IELTS score of 7.0, with a minimum of 5.5 in all four components.
All applicants must pass all four components of their test (reading, writing, speaking and listening) in a single sitting.`,
      enType: "original",
      src: ["https://www.rcm.ac.uk/apply/englishlanguagerequirements/"],
      school: "rcm",
      country: "UK",
      ielts: [{
        p: "MMus in Performance",
        pen: "MMus in Performance",
        o: "7.0",
        m: "5.5"
      }, {
        p: "MPerf / Graduate Diploma / Artist Diploma",
        pen: "MPerf / Graduate Diploma / Artist Diploma",
        o: "5.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/keyboard/auditionrequirements/", "https://www.rcm.ac.uk/apply/auditions/auditionlocation/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u81EA\u9009\u4F5C\u54C1\uFF0C\u80CC\u8C31\u6F14\u594F\uFF0C\u603B\u65F6\u957F\u4E0D\u5C11\u4E8E 15 \u5206\u949F
- \u987B\u4F53\u73B0\u4E0D\u540C\u98CE\u683C\u3001\u65F6\u671F\u4E0E\u6027\u683C`,
        en: "Applicants should present a programme of three works of their own choice, played from memory. Duration should be a minimum of 15 minutes, with a variety of style, period and character.",
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u6D77\u5916\u8003\u70B9\u4E3A\u4E24\u9636\u6BB5\uFF1A\u5148\u4EA4\u9884\u5BA1\u5F55\u50CF\uFF0C\u901A\u8FC7\u540E\u53D7\u9080\u53C2\u52A0\u8BE5\u8003\u70B9\u73B0\u573A\u8003\u8BD5
- \u66F2\u76EE\u540C\u4E0A\uFF1B\u5F55\u50CF\u4E0D\u5F97\u526A\u8F91\u3001\u4E0D\u5F97\u52A0\u7279\u6548
- \u622A\u6B62\uFF1A\u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9 2026 \u5E74 10 \u6708 1 \u65E5\uFF08\u4E0E\u7533\u8BF7\u622A\u6B62\u76F8\u540C\uFF09`,
        en: "Overseas centres use a two-stage process: a pre-screening video first, then an invitation to the live audition at that centre. Same repertoire; recordings must not be edited or have effects added. Beijing and Shanghai deadline: 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u5317\u4EAC\u3001\u4E0A\u6D77\u7B49\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "rec",
        zh: `- \u4EE5\u5B8C\u6574\u5F55\u50CF\u4EE3\u66FF\u73B0\u573A\u8003\u8BD5\uFF0C\u66F2\u76EE\u540C\u4E0A
- \u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5\uFF0C\u5F55\u50CF\u63D0\u4EA4\u622A\u6B62 10 \u6708 26 \u65E5`,
        en: "The recording replaces the live audition; same repertoire. Application deadline 1 October 2026, recording deadline 26 October 2026.",
        enType: "summary",
        t: "\u89C6\u9891\u8BD5\u542C\u8DEF\u7EBF\uFF08\u4E0D\u53C2\u52A0\u73B0\u573A\uFF09",
        ten: "Video audition route (no live audition)"
      }, {
        k: "live",
        zh: `- \u8BC4\u59D4\u53EF\u80FD\u53EA\u9009\u542C\u5176\u4E2D\u4E24\u9996
- \u5168\u7A0B\u7EA6 15\u201320 \u5206\u949F\uFF0C\u542B\u89C6\u594F\u4E0E\u7B80\u77ED\u9762\u8BD5\uFF08\u97F3\u4E50\u52A8\u673A\u3001\u53D1\u5C55\u65B9\u5411\uFF09
- \u5EFA\u8BAE\u643A\u5E26\u8FD1\u671F\u516C\u5F00\u6F14\u51FA\u6216\u6BD4\u8D5B\u7684\u8BC1\u660E`,
        en: "In live auditions the panels reserve the right to select only two of the pieces to hear. The audition lasts about 15\u201320 minutes and includes sight-reading and a short interview; bring evidence of recent performances.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u4F26\u6566\u6216\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Live audition (London or overseas centre)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Piano \xB7 Artist Diploma",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/keyboard/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- 50 \u5206\u949F\u98CE\u683C\u591A\u6837\u7684\u8282\u76EE\u5355\uFF0C\u80CC\u8C31\u6F14\u594F\uFF0C\u987B\u542B\u4E00\u9996\u9AD8\u7EA7\u7EC3\u4E60\u66F2
- Contemporary Piano \u5F53\u4EE3\u94A2\u7434\u65B9\u5411\uFF08MMus / MPerf \u5185\uFF09\uFF1A\u987B\u542B\u4E00\u9996\u6885\u897F\u5B89\u300A\u8282\u594F\u7EC3\u4E60\u66F2\u300B\u6216\u5229\u76D6\u8482\u94A2\u7434\u7EC3\u4E60\u66F2\u7B2C\u4E00 / \u4E8C\u518C\u4E2D\u7684\u4E00\u9996\uFF0C\u9F13\u52B1\u52A0\u5165 1990 \u5E74\u540E\u4F5C\u54C1`,
        en: `Applicants should prepare a varied programme of 50 minutes, played from memory, which should include an advanced \xE9tude.
        (Contemporary Piano specialism, within the MMus and MPerf courses) Candidates are required to include one of the following Etudes: any ONE of the Etudes de rythme (Messiaen) or any ONE Etude from Books 1 or 2 (Ligeti); candidates are encouraged to include one or more works written after 1990.`,
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u987B\u5B8C\u6574\u5F55\u5236\u5168\u90E8 50 \u5206\u949F\u66F2\u76EE\uFF08\u4E0D\u662F\u8282\u9009\uFF09\uFF0C\u5E76\u5728\u63D0\u4EA4\u524D 6 \u4E2A\u6708\u5185\u5F55\u5236
- \u53E6\u9644\u66F2\u76EE\u6F14\u594F\u987A\u5E8F\u6587\u4EF6\u4E0E\u6F14\u51FA\u8BC1\u660E
- Artist Diploma \u4E0D\u63A5\u53D7\u5F55\u50CF\uFF0C\u53EA\u80FD\u73B0\u573A\u8003\u8BD5`,
        en: "Video auditions should contain the full 50 minute programme, recorded within six months before submission, with a separate running order and evidence of performances. It is no longer possible to audition for Artist Diploma by video.",
        enType: "summary",
        t: "\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\u9884\u5BA1 / \u89C6\u9891\u8BD5\u542C\u8DEF\u7EBF\uFF09",
        ten: "Recording (overseas pre-screening / video route)"
      }, {
        k: "live",
        zh: `- \u8BC4\u59D4\u4ECE\u8282\u76EE\u5355\u4E2D\u6700\u591A\u9009\u542C 20 \u5206\u949F
- \u542B\u89C6\u594F\u4E0E\u7B80\u77ED\u9762\u8BD5`,
        en: "In live auditions the panels will select up to 20 minutes of the programme to hear. Includes sight-reading and a short interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Collaborative Piano \xB7 Artist Diploma",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.rcm.ac.uk/keyboard/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u8FE5\u5F02\u7684\u4F5C\u54C1\uFF0C\u987B\u6DB5\u76D6\u5668\u4E50\u4E0E\u58F0\u4E50\u5408\u4F5C\u66F2\u76EE
- \u987B\u81EA\u5E26\u72EC\u5531 / \u72EC\u594F\u642D\u6863\uFF1B\u8981\u6C42\u6781\u9AD8\u7684\u94A2\u7434\u6C34\u5E73\u4E0E\u6D41\u5229\u89C6\u594F`,
        en: "Three contrasting works covering instrumental and vocal partnership repertoire, performed with your own soloist. An exceptionally high standard of piano playing and fluent sight-reading are expected.",
        enType: "summary",
        t: "\u66F2\u76EE\uFF08MMus / MPerf\uFF09",
        ten: "Repertoire (MMus / MPerf)"
      }, {
        k: "pre",
        zh: "- \u5F55\u50CF\u987B\u9644\u5355\u72EC\u7684\u66F2\u76EE\u987A\u5E8F\u6587\u4EF6\uFF0C\u5E76\u5728\u63D0\u4EA4\u524D 6 \u4E2A\u6708\u5185\u5F55\u5236",
        en: "Video submissions need a separate running order and must be recorded within six months before submission.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u521D\u5BA1",
        ten: "Round 1 \xB7 Video review"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u521D\u5BA1\u5165\u56F4\u8005\u987B\u53C2\u52A0\u89C6\u9891\u9762\u8BD5\uFF0C\u9762\u8BD5\u4E2D\u53EF\u80FD\u5305\u542B\u89C6\u594F",
        en: "Applicants shortlisted from the video review take a video interview, which may include sight-reading.",
        enType: "summary",
        t: "\u5165\u56F4\u540E\u89C6\u9891\u9762\u8BD5",
        ten: "Video interview (if shortlisted)"
      }, {
        k: "live",
        zh: `- \u542B\u89C6\u594F\u6D4B\u8BD5
- \u4F26\u6566\u8003\u70B9\u65E0\u6CD5\u81EA\u5E26\u642D\u6863\u65F6\uFF0C\u5B66\u9662\u53EF\u63D0\u4F9B\u642D\u6863\uFF0C\u4F46\u53EA\u9650\u4EE5\u4E0B\u66F2\u76EE\uFF1A\u8D1D\u591A\u82AC\u300A\u9B54\u7B1B\u300B"Bei M\xE4nnern"\u4E3B\u9898\u4E03\u6BB5\u53D8\u594F\uFF08\u5927\u63D0\u7434\u4E0E\u94A2\u7434\uFF09\uFF1BR. \u65BD\u7279\u52B3\u65AF\u300A\u4E07\u7075\u8282\u300BOp.10 No.8\uFF08\u964D E \u8C03\uFF09\uFF1B\u5E03\u91CC\u987F\u300AOn this Island\u300B\u4E2D"Let the florid music praise!"
- \u6D77\u5916\u8003\u70B9\u4E0D\u63D0\u4F9B\u642D\u6863\uFF0C\u987B\u81EA\u884C\u643A\u5E26`,
        en: "Live auditions include a sight-reading test. At London auditions the RCM can provide a partner only for these set works: Beethoven 7 Variations on 'Bei M\xE4nnern' (cello and piano); R. Strauss Allerseelen op.10 no.8 (E flat); Britten 'Let the florid music praise!' from On this Island. Partners cannot be provided at overseas venues.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "live",
        zh: `- \u4EC5\u63A5\u53D7\u73B0\u573A\u8003\u8BD5\uFF1B20 \u5206\u949F\u5408\u4F5C\u66F2\u76EE\uFF08\u5668\u4E50\u4E8C\u91CD\u594F\u3001\u5BA4\u5185\u4E50\u3001\u827A\u672F\u6B4C\u66F2\u3001\u6B4C\u5267\u6216\u7EC4\u5408\uFF09
- \u63D0\u4EA4\u66F2\u76EE\u6E05\u5355\u4E0E\u81F3\u5C11 5 \u573A\u516C\u5F00\u5408\u4F5C\u6F14\u51FA\u8BC1\u660E\uFF1B\u987B\u81EA\u5E26\u642D\u6863`,
        en: "Artist Diploma: live audition only; 20 minutes of collaborative repertoire, a repertoire list and evidence of at least five public collaborative performances; bring your own partner.",
        enType: "summary",
        t: "Artist Diploma in Performance\uFF08\u4EC5\u73B0\u573A\uFF09",
        ten: "Artist Diploma (live only)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/vocal/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u8FE5\u5F02\u7684\u66F2\u76EE\uFF0C\u987B\u542B\u4E00\u9996\u82F1\u8BED\u4F5C\u54C1\u4E0E\u4E00\u9996\u610F\u5927\u5229\u8BED\u4F5C\u54C1
- \u5176\u4E2D\u4E00\u9996\u987B\u4E3A\u6B4C\u5267\u6216\u6E05\u5531\u5267\u548F\u53F9\u8C03\uFF08\u5C3D\u91CF\u9644\u5BA3\u53D9\u8C03\uFF09
- \u53EF\u53E6\u52A0\u6700\u591A\u4E00\u9996\u97F3\u4E50\u5267\u9009\u6BB5\uFF08\u987B\u80FD\u4F53\u73B0\u8868\u6F14\u6F5C\u529B\uFF09\uFF1B\u6D41\u884C\u66F2\u76EE\u4E0D\u4E88\u8003\u8651`,
        en: `Three contrasting pieces including one in English and one in Italian. One piece must be an operatic or oratorio aria (with recitative if possible).
        Whilst we train singers for the classical repertoire we will accept a maximum of one piece of musical theatre should this offer a particular insight into their potential as performers. Pieces selected from popular music repertoire would not be considered for the purpose of this audition.`,
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u7684\u7B2C\u4E00\u8F6E\u8BC4\u4F30\uFF0C\u66F2\u76EE\u540C\u4E0A\uFF1B\u901A\u8FC7\u8005\u624D\u4F1A\u53D7\u9080\u53C2\u52A0\u73B0\u573A\u8003\u8BD5
- \u622A\u6B62\uFF1A\u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9 2026 \u5E74 10 \u6708 1 \u65E5\uFF1B\u4F26\u6566 / \u89C6\u9891\u8DEF\u7EBF\u5F55\u50CF 10 \u6708 26 \u65E5`,
        en: "For overseas-centre applicants the video is the first-round assessment (same repertoire); only those who pass are invited to the live audition. Beijing/Shanghai deadline 1 October 2026; London/video route recordings 26 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "live",
        zh: `- \u7EA6 15 \u5206\u949F\uFF0C\u8BC4\u59D4\u53EF\u80FD\u53EA\u542C\u4E24\u9996\uFF1B\u542B\u7B80\u77ED\u9762\u8BD5
- \u4F26\u6566\u73B0\u573A\u4E3A\u4E24\u8F6E\uFF08\u521D\u8BD5 + \u590D\u8BD5\uFF09\uFF0C\u8FDB\u5165\u590D\u8BD5\u662F\u83B7\u5F97\u6709\u7ADE\u4E89\u529B\u7ED3\u679C\u7684\u524D\u63D0
- \u5B66\u9662\u63D0\u4F9B\u4F34\u594F\uFF0C\u4E5F\u53EF\u81EA\u5E26`,
        en: "About 15 minutes; the panel may hear only two pieces; short interview. London live auditions have two rounds (first round and recall) \u2014 reaching the recall is needed for a competitive outcome. An accompanist is provided, or bring your own.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "Masters \xB7 Graduate Diploma \xB7 Artist Diploma in Opera",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/vocal/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u8FE5\u5F02\u7684\u66F2\u76EE\uFF0C\u987B\u542B\u4E00\u9996\u82F1\u8BED\u4E0E\u4E00\u9996\u610F\u5927\u5229\u8BED\u4F5C\u54C1\uFF0C\u5176\u4E2D\u4E00\u9996\u987B\u4E3A\u6B4C\u5267\u6216\u6E05\u5531\u5267\u548F\u53F9\u8C03\uFF08\u5C3D\u91CF\u9644\u5BA3\u53D9\u8C03\uFF09
- \u97F3\u4E50\u5267\u4E0E\u6D41\u884C\u66F2\u76EE\u5747\u4E0D\u4E88\u8003\u8651`,
        en: "Three contrasting pieces including one in English and one in Italian. One piece must be an operatic or oratorio aria (with recitative if possible). Pieces selected from musical theatre and popular music repertoire would not be considered for the purpose of this audition.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08Masters / Graduate Diploma\uFF09",
        ten: "Repertoire (Masters / Graduate Diploma)"
      }, {
        k: "all",
        zh: "- \u56DB\u9996\u98CE\u683C\u5404\u5F02\u3001\u8BED\u79CD\u591A\u6837\u7684\u6B4C\u5267\u548F\u53F9\u8C03\uFF0C\u81F3\u5C11\u4E00\u9996\u7528\u82F1\u8BED\u6216\u82F1\u8BD1\u7248\u672C\u6F14\u5531",
        en: "Four contrasting operatic arias in a variety of languages, one of which must be sung in English or English translation.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08Artist Diploma in Opera\uFF09",
        ten: "Repertoire (Artist Diploma in Opera)"
      }, {
        k: "pre",
        zh: `- \u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u7684\u7B2C\u4E00\u8F6E\u8BC4\u4F30\uFF1B\u53EA\u6709\u901A\u8FC7\u8005\u624D\u8FDB\u5165\u73B0\u573A\u8003\u8BD5
- \u4F26\u6566 / \u89C6\u9891\u8DEF\u7EBF\u5F55\u50CF\u622A\u6B62 2026 \u5E74 10 \u6708 26 \u65E5\uFF1B\u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9 10 \u6708 1 \u65E5`,
        en: "First-round assessment for overseas-centre applicants; only those who pass go on to the live audition. London/video route recordings due 26 October 2026; Beijing/Shanghai 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "live",
        zh: "- \u7EA6 15 \u5206\u949F\uFF0C\u8BC4\u59D4\u53EF\u80FD\u53EA\u542C\u4E24\u9996\uFF1B\u542B\u7B80\u77ED\u9762\u8BD5",
        en: "About 15 minutes; the panel may hear only two pieces; short interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-ug-aud-strings",
      level: "UG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "BMus Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/strings/auditionrequirements/", "https://www.rcm.ac.uk/apply/auditions/whattoexpect/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u6216\u5176\u4ED6\u91CD\u8981\u4E50\u7AE0\uFF09\uFF0C\u6216\u539F\u4E3A\u8BE5\u72EC\u594F\u4E50\u5668\u4E0E\u4E50\u961F\u800C\u5199\u7684\u4F5C\u54C1
- \u53E6\u52A0\u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "Violin / Viola / Cello: First (or significant) movement of a concerto, or a work written originally for the instrument and orchestra + A contrasting piece of your own choice.",
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u4EC5\u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u9700\u8981\uFF0C\u901A\u8FC7\u540E\u53C2\u52A0\u8BE5\u8003\u70B9\u73B0\u573A\u8003\u8BD5
- \u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5`,
        en: "Only overseas-centre applicants submit a pre-screening video; those who pass attend the live audition at the centre. Beijing/Shanghai deadline 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "rec",
        zh: "- \u4EE5\u5F55\u50CF\u4EE3\u66FF\u73B0\u573A\uFF1A\u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5\uFF0C\u5F55\u50CF\u622A\u6B62 10 \u6708 26 \u65E5",
        en: "The recording replaces the live audition: application deadline 1 October 2026, recording deadline 26 October 2026.",
        enType: "summary",
        t: "\u89C6\u9891\u8BD5\u542C\u8DEF\u7EBF",
        ten: "Video audition route"
      }, {
        k: "live",
        zh: `- \u7EA6 20 \u5206\u949F\uFF1B\u8BC4\u59D4\u6307\u5B9A\u6F14\u594F\u987A\u5E8F\u4E0E\u6BB5\u843D\uFF0C\u66F2\u76EE\u987B\u5B8C\u6574\u51C6\u5907\uFF0C\u4F46\u53EF\u80FD\u53EA\u542C\u90E8\u5206
- \u89C6\u594F + \u7B80\u77ED\u9762\u8BD5\uFF08\u5B66\u4E60\u52A8\u673A\u3001\u97F3\u4E50\u5174\u8DA3\u3001\u5F85\u63D0\u5347\u65B9\u5411\uFF09
- \u53EF\u80FD\u52A0\u8BD5\u97F3\u9636\u3001\u7436\u97F3\u6216\u6280\u672F\u7EC3\u4E60`,
        en: "About 20 minutes; the panel chooses the order and sections, so prepare complete works. Includes sight-reading and a short interview; scales, arpeggios or technical exercises may be requested.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-ug-aud-doublebass",
      level: "UG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/strings/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF08\u65E0\u5F3A\u5236\u534F\u594F\u66F2\u8981\u6C42\uFF09",
        en: "Double Bass: Two contrasting pieces.",
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u4EC5\u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u9700\u8981\uFF0C\u901A\u8FC7\u540E\u53C2\u52A0\u8BE5\u8003\u70B9\u73B0\u573A\u8003\u8BD5
- \u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5`,
        en: "Only overseas-centre applicants submit a pre-screening video; those who pass attend the live audition at the centre. Beijing/Shanghai deadline 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "rec",
        zh: "- \u4EE5\u5F55\u50CF\u4EE3\u66FF\u73B0\u573A\uFF1A\u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5\uFF0C\u5F55\u50CF\u622A\u6B62 10 \u6708 26 \u65E5",
        en: "The recording replaces the live audition: application deadline 1 October 2026, recording deadline 26 October 2026.",
        enType: "summary",
        t: "\u89C6\u9891\u8BD5\u542C\u8DEF\u7EBF",
        ten: "Video audition route"
      }, {
        k: "live",
        zh: `- \u7EA6 20 \u5206\u949F\uFF1B\u8BC4\u59D4\u6307\u5B9A\u6F14\u594F\u987A\u5E8F\u4E0E\u6BB5\u843D\uFF0C\u66F2\u76EE\u987B\u5B8C\u6574\u51C6\u5907\uFF0C\u4F46\u53EF\u80FD\u53EA\u542C\u90E8\u5206
- \u89C6\u594F + \u7B80\u77ED\u9762\u8BD5\uFF08\u5B66\u4E60\u52A8\u673A\u3001\u97F3\u4E50\u5174\u8DA3\u3001\u5F85\u63D0\u5347\u65B9\u5411\uFF09
- \u53EF\u80FD\u52A0\u8BD5\u97F3\u9636\u3001\u7436\u97F3\u6216\u6280\u672F\u7EC3\u4E60`,
        en: "About 20 minutes; the panel chooses the order and sections, so prepare complete works. Includes sight-reading and a short interview; scales, arpeggios or technical exercises may be requested.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/strings/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996 19 \u6216 20 \u4E16\u7EAA\u91CD\u8981\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u6216\u5176\u4ED6\u91CD\u8981\u4E50\u7AE0\uFF09
- \u53E6\u52A0\u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "Violin / Viola / Cello: First (or significant) movement from a major concerto from the 19th or 20th century + A contrasting piece of your own choice.",
        enType: "original"
      }, {
        k: "pre",
        zh: "- \u4EC5\u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u9700\u8981\uFF0C\u901A\u8FC7\u540E\u53C2\u52A0\u8BE5\u8003\u70B9\u73B0\u573A\u8003\u8BD5\uFF1B\u5317\u4EAC\u3001\u4E0A\u6D77\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5",
        en: "Only overseas-centre applicants submit a pre-screening video; Beijing/Shanghai deadline 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "live",
        zh: "- \u7EA6 20 \u5206\u949F\uFF0C\u542B\u89C6\u594F\u3001\u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u8BD5\u97F3\u9636 / \u6280\u5DE7",
        en: "About 20 minutes, with sight-reading, an interview and possibly scales or technical work.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-pg-aud-doublebass",
      level: "PG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcm.ac.uk/strings/auditionrequirements/"],
      school: "rcm",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1",
        en: "Double Bass: Two contrasting pieces.",
        enType: "original"
      }, {
        k: "pre",
        zh: "- \u4EC5\u6D77\u5916\u8003\u70B9\u7533\u8BF7\u4EBA\u9700\u8981\uFF0C\u901A\u8FC7\u540E\u53C2\u52A0\u8BE5\u8003\u70B9\u73B0\u573A\u8003\u8BD5\uFF1B\u5317\u4EAC\u3001\u4E0A\u6D77\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5",
        en: "Only overseas-centre applicants submit a pre-screening video; Beijing/Shanghai deadline 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Round 1 \xB7 Pre-screening video (overseas centres)"
      }, {
        k: "live",
        zh: "- \u7EA6 20 \u5206\u949F\uFF0C\u542B\u89C6\u594F\u3001\u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u8BD5\u97F3\u9636 / \u6280\u5DE7",
        en: "About 20 minutes, with sight-reading, an interview and possibly scales or technical work.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcm-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires\uFF08\u672C\u79D1\u4E0E\u591A\u6570\u6388\u8BFE\u578B\u7814\u7A76\u751F\uFF09\uFF1B\u9884\u5BA1\u5F55\u50CF\u901A\u8FC7 Acceptd / \u5B98\u65B9\u5165\u53E3\u63D0\u4EA4
## 2027 \u5E74\u5165\u5B66\u622A\u6B62
- **\u7533\u8BF7\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 1 \u65E5**
- \u4F26\u6566\u73B0\u573A\uFF1A11 \u6708\u4E2D\u65EC\u81F3 12 \u6708\u4E2D\u65EC\u8003\u8BD5
- \u89C6\u9891\u8BD5\u542C\u8DEF\u7EBF\uFF1A\u5F55\u50CF\u622A\u6B62 2026 \u5E74 10 \u6708 26 \u65E5
- **\u5317\u4EAC\u3001\u4E0A\u6D77\u8003\u70B9\uFF1A\u7533\u8BF7\u4E0E\u9884\u5BA1\u5F55\u50CF\u5747\u4E8E 2026 \u5E74 10 \u6708 1 \u65E5\u622A\u6B62**\uFF1B\u4E0A\u6D77\u8003\u8BD5 10 \u6708 30\u201331 \u65E5\uFF0C\u5317\u4EAC 11 \u6708 3\u20134 \u65E5
- \u9999\u6E2F\u3001\u65B0\u52A0\u5761\u3001\u66FC\u8C37\u3001\u7EBD\u7EA6\u3001\u591A\u4F26\u591A\u8003\u70B9\uFF1A2026 \u5E74 11 \u6708 1 \u65E5\u622A\u6B62
## \u5F55\u50CF\u89C4\u5219
- \u4E0D\u5F97\u526A\u8F91\u3001\u4E0D\u5F97\u52A0\u7279\u6548
## \u8D39\u7528
- UCAS Conservatoires \u7533\u8BF7\u8D39\u7EA6 \xA334.50
- \u672C\u79D1\u8003\u8BD5\u8BC4\u4F30\u8D39\uFF1A\u5355\u4E3B\u4FEE \xA3115\uFF0C\u8054\u5408\u4E3B\u4FEE \xA3165\uFF1B\u7814\u7A76\u751F \xA350\u2013\xA3165
## \u5956\u5B66\u91D1
- \u53C2\u52A0\u8003\u8BD5\uFF08\u542B\u89C6\u9891\uFF09\u5373\u81EA\u52A8\u8FDB\u5165\u5956\u5B66\u91D1\u8BC4\u4F30\uFF0C\u65E0\u9700\u53E6\u884C\u7533\u8BF7`,
      en: `Applications through UCAS Conservatoires. 2027 entry: application deadline 1 October 2026; London live auditions mid-November to mid-December; video audition route recording deadline 26 October 2026; Beijing and Shanghai venues: application and pre-screening deadline 1 October 2026 (Shanghai 30\u201331 October, Beijing 3\u20134 November 2026). Hong Kong, Singapore, Bangkok, New York and Toronto: deadline 1 November 2026.
Recordings must not be edited or have effects added.
Fees: UCAS Conservatoires about \xA334.50; BMus audition assessment fee \xA3115 (single) / \xA3165 (joint principal study); postgraduate \xA350\u2013\xA3165.
All auditioned applicants are automatically considered for scholarships.`,
      enType: "summary",
      src: ["https://www.rcm.ac.uk/apply/", "https://www.rcm.ac.uk/apply/auditions/auditionlocation/"],
      school: "rcm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) \xB7 4 years",
      zh: `- 2 \u95E8 GCE A-level\uFF08A2\uFF09\uFF1B\u6216 3 \u95E8\u82CF\u683C\u5170 Highers\uFF08D \u53CA\u4EE5\u4E0A\uFF09\uFF1B\u6216 BTEC / UAL / RSL Level 3\u3001T-Level\u3001Access to HE\uFF1BIB \u6587\u51ED 24 \u5206
- \u56FD\u9645\u5B66\u751F\u6309\u672C\u56FD\u9AD8\u4E2D\u6BD5\u4E1A\u8BC1\u4E66\u4E2A\u6848\u8BC4\u4F30
- \u987B\u5C55\u73B0\u804C\u4E1A\u6F14\u594F\u6F5C\u529B\u3001\u624E\u5B9E\u7684\u7EFC\u5408\u97F3\u4E50\u7D20\u517B\u4E0E\u826F\u597D\u542C\u89C9\u53CD\u5E94
- \u5F55\u53D6\u8005\u6F14\u594F\u6C34\u5E73\u901A\u5E38\u81F3\u5C11\u76F8\u5F53\u4E8E 8 \u7EA7\u4F18\u79C0\uFF08Distinction\uFF09
- \u5EFA\u8BAE\u5177\u5907 6 \u7EA7\u4E50\u7406\uFF08ABRSM / Trinity\uFF09\uFF1B\u975E\u94A2\u7434\u4E3B\u4FEE\u5EFA\u8BAE\u94A2\u7434 5 \u7EA7\uFF08\u58F0\u4E50\u4E3B\u4FEE\u8C41\u514D\uFF09`,
      en: `Two GCE A-levels (A2) certificate examinations. A pass at AS-level counts as half an A-level for matriculation, except when the subject is the same as an A-level already gained.
3 Highers at Grade D or above (Scotland). BTEC/UAL/RSL Level 3 National/International Diploma or National/International Extended Diploma (PPP). International Baccalaureate: Diploma (24 points) or IBCP (12 points).
For all applications, we require evidence of professional performing potential or a high standard of composition, sound general musicianship and a good aural response. Successful performance candidates will usually be at a level equivalent to at least distinction at Grade 8.
We recommend gaining knowledge of Music Theory at Grade 6 level (ABRSM or Trinity College London). ABRSM or Trinity College London Grade 5 minimum (or equivalent) in piano is desirable.`,
      enType: "original",
      src: ["https://www.ram.ac.uk/study/entry-requirements"],
      school: "ram",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MA (Performance) / MMus (Performance) / PGCert",
      zh: `- \u672C\u79D1\u5B66\u4F4D\uFF08\u4EFB\u4F55\u5B66\u79D1\uFF0CRQF Level 6\uFF09\u8FBE\u4E8C\u7B49\u4E8C\u7EA7\u8363\u8A89\uFF082:2\uFF09\u6216\u4EE5\u4E0A\uFF1B\u56FD\u9645\u5B66\u5386\u4E2A\u6848\u8BC4\u4F30
- **MMus** \u53E6\u4EA4\uFF1A1,000\u20132,000 \u5B57\u97F3\u4E50\u4E3B\u9898\u5B66\u672F\u6587\u7AE0 + \u9879\u76EE\u63D0\u6848\uFF08\u7814\u7A76\u8BA1\u5212\u3001\u7ED3\u6784\u53CA\u4E0E\u6F14\u594F\u7684\u5173\u8054\uFF09\uFF1BMA \u65E0\u9700\u4E66\u9762\u6750\u6599
- MMus \u7533\u8BF7\u8005\u4F1A\u81EA\u52A8\u540C\u65F6\u88AB\u8003\u8651 MA
- **Ensemble Piano MA**\uFF1A\u901A\u5E38\u987B\u6301 BMus \u6216\u4EE5\u97F3\u4E50\u4E3A\u6838\u5FC3\u5185\u5BB9\u7684\u5B66\u58EB\u5B66\u4F4D
- **Postgraduate Certificate**\uFF1A\u65E0\u5B66\u672F\u5B66\u5386\u8981\u6C42\uFF0C\u9762\u5411\u6F14\u594F\u8FBE\u5230\u4E13\u4E1A\u6587\u51ED\u6C34\u5E73\u4F46\u65E0\u8363\u8A89\u5B66\u4F4D\u8005`,
      en: `A Bachelor degree in any discipline (RQF Level 6) at lower second-class honours, or higher.
(Ensemble Piano MA) You will usually hold a Bachelor of Music (BMus) degree, a university Bachelor's degree containing music as a core component, or an international equivalent qualification.
(Postgraduate Certificate) There are no academic requirements for the Postgraduate Certificate.`,
      enType: "original",
      src: ["https://www.ram.ac.uk/study/entry-requirements", "https://www.ram.ac.uk/courses/ensemble-piano-ma-performance"],
      school: "ram",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus",
      zh: `- **BMus \u4E00\u5E74\u7EA7\u5165\u5B66**\uFF1AIELTS Academic \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5
- BMus \u63D2\u73ED\u4E8C / \u4E09\u5E74\u7EA7\uFF1AIELTS \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5
- TOEFL iBT\uFF082026 \u5E74 1 \u6708 21 \u65E5\u8D77\u65B0\u8BA1\u5206\uFF09\uFF1A\u603B\u5206 4\uFF0C\u5404\u5355\u9879 4
- PTE Academic\uFF1A\u603B\u5206 59\uFF0C\u5404\u5355\u9879 59
- Cambridge C1 Advanced\uFF1A\u603B\u5206 162`,
      en: `IELTS Academic: 5.5 overall with at least 5.5 for reading, writing, listening and speaking (BMus Year 1); 6.0 overall with at least 5.5 for reading, writing, listening and speaking (BMus Year 2/3).
TOEFL iBT (from 21 January 2026): 4 overall with at least 4 for reading, writing, listening and speaking (BMus Year 1).
PTE Academic: Overall 59 for BMus Year 1, with at least 59 in each component.
Cambridge C1 Advanced: Overall 162 for BMus Year 1.`,
      enType: "original",
      src: ["https://www.ram.ac.uk/study/entry-requirements"],
      school: "ram",
      country: "UK",
      ielts: [{
        p: "BMus \u4E00\u5E74\u7EA7\u5165\u5B66",
        pen: "BMus (Year 1 entry)",
        o: "5.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MA / PGCert / MMus",
      zh: `## MA (Performance) / Postgraduate Certificate
- IELTS Academic \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5
- TOEFL iBT \u603B\u5206 4\uFF0C\u5404\u5355\u9879 4\uFF1BPTE 59\uFF1BCambridge C1 162
## MMus (Performance)
- **IELTS Academic \u603B\u5206 7.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT \u603B\u5206 5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 4\uFF1BPTE 76\uFF08\u5404\u5355\u9879 59\uFF09\uFF1BCambridge C1 188\uFF08\u5404\u5355\u9879 162\uFF09`,
      en: `IELTS Academic: 5.5 overall with at least 5.5 for reading, writing, listening and speaking (MA, PGCert); 7.0 overall with at least 5.5 for reading, writing, listening and speaking (MMus, MPhil/PhD).
TOEFL iBT (from 21 January 2026): 4 overall with at least 4 in each skill (MA, PGCert); 5 overall with at least 4 in each skill (MMus, MPhil/PhD).
PTE Academic: Overall 59 for MA or PGCert, with at least 59 in each component; Overall 76 for MMus or MPhil/PhD, with at least 59 in each component.
Cambridge C1 Advanced: Overall 162 for MA or PGCert; Overall 188 for MMus or MPhil/PhD, with at least 162 in each component.`,
      enType: "original",
      src: ["https://www.ram.ac.uk/study/entry-requirements"],
      note: "\u77E5\u8BC6\u5E93\u4E2D\u6587\u6458\u8981\u5199 MA \u4E0E MMus \u5747\u4E3A IELTS 7.0\uFF0C\u4E0E\u5B98\u7F51\u82F1\u6587\u539F\u6587\u4E0D\u4E00\u81F4\uFF1B\u672C\u6761\u6309\u539F\u6587\u5F55\u5165\uFF08MA 5.5\uFF0CMMus 7.0\uFF09\uFF0C\u7528\u524D\u5EFA\u8BAE\u518D\u6838\u5BF9\u5B98\u7F51\u3002",
      school: "ram",
      country: "UK",
      ielts: [{
        p: "MA (Performance) / PGCert",
        pen: "MA (Performance) / PGCert",
        o: "5.5",
        m: "5.5"
      }, {
        p: "MMus (Performance)",
        pen: "MMus (Performance)",
        o: "7.0",
        m: "5.5"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/piano/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u81EA\u9009\u94A2\u7434\u72EC\u594F\u8282\u76EE\u5355\uFF08\u4E0D\u542B\u534F\u594F\u66F2\uFF09\uFF0C\u81F3\u5C11 2 \u9996\u4F5C\u54C1\uFF0C\u603B\u65F6\u957F\u4E0D\u5C11\u4E8E 30 \u5206\u949F
- \u5EFA\u8BAE\u6DB5\u76D6\u53E4\u5178 / \u5DF4\u6D1B\u514B\u98CE\u683C\u3001\u6D6A\u6F2B\u6D3E\u300120 \u4E16\u7EAA\u6216\u5F53\u4EE3\u4F5C\u54C1
- \u987B\u80CC\u8C31\uFF1B\u590D\u6742\u7684\u5F53\u4EE3\u4F5C\u54C1\u53EF\u770B\u8C31`,
        en: "You should offer a free-choice programme of solo piano music (not concerto repertoire) with a minimum of two works, a minimum of 30 minutes long for undergraduate candidates, including music in a classical or Baroque style; a romantic work; and something 20th century or contemporary. Your programme should be played from memory, though complex contemporary music may be played from the score.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u4E00\u6BB5\u5B8C\u6574\u3001\u672A\u526A\u8F91\u7684\u5168\u90E8\u66F2\u76EE\u5F55\u50CF\uFF08\u53EF\u6F14\u594F\u4E50\u7AE0\u800C\u975E\u5168\u66F2\uFF09\uFF0CAcceptd \u4E0A\u4F20
- \u622A\u6B62\uFF1A\u4E2D\u56FD\u5927\u9646\u53CA\u6240\u6709\u89C6\u9891\u7533\u8BF7\u8005 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF08\u82F1\u56FD\u65F6\u95F4\uFF09`,
        en: "Video candidates must upload one unedited video of the complete audition programme (Acceptd). Deadline for mainland China and all video applicants: 2 October 2026, 6pm UK time.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: "- \u8BC4\u59D4\u4ECE\u63D0\u4EA4\u7684\u66F2\u76EE\u4E2D\u9009\u542C\uFF0C\u4E0D\u5FC5\u5168\u90E8\u6F14\u594F",
        en: "The panel selects what to hear from your programme.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: ["live", "online"],
        zh: `- \u53EF\u80FD\u5B89\u6392\u4E0E\u672C\u79D1\u5B66\u672F\u8001\u5E08\u7684\u540E\u7EED\u9762\u8BD5\uFF08\u94A2\u7434\u7CFB\u9875\u9762\u6CE8\u660E\u53EF\u4E3A\u5728\u7EBF\u9762\u8BD5\uFF09\uFF0C\u8BA8\u8BBA\u5B66\u4E60\u8BA1\u5212
- \u53EF\u80FD\u5C31\u4E00\u6BB5\u77ED\u4E50\u8C31\u63D0\u95EE\uFF0C\u5E76\u52A0\u8BD5\u542C\u529B\uFF1A\u89C6\u5531\u3001\u548C\u5F26\u3001\u97F3\u7A0B\u3001\u8282\u594F\u89C6\u594F`,
        en: "You may be asked to have a subsequent interview with one of the undergraduate academic staff... As part of the interview you may be asked some questions about a short extract of music, and be asked to take some aural skills assessments.",
        enType: "original",
        t: "\u540E\u7EED\u9762\u8BD5\uFF08\u73B0\u573A\u6216\u7EBF\u4E0A\uFF09",
        ten: "Follow-up interview (in person or online)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MA / MMus Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/piano/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u81EA\u9009\u94A2\u7434\u72EC\u594F\u8282\u76EE\u5355\uFF08\u4E0D\u542B\u534F\u594F\u66F2\uFF09\uFF0C\u81F3\u5C11 2 \u9996\u4F5C\u54C1\uFF0C\u603B\u65F6\u957F\u4E0D\u5C11\u4E8E 40 \u5206\u949F\uFF0C\u98CE\u683C\u591A\u6837
- \u987B\u80CC\u8C31\uFF1B\u590D\u6742\u5F53\u4EE3\u4F5C\u54C1\u53EF\u770B\u8C31`,
        en: "A free-choice programme of solo piano music (not concerto repertoire) with a minimum of two works, 40 minutes long for postgraduate candidates. Played from memory, though complex contemporary music may be played from the score.",
        enType: "original"
      }, {
        k: "rec",
        zh: "- \u4E00\u6BB5\u5B8C\u6574\u672A\u526A\u8F91\u7684\u5168\u90E8\u66F2\u76EE\u5F55\u50CF\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF08\u82F1\u56FD\u65F6\u95F4\uFF09",
        en: "One unedited video of the complete programme; deadline 2 October 2026, 6pm UK time.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: "- \u8BC4\u59D4\u4ECE\u8282\u76EE\u5355\u4E2D\u9009\u542C",
        en: "The panel selects what to hear.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: ["live", "online"],
        zh: `- \u53EF\u80FD\u4E0E\u7814\u7A76\u751F\u5BFC\u5E08\u9762\u8BD5\uFF0C\u8BA8\u8BBA\u5B66\u4E60\u65B9\u5411
- \u7814\u7A76\u751F\u65E0\u89C6\u5531\u7EC3\u8033\u6D4B\u8BD5`,
        en: "You may be asked to have a subsequent interview with one of the postgraduate programme tutors where you can discuss your study plans. (No aural tests are mentioned for postgraduates.)",
        enType: "summary",
        t: "\u540E\u7EED\u9762\u8BD5\uFF08\u73B0\u573A\u6216\u7EBF\u4E0A\uFF09",
        ten: "Follow-up interview (in person or online)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "Ensemble Piano \xB7 PGCert / MA / MMus",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/courses/ensemble-piano-ma-performance", "https://www.ram.ac.uk/courses/ensemble-piano-postgraduate-certificate"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u81EA\u9009\u7684\u9AD8\u9636\u539F\u521B\u5408\u4F5C\u94A2\u7434\u66F2\u76EE\uFF0C\u603B\u65F6\u957F\u4E0D\u5C11\u4E8E 40 \u5206\u949F
- \u81F3\u5C11 20 \u5206\u949F\u58F0\u4E50\u5408\u4F5C\u66F2\u76EE\uFF08\u827A\u672F\u6B4C\u66F2\u3001\u5FB7\u5965\u827A\u672F\u6B4C\u66F2\u7B49\uFF09+ \u81F3\u5C11 20 \u5206\u949F\u5668\u4E50\u5408\u4F5C\u66F2\u76EE\uFF08\u4E8C\u91CD\u594F\u594F\u9E23\u66F2\u3001\u5BA4\u5185\u4E50\u4E50\u7AE0\u7B49\uFF09
- \u98CE\u683C\u987B\u591A\u6837\uFF0C\u5EFA\u8BAE\u6DB5\u76D6\u53E4\u5178\u3001\u6D6A\u6F2B\u6D3E\u300120 \u4E16\u7EAA\u6216\u5F53\u4EE3\u4F5C\u54C1`,
        en: "Your complete prepared performance programme must last at least 40 minutes. The selection must include a balanced mix of collaborative genres, featuring: At least 20 minutes of vocal repertoire (art songs, lieder, etc.) [and] At least 20 minutes of instrumental music (duo sonatas, chamber movements, etc.). We suggest including music in a classical style, a Romantic work, and something 20th-century or contemporary.",
        enType: "original"
      }, {
        k: "rec",
        zh: "- CV\u3001\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\u5F55\u97F3\u3001\u5B8C\u6574 40 \u5206\u949F\u8282\u76EE\u5355\u5F55\u50CF\uFF08Acceptd \u4E0A\u4F20\uFF09",
        en: "Video applicants upload a CV, a recorded spoken English introduction and the complete 40-minute programme to Acceptd.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: `- \u52A0\u8BD5\u89C6\u594F\uFF0C\u8003\u5BDF\u5373\u65F6\u5408\u4F5C\u53CD\u5E94
- \u4F26\u6566\u73B0\u573A\uFF0C\u53E6\u8BBE\u56FD\u9645\u8003\u70B9`,
        en: "In-person auditions include a sight-reading test to demonstrate your spontaneous collaborative reactivity. Held in London, with international venues.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/vocal-studies/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u4E0E\u60C5\u7EEA\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF0C\u5176\u4E2D\u4E00\u9996\u987B\u5C55\u73B0\u58F0\u97F3\u7684\u7075\u6D3B\u4E0E\u654F\u6377
- \u5C3D\u91CF\u6709\u4E00\u9996\u542B\u5BA3\u53D9\u8C03
- \u81F3\u5C11\u4E00\u9996\u7528\u975E\u6BCD\u8BED\u7684\u5916\u8BED\u6F14\u5531`,
        en: "You should offer three items in contrasting styles and moods, one of which must demonstrate vocal agility. One item should include a recitative if possible. One item must be sung in a language foreign to you.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u4E0D\u5FC5\u4E00\u955C\u5230\u5E95\uFF0C\u4F46\u987B\u6765\u81EA\u540C\u4E00\u5F55\u5236\u573A\u6B21
- Acceptd \u53E6\u4EA4 CV \u4E0E\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF08\u97F3\u4E50\u80CC\u666F\u4E0E\u76EE\u6807\uFF09
- \u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF08\u82F1\u56FD\u65F6\u95F4\uFF09`,
        en: "For candidates submitting a video, the recordings do not have to be in a single 'take' but should be from the same recording session. Also upload a CV and a spoken English introduction. Deadline 2 October 2026, 6pm UK time.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: `- \u8003\u751F\u81EA\u9009\u7B2C\u4E00\u9996\uFF0C\u8BC4\u59D4\u518D\u9009\u540E\u7EED\u66F2\u76EE
- \u4F26\u6566\u73B0\u573A\u63D0\u4F9B\u4F34\u594F`,
        en: "For an in-person audition you will choose the first item to sing and we will select any further items we wish to hear. An accompanist is provided in London.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: ["live", "online"],
        zh: `- \u53EF\u80FD\u5B89\u6392\u540E\u7EED\u9762\u8BD5\uFF0C\u8BA8\u8BBA\u5B66\u4E60\u8BA1\u5212\u5E76\u5C31\u77ED\u4E50\u8C31\u63D0\u95EE
- \u542C\u529B\u6D4B\u8BD5\uFF1A\u89C6\u5531\uFF0C\u4EE5\u53CA\u548C\u5F26\u3001\u97F3\u7A0B\u3001\u8282\u594F\u89C6\u594F\u3001\u8FB9\u5531\u8FB9\u6253\u62CD\u7684\u534F\u8C03\u7EC3\u4E60\u4E2D\u7684\u82E5\u5E72\u9879`,
        en: "You may be asked to have a subsequent interview with one of the undergraduate academic staff, during which you can discuss your study plans... and be asked to take some aural skills assessments consisting of a sight-singing test and other exercises (chords, intervals, rhythm, coordination).",
        enType: "summary",
        t: "\u540E\u7EED\u9762\u8BD5\uFF08\u73B0\u573A\u6216\u7EBF\u4E0A\uFF09",
        ten: "Follow-up interview (in person or online)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "MA / MMus Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/vocal-studies/audition-requirements", "https://www.ram.ac.uk/study/departments/opera/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u5171 4 \u9996\uFF1A\u4E00\u9996\u6B4C\u5267\u548F\u53F9\u8C03 + \u4E00\u9996\u6E05\u5531\u5267\u548F\u53F9\u8C03 + \u4E24\u9996\u827A\u672F\u6B4C\u66F2
- \u81F3\u5C11\u4E00\u9996\u7528\u82F1\u8BED\u6216\u82F1\u8BD1\u7248\u672C\u6F14\u5531`,
        en: "An operatic aria, an oratorio aria, two art songs. One item must be sung in English or English translation.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u4E0D\u5FC5\u4E00\u955C\u5230\u5E95\uFF0C\u4F46\u987B\u6765\u81EA\u540C\u4E00\u5F55\u5236\u573A\u6B21
- **\u622A\u6B62 2026 \u5E74 10 \u6708 31 \u65E5\u4E2D\u5348\uFF08\u82F1\u56FD\u65F6\u95F4\uFF09**`,
        en: "For candidates submitting a video, the recordings do not have to be in a single 'take' but should be from the same recording session. Deadline 31 October 2026, noon UK time.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: "- \u8003\u751F\u81EA\u9009\u9996\u66F2\uFF0C\u8BC4\u59D4\u518D\u9009\u540E\u7EED\u66F2\u76EE",
        en: "For an in-person audition you will choose the first item to sing and we will select any further items we wish to hear.",
        enType: "original",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: ["live", "online"],
        zh: "- \u53EF\u80FD\u4E0E\u7814\u7A76\u751F\u5BFC\u5E08\u9762\u8BD5\uFF08\u7EBF\u4E0A\u6216\u73B0\u573A\uFF09\u8BA8\u8BBA\u5B66\u4E60\u8BA1\u5212\uFF1B\u65E0\u89C6\u5531\u7EC3\u8033\u6D4B\u8BD5",
        en: "You may be asked to have a subsequent interview with one of the postgraduate programme tutors (online or in person) where you can discuss your study plans.",
        enType: "original",
        t: "\u540E\u7EED\u9762\u8BD5\uFF08\u7EBF\u4E0A\u6216\u73B0\u573A\uFF09",
        ten: "Follow-up interview (online or in person)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-aud-strings",
      level: "UG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "BMus Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/strings/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u53E4\u5178\u65F6\u671F\u534F\u594F\u66F2\u7B2C\u4E00\u4E50\u7AE0\uFF08\u542B\u534E\u5F69\uFF09\uFF0C\u5EFA\u8BAE\u4F5C\u66F2\u5BB6\uFF1A\u6D77\u987F\u3001\u83AB\u624E\u7279\u3001\u970D\u592B\u8FC8\u65AF\u7279\u3001\u65BD\u5854\u7C73\u8328\uFF1B\u9009\u5176\u4ED6\u4F5C\u66F2\u5BB6\u987B\u4E3A\u540C\u4E00\u65F6\u671F
- \u53E6\u52A0\u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2
- \u4E0D\u8981\u6C42\u80CC\u8C31\uFF1B\u9F13\u52B1\u9009\u62E9\u8F83\u5C11\u88AB\u6F14\u594F\u7684\u4F5C\u66F2\u5BB6\u4F5C\u54C1`,
        en: "First movement (with cadenza) of a Classical concerto, suggested composers include Haydn, Mozart, Hoffmeister and Stamitz. Other composers' works, if chosen, should be of this period. In addition, a contrasting piece of your own choice. There is no requirement to perform from memory in your audition.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u6F14\u594F\u90E8\u5206\u987B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u526A\u8F91\u3001\u66F2\u76EE\u95F4\u4E0D\u4E2D\u65AD\uFF08\u786E\u6709\u56F0\u96BE\u53EF\u5206\u5F00\u5F55\u5236\u5404\u66F2\u76EE\uFF09
- \u53EF\u7528 minus-one \u4F34\u594F\u97F3\u8F68\uFF0C\u65E0\u9700\u73B0\u573A\u4F34\u594F\uFF1B\u53EF\u7528\u8C31\u67B6\uFF08\u4E0D\u5F97\u906E\u6321\u6F14\u594F\uFF09
- UCAS \u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF1BAcceptd \u5F55\u50CF\uFF08\u542B\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF09\u622A\u6B62 10 \u6708 27 \u65E5`,
        en: "The performance element of your video submission must be in one take i.e. not edited and with no breaks between items. Minus-one backing tracks and a music stand are allowed. UCAS deadline 2 October 2026, 6pm; upload recordings (including the spoken English introduction) to Acceptd by 27 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: `- \u66F2\u76EE\u540C\u4E0A
- \u53EF\u80FD\u9762\u8BD5\u5E76\u8BA8\u8BBA\u4E00\u6BB5\u97F3\u4E50\u8282\u9009\uFF1B\u542C\u529B\u6D4B\u8BD5\uFF1A\u89C6\u5531\u3001\u548C\u5F26\u3001\u97F3\u7A0B\u3001\u8282\u594F\u89C6\u594F`,
        en: "Same repertoire; you may be interviewed about a short extract of music and take aural tests (sight-singing, chords, intervals, rhythm).",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-aud-doublebass",
      level: "ALL",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus / MA / MMus Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/strings/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u81EA\u9009\u72EC\u594F\u66F2 + \u4E24\u6BB5\u81EA\u9009\u7BA1\u5F26\u4E50\u7247\u6BB5
- \u4E0D\u8981\u6C42\u80CC\u8C31`,
        en: "Double Bass: One solo piece and two orchestral excerpts of your own choice. There is no requirement to perform from memory.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u6F14\u594F\u90E8\u5206\u987B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u526A\u8F91\u3001\u66F2\u76EE\u95F4\u4E0D\u4E2D\u65AD\uFF08\u786E\u6709\u56F0\u96BE\u53EF\u5206\u5F00\u5F55\u5236\u5404\u66F2\u76EE\uFF09
- \u53EF\u7528 minus-one \u4F34\u594F\u97F3\u8F68\uFF0C\u65E0\u9700\u73B0\u573A\u4F34\u594F\uFF1B\u53EF\u7528\u8C31\u67B6\uFF08\u4E0D\u5F97\u906E\u6321\u6F14\u594F\uFF09
- UCAS \u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF1BAcceptd \u5F55\u50CF\uFF08\u542B\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF09\u622A\u6B62 10 \u6708 27 \u65E5`,
        en: "The performance element of your video submission must be in one take i.e. not edited and with no breaks between items. Minus-one backing tracks and a music stand are allowed. UCAS deadline 2 October 2026, 6pm; upload recordings (including the spoken English introduction) to Acceptd by 27 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: `- \u66F2\u76EE\u540C\u4E0A
- \u672C\u79D1\u53EF\u80FD\u52A0\u8BD5\u89C6\u5531\u7EC3\u8033\uFF1B\u7814\u7A76\u751F\u4E3A\u5BFC\u5E08\u9762\u8BD5`,
        en: "Same repertoire; undergraduates may take aural tests, postgraduates have a tutor interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "MA / MMus Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.ram.ac.uk/study/departments/strings/audition-requirements"],
      school: "ram",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996 1800 \u5E74\u4EE5\u540E\u91CD\u8981\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0
- \u53E6\u52A0\u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2
- \u4E0D\u8981\u6C42\u80CC\u8C31`,
        en: "First movement of a major post-1800 concerto, and a contrasting piece of your own choice. There is no requirement to perform from memory.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- \u6F14\u594F\u90E8\u5206\u987B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u526A\u8F91\u3001\u66F2\u76EE\u95F4\u4E0D\u4E2D\u65AD\uFF08\u786E\u6709\u56F0\u96BE\u53EF\u5206\u5F00\u5F55\u5236\u5404\u66F2\u76EE\uFF09
- \u53EF\u7528 minus-one \u4F34\u594F\u97F3\u8F68\uFF0C\u65E0\u9700\u73B0\u573A\u4F34\u594F\uFF1B\u53EF\u7528\u8C31\u67B6\uFF08\u4E0D\u5F97\u906E\u6321\u6F14\u594F\uFF09
- UCAS \u7533\u8BF7\u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5 18:00\uFF1BAcceptd \u5F55\u50CF\uFF08\u542B\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF09\u622A\u6B62 10 \u6708 27 \u65E5`,
        en: "The performance element of your video submission must be in one take i.e. not edited and with no breaks between items. Minus-one backing tracks and a music stand are allowed. UCAS deadline 2 October 2026, 6pm; upload recordings (including the spoken English introduction) to Acceptd by 27 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08\u89C6\u9891\u7533\u8BF7\u8005\uFF09",
        ten: "Recorded audition (video candidates)"
      }, {
        k: "live",
        zh: `- \u66F2\u76EE\u540C\u4E0A
- \u53EF\u80FD\u4E0E\u7814\u7A76\u751F\u5BFC\u5E08\u9762\u8BD5\u8BA8\u8BBA\u5B66\u4E60\u8BA1\u5212\uFF1B\u65E0\u89C6\u5531\u7EC3\u8033\u6D4B\u8BD5`,
        en: "Same repertoire; you may be interviewed by a postgraduate tutor about your study plans. No aural tests.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027/28 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires \u63D0\u4EA4\u7533\u8BF7 + Acceptd \u4E0A\u4F20\u5F55\u50CF\u3001\u66F2\u76EE\u5355\u3001CV\u3001\u4E66\u9762\u6750\u6599\u3001\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD
## \u622A\u6B62\u65E5\u671F\uFF08\u82F1\u56FD\u65F6\u95F4\uFF09
- **\u540C\u7B49\u8003\u8651\u622A\u6B62**\uFF1A\u94A2\u7434\u3001\u58F0\u4E50\u3001Ensemble Piano \u4E3A 2026 \u5E74 10 \u6708 1 \u65E5 18:00\uFF1B\u5F26\u4E50 UCAS \u4E3A 10 \u6708 2 \u65E5 18:00
- Acceptd \u6750\u6599\uFF1A\u94A2\u7434 / \u58F0\u4E50\u672C\u79D1 10 \u6708 2 \u65E5 18:00\uFF1B\u58F0\u4E50\u7814\u7A76\u751F 10 \u6708 31 \u65E5\u4E2D\u5348\uFF1B\u5F26\u4E50 10 \u6708 27 \u65E5\uFF1B\u6B4C\u5267 10 \u6708 25 \u65E5\u4E2D\u5348
- \u7EBD\u7EA6\u73B0\u573A\u8003\u70B9\uFF1A\u666E\u904D 2027 \u5E74 1 \u6708 13 \u65E5 18:00
- \u903E\u671F\u7533\u8BF7\u53EF\u80FD\u53D7\u7406\uFF0C\u4F46\u4E0D\u4FDD\u8BC1\u540C\u7B49\u8003\u8651
## \u8D39\u7528
- \u7533\u8BF7\u8D39 \xA3100\uFF08\u5404\u4E13\u4E1A\u7EDF\u4E00\uFF09`,
      en: `Apply through UCAS Conservatoires, then upload recordings, repertoire list, CV, written work and a spoken English introduction to Acceptd.
Equal consideration deadline: 1 October 2026, 6pm UK time (piano, voice, Ensemble Piano); strings UCAS deadline 2 October 2026, 6pm. Acceptd deadlines vary by department (piano/voice UG 2 October; voice PG 31 October noon; strings 27 October; opera 25 October noon). New York auditions: 13 January 2027. Late applications may be accepted without guaranteed consideration.
Application fee: \xA3100.`,
      enType: "summary",
      src: ["https://www.ram.ac.uk/study/entry-requirements", "https://www.ram.ac.uk/study/departments/strings/audition-requirements"],
      school: "ram",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2026/27 Tuition (for reference)",
      zh: `- BMus \u56FD\u9645\u5B66\u751F\uFF1A\xA330,850 / \u5E74\uFF08\u82F1\u56FD\u672C\u5730\u751F \xA310,050\uFF09
- \u4EE5\u4E0A\u4E3A 2026/27 \u516C\u5E03\u6570\u5B57\uFF0C\u5165\u5B66\u5E74\u53EF\u80FD\u4E0A\u8C03\uFF1B\u5C31\u8BFB\u671F\u95F4\u5B66\u8D39\u4E5F\u53EF\u80FD\u4E0A\u6DA8`,
      en: "BMus: \xA330,850 per year for international students (UK \xA310,050). 2026/27 published figures; fees may increase during studies.",
      enType: "summary",
      src: ["https://www.ram.ac.uk/courses/piano-bmus"],
      school: "ram",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2026/27 Tuition (for reference)",
      zh: `- MA / MMus Performance\uFF08\u4EE5\u58F0\u4E50\u4E3A\u4F8B\uFF09\u56FD\u9645\u5B66\u751F\uFF1A\xA336,850 / \u5E74\uFF08\u82F1\u56FD \xA318,100\uFF09
- Ensemble Piano \u56FD\u9645\u5B66\u751F\uFF1A\xA331,200 / \u5E74\uFF08\u82F1\u56FD \xA315,350\uFF09
- \u5404\u4E13\u4E1A\u53EF\u80FD\u7565\u6709\u5DEE\u5F02\uFF0C\u4EE5\u8BFE\u7A0B\u9875\u4E3A\u51C6\uFF1B\u5165\u5B66\u5E74\u53EF\u80FD\u4E0A\u8C03`,
      en: "MA/MMus Performance (voice as example): \xA336,850 per year for international students (UK \xA318,100). Ensemble Piano: \xA331,200 per year international (UK \xA315,350). Figures vary by programme and may increase.",
      enType: "summary",
      src: ["https://www.ram.ac.uk/courses/voice-mmus-performance", "https://www.ram.ac.uk/courses/ensemble-piano-ma-performance"],
      school: "ram",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons)",
      zh: `- \u4E0D\u8BBE\u79D1\u76EE\u9650\u5236\uFF0C\u4EFB\u4F55\u79D1\u76EE\u7EC4\u5408\u5747\u53EF\uFF1B\u4E0D\u8BBE UCAS Tariff \u5206\u6570\u7EBF\uFF0C\u4EE5\u8003\u8BD5 / \u9762\u8BD5\u4E3A\u6838\u5FC3\u5F55\u53D6\u4F9D\u636E
- 2 \u95E8 A-Level \u901A\u8FC7\uFF08A*\u2013E\uFF09\uFF1BBTEC National Extended Diploma PPP \u6216 National Diploma PP
- IB \u6587\u51ED 24 \u5206\uFF1BAccess to HE Diploma Pass\uFF1BT Level Pass\uFF08\u6838\u5FC3 D \u6216 E\uFF09\uFF1BRSL Level 3 Pass
- \u4E2D\u56FD\u9AD8\u4E2D\u5B66\u5386\u672A\u5355\u5217\u5BF9\u7167\uFF0C\u6309\u56FD\u9645\u5B66\u5386\u4E2A\u6848\u5BA1\u6838\uFF08music.applications@gsmd.ac.uk\uFF09`,
      en: `We do not have subject requirements for entry to these courses. We will accept any subjects from suitable qualifications and with the required grades.
2 A-Levels (GCE Advanced A2) \u2014 Pass (grades A*-E); BTEC (QCF) National Extended Diploma \u2014 PPP; BTEC (QCF) National Diploma \u2014 PP; International Baccalaureate (IB) Diploma \u2014 24 points; Access to HE Diploma \u2014 Pass; T Level - overall grade \u2014 Pass (D or E on the core); RSL Level 3 Diploma for Music Practitioners \u2014 Pass.`,
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/apply-to-guildhall/academic-entry-criteria"],
      school: "guildhall",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MMus / MPerf / MComp \xB7 Advanced Artist Diploma",
      zh: `- **MMus / MPerf / MComp**\uFF1A\u901A\u5E38\u987B\u6301\u8363\u8A89\u5B66\u58EB\u5B66\u4F4D\u6216\u56FD\u9645\u540C\u7B49\u5B66\u5386\uFF1B\u4E0D\u8BBE\u5B66\u4F4D\u7B49\u7EA7\u7EBF\uFF0C\u672A\u8FBE\u5B66\u5386\u8005\u6309\u65E2\u5F80\u5B66\u672F\u4E0E\u4E13\u4E1A\u7ECF\u5386\u7EFC\u5408\u8BC4\u4F30
- \u4E3B\u4FEE\u6C34\u5E73\u6682\u672A\u8FBE\u7855\u58EB\u5165\u5B66\u6807\u51C6\u8005\uFF0C\u53EF\u80FD\u83B7\u5F97\u5EF6\u957F\u8BFE\u7A0B\uFF08extended programme\uFF09\u7684\u5F55\u53D6
- **Advanced Artist Diploma**\uFF1A\u901A\u5E38\u987B\u5DF2\u5B8C\u6210\u4E24\u5E74\u5168\u65E5\u5236\u97F3\u4E50\u7855\u58EB\u6216\u56FD\u9645\u540C\u7B49\u5B66\u5386`,
      en: `MMus, MPerf, MComp: Applicants should normally have obtained a Bachelor's degree with Honours, or an international equivalent.
Artist Diploma: Applicants should normally have obtained a two-year full-time Masters of Music Degree or international equivalent.
Applicants may be offered a place on the extended programme if their Principal Study is not yet at Masters entry level.`,
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/apply-to-guildhall/academic-entry-criteria", "https://www.gsmd.ac.uk/study-with-guildhall/music/mmusmperf-in-performance-guildhall-artist"],
      school: "guildhall",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-english",
      level: "ALL",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus \xB7 MMus \xB7 MPerf \xB7 MComp \xB7 Advanced Certificate",
      zh: `\u97F3\u4E50\u7C7B\u672C\u79D1\u4E0E\u7855\u58EB\u4E3A\u540C\u4E00\u6863\uFF1A
- **IELTS Academic \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT\uFF1A2026 \u5E74 1 \u6708 20 \u65E5\u524D\u8003\u8BD5\u603B\u5206 72\uFF08\u9605\u8BFB 18 / \u542C\u529B 17 / \u53E3\u8BED 20 / \u5199\u4F5C 17\uFF09\uFF1B1 \u6708 21 \u65E5\u8D77\u65B0\u8BA1\u5206\u5236\u603B\u5206 4\uFF0C\u5404\u5355\u9879 4
- PTE Academic \u603B\u5206 59\uFF0C\u5404\u5355\u9879 59\uFF1BCambridge B2 First / C1 Advanced 160\uFF1BLanguageCert 60\uFF1BTrinity ISE II \u56DB\u9879\u901A\u8FC7\uFF1BOxford ELLT 5
- **\u4E0D\u63A5\u53D7 Duolingo**
- \u66F4\u9AD8\u6863\uFF1AMA Opera Making & Writing\u3001\u535A\u58EB\u7B49\u4E3A IELTS 7.0\uFF08\u5355\u9879 6.0\uFF09\uFF1BMA Music Therapy \u4E3A 7.0\uFF08\u5355\u9879 5.5\uFF09`,
      en: `Music programmes (BMus, MMus, MPerf/MComp, Artist Diploma, Short Term Music Programme, Advanced Certificate):
IELTS Academic: Overall score of 5.5, with a minimum of 5.5 in all four skills.
TOEFL iBT (tests taken 20 January 2026 or earlier): Overall score of 72, with minimums of Reading 18, Listening 17, Speaking 20, Writing 17. TOEFL iBT (tests taken 21 January 2026 onwards): Overall score of 4, with a minimum of 4 in all four skills.
PTE Academic: Overall score of 59, with a minimum of 59 in all four components. Cambridge B2 First/C1 Advanced: Overall score of 160 and no less than 160 in any component. Trinity College London ISE II/III/IV: Pass in all 4 components. LanguageCert Academic: Overall score of 60 with a minimum of 60 in each component score. Oxford ELLT: Overall score of 5 with a minimum of 5 in each component score.`,
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/apply-to-guildhall/academic-entry-criteria/english-language-entry-criteria"],
      school: "guildhall",
      country: "UK",
      ielts: [{
        p: "BMus / MMus / MPerf / MComp",
        pen: "BMus / MMus / MPerf / MComp",
        o: "5.5",
        m: "5.5",
        n: "\u4E0D\u63A5\u53D7 Duolingo",
        nen: "Duolingo not accepted"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Keyboard (Piano)",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/keyboard-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE\uFF0C\u5168\u90E8\u80CC\u8C31\u6F14\u594F
- \u73B0\u573A\u4E0E\u5F55\u50CF\u8981\u6C42\u76F8\u540C\uFF0C\u65E0\u5355\u72EC\u9884\u5BA1\u73AF\u8282`,
        en: "Three contrasting pieces of your own choice are to be played from memory. The same requirements apply to live and recorded auditions; there is no separate pre-screening.",
        enType: "summary"
      }, {
        k: "live",
        zh: "- \u4F26\u6566 2026 \u5E74 11\u201312 \u6708\uFF1B\u6D77\u5916\u8003\u70B9\uFF1A\u9752\u5C9B 11 \u6708 14 \u65E5\uFF08\u6885\u7EBD\u56E0\u5B66\u6821\uFF09\u3001\u9999\u6E2F 11 \u6708 9\u201311 \u65E5\u3001\u9996\u5C14 11 \u6708 16 \u65E5\u3001\u4E1C\u4EAC 11 \u6708 17 \u65E5\uFF0C\u6D77\u5916\u73B0\u573A\u987B\u81EA\u5907\u4F34\u594F",
        en: "London, November\u2013December 2026; overseas venues: Qingdao 14 November (Yehudi Menuhin School), Hong Kong 9\u201311 November, Seoul 16 November, Tokyo 17 November.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u4F26\u6566\u6216\u6D77\u5916\u8003\u70B9\uFF09",
        ten: "Live audition (London or overseas)"
      }, {
        k: "rec",
        zh: "- \u5F55\u50CF\u4E0A\u4F20\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5\uFF08\u4E3B\u7533\u8BF7\u622A\u6B62 10 \u6708 1 \u65E5\uFF09",
        en: "Recorded audition upload deadline 23 October 2026 (application deadline 1 October 2026).",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5",
        ten: "Recorded audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Keyboard \xB7 Advanced Artist Diploma",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/keyboard-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- 60 \u5206\u949F\u591A\u6837\u5316\u72EC\u594F\u4F1A\u8282\u76EE\u5355\uFF0C\u5168\u90E8\u80CC\u8C31",
        en: "A varied recital programme of 60 minutes (to be played from memory).",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u8003\u5B98\u4ECE\u8282\u76EE\u5355\u4E2D\u9009\u6BB5
- \u987B\u643A\u5E26\u8FD1\u4E24\u5E74\u6F14\u51FA\u66F2\u76EE\u7684\u4E66\u9762\u6E05\u5355`,
        en: "The audition panel will choose extracts. Bring a printed list of repertoire performed in the last two years.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: `- \u63D0\u4EA4\u80FD\u4F53\u73B0 60 \u5206\u949F\u8282\u76EE\u5355\u7684\u5F55\u50CF + \u8FD1\u4E24\u5E74\u66F2\u76EE\u6E05\u5355
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5`,
        en: "Submit video recording(s) demonstrating a varied recital programme of 60 minutes, with a repertoire list; deadline 23 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5",
        ten: "Recorded audition"
      }, {
        k: "all",
        zh: `- \u7B2C\u4E00\u9636\u6BB5\u540C MMus / MPerf \u8981\u6C42\uFF0C\u4F46\u6F14\u594F\u6807\u51C6\u66F4\u9AD8
- \u7B2C\u4E8C\u9636\u6BB5\uFF1A\u827A\u672F\u5BB6 CV + \u8FD1\u4E00\u5E74\u5F55\u50CF\u4F5C\u54C1
- \u7B2C\u4E09\u9636\u6BB5\uFF1A\u63D0\u4EA4 Context and Development Plan\uFF08CDP\uFF09\uFF0C\u4F5C\u4E3A offer \u6761\u4EF6`,
        en: "First Stage requirements are comparable to MMus/MPerf, but the expected standard of performance at Advanced Artist Diploma level is higher. Second Stage: artist CV and recent recordings. Third Stage: a Context and Development Plan as a condition of offer.",
        enType: "summary",
        t: "Advanced Artist Diploma\uFF08\u4E09\u9636\u6BB5\uFF09",
        ten: "Advanced Artist Diploma (three stages)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "Collaborative Piano \xB7 Repetiteur Studies",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/keyboard-auditions", "https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/opera-studies-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "live",
        zh: `- \u4E00\u9996\u81EA\u9009\u72EC\u594F\u66F2
- \u4E00\u9996\u5668\u4E50\u5408\u4F5C\u66F2\u76EE\uFF1A\u8D1D\u591A\u82AC\u5C0F\u63D0\u7434\u594F\u9E23\u66F2\uFF08\u4ECE\u5B66\u6821\u6307\u5B9A\u9009\u9879\u4E2D\u9009\uFF09
- \u4E24\u9996\u58F0\u4E50\u5408\u4F5C\u66F2\u76EE\uFF1AList A\uFF08\u5FB7\u5F6A\u897F\uFF09\u9009\u4E00\u9996 + List B\uFF08\u65BD\u7279\u52B3\u65AF / \u9A6C\u52D2\uFF0C\u6307\u5B9A\u8C03\u6027\uFF09\u9009\u4E00\u9996
- \u89C6\u594F + \u7B80\u77ED\u9762\u8BD5\uFF1B\u4F26\u6566\u73B0\u573A\u5B66\u6821\u53EF\u63D0\u4F9B\u642D\u6863\uFF0C\u6D77\u5916\u8003\u751F\u987B\u81EA\u5E26`,
        en: "One solo piece; one instrumental work (a Beethoven violin sonata from the School's list); two songs, one from List A (Debussy) and one from List B (Strauss/Mahler, in specified keys); sight-reading and a short interview. Partners are provided in London; overseas candidates bring their own.",
        enType: "summary",
        t: "Collaborative Piano \xB7 \u73B0\u573A\u8003\u8BD5\uFF08\u4F26\u6566\uFF0C\u6682\u5B9A 2026-11-26\uFF09",
        ten: "Collaborative Piano \xB7 Live audition (London, provisionally 26 Nov 2026)"
      }, {
        k: "rec",
        zh: `- \u63D0\u4EA4\u4E0E\u58F0\u4E50 / \u5668\u4E50\u642D\u6863\u5408\u4F5C\u6F14\u51FA\u7684\u5F55\u50CF + \u5DF2\u5B66\u5408\u4F5C\u66F2\u76EE\u6E05\u5355
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5`,
        en: "Video of the set repertoire with your partners plus a list of collaborative repertoire studied; deadline 23 October 2026.",
        enType: "summary",
        t: "Collaborative Piano \xB7 \u7B2C\u4E00\u8F6E\u5F55\u50CF",
        ten: "Collaborative Piano \xB7 Round 1 recording"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u521D\u5BA1\u901A\u8FC7\u8005\u53C2\u52A0\u8FDC\u7A0B\u89C6\u9891\u590D\u8BD5\uFF0C\u542B\u5C4F\u5E55\u5171\u4EAB\u89C6\u594F",
        en: "Applicants who pass the recording review take a remote video recall including screen-shared sight-reading.",
        enType: "summary",
        t: "Collaborative Piano \xB7 \u7EBF\u4E0A\u590D\u8BD5",
        ten: "Collaborative Piano \xB7 Online recall"
      }, {
        k: "all",
        zh: `- 60 \u5206\u949F\u66F2\u76EE\uFF0C\u4EE5\u5408\u4F5C\u66F2\u76EE\u4E3A\u4E3B\uFF08\u72EC\u594F\u4E0D\u8D85\u8FC7 30 \u5206\u949F\uFF09\uFF0C\u73B0\u573A\u6216\u5F55\u50CF\uFF1B\u542B\u89C6\u594F\u4E0E\u9762\u8BD5
- \u5F55\u50CF\u8DEF\u7EBF\u4E4B\u540E\u6709\u8FDC\u7A0B\u590D\u8BD5\uFF08\u5C4F\u5E55\u5171\u4EAB\u89C6\u594F\uFF09\uFF1B\u518D\u5BA1 CV \u4E0E\u5F55\u50CF\u4F5C\u54C1\uFF0C\u6700\u540E\u63D0\u4EA4 CDP`,
        en: "60 minutes of mainly collaborative repertoire (solo no more than 30 minutes), live or recorded, with sight-reading and interview; remote recall for recorded route; then CV/recording review and a CDP.",
        enType: "summary",
        t: "Advanced Artist Diploma\uFF08Collaborative Piano\uFF09",
        ten: "Advanced Artist Diploma (Collaborative Piano)"
      }, {
        k: "live",
        zh: `- \u5F39\u5531\u4E24\u9996\u5BF9\u6BD4\u7684\u6B4C\u5267\u9009\u6BB5\uFF08\u81EA\u9009\uFF0C\u81F3\u5C11\u4E00\u9996\u4E3A\u91CD\u5531\u6BB5\u843D\uFF09
- \u6B4C\u5267\u58F0\u4E50\u8C31\u89C6\u594F\uFF1B\u8DDF\u968F\u6307\u6325\u624B\u52BF\u6F14\u594F\uFF1B\u6CD5\u3001\u5FB7\u3001\u610F\u8BED\u97F3\u6D4B\u8BD5`,
        en: "Play and sing two contrasting operatic excerpts (at least one ensemble), vocal score sight-reading, following a conductor, and French/German/Italian language tests.",
        enType: "summary",
        t: "Repetiteur \xB7 \u73B0\u573A\u8003\u8BD5\uFF08\u7EA6 2027 \u5E74 1\u20132 \u6708\uFF09",
        ten: "Repetiteur \xB7 Live audition (around Jan\u2013Feb 2027)"
      }, {
        k: "rec",
        zh: "- \u5F55\u50CF\u4F53\u73B0\u4E0A\u8FF0\u4E24\u9996\u6B4C\u5267\u9009\u6BB5\uFF1B\u622A\u6B62 2027 \u5E74 1 \u6708 4 \u65E5",
        en: "Recording of the two operatic excerpts; deadline 4 January 2027.",
        enType: "summary",
        t: "Repetiteur \xB7 \u5F55\u50CF\u7B2C\u4E00\u8F6E",
        ten: "Repetiteur \xB7 Round 1 recording"
      }, {
        k: "online",
        zh: "- \u7EBF\u4E0A\u5B9E\u65F6\u590D\u8BD5\uFF1A\u89C6\u594F\u3001\u8DDF\u968F\u6307\u6325\u3001\u8BED\u97F3\u6D4B\u8BD5",
        en: "Live online recall with sight-reading, conductor-following and language tests.",
        enType: "summary",
        t: "Repetiteur \xB7 \u7EBF\u4E0A\u7B2C\u4E8C\u8F6E",
        ten: "Repetiteur \xB7 Online round 2"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Vocal Studies",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/vocal-studies-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u8BED\u8A00\u4E0E\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF08\u53EF\u542B\u4E00\u9996\u97F3\u4E50\u5267\u6216\u8DE8\u754C\u66F2\u76EE\uFF09
- \u4E00\u6BB5\u7B80\u77ED\u72EC\u767D\u3001\u8BD7\u6B4C\u6216\u6563\u6587
- \u5168\u90E8\u80CC\u8C31\uFF1B\u7CFB\u91CC\u4EE5\u53E4\u5178\u58F0\u4E50\u804C\u4E1A\u8BAD\u7EC3\u4E3A\u4E3B\uFF08\u827A\u672F\u6B4C\u66F2\u3001\u6E05\u5531\u5267\u3001\u8F7B\u6B4C\u5267\u4E0E\u6B4C\u5267\uFF09`,
        en: "Three contrasting pieces in a variety of languages and styles (which may include one piece of musical theatre or crossover if you wish). A short monologue, poem or piece of prose. Everything should be performed from memory.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u7B2C\u4E00\u8F6E\uFF1A\u8003\u751F\u81EA\u9009\u7B2C\u4E00\u9996\uFF0C\u8003\u5B98\u9009\u5B9A\u7B2C\u4E8C\u9996
- \u7B2C\u4E8C\u8F6E\uFF1A\u8003\u751F\u81EA\u9009\u4E00\u9996\uFF0C\u8003\u5B98\u4ECE\u4F59\u4E0B\u66F2\u76EE\u9009\u4E00\u9996\uFF0C\u5E76\u9762\u8BD5`,
        en: "Round 1: you choose the first piece and the panel chooses the second. Round 2: you choose one piece, the panel chooses one from the remainder, followed by an interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u4E24\u8F6E\uFF09",
        ten: "Live audition (two rounds)"
      }, {
        k: "rec",
        zh: `- \u66F2\u76EE\u540C\u73B0\u573A\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5
- \u5728\u58F0\u5B66\u6761\u4EF6\u826F\u597D\u7684\u7A7A\u95F4\u5F55\u5236\uFF0C\u89C6\u9891\u4E2D\u6807\u6CE8\u66F2\u540D\u3001\u6B4C\u5267 / \u6B4C\u96C6\u540D\u4E0E\u4F5C\u66F2\u5BB6\uFF1B\u4E0D\u8981\u6C42\u4E13\u4E1A\u5F55\u97F3\u68DA`,
        en: "Same repertoire; deadline 23 October 2026. Record in a good acoustic, caption each title, opera/song cycle and composer; professional recordings are not required.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u901A\u8FC7\u8005\u8FDB\u5165\u7EBF\u4E0A\u9762\u8BD5\uFF0C\u5B89\u6392\u5728 2026 \u5E74 11 \u6708 23 \u65E5\u5F53\u5468",
        en: "Recorded applicants who pass are invited to an online interview in the week of 23 November 2026.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf / Advanced Certificate Vocal Studies",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/vocal-studies-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u56DB\u9996\u8BED\u8A00\u4E0E\u98CE\u683C\u5404\u5F02\u7684\u66F2\u76EE\uFF0C\u987B\u81F3\u5C11\u542B\u4E00\u9996\u6B4C\u5267\u548F\u53F9\u8C03\u4E0E\u4E00\u9996\u827A\u672F\u6B4C\u66F2
- \u4E00\u6BB5\u7B80\u77ED\u72EC\u767D\u3001\u8BD7\u6B4C\u6216\u6563\u6587\uFF1B\u5168\u90E8\u80CC\u8C31`,
        en: "Four pieces in a variety of languages and styles. This must include at least one operatic aria and one art song. Plus a short monologue, poem or piece of prose. All material performed from memory.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u7B2C\u4E00\u8F6E\uFF1A\u8003\u751F\u81EA\u9009\u9996\u66F2\uFF0C\u8003\u5B98\u5B9A\u7B2C\u4E8C\u9996
- \u7B2C\u4E8C\u8F6E\uFF1A\u8003\u5B98\u4ECE\u4F59\u4E0B\u66F2\u76EE\u9009\uFF08\u53EF\u80FD\u542B\u6717\u8BF5\uFF09+ \u7B80\u77ED\u9762\u8BD5`,
        en: "Round 1: you choose the first piece and the panel the second. Round 2: the panel selects from the remaining material (possibly the spoken text) and a short interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u4E24\u8F6E\uFF09",
        ten: "Live audition (two rounds)"
      }, {
        k: "rec",
        zh: "- \u66F2\u76EE\u540C\u73B0\u573A\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5",
        en: "Same repertoire; deadline 23 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u7B2C\u4E8C\u8F6E\u7EBF\u4E0A\u9762\u8BD5\uFF0C2026 \u5E74 11 \u6708 23 \u65E5\u5F53\u5468",
        en: "Round 2 online interview in the week of 23 November 2026.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }, {
        k: "all",
        zh: `- \u4E94\u9996\u8BED\u8A00\u4E0E\u98CE\u683C\u5404\u5F02\u7684\u66F2\u76EE\uFF0C\u5168\u90E8\u80CC\u8C31 + \u9762\u8BD5
- \u4E4B\u540E\u63D0\u4EA4\u827A\u672F\u5BB6 CV \u4E0E\u8FD1\u4E00\u5E74\u5F55\u50CF\uFF0C\u6700\u540E\u63D0\u4EA4 CDP`,
        en: "Five pieces in a variety of languages and styles, all from memory, plus interview; then an artist CV and recent recordings, and a CDP.",
        enType: "summary",
        t: "Advanced Artist Diploma",
        ten: "Advanced Artist Diploma"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-opera",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "Opera Studies \xB7 Joint Vocal/Opera (PG only)",
      zh: "\u4EC5\u7814\u7A76\u751F\uFF08MMus\u3001Advanced Certificate\u3001Advanced Artist Diploma\uFF09\uFF1B\u6D77\u5916\u8003\u70B9\u4E0D\u8003\u6B4C\u5267\u65B9\u5411\u3002",
      en: "Postgraduate only; opera is not auditioned at overseas venues.",
      enType: "summary",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/opera-studies-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "live",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u6B4C\u5267\u548F\u53F9\u8C03\uFF0C\u5176\u4E2D\u4E00\u9996\u987B\u4E3A\u82F1\u8BED",
        en: "Two contrasting operatic arias, one in English.",
        enType: "summary",
        t: "\u73B0\u573A\u7B2C\u4E00\u8F6E\uFF082026-12-07 \u81F3 12-14\uFF09",
        ten: "Live round 1 (7\u201314 Dec 2026)"
      }, {
        k: "live",
        zh: `- \u53E6\u5916\u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u548F\u53F9\u8C03\uFF08\u81F3\u5C11\u4E00\u9996\u4E0E\u7B2C\u4E00\u8F6E\u4E0D\u540C\uFF09
- 30 \u5206\u949F\u5F62\u4F53\u4E0E\u620F\u5267\u5DE5\u4F5C\u574A\uFF08\u7A7F\u4FBF\u4E8E\u6D3B\u52A8\u7684\u670D\u88C5\uFF09`,
        en: "Two further contrasting arias (at least one different from round 1) and a 30-minute movement and drama workshop.",
        enType: "summary",
        t: "\u73B0\u573A\u7B2C\u4E8C\u8F6E\uFF082026-12-15 \u81F3 12-16\uFF09",
        ten: "Live round 2 (15\u201316 Dec 2026)"
      }, {
        k: "rec",
        zh: "- **\u4E09\u9996**\u98CE\u683C\u5BF9\u6BD4\u7684\u6B4C\u5267\u548F\u53F9\u8C03\uFF0C\u5176\u4E2D\u4E00\u9996\u987B\u4E3A\u82F1\u8BED",
        en: "Three contrasting operatic arias, one in English.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u901A\u8FC7\u89C6\u9891\u4F1A\u8BAE\u53C2\u52A0\u5728\u7EBF\u5DE5\u4F5C\u574A\uFF0812 \u6708 15\u201316 \u65E5\uFF09",
        en: "Online workshop by video conference (15\u201316 December 2026).",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u5DE5\u4F5C\u574A",
        ten: "Round 2 \xB7 Online workshop"
      }, {
        k: "all",
        zh: `- \u5171\u51C6\u5907\u4E09\u9996\uFF1A\u4E24\u9996\u6B4C\u5267\u548F\u53F9\u8C03\uFF08\u5176\u4E00\u4E3A\u82F1\u8BED\uFF09+ \u4E00\u9996\u827A\u672F\u6B4C\u66F2\uFF1B\u53E6\u5907\u72EC\u767D / \u8BD7\u6B4C / \u6563\u6587
- \u7B2C\u4E00\u8F6E\u5531 2\u20133 \u9996\uFF08\u8003\u751F\u9009\u7B2C\u4E00\u9996\uFF09\uFF1B\u7B2C\u4E8C\u8F6E\u7531\u8003\u5B98\u51B3\u5B9A\u8FDB\u5165\u58F0\u4E50\u3001\u6B4C\u5267\u6216\u4E24\u6761\u8DEF\u5F84
- \u58F0\u4E50\u8DEF\u5F84\uFF1A\u6717\u8BF5 + \u9762\u8BD5\uFF1B\u6B4C\u5267\u8DEF\u5F84\uFF1A\u4E24\u9996\u5BF9\u6BD4\u548F\u53F9\u8C03\uFF08\u5176\u4E00\u987B\u4E3A\u65B0\u66F2\u76EE\uFF09+ 30 \u5206\u949F\u5DE5\u4F5C\u574A\uFF0C\u6545\u987B\u518D\u5907\u7B2C\u4E09\u9996\u548F\u53F9\u8C03`,
        en: "Three pieces (two operatic arias, one in English, and one art song) plus a monologue, poem or prose. Round 1: two or three prepared pieces. In round 2 the panel decides between the vocal and/or opera pathway: vocal \u2014 spoken text and interview; opera \u2014 two contrasting arias (one new) and the workshop, so prepare a third aria.",
        enType: "summary",
        t: "\u8054\u5408 Vocal / Opera \u7533\u8BF7",
        ten: "Joint Vocal / Opera application"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-ug-aud-strings",
      level: "UG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "BMus Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/strings-harp-guitar-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u6807\u51C6\u66F2\u5E93\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u5F53\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "Violin/Viola/Cello: 1. The first movement from a concerto in the standard repertoire with cadenza where appropriate / 2. One contrasting piece of your own choice.",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4F26\u6566 2026 \u5E74 11\u201312 \u6708\uFF1B\u6D77\u5916\u8003\u70B9\uFF1A\u9752\u5C9B 11 \u6708 14 \u65E5\uFF08\u6885\u7EBD\u56E0\u5B66\u6821\uFF09\u3001\u9999\u6E2F 11 \u6708 9\u201311 \u65E5\u3001\u9996\u5C14 11 \u6708 16 \u65E5\u3001\u4E1C\u4EAC 11 \u6708 17 \u65E5\uFF0C\u6D77\u5916\u73B0\u573A\u987B\u81EA\u5907\u4F34\u594F",
        en: "London, November\u2013December 2026, or overseas venues (Qingdao 14 November, Hong Kong, Seoul, Tokyo).",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u66F2\u76EE\u4E0E\u73B0\u573A\u5B8C\u5168\u76F8\u540C\uFF1B\u5F55\u50CF\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5",
        en: "Same repertoire as the live audition; recording deadline 23 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u521D\u5BA1\u901A\u8FC7\u8005\u53D7\u9080\u4E0E\u7CFB\u4E3B\u4EFB / \u6559\u5E08\u7EBF\u4E0A\u9762\u8BD5",
        en: "Applicants who pass the recording review are invited to an online interview with the department.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-ug-aud-doublebass",
      level: "UG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/strings-harp-guitar-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE",
        en: "Double Bass: 1. Two contrasting pieces.",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4F26\u6566 2026 \u5E74 11\u201312 \u6708\uFF1B\u6D77\u5916\u8003\u70B9\uFF1A\u9752\u5C9B 11 \u6708 14 \u65E5\uFF08\u6885\u7EBD\u56E0\u5B66\u6821\uFF09\u3001\u9999\u6E2F 11 \u6708 9\u201311 \u65E5\u3001\u9996\u5C14 11 \u6708 16 \u65E5\u3001\u4E1C\u4EAC 11 \u6708 17 \u65E5\uFF0C\u6D77\u5916\u73B0\u573A\u987B\u81EA\u5907\u4F34\u594F",
        en: "London, November\u2013December 2026, or overseas venues (Qingdao 14 November, Hong Kong, Seoul, Tokyo).",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u66F2\u76EE\u4E0E\u73B0\u573A\u5B8C\u5168\u76F8\u540C\uFF1B\u5F55\u50CF\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5",
        en: "Same repertoire as the live audition; recording deadline 23 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u521D\u5BA1\u901A\u8FC7\u8005\u53D7\u9080\u4E0E\u7CFB\u4E3B\u4EFB / \u6559\u5E08\u7EBF\u4E0A\u9762\u8BD5",
        en: "Applicants who pass the recording review are invited to an online interview with the department.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Advanced Instrumental Studies",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/strings-harp-guitar-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u6807\u51C6\u66F2\u5E93\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u5F53\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996 1800 \u5E74\u540E\u521B\u4F5C\u3001\u4E0E\u94A2\u7434\u5408\u4F5C\u7684\u4E8C\u91CD\u594F\u594F\u9E23\u66F2\u7B2C\u4E00\u4E50\u7AE0\uFF08\u8D1D\u591A\u82AC\u594F\u9E23\u66F2\u5747\u53EF\uFF09
- \u8003\u5B98\u4ECE\u4E2D\u9009\u6BB5`,
        en: "The first movement of a concerto from the standard repertoire with cadenza where appropriate / The first movement of a duo sonata (with piano) written after 1800 (all Beethoven Sonatas can be accepted).",
        enType: "original",
        t: "Advanced Instrumental Studies"
      }, {
        k: "live",
        zh: "- \u5B66\u6821\u9F13\u52B1\u5C3D\u91CF\u53C2\u52A0\u73B0\u573A\u8003\u8BD5\uFF1A\u73B0\u573A\u97F3\u4E50\u4E92\u52A8\u3001\u7ED3\u8BC6\u7CFB\u91CC\u6559\u5E08",
        en: "The School encourages live auditions for real musical interaction and to meet key staff.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u6309\u73B0\u573A\u540C\u7B49\u8981\u6C42\u63D0\u4EA4\u5F55\u50CF\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5",
        en: "Pre-recorded video to the same requirements; deadline 23 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u901A\u8FC7\u8005\u83B7\u7EBF\u4E0A\u9762\u8BD5\u9080\u8BF7",
        en: "Applicants who pass are invited to an online interview.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }, {
        k: "all",
        zh: "- \u4E24\u9996\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2 + \u6307\u5B9A\u4E50\u961F\u7247\u6BB5",
        en: "You should prepare two contrasting pieces of your choice, and orchestral excerpts as listed here.",
        enType: "original",
        t: "Orchestral Artistry\uFF08\u4E0E LSO \u5408\u529E\uFF09",
        ten: "Orchestral Artistry (LSO)"
      }, {
        k: "all",
        zh: "- 60 \u5206\u949F\u591A\u6837\u5316\u72EC\u594F\u4F1A\u8282\u76EE\u5355 + \u8FD1\u4E24\u5E74\u66F2\u76EE\u6E05\u5355\u4E0E\u97F3\u4E50 CV",
        en: "You should prepare a varied recital programme of 60 minutes, from which the audition panel will choose extracts. A repertoire list of the works played in the last two years is required, along with a musical CV.",
        enType: "original",
        t: "Advanced Artist Diploma"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-pg-aud-doublebass",
      level: "PG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/strings-harp-guitar-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u6807\u51C6\u66F2\u5E93\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u5F53\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u4E0E\u94A2\u7434\u5408\u4F5C\u7684\u4E8C\u91CD\u594F\u594F\u9E23\u66F2\u7B2C\u4E00\u4E50\u7AE0`,
        en: "The first movement of a concerto from the standard repertoire with cadenza where appropriate / The first movement of a duo sonata (with piano).",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4F26\u6566\u73B0\u573A\u6216\u6D77\u5916\u8003\u70B9",
        en: "London or overseas venue.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u6309\u73B0\u573A\u540C\u7B49\u8981\u6C42\u63D0\u4EA4\u5F55\u50CF\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5",
        en: "Pre-recorded video to the same requirements; deadline 23 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u5F55\u50CF\u8003\u8BD5",
        ten: "Round 1 \xB7 Recorded audition"
      }, {
        k: "online",
        zh: "- \u5F55\u50CF\u901A\u8FC7\u8005\u83B7\u7EBF\u4E0A\u9762\u8BD5\u9080\u8BF7",
        en: "Applicants who pass are invited to an online interview.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-aud-jazz",
      level: "ALL",
      majors: ["popvoice", "popinst"],
      cat: "audition",
      order: 3,
      prog: "Jazz (incl. Jazz Vocals) \xB7 BMus / MMus / MPerf",
      zh: "Guildhall \u65E0\u6D41\u884C\u6F14\u5531 / \u6D41\u884C\u5668\u4E50\u5B66\u4F4D\uFF0CJazz \u662F\u6700\u63A5\u8FD1\u7684\u65B9\u5411\uFF0C\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u6D41\u7A0B\u76F8\u540C\u3002",
      en: "Guildhall has no popular voice/instrument degree; Jazz is the closest pathway. Same process for BMus and MMus/MPerf.",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/jazz-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "live",
        zh: `- \u4E24\u9996\u7235\u58EB\u6807\u51C6\u66F2\uFF1A\u4E00\u9996\u4E2D\u901F\u6216\u4E2D\u5FEB\u6447\u6446\uFF0C\u53E6\u4E00\u9996\u901F\u5EA6 / \u5F8B\u52A8\u5BF9\u6BD4\uFF0C\u5747\u987B\u542B\u5373\u5174\uFF1B\u63D0\u4F9B concert pitch \u4E3B\u9898\u8C31\uFF08lead sheet\uFF09
- \u4E00\u6BB5\u81EA\u5DF1\u6252\u8C31\u7684\u72EC\u594F\u7247\u6BB5\uFF0C\u81F3\u5C11 32 \u5C0F\u8282\uFF08\u6B4C\u624B\u4E0E\u6709\u97F3\u9AD8\u4E50\u5668\u914D\u539F\u5F55\u97F3\uFF09
- \u4E00\u9996\u81EA\u5DF1\u521B\u4F5C\u7684\u66F2\u76EE\u8C31 + \u5206\u6790\uFF0C\u6216\u6252\u8C31\u8BB0\u8C31 + \u7B80\u77ED\u5206\u6790
- \u9762\u8BD5\uFF0C\u53EF\u80FD\u542B\u89C6\u594F\u4E0E\u542C\u529B\uFF1B\u73B0\u573A\u63D0\u4F9B\u94A2\u7434\u3001\u8D1D\u65AF\u3001\u9F13\u4F34\u594F\uFF1B\u63D0\u524D\u7EA6 35 \u5206\u949F\u5230\u573A\uFF0C20\u201325 \u5206\u949F\u70ED\u8EAB`,
        en: "Perform two jazz standards, one as a medium or medium/up swing and the other in a contrasting tempo/feel. Both should involve improvisation. Performance of an excerpt (minimum 32 bars) of a solo you have transcribed. A score or lead sheet of a piece you have composed (with analysis), or notation of your transcription together with a short analysis of it. Interview. Accompaniment provided: piano, bass & drums.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: `- \u4E24\u6BB5\u89C6\u9891\uFF08\u6BCF\u6BB5\u4E0D\u8D85\u8FC7 4 \u5206\u949F\uFF09\u5C55\u793A\u4E24\u9996\u6807\u51C6\u66F2
- \u53E6\u9644\u6252\u8C31\u4E0E\u8BB0\u8C31 PDF\uFF1B\u5F55\u97F3\u8D28\u91CF\u4E0D\u662F\u91CD\u70B9\uFF0C\u624B\u673A\u5F55\u5236\u5373\u53EF
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5`,
        en: "Two videos (max 4 minutes each) of the standards, plus PDFs of the transcription and notation; a phone recording is perfectly adequate. Deadline 23 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5",
        ten: "Recorded audition"
      }, {
        k: "all",
        zh: `- Jazz Composition / Arranging \u53E6\u4EA4\u4E09\u4EFD\u98CE\u683C\u5BF9\u6BD4\u3001\u542B\u5373\u5174\u6BB5\u843D\u7684\u4F5C\u54C1\u96C6
- \u6D77\u5916\u8003\u70B9\u4E0D\u8003\u7235\u58EB\u9F13\u4E0E Jazz Composition`,
        en: "Jazz Composition/Arranging: a portfolio of three contrasting works including improvised sections. Jazz drums and composition are not auditioned overseas.",
        enType: "summary",
        t: "\u8865\u5145\u8BF4\u660E",
        ten: "Notes"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-port-epm",
      level: "ALL",
      majors: ["production", "songwriting", "musictech"],
      cat: "portfolio",
      order: 4,
      prog: "Electronic & Produced Music \xB7 BMus / MMus / MComp",
      zh: "\u65B9\u5411\u6DB5\u76D6\u7535\u5B50\u97F3\u4E50\u3001\u5F71\u89C6\u914D\u4E50\u3001\u58F0\u97F3\u827A\u672F\u3001\u6E38\u620F\u97F3\u9891\u3001\u73B0\u573A\u7535\u5B50\u3001\u6D41\u884C\u97F3\u4E50\u5236\u4F5C\u3001\u8BCD\u66F2\u521B\u4F5C\u7B49\uFF0C\u5165\u5B66\u9009\u4E00\u4E2A\u4E3B\u65B9\u5411\uFF0C\u53EF\u8DE8\u4FEE\u3002\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u6D41\u7A0B\u76F8\u540C\uFF1B\u6D77\u5916\u8003\u751F\u65E0\u73B0\u573A\u8003\u8BD5\u3002",
      en: "Covers electronic music, film music, sonic arts, game audio, live electronics, popular music production and songwriting. Same process for BMus, MMus, MComp and Advanced Certificate; no live audition for overseas applicants.",
      enType: "original",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-auditions-interviews/electronic-produced-music-auditions"],
      school: "guildhall",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u7533\u8BF7\u622A\u6B62 **2027 \u5E74 1 \u6708 5 \u65E5**\uFF0C\u4F5C\u54C1\u96C6\u622A\u6B62 **2027 \u5E74 1 \u6708 12 \u65E5**\uFF08Dropbox\uFF09
- CV\u3001EPK \u6216\u5176\u4ED6\u8BF4\u660E\u521B\u4F5C / \u5236\u4F5C\u7ECF\u5386\u7684\u6587\u4EF6
- 5\u201310 \u5206\u949F\u4F5C\u54C1\u6837\u4F8B\uFF08\u603B\u957F\u4E0D\u8D85\u8FC7 10 \u5206\u949F\uFF1B\u8D28\u91CF\u3001\u521B\u9020\u529B\u4E0E\u591A\u6837\u6027\u6BD4\u957F\u5EA6\u66F4\u91CD\u8981\uFF09
- \u4F5C\u54C1\u8BF4\u660E\uFF1A\u521B\u4F5C\u80CC\u666F\u3001\u5408\u4F5C\u4E2D\u7684\u89D2\u8272\u3001\u521B\u4F5C\u4FA7\u91CD\u4E0E\u5B8C\u6210\u65F6\u95F4`,
        en: "Between 5 and 10 minutes of media examples of this experience, plus a r\xE9sum\xE9/CV, EPK, or other document, which details your experience in Electronic & Produced Music to date, and a portfolio commentary explaining the pieces' context and/or your creative processes. Application deadline 5 January 2027; materials by no later than 12 January 2027.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u4F5C\u54C1\u96C6",
        ten: "Round 1 \xB7 Portfolio"
      }, {
        k: "online",
        zh: `- \u521B\u610F\u6D4B\u8BD5\uFF1A\u9762\u8BD5\u524D\u4E24\u5468\u6536\u5230\u4EFB\u52A1\uFF0C\u7528\u81EA\u5DF1\u7684\u8BBE\u5907\u5728 3 \u5C0F\u65F6\u5185\u5236\u4F5C\u7EA6 2 \u5206\u949F\u97F3\u4E50\uFF0C\u4E00\u5468\u5185\u4E0A\u4F20
- \u7EBF\u4E0A\u9762\u8BD5\uFF082027 \u5E74\u6625\u5B63\uFF09\uFF1A\u8BA8\u8BBA\u521B\u4F5C\u7ECF\u5386\u3001\u521B\u610F\u6D4B\u8BD5\u4E0E\u804C\u4E1A\u65B9\u5411
- \u9762\u8BD5\u540E\u6700\u591A 6 \u5468\u51FA\u7ED3\u679C`,
        en: "A short creative exercise to be completed on electronic instruments/equipment of your own choice, requiring production of a piece of music of approximately two minutes in length that should take no longer than three hours to complete. Online interview (spring 2027) to discuss your work, the creative exercise and future aspirations.",
        enType: "summary",
        t: "\u7B2C\u4E8C\u8F6E \xB7 \u521B\u610F\u6D4B\u8BD5 + \u7EBF\u4E0A\u9762\u8BD5",
        ten: "Round 2 \xB7 Creative exercise + online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "gsmd-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- Guildhall \u81EA\u6709\u5728\u7EBF\u76F4\u7533\u7CFB\u7EDF\uFF08\u4E0D\u8D70 UCAS Conservatoires\uFF09\uFF1Aresources.gsmd.ac.uk/gsmdapp/music27.html
## \u622A\u6B62\u65E5\u671F\uFF08\u82F1\u56FD\u65F6\u95F4 16:30\uFF09
- **BMus / MMus / MPerf / Advanced Certificate\uFF1A2026 \u5E74 10 \u6708 1 \u65E5**
- \u5F55\u50CF\u4E0A\u4F20\uFF1A2026 \u5E74 10 \u6708 23 \u65E5\uFF1B\u4F26\u6566\u73B0\u573A\u8003\u8BD5 11\u201312 \u6708
- **\u4E9A\u6D32\u6D77\u5916\u8003\u70B9\uFF08\u542B\u9752\u5C9B\uFF09\uFF1A2026 \u5E74 10 \u6708 1 \u65E5\u62A5\u540D**\uFF1B\u9752\u5C9B 11 \u6708 14 \u65E5\uFF0C\u9999\u6E2F 11 \u6708 9\u201311 \u65E5\uFF0C\u9996\u5C14 11 \u6708 16 \u65E5\uFF0C\u4E1C\u4EAC 11 \u6708 17 \u65E5
- Electronic & Produced Music\uFF1A2027 \u5E74 1 \u6708 5 \u65E5\uFF08\u4F5C\u54C1\u96C6 1 \u6708 12 \u65E5\uFF09
- \u7EBD\u7EA6\u8003\u70B9\uFF1A2026 \u5E74 12 \u6708 1 \u65E5
## \u6D77\u5916\u8003\u70B9\u9650\u5236
- \u4E0D\u8003\u6B4C\u5267\u3001Repetiteur\u3001EPM\u3001\u4F5C\u66F2\u3001\u7235\u58EB\u9F13\u3001Jazz Composition \u7B49\uFF1B\u6D77\u5916\u73B0\u573A\u987B\u81EA\u5E26\u4F34\u594F
## \u8D39\u7528
- \u7533\u8BF7\u8D39 \xA3129\uFF0C\u7533\u8BF7\u65F6\u7F34\u7EB3\u3001\u4E0D\u9000\uFF1B\u7B26\u5408\u6761\u4EF6\u53EF\u901A\u8FC7 Supported Application Scheme \u51CF\u514D`,
      en: `Guildhall uses its own online application system, not UCAS Conservatoires. Deadline for BMus/MMus/MPerf/Advanced Certificate: 1 October 2026 (4.30pm UK); recorded audition upload: 23 October 2026. Asian overseas auditions (incl. Qingdao, 14 November 2026): apply by 1 October 2026. Electronic & Produced Music: 5 January 2027 (portfolio 12 January 2027). New York: 1 December 2026.
Application fee \xA3129, payable at application and non-refundable; the Supported Application Scheme can reduce or waive it.`,
      enType: "summary",
      src: ["https://www.gsmd.ac.uk/study-with-guildhall/music/music-department-application-deadlines", "https://www.gsmd.ac.uk/study-with-guildhall/apply-to-guildhall/auditions-and-interviews/music-auditions-overseas"],
      school: "guildhall",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-academic-classical",
      level: "UG",
      majors: ["@classical"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) \xB7 4-year / 3-year direct entry",
      zh: `- \u5165\u5B66\u5F53\u5E74 12 \u6708 31 \u65E5\u524D\u5E74\u6EE1 18 \u5468\u5C81
- **4 \u5E74\u5236**\uFF1AGCE A-level \u81F3\u5C11 2 \u95E8\u8FBE E \u7EA7\u53CA\u4EE5\u4E0A\uFF08\u901A\u5E38\u542B\u97F3\u4E50\uFF09\uFF0C\u53E6\u6709 3 \u95E8\u4E0D\u540C\u79D1\u76EE GCSE \u8FBE A*\u2013C / 9\u20134\uFF0C\u6216\u540C\u7B49\u5B66\u5386
- **3 \u5E74\u5236\uFF08\u76F4\u5165\u4E8C\u5E74\u7EA7\uFF09**\uFF1AA-level 3 \u95E8\u8FBE AAB\uFF08\u901A\u5E38\u542B\u97F3\u4E50\uFF09\uFF0C\u5E76\u987B\u53D6\u5F97 HE Level 4 \u97F3\u4E50\u8868\u6F14\u6587\u51ED\uFF08\u5982 DipABRSM \u6216 ATCL\uFF09
- \u987B\u901A\u8FC7 RNCM \u8003\u8BD5\uFF0C\u6F14\u594F\u6C34\u5E73\u81F3\u5C11\u76F8\u5F53\u4E8E ABRSM 8 \u7EA7`,
      en: `All applicants must be at least 18 years of age on 31 December in the year of entry.
All applicants must have passes at GCE A level (A2) in a minimum of two subjects at grade E or above, normally including music, and passes in three different subjects at GCSE level (grades A*-C/9-4) or acceptable equivalent.
All applicants must pass an RNCM audition in the year prior to entry, demonstrating a high standard of performance (or composition ability for composers) and potential, of at least ABRSM Grade 8 standard or equivalent.
(BMus 3-year, direct entry to Year 2) All applicants must have passes at GCE A level (or equivalent) in at least three different subjects, normally including music, at grades AAB. All applicants must pass a HE Level 4 diploma in music performance (such as DipABRSM or ATCL).`,
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/entrance-requirements/"],
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-academic-pop",
      level: "UG",
      majors: ["@pop"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) Popular Music \xB7 UCAS 201F",
      zh: `- \u5165\u5B66\u5F53\u5E74 12 \u6708 31 \u65E5\u524D\u5E74\u6EE1 18 \u5468\u5C81
- 2 \u95E8 A-level\uFF0C\u6216 Rockschool Level 3 / BTEC National Diploma\uFF08\u97F3\u4E50\u76F8\u5173\uFF09\uFF0C\u6216\u56FD\u9645\u540C\u7B49\u5B66\u5386
- 4 \u95E8 GCSE \u8FBE A*\u2013C\uFF08\u987B\u542B\u6570\u5B66\u4E0E\u82F1\u8BED\uFF09
- \u4E50\u7406\u6C34\u5E73\u76F8\u5F53\u4E8E ABRSM 5 \u7EA7\u4E50\u7406
- \u987B\u901A\u8FC7 RNCM \u8003\u8BD5\uFF0C\u6F14\u594F\u6C34\u5E73\u76F8\u5F53\u4E8E ABRSM / Rockschool / Trinity 8 \u7EA7
- \u4E3B\u4FEE\u9886\u57DF\u56DB\u9009\u4E00\uFF1APerformance \u8868\u6F14 / Composition \u521B\u4F5C / Production \u5236\u4F5C / Artist Development \u827A\u4EBA\u53D1\u5C55`,
      en: `All applicants must be at least 18 years of age on 31 December in the year of entry.
All applicants must pass an RNCM audition in the year prior to entry, demonstrating a high standard of performing ability, equivalent to ABRSM, Rockschool or Trinity Grade 8.
All applicants must have a level of theoretical ability equivalent to ABRSM Grade 5 theory.
All applicants must achieve 2 A levels, Rockschool Level 3 Music Practitioner or Creative Music Industry qualification, or BTEC National Diploma in a music related subject, or international equivalent.
All applicants must achieve 4 passes (A*- C) at GCSE including Maths and English.`,
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/what-you-can-study/undergraduate/bachelor-of-music-popular-music/"],
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "Master of Music (MMus) / Master of Performance (MPerf)",
      zh: `## Master of Music\uFF08MMus\uFF09
- \u987B\u6301\u6709\u826F\u597D\u7B49\u7EA7\u7684\u672C\u79D1\u5B66\u4F4D\u6216\u540C\u7B49\u8D44\u5386\uFF08\u901A\u5E38\u4E3A\u97F3\u4E50\u4E13\u4E1A\uFF0CFHEQ Level 6\uFF09
- \u987B\u901A\u8FC7 RNCM \u8003\u8BD5
- \u63D0\u4EA4\u5B66\u672F\u5199\u4F5C\u6837\u672C\uFF0C\u6700\u591A 1000 \u5B57\uFF0C\u987B\u4F53\u73B0\u89C4\u8303\u7684\u5B66\u672F\u5F15\u7528\u683C\u5F0F
## Master of Performance\uFF08MPerf\uFF09
- \u901A\u5E38\u987B\u6301\u6709\u826F\u597D\u672C\u79D1\u5B66\u4F4D\u6216\u540C\u7B49\u8D44\u5386\uFF0C\u672C\u79D1\u4E13\u4E1A\u4E0D\u9650\uFF0C\u6216\u5177\u5907\u540C\u7B49\u4E13\u4E1A\u6C34\u51C6
- \u987B\u901A\u8FC7 RNCM \u8003\u8BD5`,
      en: `Master of Music: All applicants must pass an RNCM audition and hold a good degree or equivalent (normally in Music: FHEQ Level 6).
Master of Performance: All MPerf entrants must pass an RNCM audition and normally hold a good degree or equivalent (or be of equivalent professional standing).`,
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/entrance-requirements/", "https://www.rncm.ac.uk/study-here/what-you-can-study/graduate/master-of-music/"],
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus (Hons) / BMus Popular Music",
      zh: `- **BMus 4 \u5E74\u5236**\uFF1AIELTS \u5404\u5355\u9879\u5747\u4E0D\u4F4E\u4E8E 5.5\uFF08CEFR B2\uFF09
- **BMus 3 \u5E74\u5236\u76F4\u5165\u4E8C\u5E74\u7EA7**\uFF1AIELTS \u5404\u5355\u9879\u5747\u4E0D\u4F4E\u4E8E 7.0\uFF08CEFR C1\uFF09
- **BMus Popular Music**\uFF1AIELTS \u5404\u5355\u9879\u5747\u4E0D\u4F4E\u4E8E 5.5\uFF08CEFR B2\uFF09
- \u53EF\u63A5\u53D7\u8003\u8BD5\uFF1AIELTS Academic\u3001PTE Academic\u3001Trinity ISE\u3001\u5251\u6865\u82F1\u8BED\uFF1B\u5B98\u7F51\u672A\u5217\u51FA TOEFL / Duolingo\uFF0C\u6301\u6B64\u7C7B\u6210\u7EE9\u987B\u5148\u5411\u62DB\u751F\u529E\u786E\u8BA4
- \u5BF9\u7167\uFF1AIELTS 5.5 \u2248 PTE 59+ \u2248 Trinity ISE II Pass \u2248 Cambridge 162`,
      en: `Bachelor of Music with Honours (4 years): IELTS 5.5 or equivalent in each and every component (CEFR B2 in each and every component).
Bachelor of Music with Honours (3 years with direct entry to Year 2): IELTS 7.0 or equivalent in each and every component (CEFR C1 in each and every component).
Bachelor of Music with Honours in Popular Music: IELTS 5.5 or equivalent in each and every component (CEFR B2 in each and every component).`,
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/international-students/english-language-requirements/"],
      school: "rncm",
      country: "UK",
      ielts: [{
        p: "BMus 4 \u5E74\u5236",
        pen: "BMus (4 years)",
        o: "5.5",
        m: "5.5",
        mj: ["@classical"]
      }, {
        p: "BMus 3 \u5E74\u5236\uFF08\u76F4\u5165\u4E8C\u5E74\u7EA7\uFF09",
        pen: "BMus (3 years, direct entry to Year 2)",
        o: "7.0",
        m: "7.0",
        mj: ["@classical"]
      }, {
        p: "BMus Popular Music",
        pen: "BMus Popular Music",
        o: "5.5",
        m: "5.5",
        mj: ["@pop"]
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MMus / MPerf",
      zh: `- **MMus\uFF081 \u5E74 / 2 \u5E74\uFF09**\uFF1AIELTS \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5\uFF1B\u90E8\u5206\u65B9\u5411\u53EF\u80FD\u8981\u6C42 6.5 \u6216 7.0\uFF08\u5B98\u7F51\u672A\u9010\u4E00\u5217\u660E\uFF0C\u987B\u6309\u5177\u4F53\u65B9\u5411\u5411\u62DB\u751F\u529E\u786E\u8BA4\uFF09
- **Master of Performance**\uFF1AIELTS \u5404\u5355\u9879\u5747\u4E0D\u4F4E\u4E8E 5.5\uFF08CEFR B2\uFF09
- \u53EF\u63A5\u53D7\u8003\u8BD5\uFF1AIELTS Academic\u3001PTE Academic\u3001Trinity ISE\u3001\u5251\u6865\u82F1\u8BED\uFF1B\u5B98\u7F51\u672A\u5217\u51FA TOEFL / Duolingo`,
      en: `Master of Music (2 years or 1 year): IELTS 6.0, with no less than 5.5 in each component (or equivalent as defined by UKVI).
Master of Performance (2 year or 1 year): IELTS 5.5 or equivalent in each and every component (CEFR B2 in each and every component).`,
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/international-students/english-language-requirements/"],
      school: "rncm",
      country: "UK",
      ielts: [{
        p: "MMus",
        pen: "MMus",
        o: "6.0",
        m: "5.5",
        n: "\u90E8\u5206\u65B9\u5411\u53EF\u80FD\u8981\u6C42 6.5 / 7.0",
        nen: "Some pathways may require 6.5 / 7.0"
      }, {
        p: "Master of Performance",
        pen: "Master of Performance",
        o: "5.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus (Hons) Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-keyboard-studies-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E09\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE\uFF0C\u603B\u65F6\u957F\u7EA6 15\u201320 \u5206\u949F\uFF0C\u81F3\u5C11\u4E00\u9996\u80CC\u8C31
- \u53E6\u4EA4\u7EA6 6 \u5206\u949F\u95EE\u7B54\u89C6\u9891\uFF1A\u8BE0\u91CA\u7406\u5FF5\u3001\u65E2\u5F80\u66F2\u76EE\u3001\u504F\u597D\u4F5C\u66F2\u5BB6\u3001\u5BA4\u5185\u4E50\u7ECF\u9A8C\u3001\u542C\u97F3\u4E60\u60EF\u7B49
- \u8003\u5B98\u4ECE\u63D0\u4EA4\u66F2\u76EE\u4E2D\u9009\u542C\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5`,
        en: "You should prepare THREE contrasting pieces of your choice lasting about 15 \u2013 20 minutes, ONE of which must be played from memory. Also record a question-and-answer video (around six minutes). Deadline 1 October 2026 (Acceptd).",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u6D77\u5916\u8003\u751F\uFF0CAcceptd\uFF09",
        ten: "Round 1 \xB7 Pre-recorded audition (Acceptd)"
      }, {
        k: "live",
        zh: `- \u66F2\u76EE\u8981\u6C42\u540C\u4E0A\uFF0C\u65E0\u9700\u63D0\u524D\u4EA4\u5F55\u50CF
- \u5F53\u5929\u52A0\u8BD5\u89C6\u594F`,
        en: "Same repertoire; no recording needed in advance; sight-reading on the day.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u66FC\u5F7B\u65AF\u7279\uFF09",
        ten: "Live audition (Manchester)"
      }, {
        k: "online",
        zh: `- Zoom \u9762\u8BD5\uFF0C\u8BA8\u8BBA\u6C42\u5B66\u610F\u613F\u4E0E\u9662\u6821\u5339\u914D\u5EA6
- \u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09\u66F2\u76EE\u4F1A\u63D0\u524D\u90AE\u4EF6\u53D1\u9001`,
        en: "Zoom interview about your motivation and fit; a quick-study piece is emailed in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u9762\u8BD5\uFF08\u5F55\u50CF\u5165\u56F4\u8005\uFF09",
        ten: "Online interview (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Piano (Solo)",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-keyboard-studies-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- 40 \u5206\u949F\u98CE\u683C\u5BF9\u6BD4\u7684\u8282\u76EE\u5355\uFF0C\u8003\u5B98\u4ECE\u4E2D\u9009\u542C\u7EA6 15 \u5206\u949F
- \u9664\u81EA\u9009\u7684\u5F53\u4EE3\u66F2\u76EE\u5916\u5747\u987B\u80CC\u8C31\uFF1B\u5C3D\u91CF\u4E00\u955C\u5230\u5E95
- \u53E6\u4EA4 6 \u5206\u949F\u95EE\u7B54\u89C6\u9891 + 300\u2013500 \u5B57\u4E66\u9762\u9648\u8FF0\uFF08\u7814\u7A76\u751F\u5B66\u4E60\u76EE\u6807\uFF09`,
        en: "Please prepare 40 MINUTES of repertoire by way of a contrasting programme. The panel will choose approximately 15 minutes from this repertoire. The programme should be played from memory, except for contemporary repertoire at the candidate's choosing, and should be recorded in one take if possible. Submit a 300-500 word written statement outlining your goals for postgraduate study.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u66F2\u76EE\u540C\u4E0A\uFF1B\u5F53\u5929\u52A0\u8BD5\u89C6\u594F",
        en: "Same programme; sight-reading on the day.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: "- \u5FEB\u901F\u8BC6\u8C31\u4E0E\u89C6\u594F\u66F2\u76EE\u4F1A\u63D0\u524D\u90AE\u4EF6\u53D1\u9001",
        en: "Quick-study and sight-reading material is emailed in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u9762\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online interview (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "PG Piano (Collaborative) / R\xE9p\xE9titeurs",
      zh: "RNCM \u6709\u4E24\u4E2A\u76F8\u5173\u65B9\u5411\uFF0C\u7EC6\u8282\u7565\u6709\u5DEE\u5F02\uFF0C\u7533\u8BF7\u524D\u8BF7\u5411\u62DB\u751F\u529E\u786E\u8BA4\u5F52\u5C5E\u3002",
      en: "RNCM lists two related routes with slightly different details; confirm with admissions before applying.",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-keyboard-studies-audition-requirements/", "https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-vocal-studies-and-opera-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- 45 \u5206\u949F\u8282\u76EE\u5355\uFF1A\u4E00\u9996\u5B8C\u6574\u7684\u4E8C\u91CD\u594F\u594F\u9E23\u66F2 + \u4E00\u90E8\u5B8C\u6574\u7684\u827A\u672F\u6B4C\u66F2\u5957\u66F2\u6216\u4E00\u7EC4\u6B4C\u66F2 + \u4E00\u9996\u94A2\u7434\u72EC\u594F\uFF08\u22645 \u5206\u949F\uFF09
- \u4E0D\u63A5\u53D7\u534F\u594F\u66F2\u3001\u6B4C\u5267\u6216\u6E05\u5531\u5267\u548F\u53F9\u8C03\u53CA\u5176\u4ED6\u7BA1\u5F26\u4E50\u6539\u7F16\u8C31
- \u53E6\u4EA4 6 \u5206\u949F\u95EE\u7B54\u89C6\u9891\u4E0E 300\u2013500 \u5B57\u4E66\u9762\u9648\u8FF0`,
        en: "Please prepare a programme of 45 minutes including a complete duo sonata and a complete song cycle or group of songs (no concertos, operatic or oratorio arias, or other orchestral reductions) and one solo piano piece. The solo piano piece should not exceed 5 minutes.",
        enType: "original",
        t: "Collaborative Piano \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Collaborative Piano \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u89C6\u594F\u4E0E\u5FEB\u901F\u8BC6\u8C31\uFF1B\u987B\u81EA\u5907\u5408\u4F5C\u642D\u6863",
        en: "Sight-reading and quick study; bring your own duo partner.",
        enType: "summary",
        t: "Collaborative Piano \xB7 \u73B0\u573A\u8003\u8BD5",
        ten: "Collaborative Piano \xB7 Live audition"
      }, {
        k: "pre",
        zh: `- \u4E00\u9996\u65E9\u671F\u6D6A\u6F2B\u6D3E\u6216\u6D6A\u6F2B\u6D3E\u94A2\u7434\u72EC\u594F\uFF08\u22645 \u5206\u949F\uFF0C\u987B\u5C55\u793A\u6280\u5DE7\uFF09
- \u4E24\u6BB5\u542B\u591A\u4E2A\u89D2\u8272\u7684\u6B4C\u5267\u9009\u6BB5\uFF08\u5408\u8BA1\u226410 \u5206\u949F\uFF09
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD`,
        en: "Please prepare, of your own choice, ONE piano solo (maximum five minutes) from the Early Romantic or Romantic period that demonstrates a level of virtuosity, and TWO operatic excerpts (maximum 10 minutes in total) containing more than one character.",
        enType: "original",
        t: "R\xE9p\xE9titeurs \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "R\xE9p\xE9titeurs \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u540C\u6837\u66F2\u76EE + \u73B0\u573A\u89C6\u594F + \u9762\u8BD5",
        en: "Same repertoire plus sight-reading and an interview.",
        enType: "summary",
        t: "R\xE9p\xE9titeurs \xB7 \u73B0\u573A\u8003\u8BD5",
        ten: "R\xE9p\xE9titeurs \xB7 Live audition"
      }, {
        k: "online",
        zh: `- \u4E00\u9996\u6D6A\u6F2B\u6D3E\u94A2\u7434\u72EC\u594F\uFF08\u22645 \u5206\u949F\uFF09
- **\u4E24\u6BB5\u5BF9\u6BD4\u7684\u6B4C\u5267\u573A\u666F**\uFF08\u6700\u597D\u662F\u91CD\u5531\u6216\u591A\u89D2\u8272\u573A\u666F\uFF0C\u5408\u8BA1\u226410 \u5206\u949F\uFF09\uFF0C\u53EF\u81EA\u613F\u53C2\u4E0E\u6F14\u5531
- \u53EF\u80FD\u52A0\u89C6\u594F\u4E0E\u7B80\u77ED\u9762\u8BD5`,
        en: "ONE piano solo of your own choice (ideally from the romantic period, lasting no longer than five minutes) and TWO contrasting operatic scenes of your own choice (ideally ensemble scenes or scenes which involve multiple characters, last no longer than 10 minutes in total).",
        enType: "original",
        t: "R\xE9p\xE9titeurs \xB7 \u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "R\xE9p\xE9titeurs \xB7 Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-aud-voice",
      level: "ALL",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "Vocal Studies and Opera \xB7 UG & PG",
      zh: "\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u8981\u6C42\u76F8\u540C\u3002\u6CE8\u610F\uFF1A\u7EBF\u4E0A\u8003\u8BD5\u66F2\u76EE\u6570\u91CF\u5C11\u4E8E\u9884\u5BA1\u3002",
      en: "Same for undergraduate and postgraduate. Note the online round uses fewer pieces than the pre-screening.",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-vocal-studies-and-opera-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- **\u4E09\u9996**\u65F6\u671F\u4E0E\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE\uFF0C\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 12 \u5206\u949F\uFF0C\u987B\u80CC\u8C31
- \u6BCF\u9996\u524D\u7B80\u5355\u62A5\u5E55\uFF08\u66F2\u540D + \u4F5C\u66F2\u5BB6\uFF09
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF08\u53EF\u5355\u72EC\u5F55\u5236\uFF09
- \u4E00\u6BB5\u82F1\u8BED\u6717\u8BFB\uFF08\u6563\u6587\u3001\u8BD7\u6B4C\u6216\u62A5\u520A\u8282\u9009\u5747\u53EF\uFF09`,
        en: "Please select THREE pieces of your own choice (maximum 12 minutes in total) to be sung from memory, contrasting in period and style. Your recording should also include a two-minute introduction. Applicants should also prepare a short spoken passage in English which can be either prose or poetry, or, indeed, an extract from a newspaper article.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08Acceptd\uFF09",
        ten: "Round 1 \xB7 Pre-recorded audition (Acceptd)"
      }, {
        k: "live",
        zh: `- \u540C\u6837\u4E09\u9996\u66F2\u76EE\uFF08\u8003\u5B98\u53EF\u80FD\u4E0D\u542C\u5B8C\u5168\u90E8\uFF09
- \u82F1\u8BED\u6717\u8BFB\uFF08\u8003\u5BDF\u97F3\u9AD8\u3001\u8282\u594F\u3001\u80FD\u91CF\u3001\u5171\u9E23\uFF09
- \u9762\u8BD5`,
        en: "The same three pieces (the panel may not hear all), the spoken English passage and an interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u82F1\u56FD\u5883\u5185\u5230\u573A\uFF0C\u65E0\u9700\u4EA4\u9884\u5BA1\u5F55\u50CF\uFF09",
        ten: "Live audition (no pre-recording needed)"
      }, {
        k: "online",
        zh: `- **\u4E24\u9996**\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE\uFF0C\u5408\u8BA1\u4E0D\u8D85\u8FC7 10 \u5206\u949F\uFF0C\u53EF\u4E0E\u9884\u5BA1\u66F2\u76EE\u91CD\u590D
- Zoom \u73B0\u573A\u6F14\u5531 + \u7B80\u77ED\u9762\u8BD5`,
        en: "Please select TWO contrasting pieces of your own choice (maximum 10 minutes in total), that you think best demonstrate your skills and ability. Sung live over Zoom, with a short interview.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u7684\u6D77\u5916\u8003\u751F\uFF0CZoom\uFF09",
        ten: "Online audition (shortlisted overseas applicants, Zoom)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-violin",
      level: "UG",
      majors: ["violin"],
      cat: "audition",
      order: 3,
      prog: "BMus (Hons) Violin",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-strings-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u6307\u5B9A\u66F2\u76EE\u4E00\u9009\u4E00\uFF1A\u83AB\u624E\u7279\u4EFB\u4E00\u5C0F\u63D0\u7434\u534F\u594F\u66F2\u7B2C 1 \u6216\u7B2C 3 \u4E50\u7AE0\uFF1B\u6D77\u987F C \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u6216\u7B2C 3 \u4E50\u7AE0\uFF1B\u5DF4\u8D6B\u65E0\u4F34\u594F\u594F\u9E23\u66F2 / \u7EC4\u66F2\u6216\u6709\u4F34\u594F\u594F\u9E23\u66F2\uFF08BWV 1014\u20139\u3001BWV 1020\u20135\uFF09\u4E2D\u4E24\u4E2A\u5BF9\u6BD4\u4E50\u7AE0\uFF1B\u6CF0\u52D2\u66FC\u65E0\u4F34\u594F\u5E7B\u60F3\u66F2\u4E2D\u4E24\u4E2A\u5BF9\u6BD4\u4E50\u7AE0
- \u53E6\u52A0\u4E00\u9996\u4E0E\u6307\u5B9A\u66F2\u76EE\u65F6\u671F\u3001\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "You should choose ONE set piece from: W A Mozart \u2013 movement 1 or 3 from any Violin Concerto; Joseph Haydn \u2013 movement 1 or 3 from Concerto in C; J S Bach \u2013 two contrasted movements from the solo Sonatas or Partitas or the accompanied Sonatas (BWV 1014 \u2013 9 or BWV 1020 \u2013 5); Georg Telemann \u2013 two contrasted movements from the solo Fantasias AND A piece of your own choice, which contrasts in period and style with your first choice.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08\u9884\u5BA1\u4E0E\u73B0\u573A\u76F8\u540C\uFF09",
        ten: "Repertoire (pre-recorded and live)"
      }, {
        k: "pre",
        zh: `- \u5F55\u50CF\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F\uFF08\u542B 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF09
- \u66F2\u76EE / \u4E50\u7AE0\u5728 15 \u5206\u949F\u5185\u5C3D\u91CF\u5B8C\u6574\u5F55\u5236`,
        en: "Please record your chosen pieces/movements in their entirety where they fit within 15 minutes of recorded material. Your submission should also include a two-minute introduction.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09",
        en: "Your audition will also include an interview. You may also be asked to perform a quick study.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: `- **\u53E6\u4E00\u9996** ABRSM 8 \u7EA7\u53CA\u4EE5\u4E0A\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF08\u4E0D\u540C\u4E8E\u9884\u5BA1\u66F2\u76EE\uFF09
- \u5FEB\u901F\u8BC6\u8C31\u66F2\u76EE\u4E0E\u9762\u8BD5\u5B89\u6392\u4F1A\u63D0\u524D\u53D1\u9001`,
        en: "Here you should perform a different piece of ABRSM Grade 8 standard or above lasting no longer than five minutes. Quick-study material and interview details are sent in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-viola",
      level: "UG",
      majors: ["viola"],
      cat: "audition",
      order: 3,
      prog: "BMus (Hons) Viola",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-strings-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u6307\u5B9A\u66F2\u76EE\u4E00\u9009\u4E00\uFF1A\u970D\u592B\u8FC8\u65AF\u7279 D \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u6216\u7B2C 3 \u4E50\u7AE0\uFF1B\u970D\u592B\u8FC8\u65AF\u7279\u964D B \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u65BD\u5854\u7C73\u8328 D \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u5DF4\u8D6B\u7B2C 2\u20136 \u53F7\u5927\u63D0\u7434\u7EC4\u66F2\u4E2D\u63D0\u7434\u6539\u7F16\u7248\u4E2D\u4E24\u4E2A\u5BF9\u6BD4\u4E50\u7AE0\uFF08\u987B\u542B\u524D\u594F\u66F2\uFF09
- \u53E6\u52A0\u4E00\u9996\u4E0E\u6307\u5B9A\u66F2\u76EE\u65F6\u671F\u3001\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "You should choose ONE set piece from: Franz Anton Hoffmeister movement 1 from Concerto in D; Franz Anton Hoffmeister movement 3 from Concerto in D; Franz Anton Hoffmeister movement 1 from Concerto in Bb; Carl Stamitz movement 1 from Concerto in D; J S Bach \u2013 two contrasted movements from a viola transcription of Bach Cello Suites 2 \u2013 6, to include a Prelude. AND A piece of your own choice, which contrasts in period and style with your first choice.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08\u9884\u5BA1\u4E0E\u73B0\u573A\u76F8\u540C\uFF09",
        ten: "Repertoire (pre-recorded and live)"
      }, {
        k: "pre",
        zh: `- \u5F55\u50CF\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F\uFF08\u542B 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF09
- \u66F2\u76EE / \u4E50\u7AE0\u5728 15 \u5206\u949F\u5185\u5C3D\u91CF\u5B8C\u6574\u5F55\u5236`,
        en: "Please record your chosen pieces/movements in their entirety where they fit within 15 minutes of recorded material. Your submission should also include a two-minute introduction.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09",
        en: "Your audition will also include an interview. You may also be asked to perform a quick study.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: `- **\u53E6\u4E00\u9996** ABRSM 8 \u7EA7\u53CA\u4EE5\u4E0A\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF08\u4E0D\u540C\u4E8E\u9884\u5BA1\u66F2\u76EE\uFF09
- \u5FEB\u901F\u8BC6\u8C31\u66F2\u76EE\u4E0E\u9762\u8BD5\u5B89\u6392\u4F1A\u63D0\u524D\u53D1\u9001`,
        en: "Here you should perform a different piece of ABRSM Grade 8 standard or above lasting no longer than five minutes. Quick-study material and interview details are sent in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-cello",
      level: "UG",
      majors: ["cello"],
      cat: "audition",
      order: 3,
      prog: "BMus (Hons) Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-strings-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u6307\u5B9A\u66F2\u76EE\u4E00\u9009\u4E00\uFF1A\u6D77\u987F C \u5927\u8C03\u6216 D \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u6216\u7B2C 3 \u4E50\u7AE0\uFF1BC.P.E. \u5DF4\u8D6B A \u5927\u8C03\u534F\u594F\u66F2\uFF08Salabert \u7248 EMS 5391\uFF09\uFF1B\u5DF4\u8D6B\u7B2C 2\u20136 \u53F7\u7EC4\u66F2\u4E2D\u4E24\u4E2A\u5BF9\u6BD4\u4E50\u7AE0\uFF08\u987B\u542B\u524D\u594F\u66F2\uFF09\uFF1B\u535A\u51EF\u91CC\u5C3C\u964D B \u5927\u8C03\u6216 G \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0
- \u53E6\u52A0\u4E00\u9996\u4E0E\u6307\u5B9A\u66F2\u76EE\u65F6\u671F\u3001\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "You should choose ONE set piece from: Joseph Haydn \u2013 movement 1 or 3 from Concerto in C or D; C P E Bach Concerto in A (edition Salabert (EMS 5391)); J S Bach \u2013 two contrasted movements from Suites 2 \u2013 6, to include a Prelude; Luigi Boccherini \u2013 movement 1 from Concerto in B flat or G AND A piece of your own choice, which contrasts in period and style with your first choice.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08\u9884\u5BA1\u4E0E\u73B0\u573A\u76F8\u540C\uFF09",
        ten: "Repertoire (pre-recorded and live)"
      }, {
        k: "pre",
        zh: `- \u5F55\u50CF\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F\uFF08\u542B 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF09
- \u66F2\u76EE / \u4E50\u7AE0\u5728 15 \u5206\u949F\u5185\u5C3D\u91CF\u5B8C\u6574\u5F55\u5236`,
        en: "Please record your chosen pieces/movements in their entirety where they fit within 15 minutes of recorded material. Your submission should also include a two-minute introduction.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09",
        en: "Your audition will also include an interview. You may also be asked to perform a quick study.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: `- **\u53E6\u4E00\u9996** ABRSM 8 \u7EA7\u53CA\u4EE5\u4E0A\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF08\u4E0D\u540C\u4E8E\u9884\u5BA1\u66F2\u76EE\uFF09
- \u5FEB\u901F\u8BC6\u8C31\u66F2\u76EE\u4E0E\u9762\u8BD5\u5B89\u6392\u4F1A\u63D0\u524D\u53D1\u9001`,
        en: "Here you should perform a different piece of ABRSM Grade 8 standard or above lasting no longer than five minutes. Quick-study material and interview details are sent in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-doublebass",
      level: "UG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus (Hons) Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-strings-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u6307\u5B9A\u66F2\u76EE\u4E00\u9009\u4E00\uFF1A\u5947\u9A6C\u591A\u7F57 G \u5927\u8C03\u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u535A\u6CF0\u897F\u5C3C a \u5C0F\u8C03\u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u8FEA\u7279\u65AF\u591A\u592B\u7B2C 2 \u534F\u594F\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u6216\u4ECE\u7EF4\u74E6\u5C14\u7B2C\u5927\u63D0\u7434\u594F\u9E23\u66F2\uFF08Zimmermann \u6539\u7F16\uFF09\u3001\u9A6C\u5C14\u5207\u6D1B\u594F\u9E23\u66F2 Op.2\u3001\u5FB7\u8D39\u65BD G \u5927\u8C03\u594F\u9E23\u66F2\u4E2D\u9009\u4E24\u4E2A\u5BF9\u6BD4\u4E50\u7AE0
- \u53E6\u52A0\u4E00\u9996\u4E0E\u6307\u5B9A\u66F2\u76EE\u65F6\u671F\u3001\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2`,
        en: "You should choose ONE from: Giambattista Cimador \u2013 movement 1 from Concerto in G; Giovanni Bottesini \u2013 movement 1 from Concerto in A minor; Carl Ditters von Dittersdorf \u2013 movement 1 from Concerto No 2 Or TWO contrasted movements from: Antonio Vivaldi \u2013 (trans Zimmermann) Cello Sonatas; Benedetto Marcello Sonatas Op 2 OR Willem De Fesch Sonata in G AND A piece of your own choice, which contrasts in period and style with your first piece.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08\u9884\u5BA1\u4E0E\u73B0\u573A\u76F8\u540C\uFF09",
        ten: "Repertoire (pre-recorded and live)"
      }, {
        k: "pre",
        zh: `- \u5F55\u50CF\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F\uFF08\u542B 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF09
- \u66F2\u76EE / \u4E50\u7AE0\u5728 15 \u5206\u949F\u5185\u5C3D\u91CF\u5B8C\u6574\u5F55\u5236`,
        en: "Please record your chosen pieces/movements in their entirety where they fit within 15 minutes of recorded material. Your submission should also include a two-minute introduction.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09",
        en: "Your audition will also include an interview. You may also be asked to perform a quick study.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: `- **\u53E6\u4E00\u9996** ABRSM 8 \u7EA7\u53CA\u4EE5\u4E0A\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF08\u4E0D\u540C\u4E8E\u9884\u5BA1\u66F2\u76EE\uFF09
- \u5FEB\u901F\u8BC6\u8C31\u66F2\u76EE\u4E0E\u9762\u8BD5\u5B89\u6392\u4F1A\u63D0\u524D\u53D1\u9001`,
        en: "Here you should perform a different piece of ABRSM Grade 8 standard or above lasting no longer than five minutes. Quick-study material and interview details are sent in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello", "doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Strings",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/rncm-school-of-strings-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF0C\u5176\u4E2D\u4E00\u9996\u987B\u4E3A\u5DF4\u6D1B\u514B\u6216\u53E4\u5178\u65F6\u671F\uFF08\u56DB\u79CD\u5F26\u4E50\u5668\u76F8\u540C\uFF09",
        en: "Applicants for postgraduate study should perform TWO contrasting works, one of which should be from the baroque/classical period.",
        enType: "original",
        t: "\u66F2\u76EE\uFF08\u9884\u5BA1\u4E0E\u73B0\u573A\u76F8\u540C\uFF09",
        ten: "Repertoire (pre-recorded and live)"
      }, {
        k: "pre",
        zh: `- \u5F55\u50CF\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F\uFF08\u542B 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF09
- \u66F2\u76EE / \u4E50\u7AE0\u5728 15 \u5206\u949F\u5185\u5C3D\u91CF\u5B8C\u6574\u5F55\u5236`,
        en: "Please record your chosen pieces/movements in their entirety where they fit within 15 minutes of recorded material. Your submission should also include a two-minute introduction.",
        enType: "original",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-recorded audition"
      }, {
        k: "live",
        zh: "- \u9762\u8BD5\uFF0C\u53EF\u80FD\u52A0\u5FEB\u901F\u8BC6\u8C31\uFF08quick study\uFF09",
        en: "Your audition will also include an interview. You may also be asked to perform a quick study.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "online",
        zh: `- **\u53E6\u4E00\u9996** ABRSM 8 \u7EA7\u53CA\u4EE5\u4E0A\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF08\u4E0D\u540C\u4E8E\u9884\u5BA1\u66F2\u76EE\uFF09
- \u5FEB\u901F\u8BC6\u8C31\u66F2\u76EE\u4E0E\u9762\u8BD5\u5B89\u6392\u4F1A\u63D0\u524D\u53D1\u9001`,
        en: "Here you should perform a different piece of ABRSM Grade 8 standard or above lasting no longer than five minutes. Quick-study material and interview details are sent in advance.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5\uFF08\u5165\u56F4\u8005\uFF09",
        ten: "Online audition (if shortlisted)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-popvoice",
      level: "UG",
      majors: ["popvoice", "songwriting"],
      cat: "audition",
      order: 3,
      prog: "BMus Popular Music \xB7 Voice / Singer-Songwriter",
      zh: "\u8BCD\u66F2\u521B\u4F5C\uFF08Composition \u4E3B\u4FEE\uFF09\u5B98\u7F51\u672A\u5355\u5217\u9884\u5BA1\u8981\u6C42\uFF0C\u5531\u4F5C\u4EBA\u901A\u5E38\u6309\u672C\u8DEF\u5F84\u51C6\u5907\uFF0C\u5EFA\u8BAE\u5411\u62DB\u751F\u529E\u786E\u8BA4\u3002",
      en: "No separate pre-screening is listed for the Composition (songwriting) pathway; singer-songwriters usually follow this route \u2014 confirm with admissions.",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/popular-music-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E00\u9996\u81EA\u9009\u66F2\u76EE\uFF08\u4E0D\u53EF\u4F7F\u7528\u8003\u7EA7\u66F2\u76EE\uFF09
- \u6307\u5B9A\u66F2\u76EE\u4E8C\u9009\u4E00\uFF1AGet Here\uFF08Jessie J & Jools Holland\uFF09\u6216 Human\uFF08Rag'n'Bone Man\uFF09
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD\uFF08\u53EF\u5355\u72EC\u5F55\u5236\u6216\u653E\u5728\u4E3B\u5F55\u50CF\u4E2D\uFF09`,
        en: "You should perform ONE piece of your own choice (excluding graded examination pieces) plus a set piece: Get Here \u2013 Jessie J and Jools Holland OR Human \u2013 Rag'n'Bone Man. All applicants should include a two-minute introduction.",
        enType: "original",
        t: "Stage 1 \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08Acceptd\uFF09",
        ten: "Stage 1 \xB7 Pre-recorded audition (Acceptd)"
      }, {
        k: ["live", "online"],
        zh: `- \u6F14\u594F\u9884\u5BA1\u66F2\u76EE\u6216\u65B0\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F
- \u58F0\u4E50\u6280\u672F\u8003\u6838\uFF1A\u5143\u97F3\u7EC3\u4E60\u3001\u97F3\u7A0B\u3001\u548C\u5F26\u6F14\u5531
- \u9762\u8BD5\uFF1A\u4E2A\u4EBA\u80CC\u666F\u4E0E\u5B66\u4E60\u610F\u613F`,
        en: "Perform the same two pieces you submitted as part of your initial recording, or a new piece, lasting no longer than five minutes, followed by musicianship tests and an interview. Vocal tests include vowel exercises, intervals and chord singing.",
        enType: "summary",
        t: "Stage 2 \xB7 \u73B0\u573A\u6216\u7EBF\u4E0A",
        ten: "Stage 2 \xB7 In person or online"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-aud-popinst",
      level: "UG",
      majors: ["popinst"],
      cat: "audition",
      order: 3,
      prog: "BMus Popular Music \xB7 Instruments",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/popular-music-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E00\u9996\u81EA\u9009\u66F2\u76EE\uFF08\u4E0D\u53EF\u4F7F\u7528\u8003\u7EA7\u66F2\u76EE\uFF09+ \u6309\u4E50\u5668\u7684\u6307\u5B9A\u66F2\u76EE\uFF1A
- \u8D1D\u65AF\uFF1AAnimal Spirits\uFF08Vulfpeck\uFF09
- \u9F13\uFF1AStand Up\uFF08The PB Underground\uFF09
- \u7535\u5409\u4ED6\uFF1ABeat It\uFF08Michael Jackson\uFF09
- \u952E\u76D8\uFF1ARosanna\uFF08Toto\uFF09
- \u5176\u4ED6\u4E50\u5668\uFF1A\u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u6D41\u884C\u98CE\u683C\u66F2\u76EE\uFF0C\u81F3\u5C11\u4E00\u9996\u6709\u4F34\u594F
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD`,
        en: "You should perform ONE piece of your own choice (excluding graded examination pieces) plus a set piece: Bass Guitar \u2014 Animal Spirits \u2013 Vulfpeck; Drum Kit \u2014 Stand Up \u2013 The PB Underground; Electric Guitar \u2014 Beat It \u2013 Michael Jackson; Keyboards \u2014 Rosanna \u2013 Toto. (Other instrumentalists) submit a recording of two contrasting pop influenced pieces, at least one accompanied. Include a two-minute introduction.",
        enType: "original",
        t: "Stage 1 \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08Acceptd\uFF09",
        ten: "Stage 1 \xB7 Pre-recorded audition (Acceptd)"
      }, {
        k: ["live", "online"],
        zh: `- \u6F14\u594F\u9884\u5BA1\u66F2\u76EE\u6216\u65B0\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F
- \u6280\u672F\u8003\u6838\uFF1A\u5409\u4ED6 / \u8D1D\u65AF / \u952E\u76D8\u8003\u97F3\u9636\u3001\u8C03\u5F0F\u3001\u7436\u97F3\u3001\u548C\u5F26\u6392\u5217\uFF1B\u9F13\u8003\u53CC\u8DF3\u6EDA\u594F\u3001\u57FA\u672C\u529F\u4E0E\u5F8B\u52A8
- \u9762\u8BD5\uFF1A\u4E2A\u4EBA\u80CC\u666F\u4E0E\u5B66\u4E60\u610F\u613F`,
        en: "Perform the same two pieces you submitted as part of your initial recording, or a new piece, lasting no longer than five minutes, followed by musicianship tests and an interview. Tests cover scales, modes, arpeggios and voicings (guitar/bass/keys) or double-stroke rolls, rudiments and grooves (drums).",
        enType: "summary",
        t: "Stage 2 \xB7 \u73B0\u573A\u6216\u7EBF\u4E0A",
        ten: "Stage 2 \xB7 In person or online"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-port-production",
      level: "UG",
      majors: ["production"],
      cat: "portfolio",
      order: 4,
      prog: "BMus Popular Music \xB7 Production",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/popular-music-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF0C\u987B\u5728 DAW \u4E2D\u5236\u4F5C\u5B8C\u6210
- \u540C\u65F6\u63D0\u4EA4\u97F3\u9891\u4E0E\u5B9E\u65F6\u5F55\u5C4F\u89C6\u9891\uFF0C\u5C55\u793A\u5236\u4F5C\u8FC7\u7A0B
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD`,
        en: "(Music Production) submit two contrasting pieces recorded on a DAW with audio and real time video. All applicants should include a two-minute introduction.",
        enType: "original",
        t: "Stage 1 \xB7 \u4F5C\u54C1\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Stage 1 \xB7 Submission (Acceptd)"
      }, {
        k: ["live", "online"],
        zh: `- \u6F14\u594F\u9884\u5BA1\u66F2\u76EE\u6216\u65B0\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F
- \u4F5C\u54C1\u5C55\u793A + \u97F3\u4E50\u7D20\u517B\u8003\u6838
- \u9762\u8BD5\uFF1A\u4E2A\u4EBA\u80CC\u666F\u4E0E\u5B66\u4E60\u610F\u613F`,
        en: "Perform the same two pieces you submitted as part of your initial recording, or a new piece, lasting no longer than five minutes, followed by musicianship tests and an interview. Present your work alongside musicianship tests.",
        enType: "summary",
        t: "Stage 2 \xB7 \u73B0\u573A\u6216\u7EBF\u4E0A",
        ten: "Stage 2 \xB7 In person or online"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-aud-pop",
      level: "PG",
      majors: ["popvoice", "popinst", "songwriting"],
      cat: "audition",
      order: 3,
      prog: "MMus / MPerf Popular Music",
      zh: "\u7814\u7A76\u751F\u9636\u6BB5\u672A\u5355\u5217\u8BCD\u66F2\u521B\u4F5C\u7684\u63D0\u4EA4\u8981\u6C42\uFF0C\u5EFA\u8BAE\u5411\u62DB\u751F\u529E\u786E\u8BA4\u3002",
      en: "No separate songwriting submission is listed at postgraduate level; confirm with admissions.",
      enType: "original",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/popular-music-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- **\u4E09\u9996**\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE / \u6B4C\u66F2\uFF0C\u987B\u4F53\u73B0\u7814\u7A76\u751F\u6C34\u5E73\u7684\u6280\u672F\u4E0E\u97F3\u4E50\u6311\u6218
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD`,
        en: "THREE contrasting pieces/songs that demonstrate a range of technical and musical challenges appropriate to postgraduate-level study, plus a two-minute introduction.",
        enType: "original",
        t: "Stage 1 \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08Acceptd\uFF09",
        ten: "Stage 1 \xB7 Pre-recorded audition (Acceptd)"
      }, {
        k: ["live", "online"],
        zh: `- \u6F14\u594F\u9884\u5BA1\u66F2\u76EE\u6216\u65B0\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F
- \u4E50\u7406 / \u6280\u672F\u8003\u6838\uFF0C\u5F62\u5F0F\u540C\u672C\u79D1\u3001\u96BE\u5EA6\u6309\u7814\u7A76\u751F\u6C34\u5E73
- \u9762\u8BD5\uFF1A\u4E2A\u4EBA\u80CC\u666F\u4E0E\u5B66\u4E60\u610F\u613F`,
        en: "Perform the same two pieces you submitted as part of your initial recording, or a new piece, lasting no longer than five minutes, followed by musicianship tests and an interview. Format as for undergraduates, adjusted to postgraduate level.",
        enType: "summary",
        t: "Stage 2 \xB7 \u73B0\u573A\u6216\u7EBF\u4E0A",
        ten: "Stage 2 \xB7 In person or online"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-port-production",
      level: "PG",
      majors: ["production"],
      cat: "portfolio",
      order: 4,
      prog: "MMus / MPerf Popular Music \xB7 Production",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/popular-music-audition-requirements/"],
      school: "rncm",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684 DAW \u5236\u4F5C\u4F5C\u54C1\uFF0C\u9644\u5B9E\u65F6\u5F55\u5C4F\u89C6\u9891
- 2 \u5206\u949F\u81EA\u6211\u4ECB\u7ECD`,
        en: "Two contrasting pieces produced on a DAW with audio and real-time screen video, plus a two-minute introduction.",
        enType: "summary",
        t: "Stage 1 \xB7 \u4F5C\u54C1\u63D0\u4EA4",
        ten: "Stage 1 \xB7 Submission"
      }, {
        k: ["live", "online"],
        zh: `- \u6F14\u594F\u9884\u5BA1\u66F2\u76EE\u6216\u65B0\u66F2\u76EE\uFF0C\u4E0D\u8D85\u8FC7 5 \u5206\u949F
- \u4F5C\u54C1\u5C55\u793A + \u8003\u6838
- \u9762\u8BD5\uFF1A\u4E2A\u4EBA\u80CC\u666F\u4E0E\u5B66\u4E60\u610F\u613F`,
        en: "Perform the same two pieces you submitted as part of your initial recording, or a new piece, lasting no longer than five minutes, followed by musicianship tests and an interview. Present your work alongside musicianship tests.",
        enType: "summary",
        t: "Stage 2 \xB7 \u73B0\u573A\u6216\u7EBF\u4E0A",
        ten: "Stage 2 \xB7 In person or online"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires \u63D0\u4EA4\u7533\u8BF7\uFF1B\u6240\u6709\u7533\u8BF7\u4EBA\uFF08\u542B\u73B0\u573A\u8003\u751F\uFF09\u90FD\u987B\u5728 Acceptd \u6CE8\u518C\u5E76\u63D0\u4EA4\u6750\u6599
## 2027 \u5E74\u5165\u5B66\u65F6\u95F4\u7EBF
- \u7533\u8BF7\u5F00\u653E\uFF1A2026 \u5E74 7 \u6708 9 \u65E5
- **\u7533\u8BF7\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 1 \u65E5**\uFF08\u9884\u5BA1\u5F55\u50CF\u540C\u6B65\u63D0\u4EA4\uFF09
- \u8003\u8BD5\u671F\uFF1A2026 \u5E74 11\u201312 \u6708
- Offer \u53D1\u653E\uFF1A2026 \u5E74 12 \u6708 24 \u65E5\u524D
- \u591A\u6570\u8BFE\u7A0B\u63A5\u53D7\u903E\u671F\u7533\u8BF7\uFF08GRNCM/MusB \u8054\u5408\u8BFE\u7A0B\u3001IAD\u3001\u6307\u6325\u9664\u5916\uFF09
## \u5F55\u50CF\u89C4\u8303
- \u4EC5 MP4\uFF1B\u673A\u4F4D\u56FA\u5B9A\uFF0C\u80FD\u770B\u6E05\u624B\u90E8\u4E0E\u9762\u90E8
- \u6F14\u594F\u90E8\u5206\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\uFF0C\u540C\u4E00\u573A\u5730\u540C\u4E00\u5929\u5F55\u5236
## \u8D39\u7528
- UCAS Conservatoires \u7533\u8BF7\u8D39 \xA334.50
- RNCM \u8003\u8BD5\u8D39\uFF1A\u5355\u4E3B\u4FEE \xA380\uFF0C\u53CC\u4E3B\u4FEE \xA3120
## \u8003\u70B9
- \u9F13\u52B1\u5230\u66FC\u5F7B\u65AF\u7279\u73B0\u573A\u8003\u8BD5\uFF1B\u6D77\u5916\u8003\u751F\u53EF\u4EA4\u5F55\u50CF\uFF0C\u5165\u56F4\u540E\u901A\u8FC7 Zoom / Teams \u7EBF\u4E0A\u9762\u8BD5\uFF1B\u65E0\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u70B9`,
      en: `Applications are made through UCAS Conservatoires; all applicants must also create an Acceptd account and submit materials there.
2027 entry: applications open 9 July 2026; deadline 1 October 2026 (pre-recorded submissions due at the same time); auditions November\u2013December 2026; offers by 24 December 2026. Late applications are accepted for most programmes except the GRNCM/MusB joint course, IAD and Conducting.
Recordings: MP4 only, fixed camera, performance recorded in one unedited take, same venue and day.
Fees: UCAS Conservatoires application fee \xA334.50; RNCM audition fee \xA380 (single principal study) or \xA3120 (joint principal study).`,
      enType: "summary",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/your-audition/", "https://www.rncm.ac.uk/study-here/make-an-application/your-audition/your-audition-faqs/"],
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027-28 Tuition",
      zh: `- BMus\uFF08\u5404\u5E74\u7EA7\uFF09\u56FD\u9645\u5B66\u751F\uFF1A\xA330,700 / \u5E74
- \u82F1\u56FD\u672C\u5730\u5B66\u751F\uFF1A\xA310,050 / \u5E74\uFF08\u4F9B\u53C2\u8003\uFF09
- \u5B66\u8D39\u6BCF\u5E74\u5BA1\u67E5\uFF0C\u53EF\u80FD\u8C03\u6574`,
      en: "BMus (all years): \xA330,700 per year for international students (UK students \xA310,050). Fees are reviewed annually and may change.",
      enType: "summary",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/fees/tuition-fees/"],
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rncm-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027-28 Tuition",
      zh: `\u56FD\u9645\u5B66\u751F\u5B66\u8D39\uFF1A
- MMus 1 \u5E74\u5236\uFF1A\xA339,100
- MMus 2 \u5E74\u5236\uFF1A\xA333,100 / \u5E74
- MPerf 1 \u5E74\u5236\uFF1A\xA340,500
- MPerf 2 \u5E74\u5236\uFF1A\xA333,300 / \u5E74
- Advanced PGDip\uFF1A\xA331,500
- \u5B66\u8D39\u6BCF\u5E74\u5BA1\u67E5\uFF0C\u53EF\u80FD\u8C03\u6574`,
      en: "International tuition fees 2027-28: MMus 1-year \xA339,100; MMus 2-year \xA333,100 per year; MPerf 1-year \xA340,500; MPerf 2-year \xA333,300 per year; Advanced PGDip \xA331,500. Fees are reviewed annually and may change.",
      enType: "summary",
      src: ["https://www.rncm.ac.uk/study-here/make-an-application/fees/tuition-fees/"],
      note: "MPerf \u82F1\u56FD\u672C\u5730\u751F\u5B66\u8D39\u6570\u5B57\u5F02\u5E38\u504F\u9AD8\uFF0C\u505A\u8D39\u7528\u89C4\u5212\u524D\u5EFA\u8BAE\u4E66\u9762\u5411 RNCM \u786E\u8BA4\u3002",
      school: "rncm",
      country: "UK",
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) Performance",
      zh: `- Scottish Highers 3 \u95E8\u901A\u8FC7\uFF0C\u6216 A-Level 2 \u95E8\u901A\u8FC7
- IB \u603B\u5206\u81F3\u5C11 24 \u5206\uFF0C\u5176\u4E2D 3 \u95E8 Higher Level
- \u5EFA\u8BAE\u79D1\u76EE\uFF1A\u97F3\u4E50\u4E0E\u82F1\u8BED\uFF08Higher / Advanced Higher / A-Level \u6216\u540C\u7B49\uFF09
- \u4E3B\u4FEE\u6C34\u5E73\u901A\u5E38\u81F3\u5C11\u76F8\u5F53\u4E8E ABRSM 8 \u7EA7\u4F18\u79C0\uFF08Distinction\uFF09\uFF1B\u672A\u8FBE\u8005\u4E5F\u4F1A\u8003\u8651\uFF0C\u4E0D\u8BBE\u786C\u6027 Tariff \u5206\u6570\u7EBF
- \u63A5\u53D7\u5206\u591A\u5E74\u3001\u591A\u6B21\u8003\u51FA\u7684 Highers \u6210\u7EE9`,
      en: `Scottish Highers \u2014 3 passes. A Levels \u2014 2 passes. International Baccalaureate \u2014 minimum score of 24 with 3 subjects at Higher Level.
Music at Higher, Advanced Higher or Advanced level or equivalent. English at Higher, Advanced Higher or Advanced level or equivalent.
Successful applicants will normally be of a standard at least equivalent to Grade 8 with Distinction of the Associated Board of the Royal School of Music in their Principal Study.
We offer a flexible approach to students taking Higher over more than one academic year and/or who achieve their qualifications in more than one sitting.`,
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/bmus-hons-performance/"],
      school: "rcs",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MMus / MA Performance \xB7 Collaborative Piano",
      zh: `- \u901A\u5E38\u987B\u6301\u6709\u81F3\u5C11 2:2 \u8363\u8A89\u5B66\u4F4D\u6216\u6D77\u5916\u540C\u7B49\u5B66\u5386\uFF0C\u4E13\u4E1A\u987B\u4E0E\u6240\u7533\u8BFE\u7A0B\u76F8\u5173
- Collaborative Piano\uFF1A\u5EFA\u8BAE\u5177\u5907\u4E0E\u6B4C\u624B / \u5668\u4E50\u6F14\u594F\u8005\u5408\u4F5C\u6F14\u51FA\u7684\u7ECF\u9A8C\uFF0C\u719F\u6089\u76F8\u5173\u4F34\u594F\u66F2\u76EE`,
      en: "Candidates for both the MMus and MA are normally expected to hold a good honours (at least 2:2) degree, or its overseas equivalent, in a subject area relevant to the demands of the programme.",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/mmus-ma-performance/", "https://rcs.ac.uk/courses/mmus-ma-accompaniment"],
      school: "rcs",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-english",
      level: "ALL",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus \xB7 MA / MMus Music \xB7 Artist Diploma",
      zh: `\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u97F3\u4E50\u7C7B\u8981\u6C42\u76F8\u540C\uFF1A
- **IELTS Academic \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT \u603B\u5206 80\uFF08\u9605\u8BFB 18 / \u542C\u529B 17 / \u53E3\u8BED 20 / \u5199\u4F5C 17\uFF09
- PTE Academic \u603B\u5206 59\uFF0C\u5404\u5355\u9879 59
- Cambridge English \u603B\u5206 169\uFF0C\u5404\u5355\u9879 162
- **\u4E0D\u63A5\u53D7 IELTS Academic Online \u4E0E TOEFL iBT Home Edition**
- \u6210\u7EE9\u987B\u5728\u8BFE\u7A0B\u5F00\u5B66\u524D 2 \u5E74\u5185\u53D6\u5F97`,
      en: `Bachelor of Music (Honours) and MA/MMus Music, Advanced Postgraduate Diploma in Music, Artist Diploma: IELTS Academic 6.0 with no component below 5.5; TOEFL iBT Overall score of 80, with minimum scores of: Reading \u2013 18, Listening -17, Speaking -20, Writing -17; PTE Academic Overall score of 59 with a minimum of 59 in all components (reading, listening, speaking, writing); Cambridge English Overall score of 169 with a minimum of 162 in all components.
Tests must be taken within two years of the start date of the chosen programme.`,
      enType: "original",
      src: ["https://www.rcs.ac.uk/study/international-students/english-requirements/"],
      school: "rcs",
      country: "UK",
      ielts: [{
        p: "BMus / MMus / MA",
        pen: "BMus / MMus / MA",
        o: "6.0",
        m: "5.5",
        n: "\u4E0D\u63A5\u53D7 IELTS Online",
        nen: "IELTS Academic Online not accepted"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Keyboard (Piano)",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/bmus-with-honours/keyboard/", "https://portal.rcs.ac.uk/som-auditions/pre-audition-information/som-undergraduate/ug-keyboard-audition-requirements/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u7EA6 3 \u5206\u949F\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF1A\u59D3\u540D\u3001\u97F3\u4E50\u80CC\u666F\u3001\u5FD7\u5411\u3001\u7533\u8BF7 RCS \u7684\u539F\u56E0
- \u6F14\u594F\u89C6\u9891**\u66F2\u76EE\u4E0D\u9650**\uFF08\u4E0D\u5FC5\u662F\u6B63\u5F0F\u8003\u8BD5\u66F2\u76EE\uFF09
- \u9752\u5C9B / \u65B0\u52A0\u5761 / \u9996\u5C14\u8003\u70B9\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5\uFF08\u5317\u7F8E\u8003\u70B9 12 \u6708 1 \u65E5\uFF09\uFF1BAcceptd \u63D0\u4EA4`,
        en: "International applicants submit a spoken video introduction in English (around 3 minutes: name, musical background, aspirations, reasons for applying) and a performance video with repertoire of their choice. Qingdao/Singapore/Seoul centres: by 1 October 2026 (North America 1 December).",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u4EC5\u56FD\u9645\u7533\u8BF7\u8005\uFF09",
        ten: "Round 1 \xB7 Pre-screening (international applicants)"
      }, {
        k: "live",
        zh: `- **\u4E09\u9996**\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF0C\u7A0B\u5EA6\u7EA6 8 \u7EA7\u6216\u4EE5\u4E0A
- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Performance of three contrasting works which should be of approximately Grade 8 standard or beyond. All in-person auditions will be given a twenty-minute warm up slot prior to their audition. An interview will form part of your audition.",
        enType: "original",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u5230\u6D77\u5916\u8003\u70B9\u8005\u53EF\u4EA4\u5F55\u50CF\u66FF\u4EE3\uFF0C\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5",
        en: "Applicants unable to attend an overseas centre may submit a recording instead, by 1 October 2026.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }, {
        k: "online",
        zh: "- \u5B66\u9662\u53EF\u80FD\u53E6\u5B89\u6392\u7EBF\u4E0A\u8003\u8BD5 / \u9762\u8BD5",
        en: "The Conservatoire may arrange an online audition or interview.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u8003\u8BD5 / \u9762\u8BD5\uFF08\u89C6\u60C5\u51B5\u5B89\u6392\uFF09",
        ten: "Online audition / interview (if arranged)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus / MA Performance Keyboard",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://rcs.ac.uk/postgraduate/masters-music-mmus/keyboard"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u7EA6 3 \u5206\u949F\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF1A\u59D3\u540D\u3001\u97F3\u4E50\u80CC\u666F\u3001\u5FD7\u5411\u3001\u7533\u8BF7 RCS \u7684\u539F\u56E0
- \u6F14\u594F\u89C6\u9891**\u66F2\u76EE\u4E0D\u9650**\uFF08\u4E0D\u5FC5\u662F\u6B63\u5F0F\u8003\u8BD5\u66F2\u76EE\uFF09
- \u9752\u5C9B / \u65B0\u52A0\u5761 / \u9996\u5C14\u8003\u70B9\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5\uFF08\u5317\u7F8E\u8003\u70B9 12 \u6708 1 \u65E5\uFF09\uFF1BAcceptd \u63D0\u4EA4`,
        en: "International applicants submit a spoken video introduction in English (around 3 minutes: name, musical background, aspirations, reasons for applying) and a performance video with repertoire of their choice. Qingdao/Singapore/Seoul centres: by 1 October 2026 (North America 1 December).",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF\uFF08\u4EC5\u56FD\u9645\u7533\u8BF7\u8005\uFF09",
        ten: "Round 1 \xB7 Pre-screening (international applicants)"
      }, {
        k: "live",
        zh: `- \u80CC\u8C31\u6F14\u594F\u4E0D\u5C11\u4E8E**\u4E09\u9996**\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF0C\u603B\u65F6\u957F\u7EA6 25 \u5206\u949F
- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5\uFF1B\u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2 \u65E5\u5F53\u5468`,
        en: "Performance of a programme from memory, comprising not less than three contrasting works (total playing time 25 minutes). Twenty-minute warm up; an interview will form part of your audition.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "MMus / MA Collaborative Piano",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://rcs.ac.uk/courses/mmus-ma-accompaniment"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u53E4\u5178\u5C0F\u63D0\u7434\u594F\u9E23\u66F2\u4E50\u7AE0
- \u4E00\u9996\u5FB7\u56FD\u827A\u672F\u6B4C\u66F2\uFF08Lied\uFF09
- \u4E00\u9996\u4E3A\u5973\u9AD8\u97F3\u800C\u4F5C\u7684\u6CD5\u56FD\u827A\u672F\u6B4C\u66F2`,
        en: "A movement from a classical violin sonata, a German Lied, and a French song for soprano.",
        enType: "summary",
        t: "\u6307\u5B9A\u66F2\u76EE",
        ten: "Set repertoire"
      }, {
        k: "pre",
        zh: `- \u4E0D\u8D85\u8FC7 3 \u5206\u949F\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD
- \u6F14\u594F\u5F55\u50CF\u987B**\u81EA\u884C\u627E**\u6B4C\u624B / \u5668\u4E50\u642D\u6863\u5408\u4F5C\u5F55\u5236\uFF1B\u622A\u6B62 2026 \u5E74 10 \u6708 1 \u65E5`,
        en: "A spoken English introduction (up to 3 minutes) and a performance video recorded with your own singer/instrumentalist, by 1 October 2026.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-screening video"
      }, {
        k: "live",
        zh: `- \u5B66\u9662**\u63D0\u4F9B**\u6B4C\u624B\u4E0E\u5668\u4E50\u642D\u6863
- \u89C6\u594F\u6D4B\u8BD5 + \u9762\u8BD5\uFF08\u66F2\u76EE\u77E5\u8BC6\u3001\u98CE\u683C\u8BA4\u77E5\u3001\u6F14\u51FA\u7ECF\u9A8C\u4E0E\u827A\u672F\u6001\u5EA6\uFF09\uFF1B\u8003\u524D 20 \u5206\u949F\u70ED\u8EAB
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2 \u65E5\u5F53\u5468`,
        en: "Singers and instrumentalists are provided; sight-reading test and interview; twenty-minute warm-up. Glasgow, week of 2 November 2026.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Vocal Performance",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/vocal-performance-undergraduate/", "https://portal.rcs.ac.uk/som-auditions/pre-audition-information/som-undergraduate/ug-voice-audition-requirements/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E09\u9996\u98CE\u683C\u4E0E\u60C5\u7EEA\u5BF9\u6BD4\u7684\u53E4\u5178\u66F2\u76EE\uFF0C\u81F3\u5C11\u4E00\u9996\u82F1\u8BED\u3001\u4E00\u9996\u5916\u8BED\uFF0C\u5168\u90E8\u80CC\u8C31
- \u4E00\u6BB5\u82F1\u8BED\u8BD7\u6B4C\u6216\u6563\u6587\u6717\u8BFB\uFF0C\u4E0D\u8D85\u8FC7 2 \u5206\u949F
- \u5178\u578B\u7EC4\u5408\uFF1A\u82F1\u8BED\u827A\u672F\u6B4C\u66F2\u6216\u6C11\u6B4C\u6539\u7F16 + \u610F\u5927\u5229\u53E4\u5178\u6B4C\u66F2\uFF08Arie Antiche\uFF09+ \u5FB7\u56FD\u6216\u6CD5\u56FD\u827A\u672F\u6B4C\u66F2 + \u82F1\u8BED\u77ED\u8BD7`,
        en: "Three pieces in contrasting styles and moods, at least one of which should be in English and one in a foreign language (to be sung from memory). A short poetry or prose reading in English lasting no longer than 2 minutes. A typical programme may include an English art song or Folksong setting, an Arie Antiche and a German Lied or French m\xE9lodie; and a short poem in English.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u5F53\u5929\u4E24\u8F6E\uFF1B\u8003\u751F\u81EA\u9009\u9996\u66F2\uFF0C\u8BC4\u59D4\u518D\u9009\u4E00\u5230\u4E24\u9996
- \u53EF\u80FD\u6709\u7B80\u5355\u4E50\u611F\u6D4B\u8BD5\uFF08\u6A21\u5531\u77ED\u65CB\u5F8B\u3001\u65E0\u4F34\u594F\u5531\u97F3\u9636\u6216\u7436\u97F3\uFF09\uFF0C\u4E0D\u63D0\u4F9B\u6837\u9898
- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B**\u6D77\u5916\u8003\u70B9\u987B\u81EA\u5E26\u94A2\u7434\u4F34\u594F**
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Two rounds on the day; you choose the first piece and the panel chooses one or two more. Candidates may be asked to respond to some simple aural skills tests. Twenty-minute warm-up; bring your own pianist at overseas centres.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u73B0\u573A\u8003\u8BD5\u8005\u53EF\u4EA4\u5F55\u50CF\uFF1A3 \u5206\u949F\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD + \u89C4\u5B9A\u66F2\u76EE",
        en: "If you cannot attend, submit a 3-minute spoken English introduction and the required repertoire on video.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "MMus / MA Vocal Performance \xB7 Opera",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/vocal-performance-postgraduate/", "https://portal.rcs.ac.uk/som-auditions/pre-audition-information/som-postgraduate/opera-vocalstudies-audition-requirements/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u56DB\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u53E4\u5178\u66F2\u76EE\uFF0C\u81F3\u5C11\u4E00\u9996\u82F1\u8BED\u3001\u4E00\u9996\u5916\u8BED
- \u5176\u4E2D\u4E00\u9996\u4E3A\u6B4C\u5267\u6216\u6E05\u5531\u5267\u548F\u53F9\u8C03\uFF08\u6700\u597D\u542B\u5BA3\u53D9\u8C03\uFF09\uFF0C\u4E00\u9996\u4E3A\u5FB7\u56FD\u827A\u672F\u6B4C\u66F2\u6216\u6CD5\u56FD\u827A\u672F\u6B4C\u66F2
- \u4E00\u6BB5\u82F1\u8BED\u8BD7\u6B4C\u6216\u6563\u6587\u6717\u8BFB\uFF0C\u4E0D\u8D85\u8FC7 2 \u5206\u949F`,
        en: "Candidates should prepare: Four contrasting classical pieces, at least one of which should be in English and one in a foreign language, plus a short poetry or prose reading in English lasting no longer than 2 minutes. One of the items should be an aria from an oratorio or opera, preferably with the recitative; another should be a German Lied or French m\xE9lodie.",
        enType: "original",
        t: "Vocal Studies\uFF08MMus / MA\uFF09"
      }, {
        k: "live",
        zh: `- \u8003\u751F\u81EA\u9009\u9996\u66F2\uFF0C\u8BC4\u59D4\u518D\u9009\u4E00\u5230\u4E24\u9996\uFF1B\u8003\u524D 20 \u5206\u949F\u70ED\u8EAB
- \u9762\u8BD5\uFF1A\u5BF9\u8BFE\u7A0B\u7684\u7406\u89E3\u3001\u66F2\u76EE\u77E5\u8BC6\u3001\u8868\u6F14\u5B9E\u8DF5\u3001\u6F14\u51FA\u7ECF\u9A8C\u4E0E\u804C\u4E1A\u5FD7\u5411`,
        en: "Candidates will be asked to choose their first piece, and the panel will then choose a further one or two pieces. An interview will explore your understanding of the demands of the programme, knowledge of repertoire, aspects of performance practice, performance experience and attitudes, and professional aspirations.",
        enType: "original",
        t: "Vocal Studies \xB7 \u73B0\u573A\u8003\u8BD5",
        ten: "Vocal Studies \xB7 Live audition"
      }, {
        k: "live",
        zh: `- \u51C6\u5907\u4E09\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u6B4C\u5267\u6216\u6E05\u5531\u5267\u548F\u53F9\u8C03
- \u7B2C\u4E00\u8F6E\uFF1A\u4ECE\u4E09\u9996\u4E2D\u5531\u4E24\u9996`,
        en: "Prepare three contrasting operatic or oratorio arias; round one: sing two of them.",
        enType: "summary",
        t: "Opera \xB7 \u73B0\u573A\u7B2C\u4E00\u8F6E\uFF08\u540C\u65E5\uFF09",
        ten: "Opera \xB7 Live round 1 (same day)"
      }, {
        k: "live",
        zh: "- \u5C0F\u7EC4\u8868\u6F14\u5DE5\u4F5C\u574A + \u518D\u5531\u4E00\u9996 + \u8BC4\u5BA1\u9762\u8BD5",
        en: "Group acting workshop, a further aria and a panel interview.",
        enType: "summary",
        t: "Opera \xB7 \u73B0\u573A\u7B2C\u4E8C\u8F6E\uFF08\u540C\u65E5\uFF09",
        ten: "Opera \xB7 Live round 2 (same day)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-aud-strings",
      level: "UG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "BMus Strings \xB7 Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/strings-undergraduate/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u6807\u51C6\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u7528\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u4F5C\u54C1\uFF1A\u53EF\u9009\u6807\u51C6\u66F2\u76EE\uFF0C\u4E5F\u53EF\u6765\u81EA\u4EFB\u4F55\u6D41\u6D3E\u6216\u6587\u5316\u80CC\u666F`,
        en: "Violin/Viola/Cello: First movement from a standard concerto (with cadenza where applicable); A contrasting work of your choice. This can be from the standard repertoire or from any genre or cultural background that reflects your interests as an artist.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5\uFF08\u97F3\u4E50\u80CC\u666F\u4E0E\u672A\u6765\u5FD7\u5411\uFF09
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Twenty-minute warm-up; an interview will form part of your audition.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u73B0\u573A\u8003\u8BD5\u8005\u53EF\u4EA4\u5F55\u50CF\uFF08Acceptd\uFF09\uFF1A3 \u5206\u949F\u4EE5\u5185\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD + \u89C4\u5B9A\u66F2\u76EE",
        en: "If you cannot attend, submit a spoken English introduction (up to 3 minutes) and the required repertoire via Acceptd.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-aud-doublebass",
      level: "UG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus Strings \xB7 Double Bass",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/strings-undergraduate/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u4F5C\u54C1\uFF1A\u53EF\u9009\u6807\u51C6\u66F2\u76EE\uFF0C\u4E5F\u53EF\u6765\u81EA\u4EFB\u4F55\u6D41\u6D3E\u6216\u6587\u5316\u80CC\u666F",
        en: "Double Bass: Two contrasting works of your choice. This can be from the standard repertoire or from any genre or cultural background that reflects your interests as an artist.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5\uFF08\u97F3\u4E50\u80CC\u666F\u4E0E\u672A\u6765\u5FD7\u5411\uFF09
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Twenty-minute warm-up; an interview will form part of your audition.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u73B0\u573A\u8003\u8BD5\u8005\u53EF\u4EA4\u5F55\u50CF\uFF08Acceptd\uFF09\uFF1A3 \u5206\u949F\u4EE5\u5185\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD + \u89C4\u5B9A\u66F2\u76EE",
        en: "If you cannot attend, submit a spoken English introduction (up to 3 minutes) and the required repertoire via Acceptd.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "MMus / MA Strings \xB7 Violin / Viola / Cello",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.rcs.ac.uk/courses/strings-postgraduate/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996**\u91CD\u8981**\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u7528\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u4F5C\u54C1\uFF08\u6807\u51C6\u66F2\u76EE\u6216\u4EFB\u4F55\u6D41\u6D3E / \u6587\u5316\u80CC\u666F\uFF09`,
        en: "Violin/Viola/Cello: First movement from a major concerto (with cadenza where applicable); A contrasting work of your choice. This can be from the standard repertoire or from any genre or cultural background that reflects your interests as an artist.",
        enType: "original"
      }, {
        k: "live",
        zh: `- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5\uFF08\u97F3\u4E50\u80CC\u666F\u4E0E\u672A\u6765\u5FD7\u5411\uFF09
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Twenty-minute warm-up; an interview will form part of your audition.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u73B0\u573A\u8003\u8BD5\u8005\u53EF\u4EA4\u5F55\u50CF\uFF08Acceptd\uFF09\uFF1A3 \u5206\u949F\u4EE5\u5185\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD + \u89C4\u5B9A\u66F2\u76EE",
        en: "If you cannot attend, submit a spoken English introduction (up to 3 minutes) and the required repertoire via Acceptd.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-aud-doublebass",
      level: "PG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus / MA Strings \xB7 Double Bass",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.rcs.ac.uk/courses/strings-postgraduate/"],
      school: "rcs",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E00\u9996\u6807\u51C6\u534F\u594F\u66F2\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u9002\u7528\u65F6\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u4F5C\u54C1`,
        en: "Double Bass: First movement from a standard concerto (with cadenza where applicable), plus a contrasting work of your choice.",
        enType: "summary"
      }, {
        k: "live",
        zh: `- \u8003\u524D 20 \u5206\u949F\u70ED\u8EAB\uFF1B\u542B\u9762\u8BD5\uFF08\u97F3\u4E50\u80CC\u666F\u4E0E\u672A\u6765\u5FD7\u5411\uFF09
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708`,
        en: "Twenty-minute warm-up; an interview will form part of your audition.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: "- \u65E0\u6CD5\u73B0\u573A\u8003\u8BD5\u8005\u53EF\u4EA4\u5F55\u50CF\uFF08Acceptd\uFF09\uFF1A3 \u5206\u949F\u4EE5\u5185\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD + \u89C4\u5B9A\u66F2\u76EE",
        en: "If you cannot attend, submit a spoken English introduction (up to 3 minutes) and the required repertoire via Acceptd.",
        enType: "summary",
        t: "\u5F55\u50CF\u66FF\u4EE3",
        ten: "Recorded alternative"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027/28 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires\uFF08R58\uFF09\u6216 UCAS Undergraduate\uFF08R68\uFF09
- \u7B2C\u4E8C\u6B65\u987B\u6CE8\u518C Acceptd\uFF08app.getacceptd.com/rcs\uFF09\uFF0C\u5426\u5219\u65E0\u6CD5\u5B89\u6392\u8003\u8BD5
## \u622A\u6B62\u65E5\u671F
- **\u952E\u76D8\uFF08\u94A2\u7434\uFF09\u4E0E Collaborative Piano\uFF1A\u6240\u6709\u7533\u8BF7\u8005\u7EDF\u4E00 2026 \u5E74 10 \u6708 1 \u65E5**
- \u5F26\u4E50\u3001\u58F0\u4E50\u7B49\u5176\u4ED6\u65B9\u5411\uFF1A\u82F1\u56FD\u7533\u8BF7\u8005 2026 \u5E74 10 \u6708 1 \u65E5\uFF1B**\u56FD\u9645\u7533\u8BF7\u8005 2026 \u5E74 12 \u6708 1 \u65E5**
- \u9752\u5C9B / \u65B0\u52A0\u5761 / \u9996\u5C14\u8003\u70B9\u9884\u5BA1\u5F55\u50CF\uFF1A2026 \u5E74 10 \u6708 1 \u65E5
- \u5F00\u5B66\uFF1A2027 \u5E74 9 \u6708 20 \u65E5
## \u8003\u70B9
- \u683C\u62C9\u65AF\u54E5 2026 \u5E74 11 \u6708 2\u20136 \u65E5\uFF1B\u9752\u5C9B 11 \u6708 18\u201320 \u65E5\uFF1B\u65B0\u52A0\u5761 11 \u6708 14 \u65E5\uFF1B\u9996\u5C14 11 \u6708 22 \u65E5\uFF08\u6682\u5B9A\uFF09\uFF1B\u5317\u7F8E 2027 \u5E74 1 \u6708
## \u8D39\u7528
- UCAS \u7533\u8BF7\u8D39 \xA334.50\uFF1BRCS \u8003\u8BD5\u8BC4\u4F30\u8D39 \xA365 / \u9879\u76EE\uFF08\u7ECF\u6D4E\u56F0\u96BE\u53EF\u51CF\u514D\uFF09
\u5B98\u7F51 How to Apply \u603B\u89C8\u9875\u4ECD\u663E\u793A\u4E0A\u4E00\u5468\u671F\u65E5\u671F\uFF0C\u4EE5\u4E0A\u6309\u5404\u7CFB\u9875\u9762\u5F55\u5165\u3002`,
      en: `Apply via UCAS Conservatoires (R58) or UCAS Undergraduate (R68), then register on Acceptd to be scheduled for audition.
Deadlines: Keyboard and Collaborative Piano \u2014 1 October 2026 for all applicants; other performance areas \u2014 UK applicants 1 October 2026, international applicants 1 December 2026. Pre-screening for Qingdao/Singapore/Seoul centres: 1 October 2026. Programmes start 20 September 2027.
Auditions: Glasgow 2\u20136 November 2026; Qingdao 18\u201320 November 2026; Singapore 14 November; Seoul 22 November (provisional); North America January 2027.
Fees: UCAS \xA334.50; RCS audition administration fee \xA365 per programme (waivers available).`,
      enType: "summary",
      src: ["https://www.rcs.ac.uk/study/how-to-apply/ug-pgt/", "https://www.rcs.ac.uk/courses/keyboard-undergraduate/", "https://www.rcs.ac.uk/courses/strings-undergraduate/"],
      school: "rcs",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2026/27 Tuition (for reference)",
      zh: `- BMus \u56FD\u9645\u5B66\u751F\uFF08\u542B\u6B27\u76DF\uFF09\uFF1A\xA329,786 / \u5E74
- \u82CF\u683C\u5170\u672C\u5730\u751F \xA31,820 / \u5E74\uFF1B\u82F1\u56FD\u5176\u4ED6\u5730\u533A / \u7231\u5C14\u5170 \xA39,790 / \u5E74\uFF08\u4F9B\u53C2\u8003\uFF09`,
      en: "BMus: \xA329,786 per year for international (including EU) students; Scotland \xA31,820; RUK/ROI \xA39,790 (2026/27).",
      enType: "summary",
      src: ["https://www.rcs.ac.uk/courses/bmus-hons-performance/"],
      school: "rcs",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rcs-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2026/27 Tuition (for reference)",
      zh: `\u56FD\u9645\u5B66\u751F\uFF1A
- MMus\uFF082 \u5E74\u5236\uFF09\uFF1A\xA329,786 / \u5E74
- MA\uFF081 \u5E74\u5236\uFF09\uFF1A\xA337,372
\u58F0\u4E50\u65B9\u5411\u672C\u5730\u751F\u5B66\u8D39\u5355\u72EC\u5B9A\u4EF7\uFF08MMus \xA314,861 / \u5E74\uFF0CMA \xA320,595\uFF09\uFF0C\u56FD\u9645\u751F\u8D39\u7387\u4EE5\u5B98\u7F51\u5F53\u671F\u4E3A\u51C6\u3002
\u751F\u6D3B\u8D39\u5B98\u65B9\u4F30\u7B97\uFF1A\xA311,200\u2013\xA315,300 / \u5E74\u3002`,
      en: "International: MMus (2 years) \xA329,786 per year; MA (1 year) \xA337,372 (2026/27). Living costs estimated at \xA311,200\u2013\xA315,300 per year.",
      enType: "summary",
      src: ["https://www.rcs.ac.uk/courses/mmus-ma-performance/", "https://rcs.ac.uk/courses/mmus-ma-accompaniment"],
      school: "rcs",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) Music \xB7 UCAS 300F",
      zh: `- UCAS Tariff \u6700\u4F4E 32 \u5206\uFF08A-level \u7EA6 EE\uFF1BAS-level \u987B\u4E0E A-level \u79D1\u76EE\u4E0D\u540C\uFF1B\u6700\u591A\u8BA1\u4E09\u95E8\uFF09
- IB \u603B\u5206\u81F3\u5C11 24 \u5206
- \u82CF\u683C\u5170 Advanced Highers DDD\uFF0C\u6216 2 \u95E8 Advanced Higher\uFF08DD\uFF09+ 2 \u95E8 Higher\uFF08DD\uFF09
- \u4EA6\u63A5\u53D7 BTEC\u3001Access to HE\u3001T Level\u3001\u7231\u5C14\u5170\u6BD5\u4E1A\u8BC1\u4E66\u7B49\uFF1B\u672A\u5217\u51FA\u7684\u5B66\u5386\u8054\u7CFB\u62DB\u751F\u529E
- \u53E6\u987B\u901A\u8FC7\u8003\u8BD5\uFF08Audition\uFF09+ \u9762\u8C08\uFF08Interview\uFF09+ \u97F3\u4E50\u6D4B\u8BD5\uFF08\u7EFC\u5408\u4E50\u7406\u4E0E\u97F3\u4E50\u7D20\u517B\uFF0C\u542B\u548C\u58F0\u4E0E\u542C\u529B\uFF09
- \u4E3B\u4FEE\u65B9\u5411\uFF1APerformance / Composition / Music Technology`,
      en: `32 UCAS Tariff points. A Level: 32 UCAS Tariff points / EE (or equivalent). AS Level: Must be in a different subject to A Levels. A maximum of three subjects will be considered.
Obtain a minimum of 24 points overall (International Baccalaureate).
Applicants will also need to complete an audition for this course, together with a test of general musical knowledge and musicianship skills, including harmony and aural.`,
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/courses/music-bmus-honours-2026-27", "https://www.ucas.com/explore/courses/035f0b4f-dbf6-ec59-f618-b7e6732e2d7d/course?studyYear=2027"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MMus / PgDip / PgCert \xB7 AdvPgDip",
      zh: `## MMus / PgDip Performance
- \u82F1\u56FD\u5B66\u751F\u901A\u5E38\u987B\u6709\u8363\u8A89\u5B66\u4F4D\uFF1B\u56FD\u9645\u5B66\u751F\u987B\u6709\u5B66\u58EB\u5B66\u4F4D\u6216\u540C\u7B49\u6587\u51ED\uFF08\u6700\u597D\u4F46\u4E0D\u5FC5\u987B\u662F\u97F3\u4E50\u4E13\u4E1A\uFF09
- \u65E0\u5B66\u4F4D\u4F46\u6709\u7A81\u51FA\u4E13\u4E1A\u6F14\u51FA\u7ECF\u5386\u3001\u8003\u8BD5\u8868\u73B0\u4F18\u5F02\u8005\u4E5F\u53EF\u80FD\u88AB\u8003\u8651
- \u987B\u901A\u8FC7\u8003\u8BD5 + \u9762\u8C08
## AdvPgDip Professional Performance\uFF08Post-Masters\uFF09
- \u987B\u6709\u7814\u7A76\u751F\u5B66\u5386\uFF08\u6700\u597D\u662F\u7855\u58EB\uFF09\uFF0C\u901A\u5E38\u4E3A\u8868\u6F14\u65B9\u5411\uFF0C\u6216\u6709\u53EF\u6838\u5B9E\u7684\u4E13\u4E1A\u7EA7\u516C\u5F00\u6F14\u51FA\u7ECF\u5386
- \u7533\u8BF7\u65F6\u63D0\u4EA4\u4E2A\u4EBA\u7B80\u5386\u4E0E\u6F14\u51FA\u6E05\u5355`,
      en: `MMus/PgDip: an honours degree (UK) or a bachelor's degree or equivalent diploma (international), ideally but not necessarily in music; applicants without a degree but with outstanding professional experience and audition may be considered.
AdvPgDip: A postgraduate qualification (preferably Masters level), normally (but not necessarily) specialising in performance and/or substantial, verifiable public performance experience at a professional level. You will need to demonstrate that you're able to perform at a professional level and should submit a biography and list of performances at the time of application.`,
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/courses/performance-mmus-pgdip-2026-27", "https://www.bcu.ac.uk/conservatoire/courses/professional-performance-adv-pgdip-2026-27"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus (Hons)",
      zh: `- **IELTS Academic \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- \u63A5\u53D7 UKVI \u8BA4\u53EF\u7684 SELT\uFF1BTOEFL / PTE / Duolingo \u7B49\u672A\u5217\u6362\u7B97\u5206\uFF0C\u987B\u5411\u62DB\u751F\u529E\u786E\u8BA4
- \u672A\u8FBE\u6807\u53EF\u8BFB 6 \u5468\u6216 10 \u5468\u8BED\u8A00\u9884\u79D1\uFF08Pre-Sessional English\uFF09`,
      en: `IELTS Minimum overall score of 6.0, with no less than 5.5 in each band.
A minimum of IELTS 5.5 or equivalent is required in all four skills areas to secure a student visa. 6- or 10-week Pre-Sessional English courses are available.`,
      enType: "original",
      src: ["https://www.ucas.com/explore/courses/035f0b4f-dbf6-ec59-f618-b7e6732e2d7d/course?studyYear=2027", "https://www.bcu.ac.uk/conservatoire/music/international-students/english-language-requirements"],
      school: "rbc",
      country: "UK",
      ielts: [{
        p: "BMus (Hons)",
        pen: "BMus (Hons)",
        o: "6.0",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MMus \xB7 PgDip \xB7 AdvPgDip",
      zh: `- **MMus\uFF082 \u5E74\u5168\u65E5\u5236 / 3 \u5E74\u975E\u5168\u65E5\u5236\uFF09**\uFF1AIELTS \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5
- **MMus 1 \u5E74\u5236\u5F3A\u5316**\uFF1AIELTS \u603B\u5206 7.0
- PgDip / AdvPgDip\uFF1AIELTS \u603B\u5206 6.0
- \uFF08\u53C2\u8003\uFF09MA Musicology 7.0\uFF0C\u5404\u5355\u9879 6.5
- \u7B7E\u8BC1\u6700\u4F4E\u8981\u6C42\uFF1A\u56DB\u9879\u5747\u4E0D\u4F4E\u4E8E 5.5\uFF1B\u5176\u4ED6\u8003\u8BD5\u6362\u7B97\u987B\u5411\u62DB\u751F\u529E\u786E\u8BA4`,
      en: `Two-year full time or three-year part-time study - IELTS: overall score 6 (course page: no less than 5.5 in each band).
One-year Intensive study - IELTS: overall score 7.0.
IELTS: overall score 6.0 (BMus (Hons), PgDip, AdvPgDip).
A minimum of IELTS 5.5 or equivalent is required in all four skills areas to secure a student visa.`,
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/international-students/english-language-requirements", "https://www.ucas.com/explore/courses/c67adc90-218d-c151-4a83-e55212616d8e/course?studyYear=2027"],
      school: "rbc",
      country: "UK",
      ielts: [{
        p: "MMus\uFF082 \u5E74\u5168\u65E5\u5236\uFF09",
        pen: "MMus (2 years full-time)",
        o: "6.0",
        m: "5.5"
      }, {
        p: "MMus\uFF081 \u5E74\u5F3A\u5316\uFF09",
        pen: "MMus (1-year intensive)",
        o: "7.0",
        m: "\u2014",
        n: "\u5B98\u7F51\u672A\u5217\u5355\u9879",
        nen: "Component scores not stated"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Performance \xB7 Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/music/international-students/submitting-an-audition-recording"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u4E09\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u4F5C\u54C1\uFF0C**\u603B\u65F6\u957F\u81F3\u5C11 20 \u5206\u949F**
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Please perform a programme three pieces (or movements) of different styles and periods of your own choice. The programme should be at least 20 minutes in length, and must be recorded in one single take. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- \u4E09\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u81EA\u9009\u4F5C\u54C1
- \u53EF\u80FD\u52A0\u8BD5\u89C6\u594F
- \u9762\u8C08\uFF1A\u97F3\u4E50\u5174\u8DA3\u3001\u7ECF\u5386\u3001\u60F3\u5728\u8BFE\u7A0B\u4E2D\u63A2\u7D22\u7684\u5185\u5BB9\u4E0E\u6BD5\u4E1A\u540E\u76EE\u6807
- \u53EF\u5728\u672C\u6821\u3001\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u5BA1\u6838\u70B9\u6216\u7EBF\u4E0A\u8FDB\u884C`,
        en: "You will be asked to perform three pieces (or movements) of different styles and periods of your own choice. You may be asked to sight-read. A conversational interview follows. Auditions can be held in Birmingham, at a China Mainland venue or virtually.",
        enType: "summary",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus / PgDip Performance \xB7 Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/music/international-students/submitting-an-audition-recording"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u4E0D\u540C\u98CE\u683C\u6216\u65F6\u671F\u7684\u4F5C\u54C1\uFF08\u6216\u4E50\u7AE0\uFF09\uFF0C**\u603B\u65F6\u957F\u81F3\u5C11 40 \u5206\u949F**
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Please perform a programme of pieces (or movements) of different styles or periods of your own choice. The programme should be at least 40 minutes in length, and must be recorded in one single take. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- \u81F3\u5C11 40 \u5206\u949F\u4E0D\u540C\u98CE\u683C\u6216\u65F6\u671F\u7684\u4F5C\u54C1
- \u987B\u901A\u8FC7\u8003\u8BD5 + \u9762\u8C08`,
        en: "A programme of at least 40 minutes of different styles or periods, plus an interview.",
        enType: "summary",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "Piano Accompaniment \xB7 AdvPgDip Collaborative Piano",
      zh: `- \u8003\u8BD5\u8981\u6C42\u9875\u5217\u51FA\u7814\u7A76\u751F\u94A2\u7434\u4F34\u594F\uFF08Piano Accompaniment\uFF09\uFF1A\u51C6\u5907 40 \u5206\u949F\u591A\u6837\u5316\u66F2\u76EE\uFF0C\u8003\u5B98\u672A\u5FC5\u5168\u90E8\u542C\u5B8C
- AdvPgDip \u7684 Collaborative Piano / Opera R\xE9p\xE9titeurship \u7EC6\u5316\u66F2\u76EE\u8981\u6C42\u5B98\u7F51\u672A\u516C\u5F00\uFF0C\u987B\u8054\u7CFB\u58F0\u4E50\u4E0E\u6B4C\u5267\u7CFB\u6216\u62DB\u751F\u529E\uFF08Conservatoire.International@bcu.ac.uk\uFF09\u786E\u8BA4`,
      en: `(Piano Accompaniment, postgraduate) You should prepare a varied programme of 40 minutes, not all of which may be heard.
AdvPgDip pathways: Instrumental Performance, Vocal Performance, Jazz Performance, Collaborative Piano, Organ Performance, Chamber Music Performance, Opera Repetiteurship or Choral Conducting.`,
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/courses/professional-performance-adv-pgdip-2026-27"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Performance \xB7 Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/music/international-students/submitting-an-audition-recording"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u80CC\u8C31\u6F14\u5531\u4E09\u9996\u53E4\u5178\u827A\u672F\u6B4C\u66F2\u3001\u548F\u53F9\u8C03\u6216\u97F3\u4E50\u4F1A\u4F5C\u54C1\uFF0C**\u603B\u65F6\u957F\u7EA6 20 \u5206\u949F**
- \u81F3\u5C11\u4E00\u9996\u4F7F\u7528\u82F1\u8BED\u548C\u62C9\u4E01\u8BED\u4EE5\u5916\u7684\u8BED\u8A00
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Please prepare and perform three classical art songs, arias, or concert works from memory. At least one of these selections should be in a language other than English or Latin. The program should be approximately 20 minutes in duration. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- \u80CC\u8C31\u6F14\u5531\u4E09\u9996\uFF0C\u81F3\u5C11\u4E00\u9996\u975E\u82F1\u8BED / \u62C9\u4E01\u8BED
- \u8003\u5B98\u53EF\u80FD\u5C31\u8868\u6F14\u505A\u7B80\u77ED\u7684\u5DE5\u4F5C\u574A\u5F0F\u6307\u5BFC\uFF0C\u8003\u5BDF\u53EF\u5851\u6027`,
        en: "Please perform three classical art songs, arias or concert works from memory. At least one of these should be in a language other than English or Latin. Be prepared for the panel to workshop elements of your performance briefly with you.",
        enType: "original",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "MMus / PgDip Vocal Performance",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/music/international-students/submitting-an-audition-recording"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u80CC\u8C31\u6F14\u5531\u56DB\u9996\u53E4\u5178\u827A\u672F\u6B4C\u66F2\u3001\u548F\u53F9\u8C03\u6216\u97F3\u4E50\u4F1A\u4F5C\u54C1\uFF0C**\u603B\u65F6\u957F\u7EA6 25 \u5206\u949F**\uFF0C\u4E00\u955C\u5230\u5E95
- \u81F3\u5C11\u4E24\u9996\u4F7F\u7528\u82F1\u8BED\u548C\u62C9\u4E01\u8BED\u4EE5\u5916\u7684\u8BED\u8A00
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Please prepare and perform four classical art songs, arias, or concert works from memory. At least two of these selections should be in a language other than English or Latin. The program should be approximately 25 minutes in duration and recorded in a single take. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- \u80CC\u8C31\u6F14\u5531\u56DB\u9996\uFF0C\u81F3\u5C11\u4E24\u9996\u975E\u82F1\u8BED / \u62C9\u4E01\u8BED
- \u987B\u901A\u8FC7\u8003\u8BD5 + \u9762\u8C08`,
        en: "Please perform four classical art songs, arias or concert works from memory. At least two of these should be in a language other than English or Latin. Interview.",
        enType: "summary",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-aud-strings",
      level: "ALL",
      majors: ["violin", "viola", "cello"],
      cat: "audition",
      order: 3,
      prog: "BMus / MMus Strings \xB7 Violin / Viola / Cello",
      zh: "\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u66F2\u76EE\u65F6\u957F\u76F8\u540C\uFF0C\u6309\u5B66\u4F4D\u5C42\u7EA7\u8BC4\u5224\u7A0B\u5EA6\u3002\u6CE8\u610F\u73B0\u573A\u4E0E\u5F55\u50CF\u65F6\u957F\u4E0D\u540C\u3002",
      en: "Same length for UG and PG, judged at the relevant level. Live and recorded durations differ.",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/music/international-students/submitting-an-audition-recording"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- **\u7EA6 20 \u5206\u949F**\uFF0C\u4E24\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u4F5C\u54C1
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Approximately 20 minute programme recorded in one single take, featuring two pieces (or movements) of different styles and periods of their own choice. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- **10\u201315 \u5206\u949F**\u8282\u76EE\u5355\uFF1A\u4E24\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u81EA\u9009\u4F5C\u54C1
- \u51C6\u5907\u4E24\u4E2A\u5927\u8C03\u3001\u4E24\u4E2A\u5C0F\u8C03\u7684\u97F3\u9636\u4E0E\u7436\u97F3\uFF08\u4E09\u4E2A\u516B\u5EA6\uFF09
- \u7B80\u77ED\u89C6\u594F\uFF1B\u5B66\u9662\u5B89\u6392\u5B98\u65B9\u4F34\u594F\u5E76\u53EF\u6392\u7EC3`,
        en: "Candidates are asked to play a 10-15 minute programme of two pieces (or movements) of different styles and periods. All candidates will be asked to prepare two major and two minor scales and arpeggios (three octaves). The audition will also include a short sight-reading test. An official accompanist will be arranged.",
        enType: "summary",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-aud-doublebass",
      level: "ALL",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus / MMus Strings \xB7 Double Bass",
      zh: "\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u66F2\u76EE\u65F6\u957F\u76F8\u540C\uFF0C\u6309\u5B66\u4F4D\u5C42\u7EA7\u8BC4\u5224\u7A0B\u5EA6\u3002\u6CE8\u610F\u73B0\u573A\u4E0E\u5F55\u50CF\u65F6\u957F\u4E0D\u540C\u3002",
      en: "Same length for UG and PG, judged at the relevant level. Live and recorded durations differ.",
      enType: "original",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- **\u7EA6 20 \u5206\u949F**\uFF0C\u4E24\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u4F5C\u54C1
- \u7533\u8BF7\u63D0\u4EA4\u540E**\u4E24\u5468\u5185**\u63D0\u4EA4\uFF1B\u7247\u5934\u53E3\u5934\u4ECB\u7ECD\u59D3\u540D\u3001\u8BFE\u7A0B\u3001\u66F2\u76EE\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u5F97\u526A\u8F91\u62FC\u63A5
- \u4E0A\u4F20 YouTube \u6216 Vimeo\uFF0C\u516C\u5F00\u94FE\u63A5\u586B\u5165\u8003\u8BD5\u8868\u5355\uFF08\u4E0D\u63A5\u53D7\u90AE\u4EF6\u53D1\u9001\u94FE\u63A5\uFF09`,
        en: "Approximately 20 minute programme recorded in one single take, featuring two pieces (or movements) of different styles and periods of their own choice. Submit within two weeks of applying; introduce yourself, the course and the pieces on camera; one single unedited take; public YouTube/Vimeo link entered in the audition form (links sent by email are not accepted).",
        enType: "summary",
        t: "\u5F55\u50CF\u63D0\u4EA4\uFF08\u5C45\u4F4F\u5728\u82F1\u56FD\u5883\u5916\u7684\u7533\u8BF7\u4EBA\uFF09",
        ten: "Audition recording (applicants living outside the UK)"
      }, {
        k: ["live", "online"],
        zh: `- **10\u201315 \u5206\u949F**\u8282\u76EE\u5355\uFF1A\u4E24\u9996\uFF08\u6216\u4E50\u7AE0\uFF09\u4E0D\u540C\u98CE\u683C\u4E0E\u65F6\u671F\u7684\u81EA\u9009\u4F5C\u54C1
- \u51C6\u5907\u4E24\u4E2A\u5927\u8C03\u3001\u4E24\u4E2A\u5C0F\u8C03\u7684\u97F3\u9636\u4E0E\u7436\u97F3\uFF08**\u4E24\u4E2A\u516B\u5EA6**\uFF09
- \u7B80\u77ED\u89C6\u594F\uFF1B\u5B66\u9662\u5B89\u6392\u5B98\u65B9\u4F34\u594F\u5E76\u53EF\u6392\u7EC3`,
        en: "Candidates are asked to play a 10-15 minute programme of two pieces (or movements) of different styles and periods. All candidates will be asked to prepare two major and two minor scales and arpeggios (two octaves). The audition will also include a short sight-reading test. An official accompanist will be arranged.",
        enType: "summary",
        t: "\u73B0\u573A\u6216\u7EBF\u4E0A\u5BA1\u6838",
        ten: "In-person or virtual audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-port-musictech",
      level: "ALL",
      majors: ["production", "musictech"],
      cat: "portfolio",
      order: 4,
      prog: "BMus / MMus \xB7 PgDip \xB7 PgCert Music Technology",
      zh: "Music Technology \u9762\u5411\u521B\u610F\u97F3\u4E50\u5236\u4F5C\u4EBA\uFF0C\u7ED3\u5408\u5F55\u97F3\u3001\u5236\u4F5C\u4E0E\u8868\u6F14\u9879\u76EE\u3002\u5B66\u672F\u4E0E\u82F1\u8BED\u8981\u6C42\u6309 BMus / MMus \u901A\u7528\u6807\u51C6\uFF0C\u4E13\u5C5E\u8BFE\u7A0B\u9875\u672A\u5355\u5217\uFF0C\u7528\u524D\u5EFA\u8BAE\u5411\u62DB\u751F\u529E\u786E\u8BA4\u3002",
      en: "Music Technology is aimed at the creative music producer. Academic and English requirements follow the general BMus/MMus standards.",
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/music/departments/music-technology", "https://www.bcu.ac.uk/conservatoire/music/auditions/requirements"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "pre",
        zh: "- \u7535\u5B50\u4F5C\u54C1\u96C6\uFF0C\u81F3\u5C11\u4E09\u90E8\u4F5C\u54C1\uFF1A\u5F55\u97F3\u3001\u5236\u4F5C\u3001\u521B\u4F5C\u6216\u5F71\u50CF\u914D\u4E50 / \u58F0\u97F3\u8BBE\u8BA1\u5747\u53EF",
        en: "Submit an electronic portfolio of at least three works \u2014 recordings, productions, compositions or soundtrack/sound design.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u4F5C\u54C1\u96C6",
        ten: "Round 1 \xB7 Portfolio"
      }, {
        k: ["live", "online"],
        zh: "- 15\u201325 \u5206\u949F\u4F5C\u54C1\u96C6\u9762\u8C08",
        en: "A 15\u201325 minute portfolio interview.",
        enType: "summary",
        t: "\u4F5C\u54C1\u96C6\u9762\u8C08\uFF08\u73B0\u573A\u6216\u7EBF\u4E0A\uFF09",
        ten: "Portfolio interview (in person or virtual)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-port-composition",
      level: "ALL",
      majors: ["songwriting"],
      cat: "portfolio",
      order: 4,
      prog: "Composition (BMus / MMus)",
      zh: "RBC \u65E0\u8BCD\u66F2\u521B\u4F5C\u5B66\u4F4D\uFF0C\u6700\u63A5\u8FD1\u7684\u662F\u4F5C\u66F2\u4E3B\u4FEE\u3002",
      en: "RBC has no songwriting degree; Composition is the closest option.",
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements", "https://www.bcu.ac.uk/conservatoire/courses/composition-mmus-pgdip-2026-27"],
      school: "rbc",
      country: "UK",
      stages: [{
        k: "pre",
        zh: "- \u4F5C\u54C1\u96C6\u81F3\u5C11\u4E09\u90E8\u4F5C\u54C1\uFF0C\u98CE\u683C\u4E0D\u9650\uFF0C\u5C3D\u91CF\u9644\u5F55\u97F3",
        en: "A portfolio of at least three works in any style, with recordings where possible.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u4F5C\u54C1\u96C6",
        ten: "Round 1 \xB7 Portfolio"
      }, {
        k: ["live", "online"],
        zh: "- \u9762\u8C08\uFF1A\u827A\u672F\u5F71\u54CD\u4E0E\u804C\u4E1A\u76EE\u6807",
        en: "Interview about artistic influences and career goals.",
        enType: "summary",
        t: "\u9762\u8C08\uFF08\u73B0\u573A\u6216\u7EBF\u4E0A\uFF09",
        ten: "Interview (in person or virtual)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-aud-jazz",
      level: "ALL",
      majors: ["popvoice", "popinst"],
      cat: "audition",
      order: 3,
      prog: "Jazz (BMus / MMus) \xB7 \u76F8\u8FD1\u65B9\u5411",
      zh: `RBC \u65E0\u6D41\u884C\u6F14\u5531 / \u5668\u4E50\u5B66\u4F4D\uFF0CJazz \u4E3A\u6700\u63A5\u8FD1\u65B9\u5411\uFF08\u5C5E\u7235\u58EB\u8303\u7574\uFF0C\u975E\u6D41\u884C\u5546\u4E1A\u97F3\u4E50\uFF09\u3002
- \u6F14\u594F / \u6F14\u5531\u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u7235\u58EB\u6807\u51C6\u66F2
- \u975E\u9F13\u624B\u3001\u975E\u6B4C\u624B\u987B\u51C6\u5907\u79FB\u8C03\u8C31\u4F8B\uFF1B\u6B4C\u624B\u987B\u5C55\u793A\u4E00\u5B9A\u7684\u952E\u76D8\u548C\u58F0\u5F39\u594F\u80FD\u529B`,
      en: "Jazz: perform two contrasting standards; non-drummers/vocalists prepare transposition examples; vocalists demonstrate basic keyboard harmony.",
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/music/auditions/requirements"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027/28 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires\uFF08\u9662\u6821\u4EE3\u7801 B34\uFF09\uFF1B\u63A8\u8350\u4EBA\u987B\u80FD\u8BC4\u4EF7\u5B66\u672F\u6216\u97F3\u4E50\u80FD\u529B\uFF0C\u4E0D\u63A5\u53D7\u5BB6\u4EBA\u670B\u53CB
## \u622A\u6B62\u65E5\u671F
- **\u5E73\u7B49\u8003\u8651\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 1 \u65E5**
- \u903E\u671F\u7533\u8BF7\u89C6\u540D\u989D\u53EF\u8003\u8651\u81F3\u6B21\u5E74 8 \u6708\u5E95\uFF0C\u987B\u5148\u8054\u7CFB\u62DB\u751F\u529E
- \u8003\u8BD5\u8F6E\u6B21\u53C2\u8003\u4E0A\u4E00\u5468\u671F\uFF1A11 \u6708\u7B2C\u4E00\u8F6E\u3001\u6B21\u5E74 2 \u6708\u7B2C\u4E8C\u8F6E\u3001\u4E4B\u540E\u4E34\u65F6\u5B89\u6392\uFF082027/28 \u5177\u4F53\u65E5\u671F\u5F85\u5B98\u7F51\u516C\u5E03\uFF09
## \u5F55\u50CF
- \u56FD\u9645\u7533\u8BF7\u4EBA\u7533\u8BF7\u540E\u4E24\u5468\u5185\u4E0A\u4F20 YouTube / Vimeo \u516C\u5F00\u94FE\u63A5\uFF1B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u526A\u8F91
## \u8D39\u7528
- UCAS Conservatoires \u7533\u8BF7\u8D39 \xA328.95
- \u8003\u8BD5\u8D39\uFF08\u4EA4 RBC\uFF09\uFF1A\u5355\u4E3B\u4FEE \xA380\uFF0C\u8054\u5408\u4E3B\u4FEE \xA3120\uFF0C\u4E0D\u9000\uFF1B\u7EBF\u4E0B\u3001\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u4E0E\u7EBF\u4E0A\u5BA1\u6838\u6536\u8D39\u76F8\u540C`,
      en: `Apply through UCAS Conservatoires (institution code B34). Equal consideration deadline: 1 October 2026; late applications may be considered until the end of August subject to places.
International applicants upload a single-take, unedited recording (public YouTube/Vimeo link) within two weeks of applying.
Fees: UCAS Conservatoires \xA328.95; audition fee paid to RBC \xA380 (single principal study) or \xA3120 (joint), non-refundable, the same for in-person, China Mainland and virtual auditions.`,
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/music/how-to-apply", "https://www.bcu.ac.uk/conservatoire/music/auditions"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "Tuition",
      zh: `- BMus 2027/28 \u5165\u5B66\uFF1A\u56FD\u9645\u5B66\u751F \xA329,460 / \u5E74\uFF08\u82F1\u56FD \xA310,050\uFF09
- BMus 2026/27 \u5165\u5B66\uFF1A\u56FD\u9645\u5B66\u751F \xA328,460 / \u5E74\uFF08\u4F9B\u53C2\u8003\uFF09`,
      en: "BMus (Hons) 2027/28 entry: \xA329,460 per year international (UK \xA310,050). 2026/27: \xA328,460 international.",
      enType: "summary",
      src: ["https://www.ucas.com/explore/courses/035f0b4f-dbf6-ec59-f618-b7e6732e2d7d/course?studyYear=2027"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rbc-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2026/27 Tuition (2027/28 TBC)",
      zh: `- MMus / PgDip Performance\uFF1A\u56FD\u9645\u5B66\u751F \xA328,460 / \u5E74\uFF08\u82F1\u56FD \xA312,880\uFF09
- AdvPgDip Professional Performance\uFF1A\u56FD\u9645\u5B66\u751F \xA328,460\uFF0812 \u4E2A\u6708\u5168\u65E5\u5236\uFF09
- PgCert\uFF08\u975E\u5168\u65E5\u5236\uFF09\uFF1A\xA32,147 / 20 \u5B66\u5206\u6A21\u5757
- 2027/28 \u5B66\u8D39\u5F85\u5B9A`,
      en: "MMus/PgDip Performance 2026/27: \xA328,460 per year international (UK \xA312,880). AdvPgDip: \xA328,460 international. 2027/28 fees to be confirmed.",
      enType: "summary",
      src: ["https://www.bcu.ac.uk/conservatoire/courses/performance-mmus-pgdip-2026-27", "https://www.bcu.ac.uk/conservatoire/courses/professional-performance-adv-pgdip-2026-27"],
      school: "rbc",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-academic",
      level: "UG",
      majors: ["@classical"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) Music Composition / Performance / Jazz",
      zh: `- \u4E3B\u4FEE\u4E50\u5668 / \u58F0\u4E50\u8FBE\u5230 8 \u7EA7\u6C34\u5E73
- 3 \u95E8 GCSE \u8FBE C \u53CA\u4EE5\u4E0A\uFF08\u542B\u82F1\u8BED\u8BED\u8A00\uFF09
- 2 \u95E8 A-level \u901A\u8FC7\uFF08\u901A\u5E38\u5176\u4E2D\u4E00\u95E8\u4E3A\u97F3\u4E50\uFF09\uFF0C\u6216\u540C\u7B49\u5B66\u5386\uFF08\u5982 BTEC Extended Diploma\uFF09\uFF1BHighers \u4E0E Advanced Highers \u7EC4\u5408\u4E5F\u4F1A\u8003\u8651
- \u4E0D\u8BBE UCAS Tariff \u5206\u6570\u7EBF\uFF0C\u4EE5\u8003\u8BD5\u9009\u62D4\u4E3A\u51C6
- \u8003\u8BD5\u5F53\u5929\u6709\u7B80\u77ED\u7684\u97F3\u4E50\u7D20\u517B\u8BCA\u65AD\u6D4B\u8BD5`,
      en: `Grade 8 standard in Principal Study.
3 GCSEs (including English Language) at Grade C or above.
Two A level passes (of which one should normally be Music) or equivalent qualifications.
Entry to the programme is dependent upon selection at audition.
A short diagnostic test will be administered on the day of your audition. This will be to test your musicianship level.`,
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/courses/bmus-hons-music-composition-performance-jazz/", "https://www.ucas.com/explore/courses/a7fe73c4-7f3f-22fc-16af-63e2097f594c/course"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-academic-mpi",
      level: "UG",
      majors: ["@pop"],
      cat: "academic",
      order: 1,
      prog: "BA (Hons) Music Performance and Industry",
      zh: `\u9762\u5411\u5531\u4F5C\u4EBA\u3001\u563B\u54C8\u5236\u4F5C\u4EBA\u3001\u7535\u5B50\u97F3\u4E50\u4EBA\u3001\u6C11\u8C23\u97F3\u4E50\u4EBA\u7B49\uFF0C\u878D\u5408\u6F14\u51FA\u3001\u5236\u4F5C\u3001\u8BCD\u66F2\u521B\u4F5C\u4E0E\u7248\u6743 / \u51FA\u7248 / \u6388\u6743\u7B49\u4EA7\u4E1A\u6280\u80FD\u3002
- 2 \u95E8 A-level \u901A\u8FC7\uFF08\u901A\u5E38\u4E00\u95E8\u4E3A\u97F3\u4E50\uFF09\uFF0C\u6216 BTEC Extended Diploma MMM / BTEC Level 3 Diploma D*D*
- \u76F8\u5173\u5B9E\u8DF5\u7ECF\u9A8C\uFF08\u4E50\u961F\u3001\u6F14\u51FA\u3001\u5236\u4F5C\uFF09\u4E5F\u4F1A\u7EB3\u5165\u8003\u91CF`,
      en: "Two A level passes (one normally Music), or BTEC Extended Diploma MMM / BTEC Level 3 Diploma D*D*; relevant practical experience is also considered. The programme combines performance, production, songwriting and music-industry skills.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/bmus-hons-music-performance-and-industry/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-academic",
      level: "PG",
      majors: ["@classical"],
      cat: "academic",
      order: 1,
      prog: "Master of Music (MMus)",
      zh: `- \u901A\u5E38\u987B\u6301 BMus (Hons) 2:1 \u6216\u4EE5\u4E0A\uFF0C\u6216\u540C\u7B49\u5B66\u5386
- \u4E5F\u63A5\u53D7\u9AD8\u7EA7\u6F14\u594F\u6587\u51ED\uFF0C\u5982 LTCL\u3001LRAM\u3001LRSM\u3001ARCM
- \u65E0\u6B63\u5F0F\u5B66\u4F4D\u4F46\u6709\u5145\u5206\u4E13\u4E1A\u7ECF\u9A8C\u8005\u53EF\u901A\u8FC7\u5148\u524D\u5B66\u4E60\u8BA4\u5B9A\uFF08RPL\uFF09\u4E2A\u6848\u8BC4\u4F30
- \u4EE5\u8003\u8BD5 / \u4F5C\u54C1\u96C6 + \u9762\u8BD5\u4E3A\u6838\u5FC3\u5F55\u53D6\u4F9D\u636E`,
      en: "Normally a BMus (Hons) at 2:1 or above, or equivalent; advanced performance diplomas such as LTCL, LRAM, LRSM or ARCM are also accepted. Applicants without a formal degree but with relevant professional experience may be considered through Recognition of Prior Learning.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/master-of-music-mmus/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-academic-songwriting",
      level: "PG",
      majors: ["songwriting"],
      cat: "academic",
      order: 1,
      prog: "MA Songwriting (online, part-time)",
      zh: `- \u901A\u5E38\u987B\u6301 BA / BMus (Hons) \u826F\u597D\u6210\u7EE9\u6216\u540C\u7B49\u5B66\u5386
- \u65E0\u5B66\u4F4D\u8005\u53EF\u901A\u8FC7\u5148\u524D\u5B66\u4E60\u8BA4\u5B9A\uFF08RPL\uFF09\u7533\u8BF7\uFF0C\u987B\u8BC1\u660E\u5177\u5907\u7814\u7A76\u751F\u5B66\u4E60\u51C6\u5907
- \u987B\u5728\u8FD1 3 \u5E74\u5185\u6709\u4E13\u4E1A\u5531\u4F5C\u6216\u8868\u6F14\u7ECF\u9A8C
- \u7EBF\u4E0A\u517C\u8BFB 2 \u5E74\uFF0C\u671F\u95F4\u53C2\u52A0\u4E00\u6B21 7 \u6708\u7EBF\u4E0B\u6691\u671F\u96C6\u4E2D\u73ED\uFF08\u4E00\u5468\uFF09`,
      en: "Normally a good pass in a BA/BMus (Hons) or equivalent; applicants without a degree may apply through Recognition of Prior Learning. Applicants should have professional songwriting or performance experience within the last three years. Online, part-time over two years, with one in-person summer intensive week in July.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/ma-songwriting/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus / BA",
      zh: `- **IELTS Academic \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**\uFF1B\u6216 Trinity ISE II \u53CA\u4EE5\u4E0A
- Cambridge C1 Advanced / B2 First\uFF1A\u603B\u5206 162\uFF0C\u5404\u5355\u9879 162
- PTE Academic\uFF1A\u603B\u5206 59\uFF0C\u5404\u5355\u9879 59
- TOEFL iBT\uFF1A\u603B\u5206 4\uFF0C\u5404\u5355\u9879 4\uFF08\u65B0\u8BA1\u5206\u5236\uFF1B\u6570\u503C\u8868\u8FF0\u4E0D\u6E05\uFF0C\u5EFA\u8BAE\u5411\u62DB\u751F\u529E\u786E\u8BA4\uFF09
- \u5B98\u7F51\u672A\u5217 Duolingo\uFF1B\u6210\u7EE9\u987B\u5728\u5F00\u5B66\u524D 2 \u5E74\u5185\u53D6\u5F97`,
      en: "Undergraduate degree level: IELTS (Academic) Overall score of 5.5, with a minimum of 5.5 in all four components. Cambridge C1 Advanced / B2 First: Overall score of 162 and no less than 162 in any component. Pearson PTE Academic: Overall score of 59, with a minimum of 59 in all four components. TOEFL iBT: Overall score of 4, with a minimum of 4 in all four skills.",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/english-language-requirements/"],
      school: "trinity",
      country: "UK",
      ielts: [{
        p: "BMus / BA",
        pen: "BMus / BA",
        o: "5.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MMus \xB7 MA \xB7 Professional / Artist Diploma",
      zh: `## MMus\u3001MA\u3001Professional Diploma\u3001Artist Diploma
- **IELTS Academic \u603B\u5206 6.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- Cambridge 176\uFF08\u5404\u5355\u9879 162\uFF09\uFF1BPTE 65\uFF08\u5404\u5355\u9879 59\uFF09\uFF1BTOEFL iBT 4.5\uFF08\u5404\u5355\u9879 4\uFF09
## Graduate Diploma\uFF08\u8FC7\u6E21\u6863\uFF09
- IELTS \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879 5.5\uFF1BCambridge 169\uFF1BPTE 59\uFF1BTOEFL iBT 4.5`,
      en: `Postgraduate programmes (MMus, MA, Professional Diploma, Artist Diploma): IELTS (Academic) Overall score of 6.5, with at least 5.5 in all four components; Cambridge C1 Advanced / B2 First Overall score of 176, with no less than 162 in any component; Pearson PTE Academic Overall score of 65, with a minimum of 59 in all four components; TOEFL iBT Overall score of 4.5, with a minimum of 4 in all four skills.
Graduate Diploma (Music): IELTS Overall score of 6.0, with a minimum of 5.5 in all four components.`,
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/english-language-requirements/"],
      school: "trinity",
      country: "UK",
      ielts: [{
        p: "MMus / MA",
        pen: "MMus / MA",
        o: "6.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-aud-piano",
      level: "UG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "BMus Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u5230\u4E09\u9996\u98CE\u683C\u4E0E\u6280\u672F\u5BF9\u6BD4\u7684\u94A2\u7434\u4F5C\u54C1\uFF0C\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F
- \u81F3\u5C11\u4E00\u9996\u987B\u80CC\u8C31`,
        en: "Applicants should prepare two to three pieces showing contrasting styles and techniques, written for your principal study instrument, and lasting no longer than 15 minutes in total. At least one of these pieces should be played from memory.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- Embark \u4E0A\u4F20\uFF1A\u4E0D\u8D85\u8FC7 3 \u5206\u949F\u7684\u81EA\u6211\u4ECB\u7ECD\u53E3\u64AD\uFF08\u59D3\u540D\u3001\u5B66\u4E60\u80CC\u666F\u3001\u5FD7\u5411\u3001\u62A5\u8003\u539F\u56E0\uFF09+ \u6F14\u594F
- MP4 / MOV / WMV\uFF0C\u624B\u673A\u5F55\u5236\u5373\u53EF\uFF0C\u97F3\u753B\u987B\u6E05\u6670\uFF1B\u4E0A\u4F20\u5931\u8D25\u53EF\u7528 YouTube / Vimeo \u94FE\u63A5
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5 18:00`,
        en: "Upload to Embark: a spoken introduction of up to 3 minutes plus your performance; MP4/MOV/WMV, phone recordings are fine if clear; YouTube/Vimeo links if upload fails. Deadline 23 October 2026, 6pm.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08Embark\uFF09",
        ten: "Recorded audition (Embark)"
      }, {
        k: "live",
        zh: `- \u53E4\u5178\u7C7B 2026 \u5E74 11 \u6708 16\u201327 \u65E5\uFF0C\u4F26\u6566 King Charles Court
- \u63D0\u4F9B\u7EA6 10 \u5206\u949F\u4F34\u594F\u6392\u7EC3\uFF1B\u8003\u540E\u7B80\u77ED\u4EA4\u6D41\uFF08\u5B66\u4E60\u7ECF\u5386\u3001\u6210\u5C31\u4E0E\u5FD7\u5411\uFF09`,
        en: "Classical auditions 16\u201327 November 2026 at King Charles Court, London; about 10 minutes of rehearsal with the accompanist; a short conversation afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-aud-piano",
      level: "PG",
      majors: ["piano"],
      cat: "audition",
      order: 3,
      prog: "MMus Performance \xB7 Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u98CE\u683C\u5BF9\u6BD4\u3001\u96BE\u5EA6\u76F8\u79F0\u7684\u8282\u76EE\u5355\uFF0C\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 30 \u5206\u949F
- \u81F3\u5C11\u4E00\u9996\u987B\u80CC\u8C31`,
        en: "Applicants should prepare a contrasting and suitably demanding programme of no more than 30 minutes in total. At least one of these pieces should be played from memory.",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4E24\u4F4D\u8003\u5B98\uFF08\u7CFB\u4E3B\u4EFB + \u4E13\u4E1A\u8003\u5B98\uFF09\u8BC4\u5BA1\uFF0C\u4E4B\u540E\u7B80\u77ED\u9762\u8BD5",
        en: "Two panel members (Head of Department and a specialist) and a short interview afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-aud-collab",
      level: "PG",
      majors: ["collab"],
      cat: "audition",
      order: 3,
      prog: "MMus Collaborative Piano",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E0D\u9700\u8981\u72EC\u594F\u66F2\u76EE\uFF1B\u8003\u5B98\u66F4\u5E0C\u671B\u542C\u5230\u5BA4\u5185\u4E50\u5408\u4F5C\uFF08\u4E8C\u91CD\u594F\u3001\u4E09\u91CD\u594F\u3001\u56DB\u91CD\u594F\u7B49\uFF09\u4E0E\u6B4C\u624B\u5408\u4F5C
- \u51C6\u5907\u6700\u591A\u4E09\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF0C\u8003\u5B98\u901A\u5E38\u4ECE\u66F4\u957F\u7684\u8282\u76EE\u5355\u4E2D\u542C 15\u201320 \u5206\u949F
- \u5982\u9700\u5B66\u6821\u534F\u52A9\u5B89\u6392\u5408\u4F5C\u4F19\u4F34\uFF0C\u987B\u81F3\u5C11\u63D0\u524D 3 \u5468\u8054\u7CFB`,
        en: "If you are applying for the collaborative piano programme, you will not need to present a solo piece. The panel prefer to hear chamber music for piano with other instruments (duos, trios, quartets etc.) and also collaboration with a singer. You will need to prepare up to three contrasting pieces for your audition. The panel will typically hear 15-20 minutes of a much longer programme.",
        enType: "original"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-aud-voice",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BMus Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u5230\u4E09\u9996\u98CE\u683C\u4E0E\u60C5\u7EEA\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE
- \u5EFA\u8BAE\u81F3\u5C11\u4E00\u9996\u7528\u975E\u6BCD\u8BED\u7684\u5916\u8BED\u6F14\u5531
- \u65F6\u957F\u5B98\u7F51\u672A\u7EDF\u4E00\u89C4\u5B9A\uFF0C\u5EFA\u8BAE\u5411\u62DB\u751F\u529E\u7D22\u53D6\u5F53\u5E74\u58F0\u4E50\u8BE6\u7EC6\u8981\u6C42`,
        en: "You should prepare two or three pieces of your choice in contrasting styles and moods. At least one piece should be in a language foreign to you.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- Embark \u4E0A\u4F20\uFF1A\u4E0D\u8D85\u8FC7 3 \u5206\u949F\u7684\u81EA\u6211\u4ECB\u7ECD\u53E3\u64AD\uFF08\u59D3\u540D\u3001\u5B66\u4E60\u80CC\u666F\u3001\u5FD7\u5411\u3001\u62A5\u8003\u539F\u56E0\uFF09+ \u6F14\u594F
- MP4 / MOV / WMV\uFF0C\u624B\u673A\u5F55\u5236\u5373\u53EF\uFF0C\u97F3\u753B\u987B\u6E05\u6670\uFF1B\u4E0A\u4F20\u5931\u8D25\u53EF\u7528 YouTube / Vimeo \u94FE\u63A5
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5 18:00`,
        en: "Upload to Embark: a spoken introduction of up to 3 minutes plus your performance; MP4/MOV/WMV, phone recordings are fine if clear; YouTube/Vimeo links if upload fails. Deadline 23 October 2026, 6pm.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08Embark\uFF09",
        ten: "Recorded audition (Embark)"
      }, {
        k: "live",
        zh: `- \u53E4\u5178\u7C7B 2026 \u5E74 11 \u6708 16\u201327 \u65E5\uFF0C\u4F26\u6566 King Charles Court
- \u63D0\u4F9B\u7EA6 10 \u5206\u949F\u4F34\u594F\u6392\u7EC3\uFF1B\u8003\u540E\u7B80\u77ED\u4EA4\u6D41\uFF08\u5B66\u4E60\u7ECF\u5386\u3001\u6210\u5C31\u4E0E\u5FD7\u5411\uFF09`,
        en: "Classical auditions 16\u201327 November 2026 at King Charles Court, London; about 10 minutes of rehearsal with the accompanist; a short conversation afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-aud-voice",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "MMus Performance \xB7 Voice",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u5230\u4E09\u9996\u98CE\u683C\u4E0E\u60C5\u7EEA\u5BF9\u6BD4\u7684\u81EA\u9009\u66F2\u76EE\uFF0C\u5EFA\u8BAE\u81F3\u5C11\u4E00\u9996\u7528\u975E\u6BCD\u8BED\u7684\u5916\u8BED\u6F14\u5531
- \u5B98\u7F51\u672A\u7ED9\u51FA\u7814\u7A76\u751F\u58F0\u4E50\u65F6\u957F\u7EC6\u5219\uFF1B\u58F0\u4E50 MMus \u53E6\u6536 vocal premium`,
        en: "You should prepare two to three pieces of your choice in contrasting styles and moods. At least one piece should be in a language foreign to you.",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4E24\u4F4D\u8003\u5B98\uFF08\u7CFB\u4E3B\u4EFB + \u4E13\u4E1A\u8003\u5B98\uFF09\u8BC4\u5BA1\uFF0C\u4E4B\u540E\u7B80\u77ED\u9762\u8BD5",
        en: "Two panel members (Head of Department and a specialist) and a short interview afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-aud-strings",
      level: "UG",
      majors: ["violin", "viola", "cello", "doublebass"],
      cat: "audition",
      order: 3,
      prog: "BMus Strings",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u9996\u98CE\u683C\u4E0E\u6280\u672F\u5BF9\u6BD4\u7684\u4F5C\u54C1\uFF0C\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 15 \u5206\u949F
- \u56DB\u79CD\u5F26\u4E50\u5668\u8981\u6C42\u76F8\u540C`,
        en: "Applicants should prepare two contrasting pieces which together should last no longer than 15 minutes. The two works should demonstrate contrasting style and techniques.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- Embark \u4E0A\u4F20\uFF1A\u4E0D\u8D85\u8FC7 3 \u5206\u949F\u7684\u81EA\u6211\u4ECB\u7ECD\u53E3\u64AD\uFF08\u59D3\u540D\u3001\u5B66\u4E60\u80CC\u666F\u3001\u5FD7\u5411\u3001\u62A5\u8003\u539F\u56E0\uFF09+ \u6F14\u594F
- MP4 / MOV / WMV\uFF0C\u624B\u673A\u5F55\u5236\u5373\u53EF\uFF0C\u97F3\u753B\u987B\u6E05\u6670\uFF1B\u4E0A\u4F20\u5931\u8D25\u53EF\u7528 YouTube / Vimeo \u94FE\u63A5
- \u622A\u6B62 2026 \u5E74 10 \u6708 23 \u65E5 18:00`,
        en: "Upload to Embark: a spoken introduction of up to 3 minutes plus your performance; MP4/MOV/WMV, phone recordings are fine if clear; YouTube/Vimeo links if upload fails. Deadline 23 October 2026, 6pm.",
        enType: "summary",
        t: "\u5F55\u50CF\u8003\u8BD5\uFF08Embark\uFF09",
        ten: "Recorded audition (Embark)"
      }, {
        k: "live",
        zh: `- \u53E4\u5178\u7C7B 2026 \u5E74 11 \u6708 16\u201327 \u65E5\uFF0C\u4F26\u6566 King Charles Court
- \u63D0\u4F9B\u7EA6 10 \u5206\u949F\u4F34\u594F\u6392\u7EC3\uFF1B\u8003\u540E\u7B80\u77ED\u4EA4\u6D41\uFF08\u5B66\u4E60\u7ECF\u5386\u3001\u6210\u5C31\u4E0E\u5FD7\u5411\uFF09`,
        en: "Classical auditions 16\u201327 November 2026 at King Charles Court, London; about 10 minutes of rehearsal with the accompanist; a short conversation afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-aud-strings",
      level: "PG",
      majors: ["violin", "viola", "cello", "doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus Performance \xB7 Strings",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u98CE\u683C\u5BF9\u6BD4\u3001\u96BE\u5EA6\u76F8\u79F0\u3001\u80FD\u5C55\u793A\u591A\u79CD\u6280\u672F\u4E0E\u97F3\u4E50\u6311\u6218\u7684\u8282\u76EE\u5355\uFF0C\u603B\u65F6\u957F\u4E0D\u8D85\u8FC7 20 \u5206\u949F",
        en: "Applicants should prepare a contrasting and suitably demanding programme demonstrating a variety of technical and musical challenges. The programme should last no longer than 20 minutes in total.",
        enType: "original"
      }, {
        k: "live",
        zh: "- \u4E24\u4F4D\u8003\u5B98\uFF08\u7CFB\u4E3B\u4EFB + \u4E13\u4E1A\u8003\u5B98\uFF09\u8BC4\u5BA1\uFF0C\u4E4B\u540E\u7B80\u77ED\u9762\u8BD5",
        en: "Two panel members (Head of Department and a specialist) and a short interview afterwards.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-aud-mpi",
      level: "UG",
      majors: ["popvoice", "popinst", "songwriting", "production", "musictech"],
      cat: "audition",
      order: 3,
      prog: "BA Music Performance and Industry",
      zh: "\u6D41\u884C / \u5F53\u4EE3\u65B9\u5411\u672C\u79D1\u7EDF\u4E00\u5165\u53E3\uFF0C\u91C7\u7528\u9762\u8BD5\u800C\u975E\u4F20\u7EDF\u8BD5\u6F14\u3002",
      en: "The single undergraduate entry route for popular and contemporary music; assessed by interview rather than a traditional audition.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/bmus-hons-music-performance-and-industry/", "https://www.trinitylaban.ac.uk/music-auditions/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- Embark \u63D0\u4EA4\uFF1A\u81EA\u6211\u4ECB\u7ECD\u53E3\u64AD + \u4F5C\u54C1\u6216\u6F14\u594F\u7247\u6BB5
- \u79CB\u5B63\u622A\u6B62 2026 \u5E74 11 \u6708 2 \u65E5 18:00\uFF1B\u6625\u5B63\u8865\u4EA4 2027 \u5E74 2 \u6708 15 \u65E5`,
        en: "Submit a spoken introduction and work or performance samples via Embark. Autumn deadline 2 November 2026; spring deadline 15 February 2027.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u6750\u6599\u63D0\u4EA4\uFF08Embark\uFF09",
        ten: "Round 1 \xB7 Submission (Embark)"
      }, {
        k: "all",
        zh: `- 25 \u5206\u949F\u9762\u8BD5\uFF0C\u542B\u7B80\u77ED\u97F3\u4E50\u7D20\u517B\u6D4B\u8BC4\uFF1A\u8282\u594F\u3001\u548C\u58F0\u3001\u542C\u8FA8\uFF08\u97F3\u7A0B / \u548C\u5F26\u542C\u8FA8\u3001\u8282\u594F\u7EC3\u4E60\u3001\u56F4\u7ED5\u4E00\u6BB5\u97F3\u4E50\u7684\u8BA8\u8BBA\uFF09
- \u5B98\u7F51\u672A\u8BF4\u660E\u9762\u8BD5\u4E3A\u73B0\u573A\u6216\u7EBF\u4E0A`,
        en: "A 25-minute interview including a short musicianship assessment (rhythm, harmony, aural skills). The website does not state whether it is in person or online.",
        enType: "summary",
        t: "\u9762\u8BD5\uFF0825 \u5206\u949F\uFF09",
        ten: "Interview (25 minutes)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-port-songwriting",
      level: "PG",
      majors: ["songwriting"],
      cat: "portfolio",
      order: 4,
      prog: "MA Songwriting (online, part-time)",
      zh: "\u8BE5\u8BFE\u7A0B\u65F6\u95F4\u7EBF\u72EC\u7ACB\u4E8E\u5176\u4ED6\u4E13\u4E1A\uFF0C\u987B\u5355\u72EC\u5411\u62DB\u751F\u529E\u786E\u8BA4\u4E0B\u4E00\u5165\u5B66\u5B63\u65E5\u671F\u3002",
      en: "This course runs on its own admissions timeline; confirm dates with admissions.",
      enType: "original",
      src: ["https://www.trinitylaban.ac.uk/courses/ma-songwriting/"],
      school: "trinity",
      country: "UK",
      stages: [{
        k: "pre",
        zh: `- \u4E09\u9996\u539F\u521B\u6B4C\u66F2\uFF0C\u81F3\u5C11\u4E00\u9996\u7531\u7533\u8BF7\u4EBA\u672C\u4EBA\u6F14\u5531 / \u6F14\u594F\uFF1B\u5176\u4F59\u4E24\u9996\u53EF\u7531\u4ED6\u4EBA\u6F14\u5531\uFF0C\u4E00\u9996\u53EF\u4E0E\u4ED6\u4EBA\u5408\u5199\uFF08\u987B\u6CE8\u660E\u5206\u5DE5\uFF09
- \u5EFA\u8BAE\u9644\u6B4C\u8BCD\u3001\u4E50\u8C31\u53CA\u5236\u4F5C\u6280\u672F\u622A\u56FE
- 3 \u5206\u949F\u89C6\u9891\u9648\u8FF0\uFF1A\u4E3A\u4F55\u5B66\u4E60\u8BCD\u66F2\u521B\u4F5C\u3001\u81EA\u8EAB\u9002\u5408\u5EA6`,
        en: "Applicants are required to upload a portfolio of three original songs written and composed. At least one of the songs must be a performed by the applicant. Two of the works may be performed by somebody else and one work may be co-written (these must be fully credited and state the roles played in creating the material). Applicants are required to record a 3-minute video statement describing why they wish to study songwriting and their suitability for the programme.",
        enType: "original",
        t: "\u7B2C\u4E00\u9636\u6BB5 \xB7 \u4F5C\u54C1\u96C6\uFF08Embark\uFF09",
        ten: "Stage 1 \xB7 Portfolio (Embark)"
      }, {
        k: "all",
        zh: "- \u8BA8\u8BBA\u4F5C\u54C1\u96C6\u3001\u7075\u611F\u6765\u6E90\u3001\u521B\u4F5C\u6D41\u7A0B\u4E0E\u6280\u5DE7",
        en: "Applicants will be asked to discuss their portfolio and their sources of inspiration, processes and techniques.",
        enType: "original",
        t: "\u7B2C\u4E8C\u9636\u6BB5 \xB7 \u9762\u8BD5",
        ten: "Stage 2 \xB7 Interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027/28 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires\uFF08\u9662\u6821\u4EE3\u7801 T75\uFF1BMMus 800F \u5168\u65E5\u5236 / 800P \u517C\u8BFB\uFF1BMA Songwriting 502P\uFF09
- \u5F55\u50CF\u4E0E\u4F5C\u54C1\u96C6\u7EDF\u4E00\u5728 Embark \u5E73\u53F0\u4E0A\u4F20
## \u65F6\u95F4\u7EBF
- \u7533\u8BF7\u5F00\u653E\uFF1A2026 \u5E74 7 \u6708 10 \u65E5
- **UCAS \u4E3B\u8F6E\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 1 \u65E5 18:00**
- Embark \u6750\u6599\uFF1A\u591A\u6570\u4E13\u4E1A 2026 \u5E74 10 \u6708 23 \u65E5 18:00\uFF1BBA Music Performance and Industry 11 \u6708 2 \u65E5
- \u53E4\u5178\u7C7B\u73B0\u573A\u8003\u8BD5\uFF1A11 \u6708 16\u201327 \u65E5\uFF1B\u7235\u58EB\uFF1A11 \u6708 30 \u65E5\u201312 \u6708 18 \u65E5
- UCAS \u7B2C\u4E8C\u8F6E / \u6700\u7EC8\u622A\u6B62\uFF1A2027 \u5E74 1 \u6708 13 \u65E5 18:00
- \u8003\u8BD5\u540E\u7EA6 4 \u5468\u5185\u51FA\u7ED3\u679C\uFF1B\u4E3B\u8F6E\u591A\u5728 12 \u6708\u5E95\u524D\u901A\u8FC7 UCAS \u901A\u77E5
- MA Songwriting \u65F6\u95F4\u7EBF\u72EC\u7ACB\uFF08\u67E5\u5230\u7684\u4E3A 2026 \u5E74\u5165\u5B66\uFF1A1 \u6708 14 \u65E5 / 9 \u6708 1 \u65E5\uFF09\uFF0C\u987B\u5355\u72EC\u786E\u8BA4
## \u8D39\u7528
- UCAS \u7BA1\u7406\u8D39 \xA334.50
- \u8003\u8BD5\u8D39\uFF1ABMus / MMus \xA398\uFF08UCAS \u9875\u9762\u5199 \xA395\uFF0C\u4EE5\u7F34\u8D39\u9875\u4E3A\u51C6\uFF09\uFF1BBA Music Performance and Industry \xA352`,
      en: `Apply through UCAS Conservatoires (T75; MMus 800F full-time / 800P part-time; MA Songwriting 502P) and upload recordings/portfolios to Embark.
Applications open 10 July 2026; on-time UCAS deadline 1 October 2026, 6pm; Embark deadline 23 October 2026 for most programmes (BA Music Performance and Industry: 2 November 2026); classical auditions 16\u201327 November 2026; jazz 30 November\u201318 December 2026; final UCAS deadline 13 January 2027.
Fees: UCAS \xA334.50; audition fee \xA398 (BMus/MMus; UCAS lists \xA395) or \xA352 (BA Music Performance and Industry).`,
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/music-auditions/", "https://www.trinitylaban.ac.uk/courses/master-of-music-mmus/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027-28 Tuition",
      zh: `- BMus\uFF08\u542B\u94A2\u7434\u3001\u58F0\u4E50\u3001\u5F26\u4E50\u3001\u7235\u58EB\uFF09\u56FD\u9645\u5B66\u751F\uFF1A\xA328,100 / \u5E74\uFF08\u82F1\u56FD \xA310,050\uFF09
- BA Music Performance and Industry \u56FD\u9645\u5B66\u751F\uFF1A\xA327,910 / \u5E74`,
      en: "2027-28: BMus \xA328,100 per year international (UK \xA310,050); BA Music Performance and Industry \xA327,910 international.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/bmus-hons-music-composition-performance-jazz/", "https://www.trinitylaban.ac.uk/courses/bmus-hons-music-performance-and-industry/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "tl-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027-28 Tuition",
      zh: `- MMus \u5168\u65E5\u5236\uFF082 \u5E74\uFF09\u56FD\u9645\u5B66\u751F\uFF1A\xA327,020 / \u5E74\uFF1B\u517C\u8BFB \xA316,730 / \u5E74
- **\u58F0\u4E50\u65B9\u5411\u53E6\u52A0 vocal premium**\uFF1A\u5168\u65E5\u5236 \xA31,500 / \u5E74\uFF0C\u517C\u8BFB \xA3840 / \u5E74
- MA Songwriting\uFF08\u7EBF\u4E0A\u517C\u8BFB 2 \u5E74\uFF09\uFF1A\xA37,180 / \u5E74`,
      en: "2027-28: MMus full-time \xA327,020 per year international (part-time \xA316,730); vocal premium \xA31,500 full-time / \xA3840 part-time; MA Songwriting \xA37,180.",
      enType: "summary",
      src: ["https://www.trinitylaban.ac.uk/courses/master-of-music-mmus/", "https://www.trinitylaban.ac.uk/courses/ma-songwriting/"],
      school: "trinity",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BMus (Hons) Music \u2013 Instrumental and Vocal \xB7 UCAS 300F",
      zh: `- \u4E0D\u91C7\u7528 UCAS Tariff \u79EF\u5206\uFF0C\u5F55\u53D6\u4EE5\u8003\u8BD5\u4E3A\u6838\u5FC3
- \u97F3\u4E50\u6C34\u5E73\u76F8\u5F53\u4E8E ABRSM 8 \u7EA7\u4F18\u79C0\uFF08Distinction\uFF09
- \u81F3\u5C11 2 \u95E8 A-Level\uFF08\u542B\u97F3\u4E50\uFF09\u6216\u540C\u7B49 Level 3 \u8D44\u683C\uFF1A\u82CF\u683C\u5170 Highers\u3001BTEC National Diploma / Certificate\u3001WBQ\u3001IB\u3001Advanced GNVQ\u3001AVCE\u3001Advanced Diploma \u7B49
- ABRSM \u4E50\u7406 6 \u7EA7\u53CA\u4EE5\u4E0A\u53EF\u66FF\u4EE3 A-Level \u97F3\u4E50
- \u5B9E\u9645\u5F55\u53D6\u6761\u4EF6\u6309\u4E2A\u4EBA\u7533\u8BF7\u4E0E\u8003\u8BD5\u800C\u5B9A\uFF0C\u5E38\u9AD8\u4E8E\u6700\u4F4E\u8981\u6C42
- \u5B66\u4F4D\u7531 University of South Wales \u6388\u4E88\uFF0C4 \u5E74\u5168\u65E5\u5236`,
      en: `Musical ability equivalent to that required to gain a Distinction at ABRSM Grade VIII.
At least two A-Levels including Music or an equivalent level 3 qualification (Scottish Highers, BTEC National Diploma/Certificate, WBQ, International Baccalaureate, Advanced GNVQ, AVCE or Advanced Diploma (Level 3)).
ABRSM music theory qualifications at Grade VI or above may also be considered as an alternative to an A-Level in Music.
The minimum conditions attached to any offer of a place are based on individual applications/auditions, and will often be higher than the minimum requirements.`,
      enType: "original",
      src: ["https://digital.ucas.com/coursedisplay/courses/15b27fa5-9fc7-5382-5e05-e1ea639c6d09"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MMus Music Performance \xB7 Collaborative Piano",
      zh: `- \u987B\u6709\u97F3\u4E50\u7C7B\u672C\u79D1\u5B66\u4F4D\u6216\u540C\u7B49\u8D44\u683C\uFF08\u672A\u8981\u6C42\u5177\u4F53\u5B66\u4F4D\u7B49\u7EA7\uFF09
- \u5728\u5176\u4ED6\u9886\u57DF\u5B66\u4E60\u6216\u5DE5\u4F5C\u8FC7\u7684\u7533\u8BF7\u4EBA\u4E5F\u4F1A\u88AB\u8003\u8651
- \u4EE5\u8003\u8BD5\u4E3A\u4E3B\u8981\u5F55\u53D6\u4F9D\u636E
- \u5B66\u5236\uFF1A2 \u5E74\u5168\u65E5\u5236\u6216 13 \u4E2A\u6708\u5F3A\u5316\u5236`,
      en: "An undergraduate degree in music or an equivalent qualification. Applications from candidates who have been studying or working in another field will also be considered. Entry is by audition.",
      enType: "original",
      src: ["https://www.ucas.com/explore/courses/dfcf22e1-2768-5014-9565-a533a637b427/course"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-ug-english",
      level: "UG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "BMus",
      zh: `- **IELTS Academic \u603B\u5206 5.5\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT \u603B\u5206 72\uFF08\u542C\u529B 17 / \u9605\u8BFB 18 / \u5199\u4F5C 17 / \u53E3\u8BED 20\uFF09
- CAE 162\uFF1BPTE Academic 59\uFF1BTrinity ISE II \u5404\u9879\u901A\u8FC7
- \u6210\u7EE9\u6709\u6548\u671F 2 \u5E74`,
      en: `Undergraduate programmes: IELTS Academic overall 5.5 (5.5 in each component); TOEFL iBT overall 72 (Listening 17, Reading 18, Writing 17, Speaking 20); CAE overall 162; Trinity ISE II Pass; PTE Academic overall 59.
Your test results are only valid for two years. If you have a results certificate that is dated more than two years before the start of your course, we will not be able to accept it.`,
      enType: "original",
      src: ["https://www.rwcmd.ac.uk/international-students/english-language-requirements"],
      school: "rwcmd",
      country: "UK",
      ielts: [{
        p: "BMus",
        pen: "BMus",
        o: "5.5",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-english",
      level: "PG",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "MMus (2 years / 13 months intensive)",
      zh: `## MMus 2 \u5E74\u5168\u65E5\u5236
- **IELTS Academic \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- TOEFL iBT 72\uFF08\u542C 17 / \u8BFB 18 / \u5199 17 / \u8BF4 20\uFF09\uFF1BCAE 169\uFF1BPTE 64\uFF1BTrinity ISE II \u542C\u8BFB\u5199 Distinction\u3001\u53E3\u8BED Pass
## MMus 13 \u4E2A\u6708\u5F3A\u5316
- **IELTS Academic \u603B\u5206 6.5\uFF0C\u9605\u8BFB\u4E0E\u5199\u4F5C 6.0\uFF0C\u542C\u529B\u4E0E\u53E3\u8BED 5.5**
- TOEFL iBT 85\uFF08\u9605\u8BFB / \u5199\u4F5C 20\u3001\u542C\u529B 17\u3001\u53E3\u8BED 20\uFF09\uFF1BCAE 176\uFF1BPTE 70
\u6210\u7EE9\u6709\u6548\u671F 2 \u5E74\u3002`,
      en: `MMus Music (Two Years Full Time): IELTS Academic overall 6.0 (5.5 in each component); TOEFL iBT 72 (Listening 17, Reading 18, Writing 17, Speaking 20); CAE 169; PTE Academic 64.
MMus Music (13 Months Intensive): IELTS Academic overall 6.5 (Listening 5.5, Reading 6.0, Writing 6.0, Speaking 5.5); TOEFL iBT 85; CAE 176; PTE Academic 70.
Your test results are only valid for two years.`,
      enType: "original",
      src: ["https://www.rwcmd.ac.uk/international-students/english-language-requirements"],
      school: "rwcmd",
      country: "UK",
      ielts: [{
        p: "MMus\uFF082 \u5E74\u5236\uFF09",
        pen: "MMus (2 years)",
        o: "6.0",
        m: "5.5"
      }, {
        p: "MMus\uFF0813 \u4E2A\u6708\u5F3A\u5316\uFF09",
        pen: "MMus (13-month intensive)",
        o: "6.5",
        m: "\u9605\u8BFB / \u5199\u4F5C 6.0\uFF0C\u542C\u529B / \u53E3\u8BED 5.5",
        men: "Reading/Writing 6.0, Listening/Speaking 5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-aud-general",
      level: "ALL",
      majors: ["piano", "voice", "violin", "viola", "cello", "doublebass", "collab"],
      cat: "audition",
      order: 3,
      prog: "BMus / MMus \xB7 Audition format & recording rules",
      zh: "\u5728 UCAS Conservatoires \u7533\u8BF7\u8868\u4E0A\u9009\u62E9\u73B0\u573A\u8003\u8BD5\u6216\u5F55\u50CF\u8003\u8BD5\uFF1B\u65E0\u8BBA\u54EA\u79CD\u90FD\u987B\u6CE8\u518C Acceptd\u3002**\u5404\u4E50\u5668 / \u58F0\u90E8\u7684\u5177\u4F53\u66F2\u76EE\u6E05\u5355\u5728\u5B98\u7F51\u6298\u53E0\u9762\u677F\u4E2D\uFF0C\u77E5\u8BC6\u5E93\u672A\u80FD\u6293\u53D6**\uFF0C\u987B\u4EBA\u5DE5\u6253\u5F00 audition-guidance \u9875\u9762\u5C55\u5F00\u67E5\u770B\uFF0C\u6216\u90AE\u4EF6 admissions@rwcmd.ac.uk \u7D22\u53D6\u3002\u529B\u4E89\u8003\u8BD5\u540E 3 \u5468\u5185\u901A\u77E5\u7ED3\u679C\u3002",
      en: "Choose an in-person or recorded audition on the UCAS Conservatoires form; Acceptd registration is required either way. Instrument-specific repertoire is on the website and should be checked directly. Decisions are aimed within 3 weeks of the audition.",
      enType: "original",
      src: ["https://www.rwcmd.ac.uk/audition-guidance/audition-guidance-music", "https://www.rwcmd.ac.uk/audition-guidance/audition-guidance-collaborative-piano", "https://www.rwcmd.ac.uk/how-to-apply-music"],
      note: "\u9010\u4E50\u5668\u66F2\u76EE\u6E05\u5355\u4E3A\u5B98\u7F51 JS \u6298\u53E0\u9762\u677F\uFF0C\u77E5\u8BC6\u5E93\u672A\u6293\u53D6\u5230\uFF0C\u9700\u4EBA\u5DE5\u6D4F\u89C8\u5668\u6838\u5B9E\u540E\u8865\u5F55\u3002",
      school: "rwcmd",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u9009\u62E9\u73B0\u573A\u8003\u8BD5\u5219\u65E0\u9700\u63D0\u4EA4\u5F55\u50CF\uFF1B\u5F55\u50CF\u622A\u6B62 2026 \u5E74 10 \u6708 19 \u65E5
- \u6F14\u594F\u987B\u4E00\u955C\u5230\u5E95\u3001\u4E0D\u526A\u8F91\uFF08\u4EC5\u5F00\u573A / \u7ED3\u675F\u53E3\u8FF0\u53EF\u526A\uFF09
- \u8BBE\u5907\u56FA\u5B9A\u5728\u4E09\u811A\u67B6\u6216\u5E73\u9762\uFF1B\u624B\u673A\u6A2A\u5C4F\uFF0C\u4E0D\u7528\u81EA\u62CD\u6A21\u5F0F\uFF1B\u5168\u7A0B\u53EF\u89C1\u6F14\u594F\u8005
- \u8DDD\u79BB\u7EA6 5\u20136 \u82F1\u5C3A\uFF081.5\u20131.8 \u7C73\uFF09\u8D77\u8C03\uFF1B\u907F\u514D\u9006\u5149\uFF1B\u6700\u54CD\u6BB5\u843D\u4E0D\u80FD\u7834\u97F3\uFF1B\u9009\u5B89\u9759\u3001\u5C11\u56DE\u58F0\u7684\u623F\u95F4`,
        en: "If you select to attend an audition in-person you do not need to submit a video recording. Your performance must be one continuous shot with no edits or cuts. Edits are accepted for introduction and closing dialogue only. Please be sure your recording device is placed on a tripod or flat surface, and ensure you are visible for the duration of your performance. If using a mobile phone, record horizontally. Start at five to six feet away and adjust from there.",
        enType: "original",
        t: "\u5F55\u50CF\u8003\u8BD5",
        ten: "Recorded audition"
      }, {
        k: "live",
        zh: `- \u5361\u8FEA\u592B\u73B0\u573A\uFF0C\u6216\u4E2D\u56FD\u5927\u9646\u8003\u70B9\uFF1A**\u4E0A\u6D77\u3001\u6210\u90FD\u3001\u5E7F\u5DDE\u3001\u5317\u4EAC\uFF0C2026 \u5E74 10 \u6708 24 \u65E5\u201311 \u6708 6 \u65E5**
- \u901A\u8FC7 Acceptd \u9884\u7EA6\u73B0\u573A\u8003\u8BD5\uFF0C\u622A\u6B62 10 \u6708 5 \u65E5\uFF1B\u4E2D\u56FD\u8003\u751F self-tape \u4E0A\u4F20\u622A\u6B62 10 \u6708 5 \u65E5`,
        en: "Cardiff, or the China tour: Shanghai, Chengdu, Guangzhou and Beijing between 24 October and 6 November 2026. Book via Acceptd by 5 October 2026; China self-tape upload by 5 October 2026.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-aud-orch-violin",
      level: "PG",
      majors: ["violin"],
      cat: "audition",
      order: 3,
      prog: "MMus Orchestral Performance \xB7 Violin (2023 guide, reference)",
      zh: "\u4EC5\u4F9B\u53C2\u8003\uFF1A2023 \u7248\u7814\u7A76\u751F Orchestral Performance \u6307\u5357\uFF0C\u975E\u5F53\u671F\u5B98\u65B9\u8981\u6C42\u3002",
      en: "For reference only: 2023 postgraduate Orchestral Performance guide, not the current official requirement.",
      enType: "original",
      src: ["https://resources.rwcmd.ac.uk/pdf/Audition-Guidance-PG-Orchestral-Performance-2023.pdf"],
      note: "2023 \u7248\u65E7\u8D44\u6599\uFF0C\u7528\u524D\u987B\u786E\u8BA4\u662F\u5426\u4ECD\u73B0\u884C\u3002",
      school: "rwcmd",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u81EA\u9009\u4E00\u9996\u83AB\u624E\u7279\u534F\u594F\u66F2\u7B2C\u4E00\u4E50\u7AE0\uFF08\u4E0D\u542B\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1
- \u4E50\u961F\u7247\u6BB5\uFF1A\u4EA8\u5FB7\u5C14\u300A\u8036\u592B\u5854\u300B\u5E8F\u66F2\u4E0E\u5C0F\u6B65\u821E\u66F2\uFF1B\u8D1D\u591A\u82AC\u7B2C\u4E00\u4EA4\u54CD\u66F2\u7B2C 2\u30013 \u4E50\u7AE0\uFF1B\u7F57\u897F\u5C3C\u300A\u5A01\u5EC9\xB7\u9000\u5C14\u300B\u5E8F\u66F2\uFF1B\u67CF\u8FBD\u5179\u300A\u5E7B\u60F3\u4EA4\u54CD\u66F2\u300B\u7B2C 1 \u4E50\u7AE0\uFF1B\u52C3\u62C9\u59C6\u65AF\u7B2C\u56DB\u4EA4\u54CD\u66F2\u7B2C 1 \u4E50\u7AE0\uFF1B\u9A6C\u52D2\u7B2C\u56DB\u4EA4\u54CD\u66F2\u7B2C 3 \u4E50\u7AE0\uFF1B\u8D1D\u5C14\u683C\u300A\u6C83\u91C7\u514B\u300B\u7B2C\u4E8C\u5E55`,
        en: `The 1st movement of a Mozart concerto (without cadenza) of their choice, plus a contrasting work. Required excerpts: Handel \u2013 Jephtha (Overture, Menuet); Beethoven \u2013 Symphony No. 1 (2nd & 3rd movements); Rossini \u2013 William Tell Overture; Berlioz \u2013 Symphonie Fantastique (1st movement); Brahms \u2013 Symphony No. 4 (1st movement); Mahler \u2013 Symphony No. 4 (3rd movement); Berg \u2013 Wozzeck (Act 2).
Applicants should study these excerpts to show that they understand the context and style, and observe all the marks (dynamics and tempo) written by the composer.`,
        enType: "original",
        t: "\u66F2\u76EE\u4E0E\u4E50\u961F\u7247\u6BB5",
        ten: "Repertoire and excerpts"
      }, {
        k: "live",
        zh: `- \u603B\u65F6\u957F\u7EA6 10\u201315 \u5206\u949F
- \u5165\u56F4\u8005\u73B0\u573A\u8FDB\u4E00\u6B65\u6D4B\u8BD5\uFF1A\u7B80\u5355\u89C6\u5531\u7EC3\u8033\u3001\u97F3\u9636\u3001\u6839\u636E\u8C31\u9762\u5373\u5174\u6F14\u793A`,
        en: "About 10\u201315 minutes in total; shortlisted candidates take further tests (simple aural, scales and sight-reading-based tasks).",
        enType: "summary",
        t: "\u5165\u56F4\u540E\u8FDB\u4E00\u6B65\u6D4B\u8BD5",
        ten: "Further tests (if shortlisted)"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-aud-orch-viola",
      level: "PG",
      majors: ["viola"],
      cat: "audition",
      order: 3,
      prog: "MMus Orchestral Performance \xB7 Viola (2023 guide, reference)",
      zh: "\u4EC5\u4F9B\u53C2\u8003\uFF1A2023 \u7248\u7814\u7A76\u751F Orchestral Performance \u6307\u5357\uFF0C\u975E\u5F53\u671F\u5B98\u65B9\u8981\u6C42\u3002",
      en: "For reference only: 2023 postgraduate Orchestral Performance guide, not the current official requirement.",
      enType: "original",
      src: ["https://resources.rwcmd.ac.uk/pdf/Audition-Guidance-PG-Orchestral-Performance-2023.pdf"],
      note: "2023 \u7248\u65E7\u8D44\u6599\uFF0C\u7528\u524D\u987B\u786E\u8BA4\u662F\u5426\u4ECD\u73B0\u884C\u3002",
      school: "rwcmd",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4EE5\u4E0B\u534F\u594F\u66F2\u4E4B\u4E00\u7684\u7B2C\u4E00\u4E50\u7AE0\uFF08\u81EA\u9009\u534E\u5F69\uFF09\uFF1A\u65BD\u5854\u7C73\u8328\u964D B \u5927\u8C03\u6216 D \u5927\u8C03\u534F\u594F\u66F2\uFF1B\u970D\u592B\u8FC8\u65AF\u7279 D \u5927\u8C03\u534F\u594F\u66F2
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1
- \u4E50\u961F\u7247\u6BB5\uFF1A\u5DF4\u8D6B\u300A\u52C3\u5170\u767B\u5821\u534F\u594F\u66F2\u300B\u7B2C\u4E09\u53F7\uFF1B\u83AB\u624E\u7279\u7B2C\u4E09\u5341\u4E94\u4EA4\u54CD\u66F2\uFF1B\u9A6C\u52D2\u7B2C\u4E5D\u4EA4\u54CD\u66F2\uFF1BR. \u65BD\u7279\u52B3\u65AF\u300A\u5802\u5409\u8BC3\u5FB7\u300B\uFF1B\u57C3\u5C14\u52A0\u300A\u8C1C\u8BED\u53D8\u594F\u66F2\u300B`,
        en: "The 1st movement (with a cadenza of the student's choice) of ONE of the following: Stamitz: Concerto in Bb major; Stamitz: Concerto in D major; Hoffmeister: Concerto in D major. Required excerpts: Bach \u2013 Brandenburg Concerto No. 3; Mozart \u2013 Symphony No. 35; Mahler \u2013 Symphony No. 9; Strauss \u2013 Don Quixote; Elgar \u2013 Enigma Variations.",
        enType: "original",
        t: "\u66F2\u76EE\u4E0E\u4E50\u961F\u7247\u6BB5",
        ten: "Repertoire and excerpts"
      }, {
        k: "live",
        zh: `- \u603B\u65F6\u957F\u7EA6 10\u201315 \u5206\u949F
- \u5165\u56F4\u8005\u73B0\u573A\u8FDB\u4E00\u6B65\u6D4B\u8BD5\uFF1A\u7B80\u5355\u89C6\u5531\u7EC3\u8033\u3001\u97F3\u9636\u3001\u6839\u636E\u8C31\u9762\u5373\u5174\u6F14\u793A`,
        en: "About 10\u201315 minutes in total; shortlisted candidates take further tests (simple aural, scales and sight-reading-based tasks).",
        enType: "summary",
        t: "\u5165\u56F4\u540E\u8FDB\u4E00\u6B65\u6D4B\u8BD5",
        ten: "Further tests (if shortlisted)"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-aud-orch-cello",
      level: "PG",
      majors: ["cello"],
      cat: "audition",
      order: 3,
      prog: "MMus Orchestral Performance \xB7 Cello (2023 guide, reference)",
      zh: "\u4EC5\u4F9B\u53C2\u8003\uFF1A2023 \u7248\u7814\u7A76\u751F Orchestral Performance \u6307\u5357\uFF0C\u975E\u5F53\u671F\u5B98\u65B9\u8981\u6C42\u3002",
      en: "For reference only: 2023 postgraduate Orchestral Performance guide, not the current official requirement.",
      enType: "original",
      src: ["https://resources.rwcmd.ac.uk/pdf/Audition-Guidance-PG-Orchestral-Performance-2023.pdf"],
      note: "2023 \u7248\u65E7\u8D44\u6599\uFF0C\u7528\u524D\u987B\u786E\u8BA4\u662F\u5426\u4ECD\u73B0\u884C\u3002",
      school: "rwcmd",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u6D77\u987F C \u5927\u8C03\u6216 D \u5927\u8C03\u534F\u594F\u66F2\u7B2C\u4E00\u4E50\u7AE0\uFF08\u81EA\u9009\u534E\u5F69\uFF09
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u4F5C\u54C1
- \u4E50\u961F\u7247\u6BB5\uFF1A\u5DF4\u8D6B\u5EB7\u5854\u5854\uFF1B\u83AB\u624E\u7279\u7B2C\u4E09\u5341\u4E5D\u4EA4\u54CD\u66F2\uFF1B\u9A6C\u52D2\u7B2C\u4E94\u4EA4\u54CD\u66F2\uFF1B\u65AF\u7F8E\u5854\u90A3\u300A\u88AB\u51FA\u5356\u7684\u65B0\u5AC1\u5A18\u300B\uFF1BR. \u65BD\u7279\u52B3\u65AF\u300A\u82F1\u96C4\u751F\u6DAF\u300B\uFF1B\u74E6\u683C\u7EB3\u300A\u7F57\u6069\u683C\u6797\u300B\uFF1B\u95E8\u5FB7\u5C14\u677E\u300A\u4EF2\u590F\u591C\u4E4B\u68A6\u300B\uFF1B\u67F4\u53EF\u592B\u65AF\u57FA\u300A\u53F6\u752B\u76D6\u5C3C\xB7\u5965\u6D85\u91D1\u300B\uFF1B\u83AB\u624E\u7279\u300A\u8D39\u52A0\u7F57\u300B\u5E8F\u66F2\uFF1B\u666E\u5951\u5C3C\u300A\u66FC\u4FAC\xB7\u5217\u65AF\u79D1\u300B`,
        en: "The 1st movement (with a cadenza of the student's choice) of ONE of the following: Haydn: Concerto in C major; Haydn: Concerto in D major. Required excerpts: Bach Cantata; Mozart Symphony No. 39; Mahler Symphony No. 5; Smetana \u2013 The Bartered Bride; Strauss \u2013 Ein Heldenleben; Wagner \u2013 Lohengrin; Mendelssohn \u2013 A Midsummer Night's Dream; Tchaikovsky \u2013 Eugene Onegin; Mozart \u2013 Figaro Overture; Puccini \u2013 Manon Lescaut.",
        enType: "original",
        t: "\u66F2\u76EE\u4E0E\u4E50\u961F\u7247\u6BB5",
        ten: "Repertoire and excerpts"
      }, {
        k: "live",
        zh: `- \u603B\u65F6\u957F\u7EA6 10\u201315 \u5206\u949F
- \u5165\u56F4\u8005\u73B0\u573A\u8FDB\u4E00\u6B65\u6D4B\u8BD5\uFF1A\u7B80\u5355\u89C6\u5531\u7EC3\u8033\u3001\u97F3\u9636\u3001\u6839\u636E\u8C31\u9762\u5373\u5174\u6F14\u793A`,
        en: "About 10\u201315 minutes in total; shortlisted candidates take further tests (simple aural, scales and sight-reading-based tasks).",
        enType: "summary",
        t: "\u5165\u56F4\u540E\u8FDB\u4E00\u6B65\u6D4B\u8BD5",
        ten: "Further tests (if shortlisted)"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-aud-orch-doublebass",
      level: "PG",
      majors: ["doublebass"],
      cat: "audition",
      order: 3,
      prog: "MMus Orchestral Performance \xB7 Double Bass (2023 guide, reference)",
      zh: "\u4EC5\u4F9B\u53C2\u8003\uFF1A2023 \u7248\u7814\u7A76\u751F Orchestral Performance \u6307\u5357\uFF0C\u975E\u5F53\u671F\u5B98\u65B9\u8981\u6C42\u3002",
      en: "For reference only: 2023 postgraduate Orchestral Performance guide, not the current official requirement.",
      enType: "original",
      src: ["https://resources.rwcmd.ac.uk/pdf/Audition-Guidance-PG-Orchestral-Performance-2023.pdf"],
      note: "2023 \u7248\u65E7\u8D44\u6599\uFF0C\u7528\u524D\u987B\u786E\u8BA4\u662F\u5426\u4ECD\u73B0\u884C\u3002",
      school: "rwcmd",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u534F\u594F\u66F2\u7B2C 1\u30012 \u4E50\u7AE0\uFF0C\u4ECE\u8FEA\u7279\u65AF\u591A\u592B\u3001\u5FB7\u62C9\u6208\u5185\u8482\u3001\u96C5\u5404\u5E03\u6216\u6B23\u5FB7\u7C73\u7279\u4E2D\u9009
- \u4E00\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u81EA\u9009\u4F5C\u54C1
- \u4E50\u961F\u7247\u6BB5\uFF1A\u9009\u81EA\u8D1D\u591A\u82AC\u3001\u8212\u4F2F\u7279\u3001\u9A6C\u52D2\u3001\u8096\u65AF\u5854\u79D1\u7EF4\u5947\u3001\u5A01\u5C14\u7B2C\u4F5C\u54C1\uFF1B\u987B\u81EA\u5907\u5206\u8C31`,
        en: "A concerto (1st and 2nd movements) by Dittersdorf, Dragonetti, Jacob or Hindemith; a contrasting work of your own choice AND the following excerpts (from Beethoven, Schubert, Mahler, Shostakovich and Verdi). Applicants are expected to provide their own copies of these extracts.",
        enType: "original",
        t: "\u66F2\u76EE\u4E0E\u4E50\u961F\u7247\u6BB5",
        ten: "Repertoire and excerpts"
      }, {
        k: "live",
        zh: `- \u603B\u65F6\u957F\u7EA6 10\u201315 \u5206\u949F
- \u5165\u56F4\u8005\u73B0\u573A\u8FDB\u4E00\u6B65\u6D4B\u8BD5\uFF1A\u7B80\u5355\u89C6\u5531\u7EC3\u8033\u3001\u97F3\u9636\u3001\u6839\u636E\u8C31\u9762\u5373\u5174\u6F14\u793A`,
        en: "About 10\u201315 minutes in total; shortlisted candidates take further tests (simple aural, scales and sight-reading-based tasks).",
        enType: "summary",
        t: "\u5165\u56F4\u540E\u8FDB\u4E00\u6B65\u6D4B\u8BD5",
        ten: "Further tests (if shortlisted)"
      }],
      verified: "2026-09-21",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-port-cmt",
      level: "ALL",
      majors: ["musictech"],
      cat: "portfolio",
      order: 4,
      prog: "Composition and Creative Music Technology \xB7 \u76F8\u8FD1\u65B9\u5411",
      zh: `RWCMD \u65E0\u72EC\u7ACB\u97F3\u4E50\u79D1\u6280\u5B66\u4F4D\u3002\u7535\u5B50\u97F3\u4E50\u521B\u4F5C\u3001\u5F71\u89C6 / \u6E38\u620F / \u821E\u8E48 / \u620F\u5267\u914D\u4E50\u7B49\u5185\u5BB9\u5728\u4F5C\u66F2\u5B66\u4F4D\u4E0B\u7684 Composition and Creative Music Technology \u65B9\u5411\u3002
- \u7533\u8BF7\u5165\u53E3\uFF1ABMus (Hons) Composition \u6216 MMus Composition
- \u65B9\u5F0F\uFF1A\u539F\u521B\u4F5C\u54C1\u96C6 + \u7EBF\u4E0A\u9762\u8BD5\u8BA8\u8BBA\u4F5C\u54C1
- \u4F5C\u54C1\u96C6\u7EC6\u5219\u77E5\u8BC6\u5E93\u672A\u6536\u5F55\uFF0C\u987B\u5411\u62DB\u751F\u529E\u786E\u8BA4`,
      en: "Music technology is taught within the Composition degrees (Composition and Creative Music Technology). Apply to BMus (Hons) Composition or MMus Composition with a portfolio of original work and an online interview.",
      enType: "summary",
      src: ["https://www.rwcmd.ac.uk/department/music/composition-and-creative-music-technology"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027/28 Entry",
      zh: `## \u7533\u8BF7\u7CFB\u7EDF
- UCAS Conservatoires\uFF08\u9662\u6821\u4EE3\u7801 R59\uFF09\uFF0C\u5E76\u987B\u6CE8\u518C Acceptd
## \u65F6\u95F4\u7EBF
- \u7533\u8BF7\u5F00\u653E\uFF1A2026 \u5E74 7 \u6708 9 \u65E5
- **\u7533\u8BF7\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 1 \u65E5**\uFF08\u7814\u7A76\u751F\u5E73\u7B49\u8003\u8651\u622A\u6B62\u53E6\u89C1 10 \u6708 2 \u65E5\uFF0C\u4EE5\u5B98\u7F51\u5F53\u671F\u4E3A\u51C6\uFF09
- \u73B0\u573A\u8003\u8BD5\u9884\u7EA6\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 5 \u65E5\uFF08Acceptd\uFF09
- \u4E2D\u56FD\u8003\u751F self-tape \u4E0A\u4F20\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 5 \u65E5
- \u5F55\u50CF\u8003\u8BD5\u63D0\u4EA4\u622A\u6B62\uFF1A2026 \u5E74 10 \u6708 19 \u65E5
- **\u4E2D\u56FD\u5927\u9646\u73B0\u573A\u8003\u8BD5\uFF1A\u4E0A\u6D77\u3001\u6210\u90FD\u3001\u5E7F\u5DDE\u3001\u5317\u4EAC\uFF0C10 \u6708 24 \u65E5\u201311 \u6708 6 \u65E5**
- \u5F00\u5B66\uFF1A2027 \u5E74 9 \u6708 19 \u65E5
## \u8D39\u7528
- UCAS \u7533\u8BF7\u8D39 \xA334.50\uFF1B\u8003\u8BD5\u8D39 \xA363\uFF08\u53EF\u7533\u8BF7\u51CF\u514D\uFF09`,
      en: `Apply through UCAS Conservatoires (R59) and register on Acceptd. Applications open 9 July 2026; deadline 1 October 2026; in-person audition booking by 5 October 2026; recorded auditions by 19 October 2026.
For all China-based applicants, we will be in Shanghai, Chengdu, Guangzhou and Beijing between Saturday 24th October and Friday 6th November 2026 to do in-person auditions (self-tape upload deadline Monday 5th October 2026).
Fees: UCAS \xA334.50; audition fee \xA363 (fee waiver policy available).`,
      enType: "summary",
      src: ["https://www.rwcmd.ac.uk/how-to-apply-music"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027/28 Tuition",
      zh: `- BMus \u56FD\u9645\u5B66\u751F\uFF1A\xA330,400 / \u5E74\uFF082026/27 \u4E3A \xA329,500\uFF09
- \u672C\u5730\u751F \xA39,790 / \u5E74\uFF08\u4F9B\u53C2\u8003\uFF09`,
      en: "BMus 2027/28: \xA330,400 per year for international students (2026/27: \xA329,500); home \xA39,790.",
      enType: "summary",
      src: ["https://www.rwcmd.ac.uk/fees-and-funding/tuition-fees-for-undergraduate-courses"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "rwcmd-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "2027/28 Tuition",
      zh: `\u56FD\u9645\u5B66\u751F\uFF1A
- **MMus \u5668\u4E50\u7C7B**\uFF08\u94A2\u7434\u3001\u5F26\u4E50\u3001\u94A2\u7434\u4F34\u594F\uFF09\uFF1A2 \u5E74\u5236 \xA331,300 / \u5E74\uFF1B13 \u4E2A\u6708\u5F3A\u5316 \xA335,200
- **MMus \u58F0\u4E50\u7C7B**\uFF08\u58F0\u4E50\u3001\u6B4C\u5267\uFF09\uFF1A2 \u5E74\u5236 \xA333,000 / \u5E74\uFF1B13 \u4E2A\u6708\u5F3A\u5316 \xA337,000
\u94A2\u7434\u4F34\u594F\u8D39\u7528\u8868\u672A\u5355\u5217\uFF0C\u6309\u5668\u4E50\u7C7B\u53C2\u8003\uFF0C\u4EE5\u5B98\u7F51\u786E\u8BA4\u3002`,
      en: "International 2027/28: MMus Instrumental \xA331,300 per year (2 years) or \xA335,200 (13-month intensive); MMus Vocal \xA333,000 per year (2 years) or \xA337,000 (intensive).",
      enType: "summary",
      src: ["https://www.rwcmd.ac.uk/fees-and-funding/tuition-fees-for-postgraduate-courses"],
      school: "rwcmd",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-academic",
      level: "UG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "BA (Hons) \xB7 3 years / 4 years with Foundation Year",
      zh: `- **3 \u5E74\u5236\uFF1A96 UCAS Tariff \u5206\uFF08\u76F8\u5F53\u4E8E A-Level CCC\uFF09**\uFF1B\u542B\u9884\u79D1\u5E74 4 \u5E74\u5236\uFF1A64 \u5206
- \u901A\u5E38\u542B A-Level \u97F3\u4E50\u6216\u97F3\u4E50\u76F8\u5173 BTEC Extended Diploma\uFF08\u53E4\u5178\u97F3\u4E50\u7B49\u4E13\u4E1A\uFF09
- \u81F3\u5C11 3 \u95E8 GCSE\uFF0C\u542B\u82F1\u8BED\u8BED\u8A00 C / 4 \u7EA7\u6216\u540C\u7B49\u56FD\u9645\u8D44\u683C\uFF08\u5982 IELTS 6.0\uFF09
- \u5165\u5B66\u6CE8\u518C\u6700\u540E\u4E00\u5929\u987B\u5E74\u6EE1 18 \u5468\u5C81
- \u6F14\u594F\u6C34\u5E73\uFF1A\u8868\u6F14\u7C7B\uFF08\u53E4\u5178 Performer \u7B49\uFF098 \u7EA7\uFF1B**Songwriting 6 \u7EA7**\uFF1B\u9884\u79D1\u5E74\u7533\u8BF7\u4EBA 6 \u7EA7
- \u5B66\u4F4D\u7531 University of Hull \u8BA4\u8BC1`,
      en: `We will review every application on an individual basis to assess academic eligibility which must be equivalent to 96 UCAS tariff points (UK A-Level CCC). (Foundation Year: 64 UCAS tariff points.)
96 UCAS tariff points from level 3 studies or equivalent, which normally include A Level Music or a BTEC Extended Diploma in a Music-related subject.
A minimum of three GCSEs including English Language at Grade C / Grade 4 or above or equivalent international qualification, eg IELTS 6.0 (5.5 in each component).
Please note that all applicants must be at least 18 years of age on the final day of enrolment.`,
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/entry-requirements/", "https://www.leedsconservatoire.ac.uk/courses/undergraduate-courses/ba-hons-classical-music/"],
      school: "leeds",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-academic",
      level: "PG",
      majors: ["*"],
      cat: "academic",
      order: 1,
      prog: "MA (1 year full-time)",
      zh: `- \u672C\u79D1\u5B66\u4F4D 2:2 \u6216\u4EE5\u4E0A\uFF0C\u4E13\u4E1A\u4E0D\u9650
- \u6216\u7ECF\u5148\u524D\u5B66\u4E60 / \u7ECF\u9A8C\u8BA4\u5B9A\uFF08APEL / APL\uFF09\u7684\u540C\u7B49\u4E13\u4E1A\u7ECF\u9A8C
- MA Popular Music \u5404\u65B9\u5411\u53E6\u4EA4\u4E66\u9762\u6750\u6599\uFF08\u89C1\u4F5C\u54C1\u96C6 / \u8003\u8BD5\u8981\u6C42\uFF09`,
      en: "An undergraduate degree at 2:2 or above in any subject, or equivalent professional experience recognised through APEL/APL.",
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/courses/postgraduate-study/entry-requirements/"],
      school: "leeds",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-english",
      level: "ALL",
      majors: ["*"],
      cat: "english",
      order: 2,
      prog: "UG & PG (same requirement)",
      zh: `\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u8981\u6C42\u76F8\u540C\uFF1A
- **IELTS Academic / UKVI \u603B\u5206 6.0\uFF0C\u5404\u5355\u9879\u4E0D\u4F4E\u4E8E 5.5**
- PTE Academic \u603B\u5206 60\uFF0C\u5404\u5355\u9879 59
- Cambridge C1 Advanced \u603B\u5206 169\uFF0C\u5404\u5355\u9879 162
- Trinity ISE II \u5404\u9879 Distinction\uFF1BISE III \u5404\u9879 Pass
- LanguageCert Academic \u603B\u5206 65\uFF0C\u5404\u5355\u9879 60
- New TOEFL\uFF1A\u5B98\u7F51\u5199\u603B\u5206 4.5\u3001\u5404\u5355\u9879 4.0\uFF08\u6570\u503C\u5B58\u7591\uFF0C\u5EFA\u8BAE\u6838\u5B9E\u5B98\u7F51\u539F\u8868\uFF09
- \u987B\u5728\u8BA4\u53EF\u8003\u70B9\u7EBF\u4E0B\u8003\u8BD5\uFF1B\u6210\u7EE9\u6709\u6548\u671F 2 \u5E74\uFF08C1 Advanced \u9664\u5916\uFF09`,
      en: `IELTS Academic/UKVI: Overall score of 6.0 with no sub-test below 5.5. Pearson PTE Academic/UKVI: Overall score of 60 with no sub-test below 59. Cambridge C1 Advanced: Overall score of 169 and no sub-test below 162. Trinity College London ISE II: Distinction in Listening, Speaking, Reading and Writing; ISE III: Pass in Listening, Speaking, Reading and Writing. LanguageCert Academic: 65 overall and no skill below 60. New TOEFL: Overall score of 4.5 and 4.0 for the subtests.
Tests must be taken in person at approved test centres.`,
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/courses/international-applicants/english-language-requirements/"],
      school: "leeds",
      country: "UK",
      ielts: [{
        p: "BA / MA",
        pen: "BA / MA",
        o: "6.0",
        m: "5.5"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-aud-classical",
      level: "UG",
      majors: ["piano", "violin", "viola", "cello", "doublebass"],
      cat: "audition",
      order: 3,
      prog: "BA (Hons) Classical Music \xB7 Performer",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/z02j4d2c/ba-classical-music-audition-guide-2026-1.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "live",
        zh: `- 30 \u5206\u949F\u70ED\u8EAB + 30 \u5206\u949F\u6B63\u5F0F\u8003\u8BD5
- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF0C8 \u7EA7\u6C34\u5E73\uFF08\u9884\u79D1\u5E74 6 \u7EA7\uFF09
- \u9664\u94A2\u7434\u3001\u5409\u4ED6\u3001\u6253\u51FB\u4E50\u5916\uFF0C\u81F3\u5C11\u4E00\u9996\u987B\u6709\u94A2\u7434\u4F34\u594F\uFF08\u73B0\u573A\u63D0\u4F9B\u4F34\u594F\uFF09
- **\u97F3\u9636 / \u6280\u672F\u7EC3\u4E60** + \u7B80\u77ED\u9762\u8BD5\uFF08\u97F3\u4E50\u77E5\u8BC6\u4E0E\u5174\u8DA3\uFF09`,
        en: "Perform two contrasting pieces that demonstrate your musical strengths. The pieces should be of grade 8 standard and contrasting in style. At least one of your chosen pieces should have piano accompaniment. (This does not apply to piano, guitar and percussion applicants.) Scales or technical exercises and a short interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: `- \u4E24\u9996\u5BF9\u6BD4\u66F2\u76EE\u5F55\u50CF\uFF0C\u53EA\u62A5\u66F2\u540D\u4E0E\u4F5C\u66F2\u5BB6
- \u4E50\u7406\u89C6\u9891\uFF1A\u6307\u51FA\u5E76\u8BB2\u89E3\u5176\u4E2D\u4E00\u9996\u66F2\u76EE\u7684\u4E09\u4E2A\u6709\u8DA3\u7279\u5F81
- \u9762\u8BD5\u89C6\u9891\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u64C5\u957F\u7684\u66F2\u76EE\u98CE\u683C\u4E0E\u65F6\u671F\u3001\u4F18\u52BF\u4E0E\u5F85\u63D0\u5347\u5904\u3001\u5BA4\u5185\u4E50\u7ECF\u5386\u3001\u559C\u6B22\u7684\u6F14\u594F\u5BB6
- \u73B0\u573A\u8003\u8BD5\u5468\u7ED3\u675F\u540E\uFF0812 \u6708\u4EE5\u540E\uFF09\u53EA\u63A5\u53D7\u7EBF\u4E0A\u63D0\u4EA4\uFF1B\u7EBF\u4E0A\u4E0D\u8003\u97F3\u9636`,
        en: "Video performances of two contrasting pieces (announce title and composer only). Identify and describe THREE interesting features of one of your audition pieces. Interview video: Why are you interested in studying at Leeds Conservatoire? What sort of repertoire do you like playing? What do you feel are your strengths as a player? Have you had any experience of chamber music? Do you have any favourite performers? After the live audition weeks only online submissions are accepted.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Online submission (Acceptd)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-aud-voice-classical",
      level: "UG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "BA (Hons) Classical Music \xB7 Vocalist",
      zh: "",
      en: "",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/z02j4d2c/ba-classical-music-audition-guide-2026-1.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "live",
        zh: `- 30 \u5206\u949F\u70ED\u8EAB + 30 \u5206\u949F\u6B63\u5F0F\u8003\u8BD5
- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF0C8 \u7EA7\u6C34\u5E73\uFF1B\u5EFA\u8BAE\u81F3\u5C11\u4E00\u9996\u6709\u94A2\u7434\u4F34\u594F\uFF08\u73B0\u573A\u63D0\u4F9B\uFF0C\u4E5F\u53EF\u81EA\u5E26\uFF09
- \u97F3\u9636 / \u6280\u672F\u7EC3\u4E60 + \u7B80\u77ED\u9762\u8BD5`,
        en: "Two contrasting pieces of Grade 8 standard, at least one with piano accompaniment (accompanist provided or bring your own); scales or technical exercises and a short interview.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: `- \u4E24\u9996\u66F2\u76EE\u6F14\u5531\u89C6\u9891
- **1\u20132 \u5206\u949F\u82F1\u8BED\u8BD7\u6B4C\u6216\u6563\u6587\u6717\u8BFB\u89C6\u9891**\uFF08\u4EC5\u7EBF\u4E0A\u8981\u6C42\uFF09
- \u4E50\u7406\u89C6\u9891\uFF1A\u8BB2\u89E3\u5176\u4E2D\u4E00\u9996\u66F2\u76EE\u7684\u4E09\u4E2A\u6709\u8DA3\u7279\u5F81
- \u9762\u8BD5\u89C6\u9891\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u64C5\u957F\u66F2\u76EE\u98CE\u683C\u3001\u58F0\u4E50\u4F18\u52BF\u4E0E\u5F85\u63D0\u5347\u5904\u3001\u5408\u5531 / \u91CD\u5531\u7ECF\u5386\u3001\u559C\u6B22\u7684\u6B4C\u5531\u5BB6`,
        en: "Video performances of TWO pieces that are contrasting in style. The pieces should be of Grade 8 standard. Video performance of you reading a short text in English (one to two minutes in length). Theory video on three features of one piece. Interview video questions on repertoire, strengths, choir/ensemble experience and favourite singers.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Online submission (Acceptd)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-aud-bavoice",
      level: "UG",
      majors: ["voice", "popvoice"],
      cat: "audition",
      order: 3,
      prog: "BA (Hons) Voice (Performance and Pedagogy)",
      zh: "\u58F0\u4E50\u8868\u6F14\u4E0E\u6559\u5B66\u6CD5\u672C\u79D1\uFF0C\u53EF\u81EA\u9009\u6D41\u884C\u3001\u53E4\u5178\u3001\u7235\u58EB\u3001\u6C11\u8C23\u6216\u97F3\u4E50\u5267\u65B9\u5411\uFF1B\u8D70 UCAS Undergraduate \u7533\u8BF7\u3002",
      en: "Voice performance and pedagogy degree in the genre of your choice; apply through UCAS Undergraduate.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/102fs4ak/ba-voice-2026-audition-guide.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u9996\u5C55\u793A\u58F0\u4E50\u7279\u8D28\u4E0E\u4E2A\u4EBA\u98CE\u683C\u7684\u66F2\u76EE\uFF1B\u53EF\u539F\u521B\u6216\u7FFB\u5531\uFF0C\u7FFB\u5531\u5E94\u6709\u4E2A\u4EBA\u8BE0\u91CA\uFF1B\u82E5\u5168\u4E3A\u7FFB\u5531\uFF0C\u81F3\u5C11\u4E00\u9996\u987B\u662F\u4E0E\u539F\u7248\u4E0D\u540C\u7684\u4E2A\u4EBA\u6539\u7F16
- \u4F34\u594F\u4E0D\u9650\uFF1A\u81EA\u5F39\u3001\u65E0\u4F34\u594F\u6216\u4F34\u594F\u5E26`,
        en: "Two pieces you have selected to demonstrate your vocal strengths and identity. You may play original pieces or covers but covers should ideally be interpretative and not identical copies. If you perform solely covers at least one of the pieces should be your own creative version that differs from the original version. You may accompany yourself, play unaccompanied or use a backing track.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- 1 \u6BB5\u97F3\u9891 + 1 \u6BB5\u89C6\u9891\uFF0C\u6216 2 \u6BB5\u89C6\u9891
- \u9762\u8BD5\u89C6\u9891\u56DE\u7B54 4 \u9898\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u6F14\u5531\u7ECF\u5386\u3001\u5F71\u54CD\u4F60\u7684\u6B4C\u624B\u3001\u804C\u4E1A\u76EE\u6807`,
        en: "a) 1 audio recording and 1 video performance; or, b) 2 video performances. Interview video: Why do you want to study BA (Hons) Voice at Leeds Conservatoire? Please tell us about your experience as a singer. Who influences you as a singer and why? What are your career aspirations?",
        enType: "original",
        t: "\u7EBF\u4E0A\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Online submission (Acceptd)"
      }, {
        k: "live",
        zh: `- 30 \u5206\u949F\u70ED\u8EAB + 30 \u5206\u949F\u6B63\u5F0F\u8003\u8BD5
- \u4E24\u9996\u81EA\u9009\u66F2\u76EE + \u9762\u8BD5\uFF1B\u73B0\u573A\u6709\u94A2\u7434\u3001PA \u4E0E\u9EA6\u514B\u98CE\u3001CD \u64AD\u653E\u5668`,
        en: "30 minutes warm-up and a 30-minute audition: two pieces and a panel interview; piano, PA with microphones and CD player available.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-port-repetiteur",
      level: "UG",
      majors: ["collab"],
      cat: "portfolio",
      order: 4,
      prog: "BA (Hons) Classical Music \xB7 Repetiteur / Piano Accompaniment",
      zh: "Repetiteur \u6307\u6B4C\u5267\u6216\u82AD\u857E\u821E\u56E2\u7684\u4E13\u4E1A\u94A2\u7434\u4F34\u594F\uFF0C\u8D1F\u8D23\u6392\u7EC3\u4F34\u594F\u4E0E\u58F0\u4E50\u6307\u5BFC\u3002",
      en: "A Repetiteur is a specialised piano accompanist for an opera or ballet company.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/z02j4d2c/ba-classical-music-audition-guide-2026-1.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "rec",
        zh: `- \u4F5C\u54C1\u96C6\uFF1A\u4E24\u5230\u4E09\u4EFD\u4E50\u8C31\uFF08PDF\uFF0C\u6BCF\u9996\u5355\u72EC\u4E00\u4EFD\uFF09+ \u5C55\u793A\u4F34\u594F\u80FD\u529B\u7684\u89C6\u9891\uFF08\u6392\u7EC3\u6216\u97F3\u4E50\u4F1A\u5B9E\u51B5\u5747\u53EF\uFF09
- \u4E50\u7406\u89C6\u9891\uFF1A\u8BB2\u89E3\u5176\u4E2D\u4E00\u4EFD\u4E50\u8C31\u7684\u4E09\u4E2A\u6709\u8DA3\u7279\u5F81
- \u9762\u8BD5\u89C6\u9891\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u6B23\u8D4F\u7684\u827A\u672F\u6307\u5BFC\u53CA\u5176\u5F71\u54CD\u3001\u4F5C\u4E3A\u4F34\u594F\u7684\u4F18\u52BF\u4E0E\u5F85\u63D0\u5347\u5904\u3001\u5176\u4ED6\u91CD\u8981\u97F3\u4E50\u7ECF\u5386\uFF08\u662F\u5426\u4E5F\u505A\u72EC\u594F\uFF09`,
        en: "Submit a portfolio of two or three scores (in PDF format) and video recordings that demonstrate your accompaniment skills, a theory video on three features of one score, and an interview video (repetiteurs you admire, your strengths, other musical experience, whether you also perform as a solo pianist).",
        enType: "summary",
        t: "\u4EC5\u7EBF\u4E0A\u4F5C\u54C1\u96C6\uFF08\u4E0D\u8BBE\u73B0\u573A\u8003\u8BD5\uFF09",
        ten: "Online portfolio only (no in-person audition)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-aud-classical",
      level: "PG",
      majors: ["piano", "voice", "violin", "viola", "cello", "doublebass"],
      cat: "audition",
      order: 3,
      prog: "MA Music (Classical) \xB7 Performer",
      zh: "\u58F0\u4E50\u7533\u8BF7\u4EBA\u9002\u7528\u76F8\u540C\u6846\u67B6\uFF0C\u66F2\u76EE\u4E3A\u58F0\u4E50\u4F5C\u54C1\u3002\u6CE8\u610F\uFF1A**\u89C6\u594F\u53EA\u5728\u73B0\u573A\u8003\u8BD5\u4E2D\u51FA\u73B0**\u3002",
      en: "Vocalists follow the same framework with vocal repertoire. Sight-reading appears only in the live audition.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/0qykrnmz/ma-music-classical-audition-guide-2026.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u4E24\u9996\u98CE\u683C\u5BF9\u6BD4\u7684\u66F2\u76EE\uFF0C\u81F3\u5C11 8 \u7EA7\u6C34\u5E73\uFF0C\u5C55\u793A\u6280\u672F\u4E0E\u8868\u73B0\u529B\uFF1B\u94A2\u7434\u65E0\u987B\u94A2\u7434\u4F34\u594F",
        en: "The pieces should be at least grade 8 standard and contrasting in style \u2013 aim to show us what you can do technically and expressively.",
        enType: "original"
      }, {
        k: "rec",
        zh: `- 4 \u4E2A\u80CC\u666F\u95EE\u9898\u89C6\u9891\u95EE\u7B54 + \u4E24\u9996\u66F2\u76EE\u6F14\u594F\u5F55\u50CF
- \u4E50\u7406\u89C6\u9891\uFF1A\u8BB2\u89E3\u5176\u4E2D\u4E00\u9996\u66F2\u76EE\u7684\u4E09\u4E2A\u6709\u8DA3\u7279\u5F81`,
        en: "Videos answering four background questions, recordings of TWO contrasting pieces, and a theory video on three features of one piece.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u4F5C\u54C1\u96C6",
        ten: "Online portfolio"
      }, {
        k: "online",
        zh: "- \u53EF\u80FD\u8FFD\u52A0 Zoom \u9762\u8BD5\uFF08\u5BF9\u53E4\u5178\u97F3\u4E50\u7684\u5174\u8DA3\u3001\u7ECF\u9A8C\u4E0E\u77E5\u8BC6\uFF09",
        en: "A Zoom interview about your interest, experience and knowledge of classical music may follow.",
        enType: "summary",
        t: "Zoom \u9762\u8BD5\uFF08\u53EF\u80FD\u5B89\u6392\uFF09",
        ten: "Zoom interview (if requested)"
      }, {
        k: "live",
        zh: "- 30 \u5206\u949F\uFF1A\u70ED\u8EAB\u540E**\u89C6\u594F** + \u97F3\u9636 / \u6280\u672F\u7EC3\u4E60 + \u7B80\u77ED\u9762\u8C08",
        en: "30 minutes: sight-reading, scales/technical work and a short discussion after warm-up.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u89C6\u540D\u989D\u800C\u5B9A\uFF09",
        ten: "Live audition (subject to availability)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-aud-popular",
      level: "UG",
      majors: ["popvoice", "popinst"],
      cat: "audition",
      order: 3,
      prog: "BA (Hons) Popular Music \xB7 UCAS W302",
      zh: "\u8D70 UCAS Undergraduate \u7533\u8BF7\uFF08\u5B66\u9662\u4EE3\u7801 L30\uFF09\u3002",
      en: "Apply through UCAS Undergraduate (institution code L30).",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/4yaj0g45/ba-popular-2026-audition-guide.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u4E24\u9996\u5C55\u793A\u97F3\u4E50\u7279\u8D28\u4E0E\u4E2A\u4EBA\u98CE\u683C\u7684\u66F2\u76EE\uFF1B\u539F\u521B\u6216\u6709\u4E2A\u4EBA\u8BE0\u91CA\u7684\u7FFB\u5531\u5747\u53EF
- \u53EF\u81EA\u5F39\u81EA\u5531\u3001\u65E0\u4F34\u594F\u6216\u7528\u4F34\u594F\u5E26\uFF1B\u4E0D\u53EF\u5E26\u4E50\u961F\u6210\u5458\u6216\u4F34\u594F\u8005
- **\u9F13\u624B**\uFF1A\u4E00\u9996\u51C6\u5907\u597D\u7684\u66F2\u76EE\u914D play-along \u97F3\u8F68\uFF0C\u5E76\u6309\u8003\u5B98\u8981\u6C42\u5373\u5174\u6F14\u594F\u5E38\u89C1\u8282\u594F\u578B\u4E0E\u52A0\u82B1
- \u4E50\u7406\uFF1A\u53E3\u5934\u5206\u6790\u5176\u4E2D\u4E00\u9996\u66F2\u76EE\uFF08\u4E0D\u8D85\u8FC7 5 \u5206\u949F\uFF09\uFF0C\u8986\u76D6\u81F3\u5C11\u4E09\u9879\u8981\u7D20\uFF1B\u65E0\u89C6\u594F`,
        en: "You will be asked to play two pieces you have selected to demonstrate your musical strengths and identity. (Drummers) You will be required to perform one prepared piece with a play-along track, and be prepared to improvise various common beats and fills as instructed. Please perform a brief spoken analysis of one of your audition pieces (no longer than five minutes).",
        enType: "summary"
      }, {
        k: "rec",
        zh: `- 1 \u6BB5\u97F3\u9891 + 1 \u6BB5\u89C6\u9891\uFF0C\u6216 2 \u6BB5\u89C6\u9891
- \u9762\u8BD5\u89C6\u9891\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u5F71\u54CD\u4F60\u7684\u97F3\u4E50\u4EBA\u3001\u6700\u8FD1\u5728\u542C\u7684\u97F3\u4E50\u3001\u6F14\u51FA\u7ECF\u5386\u3001\u5F53\u4EE3\u6D41\u884C\u97F3\u4E50\u4EBA\u9762\u4E34\u7684\u6311\u6218`,
        en: "Submit 1 audio and 1 video, or 2 videos. Interview video: Why do you want to study at Leeds Conservatoire? Who influences you as a popular musician and why? What music are you currently listening to and why? Please tell us about your performance experience. What challenges do popular musicians face today?",
        enType: "summary",
        t: "\u7EBF\u4E0A\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Online submission (Acceptd)"
      }, {
        k: "live",
        zh: `- 30 \u5206\u949F\u70ED\u8EAB + 30 \u5206\u949F\u6B63\u5F0F\u8003\u8BD5
- \u73B0\u573A\u6709\u94A2\u7434\u3001\u97F3\u7BB1\u3001\u9F13\u7EC4\u3001PA \u4E0E\u9EA6\u514B\u98CE\uFF0C\u53EF\u7528 mini jack \u64AD\u653E\u4F34\u594F\u5E26`,
        en: "Your audition will consist of 30 minutes warm up time with your instrument followed by a 30-minute individual audition. Piano, amps, drum kit, PA and mics are provided; backing tracks via mini jack.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-port-songwriting",
      level: "UG",
      majors: ["songwriting"],
      cat: "portfolio",
      order: 4,
      prog: "BA (Hons) Songwriting",
      zh: "\u8D70 UCAS Undergraduate \u7533\u8BF7\uFF1B\u6F14\u594F\u6C34\u5E73\u8981\u6C42 6 \u7EA7\u3002\u6240\u6709\u6B4C\u66F2\u987B\u6709\u4EBA\u58F0\uFF0C\u6B4C\u8BCD\u987B\u4E3A\u82F1\u6587\u521B\u4F5C\u5E76\u6F14\u5531\u3002",
      en: "Apply through UCAS Undergraduate; Grade 6 performance standard. All songs need vocals and lyrics written and performed in English.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/p4ap2fxi/ba-songwriting-2026-audition-guide-1.pdf", "https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/entry-requirements/"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "live",
        zh: `- \u51C6\u5907\u4E09\u9996\u539F\u521B\u6B4C\u66F2\uFF0C**\u81F3\u5C11\u4E00\u9996\u73B0\u573A\u6F14\u5531 / \u6F14\u594F**\uFF0C\u5176\u4F59\u53EF\u73B0\u573A\u6216\u64AD\u653E\u5F55\u97F3
- \u8BA8\u8BBA\uFF1A\u521B\u4F5C\u5F71\u54CD\u4E0E\u65B9\u6CD5\u3001\u5BF9\u4F5C\u54C1\u7684\u6280\u672F\u5206\u6790\u3001\u4E50\u7406\u6982\u5FF5\uFF08\u8C03\u6027\u3001\u548C\u5F26\u8FDB\u884C\u3001\u6B4C\u66F2\u7ED3\u6784\uFF09\u3001\u804C\u4E1A\u76EE\u6807`,
        en: "Prepare three original songs in total for the audition. At least one of these should be played live in the audition to demonstrate your ability to play and/or sing. Discussion of influences, technical analysis, theory (keys, chord progressions, song structure) and career goals.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5",
        ten: "Live audition"
      }, {
        k: "rec",
        zh: `- \u4E09\u9996\u5B8C\u5168\u7531\u672C\u4EBA\u521B\u4F5C\u7684\u6B4C\u66F2\uFF1B**\u81F3\u5C11\u4E00\u9996\u4E3A\u89C6\u9891**\uFF08\u6700\u957F 10 \u5206\u949F\uFF09\uFF0C\u5176\u4F59\u4E3A\u97F3\u9891 + \u6B4C\u8BCD\u5355
- \u9762\u8BD5\u89C6\u9891\uFF08\u6700\u957F 10 \u5206\u949F\uFF09\uFF1A\u62A5\u8003\u539F\u56E0\u3001\u521B\u4F5C\u5F71\u54CD\u3001\u6700\u8FD1\u5728\u542C\u7684\u97F3\u4E50\u3001\u6F14\u51FA\u7ECF\u5386\u3001\u5F55\u97F3\u6280\u672F\u7ECF\u9A8C\u3001\u5206\u6790\u4E00\u9996\u4F5C\u54C1\u3001\u8BCD\u66F2\u4F5C\u8005\u9762\u4E34\u7684\u95EE\u9898\u3001\u4F60\u80FD\u5E26\u6765\u4EC0\u4E48\u3001\u6BD5\u4E1A\u540E\u8BA1\u5212`,
        en: "Submit recordings of three full songs that you have written entirely by yourself, at least one as a video (max 10 minutes), the others as audio with lyric sheets. Interview video (max 10 minutes) answering the set prompts.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u63D0\u4EA4\uFF08Acceptd\uFF09",
        ten: "Online submission (Acceptd)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-port-production",
      level: "UG",
      majors: ["production", "musictech"],
      cat: "portfolio",
      order: 4,
      prog: "BA (Hons) Music Production (W301) / Electronic Music Production (W331)",
      zh: "\u8D70 UCAS Undergraduate \u7533\u8BF7\uFF1B\u540C\u65F6\u7533\u8BF7 Music Production \u4E0E Electronic Music Production \u53EA\u9700\u9762\u8BD5\u4E00\u6B21\u3002",
      en: "Apply through UCAS Undergraduate; one interview covers both Music Production and Electronic Music Production.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/jsrlqzx2/ba-productionemp-audition-guide-2026.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "online",
        zh: `- \u65E0\u9700\u63D0\u524D\u63D0\u4EA4\u4F5C\u54C1\uFF0C\u9762\u8BD5\u65F6\u51C6\u5907\u6700\u591A\u4E24\u6BB5\u5236\u4F5C\u4F5C\u54C1 / \u5F55\u97F3\u5C55\u793A\u8BA8\u8BBA
- \u9762\u8BD5\u95EE\u9898\uFF1A\u8FC7\u53BB 12 \u4E2A\u6708\u7684\u5236\u4F5C\u7ECF\u9A8C\uFF1B\u6700\u719F\u6089\u7684 DAW \u53CA\u719F\u7EC3\u7A0B\u5EA6\uFF1B\u5F55\u97F3\u68DA / \u5236\u4F5C\u7ECF\u9A8C\u4E0E\u6240\u7528\u8BBE\u5907\uFF08\u7535\u5B50\u97F3\u4E50\u5236\u4F5C\u95EE\u5236\u4F5C\u4EBA / DJ \u7ECF\u9A8C\uFF09\uFF1B\u4E50\u5668\u6216\u5236\u4F5C\u7C7B\u73B0\u573A\u8868\u6F14\u7ECF\u5386\uFF1B\u6B23\u8D4F\u6216\u5F71\u54CD\u4F60\u7684\u5236\u4F5C\u4EBA
- \u9762\u8BD5\u540E\u53EF\u80FD\u8981\u6C42\u8865\u5145\u6750\u6599`,
        en: "Please be prepared to share up to two tracks or recordings that showcase your music production skills and experience so far. Interview: Can you provide details about your Music Production experience over the past 12 months? What DAW software are you most familiar with? How much studio/recording experience have you had as a producer? What experience, if any, do you have playing an instrument/music? Please can you tell us about a producer's work that you admire?",
        enType: "summary",
        t: "\u7EBF\u4E0A\u9762\u8BD5\uFF08Acceptd\uFF0C\u65E0\u73B0\u573A\u8003\u8BD5\uFF09",
        ten: "Online interview (Acceptd; no live audition)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-aud-popmusic",
      level: "PG",
      majors: ["popvoice", "popinst"],
      cat: "audition",
      order: 3,
      prog: "MA Popular Music (Performer) \xB7 UCAS 807F",
      zh: "\u4EE5\u4E0B\u4F9D\u636E 2025 \u5165\u5B66\u7248\u6307\u5357\uFF0C\u7528\u524D\u6838\u5BF9\u6700\u65B0\u7248\u672C\u3002",
      en: "Based on the 2025-entry guide; check the latest version.",
      enType: "original",
      src: ["https://www.leedsconservatoire.ac.uk/media/tkzfxzwy/ma-popular-music-2025-audition-requirements-1.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "all",
        zh: `- \u5B66\u4E60\u65B9\u5411\u9648\u8FF0\uFF08Intended Direction of Study\uFF09\uFF0C\u6700\u591A 500 \u5B57
- \u5B66\u672F\u5199\u4F5C\u6837\u672C\uFF0C1,000\u20132,000 \u5B57`,
        en: "A written submission outlining your intended direction of study on the course (max 500 words) and a 1000-2000 word sample of your academic writing.",
        enType: "original",
        t: "\u4E66\u9762\u6750\u6599\uFF08\u5404\u65B9\u5411\u901A\u7528\uFF09",
        ten: "Written materials (all variants)"
      }, {
        k: "pre",
        zh: `- \u4E09\u9996\u66F2\u76EE\uFF0C\u7EA6 10\u201312 \u5206\u949F\uFF1B\u7FFB\u5531\u53EF\uFF0C\u53EF\u7528\u4F34\u594F\u5E26
- 1 \u6BB5\u97F3\u9891 + 2 \u6BB5\u89C6\u9891\uFF0C\u6216 3 \u6BB5\u89C6\u9891`,
        en: "Please prepare THREE pieces (c.10-12 minutes) you have selected to demonstrate your musical strengths and identity: 1 audio and 2 videos, or 3 videos. Covers and backing tracks are acceptable.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u7EBF\u4E0A\u63D0\u4EA4\uFF08\u5FC5\u4EA4\uFF09",
        ten: "Round 1 \xB7 Online submission (required)"
      }, {
        k: "online",
        zh: "- \u7EAF\u7EBF\u4E0A\u7533\u8BF7\uFF1A\u63D0\u4EA4\u4E0D\u8D85\u8FC7 15 \u5206\u949F\u7684\u81EA\u6211\u4ECB\u7ECD\u89C6\u9891\uFF08\u52A8\u673A\u3001\u4ECE\u4E1A\u9879\u76EE\u3001\u97F3\u4E50\u5F71\u54CD\u3001\u7814\u7A76\u4E0E\u53CD\u601D\u5982\u4F55\u5F71\u54CD\u521B\u4F5C\uFF09",
        en: "Online-only applicants submit a video of up to 15 minutes answering the interview questions (motivation, practice, influences, research and reflective practice).",
        enType: "summary",
        t: "\u7EBF\u4E0A\u9762\u8BD5\u89C6\u9891\uFF08\u7EAF\u7EBF\u4E0A\u8DEF\u5F84\uFF09",
        ten: "Interview video (online route)"
      }, {
        k: "live",
        zh: `- \u4E09\u9996\u5168\u90E8\u73B0\u573A\u6F14\u51FA\uFF1B\u53EF\u7528\u4F34\u594F\u5E26\uFF0C\u4E0D\u53EF\u5E26\u4E50\u961F\u6216\u4F34\u594F\u8005\uFF1B\u73B0\u573A\u6709\u94A2\u7434\u3001\u97F3\u7BB1\u3001\u9F13\u7EC4\u3001\u9EA6\u514B\u98CE
- \u8003\u8BD5\u540E\u9762\u5BF9\u9762\u9762\u8BD5\uFF1B\u4E0A\u4E00\u5468\u671F\u73B0\u573A\u8003\u8BD5\u5B89\u6392\u5728 2\u30014\u30016 \u6708`,
        en: "All three pieces performed live (backing tracks allowed, no band or accompanist), followed by a face-to-face interview. Previous cycle live auditions ran in February, April and June.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u53EF\u9009\uFF09",
        ten: "Live audition (optional)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-port-songwriting",
      level: "PG",
      majors: ["songwriting"],
      cat: "portfolio",
      order: 4,
      prog: "MA Popular Music (Songwriter 808F / Writer Performer 809F / Writer Producer 810F)",
      zh: "\u4EE5\u4E0B\u4F9D\u636E 2025 \u5165\u5B66\u7248\u6307\u5357\u3002",
      en: "Based on the 2025-entry guide.",
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/media/tkzfxzwy/ma-popular-music-2025-audition-requirements-1.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "all",
        zh: "- \u5B66\u4E60\u65B9\u5411\u9648\u8FF0\uFF08\u2264500 \u5B57\uFF09+ \u5B66\u672F\u5199\u4F5C\u6837\u672C\uFF081,000\u20132,000 \u5B57\uFF09",
        en: "Intended direction of study (max 500 words) and a 1000-2000 word academic writing sample.",
        enType: "summary",
        t: "\u4E66\u9762\u6750\u6599\uFF08\u5404\u65B9\u5411\u901A\u7528\uFF09",
        ten: "Written materials (all variants)"
      }, {
        k: "pre",
        zh: `- **Songwriter**\uFF1A\u4E09\u9996\u5B8C\u5168\u7531\u672C\u4EBA\u521B\u4F5C\u7684\u6B4C\u66F2\uFF08\u7EA6 10\u201312 \u5206\u949F\uFF09\uFF0C\u4EA4\u97F3\u9891\uFF08.mp3 / .wav\uFF09+ \u6B4C\u8BCD\u5355\uFF0C\u6B4C\u8BCD\u82F1\u6587\u521B\u4F5C\u5E76\u6F14\u5531\uFF0C\u65E0\u9700\u4E50\u8C31
- **Writer Performer**\uFF1A\u4E09\u9996\u539F\u521B\u987B\u7531\u672C\u4EBA\u6F14\u5531 / \u6F14\u594F\uFF1B1 \u97F3\u9891 + 2 \u89C6\u9891\u6216 3 \u89C6\u9891
- **Writer Producer**\uFF1A\u4E09\u9996\u81EA\u5DF1\u521B\u4F5C\u5E76\u5236\u4F5C\u7684\u6B4C\u66F2\uFF1B\u97F3\u9891 + \u6B4C\u8BCD\u5355\uFF0C\u53EF\u9080\u8BF7\u4ED6\u4EBA\u53C2\u4E0E\u5F55\u97F3`,
        en: "Songwriter: THREE songs (c.10-12 minutes) you have written entirely by yourself, as audio with lyric sheets (in English). Writer Performer: three original songs performed by you (1 audio + 2 videos or 3 videos). Writer Producer: three songs written and produced by you, as audio with lyric sheets.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u7EBF\u4E0A\u63D0\u4EA4",
        ten: "Round 1 \xB7 Online submission"
      }, {
        k: "live",
        zh: `- Songwriter\uFF1A\u53EF\u73B0\u573A\u6F14\u5531\u548C / \u6216\u64AD\u653E\u5F55\u97F3\uFF0C\u53EF\u7528\u4F34\u594F\u5E26\uFF0C\u4E0D\u53EF\u5E26\u4F34\u594F\u8005 / \u4E50\u961F
- Writer Performer\uFF1A\u81F3\u5C11\u4E24\u9996\u73B0\u573A\u6F14\u5531\uFF0C\u7B2C\u4E09\u9996\u53EF\u73B0\u573A\u6216\u9884\u5F55\uFF1B\u4EC5\u72EC\u5531
- Writer Producer\uFF1A\u81EA\u5E26\u9884\u5F55\u97F3\u9891\uFF08\u624B\u673A / \u7535\u8111\u64AD\u653E\uFF09`,
        en: "Songwriter: perform live and/or play recordings (no band). Writer Performer: at least two songs live, solo only. Writer Producer: bring pre-recorded audio.",
        enType: "summary",
        t: "\u73B0\u573A\u8003\u8BD5\uFF08\u53EF\u9009\uFF09",
        ten: "Live audition (optional)"
      }, {
        k: ["live", "online"],
        zh: "- \u7EBF\u4E0A\u89C6\u9891\uFF08\u226415 \u5206\u949F\uFF09\u6216\u73B0\u573A\u9762\u8C08\uFF1A\u52A8\u673A\u3001\u4ECE\u4E1A\u7ECF\u5386\u3001\u5F71\u54CD\u3001\u53CD\u601D\u5B9E\u8DF5",
        en: "Interview by video (max 15 minutes) or in person: motivation, experience, influences and reflective practice.",
        enType: "summary",
        t: "\u9762\u8BD5\uFF08\u7EBF\u4E0A\u89C6\u9891\u6216\u73B0\u573A\uFF09",
        ten: "Interview (video or in person)"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-port-production",
      level: "PG",
      majors: ["production", "musictech"],
      cat: "portfolio",
      order: 4,
      prog: "MA Music Production",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/media/gctpr0oz/ma-music-production-audition-guide-2026.pdf"],
      school: "leeds",
      country: "UK",
      stages: [{
        k: "online",
        zh: `- \u51C6\u5907\u6700\u591A\u4E09\u6BB5\u5236\u4F5C\u4F5C\u54C1 / \u5F55\u97F3\uFF0C\u5728\u9762\u8BD5\u4E2D\u8BA8\u8BBA\u521B\u4F5C\u4E0E\u6280\u672F\u601D\u8DEF
- \u9762\u8BD5\u95EE\u9898\uFF1A\u8FD1 24 \u4E2A\u6708\u7684\u5236\u4F5C\u7ECF\u9A8C\u3001\u4E2A\u4EBA\u5236\u4F5C\u98CE\u683C\u3001\u4F5C\u4E3A\u5236\u4F5C\u4EBA\u7684\u4F18\u52A3\u52BF\u3001\u76F8\u5173\u97F3\u4E50\u7ECF\u5386\u3001\u62DF\u5B9A\u5B66\u4E60\u65B9\u5411\u53CA\u5982\u4F55\u652F\u6301\u804C\u4E1A\u53D1\u5C55`,
        en: "Prepare up to three tracks or recordings to discuss at an online interview covering production experience over the last 24 months, your production style, strengths and weaknesses as a producer, related musical experience, and your intended direction of study and career plans.",
        enType: "summary",
        t: "\u7EBF\u4E0A\u9762\u8BD5",
        ten: "Online interview"
      }],
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-process",
      level: "ALL",
      majors: ["*"],
      cat: "process",
      order: 5,
      prog: "2027 Entry",
      zh: `## \u4E24\u5957\u7533\u8BF7\u7CFB\u7EDF
- **UCAS Conservatoires**\uFF1ABA Classical Music\u3001BA Jazz \u53CA\u5168\u90E8 MA\uFF08MA \u4E5F\u53EF\u5B98\u7F51\u76F4\u7533\uFF09\uFF1B\u5B66\u9662\u4EE3\u7801 L31
- **UCAS Undergraduate**\uFF1APopular Music\u3001Songwriting\u3001Music Production\u3001Electronic Music Production\u3001Voice\u3001Film TV & Games \u7B49\u5176\u4F59\u672C\u79D1\uFF1B\u5B66\u9662\u4EE3\u7801 L30
## \u622A\u6B62\u65E5\u671F
- \u5B98\u7F51\u672A\u516C\u5E03 2027/28 \u786E\u5207\u622A\u6B62\u65E5\uFF0C\u4EE5 UCAS \u5F53\u5B63\u65E5\u5386\u4E3A\u51C6\uFF08Conservatoires \u901A\u5E38\u65E9\u4E8E Undergraduate \u4E3B\u8F6E\uFF09
- \u53C2\u8003\u4E0A\u4E00\u5468\u671F\uFF1A\u672C\u79D1\u73B0\u573A\u8003\u8BD5\u5468\u4E3A 10 \u6708\u4E0B\u65EC\u4E0E 12 \u6708\u521D\uFF1BMA Popular Music \u73B0\u573A\u8003\u8BD5 2\u30014\u30016 \u6708
## \u8D39\u7528
- **\u6240\u6709\u672C\u79D1\u4E0E\u7814\u7A76\u751F\u8003\u8BD5 / \u9762\u8BD5\u514D\u8D39**
- \u89C6\u9891\u63D0\u4EA4\u5E73\u53F0\uFF1AAcceptd`,
      en: `UCAS Conservatoires: BA Classical Music, BA Jazz and all MA programmes (MA also by direct application). UCAS Undergraduate: all other undergraduate courses, including Popular Music, Songwriting, Music Production, Electronic Music Production and Voice.
Exact 2027/28 deadlines are not published on the website; follow the UCAS calendar.
Leeds Conservatoire does not charge audition fees for any Undergraduate or Postgraduate course. Recordings are submitted via Acceptd.`,
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/how-to-apply/", "https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/audition-information/"],
      school: "leeds",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-ug-fees",
      level: "UG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "Tuition",
      zh: `- BA (Hons) \u56FD\u9645\u5B66\u751F\uFF1A**2027 \u5165\u5B66 \xA321,700 / \u5E74**\uFF082026 \u5165\u5B66 \xA320,900\uFF09
- \u9884\u79D1\u5E74\uFF08Year 0\uFF09\u56FD\u9645\u5B66\u751F\uFF1A2027 \u5165\u5B66 \xA316,850
- \u56FD\u9645\u5B66\u8D39\u5728\u8BFB\u671F\u95F4\u9501\u5B9A\uFF08\u540C\u4E00\u8BFE\u7A0B\uFF09`,
      en: "BA (Hons) international: \xA321,700 per year for 2027 entry (2026 entry \xA320,900); Foundation Year \xA316,850. International fees are fixed for the duration of the course.",
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/courses/international-applicants/fees-funding/tuition-fees-scholarships/"],
      school: "leeds",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "leeds-pg-fees",
      level: "PG",
      majors: ["*"],
      cat: "fees",
      order: 6,
      prog: "Tuition",
      zh: `- \u5404 MA \u65B9\u5411\u56FD\u9645\u5B66\u751F\uFF1A**2027 \u5165\u5B66 \xA321,400**\uFF081 \u5E74\u5236\uFF1B2026 \u5165\u5B66 \xA320,600\uFF09
- 2027 \u5165\u5B66\u82F1\u56FD\u672C\u5730\u751F\u5B66\u8D39\u5C1A\u672A\u6700\u7EC8\u786E\u5B9A`,
      en: "MA (all pathways) international: \xA321,400 for 2027 entry (2026 entry \xA320,600). 2027 home fees not yet finalised.",
      enType: "summary",
      src: ["https://www.leedsconservatoire.ac.uk/courses/apply-audition-fees/fees-funding/postgraduate-tuition-fees/"],
      school: "leeds",
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }, {
      id: "ram-pg-aud-opera",
      school: "ram",
      level: "PG",
      majors: ["voice"],
      cat: "audition",
      order: 3,
      prog: "Advanced Opera Diploma",
      zh: "",
      en: "",
      enType: "summary",
      src: ["https://www.ram.ac.uk/study/departments/opera/audition-requirements"],
      stages: [{
        k: "all",
        zh: `- \u51C6\u5907\u56DB\u9996\u98CE\u683C\u5BF9\u6BD4\u3001\u8BED\u79CD\u5404\u5F02\u7684\u6B4C\u5267\u548F\u53F9\u8C03\uFF0C\u81F3\u5C11\u4E00\u9996\u7528\u82F1\u8BED\u6216\u82F1\u8BD1\u6F14\u5531
- \u65E0\u9700\u63D0\u4EA4\u4E66\u9762\u4F5C\u4E1A`,
        en: "You should prepare four contrasting operatic arias in a variety of languages, one of which must be sung in English or English translation. You are not required to submit written work for this course.",
        enType: "original"
      }, {
        k: "pre",
        zh: `- \u53EA\u5F55\u5176\u4E2D**\u4E24\u9996**\u4E0D\u540C\u8BED\u79CD\u7684\u5BF9\u6BD4\u548F\u53F9\u8C03
- \u9644\u5168\u90E8\u56DB\u9996\u66F2\u76EE\u6E05\u5355\u3001CV\u3001\u82F1\u8BED\u53E3\u8BED\u81EA\u6211\u4ECB\u7ECD\uFF1B\u4E0D\u5FC5\u4E00\u955C\u5230\u5E95\uFF0C\u4F46\u987B\u540C\u4E00\u5F55\u5236\u573A\u6B21
- UCAS \u622A\u6B62 2026 \u5E74 10 \u6708 2 \u65E5\uFF1BAcceptd \u6750\u6599\u622A\u6B62 10 \u6708 25 \u65E5\u4E2D\u5348
- \u89C6\u9891\u7533\u8BF7\u8005\u5148\u7ECF\u5F55\u50CF\u7B5B\u9009\uFF0C\u5165\u9009\u8005\u53D7\u9080\u53C2\u52A0\u590D\u8BD5`,
        en: "Prescreening video: Two contrasting operatic arias in different languages, plus the list of all four arias you have prepared, a CV and a spoken English introduction. UCAS deadline 2 October 2026; Acceptd materials by 25 October 2026, noon. Video applicants who pass are invited to the recall.",
        enType: "summary",
        t: "\u7B2C\u4E00\u8F6E \xB7 \u9884\u5BA1\u5F55\u50CF",
        ten: "Round 1 \xB7 Pre-screening video"
      }, {
        k: "live",
        zh: "- \u4F26\u6566\u73B0\u573A\uFF1A2026 \u5E74 12 \u6708 5\u20136 \u65E5\u30019\u201312 \u65E5",
        en: "In-person auditions (round one) take place at the Academy on 5 & 6 December and 9 to 12 December.",
        enType: "original",
        t: "\u73B0\u573A\u7B2C\u4E00\u8F6E",
        ten: "Live round one"
      }, {
        k: "live",
        zh: `- 2026 \u5E74 12 \u6708 13 \u65E5
- \u8BC4\u59D4\u4ECE\u5269\u4F59\u4E24\u9996\u4E2D\u9009\u4E00\u9996\uFF1B\u8003\u751F\u81EA\u9009\u7B2C\u4E8C\u9996\uFF08\u53EF\u4E3A\u7B2C\u4E00\u8F6E\u5DF2\u5531\u66F2\u76EE\uFF0C\u6216\u7B2C\u56DB\u9996\uFF09`,
        en: "Recall on 13 December. The recall panel will select one aria from the remaining two arias in your list. You will choose the second aria, which can be from your first submission, or it can be the fourth aria.",
        enType: "summary",
        t: "\u590D\u8BD5\uFF08Recall\uFF09",
        ten: "Recall"
      }],
      country: "UK",
      verified: "2026-09-21",
      note: "",
      updated: "2026-10-16"
    }]
  }
};
var Ze = {
  users: [{
    id: "u-sup",
    name: "\u738B\u4E3B\u7BA1",
    role: "supervisor",
    username: "wang",
    studentId: null
  }, {
    id: "u-li",
    name: "\u674E\u987E\u95EE",
    role: "advisor",
    username: "li",
    studentId: null
  }, {
    id: "u-zhao",
    name: "\u8D75\u987E\u95EE",
    role: "advisor",
    username: "zhao",
    studentId: null
  }, {
    id: "u-chen",
    name: "\u9648\u6587\u4E66",
    role: "writer",
    username: "chen",
    studentId: null
  }, {
    id: "u-sun",
    name: "\u5B59\u6587\u4E66",
    role: "writer",
    username: "sun",
    studentId: null
  }, {
    id: "u-s1",
    name: "\u6797\u540C\u5B66",
    role: "student",
    username: "lin.yuxi",
    studentId: "stu-1"
  }, {
    id: "u-s2",
    name: "\u5468\u540C\u5B66",
    role: "student",
    username: "zhou.an",
    studentId: "stu-2"
  }, {
    id: "u-s3",
    name: "\u8BB8\u540C\u5B66",
    role: "student",
    username: "xu.mia",
    studentId: "stu-3"
  }],
  students: [{
    id: "stu-1",
    name: "\u6797\u540C\u5B66",
    englishName: "Lin Yuxi",
    season: "2027 Fall",
    level: "UG",
    majorId: "piano",
    currentSchool: "\u4E0A\u6D77\u67D0\u56FD\u9645\u9AD8\u4E2D",
    status: "active",
    advisorId: "u-li",
    writerIds: ["u-chen"],
    intake: {
      status: "verified",
      submittedAt: "2026-08-12T02:00:00.000Z",
      verifiedAt: "2026-08-14T02:00:00.000Z",
      verifiedBy: "u-li",
      changes: []
    },
    profile: {
      nameZh: "\u6797\u540C\u5B66",
      nameEn: "LIN Yuxi",
      gender: "\u5973",
      birthDate: "2008-05-16",
      nationality: "\u4E2D\u56FD",
      birthPlace: "\u4E0A\u6D77",
      phone: "138****0001",
      email: "lin.demo@example.com",
      addressZh: "\u4E0A\u6D77\u5E02\u67D0\u533A\u67D0\u8DEF 100 \u53F7",
      postcode: "200000",
      preferredName: "Yuxi",
      addressEn: "No. 100, Demo Road, Shanghai",
      guardians: [{
        name: "\u6797\u5973\u58EB",
        relation: "\u6BCD\u4EB2",
        phone: "139****0002",
        email: "mum.demo@example.com",
        address: "\u540C\u4E0A"
      }, {}],
      education: [{
        stage: "\u521D\u4E2D",
        schoolZh: "\u4E0A\u6D77\u67D0\u521D\u7EA7\u4E2D\u5B66",
        type: "\u516C\u7ACB",
        period: "2020.09\u20132023.06"
      }, {
        stage: "\u9AD8\u4E2D / \u5F53\u524D\u5B66\u6821",
        schoolZh: "\u4E0A\u6D77\u67D0\u56FD\u9645\u9AD8\u4E2D",
        schoolEn: "Shanghai Demo International School",
        type: "\u56FD\u9645\u5B66\u6821\uFF08A-Level\uFF09",
        period: "2023.09\u20132027.06",
        address: "\u4E0A\u6D77\u5E02\u67D0\u533A \xB7 200000"
      }],
      gpa: "3.8",
      gpaScale: "4.0 \u5236",
      gaokaoDate: "",
      gaokaoScore: "",
      tests: [{
        type: "IELTS",
        date: "2026-08-16",
        regNo: "DEMO123456",
        overall: "6.0",
        subs: "L6.5 R6.0 W5.5 S6.0",
        min: "5.5",
        account: "lin.demo@example.com"
      }],
      otherTests: "ABRSM \u94A2\u7434",
      otherTestsScore: "2024.06 \xB7 8 \u7EA7 Distinction",
      testNote: "\u8BA1\u5212 12 \u6708\u518D\u8003\u4E00\u6B21\u96C5\u601D",
      activities: [{
        period: "2025.03\u20142025.03",
        name: "\u4E0A\u6D77\u9752\u5C11\u5E74\u94A2\u7434\u6BD4\u8D5B",
        role: "\u53C2\u8D5B\uFF0C\u6F14\u594F Chopin Ballade No.1\uFF0C\u83B7\u4E8C\u7B49\u5956"
      }, {
        period: "2024.09\u20142026.06",
        name: "\u5B66\u6821\u4EA4\u54CD\u4E50\u56E2",
        role: "\u4E50\u56E2\u94A2\u7434\uFF0C\u53C2\u4E0E\u5E74\u5EA6\u97F3\u4E50\u4F1A 4 \u573A"
      }, {
        period: "2025.07",
        name: "\u67D0\u97F3\u4E50\u8282\u5927\u5E08\u8BFE",
        role: "\u5B66\u5458\uFF0C\u5E08\u4ECE\u67D0\u82F1\u56FD\u94A2\u7434\u6559\u6388"
      }],
      awards: [{
        date: "2025.03",
        name: "\u4E0A\u6D77\u9752\u5C11\u5E74\u94A2\u7434\u6BD4\u8D5B\u4E8C\u7B49\u5956",
        org: "\u5E02\u7EA7"
      }, {}],
      abilities: "\u89C6\u594F\u8F83\u5F3A\uFF0C\u80FD\u4E3A\u5408\u5531\u56E2\u4F34\u594F",
      hobbies: "\u9605\u8BFB\u3001\u6444\u5F71",
      q1: "\u516D\u5C81\u65F6\u7B2C\u4E00\u6B21\u5728\u97F3\u4E50\u5385\u542C\u5230\u8096\u90A6\u7684\u53D9\u4E8B\u66F2\uFF0C\u56DE\u5BB6\u540E\u53CD\u590D\u6A21\u4EFF\u90A3\u6BB5\u65CB\u5F8B\u3002\u540E\u6765\u8DDF\u968F\u738B\u8001\u5E08\u7CFB\u7EDF\u5B66\u4E60\uFF0C\u9010\u6E10\u660E\u767D\u94A2\u7434\u4E0D\u53EA\u662F\u6280\u672F\uFF0C\u800C\u662F\u548C\u4F5C\u66F2\u5BB6\u5BF9\u8BDD\u7684\u65B9\u5F0F\u2026\u2026\uFF08\u6F14\u793A\u6587\u5B57\uFF09",
      q2: "\u9AD8\u4E8C\u65F6\u624B\u8155\u53D7\u4F24\u505C\u7434\u4E24\u4E2A\u6708\uFF0C\u8FD9\u6BB5\u65F6\u95F4\u6211\u5F00\u59CB\u5206\u6790\u603B\u8C31\u548C\u5F55\u97F3\uFF0C\u590D\u7434\u540E\u5BF9\u4F5C\u54C1\u7ED3\u6784\u7684\u7406\u89E3\u53CD\u800C\u66F4\u6E05\u695A\u2026\u2026\uFF08\u6F14\u793A\u6587\u5B57\uFF09",
      q3: "\u5E0C\u671B\u5148\u6210\u4E3A\u804C\u4E1A\u72EC\u594F\u548C\u5BA4\u5185\u4E50\u6F14\u594F\u8005\uFF0C\u4E4B\u540E\u56DE\u56FD\u4ECE\u4E8B\u94A2\u7434\u6559\u80B2\u3002",
      q4: "2025 \u5E74\u6BD4\u8D5B\u524D\u4E00\u5468\u6362\u4E86\u6BD4\u8D5B\u7528\u7434\uFF0C\u89E6\u952E\u5B8C\u5168\u4E0D\u540C\u2026\u2026\uFF08\u6F14\u793A\u6587\u5B57\uFF09",
      q5: "\u5728\u5927\u5E08\u8BFE\u4E0A\u88AB\u9009\u4E3A\u793A\u8303\u5B66\u5458\uFF0C\u6F14\u594F\u540E\u6559\u6388\u9080\u8BF7\u6211\u53C2\u52A0\u6691\u671F\u5B66\u9662\u3002",
      q6: "\u62C5\u4EFB\u5B66\u6821\u97F3\u4E50\u793E\u793E\u957F\u4E24\u5E74\uFF0C\u7EC4\u7EC7\u6821\u5185\u6148\u5584\u97F3\u4E50\u4F1A\uFF0C\u4E3A\u793E\u533A\u5B66\u6821\u52DF\u96C6\u4E50\u5668\u3002",
      q7: "\u5BF9\u82F1\u56FD\u5F53\u4EE3\u97F3\u4E50\u6709\u6D53\u539A\u5174\u8DA3\uFF0C\u81EA\u5B66\u4E86\u90E8\u5206\u4F5C\u66F2\u3002",
      files: {
        "0": {
          status: "provided",
          fileName: "\u62A4\u7167\u626B\u63CF"
        },
        "1": {
          status: "provided",
          fileName: "\u9AD8\u4E2D\u6210\u7EE9\u5355\uFF08\u4E2D\u82F1\u6587\uFF09"
        },
        "2": {
          status: "provided",
          fileName: "IELTS \u6210\u7EE9\u5355"
        },
        "3": {
          status: "pending"
        },
        "4": {
          status: "provided"
        },
        "5": {
          status: "provided"
        },
        "6": {
          status: "provided"
        },
        "7": {
          status: "na"
        }
      },
      confirmed: !0,
      confirmName: "\u6797\u540C\u5B66",
      confirmDate: "2026-08-12",
      accounts: [{
        platform: "UCAS Conservatoires",
        login: "lin.demo@example.com",
        note: "\u5BC6\u7801\u7531\u987E\u95EE\u4FDD\u7BA1\u5728\u516C\u53F8\u5BC6\u7801\u7BA1\u7406\u5668"
      }, {
        platform: "Acceptd",
        login: "lin.demo@example.com",
        note: ""
      }, {
        platform: "Common App",
        login: "lin.demo@example.com",
        note: ""
      }]
    }
  }, {
    id: "stu-2",
    name: "\u5468\u540C\u5B66",
    englishName: "Zhou An",
    season: "2027 Fall",
    level: "PG",
    majorId: "production",
    currentSchool: "\u67D0\u97F3\u4E50\u5B66\u9662 \xB7 \u5F55\u97F3\u827A\u672F\u4E13\u4E1A\uFF08\u5927\u56DB\uFF09",
    status: "active",
    advisorId: "u-zhao",
    writerIds: ["u-sun"],
    intake: {
      status: "updated",
      submittedAt: "2026-09-20T02:00:00.000Z",
      verifiedAt: "2026-09-22T02:00:00.000Z",
      verifiedBy: "u-zhao",
      changes: [{
        at: "2026-10-21T13:00:00.000Z",
        by: "u-s2",
        fields: ["\u4E2A\u4EBA\u57FA\u672C\u4FE1\u606F\xB7\u8054\u7CFB\u7535\u8BDD", "\u4E2A\u4EBA\u9648\u8FF0\u7D20\u6750 \xB7 \u4E13\u4E1A\u5174\u8DA3\u4E0E\u5B66\u4E60\u7ECF\u5386\xB7\u95EE\u9898 3\uFF5C\u6BD5\u4E1A\u540E\u7684\u804C\u4E1A\u4E0E\u4EBA\u751F\u89C4\u5212"]
      }]
    },
    profile: {
      nameZh: "\u5468\u540C\u5B66",
      nameEn: "ZHOU An",
      gender: "\u7537",
      birthDate: "2004-11-02",
      nationality: "\u4E2D\u56FD",
      birthPlace: "\u676D\u5DDE",
      phone: "137****0003",
      email: "zhou.demo@example.com",
      guardians: [{
        name: "\u5468\u5148\u751F",
        relation: "\u7236\u4EB2",
        phone: "136****0004"
      }, {}],
      education: [{
        stage: "\u672C\u79D1",
        schoolZh: "\u67D0\u97F3\u4E50\u5B66\u9662",
        schoolEn: "Demo Conservatory of Music",
        type: "\u672C\u79D1",
        period: "2023.09\u20132027.06"
      }, {
        stage: "\u9AD8\u4E2D",
        schoolZh: "\u676D\u5DDE\u67D0\u4E2D\u5B66",
        period: "2020\u20132023"
      }],
      gpa: "86",
      gpaScale: "100 \u5206\u5236",
      tests: [{
        type: "IELTS",
        date: "2026-06-20",
        overall: "6.5",
        subs: "L7.0 R6.5 W6.0 S6.0",
        min: "6.0"
      }],
      activities: [{
        period: "2025.05",
        name: "\u5B66\u9662\u6BD5\u4E1A\u97F3\u4E50\u4F1A",
        role: "\u5F55\u97F3\u4E0E\u6DF7\u97F3\u8D1F\u8D23\u4EBA"
      }, {}, {}],
      awards: [{}, {}],
      q1: "\u4ECE\u9AD8\u4E2D\u5F00\u59CB\u7528\u7535\u8111\u505A\u7F16\u66F2\uFF0C\u672C\u79D1\u5B66\u4E60\u5F55\u97F3\u827A\u672F\u540E\u66F4\u60F3\u505A\u7535\u5B50\u97F3\u4E50\u521B\u4F5C\u2026\u2026\uFF08\u6F14\u793A\u6587\u5B57\uFF09",
      q2: "",
      q3: "\u6BD5\u4E1A\u540E\u5E0C\u671B\u8FDB\u5165\u6E38\u620F\u97F3\u9891\u884C\u4E1A\uFF0C\u540C\u65F6\u4FDD\u6301\u4E2A\u4EBA\u7535\u5B50\u97F3\u4E50\u4F5C\u54C1\u53D1\u5E03\u3002\uFF08\u5B66\u751F 10 \u6708 21 \u65E5\u66F4\u65B0\uFF09",
      q4: "",
      q5: "\u6BD5\u4E1A\u8BBE\u8BA1\u4F5C\u54C1\u5165\u9009\u5B66\u9662\u5E74\u5EA6\u5C55\u6F14\u3002",
      q6: "",
      q7: "",
      files: {},
      confirmed: !0,
      confirmName: "\u5468\u540C\u5B66",
      confirmDate: "2026-09-20",
      accounts: []
    }
  }, {
    id: "stu-3",
    name: "\u8BB8\u540C\u5B66",
    englishName: "Xu Mia",
    season: "2027 Fall",
    level: "UG",
    majorId: "popvoice",
    currentSchool: "\u67D0\u827A\u672F\u9AD8\u4E2D",
    status: "active",
    advisorId: "u-li",
    writerIds: ["u-chen"],
    intake: {
      status: "draft",
      changes: []
    },
    profile: {
      nameZh: "\u8BB8\u540C\u5B66",
      nameEn: "XU Mia",
      gender: "\u5973",
      birthDate: "",
      nationality: "\u4E2D\u56FD",
      phone: "135****0005",
      email: "",
      guardians: [{}, {}],
      education: [{
        stage: "\u521D\u4E2D"
      }, {
        stage: "\u9AD8\u4E2D / \u5F53\u524D\u5B66\u6821",
        schoolZh: "\u67D0\u827A\u672F\u9AD8\u4E2D"
      }],
      tests: [{
        type: "IELTS",
        date: "2026-07-12",
        overall: "5.5",
        subs: "L6.0 R5.5 W5.0 S5.5",
        min: "5.0"
      }],
      testNote: "\u8BA1\u5212 11 \u6708\u91CD\u8003",
      activities: [{}, {}, {}],
      awards: [{}, {}],
      q1: "\u5C0F\u65F6\u5019\u5728\u5BB6\u91CC\u8DDF\u7740\u5988\u5988\u542C\u534E\u8BED\u6D41\u884C\u6B4C\u2026\u2026\uFF08\u586B\u5199\u4E2D\uFF09",
      files: {},
      accounts: []
    }
  }],
  applications: [{
    id: "app-1",
    studentId: "stu-1",
    schoolId: "rcm",
    schoolName: "",
    program: "BMus (Hons)",
    majorId: "piano",
    level: "UG",
    parts: [{
      id: "p-1",
      submissionId: "sub-1u",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-10-01",
        verified: !0,
        note: ""
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-09-25",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["rcm-ug-academic", "rcm-ug-english", "rcm-process", "rcm-ug-aud-piano"],
      lang: {
        o: "5.5",
        m: "5.5",
        label: "BMus"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-2",
    studentId: "stu-1",
    schoolId: "ram",
    schoolName: "",
    program: "BMus",
    majorId: "piano",
    level: "UG",
    parts: [{
      id: "p-2",
      submissionId: "sub-1u",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-10-01",
        verified: !0,
        note: ""
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-09-25",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["ram-ug-english"],
      lang: {
        o: "5.5",
        m: "5.5",
        label: "BMus \u4E00\u5E74\u7EA7\u5165\u5B66"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-3",
    studentId: "stu-1",
    schoolId: "rncm",
    schoolName: "",
    program: "BMus (Hons) 4 \u5E74\u5236",
    majorId: "piano",
    level: "UG",
    parts: [{
      id: "p-3",
      submissionId: "sub-1u",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-10-01",
        verified: !0,
        note: ""
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-09-25",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["rncm-ug-english", "rncm-ug-aud-piano"],
      lang: {
        o: "5.5",
        m: "5.5",
        label: "BMus 4 \u5E74\u5236"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-4",
    studentId: "stu-1",
    schoolId: "guildhall",
    schoolName: "",
    program: "BMus (Hons)",
    majorId: "piano",
    level: "UG",
    parts: [{
      id: "p-4",
      submissionId: "sub-1g",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-10-01",
        verified: !0,
        note: ""
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-09-22",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["gsmd-english", "gsmd-ug-aud-piano"],
      lang: {
        o: "5.5",
        m: "5.5",
        label: "BMus / MMus / MPerf / MComp"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-9",
    studentId: "stu-1",
    schoolId: "",
    schoolName: "IU Jacobs",
    program: "BM Piano Performance",
    majorId: "piano",
    level: "UG",
    parts: [{
      id: "p-9a",
      submissionId: "sub-1c",
      label: "\u5927\u5B66\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-11-01",
        verified: !0,
        note: "IU Office of Admissions"
      },
      needsAdd: !1,
      addedAt: ""
    }, {
      id: "p-9b",
      submissionId: "sub-1j",
      label: "\u97F3\u4E50\u5B66\u9662\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-12-01",
        verified: !0,
        note: "\u542B\u63A8\u8350\u4FE1\u4E0E\u9884\u5BA1"
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-10-28",
    reqConfirmed: {
      at: "2026-10-15T02:00:00.000Z",
      by: "u-li",
      ids: [],
      lang: null
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-5",
    studentId: "stu-2",
    schoolId: "guildhall",
    schoolName: "",
    program: "MMus Electronic & Produced Music",
    majorId: "production",
    level: "PG",
    parts: [{
      id: "p-5",
      submissionId: "sub-2g",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2027-01-05",
        verified: !1,
        note: "\u9662\u6821\u5E93\u9884\u586B\uFF0C\u5F85\u6838\u5B9E"
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-12-15",
    reqConfirmed: null,
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-6",
    studentId: "stu-2",
    schoolId: "leeds",
    schoolName: "",
    program: "MA Music Production",
    majorId: "production",
    level: "PG",
    parts: [{
      id: "p-6",
      submissionId: "sub-2u",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "",
        verified: !1,
        note: "\u5B98\u7F51\u672A\u516C\u5E03 2027/28 \u622A\u6B62\u65E5\u671F"
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-12-01",
    reqConfirmed: {
      at: "2026-10-10T02:00:00.000Z",
      by: "u-zhao",
      ids: ["leeds-english"],
      lang: {
        o: "6.0",
        m: "5.5",
        label: "BA / MA"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-7",
    studentId: "stu-3",
    schoolId: "rncm",
    schoolName: "",
    program: "BMus (Hons) Popular Music",
    majorId: "popvoice",
    level: "UG",
    parts: [{
      id: "p-7",
      submissionId: "sub-3u",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2026-10-01",
        verified: !0,
        note: ""
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-09-25",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["rncm-ug-english", "rncm-ug-aud-popvoice"],
      lang: {
        o: "5.5",
        m: "5.5",
        label: "BMus Popular Music"
      }
    },
    outcome: {
      type: "conditional",
      date: "2026-10-20",
      conditions: "IELTS \u603B\u5206 6.0\uFF0C\u5404\u9879\u4E0D\u4F4E\u4E8E 5.5\uFF082027-06-30 \u524D\u8FBE\u6210\uFF09"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }, {
    id: "app-8",
    studentId: "stu-3",
    schoolId: "leeds",
    schoolName: "",
    program: "BA (Hons) Popular Music Performance (Voice)",
    majorId: "popvoice",
    level: "UG",
    parts: [{
      id: "p-8",
      submissionId: "sub-3ug",
      label: "\u4E3B\u7533\u8BF7",
      required: !0,
      deadline: {
        date: "2027-01-14",
        verified: !1,
        note: "\u4EE5 UCAS \u65E5\u5386\u4E3A\u51C6"
      },
      needsAdd: !1,
      addedAt: ""
    }],
    internalDeadline: "2026-10-10",
    reqConfirmed: {
      at: "2026-09-05T02:00:00.000Z",
      by: "u-li",
      ids: ["leeds-english", "leeds-ug-aud-popular"],
      lang: {
        o: "6.0",
        m: "5.5",
        label: "BA / MA"
      }
    },
    outcome: {
      type: "pending"
    },
    decision: {
      type: "pending"
    },
    skipTpl: []
  }],
  submissions: [{
    id: "sub-1u",
    studentId: "stu-1",
    platform: "ucas_conservatoires",
    name: "",
    status: "received",
    submittedAt: "2026-09-28",
    receivedAt: "2026-10-03",
    ref: "\u6F14\u793A-123-456-7890",
    note: "",
    skipTpl: []
  }, {
    id: "sub-1g",
    studentId: "stu-1",
    platform: "school_portal",
    name: "Guildhall \u7533\u8BF7\u7CFB\u7EDF",
    status: "submitted",
    submittedAt: "2026-09-25",
    receivedAt: "",
    ref: "GSMD-\u6F14\u793A-0425",
    note: "",
    skipTpl: []
  }, {
    id: "sub-1c",
    studentId: "stu-1",
    platform: "common_app",
    name: "",
    status: "in_progress",
    submittedAt: "",
    receivedAt: "",
    ref: "",
    note: "\u7528\u4E8E IU \u5927\u5B66\u90E8\u5206",
    skipTpl: []
  }, {
    id: "sub-1j",
    studentId: "stu-1",
    platform: "school_portal",
    name: "Jacobs Supplemental Application",
    status: "not_started",
    submittedAt: "",
    receivedAt: "",
    ref: "",
    note: "\u63A8\u8350\u4FE1\u4E0E\u9884\u5BA1\u89C6\u9891\u5728\u6B64\u7CFB\u7EDF\u5185\u63D0\u4EA4",
    skipTpl: []
  }, {
    id: "sub-2u",
    studentId: "stu-2",
    platform: "ucas_conservatoires",
    name: "",
    status: "in_progress",
    submittedAt: "",
    receivedAt: "",
    ref: "",
    note: "",
    skipTpl: []
  }, {
    id: "sub-2g",
    studentId: "stu-2",
    platform: "school_portal",
    name: "Guildhall \u7533\u8BF7\u7CFB\u7EDF",
    status: "not_started",
    submittedAt: "",
    receivedAt: "",
    ref: "",
    note: "",
    skipTpl: []
  }, {
    id: "sub-3u",
    studentId: "stu-3",
    platform: "ucas_conservatoires",
    name: "",
    status: "received",
    submittedAt: "2026-09-29",
    receivedAt: "2026-10-02",
    ref: "\u6F14\u793A-987-654-3210",
    note: "",
    skipTpl: []
  }, {
    id: "sub-3ug",
    studentId: "stu-3",
    platform: "ucas_ug",
    name: "",
    status: "submitted",
    submittedAt: "2026-10-10",
    receivedAt: "",
    ref: "\u6F14\u793A-555-111-2222",
    note: "Leeds BA \u8D70 UCAS Undergraduate",
    skipTpl: []
  }],
  rounds: [{
    id: "rd-1a",
    studentId: "stu-1",
    applicationId: "app-1",
    kind: "prescreen",
    platform: "Acceptd\uFF08RCM\uFF09",
    deadline: "2026-10-01",
    date: "",
    location: "",
    status: "passed",
    note: "10/12 \u6536\u5230\u4E0A\u6D77\u8003\u70B9\u9080\u8BF7"
  }, {
    id: "rd-1b",
    studentId: "stu-1",
    applicationId: "app-1",
    kind: "live",
    platform: "",
    deadline: "",
    date: "2026-10-30",
    location: "\u4E0A\u6D77\u8003\u70B9",
    status: "scheduled",
    note: "\u4E0A\u5348 10:20 \u62A5\u5230\uFF1B\u542B\u89C6\u594F\u4E0E\u7B80\u77ED\u9762\u8BD5"
  }, {
    id: "rd-2a",
    studentId: "stu-1",
    applicationId: "app-2",
    kind: "prescreen",
    platform: "Acceptd\uFF08RAM\uFF09",
    deadline: "2026-10-01",
    date: "",
    location: "",
    status: "submitted",
    note: ""
  }, {
    id: "rd-3a",
    studentId: "stu-1",
    applicationId: "app-3",
    kind: "recorded",
    platform: "Acceptd\uFF08RNCM\uFF09",
    deadline: "2026-11-05",
    date: "",
    location: "",
    status: "preparing",
    note: "\u4EE5\u5F55\u50CF\u4EE3\u66FF\u73B0\u573A\u8003\u8BD5"
  }, {
    id: "rd-4a",
    studentId: "stu-1",
    applicationId: "app-4",
    kind: "live",
    platform: "",
    deadline: "",
    date: "",
    location: "\u4F26\u6566 / \u6D77\u5916\u8003\u70B9\u5F85\u5B9A",
    status: "waiting",
    note: ""
  }, {
    id: "rd-9a",
    studentId: "stu-1",
    applicationId: "app-9",
    kind: "prescreen",
    platform: "Jacobs Supplemental Application",
    deadline: "2026-12-01",
    date: "",
    location: "",
    status: "preparing",
    note: ""
  }, {
    id: "rd-9b",
    studentId: "stu-1",
    applicationId: "app-9",
    kind: "live",
    platform: "",
    deadline: "",
    date: "",
    location: "Bloomington",
    status: "waiting",
    note: "\u9884\u5BA1\u901A\u8FC7\u540E\u53D7\u9080"
  }, {
    id: "rd-5a",
    studentId: "stu-2",
    applicationId: "app-5",
    kind: "portfolio",
    platform: "\u5B66\u6821\u6307\u5B9A\u4E0A\u4F20\uFF08Dropbox\uFF09",
    deadline: "2027-01-12",
    date: "",
    location: "",
    status: "preparing",
    note: ""
  }, {
    id: "rd-5b",
    studentId: "stu-2",
    applicationId: "app-5",
    kind: "interview",
    platform: "",
    deadline: "",
    date: "",
    location: "\u7EBF\u4E0A",
    status: "waiting",
    note: ""
  }, {
    id: "rd-6a",
    studentId: "stu-2",
    applicationId: "app-6",
    kind: "portfolio",
    platform: "Acceptd\uFF08Leeds\uFF09",
    deadline: "",
    date: "",
    location: "",
    status: "preparing",
    note: ""
  }, {
    id: "rd-7a",
    studentId: "stu-3",
    applicationId: "app-7",
    kind: "recorded",
    platform: "Acceptd\uFF08RNCM\uFF09",
    deadline: "2026-10-01",
    date: "",
    location: "",
    status: "passed",
    note: ""
  }, {
    id: "rd-8a",
    studentId: "stu-3",
    applicationId: "app-8",
    kind: "online",
    platform: "Zoom",
    deadline: "",
    date: "2026-11-12",
    location: "\u7EBF\u4E0A",
    status: "scheduled",
    note: "\u5317\u4EAC\u65F6\u95F4 18:00"
  }],
  tasks: [{
    id: "t-1",
    studentId: "stu-1",
    applicationId: "app-1",
    submissionId: null,
    roundId: "rd-1b",
    title: "\u4E0A\u6D77\u73B0\u573A\u8003\u8BD5\u5F69\u6392\uFF08\u542B\u89C6\u594F\u7EC3\u4E60\uFF09",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-10-27",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-2",
    studentId: "stu-1",
    applicationId: "app-1",
    submissionId: null,
    roundId: "rd-1b",
    title: "\u786E\u8BA4\u4E0A\u6D77\u8003\u8BD5\u884C\u7A0B\u4E0E\u4F4F\u5BBF",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-10-25",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-3",
    studentId: "stu-1",
    applicationId: "app-3",
    submissionId: null,
    roundId: "rd-3a",
    title: "\u767B\u8BB0\u4E13\u4E1A\u8001\u5E08\u5BF9 RNCM \u5F55\u50CF V2 \u7684\u610F\u89C1",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-10-24",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "tpl-teacher",
    scopeKey: "app:app-3",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z",
    links: [{
      type: "mat",
      id: "m-5"
    }]
  }, {
    id: "t-4",
    studentId: "stu-1",
    applicationId: "app-3",
    submissionId: null,
    roundId: "rd-3a",
    title: "\u4E0A\u4F20 RNCM \u5F55\u50CF\u8003\u8BD5\u89C6\u9891\uFF08Acceptd\uFF09",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-11-03",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "round:submitted",
    templateId: "tpl-upload",
    scopeKey: "app:app-3",
    dependsOn: ["t-3"],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-5",
    studentId: "stu-1",
    applicationId: "app-2",
    submissionId: null,
    roundId: "rd-2a",
    title: "\u8DDF\u8FDB RAM \u9884\u5BA1\u7ED3\u679C",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-10-31",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-6",
    studentId: "stu-1",
    applicationId: "app-4",
    submissionId: "sub-1g",
    roundId: null,
    title: "\u8865\u4EA4 Guildhall \u7533\u8BF7\u8D39\u4ED8\u6B3E\u51ED\u8BC1",
    category: "submission",
    assigneeId: "u-li",
    dueDate: "2026-10-20",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "\u5B66\u6821\u90AE\u4EF6\u63D0\u9192\u4ED8\u6B3E\u8BB0\u5F55\u672A\u5339\u914D",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-7",
    studentId: "stu-1",
    applicationId: null,
    submissionId: "sub-1u",
    roundId: null,
    title: "\u590D\u6838\u7533\u8BF7\u8868\u5E76\u6B63\u5F0F\u63D0\u4EA4",
    category: "submission",
    assigneeId: "u-li",
    dueDate: "2026-09-26",
    status: "done",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "submission:submitted",
    templateId: "tpl-submit",
    scopeKey: "sub:sub-1u",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z",
    doneAt: "2026-09-28T02:00:00.000Z"
  }, {
    id: "t-17",
    studentId: "stu-1",
    applicationId: null,
    submissionId: "sub-1c",
    roundId: null,
    title: "\u586B\u5199\u5E76\u63D0\u4EA4 Common App\uFF08IU \u5927\u5B66\u90E8\u5206\uFF09",
    category: "submission",
    assigneeId: "u-li",
    dueDate: "2026-10-28",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "submission:submitted",
    templateId: "tpl-submit",
    scopeKey: "sub:sub-1c",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-19",
    studentId: "stu-1",
    applicationId: "app-9",
    submissionId: null,
    roundId: "rd-9a",
    title: "\u5F55\u5236 IU \u9884\u5BA1\u89C6\u9891",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-11-15",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "tpl-rep",
    scopeKey: "app:app-9",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-18",
    studentId: "stu-1",
    applicationId: "app-9",
    submissionId: "sub-1j",
    roundId: null,
    title: "\u63D0\u4EA4 Jacobs Supplemental Application\uFF08\u542B\u9884\u5BA1\uFF09",
    category: "submission",
    assigneeId: "u-li",
    dueDate: "2026-11-25",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "submission:submitted",
    templateId: "tpl-submit",
    scopeKey: "sub:sub-1j",
    dependsOn: ["t-19"],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-8",
    studentId: "stu-2",
    applicationId: "app-5",
    submissionId: null,
    roundId: null,
    title: "\u6838\u5BF9 Guildhall MMus \u8981\u6C42\u4E0E\u622A\u6B62\u65E5\u671F",
    category: "requirements",
    assigneeId: "u-zhao",
    dueDate: "2026-10-28",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-9",
    studentId: "stu-2",
    applicationId: "app-5",
    submissionId: null,
    roundId: "rd-5a",
    title: "\u6574\u7406\u4F5C\u54C1\u96C6\u66F2\u76EE\u4E0E\u5236\u4F5C\u8BF4\u660E",
    category: "audition",
    assigneeId: "u-zhao",
    dueDate: "2026-11-30",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-10",
    studentId: "stu-2",
    applicationId: null,
    submissionId: "sub-2u",
    roundId: null,
    title: "\u6CE8\u518C\u7533\u8BF7\u5E73\u53F0\u8D26\u53F7\u5E76\u6838\u5BF9\u4E2A\u4EBA\u4FE1\u606F",
    category: "submission",
    assigneeId: "u-zhao",
    dueDate: "2026-10-30",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "tpl-account",
    scopeKey: "sub:sub-2u",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-11",
    studentId: "stu-2",
    applicationId: "app-6",
    submissionId: null,
    roundId: null,
    title: "\u5411 Leeds \u62DB\u751F\u529E\u786E\u8BA4 MA \u622A\u6B62\u65E5\u671F",
    category: "requirements",
    assigneeId: "u-zhao",
    dueDate: "2026-10-26",
    status: "doing",
    blocked: !0,
    blockedReason: "\u5DF2\u53D1\u90AE\u4EF6\uFF0C\u7B49\u5F85\u56DE\u590D",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-12",
    studentId: "stu-2",
    applicationId: null,
    submissionId: "sub-2u",
    roundId: null,
    title: "\u9080\u8BF7\u63A8\u8350\u4EBA\u5E76\u8DDF\u8FDB\u63D0\u4EA4",
    category: "materials",
    assigneeId: "u-zhao",
    dueDate: "2026-11-20",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "tpl-ref",
    scopeKey: "sub:sub-2u",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-13",
    studentId: "stu-3",
    applicationId: "app-7",
    submissionId: null,
    roundId: null,
    title: "\u8DDF\u8FDB RNCM Offer \u6761\u4EF6\uFF08IELTS 6.0\uFF09",
    category: "offer",
    assigneeId: "u-li",
    dueDate: "2026-11-15",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-14",
    studentId: "stu-3",
    applicationId: null,
    submissionId: null,
    roundId: null,
    title: "\u4E3A\u8BB8\u540C\u5B66\u62A5\u540D 11 \u6708\u96C5\u601D",
    category: "materials",
    assigneeId: "u-li",
    dueDate: "2026-10-22",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-15",
    studentId: "stu-3",
    applicationId: "app-8",
    submissionId: null,
    roundId: "rd-8a",
    title: "Leeds \u7EBF\u4E0A\u9762\u8BD5\u8BBE\u5907\u4E0E\u7F51\u7EDC\u6D4B\u8BD5",
    category: "audition",
    assigneeId: "u-li",
    dueDate: "2026-11-08",
    status: "todo",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z"
  }, {
    id: "t-16",
    studentId: "stu-3",
    applicationId: "app-8",
    submissionId: null,
    roundId: null,
    title: "\u4E0E\u8BB8\u540C\u5B66\u8BBF\u8C08\uFF0C\u8865\u5145 Leeds \u95EE\u7B54\u7D20\u6750",
    category: "other",
    assigneeId: "u-chen",
    dueDate: "2026-10-26",
    status: "doing",
    blocked: !1,
    blockedReason: "",
    note: "",
    effect: "",
    templateId: "",
    scopeKey: "",
    dependsOn: [],
    createdBy: "u-sup",
    createdAt: "2026-09-01T02:00:00.000Z",
    links: [{
      type: "doc",
      id: "doc-8"
    }]
  }],
  documents: [{
    id: "doc-1",
    studentId: "stu-1",
    title: "UCAS Personal Statement",
    type: "ps",
    writerId: "u-chen",
    status: "final",
    submissionId: "sub-1u",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-09-20",
    brief: "UCAS Conservatoires \u5171\u7528\u4E00\u4EFD\uFF1A\u97F3\u4E50\u7ECF\u5386\u3001\u9009\u62E9\u94A2\u7434\u6F14\u594F\u7684\u52A8\u673A\u3001\u672A\u6765\u89C4\u5212\u3002",
    wordLimit: "4000 \u5B57\u7B26",
    currentVersionId: "v-1-3"
  }, {
    id: "doc-2",
    studentId: "stu-1",
    title: "Guildhall Personal Statement",
    type: "ps",
    writerId: "u-chen",
    status: "final",
    submissionId: "sub-1g",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-09-18",
    brief: "Guildhall \u81EA\u6709\u7CFB\u7EDF\u5355\u72EC\u63D0\u4EA4\uFF0C\u53EF\u57FA\u4E8E UCAS \u7248\u672C\u8C03\u6574\u3002",
    wordLimit: "500 \u8BCD",
    currentVersionId: "v-2-1"
  }, {
    id: "doc-3",
    studentId: "stu-1",
    title: "\u97F3\u4E50\u7B80\u5386 CV\uFF08\u73B0\u573A\u8003\u8BD5\u643A\u5E26\uFF09",
    type: "cv",
    writerId: "u-chen",
    status: "student_review",
    submissionId: null,
    applicationIds: ["app-1", "app-4"],
    needStudentConfirm: !0,
    dueDate: "2026-10-26",
    brief: "1 \u9875\uFF0C\u5217\u51FA\u6F14\u51FA\u3001\u6BD4\u8D5B\u4E0E\u5E08\u627F\u3002",
    wordLimit: "",
    currentVersionId: "v-3-2"
  }, {
    id: "doc-4",
    studentId: "stu-1",
    title: "RNCM \u5F55\u50CF\u66F2\u76EE\u8BF4\u660E Programme Note",
    type: "supplemental",
    writerId: "u-chen",
    status: "supervisor_review",
    submissionId: null,
    applicationIds: ["app-3"],
    needStudentConfirm: !0,
    dueDate: "2026-10-29",
    brief: "\u5BF9\u5F55\u50CF\u4E2D\u4E09\u9996\u4F5C\u54C1\u7684\u7B80\u77ED\u8BF4\u660E\u3002",
    wordLimit: "300 \u8BCD",
    currentVersionId: "v-4-2"
  }, {
    id: "doc-9",
    studentId: "stu-1",
    title: "Common App Personal Essay",
    type: "ps",
    writerId: "u-chen",
    status: "drafting",
    submissionId: "sub-1c",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-10-25",
    brief: "Common App \u4E3B\u6587\u4E66\uFF08IU \u5927\u5B66\u90E8\u5206\uFF09\u3002\u53EF\u53C2\u8003 UCAS \u7248\u672C\u7D20\u6750\uFF0C\u4F46\u9700\u6309\u7F8E\u56FD\u672C\u79D1\u6587\u4E66\u91CD\u5199\u3002",
    wordLimit: "650 \u8BCD",
    currentVersionId: "v-9-1"
  }, {
    id: "doc-5",
    studentId: "stu-2",
    title: "UCAS Personal Statement",
    type: "ps",
    writerId: "u-sun",
    status: "drafting",
    submissionId: "sub-2u",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-11-10",
    brief: "UCAS Conservatoires\uFF08Leeds MA\uFF09\u3002",
    wordLimit: "4000 \u5B57\u7B26",
    currentVersionId: null
  }, {
    id: "doc-6",
    studentId: "stu-2",
    title: "Guildhall \u4F5C\u54C1\u96C6\u8BF4\u660E Artist Statement",
    type: "artist_statement",
    writerId: "u-sun",
    status: "advisor_review",
    submissionId: null,
    applicationIds: ["app-5"],
    needStudentConfirm: !0,
    dueDate: "2026-11-20",
    brief: "",
    wordLimit: "600 \u8BCD",
    currentVersionId: "v-6-1"
  }, {
    id: "doc-7",
    studentId: "stu-3",
    title: "UCAS Conservatoires Personal Statement",
    type: "ps",
    writerId: "u-chen",
    status: "final",
    submissionId: "sub-3u",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-09-20",
    brief: "",
    wordLimit: "4000 \u5B57\u7B26",
    currentVersionId: "v-7-2"
  }, {
    id: "doc-11",
    studentId: "stu-3",
    title: "UCAS Undergraduate Personal Statement",
    type: "ps",
    writerId: "u-chen",
    status: "final",
    submissionId: "sub-3ug",
    applicationIds: [],
    needStudentConfirm: !0,
    dueDate: "2026-10-05",
    brief: "UCAS Undergraduate \u4E0E Conservatoires \u662F\u4E24\u4E2A\u7CFB\u7EDF\uFF0C\u9700\u5404\u63D0\u4EA4\u4E00\u4EFD\u3002",
    wordLimit: "4000 \u5B57\u7B26",
    currentVersionId: "v-11-1"
  }, {
    id: "doc-8",
    studentId: "stu-3",
    title: "Leeds \u8865\u5145\u95EE\u7B54 Short Answers",
    type: "supplemental",
    writerId: "u-chen",
    status: "revising",
    submissionId: null,
    applicationIds: ["app-8"],
    needStudentConfirm: !1,
    dueDate: "2026-10-30",
    brief: "\u9762\u8BD5\u524D\u63D0\u4EA4\u7684 3 \u4E2A\u77ED\u95EE\u7B54\u3002",
    wordLimit: "",
    currentVersionId: "v-8-1"
  }],
  versions: [{
    id: "v-1-1",
    documentId: "doc-1",
    no: 1,
    link: "https://onedrive.example.com/Lin_PS_V1.docx",
    fileName: "Lin_PS_V1.docx",
    note: "\u521D\u7A3F",
    createdBy: "u-chen",
    createdAt: "2026-08-20T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-1-2",
    documentId: "doc-1",
    no: 2,
    link: "https://onedrive.example.com/Lin_PS_V2.docx",
    fileName: "Lin_PS_V2.docx",
    note: "\u6309\u987E\u95EE\u610F\u89C1\u91CD\u5199\u5F00\u5934",
    createdBy: "u-chen",
    createdAt: "2026-09-02T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-1-3",
    documentId: "doc-1",
    no: 3,
    link: "https://onedrive.example.com/Lin_PS_V3.docx",
    fileName: "Lin_PS_V3.docx",
    note: "\u6309\u4E3B\u7BA1\u610F\u89C1\u538B\u7F29\u81F3 3900 \u5B57\u7B26",
    createdBy: "u-chen",
    createdAt: "2026-09-12T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-2-1",
    documentId: "doc-2",
    no: 1,
    link: "https://onedrive.example.com/Lin_GSMD_PS_V1.docx",
    fileName: "Lin_GSMD_PS_V1.docx",
    note: "\u57FA\u4E8E UCAS \u7248\u672C\u6539\u5199",
    createdBy: "u-chen",
    createdAt: "2026-09-14T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-3-1",
    documentId: "doc-3",
    no: 1,
    link: "https://onedrive.example.com/Lin_CV_V1.pdf",
    fileName: "Lin_CV_V1.pdf",
    note: "\u521D\u7248",
    createdBy: "u-chen",
    createdAt: "2026-10-15T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-3-2",
    documentId: "doc-3",
    no: 2,
    link: "https://onedrive.example.com/Lin_CV_V2.pdf",
    fileName: "Lin_CV_V2.pdf",
    note: "\u8865\u5145 2025 \u6BD4\u8D5B\u4E0E\u5927\u5E08\u8BFE\u7ECF\u5386",
    createdBy: "u-chen",
    createdAt: "2026-10-19T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-4-1",
    documentId: "doc-4",
    no: 1,
    link: "https://onedrive.example.com/Lin_RNCM_Note_V1.docx",
    fileName: "Lin_RNCM_Note_V1.docx",
    note: "\u521D\u7A3F",
    createdBy: "u-chen",
    createdAt: "2026-10-14T02:00:00.000Z",
    studentId: "stu-1",
    kind: "file"
  }, {
    id: "v-4-2",
    documentId: "doc-4",
    no: 2,
    note: "\u7F29\u77ED Debussy \u6BB5\u843D",
    createdBy: "u-chen",
    createdAt: "2026-10-20T02:00:00.000Z",
    studentId: "stu-1",
    kind: "text",
    text: `Programme Note

J. S. Bach \u2013 Prelude and Fugue in C-sharp minor, BWV 849
The five-voice fugue is one of the most solemn pieces in Book I. I aim to let each entry of the subject sing through the texture, shaping the long arch towards the final stretto.

C. Debussy \u2013 La soir\xE9e dans Grenade
A habanera rhythm runs underneath shimmering harmonies. I try to keep the pedal light so that the guitar-like figures stay clear.

F. Chopin \u2013 Ballade No. 1 in G minor, Op. 23
The ballade tells a story without words. My interpretation focuses on the contrast between the hesitant opening and the stormy coda.`,
    words: 105
  }, {
    id: "v-9-1",
    documentId: "doc-9",
    no: 1,
    note: "\u5728\u7EBF\u521D\u7A3F\uFF08\u672A\u9001\u5BA1\uFF09",
    createdBy: "u-chen",
    createdAt: "2026-10-21T02:00:00.000Z",
    studentId: "stu-1",
    kind: "text",
    text: `The first time I heard Chopin's First Ballade live, I was six years old ... (demo text, Common App draft)

Growing up in Shanghai, the piano was the place where I learned to listen ...`,
    words: 33
  }, {
    id: "v-6-1",
    documentId: "doc-6",
    no: 1,
    link: "https://onedrive.example.com/Zhou_Artist_Statement_V1.docx",
    fileName: "Zhou_Artist_Statement_V1.docx",
    note: "\u521D\u7A3F\uFF0C\u542B\u4E09\u9996\u4F5C\u54C1\u8BF4\u660E",
    createdBy: "u-sun",
    createdAt: "2026-10-21T02:00:00.000Z",
    studentId: "stu-2",
    kind: "file"
  }, {
    id: "v-7-1",
    documentId: "doc-7",
    no: 1,
    link: "https://onedrive.example.com/Xu_PS_V1.docx",
    fileName: "Xu_PS_V1.docx",
    note: "\u521D\u7A3F",
    createdBy: "u-chen",
    createdAt: "2026-09-05T02:00:00.000Z",
    studentId: "stu-3",
    kind: "file"
  }, {
    id: "v-7-2",
    documentId: "doc-7",
    no: 2,
    link: "https://onedrive.example.com/Xu_PS_V2.docx",
    fileName: "Xu_PS_V2.docx",
    note: "\u5B9A\u7A3F\u7248",
    createdBy: "u-chen",
    createdAt: "2026-09-15T02:00:00.000Z",
    studentId: "stu-3",
    kind: "file"
  }, {
    id: "v-11-1",
    documentId: "doc-11",
    no: 1,
    link: "https://onedrive.example.com/Xu_UCAS_UG_PS_V1.docx",
    fileName: "Xu_UCAS_UG_PS_V1.docx",
    note: "\u57FA\u4E8E Conservatoires \u7248\u672C\u6539\u5199",
    createdBy: "u-chen",
    createdAt: "2026-10-01T02:00:00.000Z",
    studentId: "stu-3",
    kind: "file"
  }, {
    id: "v-8-1",
    documentId: "doc-8",
    no: 1,
    note: "\u521D\u7A3F",
    createdBy: "u-chen",
    createdAt: "2026-10-18T02:00:00.000Z",
    studentId: "stu-3",
    kind: "text",
    text: `Q1. Why Leeds Conservatoire?
I want to study in a city with a lively independent music scene ...

Q2. Describe a performance that changed you.
Last summer I sang at a small charity concert ...

Q3. What will you bring to the course?
I write my own songs in Chinese and English ...`,
    words: 50
  }],
  reviews: [{
    id: "r-1",
    documentId: "doc-1",
    versionId: "v-1-1",
    stage: "advisor",
    userId: "u-li",
    decision: "changes",
    comment: "\u5F00\u5934\u592A\u50CF\u7B80\u5386\u7F57\u5217\uFF0C\u8BF7\u4ECE\u4E00\u6B21\u5177\u4F53\u7684\u6F14\u594F\u7ECF\u5386\u5207\u5165\u3002",
    createdAt: "2026-08-24T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-2",
    documentId: "doc-1",
    versionId: "v-1-2",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "\u7ED3\u6784\u6E05\u695A\uFF0C\u53EF\u4EE5\u7ED9\u4E3B\u7BA1\u3002",
    createdAt: "2026-09-04T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-3",
    documentId: "doc-1",
    versionId: "v-1-2",
    stage: "supervisor",
    userId: "u-sup",
    decision: "changes",
    comment: "\u8D85\u51FA 4000 \u5B57\u7B26\uFF0C\u672A\u6765\u89C4\u5212\u90E8\u5206\u538B\u7F29\u3002",
    createdAt: "2026-09-06T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-4",
    documentId: "doc-1",
    versionId: "v-1-3",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-13T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-5",
    documentId: "doc-1",
    versionId: "v-1-3",
    stage: "supervisor",
    userId: "u-sup",
    decision: "approve",
    comment: "\u5B9A\u7A3F\u3002",
    createdAt: "2026-09-14T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-6",
    documentId: "doc-1",
    versionId: "v-1-3",
    stage: "student",
    userId: "u-s1",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-15T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-7",
    documentId: "doc-2",
    versionId: "v-2-1",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-15T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-8",
    documentId: "doc-2",
    versionId: "v-2-1",
    stage: "supervisor",
    userId: "u-sup",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-16T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-9",
    documentId: "doc-2",
    versionId: "v-2-1",
    stage: "student",
    userId: "u-s1",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-17T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-10",
    documentId: "doc-3",
    versionId: "v-3-1",
    stage: "advisor",
    userId: "u-li",
    decision: "changes",
    comment: "\u7F3A\u5C11 2025 \u5E74\u7684\u6BD4\u8D5B\u548C\u5927\u5E08\u8BFE\u3002",
    createdAt: "2026-10-16T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-11",
    documentId: "doc-3",
    versionId: "v-3-2",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-10-20T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-12",
    documentId: "doc-3",
    versionId: "v-3-2",
    stage: "supervisor",
    userId: "u-sup",
    decision: "approve",
    comment: "\u53EF\u4EE5\u53D1\u7ED9\u5B66\u751F\u786E\u8BA4\u3002",
    createdAt: "2026-10-21T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-13",
    documentId: "doc-4",
    versionId: "v-4-1",
    stage: "advisor",
    userId: "u-li",
    decision: "changes",
    comment: "Debussy \u6BB5\u843D\u592A\u957F\uFF0C\u4E09\u9996\u7BC7\u5E45\u8981\u5747\u8861\u3002",
    createdAt: "2026-10-16T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-14",
    documentId: "doc-4",
    versionId: "v-4-2",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-10-21T07:00:00.000Z",
    studentId: "stu-1"
  }, {
    id: "r-15",
    documentId: "doc-7",
    versionId: "v-7-2",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-16T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-16",
    documentId: "doc-7",
    versionId: "v-7-2",
    stage: "supervisor",
    userId: "u-sup",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-17T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-17",
    documentId: "doc-7",
    versionId: "v-7-2",
    stage: "student",
    userId: "u-s3",
    decision: "approve",
    comment: "",
    createdAt: "2026-09-18T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-19",
    documentId: "doc-11",
    versionId: "v-11-1",
    stage: "advisor",
    userId: "u-li",
    decision: "approve",
    comment: "",
    createdAt: "2026-10-02T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-20",
    documentId: "doc-11",
    versionId: "v-11-1",
    stage: "supervisor",
    userId: "u-sup",
    decision: "approve",
    comment: "",
    createdAt: "2026-10-03T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-21",
    documentId: "doc-11",
    versionId: "v-11-1",
    stage: "student",
    userId: "u-s3",
    decision: "approve",
    comment: "",
    createdAt: "2026-10-04T07:00:00.000Z",
    studentId: "stu-3"
  }, {
    id: "r-18",
    documentId: "doc-8",
    versionId: "v-8-1",
    stage: "advisor",
    userId: "u-li",
    decision: "changes",
    comment: "\u7B2C\u4E8C\u9898\u6CA1\u6709\u56DE\u7B54\u201C\u4E3A\u4EC0\u4E48\u9009\u62E9 Leeds\u201D\uFF0C\u8BF7\u7ED3\u5408\u8BBF\u8C08\u8865\u5145\u3002",
    createdAt: "2026-10-21T07:00:00.000Z",
    studentId: "stu-3"
  }],
  materials: [{
    id: "m-1",
    studentId: "stu-1",
    kind: "passport",
    title: "\u62A4\u7167\u626B\u63CF\u4EF6",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_passport.pdf",
      fileName: "Lin_passport.pdf",
      note: "",
      by: "u-li",
      at: "2026-08-01T02:00:00.000Z"
    }],
    applicationIds: [],
    roundIds: [],
    feedback: [],
    note: "\u901A\u8FC7\u5B89\u5168\u6E20\u9053\u63A5\u6536"
  }, {
    id: "m-2",
    studentId: "stu-1",
    kind: "transcript",
    title: "\u9AD8\u4E2D\u6210\u7EE9\u5355\u53CA\u82F1\u6587\u7FFB\u8BD1",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_transcript_EN.pdf",
      fileName: "Lin_transcript_EN.pdf",
      note: "\u5B66\u6821\u76D6\u7AE0\u7248",
      by: "u-li",
      at: "2026-08-10T02:00:00.000Z"
    }],
    applicationIds: [],
    roundIds: [],
    feedback: [],
    note: ""
  }, {
    id: "m-3",
    studentId: "stu-1",
    kind: "language",
    title: "IELTS \u6210\u7EE9\u5355\uFF086.0\uFF09",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_IELTS.pdf",
      fileName: "Lin_IELTS.pdf",
      note: "",
      by: "u-li",
      at: "2026-08-28T02:00:00.000Z"
    }],
    applicationIds: [],
    roundIds: [],
    feedback: [],
    note: ""
  }, {
    id: "m-4",
    studentId: "stu-1",
    kind: "video",
    title: "RCM \u9884\u5BA1\u5F55\u50CF",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_RCM_pre_V1.mp4",
      fileName: "Lin_RCM_pre_V1.mp4",
      note: "\u9996\u6B21\u5F55\u5236",
      by: "u-li",
      at: "2026-09-10T02:00:00.000Z"
    }, {
      no: 2,
      link: "https://onedrive.example.com/Lin_RCM_pre_V2.mp4",
      fileName: "Lin_RCM_pre_V2.mp4",
      note: "\u91CD\u5F55 Chopin",
      by: "u-li",
      at: "2026-09-20T02:00:00.000Z"
    }],
    applicationIds: ["app-1"],
    roundIds: ["rd-1a"],
    feedback: [{
      id: "fb-1",
      source: "\u4E13\u4E1A\u8001\u5E08",
      author: "\u5F20\u8001\u5E08",
      verdict: "changes",
      text: "Chopin \u5C3E\u58F0\u901F\u5EA6\u8FC7\u5FEB\uFF0C\u6536\u97F3\u6709\u7206\u97F3\uFF0C\u5EFA\u8BAE\u91CD\u5F55\u3002",
      versionNo: 1,
      by: "u-li",
      at: "2026-09-12T08:00:00.000Z"
    }, {
      id: "fb-2",
      source: "\u4E13\u4E1A\u8001\u5E08",
      author: "\u5F20\u8001\u5E08",
      verdict: "approve",
      text: "\u53EF\u4EE5\u63D0\u4EA4\u3002",
      versionNo: 2,
      by: "u-li",
      at: "2026-09-21T08:00:00.000Z"
    }],
    note: ""
  }, {
    id: "m-4b",
    studentId: "stu-1",
    kind: "video",
    title: "RAM \u9884\u5BA1\u5F55\u50CF",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_RAM_pre_V1.mp4",
      fileName: "Lin_RAM_pre_V1.mp4",
      note: "RAM \u8981\u6C42\u542B\u4E00\u9996\u5DF4\u6D1B\u514B\u4F5C\u54C1\uFF0C\u66F2\u76EE\u4E0E RCM \u4E0D\u540C",
      by: "u-li",
      at: "2026-09-22T02:00:00.000Z"
    }],
    applicationIds: ["app-2"],
    roundIds: ["rd-2a"],
    feedback: [{
      id: "fb-4",
      source: "\u4E13\u4E1A\u8001\u5E08",
      author: "\u5F20\u8001\u5E08",
      verdict: "approve",
      text: "\u5DF4\u8D6B\u58F0\u90E8\u6E05\u695A\uFF0C\u53EF\u4EE5\u63D0\u4EA4\u3002",
      versionNo: 1,
      by: "u-li",
      at: "2026-09-24T08:00:00.000Z"
    }],
    note: ""
  }, {
    id: "m-5",
    studentId: "stu-1",
    kind: "video",
    title: "RNCM \u5F55\u50CF\u8003\u8BD5\u89C6\u9891",
    status: "review",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_RNCM_V1.mp4",
      fileName: "Lin_RNCM_V1.mp4",
      note: "",
      by: "u-li",
      at: "2026-10-12T02:00:00.000Z"
    }, {
      no: 2,
      link: "https://onedrive.example.com/Lin_RNCM_V2.mp4",
      fileName: "Lin_RNCM_V2.mp4",
      note: "\u6362\u4E86\u5F55\u97F3\u68DA\u91CD\u5F55",
      by: "u-li",
      at: "2026-10-21T02:00:00.000Z"
    }],
    applicationIds: ["app-3"],
    roundIds: ["rd-3a"],
    feedback: [{
      id: "fb-3",
      source: "\u4E13\u4E1A\u8001\u5E08",
      author: "\u5F20\u8001\u5E08",
      verdict: "changes",
      text: "Bach \u8D4B\u683C\u58F0\u90E8\u4E0D\u591F\u6E05\u695A\uFF1BDebussy \u7B2C\u4E8C\u9996\u8E0F\u677F\u8FC7\u591A\u3002",
      versionNo: 1,
      by: "u-li",
      at: "2026-10-14T08:00:00.000Z"
    }],
    note: ""
  }, {
    id: "m-6",
    studentId: "stu-1",
    kind: "repertoire_list",
    title: "\u66F2\u76EE\u5355\uFF08\u5404\u6821\uFF09",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Lin_repertoire.docx",
      fileName: "Lin_repertoire.docx",
      note: "",
      by: "u-li",
      at: "2026-09-05T02:00:00.000Z"
    }],
    applicationIds: ["app-1", "app-2", "app-3", "app-4"],
    roundIds: [],
    feedback: [],
    note: ""
  }, {
    id: "m-7",
    studentId: "stu-2",
    kind: "portfolio",
    title: "\u4F5C\u54C1\u96C6\uFF083 \u9996\u539F\u521B\u5236\u4F5C\uFF09",
    status: "collecting",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Zhou_portfolio_draft/",
      fileName: "Zhou_portfolio_draft/",
      note: "\u4E24\u9996\u5DF2\u5B8C\u6210\u6DF7\u97F3",
      by: "u-zhao",
      at: "2026-10-18T02:00:00.000Z"
    }],
    applicationIds: ["app-5", "app-6"],
    roundIds: ["rd-5a", "rd-6a"],
    feedback: [],
    note: ""
  }, {
    id: "m-8",
    studentId: "stu-2",
    kind: "transcript",
    title: "\u672C\u79D1\u6210\u7EE9\u5355\uFF08\u4E2D\u82F1\u6587\uFF09",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Zhou_transcript.pdf",
      fileName: "Zhou_transcript.pdf",
      note: "",
      by: "u-zhao",
      at: "2026-09-20T02:00:00.000Z"
    }],
    applicationIds: [],
    roundIds: [],
    feedback: [],
    note: ""
  }, {
    id: "m-9",
    studentId: "stu-3",
    kind: "video",
    title: "RNCM \u6F14\u5531\u5F55\u50CF",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Xu_RNCM.mp4",
      fileName: "Xu_RNCM.mp4",
      note: "",
      by: "u-li",
      at: "2026-09-22T02:00:00.000Z"
    }],
    applicationIds: ["app-7"],
    roundIds: ["rd-7a"],
    feedback: [],
    note: ""
  }, {
    id: "m-10",
    studentId: "stu-3",
    kind: "language",
    title: "IELTS \u6210\u7EE9\u5355\uFF085.5\uFF09",
    status: "approved",
    versions: [{
      no: 1,
      link: "https://onedrive.example.com/Xu_IELTS.pdf",
      fileName: "Xu_IELTS.pdf",
      note: "",
      by: "u-li",
      at: "2026-07-20T02:00:00.000Z"
    }],
    applicationIds: [],
    roundIds: [],
    feedback: [],
    note: ""
  }],
  repertoire: [{
    id: "rp-1",
    studentId: "stu-1",
    composer: "F. Chopin",
    title: "Ballade No. 1 in G minor, Op. 23",
    duration: "9:30",
    applicationIds: ["app-1", "app-4", "app-9"],
    round: "\u9884\u5BA1 / \u73B0\u573A",
    status: "recorded",
    note: ""
  }, {
    id: "rp-2",
    studentId: "stu-1",
    composer: "L. van Beethoven",
    title: "Sonata Op. 57 \u201CAppassionata\u201D, I.",
    duration: "10:00",
    applicationIds: ["app-1", "app-4"],
    round: "\u73B0\u573A\u8003\u8BD5",
    status: "ready",
    note: ""
  }, {
    id: "rp-5",
    studentId: "stu-1",
    composer: "J. S. Bach",
    title: "Partita No. 2, BWV 826: Sinfonia",
    duration: "4:30",
    applicationIds: ["app-2"],
    round: "RAM \u9884\u5BA1",
    status: "recorded",
    note: "RAM \u8981\u6C42\u5DF4\u6D1B\u514B\u4F5C\u54C1"
  }, {
    id: "rp-3",
    studentId: "stu-1",
    composer: "J. S. Bach",
    title: "Prelude & Fugue in C\u266F minor, BWV 849",
    duration: "6:40",
    applicationIds: ["app-3"],
    round: "RNCM \u5F55\u50CF",
    status: "recorded",
    note: ""
  }, {
    id: "rp-4",
    studentId: "stu-1",
    composer: "C. Debussy",
    title: "Estampes: II. La soir\xE9e dans Grenade",
    duration: "5:20",
    applicationIds: ["app-3"],
    round: "RNCM \u5F55\u50CF",
    status: "practicing",
    note: "\u8001\u5E08\u5EFA\u8BAE\u51CF\u5C11\u8E0F\u677F"
  }],
  recommenders: [{
    id: "rc-1",
    studentId: "stu-1",
    name: "\u738B\u8001\u5E08",
    title: "\u94A2\u7434\u4E3B\u8BFE\u8001\u5E08",
    phone: "\u5FAE\u4FE1 wang_demo",
    email: "teacher.wang@example.com",
    address: "",
    course: "\u94A2\u7434",
    duration: "\u56DB\u5E74",
    relation: "\u4E3B\u8BFE\u8001\u5E08",
    bio: "\u6BD5\u4E1A\u4E8E\u67D0\u97F3\u4E50\u5B66\u9662\uFF0C\u66FE\u5728\u5FB7\u56FD\u8BBF\u5B66\u3002",
    note: "",
    fromIntake: !0
  }, {
    id: "rc-4",
    studentId: "stu-1",
    name: "\u5218\u8001\u5E08",
    title: "\u6570\u5B66\u8001\u5E08 / \u5E74\u7EA7\u4E3B\u4EFB",
    phone: "",
    email: "liu.math@example.com",
    address: "",
    course: "\u6570\u5B66",
    duration: "\u4E24\u5E74",
    relation: "\u9AD8\u4E2D\u4EFB\u8BFE\u8001\u5E08",
    bio: "",
    note: "",
    fromIntake: !0
  }, {
    id: "rc-2",
    studentId: "stu-2",
    name: "Prof. Liu",
    title: "\u5F55\u97F3\u827A\u672F\u7CFB\u526F\u6559\u6388",
    phone: "",
    email: "liu@example.edu",
    address: "",
    course: "\u6DF7\u97F3\u4E0E\u6BCD\u5E26",
    duration: "\u4E09\u5E74",
    relation: "\u6BD5\u4E1A\u8BBE\u8BA1\u5BFC\u5E08",
    bio: "",
    note: "",
    fromIntake: !0
  }, {
    id: "rc-3",
    studentId: "stu-3",
    name: "\u4F55\u8001\u5E08",
    title: "\u58F0\u4E50\u8001\u5E08 / \u73ED\u4E3B\u4EFB",
    phone: "",
    email: "he@example.com",
    address: "",
    course: "\u6D41\u884C\u6F14\u5531",
    duration: "\u4E09\u5E74",
    relation: "\u4E3B\u8BFE\u8001\u5E08",
    bio: "",
    note: "",
    fromIntake: !0
  }],
  refRequests: [{
    id: "rq-1",
    recommenderId: "rc-1",
    studentId: "stu-1",
    target: "sub:sub-1u",
    status: "submitted",
    invitedAt: "2026-09-01",
    dueAt: "2026-09-20"
  }, {
    id: "rq-5",
    recommenderId: "rc-1",
    studentId: "stu-1",
    target: "sub:sub-1j",
    status: "not_invited",
    invitedAt: "",
    dueAt: "2026-12-01"
  }, {
    id: "rq-6",
    recommenderId: "rc-4",
    studentId: "stu-1",
    target: "sub:sub-1c",
    status: "invited",
    invitedAt: "2026-10-15",
    dueAt: "2026-11-01"
  }, {
    id: "rq-2",
    recommenderId: "rc-2",
    studentId: "stu-2",
    target: "sub:sub-2u",
    status: "invited",
    invitedAt: "2026-10-15",
    dueAt: "2026-11-20"
  }, {
    id: "rq-3",
    recommenderId: "rc-3",
    studentId: "stu-3",
    target: "sub:sub-3u",
    status: "submitted",
    invitedAt: "2026-09-02",
    dueAt: "2026-09-22"
  }],
  activity: [{
    id: "act-mvoqxpqqec9g",
    studentId: "stu-1",
    applicationId: null,
    userId: "u-li",
    text: "UCAS Conservatoires \u7533\u8BF7\u5DF2\u63D0\u4EA4\uFF08RCM\u3001RAM\u3001RNCM\uFF09",
    at: "2026-09-28T03:00:00.000Z",
    studentVisible: !0
  }, {
    id: "act-mvoqxpqq39zo",
    studentId: "stu-1",
    applicationId: "app-1",
    userId: "u-li",
    text: "RCM \u9884\u5BA1\u901A\u8FC7\uFF0C\u5DF2\u786E\u5B9A 10 \u6708 30 \u65E5\u4E0A\u6D77\u8003\u70B9\u73B0\u573A\u8003\u8BD5",
    at: "2026-10-12T06:00:00.000Z",
    studentVisible: !0
  }, {
    id: "act-mvoqxpqq5f7f",
    studentId: "stu-1",
    applicationId: "app-9",
    userId: "u-li",
    text: "\u6DFB\u52A0\u9662\u6821\u7533\u8BF7\uFF1AIU Jacobs\uFF08\u5927\u5B66\u7533\u8BF7 + \u97F3\u4E50\u5B66\u9662\u7533\u8BF7\u4E24\u90E8\u5206\uFF09",
    at: "2026-10-15T02:00:00.000Z",
    studentVisible: !0
  }, {
    id: "act-mvoqxpqqenm0",
    studentId: "stu-1",
    applicationId: "app-3",
    userId: "u-li",
    text: "RNCM \u5F55\u50CF V2 \u5DF2\u767B\u8BB0\uFF0C\u7B49\u5F85\u4E13\u4E1A\u8001\u5E08\u610F\u89C1",
    at: "2026-10-21T09:00:00.000Z",
    studentVisible: !1
  }, {
    id: "act-mvoqxpqqxeun",
    studentId: "stu-1",
    applicationId: null,
    userId: "u-sup",
    text: "\u97F3\u4E50\u7B80\u5386 CV \u5DF2\u7531\u4E3B\u7BA1\u5B9A\u7A3F\uFF0C\u8BF7\u5B66\u751F\u786E\u8BA4",
    at: "2026-10-21T10:00:00.000Z",
    studentVisible: !0
  }, {
    id: "act-mvoqxpqq88wt",
    studentId: "stu-3",
    applicationId: "app-7",
    userId: "u-li",
    text: "\u6536\u5230 RNCM \u6709\u6761\u4EF6\u5F55\u53D6\uFF08IELTS 6.0\uFF09",
    at: "2026-10-20T01:00:00.000Z",
    studentVisible: !0
  }, {
    id: "act-mvoqxpqqx5ec",
    studentId: "stu-2",
    applicationId: null,
    userId: "u-s2",
    text: "\u5B66\u751F\u66F4\u65B0\u4E86\u57FA\u7840\u4FE1\u606F\u91C7\u96C6\u8868\uFF08\u8054\u7CFB\u7535\u8BDD\u3001\u95EE\u9898 3\uFF09",
    at: "2026-10-21T13:00:00.000Z",
    studentVisible: !1
  }, {
    id: "act-mvoqxpqqybvf",
    studentId: "stu-2",
    applicationId: "app-6",
    userId: "u-zhao",
    text: "\u5DF2\u786E\u8BA4 Leeds MA \u9662\u6821\u8981\u6C42",
    at: "2026-10-10T07:00:00.000Z",
    studentVisible: !0
  }],
  templates: [{
    id: "tpl-docs",
    title: "\u6536\u96C6\u62A4\u7167\u3001\u6210\u7EE9\u5355\u4E0E\u8BED\u8A00\u6210\u7EE9\u5355",
    category: "materials",
    scope: "student",
    cond: "all",
    offset: -35,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-account",
    title: "\u6CE8\u518C\u7533\u8BF7\u5E73\u53F0\u8D26\u53F7\u5E76\u6838\u5BF9\u4E2A\u4EBA\u4FE1\u606F",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: -40,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-ref",
    title: "\u9080\u8BF7\u63A8\u8350\u4EBA\u5E76\u8DDF\u8FDB\u63D0\u4EA4",
    category: "materials",
    scope: "submission",
    cond: "all",
    offset: -21,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-submit",
    title: "\u590D\u6838\u7533\u8BF7\u8868\u5E76\u6B63\u5F0F\u63D0\u4EA4",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: -5,
    effect: "submission:submitted",
    after: ["tpl-account", "tpl-ref", "tpl-docs"],
    active: !0
  }, {
    id: "tpl-received",
    title: "\u786E\u8BA4\u5B66\u6821\u5DF2\u6536\u5230\u7533\u8BF7",
    category: "submission",
    scope: "submission",
    cond: "all",
    offset: 10,
    effect: "submission:received",
    after: ["tpl-submit"],
    active: !0
  }, {
    id: "tpl-rep",
    title: "\u786E\u5B9A\u672C\u6821\u66F2\u76EE / \u4F5C\u54C1\u5E76\u5B89\u6392\u5F55\u5236",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -30,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-teacher",
    title: "\u4E13\u4E1A\u8001\u5E08\u5BA1\u6838\u672C\u6821\u5F55\u50CF / \u4F5C\u54C1\uFF08\u987E\u95EE\u767B\u8BB0\u610F\u89C1\uFF09",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -14,
    effect: "",
    after: ["tpl-rep"],
    active: !0
  }, {
    id: "tpl-upload",
    title: "\u4E0A\u4F20\u672C\u6821\u5F55\u50CF / \u4F5C\u54C1\u96C6",
    category: "audition",
    scope: "application",
    cond: "media",
    offset: -3,
    effect: "round:submitted",
    after: ["tpl-teacher"],
    active: !0
  }, {
    id: "tpl-live",
    title: "\u51C6\u5907\u73B0\u573A / \u7EBF\u4E0A\u8003\u8BD5\uFF08\u884C\u7A0B\u3001\u4F34\u594F\u3001\u5F69\u6392\uFF09",
    category: "audition",
    scope: "application",
    cond: "live",
    offset: -10,
    effect: "",
    after: [],
    active: !0
  }, {
    id: "tpl-offer",
    title: "\u8DDF\u8FDB\u5F55\u53D6\u7ED3\u679C\u4E0E Offer \u6761\u4EF6",
    category: "offer",
    scope: "application",
    cond: "all",
    offset: 75,
    effect: "",
    after: [],
    active: !0
  }]
};
var Dt = new TextEncoder(),
  Me = t => btoa(String.fromCharCode(...new Uint8Array(t))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  Mn = t => Uint8Array.from(atob(t.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((t.length + 3) % 4)), e => e.charCodeAt(0)),
  Ut = 1e5;
function Bt(t) {
  let e = parseInt(t.PBKDF2_ITERATIONS || "", 10);
  e >= 1e4 && e <= 1e5 && (Ut = e);
}
var oe = 12,
  In = 5,
  Ot = 15;
function fe(t = 32) {
  let e = new Uint8Array(t);
  return crypto.getRandomValues(e), Me(e);
}
async function ge(t) {
  return Me(await crypto.subtle.digest("SHA-256", Dt.encode(t)));
}
async function H(t, e, i) {
  let n = i || Ut,
    o = e ? Mn(e) : crypto.getRandomValues(new Uint8Array(16)),
    r = await crypto.subtle.importKey("raw", Dt.encode(t), "PBKDF2", !1, ["deriveBits"]),
    s = await crypto.subtle.deriveBits({
      name: "PBKDF2",
      hash: "SHA-256",
      salt: o,
      iterations: n
    }, r, 256);
  return {
    hash: n + "$" + Me(s),
    salt: Me(o)
  };
}
function Cn(t, e) {
  if (typeof t != "string" || typeof e != "string" || t.length !== e.length) return !1;
  let i = 0;
  for (let n = 0; n < t.length; n++) i |= t.charCodeAt(n) ^ e.charCodeAt(n);
  return i === 0;
}
async function ae(t, e, i) {
  if (!e || !i) return !1;
  let n = parseInt(e.split("$")[0], 10);
  if (!(n >= 1e3)) return !1;
  let o = await H(t, i, n);
  return Cn(o.hash, e);
}
function re(t) {
  return typeof t != "string" || t.length < 8 ? "\u5BC6\u7801\u81F3\u5C11 8 \u4F4D" : t.length > 128 ? "\u5BC6\u7801\u8FC7\u957F" : !/[A-Za-z]/.test(t) || !/[0-9]/.test(t) ? "\u5BC6\u7801\u9700\u540C\u65F6\u5305\u542B\u5B57\u6BCD\u548C\u6570\u5B57" : "";
}
function ee() {
  let t = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz",
    e = "23456789",
    i = t + e,
    n = new Uint32Array(10);
  crypto.getRandomValues(n);
  let o = t[n[0] % t.length] + e[n[1] % e.length];
  for (let r = 2; r < 10; r++) o += i[n[r] % i.length];
  return o.split("").sort(() => .5 - Math.random()).join("");
}
function Xe(t, e) {
  let i = t.headers.get("Cookie") || "";
  for (let n of i.split(";")) {
    let [o, ...r] = n.trim().split("=");
    if (o === e) return r.join("=");
  }
  return "";
}
function Ie(t, e) {
  return `__Host-fq_session=${t}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${e}`;
}
async function Je(t, e, i) {
  let n = fe(),
    o = Date.now();
  return await t.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at, created_at, ip, ua) VALUES (?,?,?,?,?,?)").bind(await ge(n), e, o + oe * 36e5, o, i.headers.get("CF-Connecting-IP") || "", (i.headers.get("User-Agent") || "").slice(0, 200)).run(), n;
}
async function Ce(t, e) {
  let i = Xe(e, "__Host-fq_session");
  if (!i) return null;
  let n = await ge(i),
    o = Date.now(),
    r = await t.DB.prepare("SELECT s.user_id, s.expires_at, u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ?").bind(n).first();
  return !r || r.expires_at < o || !r.active ? null : (r.expires_at - o < oe * 18e5 && (await t.DB.prepare("UPDATE sessions SET expires_at = ? WHERE token_hash = ?").bind(o + oe * 36e5, n).run()), {
    token: i,
    tokenHash: n,
    user: se(r)
  });
}
async function _t(t, e) {
  await t.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(e).run();
}
async function Pe(t, e, i = "") {
  await t.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?").bind(e, i).run();
}
function se(t) {
  return {
    id: t.id,
    name: t.name,
    username: t.username,
    role: t.role,
    studentId: t.student_id || null,
    active: !!t.active,
    mustChange: !!t.must_change,
    lastLogin: t.last_login || null,
    createdAt: t.created_at
  };
}
async function Le(t, e) {
  let i = await t.DB.prepare("SELECT count, locked_until FROM login_attempts WHERE key = ?").bind(e).first();
  return i && i.locked_until > Date.now() ? Math.ceil((i.locked_until - Date.now()) / 6e4) : 0;
}
async function Re(t, e) {
  let i = Date.now(),
    n = await t.DB.prepare("SELECT count, updated_at FROM login_attempts WHERE key = ?").bind(e).first(),
    o = n && i - n.updated_at < Ot * 6e4 ? n.count + 1 : 1,
    r = o >= In ? i + Ot * 6e4 : 0;
  await t.DB.prepare("INSERT INTO login_attempts (key, count, locked_until, updated_at) VALUES (?,?,?,?) ON CONFLICT(key) DO UPDATE SET count = excluded.count, locked_until = excluded.locked_until, updated_at = excluded.updated_at").bind(e, r ? 0 : o, r, i).run();
}
async function Oe(t, e) {
  await t.DB.prepare("DELETE FROM login_attempts WHERE key = ?").bind(e).run();
}
var we = ["students", "applications", "submissions", "rounds", "tasks", "documents", "versions", "reviews", "materials", "repertoire", "recommenders", "refRequests", "activity", "templates"],
  Pn = ["supervisor", "advisor", "writer"],
  ve = t => Pn.includes(t.role);
function Ln(t) {
  let e = String(t || "");
  return (e.match(/[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:['’-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*/g) || []).length + (e.match(/[㐀-鿿豈-﫿぀-ヿ가-힯]/g) || []).length;
}
async function de(t, e) {
  let i = (await t.DB.prepare("SELECT data FROM records WHERE tbl = 'students'").all()).results.map(s => JSON.parse(s.data)),
    n = Object.fromEntries(i.map(s => [s.id, s])),
    o = [],
    r = [];
  if (e.role === "supervisor") o = i.map(s => s.id), r = o;else if (e.role === "advisor") o = i.filter(s => s.advisorId === e.id).map(s => s.id), r = o;else if (e.role === "writer") {
    let s = (await t.DB.prepare("SELECT student_id FROM records WHERE tbl = 'documents' AND json_extract(data, '$.writerId') = ?").bind(e.id).all()).results.map(a => a.student_id);
    o = i.filter(a => (a.writerIds || []).includes(e.id) || s.includes(a.id)).map(a => a.id);
  } else e.role === "student" && e.studentId && n[e.studentId] && (o = [e.studentId]);
  return {
    user: e,
    byId: n,
    visible: new Set(o),
    manage: new Set(r)
  };
}
var $e = (t, e) => t.visible.has(e),
  De = (t, e) => t.manage.has(e),
  Z = (t, e) => {
    let i = Object.assign({}, t);
    for (let n of e) delete i[n];
    return i;
  };
function Be(t, e, i, n = {}) {
  let o = t.user,
    r = o.role === "student";
  if (e === "templates") return ve(o) ? i : null;
  let s = e === "students" ? i.id : i.studentId;
  if (!$e(t, s)) return null;
  if (!r) return e === "students" && o.role === "writer" ? Object.assign({}, i, {
    profile: Z(i.profile || {}, ["accounts"])
  }) : i;
  switch (e) {
    case "students":
      return Z(Object.assign({}, i, {
        profile: Z(i.profile || {}, ["accounts"])
      }), ["skipTpl", "writerIds"]);
    case "applications":
      return Z(i, ["internalDeadline", "skipTpl"]);
    case "submissions":
      return Z(i, ["note", "skipTpl", "account"]);
    case "rounds":
      return Z(i, ["note"]);
    case "documents":
      return Z(i, ["brief"]);
    case "versions":
      {
        let a = n.docs?.[i.documentId];
        return a && ["student_review", "final"].includes(a.status) && a.currentVersionId === i.id ? i : null;
      }
    case "reviews":
      return i.stage === "student" ? i : null;
    case "recommenders":
      return Z(i, ["note"]);
    case "activity":
      return i.studentVisible ? i : null;
    default:
      return null;
  }
}
function Nt(t, e) {
  let i = t.user;
  if (i.role === "supervisor") return e;
  let n = s => ({
    id: s.id,
    name: s.name,
    role: s.role,
    active: s.active,
    studentId: s.role === "student" ? s.studentId : null
  });
  if (ve(i)) return e.filter(s => s.role !== "student" || $e(t, s.studentId)).map(s => s.id === i.id ? s : n(s));
  let o = t.byId[i.studentId] || {},
    r = new Set([i.id, o.advisorId, ...(o.writerIds || [])]);
  return e.filter(s => r.has(s.id)).map(s => s.id === i.id ? s : n(s));
}
var zt = ["title", "type", "submissionId", "applicationIds", "writerId", "dueDate", "brief", "wordLimit", "needStudentConfirm", "archived"],
  xt = (t, e) => JSON.stringify(t ?? null) === JSON.stringify(e ?? null),
  ye = (t, e, i) => i.filter(n => !xt(t?.[n], e?.[n])),
  Ue = (t, e) => [...new Set([...Object.keys(t || {}), ...Object.keys(e || {})])].filter(i => !["updatedAt", "createdAt", "_base"].includes(i));
async function Qe(t, e, i, n, o, r) {
  let s = t.user,
    a = c => ({
      ok: !1,
      error: c || "\u6CA1\u6709\u6743\u9650\u6267\u884C\u8FD9\u4E2A\u64CD\u4F5C"
    });
  if (!we.includes(e)) return a("\u672A\u77E5\u6570\u636E\u7C7B\u578B");
  if (e === "templates") return s.role === "supervisor" ? {
    ok: !0,
    record: o
  } : a("\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u4FEE\u6539\u4EFB\u52A1\u6A21\u677F");
  let d = e === "students" ? n?.id || o?.id : n?.studentId || o?.studentId;
  if (i === "put" && n && e !== "students" && o.studentId !== n.studentId) return a("\u4E0D\u80FD\u628A\u8BB0\u5F55\u79FB\u5230\u5176\u4ED6\u5B66\u751F");
  if (i === "put" && !n && e !== "students" && !t.byId[d]) return a("\u5B66\u751F\u4E0D\u5B58\u5728");
  let p = De(t, d),
    f = s.role === "student" && s.studentId === d,
    u = s.role === "supervisor";
  switch (e) {
    case "students":
      {
        if (i === "delete") return u ? {
          ok: !0
        } : a("\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5220\u9664\u5B66\u751F");
        if (!n) return u ? {
          ok: !0,
          record: o
        } : s.role === "advisor" ? {
          ok: !0,
          record: Object.assign(o, {
            advisorId: s.id,
            writerIds: []
          })
        } : a();
        if (u) return {
          ok: !0,
          record: o
        };
        if (p) return {
          ok: !0,
          record: Object.assign(o, {
            advisorId: n.advisorId,
            writerIds: n.writerIds
          })
        };
        if (f) {
          let c = o.intake || {},
            h = n.intake || {};
          if (!["not_started", "draft", "submitted", "updated", "verified"].includes(c.status)) return a("\u91C7\u96C6\u8868\u72B6\u6001\u65E0\u6548");
          if (c.status === "verified" && h.status !== "verified") return a("\u5B66\u751F\u4E0D\u80FD\u628A\u91C7\u96C6\u8868\u6807\u8BB0\u4E3A\u5DF2\u6838\u5BF9");
          let y = Object.assign({}, c, {
              verifiedAt: h.verifiedAt || null,
              verifiedBy: h.verifiedBy || null
            }),
            w = Object.assign({}, o.profile || {}, {
              accounts: (n.profile || {}).accounts || []
            });
          return {
            ok: !0,
            record: Object.assign({}, n, {
              profile: w,
              intake: y
            })
          };
        }
        return a();
      }
    case "applications":
      return i === "delete" ? u ? {
        ok: !0
      } : a("\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5F7B\u5E95\u5220\u9664\u7533\u8BF7") : p ? {
        ok: !0,
        record: o
      } : a();
    case "submissions":
    case "rounds":
    case "materials":
    case "repertoire":
    case "refRequests":
      return p ? {
        ok: !0,
        record: o
      } : a();
    case "tasks":
      return p ? {
        ok: !0,
        record: o
      } : i === "put" && n && n.assigneeId === s.id ? ye(n, o, Ue(n, o)).filter(h => !["status", "doneAt", "orderOverride"].includes(h)).length ? a("\u4EFB\u52A1\u8D1F\u8D23\u4EBA\u53EA\u80FD\u4FEE\u6539\u4EFB\u52A1\u72B6\u6001") : {
        ok: !0,
        record: o
      } : a();
    case "recommenders": {
      if (!p && (!f || (n && n.fromIntake !== true))) return a('只能编辑自己通过采集表创建的推荐人');
      if (n && (i === 'delete' || f) && await r('refRequestsOf', n.id)) throw new I(409, '该推荐人已有推荐信请求，请先处理关联请求');
      if (p) return {ok: true, record: o};
      return {ok: true, record: i === 'delete' ? null : {...o, fromIntake: true, note: n?.note || ''}};
    }
    case "activity":
      return i === "delete" || n ? a("\u52A8\u6001\u8BB0\u5F55\u4E0D\u80FD\u4FEE\u6539") : $e(t, d) ? {
        ok: !0,
        record: Object.assign(o, {
          userId: s.id,
          at: new Date().toISOString(),
          studentVisible: !!o.studentVisible
        })
      } : a();
    case "versions":
      {
        if (i === "delete" || n) return a("\u6587\u4E66\u7248\u672C\u4FDD\u5B58\u540E\u4E0D\u80FD\u4FEE\u6539\u6216\u5220\u9664");
        let c = await r("documents", o.documentId);
        if (!c || c.studentId !== d) return a("\u6587\u4E66\u4E0D\u5B58\u5728");
        if (c.archived === true) throw new I(409, '文书已归档，请先恢复后操作');
        if (!(c.writerId === s.id || De(t, c.studentId))) return a("\u53EA\u6709\u8D1F\u8D23\u7684\u6587\u4E66\u8001\u5E08\u6216\u987E\u95EE\u53EF\u4EE5\u63D0\u4EA4\u7248\u672C");
        if (!["drafting", "revising"].includes(c.status || 'drafting')) return a("\u6587\u4E66\u5F53\u524D\u4E0D\u5728\u64B0\u5199 / \u4FEE\u6539\u9636\u6BB5");
        let h = Object.assign(o, {
          createdBy: s.id,
          studentId: c.studentId
        });
        if (h.kind === "text") {
          if (typeof h.text !== 'string') throw new I(400, '正文格式不正确');
          h.text = h.text.trim();
          let y = Ln(h.text);
          if (!h.text || y < 1 || y > 1e3 || h.text.length > 2e4) throw new I(400, "\u5728\u7EBF\u6B63\u6587\u9700\u5728 1\u20131000 words \u4E4B\u95F4");
          h.words = y, delete h.link;
        } else {
          if (h.kind = "file", !/^https?:\/\//i.test(h.link || "")) return a("\u6587\u4EF6\u94FE\u63A5\u5FC5\u987B\u4EE5 http:// \u6216 https:// \u5F00\u5934");
          delete h.text;
        }
        return {
          ok: !0,
          record: h
        };
      }
    case "reviews":
      {
        if (i === "delete" || n) return a("\u5BA1\u6838\u8BB0\u5F55\u4E0D\u80FD\u4FEE\u6539\u6216\u5220\u9664");
        let c = await r("documents", o.documentId);
        if (!c || c.studentId !== d) return a("\u6587\u4E66\u4E0D\u5B58\u5728");
        if (o.versionId !== c.currentVersionId) return a('文书版本已经更新，请刷新后审核');
        let h = Object.assign(o, {
          userId: s.id
        });
        delete h.proxy;
        return {
          writer: (c.writerId === s.id || De(t, c.studentId)) && ["drafting", "revising"].includes(c.status) && h.decision === "submit",
          advisor: De(t, c.studentId) && (c.status === "advisor_review" || c.status === "final" && h.decision === "changes"),
          supervisor: u && (c.status === "supervisor_review" || c.status === "final" && h.decision === "changes"),
          student: f && c.status === "student_review" && ["approve", "changes"].includes(h.decision)
        }[h.stage] ? h.decision === "changes" && !String(h.comment || "").trim() ? a("\u9000\u56DE\u4FEE\u6539\u5FC5\u987B\u5199\u660E\u610F\u89C1") : {
          ok: !0,
          record: h
        } : a("\u5F53\u524D\u6587\u4E66\u72B6\u6001\u4E0B\u4F60\u4E0D\u80FD\u63D0\u4EA4\u8FD9\u4E2A\u5BA1\u6838");
      }
    case "documents":
      {
        if (i === "delete") return u ? {
          ok: !0
        } : a();
        if (!n) return p ? {
          ok: !0,
          record: Object.assign(o, {
            status: "drafting",
            currentVersionId: null
          })
        } : a();
        if (f && !p) {
          if (ye(n, o, Ue(n, o)).some(w => !["status", "brief"].includes(w))) return a("\u5B66\u751F\u53EA\u80FD\u786E\u8BA4\u6587\u4E66\u6216\u63D0\u51FA\u4FEE\u6539");
          o = Object.assign({}, n, {
            status: o.status
          });
        }
        if (n.archived === true && (n.status !== o.status || !xt(n.currentVersionId, o.currentVersionId))) throw new I(409, '文书已归档，请先恢复后操作');
        let c = n.writerId === s.id;
        if (ye(n, o, zt).length && !p) return a("\u53EA\u6709\u987E\u95EE\u6216\u4E3B\u7BA1\u53EF\u4EE5\u4FEE\u6539\u6587\u4E66\u7ACB\u9879\u4FE1\u606F");
        if (!xt(n.currentVersionId, o.currentVersionId)) {
          if (!(c || p) || !["drafting", "revising"].includes(n.status)) return a("\u5F53\u524D\u9636\u6BB5\u4E0D\u80FD\u66F4\u6362\u6587\u4E66\u7248\u672C");
          let w = await r("versions", o.currentVersionId);
          if (!w || w.documentId !== n.id) return a("\u7248\u672C\u4E0D\u5B58\u5728");
        }
        if (n.status !== o.status) {
          let w = n.status + ">" + o.status;
          if (!{
            "drafting>advisor_review": c || p,
            "revising>advisor_review": c || p,
            "advisor_review>supervisor_review": p,
            "advisor_review>revising": p,
            "supervisor_review>student_review": u,
            "supervisor_review>final": u,
            "supervisor_review>revising": u,
            "student_review>final": f,
            "student_review>revising": f,
            "final>revising": p
          }[w]) return a("\u4E0D\u5141\u8BB8\u7684\u6587\u4E66\u72B6\u6001\u53D8\u5316");
          if (o.status === "advisor_review" && !o.currentVersionId) return a("\u8BF7\u5148\u63D0\u4EA4\u4E00\u4E2A\u7248\u672C");
          if (o.status === "final" && n.status === "supervisor_review" && n.needStudentConfirm) return a("\u8FD9\u4EFD\u6587\u4E66\u9700\u8981\u5B66\u751F\u786E\u8BA4");
        }
        return ye(n, o, Ue(n, o)).filter(w => !zt.includes(w) && !["status", "currentVersionId"].includes(w)).length && !p || !p && !c && !f || f && ye(n, o, Ue(n, o)).some(w => w !== "status") ? a() : {
          ok: !0,
          record: o
        };
      }
  }
  return a();
}
var ce = [{
  id: "dt-ps",
  title: "\u5B8C\u6210\u4E2A\u4EBA\u9648\u8FF0",
  cat: "\u6587\u4E66",
  offset: -30
}, {
  id: "dt-ref",
  title: "\u9080\u8BF7\u63A8\u8350\u4EBA\u5E76\u8DDF\u8FDB\u63D0\u4EA4",
  cat: "\u6750\u6599",
  offset: -21
}, {
  id: "dt-submit",
  title: "\u590D\u6838\u7533\u8BF7\u8868\u5E76\u6B63\u5F0F\u63D0\u4EA4",
  cat: "\u63D0\u4EA4",
  offset: -5
}, {
  id: "dt-cv",
  title: "\u51C6\u5907\u7B80\u5386 CV",
  cat: "\u6587\u4E66",
  offset: -35
}, {
  id: "dt-lang",
  title: "\u8BED\u8A00\u8003\u8BD5\u62A5\u540D\u4E0E\u9001\u5206",
  cat: "\u6750\u6599",
  offset: -45
}, {
  id: "dt-docs",
  title: "\u6536\u96C6\u62A4\u7167\u3001\u6210\u7EE9\u5355\u4E0E\u8BC1\u660E\u6750\u6599",
  cat: "\u6750\u6599",
  offset: -40
}, {
  id: "dt-account",
  title: "\u6CE8\u518C\u7533\u8BF7\u7CFB\u7EDF\u8D26\u53F7\u5E76\u6838\u5BF9\u4FE1\u606F",
  cat: "\u63D0\u4EA4",
  offset: -45
}, {
  id: "dt-rep",
  title: "\u786E\u5B9A\u672C\u6821\u66F2\u76EE / \u4F5C\u54C1",
  cat: "\u8003\u8BD5",
  offset: -40
}, {
  id: "dt-rec",
  title: "\u5F55\u5236\u9884\u5F55\u50CF",
  cat: "\u8003\u8BD5",
  offset: -14
}, {
  id: "dt-upload",
  title: "\u4E0A\u4F20\u5F55\u50CF / \u4F5C\u54C1\u96C6",
  cat: "\u8003\u8BD5",
  offset: -3
}, {
  id: "dt-live",
  title: "\u51C6\u5907\u73B0\u573A / \u7EBF\u4E0A\u9762\u8BD5\uFF08\u884C\u7A0B\u3001\u4F34\u594F\u3001\u5F69\u6392\uFF09",
  cat: "\u8003\u8BD5",
  offset: 20
}, {
  id: "dt-offer",
  title: "\u8DDF\u8FDB\u5F55\u53D6\u7ED3\u679C\u4E0E Offer \u6761\u4EF6",
  cat: "\u7ED3\u679C",
  offset: 75
}];
var Ht = ["CREATE TABLE IF NOT EXISTS diy_accounts (id TEXT PRIMARY KEY, phone TEXT NOT NULL UNIQUE, name TEXT NOT NULL, pw_hash TEXT, pw_salt TEXT, active INTEGER NOT NULL DEFAULT 1, must_change INTEGER NOT NULL DEFAULT 0, profile TEXT, grants TEXT, requests TEXT, converted_to TEXT, created_at TEXT, last_login TEXT)", "CREATE TABLE IF NOT EXISTS diy_sessions (token_hash TEXT PRIMARY KEY, acct TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER)", "CREATE TABLE IF NOT EXISTS diy_records (tbl TEXT NOT NULL, id TEXT NOT NULL, acct TEXT NOT NULL, data TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (tbl, id))", "CREATE INDEX IF NOT EXISTS diy_records_acct ON diy_records (acct, tbl)"],
  Kt = "__Host-fq_diy",
  ze = 12,
  Gt = ["apps", "tasks", "docs", "mats"],
  On = 300,
  Dn = /^[A-Za-z0-9_-]{2,80}$/,
  Un = /^1\d{10}$/,
  Bn = /^\d{4}-\d{2}-\d{2}$/,
  _n = ["todo", "doing", "done"],
  zn = ["todo", "doing", "done"],
  Nn = ["school", "template", "report", "library", "service"],
  _e = () => new Date().toISOString(),
  U = (t, e) => String(t ?? "").trim().slice(0, e),
  jt = t => Bn.test(String(t || "")) ? String(t) : "",
  Ft = t => {
    let e = U(t, 500);
    return /^https?:\/\//i.test(e) ? e : "";
  },
  xn = t => (String(t || "").match(/[A-Za-z0-9'’-]+|[㐀-鿿]/g) || []).length,
  et = (t, e) => `${Kt}=${t}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${e}`;
function Gn(t) {
  return {
    qr: "",
    freeSchools: (t?.schools || []).slice().sort((i, n) => (i.order || 0) - (n.order || 0)).slice(0, 3).map(i => i.id),
    freeTemplates: ["dt-ps", "dt-ref", "dt-submit"],
    openRegister: !0,
    serviceTitle: "\u67AB\u7434\u82F1\u7F8E\u97F3\u4E50\u7559\u5B66\u7533\u8BF7\u670D\u52A1",
    serviceText: "\u4E13\u5C5E\u987E\u95EE + \u6587\u4E66\u8001\u5E08\u5168\u7A0B\u966A\u8DD1\uFF1A\u9009\u6821\u5B9A\u4F4D\u3001\u6587\u4E66\u9010\u7A3F\u4FEE\u6539\u3001\u66F2\u76EE\u4E0E\u5F55\u50CF\u6307\u5BFC\u3001\u9762\u8BD5\u8F85\u5BFC\u3002"
  };
}
async function nt(t, e) {
  let i = await t.DB.prepare("SELECT value FROM meta WHERE key = 'diy:config'").first();
  return Object.assign(Gn(e), i ? JSON.parse(i.value) : {});
}
var tt = (t, e) => {
  try {
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
};
function it(t) {
  let e = tt(t.profile, {});
  return {
    id: t.id,
    phone: t.phone,
    name: t.name,
    active: !!t.active,
    mustChange: !!t.must_change,
    level: e.level || "PG",
    majorId: e.majorId || "",
    season: e.season || "",
    currentSchool: e.currentSchool || "",
    countries: e.countries || "",
    lang: e.lang || "",
    grants: Object.assign({
      schools: [],
      templates: [],
      report: !1,
      all: !1
    }, tt(t.grants, {})),
    requests: tt(t.requests, []),
    convertedTo: t.converted_to || "",
    createdAt: t.created_at,
    lastLogin: t.last_login
  };
}
var qt = (t, e, i) => !!i && (e.grants.all || t.freeSchools.includes(i) || e.grants.schools.includes(i)),
  jn = (t, e, i) => e.grants.all || t.freeTemplates.includes(i) || e.grants.templates.includes(i);
async function Ne(t, e) {
  let i = Xe(e, Kt);
  if (!i) return null;
  let n = await ge(i),
    o = Date.now(),
    r = await t.DB.prepare("SELECT s.expires_at, a.* FROM diy_sessions s JOIN diy_accounts a ON a.id = s.acct WHERE s.token_hash = ?").bind(n).first();
  return !r || r.expires_at < o || !r.active ? null : (r.expires_at - o < ze * 18e5 && (await t.DB.prepare("UPDATE diy_sessions SET expires_at = ? WHERE token_hash = ?").bind(o + ze * 36e5, n).run()), {
    tokenHash: n,
    acct: it(r)
  });
}
async function Vt(t, e, i, n, o) {
  let {
      json: r,
      HttpError: s,
      body: a,
      audit: d
    } = o,
    p = t.headers.get("CF-Connecting-IP") || "local";
  if (i.startsWith("/diy-admin/")) {
    let l = await o.readSession(e, t);
    if (!l || l.user.role !== "supervisor" || l.user.mustChange) throw new s(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u7BA1\u7406 DIY \u514D\u8D39\u7248");
    return Fn(t, e, i.slice(10), n, l.user, o);
  }
  if (!i.startsWith("/diy/")) return null;
  let f = i.slice(4),
    u = await o.reqdbHead(e),
    c = await nt(e, u);
  if (f === "/status" && n === "GET") return r({
    openRegister: !!c.openRegister,
    majors: (u?.taxonomy?.majors || []).map(l => ({
      id: l.id,
      zh: l.zh,
      en: l.en
    }))
  });
  if (f === "/register" && n === "POST") {
    if (!c.openRegister) throw new s(403, "\u6682\u672A\u5F00\u653E\u6CE8\u518C\uFF0C\u8BF7\u8054\u7CFB\u67AB\u7434\u987E\u95EE");
    let l = "diyreg|" + p,
      v = Date.now(),
      T = await e.DB.prepare("SELECT count, updated_at FROM login_attempts WHERE key = ?").bind(l).first(),
      A = T && v - T.updated_at < 36e5 ? T.count : 0;
    if (A >= 5) throw new s(429, "\u6CE8\u518C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
    let S = await a(t),
      E = U(S.phone, 20);
    if (!Un.test(E)) throw new s(400, "\u8BF7\u8F93\u5165 11 \u4F4D\u624B\u673A\u53F7");
    let m = U(S.name, 40);
    if (!m) throw new s(400, "\u8BF7\u586B\u5199\u59D3\u540D");
    let g = re(S.password);
    if (g) throw new s(400, g);
    if (!S.agree) throw new s(400, "\u8BF7\u5148\u9605\u8BFB\u5E76\u540C\u610F\u7528\u6237\u534F\u8BAE\u4E0E\u9690\u79C1\u653F\u7B56");
    if (await e.DB.prepare("SELECT 1 FROM diy_accounts WHERE phone = ?").bind(E).first()) throw new s(409, "\u8BE5\u624B\u673A\u53F7\u5DF2\u6CE8\u518C\uFF0C\u8BF7\u76F4\u63A5\u767B\u5F55");
    let k = (u?.taxonomy?.majors || []).map(C => C.id),
      M = {
        level: ["UG", "PG"].includes(S.level) ? S.level : "PG",
        majorId: k.includes(S.majorId) ? S.majorId : k[0] || "",
        season: U(S.season, 30)
      },
      P = await H(S.password),
      R = "diy-" + fe(9).replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
    return await e.DB.batch([e.DB.prepare("INSERT INTO diy_accounts (id, phone, name, pw_hash, pw_salt, active, must_change, profile, grants, requests, created_at, last_login) VALUES (?,?,?,?,?,1,0,?,?,?,?,NULL)").bind(R, E, m, P.hash, P.salt, JSON.stringify(M), "{}", "[]", _e()), e.DB.prepare("INSERT INTO login_attempts (key, count, locked_until, updated_at) VALUES (?,?,0,?) ON CONFLICT(key) DO UPDATE SET count = excluded.count, updated_at = excluded.updated_at").bind(l, A + 1, A ? T.updated_at : v)]), await d(e, "diy:" + R, "diy-register", "diy", R, E.slice(0, 3) + "****" + E.slice(-4)), r({
      ok: !0
    });
  }
  if (f === "/login" && n === "POST") {
    let l = await a(t),
      v = U(l.phone, 20),
      T = "diy:" + v + "|" + p,
      A = await Le(e, T);
    if (A) throw new s(429, `\u767B\u5F55\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7 ${A} \u5206\u949F\u540E\u518D\u8BD5`);
    let S = await e.DB.prepare("SELECT * FROM diy_accounts WHERE phone = ?").bind(v).first();
    if (!(S && S.active && (await ae(String(l.password || ""), S.pw_hash, S.pw_salt)))) throw await Re(e, T), new s(401, "\u624B\u673A\u53F7\u6216\u5BC6\u7801\u4E0D\u6B63\u786E");
    await Oe(e, T);
    let m = fe(),
      g = Date.now();
    return await e.DB.batch([e.DB.prepare("DELETE FROM diy_sessions WHERE expires_at < ?").bind(g), e.DB.prepare("INSERT INTO diy_sessions (token_hash, acct, expires_at, created_at) VALUES (?,?,?,?)").bind(await ge(m), S.id, g + ze * 36e5, g), e.DB.prepare("UPDATE diy_accounts SET last_login = ? WHERE id = ?").bind(_e(), S.id)]), r({
      ok: !0
    }, 200, {
      "Set-Cookie": et(m, ze * 3600)
    });
  }
  let h = await Ne(e, t);
  if (!h) throw new s(401, "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55");
  let y = h.acct;
  if (f === "/logout" && n === "POST") return await e.DB.prepare("DELETE FROM diy_sessions WHERE token_hash = ?").bind(h.tokenHash).run(), r({
    ok: !0
  }, 200, {
    "Set-Cookie": et("", 0)
  });
  if (f === "/password" && n === "POST") {
    let l = await a(t),
      v = await e.DB.prepare("SELECT pw_hash, pw_salt FROM diy_accounts WHERE id = ?").bind(y.id).first();
    if (!(await ae(String(l.old || ""), v.pw_hash, v.pw_salt))) throw new s(400, "\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E");
    let T = re(l.new);
    if (T) throw new s(400, T);
    let A = await H(l.new);
    return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET pw_hash = ?, pw_salt = ?, must_change = 0 WHERE id = ?").bind(A.hash, A.salt, y.id), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ? AND token_hash != ?").bind(y.id, h.tokenHash)]), r({
      ok: !0
    });
  }
  if (f === "/bootstrap" && n === "GET") {
    let l = [],
      v = [];
    for (let E of u?.schools || []) if (qt(c, y, E.id)) {
      let m = Object.assign({}, E, {
        open: !0
      });
      delete m.recordCount, l.push(m), v.push(...(await o.reqdbSchool(e, E.id)));
    } else l.push({
      id: E.id,
      abbr: E.abbr,
      en: E.en,
      zh: E.zh,
      country: E.country,
      order: E.order,
      open: !1
    });
    let T = (await e.DB.prepare("SELECT tbl, data FROM diy_records WHERE acct = ?").bind(y.id).all()).results,
      A = Object.fromEntries(Gt.map(E => [E, []]));
    for (let E of T) A[E.tbl] && A[E.tbl].push(JSON.parse(E.data));
    let S = ce.filter(E => jn(c, y, E.id));
    return r({
      me: y,
      data: A,
      templates: S,
      lockedTemplates: ce.length - S.length,
      config: {
        qr: c.qr,
        serviceTitle: c.serviceTitle,
        serviceText: c.serviceText,
        freeSchools: c.freeSchools,
        freeTemplates: c.freeTemplates.filter(E => S.some(m => m.id === E))
      },
      reqdb: {
        taxonomy: u?.taxonomy || {
          majors: [],
          levels: [],
          cats: []
        },
        schools: l,
        records: v
      }
    });
  }
  if (f === "/profile" && n === "POST") {
    let l = await a(t),
      v = (u?.taxonomy?.majors || []).map(S => S.id),
      T = U(l.name, 40);
    if (!T) throw new s(400, "\u8BF7\u586B\u5199\u59D3\u540D");
    let A = {
      level: ["UG", "PG"].includes(l.level) ? l.level : y.level,
      majorId: v.includes(l.majorId) ? l.majorId : y.majorId,
      season: U(l.season, 30),
      currentSchool: U(l.currentSchool, 120),
      countries: U(l.countries, 80),
      lang: U(l.lang, 80)
    };
    return await e.DB.prepare("UPDATE diy_accounts SET name = ?, profile = ? WHERE id = ?").bind(T, JSON.stringify(A), y.id).run(), r({
      ok: !0,
      me: Object.assign(y, A, {
        name: T
      })
    });
  }
  if (f === "/request" && n === "POST") {
    let l = await a(t),
      v = Nn.includes(l.kind) ? l.kind : "library",
      T = v === "school" && (u?.schools || []).some(S => S.id === l.ref) ? l.ref : "";
    return !y.requests.filter(S => !S.done).some(S => S.kind === v && S.ref === T) && y.requests.length < 100 && y.requests.push({
      id: "req-" + fe(6).replace(/[^A-Za-z0-9]/g, ""),
      kind: v,
      ref: T,
      at: _e(),
      done: !1
    }), await e.DB.prepare("UPDATE diy_accounts SET requests = ? WHERE id = ?").bind(JSON.stringify(y.requests), y.id).run(), r({
      ok: !0,
      requests: y.requests
    });
  }
  if (f === "/delete-self" && n === "POST") return await e.DB.batch([e.DB.prepare("DELETE FROM diy_records WHERE acct = ?").bind(y.id), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(y.id), e.DB.prepare("DELETE FROM diy_accounts WHERE id = ?").bind(y.id)]), await d(e, "diy:" + y.id, "diy-delete-self", "diy", y.id, y.name), r({
    ok: !0
  }, 200, {
    "Set-Cookie": et("", 0)
  });
  let w;
  if (w = f.match(/^\/t\/([a-z]+)\/([A-Za-z0-9_-]+)$/)) {
    let [, l, v] = w;
    if (!Gt.includes(l) || !Dn.test(v)) throw new s(400, "\u8BB0\u5F55\u65E0\u6548");
    let T = await e.DB.prepare("SELECT acct FROM diy_records WHERE tbl = ? AND id = ?").bind(l, v).first();
    if (T && T.acct !== y.id) throw new s(403, "\u6CA1\u6709\u6743\u9650");
    if (n === "DELETE") {
      let m = [e.DB.prepare("DELETE FROM diy_records WHERE tbl = ? AND id = ? AND acct = ?").bind(l, v, y.id)];
      return l === "apps" && m.push(e.DB.prepare("DELETE FROM diy_records WHERE tbl = 'tasks' AND acct = ? AND json_extract(data, '$.appId') = ?").bind(y.id, v)), await e.DB.batch(m), r({
        ok: !0
      });
    }
    if (n !== "PUT") throw new s(405, "\u4E0D\u652F\u6301\u7684\u64CD\u4F5C");
    if (!T && (await e.DB.prepare("SELECT COUNT(*) AS n FROM diy_records WHERE acct = ? AND tbl = ?").bind(y.id, l).first()).n >= On) throw new s(400, "\u8BB0\u5F55\u6570\u91CF\u5DF2\u8FBE\u4E0A\u9650");
    let A = await a(t),
      S = _e(),
      E;
    if (l === "apps") {
      let m = U(A.schoolId, 40);
      if (m && !qt(c, y, m)) throw new s(403, "\u8BE5\u9662\u6821\u5C1A\u672A\u5F00\u901A");
      let g = m ? u?.schools?.find(k => k.id === m) : null;
      if (E = {
        id: v,
        acct: y.id,
        schoolId: g ? m : "",
        name: g ? g.en : U(A.name, 120),
        program: U(A.program, 120),
        system: U(A.system, 120),
        deadline: jt(A.deadline),
        stage: Math.max(0, Math.min(5, parseInt(A.stage, 10) || 0)),
        note: U(A.note, 500)
      }, !E.name) throw new s(400, "\u8BF7\u586B\u5199\u9662\u6821\u540D\u79F0");
    } else if (l === "tasks") {
      let m = U(A.appId, 80);
      if (m && !(await e.DB.prepare("SELECT 1 FROM diy_records WHERE tbl = 'apps' AND id = ? AND acct = ?").bind(m, y.id).first()) && (m = ""), E = {
        id: v,
        acct: y.id,
        appId: m,
        title: U(A.title, 200),
        due: jt(A.due),
        status: _n.includes(A.status) ? A.status : "todo",
        src: U(A.src, 40)
      }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u4EFB\u52A1\u540D\u79F0");
    } else if (l === "docs") {
      if (E = {
        id: v,
        acct: y.id,
        title: U(A.title, 120),
        link: Ft(A.link),
        text: String(A.text || "").slice(0, 12e3)
      }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u6807\u9898");
      if (xn(E.text) > 1e3) throw new s(400, "\u6B63\u6587\u8D85\u8FC7 1000 \u8BCD");
    } else if (E = {
      id: v,
      acct: y.id,
      title: U(A.title, 120),
      status: zn.includes(A.status) ? A.status : "todo",
      link: Ft(A.link),
      note: U(A.note, 300)
    }, !E.title) throw new s(400, "\u8BF7\u586B\u5199\u6750\u6599\u540D\u79F0");
    return E.createdAt = U(A.createdAt, 40) || S, E.updatedAt = S, await e.DB.prepare("INSERT INTO diy_records (tbl, id, acct, data, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(tbl, id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at").bind(l, v, y.id, JSON.stringify(E), S).run(), r({
      ok: !0,
      record: E
    });
  }
  throw new s(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
async function Fn(t, e, i, n, o, r) {
  let {
      json: s,
      HttpError: a,
      body: d,
      audit: p
    } = r,
    f = await r.reqdbHead(e);
  if (i === "/state" && n === "GET") {
    let c = await nt(e, f),
      h = (await e.DB.prepare("SELECT * FROM diy_accounts ORDER BY created_at DESC").all()).results.map(it),
      y = (await e.DB.prepare("SELECT tbl, data FROM diy_records WHERE tbl IN ('apps','tasks')").all()).results,
      w = {
        apps: [],
        tasks: []
      };
    for (let l of y) w[l.tbl].push(JSON.parse(l.data));
    return s({
      config: c,
      templates: ce,
      accounts: h,
      data: w
    });
  }
  if (i === "/config" && n === "PUT") {
    let c = await d(t),
      h = await nt(e, f),
      y = new Set((f?.schools || []).map(l => l.id)),
      w = new Set(ce.map(l => l.id));
    if ("qr" in c) {
      let l = String(c.qr || "");
      if (l && !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(l)) throw new a(400, "\u4E8C\u7EF4\u7801\u56FE\u7247\u683C\u5F0F\u4E0D\u5BF9");
      if (l.length > 6e5) throw new a(400, "\u4E8C\u7EF4\u7801\u56FE\u7247\u8BF7\u5C0F\u4E8E 400 KB");
      h.qr = l;
    }
    return Array.isArray(c.freeSchools) && (h.freeSchools = c.freeSchools.filter(l => y.has(l))), Array.isArray(c.freeTemplates) && (h.freeTemplates = c.freeTemplates.filter(l => w.has(l))), "openRegister" in c && (h.openRegister = !!c.openRegister), "serviceTitle" in c && (h.serviceTitle = U(c.serviceTitle, 60) || "\u67AB\u7434\u82F1\u7F8E\u97F3\u4E50\u7559\u5B66\u7533\u8BF7\u670D\u52A1"), "serviceText" in c && (h.serviceText = U(c.serviceText, 300)), await e.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('diy:config', ?)").bind(JSON.stringify(h)).run(), await p(e, o.id, "diy-config"), s({
      ok: !0,
      config: h
    });
  }
  let u;
  if (u = i.match(/^\/accounts\/([A-Za-z0-9_-]+)(?:\/([a-z]+))?$/)) {
    let [, c, h] = u,
      y = await e.DB.prepare("SELECT * FROM diy_accounts WHERE id = ?").bind(c).first();
    if (!y) throw new a(404, "\u627E\u4E0D\u5230\u8BE5 DIY \u5B66\u5458");
    let w = it(y);
    if (h === "grants" && n === "PUT") {
      let l = await d(t),
        v = new Set((f?.schools || []).map(E => E.id)),
        T = new Set(ce.map(E => E.id)),
        A = l.grants || {},
        S = {
          all: !!A.all,
          report: !!A.report,
          schools: (A.schools || []).filter(E => v.has(E)),
          templates: (A.templates || []).filter(E => T.has(E))
        };
      return l.clearReq && w.requests.forEach(E => {
        E.done = !0;
      }), await e.DB.prepare("UPDATE diy_accounts SET grants = ?, requests = ? WHERE id = ?").bind(JSON.stringify(S), JSON.stringify(w.requests), c).run(), await p(e, o.id, "diy-grants", "diy", c, `${w.name}\uFF1A${S.all ? "\u5168\u90E8" : `\u9662\u6821 ${S.schools.length}\uFF0C\u6A21\u677F ${S.templates.length}${S.report ? "\uFF0C\u62A5\u544A" : ""}`}`), s({
        ok: !0
      });
    }
    if (h === "reset" && n === "POST") {
      let l = ee(),
        v = await H(l);
      return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET pw_hash = ?, pw_salt = ?, must_change = 1 WHERE id = ?").bind(v.hash, v.salt, c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)]), await p(e, o.id, "diy-reset", "diy", c, w.name), s({
        ok: !0,
        password: l
      });
    }
    if (h === "active" && n === "POST") {
      let l = await d(t),
        v = [e.DB.prepare("UPDATE diy_accounts SET active = ? WHERE id = ?").bind(l.active ? 1 : 0, c)];
      return l.active || v.push(e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)), await e.DB.batch(v), await p(e, o.id, l.active ? "diy-enable" : "diy-disable", "diy", c, w.name), s({
        ok: !0
      });
    }
    if (h === "converted" && n === "POST") {
      let l = await d(t);
      return await e.DB.batch([e.DB.prepare("UPDATE diy_accounts SET active = 0, converted_to = ? WHERE id = ?").bind(U(l.studentId, 80), c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c)]), await p(e, o.id, "diy-convert", "diy", c, w.name), s({
        ok: !0
      });
    }
    if (!h && n === "DELETE") return await e.DB.batch([e.DB.prepare("DELETE FROM diy_records WHERE acct = ?").bind(c), e.DB.prepare("DELETE FROM diy_sessions WHERE acct = ?").bind(c), e.DB.prepare("DELETE FROM diy_accounts WHERE id = ?").bind(c)]), await p(e, o.id, "diy-delete", "diy", c, w.name), s({
      ok: !0
    });
  }
  throw new a(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
var qn = ["CREATE TABLE IF NOT EXISTS records (tbl TEXT NOT NULL, id TEXT NOT NULL, student_id TEXT, data TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (tbl, id))", "CREATE INDEX IF NOT EXISTS records_student ON records (tbl, student_id)", "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE COLLATE NOCASE, name TEXT NOT NULL, role TEXT NOT NULL, student_id TEXT, active INTEGER NOT NULL DEFAULT 1, pw_hash TEXT, pw_salt TEXT, must_change INTEGER NOT NULL DEFAULT 1, created_at TEXT, updated_at TEXT, last_login TEXT)", "CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER, ip TEXT, ua TEXT)", "CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, count INTEGER, locked_until INTEGER, updated_at INTEGER)", "CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)", "CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT, user_id TEXT, action TEXT, tbl TEXT, rec_id TEXT, detail TEXT)"],
  Wt = new WeakSet();
async function Hn(t) {
  if (!t.DB || !Wt.has(t.DB)) {
    if (!t.DB) throw new I(500, "\u7533\u8BF7\u7CFB\u7EDF\u672A\u7ED1\u5B9A D1 \u6570\u636E\u5E93\uFF08wrangler.toml \u4E2D\u7684 APPLY_DB\uFF09");
    await t.DB.batch([...qn, ...Ht].map(e => t.DB.prepare(e))), Wt.add(t.DB);
  }
}
var I = class extends Error {
    constructor(e, i, n) {
      super(i), this.status = e, this.extra = n;
    }
  },
  ot = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'; object-src 'none'"
  };
function Te(t, e = {}) {
  let i = new Response(t.body, t);
  for (let [n, o] of Object.entries({
    ...ot,
    ...e
  })) i.headers.set(n, o);
  return i;
}
var D = (t, e = 200, i = {}) => new Response(JSON.stringify(t), {
  status: e,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...ot,
    ...i
  }
});
async function X(t) {
  try {
    return await t.json();
  } catch {
    throw new I(400, "\u8BF7\u6C42\u5185\u5BB9\u4E0D\u662F\u6709\u6548\u7684 JSON");
  }
}
var j = () => new Date().toISOString(),
  Kn = /^[A-Za-z0-9_-]{2,80}$/;
async function Vn(t, e, i) {
  if (e.role !== "supervisor") throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5F7B\u5E95\u5220\u9664\u5B66\u751F");
  let n = await ue(t, "students", i);
  if (!n) throw new I(404, "\u5B66\u751F\u4E0D\u5B58\u5728\u6216\u5DF2\u5220\u9664");
  let o = (await t.DB.prepare("SELECT tbl, COUNT(*) AS n FROM records WHERE student_id = ? GROUP BY tbl").bind(i).all()).results,
    r = (await t.DB.prepare("SELECT id FROM users WHERE role = 'student' AND student_id = ?").bind(i).all()).results.map(s => s.id);
  return await t.DB.batch([t.DB.prepare("DELETE FROM records WHERE student_id = ?").bind(i), t.DB.prepare("DELETE FROM records WHERE tbl = 'students' AND id = ?").bind(i), ...r.map(s => t.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(s)), t.DB.prepare("DELETE FROM users WHERE role = 'student' AND student_id = ?").bind(i)]), await N(t, e.id, "student-purge", "students", i, `${n.name || ""}\uFF1A` + o.map(s => `${s.tbl} ${s.n}`).join("\uFF0C") + (r.length ? `\uFF0C\u5B66\u751F\u8D26\u53F7 ${r.length}` : "")), D({
    ok: !0
  });
}
async function N(t, e, i, n = "", o = "", r = "") {
  try {
    await t.DB.prepare("INSERT INTO audit (at, user_id, action, tbl, rec_id, detail) VALUES (?,?,?,?,?,?)").bind(j(), e || "", i, n, o, String(r).slice(0, 500)).run();
  } catch {}
}
async function ue(t, e, i) {
  let n = await t.DB.prepare("SELECT data FROM records WHERE tbl = ? AND id = ?").bind(e, i).first();
  return n ? JSON.parse(n.data) : null;
}
function Yt(t, e, i) {
  return t.DB.prepare("INSERT INTO records (tbl, id, student_id, data, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(tbl, id) DO UPDATE SET student_id = excluded.student_id, data = excluded.data, updated_at = excluded.updated_at").bind(e, i.id, e === "students" ? i.id : i.studentId || null, JSON.stringify(i), i.updatedAt);
}
async function Zt(t) {
  return (await t.DB.prepare("SELECT * FROM users ORDER BY created_at").all()).results.map(se);
}
async function at(t, e) {
  if (!e || !Array.isArray(e.schools) || !Array.isArray(e.records) || !e.taxonomy) throw new I(400, "\u9662\u6821\u5E93\u683C\u5F0F\u4E0D\u5BF9\uFF1A\u9700\u8981 taxonomy\u3001schools\u3001records");
  let n = (await t.DB.prepare("SELECT key FROM meta WHERE key LIKE 'reqdb:school:%'").all()).results.map(r => r.key).map(r => t.DB.prepare("DELETE FROM meta WHERE key = ?").bind(r)),
    o = {};
  for (let r of e.schools) {
    let s = e.records.filter(a => a.school === r.id);
    o[r.id] = s.length, n.push(t.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?,?)").bind("reqdb:school:" + r.id, JSON.stringify(s)));
  }
  n.push(t.DB.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES (?,?)").bind("reqdb:head", JSON.stringify({
    format: e.format,
    version: e.version,
    exportedAt: e.exportedAt,
    taxonomy: e.taxonomy,
    schools: e.schools.map(r => Object.assign({}, r, {
      recordCount: o[r.id] || 0
    }))
  }))), await t.DB.batch(n);
}
async function xe(t) {
  let e = await t.DB.prepare("SELECT value FROM meta WHERE key = 'reqdb:head'").first();
  return e ? JSON.parse(e.value) : null;
}
async function Xt(t) {
  let e = await xe(t);
  if (!e) return null;
  let i = (await t.DB.prepare("SELECT value FROM meta WHERE key LIKE 'reqdb:school:%'").all()).results;
  return {
    format: e.format,
    version: e.version,
    exportedAt: e.exportedAt,
    taxonomy: e.taxonomy,
    schools: e.schools.map(n => {
      let o = Object.assign({}, n);
      return delete o.recordCount, o;
    }),
    records: i.flatMap(n => JSON.parse(n.value))
  };
}
async function rt(t, e, {
  wipe: i = !1
} = {}) {
  let n = [];
  i && n.push(t.DB.prepare("DELETE FROM records"));
  let o = j();
  for (let r of we) for (let s of e[r] || []) s.updatedAt = s.updatedAt || o, s.createdAt = s.createdAt || o, n.push(Yt(t, r, s));
  for (let r = 0; r < n.length; r += 80) await t.DB.batch(n.slice(r, r + 80));
}
async function Jt(t, e) {
  await rt(t, Ze, {
    wipe: !0
  });
  let i = j(),
    n = [],
    o = [t.DB.prepare("DELETE FROM users WHERE id != ?").bind(e || "")];
  for (let r of Ze.users || []) {
    if (r.role === "supervisor" && e) continue;
    let s = ee(),
      a = await H(s);
    n.push({
      name: r.name,
      role: r.role,
      username: r.username,
      password: s
    }), o.push(t.DB.prepare("INSERT OR REPLACE INTO users (id, username, name, role, student_id, active, pw_hash, pw_salt, must_change, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(r.id, r.username, r.name, r.role, r.studentId || null, 1, a.hash, a.salt, 1, i, i));
  }
  return await t.DB.batch(o), e && (await t.DB.prepare(`UPDATE records SET data = REPLACE(data, '"u-sup"', ?) WHERE data LIKE '%"u-sup"%'`).bind(JSON.stringify(e)).run()), n;
}
var $t = {
  async fetch(t, e) {
    let i = new URL(t.url),
      n = i.pathname;
    try {
      Bt(e);
      if ((t.method === 'GET' || t.method === 'HEAD') && ['/login.js','/logo.png'].includes(n)) {
        return Te(await e.ASSETS.fetch(t), {'Cache-Control':'public, max-age=86400'});
      }
      // Anonymous login HTML has no database dependency. Setup/session validation
      // still runs on authenticated requests and all API operations as before.
      if ((t.method === 'GET' || t.method === 'HEAD') && ['/login','/login.html','/embed-login'].includes(n) && !Xe(t,'__Host-fq_session') && !Xe(t,Kt)) return await Wn(t,e,i);
      await Hn(e);
      return n.startsWith('/api/') ? await Yn(t,e,i) : await Wn(t,e,i);
    } catch (o) {
      return o instanceof I ? D(Object.assign({
        error: o.message
      }, o.extra || {}), o.status) : (console.error(o), D({
        error: "\u670D\u52A1\u5668\u9519\u8BEF\uFF1A" + (o.message || o)
      }, 500));
    }
  }
};
// Additive application upgrade. Existing records and authentication stay in place.
async function fqDocumentAction(req, env, user, id, action) {
  const bodyText = await req.text();
  if (bodyText.length > 40000) throw new I(413, '内容过大');
  let b; try { b = JSON.parse(bodyText); } catch { throw new I(400, '请求格式不正确'); }
  if (!b || typeof b !== 'object') throw new I(400, '请求格式不正确');
  const row = await env.DB.prepare("SELECT data FROM records WHERE tbl='documents' AND id=?").bind(id).first();
  if (!row) throw new I(404, '文书不存在');
  const doc = JSON.parse(row.data);
  if (doc.archived) throw new I(409, '文书已归档，请先恢复后操作');
  if (b.versionId !== (doc.currentVersionId || null) || b.base !== doc.updatedAt) throw new I(409, '文书已被更新，请关闭窗口并刷新后查看最新版本');
  const now = new Date(Math.max(Date.now(), (Date.parse(doc.updatedAt) || 0) + 1)).toISOString();
  const next = {...doc, updatedAt:now};
  let record, table;
  if (action === 'revise') {
    if (user.role !== 'supervisor') throw new I(403, '只有申请主管可以在审核阶段修改正文');
    if (!['drafting','revising','advisor_review','supervisor_review','student_review'].includes(doc.status)) throw new I(409, '定稿文书须先重新打开修改');
    const value = String(b.text || '').trim(), words = Ln(value);
    if (!value || words < 1 || value.length > 20000 || words > 1000) throw new I(400, '正文须为 1–1000 words，且不超过 20000 字符');
    const old = doc.currentVersionId ? await ue(env, 'versions', doc.currentVersionId) : null;
    if (old && old.text === value) throw new I(400, '正文与当前版本相同');
    const count = await env.DB.prepare("SELECT MAX(CAST(json_extract(data,'$.no') AS INTEGER)) AS n FROM records WHERE tbl='versions' AND json_extract(data,'$.documentId')=?").bind(id).first();
    table = 'versions';
    record = {id:'v-'+crypto.randomUUID(),documentId:id,studentId:doc.studentId,no:(count?.n || 0)+1,kind:'text',text:value,words,note:String(b.note || '').slice(0,2000),createdBy:user.id,createdAt:now,updatedAt:now};
    next.currentVersionId = record.id;
  } else {
    if (!doc.currentVersionId || !(await ue(env, 'versions', doc.currentVersionId))) throw new I(409, '请先保存文书版本');
    const proxy = action === 'proxy-confirm';
    if (proxy && (user.role !== 'supervisor' || doc.status !== 'student_review')) throw new I(403, '仅主管可在学生确认阶段代确认');
    table = 'reviews';
    record = {id:'r-'+crypto.randomUUID(),documentId:id,studentId:doc.studentId,versionId:doc.currentVersionId,stage:proxy?'student':b.stage,userId:user.id,decision:proxy?'approve':b.decision,comment:String(b.comment || '').slice(0,4000),createdAt:now,updatedAt:now};
    if (proxy) record.proxy = true;
    else {
      if (!['advisor','supervisor','student'].includes(record.stage) || !['approve','changes'].includes(record.decision) || doc.status === 'final') throw new I(400, '审核操作不正确');
      const ctx = await de(env,user);
      const check = await Qe(ctx, 'reviews', 'put', null, record, (tbl,key)=>ue(env,tbl,key));
      if (!check.ok) throw new I(403,check.error);
    }
    next.status = record.decision === 'changes' ? 'revising' : record.stage === 'advisor' ? 'supervisor_review' : record.stage === 'supervisor' && doc.needStudentConfirm ? 'student_review' : 'final';
  }
  // All writes use the identical old document snapshot. A competing write
  // makes every statement a no-op. D1 batch executes them in one transaction.
  const activity={id:'act-'+crypto.randomUUID(),studentId:doc.studentId,applicationId:null,userId:user.id,text:doc.title+(action==='revise'?'：主管修改正文，已保存新版本':action==='proxy-confirm'?'：主管代学生确认定稿':record.decision==='changes'?'：审核退回修改':next.status==='student_review'?'：主管审核通过，请学生确认':next.status==='final'?'：已确认定稿':'：顾问审核通过'),at:now,createdAt:now,updatedAt:now,studentVisible:doc.status==='student_review'||['student_review','final'].includes(next.status)};
  const result = await env.DB.batch([
    env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT 'activity',?,?,?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='documents' AND id=? AND data=?)").bind(activity.id,doc.studentId,JSON.stringify(activity),now,id,row.data),
    env.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='documents' AND id=? AND data=?)").bind(table,record.id,doc.studentId,JSON.stringify(record),now,id,row.data),
    env.DB.prepare("UPDATE records SET data=?,updated_at=? WHERE tbl='documents' AND id=? AND data=?").bind(JSON.stringify(next),now,id,row.data)
  ]);
  if (result[2].meta.changes !== 1) throw new I(409,'文书已被其他人更新，请刷新后重试');
  await N(env,user.id,'document-'+action,'documents',id, `${record.id} / ${doc.currentVersionId || ''}`);
  return D({ok:true,document:next,record});
}

async function Wn(t, e, i) {
  let n = i.pathname,
    o = await Ce(e, t),
    r = a => e.ASSETS.fetch(new Request(new URL(a, i.origin), t)),
    s = o ? null : await Ne(e, t);
  if (n === '/embed-login') {
    let origins;
    try { origins = [new URL(e.SITE_URL).origin]; } catch {
      const base=i.hostname.replace(/^apply\./,'');
      origins=['https://'+base,'https://www.'+base];
    }
    const html = (await (await r('/login.html')).text()).replace('<body>','<body class="fq-embedded"'+(o||s?' data-session-ready="1"':'')+'>');
    const res = Te(new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}}),{'Cache-Control':'no-store','Content-Security-Policy':ot['Content-Security-Policy'].replace("frame-ancestors 'none'","frame-ancestors "+origins.join(' '))});
    res.headers.delete('X-Frame-Options'); return res;
  }
  if (n === "/" || n === "/index.html") {
    if (s) {
      let a = (await (await r("/app/index.html")).text()).replace("<body>", '<body data-diy="1">');
      return Te(new Response(a, {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      }), {
        "Cache-Control": "no-store"
      });
    }
    return o ? Te(await r("/app/index.html"), {
      "Cache-Control": "no-store"
    }) : Response.redirect(i.origin + "/login", 302);
  }
  return n === "/login" || n === "/login.html" ? o || s ? Response.redirect(i.origin + "/", 302) : Te(await r("/login.html"), {
    "Cache-Control": "no-store"
  }) : n.startsWith("/app/") ? !o && !s ? new Response("\u9700\u8981\u767B\u5F55", {
    status: 401,
    headers: ot
  }) : Te(await e.ASSETS.fetch(t), {
    "Cache-Control": "private, no-cache"
  }) : Te(await e.ASSETS.fetch(t), {"Cache-Control":"no-cache"});
}
async function Yn(t, e, i) {
  let n = i.pathname.replace(/^\/api/, ""),
    o = t.method;
  if (o !== "GET" && t.headers.get("X-FQ") !== "1") throw new I(403, "\u8BF7\u6C42\u88AB\u62D2\u7EDD");
  if (n === "/setup-status" && o === "GET") {
    let d = await e.DB.prepare("SELECT COUNT(*) AS n FROM users").first();
    return D({
      needsSetup: !d.n
    });
  }
  if (n === "/setup" && o === "POST") return Zn(t, e);
  if (n === "/login" && o === "POST") return Xn(t, e);
  if (n.startsWith("/diy/") || n.startsWith("/diy-admin/")) return await Vt(t, e, n, o, {
    json: D,
    HttpError: I,
    body: X,
    audit: N,
    readSession: Ce,
    reqdbHead: xe,
    reqdbSchool: async (p, f) => {
      let u = await p.DB.prepare("SELECT value FROM meta WHERE key = ?").bind("reqdb:school:" + f).first();
      return u ? JSON.parse(u.value) : [];
    }
  });
  let r = await Ce(e, t);
  if (!r && n === "/bootstrap" && o === "GET" && (await Ne(e, t))) return D({
    diy: !0,
    me: null,
    users: [],
    data: {},
    reqdb: null
  });
  if (!r) throw new I(401, "\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55");
  let s = r.user;
  if (n === "/logout" && o === "POST") return await _t(e, r.tokenHash), D({
    ok: !0
  }, 200, {
    "Set-Cookie": Ie("", 0)
  });
  if (n === "/me" && o === "GET") return D({
    me: s
  });
  if (n === "/password" && o === "POST") {
    let d = await X(t),
      p = await e.DB.prepare("SELECT pw_hash, pw_salt FROM users WHERE id = ?").bind(s.id).first();
    if (!(await ae(String(d.old || ""), p.pw_hash, p.pw_salt))) throw new I(400, "\u5F53\u524D\u5BC6\u7801\u4E0D\u6B63\u786E");
    let f = re(d.new);
    if (f) throw new I(400, f);
    if (d.new === d.old) throw new I(400, "\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E0E\u5F53\u524D\u5BC6\u7801\u76F8\u540C");
    let u = await H(d.new);
    return await e.DB.prepare("UPDATE users SET pw_hash = ?, pw_salt = ?, must_change = 0, updated_at = ? WHERE id = ?").bind(u.hash, u.salt, j(), s.id).run(), await Pe(e, s.id, r.tokenHash), await N(e, s.id, "password-change"), D({
      ok: !0
    });
  }
  if (s.mustChange) throw new I(403, "\u8BF7\u5148\u4FEE\u6539\u521D\u59CB\u5BC6\u7801", {
    mustChange: !0
  });
  const fqAction = n.match(/^\/documents\/([A-Za-z0-9_-]{2,80})\/(revise|proxy-confirm|review)$/);
  if (fqAction && o === 'POST') return fqDocumentAction(t,e,s,fqAction[1],fqAction[2]);
  if (n === "/bootstrap" && o === "GET") return Jn(e, s);
  let a;
  if ((a = n.match(/^\/reqdb\/school\/([A-Za-z0-9_-]+)$/)) && o === "GET") {
    if (!ve(s)) throw new I(403, "\u6CA1\u6709\u6743\u9650");
    let d = await e.DB.prepare("SELECT value FROM meta WHERE key = ?").bind("reqdb:school:" + a[1]).first();
    return D({
      records: d ? JSON.parse(d.value) : []
    });
  }
  if (n === "/reqdb") {
    if (s.role !== "supervisor") throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5BFC\u5165\u5BFC\u51FA\u9662\u6821\u5E93");
    if (o === "GET") return await N(e, s.id, "reqdb-export"), D((await Xt(e)) || {});
    if (o === "PUT") return await at(e, await X(t)), await N(e, s.id, "reqdb-import"), D({
      ok: !0,
      head: await xe(e)
    });
  }
  if ((a = n.match(/^\/students\/([A-Za-z0-9_-]+)$/)) && o === "DELETE") return Vn(e, s, a[1]);
  if (a = n.match(/^\/t\/([A-Za-z]+)\/([A-Za-z0-9_-]+)$/)) return $n(t, e, s, a[1], a[2], o);
  if (n === "/users" && o === "POST") return Qn(t, e, s);
  if ((a = n.match(/^\/users\/([A-Za-z0-9_-]+)$/)) && o === "PUT") return ei(t, e, s, a[1], r);
  if ((a = n.match(/^\/users\/([A-Za-z0-9_-]+)\/reset$/)) && o === "POST") return ti(e, s, a[1]);
  if (n.startsWith("/admin/")) return ni(t, e, s, n.slice(7), o);
  throw new I(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
async function Zn(t, e) {
  if ((await e.DB.prepare("SELECT COUNT(*) AS n FROM users").first()).n) throw new I(403, "\u7CFB\u7EDF\u5DF2\u7ECF\u521D\u59CB\u5316");
  let n = await X(t),
    o = String(e.SETUP_KEY || ""),
    r = String(n.setupKey || "");
  if (o.length < 12 || /^change-me/i.test(o)) throw new I(503, "\u90E8\u7F72\u914D\u7F6E\u4E2D\u7684 APPLY_SETUP_KEY \u5C1A\u672A\u4FEE\u6539\uFF0C\u8BF7\u5148\u5728 wrangler.toml \u4E2D\u6539\u6210\u4F60\u81EA\u5DF1\u7684\u4E00\u4E32\u968F\u673A\u5B57\u7B26\u518D\u90E8\u7F72");
  let s = o.length ^ r.length;
  for (let w = 0; w < o.length; w++) s |= o.charCodeAt(w) ^ r.charCodeAt(w % (r.length || 1));
  if (s) throw new I(403, "\u5B89\u88C5\u5BC6\u94A5\u4E0D\u6B63\u786E\uFF08\u89C1 wrangler.toml \u4E2D\u7684 APPLY_SETUP_KEY\uFF09");
  let a = String(n.name || "").trim(),
    d = String(n.username || "").trim();
  if (!a || !/^[A-Za-z0-9._-]{3,40}$/.test(d)) throw new I(400, "\u8BF7\u586B\u5199\u59D3\u540D\uFF1B\u767B\u5F55\u540D\u4E3A 3\u201340 \u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u6216 . _ -");
  let p = re(n.password);
  if (p) throw new I(400, p);
  let f = await H(n.password),
    u = "u-" + crypto.randomUUID().slice(0, 8),
    c = j();
  await e.DB.prepare("INSERT INTO users (id, username, name, role, student_id, active, pw_hash, pw_salt, must_change, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(u, d, a, "supervisor", null, 1, f.hash, f.salt, 0, c, c).run(), await rt(e, {
    templates: Ye.templates
  }), await at(e, Ye.reqdb);
  let h = n.demo ? await Jt(e, u) : [];
  await N(e, u, "setup", "", "", n.demo ? "with demo" : "");
  let y = await Je(e, u, t);
  return D({
    ok: !0,
    accounts: h
  }, 200, {
    "Set-Cookie": Ie(y, oe * 3600)
  });
}
async function Xn(t, e) {
  let i = await X(t),
    n = String(i.username || "").trim().slice(0, 60),
    o = t.headers.get("CF-Connecting-IP") || "local",
    r = n.toLowerCase() + "|" + o,
    s = await Le(e, r);
  if (s) throw new I(429, `\u767B\u5F55\u5931\u8D25\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7 ${s} \u5206\u949F\u540E\u518D\u8BD5`);
  let a = await e.DB.prepare("SELECT * FROM users WHERE username = ? COLLATE NOCASE").bind(n).first();
  if (!(a && a.active && (await ae(String(i.password || ""), a.pw_hash, a.pw_salt)))) throw await Re(e, r), await N(e, a?.id || "", "login-fail", "", "", n), new I(401, "\u767B\u5F55\u540D\u6216\u5BC6\u7801\u4E0D\u6B63\u786E");
  await Oe(e, r), await e.DB.prepare("UPDATE users SET last_login = ? WHERE id = ?").bind(j(), a.id).run(), await e.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(Date.now()).run();
  let p = await Je(e, a.id, t);
  return await N(e, a.id, "login"), D({
    ok: !0,
    mustChange: !!a.must_change
  }, 200, {
    "Set-Cookie": Ie(p, oe * 3600)
  });
}
async function Jn(t, e) {
  let i = await de(t, e),
    n = (await t.DB.prepare("SELECT tbl, data FROM records").all()).results,
    o = Object.fromEntries(we.map(a => [a, []])),
    r = {};
  for (let a of n) if (a.tbl === "documents") {
    let d = JSON.parse(a.data);
    r[d.id] = d;
  }
  for (let a of n) {
    if (!o[a.tbl]) continue;
    let d = Be(i, a.tbl, JSON.parse(a.data), {
      docs: r
    });
    d && o[a.tbl].push(d);
  }
  let s = await xe(t);
  if (s && !ve(e)) {
    let a = new Set(o.applications.map(d => d.schoolId));
    s = {
      taxonomy: s.taxonomy,
      schools: s.schools.filter(d => a.has(d.id)).map(d => ({
        id: d.id,
        abbr: d.abbr,
        zh: d.zh,
        en: d.en,
        city_zh: d.city_zh
      }))
    };
  }
  return D({
    me: e,
    users: Nt(i, await Zt(t)),
    data: o,
    reqdb: s,
    serverTime: j()
  });
}
async function $n(t, e, i, n, o, r) {
  if (!Kn.test(o)) throw new I(400, "\u8BB0\u5F55\u7F16\u53F7\u65E0\u6548");
  let s = await de(e, i),
    fqOriginal = await e.DB.prepare("SELECT data FROM records WHERE tbl=? AND id=?").bind(n,o).first(),
    a = fqOriginal ? JSON.parse(fqOriginal.data) : null,
    d = async (l, v) => l === "refRequestsOf" ? !!(await e.DB.prepare("SELECT 1 FROM records WHERE tbl = 'refRequests' AND json_extract(data, '$.recommenderId') = ?").bind(v).first()) : ue(e, l, v);
  if (r === "DELETE") {
    if (!a) return D({
      ok: !0
    });
    let l = await Qe(s, n, "delete", a, null, d);
    if (!l.ok) throw new I(403, l.error);
    if (n === 'students') return Vn(e, i, o);
    return await e.DB.prepare("DELETE FROM records WHERE tbl = ? AND id = ?").bind(n, o).run(), await N(e, i.id, "delete", n, o), D({
      ok: !0
    });
  }
  if (r !== "PUT") throw new I(405, "\u4E0D\u652F\u6301\u7684\u64CD\u4F5C");
  let p = await t.text();
  if (p.length > 3e5) throw new I(413, "\u5185\u5BB9\u8FC7\u5927");
  let f;
  try {
    f = JSON.parse(p);
  } catch {
    throw new I(400, "\u8BF7\u6C42\u5185\u5BB9\u4E0D\u662F\u6709\u6548\u7684 JSON");
  }
  if (!f || typeof f != "object" || f.id !== o) throw new I(400, "\u8BB0\u5F55\u7F16\u53F7\u4E0D\u4E00\u81F4");
  const fqHasBase = Object.hasOwn(f, '_base');
  let u = f._base, fqVersionParent;
  if (delete f._base, (n === "versions" || n === "reviews") && f.documentId) {
    const parent = await e.DB.prepare("SELECT data FROM records WHERE tbl='documents' AND id=?").bind(f.documentId).first();
    let l = parent ? JSON.parse(parent.data) : null;
    l && (f.studentId = l.studentId);
    if (n === 'versions') fqVersionParent = parent?.data;
  }
  let c = await Qe(s, n, "put", a, f, d);
  if (!c.ok) throw new I(403, c.error);
  if (a && (!fqHasBase || (u ?? null) !== (a.updatedAt ?? null))) {
    let l = Be(s, n, a, {
      docs: {}
    });
    throw new I(409, "\u8FD9\u6761\u8BB0\u5F55\u521A\u88AB\u5176\u4ED6\u4EBA\u4FEE\u6539\uFF0C\u5DF2\u4E3A\u4F60\u5237\u65B0\u6700\u65B0\u5185\u5BB9", {
      current: l
    });
  }
  let h = c.record;
  h.createdAt = a?.createdAt || j(); h.updatedAt = new Date(Math.max(Date.now(), (Date.parse(a?.updatedAt)||0)+1)).toISOString();
  if (a) {
    const saved = await e.DB.prepare("UPDATE records SET data=?,updated_at=? WHERE tbl=? AND id=? AND data=?").bind(JSON.stringify(h),h.updatedAt,n,o,fqOriginal.data).run();
    if (!saved.meta.changes) throw new I(409,'记录已被更新，请刷新后重试');
  } else {
    try {
      let saved;
      if (n === 'versions') saved = await e.DB.prepare("INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM records WHERE tbl='documents' AND id=? AND data=?)").bind(n,h.id,h.studentId,JSON.stringify(h),h.updatedAt,h.documentId,fqVersionParent).run();
      else saved = await e.DB.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) VALUES(?,?,?,?,?)').bind(n,h.id,n === 'students' ? h.id : h.studentId || null,JSON.stringify(h),h.updatedAt).run();
      if (!saved.meta.changes) throw new I(409,'关联文书已被更新，请刷新后重试');
    } catch (error) {
      if (/UNIQUE constraint/i.test(String(error.message))) throw new I(409,'记录已被创建，请刷新后重试');
      throw error;
    }
  }
  await N(e, i.id, a ? "update" : "create", n, o);
  let y = n === "students" && !a ? await de(e, i) : s,
    w = {};
  if (n === "versions") {
    let l = await ue(e, "documents", h.documentId);
    l && (w[l.id] = l);
  }
  return D({
    record: Be(y, n, h, {
      docs: w
    }) || {
      id: h.id,
      updatedAt: h.updatedAt
    }
  });
}
function Qt(t) {
  if (t.role !== "supervisor") throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u7BA1\u7406\u8D26\u53F7");
}
async function en(t, e, i) {
  let n = String(e.name || "").trim(),
    o = String(e.username || "").trim(),
    r = e.role;
  if (!n) throw new I(400, "\u8BF7\u586B\u5199\u59D3\u540D");
  if (!/^[A-Za-z0-9._-]{3,40}$/.test(o)) throw new I(400, "\u767B\u5F55\u540D\u4E3A 3\u201340 \u4F4D\u5B57\u6BCD\u3001\u6570\u5B57\u6216 . _ -");
  if (!["supervisor", "advisor", "writer", "student"].includes(r)) throw new I(400, "\u89D2\u8272\u65E0\u6548");
  if (await t.DB.prepare("SELECT id FROM users WHERE username = ? COLLATE NOCASE AND id != ?").bind(o, i || "").first()) throw new I(400, "\u767B\u5F55\u540D\u5DF2\u88AB\u4F7F\u7528");
  let a = null;
  if (r === "student") {
    if (a = String(e.studentId || ""), !(await ue(t, "students", a))) throw new I(400, "\u5B66\u751F\u8D26\u53F7\u9700\u8981\u5173\u8054\u5B66\u751F\u6863\u6848");
    if (await t.DB.prepare("SELECT id FROM users WHERE student_id = ? AND id != ?").bind(a, i || "").first()) throw new I(400, "\u8FD9\u4F4D\u5B66\u751F\u5DF2\u7ECF\u6709\u8D26\u53F7");
  }
  return {
    name: n,
    username: o,
    role: r,
    studentId: a
  };
}
async function Qn(t, e, i) {
  let n = await X(t);
  if (i.role !== "supervisor") {
    let p = await de(e, i);
    if (!(i.role === "advisor" && n.role === "student" && p.manage.has(n.studentId))) throw new I(403, "\u53EA\u6709\u7533\u8BF7\u4E3B\u7BA1\u53EF\u4EE5\u5F00\u8BBE\u5458\u5DE5\u8D26\u53F7");
  }
  let o = await en(e, n),
    r = ee(),
    s = await H(r),
    a = /^[A-Za-z0-9_-]{3,40}$/.test(n.id || "") ? n.id : "u-" + crypto.randomUUID().slice(0, 8),
    d = j();
  return await e.DB.prepare("INSERT INTO users (id, username, name, role, student_id, active, pw_hash, pw_salt, must_change, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(a, o.username, o.name, o.role, o.studentId, 1, s.hash, s.salt, 1, d, d).run(), await N(e, i.id, "user-create", "users", a, o.role), D({
    user: se(await e.DB.prepare("SELECT * FROM users WHERE id = ?").bind(a).first()),
    password: r
  });
}
async function ei(t, e, i, n, o) {
  Qt(i);
  let r = await X(t),
    s = await e.DB.prepare("SELECT * FROM users WHERE id = ?").bind(n).first();
  if (!s) throw new I(404, "\u8D26\u53F7\u4E0D\u5B58\u5728");
  let a = await en(e, Object.assign(se(s), r), n),
    d = r.active === void 0 ? !!s.active : !!r.active;
  if (n === i.id && (a.role !== "supervisor" || !d)) throw new I(400, "\u4E0D\u80FD\u505C\u7528\u81EA\u5DF1\u6216\u53D6\u6D88\u81EA\u5DF1\u7684\u4E3B\u7BA1\u89D2\u8272");
  return await e.DB.prepare("UPDATE users SET name = ?, username = ?, role = ?, student_id = ?, active = ?, updated_at = ? WHERE id = ?").bind(a.name, a.username, a.role, a.studentId, d ? 1 : 0, j(), n).run(), (!d || a.role !== s.role) && (await Pe(e, n)), await N(e, i.id, "user-update", "users", n, JSON.stringify({
    role: a.role,
    active: d
  })), D({
    user: se(await e.DB.prepare("SELECT * FROM users WHERE id = ?").bind(n).first())
  });
}
async function ti(t, e, i) {
  let n = await t.DB.prepare("SELECT * FROM users WHERE id = ?").bind(i).first();
  if (!n) throw new I(404, "\u8D26\u53F7\u4E0D\u5B58\u5728");
  if (e.role !== "supervisor") {
    let s = await de(t, e);
    if (!(e.role === "advisor" && n.role === "student" && s.manage.has(n.student_id))) throw new I(403, "\u6CA1\u6709\u6743\u9650");
  }
  let o = ee(),
    r = await H(o);
  return await t.DB.prepare("UPDATE users SET pw_hash = ?, pw_salt = ?, must_change = 1, updated_at = ? WHERE id = ?").bind(r.hash, r.salt, j(), i).run(), await Pe(t, i), await N(t, e.id, "user-reset", "users", i), D({
    password: o
  });
}
async function ni(t, e, i, n, o) {
  if (Qt(i), n === "export" && o === "GET") {
    let r = (await e.DB.prepare("SELECT tbl, data FROM records").all()).results,
      s = {
        format: "fq-admissions",
        version: 2,
        exportedAt: j(),
        users: await Zt(e)
      };
    for (let a of we) s[a] = r.filter(d => d.tbl === a).map(d => JSON.parse(d.data));
    return s.reqdb = await Xt(e), await N(e, i.id, "export"), D(s, 200, {
      "Content-Disposition": 'attachment; filename="fq-backup.json"'
    });
  }
  if (n === "import" && o === "POST") {
    let r = await X(t);
    if (r.format !== "fq-admissions") throw new I(400, "\u4E0D\u662F\u672C\u7CFB\u7EDF\u5BFC\u51FA\u7684\u5907\u4EFD\u6587\u4EF6");
    await rt(e, r, {
      wipe: !0
    }), r.reqdb && (await at(e, r.reqdb));
    let s = [];
    for (let a of r.users || []) {
      if ((await e.DB.prepare("SELECT id FROM users WHERE id = ?").bind(a.id).first()) || !a.username) continue;
      let p = ee(),
        f = await H(p),
        u = j();
      await e.DB.prepare("INSERT INTO users (id, username, name, role, student_id, active, pw_hash, pw_salt, must_change, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(a.id, a.username, a.name, a.role, a.studentId || null, a.active ? 1 : 0, f.hash, f.salt, 1, u, u).run(), s.push({
        name: a.name,
        username: a.username,
        password: p
      });
    }
    return await N(e, i.id, "import"), D({
      ok: !0,
      created: s
    });
  }
  if (n === "demo" && o === "POST") {
    let r = await Jt(e, i.id);
    return await N(e, i.id, "demo"), D({
      ok: !0,
      accounts: r
    });
  }
  if (n === "clear" && o === "POST") return await e.DB.prepare("DELETE FROM records WHERE tbl != 'templates'").run(), await e.DB.prepare("DELETE FROM users WHERE role != 'supervisor'").run(), await N(e, i.id, "clear"), D({
    ok: !0
  });
  if (n === "audit" && o === "GET") {
    let r = (await e.DB.prepare("SELECT a.at, a.action, a.tbl, a.rec_id, a.detail, u.name FROM audit a LEFT JOIN users u ON u.id = a.user_id ORDER BY a.id DESC LIMIT 300").all()).results;
    return D({
      rows: r
    });
  }
  throw new I(404, "\u63A5\u53E3\u4E0D\u5B58\u5728");
}
