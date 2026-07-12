# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies (pnpm required)
pnpm install

# Development
pnpm dev                    # Run all dev servers via Turbo
pnpm dev:play               # Run playground dev server only
pnpm dev:docs               # Run VitePress docs
pnpm dev:admin              # Run admin frontend (apps/admin)
pnpm dev:backend            # Run admin backend (FastAPI)
pnpm dev:full               # Run admin frontend + backend concurrently

# Build
pnpm build                  # Build all packages via Turbo
pnpm build:ui               # Build UI components only
pnpm build:utils            # Build utils only
pnpm build:commitlint       # Build commitlint config

# Lint & Format
pnpm lint                   # ESLint check
pnpm lint:fix               # ESLint auto-fix
pnpm format                 # Prettier format

# Test (in playground package)
pnpm test                   # Run vitest
pnpm test:coverage          # Run with coverage

# Package-specific commands
pnpm <cmd> --filter <package>  # Run cmd for specific package
pnpm dev --filter @fireflymit/ui
```

## Architecture Overview

**Monorepo Structure** (pnpm workspaces + Turborepo)

```
fireflymit/
├── apps/
│   ├── admin/                  # @fireflymit/admin — Vue 3 admin (fastapi-admin frontend)
│   ├── admin-backend/          # FastAPI backend (Python, not managed by pnpm)
│   ├── playground/            # Vue 3 app for testing components
│   └── docs/                  # VitePress documentation site
├── packages/
│   ├── ui/                    # Vue 3 UI component library (Element Plus based)
│   ├── utils/                 # Utility functions library
│   ├── hooks/                 # Vue composables
│   ├── uno-preset/            # UnoCSS preset
│   └── lint-configs/          # Shared lint configs (eslint, prettier, stylelint, typescript, commitlint)
├── docker/                    # Docker Compose + Nginx + Dockerfile (部署用)
├── deploy.sh / deploy.bat     # 部署脚本
└── turbo.json                 # Turborepo pipeline config
```

**Tech Stack**

- Vue 3 + TypeScript
- Element Plus (UI foundation)
- UnoCSS (atomic CSS)
- Vitest (testing)
- Vite (build)
- ESLint (antfu config) + Prettier + Stylelint

**Package Exports**

- `@fireflymit/ui` - Main UI component library
- `@fireflymit/hooks` - Vue composables and directives
- `@fireflymit/utils` - Utility functions (array, date, dom, random, string, tools, url)
- `@fireflymit/uno-preset` - UnoCSS preset

**Path Aliases** (from root tsconfig.json)

- `@ffm/*` → `packages/*`
- `@ffm/ui/*` → `packages/ui/src/*`

**Key Conventions**

- All packages use `unbuild` or `vite build` for ESM output
- Components use `.vue` SFC format with TypeScript
- Lint-staged runs ESLint on pre-commit hooks
- Commit messages follow conventional commits (commitlint)

## Upstream Sync (fastapi-admin)

`apps/admin` 和 `apps/admin-backend` 来源于 [fastapiadmin/FastapiAdmin](https://github.com/fastapiadmin/FastapiAdmin)（原始上游通过 `upstream` remote 配置）。

### 目录映射

| 原始上游 (FastapiAdmin) | fireflymit |
|---|---|
| `frontend/web/` | `apps/admin/` |
| `backend/` | `apps/admin-backend/` |
| `docker/` | `docker/` |

### 如何判断上游是否有更新

```bash
# 1. 拉取上游最新（上游分支是 master）
git fetch upstream master

# 2. 查看上游领先当前 HEAD 的提交数（有输出 = 有更新）
git log HEAD..upstream/master --oneline

# 3. 查看上游更新涉及哪些目录
git diff HEAD...upstream/master --stat
```

没有输出说明已是最新，无需同步。

### 当前同步状态

上游 `1966c53d` (2026-06-28)，已合并至 `8c9aaf5` (2026-07-02)。


### 同步工作流

```bash
# 1. 拉取上游最新（注意上游默认分支是 master，不是 main）
git fetch upstream master

# 2. 查看上游整体变更
git diff HEAD...upstream/master --stat

# 3. 查看前端变更（目录映射：frontend/web → apps/admin）
git diff HEAD...upstream/master -- frontend/web/

# 4. 查看后端变更
git diff HEAD...upstream/master -- backend/

# 5. 选择性合并某个文件
git show upstream/master:frontend/web/src/components/xxx.vue > /tmp/upstream.vue
# 手动对比 /tmp/upstream.vue 和 apps/admin/src/components/xxx.vue
```

### 冲突注意

以下文件已做 fireflymit 定制，同步时需要手动处理，**不能直接覆盖**：

| 文件 | 定制内容 |
|---|---|
| `apps/admin/package.json` | 包名 `@fireflymit/admin`，移除了 engines/packageManager/pnpm.overrides |
| `apps/admin/vite.config.ts` | alova AutoImport，Vite v8 兼容修复 |
| `apps/admin/.npmrc` | 不影响 |

- `@fireflymit/ui` 保持使用已发布版本（`^0.1.3`），不改为 `workspace:*`
