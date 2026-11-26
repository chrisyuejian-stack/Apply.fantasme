import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import https from 'node:https';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export const ROOT = new URL('../../', import.meta.url);

export async function startHttpsServer({ dataDir, pbkdf2Iterations = '10000', setupKey = 'TestSetupKey2026!', extraEnv = {} } = {}) {
  const ownDir = !dataDir;
  const dir = dataDir || await mkdtemp(join(tmpdir(), 'apply-audit-'));
  const child = spawn(process.execPath, ['scripts/dev.mjs'], {
    cwd: ROOT,
    env: {
      ...process.env,
      PORT: '0',
      LOCAL_DATA_DIR: dir,
      APPLY_SETUP_KEY: setupKey,
      PBKDF2_ITERATIONS: String(pbkdf2Iterations),
      ...extraEnv,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  let ca;
  let port;
  try {
    port = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Server startup timeout: ' + output)), 15000);
      child.stderr.on('data', d => { output += d; });
      child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited ${code}: ${output}`)); });
      child.stdout.on('data', d => {
        output += d;
        const m = output.match(/Local application: https:\/\/localhost:(\d+)/);
        if (m) { clearTimeout(timeout); resolve(Number(m[1])); }
      });
    });
    ca = await readFile(join(extraEnv.LOCAL_DATA_DIR || dir, 'localhost-cert.pem'));
  } catch (err) {
    if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
    if (ownDir) await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw err;
  }
  const agent = new https.Agent({ keepAlive: false, ca });

  async function request(path, { method = 'GET', body, cookie = '', headers = {}, rawBody } = {}) {
    const payload = rawBody !== undefined ? rawBody : (body === undefined ? undefined : JSON.stringify(body));
    const reqHeaders = {
      'Content-Type': 'application/json',
      'X-FQ': '1',
      Origin: `https://localhost:${port}`,
      ...(cookie ? { Cookie: cookie } : {}),
      ...headers,
    };
    if (headers['X-FQ'] === null) delete reqHeaders['X-FQ'];
    if (headers.Origin === null) delete reqHeaders.Origin;
    return new Promise((resolve, reject) => {
      const req = https.request({ hostname: '127.0.0.1', port, path, method, agent, headers: reqHeaders }, res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString();
          let data = null;
          if ((res.headers['content-type'] || '').includes('json')) {
            try { data = JSON.parse(text); } catch {}
          }
          resolve({ status: res.statusCode, headers: res.headers, text, data });
        });
      });
      req.on('error', reject);
      if (payload !== undefined) req.write(payload);
      req.end();
    });
  }

  async function stop() {
    agent.destroy();
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, 'exit');
      child.kill('SIGTERM');
      const timer = setTimeout(() => {
        if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
      }, 2000);
      await exited;
      clearTimeout(timer);
    }
  }

  async function cleanup() {
    await stop();
    await rm(dir, { recursive: true, force: true });
  }

  return { dir, port, ca, child, request, stop, cleanup };
}

export class MemoryD1 {
  constructor() { this.raw = new DatabaseSync(':memory:'); }
  prepare(query) {
    const database = this.raw;
    return {
      query, values: [],
      bind(...values) { this.values = values; return this; },
      async first(column) {
        const row = database.prepare(query).get(...this.values);
        return row ? (column ? row[column] : row) : null;
      },
      async all() { return { success: true, results: database.prepare(query).all(...this.values) }; },
      async run() {
        const result = database.prepare(query).run(...this.values);
        return { success: true, meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
      },
    };
  }
  async batch(statements) {
    this.raw.exec('BEGIN IMMEDIATE');
    try {
      const results = [];
      for (const s of statements) {
        results.push(this.raw.prepare(s.query).columns().length ? await s.all() : await s.run());
      }
      this.raw.exec('COMMIT');
      return results;
    } catch (e) {
      this.raw.exec('ROLLBACK');
      throw e;
    }
  }
  close() { this.raw.close(); }
}

export async function createWorkerHarness(extraEnv = {}) {
  const entry = new URL('../../dist/_worker.js', import.meta.url).href;
  const worker = (await import(entry + '?audit=' + randomUUID())).default;
  const db = new MemoryD1();
  const env = {
    APPLY_DB: db,
    APPLY_SETUP_KEY: 'HarnessSetupKey2026!',
    PBKDF2_ITERATIONS: '10000',
    SITE_URL: 'https://www.fantasmearts.com',
    ASSETS: {
      async fetch(request) {
        const path = new URL(request.url).pathname;
        if (path.includes('..')) return new Response('', { status: 404 });
        try {
          const data = await readFile(new URL('../../public' + path, import.meta.url));
          const mime = path.endsWith('.js') ? 'text/javascript' : path.endsWith('.css') ? 'text/css' : path.endsWith('.png') ? 'image/png' : 'text/html';
          return new Response(request.method === 'HEAD' ? null : data, { headers: { 'Content-Type': mime } });
        } catch { return new Response('', { status: 404 }); }
      },
    },
    ...extraEnv,
  };
  async function call(path, { method = 'GET', body, cookie = '', headers = {}, rawBody } = {}) {
    const reqHeaders = {
      'Content-Type': 'application/json',
      'X-FQ': '1',
      Origin: 'https://apply.test',
      ...(cookie ? { Cookie: cookie } : {}),
      ...headers,
    };
    if (headers['X-FQ'] === null) delete reqHeaders['X-FQ'];
    if (headers.Origin === null) delete reqHeaders.Origin;
    const req = new Request('https://apply.test' + path, {
      method,
      headers: reqHeaders,
      body: rawBody !== undefined ? rawBody : (body === undefined ? undefined : JSON.stringify(body)),
    });
    const res = await worker.fetch(req, env);
    const text = await res.text();
    let data = null;
    if ((res.headers.get('Content-Type') || '').includes('json')) {
      try { data = JSON.parse(text); } catch {}
    }
    return { status: res.status, headers: res.headers, text, data };
  }
  return { worker, db, env, call };
}

export function extractCookie(headers, name = '__Host-fq_session') {
  const raw = typeof headers.getSetCookie === 'function'
    ? headers.getSetCookie()
    : (Array.isArray(headers['set-cookie']) ? headers['set-cookie'] : (headers['set-cookie'] ? [headers['set-cookie']] : []));
  for (const c of raw) {
    const part = c.split(';')[0];
    if (part.startsWith(name + '=')) return part;
  }
  return '';
}
