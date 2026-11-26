# 恢复代码地图

当前不是 React/Vue 工程；主前端是一个 IIFE、HTML 模板字符串、事件代理和 hash 路由组成的原生 JS 应用。不要另建空壳 UI 替换已有业务。

## 请求链路

`src/server/entry.js` 的 `worker.fetch`：`/api/ai/*` → `fqaiRoute`；`/__portal` → 官网门户；其余 → `$t.fetch`。`APPLY_DB` 在适配层映射为业务后端的 `DB`。业务资源请求经 `applicationAssets` 补 `/apply` 前缀；保留当前静态目录结构。

业务后端源码在 `src/server/parts/`（构建时按文件名数字前缀原样拼接，见 `scripts/build.mjs`）：

| 片段 | 内容 |
| --- | --- |
| `00-seed-data.js` | `Ye`：首次安装种子（任务模板 + 院校要求库初始版本），**只在 `/api/setup` 使用** |
| `01-demo-data.js` | `Ze`：演示数据（`/api/setup` 勾选演示、`/api/admin/demo`） |
| `10-crypto-session.js` | 口令（PBKDF2）、会话 Cookie |
| `20-permissions.js` | 业务表清单 `we`、可见性 `de`、脱敏 `Be`、写入规则 `Qe` |
| `30-diy.js` | DIY 免费版：会话、业务、主管管理（`Vt`） |
| `40-database-helpers.js` | 建表 `qn`/`Hn`、响应与请求体、通用 DB、院校库读写、`rt`/`Jt` |
| `50-worker.js` | Worker 入口对象 `$t` |
| `55-documents.js` | 文书原子动作 `fqDocumentAction` |
| `60-router.js` | 页面/资源 `Wn`、同源校验、API 分派 `Yn` |
| `70-setup-login.js` | 首次安装 `Zn`、登录 `Xn` |
| `75-bootstrap.js` | 工作台数据 `Jn` |
| `80-records.js` | 通用记录增删改 `$n` |
| `85-users.js` | 账号管理 |
| `90-admin.js` | 导入锁/校验/暂存、管理路由 `ni` |

**院校要求库的数据源是 D1**（`meta` 表 `reqdb:head`、`reqdb:school:<id>`），管理端「院校要求库」导出（`GET /api/reqdb`）/导入（`PUT /api/reqdb`，整体替换）维护；`Ye.reqdb` 不是线上数据源，会逐渐落后于 D1 中的版本。

下表符号可用函数名搜索定位：

| 符号 | 职责 |
| --- | --- |
| `Ye` | 首次安装种子数据（见上表） |
| `$t.fetch` | 业务请求入口、数据库初始化与异常响应 |
| `Hn` | 自动建表与基础初始化 |
| `Wn` | 页面和静态资源响应 |
| `Yn` | `/api` 路由分派与登录/首次改密检查 |
| `Zn` / `Xn` / `Jn` | 初始化 / 登录 / bootstrap |
| `Ce` | 读取员工/学生会话 |
| `Vt` | DIY 与 DIY 管理 API |
| `$n` | 通用业务表的单记录操作 |
| `fqDocumentAction` | revise / proxy-confirm / review 文书操作 |
| `ni` | 管理员导入导出等接口 |

这些是根据当前代码调用关系得到的导航，不是恢复出的原始命名。后端大文件前部有大量院校/演示数据，业务代码主要在后部；优先按符号搜索，不依赖行号。

## 数据模型

D1/SQLite 的 `records(tbl,id,student_id,data,updated_at)` 按业务表名和记录 ID 保存 JSON。学生、申请、提交平台、考试轮次、任务、材料、文书、版本、审核、曲目、推荐人等业务通过此表保存。`users`、`sessions`、`login_attempts`、`meta`、`audit` 独立保存认证、院校库及审计。DIY 使用 `diy_accounts`、`diy_sessions`、`diy_records`。AI 运行时创建自己的日志、用量、缓存、反馈和院校快照表。基础 SQL 原定义位于 recovery/original/，不是完整迁移历史。

## AI 与前端连接

`ai.js` 的 `fqaiConfig` 读取配置；`fqaiRoute` 验证会话并分派至 `fqaiDispatch`；`fqaiD1Data` 接入业务数据。前端 `public/apply/app/ai.js` 通过主应用末尾只读的 `window.FQAPP` 引用调用现有保存逻辑。拆分主前端时必须保留这些接口或同步适配。

## 本地与生产边界

`scripts/local-d1.mjs` 只实现当前调用所需的 prepare/bind/first/all/run/batch 子集，不是 Cloudflare D1 全功能模拟器。本地服务串行进入共享 SQLite 连接，避免开发适配器的事务互相交错；这不验证生产并发。Cloudflare 平台限制、D1 分布式行为、联网 AI、浏览器完整交互仍需另行验证。

## 前端源码（M1-1d）

主前端源码在 `src/client/app/parts/`，按文件名前缀原样拼接成 `public/apply/app/app.js`（`npm run build:client`；生成文件需一起提交，`tests/client-parts.test.mjs` 校验一致，**不要直接改生成文件**）。单个 IIFE，片段之间共享作用域。

| 片段 | 内容 |
| --- | --- |
| `00-core.js` | 常量、工具函数、权限与数据存储（`bt` 等） |
| `10-api-render.js` | API 客户端 `ge` 与通用渲染组件 |
| `20-actions.js` | 业务动作表 `ms`（`data-act` 事件） |
| `30-nav-pages.js` | 导航动作 `zs` 与各页面 |
| `40-diy-boot.js` | DIY 免费版、启动与 `window.FQAPP` 导出 |

