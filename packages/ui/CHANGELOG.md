# @fireflymit/ui

## 0.0.2

### Patch Changes

  - 统一组件名称，添加 "Art" 前缀（ArtBadge、ArtBanner、ArtCardBanner、ArtContextMenu、ArtCountTo、ArtDragVerify、ArtProForm、ArtSearchBar、ArtSvgIcon、ArtTextScroll）
  - 将 Form 组件重命名为 ProForm，避免 HTML 保留关键字
  - 修复 SCSS/CSS 构建 - 样式现在提取到 dist/style.css
  - 新增 package.json exports 字段，支持 ESM/CJS/样式入口
  - 更新 GlobalComponents 类型声明以匹配新组件名称
