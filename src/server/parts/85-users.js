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
