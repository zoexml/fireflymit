# Changesets

### @see https://mp.weixin.qq.com/s/Ep-hrLzyP9s1Gtx8QFEzhA
采用 changesets 管理 monorepo 多包项目

- pnpm add -Dw @changesets/cli
- pnpm changeset init

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  // changelog 生成方式
  "changelog": "@changesets/cli/changelog",
  // 不要让 changeset 在 publish 的时候帮我们做 git add
  "commit": false,
  "fixed": [],
  // 配置哪些包要共享版本
  "linked": [],
  // 公私有安全设定，内网建议 restricted ，开源使用 public
  "access": "public",
  // 项目主分支
  "baseBranch": "main",
  // 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题
  "updateInternalDependencies": "patch",
  // 不需要变动 version 的包
  "ignore": []
}
```
