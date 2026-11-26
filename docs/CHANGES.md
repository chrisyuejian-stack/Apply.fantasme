# 对恢复基线的有意变更

`docs/recovery/manifest.json` 与 `docs/recovery/original/` 保持原样，**不得改写**。以下变更在基线之后有意引入，因此 `npm run verify:baseline` 对被修改文件报不一致属预期；未列入本表的文件必须仍与基线一致。

| 日期 | 文件 | 变更 | 来源 |
|---|---|---|---|
| 2026-11-26 | `src/server/application.js` | BUG-01 通用学生删除复用级联清理；BUG-04 采集表推荐人归属与引用保护；BUG-06 文书版本校验与服务端乐观锁；BUG-07 按 D1 实例隔离建表标志；BUG-09 定稿文书可经原子审核接口退回 | PR #9/#11/#14/#15/#17 |
| 2026-11-26 | `src/server/ai.js` | BUG-07 院校缓存按库隔离；BUG-08 权限校验先于配额扣减 | PR #15/#16 |
| 2026-11-26 | `src/server/bug-*.test.mjs` | 新增回归断言（不改 `tests/standalone.test.mjs`） | 同上 |

后续每个有意修改基线文件的 PR，需在此追加一行：日期、文件、变更、PR。
| 2026-11-26 | `public/apply/app/app.js` | BUG-11 `S()` 对非 http(s) 链接返回空串，渲染点不再输出 `href="#"`；BUG-12 进入 DIY 页面时过期（>15s）缓存重新拉取；BUG-09 前端 `doc-reopen` 改走原子 `/documents/:id/review` 接口 | PR #29/#33/#34 |
| 2026-11-26 | `public/apply/app/app.css` | BUG-10 窄屏网格统一 `minmax(0,1fr)`、`.stack` 补 `min-width:0`，移动端保留全局搜索 | PR #36 |
| 2026-11-26 | `tests/bug-*.test.mjs`、`tests/e2e/mobile_overflow.cjs` | 新增前端回归（源码级守卫 + 375px 浏览器检测，后者不在 `npm test` 内） | PR #29/#33/#34/#36 |
| 2026-11-26 | `src/server/application.js` → `src/server/parts/90-application.js`；`scripts/build.mjs` | M1-1a：业务后端改为按 `parts/` 片段拼接，内容未改；`dist/_worker.js` sha256 搬迁前后均为 `2ea4d186…303e`。新增 `npm run bundle:hash` | 本 PR |
