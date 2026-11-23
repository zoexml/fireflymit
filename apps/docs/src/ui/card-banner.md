---
title: CardBanner 卡片横幅
---

# CardBanner 卡片横幅

居中的卡片式横幅：图片 + 标题 + 描述 + 主/次按钮，适合空状态或引导位。

## 基础用法

`title`、`description` 为必填，按钮通过 `button` 与 `cancelButton` 配置。

<Demo name="card-banner/basic" title="图片 + 描述 + 双按钮" />

## Props

| 属性           | 类型                     | 默认值                                                                                           | 说明                         |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------- |
| `height`       | `string`                 | `'24rem'`                                                                                        | 卡片高度                     |
| `image`        | `string`                 | `''`                                                                                             | 图片地址，为空时不渲染图片区 |
| `title`        | `string`                 | —（必填）                                                                                        | 标题文本                     |
| `description`  | `string`                 | —（必填）                                                                                        | 描述文本                     |
| `button`       | `CardBannerButtonConfig` | `{ show: true, text: '查看详情', color: 'var(--el-color-primary, #409eff)', textColor: '#fff' }` | 主按钮配置                   |
| `cancelButton` | `CardBannerButtonConfig` | `{ show: false, text: '取消', color: '#f5f5f5', textColor: '#666' }`                             | 取消按钮配置                 |

### CardBannerButtonConfig

| 字段        | 类型      | 说明         |
| ----------- | --------- | ------------ |
| `show`      | `boolean` | 是否显示按钮 |
| `text`      | `string`  | 按钮文本     |
| `color`     | `string`  | 按钮背景色   |
| `textColor` | `string`  | 按钮文字颜色 |

## Events

| 事件     | 参数 | 说明               |
| -------- | ---- | ------------------ |
| `click`  | —    | 点击主按钮时触发   |
| `cancel` | —    | 点击取消按钮时触发 |

CardBanner 不提供插槽。

> 类型定义：`packages/ui/src/components/CardBanner/CardBanner.types.ts`（`cardBannerProps`）
