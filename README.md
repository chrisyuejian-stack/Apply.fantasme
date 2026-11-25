# 枫琴申请工作站

基于上传的 `apply申请系统_独立提取_v2.2.1.zip` 建立的可运行恢复基线。申请业务、AI 后端及前端保留包内实现；新增本地开发工具、验证和协作文档。

## 立即运行

需要 Node.js 24+、npm、OpenSSL。无第三方依赖，无需 npm install。

```sh
cd /workspace/Apply.fantasme
npm test
npm run dev
```

本地使用 HTTPS，终端会给出地址（默认端口 8788）及本地初始化密钥文件位置。浏览器第一次访问需信任本机生成的自签名证书；证书仅用于本地开发。打开 `/login`，用 `.local/setup-key.txt` 中的密钥创建自己的主管账号。不要把密钥或账号密码提交到 Git。已有本地数据库无需重复初始化。修改 JS/CSS 后重新运行 `npm run dev`，没有自动热更新。

本地 SQLite 数据存放在忽略的 `.local/apply.sqlite`，重启保留。测试只使用内存或临时目录，不会清空开发库。默认不配置 AI，不会调用付费模型。可用进程环境变量传入 `DEEPSEEK_API_KEY` 和 `AI_*`；本地脚本不会自动读取 `.env`。`PORT` 可改端口，`LOCAL_DATA_DIR` 可改本地数据目录。默认仅监听回环地址。

## 构建与检查

```sh
npm run build             # public + 三段服务端代码 => dist/，Cloudflare Pages 上传目录
npm test                  # 自动构建，再运行原业务测试和本地 HTTPS 持久化测试
npm run verify:baseline   # 检查原始文件是否仍与上传包相同
```

原始哈希是固定证据。后续有意修改原始文件时，baseline 检查会报差异；在变更记录中解释，不要改写原始 manifest 来掩盖差异。业务测试仍须通过。

## 工程入口

| 路径 | 用途 |
| --- | --- |
| `src/server/application.js` | 申请业务、会话、权限、数据库初始化、内置院校与模板 |
| `src/server/ai.js` | AI 状态、对话、建议、联网核实、用量与反馈 |
| `src/server/entry.js` | 独立 Pages Worker 入口、资源映射、官网跳转 |
| `public/apply/app/app.js` / `app.css` | 主工作站及 DIY 前端，仍保留压缩变量名 |
| `public/apply/app/ai.js` / `ai.css` | AI 面板，通过 `window.FQAPP` 接入主工作站 |
| `public/apply/login.*` | 登录、初始化、DIY 注册 |
| `scripts/dev.mjs` / `local-d1.mjs` | 本地 HTTPS 服务与 SQLite/D1 子集适配器 |
| `tests/` | 原包业务回归及新增本地服务测试 |
| `docs/recovery/` | 来源、能力边界、原包说明和固定哈希 |
| `AGENTS.md` | Codex、Claude、Antigravity 共用工作约定 |

详细恢复范围见 [恢复记录](docs/recovery/REPORT.md)，代码定位见 [代码地图](docs/CODE_MAP.md)，后续拆分与迭代见 [迭代计划](docs/ROADMAP.md)。

## Cloudflare

当前只在本地新库验证，没有连接或改动线上 Cloudflare 和线上数据。

生产部署需 Pages 的 `APPLY_DB` D1 绑定、Secret `APPLY_SETUP_KEY`，普通变量 `SITE_URL`。AI 可选 Secret `DEEPSEEK_API_KEY`；模型名和接口可用性以实际服务为准，不因包内默认值而视为已验证。完整原包说明保存在 `docs/recovery/original/检查结论与部署说明.txt`，属于历史材料。

先在独立测试项目和新 D1 验证，再安排生产迁移。业务 JSON 导出不等于 D1 全库备份，也不保留所有密码与会话状态。部署、域名切换、线上数据迁移需单独明确安排。
