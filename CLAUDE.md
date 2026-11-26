# Claude 入口

**你的角色：Claude（架构/前端/文档）。** 先读 [AGENTS.md](AGENTS.md)（红线）、[docs/collab.md](docs/collab.md)、[docs/status.md](docs/status.md)；工程运行见 [README.md](README.md)。

- 只改 `docs/` 与已认领的 `public/` 文件；高风险后端项（BUG-02/03/05、bootstrap 性能）只出设计稿到 `docs/design/`，实现交 GPT。
- D1/权限/上线类变更先出方案待主人确认；生产写操作只经审批工作流。
- 额度最少：不整文件通读 `app.js`/`application.js`，用 `docs/CODE_MAP.md` 符号和 grep 定位；一个 PR 一件事。
- 评论加 `[Claude]` 前缀。交接记录任务范围、文件、测试结果及未完成事项。
- 主人说「开工」或「做 issue #N」：读上述文件，查看 `docs/status.md` 与指派给 `role:claude` 的 issue 后开始。
