# 全量缺陷（BUG-01~12）与性能阶段 A 终验报告（2026-11-26）

- 验证基线：`main`（`ef97ec4`，含 PR #31/#32/#38/#39/#40）+ 本分支 `test/accept-final-fixes`
- 运行环境：Node `v24.22.3`（Linux x64, 2x Xeon 2.30GHz, 7959 MB RAM，本地 SQLite 模拟 D1）+ Cloudflare Pages Preview（`https://preview.fantasme-apply-test.pages.dev`）

## 1. 测试夹具发现与修复（BUG-03 暴露的本地主机名不一致）

- [tests/e2e/browser_audit.py](../../tests/e2e/browser_audit.py#L52)：`scripts/dev.mjs` 打印并固定以 `https://localhost:<port>` 构造 `request.url`，此前 `browser_audit.py` 连接 `https://127.0.0.1:<port>`，在 PR #31（BUG-03 `fqApplicationSameOrigin`）合入后触发 `403 请求来源不一致`。改为 `https://localhost:<port>` 后全流程通过。

## 2. 自动化测试结果（Node `v24.22.3`）

| 测试集 | 命令 | 结果 | 说明 |
| --- | --- | --- | --- |
| 恢复基线哈希核对 | `manifest.json` 16 项源码/资产/构建/原始测试 | **12 项完全一致，4 项按预期变更** | 变更项仅 `src/server/application.js`、`src/server/ai.js`、`public/apply/app/app.js`、`public/apply/app/app.css`（提示：Claude 后续可补充 BUG-02/03/05 与阶段 A 到 `docs/CHANGES.md`） |
| 构建与基础单测 | `npm test` | **19/19 通过** | 含 `standalone.test.mjs`、`dev.test.mjs` 及前端 `bug-09/11/12` 守卫 |
| 后端专项与差分 | `node --test src/server/*.test.mjs` | **21/21 通过** | 覆盖 BUG-01~09 与 Stage A（10/100/500 学生全角色差分一致性） |
| 全量功能与安全回归 | `node --test tests/regression/functional.test.mjs tests/regression/security.test.mjs` | **34/34 通过（0 失败）** | 此前 5 个待修叶子探针 `6b`/`6c`/`8a`（BUG-02）、`4b`（BUG-03）、`7b`（BUG-05）全部转绿 |
| 浏览器 E2E（基础） | `python3 tests/e2e/browser_audit.py` | **全部通过，`bugs: []`** | 375px 9 路由 `overflow: false`，`diy_empty_link_renders_dash` `bad_hash_link=0`，`page_errors: []` |
| 浏览器 E2E（深度） | `python3 tests/e2e/ui_deep_audit.py` | **全部通过，`ui_bugs: []`** | `responsive_overflows: []`，`ai_ui_checks`（`brief`/`auditAll`）通过，`page_errors: []` |

## 3. 性能基准（`node scripts/perf-bench.mjs`，对比 Stage A 前后）

| 规模 | 学生 / 记录数 | `import` (ms) | `bootstrap` p50 / p95 (ms) | `taskPut` p50 (ms, err) | `docRevise` p50 (ms, err) | `aiAuditAll` p50 (ms) | 内存 RSS / Heap (MB) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| small | 10 / 360 | 61.77 | 7.46 / 10.90 | 1.40 (0) | 2.68 (0) | 11.36 | 71.8 / 10.8 |
| medium | 100 / 3,600 | 351.33 | 42.74 / 50.95 | 2.58 (0) | 2.62 (0) | 44.63 | 138.5 / 26.2 |
| large | 500 / 18,000 | 1,904.13 | 186.97 / 277.40 | 5.53 (0) | 5.37 (0) | **168.36**（优化前 331.22） | 464.2 / 99.3 |

- HTTPS 并发与锁竞态（Medium）：`c5` p50 `352.65 ms`（0 错）、`c10` p50 `352.29 ms`（0 错）、`c20` p50 `509.04 ms`（0 错）；`reviseConcurrencyRace10` 与 `taskPutConcurrencyRace10` 均为 `1x 200 / 9x 409`。
- 说明：`scripts/perf-bench.mjs` 仅以主管角色测算 `bootstrap` 墙钟，Stage A 对顾问/文书/学生角色的 `json_each(?)` SQL 下推由 `src/server/bug-performance.test.mjs`（21/21 全过）验证深度相等。

## 4. Preview 部署与实测（`main @ ef97ec4`）

- 部署 Run：`45841104068`（`32s` 成功）→ `https://preview.fantasme-apply-test.pages.dev`
- 只读与负向冒烟：
  - `GET /api/setup-status` → `200`，`GET /login` → `200`，`GET /api/ai/status` → `401`，`GET /__portal` → `302`，`GET /embed-login` → `200`
  - `POST /api/setup` 携带 `Origin: https://evil.example`（未写入任何数据）→ `403 {"error":"请求来源不一致"}`（BUG-03 线上 Workers 环境已拦截）
  - 真实 Chromium 浏览 `https://preview.fantasme-apply-test.pages.dev/login`：同源 `location.origin` 与请求主机一致，`375×812` 无溢出（`375/375`）
- 关注记录（来自 Grok-Ops #27，非阻塞上线）：`src/server/ai.js` `studentRows` 查询暂未排除 `__imp:*`（仅在并发导入暂存毫秒窗口存在理论交叉）。
