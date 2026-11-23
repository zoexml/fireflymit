---
title: DrawerForm 抽屉表单
---

# DrawerForm 抽屉表单

在 `ElDrawer` 中内置 `ProForm`，交互与 `DialogForm` 一致，区别是支持抽屉方向与宽度。

## 基础用法

`v-model` 控制显隐，`v-model:form` 绑定表单数据，`direction` / `size` 控制抽屉位置与尺寸。

<Demo name="drawer-form/basic" title="从右侧滑出的编辑表单" description="需要在浏览器中点击按钮打开抽屉。" />

## Props

| 属性             | 类型                                | 默认值    | 说明                                      |
| ---------------- | ----------------------------------- | --------- | ----------------------------------------- |
| `title`          | `string`                            | `''`      | 抽屉标题                                  |
| `direction`      | `'ltr' \| 'rtl' \| 'ttb' \| 'btt'`  | `'rtl'`   | 抽屉打开方向                              |
| `size`           | `string \| number`                  | `'480px'` | 抽屉尺寸                                  |
| `items`          | `FormItem[]`                        | `[]`      | 表单字段配置，字段结构同 ProForm          |
| `span`           | `number`                            | `24`      | 每列宽度（基于 24 栅格）                  |
| `gutter`         | `number`                            | `12`      | 栅格间距                                  |
| `labelPosition`  | `'left' \| 'right' \| 'top'`        | `'right'` | 标签位置                                  |
| `labelWidth`     | `string \| number`                  | `'70px'`  | 标签宽度                                  |
| `formAttrs`      | `Record<string, any>`               | `{}`      | 透传给内部 ProForm 的属性                 |
| `submit`         | `(values) => Promise<void> \| void` | —         | 提交处理函数，返回 Promise 时自动 loading |
| `closeOnSuccess` | `boolean`                           | `true`    | 提交成功后是否关闭抽屉                    |
| `destroyOnClose` | `boolean`                           | `false`   | 关闭时是否销毁内容                        |
| `resetOnClosed`  | `boolean`                           | `true`    | 关闭后是否重置表单                        |
| `disabledSubmit` | `boolean`                           | `false`   | 是否禁用提交按钮                          |
| `sanitizeOutput` | `Partial<SanitizeOutputOptions>`    | `{}`      | 提交前的空值清洗规则                      |
| `showFooter`     | `boolean`                           | `true`    | 是否显示底部按钮区                        |
| `showCancel`     | `boolean`                           | `true`    | 是否显示取消按钮                          |
| `showReset`      | `boolean`                           | `true`    | 是否显示重置按钮                          |
| `showSubmit`     | `boolean`                           | `true`    | 是否显示提交按钮                          |
| `cancelText`     | `string`                            | `'取消'`  | 取消按钮文本                              |
| `resetText`      | `string`                            | `'重置'`  | 重置按钮文本                              |
| `submitText`     | `string`                            | `'确定'`  | 提交按钮文本                              |

### v-model

| 模型              | 类型                  | 默认值  | 说明              |
| ----------------- | --------------------- | ------- | ----------------- |
| `v-model`         | `boolean`             | `false` | 抽屉显隐          |
| `v-model:form`    | `Record<string, any>` | `{}`    | 表单数据          |
| `v-model:loading` | `boolean`             | `false` | 提交 loading 状态 |

## Events

| 事件            | 参数                            | 说明                               |
| --------------- | ------------------------------- | ---------------------------------- |
| `submit`        | `(values: Record<string, any>)` | 校验通过并点击提交时触发           |
| `success`       | `(values: Record<string, any>)` | `submit` 返回的 Promise 成功后触发 |
| `validateError` | `(error: unknown)`              | 表单校验抛错时触发                 |
| `cancel`        | —                               | 点击取消按钮时触发                 |
| `reset`         | —                               | 点击重置按钮时触发                 |
| `open`          | —                               | 抽屉打开时触发                     |
| `opened`        | —                               | 打开动画结束时触发                 |
| `close`         | —                               | 抽屉关闭时触发                     |
| `closed`        | —                               | 关闭动画结束时触发                 |

## Slots

| 插槽         | 作用域                                     | 说明                          |
| ------------ | ------------------------------------------ | ----------------------------- |
| `form`       | `{ form, formRef }`                        | 替换默认的 ProForm 区域       |
| `footer`     | `{ cancel, form, loading, reset, submit }` | 替换底部按钮区                |
| `[item.key]` | 同 ProForm                                 | 透传到内部 ProForm 的字段插槽 |

## 实例方法

| 方法          | 说明                   |
| ------------- | ---------------------- |
| `validate()`  | 校验表单，返回是否通过 |
| `reset()`     | 重置表单               |
| `submit()`    | 手动触发提交           |
| `getOutput()` | 获取清洗后的表单数据   |
| `ref`         | 内部 ProForm 实例      |

> 类型定义：`packages/ui/src/components/DrawerForm/DrawerForm.types.ts`（`drawerFormProps` / `DrawerFormEmits`）。
