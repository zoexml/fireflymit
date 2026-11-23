---
title: Badge 徽标
---

# Badge 徽标

圆点 + 文本的状态标识。

## 基础用法

`type` 支持 `primary`、`success`、`warning`、`info`、`error` 五种取值。

<Demo name="badge/basic" title="五种类型" />

## 自定义文本

`type` 控制圆点颜色，`text` 控制展示文本。

<Demo name="badge/custom-text" title="状态文案" />

## Props

| 属性   | 类型                                                       | 默认值      | 说明         |
| ------ | ---------------------------------------------------------- | ----------- | ------------ |
| `type` | `'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'primary'` | 圆点颜色类型 |
| `text` | `string`                                                   | `''`        | 徽标文本     |

Badge 为纯展示组件，不派发事件、不提供插槽。

> 类型定义：`packages/ui/src/components/Badge/Badge.types.ts`（`badgeProps`）
