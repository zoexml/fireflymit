---
title: DragVerify 滑动验证
---

# DragVerify 滑动验证

按住滑块向右拖到终点完成验证，支持鼠标与触摸事件、圆形样式与自定义文案。

## 基础用法

配合 `v-model` 使用，验证通过时 `modelValue` 变为 `true`。

<Demo name="drag-verify/basic" title="基础滑动验证" description="需要在浏览器中按住滑块拖动，静态快照只能看到初始状态。" />

## 自定义样式

`width`、`height`、`circle`、配色、图标与 `textBefore` 插槽均可定制。

<Demo name="drag-verify/custom-style" title="圆形滑块与自定义配色" />

## Props

| 属性            | 类型               | 默认值                                  | 说明                           |
| --------------- | ------------------ | --------------------------------------- | ------------------------------ |
| `modelValue`    | `boolean`          | `false`                                 | 是否已通过验证（`v-model`）    |
| `width`         | `number \| string` | `250`                                   | 轨道宽度，数字按 px 处理       |
| `height`        | `number`           | `40`                                    | 轨道高度（px）                 |
| `text`          | `string`           | `'请按住滑块拖动'`                      | 未验证时的提示文案             |
| `successText`   | `string`           | `'验证通过'`                            | 验证通过后的文案               |
| `background`    | `string`           | `'#eee'`                                | 轨道背景色                     |
| `progressBarBg` | `string`           | `'#1385FF'`                             | 进度条颜色                     |
| `completedBg`   | `string`           | `'#57D187'`                             | 完成态背景色（当前实现未使用） |
| `circle`        | `boolean`          | `false`                                 | 是否使用圆形样式               |
| `radius`        | `string`           | `'10px'`                                | 轨道圆角                       |
| `handlerIcon`   | `string`           | `'solar:double-alt-arrow-right-linear'` | 滑块图标（Iconify 名称）       |
| `successIcon`   | `string`           | `'ri:check-fill'`                       | 验证通过后的滑块图标           |
| `handlerBg`     | `string`           | `'#fff'`                                | 滑块背景色                     |
| `textSize`      | `string`           | `'14px'`                                | 文案字号                       |
| `textColor`     | `string`           | `'#333'`                                | 文案颜色                       |
| `border`        | `string`           | `'1px solid #ddd'`                      | 轨道边框                       |

## Events

| 事件                | 参数                | 说明                                      |
| ------------------- | ------------------- | ----------------------------------------- |
| `handlerMove`       | —                   | 按下滑块开始拖动时触发                    |
| `passFail`          | —                   | 拖动未到终点就松开时触发                  |
| `update:modelValue` | `(value: boolean)`  | 验证通过时派发 `true`，重置时派发 `false` |
| `passCallback`      | `(seconds: number)` | 验证通过时触发，参数为拖动耗时（秒）      |

## Slots

| 插槽         | 作用域 | 说明             |
| ------------ | ------ | ---------------- |
| `textBefore` | —      | 提示文案前置内容 |
| `textAfter`  | —      | 提示文案后置内容 |

## 实例方法

| 方法      | 说明                   |
| --------- | ---------------------- |
| `reset()` | 重置滑块位置与验证状态 |

::: tip 图标依赖
滑块图标通过 `SvgIcon` 渲染，图标数据由 Iconify 运行时加载；离线环境下图标可能不可见，但拖动与验证逻辑不受影响。
:::

> 类型定义：`packages/ui/src/components/DragVerify/DragVerify.types.ts`（`dragVerifyProps`）
