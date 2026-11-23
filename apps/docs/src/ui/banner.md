---
title: Banner 横幅
---

# Banner 横幅

带标题、副标题、按钮与装饰效果的横幅，常用于页面顶部宣传位。

## 基础用法

通过 `box-style` 追加自定义 class 设置背景。

<Demo name="banner/basic" title="标题 + 副标题 + 按钮" />

## 插槽与事件

`title`、`subtitle`、`button` 均可被插槽替换；点击横幅触发 `click`，点击按钮触发 `buttonClick`。

<Demo name="banner/slots-events" title="自定义插槽与点击事件" />

## Props

| 属性            | 类型                 | 默认值                                                                          | 说明                                       |
| --------------- | -------------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| `height`        | `string`             | `'11rem'`                                                                       | 横幅高度                                   |
| `title`         | `string`             | `''`                                                                            | 标题文本                                   |
| `subtitle`      | `string`             | `''`                                                                            | 副标题文本                                 |
| `boxStyle`      | `string`             | `''`                                                                            | 追加到根节点的自定义 class                 |
| `decoration`    | `boolean`            | `true`                                                                          | 是否显示右侧装饰图形                       |
| `buttonConfig`  | `BannerButtonConfig` | `{ show: true, text: '查看', color: '#fff', textColor: '#333', radius: '6px' }` | 按钮配置                                   |
| `meteorConfig`  | `BannerMeteorConfig` | `{ enabled: false, count: 10 }`                                                 | 流星效果配置，仅在 `dark` 为 `true` 时渲染 |
| `imageConfig`   | `BannerImageConfig`  | `{ src: '', width: '12rem', bottom: '-3rem', right: '0' }`                      | 右下角背景图配置                           |
| `titleColor`    | `string`             | `'white'`                                                                       | 标题颜色                                   |
| `subtitleColor` | `string`             | `'white'`                                                                       | 副标题颜色                                 |
| `dark`          | `boolean`            | `false`                                                                         | 暗黑模式（影响流星效果渲染）               |

### BannerButtonConfig

| 字段        | 类型      | 说明         |
| ----------- | --------- | ------------ |
| `show`      | `boolean` | 是否显示按钮 |
| `text`      | `string`  | 按钮文本     |
| `color`     | `string`  | 按钮背景色   |
| `textColor` | `string`  | 按钮文字颜色 |
| `radius`    | `string`  | 按钮圆角     |

### BannerMeteorConfig

| 字段      | 类型      | 说明             |
| --------- | --------- | ---------------- |
| `enabled` | `boolean` | 是否启用流星效果 |
| `count`   | `number`  | 流星数量         |

### BannerImageConfig

| 字段     | 类型     | 说明       |
| -------- | -------- | ---------- |
| `src`    | `string` | 图片地址   |
| `width`  | `string` | 图片宽度   |
| `bottom` | `string` | 距底部距离 |
| `right`  | `string` | 距右侧距离 |

## Events

| 事件          | 参数 | 说明                                               |
| ------------- | ---- | -------------------------------------------------- |
| `click`       | —    | 点击横幅时触发                                     |
| `buttonClick` | —    | 点击按钮时触发（已阻止冒泡，不会同时触发 `click`） |

## Slots

| 插槽       | 作用域 | 说明                 |
| ---------- | ------ | -------------------- |
| `title`    | —      | 替换标题区域         |
| `subtitle` | —      | 替换副标题区域       |
| `button`   | —      | 替换按钮区域         |
| `default`  | —      | 追加在按钮之后的内容 |

> 类型定义：`packages/ui/src/components/Banner/Banner.types.ts`（`bannerProps`）
