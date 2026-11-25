// HTTPS is required by the unchanged __Host- session cookies.
import https from 'node:https';
import { readFile, mkdir, access } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { Readable } from 'node:stream';
import { randomBytes } from 'node:crypto';
import { LocalDatabase } from './local-d1.mjs';
import worker from '../dist/_worker.js';

const root = resolve(import.meta.dirname, '..');
const dataDir = resolve(process.env.LOCAL_DATA_DIR || resolve(root, '.local'));
await mkdir(dataDir, { recursive: true, mode: 0o700 });
const certPath = resolve(dataDir, 'localhost-cert.pem');
const keyPath = resolve(dataDir, 'localhost-key.pem');
try { await access(certPath); await access(keyPath); }
catch {
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '365',
    '-keyout', keyPath, '-out', certPath, '-subj', '/CN=localhost',
    '-addext', 'subjectAltName=DNS:localhost,IP:127.0.0.1'], { stdio: 'ignore' });
}
const db = new LocalDatabase(resolve(dataDir, 'apply.sqlite'));
const publicDir = resolve(root, 'public');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const env = {
  APPLY_DB: db,
  // Ephemeral by default: create the initial supervisor using the private file below.
  APPLY_SETUP_KEY: process.env.APPLY_SETUP_KEY || randomBytes(32).toString('hex'),
  SITE_URL: process.env.SITE_URL || 'https://www.fantasmearts.com',
  ASSETS: { async fetch(request) {
    let path;
    try { path = resolve(publicDir, '.' + decodeURIComponent(new URL(request.url).pathname)); }
    catch { return new Response('Bad path', { status: 400 }); }
    if (!path.startsWith(publicDir + sep)) return new Response('Not found', { status: 404 });
    try {
      const body = await readFile(path);
      return new Response(request.method === 'HEAD' ? null : body, { headers: { 'Content-Type': mime[extname(path)] || 'application/octet-stream' } });
    } catch { return new Response('Not found', { status: 404 }); }
  } },
};
// AI is off by default. Pass configuration explicitly through process variables.
for (const name of Object.keys(process.env)) {
  if (name.startsWith('AI_') || name === 'DEEPSEEK_API_KEY' || name === 'PBKDF2_ITERATIONS') env[name] = process.env[name];
}
const { writeFile } = await import('node:fs/promises');
const setupPath = resolve(dataDir, 'setup-key.txt');
await writeFile(setupPath, env.APPLY_SETUP_KEY + '\n', { mode: 0o600 });
// Serialize requests: this adapter shares one SQLite connection and transaction context.
let queue = Promise.resolve();
const server = https.createServer({ key: await readFile(keyPath), cert: await readFile(certPath) }, (incoming, outgoing) => {
  queue = queue.then(async () => {
    try {
      const origin = `https://localhost:${server.address().port}`;
      const headers = new Headers();
      for (let i = 0; i < incoming.rawHeaders.length; i += 2) headers.append(incoming.rawHeaders[i], incoming.rawHeaders[i + 1]);
      const init = { method: incoming.method, headers };
      if (!['GET', 'HEAD'].includes(incoming.method)) { init.body = Readable.toWeb(incoming); init.duplex = 'half'; }
      const request = new Request(new URL(incoming.url, origin), init);
      const response = await worker.fetch(request, env);
      outgoing.statusCode = response.status;
      for (const [name, value] of response.headers) if (name !== 'set-cookie') outgoing.setHeader(name, value);
      const cookies = response.headers.getSetCookie();
      if (cookies.length) outgoing.setHeader('set-cookie', cookies);
      if (incoming.method === 'HEAD' || !response.body) outgoing.end();
      else Readable.fromWeb(response.body).pipe(outgoing);
    } catch (error) {
      console.error(error.message);
      if (!outgoing.headersSent) outgoing.writeHead(500);
      outgoing.end('Local development server error');
    }
  });
});
server.listen(Number(process.env.PORT || 8788), '127.0.0.1', () => {
  console.log(`Local application: https://localhost:${server.address().port}/login`);
  console.log(`Local setup key file: ${setupPath}`);
  console.log(`Local certificate: ${certPath}`);
});
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => {
  server.close(async () => { await queue; db.close(); process.exit(0); });
  server.closeIdleConnections();
});
