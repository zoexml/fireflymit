# 自动生成路由

基于文件系统的自动路由生成方案，无需手动维护路由表。

## 技术方案

使用 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 实现 Nuxt 风格的文件路由，配合 [vite-plugin-vue-meta-layouts](https://github.com/nicola-lobello/vite-plugin-vue-meta-layouts) 管理布局。

## 安装

```bash
pnpm add -D unplugin-vue-router vite-plugin-vue-meta-layouts
pnpm add vue-router
```

## 配置

### 1. Vite 插件 (`vite.config.ts`)

```ts
import VueRouter from 'unplugin-vue-router/vite'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'

export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/views', // 页面目录
      dts: './src/types/typed-router.d.ts', // 路由类型声明
      exclude: ['**/components/**/*.vue'], // 排除组件目录
      extensions: ['.vue'], // 仅扫描 .vue 文件
    }),
    MetaLayouts(),
    // ...
  ],
})
```

### 2. 路由入口 (`src/router/index.ts`)

```ts
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
  strict: true,
})

export default router
```

### 3. 主入口 (`src/main.ts`)

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

### 4. 布局目录 (`src/layouts/`)

```vue
<!-- src/layouts/default.vue -->
<template>
  <div class="layout">
    <aside><!-- 侧边栏 --></aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>
```

## 文件路由约定

目录结构直接映射为 URL 路径：

| 文件                           | 路由             | 路由名称          |
| ------------------------------ | ---------------- | ----------------- |
| `src/views/index.vue`          | `/`              | `home`            |
| `src/views/login/index.vue`    | `/login`         | `/login/`         |
| `src/views/user/[id].vue`      | `/user/:id`      | `/user/[id]`      |
| `src/views/user/[id]/edit.vue` | `/user/:id/edit` | `/user/[id]/edit` |
| `src/views/[...all].vue`       | `/:all(.*)`      | `/[...all]`       |

### 命名规则

- **`[param]`** — 方括号生成动态路由参数，`[id]` → `:id`
- **`index.vue`** — 目录的默认页面
- **`[...all].vue`** — 通配符捕获所有未匹配路径（404）

## 路由元信息

在 `.vue` 文件中通过 `<route>` 自定义块扩展路由配置：

```vue
<route lang="json">
{
  "name": "dashboard",
  "meta": {
    "layout": "admin",
    "requiresAuth": true
  }
}
</route>

<template>
  <div>Dashboard</div>
</template>
```

## 布局切换

创建多个布局文件 (`src/layouts/`) 后，在页面的 `<route>` 块中指定：

```vue
<route lang="json">
{
  "meta": {
    "layout": "other"
  }
}
</route>
```

不指定时默认使用 `default.vue`。

## 类型安全的路由跳转

```ts
// 自动生成的类型声明，提供路由名称和参数的类型检查
import { useRouter } from 'vue-router/auto'

const router = useRouter()

// 类型安全 — 路由名称和参数均有智能提示
router.push({ name: '/user/[id]', params: { id: '123' } })
router.push({ name: '/user/[id]/edit', params: { id: '123' } })
```

## 自动导入

配合 `unplugin-auto-import`，自动导入 `useRoute`、`useRouter` 等：

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

AutoImport({
  imports: [
    VueRouterAutoImports,
  ],
})
```

## 优势

- **零手动路由** — 新增页面文件即自动注册路由
- **类型安全** — 路由名称、参数均有 TS 类型检查
- **布局解耦** — 页面不感知布局，布局可动态切换
- **与 Vite 深度集成** — HMR 热更新路由变更
