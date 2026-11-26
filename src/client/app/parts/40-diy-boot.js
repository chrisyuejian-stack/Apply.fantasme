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
