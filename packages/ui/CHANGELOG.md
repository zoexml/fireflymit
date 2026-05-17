# @fireflymit/ui

## 0.1.1

### Patch Changes

- Add ProTable with JSX column rendering, optional pagination, height-fill layouts, and playground examples.

## 0.1.0

### Minor Changes

- 新增 `FireflyMitResolver` 自动按需引入能力，增强 `DragVerify` 响应式宽度支持，并重构 UI 主题变量体系。

### Features

- 新增 `FireflyMitResolver`，支持在 `unplugin-vue-components` 和 `unplugin-auto-import` 中自动按需引入组件。
- `FireflyMitResolver` 支持自定义组件前缀、关闭样式副作用、覆盖包名，默认自动引入 `@fireflymit/ui/dist/index.css`。
- `DragVerify` 的 `width` 支持 CSS 长度字符串，例如 `100%`、`320px`、`20rem`，可用于响应式布局。
- `DragVerify` 新增 Storybook 文档示例，覆盖默认宽度、响应式宽度、固定宽度和实例 `reset()` 重置场景。

### Improvements

- 重构主题变量体系，新增 `--ffm-*` 设计 token，并映射 Element Plus 常用颜色、字号、圆角、阴影和控件尺寸变量。
- 增加 `[data-firefly-theme='light']`、`[data-firefly-theme='dark']` 和 `.dark` 的主题变量支持。
- 增加 `[data-firefly-size='sm']`、`[data-firefly-size='lg']` 控件尺寸变量支持。
- 优化 `ContextMenu`、`ProForm`、`SearchBar`、`TextScroll` 等组件样式结构，使其更依赖统一主题变量。
- 更新 playground 示例和 UI README，补充全量引入、自动按需引入、手动按需引入和组件列表说明。

### Tests

- 新增 Resolver 单元测试，覆盖默认解析、组件前缀、关闭样式副作用和未知组件场景。
- 新增 `DragVerify` 尺寸计算测试，覆盖百分比宽度、像素宽度和响应式拖拽距离计算。

## 0.0.8

### Patch Changes

- 修复 publish 流程：`workspace:*` 依赖未替换、`utils` 脚本名不一致、CI 路径缺失
- 全量将 `ArtUI` 重命名为 `FireflyUI`

## 0.0.6

### Patch Changes

- re-export @fireflymit/utils from @fireflymit/ui, so consumers only need to install one package

## 0.0.5

### Patch Changes

- - 新增 @fireflymit/hooks 包，包含 composables 和 10 个 Vue 自定义指令
  - 指令列表：vCopy、vLongpress、vClickOutside、vDebounce、vThrottle、vEmoji、vInput、vRipple、vLazyLoad
  - 迁移 composables（useChildren、useCompRef、useLockScroll）至 hooks 包
  - @fireflymit/ui 重新导出 hooks 全部内容，用户无需单独安装
  - 新增指令文档页面及 Playground 演示

## 0.0.4

### Patch Changes

- 新增 Avatar 头像组件

## 0.0.3

### Patch Changes

- refactor components and update build config

## 0.0.2

### Patch Changes

- 统一组件名称，添加 "Art" 前缀（ArtBadge、ArtBanner、ArtCardBanner、ArtContextMenu、ArtCountTo、ArtDragVerify、ArtProForm、ArtSearchBar、ArtSvgIcon、ArtTextScroll）
- 将 Form 组件重命名为 ProForm，避免 HTML 保留关键字
- 修复 SCSS/CSS 构建 - 样式现在提取到 dist/style.css
- 新增 package.json exports 字段，支持 ESM/CJS/样式入口
- 更新 GlobalComponents 类型声明以匹配新组件名称
