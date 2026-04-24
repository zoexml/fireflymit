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
- 🖖 [vue3](https://vuejs.org/) - 渐进式框架
- 🚀 [alova](https://alova.js.org/) - 轻量级请求策略库
  <!-- - 📦 [openapi-ts-request](https://github.com/openapi-ui/openapi-ts-request) - api自动生成 -->

## 安装

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
# 模板
pnpm create vite play --template vue-ts

```

### 项目结构

```
fireflymit
├─ .changeset                                  // 发包管理
│  ├─ README.md                                //
│  └─ config.json                              //
├─ .editorconfig                               //
├─ .npmrc                                      //
├─ .nvmrc                                      //
├─ .stylelintignore                            //
├─ LICENSE                                     //
├─ README.md                                   //
├─ commitlint.config.mjs                       //
├─ docs                                       // 文档
├─ eslint.config.js                            //
├─ package.json                                //
├─ packages                                    //
│  ├─ docker-dev-environment                   //
│  │  ├─ .dockerignore                         //
│  │  ├─ Dockerfile                            //
│  │  ├─ README.md                             //
│  │  └─ docker-compose.yml                    //
│  ├─ hooks                                    //
│  ├─ lint-configs                             //
│  │  ├─ eslint-config                         //
│  │  ├─ prettier-config                       //
│  │  ├─ stylelint-config                      //
│  │  └─ typescript-config                     //
│  ├─ shared                                   //
│  ├─ ui                                       //
│  │  ├─ README.md                             //
│  │  ├─ package.json                          //
│  │  ├─ src                                   //
│  │  │  ├─ __tests__                          //
│  │  │  ├─ _utils                             //
│  │  │  │  ├─ bem.ts                          //
│  │  │  │  ├─ index.ts                        //
│  │  │  │  ├─ install.ts                      //
│  │  │  │  └─ with-install.ts                 //
│  │  │  ├─ components                         //
│  │  │  │  ├─ Badge                           //
│  │  │  │  │  ├─ Badge.vue                    //
│  │  │  │  │  ├─ index.ts                     //
│  │  │  │  │  └─ types.ts                     //
│  │  │  │  ├─ SearchBar                       //
│  │  │  │  │  ├─ SearchBar.vue                //
│  │  │  │  │  ├─ index.ts                     //
│  │  │  │  │  └─ types.ts                     //
│  │  │  │  ├─ index.ts                        //
│  │  │  │  └─ installer.ts                    //
│  │  │  ├─ index.ts                           //
│  │  │  ├─ style                              //
│  │  │  │  └─ variables.scss                  //
│  │  │  ├─ types                              //
│  │  │  │  ├─ auto-imports.d.ts               //
│  │  │  │  └─ global.d.ts                     //
│  │  │  ├─ utils                              //
│  │  │  └─ version.ts                         //
│  │  ├─ tsconfig.json                         //
│  │  ├─ vite.config.ts                        //
│  │  └─ vitest.config.ts                      //
│  └─ utils                                    //
│     ├─ package.json                          //
│     ├─ src                                   //
│     │  ├─ array                              //
│     │  │  └─ index.ts                        //
│     │  ├─ date                               //
│     │  │  └─ index.ts                        //
│     │  ├─ dom                                //
│     │  │  └─ index.ts                        //
│     │  ├─ index.ts                           //
│     │  ├─ random                             //
│     │  │  └─ index.ts                        //
│     │  ├─ string                             //
│     │  │  └─ index.ts                        //
│     │  ├─ tools                              //
│     │  │  └─ index.ts                        //
│     │  ├─ url                                //
│     │  │  └─ index.ts                        //
│     │  └─ version.ts                         //
│     └─ tsconfig.json                         //
├─ playground                                  //
│  ├─ README.md                                //
│  ├─ index.html                               //
│  ├─ package.json                             //
│  ├─ public                                   //
│  │  └─ vite.svg                              //
│  ├─ src                                      //
│  │  ├─ App.vue                               //
│  │  ├─ App1.vue                              //
│  │  ├─ counter.ts                            //
│  │  ├─ layouts                               //
│  │  │  ├─ MainLayout.vue                     //
│  │  │  ├─ TabsView.vue                       //
│  │  │  └─ container                          //
│  │  │     ├─ Directives.vue                  //
│  │  │     ├─ Hooks.vue                       //
│  │  │     ├─ Ui.vue                          //
│  │  │     └─ Utils.vue                       //
│  │  ├─ main.ts                               //
│  │  ├─ router                                //
│  │  │  └─ index.ts                           //
│  │  ├─ types                                 //
│  │  │  └─ router.d.ts                        //
│  │  ├─ views                                 //
│  │  │  ├─ Directives                         //
│  │  │  │  └─ vFocus.vue                      //
│  │  │  ├─ Hooks                              //
│  │  │  │  └─ useCounter.vue                  //
│  │  │  ├─ Ui                                 //
│  │  │  │  ├─ ArtBadge.vue                    //
│  │  │  │  ├─ Button.vue                      //
│  │  │  │  ├─ Dialog.vue                      //
│  │  │  │  └─ SearchBar.vue                   //
│  │  │  └─ Utils                              //
│  │  │     ├─ All.vue                         //
│  │  │     └─ __test__                        //
│  │  │        ├─ array.spec.ts                //
│  │  │        └─ string.spec.ts               //
│  │  └─ vite-env.d.ts                         //
│  ├─ tsconfig.json                            //
│  ├─ vite.config.ts                           //
│  └─ vitest.workspace.ts                      //
├─ pnpm-lock.yaml                              //
├─ pnpm-workspace.yaml                         //
├─ prettier.config.js                          //
├─ scripts                                     //
│  ├─ generate-component.mjs                   //
│  └─ rename-package.sh                        //
├─ stylelint.config.mjs                        //
├─ tsconfig.json                               //
├─ turbo.json                                  //
└─ uno.config.ts                               //

```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting

### apps/art-design-pro

第三方开源项目 [art-design-pro](https://github.com/Daymychen/art-design-pro)，已克隆到本地作为参考应用。

**同步上游更新：**

```bash
# 进入项目目录
cd apps/art-design-pro

# 获取上游最新代码
git fetch vendor

# 查看最新提交
git log --oneline vendor/main -1

# 合并上游变更到本地
git merge vendor/main

# 如果有 fork，推送到你的远程
git push origin <your-branch>
```

或者运行同步脚本：

```bash
pnpm run sync-art-design-pro
```

> 注意：该目录已移除 `.git` 目录，作为普通项目直接管理。如需持续跟踪上游变更，可考虑改用 git submodule。

### 一键生成文档

- 采用 TSDoc 规范编写代码注释
- [api-extractor] 分析代码注释生成文档模型
- [api-documenter] 解析文档模型生成接口md文档

使用 `@microsoft/api-extractor` 和 `@microsoft/api-documenter` 一键生成 API 文档。

1. 初始化生成配置文件 api-extractor.json
2. pnpm api 提取文档
3. pnpm md 生成md文档

<!-- 实时查看规则：让配置一目了然 -->

npx @eslint/config-inspector

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
- [业务组件库按需引入](https://juejin.cn/post/7572480736362119174)
- [组件库template](https://github.com/huangmingfu/vue3-turbo-component-lib-template)
- [pnpm workspace 指南](https://pnpm.io/zh/feature-comparison)
- [基于TSDoc规范生成漂亮的开源项目文档](https://juejin.cn/post/7275943600780787753?searchId=202408312125260968A15D4199BF36B1A5#heading-4)
- [个人工具函数库 摇树优化 一键生成文档站点](https://juejin.cn/post/7245584147456426045#heading-7)
