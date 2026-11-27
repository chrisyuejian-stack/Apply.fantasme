# M3「主管提醒与助理对接（v1.2）」阶段验收报告（2026-11-26）

- 对应 Issue：#61、#62、#67、#68、#69
- 验收代码：`gpt/issue-67-board-ui`（`dc6c3a0`，含后端 PR #64 `f7f61c5` 与前端 PR #72；两份 PR 均保持草稿待合）
- 运行环境：Node `v24.22.3`（Linux x64）+ Chromium + Cloudflare Pages Preview（`https://preview.fantasme-apply-test.pages.dev`）

## 1. 自动化测试（`dc6c3a0`，Node `v24.22.3`）

| 检查项 | 结果 | 说明 |
| --- | --- | --- |
| `npm test`（构建 + 全量单测/服务端/回归） | **98/98 通过（0 失败）** | 包含 `#61` 13 项（HMAC、v1.1/v1.2、CAS 并发认领、游标、备份导入忽略 `boardTasks`）、M2 文件上传、BUG-01~12 与全量回归 |
| `python3 tests/e2e/browser_audit.py` | **通过（`bugs: []`）** | 首次运行在角色登出切换 `#pwForm` 偶发超时（30s）；复跑全通过，375px 9 路由 `overflow: false`，`page_errors: []` |
| `python3 tests/e2e/ui_deep_audit.py` | **通过（`ui_bugs: []`）** | `responsive_overflows: []`、`ai_ui_checks`（`brief`/`auditAll`）通过，`page_errors: []` |
| 双模式 M3 浏览器专项（Chromium + Python Playwright） | **通过（开关开/关均 0 错）** | 注：容器未装全局 npm `playwright`，`issue-67.browser.mjs` 由等效 Python Playwright 覆盖 |
| `node scripts/perf-bench.mjs` | **0 错误** | small/medium/large `bootstrap` p50 `6.35 / 34.67 / 165.45 ms`，500 学生 `aiAuditAll` p50 `155.88 ms`，并发竞态均 `1x 200 / 9x 409` |

### 双模式浏览器与并发认领实测明细
- **`BOARD_V12_ENABLED=1`（开启）**：
  - 推送指定任务（`200`）与公开任务（`200`）；文书老师登录访问 `#/tasks` 不可见「主管提醒」选项卡（`count=0`）。
  - **两顾问并发认领竞态**：顾问 A（`li.adv`）点「认领」成功出现「释放」；顾问 B（`zhou.adv`）点击过时界面「认领」按钮返回 **`409 {"error":"已被李顾问认领"}`**，随后卡片从顾问 B 界面消失。
  - 空遇阻提交被拦截弹窗不关闭，填原因后提交成功；点击「完成」后卡片置为 `.done`。
  - 375×812 视口：`advisor`（`375/375`）、遇阻弹窗（`375/375`）、`supervisor`（`375/375`）全部零横向溢出，`page_errors: []`。
- **`BOARD_V12_ENABLED=0`（关闭 / v1.1 默认）**：
  - 推送公开任务被后端拒收（`400 {"error":"负责人不存在"}`）；指定任务、空遇阻拦截、完成及三类 375×812 视口（`375/375`）均正常，`page_errors: []`。

## 2. Preview 部署与只读检查（Run `45933936058`）

- 已将 `gpt/issue-67-board-ui`（`dc6c3a0`）部署至 `https://preview.fantasme-apply-test.pages.dev`（`36s` 成功，`BOARD_V12_ENABLED` 未设置 = 关闭）。
- `/api/setup-status` `200`、`/login` `200`、`/embed-login` `200`、`/api/ai/status` `401`、`/__portal` `302`。
- `GET /api/integrations/assistant/advisors` → `503 {"error":"助理对接未配置"}`（符合未设 `ASSISTANT_BRIDGE_SECRET` 契约）。
- `POST /api/board/tasks/bt-1/claim`（未登录，`X-FQ: 1`）→ `401 {"error":"登录已过期，请重新登录"}`。

## 3. 未验证项与交接
- **Preview 真实 `ASSISTANT_BRIDGE_SECRET` + 助理侧真实联调**尚未执行：待 @Grok-Ops 完成 #69 红队、主人配置 preview `ASSISTANT_BRIDGE_SECRET` 并确认 `fengqin-assistant` 已部署 v1.2 后，先在 preview 开启 `BOARD_V12_ENABLED=1` 用 [assistant-bridge-smoke.mjs](../../tests/smoke/assistant-bridge-smoke.mjs) 实测，再合入 #64 → #72 并按 `docs/deploy.md` 上线顺序推生产。
