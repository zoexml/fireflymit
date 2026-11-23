---
title: 组件文档
---

# 组件文档

`@fireflymit/ui` 基于 Element Plus 封装，组件示例与源码同页展示，示例文件即真实可运行的 SFC。

| 组件                                   | 说明                              |
| -------------------------------------- | --------------------------------- |
| [Avatar 头像](./avatar)                | 图片头像与首字母占位头像          |
| [Badge 徽标](./badge)                  | 圆点 + 文本的状态标识             |
| [Banner 横幅](./banner)                | 带标题、按钮与装饰效果的横幅      |
| [CardBanner 卡片横幅](./card-banner)   | 图片 + 标题 + 描述 + 双按钮的卡片 |
| [ContextMenu 右键菜单](./context-menu) | 右键触发、支持子菜单的自定义菜单  |
| [CountTo 数字动画](./count-to)         | 数字滚动动画，支持格式化与缓动    |
| [DialogForm 弹窗表单](./dialog-form)   | 弹窗内嵌 ProForm，统一提交与重置  |
| [DragVerify 滑动验证](./drag-verify)   | 拖动滑块完成验证                  |
| [DrawerForm 抽屉表单](./drawer-form)   | 抽屉内嵌 ProForm                  |
| [ProForm 表单](./pro-form)             | 配置驱动的表单                    |
| [ProTable 表格](./pro-table)           | 配置驱动的表格，含工具栏与分页    |
| [SearchBar 搜索栏](./search-bar)       | 表格查询条件表单，支持折叠与插槽  |
| [SvgIcon 图标](./svg-icon)             | 基于 Iconify 的图标组件           |
| [TextScroll 文字滚动](./text-scroll)   | 横向 / 纵向循环滚动的通知条       |
| [Upload 上传](./upload)                | 拖拽上传与文件列表管理            |

## 演示容器

页面里的每个示例都由 `Demo` 容器渲染：它在渲染组件的同时展示同一份源码，源码取自 `apps/docs/src/demos/` 下的真实 `.vue` 文件，复制到项目里即可直接运行。

<Demo name="badge/basic" title="容器示例：Badge 徽标" />
