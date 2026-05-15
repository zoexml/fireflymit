# Installation

## 📦 安装

### @fireflymit/ui（推荐）

组件 + 指令 + 工具函数一站式安装，`@fireflymit/ui` 已包含 `@fireflymit/hooks` 和 `@fireflymit/utils` 的全部导出。

::: code-group

```bash [pnpm]
pnpm add @fireflymit/ui
```

```bash [yarn]
yarn add @fireflymit/ui
```

```bash [npm]
npm install @fireflymit/ui
```

:::

配合 Element Plus 使用：

```bash
pnpm add element-plus
```

### @fireflymit/hooks（按需）

指令和组合式函数，可独立使用。如果已安装 `@fireflymit/ui`，无需重复安装。

::: code-group

```bash [pnpm]
pnpm add @fireflymit/hooks
```

```bash [yarn]
yarn add @fireflymit/hooks
```

```bash [npm]
npm install @fireflymit/hooks
```

:::

### @fireflymit/utils（按需）

工具函数库。如果已安装 `@fireflymit/ui`，无需重复安装。

::: code-group

```bash [pnpm]
pnpm add @fireflymit/utils
```

```bash [yarn]
yarn add @fireflymit/utils
```

```bash [npm]
npm install @fireflymit/utils
```

:::

## 🔧 使用方式

### 全局注册

```ts
import FireflyUI from '@fireflymit/ui'
import { createApp } from 'vue'
import App from './App.vue'
import '@fireflymit/ui/dist/index.css'

const app = createApp(App)
app.use(FireflyUI)
app.mount('#app')
```

全局注册后，所有组件和指令可直接在模板中使用。

### 按需引入

```vue
<script setup>
import { Avatar, Badge, copyToClipboard, randomString, useChildren, useLockScroll, vCopy, vLongpress, vRipple } from '@fireflymit/ui'
</script>
```

::: tip 包间关系
`@fireflymit/ui` 已 re-export `@fireflymit/hooks` 和 `@fireflymit/utils` 的全部导出。如果已安装 UI 包，可直接从 `@fireflymit/ui` 导入所有内容。
:::

## 🚀 发布流程

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本与发包，Turbo 负责编排构建顺序。

### 1. 创建变更记录

```bash
pnpm changeset:add
```

根据提示选择需要升级的包和版本类型（major / minor / patch），填写变更说明。

### 2. 提交变更记录

```bash
git add . && git commit -m "chore: add changeset"
git push
```

推送到 `main` 后，GitHub Actions 会自动创建或更新 `chore: version packages` 版本 PR。

### 3. 合并版本 PR

合并版本 PR 后，GitHub Actions 会执行
`pnpm release`：先通过 Turbo 构建可发布包，再通过 Changesets 发布 npm 上还不存在的新版本。

::: tip 发布顺序 `turbo.json` 中配置了
`"build": { "dependsOn": ["^build"] }`，会先构建上游依赖包，再构建依赖它们的包。`pnpm build:packages` 会构建
`@fireflymit/hooks`、`@fireflymit/utils`、`@fireflymit/uno-preset` 和 `@fireflymit/ui`。实际发布由 `changeset publish`
判断哪些包需要发布。:::

### 手动发布

如果需要本地发版，可按同一条链路执行：

```bash
pnpm changeset:add
pnpm changeset:version
pnpm release
```

## 🤔 常见问题、反馈

[反馈问题、新增需求](https://github.com/Joetoo/fireflymit/issues/new)

## 🔔 温馨提示

本站大部分图片使用`Github`静态资源。如遇加载空白或加载图片失败时，刷新几次即可
