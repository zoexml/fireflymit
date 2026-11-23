---
title: ProForm 表单
---

# ProForm 表单

配置驱动的表单：通过 `items` 描述字段，内置栅格布局、查询 / 重置按钮与空值清洗。

## 基础用法

`v-model` 绑定表单数据，`@submit` 拿到清洗后的值。

<Demo name="pro-form/input-only" title="基础输入项" description="仅包含输入框的表单，可直接静态渲染。" />

## 完整表单

包含下拉、开关、数字、日期等控件。

<Demo name="pro-form/basic" title="常见字段类型" client-only description="包含 ElSelect：Element Plus 的下拉组件在 SSG 水合时会补充仅客户端才有的属性，因此示例仅在浏览器中渲染。" />

## 自定义表单项

每个表单项都有一个以 `item.key` 命名的插槽，作用域包含 `item` 与 `modelValue`。

<Demo name="pro-form/slot" title="通过插槽自定义字段" client-only description="dept 字段通过 #dept 插槽渲染为自定义下拉框；同样包含 ElSelect，仅在浏览器中渲染。" />

## Props

| 属性              | 类型                             | 默认值    | 说明                                       |
| ----------------- | -------------------------------- | --------- | ------------------------------------------ |
| `items`           | `FormItem[]`                     | `[]`      | 表单项配置数组                             |
| `span`            | `number`                         | `6`       | 每列宽度（基于 24 栅格）                   |
| `gutter`          | `number`                         | `12`      | 栅格间距                                   |
| `labelPosition`   | `'left' \| 'right' \| 'top'`     | `'right'` | 表单域标签的位置                           |
| `labelWidth`      | `string \| number`               | `'70px'`  | 标签宽度                                   |
| `buttonLeftLimit` | `number`                         | `2`       | 表单项数量小于等于该值时，操作按钮靠左对齐 |
| `showReset`       | `boolean`                        | `true`    | 是否显示重置按钮                           |
| `showSubmit`      | `boolean`                        | `true`    | 是否显示提交按钮                           |
| `disabledSubmit`  | `boolean`                        | `false`   | 是否禁用提交按钮                           |
| `sanitizeOutput`  | `Partial<SanitizeOutputOptions>` | `{}`      | 提交前清洗空值的规则                       |
| `resetText`       | `string`                         | `'重置'`  | 重置按钮文本                               |
| `submitText`      | `string`                         | `'提交'`  | 提交按钮文本                               |
| `v-model`         | `Record<string, any>`            | `{}`      | 表单数据，双向绑定                         |

### FormItem

| 字段          | 类型                                       | 说明                                                                                        |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `key`         | `string`                                   | 唯一标识，支持嵌套路径如 `a.b`，同时作为插槽名                                              |
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

`removeEmptyString`、`removeEmptyArray`、`removeEmptyObject`、`removeEmptyRichText`、`keepZero`、`keepFalse` 六项，默认均为 `true`，用于提交前剔除空值、保留 `0` 与 `false`。

## Events

| 事件     | 参数                            | 说明                                               |
| -------- | ------------------------------- | -------------------------------------------------- |
| `submit` | `(values: Record<string, any>)` | 点击提交按钮时触发，参数已按 `sanitizeOutput` 清洗 |
| `reset`  | —                               | 点击重置按钮时触发，表单与 `v-model` 同步清空      |

## Slots

| 插槽         | 作用域                                                | 说明                                                |
| ------------ | ----------------------------------------------------- | --------------------------------------------------- |
| `[item.key]` | `{ item: FormItem, modelValue: Record<string, any> }` | 以表单项 `key` 命名的具名插槽，替换该字段的默认渲染 |

## 实例方法

通过模板 ref 调用：

| 方法          | 说明                     |
| ------------- | ------------------------ |
| `validate()`  | 调用内部 `ElForm` 的校验 |
| `reset()`     | 重置表单与表单数据       |
| `getOutput()` | 获取清洗后的表单数据     |
| `ref`         | 内部 `ElForm` 实例       |

> 类型定义：`packages/ui/src/components/ProForm/ProForm.types.ts`（`formProps` / `FormItem`）；清洗默认值来自 `packages/ui/src/_utils/form-helpers.ts`。
