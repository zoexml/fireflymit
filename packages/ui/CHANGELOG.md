# @fireflymit/ui

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
