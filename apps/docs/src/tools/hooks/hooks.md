---
title: Hooks
---

# Hooks

`@fireflymit/hooks` 提供了 Vue 3 组合式函数（Composables），可直接从 `@fireflymit/ui` 导入使用。

::: tip 安装与使用
Hooks 已包含在 `@fireflymit/ui` 中，详见 [Installation](/tools/Get%20Start/installation)。
:::

## useLockScroll

锁定 / 解锁页面滚动。当内容溢出时自动计算滚动条宽度，防止页面抖动。

- **参数**: `trigger: Ref<boolean>` — `true` 锁定滚动，`false` 解锁

```vue
<script setup>
import { useLockScroll } from '@fireflymit/ui'
import { ref } from 'vue'

const locked = ref(false)
useLockScroll(locked)
</script>

<template>
  <button @click="locked = !locked">
    {{ locked ? '解锁' : '锁定' }}滚动
  </button>
</template>
```

## useChildren

获取父组件下所有指定类型的子组件实例，用于父子组件通信。

- **参数**:
  - `vm: ComponentInternalInstance` — 当前组件实例
  - `childComponentName: string` — 子组件名称
- **返回值**: `{ children, addChild, removeChild }`

```vue
<script setup>
import { getCurrentInstance, useChildren } from '@fireflymit/ui'

const vm = getCurrentInstance()!
const { children, addChild, removeChild } = useChildren(vm, 'FormItem')
</script>
```

## useCompRef

获取组件实例类型的响应式引用，用于类型安全的组件 ref。

- **参数**: `_comp: T` — 组件（仅用于类型推断）
- **返回值**: `Ref<InstanceType<T> | undefined>`

```vue
<script setup>
import { useCompRef } from '@fireflymit/ui'
import BasicInfo from './BasicInfo.vue'

const basicInfoRef = useCompRef(BasicInfo)
// basicInfoRef.value 类型为 InstanceType<typeof BasicInfo> | undefined
</script>

<template>
  <BasicInfo ref="basicInfoRef" />
</template>
```
