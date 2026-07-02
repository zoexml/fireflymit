# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
│   ├── admin/                  # @fireflymit/admin — Vue 3 后台管理系统 (fastapi-admin 前端)
│   └── admin-backend/          # FastAPI 后端 (Python, 不受 pnpm 管理)
├── packages/
│   ├── ui/                    # Vue 3 UI component library (Element Plus based)
│   ├── utils/                 # Utility functions library
│   ├── hooks/                 # Vue composables
│   ├── shared/                # Shared code
│   └── lint-configs/          # Shared lint configs (eslint, prettier, stylelint, typescript, commitlint)
├── playground/                # Vue 3 app for testing components
├── docs/                      # VitePress documentation
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
- `@fireflymit/utils` - Utility functions (array, date, dom, random, string, tools, url)

**Path Aliases** (from root tsconfig.json)

- `@ffm/*` → `packages/*`
- `@ffm/ui/*` → `packages/ui/src/*`

**Key Conventions**

- All packages use `unbuild` or `vite build` for ESM output
- Components use `.vue` SFC format with TypeScript
- Lint-staged runs ESLint on pre-commit hooks
- Commit messages follow conventional commits (commitlint)

## Upstream Sync (fastapi-admin)

`apps/admin` 和 `apps/admin-backend` 来源于 [fastapiadmin/FastapiAdmin](https://github.com/fastapiadmin/FastapiAdmin)，已通过 `upstream` remote 配置。

### 目录映射

| 原始上游 | fireflymit |
|---|---|
| `frontend/web/` | `apps/admin/` |
| `backend/` | `apps/admin-backend/` |
| `docker/` | `docker/` |

### 检查上游更新

```bash
# 拉取上游最新（注意上游默认分支是 master，不是 main）
git fetch upstream master

# 查看上游最新提交
git log upstream/master --oneline -5

# 对比上游与当前代码差异（前端）
git diff upstream/master:frontend/web/src/ HEAD:apps/admin/src/ --stat

# 对比上游与当前代码差异（后端）
git diff upstream/master:backend/ HEAD:apps/admin-backend/ --stat
```

**当前同步状态**：上游 `1966c53d` (2026-06-28)，已合并至 `8c9aaf5` (2026-07-02)。

### 同步工作流

```bash
git fetch upstream master                              # 拉取上游最新
# 确认有更新后，逐文件对比合并
git diff upstream/master:frontend/web/src/xxx.vue \    # 查看上游某个文件
  HEAD:apps/admin/src/xxx.vue
```

### 冲突注意

以下文件已做 fireflymit 定制，**不能直接覆盖**：
- `apps/admin/package.json` — 包名 `@fireflymit/admin`
- `apps/admin/vite.config.ts` — alova AutoImport, Vite v8 兼容
- `@fireflymit/ui` 保持已发布版本，不改为 `workspace:*`
