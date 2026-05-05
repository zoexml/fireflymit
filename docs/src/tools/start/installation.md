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

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本，Turbo 编排发布顺序。

### 1. 创建变更记录

```bash
npx changeset
```

根据提示选择需要升级的包和版本类型（major / minor / patch），填写变更说明。

### 2. 构建版本号

```bash
npx changeset version
```

此命令会消耗 changeset 文件，更新 `package.json` 版本号并写入 `CHANGELOG.md`。

### 3. 提交版本变更

```bash
git add . && git commit -m "chore: bump versions"
```

### 4. 发布

```bash
# Turbo 自动按拓扑顺序发布（hooks → ui）
turbo run release
```

::: tip 发布顺序
`turbo.json` 中配置了 `"dependsOn": ["build", "^release"]`，会先构建，再确保上游依赖发布后才发布当前包。
:::

### 手动发布

也可进入单个包目录直接发布：

```bash
cd packages/hooks && pnpm publish --otp=<验证码>
cd packages/ui && pnpm publish --otp=<验证码>
```

## 🤔 常见问题、反馈

[反馈问题、新增需求](https://github.com/Joetoo/fireflymit/issues/new)

## 🔔 温馨提示

本站大部分图片使用`Github`静态资源。如遇加载空白或加载图片失败时，刷新几次即可
