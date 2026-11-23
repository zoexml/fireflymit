---
title: CountTo 数字动画
---

# CountTo 数字动画

数字滚动动画，基于 `@vueuse/core` 的 `useTransition`，支持千分位、小数、前后缀与缓动函数。

## 基础用法

`target` 变化时自动开始动画，`started` / `finished` 可用于驱动周边状态。

<Demo name="count-to/basic" title="基础数字动画" description="需要在浏览器中查看滚动过程。" />

## 格式化

`separator` 千分位、`decimal` 小数点、`decimals` 小数位、`prefix` / `suffix` 前后缀、`easing` 缓动。

<Demo name="count-to/format" title="金额、百分比与禁用动画" />

## Props

| 属性        | 类型                             | 默认值          | 说明                                            |
| ----------- | -------------------------------- | --------------- | ----------------------------------------------- |
| `target`    | `number`                         | `0`             | 目标数值                                        |
| `duration`  | `number`                         | `2000`          | 动画时长（ms），会被限制在 100–60000 之间       |
| `autoStart` | `boolean`                        | `true`          | `target` 变化时是否自动开始                     |
| `decimals`  | `number`                         | `0`             | 小数位数，会被限制在 0–10 之间                  |
| `decimal`   | `string`                         | `'.'`           | 小数点符号                                      |
| `separator` | `string`                         | `''`            | 千分位分隔符                                    |
| `prefix`    | `string`                         | `''`            | 前缀文本                                        |
| `suffix`    | `string`                         | `''`            | 后缀文本                                        |
| `easing`    | `keyof typeof TransitionPresets` | `'easeOutExpo'` | 缓动函数名（VueUse `TransitionPresets` 的 key） |
| `disabled`  | `boolean`                        | `false`         | 禁用动画，直接显示目标值                        |

## Events

| 事件       | 参数              | 说明                           |
| ---------- | ----------------- | ------------------------------ |
| `started`  | `(value: number)` | 动画开始时触发，参数为目标值   |
| `finished` | `(value: number)` | 动画结束时触发，参数为目标值   |
| `paused`   | `(value: number)` | 暂停或停止时触发，参数为当前值 |
| `reset`    | —                 | 调用 `reset()` 时触发          |

## 实例方法

通过模板 ref 调用：

| 方法 / 属性                    | 说明                                            |
| ------------------------------ | ----------------------------------------------- |
| `start(target?)`               | 开始动画，可临时指定目标值                      |
| `pause()`                      | 暂停在当前值                                    |
| `reset(newTarget?)`            | 重置到指定值（默认 0）并触发 `reset`            |
| `stop()`                       | 停止并归零                                      |
| `setTarget(target)`            | 设置目标值，按 `autoStart` 规则决定是否立即开始 |
| `isRunning` / `isPaused`       | 当前运行 / 暂停状态                             |
| `currentValue` / `targetValue` | 当前值 / 目标值                                 |
| `progress`                     | 当前进度（0–1）                                 |

> 类型定义：`packages/ui/src/components/CountTo/CountTo.types.ts`（`countToProps`）
