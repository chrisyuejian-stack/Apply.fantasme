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
