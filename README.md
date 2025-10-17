# fireflymit

pnpm-monorepo + Turborepo

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## 🛠️ 技术栈

- 🔧 [antfu eslint config](https://github.com/antfu/eslint-config) - 代码规范
- 🔷 [typescript](https://www.typescriptlang.org/) - JavaScript 超集
- ⚡️ [radash](https://radash.uihtm.com/) - 函数库
- 🎨 [unocss](https://unocss.dev/) - 原子化 CSS 引擎
  <!-- - 🖖 [vue3](https://vuejs.org/) - 渐进式框架 -->
  <!-- - 🚦 [uni-mini-router](https://github.com/uni-helper/uni-mini-router) - 小程序路由管理器 -->
  <!-- - 🚀 [alova](https://alova.js.org/) - 轻量级请求策略库 -->
  <!-- - 🎯 [wot-design](https://wot-design-uni.cn/) - Vue3 UI 框架 -->
  <!-- - 📜 [z-paging](https://z-paging.zxlee.cn/) - 上拉加载下拉刷新组件 -->
  <!-- - 📦 [pinia](https://pinia.vuejs.org/) - 状态管理 -->
  <!-- - 📦 [openapi-ts-request](https://github.com/openapi-ui/openapi-ts-request) - api自动生成 -->

## 安装教程

```bash
# 安装公共依赖
pnpm i xxx -w
# 安装开发依赖
pnpm i xxx -Dw
# 安装xxx依赖到 packages/* 项目下
pnpm add <package_name> --filter <package_selector>
# 运行单个包的scripts脚本
pnpm dev --filter <package_selector>
# 各个 packages/* 模块包间的相互依赖,递归安装依赖
pnpm install xxx -r
pnpm install <package_selector1> -r --filter <package_selector2>

```

### docs and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### 一键生成文档

- 采用 TSDoc 规范编写代码注释
- [api-extractor] 分析代码注释生成文档模型
- [api-documenter] 解析文档模型生成接口md文档

使用 `@microsoft/api-extractor` 和 `@microsoft/api-documenter` 一键生成 API 文档。

1. 初始化生成配置文件 api-extractor.json
2. pnpm api 提取文档
3. pnpm md 生成md文档

### 项目打包

1. unbuild
2. vite build 打包

```js
// 什么是 esm、cjs、iife 格式

// esm 格式：ECMAScript Module，现在使用的模块方案，使用 import export 来管理依赖

// cjs 格式：CommonJS，只能在 NodeJS 上运行，使用 require("module") 读取并加载模块；

// iife 格式：通过 <script> 标签引入的自执行函数；
```

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
- [如何去搞 Vue/React Hooks 和 Utils 的企业开源工具库？](https://juejin.cn/post/7165671737076482062#heading-2)
- [使用 Vite 和 TypeScript 带你从零打造一个属于自己的 Vue3 组件库](https://juejin.cn/post/7117886038126624805#heading-17)
- [pnpm workspace 指南](https://pnpm.io/zh/feature-comparison)
- [基于TSDoc规范生成漂亮的开源项目文档](https://juejin.cn/post/7275943600780787753?searchId=202408312125260968A15D4199BF36B1A5#heading-4)
- [个人工具函数库 摇树优化 一键生成文档站点](https://juejin.cn/post/7245584147456426045#heading-7)
