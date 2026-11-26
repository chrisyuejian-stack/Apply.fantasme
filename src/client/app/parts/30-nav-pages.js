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
