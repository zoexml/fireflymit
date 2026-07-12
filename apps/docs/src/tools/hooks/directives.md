---
title: directives
---

# Directives

`@fireflymit/ui` 内置了一系列 Vue 3 自定义指令，可直接在模板中使用。

::: tip 安装与使用
指令已包含在 `@fireflymit/ui` 中，详见 [Installation](/tools/Get%20Start/installation)。
:::

## v-copy

点击元素时将文本写入剪贴板。

- **绑定值**: `string` — 要复制的文本

```vue
<template>
  <button v-copy="'Hello World'">
    点击复制
  </button>
  <el-button v-copy="copyText" type="primary">
    复制输入内容
  </el-button>
</template>
```

## v-longpress

长按元素指定时长后触发回调。

- **绑定值**: `() => void` — 回调函数
- **参数**: `duration` — 长按时长（ms），默认 `3000`

```vue
<template>
  <!-- 默认 3000ms -->
  <button v-longpress="onLongpress">
    长按 3 秒
  </button>

  <!-- 自定义 1000ms -->
  <button v-longpress:[1000]="onLongpress">
    长按 1 秒
  </button>
</template>
```

## v-debounce

防抖点击，快速多次点击仅触发最后一次。

- **绑定值**: `{ callback: () => void, time?: number }` — 回调 + 延迟（默认 300ms）

```vue
<template>
  <button v-debounce="{ callback: onSubmit, time: 1000 }">
    防抖提交 (1000ms)
  </button>
</template>
```

## v-throttle

节流点击，指定间隔内仅触发一次。

- **绑定值**: `{ callback: () => void, time?: number }` — 回调 + 间隔（默认 300ms）

```vue
<template>
  <button v-throttle="{ callback: onRefresh, time: 1000 }">
    节流刷新 (1000ms)
  </button>
</template>
```

## v-click-outside

点击元素外部时触发回调。适用于下拉菜单、弹窗等场景。

- **绑定值**: `() => void` — 点击外部时的回调

```vue
<script setup>
const showPanel = ref(false)
</script>

<template>
  <button @click="showPanel = !showPanel">
    切换面板
  </button>
  <div
    v-if="showPanel"
    v-click-outside="() => (showPanel = false)"
    class="panel"
  >
    点击外部关闭
  </div>
</template>
```

## v-emoji

禁止输入 Emoji 表情和特殊字符。适用于原生 `<input>` 和 `<textarea>`。

- **绑定值**: 无

```vue
<template>
  <input v-emoji placeholder="不能输入 emoji">
  <textarea v-emoji placeholder="过滤特殊字符" />
</template>
```

## v-input

限制输入内容类型。适用于原生 `<input>` 和 `<textarea>`。

- **参数**: `number` | `decimal` | `decimal_2` | `customize` — 限制类型
- **绑定值**: `RegExp`（仅 `customize` 类型需要）

```vue
<template>
  <!-- 仅允许整数 -->
  <input v-input:number placeholder="整数">

  <!-- 允许小数 -->
  <input v-input:decimal placeholder="小数">

  <!-- 保留两位小数 -->
  <input v-input:decimal_2 placeholder="两位小数">

  <!-- 自定义正则：仅允许数字 -->
  <input v-input:customize="/[^\d]/" placeholder="仅数字">
</template>
```

## v-ripple

点击时产生 Material Design 风格的波纹扩散动画。

- **绑定值**: `string` — 波纹颜色（可选，默认 `rgba(0,0,0,0.1)`）
- **禁用**: 传入 `false`

```vue
<template>
  <!-- 默认颜色 -->
  <button v-ripple>
    点击有波纹
  </button>

  <!-- 自定义颜色 -->
  <div v-ripple="'rgba(255,255,255,0.3)'" class="rounded-lg bg-blue-500 p-4">
    自定义波纹
  </div>

  <!-- 禁用波纹 -->
  <button v-ripple="false">
    无波纹
  </button>
</template>
```

## v-lazy-load

图片懒加载，元素进入可视区域时自动加载。支持 IntersectionObserver（优先）和 scroll 两种策略。

- **绑定值**:
  - `string` — 图片地址
  - `{ src: string, loading?: string, error?: string, callback?: (el: HTMLImageElement) => void }` — 图片地址、加载占位、失败占位和加载完成回调

```vue
<template>
  <img
    v-lazy-load="{
      src: 'https://example.com/image.jpg',
      loading: '/images/loading.svg',
      error: '/images/error.svg',
      callback: (el) => console.log('已加载:', el.src),
    }"
    alt="懒加载图片"
  >
</template>
```
