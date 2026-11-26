# 对恢复基线的有意变更

`docs/recovery/manifest.json` 与 `docs/recovery/original/` 保持原样，**不得改写**。以下变更在基线之后有意引入，因此 `npm run verify:baseline` 对被修改文件报不一致属预期；未列入本表的文件必须仍与基线一致。

| 日期 | 文件 | 变更 | 来源 |
|---|---|---|---|
| 2026-11-26 | `src/server/application.js` | BUG-01 通用学生删除复用级联清理；BUG-04 采集表推荐人归属与引用保护；BUG-06 文书版本校验与服务端乐观锁；BUG-07 按 D1 实例隔离建表标志；BUG-09 定稿文书可经原子审核接口退回 | PR #9/#11/#14/#15/#17 |
| 2026-11-26 | `src/server/ai.js` | BUG-07 院校缓存按库隔离；BUG-08 权限校验先于配额扣减 | PR #15/#16 |
| 2026-11-26 | `src/server/bug-*.test.mjs` | 新增回归断言（不改 `tests/standalone.test.mjs`） | 同上 |

后续每个有意修改基线文件的 PR，需在此追加一行：日期、文件、变更、PR。
