---
title: TextScroll 文字滚动
---

# TextScroll 文字滚动

横向 / 纵向循环滚动的通知条，支持悬停暂停、主题色、关闭按钮与自定义插槽。

## 基础用法

`text` 传入纯文本，`show-close` 显示关闭按钮并派发 `close`。

<Demo name="text-scroll/basic" title="文字滚动 + 关闭" description="滚动动画在浏览器中运行，静态快照只能看到初始状态。" />

## 方向与自定义图标

`direction` 支持 `left` / `right` / `up` / `down`，`icon` 插槽可替换左侧图标。

<Demo name="text-scroll/direction" title="向右 / 向上滚动" />

## Props

| 属性           | 类型                                                                                             | 默认值    | 说明                                   |
| -------------- | ------------------------------------------------------------------------------------------------ | --------- | -------------------------------------- |
| `text`         | `string`                                                                                         | `''`      | 滚动文本（纯文本，富文本请用默认插槽） |
| `type`         | `'theme' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'theme'` | 主题色                                 |
| `direction`    | `'left' \| 'right' \| 'up' \| 'down'`                                                            | `'left'`  | 滚动方向                               |
| `speed`        | `number`                                                                                         | `80`      | 滚动速度（像素/秒）                    |
| `width`        | `string`                                                                                         | `'100%'`  | 容器宽度                               |
| `height`       | `string`                                                                                         | `'36px'`  | 容器高度                               |
| `pauseOnHover` | `boolean`                                                                                        | `true`    | 鼠标悬停时暂停                         |
| `showClose`    | `boolean`                                                                                        | `false`   | 是否显示关闭按钮                       |
| `alwaysScroll` | `boolean`                                                                                        | `true`    | 文本未溢出时也保持滚动                 |

## Events

| 事件    | 参数 | 说明                                                 |
| ------- | ---- | ---------------------------------------------------- |
| `close` | —    | 点击关闭按钮时触发（组件不会自行隐藏，需要父级控制） |

## Slots

| 插槽         | 作用域 | 说明                       |
| ------------ | ------ | -------------------------- |
| `default`    | —      | 替换滚动内容，支持富文本   |
| `icon`       | —      | 替换左侧图标（默认 📢）    |
| `close-icon` | —      | 替换右侧关闭图标（默认 ×） |

> 类型定义：`packages/ui/src/components/TextScroll/TextScroll.types.ts`（`textScrollProps`）
