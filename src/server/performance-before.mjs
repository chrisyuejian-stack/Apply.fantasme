// Frozen stage-A reference functions from main@b714a6c; loaded only inside a temporary test module.
async function fqLegacyBootstrap(t, e) {
  let i = await de(t, e),
    n = (await t.DB.prepare("SELECT tbl, data FROM records").all()).results,
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

async function fqLegacyAuditAll(deps, user, scope) {
  const idx = deps.idx, today = fqaiDay();
  const rows = await deps.data.rows(['applications', 'submissions', 'rounds', 'tasks']);
  const ids = [...scope.manage];
  const list = [];
  for (const sid of ids) {
    const s = scope.byId.get(sid); if (!s) continue;
    const B = fqaiBundle(s, rows.filter(r => r.studentId === sid));
    if (!B.tasks.length) continue;
    const { issues } = fqaiAuditIssues(B, idx, today);
    const bad = issues.filter(i => i.level === 'bad'), warn = issues.filter(i => i.level === 'warn');
    if (issues.length) list.push({ sid, name: s.name, bad: bad.length, warn: warn.length, top: (bad[0] || warn[0]).text });
  }
  list.sort((a, b) => b.bad - a.bad || b.warn - a.warn);
  const md = list.length
    ? `检查了你名下 **${ids.length} 位学生**的任务，${list.length} 位有需要留意的地方：\n\n| 学生 | 需处理 | 提醒 | 最主要的问题 |\n|---|---|---|---|\n` + list.slice(0, 20).map(x => `| [${x.name}](#/student/${x.sid}/tasks) | ${x.bad} | ${x.warn} | ${fqaiCut(x.top, 70).replace(/\|/g, '/')} |`).join('\n')
    : `检查了你名下 **${ids.length} 位学生**的任务，没有发现重复、顺序、关联或日期问题。`;
  return { icon: 'flow', title: '体检总览', sub: '由程序计算，不调用 AI、不联网', md, follow: list.slice(0, 4).map(x => ({ label: '体检 · ' + x.name, action: 'audit', studentId: x.sid })), note: '点下面的学生可以做完整体检（AI 梳理 + 联网核对官网 + 修改建议卡片）。' };
}

