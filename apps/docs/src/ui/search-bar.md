---
title: SearchBar 搜索栏
---

# SearchBar 搜索栏

表格查询条件表单。按 `items` 配置渲染表单项，默认每行最多显示 3 项，超出后折叠为「展开 / 收起」。

## 基础用法

通过 `v-model` 绑定查询条件，`@search` 拿到清洗后的参数，`@reset` 在重置时触发。

<Demo name="search-bar/basic" title="基础查询表单" description="共 6 个表单项，默认折叠，点击「展开」查看全部。" />

## 自定义表单项

每个表单项都有一个以 `item.key` 命名的插槽，作用域包含 `item` 与 `modelValue`，可用于接入 Element Plus 组件或业务组件。

<Demo name="search-bar/slot" title="通过插槽自定义表单项" description="dept 字段通过 #dept 插槽渲染为自定义下拉框。" />

## Props

| 属性              | 类型                             | 默认值    | 说明                                                 |
| ----------------- | -------------------------------- | --------- | ---------------------------------------------------- |
| `items`           | `SearchFormItem[]`               | `[]`      | 表单项配置数组                                       |
| `span`            | `number`                         | `6`       | 每列宽度（基于 24 栅格）                             |
| `gutter`          | `number`                         | `12`      | 栅格间距                                             |
| `isExpand`        | `boolean`                        | `false`   | 是否始终展开全部表单项（为 `true` 时不折叠）         |
| `defaultExpanded` | `boolean`                        | `false`   | 初始是否展开，仅在 `isExpand` 为 `false` 时生效      |
| `labelPosition`   | `'left' \| 'right' \| 'top'`     | `'right'` | 表单域标签的位置                                     |
| `labelWidth`      | `string \| number`               | `'70px'`  | 标签宽度                                             |
| `showExpand`      | `boolean`                        | `true`    | 是否显示展开 / 收起按钮                              |
| `buttonLeftLimit` | `number`                         | `2`       | 表单项数量小于等于该值时，操作按钮靠左对齐           |
| `showReset`       | `boolean`                        | `true`    | 是否显示重置按钮                                     |
| `showSearch`      | `boolean`                        | `true`    | 是否显示查询按钮                                     |
| `disabledSearch`  | `boolean`                        | `false`   | 是否禁用查询按钮                                     |
| `sanitizeOutput`  | `Partial<SanitizeOutputOptions>` | `{}`      | 查询前清洗空值的规则，见下方 `SanitizeOutputOptions` |
| `expandText`      | `string`                         | `'展开'`  | 展开按钮文本                                         |
| `collapseText`    | `string`                         | `'收起'`  | 收起按钮文本                                         |
| `resetText`       | `string`                         | `'重置'`  | 重置按钮文本                                         |
| `searchText`      | `string`                         | `'查询'`  | 查询按钮文本                                         |
| `v-model`         | `Record<string, any>`            | `{}`      | 查询条件对象，双向绑定                               |

### SearchFormItem

| 字段          | 类型                                       | 说明                                                                                        |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `key`         | `string`                                   | 唯一标识，同时作为插槽名                                                                    |
| `label`       | `string \| (() => VNode) \| Component`     | 标签文本或自定义渲染                                                                        |
| `labelWidth`  | `string \| number`                         | 单项标签宽度，覆盖 `labelWidth`                                                             |
| `type`        | `ComponentMapKey \| string`                | 内置控件类型，如 `input`、`select`、`number`、`switch`、`radiogroup`、`date`、`cascader` 等 |
| `render`      | `(() => VNode) \| Component`               | 自定义渲染，优先级高于 `type`                                                               |
| `hidden`      | `boolean`                                  | 是否隐藏该表单项                                                                            |
| `span`        | `number`                                   | 单项列宽，覆盖 `span`                                                                       |
| `options`     | `Record<string, any>`                      | `select` / `radiogroup` / `checkboxgroup` 的选项                                            |
| `props`       | `Record<string, any>`                      | 透传给控件组件的属性                                                                        |
| `slots`       | `Record<string, (() => any) \| undefined>` | 透传给控件组件的插槽                                                                        |
| `placeholder` | `string`                                   | 占位文本                                                                                    |

### SanitizeOutputOptions

| 字段                  | 类型      | 默认值 | 说明                                   |
| --------------------- | --------- | ------ | -------------------------------------- |
| `removeEmptyString`   | `boolean` | `true` | 移除空字符串                           |
| `removeEmptyArray`    | `boolean` | `true` | 移除空数组                             |
| `removeEmptyObject`   | `boolean` | `true` | 移除清洗后为空的对象                   |
| `removeEmptyRichText` | `boolean` | `true` | 移除空富文本占位内容，如 `<p><br></p>` |
| `keepZero`            | `boolean` | `true` | 保留数字 `0`                           |
| `keepFalse`           | `boolean` | `true` | 保留布尔值 `false`                     |

## Events

| 事件     | 参数                            | 说明                                               |
| -------- | ------------------------------- | -------------------------------------------------- |
| `search` | `(params: Record<string, any>)` | 点击查询按钮时触发，参数已按 `sanitizeOutput` 清洗 |
| `reset`  | —                               | 点击重置按钮时触发，表单与 `v-model` 同步清空      |

## Slots

| 插槽         | 作用域                                                      | 说明                                                      |
| ------------ | ----------------------------------------------------------- | --------------------------------------------------------- |
| `[item.key]` | `{ item: SearchFormItem, modelValue: Record<string, any> }` | 以表单项 `key` 命名的具名插槽，用于替换该表单项的默认渲染 |

## 实例方法

通过模板 ref 调用：

| 方法          | 说明                     |
| ------------- | ------------------------ |
| `validate()`  | 调用内部 `ElForm` 的校验 |
| `reset()`     | 重置表单与查询条件       |
| `getOutput()` | 获取清洗后的查询参数     |
| `ref`         | 内部 `ElForm` 实例       |

> 类型定义：`packages/ui/src/components/SearchBar/SearchBar.types.ts`（`SearchBarProps` / `SearchFormItem` / `SearchBarEmits`）。`SanitizeOutputOptions` 默认值来自 `packages/ui/src/_utils/form-helpers.ts`。
