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

### 本地手动发版

1. **记录变更** — 执行 `pnpm changeset`，交互式选择要发布的包，选择版本变更级别（major/minor/patch），填写变更说明
2. **生成版本** — 执行 `pnpm changeset version`，changeset 会自动更新版本号并生成 CHANGELOG
3. **构建** — 执行 `pnpm build`，确保产物是最新的
4. **提交代码** — 将版本变更和 CHANGELOG 提交到 git
5. **发布到 npm** — 执行 `pnpm changeset publish`

```bash
pnpm changeset           # 记录变更
pnpm changeset version   # 生成版本号和 CHANGELOG
pnpm build               # 构建
git add -A && git commit -m "chore: version packages"
pnpm changeset publish   # 发布到 npm
```

### CI 自动发版（推荐）

项目已配置 GitHub Actions 自动发版流程（`.github/workflows/publish.yml`）：

1. 向 `main` 分支推送代码，且包含 changeset 文件
2. GitHub Actions 自动创建或更新版本 PR（`chore: version packages`）
3. 合并版本 PR 后，自动执行 `pnpm release` 构建并发布到 npm

**只需做的：**

```bash
pnpm changeset           # 记录变更
git commit -m "chore: add changeset"
git push                 # 推送到 main，自动触发版本 PR
# 然后在 GitHub 上合并版本 PR 即可
```

**所需 GitHub Secrets：**

| Secret | 说明 |
|--------|------|
| `FFM_TOKEN` | GitHub Personal Access Token（repo 权限）+ npm 访问 Token |
