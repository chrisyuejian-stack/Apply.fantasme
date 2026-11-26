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
        n = t.dataset.mode || (d && !Ue(d) ? "file" : "text"),
        o = d && Ue(d) ? d.text : "";
      Oe({
        title: "新版本",
        sub: e.title + " · 可以直接在系统里写正文（不超过 " + x + " words），也可以登记网盘文件",
        wide: !0,
        body: `${s && "revising" === e.status ? `<div class="notice err">${I("message")}<div><strong>需要回应的意见</strong>${a(s.comment)}</div></div>` : ""}\n      <div class="seg"><label><input type="radio" name="mode" value="text" data-act="ver-mode" ${"text" === n ? "checked" : ""}>${I("edit")} 在线输入正文</label><label><input type="radio" name="mode" value="file" data-act="ver-mode" ${"file" === n ? "checked" : ""}>${I("link")} 登记网盘文件</label></div>\n      <div id="verText" ${"text" === n ? "" : "hidden"}>\n        <textarea class="textarea" name="text" id="verTextArea" rows="16" style="font:14px/1.7 Georgia,'Times New Roman','Songti SC',serif" placeholder="在这里撰写或粘贴文书正文">${a(o)}</textarea>\n        <div class="word-count" id="verCount">${w(o)} / ${x} words</div>\n        ${o ? `<div class="tiny muted2">已带入 V${d.no} 的正文，修改后保存为新版本；旧版本保留不变。</div>` : ""}\n      </div>\n      <div id="verFile" class="form-grid" ${"file" === n ? "" : "hidden"}>${Le("link", "网盘链接", "", "url", {
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
        onSubmit: t => {
          const s = (bt.versionsOf(e.id)[0]?.no || 0) + 1;
          let a;
          if ("text" === t.mode) {
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
            }[n.stage])} ${a($t(n.userId))} 退回了 V${st.get("versions", n.versionId)?.no || ""}（${p(n.createdAt)}）</strong>${a(n.comment)}</div></div>` : ""}\n      ${ce.docUpload(e) && !ce.docSubmit(e) && "revising" === e.status ? '<div class="tiny muted2 mt8">请先上传修改后的新版本，再送审。</div>' : ""}\n    </div></section>\n    <div class="grid cols-main"><section class="panel"><div class="panel-head"><div><h3>版本与审核记录</h3><p>文件存放在网盘；每个版本下保留对应的审核意见</p></div></div><div class="panel-body stack tight">${i.map(t => {
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
