FROM node:22

# 设置 pnpm 为默认包管理器
RUN corepack enable

WORKDIR /app

# 先复制依赖文件以利用 Docker 缓存
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 再复制整个项目
COPY . .

EXPOSE 5173
EXPOSE 3000

CMD ["pnpm", "dev"]
