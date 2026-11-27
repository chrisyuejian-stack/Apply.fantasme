async function Jn(t, e) {
  let i = await de(t, e),
    n = (e.role === 'supervisor'
      ? await t.DB.prepare("SELECT tbl, data FROM records WHERE tbl NOT GLOB '__imp:*'").all()
      : await t.DB.prepare("SELECT tbl, data FROM records WHERE (student_id IN (SELECT value FROM json_each(?))" + (ve(e) ? " OR tbl='templates'" : '') + (['advisor','supervisor'].includes(e.role) ? " OR tbl='boardTasks'" : '') + ") AND tbl NOT GLOB '__imp:*' ORDER BY rowid").bind(JSON.stringify([...i.visible])).all()).results,
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
    features: {boardV12: fqBoardV12(t)},
    serverTime: j()
  });
}
