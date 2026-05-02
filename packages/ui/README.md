# @fireflymit/ui

基于 Element Plus 封装的 Vue 3 业务组件库，所有组件使用 `Art` 前缀命名。

## 安装

```bash
pnpm add @fireflymit/ui element-plus
# 或
npm install @fireflymit/ui element-plus
# 或
yarn add @fireflymit/ui element-plus
```

## 快速开始

### 全局注册

```ts
import ArtUI from '@fireflymit/ui'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/style.css'

const app = createApp(App)
app.use(ArtUI)
```

注册后可直接在模板中使用：

```vue
<template>
  <ArtBadge type="success" text="在线" />
  <ArtBanner title="欢迎使用" subtitle="ArtUI 组件库" />
</template>
```

### 按需引入

```ts
import ArtBadge from '@fireflymit/ui/lib/components/Badge'
import ArtBanner from '@fireflymit/ui/lib/components/Banner'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/style.css'
```

## 组件列表

| 组件             | 说明                                       |
| ---------------- | ------------------------------------------ |
| `ArtBadge`       | 状态徽章，带颜色圆点和文本标签             |
| `ArtBanner`      | 横幅组件，支持标题、副标题、按钮和流星动画 |
| `ArtCardBanner`  | 卡片式横幅，适合图文展示和操作按钮         |
| `ArtContextMenu` | 右键上下文菜单，支持嵌套子菜单             |
| `ArtCountTo`     | 数字滚动动画组件                           |
| `ArtDragVerify`  | 拖拽验证滑块                               |
| `ArtProForm`     | 高级表单生成器，支持多种字段类型           |
| `ArtSearchBar`   | 搜索栏，支持展开/收起                      |
| `ArtSvgIcon`     | Iconify SVG 图标组件                       |
| `ArtTextScroll`  | 文字滚动公告组件                           |

## 样式

组件库的样式需要手动引入：

```ts
import '@fireflymit/ui/style.css'
```

确保在引入 Element Plus 样式之后再引入组件库样式。

## TypeScript 支持

组件库自带完整的 TypeScript 类型声明，IDE 中可获得自动补全和类型检查。

## 开发

```bash
pnpm install          # 安装依赖
pnpm build:ui         # 构建
pnpm dev:play         # 启动 playground 预览
```

## 许可证

[MIT](LICENSE)
