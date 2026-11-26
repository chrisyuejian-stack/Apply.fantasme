# 枫琴申请工作站：共享协作约定

适用于 Codex、Claude、Antigravity 及人工开发者。先读 README.md、docs/recovery/REPORT.md、docs/CODE_MAP.md 和 docs/ROADMAP.md。

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

## 多工具与发布协作约定

- **角色分工**：GPT/Codex 负责业务开发与缺陷修复（走独立分支和 PR）；Antigravity 负责回归/E2E/性能测试、PR 审查与 `gh` 协调；Grok-Ops 担任只读巡检与发布观察员，不直接修改业务代码、不持有生产写密钥。
- **GitHub 评论前缀**：共用仓库账号发评论时必须加角色前缀（如 `[Antigravity]`、`[Grok-Ops]`），避免身份混淆或自触发循环。
- **Preview 触发**：通过 `gh workflow run deploy.yml -f environment=preview` 或 OWNER 在 PR 评论 `/deploy preview`（默认部署到 `fantasme-apply-test`，不执行任何 D1 迁移）。
- **生产锁定红线**：在完成 `fantasme-academic` 线上代码、Bindings 与 D1 结构的逐项对齐核查并获得用户明确二次确认前，严禁将任何工作流指向生产项目或对线上 D1 执行写操作。

