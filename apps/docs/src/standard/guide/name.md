---
title: 命名规范
---

# Vue 3 项目文件夹和文件命名最佳实践

在开发 Vue 3 项目时，良好的文件夹和文件命名规范对于项目的可维护性、可读性和团队协作至关重要。合理的命名不仅能够帮助开发者快速定位代码，还能减少冲突和误解。本文详细介绍 Vue 3 项目中文件夹和文件命名的最佳实践，并通过实际案例进行说明。

> 文章来源：[掘金 - Vue 3 项目文件夹和文件命名最佳实践](https://juejin.cn/post/7509795712286048296)

## 一、文件夹命名规范

### 1. 根目录

项目的根目录通常使用 **kebab-case**（短横线连接），这样可以保持一致性，同时避免与系统保留的单词冲突。例如：

```
my-vue3-project
```

### 2. 源代码目录 (`src`)

源代码目录是项目的核心部分，合理的文件夹结构和命名可以显著提升项目的可维护性。

#### 2.1 `assets`

存放全局静态资源（如图片、字体等）。建议使用 **kebab-case**，例如：

```
src/assets/logo.png
src/assets/icon-fonts/
```

#### 2.2 `components`

存放可复用的组件。建议使用 **PascalCase**（首字母大写驼峰），这样可以与 HTML 元素区分开来，避免冲突。例如：

```
src/components/BaseButton.vue
src/components/UserCard.vue
```

#### 2.3 `views`

存放页面级组件（对应路由）。建议使用 **kebab-case**，与路由路径保持一致。例如：

```
src/views/user-profile.vue
src/views/order-list.vue
```

#### 2.4 `router`

存放路由配置文件。建议使用 **kebab-case**，例如：

```
src/router/index.js
src/router/user-routes.js
```

#### 2.5 `stores`

存放状态管理模块（如 Pinia）。建议使用 **PascalCase**，例如：

```
src/stores/UserStore.ts
src/stores/CartStore.ts
```

#### 2.6 `utils`

存放工具函数库。建议使用 **camelCase**，例如：

```
src/utils/date-format.ts
src/utils/api-helpers.js
```

#### 2.7 `services`

存放 API 服务层。建议使用 **PascalCase**，例如：

```
src/services/UserService.ts
src/services/ProductApi.ts
```

## 二、文件命名规范

### 1. 组件文件

组件文件建议使用 **PascalCase**，这样可以与 HTML 元素区分开来，避免冲突。例如：

```
UserProfile.vue
BaseButton.vue
```

### 2. 路由文件

路由配置文件建议使用 **kebab-case**，例如：

```
index.js
user-routes.js
```

路由组件文件与路由路径一致，采用 **kebab-case**，例如：

```
user-profile.vue
order-list.vue
```

### 3. 状态管理文件

状态管理模块（如 Pinia）文件建议使用 **PascalCase**，例如：

```
UserStore.ts
CartStore.ts
```

导出名以 `use` 开头并以 `Store` 结尾，例如：

```typescript
export const useUserStore = defineStore('user', { /* ... */ })
```

### 4. 工具函数文件

工具函数文件建议使用 **camelCase**，例如：

```
dateFormat.ts
apiHelpers.js
```

### 5. 自定义 Hooks 文件

自定义 Hooks 文件建议使用 **camelCase**（以 `use` 开头），例如：

```
useFetchData.ts
```

### 6. 测试文件

测试文件建议使用 **kebab-case** + `.spec` 后缀，例如：

```
user-profile.spec.js
order-list.spec.ts
```

### 7. 静态资源图片

静态资源图片建议使用小写字母 + 短横线，例如：

```
header-logo.png
icon-arrow.svg
```

## 三、命名冲突规避

### 1. 全局唯一性

确保组件名、路由名、Store ID 在整个项目中唯一。例如，不要在不同模块中使用相同的组件名或 Store ID。

### 2. 语义隔离

页面级组件放在 `views/`，可复用组件放在 `components/`。通用工具函数放在 `src/utils/`，业务相关工具放在模块目录下。这样可以避免命名冲突，同时保持代码的清晰和可维护性。

## 四、工具链推荐

### 1. ESLint 规则

配置 ESLint 规则 `vue/component-name-in-template-casing`，强制模板中的组件名使用 PascalCase。例如：

```javascript
module.exports = {
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase']
  }
}
```

### 2. VS Code 插件

使用 `Volar` 插件，它能够自动提示组件名与路径，帮助开发者快速定位和使用组件。

## 五、实际案例

假设我们正在开发一个电商项目，以下是项目目录结构和文件命名的示例：

### 项目目录结构

```
my-vue3-project/
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   └── icons/
│   ├── components/
│   │   ├── BaseButton.vue
│   │   ├── UserCard.vue
│   │   └── ProductList.vue
│   ├── views/
│   │   ├── home.vue
│   │   ├── user-profile.vue
│   │   └── product-detail.vue
│   ├── router/
│   │   ├── index.js
│   │   └── user-routes.js
│   ├── stores/
│   │   ├── UserStore.ts
│   │   └── CartStore.ts
│   ├── utils/
│   │   ├── date-format.ts
│   │   └── api-helpers.js
│   ├── services/
│   │   ├── UserService.ts
│   │   └── ProductService.ts
│   └── App.vue
├── tests/
│   ├── unit/
│   │   ├── user-profile.spec.js
│   │   └── product-detail.spec.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 文件命名示例

#### 组件文件

```vue
<!-- src/components/UserCard.vue -->
<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com'
})
</script>

<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
```

#### 路由文件

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import UserProfile from '../views/user-profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/user', component: UserProfile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### 状态管理文件

```typescript
// src/stores/UserStore.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'John Doe',
    email: 'john.doe@example.com'
  })
})
```

#### 工具函数文件

```typescript
// src/utils/date-format.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date)
}
```

#### 测试文件

```javascript
// tests/unit/user-profile.spec.js
import { mount } from '@vue/test-utils'
import UserProfile from '@/views/user-profile.vue'

describe('UserProfile', () => {
  it('renders user name', () => {
    const wrapper = mount(UserProfile)
    expect(wrapper.find('h2').text()).toBe('John Doe')
  })
})
```

## 六、总结

通过遵循上述文件夹和文件命名规范，可以显著提升 Vue 3 项目的可维护性、可读性和团队协作效率。合理的命名不仅能够帮助开发者快速定位代码，还能减少冲突和误解。同时，结合 ESLint 规则和 VS Code 插件等工具链，可以进一步提升开发体验和代码质量。
