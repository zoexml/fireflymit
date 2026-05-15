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

## 如何发版

### CI 自动发版（推荐）

项目配置了 GitHub Actions 自动发版流程（`.github/workflows/publish.yml`）：

1. 创建 changeset，记录需要发布的包、版本级别和变更说明
2. 推送到 `main` 后，GitHub Actions 自动创建或更新版本 PR
3. 合并版本 PR 后，GitHub Actions 自动执行 `pnpm release`
4. `pnpm release` 先通过 Turbo 构建可发布包，再通过 Changesets 发布 npm 上还不存在的新版本

```bash
pnpm changeset:add       # 记录变更
git add . && git commit -m "chore: add changeset"
git push                 # 推送后等待版本 PR
```

**所需 GitHub Secrets：**

| Secret      | 说明                                              |
| ----------- | ------------------------------------------------- |
| `NPM_TOKEN` | npm automation token，用于发布 `@fireflymit/*` 包 |

### 本地手动发版

```bash
pnpm changeset:add       # 记录变更
pnpm changeset:version   # 生成版本号和 CHANGELOG
pnpm release             # Turbo 构建可发布包 + Changesets 发布
```
