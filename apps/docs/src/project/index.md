---
title: 项目总览
---

# 项目总览

fireflymit 是一个 pnpm Monorepo：既对外发布前端物料（UI 组件、Hooks、工具函数、CLI），也包含后台管理前端、FastAPI 后端与 VitePress 文档站。

本分区记录整套工程「怎么组织、怎么跑起来、怎么部署」；前端物料的安装与使用见 [前端物料库](/tools/start/installation)。

## 仓库结构

| 路径                      | 包名 / 标识                                                            | 说明                                                |
| ------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------- |
| `packages/ui`             | `@fireflymit/ui`                                                       | Vue 3 组件库，基于 Element Plus 封装                |
| `packages/utils`          | `@fireflymit/utils`                                                    | 工具函数库（array、date、dom、string、tools、url）  |
| `packages/hooks`          | `@fireflymit/hooks`                                                    | Vue 组合式函数与自定义指令                          |
| `packages/uno-preset`     | `@fireflymit/uno-preset`                                               | UnoCSS 预设                                         |
| `packages/lint-configs/*` | `@fireflymit/{eslint,prettier,stylelint,typescript,commitlint}-config` | 共享 lint / 格式化 / TypeScript 配置                |
| `packages/scaffold`       | `@fireflymit/scaffold`                                                 | 给项目套团队工程规范的 CLI                          |
| `apps/admin`              | `@fireflymit/admin`                                                    | 后台管理前端（Vue 3 + Vite + Element Plus）         |
| `apps/admin-backend`      | —                                                                      | FastAPI 后端，Python 工程，不受 pnpm workspace 管理 |
| `apps/playground`         | `playground`                                                           | 组件开发与调试用应用                                |
| `apps/docs`               | `docs`                                                                 | VitePress 文档站（`base: /fireflymit/`）            |
| `docker/`                 | —                                                                      | Docker 部署相关文件                                 |
| `scripts/`                | —                                                                      | 仓库维护脚本                                        |

工作区定义在 `pnpm-workspace.yaml`（`packages/**`、`apps/*`）；任务编排在 `turbo.json`（`build`、`lint`、`check-types`、`dev`、`test`、`release`）。

## 技术栈

**前端**

- Vue 3 + TypeScript
- Vite（根依赖 `vite ^8.0.0`）
- Element Plus + UnoCSS
- Vitest
- pnpm（`packageManager: pnpm@10.33.0`）+ Turborepo
- Node.js `>=24`、pnpm `>=10`（根 `package.json` 的 `engines`）

**后端**（`apps/admin-backend`）

- Python 3.12+（`.python-version` 内容为 `3.12`）
- FastAPI 0.115.2、Uvicorn 0.49.0
- SQLAlchemy `>=2.0.51,<2.1`、Alembic 1.18.4
- Pydantic v2 + pydantic-settings
- Redis（Python 客户端 `redis==7.1.0`）
- 依赖管理 uv，代码检查/格式化 ruff，测试 pytest

## 默认端口

| 应用                         | 启动命令           | 端口 / 地址                                 | 依据                                                                         |
| ---------------------------- | ------------------ | ------------------------------------------- | ---------------------------------------------------------------------------- |
| 后台前端 `apps/admin`        | `pnpm dev:admin`   | `3006`                                      | `apps/admin/.env` 中 `VITE_PORT = 3006`                                      |
| 后端 `apps/admin-backend`    | `pnpm dev:backend` | `8001`                                      | `env/.env.dev.example` 中 `SERVER_PORT = 8001`；接口文档在 `/docs`、`/redoc` |
| 文档站 `apps/docs`           | `pnpm dev:docs`    | 仓库未显式配置端口（VitePress 默认 `5173`） | `apps/docs` 无端口配置                                                       |
| playground `apps/playground` | `pnpm dev:play`    | 仓库未显式配置端口（Vite 默认 `5173`）      | `apps/playground/vite.config.ts` 未设置 `server.port`                        |

::: warning 端口冲突
`pnpm dev` 由 Turbo 同时运行各包的 `dev` 脚本。文档站与 playground 都落在 Vite 默认的 `5173`，同时启动会冲突。日常全栈开发优先用 `pnpm dev:full`（后端 + 后台前端），或单独启动需要的应用。
:::

## 文档站

- 框架：VitePress 1.6.3（根 `devDependencies`）
- 源码目录：`apps/docs/src`（`srcDir: 'src'`）
- 构建产物：`apps/docs/.vitepress/dist`
- 站点基础路径：`base: '/fireflymit/'`
- 导航与侧边栏：`apps/docs/.vitepress/utils/index.ts`，侧边栏由 `vitepress-sidebar` 的 `generateSidebar` 按目录生成
- 发布方式：GitHub Pages，详见 [部署](./deployment.md)
