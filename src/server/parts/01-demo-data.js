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
