# 首轮修复验收与 Node 24 基线测试报告（2026-11-26）

- 对应 Issue：#26
- 验证基线：`main`（`b714a6c`）+ 本分支（`test/accept-round1-fixes`）夹具与基准适配
- 运行环境：Node `v24.22.3`（Linux x64, 2x Xeon 2.30GHz, 7959 MB RAM，本地 SQLite 模拟 D1）

## 1. 夹具与基准脚本适配（BUG-06 契约对齐）

- [tests/regression/functional.test.mjs](../../tests/regression/functional.test.mjs)：用例 4 更新 `stu-1` 时携带首次创建返回的 `_base: stu0.updatedAt`；**完整保留** `5d`（省略 `_base` 必须返回 409）探针，未弱化任何断言。
- [tests/regression/security.test.mjs](../../tests/regression/security.test.mjs)：用例 2a 文书端合法更新 `tsk-a` 时携带 `_base: bootWrtA.data.tasks.find(x => x.id === 'tsk-a').updatedAt`；越权 403 检查保持不变。
- [scripts/perf-bench.mjs](../../scripts/perf-bench.mjs)：`taskPut` 压测循环从 `/api/bootstrap` 读取初始 `updatedAt` 并在每次 200 后刷新 `_base`，对齐 BUG-06 乐观锁契约（此前 15/15 因缺少 `_base` 报 409）。

## 2. 自动化测试结果（Node `v24.22.3`）

| 测试集 | 命令 | 结果 | 说明 |
| --- | --- | --- | --- |
| 恢复基线校验 | `npm run verify:baseline` | 按预期报差异 | `src/server/application.js` 哈希由 `a292088b...` 变为 `5be56af8...`（BUG-01/04/06/07/09 有意修改；详见 PR #21 `docs/CHANGES.md`） |
| 基准构建与单测 | `npm test` | **12/12 通过** | 构建 `dist/` 并运行 `tests/*.test.mjs` |
| 首轮修复专项测试 | `node --test src/server/bug-*.test.mjs` | **9/9 通过** | 覆盖 BUG-01/04/06/07/08/09（含学生级联删除、推荐人保护、空白版本/已归档文书/`_base` 乐观锁、多 DB 隔离、AI 未授权不扣配额、终稿退回修订） |
| 功能与安全全量回归 | `node --test tests/regression/functional.test.mjs tests/regression/security.test.mjs` | **通过 23 / 失败 11（共 34 项，失败仅来自 5 个待修叶子探针及其 6 个外层父套件）** | 用例 4、2a 及已合入探针（`5a`/`5b`/`5c`/`5d`/`8b`/`8c`/`2b`/`5a(ai)`）全部通过；剩余叶子探针失败：`6b`/`6c`/`8a`（BUG-02）、`7b`（BUG-05）、`4b`（BUG-03） |
| 浏览器 E2E（基础） | `python3 tests/e2e/browser_audit.py` | 前端保存无 409 误报，`page_errors: []` | 发现 1 项既定缺陷：`diy_empty_link_renders_dash`（`S("")` 返回 `"#"`，即 BUG-11，已有 PR #29）；375px 窄屏 `#/home` `sw=776`（BUG-10） |
| 浏览器 E2E（深度） | `python3 tests/e2e/ui_deep_audit.py` | 全路由可渲染，`ai_ui_checks`（`brief`/`auditAll`）均通过，`page_errors: []` | 复现 BUG-11（DIY 链接校验放行 `ftp://` 并渲染 `href="#"`）与 BUG-10（`#/home` 与 `#/app/app-1/*` 在 375px 溢出）；`#/diy-student/:id` 因测试前无 DIY 学员而显示空列表提示 |

## 3. 性能基准（`node scripts/perf-bench.mjs`，Node `v24.22.3`）

| 规模 | 学生数 / 记录数 | `import` (ms) | `bootstrap` p50 / p95 (ms, bytes) | `taskPut` p50 / p95 (ms, err) | `docRevise` p50 / p95 (ms, err) | `export` p50 (ms) | `aiAuditAll` p50 (ms) | 内存 RSS / Heap (MB) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| small | 10 / 360 | 23.57 | 5.38 / 7.71 (117,738 B) | 1.11 / 1.80 (0) | 1.48 / 2.14 (0) | 12.97 | 9.89 | 71.8 / 10.7 |
| medium | 100 / 3,600 | 194.23 | 35.43 / 43.61 (1,066,248 B) | 1.62 / 3.08 (0) | 1.88 / 2.89 (0) | 46.76 | 44.37 | 139.4 / 25.1 |
| large | 500 / 18,000 | 908.91 | 154.27 / 203.98 (5,328,248 B) | 3.87 / 4.58 (0) | 3.19 / 3.43 (0) | 243.78 | 331.22 | 434.3 / 89.3 |

HTTPS 并发与锁竞态：
- 冷启动：`383.93 ms`
- PBKDF2 登录耗时：100k 次迭代 p50 `115.04 ms`（p95 `116.49 ms`）；10k 次迭代 p50 `60.12 ms`
- Medium `bootstrap` 并发：`c5` p50 `174.93 ms`（0 错），`c10` p50 `214.75 ms`（0 错），`c20` p50 `374.95 ms`（0 错，p95 `773.25 ms`）
- 10 并发乐观锁竞态：`reviseConcurrencyRace10` 为 `1x 200 / 9x 409`（p50 `44.81 ms`）；`taskPutConcurrencyRace10` 为 `1x 200 / 9x 409`（p50 `48.50 ms`）

## 4. Preview 部署与冒烟（`main @ b714a6c`）

- 工作流 `deploy.yml`（`environment=preview`）：Run `45836310567`（`26s` 成功）
- 目标地址：`https://preview.fantasme-apply-test.pages.dev`
- 只读 HTTP 冒烟：
  - `GET /api/setup-status` → `200` `{"needsSetup":false}`
  - `GET /login` → `200`（`7225 B`，含 CSP / `X-Frame-Options: DENY` / `no-store`）
  - `GET /api/ai/status`（未登录）→ `401` `{"error":"请先登录申请系统"}`
  - `GET /__portal` → `302` `https://www.fantasmearts.com/portal`
  - `GET /embed-login` → `200`（`7245 B`，`frame-ancestors https://www.fantasmearts.com`）

## 5. 发布门禁（`migrate-d1` 锁）

- 已创建 PR #30（`ops/guard-migrate-d1`）：在 `.github/workflows/migrate-d1.yml` 最前新增 `Guard against post-cutover re-run`，当 `vars.PRODUCTION_CUTOVER_DONE == 'true'` 时直接报错退出。
- 已设置仓库变量 `PRODUCTION_CUTOVER_DONE=true`。
- 备注：因 PR #21 正在更新 `docs/status.md`，本报告单独写入 `docs/testing/`，避免与 PR #21 产生合并冲突。
