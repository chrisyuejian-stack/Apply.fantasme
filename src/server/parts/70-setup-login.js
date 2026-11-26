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
