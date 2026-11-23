---
title: SvgIcon 图标
---

# SvgIcon 图标

基于 [Iconify](https://iconify.design/) 的图标组件，通过 `icon` 传入图标名（如 `ep:search`、`ri:home-4-line`）。

## 基础用法

图标默认 `width/height: 1em`，跟随父级 `font-size` 与 `color` 缩放、着色。

<Demo name="svg-icon/basic" title="常用图标与尺寸/颜色" description="图标数据由 Iconify 在浏览器中按需加载，首次渲染可能是空占位，需要网络可访问 iconify API。" />

::: tip 图标数据来源
`SvgIcon` 只负责渲染，图标内容由 `@iconify/vue` 运行时拉取。离线环境或内网部署时，需要自行 `addCollection` 或配置 Iconify 离线数据，否则图标不可见（组件本身不报错）。
:::

## Props

| 属性   | 类型     | 默认值 | 说明                             |
| ------ | -------- | ------ | -------------------------------- |
| `icon` | `string` | —      | Iconify 图标名；为空时不渲染图标 |

## 透传属性

组件设置了 `inheritAttrs: false`，仅 `class` 与 `style` 会转发到内部图标节点，其余属性不会透传。

SvgIcon 不派发事件、不提供插槽。

> 类型定义：`packages/ui/src/components/SvgIcon/SvgIcon.vue` 内的 `SvgIconProps`
