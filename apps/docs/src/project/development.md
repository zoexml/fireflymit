---
title: 本地全栈开发
---

# 本地全栈开发

本页描述在本机把后台前端 + FastAPI 后端跑起来的最小步骤。

## 前置条件

| 依赖    | 要求                          | 依据                                                   |
| ------- | ----------------------------- | ------------------------------------------------------ |
| Node.js | `>=24`                        | 根 `package.json` 的 `engines`                         |
| pnpm    | `>=10`（仓库锁定 `10.33.0`）  | 根 `package.json` 的 `packageManager` / `engines`      |
| Python  | `3.12+`                       | `apps/admin-backend/.python-version`、`pyproject.toml` |
| uv      | 建议安装                      | `dev:backend` 脚本直接调用 `uv`                        |
| 数据库  | MySQL 8 / PostgreSQL / SQLite | `env/.env.dev.example` 的 `DATABASE_TYPE`              |
| Redis   | 默认启用                      | `env/.env.dev.example` 的 `REDIS_ENABLE = True`        |

## 安装依赖

前端依赖在仓库根目录安装：

```bash
pnpm install
```

根 `preinstall` 脚本使用 `only-allow pnpm`，只能用 pnpm 安装。

后端 Python 依赖推荐用 uv：

```bash
cd apps/admin-backend
uv sync
```

或使用传统 pip / venv：

```bash
cd apps/admin-backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## 环境变量

### 后端

`apps/admin-backend/app/config/setting.py` 使用 `pydantic-settings` 读取 `env/.env.{ENVIRONMENT}`，开发环境即 `env/.env.dev`。首次使用从示例复制：

```bash
cp apps/admin-backend/env/.env.dev.example apps/admin-backend/env/.env.dev
```

常用配置项：

| 变量                                                                                        | 说明                                | 示例 / 默认          |
| ------------------------------------------------------------------------------------------- | ----------------------------------- | -------------------- |
| `SERVER_HOST` / `SERVER_PORT`                                                               | 监听地址与端口                      | `localhost` / `8001` |
| `DATABASE_TYPE`                                                                             | `mysql`、`postgres`、`sqlite`、`dm` | `mysql`              |
| `DATABASE_HOST` / `DATABASE_PORT` / `DATABASE_USER` / `DATABASE_PASSWORD` / `DATABASE_NAME` | 数据库连接                          | 按本机填写           |
| `REDIS_ENABLE` / `REDIS_HOST` / `REDIS_PORT` / `REDIS_PASSWORD` / `REDIS_DB_NAME`           | Redis 连接                          | 示例中默认启用       |
| `ROOT_PATH`                                                                                 | API 路由前缀                        | `/api/v1`            |
| `DOCS_URL` / `REDOC_URL`                                                                    | Swagger / ReDoc 路径                | `/docs` / `/redoc`   |
| `DEMO_ENABLE`                                                                               | 演示模式                            | `False`              |

::: tip 敏感值
`env/.env.dev` 已在版本库中。不要把自己的数据库密码、Redis 密码、`OPENAI_API_KEY` 等真实凭据写进受版本控制的文件。
:::

### 前端

`apps/admin` 的环境变量分层：

- `apps/admin/.env`：通用配置
- `apps/admin/.env.development`：开发环境覆盖
- `apps/admin/.env.production`：生产环境覆盖

与本地联调相关的项：

| 变量                   | 开发值                  | 说明                                   |
| ---------------------- | ----------------------- | -------------------------------------- |
| `VITE_PORT`            | `3006`                  | 前端开发服务器端口                     |
| `VITE_APP_BASE_API`    | `/api/v1`               | 请求前缀，同时作为 Vite 代理的匹配前缀 |
| `VITE_API_BASE_URL`    | `http://127.0.0.1:8001` | 代理目标（后端地址）                   |
| `VITE_API_TIMEOUT`     | `120000`                | 请求超时（毫秒）                       |
| `VITE_APP_WS_ENDPOINT` | `ws://localhost:8001`   | WebSocket 地址                         |

`apps/admin/vite.config.ts` 会把 `VITE_APP_BASE_API` 代理到 `VITE_API_BASE_URL`，因此本地只需保证后端在 `8001` 运行，前端请求不用改代码。

## 启动方式

| 命令               | 实际执行                                                | 作用                              |
| ------------------ | ------------------------------------------------------- | --------------------------------- |
| `pnpm dev:backend` | `cd apps/admin-backend && uv run main.py run --env=dev` | 只启动后端（开发环境自动 reload） |
| `pnpm dev:admin`   | `pnpm -F @fireflymit/admin dev`                         | 只启动后台前端（Vite，端口 3006） |
| `pnpm dev:full`    | `concurrently` 同时运行上面两个                         | 一键全栈开发                      |
| `pnpm dev:docs`    | `vitepress dev apps/docs`                               | 文档站                            |
| `pnpm dev:play`    | `pnpm -F playground dev`                                | playground                        |
| `pnpm dev`         | `turbo run dev`                                         | 运行所有包的 `dev` 脚本           |

首次启动后端会自动建表并写入种子数据（`app/scripts/initialize.py` 中的 `InitializeData.init_db()`），一般不需要先手动执行 Alembic 迁移。

## 登录后台

种子用户来自 `apps/admin-backend/app/scripts/data/sys_user.json`：用户名 `super`，`is_superuser` 为 `true`。初始密码的明文未在仓库中记录（数据文件中是密码哈希），**待确认**。如需调整初始账号或密码，请修改该种子数据后重新初始化数据库。

## 常用校验

```bash
pnpm build:docs   # 文档站构建（与 CI 命令一致）
pnpm lint
pnpm test
```
