---
title: 后端
---

# 后端（apps/admin-backend）

基于 FastAPI 的后端服务，为 `apps/admin` 提供 API，同时自带 Swagger / ReDoc 文档。

## 技术栈

| 技术       | 版本                   | 说明                            |
| ---------- | ---------------------- | ------------------------------- |
| Python     | 3.12+                  | `.python-version` 为 `3.12`     |
| FastAPI    | 0.115.2                | Web 框架                        |
| Uvicorn    | 0.49.0                 | ASGI 服务器                     |
| SQLAlchemy | `>=2.0.51,<2.1`        | ORM（异步）                     |
| Alembic    | 1.18.4                 | 数据库迁移                      |
| Pydantic   | v2 + pydantic-settings | 校验与配置                      |
| Redis      | `redis==7.1.0`         | 缓存、会话、限流                |
| pytest     | 9.0.2                  | 测试（`asyncio_mode = "auto"`） |
| ruff       | 0.14.13                | 检查与格式化                    |

## 目录结构

```text
apps/admin-backend/
├── app/
│   ├── alembic/versions/      # Alembic 迁移脚本
│   ├── api/v1/                # API v1
│   │   ├── module_common/     # 公共接口（文件、健康检查）
│   │   ├── module_monitor/    # 监控（缓存、在线用户、服务器资源）
│   │   ├── module_platform/   # 平台业务（菜单、租户、订单、发票、邮件等）
│   │   └── module_system/     # 系统管理（认证、用户、角色、字典、日志等）
│   ├── common/                # 常量、枚举、响应封装
│   ├── config/                # setting.py、path_conf.py
│   ├── core/                  # 数据库、安全、依赖、中间件、权限、分页基类等
│   ├── plugin/                # 插件式模块（AI、示例、代码生成、任务）
│   ├── scripts/               # 初始化脚本与 data/*.json 种子数据
│   └── utils/                 # 工具函数
├── env/                       # .env.dev / .env.dev.example / .env.prod.example
├── sql/                       # MySQL / PostgreSQL 初始化 SQL
├── static/                    # 静态资源
├── templates/                 # 代码生成与邮件模板
├── tests/                     # pytest 测试
├── main.py                    # Typer CLI 入口（run / revision / upgrade）
├── alembic.ini                # script_location = app/alembic
├── pyproject.toml             # 依赖、ruff、pytest 配置
├── uv.lock
└── requirements.txt
```

> `apps/admin-backend/README.md` 的目录图沿用上游写法（画的是 `backend/`，并把 `module_ai` 放在 `app/api/v1` 下）。本仓库实际路径以本页为准：`module_ai` 位于 `app/plugin/` 下。

## 模块分层

`module_*` 按业务竖切，模块内部常见分层如下（以 `module_system/user` 为例）：

```text
module_system/user/
├── controller.py   # 路由与请求处理
├── service.py      # 业务逻辑
├── crud.py         # 数据访问
├── model.py        # SQLAlchemy ORM 模型
└── schema.py       # Pydantic 模型
```

并非每个模块都有 `param.py`；需要时用于请求参数模型。

## 启动

```bash
cd apps/admin-backend
uv sync
uv run main.py run --env=dev
```

- `--env` 支持 `dev` / `prod`，默认 `dev`（`app/common/enums.py` 的 `EnvironmentEnum`）。
- 开发环境启用 Uvicorn `reload`。
- 启动后接口文档：
  - Swagger UI：`http://127.0.0.1:8001/docs`
  - ReDoc：`http://127.0.0.1:8001/redoc`
- `ROOT_PATH` 默认为 `/api/v1`，业务接口实际路径形如 `/api/v1/system/user/list`。

## 路由组织

`main.py` 的 `create_app()` 调用 `app/init_app.py` 中的 `register_routers()`：

- `module_common`、`module_monitor`、`module_platform`、`module_system` 四个模块路由被挂载，并统一附加 `RateLimiter(times=200, seconds=10)`。
- AI WebSocket 路由（`app/plugin/module_ai/chat/ws.py`）与动态路由（`app/core/discover.py`）单独挂载。

各模块在自己的 `__init__.py` 中声明 `APIRouter(prefix=...)` 并汇总子路由，例如：

```text
app/api/v1/module_system/__init__.py   → system_router = APIRouter(prefix="/system")
app/api/v1/module_system/user/controller.py → UserRouter = APIRouter(prefix="/user", ...)
```

## 数据库迁移

首次启动会自动建表并写入种子数据，一般不需要先执行迁移。修改 ORM 模型后使用 Alembic：

```bash
# 按模型变更生成迁移脚本（autogenerate）
uv run main.py revision --env=dev

# 应用到最新版本（head）
uv run main.py upgrade --env=dev
```

- 迁移脚本目录：`app/alembic/versions/`
- Alembic 配置：`alembic.ini`（`script_location = app/alembic`）

## 代码检查与测试

```bash
uv run ruff check
uv run ruff check --fix

uv run pytest
```

- `pyproject.toml` 配置 `asyncio_mode = "auto"`，测试位于 `tests/`。
- `uv sync` 默认安装 dev 依赖组（pytest、ruff、fakeredis）；生产用 `requirements.txt`，不包含这些开发依赖。
- `ruff` 行宽等规则见 `pyproject.toml` 的 `[tool.ruff]`。
