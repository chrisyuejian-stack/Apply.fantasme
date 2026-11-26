# 枫琴申请工作站：共享协作约定

适用于 Codex(GPT)、Claude、Antigravity、Grok-Ops 及人工开发者。本文件是**技术红线的唯一来源**，也是总入口。

**先确认你是谁，再读对应入口**：
- Claude → [CLAUDE.md](CLAUDE.md)；Antigravity(Gemini) → [GEMINI.md](GEMINI.md)；Grok-Ops(Cursor) → `.cursor/rules/grok-ops.mdc`。
- **GPT/Codex**：后端缺陷修复与按设计稿实现。只改已认领的 `src/server/` 文件，走 `gpt/*` 分支，一个 Bug 一个 PR，仅跑 `npm test` 与本次新增测试，评论加 `[GPT]` 前缀；迁移窗口内 PR 保持草稿不合并；高风险项（BUG-02/03/05、bootstrap）按 `docs/design/high-risk-fixes.md` 实现。主人说「开工」或「做 issue #N」时查看指派给 `role:gpt` 的 issue。

**开工只读你角色对应的短文件，不要通读全仓**（省 Token）：
- 所有角色：本文件 + [docs/collab.md](docs/collab.md) + [docs/status.md](docs/status.md)
- 按需追加：发布/D1 → [docs/deploy.md](docs/deploy.md)；验收 → [docs/acceptance.md](docs/acceptance.md)；定位代码 → [docs/CODE_MAP.md](docs/CODE_MAP.md)；路线 → [docs/ROADMAP.md](docs/ROADMAP.md)；恢复证据 → docs/recovery/REPORT.md

- 当前工程是部署产物恢复基线，未找回原始模块、类型、源码映射和线上数据库。不要声称完全恢复原工程或已验证线上一致。
- 每个云任务已有隔离环境，使用现有 checkout；除非用户明确要求，不创建 Git worktree。
- 改动前检查 git status，保留用户及其他工具的未完成修改。同一个分支同一时间由一个工具写入；跨工具交接用明确任务范围、改动文件、验证结果和遗留问题。并行任务由人工协调互不重叠文件或独立分支。
- 只修改源码和 public/；dist/ 是生成物，运行 npm run build 重建。保持 application、ai、entry 的拼接顺序，当前它们共享词法作用域，不能直接改成独立 import。
- 原包证据 docs/recovery/manifest.json 和 docs/recovery/original/ 不得改写。原始测试 tests/standalone.test.mjs 保持作为回归参照；新增测试放独立文件。
- 不猜测短变量含义后全局替换，不整包重新压缩/格式化；先定位一个功能，补充有用的行为回归，再逐步命名和拆分。
- 权限、学生数据范围、首次改密、文书版本冲突、会话 Cookie、DIY 授权及 AI 建议落库流程都属于必须保留的契约。前端隐藏按钮不能替代后端权限。
- 不将真实学生数据、数据库、密钥、备份、会话或生产日志提交到仓库；.local/ 仅用于本地开发。
- 本地开发默认 AI 关闭。真实 AI、联网核实、Cloudflare D1 和 UI 人工操作未因本地测试通过就视为已验收。
- 功能变更运行 npm test，按影响补充必要测试；检查构建。原始字节不变阶段运行 npm run verify:baseline；有意变更原始文件后在恢复记录/变更说明中解释差异，不更新历史哈希来让它通过。
- 完成时说明改了什么、实际跑了哪些验证、哪些未验证。部署、推送、线上迁移遵循用户明确授权，不默认执行。

## 多工具与发布协作红线

分工矩阵、评论前缀、交接模板见 [docs/collab.md](docs/collab.md)；发布与 D1 守则见 [docs/deploy.md](docs/deploy.md)。以下红线在任何文档冲突时优先：

- **评论前缀**：共用仓库账号发评论必须加 `[Claude]`、`[GPT]`、`[Antigravity]`、`[Grok-Ops]` 前缀；只响应人工评论或明确 `@角色`，不响应其他前缀的评论，不转述 `/deploy` 指令，防止自触发循环。
- **Preview 触发**：`gh workflow run deploy.yml -f environment=preview`，或 OWNER 本人在 PR 评论 `/deploy preview`。默认部署到 `fantasme-apply-test`，不执行任何 D1 迁移。
- **生产范围与锁定**：
  - 旧综合项目 `fantasme-academic`（官网/自测/历史申请系统）**永久禁止**作为任何工作流的目标，其 D1（`fq-apply`、`fq-edu`、`fantasme-site-db`）只允许只读导出，不得写入；账号内其他项目一律不碰。
  - 申请系统迁移到新生产项目 `fantasme-apply`（D1 `fantasme-apply-prod`），主人已于 2026-11-26 授权该迁移。生产写操作**只经** GitHub Actions `production` Environment 的工作流，且每次需 OWNER 审批；各 AI 不手工直接写生产。流程见 [docs/deploy.md](docs/deploy.md)。
  - 生产域名切换、DNS 变更由主人本人执行；任何涉及 `apply.fantasmearts.com` 的动作须先完成 deploy.md 的校验步骤。
- **D1 兼容**：不得破坏现有表（`records`、`users`、`sessions`、`login_attempts`、`meta`、`audit`、`diy_accounts`、`diy_sessions`、`diy_records`、`fq_ai_*`）、历史 JSON 缺省字段、PBKDF2（100,000）哈希格式与会话 Cookie 契约。D1 DDL/迁移不得写入任何自动流程。
- **只读角色**：Grok-Ops 不写仓库、不写 D1、不持有生产写密钥。
- **分支**：所有改动走独立分支和 PR，不直推 `main`；同一文件同一时间一个写入者（见 status.md 文件认领表）。
