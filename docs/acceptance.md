# 验收清单

执行者：Antigravity（功能/性能）、Grok-Ops（红队/外部链路）。结果写入 status.md。

## 每次修复 PR（Antigravity）
- [ ] `npm run verify:baseline`、`npm test` 通过
- [ ] 对应 BUG 的回归探针由失败转通过，其余不退化
- [ ] 六角色权限矩阵无变化（除预期收紧）
- [ ] 历史 JSON 缺省字段兼容
- [ ] 涉及 UI：E2E 全路由 + 375px 视口

## Preview 发布后
- [ ] 冒烟：登录、首次改密、bootstrap、文书版本冲突、DIY 授权
- [ ] 会话 Cookie 属性无变化
- [ ] AI 默认行为符合配置（真实 AI 需另行验证）

## 红队检查项（Grok-Ops，仅 preview）
- [ ] Origin/CSRF：`/api/*` 写接口
- [ ] 越权：学生访问他人数据、跨角色接口
- [ ] 绕过乐观锁、导入异常备份
- [ ] 配额扣减顺序
- [ ] DeepSeek 联网链路、官网 iframe 嵌入登录（SameSite/postMessage）
- [ ] 500 学生规模下 Workers 内存/CPU（合成数据）

## 失败归属标注模板
```
[角色] 失败项：
复现步骤/命令：
证据（日志/截图，不含真实数据）：
归属：后端 / 前端 / 环境 / 数据 / 测试本身
认领人：
```
