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
        this.features=t.features||{};
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
    const s = [["users", "账号与分配"], ["collect", "收款码"], ["templates", "任务模板"], ["schools", "院校要求库"], ["data", "数据"]].concat(t ? [["audit", "操作日志"]] : []),
      i = "collect" === e ? fqFeeCollectPanel() : "templates" === e ? function () {
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
