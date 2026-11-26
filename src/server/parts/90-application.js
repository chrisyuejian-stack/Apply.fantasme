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
  if (y.mustChange) throw new s(403, '请先修改初始密码', {mustChange:true});
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
function fqValidateImportReqdb(e) {
  if (!e || !Array.isArray(e.schools) || !Array.isArray(e.records) || !e.taxonomy) throw new I(400, "\u9662\u6821\u5E93\u683C\u5F0F\u4E0D\u5BF9\uFF1A\u9700\u8981 taxonomy\u3001schools\u3001records");
}
async function at(t, e) {
  fqValidateImportReqdb(e);
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
      if (!['advisor','supervisor','student'].includes(record.stage) || !['approve','changes'].includes(record.decision) || (doc.status === 'final' && !(record.decision === 'changes' && ['advisor','supervisor'].includes(record.stage)))) throw new I(400, '审核操作不正确');
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
function fqApplicationSameOrigin(request) {
  if (request.method === 'GET' || request.method === 'HEAD') return;
  const origin = request.headers.get('Origin');
  if ((origin !== null && origin !== new URL(request.url).origin) || request.headers.get('Sec-Fetch-Site') === 'cross-site') throw new I(403, '请求来源不一致');
}
async function Yn(t, e, i) {
  let n = i.pathname.replace(/^\/api/, ""),
    o = t.method;
  if (o !== "GET" && t.headers.get("X-FQ") !== "1") throw new I(403, "\u8BF7\u6C42\u88AB\u62D2\u7EDD");
  fqApplicationSameOrigin(t);
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
    n = (e.role === 'supervisor'
      ? await t.DB.prepare('SELECT tbl, data FROM records').all()
      : await t.DB.prepare("SELECT tbl, data FROM records WHERE student_id IN (SELECT value FROM json_each(?))" + (ve(e) ? " OR tbl='templates'" : '') + ' ORDER BY rowid').bind(JSON.stringify([...i.visible])).all()).results,
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
// Import staging uses existing records/meta only. No DDL or production migrations.
const fqImportLockKey = '__imp:lock';
const fqImportLeaseMs = 300000;
function fqValidateBackup(backup) {
  if (!backup || typeof backup !== 'object' || Array.isArray(backup) || backup.format !== 'fq-admissions') throw new I(400, '不是本系统导出的备份文件');
  const tables = we.filter(table => Object.hasOwn(backup, table));
  if (!tables.length) throw new I(400, '空备份：没有业务表数组');
  for (const table of tables) {
    if (!Array.isArray(backup[table])) throw new I(400, table + ' 必须为数组');
    const ids = new Set();
    for (const row of backup[table]) {
      if (!row || typeof row !== 'object' || Array.isArray(row) || typeof row.id !== 'string' || !row.id || ids.has(row.id)) throw new I(400, table + ' 记录编号无效或重复');
      if (row.studentId != null && typeof row.studentId !== 'string') throw new I(400, table + ' 学生编号格式无效');
      ids.add(row.id);
    }
  }
  if (backup.reqdb != null) {
    fqValidateImportReqdb(backup.reqdb);
    if (backup.reqdb.schools.some(row => !row || typeof row !== 'object' || Array.isArray(row) || typeof row.id !== 'string') || backup.reqdb.records.some(row => !row || typeof row !== 'object' || Array.isArray(row))) throw new I(400, '院校库记录格式无效');
  }
  if (backup.users !== undefined && !Array.isArray(backup.users)) throw new I(400, 'users 必须为数组');
  const ids = new Set(), names = new Set();
  for (const user of backup.users || []) {
    if (!user || typeof user !== 'object' || typeof user.id !== 'string' || !user.id || typeof user.username !== 'string' || !user.username.trim()) throw new I(400, '备份用户编号或登录名无效');
    const name = user.username.replace(/[A-Z]/g, c => c.toLowerCase());
    if (ids.has(user.id) || names.has(name)) throw new I(400, '备份内用户编号或登录名重复');
    ids.add(user.id); names.add(name);
  }
  return tables;
}
function fqImportGuard(phase) {
  return "EXISTS(SELECT 1 FROM meta WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='" + phase + "')";
}
function fqImportJsonChunks(rows) {
  const chunks = []; let chunk = [], length = 2;
  for (const row of rows) {
    const encoded = JSON.stringify(row);
    if (chunk.length && length + encoded.length > 250000) { chunks.push('[' + chunk.join(',') + ']'); chunk = []; length = 2; }
    chunk.push(encoded); length += encoded.length + 1;
  }
  if (chunk.length) chunks.push('[' + chunk.join(',') + ']');
  return chunks;
}
async function fqImportBackup(env, backup) {
  const tables = fqValidateBackup(backup);
  const existing = (await env.DB.prepare('SELECT id,username FROM users').all()).results;
  const ids = new Set(existing.map(user => user.id));
  const names = new Map(existing.map(user => [user.username.replace(/[A-Z]/g, c => c.toLowerCase()), user.id]));
  for (const user of backup.users || []) {
    const other = names.get(user.username.replace(/[A-Z]/g, c => c.toLowerCase()));
    if (other !== undefined && other !== user.id) throw new I(400, '登录名冲突：' + user.username);
    if (!ids.has(user.id) && (typeof user.name !== 'string' || !['supervisor','advisor','writer','student'].includes(user.role))) throw new I(400, '新用户姓名或角色无效');
  }
  const users = [], created = [], now = j();
  for (const user of backup.users || []) {
    if (ids.has(user.id)) continue;
    const password = ee(), hash = await H(password);
    users.push({...user, pw_hash:hash.hash, pw_salt:hash.salt, active:user.active ? 1 : 0, createdAt:now});
    created.push({name:user.name,username:user.username,password});
  }
  const token = crypto.randomUUID(), prefix = '__imp:' + token + ':';
  const lease = () => JSON.stringify({token,phase:'staging',expiresAt:Date.now() + fqImportLeaseMs});
  const acquired = await env.DB.prepare("INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value WHERE json_extract(meta.value,'$.expiresAt') <= ?").bind(fqImportLockKey,lease(),Date.now()).run();
  if (acquired.meta.changes !== 1) throw new I(409, '另一个导入正在进行，请稍后重试');
  let committed = false;
  try {
    await env.DB.prepare("DELETE FROM records WHERE tbl GLOB '__imp:*' AND " + fqImportGuard('staging')).bind(fqImportLockKey,token).run();
    let pending = [], count = 0;
    const flush = async () => {
      if (!pending.length) return;
      const renewed = env.DB.prepare("UPDATE meta SET value=? WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='staging'").bind(lease(),fqImportLockKey,token);
      const result = await env.DB.batch([renewed,...pending]);
      if (result.some(row => row.meta.changes !== 1)) throw new I(409, '导入锁已失效，请重试');
      pending = [];
    };
    for (const table of tables) for (const original of backup[table]) {
      const row = {...original,updatedAt:original.updatedAt || now,createdAt:original.createdAt || now};
      pending.push(env.DB.prepare('INSERT INTO records(tbl,id,student_id,data,updated_at) SELECT ?,?,?,?,? WHERE ' + fqImportGuard('staging')).bind(prefix + table,row.id,table === 'students' ? row.id : row.studentId || null,JSON.stringify(row),row.updatedAt,fqImportLockKey,token));
      count++;
      if (pending.length === 79) await flush();
    }
    await flush();
    // The first statement arms all remaining writes only when ownership and the
    // complete staged row count still match. On a lost lease every write is a no-op.
    const guard = fqImportGuard('committing');
    const statements = [env.DB.prepare("UPDATE meta SET value=json_set(value,'$.phase','committing') WHERE key=? AND json_extract(value,'$.token')=? AND json_extract(value,'$.phase')='staging' AND json_extract(value,'$.expiresAt') > CAST(strftime('%s','now') AS INTEGER)*1000 AND (SELECT COUNT(*) FROM records WHERE tbl GLOB ?)=?").bind(fqImportLockKey,token,prefix + '*',count)];
    statements.push(env.DB.prepare('DELETE FROM records WHERE tbl IN (SELECT value FROM json_each(?)) AND ' + guard).bind(JSON.stringify(tables),fqImportLockKey,token));
    statements.push(env.DB.prepare('UPDATE records SET tbl=substr(tbl,?) WHERE tbl GLOB ? AND ' + guard).bind(prefix.length + 1,prefix + '*',fqImportLockKey,token));
    if (backup.reqdb != null) {
      const library = backup.reqdb, meta = [], counts = new Map(), groups = new Map();
      for (const row of library.records) { const group = groups.get(row.school) || []; group.push(row); groups.set(row.school,group); }
      for (const school of library.schools) {
        const rows = groups.get(school.id) || []; counts.set(school.id,rows.length);
        meta.push({key:'reqdb:school:' + school.id,value:JSON.stringify(rows)});
      }
      meta.push({key:'reqdb:head',value:JSON.stringify({format:library.format,version:library.version,exportedAt:library.exportedAt,taxonomy:library.taxonomy,schools:library.schools.map(school => ({...school,recordCount:counts.get(school.id) || 0}))})});
      statements.push(env.DB.prepare("DELETE FROM meta WHERE key LIKE 'reqdb:school:%' AND " + guard).bind(fqImportLockKey,token));
      for (const chunk of fqImportJsonChunks(meta)) statements.push(env.DB.prepare("INSERT OR REPLACE INTO meta(key,value) SELECT json_extract(value,'$.key'),json_extract(value,'$.value') FROM json_each(?) WHERE " + guard).bind(chunk,fqImportLockKey,token));
    }
    for (const chunk of fqImportJsonChunks(users)) statements.push(env.DB.prepare("INSERT INTO users(id,username,name,role,student_id,active,pw_hash,pw_salt,must_change,created_at,updated_at) SELECT json_extract(value,'$.id'),json_extract(value,'$.username'),json_extract(value,'$.name'),json_extract(value,'$.role'),json_extract(value,'$.studentId'),json_extract(value,'$.active'),json_extract(value,'$.pw_hash'),json_extract(value,'$.pw_salt'),1,json_extract(value,'$.createdAt'),json_extract(value,'$.createdAt') FROM json_each(?) WHERE " + guard).bind(chunk,fqImportLockKey,token));
    statements.push(env.DB.prepare('DELETE FROM meta WHERE key=? AND ' + guard).bind(fqImportLockKey,fqImportLockKey,token));
    const result = await env.DB.batch(statements);
    if (result[0].meta.changes !== 1) throw new I(409, '导入锁或暂存记录已变化，原数据未替换');
    committed = true;
    return created;
  } catch (error) {
    if (error instanceof I) throw error;
    if (/UNIQUE constraint/i.test(String(error.message))) throw new I(409, '导入时发生用户或记录冲突，原数据未替换');
    throw new I(500, '导入失败，原业务数据未替换');
  } finally {
    if (!committed) {
      try {
        await env.DB.batch([
          env.DB.prepare('DELETE FROM records WHERE tbl GLOB ?').bind(prefix + '*'),
          env.DB.prepare("DELETE FROM meta WHERE key=? AND json_extract(value,'$.token')=?").bind(fqImportLockKey,token)
        ]);
      } catch { /* A later import cleans abandoned staging after the lease expires. */ }
    }
  }
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
    const r = await X(t);
    const s = await fqImportBackup(e, r);
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
