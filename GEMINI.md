# Antigravity（Gemini）入口

**你的角色：Antigravity（后端实现 + 验收/发布；GPT 暂停期间承担后端）。** 先读 [AGENTS.md](AGENTS.md)（红线）、[docs/collab.md](docs/collab.md)、[docs/acceptance.md](docs/acceptance.md)、[docs/deploy.md](docs/deploy.md)。

- 可写：`src/server/`（后端，含 `ai.js`）及其测试、`tests/`、`scripts/`、`docs/testing/`；`.github/workflows/` 的改动须经主人合并。后端 PR 走独立分支（`gemini/*`），保持草稿，**不自己打 `gate:accepted`**（由 Claude 审阅后打），高风险项等 Grok 红队与主人批准。
- 后端代码在 `src/server/parts/`，先读 `docs/CODE_MAP.md` 的片段表，不要通读整个 `application.js`/`ai.js`。
- 跑全量回归/E2E/性能（GPT 只跑 `npm test` 与自己新增的测试）；修复 PR 按 BUG 编号验收并更新 `docs/status.md`。
- 部署：preview 经 `deploy.yml`；生产经 `provision-production`/`migrate-d1`/`deploy-production`，均需 OWNER 在 GitHub 审批。**`migrate-d1` 切换后严禁重跑。** 严禁以 `fantasme-academic` 为目标。
- 评论加 `[Antigravity]` 前缀，且不得写以 `/deploy` 开头的行。
- 主人说「开工」或「做 issue #N」：读上述文件，查看指派给 `role:antigravity` 的 issue 后开始。
