var we = ["students", "applications", "submissions", "rounds", "tasks", "documents", "versions", "reviews", "materials", "repertoire", "recommenders", "refRequests", "activity", "templates", "boardTasks"],
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
    boardV12: fqBoardV12(t),
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
  if (e === "boardTasks") return fqBoardVisible(t,i) ? i : null;
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
async function Qe(t, e, i, n, o, r, files) {
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
  if (e === "boardTasks") return t.boardV12 ? {ok:false,error:"请使用任务专用操作接口"} : fqBoardPermission(s, i, n, o, r);
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
        } else if (h.kind === 'upload') {
          h.upload = await fqFileVersion(files,h.upload?.key,c);
          delete h.link; delete h.text; delete h.words;
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
