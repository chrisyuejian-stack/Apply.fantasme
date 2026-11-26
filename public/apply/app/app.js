!function () {
  "use strict";

  const t = !0,
    e = "/logo.png",
    s = "/app/diy-preview.jpg",
    a = t => String(t ?? "").replace(/[&<>"']/g, t => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[t]),
    i = t => t + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    d = () => new Date().toISOString(),
    n = t => String(t).padStart(2, "0"),
    o = t => t.getFullYear() + "-" + n(t.getMonth() + 1) + "-" + n(t.getDate()),
    l = () => o(new Date()),
    r = t => {
      if (!t) return null;
      const [e, s, a] = String(t).slice(0, 10).split("-").map(Number);
      return new Date(e, s - 1, a);
    },
    c = (t, e) => {
      const s = r(t);
      return s ? (s.setDate(s.getDate() + e), o(s)) : "";
    },
    u = t => {
      const e = r(t);
      return e ? Math.round((e - r(l())) / 864e5) : null;
    },
    p = t => t ? String(t).slice(0, 10).replace(/-/g, ".") : "—",
    m = t => {
      if (!t) return "—";
      const e = new Date(t);
      return o(e).replace(/-/g, ".") + " " + n(e.getHours()) + ":" + n(e.getMinutes());
    },
    v = t => {
      const e = u(t);
      return null === e ? "" : 0 === e ? "今天" : e > 0 ? e + " 天后" : "已过 " + -e + " 天";
    },
    h = (t, e = 7) => {
      const s = u(t);
      return null === s ? "" : s < 0 ? "date-red" : s <= e ? "date-warn" : "";
    },
    b = (t, e) => t ? `<div class="${h(t, e)}">${p(t)}</div><div class="td-sub">${v(t)}</div>` : '<span class="muted2">—</span>',
    $ = (t, e) => String(t || "9999").localeCompare(String(e || "9999")),
    f = t => [...new Set(t)],
    g = t => {
      const e = parseFloat(t);
      return isNaN(e) ? null : e;
    };
  function y(t) {
    if (!t) return "";
    const e = String(t).split("\n");
    let s = "",
      i = !1;
    const d = t => a(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    for (const t of e) {
      const e = t.trimEnd();
      /^\s*[-•]\s+/.test(e) ? (i || (s += "<ul>", i = !0), s += "<li>" + d(e.replace(/^\s*[-•]\s+/, "")) + "</li>") : (i && (s += "</ul>", i = !1), /^#{1,4}\s+/.test(e) ? s += "<h4>" + d(e.replace(/^#{1,4}\s+/, "")) + "</h4>" : e.trim() && (s += "<p>" + d(e) + "</p>"));
    }
    return i && (s += "</ul>"), `<div class="md">${s}</div>`;
  }
  const k = {
      home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0 1 16 0v1"/>',
      calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      checksq: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
      folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
      video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/>',
      music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
      clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
      arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
      back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
      external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
      upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
      download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
      report: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
      logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
      send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
      flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
      more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
      search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
    },
    I = t => `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${k[t] || k.file}</svg>`;
  function w(t) {
    const e = String(t || "");
    return (e.match(/[A-Za-z0-9À-ÖØ-öø-ÿ]+(?:['’-][A-Za-z0-9À-ÖØ-öø-ÿ]+)*/g) || []).length + (e.match(/[㐀-鿿豈-﫿぀-ヿ가-힯]/g) || []).length;
  }
  const x = 1e3;
  function S(t) {
    const e = String(t || "").trim();
    return /^https?:\/\//i.test(e) ? e : "";
  }
  const j = "V1.2",
    A = {
      supervisor: {
        label: "申请主管",
        short: "主管"
      },
      advisor: {
        label: "申请顾问",
        short: "顾问"
      },
      writer: {
        label: "文书老师",
        short: "文书"
      },
      student: {
        label: "学生",
        short: "学生"
      }
    },
    q = {
      todo: ["待开始", ""],
      doing: ["进行中", "info"],
      review: ["待复核", "warn"],
      done: ["已完成", "ok"],
      na: ["不适用", ""]
    },
    O = {
      requirements: "要求核对",
      materials: "材料",
      submission: "申请提交",
      audition: "考试 / 录像",
      offer: "录取与后续",
      other: "其他"
    },
    C = {
      ucas_conservatoires: {
        label: "UCAS Conservatoires",
        shared: !0,
        note: "基础信息、Personal Statement、推荐信一次提交，覆盖所有 Conservatoire 志愿；录像仍在各校 Acceptd 等平台分别提交"
      },
      ucas_ug: {
        label: "UCAS Undergraduate",
        shared: !0,
        note: "基础信息、Personal Statement、推荐信一次提交，覆盖所有志愿（部分音乐学院专业走这里）"
      },
      common_app: {
        label: "Common App",
        shared: !0,
        note: "主文书与基础信息共用；各校可能另有补充申请"
      },
      school_portal: {
        label: "学校 / 学院自有申请系统",
        shared: !1,
        note: "每所学校单独提交，可自定义名称（如 Jacobs Supplemental Application）"
      },
      direct: {
        label: "邮件 / 纸质直申",
        shared: !1,
        note: "每所学校单独提交"
      },
      other: {
        label: "其他平台",
        shared: !1,
        note: "自定义名称"
      }
    },
    D = ["主申请", "大学申请", "音乐学院申请", "补充申请", "作品集 / 预审平台", "其他"],
    _ = {
      not_started: ["未开始", ""],
      in_progress: ["填写中", "info"],
      submitted: ["已提交", "blue"],
      received: ["学校已确认收到", "ok"]
    },
    L = {
      prescreen: {
        label: "预审录像",
        media: !0
      },
      recorded: {
        label: "录像考试",
        media: !0
      },
      portfolio: {
        label: "作品集",
        media: !0
      },
      live: {
        label: "现场考试",
        media: !1
      },
      online: {
        label: "线上考试 / 面试",
        media: !1
      },
      interview: {
        label: "面试",
        media: !1
      }
    },
    E = {
      preparing: ["准备中", "info"],
      submitted: ["已提交，等待结果", "blue"],
      passed: ["已通过", "ok"],
      not_passed: ["未通过", "err"],
      cancelled: ["已取消", ""]
    },
    T = {
      waiting: ["等待邀请 / 安排", ""],
      scheduled: ["已确定时间", "info"],
      done: ["已参加", "ok"],
      not_passed: ["未通过", "err"],
      cancelled: ["已取消", ""]
    },
    M = t => L[t]?.media ? E : T,
    N = t => ["passed", "not_passed", "done", "cancelled"].includes(t.status),
    B = {
      pending: ["待公布", ""],
      conditional: ["有条件录取", "info"],
      unconditional: ["无条件录取", "ok"],
      waitlist: ["候补", "warn"],
      rejected: ["未录取", "err"]
    },
    P = {
      pending: ["未决定", ""],
      accepted: ["已接受", "ok"],
      declined: ["已放弃", ""]
    },
    R = ["核对要求", "准备材料", "提交申请", "考试 / 面试", "录取结果", "最终决定"],
    F = {
      ps: {
        label: "Personal Statement",
        hint: "通过 UCAS / Common App 申请时，所有志愿共用一份"
      },
      supplemental: {
        label: "院校补充文书",
        hint: "某所学校另行要求的陈述、问答或 Programme Note"
      },
      artist_statement: {
        label: "Artist Statement / 作品说明",
        hint: "作品集或录像附带的说明"
      },
      cv: {
        label: "音乐简历 CV",
        hint: ""
      },
      scholarship: {
        label: "奖学金陈述",
        hint: ""
      },
      other: {
        label: "其他文书",
        hint: ""
      }
    },
    V = ["drafting", "advisor_review", "supervisor_review", "student_review", "final"],
    U = {
      drafting: ["撰写中", ""],
      revising: ["修改中", "err"],
      advisor_review: ["顾问审核", "warn"],
      supervisor_review: ["主管定稿", "warn"],
      student_review: ["学生确认", "blue"],
      final: ["已定稿", "ok"]
    },
    z = {
      drafting: "撰写",
      advisor_review: "顾问审核",
      supervisor_review: "主管定稿",
      student_review: "学生确认",
      final: "定稿"
    },
    H = {
      video: "录像",
      audio: "音频",
      portfolio: "作品集",
      score: "乐谱",
      repertoire_list: "曲目单",
      transcript: "成绩单 / 学历",
      language: "语言成绩",
      passport: "身份证件",
      cv: "简历",
      certificate: "证书 / 获奖",
      receipt: "回执 / 凭证",
      other: "其他"
    },
    G = {
      collecting: ["收集中", ""],
      review: ["待审核", "warn"],
      changes: ["需重做", "err"],
      approved: ["已确认可用", "ok"]
    },
    J = {
      selected: ["已选定", ""],
      practicing: ["练习中", "info"],
      ready: ["可录制 / 可演奏", "warn"],
      recorded: ["已录制", "ok"]
    },
    Y = {
      not_invited: ["未邀请", ""],
      invited: ["已邀请", "info"],
      submitted: ["已提交", "ok"]
    },
    K = {
      student: "每个学生一次",
      submission: "每个提交平台一次（共用平台只生成一次）",
      application: "每所院校一次"
    },
    Z = {
      all: "所有申请",
      media: "有录像 / 作品集轮次",
      live: "有现场 / 线上考试",
      shared: "走 UCAS / Common App 等共用平台"
    },
    W = {
      "": "无",
      "submission:submitted": "完成后可标记“该平台已提交”",
      "submission:received": "完成后可标记“学校已确认收到”",
      "round:submitted": "完成后可标记“录像 / 作品已提交”"
    },
    X = (t, e) => t[e] && (Array.isArray(t[e]) ? t[e][0] : t[e].label || t[e]) || e || "—",
    Q = (t, e, s = "") => {
      const i = t[e],
        d = Array.isArray(i) ? i : [X(t, e), ""];
      return `<span class="pill ${d[1] || ""} ${s}">${a(d[0])}</span>`;
    },
    tt = ["users", "students", "applications", "submissions", "rounds", "tasks", "documents", "versions", "reviews", "materials", "repertoire", "recommenders", "refRequests", "activity", "templates"],
    et = "fq2:",
    st = {
      data: {},
      reqdb: null,
      load() {
        let t = !1;
        try {
          t = !!localStorage.getItem(et + "meta");
        } catch (t) {}
        if (t) {
          for (const t of tt) try {
            this.data[t] = JSON.parse(localStorage.getItem(et + t) || "[]");
          } catch (e) {
            this.data[t] = [];
          }
          try {
            const t = localStorage.getItem(et + "reqdb");
            this.reqdb = t ? JSON.parse(t) : null;
          } catch (t) {
            this.reqdb = null;
          }
        } else this.reset();
      },
      reset() {
        const t = ht();
        for (const e of tt) this.data[e] = t[e] || [];
        this.reqdb = null, this.persistAll();
        try {
          localStorage.removeItem(et + "reqdb");
        } catch (t) {}
      },
      clear() {
        for (const t of tt) this.data[t] = "templates" === t ? ht().templates : "users" === t ? this.data.users.filter(t => "supervisor" === t.role) : [];
        this.persistAll();
      },
      persistAll() {
        for (const t of tt) this.persist(t);
        try {
          localStorage.setItem(et + "meta", JSON.stringify({
            version: 1,
            savedAt: d()
          }));
        } catch (t) {}
      },
      persist(t) {
        try {
          localStorage.setItem(et + t, JSON.stringify(this.data[t]));
        } catch (t) {
          Ae("浏览器存储写入失败：" + t.message, {
            error: !0
          });
        }
      },
      all(t) {
        return this.data[t] || [];
      },
      get(t, e) {
        return e && (this.data[t] || []).find(t => t.id === e) || null;
      },
      where(t, e) {
        return (this.data[t] || []).filter(e);
      },
      put(t, e) {
        const s = this.data[t] || (this.data[t] = []),
          a = d();
        e.id || (e.id = i(t.slice(0, 3)));
        const n = s.findIndex(t => t.id === e.id);
        return n >= 0 ? (e.updatedAt = a, s[n] = e) : (e.createdAt = e.createdAt || a, e.updatedAt = a, s.push(e)), this.persist(t), e;
      },
      patch(t, e, s) {
        const a = this.get(t, e);
        return a ? this.put(t, Object.assign(a, s)) : null;
      },
      remove(t, e) {
        this.data[t] = (this.data[t] || []).filter(t => t.id !== e), this.persist(t);
      },
      setReqDB(t) {
        this.reqdb = t;
        try {
          localStorage.setItem(et + "reqdb", JSON.stringify(t));
        } catch (t) {
          Ae("院校库过大，无法保存在浏览器：" + t.message, {
            error: !0
          });
        }
      },
      exportAll() {
        const t = {
          format: "fq-admissions",
          version: 1,
          exportedAt: d()
        };
        for (const e of tt) t[e] = this.data[e];
        return this.reqdb && (t.reqdb = this.reqdb), t;
      },
      importAll(t) {
        if (!t || "fq-admissions" !== t.format) throw new Error("不是本系统导出的备份文件。");
        for (const e of tt) this.data[e] = Array.isArray(t[e]) ? t[e] : [];
        this.persistAll(), t.reqdb && this.setReqDB(t.reqdb);
      }
    };
  let at = null;
  try {
    at = JSON.parse(document.getElementById("reqdb").textContent);
  } catch (t) {
    at = {
      taxonomy: {
        majors: [],
        levels: [],
        countries: [],
        cats: [],
        stages: []
      },
      schools: [],
      records: []
    };
  }
  const it = () => st.reqdb || at,
    dt = t => it().schools.find(e => e.id === t) || null,
    nt = t => it().taxonomy.majors.find(e => e.id === t) || null,
    ot = t => nt(t)?.zh || t || "—",
    lt = t => it().taxonomy.cats.find(e => e.id === t)?.zh || t,
    rt = t => it().taxonomy.stages.find(e => e.id === t)?.zh || t;
  function ct(t, e) {
    if (!t || !t.length) return !0;
    const s = nt(e);
    return t.some(t => "*" === t || t === e || "@" === t[0] && s && (s.group === t.slice(1) || s.sub === t.slice(1)));
  }
  const ut = (t, e) => !t || "ALL" === t || t === e;
  function pt(t) {
    return t.schoolId ? it().records.filter(e => e.school === t.schoolId && ut(e.level, t.level) && ct(e.majors, t.majorId)).sort((t, e) => (t.order || 0) - (e.order || 0)) : [];
  }
  function mt(t) {
    const e = dt(t.schoolId);
    if (!e) return [];
    const s = (e.deadlines || []).filter(e => ut(e.lv, t.level) && ct(e.mj, t.majorId)),
      a = s.filter(t => !(t.mj || []).includes("*"));
    return a.length ? a : s;
  }
  function vt(t) {
    const e = dt(t)?.system || "";
    return /acceptd/i.test(e) ? "Acceptd" : /youtube|vimeo/i.test(e) ? "YouTube / Vimeo 链接" : /embark/i.test(e) ? "Embark" : "";
  }
  function ht() {
    const t = {};
    tt.forEach(e => t[e] = []);
    const e = (t, e = 10) => new Date(r(t).getTime() + 36e5 * e).toISOString();
    t.users = [{
      id: "u-sup",
      name: "王主管",
      role: "supervisor",
      username: "wang",
      active: !0
    }, {
      id: "u-li",
      name: "李顾问",
      role: "advisor",
      username: "li",
      active: !0
    }, {
      id: "u-zhao",
      name: "赵顾问",
      role: "advisor",
      username: "zhao",
      active: !0
    }, {
      id: "u-chen",
      name: "陈文书",
      role: "writer",
      username: "chen",
      active: !0
    }, {
      id: "u-sun",
      name: "孙文书",
      role: "writer",
      username: "sun",
      active: !0
    }, {
      id: "u-s1",
      name: "林同学",
      role: "student",
      username: "lin.yuxi",
      studentId: "stu-1",
      active: !0
    }, {
      id: "u-s2",
      name: "周同学",
      role: "student",
      username: "zhou.an",
      studentId: "stu-2",
      active: !0
    }, {
      id: "u-s3",
      name: "许同学",
      role: "student",
      username: "xu.mia",
      studentId: "stu-3",
      active: !0
    }], t.students = [{
      id: "stu-1",
      name: "林同学",
      englishName: "Lin Yuxi",
      season: "2027 Fall",
      level: "UG",
      majorId: "piano",
      currentSchool: "上海某国际高中",
      status: "active",
      advisorId: "u-li",
      writerIds: ["u-chen"],
      intake: {
        status: "verified",
        submittedAt: e("2026-08-12"),
        verifiedAt: e("2026-08-14"),
        verifiedBy: "u-li",
        changes: []
      },
      profile: {
        nameZh: "林同学",
        nameEn: "LIN Yuxi",
        gender: "女",
        birthDate: "2008-05-16",
        nationality: "中国",
        birthPlace: "上海",
        phone: "138****0001",
        email: "lin.demo@example.com",
        addressZh: "上海市某区某路 100 号",
        postcode: "200000",
        preferredName: "Yuxi",
        addressEn: "No. 100, Demo Road, Shanghai",
        guardians: [{
          name: "林女士",
          relation: "母亲",
          phone: "139****0002",
          email: "mum.demo@example.com",
          address: "同上"
        }, {}],
        education: [{
          stage: "初中",
          schoolZh: "上海某初级中学",
          type: "公立",
          period: "2020.09–2023.06"
        }, {
          stage: "高中 / 当前学校",
          schoolZh: "上海某国际高中",
          schoolEn: "Shanghai Demo International School",
          type: "国际学校（A-Level）",
          period: "2023.09–2027.06",
          address: "上海市某区 · 200000"
        }],
        gpa: "3.8",
        gpaScale: "4.0 制",
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
        otherTests: "ABRSM 钢琴",
        otherTestsScore: "2024.06 · 8 级 Distinction",
        testNote: "计划 12 月再考一次雅思",
        activities: [{
          period: "2025.03—2025.03",
          name: "上海青少年钢琴比赛",
          role: "参赛，演奏 Chopin Ballade No.1，获二等奖"
        }, {
          period: "2024.09—2026.06",
          name: "学校交响乐团",
          role: "乐团钢琴，参与年度音乐会 4 场"
        }, {
          period: "2025.07",
          name: "某音乐节大师课",
          role: "学员，师从某英国钢琴教授"
        }],
        awards: [{
          date: "2025.03",
          name: "上海青少年钢琴比赛二等奖",
          org: "市级"
        }, {}],
        abilities: "视奏较强，能为合唱团伴奏",
        hobbies: "阅读、摄影",
        q1: "六岁时第一次在音乐厅听到肖邦的叙事曲，回家后反复模仿那段旋律。后来跟随王老师系统学习，逐渐明白钢琴不只是技术，而是和作曲家对话的方式……（演示文字）",
        q2: "高二时手腕受伤停琴两个月，这段时间我开始分析总谱和录音，复琴后对作品结构的理解反而更清楚……（演示文字）",
        q3: "希望先成为职业独奏和室内乐演奏者，之后回国从事钢琴教育。",
        q4: "2025 年比赛前一周换了比赛用琴，触键完全不同……（演示文字）",
        q5: "在大师课上被选为示范学员，演奏后教授邀请我参加暑期学院。",
        q6: "担任学校音乐社社长两年，组织校内慈善音乐会，为社区学校募集乐器。",
        q7: "对英国当代音乐有浓厚兴趣，自学了部分作曲。",
        files: {
          0: {
            status: "provided",
            fileName: "护照扫描"
          },
          1: {
            status: "provided",
            fileName: "高中成绩单（中英文）"
          },
          2: {
            status: "provided",
            fileName: "IELTS 成绩单"
          },
          3: {
            status: "pending"
          },
          4: {
            status: "provided"
          },
          5: {
            status: "provided"
          },
          6: {
            status: "provided"
          },
          7: {
            status: "na"
          }
        },
        confirmed: !0,
        confirmName: "林同学",
        confirmDate: "2026-08-12",
        accounts: [{
          platform: "UCAS Conservatoires",
          login: "lin.demo@example.com",
          note: "密码由顾问保管在公司密码管理器"
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
      name: "周同学",
      englishName: "Zhou An",
      season: "2027 Fall",
      level: "PG",
      majorId: "production",
      currentSchool: "某音乐学院 · 录音艺术专业（大四）",
      status: "active",
      advisorId: "u-zhao",
      writerIds: ["u-sun"],
      intake: {
        status: "updated",
        submittedAt: e("2026-09-20"),
        verifiedAt: e("2026-09-22"),
        verifiedBy: "u-zhao",
        changes: [{
          at: e("2026-10-21", 21),
          by: "u-s2",
          fields: ["个人基本信息·联系电话", "个人陈述素材 · 专业兴趣与学习经历·问题 3｜毕业后的职业与人生规划"]
        }]
      },
      profile: {
        nameZh: "周同学",
        nameEn: "ZHOU An",
        gender: "男",
        birthDate: "2004-11-02",
        nationality: "中国",
        birthPlace: "杭州",
        phone: "137****0003",
        email: "zhou.demo@example.com",
        guardians: [{
          name: "周先生",
          relation: "父亲",
          phone: "136****0004"
        }, {}],
        education: [{
          stage: "本科",
          schoolZh: "某音乐学院",
          schoolEn: "Demo Conservatory of Music",
          type: "本科",
          period: "2023.09–2027.06"
        }, {
          stage: "高中",
          schoolZh: "杭州某中学",
          period: "2020–2023"
        }],
        gpa: "86",
        gpaScale: "100 分制",
        tests: [{
          type: "IELTS",
          date: "2026-06-20",
          overall: "6.5",
          subs: "L7.0 R6.5 W6.0 S6.0",
          min: "6.0"
        }],
        activities: [{
          period: "2025.05",
          name: "学院毕业音乐会",
          role: "录音与混音负责人"
        }, {}, {}],
        awards: [{}, {}],
        q1: "从高中开始用电脑做编曲，本科学习录音艺术后更想做电子音乐创作……（演示文字）",
        q2: "",
        q3: "毕业后希望进入游戏音频行业，同时保持个人电子音乐作品发布。（学生 10 月 21 日更新）",
        q4: "",
        q5: "毕业设计作品入选学院年度展演。",
        q6: "",
        q7: "",
        files: {},
        confirmed: !0,
        confirmName: "周同学",
        confirmDate: "2026-09-20",
        accounts: []
      }
    }, {
      id: "stu-3",
      name: "许同学",
      englishName: "Xu Mia",
      season: "2027 Fall",
      level: "UG",
      majorId: "popvoice",
      currentSchool: "某艺术高中",
      status: "active",
      advisorId: "u-li",
      writerIds: ["u-chen"],
      intake: {
        status: "draft",
        changes: []
      },
      profile: {
        nameZh: "许同学",
        nameEn: "XU Mia",
        gender: "女",
        birthDate: "",
        nationality: "中国",
        phone: "135****0005",
        email: "",
        guardians: [{}, {}],
        education: [{
          stage: "初中"
        }, {
          stage: "高中 / 当前学校",
          schoolZh: "某艺术高中"
        }],
        tests: [{
          type: "IELTS",
          date: "2026-07-12",
          overall: "5.5",
          subs: "L6.0 R5.5 W5.0 S5.5",
          min: "5.0"
        }],
        testNote: "计划 11 月重考",
        activities: [{}, {}, {}],
        awards: [{}, {}],
        q1: "小时候在家里跟着妈妈听华语流行歌……（填写中）",
        files: {},
        accounts: []
      }
    }];
    const s = (t, e, s, a, i = "", d = "", n = "", o = "", l = "") => ({
      id: t,
      studentId: e,
      platform: s,
      name: o,
      status: a,
      submittedAt: i,
      receivedAt: d,
      ref: n,
      note: l,
      skipTpl: []
    });
    t.submissions = [s("sub-1u", "stu-1", "ucas_conservatoires", "received", "2026-09-28", "2026-10-03", "演示-123-456-7890"), s("sub-1g", "stu-1", "school_portal", "submitted", "2026-09-25", "", "GSMD-演示-0425", "Guildhall 申请系统"), s("sub-1c", "stu-1", "common_app", "in_progress", "", "", "", "", "用于 IU 大学部分"), s("sub-1j", "stu-1", "school_portal", "not_started", "", "", "", "Jacobs Supplemental Application", "推荐信与预审视频在此系统内提交"), s("sub-2u", "stu-2", "ucas_conservatoires", "in_progress"), s("sub-2g", "stu-2", "school_portal", "not_started", "", "", "", "Guildhall 申请系统"), s("sub-3u", "stu-3", "ucas_conservatoires", "received", "2026-09-29", "2026-10-02", "演示-987-654-3210"), s("sub-3ug", "stu-3", "ucas_ug", "submitted", "2026-10-10", "", "演示-555-111-2222", "", "Leeds BA 走 UCAS Undergraduate")];
    const a = (t, e, s, a, i = !0, d = "") => ({
        id: t,
        submissionId: e,
        label: s,
        required: !0,
        deadline: {
          date: a,
          verified: i,
          note: d
        },
        needsAdd: !1,
        addedAt: ""
      }),
      d = (t, s, a = "2026-09-05", i = "u-li") => ({
        at: e(a),
        by: i,
        ids: t,
        lang: s
      }),
      n = (t, e, s, a, i, d, n, o = {}) => Object.assign({
        id: t,
        studentId: e,
        schoolId: s,
        schoolName: "",
        program: a,
        majorId: i,
        level: d,
        parts: n,
        internalDeadline: "",
        reqConfirmed: null,
        outcome: {
          type: "pending"
        },
        decision: {
          type: "pending"
        },
        skipTpl: []
      }, o);
    t.applications = [n("app-1", "stu-1", "rcm", "BMus (Hons)", "piano", "UG", [a("p-1", "sub-1u", "主申请", "2026-10-01")], {
      internalDeadline: "2026-09-25",
      reqConfirmed: d(["rcm-ug-academic", "rcm-ug-english", "rcm-process", "rcm-ug-aud-piano"], {
        o: "5.5",
        m: "5.5",
        label: "BMus"
      })
    }), n("app-2", "stu-1", "ram", "BMus", "piano", "UG", [a("p-2", "sub-1u", "主申请", "2026-10-01")], {
      internalDeadline: "2026-09-25",
      reqConfirmed: d(["ram-ug-english"], {
        o: "5.5",
        m: "5.5",
        label: "BMus 一年级入学"
      })
    }), n("app-3", "stu-1", "rncm", "BMus (Hons) 4 年制", "piano", "UG", [a("p-3", "sub-1u", "主申请", "2026-10-01")], {
      internalDeadline: "2026-09-25",
      reqConfirmed: d(["rncm-ug-english", "rncm-ug-aud-piano"], {
        o: "5.5",
        m: "5.5",
        label: "BMus 4 年制"
      })
    }), n("app-4", "stu-1", "guildhall", "BMus (Hons)", "piano", "UG", [a("p-4", "sub-1g", "主申请", "2026-10-01")], {
      internalDeadline: "2026-09-22",
      reqConfirmed: d(["gsmd-english", "gsmd-ug-aud-piano"], {
        o: "5.5",
        m: "5.5",
        label: "BMus / MMus / MPerf / MComp"
      })
    }), n("app-9", "stu-1", "", "BM Piano Performance", "piano", "UG", [a("p-9a", "sub-1c", "大学申请", "2026-11-01", !0, "IU Office of Admissions"), a("p-9b", "sub-1j", "音乐学院申请", "2026-12-01", !0, "含推荐信与预审")], {
      schoolName: "IU Jacobs",
      internalDeadline: "2026-10-28",
      reqConfirmed: d([], null, "2026-10-15")
    }), n("app-5", "stu-2", "guildhall", "MMus Electronic & Produced Music", "production", "PG", [a("p-5", "sub-2g", "主申请", "2027-01-05", !1, "院校库预填，待核实")], {
      internalDeadline: "2026-12-15"
    }), n("app-6", "stu-2", "leeds", "MA Music Production", "production", "PG", [a("p-6", "sub-2u", "主申请", "", !1, "官网未公布 2027/28 截止日期")], {
      internalDeadline: "2026-12-01",
      reqConfirmed: d(["leeds-english"], {
        o: "6.0",
        m: "5.5",
        label: "BA / MA"
      }, "2026-10-10", "u-zhao")
    }), n("app-7", "stu-3", "rncm", "BMus (Hons) Popular Music", "popvoice", "UG", [a("p-7", "sub-3u", "主申请", "2026-10-01")], {
      internalDeadline: "2026-09-25",
      reqConfirmed: d(["rncm-ug-english", "rncm-ug-aud-popvoice"], {
        o: "5.5",
        m: "5.5",
        label: "BMus Popular Music"
      }),
      outcome: {
        type: "conditional",
        date: "2026-10-20",
        conditions: "IELTS 总分 6.0，各项不低于 5.5（2027-06-30 前达成）"
      }
    }), n("app-8", "stu-3", "leeds", "BA (Hons) Popular Music Performance (Voice)", "popvoice", "UG", [a("p-8", "sub-3ug", "主申请", "2027-01-14", !1, "以 UCAS 日历为准")], {
      internalDeadline: "2026-10-10",
      reqConfirmed: d(["leeds-english", "leeds-ug-aud-popular"], {
        o: "6.0",
        m: "5.5",
        label: "BA / MA"
      })
    })], t.rounds = [{
      id: "rd-1a",
      studentId: "stu-1",
      applicationId: "app-1",
      kind: "prescreen",
      platform: "Acceptd（RCM）",
      deadline: "2026-10-01",
      date: "",
      location: "",
      status: "passed",
      note: "10/12 收到上海考点邀请"
    }, {
      id: "rd-1b",
      studentId: "stu-1",
      applicationId: "app-1",
      kind: "live",
      platform: "",
      deadline: "",
      date: "2026-10-30",
      location: "上海考点",
      status: "scheduled",
      note: "上午 10:20 报到；含视奏与简短面试"
    }, {
      id: "rd-2a",
      studentId: "stu-1",
      applicationId: "app-2",
      kind: "prescreen",
      platform: "Acceptd（RAM）",
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
      platform: "Acceptd（RNCM）",
      deadline: "2026-11-05",
      date: "",
      location: "",
      status: "preparing",
      note: "以录像代替现场考试"
    }, {
      id: "rd-4a",
      studentId: "stu-1",
      applicationId: "app-4",
      kind: "live",
      platform: "",
      deadline: "",
      date: "",
      location: "伦敦 / 海外考点待定",
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
      note: "预审通过后受邀"
    }, {
      id: "rd-5a",
      studentId: "stu-2",
      applicationId: "app-5",
      kind: "portfolio",
      platform: "学校指定上传（Dropbox）",
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
      location: "线上",
      status: "waiting",
      note: ""
    }, {
      id: "rd-6a",
      studentId: "stu-2",
      applicationId: "app-6",
      kind: "portfolio",
      platform: "Acceptd（Leeds）",
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
      platform: "Acceptd（RNCM）",
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
      location: "线上",
      status: "scheduled",
      note: "北京时间 18:00"
    }], t.templates = function () {
      const t = (t, e, s, a, i, d, n = "", o = []) => ({
        id: t,
        title: e,
        category: s,
        scope: a,
        cond: i,
        offset: d,
        effect: n,
        after: o,
        active: !0
      });
      return [t("tpl-docs", "收集护照、成绩单与语言成绩单", "materials", "student", "all", -35), t("tpl-account", "注册申请平台账号并核对个人信息", "submission", "submission", "all", -40), t("tpl-ref", "邀请推荐人并跟进提交", "materials", "submission", "all", -21), t("tpl-submit", "复核申请表并正式提交", "submission", "submission", "all", -5, "submission:submitted", ["tpl-account", "tpl-ref", "tpl-docs"]), t("tpl-received", "确认学校已收到申请", "submission", "submission", "all", 10, "submission:received", ["tpl-submit"]), t("tpl-rep", "确定本校曲目 / 作品并安排录制", "audition", "application", "media", -30), t("tpl-teacher", "专业老师审核本校录像 / 作品（顾问登记意见）", "audition", "application", "media", -14, "", ["tpl-rep"]), t("tpl-upload", "上传本校录像 / 作品集", "audition", "application", "media", -3, "round:submitted", ["tpl-teacher"]), t("tpl-live", "准备现场 / 线上考试（行程、伴奏、彩排）", "audition", "application", "live", -10), t("tpl-offer", "跟进录取结果与 Offer 条件", "offer", "application", "all", 75)];
    }();
    const o = (t, s, a, i, d, n, o, l, r = {}) => Object.assign({
      id: t,
      studentId: s,
      applicationId: a,
      submissionId: null,
      roundId: null,
      title: i,
      category: d,
      assigneeId: n,
      dueDate: o,
      status: l,
      blocked: !1,
      blockedReason: "",
      note: "",
      effect: "",
      templateId: "",
      scopeKey: "",
      dependsOn: [],
      createdBy: "u-sup",
      createdAt: e("2026-09-01")
    }, r);
    t.tasks = [o("t-1", "stu-1", "app-1", "上海现场考试彩排（含视奏练习）", "audition", "u-li", "2026-10-27", "doing", {
      roundId: "rd-1b"
    }), o("t-2", "stu-1", "app-1", "确认上海考试行程与住宿", "audition", "u-li", "2026-10-25", "todo", {
      roundId: "rd-1b"
    }), o("t-3", "stu-1", "app-3", "登记专业老师对 RNCM 录像 V2 的意见", "audition", "u-li", "2026-10-24", "todo", {
      roundId: "rd-3a",
      templateId: "tpl-teacher",
      scopeKey: "app:app-3",
      links: [{
        type: "mat",
        id: "m-5"
      }]
    }), o("t-4", "stu-1", "app-3", "上传 RNCM 录像考试视频（Acceptd）", "audition", "u-li", "2026-11-03", "todo", {
      roundId: "rd-3a",
      effect: "round:submitted",
      templateId: "tpl-upload",
      scopeKey: "app:app-3",
      dependsOn: ["t-3"]
    }), o("t-5", "stu-1", "app-2", "跟进 RAM 预审结果", "audition", "u-li", "2026-10-31", "todo", {
      roundId: "rd-2a"
    }), o("t-6", "stu-1", "app-4", "补交 Guildhall 申请费付款凭证", "submission", "u-li", "2026-10-20", "doing", {
      submissionId: "sub-1g",
      note: "学校邮件提醒付款记录未匹配"
    }), o("t-7", "stu-1", null, "复核申请表并正式提交", "submission", "u-li", "2026-09-26", "done", {
      submissionId: "sub-1u",
      effect: "submission:submitted",
      templateId: "tpl-submit",
      scopeKey: "sub:sub-1u",
      doneAt: e("2026-09-28")
    }), o("t-17", "stu-1", null, "填写并提交 Common App（IU 大学部分）", "submission", "u-li", "2026-10-28", "doing", {
      submissionId: "sub-1c",
      effect: "submission:submitted",
      templateId: "tpl-submit",
      scopeKey: "sub:sub-1c"
    }), o("t-19", "stu-1", "app-9", "录制 IU 预审视频", "audition", "u-li", "2026-11-15", "todo", {
      roundId: "rd-9a",
      templateId: "tpl-rep",
      scopeKey: "app:app-9"
    }), o("t-18", "stu-1", "app-9", "提交 Jacobs Supplemental Application（含预审）", "submission", "u-li", "2026-11-25", "todo", {
      submissionId: "sub-1j",
      effect: "submission:submitted",
      templateId: "tpl-submit",
      scopeKey: "sub:sub-1j",
      dependsOn: ["t-19"]
    }), o("t-8", "stu-2", "app-5", "核对 Guildhall MMus 要求与截止日期", "requirements", "u-zhao", "2026-10-28", "todo"), o("t-9", "stu-2", "app-5", "整理作品集曲目与制作说明", "audition", "u-zhao", "2026-11-30", "doing", {
      roundId: "rd-5a"
    }), o("t-10", "stu-2", null, "注册申请平台账号并核对个人信息", "submission", "u-zhao", "2026-10-30", "todo", {
      submissionId: "sub-2u",
      templateId: "tpl-account",
      scopeKey: "sub:sub-2u"
    }), o("t-11", "stu-2", "app-6", "向 Leeds 招生办确认 MA 截止日期", "requirements", "u-zhao", "2026-10-26", "doing", {
      blocked: !0,
      blockedReason: "已发邮件，等待回复"
    }), o("t-12", "stu-2", null, "邀请推荐人并跟进提交", "materials", "u-zhao", "2026-11-20", "doing", {
      submissionId: "sub-2u",
      templateId: "tpl-ref",
      scopeKey: "sub:sub-2u"
    }), o("t-13", "stu-3", "app-7", "跟进 RNCM Offer 条件（IELTS 6.0）", "offer", "u-li", "2026-11-15", "doing"), o("t-14", "stu-3", null, "为许同学报名 11 月雅思", "materials", "u-li", "2026-10-22", "todo"), o("t-15", "stu-3", "app-8", "Leeds 线上面试设备与网络测试", "audition", "u-li", "2026-11-08", "todo", {
      roundId: "rd-8a"
    }), o("t-16", "stu-3", "app-8", "与许同学访谈，补充 Leeds 问答素材", "other", "u-chen", "2026-10-26", "doing", {
      links: [{
        type: "doc",
        id: "doc-8"
      }]
    })];
    const l = (t, e, s, a, i, d, n = {}) => Object.assign({
      id: t,
      studentId: e,
      title: s,
      type: a,
      writerId: i,
      status: d,
      submissionId: null,
      applicationIds: [],
      needStudentConfirm: !0,
      dueDate: "",
      brief: "",
      wordLimit: ""
    }, n);
    t.documents = [l("doc-1", "stu-1", "UCAS Personal Statement", "ps", "u-chen", "final", {
      submissionId: "sub-1u",
      dueDate: "2026-09-20",
      wordLimit: "4000 字符",
      brief: "UCAS Conservatoires 共用一份：音乐经历、选择钢琴演奏的动机、未来规划。"
    }), l("doc-2", "stu-1", "Guildhall Personal Statement", "ps", "u-chen", "final", {
      submissionId: "sub-1g",
      dueDate: "2026-09-18",
      wordLimit: "500 词",
      brief: "Guildhall 自有系统单独提交，可基于 UCAS 版本调整。"
    }), l("doc-3", "stu-1", "音乐简历 CV（现场考试携带）", "cv", "u-chen", "student_review", {
      applicationIds: ["app-1", "app-4"],
      dueDate: "2026-10-26",
      brief: "1 页，列出演出、比赛与师承。"
    }), l("doc-4", "stu-1", "RNCM 录像曲目说明 Programme Note", "supplemental", "u-chen", "supervisor_review", {
      applicationIds: ["app-3"],
      dueDate: "2026-10-29",
      wordLimit: "300 词",
      brief: "对录像中三首作品的简短说明。"
    }), l("doc-9", "stu-1", "Common App Personal Essay", "ps", "u-chen", "drafting", {
      submissionId: "sub-1c",
      dueDate: "2026-10-25",
      wordLimit: "650 词",
      brief: "Common App 主文书（IU 大学部分）。可参考 UCAS 版本素材，但需按美国本科文书重写。"
    }), l("doc-5", "stu-2", "UCAS Personal Statement", "ps", "u-sun", "drafting", {
      submissionId: "sub-2u",
      dueDate: "2026-11-10",
      wordLimit: "4000 字符",
      brief: "UCAS Conservatoires（Leeds MA）。"
    }), l("doc-6", "stu-2", "Guildhall 作品集说明 Artist Statement", "artist_statement", "u-sun", "advisor_review", {
      applicationIds: ["app-5"],
      dueDate: "2026-11-20",
      wordLimit: "600 词"
    }), l("doc-7", "stu-3", "UCAS Conservatoires Personal Statement", "ps", "u-chen", "final", {
      submissionId: "sub-3u",
      dueDate: "2026-09-20",
      wordLimit: "4000 字符"
    }), l("doc-11", "stu-3", "UCAS Undergraduate Personal Statement", "ps", "u-chen", "final", {
      submissionId: "sub-3ug",
      dueDate: "2026-10-05",
      wordLimit: "4000 字符",
      brief: "UCAS Undergraduate 与 Conservatoires 是两个系统，需各提交一份。"
    }), l("doc-8", "stu-3", "Leeds 补充问答 Short Answers", "supplemental", "u-chen", "revising", {
      applicationIds: ["app-8"],
      dueDate: "2026-10-30",
      needStudentConfirm: !1,
      brief: "面试前提交的 3 个短问答。"
    })];
    const c = (t, s, a, i, d, n, o) => ({
      id: t,
      documentId: s,
      no: a,
      link: "https://onedrive.example.com/" + i,
      fileName: i,
      note: d,
      createdBy: n,
      createdAt: e(o)
    });
    t.versions = [c("v-1-1", "doc-1", 1, "Lin_PS_V1.docx", "初稿", "u-chen", "2026-08-20"), c("v-1-2", "doc-1", 2, "Lin_PS_V2.docx", "按顾问意见重写开头", "u-chen", "2026-09-02"), c("v-1-3", "doc-1", 3, "Lin_PS_V3.docx", "按主管意见压缩至 3900 字符", "u-chen", "2026-09-12"), c("v-2-1", "doc-2", 1, "Lin_GSMD_PS_V1.docx", "基于 UCAS 版本改写", "u-chen", "2026-09-14"), c("v-3-1", "doc-3", 1, "Lin_CV_V1.pdf", "初版", "u-chen", "2026-10-15"), c("v-3-2", "doc-3", 2, "Lin_CV_V2.pdf", "补充 2025 比赛与大师课经历", "u-chen", "2026-10-19"), c("v-4-1", "doc-4", 1, "Lin_RNCM_Note_V1.docx", "初稿", "u-chen", "2026-10-14"), c("v-4-2", "doc-4", 2, "Lin_RNCM_Note_V2.docx", "缩短 Debussy 段落", "u-chen", "2026-10-20"), c("v-9-1", "doc-9", 1, "", "在线初稿（未送审）", "u-chen", "2026-10-21"), c("v-6-1", "doc-6", 1, "Zhou_Artist_Statement_V1.docx", "初稿，含三首作品说明", "u-sun", "2026-10-21"), c("v-7-1", "doc-7", 1, "Xu_PS_V1.docx", "初稿", "u-chen", "2026-09-05"), c("v-7-2", "doc-7", 2, "Xu_PS_V2.docx", "定稿版", "u-chen", "2026-09-15"), c("v-11-1", "doc-11", 1, "Xu_UCAS_UG_PS_V1.docx", "基于 Conservatoires 版本改写", "u-chen", "2026-10-01"), c("v-8-1", "doc-8", 1, "Xu_Leeds_SA_V1.docx", "初稿", "u-chen", "2026-10-18")];
    const u = (t, s, a, i, d, n, o, l) => ({
      id: t,
      documentId: s,
      versionId: a,
      stage: i,
      userId: d,
      decision: n,
      comment: o,
      createdAt: e(l, 15)
    });
    t.reviews = [u("r-1", "doc-1", "v-1-1", "advisor", "u-li", "changes", "开头太像简历罗列，请从一次具体的演奏经历切入。", "2026-08-24"), u("r-2", "doc-1", "v-1-2", "advisor", "u-li", "approve", "结构清楚，可以给主管。", "2026-09-04"), u("r-3", "doc-1", "v-1-2", "supervisor", "u-sup", "changes", "超出 4000 字符，未来规划部分压缩。", "2026-09-06"), u("r-4", "doc-1", "v-1-3", "advisor", "u-li", "approve", "", "2026-09-13"), u("r-5", "doc-1", "v-1-3", "supervisor", "u-sup", "approve", "定稿。", "2026-09-14"), u("r-6", "doc-1", "v-1-3", "student", "u-s1", "approve", "", "2026-09-15"), u("r-7", "doc-2", "v-2-1", "advisor", "u-li", "approve", "", "2026-09-15"), u("r-8", "doc-2", "v-2-1", "supervisor", "u-sup", "approve", "", "2026-09-16"), u("r-9", "doc-2", "v-2-1", "student", "u-s1", "approve", "", "2026-09-17"), u("r-10", "doc-3", "v-3-1", "advisor", "u-li", "changes", "缺少 2025 年的比赛和大师课。", "2026-10-16"), u("r-11", "doc-3", "v-3-2", "advisor", "u-li", "approve", "", "2026-10-20"), u("r-12", "doc-3", "v-3-2", "supervisor", "u-sup", "approve", "可以发给学生确认。", "2026-10-21"), u("r-13", "doc-4", "v-4-1", "advisor", "u-li", "changes", "Debussy 段落太长，三首篇幅要均衡。", "2026-10-16"), u("r-14", "doc-4", "v-4-2", "advisor", "u-li", "approve", "", "2026-10-21"), u("r-15", "doc-7", "v-7-2", "advisor", "u-li", "approve", "", "2026-09-16"), u("r-16", "doc-7", "v-7-2", "supervisor", "u-sup", "approve", "", "2026-09-17"), u("r-17", "doc-7", "v-7-2", "student", "u-s3", "approve", "", "2026-09-18"), u("r-19", "doc-11", "v-11-1", "advisor", "u-li", "approve", "", "2026-10-02"), u("r-20", "doc-11", "v-11-1", "supervisor", "u-sup", "approve", "", "2026-10-03"), u("r-21", "doc-11", "v-11-1", "student", "u-s3", "approve", "", "2026-10-04"), u("r-18", "doc-8", "v-8-1", "advisor", "u-li", "changes", "第二题没有回答“为什么选择 Leeds”，请结合访谈补充。", "2026-10-21")];
    const p = {
      "v-4-2": "Programme Note\n\nJ. S. Bach – Prelude and Fugue in C-sharp minor, BWV 849\nThe five-voice fugue is one of the most solemn pieces in Book I. I aim to let each entry of the subject sing through the texture, shaping the long arch towards the final stretto.\n\nC. Debussy – La soirée dans Grenade\nA habanera rhythm runs underneath shimmering harmonies. I try to keep the pedal light so that the guitar-like figures stay clear.\n\nF. Chopin – Ballade No. 1 in G minor, Op. 23\nThe ballade tells a story without words. My interpretation focuses on the contrast between the hesitant opening and the stormy coda.",
      "v-9-1": "The first time I heard Chopin's First Ballade live, I was six years old ... (demo text, Common App draft)\n\nGrowing up in Shanghai, the piano was the place where I learned to listen ...",
      "v-8-1": "Q1. Why Leeds Conservatoire?\nI want to study in a city with a lively independent music scene ...\n\nQ2. Describe a performance that changed you.\nLast summer I sang at a small charity concert ...\n\nQ3. What will you bring to the course?\nI write my own songs in Chinese and English ..."
    };
    for (const e of t.versions) {
      const s = t.documents.find(t => t.id === e.documentId);
      e.studentId = s.studentId, p[e.id] ? (e.kind = "text", e.text = p[e.id], e.words = w(e.text), delete e.link, delete e.fileName) : e.kind = "file";
    }
    for (const e of t.reviews) e.studentId = t.documents.find(t => t.id === e.documentId).studentId;
    for (const e of t.documents) {
      const s = t.versions.filter(t => t.documentId === e.id).sort((t, e) => e.no - t.no);
      e.currentVersionId = s[0]?.id || null;
    }
    const m = (t, s, a, i, d) => ({
        no: t,
        link: "https://onedrive.example.com/" + s,
        fileName: s,
        note: a,
        by: i,
        at: e(d)
      }),
      v = (t, s, a, i, d, n, o) => ({
        id: t,
        source: "专业老师",
        author: s,
        verdict: a,
        text: i,
        versionNo: d,
        by: n,
        at: e(o, 16)
      }),
      h = (t, e, s, a, i, d, n = {}) => Object.assign({
        id: t,
        studentId: e,
        kind: s,
        title: a,
        status: i,
        versions: d,
        applicationIds: [],
        roundIds: [],
        feedback: [],
        note: ""
      }, n);
    t.materials = [h("m-1", "stu-1", "passport", "护照扫描件", "approved", [m(1, "Lin_passport.pdf", "", "u-li", "2026-08-01")], {
      note: "通过安全渠道接收"
    }), h("m-2", "stu-1", "transcript", "高中成绩单及英文翻译", "approved", [m(1, "Lin_transcript_EN.pdf", "学校盖章版", "u-li", "2026-08-10")]), h("m-3", "stu-1", "language", "IELTS 成绩单（6.0）", "approved", [m(1, "Lin_IELTS.pdf", "", "u-li", "2026-08-28")]), h("m-4", "stu-1", "video", "RCM 预审录像", "approved", [m(1, "Lin_RCM_pre_V1.mp4", "首次录制", "u-li", "2026-09-10"), m(2, "Lin_RCM_pre_V2.mp4", "重录 Chopin", "u-li", "2026-09-20")], {
      applicationIds: ["app-1"],
      roundIds: ["rd-1a"],
      feedback: [v("fb-1", "张老师", "changes", "Chopin 尾声速度过快，收音有爆音，建议重录。", 1, "u-li", "2026-09-12"), v("fb-2", "张老师", "approve", "可以提交。", 2, "u-li", "2026-09-21")]
    }), h("m-4b", "stu-1", "video", "RAM 预审录像", "approved", [m(1, "Lin_RAM_pre_V1.mp4", "RAM 要求含一首巴洛克作品，曲目与 RCM 不同", "u-li", "2026-09-22")], {
      applicationIds: ["app-2"],
      roundIds: ["rd-2a"],
      feedback: [v("fb-4", "张老师", "approve", "巴赫声部清楚，可以提交。", 1, "u-li", "2026-09-24")]
    }), h("m-5", "stu-1", "video", "RNCM 录像考试视频", "review", [m(1, "Lin_RNCM_V1.mp4", "", "u-li", "2026-10-12"), m(2, "Lin_RNCM_V2.mp4", "换了录音棚重录", "u-li", "2026-10-21")], {
      applicationIds: ["app-3"],
      roundIds: ["rd-3a"],
      feedback: [v("fb-3", "张老师", "changes", "Bach 赋格声部不够清楚；Debussy 第二首踏板过多。", 1, "u-li", "2026-10-14")]
    }), h("m-6", "stu-1", "repertoire_list", "曲目单（各校）", "approved", [m(1, "Lin_repertoire.docx", "", "u-li", "2026-09-05")], {
      applicationIds: ["app-1", "app-2", "app-3", "app-4"]
    }), h("m-7", "stu-2", "portfolio", "作品集（3 首原创制作）", "collecting", [m(1, "Zhou_portfolio_draft/", "两首已完成混音", "u-zhao", "2026-10-18")], {
      applicationIds: ["app-5", "app-6"],
      roundIds: ["rd-5a", "rd-6a"]
    }), h("m-8", "stu-2", "transcript", "本科成绩单（中英文）", "approved", [m(1, "Zhou_transcript.pdf", "", "u-zhao", "2026-09-20")]), h("m-9", "stu-3", "video", "RNCM 演唱录像", "approved", [m(1, "Xu_RNCM.mp4", "", "u-li", "2026-09-22")], {
      applicationIds: ["app-7"],
      roundIds: ["rd-7a"]
    }), h("m-10", "stu-3", "language", "IELTS 成绩单（5.5）", "approved", [m(1, "Xu_IELTS.pdf", "", "u-li", "2026-07-20")])], t.repertoire = [{
      id: "rp-1",
      studentId: "stu-1",
      composer: "F. Chopin",
      title: "Ballade No. 1 in G minor, Op. 23",
      duration: "9:30",
      applicationIds: ["app-1", "app-4", "app-9"],
      round: "预审 / 现场",
      status: "recorded",
      note: ""
    }, {
      id: "rp-2",
      studentId: "stu-1",
      composer: "L. van Beethoven",
      title: "Sonata Op. 57 “Appassionata”, I.",
      duration: "10:00",
      applicationIds: ["app-1", "app-4"],
      round: "现场考试",
      status: "ready",
      note: ""
    }, {
      id: "rp-5",
      studentId: "stu-1",
      composer: "J. S. Bach",
      title: "Partita No. 2, BWV 826: Sinfonia",
      duration: "4:30",
      applicationIds: ["app-2"],
      round: "RAM 预审",
      status: "recorded",
      note: "RAM 要求巴洛克作品"
    }, {
      id: "rp-3",
      studentId: "stu-1",
      composer: "J. S. Bach",
      title: "Prelude & Fugue in C♯ minor, BWV 849",
      duration: "6:40",
      applicationIds: ["app-3"],
      round: "RNCM 录像",
      status: "recorded",
      note: ""
    }, {
      id: "rp-4",
      studentId: "stu-1",
      composer: "C. Debussy",
      title: "Estampes: II. La soirée dans Grenade",
      duration: "5:20",
      applicationIds: ["app-3"],
      round: "RNCM 录像",
      status: "practicing",
      note: "老师建议减少踏板"
    }];
    const b = (t, e, s) => Object.assign({
      id: t,
      studentId: e,
      name: "",
      title: "",
      phone: "",
      email: "",
      address: "",
      course: "",
      duration: "",
      relation: "",
      bio: "",
      note: "",
      fromIntake: !0
    }, s);
    t.recommenders = [b("rc-1", "stu-1", {
      name: "王老师",
      title: "钢琴主课老师",
      phone: "微信 wang_demo",
      email: "teacher.wang@example.com",
      course: "钢琴",
      duration: "四年",
      relation: "主课老师",
      bio: "毕业于某音乐学院，曾在德国访学。"
    }), b("rc-4", "stu-1", {
      name: "刘老师",
      title: "数学老师 / 年级主任",
      email: "liu.math@example.com",
      course: "数学",
      duration: "两年",
      relation: "高中任课老师"
    }), b("rc-2", "stu-2", {
      name: "Prof. Liu",
      title: "录音艺术系副教授",
      email: "liu@example.edu",
      course: "混音与母带",
      duration: "三年",
      relation: "毕业设计导师"
    }), b("rc-3", "stu-3", {
      name: "何老师",
      title: "声乐老师 / 班主任",
      email: "he@example.com",
      course: "流行演唱",
      duration: "三年",
      relation: "主课老师"
    })], t.refRequests = [{
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
    }];
    const $ = (t, s, a, d, n, o, l = !0) => ({
      id: i("act"),
      studentId: t,
      applicationId: s,
      userId: a,
      text: d,
      at: e(n, o),
      studentVisible: l
    });
    return t.activity = [$("stu-1", null, "u-li", "UCAS Conservatoires 申请已提交（RCM、RAM、RNCM）", "2026-09-28", 11), $("stu-1", "app-1", "u-li", "RCM 预审通过，已确定 10 月 30 日上海考点现场考试", "2026-10-12", 14), $("stu-1", "app-9", "u-li", "添加院校申请：IU Jacobs（大学申请 + 音乐学院申请两部分）", "2026-10-15", 10), $("stu-1", "app-3", "u-li", "RNCM 录像 V2 已登记，等待专业老师意见", "2026-10-21", 17, !1), $("stu-1", null, "u-sup", "音乐简历 CV 已由主管定稿，请学生确认", "2026-10-21", 18), $("stu-3", "app-7", "u-li", "收到 RNCM 有条件录取（IELTS 6.0）", "2026-10-20", 9), $("stu-2", null, "u-s2", "学生更新了基础信息采集表（联系电话、问题 3）", "2026-10-21", 21, !1), $("stu-2", "app-6", "u-zhao", "已确认 Leeds MA 院校要求", "2026-10-10", 15)], t;
  }
  const bt = {
      user: t => st.get("users", t),
      student: t => st.get("students", t),
      app: t => st.get("applications", t),
      sub: t => st.get("submissions", t),
      doc: t => st.get("documents", t),
      task: t => st.get("tasks", t),
      appsOf: t => st.where("applications", e => e.studentId === t),
      activeAppsOf: t => st.where("applications", e => e.studentId === t && !e.withdrawn),
      subsOf: t => st.where("submissions", e => e.studentId === t),
      appsOfSub: t => st.where("applications", e => !e.withdrawn && (e.parts || []).some(e => e.submissionId === t)),
      roundsOf: t => st.where("rounds", e => e.applicationId === t).sort((t, e) => $(t.deadline || t.date, e.deadline || e.date)),
      tasksOf: t => st.where("tasks", e => e.studentId === t),
      docsOf: t => st.where("documents", e => e.studentId === t && !e.archived),
      versionsOf: t => st.where("versions", e => e.documentId === t).sort((t, e) => e.no - t.no),
      reviewsOf: t => st.where("reviews", e => e.documentId === t).sort((t, e) => String(t.createdAt).localeCompare(String(e.createdAt))),
      matsOf: t => st.where("materials", e => e.studentId === t && !e.archived),
      repOf: t => st.where("repertoire", e => e.studentId === t),
      recsOf: t => st.where("recommenders", e => e.studentId === t)
    },
    $t = t => bt.user(t)?.name || "未分配";
  function ft(t) {
    return t?.schoolId ? dt(t.schoolId)?.abbr || t.schoolId : t?.schoolName || "—";
  }
  function gt(t) {
    const e = dt(t?.schoolId);
    return e ? e.zh : t?.schoolName || "—";
  }
  function yt(t) {
    return t ? `${ft(t)} · ${t.program || ot(t.majorId)}` : "—";
  }
  const kt = t => !!C[t?.platform]?.shared;
  function It(t) {
    return t ? t.name || C[t.platform]?.label || t.platform : "—";
  }
  function wt(t) {
    return bt.appsOfSub(t.id).map(ft).join("、") || "尚未关联院校";
  }
  const xt = t => !!t && ["submitted", "received"].includes(t.status);
  function St(t) {
    return (t?.parts || []).map(t => Object.assign({}, t, {
      sub: bt.sub(t.submissionId)
    }));
  }
  const jt = t => xt(t.sub || bt.sub(t.submissionId)) && (!t.needsAdd || !!t.addedAt);
  function At(t) {
    const e = t.sub || bt.sub(t.submissionId);
    return xt(e) && t.needsAdd && !t.addedAt ? '<span class="pill warn">需在平台添加本校志愿</span>' : Q(_, e?.status || "not_started");
  }
  function qt(t) {
    const e = St(t).filter(t => !1 !== t.required);
    return {
      done: e.filter(jt).length,
      total: e.length
    };
  }
  function Ot(t) {
    const e = qt(t);
    return e.total > 0 && e.done === e.total;
  }
  function Ct(t) {
    return bt.appsOfSub(t).flatMap(e => (e.parts || []).filter(e => e.submissionId === t && e.deadline?.date).map(t => t.deadline.date)).sort()[0] || "";
  }
  function Dt(t) {
    if (t.withdrawn) return {
      idx: 6,
      label: "已撤回",
      key: "withdrawn",
      closed: !0,
      bad: !0
    };
    const e = t.decision?.type || "pending",
      s = t.outcome?.type || "pending";
    if ("pending" !== e) return {
      idx: 6,
      label: "accepted" === e ? "已接受 Offer" : "已放弃",
      key: "closed",
      closed: !0
    };
    if ("rejected" === s) return {
      idx: 6,
      label: "未录取",
      key: "closed",
      closed: !0,
      bad: !0
    };
    if ("pending" !== s) return {
      idx: 5,
      label: X(B, s) + "，待学生决定",
      key: "result"
    };
    const a = bt.roundsOf(t.id).filter(t => "cancelled" !== t.status);
    if (a.some(t => "not_passed" === t.status)) return {
      idx: 4,
      label: "考试未通过，等待最终结果",
      key: "awaiting",
      bad: !0
    };
    if (!Ot(t)) {
      const e = qt(t);
      return t.reqConfirmed || 0 !== e.done ? e.done > 0 ? {
        idx: 2,
        label: `已提交 ${e.done}/${e.total} 个提交项`,
        key: "partial"
      } : {
        idx: 1,
        label: St(t).some(t => "in_progress" === t.sub?.status) ? "申请表填写中" : "准备申请材料",
        key: "preparing"
      } : {
        idx: 0,
        label: "待核对院校要求",
        key: "planning"
      };
    }
    const i = a.filter(t => !N(t));
    if (i.length) {
      const t = i.sort((t, e) => $(t.date || t.deadline, e.date || e.deadline))[0];
      return {
        idx: 3,
        label: X(L, t.kind) + " · " + X(M(t.kind), t.status),
        key: "audition"
      };
    }
    return {
      idx: 4,
      label: "等待录取结果",
      key: "awaiting"
    };
  }
  function _t(t) {
    const e = Dt(t);
    return `<div class="stepper">${R.map((t, s) => `<div class="step ${e.closed ? 5 === s && e.bad ? "cur bad" : "done" : s < e.idx ? "done" : s === e.idx ? "cur" + (e.bad ? " bad" : "") : ""}">${t}${s !== e.idx || e.closed ? e.closed && 5 === s ? `<small>${a(e.label)}</small>` : "" : `<small>${a(e.label)}</small>`}</div>`).join("")}</div>`;
  }
  function Lt(t) {
    const e = Dt(t);
    return `<span class="mini-steps" title="${a(e.label)}">${R.map((t, s) => `<i class="${e.closed ? e.bad && 5 === s ? "bad" : "done" : s < e.idx ? "done" : s === e.idx ? e.bad ? "bad" : "cur" : ""}"></i>`).join("")}</span>`;
  }
  function Et(t, {
    includeInternal: e = !1
  } = {}) {
    const s = [];
    for (const e of St(t)) !1 !== e.required && !jt(e) && e.deadline?.date && s.push({
      date: e.deadline.date,
      label: `${It(e.sub)}截止` + (e.deadline.verified ? "" : "（待核实）"),
      kind: "deadline",
      verified: !!e.deadline.verified
    });
    e && t.internalDeadline && !Ot(t) && s.push({
      date: t.internalDeadline,
      label: "内部目标：完成提交",
      kind: "internal"
    });
    for (const e of bt.roundsOf(t.id)) "preparing" === e.status && e.deadline && s.push({
      date: e.deadline,
      label: X(L, e.kind) + "截止" + (e.platform ? `（${e.platform}）` : ""),
      kind: "round"
    }), "scheduled" === e.status && e.date && s.push({
      date: e.date,
      label: X(L, e.kind) + (e.location ? " · " + e.location : ""),
      kind: "exam"
    });
    return s.sort((t, e) => $(t.date, e.date));
  }
  function Tt(t, e) {
    return Et(t, e).find(t => u(t.date) >= 0) || Et(t, e)[0] || null;
  }
  function Mt(t, e) {
    const s = e || t.reqConfirmed?.lang;
    if (!s) return {
      status: "na",
      text: "未设定语言要求"
    };
    const a = function (t, e = "IELTS") {
        return (t?.profile?.tests || []).filter(t => (t.type || "").toUpperCase() === e && null !== g(t.overall)).sort((t, e) => (g(e.overall) || 0) - (g(t.overall) || 0))[0] || null;
      }(bt.student(t.studentId)),
      i = `IELTS ${s.o}${null !== g(s.m) ? "，单项 " + s.m : ""}`;
    if (!a) return {
      status: "missing",
      text: `要求 ${i}；学生档案中暂无雅思成绩`
    };
    const d = g(a.overall),
      n = g(a.min),
      o = g(s.o),
      l = g(s.m),
      r = null === o || null !== d && d >= o,
      c = null === l || null !== n && n >= l,
      u = `学生 ${a.overall}${a.min ? "（最低单项 " + a.min + "）" : ""}`;
    return r && c ? {
      status: "ok",
      text: `要求 ${i}；${u}，已达标`
    } : {
      status: "gap",
      text: `要求 ${i}；${u}，未达标`
    };
  }
  function Nt(t) {
    if (t.withdrawn || Dt(t).closed) return [];
    const e = [],
      s = {
        studentId: t.studentId,
        applicationId: t.id
      },
      a = (t, a, i) => e.push(Object.assign({
        level: t,
        text: a,
        date: i
      }, s));
    Ot(t) || t.reqConfirmed || a("info", "院校要求尚未核对"), (t.parts || []).length || a("warn", "还没有设置提交项（申请平台）");
    for (const e of St(t)) {
      if (!1 === e.required || jt(e)) continue;
      const s = It(e.sub);
      if (xt(e.sub) && e.needsAdd) {
        a("warn", `${s} 已提交过，需在平台上添加本校志愿`);
        continue;
      }
      const i = e.deadline || {};
      if (i.date) {
        const e = u(i.date);
        e < 0 ? a("err", `${s}截止已过 ${-e} 天，仍未提交`, i.date) : e <= 14 && a("warn", `距${s}截止还有 ${e} 天，尚未提交`, i.date), !i.verified && e >= 0 && a("warn", `${s}截止日期尚未核实`, i.date), t.internalDeadline && t.internalDeadline > i.date && a("warn", `内部目标日期晚于${s}截止`, t.internalDeadline);
      } else a("warn", `${s}截止日期未知，需向学校确认`);
    }
    for (const e of bt.roundsOf(t.id)) {
      if ("preparing" === e.status && e.deadline) {
        const t = u(e.deadline);
        t < 0 ? a("err", `${X(L, e.kind)}截止已过 ${-t} 天，仍未提交`, e.deadline) : t <= 14 && a("warn", `${X(L, e.kind)}还有 ${t} 天截止`, e.deadline);
      }
      if ("scheduled" === e.status && e.date) {
        const t = u(e.date);
        t >= 0 && t <= 10 && a("info", `${X(L, e.kind)} ${0 === t ? "今天" : t + " 天后"}进行`, e.date);
      }
    }
    const i = Mt(t);
    return "gap" === i.status && a("conditional" === t.outcome?.type ? "info" : "warn", "语言成绩未达标：" + i.text.split("；")[1], null), "missing" === i.status && a("warn", "缺少语言成绩", null), "conditional" === t.outcome?.type && "pending" === (t.decision?.type || "pending") && a("info", "有条件录取：" + (t.outcome.conditions || "待完成条件"), null), e;
  }
  function Bt(t) {
    return t.filter(t => !["done", "na"].includes(t.status) && t.dueDate && u(t.dueDate) < 0);
  }
  const Pt = {
    err: 0,
    warn: 1,
    info: 2
  };
  function Rt(t) {
    return t.sort((t, e) => Pt[t.level] - Pt[e.level] || $(t.date, e.date));
  }
  const Ft = {
    outcome: (t, e) => "pending" === e || Ot(t) ? "" : "本校的必需提交项尚未全部提交，不能登记录取结果。",
    decision(t, e, s) {
      const a = s ?? t.outcome?.type;
      return "pending" === e || ["conditional", "unconditional"].includes(a) ? "" : "只有收到录取（有条件或无条件）后，才能登记学生决定。";
    },
    round(t, e) {
      if (!L[t.kind]?.media && ["scheduled", "done", "not_passed"].includes(e)) {
        const e = bt.roundsOf(t.applicationId).find(e => e.id !== t.id && "prescreen" === e.kind && "cancelled" !== e.status);
        if (e && "passed" !== e.status) return "本校预审尚未通过，不能安排或登记现场 / 线上考试。";
      }
      return "";
    },
    submission(t, e) {
      if (xt(t) && !["submitted", "received"].includes(e)) {
        const e = bt.appsOfSub(t.id).filter(t => "pending" !== (t.outcome?.type || "pending") || bt.roundsOf(t.id).some(t => ["passed", "done"].includes(t.status)));
        if (e.length) return `${e.map(ft).join("、")} 已有考试或录取结果，不能把这次提交改回“未提交”。`;
      }
      return "";
    }
  };
  function Vt(t) {
    return t.submissionId ? bt.appsOfSub(t.submissionId) : (t.applicationIds || []).map(bt.app).filter(Boolean);
  }
  function Ut(t) {
    if (t.submissionId) {
      const e = bt.sub(t.submissionId);
      return kt(e) ? `${It(e)}（${wt(e)} 共用）` : `${wt(e)} · ${It(e)}`;
    }
    return Vt(t).map(ft).join("、") || "未关联院校";
  }
  function zt(t) {
    if ("final" !== t.status) return !1;
    if (t.submissionId) return xt(bt.sub(t.submissionId));
    const e = Vt(t);
    return e.length > 0 && e.every(Ot);
  }
  function Ht(t) {
    return zt(t) ? '<span class="pill ok">已定稿 · 已随申请提交</span>' : Q(U, t.status);
  }
  function Gt(t) {
    return bt.reviewsOf(t.id).filter(t => "changes" === t.decision).pop() || null;
  }
  function Jt(t, e, s, a = !0) {
    st.put("activity", {
      id: i("act"),
      studentId: t,
      applicationId: e || null,
      userId: se.user?.id,
      text: s,
      at: d(),
      studentVisible: a
    });
  }
  function Yt(t) {
    if (["submitted", "passed", "not_passed"].includes(t.status)) for (const e of st.where("tasks", e => e.roundId === t.id && "round:submitted" === e.effect && Kt(e))) st.patch("tasks", e.id, {
      status: "done",
      doneAt: d()
    });
  }
  const Kt = t => !["done", "na"].includes(t.status);
  function Zt(t) {
    return t.applicationId ? ft(bt.app(t.applicationId)) : t.submissionId ? It(bt.sub(t.submissionId)) : "学生通用";
  }
  function Wt(t) {
    return (t.dependsOn || []).map(bt.task).filter(t => t && Kt(t));
  }
  function Xt(t) {
    const [e, s] = t.split(":");
    return "app" === e ? bt.app(s) : "sub" === e ? bt.sub(s) : bt.student(s);
  }
  function Qt(t, e) {
    const s = Xt(t);
    s && e && ((s.skipTpl || []).includes(e) || st.put(function (t) {
      return {
        app: "applications",
        sub: "submissions",
        stu: "students"
      }[t.split(":")[0]];
    }(t), Object.assign(s, {
      skipTpl: (s.skipTpl || []).concat([e])
    })));
  }
  function te(t) {
    return bt.activeAppsOf(t).flatMap(t => (t.parts || []).filter(t => !jt(t) && t.deadline?.date).map(t => t.deadline.date)).sort()[0] || "";
  }
  const ee = et + "session",
    se = {
      user: null,
      restore() {
        if (!t) try {
          const t = localStorage.getItem(ee);
          this.user = t ? bt.user(t) : null, this.user && !this.user.active && (this.user = null);
        } catch (t) {
          this.user = null;
        }
      },
      login(t) {
        this.user = bt.user(t);
        try {
          localStorage.setItem(ee, t);
        } catch (t) {}
      },
      logout() {
        this.user = null;
        try {
          localStorage.removeItem(ee);
        } catch (t) {}
      }
    },
    ae = () => se.user,
    ie = () => se.user?.role,
    de = () => "supervisor" === ie(),
    ne = () => "advisor" === ie(),
    oe = () => "writer" === ie(),
    le = () => "student" === ie(),
    re = () => ["supervisor", "advisor", "writer"].includes(ie()),
    ce = {
      students() {
        const t = ae();
        return t ? "supervisor" === t.role ? st.all("students") : "advisor" === t.role ? st.where("students", e => e.advisorId === t.id) : "writer" === t.role ? st.where("students", e => (e.writerIds || []).includes(t.id) || st.all("documents").some(s => s.studentId === e.id && s.writerId === t.id)) : "student" === t.role ? st.where("students", e => e.id === t.studentId) : [] : [];
      },
      seeStudent(t) {
        return this.students().some(e => e.id === t);
      },
      manage(t) {
        const e = bt.student(t);
        return !!e && (de() || ne() && e.advisorId === ae().id);
      },
      assign: () => de(),
      admin: () => de(),
      seeDoc(t) {
        return !!t && (le() ? t.studentId === ae().studentId && ["student_review", "final"].includes(t.status) : oe() && t.writerId === ae().id || this.seeStudent(t.studentId));
      },
      docMeta(t) {
        return this.manage(t.studentId);
      },
      docUpload(t) {
        return ["drafting", "revising"].includes(t.status) && (t.writerId === ae()?.id || this.manage(t.studentId));
      },
      docSubmit(t) {
        if (!this.docUpload(t) || !t.currentVersionId) return !1;
        if ("revising" === t.status) {
          const e = Gt(t);
          return !e || e.versionId !== t.currentVersionId;
        }
        return !0;
      },
      docAdvisorReview(t) {
        return "advisor_review" === t.status && this.manage(t.studentId);
      },
      docSupervisorReview: t => "supervisor_review" === t.status && de(),
      docStudentReview: t => "student_review" === t.status && le() && t.studentId === ae().studentId,
      docReopen(t) {
        return "final" === t.status && this.manage(t.studentId);
      },
      taskStatus(t) {
        return this.manage(t.studentId) || t.assigneeId === ae()?.id;
      },
      taskEdit(t) {
        return this.manage(t.studentId);
      }
    };
  function ue(t) {
    const e = ae();
    return !!e && ("writer" === e.role ? t.writerId === e.id && ["drafting", "revising"].includes(t.status) : "advisor" === e.role ? "advisor_review" === t.status && bt.student(t.studentId)?.advisorId === e.id : "supervisor" === e.role ? "supervisor_review" === t.status : "student" === e.role && "student_review" === t.status && t.studentId === e.studentId);
  }
  const pe = {
      not_started: ["未开始", ""],
      draft: ["学生填写中", "info"],
      submitted: ["已提交，待核对", "warn"],
      updated: ["学生有更新，待核对", "warn"],
      verified: ["已核对", "ok"]
    },
    me = (t, e, s = {}) => Object.assign({
      key: t,
      label: e,
      type: "text"
    }, s),
    ve = [{
      id: "s1",
      no: "01",
      title: "个人基本信息",
      fields: [me("nameZh", "姓名（中文）", {
        required: !0
      }), me("nameEn", "姓名（英文 / 拼音）", {
        required: !0
      }), me("gender", "性别（可选）", {
        type: "select",
        options: ["", "女", "男", "其他", "不愿透露"]
      }), me("birthDate", "出生日期", {
        type: "date",
        required: !0
      }), me("nationality", "国籍", {
        required: !0
      }), me("birthPlace", "出生地"), me("phone", "联系电话", {
        required: !0
      }), me("email", "电子邮箱", {
        type: "email",
        required: !0
      }), me("addressZh", "通信地址（中文）", {
        full: !0
      }), me("postcode", "邮政编码"), me("preferredName", "常用称呼 / 英文名"), me("addressEn", "通信地址（英文，如有）", {
        full: !0
      })]
    }, {
      id: "s2",
      no: "02",
      title: "监护人信息",
      table: {
        key: "guardians",
        min: 2,
        add: "添加监护人",
        cols: [me("name", "姓名"), me("relation", "与学生关系"), me("phone", "联系电话"), me("email", "电子邮箱（选填）"), me("address", "家庭住址", {
          wide: !0
        })]
      },
      requiredRule: "guardian"
    }, {
      id: "s3",
      no: "03",
      title: "教育背景",
      table: {
        key: "education",
        min: 2,
        defaults: [{
          stage: "初中"
        }, {
          stage: "高中 / 当前学校"
        }],
        add: "添加学校",
        cols: [me("stage", "教育阶段"), me("schoolZh", "学校中文名称"), me("schoolEn", "学校英文名称（如有）"), me("type", "学校类型"), me("period", "就读时间"), me("address", "学校地址（含邮编）", {
          wide: !0
        })]
      },
      fields: [me("gpa", "高中 GPA / 平均成绩"), me("gpaScale", "计分方式（如 100 分制 / 4.0 制）"), me("gaokaoDate", "高考时间（如参加）"), me("gaokaoScore", "高考总分及各科分数（如适用）")]
    }, {
      id: "s4",
      no: "04",
      title: "语言能力与其他考试",
      note: "如已参加考试，请填写实际成绩；如尚未参加，请填写预计考试日期。“最低单项”用于自动比对院校语言要求。",
      table: {
        key: "tests",
        min: 1,
        add: "添加考试",
        cols: [me("type", "考试类型", {
          type: "select",
          options: ["", "IELTS", "TOEFL", "PTE", "Duolingo", "Cambridge", "LanguageCert", "其他"]
        }), me("date", "考试日期 / 预计日期"), me("regNo", "注册号 / Candidate No."), me("overall", "总分"), me("subs", "各项小分"), me("min", "最低单项"), me("account", "账号邮箱 / 用户名（选填）")]
      },
      fields: [me("otherTests", "其他考试 / 证书"), me("otherTestsScore", "考试日期及成绩"), me("testNote", "备注（如未考试，请填写预计时间）", {
        full: !0
      })]
    }, {
      id: "s5",
      no: "05",
      title: "音乐会实践、活动与比赛",
      table: {
        key: "activities",
        min: 3,
        add: "添加一条",
        cols: [me("period", "时间（年/月—年/月）"), me("name", "音乐会 / 活动 / 比赛名称"), me("role", "参与角色、内容与成果", {
          wide: !0
        })]
      }
    }, {
      id: "s6",
      no: "06",
      title: "奖项与荣誉",
      table: {
        key: "awards",
        min: 2,
        add: "添加一条",
        cols: [me("date", "时间（年/月）"), me("name", "比赛奖项或荣誉名称"), me("org", "主办方 / 级别 / 备注（选填）", {
          wide: !0
        })]
      }
    }, {
      id: "s7",
      no: "07",
      title: "其他能力、特长与兴趣爱好",
      fields: [me("abilities", "其他能力或特长", {
        type: "textarea"
      }), me("hobbies", "兴趣爱好", {
        type: "textarea"
      })]
    }, {
      id: "s8",
      no: "08",
      title: "个人陈述素材 · 专业兴趣与学习经历",
      essay: !0,
      note: "回答不要求写成正式英文文书，请用自己的真实表达；具体事例比概括性描述更有帮助。",
      fields: [me("q1", "问题 1｜为什么选择现在申请的专业？", {
        type: "textarea",
        full: !0,
        rows: 6,
        hint: "兴趣最初从何而来？是否受到家庭、个人经历、作品或某位艺术家的影响？申请专业与你的生活经历有什么联系？是否学习过其他乐器或专业？建议不少于 100 个中文字。",
        minChars: 100
      }), me("q2", "问题 2｜高中阶段的专业与文化学习情况", {
        type: "textarea",
        full: !0,
        rows: 6,
        hint: "专业学习遇到过哪些困难或获得了什么启发？你如何面对并解决？请尽量结合具体经历。建议不少于 100 个中文字。",
        minChars: 100
      }), me("q3", "问题 3｜毕业后的职业与人生规划", {
        type: "textarea",
        full: !0,
        rows: 5,
        hint: "大学毕业后希望从事什么工作？是否计划继续深造、参与演出、创作、研究或教育？"
      })]
    }, {
      id: "s9",
      no: "09",
      title: "个人陈述素材 · 个人成长、成就与活动经历",
      essay: !0,
      fields: [me("q4", "问题 4｜曾经遇到的重大困难或严峻挑战", {
        type: "textarea",
        full: !0,
        rows: 6,
        hint: "你如何克服？依靠了什么精神或方法？从中获得了什么启迪？建议不少于 100 个中文字。",
        minChars: 100
      }), me("q5", "问题 5｜最重要的成就、特殊经历或独特能力", {
        type: "textarea",
        full: !0,
        rows: 5,
        hint: "哪些经历令你骄傲？有哪些与众不同的才华、能力或成果？请尽量提供具体事例。"
      }), me("q6", "问题 6｜学生组织、校园活动、社会实践或公益活动", {
        type: "textarea",
        full: !0,
        rows: 5,
        hint: "请列明活动时间、名称、内容及你承担的角色，并说明锻炼了哪些能力。"
      }), me("q7", "问题 7｜其他希望在个人陈述中呈现的个人特点", {
        type: "textarea",
        full: !0,
        rows: 4,
        hint: "可补充能够体现个人特色、价值观、兴趣深度或跨领域能力的经历。"
      })]
    }, {
      id: "s10",
      no: "10",
      title: "推荐人信息",
      recommenders: !0,
      note: "常见情况是两封推荐信，例如一封由专业主课老师撰写，另一封由其他学科老师撰写。若推荐人为外籍人士，请提前确认推荐信的语言与撰写安排。",
      recFields: [me("name", "姓名"), me("title", "职称及职务"), me("phone", "电话 / 微信"), me("email", "电子邮箱"), me("address", "通信地址（选填）"), me("course", "教授的课程 / 科目"), me("duration", "授课时间长度（如一年、两年）"), me("relation", "与学生的关系说明"), me("bio", "背景简介（选填）", {
        type: "textarea",
        full: !0,
        hint: "专业背景，以及是否有海外留学、访问或国际合作经历。"
      })]
    }, {
      id: "s11",
      no: "11",
      title: "附件与文件目录",
      note: "若文件包含护照、身份证件、成绩单等敏感信息，请使用机构指定的安全渠道，不要使用公开分享链接。",
      checklist: {
        key: "files",
        rows: ["身份证件 / 护照（如需）", "学校成绩单 / 在读证明", "语言考试成绩单", "CV / 简历", "曲目清单 / 乐谱", "演奏录像 / 音频 / 作品集", "获奖证明 / 活动证明", "其他材料"],
        status: [["provided", "已提供"], ["pending", "待补充"], ["na", "不适用"]],
        cols: [me("fileName", "文件名称 / 版本"), me("link", "安全文件链接（如有）"), me("note", "备注")]
      }
    }, {
      id: "s12",
      no: "12",
      title: "信息核对与确认",
      note: "请核对姓名、日期、联系方式、学校名称及考试成绩是否准确。提交后申请团队仍会对关键字段进行确认；本表不替代学校官方申请系统中的正式信息。",
      confirm: !0
    }];
  function he(t, e = []) {
    const s = {};
    for (const e of Object.keys(t || {}).sort()) {
      const a = String(t[e] ?? "").trim();
      a && "false" !== a && (s[e] = a);
    }
    return Object.keys(s).some(t => !e.includes(t)) ? s : null;
  }
  function be(t) {
    const e = t.profile || {},
      s = {};
    for (const a of ve) {
      for (const t of a.fields || []) s[`${a.title}·${t.label}`] = String(e[t.key] ?? "").trim();
      a.table && (s[a.title] = JSON.stringify((e[a.table.key] || []).map(t => he(t, ["stage"])).filter(Boolean))), a.checklist && (s[a.title] = JSON.stringify(Object.keys(e[a.checklist.key] || {}).sort().map(t => [t, he(e[a.checklist.key][t])]).filter(t => t[1]))), a.recommenders && (s[a.title] = JSON.stringify(bt.recsOf(t.id).map(t => he(Object.fromEntries(a.recFields.map(e => [e.key, t[e.key]])))).filter(Boolean))), a.confirm && (s[a.title] = String(!!e.confirmed));
    }
    return s;
  }
  function $e(t) {
    const e = t.profile || {},
      s = [];
    for (const t of ve) for (const a of t.fields || []) a.required && !String(e[a.key] || "").trim() && s.push(a.label);
    return (e.guardians || []).some(t => t.name && t.phone) || s.push("至少一位监护人的姓名与电话"), (e.education || []).some(t => t.schoolZh) || s.push("当前就读学校"), s;
  }
  function fe(t) {
    const e = t.profile || {};
    return ve.map(s => {
      let a = !1;
      return s.fields && (a = s.fields.some(t => String(e[t.key] || "").trim())), s.table && (a = a || (e[s.table.key] || []).some(t => Object.values(t).some(e => String(e || "").trim() && e !== t.stage))), s.recommenders && (a = bt.recsOf(t.id).length > 0), s.checklist && (a = Object.values(e[s.checklist.key] || {}).some(t => t.status)), s.confirm && (a = !!e.confirmed), {
        id: s.id,
        no: s.no,
        title: s.title,
        filled: a
      };
    });
  }
  const ge = {
      async call(t, e, s) {
        const a = await fetch("/api" + e, {
          method: t,
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-FQ": "1"
          },
          body: void 0 === s ? void 0 : JSON.stringify(s)
        });
        let i = {};
        try {
          i = await a.json();
        } catch (t) {}
        if (401 === a.status) throw location.href = "/login", new Error(i.error || "请重新登录");
        if (!a.ok) {
          const t = new Error(i.error || "请求失败（" + a.status + "）");
          throw t.status = a.status, t.data = i, t;
        }
        return i;
      }
    },
    ye = {
      loaded: new Set(),
      loading: new Map()
    };
  function ke(e) {
    return t && re() && !!e && !!st.reqdb && !ye.loaded.has(e);
  }
  function Ie(e) {
    return t && e && !ye.loaded.has(e) ? (ye.loading.has(e) || ye.loading.set(e, ge.call("GET", "/reqdb/school/" + encodeURIComponent(e)).then(t => {
      st.reqdb.records = (st.reqdb.records || []).filter(t => t.school !== e).concat(t.records || []), ye.loaded.add(e);
    }).catch(t => {
      Ae("院校要求加载失败：" + t.message, {
        error: !0
      });
    }).finally(() => ye.loading.delete(e))), ye.loading.get(e)) : Promise.resolve();
  }
  if (t) {
    const t = pt;
    pt = function (e) {
      return e?.schoolId && ke(e.schoolId) ? (Ie(e.schoolId).then(() => Vs()), []) : t(e);
    }, Object.assign(st, {
      stamps: {},
      chain: Promise.resolve(),
      pending: 0,
      pendingByKey: {},
      generation: 0,
      lastLoad: 0,
      async load() {
        this.apply(await ge.call("GET", "/bootstrap"));
      },
      apply(t) {
        for (const e of tt) "users" !== e && (this.data[e] = t.data[e] || []);
        this.data.users = t.users || [], this.stamps = {};
        for (const t of tt) for (const e of this.data[t]) e.updatedAt && (this.stamps[t + ":" + e.id] = e.updatedAt);
        se.user = t.me;
        const e = (this.reqdb?.records || []).filter(t => ye.loaded.has(t.school));
        this.reqdb = t.reqdb ? Object.assign({
          records: e
        }, t.reqdb) : null, this.lastLoad = Date.now();
      },
      persist() {},
      persistAll() {},
      put(t, e) {
        if ("users" === t) throw new Error("账号请在“系统设置 · 账号”中管理");
        const s = this.data[t] || (this.data[t] = []),
          a = t + ":" + (e.id ||= i(t.slice(0, 3))),
          n = s.findIndex(t => t.id === e.id);
        n >= 0 ? s[n] = e : (e.createdAt = e.createdAt || d(), s.push(e));
        const o = JSON.stringify(e);
        return this.send(a, async () => {
          const s = JSON.parse(o);
          this.stamps[a] ? s._base = this.stamps[a] : delete s._base;
          const i = (await ge.call("PUT", `/t/${t}/${encodeURIComponent(e.id)}`, s)).record;
          if (i && (this.stamps[a] = i.updatedAt, (this.pendingByKey[a] || 0) <= 1)) {
            const e = (this.data[t] || []).findIndex(t => t.id === i.id);
            e >= 0 && (this.data[t][e] = Object.assign(this.data[t][e], i));
          }
        }), e;
      },
      remove(t, e) {
        if ("users" === t) throw new Error("账号请在“系统设置 · 账号”中管理");
        this.data[t] = (this.data[t] || []).filter(t => t.id !== e);
        const s = t + ":" + e;
        this.send(s, async () => {
          await ge.call("DELETE", `/t/${t}/${encodeURIComponent(e)}`), delete this.stamps[s];
        });
      },
      send(t, e) {
        const s = this.generation;
        this.pending++, this.pendingByKey[t] = (this.pendingByKey[t] || 0) + 1, xe(), this.chain = this.chain.then(() => s === this.generation ? e() : null).catch(t => this.fail(t)).finally(() => {
          this.pending--, this.pendingByKey[t]--, xe();
        });
      },
      async fail(t) {
        this.generation++, Ae((409 === t.status ? "" : "保存失败：") + t.message, {
          error: !0,
          ms: 7e3
        });
        try {
          await this.load();
        } catch (t) {}
        we() && Vs();
      },
      async refresh() {
        if (!this.pending) {
          try {
            await this.load();
          } catch (t) {
            return;
          }
          we() && Vs();
        }
      },
      flush() {
        return this.chain;
      }
    });
  }
  function we() {
    if (document.getElementById("modal")?.innerHTML) return !1;
    if (document.getElementById("intakeForm")) return !1;
    const t = document.activeElement;
    return !t || !["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName);
  }
  function xe() {
    const t = document.getElementById("syncState");
    t && (t.textContent = st.pending ? "正在保存…" : "已保存到服务器", t.classList.toggle("busy", !!st.pending));
  }
  function Se(t, e = "账号已开设") {
    const s = t.map(t => `<tr><td class="td-main">${a(t.name)}</td><td>${a(t.username)}</td><td><code style="font-size:13px;background:#F4F1F7;padding:2px 6px;border-radius:5px">${a(t.password)}</code></td></tr>`).join(""),
      i = t.map(t => `${t.name}：登录地址 ${location.origin}  登录名 ${t.username}  初始密码 ${t.password}（首次登录需修改）`).join("\n");
    Oe({
      title: e,
      sub: "初始密码只显示这一次，请复制后通过安全渠道告知对方；对方首次登录时必须修改密码。",
      wide: t.length > 1,
      cancelLabel: "我已记下",
      body: `<div class="table-wrap" style="border:1px solid var(--line);border-radius:10px"><table><thead><tr><th>姓名</th><th>登录名</th><th>初始密码</th></tr></thead><tbody>${s}</tbody></table></div>\n    <textarea class="textarea" readonly rows="${Math.min(6, t.length + 1)}" id="pwText">${a(i)}</textarea><div><button type="button" class="btn sm" data-act="pw-copy">复制以上内容</button></div>`
    });
  }
  async function je(t, e) {
    const s = _e(t);
    if (s.new !== s.new2) return Ae("两次输入的新密码不一致", {
      error: !0
    });
    try {
      await ge.call("POST", "/password", {
        old: s.old,
        new: s.new
      }), Ae("密码已更新"), e();
    } catch (t) {
      Ae(t.message, {
        error: !0
      });
    }
  }
  function Ae(t, {
    error: e = !1,
    action: s = null,
    actionLabel: i = "",
    ms: d = 3600
  } = {}) {
    const n = document.getElementById("toast"),
      o = document.createElement("div");
    if (o.className = "toast" + (e ? " err" : ""), o.innerHTML = `<span>${a(t)}</span>`, s) {
      const t = document.createElement("button");
      t.textContent = i, t.onclick = () => {
        o.remove(), s();
      }, o.appendChild(t), d = Math.max(d, 7e3);
    }
    n.appendChild(o), setTimeout(() => o.remove(), d);
  }
  t && (window.addEventListener("beforeunload", t => {
    st.pending && (t.preventDefault(), t.returnValue = "");
  }), setInterval(() => {
    "visible" === document.visibilityState && Date.now() - st.lastLoad > 6e4 && st.refresh();
  }, 15e3), window.addEventListener("focus", () => {
    Date.now() - st.lastLoad > 2e4 && st.refresh();
  }));
  let qe = null;
  function Oe({
    title: t,
    sub: e = "",
    body: s = "",
    submitLabel: i = "保存",
    cancelLabel: d = "取消",
    danger: n = !1,
    wide: o = !1,
    onSubmit: l = null,
    footExtra: r = ""
  }) {
    qe = l, document.getElementById("modal").innerHTML = `<div class="modal-bg" data-act="modal-bg"><form class="modal ${o ? "wide" : ""}" id="modalForm" role="dialog" aria-modal="true" novalidate>\n    <div class="modal-head"><div><h2>${a(t)}</h2>${e ? `<p>${a(e)}</p>` : ""}</div><button type="button" class="btn icon ghost" data-act="modal-close" aria-label="关闭">${I("close")}</button></div>\n    <div class="modal-body">${s}</div>\n    <div class="modal-foot">${r}<span class="spacer"></span><button type="button" class="btn" data-act="modal-close">${a(d)}</button>${l ? `<button type="submit" class="btn ${n ? "danger solid" : "primary"}">${a(i)}</button>` : ""}</div>\n  </form></div>`;
    const c = document.getElementById("modalForm");
    c.addEventListener("submit", async t => {
      t.preventDefault();
      for (const t of c.querySelectorAll("[required]")) if (!String(t.value || "").trim()) return t.focus(), void Ae("请填写：" + (t.dataset.label || "必填项"), {
        error: !0
      });
      if (c.dataset.saving) return;
      c.dataset.saving = '1'; const submitButton = c.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      let e;
      try {
        e = !qe || await qe(_e(c), c);
      } catch (t) {
        delete c.dataset.saving; if (submitButton) submitButton.disabled = false;
        return console.error(t), void Ae(t.message || String(t), {
          error: !0
        });
      }
      delete c.dataset.saving; if (submitButton) submitButton.disabled = false;
      !1 !== e && Ce();
    }), setTimeout(() => c.querySelector("input:not([type=hidden]):not([type=checkbox]),select,textarea")?.focus(), 30);
  }
  function Ce() {
    document.getElementById("modal").innerHTML = "", qe = null;
  }
  function De(t, e, {
    title: s = "请确认",
    yes: a = "确认",
    danger: i = !1
  } = {}) {
    Oe({
      title: s,
      body: `<div class="small" style="line-height:1.7">${t}</div>`,
      submitLabel: a,
      danger: i,
      onSubmit: () => {
        e();
      }
    });
  }
  function _e(t) {
    const e = {};
    for (const s of t.elements) if (s.name && !s.disabled) if ("checkbox" !== s.type) "radio" !== s.type ? e[s.name] = s.value.trim() : s.checked && (e[s.name] = s.value);else {
      if (s.dataset.single) {
        e[s.name] = s.checked;
        continue;
      }
      e[s.name] ||= [], s.checked && e[s.name].push(s.value);
    }
    return e;
  }
  function Le(t, e, s = "", i = "text", d = {}) {
    const n = d.required ? `required data-label="${a(e)}"` : "",
      o = "field" + (d.full ? " full" : ""),
      l = d.hint ? `<div class="hint">${d.hint}</div>` : "",
      r = d.placeholder ? `placeholder="${a(d.placeholder)}"` : "",
      c = "f_" + t + "_" + Math.random().toString(36).slice(2, 6);
    let u;
    if ("hidden" === i) return `<input type="hidden" name="${t}" value="${a(s)}">`;
    if ("textarea" === i) u = `<textarea class="textarea" id="${c}" name="${t}" ${r} ${n} rows="${d.rows || 3}">${a(s)}</textarea>`;else if ("select" === i) u = `<select class="select" id="${c}" name="${t}" ${n} ${d.attrs || ""}>${(d.options || []).map(t => {
      const e = Array.isArray(t) ? t[0] : t.value ?? t,
        i = Array.isArray(t) ? t[1] : t.label ?? t;
      return `<option value="${a(e)}" ${String(e) === String(s ?? "") ? "selected" : ""}>${a(i)}</option>`;
    }).join("")}</select>`;else if ("checks" === i) u = `<div class="checks">${(d.options || []).map(e => {
      const i = Array.isArray(e) ? e[0] : e.value,
        d = Array.isArray(e) ? e[1] : e.label;
      return `<label><input type="checkbox" name="${t}" value="${a(i)}" ${(s || []).includes(i) ? "checked" : ""}> ${a(d)}</label>`;
    }).join("") || '<span class="muted2 small">暂无可选项</span>'}</div>`;else {
      if ("check" === i) return `<div class="${o}"><label class="checks" style="font-weight:600"><span style="display:flex;gap:7px;align-items:center;font-size:12px;color:var(--fg)"><input type="checkbox" data-single="1" name="${t}" ${s ? "checked" : ""}> ${a(e)}</span></label>${l}</div>`;
      u = `<input class="input" id="${c}" type="${i}" name="${t}" value="${a(s)}" ${r} ${n} ${d.attrs || ""}>`;
    }
    return `<div class="${o}"><label for="${c}">${a(e)}${d.required ? ' <span style="color:var(--err)">*</span>' : ""}</label>${u}${l}</div>`;
  }
  const Ee = (t, e = "未分配") => [["", e]].concat(st.where("users", e => t.includes(e.role) && e.active).map(t => [t.id, `${t.name}（${A[t.role].short}）`])),
    Te = t => Object.keys(t).map(e => [e, X(t, e)]);
  function Me(t, e = "") {
    return `<div class="empty"><b>${a(t)}</b>${a(e)}</div>`;
  }
  function Ne(t) {
    const e = t.filter(Boolean);
    return e.length ? `<details class="menu-wrap"><summary class="btn sm icon" style="list-style:none" title="更多操作">${I("more")}</summary><div class="menu">${e.map(t => `<button type="button" class="${t.danger ? "danger" : ""}" data-act="${t.act}" ${Object.entries(t.data || {}).map(([t, e]) => `data-${t}="${a(e)}"`).join(" ")}>${a(t.label)}</button>`).join("")}</div></details>` : "";
  }
  function Be(t, e, s, i = {}) {
    const d = Object.entries(i).map(([t, e]) => `data-${t}="${a(e)}"`).join(" ");
    return `<div class="tabs">${t.map(([t, i, n]) => `<button class="tab ${t === e ? "active" : ""}" data-act="${s}" data-tab="${t}" ${d}>${a(i)}${n ? `<span class="count ${n.hot ? "hot" : ""}">${n.n ?? n}</span>` : ""}</button>`).join("")}</div>`;
  }
  /* FQ 任务排序：所有任务列表共用；排序方式记在本浏览器 */
  const fqTaskSort = {
    K: "fq2:taskSort",
    get() { try { const v = localStorage.getItem(this.K); return ["due", "student", "advisor"].includes(v) ? v : "due"; } catch (_) { return "due"; } },
    set(v) { try { localStorage.setItem(this.K, v); } catch (_) {} },
    sname: t => bt.student(t.studentId)?.name || "",
    aname(t) { const s = bt.student(t.studentId); return s && s.advisorId ? $t(s.advisorId) : ""; },
    cmpDue(x, y) {
      const k = t => Kt(t) ? (t.dueDate ? 1 : 0) : 2, a = k(x), b = k(y);
      if (a !== b) return a - b;
      if (a === 2) return String(y.dueDate || "").localeCompare(String(x.dueDate || ""));
      return String(x.dueDate || "").localeCompare(String(y.dueDate || "")) || String(x.title || "").localeCompare(String(y.title || ""), "zh");
    },
    sort(list, k) {
      const c = (x, y) => String(x).localeCompare(String(y), "zh");
      return list.sort((x, y) => k === "student" ? c(this.sname(x), this.sname(y)) || this.cmpDue(x, y) : k === "advisor" ? c(this.aname(x) || "~", this.aname(y) || "~") || c(this.sname(x), this.sname(y)) || this.cmpDue(x, y) : this.cmpDue(x, y));
    },
    bar(k) { return `<div class="task-sort"><span>排序</span>${[["due", "截止日期"], ["student", "学生"], ["advisor", "顾问"]].map(([v, l]) => `<button type="button" class="${v === k ? "on" : ""}" data-act="task-sort" data-k="${v}">${l}</button>`).join("")}</div>`; },
    last: null,
    reset() { this.last = null; },
    group(t, k, n) {
      if (k === "due") return "";
      const g = k === "student" ? this.sname(t) : this.aname(t) || "未分配顾问";
      if (g === this.last) return "";
      this.last = g;
      return `<tr class="task-group"><td colspan="${n}">${a(g)}</td></tr>`;
    }
  };
  function Pe(t, e = {}) {
    const fqSort = !1 === e.showStudent ? "due" : fqTaskSort.get();
    t = fqTaskSort.sort(t.slice(), fqSort);
    const fqCols = 4 + (!1 === e.showStudent ? 0 : 1) + (e.noCtx ? 0 : 1) + (e.compact ? 0 : 1);
    return t.length ? (!1 === e.showStudent ? "" : fqTaskSort.bar(fqSort)) + `<div class="table-wrap"><table><thead><tr><th>任务</th>${!1 === e.showStudent ? "" : "<th>学生</th>"}${e.noCtx ? "" : "<th>院校 / 平台</th>"}${e.compact ? "" : "<th>负责人</th>"}<th>截止</th><th>状态</th><th></th></tr></thead><tbody>${(fqTaskSort.reset(), t).map(t => fqTaskSort.group(t, fqSort, fqCols) + function (t, e = {}) {
      const {
          showStudent: s = !0,
          compact: i = !1
        } = e,
        d = bt.student(t.studentId),
        n = Kt(t) ? Wt(t) : [],
        o = ce.taskStatus(t) ? `<select class="select sm" data-act="task-status" data-id="${t.id}">${Object.keys(q).map(e => `<option value="${e}" ${e === t.status ? "selected" : ""}>${q[e][0]}</option>`).join("")}</select>` : Q(q, t.status),
        l = t.dueDate ? `<span class="${Kt(t) ? h(t.dueDate, 3) : ""}">${p(t.dueDate)}</span> <span class="muted2 tiny">${Kt(t) ? v(t.dueDate) : ""}</span>` : '<span class="muted2">无日期</span>';
      return `<tr>\n    <td><div class="td-main">${a(t.title)} ${t.blocked ? `<span class="pill err" title="${a(t.blockedReason)}">受阻</span>` : ""}${n.length ? `<span class="pill warn plain" title="${a(n.map(t => t.title).join("；"))}">等待前置</span>` : ""}${t.orderOverride ? '<span class="pill plain" title="完成时前置任务尚未完成，已确认跳过">跳过顺序</span>' : ""}${!t.dueDate && Kt(t) ? '<span class="pill err plain">需定日期</span>' : ""}</div>\n      <div class="td-sub">${e.noCtx && !t.applicationId && t.submissionId ? a(It(bt.sub(t.submissionId))) + " · " : ""}${a(O[t.category] || "")}${t.blocked && t.blockedReason ? " · " + a(t.blockedReason) : ""}${n.length ? " · 前置：" + a(n.map(t => t.title).join("、")) : ""}${t.note ? " · " + a(t.note) : ""}${t.documentId && bt.doc(t.documentId) ? ` · <a href="#/doc/${a(t.documentId)}">文书：${a(bt.doc(t.documentId).title)}</a>` : ""}</div>${function (t) {
        const e = (t.links || []).map(t => {
          if ("doc" === t.type) {
            const e = bt.doc(t.id);
            if (!e) return "";
            const s = st.get("versions", e.currentVersionId);
            return `<button class="tag" style="cursor:pointer" data-act="go" data-href="#/doc/${e.id}">${I("file")} ${a(e.title)}${s ? " V" + s.no : ""}</button>`;
          }
          const e = st.get("materials", t.id);
          return e ? `<button class="tag" style="cursor:pointer" data-act="mat-open" data-id="${e.id}">${I("folder")} ${a(e.title)}</button>` : "";
        }).filter(Boolean);
        return e.length ? `<div class="row mt8" style="gap:4px">${e.join("")}</div>` : "";
      }(t)}</td>\n    ${s ? `<td><button class="linkbtn" data-act="go" data-href="#/student/${t.studentId}/tasks">${a(d?.name || "—")}</button></td>` : ""}\n    ${e.noCtx ? "" : `<td>${t.applicationId ? `<button class="linkbtn" data-act="go" data-href="#/app/${t.applicationId}">${a(Zt(t))}</button>` : a(Zt(t))}</td>`}\n    ${i ? "" : `<td>${a($t(t.assigneeId))}</td>`}\n    <td class="nowrap">${l}</td>\n    <td>${o}</td>\n    <td class="actions">${ce.taskEdit(t) ? `<button class="btn sm" data-act="task-edit" data-id="${t.id}">编辑</button>` : ""}</td>\n  </tr>`;
    }(t, e)).join("")}</tbody></table></div>` : Me(e.emptyTitle || "没有任务", e.emptyText || "");
  }
  function Re(t) {
    const e = t => Kt(t) && Wt(t).length ? 1 : 0;
    return t.sort((t, s) => Kt(s) - Kt(t) || e(t) - e(s) || $(t.dueDate, s.dueDate));
  }
  function Fe(t, {
    showStudent: e = !0
  } = {}) {
    const s = bt.student(t.studentId),
      i = st.get("versions", t.currentVersionId),
      d = "revising" === t.status ? Gt(t) : null;
    return `<button class="doc-card" data-act="go" data-href="#/doc/${t.id}">\n    <div class="row between"><span class="title">${a(t.title)}</span>${ue(t) ? '<span class="pill warn plain">待我处理</span>' : ""}</div>\n    <div class="meta">${e ? a(s?.name || "") + " · " : ""}${a(Ut(t))}</div>\n    <div class="meta">${i ? "V" + i.no + " · " : "尚无版本 · "}${a($t(t.writerId))}${t.dueDate ? ' · 截止 <span class="' + ("final" !== t.status ? h(t.dueDate, 5) : "") + '">' + p(t.dueDate) + "</span>" : ""}</div>\n    ${d ? `<div class="meta" style="color:var(--err)">退回意见：${a(d.comment.slice(0, 60))}</div>` : ""}\n  </button>`;
  }
  function Ve(t) {
    return `<div class="avatar">${a((t || "?").slice(0, 1))}</div>`;
  }
  const Ue = t => "text" === t?.kind;
  // M2：kind:"upload" 为上传到 R2 的文件（历史 kind:"file" 是外部网盘链接，语义不变）。
  const fqIsUpload = t => "upload" === t?.kind && !!t.upload?.key;
  const fqUploadHref = t => "/api/files/" + String(t.upload.key).split("/").map(encodeURIComponent).join("/");
  const fqFileSize = n => n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round((n || 0) / 1024)) + " KB";
  function ze(t) {
    return Ue(t) ? `在线正文 · ${t.words || w(t.text)} words` : fqIsUpload(t) ? `${t.upload.name} · ${fqFileSize(t.upload.size)}` : t.fileName || "网盘文件";
  }
  function He(t, e = "btn sm", s = "") {
    return t ? Ue(t) ? `<button type="button" class="${e}" data-act="ver-view" data-id="${t.id}">${s || "查看正文"}</button>` : fqIsUpload(t) ? `<a class="${e}" href="${a(fqUploadHref(t))}" download>${s || "下载"} ${I("download")}</a>` : `${S(t.link) ? `<a class="${e}" href="${a(S(t.link))}" target="_blank" rel="noopener">${s || "打开"} ${I("external")}</a>` : '<span class="small muted2">链接无效</span>'}` : "";
  }
  function Ge(t, e = 420) {
    return `<div class="doc-text" style="max-height:${e}px">${a(t.text || "")}</div><div class="row between mt8"><span class="tiny muted2">${t.words || w(t.text)} / ${x} words</span><button type="button" class="btn sm" data-act="ver-copy" data-id="${t.id}">复制正文</button></div>`;
  }
  function Je(t, e, s, {
    cls: i = "",
    href: d = ""
  } = {}) {
    return `<${d ? `button class="stat" data-act="go" data-href="${d}"` : 'div class="stat"'}><div class="stat-label">${a(t)}</div><div class="stat-val ${i}">${e}</div><div class="stat-foot">${a(s)}</div></${d ? "button" : "div"}>`;
  }
  function Ye() {
    const t = new Date().getHours();
    return t < 11 ? "早上好" : t < 14 ? "中午好" : t < 18 ? "下午好" : "晚上好";
  }
  const Ke = {
    q: "",
    status: "active",
    advisor: ""
  };
  function Ze(t, {
    showStudent: e = !1
  } = {}) {
    return t.length ? `<div class="table-wrap"><table><thead><tr><th>文书</th>${e ? "<th>学生</th>" : ""}<th>用于</th><th>文书老师</th><th>当前版本</th><th>状态</th><th>截止</th></tr></thead><tbody>${t.map(t => {
      const s = st.get("versions", t.currentVersionId);
      return `<tr class="click" data-act="go" data-href="#/doc/${t.id}"><td><div class="td-main">${a(t.title)} ${ue(t) ? '<span class="pill warn plain">待我处理</span>' : ""}</div><div class="td-sub">${a(X(F, t.type))}</div></td>\n      ${e ? `<td>${a(bt.student(t.studentId)?.name)}</td>` : ""}\n      <td class="small">${a(Ut(t))}</td><td>${a($t(t.writerId))}</td><td>${s ? `V${s.no}<div class="td-sub">${Ue(s) ? "在线正文 · " + (s.words || 0) + " words" : "文件"}</div>` : '<span class="muted2">—</span>'}</td><td>${Ht(t)}</td>\n      <td>${t.dueDate && "final" !== t.status ? `<span class="${h(t.dueDate, 5)}">${p(t.dueDate)}</span>` : p(t.dueDate)}</td></tr>`;
    }).join("")}</tbody></table></div>` : Me("还没有文书");
  }
  function We(t, {
    showStudent: e = !1,
    manage: s = () => !1
  } = {}) {
    return t.length ? `<div class="table-wrap"><table><thead><tr><th>文件</th>${e ? "<th>学生</th>" : ""}<th>用于</th><th>最新版本</th><th>状态</th><th>意见</th><th></th></tr></thead><tbody>${t.map(t => {
      const i = t.versions?.[t.versions.length - 1],
        d = t.feedback || [],
        n = d[d.length - 1];
      return `<tr><td><div class="td-main"><button class="linkbtn" data-act="mat-open" data-id="${t.id}">${a(t.title)}</button></div><div class="td-sub">${a(X(H, t.kind))}</div></td>\n      ${e ? `<td>${a(bt.student(t.studentId)?.name)}</td>` : ""}\n      <td class="small">${(t.applicationIds || []).map(t => a(ft(bt.app(t)))).join("、") || '<span class="muted2">通用</span>'}</td>\n      <td>${i ? `${Ue(i) ? `<button type="button" class="linkbtn small" data-act="ver-view" data-id="${i.id}">V${i.no}</button>` : fqIsUpload(i) ? `<a href="${a(fqUploadHref(i))}" download class="small">V${i.no} ${I("download")}</a>` : S(i.link) ? `<a href="${a(S(i.link))}" target="_blank" rel="noopener" class="small">V${i.no} ${I("external")}</a>` : `<span class="small muted2">V${i.no} · 链接无效</span>`}<div class="td-sub">${p(i.at)}</div>` : '<span class="muted2">—</span>'}</td>\n      <td>${Q(G, t.status)}</td>\n      <td class="small">${n ? `<span class="${"changes" === n.verdict ? "date-red" : ""}">${a(n.author || n.source)}：${a(n.text.slice(0, 26))}${n.text.length > 26 ? "…" : ""}</span>` : '<span class="muted2">—</span>'}</td>\n      <td class="actions">${s(t) ? `<button class="btn sm" data-act="mat-version" data-id="${t.id}">新版本</button> <button class="btn sm" data-act="mat-feedback" data-id="${t.id}">登记意见</button>` : `<button class="btn sm" data-act="mat-open" data-id="${t.id}">查看</button>`}</td></tr>`;
    }).join("")}</tbody></table></div>` : Me("还没有登记文件");
  }
  function Xe(t, e) {
    return t.length ? `<div class="table-wrap"><table><thead><tr><th>作曲家</th><th>作品</th><th>时长</th><th>用于</th><th>状态</th><th></th></tr></thead><tbody>${t.map(t => `<tr><td class="td-main">${a(t.composer)}</td><td>${a(t.title)}${t.note ? `<div class="td-sub">${a(t.note)}</div>` : ""}</td><td>${a(t.duration || "—")}</td><td class="small">${(t.applicationIds || []).map(t => a(ft(bt.app(t)))).join("、")}${t.round ? ` · ${a(t.round)}` : ""}</td><td>${Q(J, t.status)}</td><td class="actions">${e ? `<button class="btn sm" data-act="rep-edit" data-id="${t.id}">编辑</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : Me("还没有曲目");
  }
  function Qe(t) {
    return `<section class="panel">${Me("无法打开", t)}<div class="row" style="justify-content:center;padding-bottom:20px"><button class="btn" data-act="go" data-href="#/home">返回工作台</button></div></section>`;
  }
  const ts = {
    mine: !1,
    student: ""
  };
  const es = {
      q: "",
      student: "",
      kind: "",
      status: ""
    },
    ss = {
      scope: "mine",
      status: "open",
      student: "",
      category: "",
      q: ""
    };
  function as(e = "users") {
    if (!de()) return Qe("只有申请主管可以进入系统设置。");
    const s = [["users", "账号与分配"], ["templates", "任务模板"], ["schools", "院校要求库"], ["data", "数据"]].concat(t ? [["audit", "操作日志"]] : []),
      i = "templates" === e ? function () {
        const t = st.all("templates");
        return `<div class="panel-head"><div><h3>任务模板</h3><p>顾问确认院校要求后，系统按这些模板列出候选任务，由顾问逐条勾选生成。截止日 = 相关官方截止 + 偏移天数（负数为提前）；“前置”只做顺序提示，不强制。修改模板只影响之后生成的任务。</p></div><button class="btn primary sm" data-act="tpl-new">${I("plus")} 新增模板</button></div>\n    <div class="table-wrap"><table><thead><tr><th>任务</th><th>类别</th><th>适用</th><th>范围</th><th>偏移</th><th>完成联动</th><th>状态</th><th></th></tr></thead><tbody>${t.map(t => `<tr><td class="td-main">${a(t.title)}</td><td>${a(O[t.category])}</td><td class="small">${a(Z[t.cond])}</td><td class="small">${a(K[t.scope] || t.scope)}${(t.after || []).length ? `<div class="td-sub">前置：${a(t.after.map(t => st.get("templates", t)?.title || t).join("、"))}</div>` : ""}</td><td>${t.offset > 0 ? "+" : ""}${t.offset} 天</td><td class="small">${a(W[t.effect || ""])}</td><td>${!1 !== t.active ? '<span class="pill ok">启用</span>' : '<span class="pill">停用</span>'}</td><td class="actions"><button class="btn sm" data-act="tpl-edit" data-id="${t.id}">编辑</button></td></tr>`).join("")}</tbody></table></div>`;
      }() : "schools" === e ? function () {
        const e = it();
        return `<div class="panel-head"><div><h3>院校要求库</h3><p>${t ? "院校库保存在服务器，按需下发" : st.reqdb ? "当前使用导入的院校库" : "当前使用系统内置院校库"} · ${e.schools.length} 所学校 · ${e.schools.reduce((t, s) => t + (s.recordCount ?? e.records.filter(t => t.school === s.id).length), 0)} 条要求 · 导出日期 ${a(e.exportedAt || "—")}</p></div><div class="row"><button class="btn sm" data-act="reqdb-export">${I("download")} 导出 JSON</button><button class="btn sm primary" data-act="reqdb-import">${I("upload")} 导入 JSON</button>${!t && st.reqdb ? '<button class="btn sm" data-act="reqdb-reset">恢复内置</button>' : ""}</div></div>\n    <div class="table-wrap"><table><thead><tr><th>院校</th><th>申请系统</th><th>截止（院校库）</th><th>记录数</th><th>核实日期</th></tr></thead><tbody>${e.schools.map(t => `<tr><td><div class="td-main">${a(t.abbr)} · ${a(t.zh)}</div><div class="td-sub">${a(t.en)}</div></td><td class="small">${a(t.system || "")}</td><td class="small">${(t.deadlines || []).map(t => (t.d ? p(t.d) : "未公布") + (t.p ? "（" + a(t.p) + "）" : "")).join("<br>")}</td><td>${t.recordCount ?? e.records.filter(e => e.school === t.id).length}</td><td>${a(t.verified || "")}</td></tr>`).join("")}</tbody></table></div>`;
      }() : "data" === e ? t ? `<div class="panel-body stack">\n    <div class="notice info">${I("shield")}<div><strong>数据保存在 Cloudflare D1 数据库</strong>所有成员共用同一份数据；每位用户只会收到自己有权查看的内容。建议每周导出一次备份，备份文件包含全部学生资料，请妥善保管。</div></div>\n    <div class="grid cols-2">\n      <div class="card"><div class="card-title">备份与恢复</div><div class="card-meta">导出全部数据（不含密码）为 JSON；恢复会替换服务器上的全部数据。</div><div class="row mt12"><button class="btn" data-act="data-export">${I("download")} 导出备份</button><button class="btn" data-act="data-import">${I("upload")} 从备份恢复</button></div></div>\n      <div class="card"><div class="card-title">演示数据与清空</div><div class="card-meta">载入演示数据用于培训；清空会删除全部学生数据与非主管账号。两者都不可撤销。</div><div class="row mt12"><button class="btn" data-act="data-reset">载入演示数据</button><button class="btn danger" data-act="data-clear">清空全部数据</button></div></div>\n    </div></div>` : `<div class="panel-body stack">\n    <div class="notice info">${I("shield")}<div><strong>本地预览版：数据只保存在这台电脑的这个浏览器里</strong>部署到 Cloudflare 后，数据存放在服务器数据库，所有成员看到同一份数据。</div></div>\n    <div class="grid cols-2">\n      <div class="card"><div class="card-title">备份与恢复</div><div class="card-meta">导出全部数据为 JSON；恢复会替换当前浏览器中的全部数据。</div><div class="row mt12"><button class="btn" data-act="data-export">${I("download")} 导出备份</button><button class="btn" data-act="data-import">${I("upload")} 从备份恢复</button></div></div>\n      <div class="card"><div class="card-title">演示数据</div><div class="card-meta">恢复演示数据会覆盖当前全部数据；清空会保留主管账号与任务模板。</div><div class="row mt12"><button class="btn" data-act="data-reset">恢复演示数据</button><button class="btn danger" data-act="data-clear">清空全部数据</button></div></div>\n    </div></div>` : "audit" === e ? is ? `<div class="panel-head"><div><h3>操作日志</h3><p>最近 300 条：登录、账号变更、数据修改、导入导出。用于安全审计。</p></div></div>\n    <div class="table-wrap"><table><thead><tr><th>时间</th><th>操作人</th><th>操作</th><th>对象</th><th>说明</th></tr></thead><tbody>${is.map(t => `<tr><td class="nowrap small">${m(t.at)}</td><td>${a(t.name || "—")}</td><td>${"login-fail" === t.action ? '<span class="pill err">登录失败</span>' : a(ds[t.action] || t.action)}</td><td class="small">${a(ns[t.tbl] || t.tbl || "")} ${a(t.rec_id || "")}</td><td class="small">${a(t.detail || "")}</td></tr>`).join("") || '<tr><td colspan="5" class="muted2">暂无</td></tr>'}</tbody></table></div>` : (ge.call("GET", "/admin/audit").then(t => {
        is = t.rows, Vs(), setTimeout(() => {
          is = null;
        }, 3e4);
      }).catch(t => Ae(t.message, {
        error: !0
      })), `<div class="panel-body">${Me("正在加载…")}</div>`) : function () {
        const e = st.all("users"),
          s = e => {
            const s = e.studentId ? bt.student(e.studentId) : null,
              i = "advisor" === e.role ? st.where("students", t => t.advisorId === e.id && "active" === t.status).length + " 名学生" : "writer" === e.role ? st.where("documents", t => t.writerId === e.id && "final" !== t.status && !t.archived).length + " 份文书进行中" : "student" === e.role ? s ? s.name + " · " + s.season : "未关联学生" : "";
            return `<tr><td><div class="td-main">${a(e.name)}</div><div class="td-sub">登录名 ${a(e.username)}${t ? " · " + (e.lastLogin ? "最近登录 " + m(e.lastLogin) : "从未登录") : ""}</div></td><td>${A[e.role].label}</td><td class="small">${a(i)}</td><td>${e.active ? '<span class="pill ok">启用</span>' : '<span class="pill">已停用</span>'}${t && e.active && e.mustChange ? ' <span class="pill warn">待首次改密</span>' : ""}</td>\n      <td class="actions"><button class="btn sm" data-act="user-edit" data-id="${e.id}">编辑</button> ${e.id !== ae().id ? `<button class="btn sm" data-act="user-toggle" data-id="${e.id}">${e.active ? "停用" : "启用"}</button>` : ""} <button class="btn sm" data-act="user-reset" data-id="${e.id}">重置密码</button></td></tr>`;
          };
        return `<div class="panel-head"><div><h3>账号</h3><p>${t ? "新建或重置后，系统生成一次性初始密码，对方首次登录必须修改。停用会立即强制下线。" : "本地预览版为演示登录，不校验密码；部署到服务器后由这里开设账号、发放初始密码。"}</p></div><button class="btn primary sm" data-act="user-new">${I("plus")} 新建账号</button></div>\n    <div class="table-wrap"><table><thead><tr><th>姓名</th><th>角色</th><th>负责 / 关联</th><th>状态</th><th></th></tr></thead><tbody>\n    ${["supervisor", "advisor", "writer", "student"].map(t => (t => e.filter(e => e.role === t))(t).map(s).join("")).join("")}</tbody></table></div>\n    <div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>学生分配</h3><p>每位学生一名负责顾问，可有多名文书老师</p></div></div>\n    <div class="table-wrap"><table><thead><tr><th>学生</th><th>负责顾问</th><th>文书老师</th><th></th></tr></thead><tbody>${st.where("students", t => "active" === t.status).map(t => `<tr><td class="td-main">${a(t.name)}</td><td>${a($t(t.advisorId))}</td><td>${a((t.writerIds || []).map($t).join("、") || "未分配")}</td><td class="actions"><button class="btn sm" data-act="student-edit" data-id="${t.id}">调整</button></td></tr>`).join("")}</tbody></table></div>`;
      }();
    return `<div class="page-head"><div><h2>系统设置<em>Settings</em></h2><p>账号由主管统一开设与停用；学生账号只能查看自己的进度并确认文书。</p></div></div>\n    <section class="panel">${Be(s, e, "settings-tab")}${i}</section>`;
  }
  let is = null;
  const ds = {
      login: "登录",
      "login-fail": "登录失败",
      "password-change": "修改密码",
      create: "新增",
      update: "修改",
      delete: "删除",
      "user-create": "开设账号",
      "user-update": "修改账号",
      "user-reset": "重置密码",
      export: "导出备份",
      import: "恢复备份",
      demo: "载入演示数据",
      clear: "清空数据",
      setup: "系统初始化",
      "reqdb-export": "导出院校库",
      "reqdb-import": "导入院校库",
      "student-purge": "彻底删除学生"
    },
    ns = {
      students: "学生",
      applications: "申请",
      submissions: "提交",
      rounds: "考试轮次",
      tasks: "任务",
      documents: "文书",
      versions: "文书版本",
      reviews: "文书审核",
      materials: "文件",
      repertoire: "曲目",
      recommenders: "推荐人",
      refRequests: "推荐信",
      activity: "动态",
      templates: "模板",
      users: "账号"
    };
  function os(t) {
    return zt(t) ? ["已提交", "ok"] : {
      drafting: ["老师撰写中", ""],
      revising: ["老师修改中", ""],
      advisor_review: ["老师审核中", ""],
      supervisor_review: ["老师审核中", ""],
      student_review: ["待你确认", "warn"],
      final: ["已定稿", "ok"]
    }[t.status] || ["—", ""];
  }
  function ls(t) {
    const e = t || ae().studentId,
      s = bt.student(e);
    if (!s) return Qe("账号尚未关联学生档案，请联系你的顾问。");
    const i = !!t,
      d = bt.activeAppsOf(e),
      n = bt.docsOf(e),
      o = n.filter(t => "student_review" === t.status),
      l = d.flatMap(t => Et(t).filter(t => "deadline" !== t.kind || t.verified).map(e => Object.assign({
        app: t
      }, e))).filter(t => u(t.date) >= 0).sort((t, e) => $(t.date, e.date)),
      r = d.filter(t => ["conditional", "unconditional"].includes(t.outcome?.type)),
      c = st.where("activity", t => t.studentId === e && t.studentVisible).sort((t, e) => String(e.at).localeCompare(String(t.at))).slice(0, 8),
      m = bt.user(s.advisorId);
    return `${i ? `<div class="notice info" style="margin-bottom:14px">${I("user")}<div><strong>学生视角预览：${a(s.name)} 登录后看到的就是这个页面</strong>不显示内部目标日期、任务、备注和未核实的截止日期。预览中按钮不可用。<button class="linkbtn" data-act="go" data-href="#/student/${e}" style="margin-left:8px">返回学生工作区</button></div></div>` : ""}\n  <div class="portal">\n    <div class="page-head"><div><h2>${i ? a(s.name) : "你好，" + a(s.name)}<em>${a(s.englishName || "")}</em></h2><p>${a(s.season)} · ${"PG" === s.level ? "研究生" : "本科"} · ${a(ot(s.majorId))} · 共 ${d.length} 所院校</p></div>\n      <div class="card" style="min-width:220px"><div class="tiny muted2">你的申请顾问</div><div class="card-title">${a(m?.name || "—")}</div><div class="tiny muted2">有任何问题请直接联系顾问</div></div></div>\n\n    ${(() => {
      const t = s.intake?.status || "not_started",
        e = fe(s),
        d = e.filter(t => t.filled).length,
        n = {
          not_started: "申请开始前，请在线填写你的基础信息、经历与文书素材。顾问会核对，并用于填写申请表和撰写文书。",
          draft: `已填写 ${d} / ${e.length} 个部分，内容会自动保存。填好后请提交给顾问。`,
          submitted: "已提交，顾问正在核对。如需更正可以直接修改。",
          updated: "你修改了已提交的内容，顾问会重新核对。",
          verified: "顾问已核对。如有信息变化（如新的考试成绩、获奖），请随时更新。"
        }[t];
      return `<section class="panel" style="margin-bottom:14px;${["not_started", "draft"].includes(t) ? "border-color:#E9C995" : ""}"><div class="panel-head"><div><h3>${I("user")} 基础信息采集表</h3><p>${a(n)}</p></div><div class="row">${Q(pe, t)}<button class="btn ${["not_started", "draft"].includes(t) ? "primary" : ""} sm" data-act="go" data-href="#/intake" ${i ? "disabled" : ""}>${"not_started" === t ? "开始填写" : "draft" === t ? "继续填写" : "查看 / 修改"}</button></div></div>\n        ${["not_started", "draft"].includes(t) ? `<div class="panel-body"><div class="progress"><span style="width:${Math.round(d / e.length * 100)}%"></span></div></div>` : ""}</section>`;
    })()}\n    ${o.length ? `<section class="panel" style="margin-bottom:14px;border-color:#E9C995"><div class="panel-head"><div><h3>${I("file")} 需要你确认的文书</h3><p>请打开文件仔细阅读，确认无误后点击“确认定稿”；如需修改，请写下你的意见。</p></div><span class="count hot">${o.length}</span></div>\n      <div class="list">${o.map(t => `<div class="item"><div class="mark warn">${I("file")}</div><div class="main"><div class="title">${a(t.title)}</div><div class="meta">用于 ${a(Ut(t))}</div></div><div class="side"><button class="btn primary sm" data-act="go" data-href="#/doc/${t.id}" ${i ? "disabled" : ""}>查看并确认</button></div></div>`).join("")}</div></section>` : ""}\n\n    ${r.length ? `<section class="panel" style="margin-bottom:14px"><div class="panel-head"><div><h3>${I("award")} 录取结果</h3></div></div><div class="list">${r.map(t => `<div class="item"><div class="mark ok">${I("award")}</div><div class="main"><div class="title">${a(gt(t))} · ${a(t.program || "")}</div><div class="meta">${a(X(B, t.outcome.type))} · ${p(t.outcome.date)}${t.outcome.conditions ? " · 条件：" + a(t.outcome.conditions) : ""}</div></div><div class="side">${Q(P, t.decision?.type || "pending")}</div></div>`).join("")}</div></section>` : ""}\n\n    <div class="grid cols-main"><div>\n      <div style="margin-bottom:8px"><b style="color:var(--accent)">各院校进度</b></div>\n      ${d.map(t => {
      const e = t.outcome?.type || "pending",
        s = St(t).filter(jt),
        i = Et(t).filter(t => ("deadline" !== t.kind || t.verified) && u(t.date) >= 0)[0];
      return `<div class="app-card"><div class="row between"><div><div class="card-title">${a(gt(t))} <span class="muted2" style="font-weight:500">${a(ft(t))}</span></div><div class="card-meta">${a(t.program || "")} · ${a(ot(t.majorId))}</div></div>${"pending" !== e ? Q(B, e) : ""}</div>\n      <div class="mt12">${_t(t)}</div>\n      <div class="row mt12" style="gap:14px">\n        <span class="small"><span class="muted2">现在：</span><b>${a(function (t) {
        const e = Dt(t);
        return {
          planning: "老师正在核对院校要求",
          preparing: "正在准备申请材料"
        }[e.key] || e.label;
      }(t))}</b></span>\n        ${s.map(t => `<span class="small"><span class="muted2">${a(It(t.sub))}已于</span> ${p(t.sub.submittedAt)} <span class="muted2">提交</span></span>`).join("")}\n        ${i ? `<span class="small"><span class="muted2">下一个日期：</span><b class="${h(i.date)}">${p(i.date)}</b> ${a(i.label)}</span>` : ""}\n      </div>\n      ${t.outcome?.conditions ? `<div class="notice info mt12" style="margin-bottom:0">${I("award")}<div><strong>录取条件</strong>${a(t.outcome.conditions)}</div></div>` : ""}\n    </div>`;
    }).join("") || `<div class="app-card">${Me("顾问还在为你规划院校")}</div>`}\n    </div><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("calendar")} 接下来的日期</h3><p>考试安排与已核实的截止日期</p></div></div><div class="list">${l.slice(0, 8).map(t => `<div class="item"><div class="mark ${u(t.date) <= 7 ? "warn" : ""}">${I("exam" === t.kind ? "music" : "clock")}</div><div class="main"><div class="title">${a(ft(t.app))} · ${a(t.label)}</div><div class="meta">${v(t.date)}</div></div><div class="side"><b class="small">${p(t.date)}</b></div></div>`).join("") || Me("近期没有安排")}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("file")} 我的文书</h3></div></div><div class="list">${n.map(t => {
      const e = os(t),
        s = ce.seeDoc(t) || i;
      return `<div class="item ${s && !i ? "click" : ""}" ${s && !i ? `data-act="go" data-href="#/doc/${t.id}"` : ""}><div class="main"><div class="title">${a(t.title)}</div><div class="meta">${a(Ut(t))}</div></div><div class="side"><span class="pill ${e[1]}">${e[0]}</span></div></div>`;
    }).join("") || Me("暂无文书")}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("clock")} 最近动态</h3></div></div><div class="panel-body"><div class="timeline">${c.map(t => `<div class="tl"><i class="info"></i><div><div class="t">${a(t.text)}</div><div class="m">${p(t.at)}</div></div></div>`).join("") || '<span class="small muted2">暂无</span>'}</div></div></section>\n    </div></div>\n  </div>`;
  }
  function rs(t, e = "你没有权限执行这个操作。") {
    return !!t || (Ae(e, {
      error: !0
    }), !1);
  }
  const cs = () => it().taxonomy.majors.map(t => [t.id, t.zh + " · " + t.en]),
    us = [["UG", "本科"], ["PG", "研究生"]];
  function ps(t) {
    const e = !t.id;
    return `<div class="form-grid">\n    ${Le("name", "中文姓名", t.name, "text", {
      required: !0
    })}${Le("englishName", "英文姓名 / 拼音", t.englishName)}\n    ${Le("season", "申请季", t.season || "2027 Fall", "text", {
      required: !0
    })}${Le("level", "申请层次", t.level || "UG", "select", {
      options: us
    })}\n    ${Le("majorId", "专业方向", t.majorId || "piano", "select", {
      options: cs()
    })}${Le("currentSchool", "当前学校", t.currentSchool)}\n    ${de() ? `<div class="form-section">分配</div>${Le("advisorId", "负责顾问", t.advisorId || "", "select", {
      options: Ee(["advisor", "supervisor"]),
      required: !0
    })}${Le("writerIds", "文书老师", t.writerIds || [], "checks", {
      options: st.where("users", t => "writer" === t.role && t.active).map(t => [t.id, t.name])
    })}` : ""}\n    ${e ? `<div class="form-section">学生账号</div>${Le("createAccount", "同时开设学生账号（学生只能看自己的进度并确认文书）", !0, "check", {
      full: !0
    })}${Le("username", "学生登录名", "", "text", {
      placeholder: "如 lin.yuxi",
      hint: "阶段二接入服务器后由系统生成初始密码"
    })}` : ""}\n  </div>`;
  }
  // M2：浏览器给 .pages/.md 等的 File.type 常为空，按扩展名给出服务端白名单中的 Content-Type。
  const fqUploadTypes = {
    pdf: "application/pdf", doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pages: "application/vnd.apple.pages", txt: "text/plain", md: "text/markdown", rtf: "application/rtf",
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png"
  };
  async function fqUploadFile(documentId, file, type) {
    const r = await fetch("/api/files?documentId=" + encodeURIComponent(documentId), {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": type, "X-File-Name": encodeURIComponent(file.name), "X-FQ": "1" },
      body: file
    });
    let data = {};
    try { data = await r.json(); } catch (_) {}
    if (!r.ok || !data.upload) throw new Error(data.error || "HTTP " + r.status);
    return data.upload;
  }
  const ms = {
    "task-sort"(t) {
      fqTaskSort.set(t.dataset.k), Vs();
    },
    "student-new"() {
      rs(de() || ne()) && Oe({
        title: "新建学生",
        sub: "学生档案的其余信息可以在“学生档案”中补充",
        body: ps({}),
        submitLabel: "创建",
        onSubmit: e => {
          const s = st.put("students", {
              id: i("stu"),
              name: e.name,
              englishName: e.englishName,
              season: e.season,
              level: e.level,
              majorId: e.majorId,
              currentSchool: e.currentSchool,
              status: "active",
              advisorId: de() ? e.advisorId : ae().id,
              writerIds: de() && e.writerIds || [],
              intake: {
                status: "not_started",
                changes: []
              },
              skipTpl: [],
              profile: {
                nameZh: e.name,
                nameEn: e.englishName,
                guardians: [],
                education: [{
                  stage: "初中"
                }, {
                  stage: "高中 / 当前学校",
                  schoolZh: e.currentSchool
                }],
                tests: [],
                activities: [],
                awards: [],
                files: {},
                accounts: []
              }
            }),
            a = e.username || "stu" + Date.now().toString(36);
          Jt(s.id, null, "建立学生档案", !1), e.createAccount && (t ? st.flush().then(() => ge.call("POST", "/users", {
            name: s.name,
            username: a,
            role: "student",
            studentId: s.id
          })).then(t => {
            st.data.users.push(t.user), Se([{
              name: s.name,
              username: t.user.username,
              password: t.password
            }], "学生账号已开设");
          }).catch(t => Ae("学生账号开设失败：" + t.message, {
            error: !0
          })) : st.put("users", {
            id: i("u"),
            name: s.name,
            role: "student",
            username: a,
            studentId: s.id,
            active: !0
          })), Ae("已创建 " + s.name), Rs("#/student/" + s.id);
        }
      });
    },
    "student-edit"(t) {
      const e = bt.student(t.dataset.id);
      rs(e && ce.manage(e.id)) && Oe({
        title: "编辑学生",
        body: ps(e),
        onSubmit: t => {
          Object.assign(e, {
            name: t.name,
            englishName: t.englishName,
            season: t.season,
            level: t.level,
            majorId: t.majorId,
            currentSchool: t.currentSchool
          }), de() && (e.advisorId = t.advisorId, e.writerIds = t.writerIds || []), st.put("students", e), Vs();
        }
      });
    },
    "student-archive"(t) {
      const e = bt.student(t.dataset.id);
      if (!rs(e && ce.manage(e.id))) return;
      const s = "archived" === e.status ? "active" : "archived";
      De("archived" === s ? `归档后 ${a(e.name)} 不再出现在在申列表和工作台，数据完整保留，可随时恢复。` : `把 ${a(e.name)} 恢复为在申学生？`, () => {
        st.patch("students", e.id, {
          status: s
        }), Vs();
      });
    },
    "student-delete"(e) {
      const s = bt.student(e.dataset.id);
      rs(s && de()) && De(`彻底删除 <b>${a(s.name)}</b> 及其全部申请、任务、文书、文件登记和账号？此操作不可恢复。日常请使用“归档”。`, () => {
        if (t) return void st.chain.then(() => ge.call("DELETE", "/students/" + encodeURIComponent(s.id))).then(() => st.load()).then(() => {
          Ae("已彻底删除 " + s.name), Rs("#/students"), Vs();
        }).catch(t => Ae("删除失败：" + t.message, {
          error: !0,
          ms: 7e3
        }));
        const e = bt.appsOf(s.id).map(t => t.id),
          a = st.where("documents", t => t.studentId === s.id).map(t => t.id),
          i = bt.recsOf(s.id).map(t => t.id),
          d = (t, e) => st.where(t, e).forEach(e => st.remove(t, e.id));
        d("applications", t => t.studentId === s.id), d("submissions", t => t.studentId === s.id), d("rounds", t => e.includes(t.applicationId)), d("tasks", t => t.studentId === s.id), d("versions", t => a.includes(t.documentId)), d("reviews", t => a.includes(t.documentId)), d("documents", t => t.studentId === s.id), d("materials", t => t.studentId === s.id), d("repertoire", t => t.studentId === s.id), d("refRequests", t => i.includes(t.recommenderId)), d("recommenders", t => t.studentId === s.id), d("activity", t => t.studentId === s.id), d("users", t => t.studentId === s.id), st.remove("students", s.id), Ae("已删除"), Rs("#/students");
      }, {
        danger: !0,
        yes: "彻底删除"
      });
    },
    "activity-new"(t) {
      const e = t.dataset.sid;
      rs(ce.manage(e)) && Oe({
        title: "添加动态记录",
        body: `<div class="form-grid">${Le("text", "内容", "", "textarea", {
          full: !0,
          required: !0
        })}${Le("applicationId", "相关院校", "", "select", {
          options: [["", "通用"]].concat(bt.appsOf(e).map(t => [t.id, yt(t)]))
        })}${Le("visible", "学生可见", !1, "check")}</div>`,
        onSubmit: t => {
          Jt(e, t.applicationId, t.text, t.visible), Vs();
        }
      });
    },
    "app-new"(t) {
      const e = t.dataset.sid,
        s = bt.student(e);
      rs(s && ce.manage(e)) && Oe({
        title: "添加院校申请",
        sub: `${s.name} · 选择院校后自动带出申请平台、截止日期与考试路径；创建后均可修改，也可以再添加提交项`,
        wide: !0,
        body: `<div class="form-grid">\n      ${Le("schoolId", "院校", "", "select", {
          options: [["", "请选择院校"]].concat(it().schools.map(t => [t.id, `${t.abbr} · ${t.zh}`]), [["__custom", "其他院校（手动填写）"]]),
          required: !0,
          attrs: 'data-act="app-school-change"'
        })}${Le("schoolName", "院校名称（手动）", "", "text", {
          placeholder: "仅“其他院校”需要填写，如 IU Jacobs"
        })}\n      ${Le("level", "学位层次", s.level, "select", {
          options: us
        })}${Le("majorId", "专业方向", s.majorId, "select", {
          options: cs()
        })}\n      ${Le("program", "具体项目名称", "", "text", {
          placeholder: "如 BMus (Hons)",
          required: !0
        })}${Le("internalDeadline", "内部目标日期（仅内部可见）", "", "date")}\n      <div class="form-section">第一个提交项（之后可在申请页添加更多，如 IU 的大学申请 + 音乐学院申请）</div>\n      ${Le("platform", "申请平台", "school_portal", "select", {
          options: Te(C),
          hint: '<span id="platHint">共用平台（UCAS / Common App）会并入该学生已有的同一平台提交记录。</span>'
        })}${Le("subName", "平台名称（学校自有系统时填写）", "", "text", {
          placeholder: "如 Jacobs Supplemental Application"
        })}\n      <div class="field"><label>官方截止（院校库）</label><div class="small" id="dlHint" style="padding-top:6px">选择院校后显示</div></div><div></div>\n      ${Le("rounds", "考试 / 录像轮次（每所学校单独提交）", [], "checks", {
          full: !0,
          options: Object.keys(L).map(t => [t, X(L, t)]),
          hint: '<span id="roundHint">可稍后在申请页面调整。</span>'
        })}\n    </div>`,
        submitLabel: "添加",
        onSubmit: t => {
          if ("__custom" === t.schoolId && !t.schoolName) return Ae("请填写院校名称", {
            error: !0
          }), !1;
          const s = {
              id: i("app"),
              studentId: e,
              schoolId: "__custom" === t.schoolId ? "" : t.schoolId,
              schoolName: "__custom" === t.schoolId ? t.schoolName : "",
              program: t.program,
              majorId: t.majorId,
              level: t.level,
              internalDeadline: t.internalDeadline,
              reqConfirmed: null,
              outcome: {
                type: "pending"
              },
              decision: {
                type: "pending"
              },
              skipTpl: [],
              parts: []
            },
            a = s.schoolId ? mt(s).find(t => t.d) : null;
          s.parts.push(hs(e, t.platform, t.subName, "主申请", a ? {
            date: a.d,
            verified: !1,
            note: "院校库预填，待核实"
          } : {
            date: "",
            verified: !1,
            note: ""
          })), st.put("applications", s);
          const d = vt(s.schoolId);
          for (const n of t.rounds || []) st.put("rounds", {
            id: i("rd"),
            studentId: e,
            applicationId: s.id,
            kind: n,
            platform: L[n].media && d ? `${d}（${ft(s)}）` : "",
            deadline: ["prescreen", "recorded", "portfolio"].includes(n) && a?.d || "",
            date: "",
            location: "",
            status: L[n].media ? "preparing" : "waiting",
            note: ""
          });
          Jt(e, s.id, `添加院校申请：${yt(s)}`, !0);
          const n = s.parts[0];
          n.needsAdd ? Ae(`${It(bt.sub(n.submissionId))} 已提交过：本校标记为“需在平台添加志愿”，添加后请在申请页确认`, {
            ms: 8e3
          }) : Ae("已添加，请核对院校要求"), Rs(`#/app/${s.id}/requirements`);
        }
      });
    },
    "app-edit"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && Oe({
        title: "编辑申请项目",
        sub: "申请平台与截止日期在“提交项”中修改",
        body: `<div class="form-grid">\n      ${Le("program", "项目名称", e.program, "text", {
          required: !0
        })}${Le("majorId", "专业方向", e.majorId, "select", {
          options: cs()
        })}\n      ${Le("level", "学位层次", e.level, "select", {
          options: us
        })}${Le("internalDeadline", "内部目标日期", e.internalDeadline, "date")}\n      ${e.schoolId ? "" : Le("schoolName", "院校名称", e.schoolName)}\n    </div>`,
        onSubmit: t => {
          Object.assign(e, {
            program: t.program,
            majorId: t.majorId,
            level: t.level,
            internalDeadline: t.internalDeadline
          }), e.schoolId || (e.schoolName = t.schoolName), st.put("applications", e), Vs();
        }
      });
    },
    "app-withdraw"(t) {
      const e = bt.app(t.dataset.id);
      if (rs(e && ce.manage(e.studentId))) return e.withdrawn ? (st.patch("applications", e.id, {
        withdrawn: null
      }), Jt(e.studentId, e.id, "恢复申请：" + yt(e), !0), void Vs()) : void Oe({
        title: "撤回申请",
        sub: yt(e),
        body: Le("reason", "原因", "", "textarea", {
          required: !0
        }),
        submitLabel: "撤回",
        danger: !0,
        onSubmit: t => {
          st.patch("applications", e.id, {
            withdrawn: {
              at: d(),
              reason: t.reason
            }
          });
          for (const t of st.where("tasks", t => t.applicationId === e.id && Kt(t))) st.patch("tasks", t.id, {
            status: "na"
          });
          Jt(e.studentId, e.id, "撤回申请：" + yt(e), !0), Vs();
        }
      });
    },
    "app-delete"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && de()) && De(`彻底删除 ${a(yt(e))} 及其考试轮次与任务？此操作用于纠正误建，不可恢复。`, () => {
        st.where("rounds", t => t.applicationId === e.id).forEach(t => st.remove("rounds", t.id)), st.where("tasks", t => t.applicationId === e.id).forEach(t => st.remove("tasks", t.id));
        const t = (e.parts || []).map(t => t.submissionId);
        st.remove("applications", e.id), t.forEach(bs), Rs("#/student/" + e.studentId);
      }, {
        danger: !0,
        yes: "彻底删除"
      });
    },
    "part-new"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && fs(e, null);
    },
    "part-edit"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && fs(e, (e.parts || []).find(e => e.id === t.dataset.part));
    },
    "part-delete"(t) {
      const e = bt.app(t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      if ((e.parts || []).length <= 1) return Ae("每个申请至少保留一个提交项；如需更换平台，请编辑该提交项", {
        error: !0
      });
      const s = e.parts.find(e => e.id === t.dataset.part);
      De(`从 ${a(ft(e))} 移除提交项“${a(s.label)} · ${a(It(bt.sub(s.submissionId)))}”？`, () => {
        e.parts = e.parts.filter(t => t.id !== s.id), st.put("applications", e), bs(s.submissionId), Vs();
      }, {
        danger: !0,
        yes: "移除"
      });
    },
    "part-added"(t) {
      const e = bt.app(t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      const s = e.parts.find(e => e.id === t.dataset.part);
      s.addedAt = l(), st.put("applications", e), Jt(e.studentId, e.id, `已在 ${It(bt.sub(s.submissionId))} 中添加 ${ft(e)} 志愿`, !0), Vs();
    },
    "deadline-adopt"(t) {
      const e = bt.app(t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      const s = (e.parts || []).find(e => e.id === t.dataset.part);
      s && (s.deadline = {
        date: t.dataset.date,
        verified: !0,
        note: "院校库，已核实"
      }, st.put("applications", e), Ae("已采用为「" + s.label + "」的官方截止"), Vs());
    },
    "req-confirm"(t) {
      const e = bt.app(t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      const s = document.getElementById("reqForm"),
        a = s ? _e(s) : {};
      let i = [];
      try {
        i = JSON.parse(document.getElementById("langOpts").value);
      } catch (t) {}
      const n = i.length ? i[Number(a.lang || 0)] : null;
      st.patch("applications", e.id, {
        reqConfirmed: {
          at: d(),
          by: ae().id,
          ids: a.ids || [],
          lang: n
        }
      }), Jt(e.studentId, e.id, `核对 ${ft(e)} 院校要求`, !1), gs(bt.app(e.id));
    },
    "plan-open"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && gs(e);
    },
    "sub-edit"(t) {
      const e = bt.sub(t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      const s = t.dataset.status || e.status,
        i = xt(e) ? [] : function (t) {
          const e = bt.appsOfSub(t.id),
            s = e.map(t => t.id),
            a = [],
            i = st.where("documents", e => !e.archived && (e.submissionId === t.id || !kt(t) && (e.applicationIds || []).some(t => s.includes(t)) && !e.submissionId));
          for (const t of i) "final" !== t.status && a.push(`文书“${t.title}”尚未定稿（${X(U, t.status)}）`);
          for (const e of st.where("refRequests", e => e.target === "sub:" + t.id && "submitted" !== e.status)) a.push(`推荐人 ${st.get("recommenders", e.recommenderId)?.name || ""} 的推荐信尚未提交`);
          for (const t of e) t.reqConfirmed || a.push(`${ft(t)} 的院校要求尚未核对`);
          const d = bt.student(t.studentId);
          return ["submitted", "verified"].includes(d?.intake?.status) || a.push("学生基础信息采集表尚未提交或核对"), a;
        }(e);
      Oe({
        title: It(e) + " · 提交状态",
        sub: (kt(e) ? "共用平台，覆盖：" : "用于：") + wt(e) + "。这里更新后，所有覆盖院校的进度同步变化。",
        body: `\n      ${i.length ? `<div class="notice" id="subChecks">${I("alert")}<div><strong>标记“已提交”前，以下事项尚未完成</strong>${i.map(t => "· " + a(t)).join("<br>")}<div class="mt8"><label class="row small" style="gap:6px"><input type="checkbox" data-single="1" name="ack"> 我已了解，仍按实际情况标记</label></div></div></div>` : ""}\n      <div class="form-grid">\n      ${Le("status", "状态", s, "select", {
          options: Te(_)
        })}${Le("ref", "申请编号 / Personal ID", e.ref)}\n      ${Le("submittedAt", "提交日期", e.submittedAt || (["submitted", "received"].includes(s) ? l() : ""), "date")}${Le("receivedAt", "学校确认收到日期", e.receivedAt || ("received" === s ? l() : ""), "date")}\n      ${kt(e) ? "" : Le("name", "平台名称", e.name, "text")}${Le("note", "备注", e.note, "text", {
          full: kt(e)
        })}</div>`,
        onSubmit: t => {
          const s = Ft.submission(e, t.status);
          if (s) return Ae(s, {
            error: !0
          }), !1;
          if (["submitted", "received"].includes(t.status) && !xt(e) && i.length && !t.ack) return Ae("请先勾选“我已了解”，或先完成上面的事项", {
            error: !0
          }), !1;
          "received" !== t.status || t.submittedAt || (t.submittedAt = t.receivedAt || l()), ["submitted", "received"].includes(t.status) && !t.submittedAt && (t.submittedAt = l()), "received" !== t.status || t.receivedAt || (t.receivedAt = l()), ["submitted", "received"].includes(t.status) || (t.submittedAt = "", t.receivedAt = "");
          const a = e.status;
          delete t.ack, Object.assign(e, t), st.put("submissions", e), function (t) {
            const e = [];
            xt(t) && e.push("submission:submitted"), "received" === t.status && e.push("submission:received");
            for (const s of st.where("tasks", s => s.submissionId === t.id && e.includes(s.effect) && Kt(s))) st.patch("tasks", s.id, {
              status: "done",
              doneAt: d()
            });
          }(e), a !== t.status && ["submitted", "received"].includes(t.status) && Jt(e.studentId, null, `${It(e)}${"received" === t.status ? " 学校已确认收到申请" : " 申请已提交"}（${wt(e)}）`, !0), Vs();
        }
      });
    },
    "round-new"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && ks({
        studentId: e.studentId,
        applicationId: e.id,
        kind: "prescreen",
        status: "preparing",
        platform: vt(e.schoolId)
      });
    },
    "round-edit"(t) {
      const e = st.get("rounds", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && ks(e);
    },
    "outcome-edit"(t) {
      const e = bt.app(t.dataset.id);
      rs(e && ce.manage(e.studentId)) && Oe({
        title: "录取结果与学生决定",
        sub: yt(e),
        body: `<div class="form-grid">\n      ${Le("outcome", "录取结果", e.outcome?.type || "pending", "select", {
          options: Te(B)
        })}${Le("outcomeDate", "通知日期", e.outcome?.date || "", "date")}\n      ${Le("conditions", "录取条件 / 说明", e.outcome?.conditions || "", "textarea", {
          full: !0
        })}\n      ${Le("decision", "学生决定", e.decision?.type || "pending", "select", {
          options: Te(P)
        })}${Le("decisionDate", "决定日期", e.decision?.date || "", "date")}</div>`,
        onSubmit: t => {
          const s = Ft.outcome(e, t.outcome) || Ft.decision(e, t.decision, t.outcome);
          if (s) return Ae(s, {
            error: !0
          }), !1;
          const a = e.outcome?.type;
          e.outcome = {
            type: t.outcome,
            date: "pending" !== t.outcome ? t.outcomeDate || l() : "",
            conditions: t.conditions
          }, e.decision = {
            type: t.decision,
            date: "pending" !== t.decision ? t.decisionDate || l() : ""
          }, st.put("applications", e), a !== t.outcome && "pending" !== t.outcome && Jt(e.studentId, e.id, `${ft(e)}：${X(B, t.outcome)}`, !0), Vs();
        }
      });
    },
    "task-new"(t) {
      const e = t.dataset.sid || ce.students().find(t => ce.manage(t.id))?.id;
      rs(e && ce.manage(e), "请先在你负责的学生下创建任务。") && xs({
        studentId: e,
        applicationId: t.dataset.app || "",
        assigneeId: ae().id,
        status: "todo",
        category: "other"
      });
    },
    "task-edit"(t) {
      const e = st.get("tasks", t.dataset.id);
      rs(e && ce.taskEdit(e)) && xs(e);
    },
    "task-delete"(t) {
      const e = st.get("tasks", t.dataset.id);
      rs(e && ce.taskEdit(e)) && De(`删除任务“${a(e.title)}”？${e.templateId ? "这是模板生成的任务，删除后“按模板补充”时不会再默认勾选它。" : ""}如果只是不再需要，也可以改为“不适用”。`, () => {
        e.templateId && e.scopeKey && Qt(e.scopeKey, e.templateId);
        for (const t of st.where("tasks", t => (t.dependsOn || []).includes(e.id))) st.patch("tasks", t.id, {
          dependsOn: t.dependsOn.filter(t => t !== e.id)
        });
        st.remove("tasks", e.id), Vs();
      }, {
        danger: !0,
        yes: "删除"
      });
    },
    "doc-new"(t) {
      const e = t.dataset.sid || ce.students().find(t => ce.manage(t.id))?.id;
      rs(e && ce.manage(e)) && js({
        studentId: e,
        type: "ps",
        writerId: (bt.student(e).writerIds || [])[0] || "",
        needStudentConfirm: !0,
        applicationIds: t.dataset.app ? [t.dataset.app] : []
      }, !t.dataset.sid);
    },
    "doc-edit"(t) {
      const e = bt.doc(t.dataset.id);
      rs(e && ce.docMeta(e)) && js(e, !1);
    },
    "doc-archive"(t) {
      const e = bt.doc(t.dataset.id);
      rs(e && ce.docMeta(e)) && De(`归档“${a(e.title)}”？归档后不再出现在看板和学生页面，版本记录保留。`, () => {
        st.patch("documents", e.id, {
          archived: !0
        }), Rs("#/student/" + e.studentId + "/docs");
      });
    },
    "doc-edit-body"(button) {
      const doc = bt.doc(button.dataset.id);
      if (!rs(doc && de() && !doc.archived && doc.status !== 'final')) return;
      const version = st.get('versions',doc.currentVersionId);
      const base = doc.updatedAt, versionId = doc.currentVersionId || null;
      Oe({title:'修改文书正文', sub:doc.title+' · 保存为新版本，保留当前审核阶段',wide:true,
        body:`${version && !Ue(version) ? '<p class="notice">当前版本为外部文件，请将需要修改的正文粘贴到下方。原文件记录仍会保留。</p>' : ''}<textarea class="textarea" name="text" id="verTextArea" rows="18" required>${a(version?.text || '')}</textarea><div class="word-count" id="verCount">${w(version?.text || '')} / ${x} words</div>${Le('note','修改说明（可选）','','textarea',{rows:2})}`,
        submitLabel:'保存新版本',
        onSubmit: async values => {
          await st.flush();
          await ge.call('POST',`/documents/${encodeURIComponent(doc.id)}/revise`,{text:values.text,note:values.note,base,versionId});
          await st.load(); Vs(); Ae('已保存新版本，当前审核阶段保持不变');
        }
      });
    },
    "doc-proxy-confirm"(button) {
      const doc = bt.doc(button.dataset.id);
      if (!rs(doc && de() && doc.status === 'student_review' && !doc.archived)) return;
      const base = doc.updatedAt, versionId = doc.currentVersionId || null;
      Oe({title:'代学生确认定稿',sub:doc.title,
        body:`<p>你将以主管身份代学生确认当前版本 V${st.get('versions',versionId)?.no || ''}。系统会记录实际操作人，确认后文书定稿。</p>${Le('comment','代确认备注（可选）','','textarea',{rows:3})}`,
        submitLabel:'代学生确认',onSubmit: async values => {
          await st.flush(); await ge.call('POST',`/documents/${encodeURIComponent(doc.id)}/proxy-confirm`,{base,versionId,comment:values.comment});
          await st.load(); Vs(); Ae('已代学生确认，操作人已记录');
        }
      });
    },
    "ver-new"(t) {
      const e = bt.doc(t.dataset.id);
      if (!rs(e && ce.docUpload(e))) return;
      const s = Gt(e),
        d = bt.versionsOf(e.id)[0],
        n = t.dataset.mode || (d && fqIsUpload(d) ? "upload" : d && !Ue(d) ? "file" : "text"),
        o = d && Ue(d) ? d.text : "";
      Oe({
        title: "新版本",
        sub: e.title + " · 可以在系统里写正文（不超过 " + x + " words）、上传文件，或登记网盘链接",
        wide: !0,
        body: `${s && "revising" === e.status ? `<div class="notice err">${I("message")}<div><strong>需要回应的意见</strong>${a(s.comment)}</div></div>` : ""}\n      <div class="seg"><label><input type="radio" name="mode" value="text" data-act="ver-mode" ${"text" === n ? "checked" : ""}>${I("edit")} 在线输入正文</label><label><input type="radio" name="mode" value="file" data-act="ver-mode" ${"file" === n ? "checked" : ""}>${I("link")} 登记网盘链接</label><label><input type="radio" name="mode" value="upload" data-act="ver-mode" ${"upload" === n ? "checked" : ""}>${I("upload")} 上传文件</label></div>\n      <div id="verUpload" class="form-grid" ${"upload" === n ? "" : "hidden"}><div class="field full"><input type="file" name="file" class="input" accept="${Object.keys(fqUploadTypes).map(t => "." + t).join(",")}"><div class="tiny muted2">支持 PDF、Word、Pages、TXT、Markdown、RTF、JPG、PNG，单个文件不超过 20 MB</div></div></div>\n      <div id="verText" ${"text" === n ? "" : "hidden"}>\n        <textarea class="textarea" name="text" id="verTextArea" rows="16" style="font:14px/1.7 Georgia,'Times New Roman','Songti SC',serif" placeholder="在这里撰写或粘贴文书正文">${a(o)}</textarea>\n        <div class="word-count" id="verCount">${w(o)} / ${x} words</div>\n        ${o ? `<div class="tiny muted2">已带入 V${d.no} 的正文，修改后保存为新版本；旧版本保留不变。</div>` : ""}\n      </div>\n      <div id="verFile" class="form-grid" ${"file" === n ? "" : "hidden"}>${Le("link", "网盘链接", "", "url", {
          full: !0,
          placeholder: "https://"
        })}${Le("fileName", "文件名", "", "text", {
          placeholder: "如 Lin_PS_V4.docx"
        })}</div>\n      <div class="form-grid">${Le("note", "本版修改说明", "", "textarea", {
          full: !0,
          required: "revising" === e.status,
          rows: 2,
          placeholder: "revising" === e.status ? "说明如何回应了退回意见" : ""
        })}\n      ${Le("submit", "保存后直接送顾问审核", !0, "check", {
          full: !0
        })}</div>`,
        submitLabel: "保存版本",
        onSubmit: async (t, form) => {
          const s = (bt.versionsOf(e.id)[0]?.no || 0) + 1;
          let a;
          if ("upload" === t.mode) {
            const f = form?.querySelector('input[name="file"]')?.files?.[0];
            if (!f) return Ae("请选择要上传的文件", {
              error: !0
            }), !1;
            const ext = (f.name.split(".").pop() || "").toLowerCase();
            if (!fqUploadTypes[ext]) return Ae("不支持的文件类型：." + ext, {
              error: !0
            }), !1;
            if (f.size > 20 * 1024 * 1024) return Ae("文件超过 20 MB 上限", {
              error: !0
            }), !1;
            let up;
            try {
              up = await fqUploadFile(e.id, f, fqUploadTypes[ext]);
            } catch (err) {
              return Ae("上传失败：" + err.message, {
                error: !0
              }), !1;
            }
            a = {
              id: i("v"),
              documentId: e.id,
              studentId: e.studentId,
              no: s,
              kind: "upload",
              upload: up,
              fileName: up.name,
              note: t.note,
              createdBy: ae().id
            };
          } else if ("text" === t.mode) {
            const n = w(t.text);
            if (!t.text) return Ae("请输入正文", {
              error: !0
            }), !1;
            if (n > x) return Ae(`正文 ${n} words，超过 ${x} words 上限`, {
              error: !0
            }), !1;
            if (d && Ue(d) && d.text === t.text) return Ae("正文与上一版本相同", {
              error: !0
            }), !1;
            a = {
              id: i("v"),
              documentId: e.id,
              studentId: e.studentId,
              no: s,
              kind: "text",
              text: t.text,
              words: n,
              note: t.note,
              createdBy: ae().id
            };
          } else {
            if (!/^https?:\/\//i.test(t.link || "")) return Ae("请填写以 http:// 或 https:// 开头的网盘链接", {
              error: !0
            }), !1;
            a = {
              id: i("v"),
              documentId: e.id,
              studentId: e.studentId,
              no: s,
              kind: "file",
              link: t.link,
              fileName: t.fileName,
              note: t.note,
              createdBy: ae().id
            };
          }
          st.put("versions", a), e.currentVersionId = a.id, st.put("documents", e), t.submit ? ys(e) : Ae("已保存 V" + s), Vs();
        }
      });
    },
    "ver-view"(t) {
      const e = st.get("versions", t.dataset.id);
      if (!e) return;
      const s = bt.doc(e.documentId);
      Oe({
        title: `${s?.title || "文书"} · V${e.no}`,
        sub: `在线正文 · ${$t(e.createdBy)} · ${m(e.createdAt)}${e.note ? " · " + e.note : ""}`,
        wide: !0,
        cancelLabel: "关闭",
        body: Ge(e, 560)
      });
    },
    "ver-copy"(t) {
      const e = st.get("versions", t.dataset.id);
      e && (navigator.clipboard?.writeText(e.text || "") || Promise.reject()).then(() => Ae("已复制正文"), () => Ae("浏览器不允许自动复制，请手动选择文字复制", {
        error: !0
      }));
    },
    "doc-submit"(t) {
      const e = bt.doc(t.dataset.id);
      rs(e && ce.docSubmit(e)) && (ys(e), Vs());
    },
    "doc-review"(t) {
      const e = bt.doc(t.dataset.id),
        s = t.dataset.stage,
        a = t.dataset.decision,
        d = "advisor" === s ? ce.docAdvisorReview(e) : "supervisor" === s ? ce.docSupervisorReview(e) : ce.docStudentReview(e);
      if (!rs(e && d)) return;
      const n = st.get("versions", e.currentVersionId),
        o = {
          approve: {
            advisor: "通过，送主管定稿",
            supervisor: e.needStudentConfirm ? "定稿，发给学生确认" : "定稿",
            student: "确认定稿"
          },
          changes: {
            advisor: "退回修改",
            supervisor: "退回修改",
            student: "提出修改"
          }
        };
      Oe({
        title: o[a][s],
        sub: `${e.title} · V${n?.no || ""}`,
        danger: "changes" === a,
        submitLabel: o[a][s],
        body: Le("comment", "changes" === a ? "修改意见（文书老师会看到）" : "备注（可选）", "", "textarea", {
          required: "changes" === a,
          rows: 4
        }) + ("student" === s && "approve" === a ? '<div class="small muted">确认后，这份文书将作为最终版本用于提交。</div>' : ""),
        onSubmit: async values => {
          await st.flush();
          await ge.call('POST',`/documents/${encodeURIComponent(e.id)}/review`,{base:e.updatedAt,versionId:n?.id || null,stage:s,decision:a,comment:values.comment});
          await st.load(); Vs(); Ae('已提交审核');
        }
      });
    },
    "doc-reopen"(t) {
      const e = bt.doc(t.dataset.id);
      rs(e && ce.docReopen(e)) && Oe({
        title: "重新打开修改",
        sub: e.title + " · 已定稿的文书重新进入修改流程",
        body: Le("comment", "原因 / 修改要求", "", "textarea", {
          required: !0
        }),
        submitLabel: "重新打开",
        onSubmit: async t => {
          await st.flush();
          await ge.call("POST", `/documents/${encodeURIComponent(e.id)}/review`, {
            base: e.updatedAt,
            versionId: e.currentVersionId || null,
            stage: de() ? "supervisor" : "advisor",
            decision: "changes",
            comment: t.comment
          });
          await st.load(), Vs(), Ae("已重新打开修改");
        }
      });
    },
    "mat-new"(t) {
      const e = t.dataset.sid;
      rs(ce.manage(e)) && As({
        studentId: e,
        kind: "video",
        status: "review",
        applicationIds: t.dataset.app ? [t.dataset.app] : [],
        versions: [],
        feedback: []
      });
    },
    "mat-edit"(t) {
      const e = st.get("materials", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && As(e);
    },
    "mat-open"(t) {
      const e = st.get("materials", t.dataset.id);
      if (!e) return;
      const s = ce.manage(e.studentId),
        i = (e.versions || []).slice().reverse(),
        d = (e.feedback || []).slice().reverse();
      Oe({
        title: e.title,
        sub: `${bt.student(e.studentId)?.name} · ${X(H, e.kind)} · 用于 ${(e.applicationIds || []).map(t => ft(bt.app(t))).join("、") || "通用"}`,
        wide: !0,
        cancelLabel: "关闭",
        body: `<div class="row">${Q(G, e.status)}${e.note ? `<span class="small muted">${a(e.note)}</span>` : ""}</div>\n      <div class="grid cols-2"><div><b class="small" style="color:var(--accent)">版本</b><div class="stack tight mt8">${i.map(t => `<div class="card"><div class="row between"><b class="small">V${t.no} · ${a(t.fileName || "")}</b>${He(t)}</div><div class="card-meta">${m(t.at)} · ${a($t(t.by))}${t.note ? " · " + a(t.note) : ""}</div></div>`).join("") || '<span class="small muted2">暂无版本</span>'}</div></div>\n      <div><b class="small" style="color:var(--accent)">审核意见</b><div class="timeline mt8">${d.map(t => `<div class="tl"><i class="${"approve" === t.verdict ? "ok" : "changes" === t.verdict ? "err" : "info"}"></i><div><div class="t">${a(t.source)}${t.author ? " " + a(t.author) : ""} · ${"approve" === t.verdict ? "可以使用" : "changes" === t.verdict ? "需要重做" : "意见"}${t.versionNo ? " · V" + t.versionNo : ""}</div><div class="m">${m(t.at)} · 由 ${a($t(t.by))} 登记</div><div class="c">${a(t.text)}</div></div></div>`).join("") || '<span class="small muted2">暂无意见</span>'}</div></div></div>`,
        footExtra: s ? `<button type="button" class="btn sm" data-act="mat-version" data-id="${e.id}">新版本</button><button type="button" class="btn sm" data-act="mat-feedback" data-id="${e.id}">登记意见</button><button type="button" class="btn sm" data-act="mat-edit" data-id="${e.id}">编辑</button>` : ""
      });
    },
    "mat-version"(t) {
      const e = st.get("materials", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && Oe({
        title: "登记新版本",
        sub: e.title,
        body: `<div class="form-grid">${Le("link", "网盘链接", "", "url", {
          required: !0,
          full: !0,
          placeholder: "https://"
        })}${Le("fileName", "文件名", "")}${Le("toReview", "标记为“待审核”", ["video", "audio", "portfolio"].includes(e.kind), "check")}${Le("note", "本版说明", "", "textarea", {
          full: !0
        })}</div>`,
        onSubmit: t => {
          const s = (e.versions || []).reduce((t, e) => Math.max(t, e.no), 0) + 1;
          e.versions = (e.versions || []).concat([{
            no: s,
            link: t.link,
            fileName: t.fileName,
            note: t.note,
            by: ae().id,
            at: d()
          }]), t.toReview && (e.status = "review"), st.put("materials", e), Jt(e.studentId, (e.applicationIds || [])[0], `${e.title} 更新为 V${s}`, !1), Vs();
        }
      });
    },
    "mat-feedback"(t) {
      const e = st.get("materials", t.dataset.id);
      if (!rs(e && ce.manage(e.studentId))) return;
      const s = (e.versions || []).reduce((t, e) => Math.max(t, e.no), 0);
      Oe({
        title: "登记审核意见",
        sub: e.title + " · 专业老师的意见由顾问代为登记",
        body: `<div class="form-grid">\n      ${Le("source", "意见来自", "专业老师", "select", {
          options: [["专业老师", "专业老师"], ["顾问", "顾问"], ["主管", "主管"]]
        })}${Le("author", "老师姓名", "", "text", {
          placeholder: "如 张老师"
        })}\n      ${Le("versionNo", "针对版本", String(s), "select", {
          options: (e.versions || []).map(t => [String(t.no), "V" + t.no]).reverse()
        })}${Le("verdict", "结论", "changes", "select", {
          options: [["approve", "可以使用"], ["changes", "需要重做 / 修改"], ["comment", "仅意见"]]
        })}\n      ${Le("text", "具体意见", "", "textarea", {
          full: !0,
          required: !0,
          rows: 4
        })}</div>`,
        onSubmit: t => {
          e.feedback = (e.feedback || []).concat([{
            id: i("fb"),
            source: t.source,
            author: t.author,
            verdict: t.verdict,
            text: t.text,
            versionNo: Number(t.versionNo) || null,
            by: ae().id,
            at: d()
          }]), "approve" === t.verdict ? e.status = "approved" : "changes" === t.verdict && (e.status = "changes"), st.put("materials", e), Jt(e.studentId, (e.applicationIds || [])[0], `${e.title}：登记${t.source}${t.author ? t.author : ""}意见（${"approve" === t.verdict ? "可以使用" : "changes" === t.verdict ? "需要重做" : "意见"}）`, !1), Vs();
        }
      });
    },
    "mat-archive"(t) {
      const e = st.get("materials", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && De(`归档“${a(e.title)}”？`, () => {
        st.patch("materials", e.id, {
          archived: !0
        }), Vs();
      });
    },
    "rep-new"(t) {
      rs(ce.manage(t.dataset.sid)) && qs({
        studentId: t.dataset.sid,
        status: "selected",
        applicationIds: t.dataset.app ? [t.dataset.app] : []
      });
    },
    "rep-edit"(t) {
      const e = st.get("repertoire", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && qs(e);
    },
    "rep-delete"(t) {
      const e = st.get("repertoire", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && De("删除这首曲目？", () => {
        st.remove("repertoire", e.id), Vs();
      }, {
        danger: !0,
        yes: "删除"
      });
    },
    "rec-new"(t) {
      rs(ce.manage(t.dataset.sid)) && Os({
        studentId: t.dataset.sid
      });
    },
    "rec-edit"(t) {
      const e = st.get("recommenders", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && Os(e);
    },
    "ref-new"(t) {
      const e = st.get("recommenders", t.dataset.id);
      rs(e && ce.manage(e.studentId)) && Oe({
        title: "添加推荐信请求",
        sub: e.name,
        body: `<div class="form-grid">${Le("target", "用于", "", "select", {
          options: $s(e.studentId),
          required: !0,
          full: !0
        })}${Le("status", "状态", "not_invited", "select", {
          options: Te(Y)
        })}${Le("dueAt", "截止", "", "date")}</div>`,
        onSubmit: t => {
          st.put("refRequests", {
            id: i("rq"),
            recommenderId: e.id,
            studentId: e.studentId,
            target: t.target,
            status: t.status,
            invitedAt: "not_invited" !== t.status ? l() : "",
            dueAt: t.dueAt
          }), Vs();
        }
      });
    },
    "user-new"() {
      rs(de()) && Cs({
        role: "advisor",
        active: !0
      });
    },
    "user-edit"(t) {
      rs(de()) && Cs(bt.user(t.dataset.id));
    },
    "user-toggle"(e) {
      if (!rs(de())) return;
      const s = bt.user(e.dataset.id);
      if (t) return ge.call("PUT", "/users/" + s.id, {
        active: !s.active
      }).then(t => {
        Object.assign(s, t.user), Ae(s.active ? "已启用" : "已停用，该账号已被强制下线"), Vs();
      }).catch(t => Ae(t.message, {
        error: !0
      }));
      st.patch("users", s.id, {
        active: !s.active
      }), Vs();
    },
    "user-reset"(e) {
      const s = bt.user(e.dataset.id);
      if (rs(s && (de() || ne() && "student" === s.role && ce.manage(s.studentId)))) return t ? void De(`为 ${a(s.name)} 重置密码？旧密码立即失效，对方需用新的初始密码登录并修改。`, () => {
        ge.call("POST", `/users/${s.id}/reset`).then(t => setTimeout(() => Se([{
          name: s.name,
          username: s.username || "",
          password: t.password
        }], "密码已重置"), 50)).catch(t => Ae(t.message, {
          error: !0
        }));
      }, {
        yes: "重置"
      }) : Ae("部署到服务器后，这里会生成新的初始密码。");
    },
    "student-account"(e) {
      const s = bt.student(e.dataset.id);
      if (!rs(s && ce.manage(s.id))) return;
      const a = st.where("users", t => "student" === t.role && t.studentId === s.id)[0];
      return a ? ms["user-reset"]({
        dataset: {
          id: a.id
        }
      }) : t ? void Oe({
        title: "开设学生账号",
        sub: s.name + " · 学生只能看自己的进度、确认文书、填写采集表",
        body: Le("username", "登录名", (s.englishName || "").toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, ""), "text", {
          required: !0,
          hint: "3–40 位字母、数字或 . _ -"
        }),
        submitLabel: "开设",
        onSubmit: t => {
          ge.call("POST", "/users", {
            name: s.name,
            username: t.username,
            role: "student",
            studentId: s.id
          }).then(t => {
            st.data.users.push(t.user), setTimeout(() => Se([{
              name: s.name,
              username: t.user.username,
              password: t.password
            }], "学生账号已开设"), 50), Vs();
          }).catch(t => Ae(t.message, {
            error: !0
          }));
        }
      }) : Ae("部署到服务器后可在此开设学生账号");
    },
    "tpl-new"() {
      rs(de()) && Ds({
        category: "other",
        scope: "application",
        cond: "all",
        offset: -14,
        effect: "",
        active: !0
      });
    },
    "tpl-edit"(t) {
      rs(de()) && Ds(st.get("templates", t.dataset.id));
    },
    "tpl-delete"(t) {
      rs(de()) && De("删除这个模板？已生成的任务不受影响。", () => {
        st.remove("templates", t.dataset.id), Vs();
      }, {
        danger: !0,
        yes: "删除"
      });
    },
    "data-export"() {
      if (t) return ge.call("GET", "/admin/export").then(t => _s("枫琴申请数据备份_" + l() + ".json", JSON.stringify(t, null, 1))).catch(t => Ae(t.message, {
        error: !0
      }));
      _s("枫琴申请数据备份_" + l() + ".json", JSON.stringify(st.exportAll(), null, 1));
    },
    "data-import"() {
      Ls(".json", e => {
        const s = JSON.parse(e);
        if (t) return De("用备份替换服务器上的全部数据？账号密码不在备份中：备份里存在、服务器上没有的账号会以临时密码重新开设。", () => ge.call("POST", "/admin/import", s).then(t => (t.created?.length && setTimeout(() => Se(t.created, "已重新开设的账号"), 50), st.load())).then(() => {
          Ae("已恢复"), Vs();
        }).catch(t => Ae(t.message, {
          error: !0
        })), {
          danger: !0,
          yes: "替换"
        });
        De("用备份替换当前浏览器中的全部数据？", () => {
          st.importAll(s), se.restore(), Ae("已恢复"), Vs();
        }, {
          danger: !0,
          yes: "替换"
        });
      });
    },
    "data-reset"() {
      if (t) return De("载入演示数据？服务器上现有的全部学生、申请与文书会被替换，除你以外的账号会被删除，并生成演示账号。", () => ge.call("POST", "/admin/demo").then(t => (setTimeout(() => Se(t.accounts, "演示账号（初始密码只显示一次）"), 50), st.load())).then(() => Vs()).catch(t => Ae(t.message, {
        error: !0
      })), {
        danger: !0,
        yes: "载入"
      });
      De("恢复演示数据？当前全部数据会被覆盖。", () => {
        st.reset(), se.login("u-sup"), Ae("已恢复演示数据"), Rs("#/home");
      }, {
        danger: !0,
        yes: "恢复"
      });
    },
    "data-clear"() {
      if (t) return De("清空全部学生、申请、任务与文书，并删除所有非主管账号？保留任务模板与院校库。不可恢复，建议先导出备份。", () => ge.call("POST", "/admin/clear").then(() => st.load()).then(() => {
        Ae("已清空"), Rs("#/home");
      }).catch(t => Ae(t.message, {
        error: !0
      })), {
        danger: !0,
        yes: "清空"
      });
      De("清空全部学生、申请、任务与文书？保留主管账号与任务模板。不可恢复。", () => {
        st.clear(), se.restore(), Ae("已清空"), Rs("#/home");
      }, {
        danger: !0,
        yes: "清空"
      });
    },
    "reqdb-export"() {
      if (t) return ge.call("GET", "/reqdb").then(t => _s("院校要求库_" + l() + ".json", JSON.stringify(t, null, 1))).catch(t => Ae(t.message, {
        error: !0
      }));
      _s("院校要求库_" + l() + ".json", JSON.stringify(it(), null, 1));
    },
    "reqdb-import"() {
      Ls(".json", e => {
        const s = JSON.parse(e);
        if (!s.schools || !s.records) throw new Error("文件格式不对：需要包含 schools 与 records");
        if (t) return ge.call("PUT", "/reqdb", s).then(() => (ye.loaded.clear(), st.load())).then(() => {
          Ae(`已导入 ${s.schools.length} 所学校、${s.records.length} 条要求`), Vs();
        }).catch(t => Ae(t.message, {
          error: !0
        }));
        st.setReqDB(s), Ae(`已导入 ${s.schools.length} 所学校、${s.records.length} 条要求`), Vs();
      });
    },
    "reqdb-reset"() {
      De("恢复系统内置院校库？", () => {
        st.reqdb = null;
        try {
          localStorage.removeItem(et + "reqdb");
        } catch (t) {}
        Vs();
      });
    }
  };
  function vs(t, e, s = "") {
    if (C[e]?.shared) {
      const s = st.where("submissions", s => s.studentId === t && s.platform === e)[0];
      if (s) return s.id;
    }
    return st.put("submissions", {
      id: i("sub"),
      studentId: t,
      platform: e,
      name: C[e]?.shared ? "" : s,
      status: "not_started",
      submittedAt: "",
      receivedAt: "",
      ref: "",
      note: "",
      skipTpl: []
    }).id;
  }
  function hs(t, e, s, a, d) {
    const n = vs(t, e, s),
      o = bt.sub(n);
    return {
      id: i("p"),
      submissionId: n,
      label: a || "主申请",
      required: !0,
      deadline: d || {
        date: "",
        verified: !1,
        note: ""
      },
      needsAdd: kt(o) && xt(o),
      addedAt: ""
    };
  }
  function bs(t) {
    !t || st.where("applications", e => (e.parts || []).some(e => e.submissionId === t)).length || st.where("documents", e => e.submissionId === t).length || st.remove("submissions", t);
  }
  function $s(t) {
    return st.where("submissions", e => e.studentId === t && bt.appsOfSub(e.id).length).map(t => ["sub:" + t.id, `${It(t)}（${wt(t)}）`]).concat(bt.activeAppsOf(t).map(t => ["app:" + t.id, yt(t) + "（单独提交）"]));
  }
  function fs(t, e) {
    const s = !e,
      a = e ? bt.sub(e.submissionId) : null,
      i = e?.deadline || {};
    Oe({
      title: s ? "添加提交项" : "编辑提交项",
      sub: `${yt(t)} · 一所学校可以有多个提交项（如大学申请 + 音乐学院申请）`,
      wide: !0,
      body: `<div class="form-grid">\n    ${Le("label", "提交项名称", e?.label || "音乐学院申请", "text", {
        required: !0,
        hint: "常用：" + D.join(" / ")
      })}${Le("platform", "申请平台", a?.platform || "school_portal", "select", {
        options: Te(C),
        hint: "UCAS / Common App 为共用平台：同一学生只有一条提交记录，被多所学校共用"
      })}\n    ${Le("subName", "平台名称（非共用平台）", a && !kt(a) ? a.name : "", "text", {
        placeholder: "如 Jacobs Supplemental Application"
      })}${Le("required", "必需（全部必需项提交后，本校才算“已提交”）", !e || !1 !== e.required, "check")}\n    ${Le("date", "官方截止日期", i.date, "date")}${Le("verified", "已在官网 / 招生邮件中核实", !!i.verified, "check")}\n    ${Le("note", "截止日期来源 / 备注", i.note, "text", {
        full: !0
      })}</div>`,
      footExtra: !s && (t.parts || []).length > 1 ? `<button type="button" class="btn sm danger" data-act="part-delete" data-id="${t.id}" data-part="${e.id}">移除提交项</button>` : "",
      onSubmit: i => {
        const d = {
          date: i.date,
          verified: i.verified,
          note: i.note
        };
        if (s) {
          const e = hs(t.studentId, i.platform, i.subName, i.label, d);
          if (e.required = i.required, (t.parts || []).some(t => t.submissionId === e.submissionId)) return Ae("本校已经有这个平台的提交项", {
            error: !0
          }), !1;
          t.parts = (t.parts || []).concat([e]), e.needsAdd && Ae(`${It(bt.sub(e.submissionId))} 已提交过：本校标记为“需在平台添加志愿”`, {
            ms: 7e3
          });
        } else {
          const s = e.submissionId;
          if (i.platform !== a.platform) {
            const a = vs(t.studentId, i.platform, i.subName);
            if ((t.parts || []).some(t => t.id !== e.id && t.submissionId === a)) return Ae("本校已经有这个平台的提交项", {
              error: !0
            }), !1;
            e.submissionId = a;
            const d = bt.sub(a);
            e.needsAdd = kt(d) && xt(d), e.addedAt = "";
            for (const e of st.where("tasks", e => e.submissionId === s && e.applicationId === t.id)) st.patch("tasks", e.id, {
              submissionId: a,
              scopeKey: "sub:" + a
            });
          } else kt(a) || i.subName === a.name || st.patch("submissions", a.id, {
            name: i.subName
          });
          Object.assign(e, {
            label: i.label,
            required: i.required,
            deadline: d
          });
          const n = t.parts.findIndex(t => t.id === e.id);
          t.parts[n] = Object.assign({}, t.parts[n], e), delete t.parts[n].sub, st.put("applications", t), s !== e.submissionId && (bs(s), Jt(t.studentId, t.id, `${ft(t)} 的提交平台改为 ${It(bt.sub(e.submissionId))}`, !1));
        }
        st.put("applications", t), Vs();
      }
    });
  }
  function gs(t) {
    const e = function (t) {
        const e = t.studentId,
          s = bt.roundsOf(t.id),
          a = St(t),
          i = s.find(t => L[t.kind]?.media && "preparing" === t.status),
          d = s.find(t => L[t.kind]?.media && "cancelled" !== t.status),
          n = s.find(t => !L[t.kind]?.media && !["done", "cancelled", "not_passed"].includes(t.status)),
          o = function (t) {
            const e = St(t).filter(t => !1 !== t.required),
              s = e.filter(t => !jt(t) && t.deadline?.date).sort((t, e) => $(t.deadline.date, e.deadline.date));
            if (s.length) return Object.assign({
              part: s[0]
            }, s[0].deadline);
            const a = e.filter(t => t.deadline?.date).sort((t, e) => $(t.deadline.date, e.deadline.date))[0];
            return a ? Object.assign({
              part: a
            }, a.deadline) : {
              date: "",
              verified: !1
            };
          }(t).date || t.internalDeadline || "",
          l = [];
        for (const s of st.all("templates").filter(t => !1 !== t.active)) {
          if ("media" === s.cond && !d) continue;
          if ("live" === s.cond && !n) continue;
          const m = Number(s.offset) || 0,
            v = [];
          if ("student" === s.scope) v.push({
            scopeKey: "stu:" + e,
            ref: te(e) || o,
            done: bt.activeAppsOf(e).every(Ot),
            ctx: "学生通用"
          });else if ("submission" === s.scope) for (const e of a) e.sub && ("shared" !== s.cond || kt(e.sub)) && v.push({
            scopeKey: "sub:" + e.sub.id,
            sub: e.sub,
            ref: Ct(e.sub.id) || o,
            done: xt(e.sub),
            ctx: kt(e.sub) ? `${It(e.sub)}（${wt(e.sub)} 共用）` : `${ft(t)} · ${It(e.sub)}`
          });else {
            if ("shared" === s.cond && !a.some(t => kt(t.sub))) continue;
            const e = "media" === s.cond ? d?.deadline || o : "live" === s.cond && n?.date || o;
            v.push({
              scopeKey: "app:" + t.id,
              ref: e,
              done: Ot(t),
              ctx: ft(t)
            });
          }
          for (const e of v) {
            if ("submission:submitted" === s.effect && e.sub && xt(e.sub)) continue;
            if ("submission:received" === s.effect && e.sub && "received" === e.sub.status) continue;
            if ("media" === s.cond && !i) continue;
            if (e.done && m < 0 && "media" !== s.cond) continue;
            const d = st.where("tasks", t => t.templateId === s.id && t.scopeKey === e.scopeKey)[0] || null;
            let o = e.ref ? c(e.ref, m) : "",
              v = !1,
              h = "";
            o && u(o) < 0 && (h = o, o = "", v = !0), l.push({
              key: s.id + "|" + e.scopeKey,
              tpl: s,
              scopeKey: e.scopeKey,
              ctx: e.ctx,
              title: s.title,
              dueDate: o,
              needsDate: v,
              oldDate: h,
              applicationId: e.scopeKey.startsWith("app:") || e.sub && !kt(e.sub) ? t.id : null,
              submissionId: e.sub ? e.sub.id : s.effect.startsWith("submission") && a[0]?.submissionId || null,
              roundId: "media" === s.cond ? i?.id || null : "live" === s.cond && n?.id || null,
              existing: d,
              skipped: !d && (r = e.scopeKey, p = s.id, (Xt(r)?.skipTpl || []).includes(p))
            });
          }
        }
        var r, p;
        return l;
      }(t),
      s = e.filter(t => !t.existing),
      d = {};
    for (const t of e) (d[t.ctx] ||= []).push(t);
    const n = t => {
      const e = t.existing ? "disabled" : "",
        s = t.existing || t.skipped ? "" : "checked",
        i = t.existing ? `<span class="pill ok plain">已有：${a(X(q, t.existing.status))}</span>` : t.skipped ? '<span class="pill plain">之前已跳过</span>' : "",
        d = t.existing ? "" : t.needsDate ? `<span class="pill warn plain">模板日期 ${p(t.oldDate)} 已过，将暂定为 ${p(c(l(), 7))}，生成后请确认</span>` : t.dueDate ? `<span class="small">${p(t.dueDate)}</span>` : `<span class="pill warn plain">无截止日期可参考，将暂定为 ${p(c(l(), 7))}</span>`,
        n = (t.tpl.after || []).map(t => st.get("templates", t)?.title).filter(Boolean);
      return `<label class="req ${t.existing ? "off" : ""}" style="display:flex;gap:10px;align-items:flex-start;padding:9px 12px;cursor:${t.existing ? "default" : "pointer"}"><input type="checkbox" name="keys" value="${a(t.key)}" ${s} ${e} style="margin-top:3px"><div style="flex:1"><div class="row"><b class="small">${a(t.title)}</b>${i}</div><div class="row tiny muted2 mt8" style="margin-top:3px">${d}${n.length ? " · 前置：" + a(n.join("、")) : ""}</div></div></label>`;
    };
    if (!e.length) return Ae("按当前模板，本校没有需要补充的任务"), void Vs();
    Oe({
      title: "按模板补充任务",
      sub: `${yt(t)} · 已有的不会重复；没勾选的会记为“跳过”，以后不再默认勾选`,
      wide: !0,
      submitLabel: s.length ? "生成勾选的任务" : "关闭",
      cancelLabel: "稍后再说",
      body: Object.entries(d).map(([t, e]) => `<div><div class="small" style="font-weight:800;color:var(--accent);margin-bottom:6px">${a(t)}</div><div class="stack tight">${e.map(n).join("")}</div></div>`).join("") + '<div class="tiny muted2">共用平台的任务（如 UCAS 提交、推荐信）对覆盖的所有学校只生成一次；每所学校的录像任务分别生成。</div>',
      onSubmit: s => {
        const a = s.keys || [],
          d = function (t, e, s) {
            const a = t.studentId,
              d = bt.student(a),
              n = [];
            for (const t of e) {
              if (t.existing) continue;
              if (!s.includes(t.key)) {
                Qt(t.scopeKey, t.tpl.id);
                continue;
              }
              const e = st.put("tasks", {
                id: i("t"),
                studentId: a,
                applicationId: t.applicationId,
                submissionId: t.submissionId,
                roundId: t.roundId,
                title: t.title,
                category: t.tpl.category,
                assigneeId: d?.advisorId || null,
                dueDate: t.dueDate || c(l(), 7),
                status: "todo",
                blocked: !1,
                blockedReason: "",
                note: t.needsDate ? `模板日期 ${p(t.oldDate)} 已过，暂定为一周后，请确认` : t.dueDate ? "" : "没有可参考的截止日期，暂定为一周后，请确认",
                effect: t.tpl.effect || "",
                templateId: t.tpl.id,
                scopeKey: t.scopeKey,
                dependsOn: [],
                createdBy: se.user?.id
              });
              n.push(e);
            }
            for (const e of n) {
              const s = st.get("templates", e.templateId);
              if (!s?.after?.length) continue;
              const i = ["app:" + t.id, ...(t.parts || []).map(t => "sub:" + t.submissionId), "stu:" + a],
                d = s.after.map(t => st.where("tasks", e => e.templateId === t && i.includes(e.scopeKey) && e.studentId === a).sort((t, e) => i.indexOf(t.scopeKey) - i.indexOf(e.scopeKey))[0]).filter(Boolean).map(t => t.id);
              d.length && st.patch("tasks", e.id, {
                dependsOn: d
              });
            }
            return n;
          }(bt.app(t.id), e, a),
          n = d.filter(t => /暂定为一周后/.test(t.note || "")).length;
        Ae(d.length ? `已生成 ${d.length} 项任务${n ? `，其中 ${n} 项为暂定日期（一周后），请确认` : ""}` : "没有生成新任务"), location.hash.endsWith("/requirements") ? Rs("#/app/" + t.id) : Vs();
      }
    });
  }
  function ys(t) {
    st.put("reviews", {
      id: i("r"),
      documentId: t.id,
      studentId: t.studentId,
      versionId: t.currentVersionId,
      stage: "writer",
      userId: ae().id,
      decision: "submit",
      comment: ""
    }), st.patch("documents", t.id, {
      status: "advisor_review"
    }), Jt(t.studentId, null, `${t.title} V${st.get("versions", t.currentVersionId)?.no} 送顾问审核`, !1), Ae("已送顾问审核");
  }
  function ks(t) {
    const e = !t.id;
    var s;
    Oe({
      title: e ? "添加考试 / 录像轮次" : "编辑轮次",
      sub: yt(bt.app(t.applicationId)),
      body: `<div class="form-grid">\n    ${Le("kind", "类型", t.kind, "select", {
        options: Te(L),
        attrs: 'data-act="round-kind-change"'
      })}${Le("status", "状态", t.status, "select", {
        options: (s = t.kind, Te(M(s)))
      })}\n    ${Le("platform", "提交平台", t.platform, "text", {
        placeholder: "Acceptd / 学校系统 / Zoom"
      })}${Le("location", "考点 / 地点", t.location, "text")}\n    ${Le("deadline", "提交截止（录像 / 作品）", t.deadline, "date")}${Le("date", "考试日期（现场 / 线上）", t.date, "date")}\n    ${Le("note", "备注（学生不可见）", t.note, "textarea", {
        full: !0
      })}</div>`,
      footExtra: e ? "" : `<button type="button" class="btn sm danger" data-act="round-delete" data-id="${t.id}">删除轮次</button>`,
      onSubmit: s => {
        const a = M(s.kind);
        a[s.status] || (s.status = Object.keys(a)[0]);
        const i = Ft.round(Object.assign({}, t, {
          kind: s.kind
        }), s.status);
        if (i) return Ae(i, {
          error: !0
        }), !1;
        const d = t.status;
        Yt(st.put("rounds", Object.assign(t, s))), e ? Jt(t.studentId, t.applicationId, `添加${X(L, s.kind)}`, !0) : d !== s.status && Jt(t.studentId, t.applicationId, `${ft(bt.app(t.applicationId))} ${X(L, s.kind)}：${X(a, s.status)}`, !0), Vs();
      }
    });
  }
  function Is(t, e) {
    return st.where("tasks", s => s.studentId === t && s.id !== e && "na" !== s.status).sort((t, e) => $(t.dueDate, e.dueDate)).map(t => [t.id, `${t.title}（${Zt(t)}${Kt(t) ? "" : " · 已完成"}）`]);
  }
  function ws(t, e) {
    const s = (e || []).map(t => t.type + ":" + t.id);
    return `<div class="checks" style="flex-direction:column;gap:4px">${function (t) {
      return bt.docsOf(t).map(t => {
        const e = st.get("versions", t.currentVersionId);
        return ["doc:" + t.id, `文书 · ${t.title}${e ? ` · V${e.no}（${Ue(e) ? "在线正文" : "文件"}）` : " · 尚无版本"}`];
      }).concat(bt.matsOf(t).map(t => ["mat:" + t.id, `${X(H, t.kind)} · ${t.title}`]));
    }(t).map(([t, e]) => `<label><input type="checkbox" name="links" value="${a(t)}" ${s.includes(t) ? "checked" : ""}> ${a(e)}</label>`).join("") || '<span class="muted2 small">该学生还没有文书或文件</span>'}</div>`;
  }
  function xs(t) {
    const e = !t.id,
      s = ce.students().filter(t => ce.manage(t.id) && "active" === t.status);
    var d;
    Oe({
      title: e ? "新建任务" : "编辑任务",
      wide: !0,
      body: `<div class="form-grid">\n    ${Le("title", "任务", t.title, "text", {
        required: !0,
        full: !0
      })}\n    ${e ? Le("studentId", "学生", t.studentId, "select", {
        options: s.map(t => [t.id, t.name]),
        attrs: 'data-act="task-student-change"'
      }) : Le("studentId", "", t.studentId, "hidden") + `<div class="field"><label>学生</label><div class="small" style="padding-top:6px">${a(bt.student(t.studentId)?.name)}</div></div>`}\n    ${Le("applicationId", "所属院校", t.applicationId || "", "select", {
        options: (d = t.studentId, [["", "学生通用（不属于某所院校）"]].concat(bt.activeAppsOf(d).map(t => [t.id, yt(t)])))
      })}\n    ${Le("assigneeId", "负责人", t.assigneeId || "", "select", {
        options: Ee(["supervisor", "advisor", "writer"])
      })}${Le("dueDate", "截止日期", t.dueDate, "date", {
        required: !0
      })}\n    ${Le("category", "类别", t.category, "select", {
        options: Object.entries(O)
      })}${Le("status", "状态", t.status, "select", {
        options: Object.keys(q).map(t => [t, q[t][0]])
      })}\n    ${Le("blocked", "受阻（等待外部回复等）", t.blocked, "check")}${Le("blockedReason", "受阻原因", t.blockedReason)}\n    <div class="field full" id="depField"><label>前置任务（软顺序：未完成时会提示，但不阻止）</label><div style="max-height:150px;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:8px">${Le("dependsOn", "", t.dependsOn || [], "checks", {
        options: Is(t.studentId, t.id)
      }).replace(/^<div class="field[^>]*"><label[^>]*><\/label>/, "<div>")}</div></div>\n    <div class="field full" id="linkField"><label>关联文书 / 文件（在线正文与网盘文件都可以选）</label><div style="max-height:150px;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:8px">${ws(t.studentId, t.links || [])}</div></div>\n    ${Le("note", "备注", t.note, "textarea", {
        full: !0
      })}</div>`,
      footExtra: e ? "" : `<button type="button" class="btn sm danger" data-act="task-delete" data-id="${t.id}">删除</button>`,
      onSubmit: s => {
        if (s.blocked && !s.blockedReason) return Ae("请写明受阻原因", {
          error: !0
        }), !1;
        const a = t.status;
        Object.assign(t, {
          title: s.title,
          studentId: s.studentId,
          applicationId: s.applicationId || null,
          assigneeId: s.assigneeId,
          dueDate: s.dueDate,
          category: s.category,
          blocked: s.blocked,
          blockedReason: s.blocked ? s.blockedReason : "",
          note: s.note,
          dependsOn: s.dependsOn || [],
          links: (s.links || []).map(t => {
            const [e, s] = t.split(":");
            return {
              type: e,
              id: s
            };
          })
        }), e && Object.assign(t, {
          id: i("t"),
          submissionId: null,
          roundId: null,
          effect: "",
          templateId: "",
          scopeKey: "",
          status: "todo",
          createdBy: ae().id
        }), st.put("tasks", t), s.status !== a || e ? setTimeout(() => Ss(t, s.status), 0) : Vs();
      }
    });
  }
  function Ss(t, e) {
    const s = t.status,
      i = a => {
        t.status = e, "done" === e && (t.doneAt = d()), a && (t.orderOverride = {
          at: d(),
          by: ae().id,
          deps: a.map(t => t.title),
          to: e
        }, Jt(t.studentId, t.applicationId, `“${t.title}”在前置任务未完成时被标记为${X(q, e)}（前置：${a.map(t => t.title).join("、")}）`, !1)), st.put("tasks", t), Vs(), "done" === e && "done" !== s && function (t) {
          if ("submission:submitted" === t.effect || "submission:received" === t.effect) {
            const e = bt.sub(t.submissionId) || bt.sub(bt.app(t.applicationId)?.parts?.[0]?.submissionId);
            if (!e) return;
            const s = t.effect.split(":")[1];
            ("submitted" === s && !xt(e) || "received" === s && "received" !== e.status) && Ae(`要同时把 ${It(e)} 标记为“${X(_, s)}”吗？`, {
              action: () => ms["sub-edit"]({
                dataset: {
                  id: e.id,
                  status: s
                }
              }),
              actionLabel: "去更新"
            });
          }
          if ("round:submitted" === t.effect) {
            const e = st.get("rounds", t.roundId);
            if (!e || "preparing" !== e.status) return;
            Ae(`要同时把 ${X(L, e.kind)} 标记为“已提交”吗？`, {
              action: () => {
                st.patch("rounds", e.id, {
                  status: "submitted"
                }), Jt(e.studentId, e.applicationId, `${ft(bt.app(e.applicationId))} ${X(L, e.kind)}已提交`, !0), Vs();
              },
              actionLabel: "标记已提交"
            });
          }
        }(t);
      },
      n = Wt(t);
    if (["doing", "review", "done"].includes(e) && n.length && e !== s) return Vs(), void Oe({
      title: "前置任务尚未完成",
      sub: t.title,
      submitLabel: "仍然继续",
      cancelLabel: "先不改",
      body: `<div class="small" style="line-height:1.8">按计划，以下任务应先完成：<br>${n.map(t => `· ${a(t.title)}（${a(X(q, t.status))}${t.dueDate ? "，截止 " + p(t.dueDate) : ""}）`).join("<br>")}</div><div class="tiny muted2">实际情况可以跳过顺序（例如老师已口头确认），系统会记录这次跳过。</div>`,
      onSubmit: () => {
        setTimeout(() => i(n), 0);
      }
    });
    i(null);
  }
  function js(t, e) {
    const s = !t.id,
      d = ce.students().filter(t => ce.manage(t.id) && "active" === t.status),
      n = t => st.where("submissions", e => e.studentId === t && bt.appsOfSub(e.id).length).sort((t, e) => kt(e) - kt(t)),
      o = s => `<div class="form-grid">\n    ${e ? Le("studentId", "学生", s, "select", {
        options: d.map(t => [t.id, t.name]),
        attrs: 'data-act="doc-student-change"'
      }) : Le("studentId", "", s, "hidden")}\n    ${Le("type", "文书类型", t.type, "select", {
        options: Object.keys(F).map(t => [t, F[t].label]),
        hint: '<span id="docTypeHint">' + a(F[t.type]?.hint || "") + "</span>"
      })}${Le("title", "标题", t.title, "text", {
        placeholder: "留空则使用类型名称"
      })}\n    <div class="form-section">用于（二选一）</div>\n    ${Le("submissionId", "随某个平台提交（如 UCAS 的 PS、Jacobs 补充申请里的文书）", t.submissionId || "", "select", {
        full: !0,
        options: [["", "不指定平台"]].concat(n(s).map(t => [t.id, `${It(t)}（${kt(t) ? "共用：" : ""}${wt(t)}）`]))
      })}\n    ${Le("applicationIds", "或：指定院校（如现场考试携带的 CV、某校的 Programme Note）", t.applicationIds || [], "checks", {
        full: !0,
        options: bt.activeAppsOf(s).map(t => [t.id, yt(t)])
      })}\n    <div class="form-section">分工与要求</div>\n    ${Le("writerId", "文书老师", t.writerId || "", "select", {
        options: Ee(["writer"]),
        required: !0
      })}${Le("dueDate", "内部截止", t.dueDate, "date")}\n    ${Le("wordLimit", "字数 / 篇幅", t.wordLimit, "text", {
        placeholder: "如 4000 字符 / 500 词"
      })}${Le("needStudentConfirm", "主管定稿后需要学生确认", t.needStudentConfirm, "check")}\n    ${Le("brief", "写作要求", t.brief, "textarea", {
        full: !0
      })}</div>`;
    Oe({
      title: s ? "新建文书" : "编辑文书立项",
      sub: s ? "通过 UCAS / Common App 申请的学校，Personal Statement 随平台只建一份；UCAS Conservatoires 与 UCAS Undergraduate 是两个系统，各需一份" : t.title,
      wide: !0,
      body: `<div id="docFormBody">${o(t.studentId)}</div>`,
      submitLabel: s ? "创建" : "保存",
      onSubmit: e => {
        const a = e.studentId;
        if (!e.submissionId && !(e.applicationIds || []).length) return Ae("请选择文书用于哪个平台或哪些院校", {
          error: !0
        }), !1;
        if (e.submissionId && (e.applicationIds || []).length) return Ae("“共用平台”与“指定院校”只能选一种", {
          error: !0
        }), !1;
        if ("ps" === e.type) {
          const s = (e.applicationIds || []).map(bt.app).map(t => ({
            a: t,
            p: St(t).find(t => kt(t.sub))
          })).filter(t => t.p);
          if (s.length) return Ae(`${s.map(t => ft(t.a)).join("、")} 通过 ${It(s[0].p.sub)} 申请，Personal Statement 随平台只提交一份。请在上方“随某个平台提交”中选择；如学校另有陈述要求，请选“院校补充文书”。`, {
            error: !0,
            ms: 9e3
          }), !1;
          const i = (d = a, n = e.submissionId, o = t.id, n && kt(bt.sub(n)) && st.where("documents", t => t.studentId === d && "ps" === t.type && t.submissionId === n && t.id !== o && !t.archived)[0] || null);
          if (i) return Ae(`该学生在 ${It(bt.sub(e.submissionId))} 下已经有一份 Personal Statement（“${i.title}”），平台只接受一份。`, {
            error: !0,
            ms: 9e3
          }), !1;
        }
        var d, n, o;
        Object.assign(t, {
          studentId: a,
          type: e.type,
          title: e.title || F[e.type].label,
          submissionId: e.submissionId || null,
          applicationIds: e.submissionId ? [] : e.applicationIds || [],
          writerId: e.writerId,
          dueDate: e.dueDate,
          wordLimit: e.wordLimit,
          needStudentConfirm: e.needStudentConfirm,
          brief: e.brief
        }), s && Object.assign(t, {
          id: i("doc"),
          status: "drafting",
          currentVersionId: null
        }), st.put("documents", t), s ? (Jt(a, null, `文书立项：${t.title}（${$t(t.writerId)}）`, !1), Rs("#/doc/" + t.id)) : Vs();
      }
    }), window.__docFormBody = o;
  }
  function As(t) {
    const e = !t.id;
    Oe({
      title: e ? "登记文件" : "编辑文件",
      sub: bt.student(t.studentId)?.name + " · 文件放在网盘，这里登记链接",
      body: `<div class="form-grid">\n    ${Le("title", "名称", t.title, "text", {
        required: !0
      })}${Le("kind", "类型", t.kind, "select", {
        options: Object.entries(H)
      })}\n    ${Le("applicationIds", "用于（不选 = 通用材料）", t.applicationIds || [], "checks", {
        full: !0,
        options: bt.activeAppsOf(t.studentId).map(t => [t.id, yt(t)])
      })}\n    ${Le("roundIds", "对应考试轮次", t.roundIds || [], "checks", {
        full: !0,
        options: st.where("rounds", e => e.studentId === t.studentId && L[e.kind]?.media).map(t => [t.id, ft(bt.app(t.applicationId)) + " · " + X(L, t.kind)])
      })}\n    ${e ? Le("link", "网盘链接（V1）", "", "url", {
        required: !0,
        full: !0,
        placeholder: "https://"
      }) + Le("fileName", "文件名", "") : ""}\n    ${Le("status", "状态", t.status, "select", {
        options: Te(G)
      })}${Le("note", "备注", t.note, "text", {
        full: !e
      })}</div>`,
      footExtra: e ? "" : `<button type="button" class="btn sm danger" data-act="mat-archive" data-id="${t.id}">归档</button>`,
      onSubmit: s => {
        Object.assign(t, {
          title: s.title,
          kind: s.kind,
          applicationIds: s.applicationIds || [],
          roundIds: s.roundIds || [],
          status: s.status,
          note: s.note
        }), e && (t.id = i("m"), t.versions = [{
          no: 1,
          link: s.link,
          fileName: s.fileName,
          note: "",
          by: ae().id,
          at: d()
        }], t.feedback = []), st.put("materials", t), e && Jt(t.studentId, t.applicationIds[0], `登记文件：${t.title}`, !1), Vs();
      }
    });
  }
  function qs(t) {
    const e = !t.id;
    Oe({
      title: e ? "添加曲目" : "编辑曲目",
      body: `<div class="form-grid">${Le("composer", "作曲家", t.composer, "text", {
        required: !0
      })}${Le("title", "作品", t.title, "text", {
        required: !0
      })}${Le("duration", "时长", t.duration, "text", {
        placeholder: "9:30"
      })}${Le("status", "状态", t.status, "select", {
        options: Te(J)
      })}\n    ${Le("applicationIds", "用于", t.applicationIds || [], "checks", {
        full: !0,
        options: bt.activeAppsOf(t.studentId).map(t => [t.id, yt(t)])
      })}${Le("round", "轮次说明", t.round, "text", {
        placeholder: "预审 / 现场"
      })}${Le("note", "备注", t.note)}</div>`,
      footExtra: e ? "" : `<button type="button" class="btn sm danger" data-act="rep-delete" data-id="${t.id}">删除</button>`,
      onSubmit: s => {
        Object.assign(t, s, {
          applicationIds: s.applicationIds || []
        }), e && (t.id = i("rp")), st.put("repertoire", t), Vs();
      }
    });
  }
  function Os(t) {
    const e = !t.id;
    Oe({
      title: e ? "添加推荐人" : "编辑推荐人",
      sub: "学生也可以在采集表中填写推荐人信息",
      wide: !0,
      body: `<div class="form-grid">${Le("name", "姓名", t.name, "text", {
        required: !0
      })}${Le("title", "职称及职务", t.title)}${Le("phone", "电话 / 微信", t.phone)}${Le("email", "电子邮箱", t.email, "email")}${Le("course", "教授的课程 / 科目", t.course)}${Le("duration", "授课时间长度", t.duration)}${Le("relation", "与学生的关系说明", t.relation, "text", {
        full: !0
      })}${Le("address", "通信地址", t.address, "text", {
        full: !0
      })}${Le("bio", "背景简介", t.bio, "textarea", {
        full: !0
      })}\n    ${e ? Le("target", "同时建立推荐信请求", "", "select", {
        full: !0,
        options: [["", "暂不建立"]].concat($s(t.studentId))
      }) : ""}${Le("note", "内部备注", t.note, "text", {
        full: !0
      })}</div>`,
      onSubmit: s => {
        Object.assign(t, {
          name: s.name,
          title: s.title,
          phone: s.phone,
          email: s.email,
          course: s.course,
          duration: s.duration,
          relation: s.relation,
          address: s.address,
          bio: s.bio,
          note: s.note
        }), e && (t.id = i("rc"), t.fromIntake = !1), st.put("recommenders", t), e && s.target && st.put("refRequests", {
          id: i("rq"),
          recommenderId: t.id,
          studentId: t.studentId,
          target: s.target,
          status: "not_invited",
          invitedAt: "",
          dueAt: ""
        }), Vs();
      }
    });
  }
  function Cs(e) {
    const s = !e.id,
      a = st.where("students", t => !st.where("users", s => s.studentId === t.id && s.id !== e.id).length);
    Oe({
      title: s ? "新建账号" : "编辑账号",
      body: `<div class="form-grid">${Le("name", "姓名", e.name, "text", {
        required: !0
      })}${Le("username", "登录名", e.username, "text", {
        required: !0
      })}\n    ${Le("role", "角色", e.role, "select", {
        options: Object.keys(A).map(t => [t, A[t].label])
      })}${Le("studentId", "关联学生（仅学生账号）", e.studentId || "", "select", {
        options: [["", "—"]].concat(a.map(t => [t.id, t.name]))
      })}\n    <div class="field full"><div class="hint">申请主管：全部权限；申请顾问：管理自己负责的学生；文书老师：撰写被分配的文书，查看相关学生资料；学生：只看自己的进度并确认文书。</div></div></div>`,
      onSubmit: a => {
        if (st.where("users", t => t.username === a.username && t.id !== e.id).length) return Ae("登录名已被使用", {
          error: !0
        }), !1;
        if ("student" === a.role && !a.studentId) return Ae("学生账号需要关联学生档案", {
          error: !0
        }), !1;
        if (e.id === ae().id && "supervisor" !== a.role) return Ae("不能修改自己的主管角色", {
          error: !0
        }), !1;
        const d = {
          name: a.name,
          username: a.username,
          role: a.role,
          studentId: "student" === a.role ? a.studentId : null
        };
        t ? (s ? ge.call("POST", "/users", d) : ge.call("PUT", "/users/" + e.id, d)).then(t => {
          s ? (st.data.users.push(t.user), setTimeout(() => Se([{
            name: t.user.name,
            username: t.user.username,
            password: t.password
          }]), 50)) : Object.assign(e, t.user), Vs();
        }).catch(t => Ae(t.message, {
          error: !0
        })) : (Object.assign(e, d), s && (e.id = i("u"), e.active = !0), st.put("users", e), Vs());
      }
    });
  }
  function Ds(t) {
    const e = !t.id;
    Oe({
      title: e ? "新增任务模板" : "编辑任务模板",
      wide: !0,
      body: `<div class="form-grid">${Le("title", "任务名称", t.title, "text", {
        required: !0,
        full: !0
      })}\n    ${Le("category", "类别", t.category, "select", {
        options: Object.entries(O)
      })}${Le("cond", "适用于", t.cond, "select", {
        options: Object.entries(Z)
      })}\n    ${Le("scope", "生成范围", t.scope, "select", {
        options: Object.entries(K),
        hint: "学生级：如收集证件；平台级：如 UCAS 提交、推荐信；院校级：如各校录像"
      })}${Le("offset", "相对官方截止的天数", t.offset, "number", {
        hint: "负数 = 截止前；正数 = 截止后。录像类按录像截止计算，考试类按考试日期计算"
      })}\n    ${Le("effect", "完成联动", t.effect || "", "select", {
        options: Object.entries(W)
      })}${Le("active", "启用", !1 !== t.active, "check")}\n    ${Le("after", "前置模板（软顺序）", t.after || [], "checks", {
        full: !0,
        options: st.where("templates", e => e.id !== t.id).map(t => [t.id, t.title])
      })}</div>`,
      footExtra: e ? "" : `<button type="button" class="btn sm danger" data-act="tpl-delete" data-id="${t.id}">删除</button>`,
      onSubmit: s => {
        Object.assign(t, s, {
          offset: Number(s.offset) || 0,
          after: s.after || []
        }), e && (t.id = i("tpl")), st.put("templates", t), Vs();
      }
    });
  }
  function _s(t, e) {
    const s = document.createElement("a");
    s.href = URL.createObjectURL(new Blob([e], {
      type: "application/json"
    })), s.download = t, document.body.appendChild(s), s.click(), setTimeout(() => {
      URL.revokeObjectURL(s.href), s.remove();
    }, 500);
  }
  function Ls(t, e) {
    const s = document.createElement("input");
    s.type = "file", s.accept = t, s.onchange = () => {
      const t = s.files[0];
      if (!t) return;
      const a = new FileReader();
      a.onload = () => {
        try {
          e(a.result);
        } catch (t) {
          Ae("读取失败：" + t.message, {
            error: !0
          });
        }
      }, a.readAsText(t);
    }, s.click();
  }
  function Es(t, {
    submit: e = !1,
    quiet: s = !1
  } = {}) {
    const a = document.getElementById("intakeForm");
    if (!a || a.dataset.sid !== t) return !1;
    const i = bt.student(t);
    if (!rs(ce.editIntake(t))) return !1;
    const n = be(i),
      {
        p: o,
        tables: l,
        recs: r,
        checks: c
      } = function (t) {
        const e = {},
          s = {},
          a = {},
          i = {};
        for (const d of t.elements) {
          if (!d.name) continue;
          if ("radio" === d.type && !d.checked) continue;
          const t = "checkbox" === d.type ? d.checked : d.value.trim(),
            n = d.name.split(".");
          if ("p" === n[0]) e[n[1]] = t;else if ("t" === n[0]) {
            const [, e, a, i] = n;
            ((s[e] ||= [])[a] ||= {})[i] = t;
          } else if ("r" === n[0]) {
            const [, e, s] = n;
            (a[e] ||= {})[s] = t;
          } else if ("c" === n[0]) {
            const [, e, s] = n;
            (i[e] ||= {})[s] = t;
          }
        }
        for (const t in s) s[t] = s[t].filter(Boolean);
        return {
          p: e,
          tables: s,
          recs: Object.values(a),
          checks: i
        };
      }(a);
    i.profile = Object.assign(i.profile || {}, o, l, {
      files: c
    });
    for (const t of r) {
      const e = st.get("recommenders", t.id);
      e && st.put("recommenders", Object.assign(e, t, {
        fromIntake: !0
      }));
    }
    const u = be(i),
      p = Object.keys(u).filter(t => u[t] !== n[t]),
      v = i.intake ||= {
        status: "not_started",
        changes: []
      },
      h = d(),
      b = le();
    if (e) {
      const t = $e(i);
      if (t.length) return st.put("students", i), Ae("还需要填写：" + t.slice(0, 6).join("、") + (t.length > 6 ? " 等" : ""), {
        error: !0,
        ms: 8e3
      }), !1;
    }
    if (p.length) {
      if (b && ["submitted", "verified", "updated"].includes(v.status)) {
        "submitted" !== v.status && (v.status = "updated");
        const t = (v.changes ||= [])[v.changes.length - 1];
        t && t.by === ae().id && Date.now() - new Date(t.at) < 18e5 ? (t.fields = f(t.fields.concat(p)), t.at = h) : v.changes.push({
          at: h,
          by: ae().id,
          fields: p
        });
      }
      b && "not_started" === v.status && (v.status = "draft");
    }
    e && ["not_started", "draft"].includes(v.status) ? (v.status = "submitted", v.submittedAt = h, Jt(t, null, "学生提交了基础信息采集表", !0)) : e && "updated" === v.status && Jt(t, null, "学生更新了基础信息采集表：" + p.slice(0, 4).join("、"), !1), !b && p.length && Jt(t, null, `${ae().name} 修改了采集表：${p.slice(0, 4).join("、")}${p.length > 4 ? " 等" : ""}`, !1), v.savedAt = h, st.put("students", i);
    const $ = document.getElementById("intakeSaved");
    return $ && ($.textContent = "已保存 " + m(h)), s || Ae(e ? "已提交给顾问，之后仍可修改" : "已保存"), !0;
  }
  function Ts(t) {
    const e = t.profile || {};
    return `<div class="stack tight">${ve.filter(t => t.essay).flatMap(t => t.fields).map(t => `<div class="card"><b class="small" style="color:var(--accent)">${a(t.label)}</b><div class="small mt8" style="white-space:pre-wrap;line-height:1.75">${e[t.key] ? a(e[t.key]) : '<span class="muted2">未填写</span>'}</div></div>`).join("")}</div>`;
  }
  function Ms(t, e) {
    const s = (e || []).filter(e => t.some(t => String(e[t.key] || "").trim()));
    return s.length ? `<div class="table-wrap" style="border:1px solid var(--line);border-radius:10px"><table><thead><tr>${t.map(t => `<th>${a(t.label)}</th>`).join("")}</tr></thead><tbody>${s.map(e => `<tr>${t.map(t => `<td class="small">${a(e[t.key] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : '<div class="small muted2">未填写</div>';
  }
  ms["round-delete"] = t => {
    const e = st.get("rounds", t.dataset.id);
    rs(e && ce.manage(e.studentId)) && De("删除这个轮次？", () => {
      st.remove("rounds", e.id), Vs();
    }, {
      danger: !0,
      yes: "删除"
    });
  }, ce.editIntake = t => le() && ae().studentId === t || ce.manage(t);
  let Ns = null;
  function Bs(t) {
    const e = window.scrollY;
    t(), window.scrollTo(0, e);
  }
  function Ps() {
    const t = (location.hash || "#/home").replace(/^#\/?/, "").split("/").filter(Boolean);
    return {
      name: t[0] || "home",
      a: t[1] || "",
      b: t[2] || ""
    };
  }
  function Rs(t) {
    location.hash === t ? Vs() : location.hash = t;
  }
  function Fs() {
    const t = ae();
    if (!t) return [];
    const e = new Set(ce.students().map(t => t.id)),
      s = st.where("tasks", e => e.assigneeId === t.id && Kt(e)),
      a = Bt(s).length,
      i = s.filter(t => t.dueDate && u(t.dueDate) <= 7).length,
      d = st.where("documents", s => !s.archived && (e.has(s.studentId) || s.writerId === t.id) && ue(s)).length,
      n = i ? {
        n: i,
        hot: a > 0
      } : null,
      o = d ? {
        n: d,
        hot: !0
      } : null;
    if ("student" === t.role) {
      const e = bt.student(t.studentId)?.intake?.status || "not_started";
      return [["home", "home", "我的申请"], ["intake", "user", "基础信息", ["not_started", "draft"].includes(e) ? {
        n: "!",
        hot: !0
      } : null]];
    }
    if ("writer" === t.role) return [["home", "home", "工作台"], ["docs", "file", "我的文书", o], ["tasks", "checksq", "我的任务", n], ["students", "users", "相关学生"]];
    const l = [["home", "home", "工作台"], ["students", "users", "supervisor" === t.role ? "学生" : "我的学生", {
      n: ce.students().filter(t => "active" === t.status).length
    }], ["tasks", "checksq", "supervisor" === t.role ? "任务" : "我的任务", n], ["docs", "file", "文书协作", o], ["files", "folder", "文件库"]];
    return "supervisor" === t.role && l.push(["settings", "settings", "系统设置"]), l;
  }
  function Vs() {
    const s = document.getElementById("app");
    if (!se.user) return s.innerHTML = t ? "" : Us(), void (t && (location.href = "/login"));
    if (t && ae().mustChange) return void (s.innerHTML = (!0, `<div class="login"><div class="login-card"><div class="brand"><img src="${e}" alt="Fantasme"><div><div class="brand-title">枫琴申请工作站</div><div class="brand-en">Admissions Workspace</div></div></div>\n    <h3 style="margin:4px 0 4px;color:var(--accent)">首次登录，请设置新密码</h3><p class="small muted" style="margin-top:0">${a(ae()?.name || "")}，新密码至少 8 位，需同时包含字母和数字。</p>\n    <form id="pwForm" class="stack tight">${Le("old", "初始密码", "", "password", {
      required: !0
    })}${Le("new", "新密码", "", "password", {
      required: !0
    })}${Le("new2", "再次输入新密码", "", "password", {
      required: !0
    })}\n    <button class="btn primary" type="submit" style="padding:10px">保存新密码</button></form>\n    <div class="row mt12" style="justify-content:center"><button class="linkbtn small" data-act="logout">退出登录</button></div></div></div>`));
    const i = Ps();
    let d = "";
    try {
      switch (i.name) {
        case "home":
          d = le() ? ls() : oe() ? function () {
            const t = ae(),
              e = st.where("documents", e => e.writerId === t.id && !e.archived),
              s = e.filter(t => ["drafting", "revising"].includes(t.status)).sort((t, e) => ("revising" === e.status) - ("revising" === t.status) || $(t.dueDate, e.dueDate)),
              i = e.filter(t => ["advisor_review", "supervisor_review", "student_review"].includes(t.status)),
              d = e.filter(t => "final" === t.status),
              n = e.filter(t => "final" !== t.status && t.dueDate && u(t.dueDate) <= 7),
              o = Re(st.where("tasks", e => e.assigneeId === t.id && Kt(e)));
            return `<div class="page-head"><div><h2>${Ye()}，${a(t.name)}<em>Writer</em></h2><p>${p(l())} · 需要你撰写或修改的文书排在最前面。</p></div></div>\n    <div class="grid stats">\n      ${Je("待我撰写 / 修改", s.length, s.filter(t => "revising" === t.status).length + " 份被退回修改", {
              cls: s.length ? "warn" : ""
            })}\n      ${Je("审核中", i.length, "等待顾问 / 主管 / 学生")}\n      ${Je("已定稿", d.length, "本季累计")}\n      ${Je("7 天内截止", n.length, "未定稿的文书", {
              cls: n.length ? "err" : ""
            })}\n    </div>\n    <div class="grid cols-main"><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("edit")} 待我撰写 / 修改</h3><p>退回的文书显示最近一次修改意见</p></div></div><div class="panel-body stack tight">${s.map(t => Fe(t)).join("") || Me("没有待写的文书")}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("checksq")} 我的任务</h3></div></div>${Pe(o, {
              compact: !0,
              emptyTitle: "没有分配给你的任务"
            })}</section>\n    </div><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("clock")} 审核中</h3><p>等待他人处理</p></div></div><div class="panel-body stack tight">${i.map(t => Fe(t)).join("") || Me("暂无")}</div></section>\n    </div></div>`;
          }() : function () {
            const t = ae(),
              e = de(),
              s = ce.students().filter(t => "active" === t.status),
              i = new Set(s.map(t => t.id)),
              d = st.where("applications", t => i.has(t.studentId) && !t.withdrawn),
              n = d.filter(t => !Dt(t).closed),
              o = Rt(d.flatMap(Nt)),
              r = st.where("tasks", t => i.has(t.studentId) && Kt(t)),
              c = e ? r : r.filter(e => e.assigneeId === t.id),
              b = Bt(e ? r : c),
              f = Re(c.filter(t => t.dueDate && u(t.dueDate) <= 7)),
              g = st.where("documents", t => i.has(t.studentId) && !t.archived && ue(t)),
              y = st.where("documents", t => i.has(t.studentId) && "revising" === t.status && "student" === Gt(t)?.stage),
              k = o.filter(t => "err" === t.level).length,
              w = o.filter(t => "warn" === t.level).length,
              x = d.flatMap(t => Et(t).filter(t => "exam" === t.kind || "round" === t.kind || "deadline" === t.kind).map(e => Object.assign({
                app: t
              }, e))).filter(t => {
                const e = u(t.date);
                return e >= 0 && e <= 30;
              }).sort((t, e) => $(t.date, e.date)),
              S = `<section class="panel"><div class="panel-head"><div><h3>${I("alert")} 风险预警</h3><p>由截止日期、提交状态、考试轮次与语言成绩自动计算</p></div><span class="row">${k ? `<span class="pill err">${k} 紧急</span>` : ""}${w ? `<span class="pill warn">${w} 注意</span>` : ""}</span></div>\n    <div class="list">${o.slice(0, 12).map(t => function (t, {
                showStudent: e = !0
              } = {}) {
                const s = bt.student(t.studentId),
                  i = bt.app(t.applicationId),
                  d = "err" === t.level ? "alert" : "warn" === t.level ? "clock" : "flag",
                  n = [e ? s?.name : "", i ? ft(i) : ""].filter(Boolean).join(" · ");
                return `<div class="item click" data-act="go" data-href="${i ? "#/app/" + i.id : "#/student/" + t.studentId}"><div class="mark ${"info" === t.level ? "" : t.level}">${I(d)}</div><div class="main"><div class="title">${a(t.text)}</div><div class="meta">${a(n)}${t.date ? " · " + p(t.date) : ""}</div></div></div>`;
              }(t)).join("") || Me("暂无风险", "所有申请都在正常推进。")}</div>${o.length > 12 ? `<div class="panel-foot">另有 ${o.length - 12} 条，进入学生页面查看</div>` : ""}</section>`,
              j = `<section class="panel"><div class="panel-head"><div><h3>${I("checksq")} ${e ? "团队逾期任务" : "我的待办（7 天内与逾期）"}</h3><p>${e ? "逾期未完成的任务" : "按截止日期排序；可直接修改状态"}</p></div><button class="btn sm" data-act="go" data-href="#/tasks">全部任务 ${I("arrow")}</button></div>\n    ${Pe(e ? Re(b) : f, {
                compact: !e,
                emptyTitle: e ? "没有逾期任务" : "近 7 天没有到期任务"
              })}</section>`,
              q = `<section class="panel"><div class="panel-head"><div><h3>${I("file")} ${e ? "待我定稿" : "待我审核的文书"}</h3><p>${e ? "顾问已审核通过，等待主管定稿" : "文书老师已送审的版本"}</p></div><span class="count ${g.length ? "hot" : ""}">${g.length}</span></div>\n    <div class="panel-body stack tight">${g.map(t => Fe(t)).join("") || Me("没有待处理的文书")}</div>\n    ${y.length ? `<div class="panel-foot">学生提出修改：${y.map(t => `<button class="linkbtn" data-act="go" data-href="#/doc/${t.id}">${a(bt.student(t.studentId)?.name)} · ${a(t.title)}</button>`).join("、")}</div>` : ""}</section>`,
              O = s.filter(t => ["submitted", "updated"].includes(t.intake?.status) && ce.manage(t.id)),
              C = s.filter(t => ["not_started", "draft"].includes(t.intake?.status || "not_started")),
              D = O.length || C.length ? `<section class="panel"><div class="panel-head"><div><h3>${I("user")} 学生采集表</h3><p>学生在线填写的基础信息与文书素材</p></div>${O.length ? `<span class="count hot">${O.length}</span>` : ""}</div>\n    <div class="list">${O.map(t => {
                const e = (t.intake.changes || []).slice(-1)[0];
                return `<div class="item click" data-act="go" data-href="#/student/${t.id}/profile"><div class="mark warn">${I("user")}</div><div class="main"><div class="title">${a(t.name)} · ${a(X(pe, t.intake.status))}</div><div class="meta">${"updated" === t.intake.status && e ? "修改了：" + a(e.fields.slice(0, 3).join("、")) + (e.fields.length > 3 ? " 等" : "") : "提交于 " + m(t.intake.submittedAt)}</div></div></div>`;
              }).join("")}\n    ${C.map(t => `<div class="item click" data-act="go" data-href="#/student/${t.id}/profile"><div class="mark">${I("clock")}</div><div class="main"><div class="title">${a(t.name)} · ${a(X(pe, t.intake?.status || "not_started"))}</div><div class="meta">学生尚未提交</div></div></div>`).join("")}</div></section>` : "",
              _ = `<section class="panel"><div class="panel-head"><div><h3>${I("calendar")} 未来 30 天关键日期</h3><p>官方截止、录像截止与考试安排（不含内部目标）</p></div></div>\n    <div class="list">${x.slice(0, 10).map(t => `<div class="item click" data-act="go" data-href="#/app/${t.app.id}"><div class="mark ${u(t.date) <= 7 ? "warn" : ""}">${I("exam" === t.kind ? "music" : "clock")}</div><div class="main"><div class="title">${a(bt.student(t.app.studentId)?.name)} · ${a(ft(t.app))}</div><div class="meta">${a(t.label)}</div></div><div class="side"><b class="small ${h(t.date)}">${p(t.date)}</b><span class="tiny muted2">${v(t.date)}</span></div></div>`).join("") || Me("30 天内没有关键日期")}</div></section>`;
            let L = "";
            if (e) {
              const t = st.where("users", t => ["advisor", "writer"].includes(t.role) && t.active);
              L = `<section class="panel"><div class="panel-head"><div><h3>${I("users")} 团队负载</h3><p>在申学生、未完成任务与进行中的文书</p></div><button class="btn sm" data-act="go" data-href="#/settings/users">分配</button></div><div class="table-wrap"><table><thead><tr><th>成员</th><th>学生</th><th>未完成任务</th><th>逾期</th><th>文书进行中</th></tr></thead><tbody>${t.map(t => {
                const e = "advisor" === t.role ? st.where("students", e => e.advisorId === t.id && "active" === e.status) : st.where("students", e => (e.writerIds || []).includes(t.id) && "active" === e.status),
                  s = st.where("tasks", e => e.assigneeId === t.id && Kt(e)),
                  i = st.where("documents", e => e.writerId === t.id && "final" !== e.status && !e.archived);
                return `<tr><td><div class="td-main">${a(t.name)}</div><div class="td-sub">${A[t.role].label}</div></td><td>${e.length}</td><td>${s.length}</td><td>${Bt(s).length ? `<span class="pill err">${Bt(s).length}</span>` : "0"}</td><td>${"writer" === t.role ? i.length : "—"}</td></tr>`;
              }).join("")}</tbody></table></div></section>`;
            }
            return `<div class="page-head"><div><h2>${Ye()}，${a(t.name)}<em>${e ? "Supervisor" : "Advisor"}</em></h2><p>${p(l())} · ${e ? "全部学生" : "你负责的 " + s.length + " 位学生"}的风险、待办与需要你审核的文书。</p></div>\n    <div class="page-actions">${e || ne() ? `<button class="btn" data-act="task-new">${I("plus")} 新建任务</button><button class="btn primary" data-act="student-new">${I("plus")} 新建学生</button>` : ""}</div></div>\n    <div class="grid stats">\n      ${Je(e ? "在申学生" : "我的学生", s.length, `${n.length} 个申请进行中`, {
              href: "#/students"
            })}\n      ${Je("风险预警", k + w, k ? `其中 ${k} 条紧急` : "没有紧急事项", {
              cls: k ? "err" : w ? "warn" : ""
            })}\n      ${Je(e ? "团队逾期任务" : "我的逾期任务", b.length, e ? "所有成员" : `共 ${c.length} 项未完成`, {
              cls: b.length ? "err" : "",
              href: "#/tasks"
            })}\n      ${Je(e ? "待我定稿" : "待我审核文书", g.length, y.length ? `另有 ${y.length} 份学生提出修改` : "文书协作", {
              cls: g.length ? "warn" : "",
              href: "#/docs"
            })}\n    </div>\n    <div class="grid cols-main"><div class="stack">${S}${j}</div><div class="stack">${q}${D}${_}${L}</div></div>`;
          }();
          break;
        case "students":
          d = le() ? ls() : function () {
            const t = Ke.q.toLowerCase();
            let e = ce.students().filter(t => "all" === Ke.status || t.status === Ke.status);
            Ke.advisor && (e = e.filter(t => t.advisorId === Ke.advisor)), t && (e = e.filter(e => [e.name, e.englishName, e.currentSchool, ot(e.majorId), ...bt.appsOf(e.id).map(ft)].join(" ").toLowerCase().includes(t)));
            const s = e.map(t => {
              const e = bt.activeAppsOf(t.id),
                s = e.flatMap(Nt),
                i = s.filter(t => "err" === t.level).length,
                d = s.filter(t => "warn" === t.level).length,
                n = e.map(t => Tt(t)).filter(t => t && u(t.date) >= 0).sort((t, e) => $(t.date, e.date))[0];
              return `<tr class="click" data-act="go" data-href="#/student/${t.id}">\n      <td><div class="td-main">${a(t.name)} <span class="muted2" style="font-weight:500">${a(t.englishName || "")}</span></div><div class="td-sub">${a(t.currentSchool || "")}</div></td>\n      <td><div>${a(t.season)} · ${"PG" === t.level ? "研究生" : "本科"}</div><div class="td-sub">${a(ot(t.majorId))}</div></td>\n      <td><div>${a($t(t.advisorId))}</div><div class="td-sub">文书：${a((t.writerIds || []).map($t).join("、") || "未分配")}</div></td>\n      <td><div class="stack tight" style="gap:4px">${e.map(t => `<div class="row" style="gap:8px"><span class="tag" style="min-width:64px">${a(ft(t))}</span>${Lt(t)}<span class="tiny muted">${a(Dt(t).label)}</span></div>`).join("") || '<span class="muted2 small">尚未添加院校</span>'}</div></td>\n      <td>${i ? `<span class="pill err">${i} 紧急</span> ` : ""}${d ? `<span class="pill warn">${d} 注意</span>` : ""}${i || d ? "" : '<span class="muted2 small">—</span>'}</td>\n      <td>${n ? `<div class="${h(n.date)}">${p(n.date)}</div><div class="td-sub">${a(n.label)}</div>` : '<span class="muted2">—</span>'}</td>\n    </tr>`;
            }).join("");
            return `<div class="page-head"><div><h2>${de() ? "全部学生" : oe() ? "相关学生" : "我的学生"}<em>Students</em></h2><p>每行显示该学生各院校的申请主线；点击进入学生工作区。</p></div>\n    <div class="page-actions">${de() || ne() ? `<button class="btn primary" data-act="student-new">${I("plus")} 新建学生</button>` : ""}</div></div>\n    <section class="panel"><div class="filters">\n      <input class="input" placeholder="搜索姓名、学校、院校…" value="${a(Ke.q)}" data-act="filter" data-key="q" data-scope="list">\n      <select class="select" data-act="filter" data-key="status" data-scope="list">${[["active", "在申学生"], ["archived", "已归档"], ["all", "全部"]].map(([t, e]) => `<option value="${t}" ${Ke.status === t ? "selected" : ""}>${e}</option>`).join("")}</select>\n      ${de() ? `<select class="select" data-act="filter" data-key="advisor" data-scope="list"><option value="">全部顾问</option>${st.where("users", t => "advisor" === t.role).map(t => `<option value="${t.id}" ${Ke.advisor === t.id ? "selected" : ""}>${a(t.name)}</option>`).join("")}</select>` : ""}\n      <span class="spacer"></span><span class="small muted2">共 ${e.length} 名</span></div>\n      ${e.length ? `<div class="table-wrap"><table><thead><tr><th>学生</th><th>申请季 / 专业</th><th>顾问 / 文书</th><th>各校申请主线</th><th>风险</th><th>下一个关键日期</th></tr></thead><tbody>${s}</tbody></table></div>` : Me("没有符合条件的学生")}\n    </section>`;
          }();
          break;
        case "student":
          d = le() ? ls() : function (t, e = "apps") {
            const s = bt.student(t);
            if (!s || !ce.seeStudent(t)) return Qe("找不到这位学生，或你没有查看权限。");
            const i = ce.manage(t),
              d = bt.appsOf(t).filter(t => !t.withdrawn),
              n = bt.docsOf(t),
              o = bt.tasksOf(t).filter(Kt),
              l = n.filter(ue).length,
              r = [["apps", "院校申请", d.length], ["docs", "文书", l ? {
                n: l,
                hot: !0
              } : n.length], ["files", "文件与曲目", bt.matsOf(t).length], ["tasks", "任务", Bt(o).length ? {
                n: o.length,
                hot: !0
              } : o.length], ["refs", "推荐人", bt.recsOf(t).length], ["profile", "学生档案", ["submitted", "updated"].includes(s.intake?.status) && ce.manage(t) ? {
                n: "!",
                hot: !0
              } : null], ["activity", "动态"]];
            r.some(t => t[0] === e) || (e = "apps");
            let c = "";
            return c = "apps" === e ? function (t, e) {
              const s = bt.appsOf(t.id),
                i = s.filter(t => !t.withdrawn),
                d = s.filter(t => t.withdrawn),
                n = Rt(i.flatMap(Nt)),
                o = bt.subsOf(t.id).filter(t => bt.appsOfSub(t.id).length),
                l = i.map(t => {
                  const e = Dt(t),
                    s = Tt(t),
                    i = St(t);
                  return `<tr class="click" data-act="go" data-href="#/app/${t.id}">\n      <td><div class="td-main">${a(ft(t))} · ${a(t.program || "")}</div><div class="td-sub">${a(gt(t))} · ${a(ot(t.majorId))}</div></td>\n      <td><div class="stack tight" style="gap:4px">${Lt(t)}<span class="stage-label ${e.bad ? "date-red" : ""}">${a(e.label)}</span></div></td>\n      <td>${i.map(t => `<div class="row" style="gap:6px;flex-wrap:nowrap"><span class="small">${a(It(t.sub))}</span>${At(t)}</div>`).join("") || '<span class="pill err">未设置提交项</span>'}</td>\n      <td>${s ? `<div class="${h(s.date)}">${p(s.date)}</div><div class="td-sub">${a(s.label)}</div>` : '<span class="muted2">—</span>'}</td>\n      <td>${Q(B, t.outcome?.type || "pending")}</td>\n    </tr>`;
                }).join(""),
                r = o.map(t => {
                  const s = st.where("documents", e => e.submissionId === t.id && !e.archived),
                    i = st.where("refRequests", e => e.target === "sub:" + t.id),
                    d = Ct(t.id);
                  return `<div class="card"><div class="row between"><div><div class="card-title">${a(It(t))}</div><div class="card-meta">${kt(t) ? "共用：" : ""}${a(wt(t))}${d && !xt(t) ? ` · 最早截止 <span class="${h(d, 14)}">${p(d)}</span>` : ""}</div></div>${Q(_, t.status)}</div>\n      <div class="card-meta mt8">${t.submittedAt ? "提交 " + p(t.submittedAt) : "尚未提交"}${t.receivedAt ? " · 学校确认 " + p(t.receivedAt) : ""}${t.ref ? " · 编号 " + a(t.ref) : ""}${t.note ? " · " + a(t.note) : ""}</div>\n      ${s.length || i.length ? `<div class="card-meta">${s.map(t => `文书：<button class="linkbtn" data-act="go" data-href="#/doc/${t.id}">${a(t.title)}</button> ${Ht(t)}`).join(" ")}${i.length ? ` · 推荐信 ${i.filter(t => "submitted" === t.status).length}/${i.length} 已提交` : ""}</div>` : ""}\n      ${e ? `<div class="row mt8"><button class="btn sm" data-act="sub-edit" data-id="${t.id}">更新提交状态</button></div>` : ""}</div>`;
                }).join("");
              return `<div class="panel-body stack">\n    ${n.length ? `<div class="stack tight">${n.map(t => `<div class="notice ${"err" === t.level ? "err" : "info" === t.level ? "info" : ""}" style="cursor:pointer" data-act="go" data-href="#/app/${t.applicationId}">${I("err" === t.level ? "alert" : "clock")}<div><strong>${a(ft(bt.app(t.applicationId)))}：${a(t.text)}</strong></div></div>`).join("")}</div>` : ""}\n    ${i.length ? `<div class="table-wrap" style="border:1px solid var(--line);border-radius:12px"><table><thead><tr><th>院校 / 项目</th><th>申请主线</th><th>提交项</th><th>下一个关键日期</th><th>录取结果</th></tr></thead><tbody>${l}</tbody></table></div>` : Me("还没有院校申请", e ? "点击右上角“添加院校”。系统会按院校库自动带出申请平台、截止日期和考试轮次，之后都可以修改。" : "")}\n    ${r ? `<div><div class="row between" style="margin-bottom:8px"><b class="small" style="color:var(--accent)">申请平台与提交</b><span class="tiny muted2">共用平台（UCAS / Common App）只有一条记录，状态同步到所有覆盖的院校；录像在各校平台分别提交</span></div><div class="grid cols-2">${r}</div></div>` : ""}\n    ${d.length ? `<div class="small muted">已撤回：${d.map(t => `<button class="linkbtn" data-act="go" data-href="#/app/${t.id}">${a(yt(t))}</button>`).join("、")}</div>` : ""}\n  </div>`;
            }(s, i) : "docs" === e ? function (t, e) {
              return `<div class="panel-head"><div><h3>文书</h3><p>流程：撰写 → 顾问审核 → 主管定稿 → 学生确认。共用平台（UCAS 等）的 Personal Statement 只建一份。</p></div>${e ? `<button class="btn primary sm" data-act="doc-new" data-sid="${t.id}">${I("plus")} 新建文书</button>` : ""}</div>${Ze(bt.docsOf(t.id))}`;
            }(s, i) : "files" === e ? function (t, e) {
              const s = bt.docsOf(t.id).filter(t => t.currentVersionId);
              return `<div class="panel-head"><div><h3>文件</h3><p>文件放在网盘，这里登记链接、版本和审核意见（专业老师意见由顾问登记）。</p></div>${e ? `<button class="btn primary sm" data-act="mat-new" data-sid="${t.id}">${I("plus")} 登记文件</button>` : ""}</div>\n    ${We(bt.matsOf(t.id), {
                manage: () => e
              })}\n    ${s.length ? `<div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>文书文件</h3><p>文书的版本在“文书”中管理，这里只列出当前版本方便查找</p></div></div><div class="list">${s.map(t => {
                const e = st.get("versions", t.currentVersionId);
                return `<div class="item"><div class="mark">${I("file")}</div><div class="main"><div class="title"><button class="linkbtn" data-act="go" data-href="#/doc/${t.id}">${a(t.title)}</button></div><div class="meta">V${e.no} · ${a(ze(e))} · ${p(e.createdAt)}</div></div><div class="side">${Ht(t)}${He(e, "btn sm")}</div></div>`;
              }).join("")}</div>` : ""}\n    <div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>曲目</h3><p>一首曲目可用于多所院校、多个轮次</p></div>${e ? `<button class="btn sm" data-act="rep-new" data-sid="${t.id}">${I("plus")} 添加曲目</button>` : ""}</div>\n    ${Xe(bt.repOf(t.id), e)}`;
            }(s, i) : "tasks" === e ? function (t, e) {
              const s = Re(bt.tasksOf(t.id)),
                a = s.filter(Kt),
                i = s.filter(t => !Kt(t));
              return `<div class="panel-head"><div><h3>任务</h3><p>任务只表达“谁、何时、做什么”；申请是否提交以提交记录为准，完成关联任务时系统会询问是否同步。</p></div>${e ? `<button class="btn primary sm" data-act="task-new" data-sid="${t.id}">${I("plus")} 新建任务</button>` : ""}</div>\n    ${Pe(a, {
                showStudent: !1,
                emptyTitle: "没有未完成任务"
              })}\n    ${i.length ? `<details><summary class="panel-foot" style="cursor:pointer">已完成 / 不适用（${i.length}）</summary>${Pe(i, {
                showStudent: !1
              })}</details>` : ""}`;
            }(s, i) : "refs" === e ? function (t, e) {
              const s = bt.recsOf(t.id);
              return `<div class="panel-head"><div><h3>推荐人与推荐信</h3><p>推荐人资料可由学生在采集表中填写；每个申请平台 / 院校的推荐信请求单独跟进。</p></div>${e ? `<button class="btn primary sm" data-act="rec-new" data-sid="${t.id}">${I("plus")} 添加推荐人</button>` : ""}</div>\n  ${s.length ? `<div class="list">${s.map(t => {
                const s = st.where("refRequests", e => e.recommenderId === t.id);
                return `<div class="item"><div class="mark">${I("user")}</div><div class="main"><div class="title">${a(t.name)} <span class="muted2" style="font-weight:500">· ${a(t.title || "")}</span></div><div class="meta">${a([t.relation, t.course ? "教授 " + t.course : "", t.duration, t.phone, t.email].filter(Boolean).join(" · "))}${t.fromIntake ? ' · <span class="tag">学生填写</span>' : ""}</div>${t.bio ? `<div class="meta">${a(t.bio)}</div>` : ""}\n      <div class="stack tight mt8">${s.map(t => `<div class="row" style="gap:10px"><span class="small">${a(function (t) {
                  const [e, s] = String(t.target || "").split(":");
                  if ("sub" === e) {
                    const t = bt.sub(s);
                    return t ? `${It(t)}（${wt(t)}）` : "—";
                  }
                  return "app" === e ? yt(bt.app(s)) : "—";
                }(t))}</span>${e ? `<select class="select sm" data-act="ref-status" data-id="${t.id}">${Object.keys(Y).map(e => `<option value="${e}" ${e === t.status ? "selected" : ""}>${Y[e][0]}</option>`).join("")}</select>` : Q(Y, t.status)}<span class="tiny muted2">${t.dueAt ? "截止 " + p(t.dueAt) : ""}</span></div>`).join("") || '<span class="small muted2">尚未建立推荐信请求</span>'}</div></div>\n      ${e ? `<div class="side"><button class="btn sm" data-act="ref-new" data-id="${t.id}">添加请求</button><button class="btn sm" data-act="rec-edit" data-id="${t.id}">编辑</button></div>` : ""}</div>`;
              }).join("")}</div>` : Me("还没有推荐人")}`;
            }(s, i) : "profile" === e ? function (t, e) {
              return function (t, {
                manage: e = !1
              } = {}) {
                const s = t.profile || {},
                  i = t.intake || {
                    status: "not_started"
                  },
                  d = i.status,
                  n = (t, e) => `<div class="kv"><div class="k">${a(t)}</div><div class="v">${e ? a(e) : '<span class="muted2">未填写</span>'}</div></div>`,
                  o = (i.changes || []).slice(-1)[0],
                  l = (t, e, s, i = "") => `<div class="card"><div class="row between"><b class="small" style="color:var(--accent)">${t} ${a(e)}</b>${i}</div><div class="mt8">${s}</div></div>`,
                  r = t => ve.find(e => e.id === t),
                  c = t => `<div class="kv-grid">${r(t).fields.map(t => n(t.label, s[t.key])).join("")}</div>`,
                  u = r("s11").checklist,
                  v = s.files || {};
                return `<div class="panel-head"><div><h3>学生档案 · 基础信息采集表</h3><p>学生登录后在线填写，内容直接进入档案；顾问核对后用于填表与文书写作。</p></div>\n    <div class="row">${Q(pe, d)}${ce.editIntake(t.id) ? `<button class="btn sm" data-act="go" data-href="#/intake/${t.id}">${I("edit")} 在线编辑</button>` : ""}${e && ["submitted", "updated"].includes(d) ? `<button class="btn sm primary" data-act="intake-verify" data-sid="${t.id}">${I("check")} 标记已核对</button>` : ""}${e && ["not_started", "draft"].includes(d) ? `<button class="btn sm" data-act="intake-remind" data-sid="${t.id}">提醒学生填写</button>` : ""}</div></div>\n  <div class="panel-body stack">\n    ${"updated" === d && o ? `<div class="notice">${I("clock")}<div><strong>学生在 ${m(o.at)} 修改了以下内容，请重新核对</strong>${a(o.fields.join("、"))}</div></div>` : ""}\n    ${"not_started" === d ? `<div class="notice info">${I("user")}<div><strong>学生尚未开始填写</strong>学生用自己的账号登录后，在“基础信息”中在线填写；顾问也可以点“在线编辑”代为录入。</div></div>` : ""}\n    <div class="tiny muted2">${i.submittedAt ? "学生提交于 " + m(i.submittedAt) : ""}${i.verifiedAt ? " · " + a($t(i.verifiedBy)) + " 核对于 " + m(i.verifiedAt) : ""}</div>\n    ${l("01", "个人基本信息", c("s1"))}\n    ${l("02", "监护人信息", Ms(r("s2").table.cols, s.guardians))}\n    ${l("03", "教育背景", Ms(r("s3").table.cols, s.education) + `<div class="kv-grid mt8">${r("s3").fields.map(t => n(t.label, s[t.key])).join("")}</div>`)}\n    ${l("04", "语言能力与其他考试", Ms(r("s4").table.cols, s.tests) + `<div class="kv-grid mt8">${r("s4").fields.map(t => n(t.label, s[t.key])).join("")}</div>`)}\n    <div class="grid cols-2">${l("05", "音乐会实践、活动与比赛", Ms(r("s5").table.cols, s.activities))}${l("06", "奖项与荣誉", Ms(r("s6").table.cols, s.awards))}</div>\n    ${l("07", "其他能力、特长与兴趣爱好", c("s7"))}\n    ${l("08–09", "个人陈述素材问卷", Ts(t), '<span class="tiny muted2">文书老师在文书页面也能直接查看</span>')}\n    ${l("10", "推荐人信息", bt.recsOf(t.id).length ? `<div class="kv-grid">${bt.recsOf(t.id).map(t => n(t.name || "（未填姓名）", [t.title, t.course && "教授 " + t.course, t.duration, t.relation, t.phone, t.email].filter(Boolean).join(" · "))).join("")}</div><div class="tiny muted2 mt8">推荐信请求在“推荐人”标签中跟进</div>` : '<div class="small muted2">未填写</div>')}\n    ${l("11", "附件与文件目录", `<div class="table-wrap" style="border:1px solid var(--line);border-radius:10px"><table><thead><tr><th>材料类别</th><th>状态</th><th>文件名称</th><th>链接</th><th>备注</th></tr></thead><tbody>${u.rows.map((t, e) => {
                  const s = v[e] || {},
                    i = u.status.find(t => t[0] === s.status);
                  return `<tr><td class="small">${a(t)}</td><td>${i ? `<span class="pill ${"provided" === s.status ? "ok" : "pending" === s.status ? "warn" : ""}">${i[1]}</span>` : '<span class="muted2 small">—</span>'}</td><td class="small">${a(s.fileName || "")}</td><td class="small">${s.link ? `<a href="${a(S(s.link))}" target="_blank" rel="noopener">打开</a>` : ""}</td><td class="small">${a(s.note || "")}</td></tr>`;
                }).join("")}</tbody></table></div><div class="tiny muted2 mt8">文件核对后请在“文件与曲目”中正式登记，用于各校申请。</div>`)}\n    ${l("12", "信息核对与确认", s.confirmed ? `<span class="pill ok">已确认</span> <span class="small">${a(s.confirmName || "")} · ${p(s.confirmDate)}</span>` : '<span class="small muted2">学生尚未勾选确认</span>')}\n    ${e ? l("内部", "申请平台账号（仅团队可见）", `<div class="small" style="white-space:pre-wrap">${(s.accounts || []).map(t => `${a(t.platform)}：${a(t.login)}${t.note ? "（" + a(t.note) + "）" : ""}`).join("\n") || '<span class="muted2">未登记</span>'}</div><div class="tiny muted2 mt8">只记录登录账号与密码保管位置，系统不保存密码。</div>`, `<button class="btn sm" data-act="accounts-edit" data-id="${t.id}">编辑</button>`) : ""}\n  </div>`;
              }(t, {
                manage: e,
                staff: !0
              });
            }(s, i) : function (t, e) {
              const s = st.where("activity", e => e.studentId === t.id).sort((t, e) => String(e.at).localeCompare(String(t.at)));
              return `<div class="panel-head"><div><h3>动态</h3><p>标记“学生可见”的动态会显示在学生页面上。</p></div>${e ? `<button class="btn sm" data-act="activity-new" data-sid="${t.id}">${I("plus")} 添加记录</button>` : ""}</div>\n  <div class="panel-body"><div class="timeline">${s.map(t => `<div class="tl"><i class="${t.studentVisible ? "info" : ""}"></i><div><div class="t">${a(t.text)}</div><div class="m">${m(t.at)} · ${a($t(t.userId))}${t.applicationId ? " · " + a(ft(bt.app(t.applicationId))) : ""}${t.studentVisible ? " · 学生可见" : " · 仅内部"}</div></div></div>`).join("") || Me("暂无动态")}</div></div>`;
            }(s, i), `<div class="profile-head"><div class="profile-main">${Ve(s.name)}<div><h2>${a(s.name)}<em>${a(s.englishName || "")}</em></h2>\n      <p>${a(s.season)} · ${"PG" === s.level ? "研究生" : "本科"} · ${a(ot(s.majorId))} · ${a(s.currentSchool || "")}</p>\n      <div class="row">${"archived" === s.status ? '<span class="pill">已归档</span>' : '<span class="pill ok">在申</span>'}<span class="tag">顾问 ${a($t(s.advisorId))}</span><span class="tag">文书 ${a((s.writerIds || []).map($t).join("、") || "未分配")}</span><button class="pill ${pe[s.intake?.status || "not_started"][1]}" style="border:0;cursor:pointer" data-act="student-tab" data-sid="${t}" data-tab="profile">采集表：${pe[s.intake?.status || "not_started"][0]}</button></div></div></div>\n    <div class="page-actions">\n      ${i ? `<button class="btn primary" data-act="app-new" data-sid="${t}">${I("plus")} 添加院校</button>` : ""}\n      <button class="btn" data-act="go" data-href="#/report/${t}">${I("report")} 进度报告</button>\n      <button class="btn" data-act="go" data-href="#/preview/${t}">${I("user")} 学生视角</button>\n      ${Ne([i && {
              act: "student-edit",
              label: "编辑基本信息与分配",
              data: {
                id: t
              }
            }, i && {
              act: "student-account",
              label: st.where("users", e => "student" === e.role && e.studentId === t).length ? "重置学生账号密码" : "开设学生账号",
              data: {
                id: t
              }
            }, i && {
              act: "student-archive",
              label: "archived" === s.status ? "恢复为在申" : "归档学生",
              data: {
                id: t
              }
            }, de() && {
              act: "student-delete",
              label: "彻底删除（纠错用）",
              danger: !0,
              data: {
                id: t
              }
            }])}\n    </div></div>\n    <section class="panel">${Be(r, e, "student-tab", {
              sid: t
            })}<div>${c}</div></section>`;
          }(i.a, i.b);
          break;
        case "app":
          d = le() ? ls() : function (t, e = "overview") {
            const s = bt.app(t);
            if (!s || !ce.seeStudent(s.studentId)) return Qe("找不到这个申请，或你没有查看权限。");
            const i = bt.student(s.studentId),
              d = ce.manage(s.studentId),
              n = dt(s.schoolId),
              o = [["overview", "概览"], ["requirements", "院校要求", s.reqConfirmed ? null : {
                n: "!",
                hot: !0
              }], ["audition", "考试与曲目", bt.roundsOf(s.id).length], ["files", "文书与材料"]];
            let l = "requirements" === e ? function (t, e) {
              if (ke(t.schoolId) && dt(t.schoolId)) return Ie(t.schoolId).then(() => Vs()), `<div class="panel-body">${Me("正在加载院校要求…")}</div>`;
              const s = pt(t),
                i = mt(t),
                d = dt(t.schoolId),
                n = t.reqConfirmed,
                o = new Set(n ? n.ids : s.map(t => t.id)),
                l = s.filter(t => "english" === t.cat && (t.ielts || []).length).flatMap(e => e.ielts.filter(e => !e.mj || ct(e.mj, t.majorId)).map(t => ({
                  o: t.o,
                  m: t.m,
                  label: t.p
                }))),
                r = n?.lang;
              return d ? `<form class="panel-body stack" id="reqForm" data-id="${t.id}">\n    ${n ? `<div class="notice ok">${I("check")}<div><strong>已于 ${p(n.at)} 由 ${a($t(n.by))} 核对确认</strong>如院校更新要求，可调整勾选后重新确认。确认后会先列出“将要补充的任务”供你逐条勾选，已有的不会重复，跳过的会被记住。</div></div>` : `<div class="notice">${I("alert")}<div><strong>请核对院校要求</strong>勾选适用于本申请的要求、选定语言要求档位，并核实截止日期。确认后先预览模板任务，由你勾选需要的再生成。</div></div>`}\n    <div class="card"><div class="row between"><b class="small" style="color:var(--accent)">院校信息</b>${S(d.web) ? `<a class="btn sm" href="${a(S(d.web))}" target="_blank" rel="noopener">院校官网 ${I("external")}</a>` : ""}</div>\n      <div class="kv-grid mt8"><div class="kv"><div class="k">申请系统</div><div class="v">${a(d.system || "—")}</div></div><div class="kv"><div class="k">中国考点</div><div class="v">${a(d.china || "—")}</div></div><div class="kv"><div class="k">院校库核实日期</div><div class="v">${a(d.verified || "—")} · ${a(d.cycle || "")}</div></div></div></div>\n    <div class="card"><b class="small" style="color:var(--accent)">截止日期（院校库）</b>\n      <div class="stack tight mt8">${i.map(s => `<div class="row"><b class="${h(s.d)}">${s.d ? p(s.d) : "未公布"}</b><span class="small muted">${a(s.p || "通用截止")}</span>${e && s.d ? St(t).map(e => `<button type="button" class="btn sm" data-act="deadline-adopt" data-id="${t.id}" data-part="${e.id}" data-date="${s.d}">采用到「${a(e.label)} · ${a(It(e.sub))}」</button>`).join("") : ""}</div>`).join("") || '<span class="small muted2">院校库未提供</span>'}\n      <div class="tiny muted2">当前：${St(t).map(t => `${a(t.label)} ${t.deadline?.date ? p(t.deadline.date) + (t.deadline.verified ? "（已核实）" : "（待核实）") : "未设定"}`).join("；") || "尚未设置提交项"}</div></div></div>\n    ${l.length ? `<div class="card"><b class="small" style="color:var(--accent)">语言要求档位</b><div class="tiny muted2">同一学校不同项目要求不同，请选择本申请适用的一档；系统据此与学生成绩比对。</div>\n      <div class="stack tight mt8">${l.map((t, s) => `<label class="row small"><input type="radio" name="lang" value="${s}" ${(r ? r.label === t.label : 0 === s) ? "checked" : ""} ${e ? "" : "disabled"}> <b>${a(t.label)}</b> IELTS ${a(t.o)}，单项 ${a(t.m)}</label>`).join("")}</div>\n      ${(() => {
                const e = Mt(t, r || l[0]);
                return `<div class="gap ${"ok" === e.status ? "ok" : "gap" === e.status ? "err" : "warn"}">${n ? "" : "预览："}${a(e.text)}</div>`;
              })()}</div>` : ""}\n    <div class="stack tight"><b class="small" style="color:var(--accent)">要求记录（${s.length}）</b>${s.map(t => `<div class="req ${o.has(t.id) ? "" : "off"}"><div class="req-head">${e ? `<input type="checkbox" name="ids" value="${a(t.id)}" ${o.has(t.id) ? "checked" : ""}>` : ""}<div style="flex:1;min-width:0">\n      <div class="row"><span class="pill info plain">${a(lt(t.cat))}</span><b class="small">${a(t.prog || "")}</b><span class="tiny muted2">核实于 ${a(t.verified || "—")}</span></div>\n      ${t.zh ? y(t.zh) : ""}\n      ${(t.stages || []).map(t => `<div class="stage-box"><b>${a(t.t || rt(t.k))}</b>${y(t.zh)}</div>`).join("")}\n      ${(t.src || []).length ? `<div class="row mt8">${t.src.filter(e => S(e)).map((e, s) => `<a class="btn sm" href="${a(S(e))}" target="_blank" rel="noopener">官方来源${t.src.length > 1 ? " " + (s + 1) : ""} ${I("external")}</a>`).join("")}</div>` : ""}\n    </div></div></div>`).join("") || Me("院校库没有匹配的记录", "请检查学位层次与专业是否填写正确。")}</div>\n    ${e ? `<div class="row"><button type="button" class="btn primary" data-act="req-confirm" data-id="${t.id}">${I("check")} ${n ? "重新确认，并预览可补充的任务" : "确认要求，并预览准备任务"}</button><span class="tiny muted2">语言档位：${l.length ? "按上方选择" : "无结构化数据"}</span></div>` : ""}\n    <input type="hidden" id="langOpts" value="${a(JSON.stringify(l))}">\n  </form>` : `<div class="panel-body stack">\n    <div class="notice info">${I("book")}<div><strong>院校库中没有这所学校</strong>请在“概览”中设置提交项（可多个）、各自的截止日期与考试轮次，核对学校官网要求后点击下方确认。</div></div>\n    ${n ? `<div class="notice ok">${I("check")}<div><strong>已于 ${p(n.at)} 由 ${a($t(n.by))} 确认</strong>可随时按模板补充缺少的任务。</div></div>` : ""}\n    ${e ? `<div class="row"><button type="button" class="btn primary" data-act="req-confirm" data-id="${t.id}">${I("check")} ${n ? "按模板补充任务" : "确认已核对官网要求，并按模板规划任务"}</button></div>` : ""}\n    <input type="hidden" id="langOpts" value="[]"><form id="reqForm"></form></div>`;
            }(s, d) : "audition" === e ? function (t, e) {
              const s = bt.roundsOf(t.id),
                i = bt.repOf(t.studentId).filter(e => (e.applicationIds || []).includes(t.id)),
                d = bt.matsOf(t.studentId).filter(e => (e.applicationIds || []).includes(t.id) && ["video", "audio", "portfolio", "score", "repertoire_list"].includes(e.kind)),
                n = pt(t).filter(t => ["audition", "portfolio"].includes(t.cat));
              return `<div class="panel-head"><div><h3>考试 / 录像轮次</h3><p>每一轮单独记录：预审、录像、作品集、现场、线上或面试</p></div>${e ? `<button class="btn sm primary" data-act="round-new" data-id="${t.id}">${I("plus")} 添加轮次</button>` : ""}</div>\n    ${s.length ? `<div class="table-wrap"><table><thead><tr><th>轮次</th><th>平台 / 地点</th><th>截止</th><th>考试日期</th><th>状态</th><th>备注</th><th></th></tr></thead><tbody>${s.map(t => `<tr><td class="td-main">${a(X(L, t.kind))}</td><td class="small">${a([t.platform, t.location].filter(Boolean).join(" · ") || "—")}</td><td>${"preparing" === t.status ? b(t.deadline, 10) : p(t.deadline)}</td><td>${"scheduled" === t.status ? b(t.date, 10) : p(t.date)}</td><td>${Q(M(t.kind), t.status)}</td><td class="small">${a(t.note || "")}</td><td class="actions">${e ? `<button class="btn sm" data-act="round-edit" data-id="${t.id}">编辑</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : Me("还没有考试轮次")}\n    <div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>本校曲目</h3></div>${e ? `<button class="btn sm" data-act="rep-new" data-sid="${t.studentId}" data-app="${t.id}">${I("plus")} 添加曲目</button>` : ""}</div>${Xe(i, e)}\n    <div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>录像与作品</h3><p>专业老师意见由顾问登记在文件上</p></div>${e ? `<button class="btn sm" data-act="mat-new" data-sid="${t.studentId}" data-app="${t.id}">${I("plus")} 登记文件</button>` : ""}</div>${We(d, {
                manage: () => e
              })}\n    ${n.length ? `<details class="panel-body" style="border-top:1px solid var(--line)"><summary class="small" style="cursor:pointer;color:var(--accent);font-weight:700">查看院校考试 / 作品集要求（${n.length}）</summary><div class="stack tight mt8">${n.map(t => `<div class="req"><b class="small">${a(t.prog)}</b>${t.zh ? y(t.zh) : ""}${(t.stages || []).map(t => `<div class="stage-box"><b>${a(t.t || rt(t.k))}</b>${y(t.zh)}</div>`).join("")}</div>`).join("")}</div></details>` : ""}`;
            }(s, d) : "files" === e ? function (t, e) {
              const s = st.where("documents", e => !e.archived && Vt(e).some(e => e.id === t.id)),
                a = bt.matsOf(t.studentId).filter(e => (e.applicationIds || []).includes(t.id) || !(e.applicationIds || []).length);
              return `<div class="panel-head"><div><h3>文书</h3><p>包括通过共用平台提交、覆盖本校的文书</p></div>${e ? `<button class="btn sm primary" data-act="doc-new" data-sid="${t.studentId}" data-app="${t.id}">${I("plus")} 新建文书</button>` : ""}</div>${Ze(s)}\n    <div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>材料</h3><p>本校专用与通用材料</p></div>${e ? `<button class="btn sm" data-act="mat-new" data-sid="${t.studentId}" data-app="${t.id}">${I("plus")} 登记文件</button>` : ""}</div>${We(a, {
                manage: () => e
              })}`;
            }(s, d) : function (t, e) {
              const s = bt.roundsOf(t.id),
                i = St(t),
                d = Rt(Nt(t)),
                n = Mt(t),
                o = `\n    <div class="fact"><span>提交项</span><div class="stack tight">${i.map(s => function (t, e, s) {
                  const i = e.sub,
                    d = e.deadline || {},
                    n = i ? bt.appsOfSub(i.id).filter(e => e.id !== t.id) : [];
                  return `<div class="card" style="padding:10px 12px">\n    <div class="row between"><div class="row" style="gap:6px"><span class="tag">${a(e.label || "提交项")}</span><b class="small">${a(It(i))}</b>${At(e)}${!1 === e.required ? '<span class="tag">可选</span>' : ""}</div>\n      ${s ? `<div class="row" style="gap:4px">${i ? `<button class="btn sm" data-act="sub-edit" data-id="${i.id}">更新状态</button>` : ""}<button class="btn sm ghost" data-act="part-edit" data-id="${t.id}" data-part="${e.id}" title="修改平台 / 截止日期">${I("edit")}</button></div>` : ""}</div>\n    <div class="row mt8" style="gap:8px"><span class="tiny muted2">截止</span>${d.date ? `<b class="small ${jt(e) ? "" : h(d.date, 14)}">${p(d.date)}</b>` : '<span class="small date-warn">未知</span>'}${d.verified ? '<span class="pill ok">已核实</span>' : '<span class="pill warn">待核实</span>'}${d.note ? `<span class="tiny muted2">${a(d.note)}</span>` : ""}</div>\n    ${i && (i.submittedAt || i.ref) ? `<div class="tiny muted2 mt8">${i.submittedAt ? "提交 " + p(i.submittedAt) : ""}${i.receivedAt ? " · 学校确认 " + p(i.receivedAt) : ""}${i.ref ? " · 编号 " + a(i.ref) : ""}</div>` : ""}\n    ${kt(i) ? `<div class="tiny muted mt8">${I("link")} 共用平台：${n.length ? `与 ${a(n.map(ft).join("、"))} 共用这次提交` : `目前只有本校使用；之后加入的 ${a(It(i))} 院校会共用这次提交`}（基础信息、PS、推荐信）。</div>` : ""}\n    ${e.needsAdd ? `<div class="row mt8">${e.addedAt ? `<span class="tiny muted2">已于 ${p(e.addedAt)} 在平台上添加本校志愿</span>` : `<span class="small date-warn">${a(It(i))} 提交后才加入本校，需在平台上添加志愿</span>${s ? `<button class="btn sm" data-act="part-added" data-id="${t.id}" data-part="${e.id}">已在平台添加</button>` : ""}`}</div>` : ""}\n  </div>`;
                }(t, s, e)).join("") || '<span class="pill err">尚未设置提交项</span>'}\n      ${e ? `<div><button class="btn sm" data-act="part-new" data-id="${t.id}">${I("plus")} 添加提交项</button> <span class="tiny muted2">如 IU：大学申请（Common App）+ 音乐学院申请（Jacobs 系统）</span></div>` : ""}</div></div>\n    <div class="fact"><span>内部目标</span><div>${t.internalDeadline ? p(t.internalDeadline) : '<span class="muted2">未设定</span>'} <span class="tiny muted2">仅内部可见</span></div></div>\n    <div class="fact"><span>考试 / 录像</span><div class="stack tight">${s.map(t => function (t, e) {
                  const s = M(t.kind),
                    i = t.date ? `考试 ${p(t.date)}` : t.deadline ? `截止 ${p(t.deadline)}` : "日期待定",
                    d = "preparing" === t.status && t.deadline ? h(t.deadline, 10) : "scheduled" === t.status && t.date ? h(t.date, 10) : "";
                  return `<div class="row" style="gap:8px"><b class="small">${a(X(L, t.kind))}</b><span class="small ${d}">${i}</span>${t.platform ? `<span class="tag">${a(t.platform)}</span>` : ""}${t.location ? `<span class="tag">${a(t.location)}</span>` : ""}\n    ${e ? `<select class="select sm" data-act="round-status" data-id="${t.id}">${Object.keys(s).map(e => `<option value="${e}" ${e === t.status ? "selected" : ""}>${s[e][0]}</option>`).join("")}</select><button class="btn sm ghost" data-act="round-edit" data-id="${t.id}">${I("edit")}</button>` : Q(s, t.status)}</div>`;
                }(t, e)).join("") || '<span class="muted2">无</span>'}${e ? `<div><button class="btn sm" data-act="round-new" data-id="${t.id}">${I("plus")} 添加轮次</button> <span class="tiny muted2">每所学校的录像单独登记与提交</span></div>` : ""}</div></div>\n    <div class="fact"><span>语言要求</span><div class="gap ${"ok" === n.status ? "ok" : "gap" === n.status ? "err" : "warn"}" style="margin:0">${a(n.text)}</div></div>\n    <div class="fact"><span>录取结果</span><div><div class="row">${Q(B, t.outcome?.type || "pending")}${t.outcome?.date ? `<span class="tiny muted2">${p(t.outcome.date)}</span>` : ""}${e ? `<button class="btn sm" data-act="outcome-edit" data-id="${t.id}">登记结果</button>` : ""}</div>${t.outcome?.conditions ? `<div class="small mt8">条件：${a(t.outcome.conditions)}</div>` : ""}</div></div>\n    <div class="fact"><span>学生决定</span><div class="row">${Q(P, t.decision?.type || "pending")}${t.decision?.date ? `<span class="tiny muted2">${p(t.decision.date)}</span>` : ""}</div></div>`,
                l = (t.parts || []).map(t => t.submissionId),
                r = Re(st.where("tasks", e => e.applicationId === t.id || e.submissionId && l.includes(e.submissionId) && !e.applicationId)),
                c = st.where("activity", e => e.applicationId === t.id).sort((t, e) => String(e.at).localeCompare(String(t.at))).slice(0, 6);
              return `<div class="panel-body"><div class="grid cols-main">\n    <div class="stack">\n      ${d.length ? `<div class="stack tight">${d.map(t => `<div class="notice ${"err" === t.level ? "err" : "info" === t.level ? "info" : ""}">${I("err" === t.level ? "alert" : "clock")}<div><strong>${a(t.text)}</strong></div></div>`).join("")}</div>` : ""}\n      <div class="card">${o}</div>\n    </div>\n    <div class="stack">\n      <div class="card" style="padding:0"><div class="panel-head"><div><h3>任务</h3><p>本校任务，以及本校所用平台的共用任务</p></div>${e ? `<div class="row" style="gap:4px"><button class="btn sm" data-act="plan-open" data-id="${t.id}">按模板补充</button><button class="btn sm" data-act="task-new" data-sid="${t.studentId}" data-app="${t.id}">${I("plus")} 新建</button></div>` : ""}</div>\n        ${Pe(r.filter(Kt), {
                showStudent: !1,
                compact: !0,
                noCtx: !0,
                emptyTitle: "没有未完成任务"
              })}\n        ${r.filter(t => !Kt(t)).length ? `<div class="panel-foot">已完成 ${r.filter(t => !Kt(t)).length} 项</div>` : ""}</div>\n      <div class="card"><b class="small" style="color:var(--accent)">最近动态</b><div class="timeline mt8">${c.map(t => `<div class="tl"><i></i><div><div class="t">${a(t.text)}</div><div class="m">${m(t.at)} · ${a($t(t.userId))}</div></div></div>`).join("") || '<span class="small muted2">暂无</span>'}</div></div>\n    </div></div></div>`;
            }(s, d);
            return `<div class="profile-head"><div class="profile-main"><div class="school-mark ${(ft(s) || "").length > 4 ? "long" : ""}">${a((ft(s) || "").slice(0, 10))}</div><div>\n      <h2>${a(gt(s))}<em>${a(n?.en || "")}</em></h2>\n      <p>${a(s.program || "")} · ${a(ot(s.majorId))} · ${"PG" === s.level ? "研究生" : "本科"} · 学生 <button class="linkbtn" data-act="go" data-href="#/student/${i.id}">${a(i.name)}</button></p>\n      ${s.withdrawn ? `<div class="notice err" style="margin:0">${I("alert")}<div><strong>该申请已撤回</strong>${a(s.withdrawn.reason || "")} · ${p(s.withdrawn.at)}</div></div>` : ""}</div></div>\n    <div class="page-actions">${d ? `<button class="btn" data-act="app-edit" data-id="${s.id}">${I("edit")} 编辑项目</button>` : ""}\n      ${Ne([d && {
              act: "app-withdraw",
              label: s.withdrawn ? "恢复申请" : "撤回申请",
              data: {
                id: s.id
              }
            }, de() && {
              act: "app-delete",
              label: "彻底删除（纠错用）",
              danger: !0,
              data: {
                id: s.id
              }
            }])}</div></div>\n    <section class="panel" style="margin-bottom:14px"><div class="panel-body">${_t(s)}<div class="tiny muted2 mt8">主线由提交记录、考试轮次和录取结果自动推算，不需要手动选择阶段。</div></div></section>\n    <section class="panel">${Be(o, e, "app-tab", {
              id: s.id
            })}<div>${l}</div></section>`;
          }(i.a, i.b || "overview");
          break;
        case "tasks":
          d = le() ? ls() : function () {
            const t = new Set(ce.students().map(t => t.id)),
              e = de() || ne();
            e || (ss.scope = "mine");
            let s = st.where("tasks", e => t.has(e.studentId) || e.assigneeId === ae().id);
            if ("mine" === ss.scope && (s = s.filter(t => t.assigneeId === ae().id)), "open" === ss.status ? s = s.filter(Kt) : "overdue" === ss.status ? s = Bt(s) : "blocked" === ss.status ? s = s.filter(t => t.blocked && Kt(t)) : "closed" === ss.status && (s = s.filter(t => !Kt(t))), ss.student && (s = s.filter(t => t.studentId === ss.student)), ss.category && (s = s.filter(t => t.category === ss.category)), ss.q) {
              const t = ss.q.toLowerCase();
              s = s.filter(e => (e.title + " " + bt.student(e.studentId)?.name + " " + Zt(e)).toLowerCase().includes(t));
            }
            Re(s);
            const i = (t, e) => e.map(([e, s]) => `<option value="${e}" ${ss[t] === e ? "selected" : ""}>${s}</option>`).join("");
            return `<div class="page-head"><div><h2>${"mine" === ss.scope ? "我的任务" : de() ? "全部任务" : "我学生的任务"}<em>Tasks</em></h2><p>任务状态：待开始 / 进行中 / 待复核 / 已完成 / 不适用；遇到阻碍时标记“受阻”并写明原因。</p></div>\n    <div class="page-actions">${e ? `<button class="btn primary" data-act="task-new">${I("plus")} 新建任务</button>` : ""}</div></div>\n    <section class="panel"><div class="filters">\n      ${e ? `<select class="select" data-act="filter" data-key="scope" data-scope="task">${i("scope", [["mine", "分配给我"], ["all", de() ? "全部成员" : "我学生的全部任务"]])}</select>` : ""}\n      <select class="select" data-act="filter" data-key="status" data-scope="task">${i("status", [["open", "未完成"], ["overdue", "已逾期"], ["blocked", "受阻"], ["closed", "已完成 / 不适用"], ["all", "全部"]])}</select>\n      <select class="select" data-act="filter" data-key="student" data-scope="task"><option value="">全部学生</option>${ce.students().map(t => `<option value="${t.id}" ${ss.student === t.id ? "selected" : ""}>${a(t.name)}</option>`).join("")}</select>\n      <select class="select" data-act="filter" data-key="category" data-scope="task"><option value="">全部类别</option>${i("category", Object.entries(O))}</select>\n      <input class="input" placeholder="搜索任务…" value="${a(ss.q)}" data-act="filter" data-key="q" data-scope="task">\n      <span class="spacer"></span><span class="small muted2">${s.length} 项</span></div>\n      ${Pe(s, {
              compact: "mine" === ss.scope,
              emptyTitle: "没有符合条件的任务"
            })}</section>`;
          }();
          break;
        case "docs":
          d = le() ? ls() : function () {
            const t = new Set(ce.students().map(t => t.id));
            let e = st.where("documents", e => !e.archived && (t.has(e.studentId) || e.writerId === ae().id));
            oe() && (e = e.filter(t => t.writerId === ae().id)), ts.student && (e = e.filter(t => t.studentId === ts.student)), ts.mine && (e = e.filter(ue));
            const s = e.filter(ue).length;
            return `<div class="page-head"><div><h2>${oe() ? "我的文书" : "文书协作"}<em>Documents</em></h2><p>撰写 → 顾问审核 → 主管定稿 → 学生确认 → 定稿。任何一步都可以退回修改，所有意见按版本保留。</p></div>\n    <div class="page-actions">${de() || ne() ? `<button class="btn primary" data-act="doc-new">${I("plus")} 新建文书</button>` : ""}</div></div>\n    <section class="panel" style="margin-bottom:14px"><div class="filters" style="border-bottom:0">\n      <label class="row small" style="gap:6px"><input type="checkbox" data-act="doc-mine" ${ts.mine ? "checked" : ""}> 只看待我处理（${s}）</label>\n      <select class="select" data-act="filter" data-key="student" data-scope="doc"><option value="">全部学生</option>${ce.students().map(t => `<option value="${t.id}" ${ts.student === t.id ? "selected" : ""}>${a(t.name)}</option>`).join("")}</select>\n    </div></section>\n    <div class="board">${[["撰写 / 修改", t => ["drafting", "revising"].includes(t.status)], ["顾问审核", t => "advisor_review" === t.status], ["主管定稿", t => "supervisor_review" === t.status], ["学生确认", t => "student_review" === t.status], ["已定稿", t => "final" === t.status]].map(([t, s]) => {
              const a = e.filter(s).sort((t, e) => ue(e) - ue(t) || $(t.dueDate, e.dueDate));
              return `<div class="lane"><div class="lane-head">${t}<span class="count">${a.length}</span></div><div class="lane-body">${a.map(t => Fe(t)).join("") || '<div class="tiny muted2" style="padding:6px 4px">—</div>'}</div></div>`;
            }).join("")}</div>`;
          }();
          break;
        case "doc":
          d = function (t) {
            const e = bt.doc(t);
            if (!e || !ce.seeDoc(e)) return Qe("找不到这份文书，或你没有查看权限。");
            if (le()) return function (t) {
              const e = st.get("versions", t.currentVersionId),
                s = bt.reviewsOf(t.id).filter(t => "student" === t.stage);
              return `<div class="portal"><div class="row" style="margin-bottom:12px"><button class="btn" data-act="go" data-href="#/home">${I("back")} 返回我的申请</button></div>\n    <section class="panel"><div class="panel-head"><div><h3>${a(t.title)}</h3><p>用于 ${a(Ut(t))}</p></div>${(() => {
                const e = os(t);
                return `<span class="pill ${e[1]}">${e[0]}</span>`;
              })()}</div>\n    <div class="panel-body stack">\n      ${e ? `<div class="card hl"><div class="row between"><div><div class="card-title">当前版本 V${e.no}</div><div class="card-meta">${a(ze(e))} · ${p(e.createdAt)}</div></div>${Ue(e) ? "" : He(e, "btn primary", "打开文件")}</div>${e.note ? `<div class="small mt8">本版说明：${a(e.note)}</div>` : ""}${Ue(e) ? `<div class="mt12">${Ge(e, 600)}</div>` : ""}</div>` : ""}\n      ${t.wordLimit || t.brief ? `<div class="small muted">${t.wordLimit ? "篇幅：" + a(t.wordLimit) + "　" : ""}${a(t.brief || "")}</div>` : ""}\n      ${ce.docStudentReview(t) ? `<div class="notice">${I("alert")}<div><strong>请确认这份文书</strong>确认后文书将定稿并用于提交；如果有需要修改的地方，请点击“提出修改”并写下具体意见。</div></div>\n        <div class="row"><button class="btn danger" data-act="doc-review" data-id="${t.id}" data-stage="student" data-decision="changes">提出修改</button><button class="btn ok" data-act="doc-review" data-id="${t.id}" data-stage="student" data-decision="approve">${I("check")} 确认定稿</button></div>` : ""}\n      ${s.length ? `<div><b class="small" style="color:var(--accent)">我的确认记录</b><div class="timeline mt8">${s.map(t => `<div class="tl"><i class="${"approve" === t.decision ? "ok" : "err"}"></i><div><div class="t">${t.proxy ? "主管 " + a($t(t.userId)) + " 代学生确认定稿" : "approve" === t.decision ? "已确认定稿" : "提出修改"}</div><div class="m">${m(t.createdAt)}</div>${t.comment ? `<div class="c">${a(t.comment)}</div>` : ""}</div></div>`).join("")}</div></div>` : ""}\n    </div></section></div>`;
            }(e);
            const s = bt.student(e.studentId),
              i = bt.versionsOf(e.id),
              d = bt.reviewsOf(e.id),
              n = "revising" === e.status ? Gt(e) : null,
              o = (st.get("versions", e.currentVersionId), []);
            if (de() && !e.archived && e.status !== 'final') o.push(`<button class="btn primary" data-act="doc-edit-body" data-id="${e.id}">修改正文</button>`);
            if (de() && !e.archived && e.status === 'student_review') o.push(`<button class="btn ok" data-act="doc-proxy-confirm" data-id="${e.id}">代学生确认</button>`);
            ce.docUpload(e) && o.push(`<button class="btn" data-act="ver-new" data-id="${e.id}">${I("upload")} 上传新版本</button>`), ce.docSubmit(e) && o.push(`<button class="btn primary" data-act="doc-submit" data-id="${e.id}">${I("send")} 送顾问审核</button>`), ce.docAdvisorReview(e) && o.push(`<button class="btn danger" data-act="doc-review" data-id="${e.id}" data-stage="advisor" data-decision="changes">退回修改</button><button class="btn primary" data-act="doc-review" data-id="${e.id}" data-stage="advisor" data-decision="approve">${I("check")} 通过，送主管定稿</button>`), ce.docSupervisorReview(e) && o.push(`<button class="btn danger" data-act="doc-review" data-id="${e.id}" data-stage="supervisor" data-decision="changes">退回修改</button><button class="btn primary" data-act="doc-review" data-id="${e.id}" data-stage="supervisor" data-decision="approve">${I("check")} ${e.needStudentConfirm ? "定稿，发给学生确认" : "定稿"}</button>`), ce.docReopen(e) && o.push(`<button class="btn" data-act="doc-reopen" data-id="${e.id}">重新打开修改</button>`);
            const l = {
                advisor_review: "等待顾问 " + $t(s.advisorId) + " 审核",
                supervisor_review: "等待主管定稿",
                student_review: "等待学生确认（学生在自己的页面上确认或提出修改）",
                drafting: "文书老师 " + $t(e.writerId) + " 撰写中",
                revising: "文书老师 " + $t(e.writerId) + " 修改中",
                final: zt(e) ? "已定稿，并已随申请提交" : "已定稿，等待随申请提交"
              }[e.status],
              r = t => `<div class="tl"><i class="${"approve" === t.decision ? "ok" : "changes" === t.decision ? "err" : "info"}"></i><div><div class="t">${a({
                advisor: "顾问",
                supervisor: "主管",
                student: "学生",
                writer: "文书老师"
              }[t.proxy ? "supervisor" : t.stage] || "")} ${a($t(t.userId))}${t.proxy ? "（代学生确认）" : ""} · ${"approve" === t.decision ? "通过" : "changes" === t.decision ? "退回修改" : "送审"}</div><div class="m">${m(t.createdAt)}</div>${t.comment ? `<div class="c">${a(t.comment)}</div>` : ""}</div></div>`;
            return `<div class="profile-head"><div class="profile-main"><div class="school-mark" style="background:var(--focus)">${I("file")}</div><div>\n      <h2>${a(e.title)}</h2><p>${a(X(F, e.type))} · 学生 <button class="linkbtn" data-act="go" data-href="#/student/${s.id}/docs">${a(s.name)}</button> · 用于 ${a(Ut(e))}</p>\n      <div class="row">${Ht(e)}<span class="tag">文书 ${a($t(e.writerId))}</span><span class="tag">顾问 ${a($t(s.advisorId))}</span>${e.dueDate ? `<span class="tag">截止 ${p(e.dueDate)}</span>` : ""}</div></div></div>\n    <div class="page-actions">${o.join("")}${Ne([ce.docMeta(e) && {
              act: "doc-edit",
              label: "编辑立项信息",
              data: {
                id: e.id
              }
            }, ce.docMeta(e) && {
              act: "doc-archive",
              label: "归档文书",
              data: {
                id: e.id
              }
            }])}</div></div>\n    <section class="panel" style="margin-bottom:14px"><div class="panel-body">${function (t) {
              const e = V.filter(e => "student_review" !== e || t.needStudentConfirm),
                s = "revising" === t.status ? "drafting" : t.status,
                a = e.indexOf(s);
              return `<div class="flow">${e.map((e, s) => {
                let i = s < a ? "done" : s === a ? "cur" : "";
                return "final" === t.status && (i = "done"), s === a && "revising" === t.status && (i = "back"), `<span class="${i}">${"drafting" === e && "revising" === t.status ? "修改中" : z[e]}</span>`;
              }).join("")}</div>`;
            }(e)}<div class="small muted mt8">${a(l)}</div>\n      ${n ? `<div class="notice err mt12">${I("message")}<div><strong>${a({
              advisor: "顾问",
              supervisor: "主管",
              student: "学生"
            }[n.stage])} ${a($t(n.userId))} 退回了 V${st.get("versions", n.versionId)?.no || ""}（${p(n.createdAt)}）</strong>${a(n.comment)}</div></div>` : ""}\n      ${ce.docUpload(e) && !ce.docSubmit(e) && "revising" === e.status ? '<div class="tiny muted2 mt8">请先上传修改后的新版本，再送审。</div>' : ""}\n    </div></section>\n    <div class="grid cols-main"><section class="panel"><div class="panel-head"><div><h3>版本与审核记录</h3><p>文件可上传或登记网盘链接；每个版本下保留对应的审核意见</p></div></div><div class="panel-body stack tight">${i.map(t => {
              const s = d.filter(e => e.versionId === t.id);
              return `<div class="card ${t.id === e.currentVersionId ? "hl" : ""}"><div class="row between"><div><div class="card-title">V${t.no}${t.id === e.currentVersionId ? " · 当前版本" : ""}</div><div class="card-meta">${Ue(t) ? '<span class="tag">在线正文</span> ' : ""}${a(ze(t))} · ${a($t(t.createdBy))} · ${m(t.createdAt)}</div></div><div class="row" style="gap:4px">${He(t)}</div></div>\n      ${t.note ? `<div class="small mt8">本版修改：${a(t.note)}</div>` : ""}\n      ${Ue(t) && t.id === e.currentVersionId ? `<div class="mt8">${Ge(t, 260)}</div>` : ""}\n      ${s.length ? `<div class="timeline mt12">${s.map(r).join("")}</div>` : ""}</div>`;
            }).join("") || Me("还没有版本", ce.docUpload(e) ? "点击“上传新版本”，登记网盘链接。" : "")}</div></section>\n    <section class="panel"><div class="panel-head"><div><h3>立项要求</h3></div><button class="btn sm" data-act="intake-essays" data-sid="${s.id}">${I("book")} 学生文书素材</button></div><div class="panel-body">\n      <div class="fact"><span>类型</span><div>${a(X(F, e.type))}</div></div>\n      <div class="fact"><span>用于</span><div>${a(Ut(e))}</div></div>\n      <div class="fact"><span>字数 / 篇幅</span><div>${a(e.wordLimit || "—")}</div></div>\n      <div class="fact"><span>写作要求</span><div style="white-space:pre-wrap">${a(e.brief || "—")}</div></div>\n      <div class="fact"><span>学生确认</span><div>${e.needStudentConfirm ? "需要（主管定稿后发给学生）" : "不需要"}</div></div>\n      <div class="fact"><span>截止</span><div>${p(e.dueDate)}</div></div>\n      ${(() => { const fqT = st.where("tasks", x => x.documentId === e.id); return fqT.length ? `<div class="fact"><span>关联任务</span><div>${fqT.map(x => `${a(x.title)}（${a(X(q, x.status))}${x.dueDate ? " · " + p(x.dueDate) : ""}）`).join("<br>")}</div></div>` : ""; })()}\n    </div></section></div>`;
          }(i.a);
          break;
        case "files":
          d = le() ? ls() : function () {
            const t = new Set(ce.students().map(t => t.id)),
              e = es.q.toLowerCase();
            let s = st.where("materials", e => !e.archived && t.has(e.studentId)),
              i = st.where("documents", e => !e.archived && t.has(e.studentId) && e.currentVersionId);
            es.student && (s = s.filter(t => t.studentId === es.student), i = i.filter(t => t.studentId === es.student)), es.kind && ("document" === es.kind ? s = [] : (s = s.filter(t => t.kind === es.kind), i = [])), es.status && (s = s.filter(t => t.status === es.status)), e && (s = s.filter(t => (t.title + " " + bt.student(t.studentId)?.name).toLowerCase().includes(e)), i = i.filter(t => (t.title + " " + bt.student(t.studentId)?.name).toLowerCase().includes(e)));
            const d = st.where("materials", e => t.has(e.studentId) && "review" === e.status && !e.archived).length;
            return `<div class="page-head"><div><h2>文件库<em>Files</em></h2><p>所有学生的录像、作品、证件、成绩与文书文件集中查找。文件本体存放在网盘，系统登记链接、版本与审核意见。</p></div></div>\n    ${d ? `<div class="notice" style="margin-bottom:14px">${I("video")}<div><strong>${d} 个文件待审核</strong>录像 / 作品的专业老师意见请由顾问在文件上“登记意见”。</div></div>` : ""}\n    <section class="panel"><div class="filters">\n      <input class="input" placeholder="搜索文件名或学生…" value="${a(es.q)}" data-act="filter" data-key="q" data-scope="file">\n      <select class="select" data-act="filter" data-key="student" data-scope="file"><option value="">全部学生</option>${ce.students().map(t => `<option value="${t.id}" ${es.student === t.id ? "selected" : ""}>${a(t.name)}</option>`).join("")}</select>\n      <select class="select" data-act="filter" data-key="kind" data-scope="file"><option value="">全部类型</option><option value="document" ${"document" === es.kind ? "selected" : ""}>文书</option>${Object.entries(H).map(([t, e]) => `<option value="${t}" ${es.kind === t ? "selected" : ""}>${e}</option>`).join("")}</select>\n      <select class="select" data-act="filter" data-key="status" data-scope="file"><option value="">全部状态</option>${Object.entries(G).map(([t, e]) => `<option value="${t}" ${es.status === t ? "selected" : ""}>${e[0]}</option>`).join("")}</select>\n    </div>\n    ${We(s, {
              showStudent: !0,
              manage: t => ce.manage(t.studentId)
            })}\n    ${i.length ? `<div class="panel-head" style="border-top:1px solid var(--line)"><div><h3>文书文件（当前版本）</h3></div></div>${Ze(i, {
              showStudent: !0
            })}` : ""}\n    </section>`;
          }();
          break;
        case "intake":
          d = function (t) {
            const e = t || ae().studentId,
              s = bt.student(e);
            if (!s || !ce.seeStudent(e)) return Qe("找不到这位学生。");
            if (!ce.editIntake(e)) return Qe("你没有编辑这份采集表的权限。");
            const i = s.profile || {},
              d = s.intake?.status || "not_started",
              n = le(),
              o = fe(s),
              r = (t, e, s) => {
                const i = s ?? "";
                return "textarea" === e.type ? `<textarea class="textarea" name="${t}" rows="${e.rows || 3}" ${e.minChars ? `data-min="${e.minChars}"` : ""}>${a(i)}</textarea>${e.minChars ? `<div class="hint" data-count-for="${t}">已写 ${String(i).length} 字 · 建议不少于 ${e.minChars} 字</div>` : ""}` : "select" === e.type ? `<select class="select" name="${t}">${e.options.map(t => `<option value="${a(t)}" ${t === i ? "selected" : ""}>${a(t || "请选择")}</option>`).join("")}</select>` : `<input class="input" type="${"date" === e.type ? "date" : "email" === e.type ? "email" : "text"}" name="${t}" value="${a(i)}">`;
              },
              c = (t, e, s) => `<div class="field ${t.full ? "full" : ""}"><label>${a(t.label)}${t.required ? ' <span style="color:var(--err)">*</span>' : ""}</label>${t.hint ? `<div class="hint">${a(t.hint)}</div>` : ""}${r(e, t, s)}</div>`,
              u = (s.intake?.changes || []).slice(-1)[0];
            return `<div class="portal" style="max-width:1100px">\n    <div class="page-head"><div><h2>基础信息采集表<em>Applicant Profile</em></h2><p>${n ? "请尽量提供具体经历和真实事例；暂时没有的信息可以留空，后续由顾问补充。内容会自动保存，填好后点击“提交给顾问”。" : `正在编辑 ${a(s.name)} 的采集表。顾问修改会保留记录，不改变学生提交状态。`}</p></div>\n      <div class="page-actions">${Q(pe, d)}${n ? "" : `<button class="btn" data-act="go" data-href="#/student/${e}/profile">${I("back")} 返回学生档案</button>`}</div></div>\n    <div class="notice info" style="margin-bottom:14px">${I("shield")}<div><strong>请勿在本表填写任何平台密码</strong>护照、成绩单等敏感文件请通过机构指定的安全渠道提供，不要使用公开分享链接。</div></div>\n    ${n && "verified" === d ? `<div class="notice" style="margin-bottom:14px">${I("alert")}<div><strong>你的采集表顾问已核对</strong>如需更正，可以直接修改，顾问会收到“有更新”的提示。</div></div>` : ""}\n    ${!n && u && ["updated", "submitted"].includes(d) ? `<div class="notice" style="margin-bottom:14px">${I("clock")}<div><strong>学生最近修改（${m(u.at)}）</strong>${a(u.fields.join("、"))}</div></div>` : ""}\n    <div class="row" style="margin-bottom:14px;gap:6px">${o.map(t => `<button type="button" class="pill ${t.filled ? "ok" : ""}" data-act="intake-jump" data-sec="${t.id}" style="border:0;cursor:pointer">${t.no} ${a(t.title.replace(/^个人陈述素材 · /, ""))}</button>`).join("")}</div>\n    <form id="intakeForm" data-sid="${e}" autocomplete="off">${ve.map(t => {
              let s = "";
              const d = t.fields ? `<div class="form-grid ${t.table ? "mt12" : ""}">${t.fields.map(t => c(t, "p." + t.key, i[t.key])).join("")}</div>` : "";
              if (t.table || (s += d), t.table) {
                const n = t.table;
                let o = (i[n.key] || []).slice();
                for (!o.length && n.defaults && (o = n.defaults.map(t => Object.assign({}, t))); o.length < (n.min || 1);) o.push({});
                s += `<div class="table-wrap" style="border:1px solid var(--line);border-radius:10px"><table class="intake-table"><thead><tr>${n.cols.map(t => `<th>${a(t.label)}</th>`).join("")}<th></th></tr></thead><tbody>\n        ${o.map((t, s) => `<tr>${n.cols.map(e => `<td style="${e.wide ? "min-width:200px" : "min-width:110px"}">${r(`t.${n.key}.${s}.${e.key}`, e, t[e.key])}</td>`).join("")}<td class="actions">${o.length > (n.min || 1) ? `<button type="button" class="btn sm ghost" data-act="intake-row-del" data-sid="${e}" data-table="${n.key}" data-i="${s}" title="删除这一行">${I("close")}</button>` : ""}</td></tr>`).join("")}\n      </tbody></table></div><button type="button" class="btn sm mt8" data-act="intake-row-add" data-sid="${e}" data-table="${n.key}">${I("plus")} ${a(n.add || "添加一行")}</button>${d}`;
              }
              if (t.recommenders) {
                const a = bt.recsOf(e);
                s += (a.length ? a : []).map((s, a) => `<div class="card mt8"><div class="row between"><b class="small" style="color:var(--accent)">推荐人 ${a + 1}</b>${st.where("refRequests", t => t.recommenderId === s.id).length ? '<span class="tiny muted2">已建立推荐信请求，如需删除请联系顾问</span>' : `<button type="button" class="btn sm ghost" data-act="intake-rec-del" data-sid="${e}" data-id="${s.id}">删除</button>`}</div>\n        <input type="hidden" name="r.${a}.id" value="${s.id}"><div class="form-grid mt8">${t.recFields.map(t => c(t, `r.${a}.${t.key}`, s[t.key])).join("")}</div></div>`).join("") || '<div class="small muted2">还没有填写推荐人。</div>', s += `<button type="button" class="btn sm mt8" data-act="intake-rec-add" data-sid="${e}">${I("plus")} 添加推荐人</button>`;
              }
              if (t.checklist) {
                const e = t.checklist,
                  d = i[e.key] || {};
                s += `<div class="table-wrap" style="border:1px solid var(--line);border-radius:10px"><table><thead><tr><th>材料类别</th><th>状态</th>${e.cols.map(t => `<th>${a(t.label)}</th>`).join("")}</tr></thead><tbody>${e.rows.map((t, s) => {
                  const i = d[s] || {};
                  return `<tr><td class="td-main" style="min-width:140px">${a(t)}</td><td style="min-width:210px"><div class="checks">${e.status.map(([t, e]) => `<label><input type="radio" name="c.${s}.status" value="${t}" ${i.status === t ? "checked" : ""}> ${e}</label>`).join("")}</div></td>${e.cols.map(t => `<td style="min-width:130px">${r(`c.${s}.${t.key}`, t, i[t.key])}</td>`).join("")}</tr>`;
                }).join("")}</tbody></table></div>`;
              }
              return t.confirm && (s += `<div class="form-grid"><div class="field full"><label class="row small" style="gap:7px;font-weight:600;color:var(--fg)"><input type="checkbox" name="p.confirmed" ${i.confirmed ? "checked" : ""}> 本人确认已尽可能如实填写以上信息，并理解申请材料仍需按各院校要求进行核对。</label></div>${c({
                label: "学生 / 监护人签名（填写姓名）"
              }, "p.confirmName", i.confirmName)}${c({
                label: "日期",
                type: "date"
              }, "p.confirmDate", i.confirmDate || l())}</div>`), `<section class="panel" id="sec-${t.id}" style="margin-bottom:14px"><div class="panel-head"><div><h3><span class="count">${t.no}</span> ${a(t.title)}</h3>${t.note ? `<p>${a(t.note)}</p>` : ""}</div></div><div class="panel-body">${s}</div></section>`;
            }).join("")}</form>\n    <div class="intake-bar"><span class="small muted" id="intakeSaved">${s.intake?.savedAt ? "已保存 " + m(s.intake.savedAt) : "尚未保存"}</span><span class="spacer"></span>\n      <button class="btn" data-act="intake-save" data-sid="${e}">保存${n ? "草稿" : ""}</button>\n      ${n ? `<button class="btn primary" data-act="intake-submit" data-sid="${e}">${I("send")} ${["submitted", "verified", "updated"].includes(d) ? "保存并通知顾问" : "提交给顾问"}</button>` : ""}</div>\n  </div>`;
          }(le() ? "" : i.a);
          break;
        case "settings":
          d = as(i.a || "users");
          break;
        case "report":
          d = function (t) {
            const e = bt.student(t);
            if (!e || !ce.seeStudent(t) || le()) return Qe("无法生成报告。");
            const s = bt.activeAppsOf(t),
              i = bt.docsOf(t),
              d = s.flatMap(t => Et(t).map(e => Object.assign({
                app: t
              }, e))).filter(t => u(t.date) >= 0).sort((t, e) => $(t.date, e.date));
            return `<div class="row no-print" style="justify-content:space-between;margin-bottom:14px"><button class="btn" data-act="go" data-href="#/student/${t}">${I("back")} 返回学生</button><button class="btn primary" data-act="print">${I("download")} 打印 / 存为 PDF</button></div>\n  <div class="report">\n    <div class="row between"><div><div style="font:italic 15px var(--display);color:var(--focus)">Fantasme · Admissions</div><h1>${a(e.name)} · 申请进度报告</h1><div class="small muted">${a(e.englishName || "")} · ${a(e.season)} · ${"PG" === e.level ? "研究生" : "本科"} · ${a(ot(e.majorId))}</div></div><div class="small muted" style="text-align:right">生成日期 ${p(l())}<br>负责顾问 ${a($t(e.advisorId))}</div></div>\n    <h3>各院校申请进度</h3>\n    <table><thead><tr><th>院校 / 项目</th><th>当前阶段</th><th>申请提交</th><th>考试 / 录像</th><th>录取结果</th></tr></thead><tbody>${s.map(t => `<tr><td><b>${a(ft(t))}</b> ${a(t.program || "")}<div class="td-sub">${a(gt(t))}</div></td><td>${a(Dt(t).label)}</td><td class="small">${St(t).map(t => a(It(t.sub)) + "：" + (jt(t) ? "已提交" + (t.sub.submittedAt ? " " + p(t.sub.submittedAt) : "") : a(X(_, t.sub?.status || "not_started")))).join("<br>") || "—"}</td><td class="small">${bt.roundsOf(t.id).map(t => a(X(L, t.kind)) + "：" + a(X(M(t.kind), t.status)) + (t.date ? " " + p(t.date) : "")).join("<br>") || "—"}</td><td>${a(X(B, t.outcome?.type || "pending"))}${t.outcome?.conditions ? '<div class="td-sub">' + a(t.outcome.conditions) + "</div>" : ""}</td></tr>`).join("")}</tbody></table>\n    <h3>接下来的关键日期</h3>\n    ${d.length ? `<table><thead><tr><th>日期</th><th>院校</th><th>事项</th></tr></thead><tbody>${d.map(t => `<tr><td>${p(t.date)}</td><td>${a(ft(t.app))}</td><td>${a(t.label)}</td></tr>`).join("")}</tbody></table>` : '<p class="small muted">暂无</p>'}\n    <h3>文书进度</h3>\n    <table><thead><tr><th>文书</th><th>用于</th><th>状态</th></tr></thead><tbody>${i.map(t => `<tr><td>${a(t.title)}</td><td class="small">${a(Ut(t))}</td><td>${zt(t) ? "已定稿并提交" : a(X(U, t.status))}</td></tr>`).join("") || '<tr><td colspan="3" class="muted">暂无</td></tr>'}</tbody></table>\n    <p class="tiny muted2" style="margin-top:22px">日期以院校官方通知为准。本报告不含内部备注与账号信息。</p>\n  </div>`;
          }(i.a);
          break;
        case "preview":
          d = !le() && ce.seeStudent(i.a) ? ls(i.a) : Qe("无法预览。");
          break;
        default:
          d = Qe("页面不存在。");
      }
    } catch (t) {
      console.error(t), d = `<div class="notice err">${I("alert")}<div><strong>页面出错</strong>${a(t.message)}</div></div>`;
    }
    const n = ae(),
      o = Fs(),
      r = ["student", "app", "report", "preview"].includes(i.name) || "intake" === i.name && !le() ? "students" : "doc" === i.name ? "docs" : i.name;
    s.innerHTML = `<div class="shell">\n    <aside class="sidebar">\n      <div class="brand"><img src="${e}" alt="Fantasme"><div><div class="brand-title">枫琴申请工作站</div><div class="brand-en">Admissions Workspace</div></div></div>\n      <nav class="nav">${o.map(([t, e, s, i]) => `<button class="nav-btn ${r === t ? "active" : ""}" data-act="go" data-href="#/${t}">${I(e)}${a(s)}${i ? `<span class="nav-count ${i.hot ? "hot" : ""}">${i.n}</span>` : ""}</button>`).join("")}</nav>\n      <div class="side-bottom">\n        <div class="me">${Ve(n.name)}<div><b>${a(n.name)}</b><span>${A[n.role].label}</span></div><span class="spacer"></span><button class="btn icon ghost" data-act="logout" title="退出登录">${I("logout")}</button></div>\n        ${t ? `<button class="btn sm" data-act="pw-change">${I("shield")} 修改密码</button><div class="tiny muted2"><span id="syncState">已保存到服务器</span> · ${j}${le() ? "" : ' · <a href="/__portal" style="color:inherit">枫琴官网</a>'}</div>` : `<div class="tiny muted2">${j} · 数据暂存本浏览器</div>`}\n      </div>\n    </aside>\n    <main class="main">\n      <header class="topbar"><div class="row" style="gap:10px;min-width:0"><button class="btn icon mobile-toggle" data-act="toggle-nav" aria-label="菜单">☰</button><div class="crumbs">${function (t) {
      const e = [],
        s = (t, e) => `<button data-act="go" data-href="${t}">${a(e)}</button>`,
        i = I("arrow").replace("ui-icon", 'ui-icon" style="width:11px;height:11px;opacity:.5');
      if ("student" === t.name) {
        const i = bt.student(t.a);
        e.push(s("#/students", de() ? "学生" : "我的学生"), `<span class="cur">${a(i?.name || "")}</span>`);
      } else if ("app" === t.name) {
        const i = bt.app(t.a),
          d = i && bt.student(i.studentId);
        e.push(s("#/students", "学生"), s("#/student/" + d?.id, d?.name || ""), `<span class="cur">${a(yt(i))}</span>`);
      } else if ("doc" === t.name) {
        const i = bt.doc(t.a),
          d = i && bt.student(i.studentId);
        le() ? e.push(s("#/home", "我的申请"), `<span class="cur">${a(i?.title || "")}</span>`) : e.push(s("#/docs", "文书"), s("#/student/" + d?.id + "/docs", d?.name || ""), `<span class="cur">${a(i?.title || "")}</span>`);
      } else if ("report" === t.name) {
        const a = bt.student(t.a);
        e.push(s("#/student/" + t.a, a?.name || ""), '<span class="cur">进度报告</span>');
      } else if ("intake" === t.name && t.a) {
        const a = bt.student(t.a);
        e.push(s("#/student/" + t.a + "/profile", a?.name || ""), '<span class="cur">采集表</span>');
      } else if ("preview" === t.name) {
        const a = bt.student(t.a);
        e.push(s("#/student/" + t.a, a?.name || ""), '<span class="cur">学生视角预览</span>');
      } else {
        const s = Fs().find(e => e[0] === t.name);
        e.push(`<span class="cur">${a(s ? s[2] : "")}</span>`);
      }
      return e.join(i);
    }(i)}</div></div>\n        <div class="top-actions">${re() ? '<input class="input" placeholder="搜索学生 / 院校，回车" data-act="global-search">' : ""}${t ? "" : `<label class="demo-switch" title="阶段一演示：切换身份查看不同角色的界面"><span>演示身份</span><select data-act="switch-user">${["supervisor", "advisor", "writer", "student"].map(t => `<optgroup label="${A[t].label}">${st.where("users", e => e.role === t && e.active).map(t => `<option value="${t.id}" ${t.id === ae().id ? "selected" : ""}>${a(t.name)}</option>`).join("")}</optgroup>`).join("")}</select></label>`}</div></header>\n      <div class="content">${d}</div>\n    </main></div>`, document.body.classList.remove("nav-open");
  }
  function Us() {
    return `<div class="login"><div class="login-card">\n    <div class="brand"><img src="${e}" alt="Fantasme"><div><div class="brand-title">枫琴申请工作站</div><div class="brand-en">Admissions Workspace</div></div></div>\n    <form id="loginForm" class="stack tight">\n      ${Le("username", "登录名", "", "text", {
      placeholder: "如 wang"
    })}\n      ${Le("password", "密码", "", "password", {
      hint: "阶段一预览不校验密码；阶段二接入服务器后启用"
    })}\n      <button class="btn primary" type="submit" style="padding:10px">登录</button>\n    </form>\n    <div class="mt16"><div class="tiny muted2">演示账号（点击直接登录）</div><div class="demo-accounts">${["supervisor", "advisor", "writer", "student"].flatMap(t => st.where("users", e => e.role === t && e.active).map(e => `<button data-act="login-as" data-id="${e.id}"><b>${a(e.name)}</b><span>${A[t].label} · ${a(e.username)}</span></button>`)).join("")}</div></div>\n  </div></div>`;
  }
  Object.assign(ms, {
    "intake-save"(t) {
      Es(t.dataset.sid);
    },
    "intake-submit"(t) {
      Es(t.dataset.sid, {
        submit: !0
      }) && Vs();
    },
    "intake-jump"(t) {
      document.getElementById("sec-" + t.dataset.sec)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    },
    "intake-row-add"(t) {
      const e = t.dataset.sid;
      Es(e, {
        quiet: !0
      });
      const s = bt.student(e);
      (s.profile[t.dataset.table] ||= []).push({}), st.put("students", s), Bs(Vs);
    },
    "intake-row-del"(t) {
      const e = t.dataset.sid;
      Es(e, {
        quiet: !0
      });
      const s = bt.student(e);
      s.profile[t.dataset.table].splice(Number(t.dataset.i), 1), st.put("students", s), Bs(Vs);
    },
    "intake-rec-add"(t) {
      const e = t.dataset.sid;
      Es(e, {
        quiet: !0
      }), st.put("recommenders", (t => ({
        id: i("rc"),
        studentId: t,
        name: "",
        title: "",
        phone: "",
        email: "",
        address: "",
        course: "",
        duration: "",
        relation: "",
        bio: "",
        note: "",
        fromIntake: !0
      }))(e)), Bs(Vs);
    },
    "intake-rec-del"(t) {
      if (Es(t.dataset.sid, {
        quiet: !0
      }), st.where("refRequests", e => e.recommenderId === t.dataset.id).length) return Ae("该推荐人已有推荐信请求，请联系顾问处理", {
        error: !0
      });
      st.remove("recommenders", t.dataset.id), Bs(Vs);
    },
    "intake-verify"(t) {
      const e = bt.student(t.dataset.sid);
      if (!rs(e && ce.manage(e.id))) return;
      const s = $e(e);
      De(`确认已核对 ${a(e.name)} 的采集表？${s.length ? `<br><span style="color:var(--warn)">仍有未填写项：${a(s.join("、"))}</span>` : ""}`, () => {
        Object.assign(e.intake, {
          status: "verified",
          verifiedAt: d(),
          verifiedBy: ae().id,
          changes: []
        }), st.put("students", e), Jt(e.id, null, "顾问已核对基础信息采集表", !0), Vs();
      }, {
        yes: "已核对"
      });
    },
    "intake-remind"(t) {
      const e = bt.student(t.dataset.sid);
      rs(e && ce.manage(e.id)) && (Jt(e.id, null, "请登录后在“基础信息”中完成采集表填写", !0), Ae(`已在 ${e.name} 的学生页面显示提醒`));
    },
    "intake-essays"(t) {
      const e = bt.student(t.dataset.sid);
      Oe({
        title: e.name + " · 文书素材",
        sub: "来自学生的基础信息采集表",
        wide: !0,
        cancelLabel: "关闭",
        body: Ts(e) + `<div class="grid cols-2"><div><b class="small" style="color:var(--accent)">活动与比赛</b><div class="mt8">${Ms(ve.find(t => "s5" === t.id).table.cols, e.profile?.activities)}</div></div><div><b class="small" style="color:var(--accent)">奖项与荣誉</b><div class="mt8">${Ms(ve.find(t => "s6" === t.id).table.cols, e.profile?.awards)}</div></div></div>`
      });
    },
    "accounts-edit"(t) {
      const e = bt.student(t.dataset.id);
      rs(e && ce.manage(e.id)) && Oe({
        title: "申请平台账号",
        sub: "仅团队可见；请勿填写密码",
        body: Le("accounts", "每行一个：平台 | 登录账号 | 密码保管位置", (e.profile.accounts || []).map(t => [t.platform, t.login, t.note].join(" | ")).join("\n"), "textarea", {
          full: !0,
          rows: 5
        }),
        onSubmit: t => {
          if (/password|密码\s*[:：]/i.test(t.accounts)) return Ae("请不要在系统中记录密码", {
            error: !0
          }), !1;
          e.profile.accounts = String(t.accounts || "").split("\n").map(t => t.split("|").map(t => t.trim())).filter(t => t[0]).map(t => ({
            platform: t[0],
            login: t[1] || "",
            note: t[2] || ""
          })), st.put("students", e), Vs();
        }
      });
    }
  }), document.addEventListener("input", t => {
    const e = t.target.closest("#intakeForm");
    if (!e) return;
    const s = document.querySelector(`[data-count-for="${CSS.escape(t.target.name)}"]`);
    s && (s.textContent = `已写 ${t.target.value.length} 字 · 建议不少于 ${t.target.dataset.min} 字`);
    const a = document.getElementById("intakeSaved");
    a && (a.textContent = "正在输入…"), clearTimeout(Ns), Ns = setTimeout(() => Es(e.dataset.sid, {
      quiet: !0
    }), 1500);
  }), document.addEventListener("change", t => {
    const e = t.target.closest("#intakeForm");
    !e || "radio" !== t.target.type && "checkbox" !== t.target.type && "SELECT" !== t.target.tagName || (clearTimeout(Ns), Es(e.dataset.sid, {
      quiet: !0
    }));
  });
  const zs = {
    go: t => Rs(t.dataset.href),
    "student-tab": t => Rs(`#/student/${t.dataset.sid}/${t.dataset.tab}`),
    "app-tab": t => Rs(`#/app/${t.dataset.id}/${t.dataset.tab}`),
    "settings-tab": t => Rs(`#/settings/${t.dataset.tab}`),
    "modal-close": () => Ce(),
    "modal-bg": (t, e) => {
      e.target === t && Ce();
    },
    print: () => window.print(),
    logout: () => {
      t ? st.flush().finally(() => ge.call("POST", "/logout").finally(() => {
        location.href = "/login";
      })) : (se.logout(), location.hash = "#/home", Vs());
    },
    "pw-change": () => Oe({
      title: "修改密码",
      sub: "至少 8 位，需同时包含字母和数字；修改后其他设备上的登录会失效",
      body: `<div class="form-grid">${Le("old", "当前密码", "", "password", {
        required: !0,
        full: !0
      })}${Le("new", "新密码", "", "password", {
        required: !0
      })}${Le("new2", "再次输入新密码", "", "password", {
        required: !0
      })}</div>`,
      submitLabel: "保存",
      onSubmit: (t, e) => (je(e, () => Ce()), !1)
    }),
    "pw-copy": () => {
      const t = document.getElementById("pwText");
      t.select(), (navigator.clipboard?.writeText(t.value) || Promise.reject()).then(() => Ae("已复制"), () => Ae("请手动复制", {
        error: !0
      }));
    },
    "login-as": t => {
      se.login(t.dataset.id), location.hash = "#/home", Vs();
    },
    "toggle-nav": () => document.body.classList.toggle("nav-open")
  };
  document.addEventListener("click", t => {
    document.querySelectorAll("details.menu-wrap[open]").forEach(e => {
      e.contains(t.target) || e.removeAttribute("open");
    });
    const e = t.target.closest("[data-act]");
    if (!e) return;
    if ("modal-bg" === e.dataset.act) return void (t.target === e && Ce());
    if ("SELECT" === e.tagName || "INPUT" === e.tagName) return;
    const s = t.target.closest("a[href]");
    if (s && s !== e && e.contains(s)) return;
    const a = e.dataset.act,
      i = zs[a] || ms[a];
    if (i) {
      e.closest("details.menu-wrap") && e.closest("details.menu-wrap").removeAttribute("open"), t.preventDefault();
      try {
        i(e, t);
      } catch (t) {
        console.error(t), Ae(t.message || String(t), {
          error: !0
        });
      }
    }
  }), document.addEventListener("change", t => {
    const e = t.target,
      s = e.dataset.act;
    if (s) try {
      if ("switch-user" === s) return se.login(e.value), Ae("已切换为 " + ae().name + "（" + A[ae().role].label + "）"), void Rs("#/home");
      if ("task-status" === s) {
        const t = st.get("tasks", e.dataset.id);
        return rs(t && ce.taskStatus(t)) ? void Ss(t, e.value) : Vs();
      }
      if ("round-status" === s) {
        const t = st.get("rounds", e.dataset.id);
        if (!rs(t && ce.manage(t.studentId))) return Vs();
        const s = Ft.round(t, e.value);
        return s ? (Ae(s, {
          error: !0
        }), Vs()) : (st.patch("rounds", t.id, {
          status: e.value
        }), Yt(t), Jt(t.studentId, t.applicationId, `${ft(bt.app(t.applicationId))} ${X(L, t.kind)}：${X(M(t.kind), e.value)}`, !0), void Vs());
      }
      if ("ref-status" === s) {
        const t = st.get("refRequests", e.dataset.id);
        return rs(t && ce.manage(t.studentId)) ? (st.patch("refRequests", t.id, {
          status: e.value,
          invitedAt: t.invitedAt || ("not_invited" !== e.value ? l() : "")
        }), void Vs()) : Vs();
      }
      if ("filter" === s) {
        if ("INPUT" === e.tagName) return;
        return Gs(e), void Vs();
      }
      if ("doc-mine" === s) return ts.mine = e.checked, void Vs();
      if ("app-school-change" === s) {
        const t = e.form,
          s = e.value,
          i = dt(s);
        if (i && ke(s) && (document.getElementById("roundHint").textContent = "正在加载院校要求…", Ie(s).then(() => {
          e.isConnected && e.dispatchEvent(new Event("change", {
            bubbles: !0
          }));
        })), t.elements.schoolName.closest(".field").style.display = "__custom" === s ? "" : "none", i) {
          const e = function (t, e) {
            const s = (dt(t)?.system || "").toLowerCase();
            return s.includes("ucas conservatoires") ? "ucas_conservatoires" : s.includes("ucas") ? "ucas_ug" : s.includes("common app") ? "common_app" : (s.includes("直申") || s.includes("direct") || s.includes("portal"), "school_portal");
          }(s);
          t.elements.platform.value = e, document.getElementById("platHint").textContent = `院校库：${i.system}` + (C[e].shared ? " · 共用平台会并入该学生已有的提交记录" : "");
          const d = {
              schoolId: s,
              level: t.elements.level.value,
              majorId: t.elements.majorId.value
            },
            n = mt(d);
          document.getElementById("dlHint").innerHTML = n.map(t => `${t.d ? p(t.d) : "未公布"}${t.p ? " · " + a(t.p) : ""}`).join("<br>") + '<div class="tiny muted2">将作为“待核实”预填</div>';
          const o = f(pt(d).filter(t => "audition" === t.cat || "portfolio" === t.cat).flatMap(t => (t.stages || []).map(t => t.t || rt(t.k)))),
            l = i.notOffered || {},
            r = Object.keys(l).find(t => {
              const [e, s] = t.split(":");
              return ("ALL" === e || e === d.level) && (s === d.majorId || s && "@" === s[0] && ct([s], d.majorId));
            });
          document.getElementById("roundHint").innerHTML = (r ? `<span style="color:var(--err)">注意：${a(l[r])}</span><br>` : "") + (o.length ? "院校库中的考试路径：" + a(o.join(" / ")) : "院校库没有该专业的考试路径，请手动选择。");
        }
        return;
      }
      if ("round-kind-change" === s) {
        const t = e.form.elements.status,
          s = M(e.value);
        return void (t.innerHTML = Object.keys(s).map(t => `<option value="${t}">${s[t][0]}</option>`).join(""));
      }
      if ("task-student-change" === s) {
        e.form.elements.applicationId.innerHTML = [["", "学生通用（不属于某所院校）"]].concat(bt.activeAppsOf(e.value).map(t => [t.id, yt(t)])).map(([t, e]) => `<option value="${t}">${a(e)}</option>`).join("");
        const t = document.querySelector("#linkField > div");
        t && (t.innerHTML = ws(e.value, []));
        const s = document.querySelector("#depField .checks");
        return void (s && (s.innerHTML = Is(e.value, "").map(([t, e]) => `<label><input type="checkbox" name="dependsOn" value="${t}"> ${a(e)}</label>`).join("") || '<span class="muted2 small">暂无可选项</span>'));
      }
      if ("ver-mode" === s) return document.getElementById("verText").hidden = "text" !== e.value, document.getElementById("verFile").hidden = "file" !== e.value, void (document.getElementById("verUpload").hidden = "upload" !== e.value);
      if ("doc-student-change" === s) {
        const t = bt.student(e.value);
        return document.getElementById("docFormBody").innerHTML = window.__docFormBody(e.value), void (document.getElementById("modalForm").elements.writerId.value = (t.writerIds || [])[0] || "");
      }
    } catch (t) {
      console.error(t), Ae(t.message || String(t), {
        error: !0
      });
    }
  }), document.addEventListener("change", t => {
    if ("type" === t.target.name && t.target.closest("#docFormBody")) {
      const e = document.getElementById("docTypeHint");
      e && (e.textContent = F[t.target.value]?.hint || "");
    }
  });
  let Hs = null;
  function Gs(t) {
    const e = {
      list: Ke,
      doc: ts,
      file: es,
      task: ss
    }[t.dataset.scope];
    e && (e[t.dataset.key] = t.value);
  }
  document.addEventListener("input", t => {
    const e = t.target;
    if ("verTextArea" === e.id) {
      const t = w(e.value),
        s = document.getElementById("verCount");
      s.textContent = `${t} / ${x} words${t > x ? " · 超出上限" : ""}`, s.classList.toggle("over", t > x);
    }
    "filter" === e.dataset.act && "INPUT" === e.tagName && (clearTimeout(Hs), Hs = setTimeout(() => {
      Gs(e), Vs(), function (t) {
        if ("INPUT" !== t.tagName) return;
        const e = document.querySelector(`[data-act="filter"][data-scope="${t.dataset.scope}"][data-key="${t.dataset.key}"]`);
        if (e) {
          e.focus();
          const t = e.value;
          e.setSelectionRange(t.length, t.length);
        }
      }(e);
    }, 220));
  }), document.addEventListener("keydown", t => {
    "Escape" === t.key && document.getElementById("modal").innerHTML && Ce(), "Enter" === t.key && "global-search" === t.target.dataset?.act && (Ke.q = t.target.value.trim(), Ke.status = "all", Rs("#/students"));
  }), document.addEventListener("submit", t => {
    if ("intakeForm" !== t.target.id) {
      if ("pwForm" === t.target.id) return t.preventDefault(), void je(t.target, () => location.reload());
      if ("loginForm" === t.target.id) {
        t.preventDefault();
        const e = t.target.elements.username.value.trim(),
          s = st.where("users", t => t.username === e && t.active)[0];
        if (!s) return Ae("登录名不存在或账号已停用", {
          error: !0
        });
        se.login(s.id), location.hash = "#/home", Vs();
      }
    } else t.preventDefault();
  }), window.addEventListener("hashchange", () => {
    const e = document.getElementById("intakeForm");
    e && (clearTimeout(Ns), Es(e.dataset.sid, {
      quiet: !0
    })), Ce(), Vs(), window.scrollTo(0, 0), t && Date.now() - st.lastLoad > 2e4 && st.refresh();
  }), async function () {
    if (!t) return st.load(), se.restore(), void Vs();
    document.getElementById("app").innerHTML = '<div class="login"><div class="small muted">正在加载…</div></div>';
    try {
      await st.load();
    } catch (t) {
      if (t.data?.mustChange) {
        const t = await ge.call("GET", "/me");
        return se.user = t.me, void Vs();
      }
      return void (document.getElementById("app").innerHTML = `<div class="login"><div class="notice err">${I("alert")}<div><strong>无法加载数据</strong>${a(t.message)}</div></div></div>`);
    }
    Vs();
  }();
  const Js = ["核对要求", "准备材料", "提交申请", "考试 / 面试", "录取结果", "最终决定"];
  let Ys = "undefined" != typeof DIY_TPL_SEED ? DIY_TPL_SEED : [],
    Ks = 0;
  const Zs = t && document.body && "1" === document.body.dataset.diy,
    Ws = {
      todo: "待开始",
      doing: "进行中",
      done: "已完成"
    },
    Xs = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    Qs = () => `<span class="diy-lockico">${Xs}</span>`;
  !function () {
    const t = document.createElement("style");
    t.textContent = "\n.diy-ph{display:inline-block;height:9px;border-radius:4px;background:#CFC8D8}\n.diy-shot{display:block;width:100%;margin-top:14px;padding:0;border:0;border-radius:10px;overflow:hidden;background:#fff;cursor:zoom-in;box-shadow:0 8px 24px rgba(0,0,0,.25)}\n.diy-shot img{display:block;width:100%;height:auto}\n.diy-promo .cap{font-size:11.5px;opacity:.75;margin-top:8px}\n.diy-seg{display:flex;gap:4px;background:#F1EEF4;border-radius:10px;padding:4px;margin-bottom:12px}\n.diy-seg button{flex:1;border:0;background:transparent;border-radius:8px;padding:8px;font:inherit;font-size:13px;color:var(--muted);cursor:pointer}\n.diy-seg button.on{background:#fff;color:var(--accent);font-weight:800;box-shadow:0 1px 2px rgba(0,0,0,.06)}\n.nav-sec{margin:14px 10px 4px;font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--focus)}\n.nav-btn.diy-locked{color:#9A93A6}\n.diy-lockico{display:inline-flex;margin-left:auto;opacity:.75}.diy-lockico .ui-icon{width:13px;height:13px}\n.nav-btn.diy-service{background:#F6EEF7;color:var(--focus);font-weight:800;margin-top:8px}\n.diy-badge{display:inline-block;font-size:11px;font-weight:800;color:var(--focus);background:#F6EEF7;border-radius:99px;padding:2px 9px;vertical-align:middle}\n.diy-blur{filter:blur(2.5px);opacity:.5;pointer-events:none;user-select:none}\n.diy-cover{position:relative}\n.diy-cover>.diy-cover-msg{position:absolute;inset:0;display:grid;place-items:center}\n.diy-cover-msg>div{background:#fff;border:1px solid #E3D3EC;border-radius:12px;padding:10px 16px;font-size:12.5px;text-align:center;box-shadow:0 6px 18px rgba(59,42,94,.12)}\n.diy-promo{background:var(--accent);color:#fff;border-radius:14px;padding:16px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}\n.diy-promo b{font-size:16px}.diy-promo p{margin:6px 0 0;font-size:12px;opacity:.85;line-height:1.7}\n.diy-qr{width:96px;height:96px;flex:none;border-radius:8px;background:#fff;border:1px dashed #B9AECB;display:grid;place-items:center;font-size:11px;color:var(--muted);text-align:center;overflow:hidden}\n.diy-qr img{width:100%;height:100%;object-fit:contain}\n.diy-qr.lg{width:132px;height:132px}\n.diy-stage{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}\n.diy-stage button{border:1px solid var(--line);background:#F7F5F9;border-radius:10px;padding:10px 4px;font:inherit;font-size:12.5px;color:var(--muted);cursor:pointer}\n.diy-stage button.done{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.diy-pick{display:flex;gap:10px;align-items:center;width:100%;text-align:left;border:1.5px solid var(--line);background:#fff;border-radius:11px;padding:10px 12px;font:inherit;cursor:pointer;margin-top:7px}\n.diy-pick.locked{background:#F6F4F8;color:#8A8394}\n.diy-pick.sel{border-color:var(--focus);box-shadow:0 0 0 3px rgba(142,47,140,.1)}\n.diy-pick .abbr{width:34px;height:34px;border-radius:9px;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:800;flex:none}\n.diy-pick.locked .abbr{background:#D9D4E0;color:#6B6476}\n.diy-tpl{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}\n.diy-tpl button{border:1px solid var(--line2);background:#fff;border-radius:10px;padding:9px 11px;font:inherit;font-size:12.5px;text-align:left;cursor:pointer;display:flex;gap:6px;align-items:center}\n.diy-tpl button.locked{background:#F6F4F8;color:#8A8394;border-color:#E6E2EA}\n.diy-modal-grid{display:flex;flex-wrap:wrap;gap:18px}\n.diy-modal-grid>.l{flex:3 1 320px;min-width:0;background:#F3F1F6;border-radius:12px;padding:14px}\n.diy-modal-grid>.r{flex:2 1 240px;min-width:0}\n.diy-check{display:flex;gap:8px;font-size:13px;line-height:1.6;margin-top:6px}.diy-check b{color:var(--ok)}\n.diy-req{font-size:12.5px;line-height:1.7}.diy-req h4{margin:12px 0 4px;font-size:12.5px;color:var(--accent)}\n.diy-kv{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #F1EEF4;font-size:13px}.diy-kv span{color:var(--muted)}.diy-kv b{text-align:right}\n.diy-grants{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:4px 12px}\n@media print{.sidebar,.topbar,.diy-noprint{display:none!important}.main{margin:0!important}}\n", document.head.appendChild(t);
  }();
  const ta = et + "diy",
    ea = {
      d: null,
      load() {
        try {
          this.d = JSON.parse(localStorage.getItem(ta) || "null");
        } catch (t) {
          this.d = null;
        }
        this.d || (this.d = function () {
          const t = la(),
            e = l(),
            s = {
              id: "diy-1",
              phone: "13800006621",
              pw: ra("Diy2026a"),
              name: "林小雨",
              level: "PG",
              majorId: "piano",
              season: "2027 Fall",
              currentSchool: "某音乐学院 · 钢琴（大四）",
              countries: "英国、美国",
              lang: "",
              active: !0,
              createdAt: c(e, -8) + "T10:00:00Z",
              lastLogin: d(),
              grants: {
                schools: [],
                templates: [],
                report: !1,
                all: !1
              },
              requests: []
            },
            a = {
              id: "diy-2",
              phone: "13900000213",
              pw: ra("Diy2026a"),
              name: "陈一凡",
              level: "UG",
              majorId: "songwriting",
              season: "2027 Fall",
              currentSchool: "",
              countries: "英国",
              lang: "IELTS 6.5",
              active: !0,
              createdAt: c(e, -2) + "T09:00:00Z",
              lastLogin: c(e, -1) + "T09:00:00Z",
              grants: {
                schools: [],
                templates: [],
                report: !1,
                all: !1
              },
              requests: []
            },
            i = {
              config: t,
              accounts: [s, a],
              apps: [],
              tasks: [],
              docs: [],
              mats: []
            },
            n = (it().schools || []).find(e => e.id === t.freeSchools[0]),
            o = (it().schools || []).find(e => !t.freeSchools.includes(e.id));
          if (n) {
            const t = (mt({
              schoolId: n.id,
              level: "PG",
              majorId: "piano"
            })[0] || {}).d || c(e, 40);
            i.apps.push({
              id: "dapp-1",
              acct: "diy-1",
              schoolId: n.id,
              name: n.en,
              program: "Piano",
              system: n.system || "",
              deadline: t,
              stage: 1,
              createdAt: d()
            }), i.tasks.push({
              id: "dtask-1",
              acct: "diy-1",
              appId: "dapp-1",
              title: "确定本校曲目 / 作品",
              due: c(e, 6),
              status: "doing",
              src: "院校要求生成"
            }), i.tasks.push({
              id: "dtask-2",
              acct: "diy-1",
              appId: "dapp-1",
              title: "录制预录像",
              due: c(e, 20),
              status: "todo",
              src: "院校要求生成"
            });
          }
          return o && i.apps.push({
            id: "dapp-2",
            acct: "diy-1",
            schoolId: "",
            name: o.en,
            program: "Piano",
            system: "",
            deadline: "",
            stage: 0,
            createdAt: d()
          }), i.tasks.push({
            id: "dtask-3",
            acct: "diy-1",
            appId: "",
            title: "完成个人陈述初稿",
            due: c(e, 12),
            status: "todo",
            src: "手动"
          }), i.tasks.push({
            id: "dtask-4",
            acct: "diy-1",
            appId: "",
            title: "托福考试报名",
            due: c(e, -2),
            status: "todo",
            src: "手动"
          }), i.docs.push({
            id: "ddoc-1",
            acct: "diy-1",
            title: "个人陈述（通用版）",
            link: "",
            text: "Music has been my language since I was six…",
            updatedAt: d()
          }), i.mats.push({
            id: "dmat-1",
            acct: "diy-1",
            title: "护照扫描件",
            link: "",
            status: "done",
            note: ""
          }, {
            id: "dmat-2",
            acct: "diy-1",
            title: "本科成绩单（中英文）",
            link: "",
            status: "doing",
            note: ""
          }), o && s.requests.push({
            id: "req-1",
            kind: "school",
            ref: o.id,
            at: c(e, -1) + "T12:00:00Z",
            done: !1
          }), i;
        }(), this.save());
        for (const t of ["accounts", "apps", "tasks", "docs", "mats"]) this.d[t] ||= [];
        this.d.config ||= la();
      },
      save() {
        if (!t) try {
          localStorage.setItem(ta, JSON.stringify(this.d));
        } catch (t) {
          Ae("浏览器存储写入失败：" + t.message, {
            error: !0
          });
        }
      },
      get cfg() {
        return this.d.config;
      },
      acct(t) {
        return this.d.accounts.find(e => e.id === t) || null;
      },
      of(t, e) {
        return this.d[t].filter(t => t.acct === e);
      },
      put(t, e) {
        const s = this.d[t];
        e.id ||= i(t.slice(0, 3)), e.updatedAt = d();
        const a = s.findIndex(t => t.id === e.id);
        return a >= 0 ? s[a] = e : (e.createdAt ||= d(), s.push(e)), this.save(), Zs && aa("PUT", `/diy/t/${t}/${encodeURIComponent(e.id)}`, e), e;
      },
      remove(t, e) {
        this.d[t] = this.d[t].filter(t => t.id !== e), this.save(), Zs && aa("DELETE", `/diy/t/${t}/${encodeURIComponent(e)}`);
      }
    };
  let sa = Promise.resolve();
  function aa(t, e, s) {
    sa = sa.then(() => ge.call(t, e, s)).catch(t => {
      Ae("保存失败：" + t.message, {
        error: !0,
        ms: 7e3
      }), ia();
    });
  }
  async function ia() {
    try {
      const t = await ge.call("GET", "/diy/bootstrap");
      ea.d = {
        config: t.config,
        accounts: [t.me],
        apps: t.data.apps,
        tasks: t.data.tasks,
        docs: t.data.docs,
        mats: t.data.mats
      }, ea.reqdb = t.reqdb, Ys = t.templates || [], Ks = t.lockedTemplates || 0, va.id = t.me.id, Vs(), t.me.mustChange && setTimeout(() => ms["diy-pw"](), 50);
    } catch (t) {
      document.getElementById("app").innerHTML = `<div class="login"><div class="notice err">${I("alert")}<div><strong>无法加载数据</strong>${a(t.message)}</div></div></div>`;
    }
  }
  let da = null,
    daAt = 0;
  function na() {
    return t ? (da ||= ge.call("GET", "/diy-admin/state").then(t => {
      ea.d = {
        config: t.config,
        accounts: t.accounts,
        apps: t.data.apps,
        tasks: t.data.tasks,
        docs: [],
        mats: []
      }, Ys = t.templates || [];
    }).catch(t => Ae("DIY 数据加载失败：" + t.message, {
      error: !0
    })).finally(() => {
      da = null, daAt = Date.now();
    }), da) : Promise.resolve();
  }
  const oa = t => na().then(() => {
    t && Ae(t), Vs();
  });
  function la() {
    return {
      qr: "",
      freeSchools: (it().schools || []).slice().sort((t, e) => (t.order || 0) - (e.order || 0)).slice(0, 3).map(t => t.id),
      freeTemplates: ["dt-ps", "dt-ref", "dt-submit"],
      openRegister: !0,
      serviceTitle: "枫琴英美音乐留学申请服务",
      serviceText: "专属顾问 + 文书老师全程陪跑：选校定位、文书逐稿修改、曲目与录像指导、面试辅导。"
    };
  }
  const ra = t => {
      let e = 5381;
      for (const s of String(t)) e = (e << 5) + e + s.charCodeAt(0) | 0;
      return "h" + (e >>> 0).toString(36);
    },
    ca = () => (it().schools || []).slice().sort((t, e) => (t.order || 0) - (e.order || 0)),
    ua = {
      school: (t, e) => Zs ? !(!e || !dt(e)?.open) : !!e && (t.grants.all || ea.cfg.freeSchools.includes(e) || t.grants.schools.includes(e)),
      template: (t, e) => Zs ? Ys.some(t => t.id === e) : t.grants.all || ea.cfg.freeTemplates.includes(e) || t.grants.templates.includes(e),
      report: t => t.grants.all || t.grants.report,
      openSchools: t => ca().filter(e => ua.school(t, e.id))
    },
    pa = t => (t.requests || []).filter(t => !t.done),
    ma = et + "diy-session",
    va = {
      id: null,
      get acct() {
        return this.id ? ea.acct(this.id) : null;
      },
      restore() {
        try {
          this.id = localStorage.getItem(ma) || null;
        } catch (t) {}
        const t = this.acct;
        t && t.active || (this.id = null);
      },
      login(t) {
        this.id = t;
        try {
          localStorage.setItem(ma, t);
        } catch (t) {}
        const e = this.acct;
        e && (e.lastLogin = d(), ea.save());
      },
      logout() {
        this.id = null;
        try {
          localStorage.removeItem(ma);
        } catch (t) {}
      }
    },
    ha = () => va.acct;
  function ba(t = "") {
    const e = ea.cfg.qr;
    return `<div class="diy-qr ${t}">${e ? `<img src="${a(e)}" alt="枫琴顾问二维码">` : "顾问二维码<br>（主管后台上传）"}</div>`;
  }
  function $a(t) {
    return t ? t.name + (t.program ? " · " + t.program : "") : "所有院校共用";
  }
  function fa(t, e) {
    return e && e.schoolId && ua.school(t, e.schoolId) ? pt({
      schoolId: e.schoolId,
      level: t.level,
      majorId: t.majorId
    }) : [];
  }
  function ga(t) {
    const e = [],
      s = ea.of("apps", t.id),
      a = ea.of("tasks", t.id).filter(t => "done" !== t.status);
    for (const t of a) t.due && u(t.due) < 0 && e.push({
      level: "err",
      text: `任务已逾期：${t.title}`,
      meta: $a(ea.d.apps.find(e => e.id === t.appId)) + " · " + p(t.due),
      href: "#/tasks"
    });
    for (const t of s) {
      const s = u(t.deadline);
      t.deadline ? s < 0 && t.stage < 2 ? e.push({
        level: "err",
        text: `${t.name} 已过截止日期，仍未提交`,
        meta: "截止 " + p(t.deadline),
        href: "#/app/" + t.id
      }) : s <= 30 && t.stage < 2 && e.push({
        level: "warn",
        text: `距 ${t.name} 截止还有 ${s} 天，尚未提交`,
        meta: "截止 " + p(t.deadline),
        href: "#/app/" + t.id
      }) : e.push({
        level: "info",
        text: `${t.name} 截止日期未填写`,
        meta: "在院校详情中补充",
        href: "#/app/" + t.id
      });
    }
    !t.lang && s.length && e.push({
      level: "warn",
      text: "语言成绩未登记",
      meta: "在「我的资料」中填写",
      href: "#/profile"
    });
    const i = {
      err: 0,
      warn: 1,
      info: 2
    };
    return e.sort((t, e) => i[t.level] - i[e.level]);
  }
  const ya = t => `<div class="item click" data-act="go" data-href="${t.href}"><div class="mark ${"info" === t.level ? "" : t.level}">${I("err" === t.level ? "alert" : "warn" === t.level ? "clock" : "flag")}</div><div class="main"><div class="title">${a(t.text)}</div><div class="meta">${a(t.meta)}</div></div></div>`;
  function ka() {
    const s = ha(),
      i = Ps(),
      d = document.getElementById("app");
    let n = "";
    try {
      switch (i.name) {
        case "home":
        default:
          n = Ia(s);
          break;
        case "apps":
          n = function (t) {
            const e = ea.of("apps", t.id).sort((t, e) => $(t.deadline, e.deadline)),
              s = e.map(e => {
                const s = ua.school(t, e.schoolId),
                  i = ea.of("tasks", t.id).filter(t => t.appId === e.id),
                  d = i.filter(t => "done" === t.status).length,
                  n = s ? fa(t, e).find(t => "english" === t.cat) : null;
                return `<tr class="click" data-act="go" data-href="#/app/${e.id}"><td><div class="td-main">${a(e.name)}</div><div class="td-sub">${a(e.program || "")}</div></td><td>${a(e.system || "—")}</td><td><span class="pill info">${Js[e.stage || 0]}</span></td><td>${b(e.deadline, 14)}</td><td>${d} / ${i.length}</td>\n      <td>${s ? n ? t.lang ? `<span class="small">${a(t.lang)}</span>` : '<span class="pill warn">未登记</span>' : '<span class="muted2">—</span>' : `<span class="muted2" title="开通院校库后自动核对">${Xs.replace("ui-icon", 'ui-icon" style="width:13px;height:13px')}</span>`}</td>\n      <td>${s ? '<span class="pill ok">院校库</span>' : '<span class="pill plain">手动添加</span>'}</td></tr>`;
              }).join("");
            return `<div class="page-head"><div><h2>我的申请<em>Applications</em></h2><p>${e.length} 个申请 · ${a(t.season || "")} · ${a(wa(t.level))} · ${a(ot(t.majorId))}</p></div><div class="page-actions"><button class="btn primary" data-act="diy-app-new">${I("plus")} 添加院校</button></div></div>\n    <section class="panel"><div class="table-wrap"><table><thead><tr><th>院校 · 项目</th><th>提交系统</th><th>阶段</th><th>截止</th><th>任务</th><th>语言核对</th><th>来源</th></tr></thead><tbody>${s || `<tr><td colspan="7">${Me("还没有添加院校", "点击右上角“添加院校”开始")}</td></tr>`}</tbody></table></div></section>\n    <p class="tiny muted2 mt16">「语言核对」与「院校要求」为院校库功能：已开通的院校自动带入要求和截止日期；手动添加的院校由你自己填写。</p>`;
          }(s);
          break;
        case "app":
          n = function (t, e) {
            const s = ea.d.apps.find(s => s.id === e && s.acct === t.id);
            if (!s) return Me("找不到该申请");
            const i = ua.school(t, s.schoolId),
              d = function (t) {
                return t && t.schoolId ? dt(t.schoolId) : null;
              }(s),
              n = fa(t, s),
              o = d || ca().find(t => t.en === s.name || t.zh === s.name),
              l = ea.of("tasks", t.id).filter(t => t.appId === s.id).sort((t, e) => $(t.due, e.due)),
              r = i ? `<div class="diy-req">${n.length ? Object.entries(n.reduce((t, e) => ((t[e.cat] ||= []).push(e), t), {})).map(([t, e]) => `<h4>${a(lt(t))}</h4>${e.map(t => `<div>${y(t.zh || "")}</div>`).join("")}`).join("") : '<span class="muted2">院校库中暂无与你的层次 / 专业匹配的要求。</span>'}<p class="tiny muted2 mt16">来自枫琴院校库 · 只读；如与学校官网不一致，以官网为准。</p></div>` : `<div class="diy-cover"><div class="diy-blur diy-req"><h4>考试要求</h4><div>预录像曲目数量、时长与指定时期要求……</div><h4>语言要求</h4><div>TOEFL / IELTS 总分与单项要求……</div><h4>申请流程与截止</h4><div>主申请系统与录像平台分别提交……</div></div><div class="diy-cover-msg"><div><b style="color:var(--accent)">${o ? "枫琴院校库已收录这所学校" : "院校要求需开通"}</b><br><span class="muted">开通后自动带入要求、截止日期并生成任务</span><br><button class="linkbtn" data-act="diy-lock" data-feature="school" data-ref="${a(o?.id || "")}">联系顾问开通</button></div></div></div>`;
            return `<div class="page-head"><div><h2>${a(s.name)}<em>${a(d ? d.zh : "")}</em></h2><p>${a(s.program || "")} · ${a(wa(t.level))} · ${a(t.season || "")} · ${i ? '<span style="color:var(--ok);font-weight:700">院校库</span>' : "手动添加"}</p></div>\n    <div class="page-actions"><button class="btn" data-act="diy-app-edit" data-id="${s.id}">${I("edit")} 编辑</button><button class="btn danger" data-act="diy-app-del" data-id="${s.id}">删除</button></div></div>\n    <section class="panel"><div class="panel-body"><div class="diy-stage">${Js.map((t, e) => `<button class="${e <= (s.stage || 0) ? "done" : ""}" data-act="diy-stage" data-id="${s.id}" data-i="${e}">${a(t)}</button>`).join("")}</div><div class="tiny muted2" style="margin-top:8px">点击阶段即可更新进度</div></div></section>\n    <div class="grid cols-main mt16"><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("send")} 提交与截止</h3></div></div><div class="panel-body"><div class="diy-kv"><span>提交系统</span><b>${a(s.system || "未填写")}</b></div><div class="diy-kv"><span>截止日期</span><b class="${h(s.deadline)}">${s.deadline ? p(s.deadline) + " · " + v(s.deadline) : "未填写"}</b></div>${s.note ? `<div class="diy-kv"><span>备注</span><b>${a(s.note)}</b></div>` : ""}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("book")} 院校要求</h3><p>${i ? "来自枫琴院校库" : "院校库功能"}</p></div>${i ? "" : Qs()}</div><div class="panel-body">${r}</div></section>\n    </div><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("checksq")} 本校任务</h3></div><span class="row">${i ? `<button class="btn sm" data-act="diy-gen" data-id="${s.id}">按院校要求生成任务</button>` : `<button class="btn sm" data-act="diy-lock" data-feature="school" data-ref="${a(o?.id || "")}">按院校要求生成 ${Qs()}</button>`}<button class="btn sm" data-act="diy-task-new" data-app="${s.id}">${I("plus")} 新建</button></span></div>${xa(0, l)}</section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("message")} 顾问备注与动态</h3></div><span class="diy-badge">申请服务</span></div><div class="diy-cover"><div class="panel-body diy-blur small">李顾问：已与学校确认录像要求……<br>陈老师：个人陈述第 2 版已修改……</div><div class="diy-cover-msg"><div>购买${a(ea.cfg.serviceTitle)}后<br>由专属顾问跟进每所学校<br><button class="linkbtn" data-act="diy-lock" data-feature="service">了解申请服务</button></div></div></div></section>\n    </div></div>`;
          }(s, i.a);
          break;
        case "tasks":
          n = function (t) {
            const e = ea.of("tasks", t.id),
              s = e.filter(t => "done" !== t.status),
              i = [["已逾期", s.filter(t => t.due && u(t.due) < 0)], ["14 天内", s.filter(t => t.due && u(t.due) >= 0 && u(t.due) <= 14)], ["之后", s.filter(t => !t.due || u(t.due) > 14)], ["已完成", e.filter(t => "done" === t.status)]];
            return `<div class="page-head"><div><h2>任务<em>Tasks</em></h2><p>所有院校的任务，按截止日期排列</p></div><div class="page-actions"><button class="btn primary" data-act="diy-task-new">${I("plus")} 新建任务</button></div></div>\n    <div class="stack">${i.filter(t => t[1].length).map(([t, e]) => `<section class="panel"><div class="panel-head"><div><h3>${a(t)}</h3></div><span class="count">${e.length}</span></div>${xa(0, e.sort((t, e) => $(t.due, e.due)))}</section>`).join("") || `<section class="panel"><div class="panel-body">${Me("还没有任务", "点击“新建任务”，或在院校详情中按院校要求生成")}</div></section>`}</div>`;
          }(s);
          break;
        case "timeline":
          n = function (t) {
            const e = ea.of("apps", t.id),
              s = [...e.filter(t => t.deadline).map(t => ({
                date: t.deadline,
                t: t.name + " · 申请截止",
                kind: "dl",
                href: "#/app/" + t.id
              })), ...ea.of("tasks", t.id).filter(t => t.due && "done" !== t.status).map(t => ({
                date: t.due,
                t: t.title,
                s: $a(e.find(e => e.id === t.appId)),
                kind: "task",
                href: "#/tasks"
              }))].sort((t, e) => $(t.date, e.date)).reduce((t, e) => ((t[e.date.slice(0, 7)] ||= []).push(e), t), {});
            return `<div class="page-head"><div><h2>时间线<em>Timeline</em></h2><p>所有院校截止与任务到期，按月份排列</p></div></div>\n    <div class="stack">${Object.entries(s).map(([t, e]) => `<section class="panel"><div class="panel-head"><div><h3>${t.replace("-", " 年 ")} 月</h3></div><span class="count">${e.length}</span></div><div class="list">${e.map(t => `<div class="item click" data-act="go" data-href="${t.href}"><div class="mark ${"dl" === t.kind || u(t.date) < 0 ? "err" : u(t.date) <= 7 ? "warn" : ""}">${I("dl" === t.kind ? "flag" : "checksq")}</div><div class="main"><div class="title">${a(t.t)}</div><div class="meta">${a(t.s || "")}</div></div><div class="side"><b class="small ${h(t.date)}">${p(t.date)}</b><span class="tiny muted2">${v(t.date)}</span></div></div>`).join("")}</div></section>`).join("") || `<section class="panel"><div class="panel-body">${Me("还没有日期", "添加院校截止日期或任务后会出现在这里")}</div></section>`}</div>`;
          }(s);
          break;
        case "docs":
          n = function (t) {
            const e = ea.of("docs", t.id);
            return `<div class="page-head"><div><h2>文书<em>Essays</em></h2><p>在线写作（最多 ${x} 词）或登记网盘链接</p></div><div class="page-actions"><button class="btn primary" data-act="diy-doc-new">${I("plus")} 新建文书</button></div></div>\n    <div class="grid cols-main"><section class="panel"><div class="list">${e.map(t => `<div class="item click" data-act="diy-doc-edit" data-id="${t.id}"><div class="mark">${I("file")}</div><div class="main"><div class="title">${a(t.title)}</div><div class="meta">${t.text ? w(t.text) + " 词" : ""}${t.link ? " · 网盘链接" : ""} · 更新于 ${m(t.updatedAt)}</div></div></div>`).join("") || Me("还没有文书")}</div></section>\n    <div class="diy-promo"><div style="flex:1 1 200px"><b>需要专业老师修改文书？</b><p>枫琴文书老师逐稿修改、审核与定稿，每一版都有记录。这是${a(ea.cfg.serviceTitle)}的内容。</p><button class="btn sm" style="margin-top:8px" data-act="diy-lock" data-feature="service">了解申请服务</button></div>${ba()}</div></div>`;
          }(s);
          break;
        case "files":
          n = function (t) {
            const e = ea.of("mats", t.id),
              s = {
                todo: ["未开始", "plain"],
                doing: ["准备中", "warn"],
                done: ["已完成", "ok"]
              };
            return `<div class="page-head"><div><h2>文件库<em>Files</em></h2><p>申请材料清单；文件请上传到网盘后登记链接</p></div><div class="page-actions"><button class="btn primary" data-act="diy-mat-new">${I("plus")} 登记材料</button></div></div>\n    <section class="panel"><div class="table-wrap"><table><thead><tr><th>材料</th><th>状态</th><th>链接</th><th>备注</th><th></th></tr></thead><tbody>${e.map(t => `<tr><td class="td-main">${a(t.title)}</td><td><span class="pill ${s[t.status][1]}">${s[t.status][0]}</span></td><td>${S(t.link) ? `<a href="${a(S(t.link))}" target="_blank" rel="noopener">打开</a>` : '<span class="muted2">—</span>'}</td><td class="small">${a(t.note || "")}</td><td><button class="btn sm ghost" data-act="diy-mat-edit" data-id="${t.id}">${I("edit")}</button></td></tr>`).join("") || `<tr><td colspan="5">${Me("还没有登记材料")}</td></tr>`}</tbody></table></div></section>`;
          }(s);
          break;
        case "library":
          n = function (t, e) {
            const s = ca(),
              i = e ? s.find(t => t.id === e) : null;
            if (i && ua.school(t, i.id)) {
              const e = pt({
                schoolId: i.id,
                level: t.level,
                majorId: t.majorId
              });
              return `<div class="page-head"><div><h2>${a(i.en)}<em>${a(i.zh)}</em></h2><p>${a(i.system || "")} · ${a(wa(t.level))} · ${a(ot(t.majorId))}</p></div><div class="page-actions"><button class="btn" data-act="go" data-href="#/library">返回院校库</button><button class="btn primary" data-act="diy-app-new" data-school="${i.id}">${I("plus")} 加入我的申请</button></div></div>\n      <section class="panel"><div class="panel-body diy-req">${e.length ? Object.entries(e.reduce((t, e) => ((t[e.cat] ||= []).push(e), t), {})).map(([t, e]) => `<h4>${a(lt(t))}</h4>${e.map(t => `<div>${y(t.zh || "")}</div>`).join("")}`).join("") : "暂无与你的层次 / 专业匹配的要求"}</div></section>`;
            }
            return `<div class="page-head"><div><h2>院校要求库<em>Requirements</em></h2><p>已开通 ${ua.openSchools(t).length} 所 · 灰色院校可联系顾问开通</p></div></div>\n    <section class="panel"><div class="panel-body">${s.map(e => ua.school(t, e.id) ? `<button class="diy-pick" data-act="go" data-href="#/library/${e.id}"><span class="abbr">${a(e.abbr || "")}</span><span style="flex:1"><b>${a(e.en)}</b><br><span class="tiny muted2">${a(e.zh)} · ${a(e.country || "")}</span></span><span class="pill ok">已开通</span></button>` : `<button class="diy-pick locked" data-act="diy-lock" data-feature="school" data-ref="${e.id}"><span class="abbr">${a(e.abbr || "")}</span><span style="flex:1"><b>${a(e.en)}</b><br><span class="tiny">${a(e.zh)} · ${a(e.country || "")}</span></span>${Qs()}</button>`).join("")}</div></section>`;
          }(s, i.a);
          break;
        case "report":
          n = ua.report(s) ? function (t) {
            const e = ea.of("apps", t.id),
              s = ea.of("tasks", t.id),
              i = s.filter(t => "done" === t.status).length,
              d = ga(t),
              n = e.filter(t => t.deadline && u(t.deadline) >= 0).sort((t, e) => $(t.deadline, e.deadline))[0];
            return `<div class="page-head diy-noprint"><div><h2>进度报告<em>Report</em></h2><p>可打印 / 另存为 PDF 发给家长</p></div><div class="page-actions"><button class="btn primary" data-act="print">${I("download")} 打印 / 导出 PDF</button></div></div>\n    <section class="panel"><div class="panel-body" style="padding:26px 30px">\n      <div class="tiny" style="letter-spacing:.1em;color:var(--focus);font-weight:800">申请进度报告</div><h2 style="margin:6px 0 2px;color:var(--accent)">${a(t.name)} · ${a(t.season || "")} ${a(ot(t.majorId))}${a(wa(t.level))}</h2><div class="tiny muted2">生成于 ${p(l())} · 枫琴申请工作站</div>\n      <div class="grid stats mt16">${Je("申请院校", e.length, "")}${Je("任务完成", `${i} / ${s.length}`, "")}${Je("最近截止", n ? p(n.deadline).slice(5) : "—", n ? n.name : "")}${Je("需要注意", d.filter(t => "info" !== t.level).length, "")}</div>\n      <h3 class="mt16" style="color:var(--accent)">各院校进度</h3>\n      <div class="table-wrap"><table><thead><tr><th>院校</th><th>截止</th><th>阶段</th><th>下一步</th></tr></thead><tbody>${e.map(t => {
              const e = s.filter(e => e.appId === t.id && "done" !== e.status).sort((t, e) => $(t.due, e.due))[0];
              return `<tr><td class="td-main">${a(t.name)}</td><td>${p(t.deadline)}</td><td>${Js[t.stage || 0]}</td><td class="small">${e ? a(e.title) + (e.due ? "（" + p(e.due) + "）" : "") : "—"}</td></tr>`;
            }).join("")}</tbody></table></div>\n      <h3 class="mt16" style="color:var(--accent)">需要注意</h3><div class="small" style="line-height:1.9">${d.filter(t => "info" !== t.level).map(t => "· " + a(t.text)).join("<br>") || "暂无"}</div>\n      <p class="tiny muted2 mt16">本报告根据学生在枫琴申请工作站中的记录自动生成；院校要求以各校官网为准。</p>\n    </div></section>`;
          }(s) : Ia(s), ua.report(s) || setTimeout(() => Oa("report"), 0);
          break;
        case "profile":
          n = function (t) {
            const e = pa(t);
            return `<div class="page-head"><div><h2>我的资料<em>Profile</em></h2><p>手机号 ${a(t.phone.slice(0, 3) + "****" + t.phone.slice(-4))}（登录账号，不可修改）</p></div></div>\n    <div class="grid cols-main"><section class="panel"><div class="panel-head"><div><h3>${I("user")} 基本信息</h3></div><button class="btn sm primary" data-act="diy-profile-edit">${I("edit")} 编辑</button></div><div class="panel-body">\n      ${[["姓名", t.name], ["申请层次", wa(t.level)], ["申请季", t.season], ["专业方向", ot(t.majorId)], ["目前学校 / 专业", t.currentSchool], ["目标国家", t.countries], ["语言成绩", t.lang]].map(([t, e]) => `<div class="diy-kv"><span>${t}</span><b>${a(e || "—")}</b></div>`).join("")}</div></section>\n    <div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("shield")} 我的权限</h3></div></div><div class="panel-body small" style="line-height:1.9">院校库：已开通 <b>${ua.openSchools(t).length}</b> 所<br>任务模板：已开通 <b>${Ys.filter(e => ua.template(t, e.id)).length}</b> 个<br>进度报告：${ua.report(t) ? '<b style="color:var(--ok)">已开通</b>' : "未开通"}\n        ${e.length ? `<div class="mt16" style="color:var(--warn)">已申请开通（等待枫琴处理）：${e.map(t => a((t => "school" === t.kind ? t.ref ? dt(t.ref)?.en || t.ref : "手动添加院校的要求" : "template" === t.kind ? Ys.find(e => e.id === t.ref)?.title || t.ref : "report" === t.kind ? "进度报告" : "service" === t.kind ? "咨询申请服务" : "院校要求库")(t))).join("、")}</div>` : ""}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>账号安全</h3></div></div><div class="panel-body stack tight"><button class="btn" data-act="diy-pw">修改密码</button><button class="btn danger" data-act="diy-delete-self">注销账号（删除我的全部数据）</button></div></section>\n    </div></div>`;
          }(s);
      }
    } catch (t) {
      console.error(t), n = `<div class="notice err">${I("alert")}<div><strong>页面出错</strong>${a(t.message)}</div></div>`;
    }
    const o = "app" === i.name ? "apps" : i.name,
      r = function (t) {
        const e = ea.of("tasks", t.id).filter(t => "done" !== t.status),
          s = ua.openSchools(t).length < ca().length;
        return [["home", "home", "工作台"], ["apps", "book", "我的申请", ea.of("apps", t.id).length], ["tasks", "checksq", "任务", e.length], ["timeline", "calendar", "时间线"], ["docs", "file", "文书"], ["files", "folder", "文件库"], ["library", "search", "院校要求库", "", s], ["report", "report", "进度报告", "", !ua.report(t)], ["profile", "user", "我的资料"]];
      }(s),
      c = (r.find(t => t[0] === o) || [])[2] || "工作台";
    d.innerHTML = `<div class="shell">\n    <aside class="sidebar">\n      <div class="brand"><img src="${e}" alt="Fantasme"><div><div class="brand-title">枫琴申请工作站</div><div class="brand-en">Admissions Workspace</div></div></div>\n      <nav class="nav">${r.map(([t, e, s, i, d]) => d ? `<button class="nav-btn diy-locked" data-act="diy-lock" data-feature="${"report" === t ? "report" : "library"}" data-go="#/${t}">${I(e)}${a(s)}${Qs()}</button>` : `<button class="nav-btn ${o === t ? "active" : ""}" data-act="go" data-href="#/${t}">${I(e)}${a(s)}${i ? `<span class="nav-count">${i}</span>` : ""}</button>`).join("")}\n        <button class="nav-btn diy-service" data-act="diy-lock" data-feature="service">${I("award")}咨询${a(ea.cfg.serviceTitle.replace(/^枫琴/, "枫琴"))}</button>\n      </nav>\n      <div class="side-bottom">\n        <div class="me">${Ve(s.name)}<div><b>${a(s.name)}</b><span>DIY 免费版</span></div><span class="spacer"></span><button class="btn icon ghost" data-act="diy-logout" title="退出登录">${I("logout")}</button></div>\n        <div class="tiny muted2">${j} · DIY 免费版${t ? "" : " · 本地预览"}</div>\n      </div>\n    </aside>\n    <main class="main">\n      <header class="topbar"><div class="row" style="gap:10px;min-width:0"><button class="btn icon mobile-toggle" data-act="toggle-nav" aria-label="菜单">☰</button><div class="crumbs"><span class="cur">${a("app" === i.name ? "院校详情" : c)}</span></div></div>\n        <div class="top-actions"><span class="diy-badge">DIY 免费版</span></div></header>\n      <div class="content">${n}</div>\n    </main></div>`, document.body.classList.remove("nav-open");
  }
  function Ia(t) {
    const e = ea.of("apps", t.id),
      i = ea.of("tasks", t.id).filter(t => "done" !== t.status),
      d = ga(t),
      n = d.filter(t => "err" === t.level).length,
      o = d.filter(t => "warn" === t.level).length,
      r = e.filter(e => !ua.school(t, e.schoolId)),
      c = (ca().length, ua.openSchools(t).length),
      m = [...e.filter(t => t.deadline).map(t => ({
        date: t.deadline,
        t: t.name + " 截止",
        s: t.system || "申请截止",
        href: "#/app/" + t.id
      })), ...i.filter(t => t.due).map(t => ({
        date: t.due,
        t: t.title,
        s: $a(ea.d.apps.find(e => e.id === t.appId)),
        href: "#/tasks"
      }))].filter(t => {
        const e = u(t.date);
        return e >= 0 && e <= 30;
      }).sort((t, e) => $(t.date, e.date)),
      b = r.length ? `<div class="diy-cover" style="border-top:1px solid var(--line)"><div class="diy-blur"><div class="item"><div class="mark warn">${I("clock")}</div><div class="main"><div class="title">预录像曲目要求与当前曲目单不一致</div><div class="meta">院校库核对</div></div></div><div class="item"><div class="mark warn">${I("clock")}</div><div class="main"><div class="title">需在两个申请系统分别提交</div><div class="meta">院校库核对</div></div></div></div><div class="diy-cover-msg"><div><b style="color:var(--accent)">另有 ${r.length} 所院校的提醒未显示</b><br><span class="muted">这些院校还没有开通院校库，系统无法核对要求和截止日期</span><br><button class="linkbtn" data-act="diy-lock" data-feature="library">联系顾问开通</button></div></div></div>` : "";
    return `<div class="page-head"><div><h2>${Ye()}，${a(t.name)}<em>DIY</em></h2><p>${p(l())} · 你的风险、待办与申请进度</p></div>\n    <div class="page-actions"><button class="btn" data-act="diy-task-new">${I("plus")} 新建任务</button><button class="btn primary" data-act="diy-app-new">${I("plus")} 添加院校</button></div></div>\n    <div class="grid stats">\n      ${Je("申请院校", e.length, `${e.length - r.length} 所院校库 · ${r.length} 所手动`, {
      href: "#/apps"
    })}\n      ${Je("风险预警", n + o, n ? `其中 ${n} 条紧急` : "没有紧急事项", {
      cls: n ? "err" : o ? "warn" : ""
    })}\n      ${Je("进行中任务", i.length, `本周到期 ${i.filter(t => t.due && u(t.due) <= 7).length} 项`, {
      href: "#/tasks"
    })}\n      <button class="stat" data-act="diy-lock" data-feature="library"><div class="stat-label">院校库已开通</div><div class="stat-val" style="color:var(--focus)">${c} <span style="font-size:14px;color:var(--muted2);font-weight:500">所</span></div><div class="stat-foot" style="color:var(--focus);font-weight:700">联系顾问开通更多院校</div></button>\n    </div>\n    <div class="grid cols-main"><div class="stack">\n      <section class="panel"><div class="panel-head"><div><h3>${I("alert")} 风险预警</h3><p>由截止日期、提交状态、任务与语言成绩自动计算</p></div><span class="row">${n ? `<span class="pill err">${n} 紧急</span>` : ""}${o ? `<span class="pill warn">${o} 注意</span>` : ""}</span></div>\n        <div class="list">${d.map(ya).join("") || Me("暂无风险", "截止日期和任务都在正常范围内")}</div>${b}</section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("checksq")} 近期任务</h3><p>按截止日期排序</p></div><button class="btn sm" data-act="go" data-href="#/tasks">全部任务 ${I("arrow")}</button></div>${xa(0, i.slice().sort((t, e) => $(t.due, e.due)).slice(0, 6))}</section>\n    </div><div class="stack">\n      <div class="diy-promo" style="display:block"><div class="row" style="gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1 1 200px"><div class="tiny" style="opacity:.8">${a(ea.cfg.serviceTitle)}</div><b>专属顾问 + 文书老师，全程陪你申请</b><p>${a(ea.cfg.serviceText)}</p></div>${ba()}</div>\n        <button type="button" class="diy-shot" data-act="diy-shot" aria-label="查看大图"><img src="${s}" alt="枫琴顾问端的学生申请总览"></button><div class="cap">枫琴顾问端 · 学生申请总览（演示数据）。顾问同时跟进每所院校的提交平台、录像考试、文书与推荐信。</div></div>\n      <section class="panel"><div class="panel-head"><div><h3>${I("calendar")} 未来 30 天关键日期</h3><p>院校截止与任务到期</p></div></div>\n        <div class="list">${m.slice(0, 8).map(t => `<div class="item click" data-act="go" data-href="${t.href}"><div class="mark ${u(t.date) <= 7 ? "warn" : ""}">${I("clock")}</div><div class="main"><div class="title">${a(t.t)}</div><div class="meta">${a(t.s)}</div></div><div class="side"><b class="small ${h(t.date)}">${p(t.date)}</b><span class="tiny muted2">${v(t.date)}</span></div></div>`).join("") || Me("未来 30 天没有关键日期")}</div></section>\n    </div></div>`;
  }
  const wa = t => (us.find(e => e[0] === t) || [, t || ""])[1];
  function xa(t, e) {
    return e.length ? `<div class="table-wrap"><table><thead><tr><th style="width:34px"></th><th>任务</th><th>院校</th><th>截止</th><th>状态</th><th></th></tr></thead><tbody>${e.map(t => {
      const e = ea.d.apps.find(e => e.id === t.appId);
      return `<tr><td><input type="checkbox" data-act="diy-task-done" data-id="${t.id}" ${"done" === t.status ? "checked" : ""} aria-label="完成"></td><td><div class="td-main" style="${"done" === t.status ? "text-decoration:line-through;color:var(--muted2)" : ""}">${a(t.title)}</div><div class="td-sub">${a(t.src || "")}</div></td><td class="small">${a(e ? e.name : "所有院校共用")}</td><td>${b(t.due)}</td>\n      <td><select class="select" data-act="diy-task-status" data-id="${t.id}">${Object.entries(Ws).map(([e, s]) => `<option value="${e}" ${t.status === e ? "selected" : ""}>${s}</option>`).join("")}</select></td>\n      <td><button class="btn sm ghost" data-act="diy-task-edit" data-id="${t.id}">${I("edit")}</button></td></tr>`;
    }).join("")}</tbody></table></div>` : `<div class="panel-body">${Me("暂无任务")}</div>`;
  }
  const Sa = {
    school: {
      tag: "院校要求库 · 需开通",
      title: "开通这所院校的申请要求",
      points: ["提交系统、截止日期与曲目 / 作品要求自动带入", "一键生成该校全部任务和时间节点", "自动对比你的语言成绩与学校要求"]
    },
    library: {
      tag: "院校要求库 · 需开通",
      title: "音乐院校申请要求库",
      points: ["每所学校、每个专业的提交系统、截止日期与曲目要求", "选校后一键生成全套任务", "自动核对语言成绩与学校要求"]
    },
    template: {
      tag: "任务模板 · 需开通",
      title: "全套申请任务模板",
      points: ["覆盖材料、文书、录像、提交、面试、录取各环节", "按截止日期自动推算每项任务的时间", "一键套用到任意院校"]
    },
    report: {
      tag: "进度报告 · 需开通",
      title: "一键生成申请进度报告",
      points: ["汇总每所院校的阶段、下一步和截止日期", "自动列出需要注意的风险", "可导出 PDF 发给家长"]
    },
    service: {
      tag: "枫琴申请服务",
      title: () => ea.cfg.serviceTitle,
      points: ["专属申请顾问：选校定位、全程进度跟进", "文书老师逐稿修改，审核定稿", "曲目、录像与面试指导"]
    }
  };
  function ja(t) {
    return t.map(t => `<span class="diy-ph" style="width:${t}px"></span>`).join(" ");
  }
  function Aa(t) {
    const e = [96, 128, 84, 140, 110, 72, 122, 90, 136, 100, 80, 118];
    return Array.from({
      length: t
    }, (t, s) => `<button type="button" class="locked" tabindex="-1">${ja([e[s % e.length]])}</button>`).join("");
  }
  function qa(t) {
    const e = ha();
    return "report" === t ? `<div style="background:#fff;border-radius:12px;padding:14px"><div class="tiny" style="color:var(--focus);font-weight:800;letter-spacing:.1em">申请进度报告</div><div style="font-weight:800;color:var(--accent);margin-top:4px">${a(e.name)} · ${a(e.season || "")}</div><div class="grid stats mt16" style="grid-template-columns:repeat(4,minmax(0,1fr))">${Je("院校", ea.of("apps", e.id).length, "")}${Je("任务", ea.of("tasks", e.id).length, "")}${Je("截止", "—", "")}${Je("注意", ga(e).filter(t => "info" !== t.level).length, "")}</div><div class="diy-blur mt16" style="line-height:2">${ja([120, 70, 150])}<br>${ja([100, 90, 130])}<br>${ja([140, 60, 110])}</div></div>` : "template" === t ? `<div class="diy-tpl diy-blur">${Aa(10)}</div>` : "service" === t ? `<div class="stack tight small"><div class="item" style="background:#fff;border-radius:10px"><div class="mark">${I("user")}</div><div class="main"><div class="title">专属顾问</div><div class="meta">每所学校的进度与沟通由顾问跟进</div></div></div><div class="item" style="background:#fff;border-radius:10px"><div class="mark">${I("file")}</div><div class="main"><div class="title">文书协作</div><div class="meta">文书老师撰写 → 顾问审核 → 主管定稿 → 你确认</div></div></div><div class="item" style="background:#fff;border-radius:10px"><div class="mark">${I("music")}</div><div class="main"><div class="title">曲目与录像指导</div><div class="meta">专业老师审核每一版录像</div></div></div></div><button type="button" class="diy-shot" data-act="diy-shot" aria-label="查看大图" style="box-shadow:none;border:1px solid var(--line)"><img src="${s}" alt="枫琴顾问端的学生申请总览"></button>` : `<div style="background:#fff;border-radius:12px;padding:12px 14px"><b style="color:var(--accent)">院校要求 · ${a(ot(e.majorId))} · ${a(wa(e.level))}</b><div class="grid mt16" style="grid-template-columns:1fr 1fr;gap:8px">${["提交系统", "截止日期", "预录像 / 作品", "语言要求"].map(t => `<div style="background:#F7F5F9;border-radius:8px;padding:8px" class="small">${t}<br><span class="diy-blur" style="display:inline-block;margin-top:4px">${ja([90, 40])}</span></div>`).join("")}</div><div class="tiny muted2 mt16">要求带入后，可按截止日期生成该校全部任务，并核对你的语言成绩</div></div>`;
  }
  function Oa(e, s = "") {
    const n = ha(),
      o = Sa[e] || Sa.library,
      l = "function" == typeof o.title ? o.title() : o.title,
      r = "school" === e && s ? dt(s)?.en || "" : "template" === e && s && Ys.find(t => t.id === s)?.title || "";
    Oe({
      title: r ? `「${r}」需要开通` : l,
      sub: o.tag,
      wide: !0,
      cancelLabel: "稍后再说",
      submitLabel: "service" === e ? "我已添加顾问，请联系我" : "我已添加顾问，申请开通",
      body: `<div class="diy-modal-grid"><div class="l">${qa(e)}</div>\n      <div class="r"><h3 style="margin:0 0 6px;color:var(--accent)">${a(l)}</h3>${o.points.map(t => `<div class="diy-check"><b>✓</b><span>${a(t)}</span></div>`).join("")}\n      <div class="row mt16" style="gap:12px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:12px">${ba("lg")}<div class="small" style="line-height:1.7"><b>扫码添加枫琴顾问</b><br>发送你的账号 ${a(n.phone.slice(0, 3) + "****" + n.phone.slice(-4))}，顾问确认后由主管为你开通</div></div></div></div>`,
      onSubmit: () => {
        t ? ge.call("POST", "/diy/request", {
          kind: e,
          ref: s
        }).then(t => {
          n.requests = t.requests, Ae("已提交，枫琴会尽快与你联系"), Vs();
        }).catch(t => Ae(t.message, {
          error: !0
        })) : (n.requests ||= [], n.requests.some(t => !t.done && t.kind === e && t.ref === s) || n.requests.push({
          id: i("req"),
          kind: e,
          ref: s,
          at: d(),
          done: !1
        }), ea.save(), Ae("已提交，枫琴会尽快与你联系"), Vs());
      }
    });
  }
  function Ca(t, e, s) {
    const i = ca(),
      d = e?.schoolId || s || "",
      n = e => ua.school(t, e.id) ? `<label class="diy-pick ${d === e.id ? "sel" : ""}"><input type="radio" name="schoolId" value="${e.id}" ${d === e.id ? "checked" : ""}><span class="abbr">${a(e.abbr || "")}</span><span style="flex:1"><b>${a(e.en)}</b><br><span class="tiny muted2">${a(e.zh)} · ${a(e.country || "")}</span></span><span class="pill ok">可用</span></label>` : `<button type="button" class="diy-pick locked" data-act="diy-lock" data-feature="school" data-ref="${e.id}"><span class="abbr">${a(e.abbr || "")}</span><span style="flex:1"><b>${a(e.en)}</b><br><span class="tiny">${a(e.zh)} · ${a(e.country || "")}</span></span>${Qs()}</button>`;
    return e ? `<div class="form-grid">${Le("name", "院校名称", e.name, "text", {
      required: !0
    })}${Le("program", "项目 / 专业", e.program)}${Le("system", "提交系统", e.system)}${Le("deadline", "截止日期", e.deadline, "date")}${Le("note", "备注", e.note, "textarea", {
      full: !0
    })}</div>` : `<div class="tiny muted2" style="font-weight:800">从院校库选择（已开通 ${ua.openSchools(t).length} 所，灰色院校可联系顾问开通）</div>\n    <div style="max-height:320px;overflow:auto;padding-right:4px">${i.filter(e => ua.school(t, e.id)).map(n).join("")}${i.filter(e => !ua.school(t, e.id)).map(n).join("")}</div>\n    <label class="diy-pick"><input type="radio" name="schoolId" value="" ><span class="abbr" style="background:#A89FB5">＋</span><span style="flex:1"><b>手动添加其他院校</b><br><span class="tiny muted2">要求与截止日期由你自己填写</span></span></label>\n    <div class="form-grid mt16">${Le("name", "手动添加时：院校名称", "", "text", {
      placeholder: "如 Curtis Institute of Music"
    })}${Le("program", "项目 / 专业", ot(t.majorId))}${Le("gen", "按院校要求自动生成任务（仅院校库院校）", !0, "check", {
      full: !0
    })}</div>`;
  }
  function Da(t, e) {
    const s = fa(t, e);
    if (!e.deadline) return Ae("请先填写截止日期，再生成任务", {
      error: !0
    }), 0;
    const a = new Set(ea.of("tasks", t.id).filter(t => t.appId === e.id).map(t => t.title));
    let i = 0;
    const d = (s, d) => {
        a.has(s) || (ea.put("tasks", {
          acct: t.id,
          appId: e.id,
          title: s,
          due: c(e.deadline, d),
          status: "todo",
          src: "院校要求生成"
        }), a.add(s), i++);
      },
      n = new Set(s.map(t => t.cat));
    return n.has("english") && d("核对并满足语言要求", -60), n.has("audition") && (d("确定本校曲目 / 作品", -40), d("录制预录像", -14)), n.has("portfolio") && d("准备作品集", -21), n.has("academic") && d("准备成绩单与学历证明", -35), d("复核申请表并正式提交", -5), i;
  }
  function _a(t) {
    for (const e of ["apps", "tasks", "docs", "mats"]) ea.d[e] = ea.d[e].filter(e => e.acct !== t);
    ea.d.accounts = ea.d.accounts.filter(e => e.id !== t), ea.save();
  }
  Object.assign(ms, {
    "diy-lock"(t) {
      Oa(t.dataset.feature || "library", t.dataset.ref || "");
    },
    "diy-logout"() {
      t ? sa.finally(() => ge.call("POST", "/diy/logout").finally(() => {
        location.href = "/login";
      })) : (va.logout(), location.hash = "#/home", Vs());
    },
    "diy-app-new"(t) {
      const e = ha();
      Oe({
        title: "添加目标院校",
        sub: "选择院校库中的院校，或手动添加",
        wide: !0,
        body: Ca(e, null, t.dataset.school),
        submitLabel: "添加",
        onSubmit: t => {
          const s = t.schoolId ? dt(t.schoolId) : null;
          if (s && !ua.school(e, s.id)) throw new Error("该院校尚未开通");
          if (!s && !t.name) throw new Error("请选择院校，或填写手动添加的院校名称");
          const a = s && (mt({
              schoolId: s.id,
              level: e.level,
              majorId: e.majorId
            })[0] || {}).d || "",
            i = ea.put("apps", {
              acct: e.id,
              schoolId: s ? s.id : "",
              name: s ? s.en : t.name,
              program: t.program,
              system: s && s.system || "",
              deadline: a,
              stage: 0
            }),
            d = s && t.gen ? Da(e, i) : 0;
          Ae(`已添加 ${i.name}` + (d ? `，生成 ${d} 项任务` : "")), Rs("#/app/" + i.id);
        }
      });
    },
    "diy-app-edit"(t) {
      const e = ha(),
        s = ea.d.apps.find(s => s.id === t.dataset.id && s.acct === e.id);
      s && Oe({
        title: "编辑申请",
        body: Ca(e, s),
        onSubmit: t => {
          Object.assign(s, {
            name: s.schoolId ? s.name : t.name,
            program: t.program,
            system: t.system,
            deadline: t.deadline,
            note: t.note
          }), ea.put("apps", s), Vs();
        }
      });
    },
    "diy-app-del"(t) {
      const e = ha(),
        s = ea.d.apps.find(s => s.id === t.dataset.id && s.acct === e.id);
      s && De(`删除 ${a(s.name)} 及其任务？`, () => {
        ea.d.tasks = ea.d.tasks.filter(t => t.appId !== s.id), ea.remove("apps", s.id), Rs("#/apps");
      }, {
        danger: !0,
        yes: "删除"
      });
    },
    "diy-stage"(t) {
      const e = ha(),
        s = ea.d.apps.find(s => s.id === t.dataset.id && s.acct === e.id);
      s && (s.stage = Number(t.dataset.i), ea.put("apps", s), Vs());
    },
    "diy-gen"(t) {
      const e = ha(),
        s = ea.d.apps.find(s => s.id === t.dataset.id && s.acct === e.id);
      if (!s || !ua.school(e, s.schoolId)) return;
      const a = Da(e, s);
      (a || s.deadline) && Ae(a ? `已生成 ${a} 项任务` : "任务已齐全，没有新增"), Vs();
    },
    "diy-task-new"(t) {
      Ea(ha(), null, t.dataset.app || "");
    },
    "diy-task-edit"(t) {
      const e = ha();
      Ea(e, ea.d.tasks.find(s => s.id === t.dataset.id && s.acct === e.id));
    },
    "diy-tpl"(t) {
      const e = ha(),
        s = Ys.find(e => e.id === t.dataset.id);
      if (!s) return;
      if (!ua.template(e, s.id)) return void Oa("template", s.id);
      const a = document.getElementById("modalForm");
      a.elements.title.value = s.title;
      const i = a.elements.appId.value,
        d = ea.d.apps.find(t => t.id === i);
      d && d.deadline && !a.elements.due.value && (a.elements.due.value = c(d.deadline, s.offset));
    },
    "diy-doc-new"() {
      Ta(ha(), null);
    },
    "diy-doc-edit"(t) {
      const e = ha();
      Ta(e, ea.d.docs.find(s => s.id === t.dataset.id && s.acct === e.id));
    },
    "diy-mat-new"() {
      Ma(ha(), null);
    },
    "diy-mat-edit"(t) {
      const e = ha();
      Ma(e, ea.d.mats.find(s => s.id === t.dataset.id && s.acct === e.id));
    },
    "diy-profile-edit"() {
      const e = ha();
      Oe({
        title: "编辑资料",
        body: `<div class="form-grid">${Le("name", "姓名", e.name, "text", {
          required: !0
        })}${Le("season", "申请季", e.season)}${Le("level", "申请层次", e.level, "select", {
          options: us
        })}${Le("majorId", "专业方向", e.majorId, "select", {
          options: cs()
        })}${Le("currentSchool", "目前学校 / 专业", e.currentSchool)}${Le("countries", "目标国家", e.countries)}${Le("lang", "语言成绩", e.lang, "text", {
          placeholder: "如 TOEFL 92 / IELTS 7.0（6.5）"
        })}</div>`,
        onSubmit: s => {
          t ? ge.call("POST", "/diy/profile", s).then(t => {
            Object.assign(e, t.me), Vs(), Ae("已保存");
          }).catch(t => Ae(t.message, {
            error: !0
          })) : (Object.assign(e, s), ea.save(), Vs());
        }
      });
    },
    "diy-pw"() {
      const e = ha();
      Oe({
        title: "修改密码",
        body: `<div class="form-grid">${Le("old", "当前密码", "", "password", {
          required: !0,
          full: !0
        })}${Le("pw", "新密码", "", "password", {
          required: !0
        })}${Le("pw2", "再次输入", "", "password", {
          required: !0
        })}</div>`,
        onSubmit: s => {
          const a = La(s.pw);
          if (a) throw new Error(a);
          if (s.pw !== s.pw2) throw new Error("两次输入不一致");
          if (t) ge.call("POST", "/diy/password", {
            old: s.old,
            new: s.pw
          }).then(() => {
            e.mustChange = !1, Ae("密码已修改");
          }).catch(t => {
            Ae(t.message, {
              error: !0
            }), setTimeout(() => ms["diy-pw"](), 30);
          });else {
            if (ra(s.old) !== e.pw) throw new Error("当前密码不正确");
            e.pw = ra(s.pw), e.mustChange = !1, ea.save(), Ae("密码已修改");
          }
        }
      });
    },
    "diy-delete-self"() {
      const e = ha();
      De("注销后你的申请、任务、文书和材料记录将全部删除，且不可恢复。确定注销？", () => {
        t ? ge.call("POST", "/diy/delete-self").then(() => {
          location.href = "/login";
        }).catch(t => Ae(t.message, {
          error: !0
        })) : (_a(e.id), va.logout(), location.hash = "#/home", Vs(), Ae("账号已注销"));
      }, {
        danger: !0,
        yes: "确认注销"
      });
    },
    "diy-auth-tab"(t) {
      Na = t.dataset.tab, Vs();
    },
    "diy-shot"() {
      Oe({
        title: "枫琴顾问端 · 学生申请总览",
        sub: "演示数据",
        wide: !0,
        cancelLabel: "关闭",
        body: `<img src="${s}" alt="枫琴顾问端的学生申请总览" style="width:100%;border-radius:10px;border:1px solid var(--line)">`
      });
    },
    "diy-login-as"(t) {
      va.login(t.dataset.id), se.logout(), location.hash = "#/home", Vs();
    }
  });
  const La = t => !t || t.length < 8 ? "密码至少 8 位" : /[A-Za-z]/.test(t) && /\d/.test(t) ? "" : "密码需同时包含字母和数字";
  function Ea(e, s, i = "") {
    const d = ea.of("apps", e.id);
    Oe({
      title: s ? "编辑任务" : "新建任务",
      wide: !s,
      body: `${s ? "" : `<div class="tiny muted2" style="font-weight:800;margin-bottom:6px">快速选择模板</div><div class="diy-tpl">${Ys.filter(t => ua.template(e, t.id)).map(t => `<button type="button" data-act="diy-tpl" data-id="${t.id}">${a(t.title)}</button>`).join("")}</div>${(() => {
        const s = t ? Ks : Ys.filter(t => !ua.template(e, t.id)).length;
        return s ? `<div class="diy-cover mt16"><div class="diy-tpl diy-blur">${Aa(s)}</div><div class="diy-cover-msg"><div><b style="color:var(--accent)">联系顾问开通更多院校流程任务模板</b><br><button type="button" class="linkbtn" data-act="diy-lock" data-feature="template">如何联系</button></div></div></div>` : "";
      })()}<div class="tiny muted2" style="margin:8px 0 12px">也可以直接在下方填写任何任务。</div>`}\n      <div class="form-grid">${Le("title", "任务名称", s?.title || "", "text", {
        required: !0,
        full: !0
      })}${Le("appId", "关联院校", s?.appId ?? i, "select", {
        options: [["", "所有院校共用"]].concat(d.map(t => [t.id, t.name]))
      })}${Le("due", "截止日期", s?.due || "", "date")}${Le("status", "状态", s?.status || "todo", "select", {
        options: Object.entries(Ws)
      })}</div>`,
      footExtra: s ? `<button type="button" class="btn danger" data-act="diy-task-del" data-id="${s.id}">删除</button>` : "",
      onSubmit: t => {
        ea.put("tasks", Object.assign(s || {
          acct: e.id,
          src: "手动"
        }, {
          title: t.title,
          appId: t.appId,
          due: t.due,
          status: t.status
        })), Vs();
      }
    });
  }
  function Ta(t, e) {
    Oe({
      title: e ? "编辑文书" : "新建文书",
      wide: !0,
      body: `<div class="form-grid">${Le("title", "标题", e?.title || "", "text", {
        required: !0,
        full: !0
      })}${Le("link", "网盘链接（可选）", e?.link || "", "url", {
        full: !0
      })}${Le("text", `在线正文（最多 ${x} 词）`, e?.text || "", "textarea", {
        full: !0,
        rows: 12
      })}</div>`,
      footExtra: e ? `<button type="button" class="btn danger" data-act="diy-doc-del" data-id="${e.id}">删除</button>` : "",
      onSubmit: s => {
        if (w(s.text) > x) throw new Error(`正文超过 ${x} 词`);
        if (s.link && !S(s.link)) throw new Error("链接需以 http(s):// 开头");
        ea.put("docs", Object.assign(e || {
          acct: t.id
        }, s)), Vs();
      }
    });
  }
  function Ma(t, e) {
    Oe({
      title: e ? "编辑材料" : "登记材料",
      body: `<div class="form-grid">${Le("title", "材料名称", e?.title || "", "text", {
        required: !0,
        full: !0
      })}${Le("status", "状态", e?.status || "todo", "select", {
        options: [["todo", "未开始"], ["doing", "准备中"], ["done", "已完成"]]
      })}${Le("link", "网盘链接", e?.link || "", "url")}${Le("note", "备注", e?.note || "", "text", {
        full: !0
      })}</div>`,
      footExtra: e ? `<button type="button" class="btn danger" data-act="diy-mat-del" data-id="${e.id}">删除</button>` : "",
      onSubmit: s => {
        if (s.link && !S(s.link)) throw new Error("链接需以 http(s):// 开头");
        ea.put("mats", Object.assign(e || {
          acct: t.id
        }, s)), Vs();
      }
    });
  }
  ms["diy-task-del"] = t => {
    const e = ha(),
      s = ea.d.tasks.find(s => s.id === t.dataset.id && s.acct === e.id);
    s && (ea.remove("tasks", s.id), Ce(), Vs());
  }, ms["diy-doc-del"] = t => {
    const e = ha(),
      s = ea.d.docs.find(s => s.id === t.dataset.id && s.acct === e.id);
    s && (ea.remove("docs", s.id), Ce(), Vs());
  }, ms["diy-mat-del"] = t => {
    const e = ha(),
      s = ea.d.mats.find(s => s.id === t.dataset.id && s.acct === e.id);
    s && (ea.remove("mats", s.id), Ce(), Vs());
  }, document.addEventListener("change", e => {
    const s = e.target,
      a = s.dataset?.act;
    if (!a || !a.startsWith("diy-")) return;
    const i = ha();
    if ("diy-task-done" === a || "diy-task-status" === a) {
      const t = i && ea.d.tasks.find(t => t.id === s.dataset.id && t.acct === i.id);
      if (!t) return;
      t.status = "diy-task-done" === a ? s.checked ? "done" : "todo" : s.value, ea.put("tasks", t), Vs();
    }
    if ("diy-qr-file" === a) {
      const e = s.files && s.files[0];
      if (!e) return;
      if (!/^image\/(png|jpeg|webp)$/.test(e.type)) return Ae("请上传 PNG / JPG / WebP 图片", {
        error: !0
      });
      if (e.size > 409600) return Ae("图片请小于 400 KB", {
        error: !0
      });
      const a = new FileReader();
      a.onload = () => {
        t ? ge.call("PUT", "/diy-admin/config", {
          qr: a.result
        }).then(() => oa("二维码已更新")).catch(t => Ae(t.message, {
          error: !0
        })) : (ea.cfg.qr = a.result, ea.save(), Ae("二维码已更新"), Vs());
      }, a.readAsDataURL(e);
    }
    "diy-modal-school" === a && document.querySelectorAll("#modalForm .diy-pick").forEach(t => t.classList.toggle("sel", !!t.querySelector("input:checked")));
  }), document.addEventListener("change", t => {
    "schoolId" === t.target.name && t.target.closest("#modalForm") && document.querySelectorAll("#modalForm .diy-pick").forEach(t => t.classList.toggle("sel", !!t.querySelector("input:checked")));
  });
  let Na = "login",
    Ba = "";
  function Pa() {
    return `<div class="diy-seg"><button type="button" class="${"login" === Na ? "on" : ""}" data-act="diy-auth-tab" data-tab="login">登录</button><button type="button" class="${"reg" === Na ? "on" : ""}" data-act="diy-auth-tab" data-tab="reg">DIY 免费版注册</button></div>`;
  }
  document.addEventListener("submit", e => {
    const s = e.target;
    if ("loginForm" !== s.id || t) return;
    const a = s.elements.username.value.trim(),
      i = ea.d.accounts.find(t => t.phone === a);
    if (i) {
      if (e.preventDefault(), e.stopImmediatePropagation(), i.pw !== ra(s.elements.password.value)) return Ae("手机号或密码不正确", {
        error: !0
      });
      if (!i.active) return Ae("账号已停用，请联系枫琴顾问", {
        error: !0
      });
      se.logout(), va.login(i.id), location.hash = "#/home", Vs();
    }
  }, !0), document.addEventListener("submit", t => {
    const e = t.target;
    if ("diyRegForm" === e.id) {
      t.preventDefault();
      const s = _e(e);
      if (!/^1\d{10}$/.test(s.phone)) return Ae("请输入 11 位手机号", {
        error: !0
      });
      if (ea.d.accounts.some(t => t.phone === s.phone)) return Ae("该手机号已注册，请直接登录", {
        error: !0
      });
      if (!s.name) return Ae("请填写姓名", {
        error: !0
      });
      const a = La(s.password);
      if (a) return Ae(a, {
        error: !0
      });
      if (s.password !== s.password2) return Ae("两次输入的密码不一致", {
        error: !0
      });
      if (!e.elements.agree.checked) return Ae("请先阅读并同意用户协议与隐私政策", {
        error: !0
      });
      const n = {
        id: i("diy"),
        phone: s.phone,
        pw: ra(s.password),
        name: s.name,
        level: s.level,
        majorId: s.majorId,
        season: s.season,
        currentSchool: "",
        countries: "",
        lang: "",
        active: !0,
        createdAt: d(),
        lastLogin: d(),
        grants: {
          schools: [],
          templates: [],
          report: !1,
          all: !1
        },
        requests: []
      };
      ea.d.accounts.push(n), ea.save(), Na = "login", Ba = n.phone, Vs(), Ae("注册成功，请用手机号和密码登录"), setTimeout(() => {
        const t = document.getElementById("loginForm");
        t && (t.elements.username.value = Ba, t.elements.password.focus());
      }, 30);
    }
  });
  const Ra = {
    tab: "pending",
    q: ""
  };
  Object.assign(ms, {
    "diy-filter"(t) {
      Ra.tab = t.dataset.tab, Vs();
    },
    "diy-qr-clear"() {
      rs(de()) && (t ? ge.call("PUT", "/diy-admin/config", {
        qr: ""
      }).then(() => oa("已移除")) : (ea.cfg.qr = "", ea.save(), Vs()));
    },
    "diy-adm-reset"(e) {
      if (!rs(de())) return;
      const s = ea.acct(e.dataset.id);
      if (!s) return;
      const i = t => Oe({
        title: "密码已重置",
        sub: "只显示这一次，请发给学生",
        body: `<div class="diy-kv"><span>手机号</span><b>${a(s.phone)}</b></div><div class="diy-kv"><span>临时密码</span><b><code>${a(t)}</code></b></div><div class="tiny muted2 mt16">学生用临时密码登录后需要修改密码。</div>`
      });
      if (t) return void ge.call("POST", `/diy-admin/accounts/${s.id}/reset`).then(t => i(t.password)).catch(t => Ae(t.message, {
        error: !0
      }));
      const d = "Fq" + Math.random().toString(36).slice(2, 8) + Math.floor(90 * Math.random() + 10);
      s.pw = ra(d), s.mustChange = !0, ea.save(), i(d);
    },
    "diy-adm-toggle"(e) {
      if (!rs(de())) return;
      const s = ea.acct(e.dataset.id);
      s && (t ? ge.call("POST", `/diy-admin/accounts/${s.id}/active`, {
        active: !s.active
      }).then(() => oa(s.active ? "已停用" : "已启用")).catch(t => Ae(t.message, {
        error: !0
      })) : (s.active = !s.active, ea.save(), Ae(s.active ? "已启用" : "已停用"), Vs()));
    },
    "diy-adm-delete"(e) {
      if (!rs(de())) return;
      const s = ea.acct(e.dataset.id);
      s && De(`删除 DIY 学员 ${a(s.name)} 及其全部数据？不可恢复。`, () => {
        t ? ge.call("DELETE", `/diy-admin/accounts/${s.id}`).then(() => {
          Rs("#/diy-students"), oa("已删除");
        }).catch(t => Ae(t.message, {
          error: !0
        })) : (_a(s.id), Rs("#/diy-students"));
      }, {
        danger: !0,
        yes: "删除"
      });
    },
    "diy-adm-convert"(e) {
      if (!rs(de())) return;
      const s = ea.acct(e.dataset.id);
      s && Oe({
        title: "转为枫琴正式学员",
        sub: "将在「学生」中新建该学生的档案，并停用其 DIY 账号；DIY 中的申请记录会附在档案备注里供顾问参考",
        body: `<div class="form-grid">${Le("advisorId", "负责顾问", "", "select", {
          options: Ee(["advisor", "supervisor"]),
          required: !0
        })}</div>`,
        submitLabel: "转为正式学员",
        onSubmit: e => {
          const a = ea.of("apps", s.id).map(t => `${t.name}（${Js[t.stage || 0]}，截止 ${p(t.deadline)}）`).join("；"),
            d = st.put("students", {
              id: i("stu"),
              name: s.name,
              englishName: "",
              season: s.season || "",
              level: s.level || "UG",
              majorId: s.majorId || "piano",
              currentSchool: s.currentSchool || "",
              status: "active",
              advisorId: e.advisorId,
              writerIds: [],
              intake: {
                status: "not_started",
                changes: []
              },
              skipTpl: [],
              profile: {
                nameZh: s.name,
                nameEn: "",
                guardians: [],
                education: [{
                  stage: "初中"
                }, {
                  stage: "高中 / 当前学校",
                  schoolZh: s.currentSchool || ""
                }],
                tests: [],
                activities: [],
                awards: [],
                files: {},
                accounts: []
              },
              note: `由 DIY 免费版转入（手机号 ${s.phone}）。DIY 中的院校：${a || "无"}`
            });
          Jt(d.id, null, "由 DIY 免费版转为正式学员", !1), t && ge.call("POST", `/diy-admin/accounts/${s.id}/converted`, {
            studentId: d.id
          }).then(() => na()).catch(t => Ae(t.message, {
            error: !0
          })), s.active = !1, s.convertedTo = d.id, ea.save(), Ae("已转为正式学员：" + d.name), Rs("#/student/" + d.id);
        }
      });
    }
  }), document.addEventListener("submit", e => {
    const s = e.target;
    if ("diyGrantForm" === s.id) {
      if (e.preventDefault(), !rs(de())) return;
      const a = ea.acct(s.dataset.id);
      if (!a) return;
      const i = _e(s);
      if (a.grants = {
        all: !!s.elements.all.checked,
        schools: (i.schools || []).filter(t => !ea.cfg.freeSchools.includes(t)),
        templates: (i.templates || []).filter(t => !ea.cfg.freeTemplates.includes(t)),
        report: !!s.elements.report.checked
      }, t) return void ge.call("PUT", `/diy-admin/accounts/${a.id}/grants`, {
        grants: a.grants,
        clearReq: s.elements.clearReq.checked
      }).then(() => oa("授权已保存")).catch(t => Ae(t.message, {
        error: !0
      }));
      s.elements.clearReq.checked && (a.requests || []).forEach(t => {
        t.done = !0;
      }), ea.save(), Ae("授权已保存"), Vs();
    }
    if ("diyCfgForm" === s.id) {
      if (e.preventDefault(), !rs(de())) return;
      const a = _e(s),
        i = {
          freeSchools: a.freeSchools || [],
          freeTemplates: a.freeTemplates || [],
          serviceTitle: a.serviceTitle || "枫琴英美音乐留学申请服务",
          serviceText: a.serviceText || "",
          openRegister: !!s.elements.openRegister.checked
        };
      if (t) return void ge.call("PUT", "/diy-admin/config", i).then(() => oa("设置已保存")).catch(t => Ae(t.message, {
        error: !0
      }));
      Object.assign(ea.cfg, i), ea.save(), Ae("设置已保存"), Vs();
    }
  }), document.addEventListener("keydown", t => {
    "Enter" === t.key && "diy-search" === t.target.dataset?.act && (Ra.q = t.target.value.trim(), Ra.tab = "all", Vs());
  });
  const Fa = Fs;
  Fs = function () {
    const t = Fa();
    if (ae() && "supervisor" === ae().role) {
      const e = ea.d ? ea.d.accounts.filter(t => pa(t).length).length : 0;
      t.push(["diy-students", "users", "DIY 学员", e ? {
        n: e,
        hot: !0
      } : null], ["diy-settings", "settings", "DIY 设置与授权"]);
    }
    return t;
  };
  const Va = Us;
  Us = function () {
    let e = Va();
    const s = e.indexOf('<form id="loginForm"');
    if (s < 0) return e;
    if ("reg" === Na) {
      const t = e.lastIndexOf("</div></div>");
      return e.slice(0, s) + Pa() + (ea.cfg.openRegister ? `<form id="diyRegForm" class="stack tight"><div class="tiny muted2">永久免费 · 一个手机号注册一个账号 · 注册后用手机号在「登录」中登录</div>\n      <div class="form-grid">${Le("phone", "手机号（登录账号）", "", "text", {
        required: !0,
        placeholder: "11 位手机号"
      })}${Le("name", "姓名", "", "text", {
        required: !0
      })}${Le("password", "设置密码", "", "password", {
        required: !0,
        hint: "8 位以上，含字母和数字"
      })}${Le("password2", "再次输入", "", "password", {
        required: !0
      })}${Le("level", "申请层次", "PG", "select", {
        options: us
      })}${Le("season", "入学季", "2027 Fall")}${Le("majorId", "专业方向", "piano", "select", {
        options: cs(),
        full: !0
      })}</div>\n      <label class="small" style="display:flex;gap:8px;align-items:flex-start;line-height:1.5"><input type="checkbox" name="agree"> 我已阅读并同意《用户协议》《隐私政策》，同意枫琴就申请事宜与我联系</label>\n      <button class="btn primary" type="submit" style="padding:10px">注册</button></form>` : '<div class="notice">暂未开放注册，请联系枫琴顾问。</div>') + e.slice(t);
    }
    e = e.replace("登录名", "登录名 / 手机号").replace("如 wang", "员工登录名，或 DIY 免费版注册的手机号");
    const i = e.lastIndexOf("</div></div>");
    return e.slice(0, s) + Pa() + e.slice(s, i) + function () {
      if (t) return "";
      const e = ea.d.accounts.filter(t => t.active).slice(0, 2);
      return e.length ? `<div class="mt16"><div class="tiny muted2">DIY 免费版演示账号（手机号登录，密码 Diy2026a）</div><div class="demo-accounts">${e.map(t => `<button data-act="diy-login-as" data-id="${t.id}"><b>${a(t.name)}</b><span>DIY 免费版 · ${a(t.phone)}</span></button>`).join("")}</div></div>` : "";
    }() + e.slice(i);
  };
  const Ua = Vs;
  if (Vs = function () {
    if (Zs) return ea.d ? (st.reqdb = ea.reqdb, void ka()) : void (document.getElementById("app").innerHTML = '<div class="login"><div class="small muted">正在加载…</div></div>');
    if (!t && va.acct) {
      if (ha().active) return void ka();
      va.logout();
    }
    if (Ua(), !ae() || "supervisor" !== ae().role) return;
    if (t && (!ea.d || Date.now() - daAt > 15e3 && ["diy-students", "diy-student", "diy-settings"].includes(Ps().name))) return void (da || na().then(() => Vs()));
    const e = Ps(),
      s = document.querySelector('.nav-btn[data-href="#/diy-students"]');
    if (s && s.insertAdjacentHTML("beforebegin", '<div class="nav-sec">DIY 免费版</div>'), !["diy-students", "diy-student", "diy-settings"].includes(e.name)) return;
    const i = document.querySelector(".content");
    if (!i) return;
    try {
      i.innerHTML = "diy-settings" === e.name ? function () {
        const t = ea.cfg,
          e = ca();
        return `<div class="page-head"><div><h2>DIY 设置与授权<em>免费版</em></h2><p>二维码、示范院校、基础模板与注册开关；对所有 DIY 学员生效</p></div><div class="page-actions"><button class="btn" data-act="go" data-href="#/diy-students">DIY 学员</button></div></div>\n    <div class="grid cols-main"><form class="panel" id="diyCfgForm"><div class="panel-head"><div><h3>${I("settings")} 免费版默认内容</h3><p>建议示范院校 3 所、基础模板 3 个</p></div><button class="btn primary" type="submit">保存设置</button></div><div class="panel-body">\n      <div class="form-section">示范院校（所有 DIY 学员默认可用，已选 ${t.freeSchools.length}）</div>\n      <div class="diy-grants">${e.map(e => `<label class="small" style="display:flex;gap:7px;align-items:center"><input type="checkbox" name="freeSchools" value="${e.id}" ${t.freeSchools.includes(e.id) ? "checked" : ""}> ${a(e.abbr || "")} · ${a(e.en)}</label>`).join("")}</div>\n      <div class="form-section">基础任务模板（已选 ${t.freeTemplates.length}）</div>\n      <div class="diy-grants">${Ys.map(e => `<label class="small" style="display:flex;gap:7px;align-items:center"><input type="checkbox" name="freeTemplates" value="${e.id}" ${t.freeTemplates.includes(e.id) ? "checked" : ""}> ${a(e.title)}</label>`).join("")}</div>\n      <div class="form-section">申请服务介绍（学生端推广卡片与弹窗）</div>\n      <div class="form-grid">${Le("serviceTitle", "服务名称", t.serviceTitle, "text", {
          full: !0
        })}${Le("serviceText", "一句话介绍", t.serviceText, "textarea", {
          full: !0
        })}</div>\n      <label class="small mt16" style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="openRegister" ${t.openRegister ? "checked" : ""}> 开放免费注册</label>\n    </div></form>\n    <section class="panel"><div class="panel-head"><div><h3>${I("user")} 顾问二维码</h3><p>显示在学生端侧栏、推广卡片与所有开通弹窗</p></div></div><div class="panel-body"><div class="row" style="gap:16px;align-items:center">${ba("lg")}<div class="stack tight"><label class="btn">${I("upload")} 上传二维码图片<input type="file" accept="image/png,image/jpeg,image/webp" data-act="diy-qr-file" style="display:none"></label>${t.qr ? '<button class="btn danger sm" data-act="diy-qr-clear">移除</button>' : ""}<div class="tiny muted2">PNG / JPG，小于 400 KB</div></div></div></div></section></div>`;
      }() : "diy-student" === e.name ? function (t) {
        const e = ea.acct(t);
        if (!e) return Me("找不到该 DIY 学员");
        const s = ea.of("apps", e.id),
          i = ea.of("tasks", e.id),
          d = pa(e),
          n = ca(),
          o = new Set(d.filter(t => "school" === t.kind).map(t => t.ref)),
          l = new Set(d.filter(t => "template" === t.kind).map(t => t.ref));
        return `<div class="page-head"><div><h2>${a(e.name)}<em>DIY</em></h2><p>${a(e.phone)} · ${a(wa(e.level))} · ${a(ot(e.majorId))} · ${a(e.season || "")} · 注册 ${p(e.createdAt)} · 最近登录 ${p(e.lastLogin)}</p></div>\n    <div class="page-actions"><button class="btn" data-act="go" data-href="#/diy-students">返回列表</button>${Ne([{
          act: "diy-adm-reset",
          label: "重置密码",
          data: {
            id: e.id
          }
        }, {
          act: "diy-adm-toggle",
          label: e.active ? "停用账号" : "启用账号",
          data: {
            id: e.id
          }
        }, {
          act: "diy-adm-convert",
          label: "转为枫琴正式学员",
          data: {
            id: e.id
          }
        }, {
          act: "diy-adm-delete",
          label: "删除账号及全部数据",
          danger: !0,
          data: {
            id: e.id
          }
        }])}</div></div>\n    ${d.length ? `<div class="notice warn">${I("alert")}<div><strong>待处理的开通申请</strong>${d.map(t => `${a((t => "school" === t.kind ? t.ref ? "院校：" + (dt(t.ref)?.en || t.ref) : "院校要求（学生手动添加的院校，院校库暂未收录）" : "template" === t.kind ? "模板：" + (Ys.find(e => e.id === t.ref)?.title || t.ref) : "report" === t.kind ? "进度报告" : "service" === t.kind ? "咨询申请服务" : "院校要求库（未指定院校）")(t))}（${p(t.at)}）`).join("；")}</div></div>` : ""}\n    <div class="grid cols-main mt16"><form class="panel" id="diyGrantForm" data-id="${e.id}"><div class="panel-head"><div><h3>${I("shield")} 授权</h3><p>勾选后保存，学生刷新页面即可使用</p></div><button class="btn primary" type="submit">保存授权</button></div><div class="panel-body">\n      <label class="small" style="display:flex;gap:8px;align-items:center;font-weight:800"><input type="checkbox" name="all" ${e.grants.all ? "checked" : ""}> 全部开通（所有院校、模板与进度报告）</label>\n      <div class="form-section">院校（示范院校默认开通；学生申请的已标出）</div>\n      <div class="diy-grants">${n.map(t => {
          const s = ea.cfg.freeSchools.includes(t.id);
          return `<label class="small" style="display:flex;gap:7px;align-items:center"><input type="checkbox" name="schools" value="${t.id}" ${s || e.grants.schools.includes(t.id) ? "checked" : ""} ${s ? "disabled" : ""}> ${a(t.abbr || t.en)}${s ? ' <span class="muted2">示范</span>' : ""}${o.has(t.id) ? ' <span class="pill warn">学生申请</span>' : ""}</label>`;
        }).join("")}</div>\n      <div class="form-section">任务模板</div>\n      <div class="diy-grants">${Ys.map(t => {
          const s = ea.cfg.freeTemplates.includes(t.id);
          return `<label class="small" style="display:flex;gap:7px;align-items:center"><input type="checkbox" name="templates" value="${t.id}" ${s || e.grants.templates.includes(t.id) ? "checked" : ""} ${s ? "disabled" : ""}> ${a(t.title)}${s ? ' <span class="muted2">基础</span>' : ""}${l.has(t.id) ? ' <span class="pill warn">学生申请</span>' : ""}</label>`;
        }).join("")}</div>\n      <div class="form-section">其他</div>\n      <label class="small" style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="report" ${e.grants.report ? "checked" : ""}> 进度报告</label>\n      <label class="small" style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" name="clearReq" ${d.length ? "checked" : ""}> 保存后将学生的开通申请标记为已处理</label>\n    </div></form>\n    <div class="stack"><section class="panel"><div class="panel-head"><div><h3>${I("book")} 学生的申请（只读）</h3></div><span class="count">${s.length}</span></div><div class="list">${s.map(t => `<div class="item"><div class="mark">${I("flag")}</div><div class="main"><div class="title">${a(t.name)}</div><div class="meta">${Js[t.stage || 0]} · 截止 ${p(t.deadline)} · ${ua.school(e, t.schoolId) ? "院校库" : "手动添加"}</div></div></div>`).join("") || Me("还没有添加院校")}</div></section>\n      <section class="panel"><div class="panel-head"><div><h3>${I("user")} 资料</h3></div></div><div class="panel-body">${[["目前学校", e.currentSchool], ["目标国家", e.countries], ["语言成绩", e.lang], ["任务", `${i.filter(t => "done" === t.status).length} / ${i.length} 已完成`]].map(([t, e]) => `<div class="diy-kv"><span>${t}</span><b>${a(e || "—")}</b></div>`).join("")}</div></section></div></div>`;
      }(e.a) : function () {
        const t = ea.d.accounts,
          e = Ra,
          s = t.filter(t => pa(t).length).length,
          i = t.filter(t => t.grants.all || t.grants.schools.length || t.grants.templates.length || t.grants.report).length,
          d = t.filter(t => u((t.lastLogin || t.createdAt).slice(0, 10)) < -30).length;
        let n = t.filter(t => "pending" === e.tab ? pa(t).length : "granted" === e.tab ? t.grants.all || t.grants.schools.length || t.grants.templates.length || t.grants.report : "off" !== e.tab || !t.active);
        e.q && (n = n.filter(t => (t.name + t.phone).includes(e.q))), n.sort((t, e) => pa(e).length - pa(t).length || String(e.createdAt).localeCompare(String(t.createdAt)));
        const o = (t, s) => `<button class="btn sm ${e.tab === t ? "primary" : ""}" data-act="diy-filter" data-tab="${t}">${s}</button>`;
        return `<div class="page-head"><div><h2>DIY 学员<em>免费版</em></h2><p>自助注册的免费用户 · 只能使用已授权的院校与模板 · 不出现在「学生」列表与工作台</p></div><div class="page-actions"><button class="btn" data-act="go" data-href="#/diy-settings">${I("settings")} 二维码与默认授权</button></div></div>\n    <div class="grid stats">${Je("注册人数", t.length, "全部 DIY 账号")}${Je("待开通", s, "学生提交了开通申请", {
          cls: s ? "warn" : ""
        })}${Je("已开通部分权限", i, "")}${Je("30 天未登录", d, "")}</div>\n    <section class="panel"><div class="panel-head" style="flex-wrap:wrap"><div class="row" style="gap:6px;flex-wrap:wrap">${o("pending", `待开通 ${s}`)}${o("all", `全部 ${t.length}`)}${o("granted", "已开通")}${o("off", "已停用")}</div><input class="input" style="max-width:240px" placeholder="姓名 / 手机号，回车" data-act="diy-search" value="${a(e.q)}"></div>\n      <div class="table-wrap"><table><thead><tr><th>DIY 学员</th><th>方向 / 入学季</th><th>院校</th><th>已开通</th><th>申请开通</th><th>最近登录</th><th></th></tr></thead><tbody>${n.map(t => `<tr class="click" data-act="go" data-href="#/diy-student/${t.id}"><td><div class="td-main">${a(t.name)} ${t.active ? "" : '<span class="pill plain">停用</span>'}</div><div class="td-sub">${a(t.phone)} · 注册 ${p(t.createdAt)}</div></td><td class="small">${a(ot(t.majorId))} · ${a(wa(t.level))}<br><span class="td-sub">${a(t.season || "")}</span></td><td>${ea.of("apps", t.id).length}</td><td class="small">${a((t => t.grants.all ? "全部" : [`示范 ${ea.cfg.freeSchools.length}`, t.grants.schools.length ? `+${t.grants.schools.length} 校` : "", t.grants.templates.length ? `+${t.grants.templates.length} 模板` : "", t.grants.report ? "+报告" : ""].filter(Boolean).join(" "))(t))}</td><td>${pa(t).length ? `<span class="pill warn">${a((t => pa(t).map(t => "school" === t.kind ? t.ref ? dt(t.ref)?.abbr || t.ref : "手动院校" : "template" === t.kind ? "模板" : "report" === t.kind ? "报告" : "service" === t.kind ? "咨询服务" : "院校库").join("、"))(t))}</span>` : '<span class="muted2">—</span>'}</td><td class="small">${p(t.lastLogin)}</td><td><button class="btn sm" data-act="go" data-href="#/diy-student/${t.id}">授权 ${I("arrow")}</button></td></tr>`).join("") || `<tr><td colspan="7">${Me("没有符合条件的 DIY 学员")}</td></tr>`}</tbody></table></div></section>`;
      }();
    } catch (t) {
      console.error(t), i.innerHTML = `<div class="notice err">${I("alert")}<div><strong>页面出错</strong>${a(t.message)}</div></div>`;
    }
    const d = "diy-settings" === e.name ? "diy-settings" : "diy-students";
    document.querySelectorAll(".nav-btn").forEach(t => t.classList.toggle("active", t.dataset.href === "#/" + d));
    const n = document.querySelector(".crumbs");
    if (n && "diy-student" === e.name) {
      const t = ea.acct(e.a);
      n.innerHTML = `<button data-act="go" data-href="#/diy-students">DIY 学员</button><span class="cur">${a(t?.name || "")}</span>`;
    }
  }, t) Zs && (Vs(), ia());else {
    ea.load(), va.restore();
    const t = se.login.bind(se);
    se.login = e => {
      va.logout(), t(e);
    }, Vs();
  }

  /* FQ-AI hook：只暴露现有函数的引用，AI 采纳建议时走与人工操作相同的保存与权限逻辑 */
  try { Object.defineProperty(window, "FQAPP", { value: Object.freeze({ st, bt, ce, se, ae, de, ne, oe, Vs, Ae, Jt, Kt, Zt, ft, yt, It, $t, it, dt, ot, wa, X, q, O, F, C, V, c, l, p, u, w, x, mk: i, now: d, server: t }), configurable: false }); } catch (_) {}
}();
