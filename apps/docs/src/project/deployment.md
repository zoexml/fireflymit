---
title: 部署
---

# 部署

本页记录仓库里实际存在的部署方式：文档站走 GitHub Pages，后端与配套服务提供 Docker 相关文件与脚本。

## 文档站（GitHub Pages）

发布流程由 `.github/workflows/deploy.yml` 定义：

- **触发**：推送到 `main` 且改动命中 `apps/docs/**`；也可以手动 `workflow_dispatch`
- **权限**：`contents: read`、`pages: write`、`id-token: write`
- **并发**：并发组 `pages`，同一时间只跑一个部署

工作流步骤：

1. `actions/checkout`（`fetch-depth: 0`）
2. `pnpm/action-setup` + `actions/setup-node`（Node 24，pnpm 缓存）
3. `actions/configure-pages`
4. `pnpm install --frozen-lockfile`
5. `pnpm build:docs`
6. 上传 `apps/docs/.vitepress/dist`
7. `actions/deploy-pages`

站点配置在 `apps/docs/.vitepress/config.ts`：`base: '/fireflymit/'`。仓库为 `zoexml/fireflymit`，对应 GitHub Pages 地址为 `https://zoexml.github.io/fireflymit/`。

本地复现构建：

```bash
pnpm install --frozen-lockfile
pnpm build:docs
pnpm preview:docs
```

## Docker 部署

仓库中与 Docker 部署相关的文件：

| 文件                                 | 作用                                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `docker/backend/Dockerfile`          | 后端镜像：`python:3.12-slim`，安装 `apps/admin-backend/requirements.txt`，`EXPOSE 8001`，启动 `python main.py run --env=prod` |
| `docker/docker-compose-example.yaml` | Compose 编排示例，包含 `mysql`、`redis`、`backend`、`nginx` 四个服务                                                          |
| `docker/nginx/nginx.conf`            | Nginx 配置                                                                                                                    |
| `docker/.env`                        | 部署环境变量                                                                                                                  |
| `deploy.sh` / `deploy.bat`           | 根目录部署脚本                                                                                                                |

`deploy.sh` 支持的子命令（见脚本 `case` 分支）：`start`、`stop`、`restart`、`logs`、`verify`、`clean`。

```bash
./deploy.sh              # 完整部署
./deploy.sh start        # 启动容器
./deploy.sh stop         # 停止容器
./deploy.sh logs         # 查看容器日志
./deploy.sh verify       # 验证部署状态
```

::: warning 待确认
`deploy.sh` 在 `docker/` 目录执行 `docker compose`，但仓库里只有 `docker-compose-example.yaml`，没有 `docker-compose.yaml`；脚本在缺少 `docker/.env` 时会尝试复制 `docker/.env.example`，而仓库里也没有这个示例文件。直接运行前需要先补齐这两个文件（可从示例改编），具体参数见仓库 `docker/README.md`。
:::

## 其他部署

- `vercel.json` 配置的是 **Storybook 静态站**：先构建 `@fireflymit/hooks`、`@fireflymit/utils`、`@fireflymit/uno-preset`、`@fireflymit/ui`，再执行 `storybook build`，输出 `.storybook/dist`。它不负责文档站。
- 组件库预览地址见导航「相关链接」中的 `https://fireflymit.vercel.app`。
