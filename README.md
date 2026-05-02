# fireflymit

基于 pnpm Monorepo + Turborepo 构建的前端组件库与工具集。

## 技术栈

- Vue 3 + TypeScript
- [Element Plus](https://element-plus.org/) — UI 基础组件库
- [UnoCSS](https://unocss.dev/) — 原子化 CSS 引擎
- [Vitest](https://vitest.dev/) — 单元测试
- [Vite / Rolldown](https://vite.dev/) — 构建工具
- [antfu ESLint Config](https://github.com/antfu/eslint-config) — 代码规范
- Prettier + Stylelint — 格式化与样式检查
- [Changesets](https://github.com/changesets/changesets) — 版本管理与发包

## 快速开始

```bash
# 安装依赖（必须使用 pnpm）
pnpm install

# 启动开发
pnpm dev                    # 启动所有 dev server
pnpm dev:play               # 启动 playground 预览
pnpm dev:docs               # 启动 VitePress 文档站点

# 构建
pnpm build                  # 构建所有 package
pnpm build:ui               # 仅构建 UI 组件库
pnpm build:utils            # 仅构建工具库

# 检查 & 格式化
pnpm lint                   # ESLint 检查
pnpm lint:fix               # 自动修复
pnpm format                 # Prettier 格式化

# 测试
pnpm test                   # 运行 Vitest
pnpm test:coverage          # 生成覆盖率报告
```

## 项目结构

```
fireflymit/
├── apps/
│   └── art-design-pro/            # 第三方参考项目
├── packages/
│   ├── ui/                        # Vue 3 UI 组件库 (@fireflymit/ui)
│   │   ├── src/
│   │   │   ├── components/        # 组件
│   │   │   │   ├── Badge/
│   │   │   │   ├── Banner/
│   │   │   │   ├── CardBanner/
│   │   │   │   ├── ContextMenu/
│   │   │   │   ├── CountTo/
│   │   │   │   ├── DragVerify/
│   │   │   │   ├── ProForm/
│   │   │   │   ├── SearchBar/
│   │   │   │   ├── SvgIcon/
│   │   │   │   └── TextScroll/
│   │   │   ├── styles/            # 全局样式与变量
│   │   │   └── _utils/            # 内部工具函数 (bem, install)
│   │   └── ...
│   ├── utils/                     # 工具函数库 (@fireflymit/utils)
│   │   └── src/
│   │       ├── array/             # 数组工具
│   │       ├── date/              # 日期处理
│   │       ├── dom/               # DOM 操作
│   │       ├── string/            # 字符串处理
│   │       └── tools/             # 通用工具
│   ├── hooks/                     # Vue 组合式函数 (@fireflymit/hooks)
│   │   └── src/
│   │       ├── useChildren.ts
│   │       ├── useCompRef.ts
│   │       └── useLockScroll.ts
│   ├── shared/                    # 共享代码 (@fireflymit/shared)
│   ├── lint-configs/              # 统一 lint 配置
│   │   ├── eslint-config/
│   │   ├── prettier-config/
│   │   ├── stylelint-config/
│   │   ├── typescript-config/
│   │   └── commitlint-config/
│   └── docker-dev-environment/    # Docker 开发环境
├── playground/                    # 开发测试环境 (Vue 3 应用)
├── docs/                          # VitePress 文档
├── scripts/                       # 构建脚本
├── turbo.json                     # Turborepo 流水线配置
├── pnpm-workspace.yaml            # Workspace 配置
└── tsconfig.json                  # 根 TypeScript 配置
```

## Packages

### @fireflymit/ui

基于 Element Plus 封装的 Vue 3 业务组件库。

#### 安装

```bash
pnpm add @fireflymit/ui
pnpm add element-plus
```

#### 全局注册

```ts
import ArtUI from '@fireflymit/ui'
import 'element-plus/dist/index.css'

app.use(ArtUI)
```

### @fireflymit/utils

轻量级工具函数库，支持 Tree Shaking。

```ts
import { /* array, date, dom, string, tools */ } from '@fireflymit/utils'
```

### @fireflymit/hooks

Vue 3 组合式函数库。

```ts
import { useLockScroll } from '@fireflymit/hooks'
```

### @fireflymit/typescript-config

项目共享 TypeScript 基础配置 (`base.json`, `vite.json`, `vue.json` 等)。

### @fireflymit/eslint-config / prettier-config / stylelint-config

项目统一的代码规范配置，基于 [antfu/eslint-config](https://github.com/antfu/eslint-config)。

## 常用操作

### 新增依赖

```bash
# 安装到根目录（工作区）
pnpm i <package> -w
pnpm i <package> -Dw          # 开发依赖

# 安装到指定 package
pnpm add <package> --filter @fireflymit/ui
pnpm add <package> -D --filter @fireflymit/utils
```

### 包间依赖

```bash
# 安装 workspace 内的包（递归安装依赖）
pnpm install <package> -r --filter <selector>

# 在 package.json 中引用 workspace 包
"dependencies": { "@fireflymit/ui": "workspace:*" }
```

### 运行单个 package 的脚本

```bash
pnpm dev --filter @fireflymit/ui
pnpm build --filter @fireflymit/utils
```

### 依赖更新

```bash
pnpm deps:check               # 检查过期依赖
pnpm deps:update              # 交互式更新依赖
```

## 版本发布

项目使用 Changesets 管理版本和 changelog：

```bash
pnpm changeset                # 创建变更描述
pnpm changeset:version        # 生成版本号和 changelog
pnpm build                    # 重新构建
# 发布到 npm
```

## API 文档

采用 TSDoc 规范编写代码注释，使用 `@microsoft/api-extractor` 和 `@microsoft/api-documenter` 自动生成文档。

```bash
pnpm api       # 提取文档模型
pnpm md        # 生成 Markdown 文档
```

## 项目打包格式说明

| 格式 | 说明                                     |
| ---- | ---------------------------------------- |
| ESM  | `import / export` 现代模块标准，推荐格式 |
| CJS  | CommonJS，Node.js 兼容格式               |
| IIFE | 自执行函数，通过 `<script>` 标签引入     |

## 第三方参考

### apps/art-design-pro

第三方开源项目 [art-design-pro](https://github.com/Daymychen/art-design-pro)，已克隆到本地作为参考应用。

**同步上游更新：**

```bash
cd apps/art-design-pro
git fetch vendor
git merge vendor/main
```

或运行同步脚本：

```bash
pnpm run sync-art-design-pro
```

## 有用链接

- [Turborepo 官方文档](https://turborepo.com/docs)
- [pnpm workspace 指南](https://pnpm.io/zh/workspaces)
- [Vue 3 Composition API 指南](https://vuejs.org/guide/reusability/composables.html)
- [组件库 template 参考](https://github.com/huangmingfu/vue3-turbo-component-lib-template)
- [pnpm-monorepo + Turborepo 业务组件库按需引入](https://juejin.cn/post/7572480736362119174)
- [基于 TSDoc 规范生成文档](https://juejin.cn/post/7275943600780787753)
- [个人工具函数库 — 摇树优化 — 一键生成文档站点](https://juejin.cn/post/7245584147456426045)
