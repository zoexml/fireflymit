---
title: ContextMenu 右键菜单
---

# ContextMenu 右键菜单

由外部右键事件驱动的自定义菜单，支持子菜单、分隔线、禁用项与视口边界自动修正。

## 基础用法

通过模板 ref 调用 `show(event)` 打开菜单，`select` 拿到被点击的菜单项。

<Demo name="context-menu/basic" title="右键打开菜单" description="需要在浏览器中右键点击演示区域；菜单定位依赖 window 尺寸。" />

## Props

| 属性                | 类型             | 默认值    | 说明                       |
| ------------------- | ---------------- | --------- | -------------------------- |
| `menuItems`         | `MenuItemType[]` | —（必填） | 菜单配置                   |
| `menuWidth`         | `number`         | `120`     | 主菜单宽度（px）           |
| `submenuWidth`      | `number`         | `150`     | 子菜单最小宽度（px）       |
| `itemHeight`        | `number`         | `32`      | 菜单项高度（px）           |
| `boundaryDistance`  | `number`         | `10`      | 与视口边缘的最小距离（px） |
| `menuPadding`       | `number`         | `5`       | 菜单内边距（px）           |
| `itemPaddingX`      | `number`         | `6`       | 菜单项水平内边距（px）     |
| `borderRadius`      | `number`         | `6`       | 菜单圆角（px）             |
| `animationDuration` | `number`         | `100`     | 展开 / 收起动画时长（ms）  |

### MenuItemType

| 字段       | 类型             | 说明                                         |
| ---------- | ---------------- | -------------------------------------------- |
| `key`      | `string`         | 菜单项唯一标识                               |
| `label`    | `string`         | 菜单项文本                                   |
| `icon`     | `string`         | Iconify 图标名（默认图标插槽下渲染为占位块） |
| `disabled` | `boolean`        | 是否禁用                                     |
| `showLine` | `boolean`        | 是否在下方显示分隔线                         |
| `children` | `MenuItemType[]` | 子菜单项                                     |
| 其他       | `any`            | 其余字段原样透出到 `select` 事件             |

## Events

| 事件     | 参数                   | 说明                 |
| -------- | ---------------------- | -------------------- |
| `select` | `(item: MenuItemType)` | 点击可用菜单项时触发 |
| `show`   | —                      | 菜单显示时触发       |
| `hide`   | —                      | 菜单隐藏时触发       |

## Slots

| 插槽   | 作用域     | 说明               |
| ------ | ---------- | ------------------ |
| `icon` | `{ item }` | 替换菜单项图标区域 |

## 实例方法

| 方法 / 属性               | 说明                                     |
| ------------------------- | ---------------------------------------- |
| `show(event: MouseEvent)` | 在鼠标位置打开菜单（内部会阻止默认菜单） |
| `hide()`                  | 关闭菜单                                 |
| `visible`                 | 当前是否可见                             |

> 类型定义：`packages/ui/src/components/ContextMenu/ContextMenu.types.ts`（`contextMenuProps` / `MenuItemType`）。
