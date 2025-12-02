# 将本地开发环境集成到docker

## 启动

```sh
docker compose up --build

## 访问
http://localhost:5173   (Vite)
http://localhost:3000   (Next.js)

```

## 不同框架的命令修改

1. Vite/Vue/React

command: pnpm dev

2. Next.js

command: pnpm dev

3. 外加确保端口暴露
   ports:

- "3000:3000"
  environment:
- WATCHPACK_POLLING=true

4. Nuxt3

command: pnpm dev -o
ports:

- "3000:3000"

## VSCode 容器开发

```json
{
  "name": "Front Dev with pnpm",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "front",
  "workspaceFolder": "/app",
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```
