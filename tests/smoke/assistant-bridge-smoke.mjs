#!/usr/bin/env node
// M3 助理对接签名冒烟脚本（#62 / #68）。
// 仅从环境变量读取密钥，绝不打印密钥或真实学生数据。
// 用法：
//   ASSISTANT_BRIDGE_URL=https://preview.fantasme-apply-test.pages.dev \
//   ASSISTANT_BRIDGE_SECRET=... \
//   EXPECT_V12=0|1 \
//   ADVISOR=<advisor_username> \
//   node tests/smoke/assistant-bridge-smoke.mjs

import assert from 'node:assert/strict';
import { createHash, createHmac } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export function signRequest(secret, method, pathWithQuery, rawBody = '', ts = Math.floor(Date.now() / 1000)) {
  const timestamp = String(ts);
  const bodyHex = createHash('sha256').update(rawBody).digest('hex');
  const payload = `${timestamp}\n${method.toUpperCase()}\n${pathWithQuery}\n${bodyHex}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return { timestamp, signature };
}

export async function runBridgeSmoke({ baseUrl, secret, expectV12 = false, advisor, fetchImpl = fetch }) {
  assert.ok(baseUrl, '缺少 ASSISTANT_BRIDGE_URL');
  assert.ok(typeof secret === 'string' && secret.length >= 32, 'ASSISTANT_BRIDGE_SECRET 必须为 >=32 字符随机值（未打印）');

  const base = baseUrl.replace(/\/+$/, '');
  const prefix = '/api/integrations/assistant';
  const results = [];

  async function signedCall(method, subPath, { body, tsOffset = 0, badSig = false, contentType } = {}) {
    const pathWithQuery = prefix + subPath;
    const raw = body === undefined ? '' : (typeof body === 'string' ? body : JSON.stringify(body));
    const ts = Math.floor(Date.now() / 1000) + tsOffset;
    const { timestamp, signature } = signRequest(secret, method, pathWithQuery, raw, ts);
    const headers = {
      'X-FQ-Timestamp': timestamp,
      'X-FQ-Signature': badSig ? ('0'.repeat(64)) : signature,
    };
    if (body !== undefined || contentType) headers['Content-Type'] = contentType || 'application/json';
    const res = await fetchImpl(base + pathWithQuery, {
      method,
      headers,
      body: body === undefined ? undefined : raw,
    });
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch { /* non-json */ }
    return { status: res.status, json, text };
  }

  // 1. 签名与时间戳校验 + 尾斜杠
  const badSigRes = await signedCall('GET', '/advisors', { badSig: true });
  assert.equal(badSigRes.status, 401, `错误签名应返回 401，实际 ${badSigRes.status}`);
  results.push('bad_sig_401');

  const staleTsRes = await signedCall('GET', '/advisors', { tsOffset: -360 });
  assert.equal(staleTsRes.status, 401, `过期时间戳应返回 401，实际 ${staleTsRes.status}`);
  results.push('stale_ts_401');

  const trailingSlashRes = await signedCall('GET', '/advisors/');
  assert.equal(trailingSlashRes.status, 404, `尾斜杠应返回 404，实际 ${trailingSlashRes.status}`);
  results.push('trailing_slash_404');

  // 2. GET /advisors
  const advRes = await signedCall('GET', '/advisors');
  assert.equal(advRes.status, 200, `GET /advisors 失败: ${advRes.status}`);
  assert.ok(Array.isArray(advRes.json?.items), 'GET /advisors 必须返回 items 数组');
  const targetAdvisor = advisor || advRes.json.items[0]?.username;
  assert.ok(targetAdvisor, '没有可用的顾问/主管用户名用于冒烟推送');
  results.push(`advisors_ok(count=${advRes.json.items.length})`);

  // 3. externalId 规则（非法字符 + 超长）
  for (const badId of ['bad id', 'a/b', 'x'.repeat(129)]) {
    const r = await signedCall('POST', '/tasks', { body: { externalId: badId, title: 'Invalid ID probe', assignee: targetAdvisor } });
    assert.equal(r.status, 400, `非法 externalId(${badId.length}) 应返回 400，实际 ${r.status}`);
  }
  results.push('invalid_externalId_400');

  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const since0 = new Date(Date.now() - 2000).toISOString();

  // 4. 指定任务创建 + 重推省略 assignee 保持原样 + 幂等
  const extAssigned = `smoke-assigned-${suffix}`;
  const c1 = await signedCall('POST', '/tasks', {
    body: { externalId: extAssigned, title: 'Smoke Assigned Task', note: 'Synthetic smoke', importance: 'high', due: '2026-12-31', assignee: targetAdvisor },
  });
  assert.equal(c1.status, 200, `指定任务创建失败: ${c1.status} ${c1.text}`);
  assert.equal(c1.json?.created, true);

  const u1 = await signedCall('POST', '/tasks', {
    body: { externalId: extAssigned, title: 'Smoke Assigned Task Updated' },
  });
  assert.equal(u1.status, 200, `重推省略 assignee 失败: ${u1.status}`);
  assert.equal(u1.json?.created, false);
  results.push('assigned_create_and_omit_retry_ok');

  // 5. v1.2 公开任务板与 /cancel（开关开 vs 开关关）
  const extPubOmit = `smoke-pub-omit-${suffix}`;
  const extPubNull = `smoke-pub-null-${suffix}`;
  if (!expectV12) {
    const oRes = await signedCall('POST', '/tasks', { body: { externalId: extPubOmit, title: 'Public Omit Blocked' } });
    const nRes = await signedCall('POST', '/tasks', { body: { externalId: extPubNull, title: 'Public Null Blocked', assignee: null } });
    assert.equal(oRes.status, 400, `v1.1 关闭时省略 assignee 应 400，实际 ${oRes.status}`);
    assert.equal(nRes.status, 400, `v1.1 关闭时显式 null 应 400，实际 ${nRes.status}`);
    const cancelOff = await signedCall('POST', `/tasks/${extAssigned}/cancel`);
    assert.equal(cancelOff.status, 404, `v1.1 关闭时 /cancel 应 404，实际 ${cancelOff.status}`);
    results.push('v12_off_enforced_v11');
  } else {
    const oRes = await signedCall('POST', '/tasks', { body: { externalId: extPubOmit, title: 'Public Omit Task' } });
    const nRes = await signedCall('POST', '/tasks', { body: { externalId: extPubNull, title: 'Public Null Task', assignee: null } });
    assert.equal(oRes.status, 200, `v1.2 创建省略 assignee 失败: ${oRes.status}`);
    assert.equal(nRes.status, 200, `v1.2 创建显式 null 失败: ${nRes.status}`);
    const keepPub = await signedCall('POST', '/tasks', { body: { externalId: extPubNull, title: 'Public Null Task Updated', assignee: null } });
    assert.equal(keepPub.status, 200);

    // /cancel: 404 -> 200 -> 幂等 200 -> 重推返回 cancelled
    const missingCancel = await signedCall('POST', `/tasks/nonexistent-${suffix}/cancel`);
    assert.equal(missingCancel.status, 404);
    const cxl1 = await signedCall('POST', `/tasks/${extPubOmit}/cancel`);
    assert.equal(cxl1.status, 200);
    assert.equal(cxl1.json?.status, 'cancelled');
    const cxl2 = await signedCall('POST', `/tasks/${extPubOmit}/cancel`);
    assert.equal(cxl2.status, 200);
    const pushAfterCxl = await signedCall('POST', '/tasks', { body: { externalId: extPubOmit, title: 'Should Stay Cancelled' } });
    assert.equal(pushAfterCxl.status, 200);
    assert.equal(pushAfterCxl.json?.status, 'cancelled');
    assert.equal(pushAfterCxl.json?.created, false);
    results.push('v12_public_and_cancel_ok');
  }

  // 6. GET /updates?since=... 游标与字段检查
  const up1 = await signedCall('GET', `/updates?since=${encodeURIComponent(since0)}`);
  assert.equal(up1.status, 200, `GET /updates 失败: ${up1.status}`);
  assert.ok(Array.isArray(up1.json?.items), 'GET /updates 必须返回 items');
  assert.ok(typeof up1.json?.next === 'string' && up1.json.next.length > 0, 'GET /updates 必须返回 next');
  if (expectV12) {
    const cxlItem = up1.json.items.find(x => x.externalId === extPubOmit);
    assert.ok(cxlItem, 'v1.2 /updates 应包含刚取消的任务');
    assert.equal(cxlItem.status, 'cancelled');
    assert.equal(cxlItem.cancelledBy, 'assistant');
    assert.ok(Object.hasOwn(cxlItem, 'visibility') && Object.hasOwn(cxlItem, 'claimedBy') && Object.hasOwn(cxlItem, 'cancelledAt'));
  } else {
    assert.equal(up1.json.items.some(x => x.status === 'cancelled'), false, 'v1.1 /updates 不应返回 cancelled');
  }
  const up2 = await signedCall('GET', `/updates?since=${encodeURIComponent(up1.json.next)}`);
  assert.equal(up2.status, 200);
  assert.equal(up2.json.items.length, 0, '使用 next 游标再次拉取应为空');
  assert.equal(up2.json.next, up1.json.next, '无数据时 next 应等于请求的 since');
  results.push('updates_cursor_ok');

  return { ok: true, expectV12, results };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseUrl = process.env.ASSISTANT_BRIDGE_URL || 'https://preview.fantasme-apply-test.pages.dev';
  const secret = process.env.ASSISTANT_BRIDGE_SECRET || '';
  const expectV12 = process.env.EXPECT_V12 === '1';
  const advisor = process.env.ADVISOR || '';
  runBridgeSmoke({ baseUrl, secret, expectV12, advisor })
    .then(out => { console.log(JSON.stringify(out, null, 2)); })
    .catch(err => { console.error(err.message || err); process.exit(1); });
}
