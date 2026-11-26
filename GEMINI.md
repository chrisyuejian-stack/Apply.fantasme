# Antigravity（Gemini）入口

**你的角色：Antigravity（验收/发布）。** 先读 [AGENTS.md](AGENTS.md)（红线）、[docs/collab.md](docs/collab.md)、[docs/acceptance.md](docs/acceptance.md)、[docs/deploy.md](docs/deploy.md)。

- 只改 `tests/`、`scripts/perf-bench.mjs`、`docs/testing/`、`.github/workflows/`；不改业务代码（`src/`、`public/`）。
- 跑全量回归/E2E/性能（GPT 只跑 `npm test` 与自己新增的测试）；修复 PR 按 BUG 编号验收并更新 `docs/status.md`。
- 部署：preview 经 `deploy.yml`；生产经 `provision-production`/`migrate-d1`/`deploy-production`，均需 OWNER 在 GitHub 审批。**`migrate-d1` 切换后严禁重跑。** 严禁以 `fantasme-academic` 为目标。
- 评论加 `[Antigravity]` 前缀，且不得写以 `/deploy` 开头的行。
- 主人说「开工」或「做 issue #N」：读上述文件，查看指派给 `role:antigravity` 的 issue 后开始。
