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
    tt = ["users", "students", "applications", "submissions", "rounds", "tasks", "documents", "versions", "reviews", "materials", "repertoire", "recommenders", "refRequests", "activity", "templates", "boardTasks"],
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
