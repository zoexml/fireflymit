---
title: Upload 上传
---

# Upload 上传

基于 `ElUpload` 封装的拖拽上传：内置文件类型 / 大小 / 数量校验、文件列表、手动上传与清空，并暴露上传实例方法。

::: tip 演示说明
以下示例只演示本地选择与列表渲染：未传 `action` 或 `httpRequest` 时组件不会发起上传请求，`autoUpload` 实际也不生效。
:::

## 基础用法

`v-model:file-list` 绑定文件列表，`fileTypes` / `maxSize` / `limit` 控制校验规则。

<Demo name="upload/basic" title="拖拽选择文件" description="需要在浏览器中点击或拖拽文件；不会真正上传。" />

## 自定义选择入口

`trigger` 插槽可替换默认的拖拽区 / 按钮，作用域包含 `disabled`。

<Demo name="upload/slot" title="trigger 插槽" />

## Props

| 属性                | 类型                                    | 默认值                         | 说明                                                       |
| ------------------- | --------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `action`            | `string`                                | `''`                           | 上传接口地址                                               |
| `name`              | `string`                                | `'file'`                       | 上传字段名                                                 |
| `headers`           | `object`                                | `undefined`                    | 请求头                                                     |
| `data`              | `object \| (() => object)`              | `undefined`                    | 附加请求数据                                               |
| `method`            | `string`                                | `'post'`                       | 请求方法                                                   |
| `withCredentials`   | `boolean`                               | `false`                        | 是否携带 Cookie                                            |
| `multiple`          | `boolean`                               | `false`                        | 是否支持多选                                               |
| `drag`              | `boolean`                               | `true`                         | 是否启用拖拽上传                                           |
| `accept`            | `string`                                | `''`                           | 原生 `accept` 属性                                         |
| `fileTypes`         | `string[]`                              | `[]`                           | 允许的文件类型，支持 `.png`、`image/png`、`image/*`        |
| `limit`             | `number`                                | `5`                            | 最大文件数量                                               |
| `maxSize`           | `number`                                | `10`                           | 单文件大小上限（MB），`0` 表示不限制                       |
| `listType`          | `'text' \| 'picture' \| 'picture-card'` | `'text'`                       | 列表展示类型                                               |
| `autoUpload`        | `boolean`                               | `false`                        | 选择后是否自动上传（需同时提供 `action` 或 `httpRequest`） |
| `disabled`          | `boolean`                               | `false`                        | 是否禁用                                                   |
| `showFileList`      | `boolean`                               | `true`                         | 是否显示文件列表                                           |
| `showClear`         | `boolean`                               | `true`                         | 是否显示清空按钮                                           |
| `showRetry`         | `boolean`                               | `true`                         | 是否显示失败重试按钮                                       |
| `replaceOnExceed`   | `boolean`                               | `false`                        | 超出数量限制时是否替换当前文件                             |
| `title`             | `string`                                | `'拖拽文件到此处，或点击上传'` | 上传区标题                                                 |
| `description`       | `string`                                | `''`                           | 上传区描述                                                 |
| `buttonText`        | `string`                                | `'选择文件'`                   | 选择文件按钮文案                                           |
| `submitText`        | `string`                                | `'开始上传'`                   | 手动上传按钮文案                                           |
| `clearText`         | `string`                                | `'清空'`                       | 清空按钮文案                                               |
| `tip`               | `string`                                | `''`                           | 提示文案，为空时按类型 / 大小 / 数量自动生成               |
| `httpRequest`       | `Function`                              | `undefined`                    | 自定义上传请求                                             |
| `beforeUpload`      | `Function`                              | `undefined`                    | 上传前钩子，返回 `false` 取消并派发 `reject`               |
| `beforeRemove`      | `Function`                              | `undefined`                    | 删除前钩子                                                 |
| `v-model:file-list` | `UploadUserFile[]`                      | `[]`                           | 文件列表                                                   |

## Events

| 事件       | 参数                      | 说明                                                   |
| ---------- | ------------------------- | ------------------------------------------------------ |
| `change`   | `(file, files)`           | 文件状态变化                                           |
| `success`  | `(response, file, files)` | 上传成功                                               |
| `error`    | `(error, file, files)`    | 上传失败                                               |
| `progress` | `(event, file, files)`    | 上传进度                                               |
| `preview`  | `(file)`                  | 点击文件名预览                                         |
| `remove`   | `(file, files)`           | 移除文件                                               |
| `clear`    | —                         | 清空文件列表                                           |
| `exceed`   | `(files, uploadFiles)`    | 超出数量限制                                           |
| `reject`   | `(file, reason)`          | 校验未通过，`reason` 为 `'size' \| 'type' \| 'custom'` |
| `retry`    | `(file)`                  | 重试上传                                               |

## Slots

| 插槽      | 作用域                    | 说明                      |
| --------- | ------------------------- | ------------------------- |
| `trigger` | `{ disabled }`            | 替换默认拖拽区 / 选择按钮 |
| `tip`     | `{ tip }`                 | 替换提示文案区            |
| `file`    | `{ file, remove, retry }` | 替换文件列表中的单行渲染  |

## 实例方法

| 方法           | 说明                 |
| -------------- | -------------------- |
| `submit()`     | 手动提交上传         |
| `clearFiles()` | 清空文件列表         |
| `abort(file?)` | 中止上传，可指定文件 |
| `ref`          | 内部 `ElUpload` 实例 |

> 类型定义：`packages/ui/src/components/Upload/Upload.types.ts`（`uploadProps` / `UploadEmits`）。
