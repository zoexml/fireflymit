---
title: ProTable 表格
---

# ProTable 表格

配置驱动的表格：在 `ElTable` 基础上增加工具栏、列设置、密度切换、分页与列状态持久化。

## 基础用法

`columns` 描述列，`data` 提供行数据；`formatter` / `render` 负责单元格内容。

<Demo name="pro-table/basic" title="基础表格" />

## 工具栏与分页

`header-title` 开启标题区，`options` 开启刷新 / 密度 / 列设置，`pagination` 开启分页（默认前端分页）。

<Demo name="pro-table/pagination-toolbar" title="23 条数据 + 前端分页 + 工具栏" client-only description="分页器的每页条数使用 ElSelect，示例仅在浏览器中渲染。" />

## Props

| 属性            | 类型                                  | 默认值      | 说明                                                        |
| --------------- | ------------------------------------- | ----------- | ----------------------------------------------------------- |
| `columns`       | `ProTableColumn[]`                    | `[]`        | 列配置                                                      |
| `data`          | `Record<string, any>[]`               | `[]`        | 行数据                                                      |
| `rowKey`        | `string \| ((row) => string)`         | `'id'`      | 行唯一 key                                                  |
| `loading`       | `boolean`                             | `false`     | 加载态                                                      |
| `height`        | `string \| number`                    | `undefined` | 表格高度                                                    |
| `maxHeight`     | `string \| number`                    | `undefined` | 表格最大高度                                                |
| `tableProps`    | `Record<string, any>`                 | `{}`        | 透传给 `ElTable` 的属性                                     |
| `headerTitle`   | `string`                              | `''`        | 工具栏标题                                                  |
| `toolBarRender` | `(scope) => VNodeChild`               | `undefined` | 自定义工具栏渲染函数，作用域含 `columns` / `visibleColumns` |
| `options`       | `boolean \| ProTableToolbarOptions`   | `undefined` | 工具栏功能开关                                              |
| `columnsState`  | `ProTableColumnsState`                | `undefined` | 列状态（显隐 / 排序 / 固定）与持久化配置                    |
| `pagination`    | `boolean \| ProTablePaginationConfig` | `false`     | 分页配置，`true` 等价于默认配置                             |

### ProTableColumn

| 字段                 | 类型                                           | 说明                                                  |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| `key`                | `string \| number`                             | 列唯一标识，缺省时用 `prop` 或索引                    |
| `prop`               | `string`                                       | 字段名，支持 `a.b` 嵌套路径                           |
| `label`              | `string`                                       | 列标题                                                |
| `type`               | `'selection' \| 'index' \| 'expand' \| string` | 列类型，透传给 `ElTableColumn`                        |
| `width` / `minWidth` | `string \| number`                             | 列宽                                                  |
| `align`              | `'left' \| 'center' \| 'right'`                | 对齐方式                                              |
| `fixed`              | `true \| 'left' \| 'right'`                    | 固定列                                                |
| `sortable`           | `boolean \| 'custom'`                          | 是否可排序                                            |
| `hidden`             | `boolean`                                      | 是否隐藏                                              |
| `hideInSetting`      | `boolean`                                      | 是否从列设置中排除                                    |
| `disableInSetting`   | `boolean`                                      | 列设置中是否禁止操作                                  |
| `render`             | `(scope) => VNodeChild`                        | 自定义单元格，作用域 `{ row, column, value, $index }` |
| `headerRender`       | `(scope) => VNodeChild`                        | 自定义表头，作用域 `{ column, $index }`               |
| `formatter`          | `(row, column, value, index) => VNodeChild`    | 单元格格式化                                          |
| 其他                 | `unknown`                                      | 其余字段透传给 `ElTableColumn`                        |

### ProTableToolbarOptions

| 字段      | 类型                      | 说明                                            |
| --------- | ------------------------- | ----------------------------------------------- |
| `reload`  | `boolean \| (() => void)` | 刷新按钮；传函数时点击先执行函数再派发 `reload` |
| `density` | `boolean`                 | 密度切换（宽松 / 默认 / 紧凑）                  |
| `setting` | `boolean`                 | 列设置抽屉                                      |

### ProTablePaginationConfig

| 字段          | 类型       | 默认值                               | 说明                                   |
| ------------- | ---------- | ------------------------------------ | -------------------------------------- |
| `enabled`     | `boolean`  | `true`                               | 是否启用分页                           |
| `currentPage` | `number`   | `1`                                  | 当前页                                 |
| `pageSize`    | `number`   | `20`                                 | 每页条数                               |
| `total`       | `number`   | 数据长度                             | 总条数                                 |
| `pageSizes`   | `number[]` | `[20, 50, 100, 200]`                 | 每页条数选项                           |
| `layout`      | `string`   | `'sizes, prev, pager, next, jumper'` | 分页布局（`total` 由组件单独渲染）     |
| `background`  | `boolean`  | `true`                               | 分页按钮是否带背景                     |
| `remote`      | `boolean`  | `false`                              | 远程分页：为 `true` 时组件不再自行切片 |

### ProTableColumnsState

| 字段              | 类型                                 | 说明                            |
| ----------------- | ------------------------------------ | ------------------------------- |
| `value`           | `ProTableColumnsStateMap`            | 受控列状态                      |
| `defaultValue`    | `ProTableColumnsStateMap`            | 默认列状态                      |
| `persistenceKey`  | `string`                             | 持久化 key                      |
| `persistenceType` | `'localStorage' \| 'sessionStorage'` | 持久化位置，默认 `localStorage` |

## Events

| 事件                 | 参数                               | 说明               |
| -------------------- | ---------------------------------- | ------------------ |
| `currentChange`      | `(currentPage: number)`            | 页码变化           |
| `sizeChange`         | `(pageSize: number)`               | 每页条数变化       |
| `paginationChange`   | `({ currentPage, pageSize })`      | 页码或每页条数变化 |
| `update:currentPage` | `(currentPage: number)`            | 页码双向绑定       |
| `update:pageSize`    | `(pageSize: number)`               | 每页条数双向绑定   |
| `columnsStateChange` | `(state: ProTableColumnsStateMap)` | 列状态变化         |
| `reload`             | —                                  | 点击刷新按钮时触发 |

## Slots

| 插槽      | 作用域 | 说明                                             |
| --------- | ------ | ------------------------------------------------ |
| `title`   | —      | 工具栏标题区                                     |
| `toolbar` | —      | 工具栏操作区（渲染在刷新 / 密度 / 设置按钮之前） |
| `empty`   | —      | 空数据内容，默认「暂无数据」                     |

> 类型定义：`packages/ui/src/components/ProTable/ProTable.types.ts`。分页默认值来自 `ProTable.utils.ts`。
