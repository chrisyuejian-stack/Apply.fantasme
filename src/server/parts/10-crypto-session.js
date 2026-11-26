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
