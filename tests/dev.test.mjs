import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import https from 'node:https';

test('本地 HTTPS：初始化、持久化业务、重启登录、资源 MIME 和 HEAD', { timeout: 30000 }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'apply-dev-'));
  let child;
  async function start() {
    child = spawn(process.execPath, ['scripts/dev.mjs'], {
      cwd: new URL('../', import.meta.url),
      env: { ...process.env, PORT: '0', LOCAL_DATA_DIR: dir, APPLY_SETUP_KEY: 'LocalSmokeSetupOnly2026' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    const port = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Server startup timeout: ' + output)), 10000);
      child.stderr.on('data', data => { output += data; });
      child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited ${code}: ${output}`)); });
      child.stdout.on('data', data => {
        output += data;
        const match = output.match(/Local application: https:\/\/localhost:(\d+)/);
        if (match) { clearTimeout(timeout); resolve(Number(match[1])); }
      });
    });
    const ca = await readFile(join(dir, 'localhost-cert.pem'));
    return async (path, method = 'GET', body, cookie = '') => {
      const text = body === undefined ? undefined : JSON.stringify(body);
      return new Promise((resolve, reject) => {
        const req = https.request({ hostname: '127.0.0.1', port, path, method, ca,
          headers: { 'Content-Type': 'application/json', 'X-FQ': '1', Cookie: cookie, Origin: `https://localhost:${port}` } }, res => {
          const chunks = [];
          res.on('data', chunk => chunks.push(chunk));
          res.on('end', () => {
            const text = Buffer.concat(chunks).toString();
            resolve({ status: res.statusCode, headers: res.headers, text, data: res.headers['content-type']?.includes('json') ? JSON.parse(text) : null });
          });
        });
        req.on('error', reject); req.end(text);
      });
    };
  }
  async function stop() {
    if (child && child.exitCode === null) { const exited = once(child, 'exit'); child.kill('SIGTERM'); await exited; }
  }
  try {
    let call = await start();
    assert.equal((await call('/login')).status, 200);
    assert.equal((await call('/api/bootstrap')).status, 401);
    let setup = await call('/api/setup', 'POST', { setupKey: 'LocalSmokeSetupOnly2026', name: '本地验证', username: 'local.smoke', password: 'LocalSmokePass2026', demo: false });
    assert.equal(setup.status, 200, setup.text);
    assert.match(setup.headers['set-cookie'][0], /__Host-fq_session=.*Secure/);
    let cookie = setup.headers['set-cookie'][0].split(';')[0];
    assert.equal((await call('/api/t/students/student-local', 'PUT', { id: 'student-local', name: '本地持久化学员' }, cookie)).status, 200);
    for (const [path, mime] of [['/app/app.js', 'text/javascript'], ['/app/app.css', 'text/css'], ['/app/diy-preview.jpg', 'image/jpeg']]) {
      const asset = await call(path, 'GET', undefined, cookie);
      assert.equal(asset.status, 200); assert.ok(asset.headers['content-type'].startsWith(mime));
      assert.equal((await call(path, 'HEAD', undefined, cookie)).text, '');
    }
    await stop();
    call = await start();
    assert.equal((await call('/api/setup-status')).data.needsSetup, false);
    const login = await call('/api/login', 'POST', { username: 'local.smoke', password: 'LocalSmokePass2026' });
    assert.equal(login.status, 200, login.text);
    cookie = login.headers['set-cookie'][0].split(';')[0];
    const bootstrap = await call('/api/bootstrap', 'GET', undefined, cookie);
    assert.equal(bootstrap.status, 200);
    assert.equal(bootstrap.data.data.students.find(x => x.id === 'student-local').name, '本地持久化学员');
    const ai = await call('/api/ai/status', 'GET', undefined, cookie);
    assert.equal(ai.status, 200); assert.equal(ai.data.enabled, false);
  } finally { await stop(); await rm(dir, { recursive: true, force: true }); }
});
