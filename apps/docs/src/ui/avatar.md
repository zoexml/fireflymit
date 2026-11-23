---
title: Avatar 头像
---

# Avatar 头像

用户头像：优先展示图片，无图片时按 `name` 生成首字母/首字占位块，并按名字哈希生成背景色。

## 基础用法

<Demo name="avatar/basic" title="文字头像与图片头像" description="图片头像通过 src 传入；其余按 name 生成占位内容。" />

## 形状与尺寸

`size` 同时控制宽高，`shape` 控制圆角，`backgroundColor` 可覆盖随机底色。

<Demo name="avatar/shape-size" title="shape / size / backgroundColor" />

## Props

| 属性              | 类型                   | 默认值     | 说明                                     |
| ----------------- | ---------------------- | ---------- | ---------------------------------------- |
| `src`             | `string`               | `''`       | 图片地址，传入后展示图片                 |
| `name`            | `string`               | `''`       | 用户名，用于生成首字母/首字与占位底色    |
| `size`            | `number`               | `40`       | 尺寸（px），同时作用于宽高与占位文字大小 |
| `backgroundColor` | `string`               | `''`       | 占位符背景色，为空时按 `name` 哈希生成   |
| `shape`           | `'square' \| 'circle'` | `'square'` | 形状，圆形时圆角为 `50%`                 |

Avatar 为纯展示组件，不派发事件、不提供插槽。

> 类型定义：`packages/ui/src/components/Avatar/Avatar.types.ts`（`avatarProps`）
