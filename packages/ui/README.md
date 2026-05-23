# @fireflymit/ui

基于 Element Plus 封装的 Vue 3 业务组件库。

## 安装

```bash
pnpm add @fireflymit/ui element-plus
```

## 使用方式

### 全局引入

一次性注册所有组件：

```ts
import FireflyUI from '@fireflymit/ui'
import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/style.css'

const app = createApp(App)
app.use(FireflyUI)
```

注册后在模板中直接使用：

```vue
<template>
  <Badge type="success" text="在线" />
  <Banner title="欢迎" subtitle="FireflyUI 组件库" />
</template>
```

### 自动按需引入

配合 `unplugin-auto-import` 和 `unplugin-vue-components` 使用，模板里写到组件时会自动导入对应组件：

```ts
import { FireflyMitResolver } from '@fireflymit/ui/resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [FireflyMitResolver()],
    }),
    Components({
      resolvers: [FireflyMitResolver()],
    }),
  ],
})
```

默认会自动引入 `@fireflymit/ui/style.css`。如果你已经在项目入口手动引入了组件库样式，可以关闭样式副作用：

```ts
FireflyMitResolver({ importStyle: false })
```

需要组件名前缀时可以这样配置：

```ts
FireflyMitResolver({ prefix: 'F' })
```

然后在模板中使用：

```vue
<template>
  <FBadge type="success" text="在线" />
</template>
```

### 手动按需引入

只引入需要的组件，减小打包体积：

```ts
import { Badge, Banner } from '@fireflymit/ui'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/style.css'
```

或通过路径引入单个组件：

```ts
import Badge from '@fireflymit/ui/es/components/Badge'
import Banner from '@fireflymit/ui/es/components/Banner'
import '@fireflymit/ui/style.css'
```

## 组件列表

| 组件          | 说明                                       |
| ------------- | ------------------------------------------ |
| `Badge`       | 状态徽章，带颜色圆点和文本标签             |
| `Banner`      | 横幅组件，支持标题、副标题、按钮和流星动画 |
| `CardBanner`  | 卡片式横幅，适合图文展示和操作按钮         |
| `ContextMenu` | 右键上下文菜单，支持嵌套子菜单             |
| `CountTo`     | 数字滚动动画组件                           |
| `DialogForm`  | 弹窗表单，内置提交状态、校验和重置流程     |
| `DragVerify`  | 拖拽验证滑块                               |
| `DrawerForm`  | 抽屉表单，适合编辑和详情类业务流程         |
| `ProForm`     | 高级表单生成器，支持多种字段类型           |
| `SearchBar`   | 搜索栏，支持展开/收起                      |
| `SvgIcon`     | Iconify SVG 图标组件                       |
| `TextScroll`  | 文字滚动公告组件                           |
| `Upload`      | 文件上传组件，支持拖拽、校验、进度和重试   |

## 样式

组件库样式需手动引入（路径与 Element Plus 一致）：

```ts
import 'element-plus/dist/index.css'
import '@fireflymit/ui/style.css'
```

## TypeScript

组件库自带完整类型声明，IDE 中可获得自动补全和类型检查。

## 开发

```bash
pnpm install          # 安装依赖
pnpm build:ui         # 构建
pnpm dev:play         # 启动 playground 预览
```

## 许可证

[MIT](LICENSE)
