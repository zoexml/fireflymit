# TODO

## 近期优先级

- [ ] P0：补齐核心组件的 Stories、Props/Events/Slots 文档和最小测试用例
- [ ] P0：完善 `@fireflymit/ui` 按需引入、样式副作用和 Resolver 发布链路
- [ ] P1：补齐 `@fireflymit/hooks`、`@fireflymit/utils` 文档和示例
- [ ] P1：建立 CI 校验、Changesets 发布和文档部署的稳定流程
- [ ] P2：扩展业务组件、主题能力和工程模板能力

## 组件库文档

- [ ] 使用 Storybook 搭建组件文档站点
  - [x] 安装配置 Storybook for Vue 3
  - [ ] 为每个组件编写 Stories
  - [ ] 添加组件文档注释（Props、Events、Slots、Methods）
  - [x] 部署文档到 GitHub Pages / Vercel
- [ ] Storybook 文档体验增强
  - [ ] 启用 Autodocs / Controls / ArgsTable，统一展示组件 API
  - [ ] 为组件补充基础用法、复杂场景、禁用态、加载态、边界态示例
  - [ ] 增加 `@fireflymit/ui/resolver` 自动按需引入示例
  - [ ] 增加主题变量、样式覆盖、暗色模式使用示例
  - [ ] 接入 Storybook 静态构建产物的预览链接
- [ ] VitePress 文档完善
  - [ ] 增加 UI 组件文档导航与组件总览页
  - [ ] 增加安装、全量引入、手动按需引入、自动按需引入文档
  - [ ] 增加 Hooks、Directives、Utils 的 API 索引页
  - [ ] 增加常见问题：样式未生效、组件未自动导入、类型声明缺失、Element Plus peer 依赖

## 组件开发

- [ ] 补充更多业务组件（Table、Dialog、Form 增强等）
- [ ] 组件单元测试覆盖
- [ ] 组件 E2E 测试
- [ ] 已有组件能力补强
  - [ ] `Avatar`：支持图片加载失败兜底、尺寸预设、形状配置
  - [ ] `Badge`：支持自定义颜色、图标插槽、点状/数字/文本模式
  - [ ] `Banner` / `CardBanner`：支持背景图、操作区插槽、关闭事件和响应式布局
  - [ ] `ContextMenu`：支持键盘导航、禁用项、分组、右键定位边界修正
  - [ ] `CountTo`：支持前后缀、精度、小数动画、手动开始/暂停
  - [ ] `DragVerify`：支持远程校验、失败重置、无障碍提示和移动端交互
  - [ ] `ProForm`：支持表单联动、异步 options、动态校验、分组和提交态
  - [ ] `SearchBar`：支持字段配置、默认值回填、重置事件和移动端折叠
  - [ ] `SvgIcon`：支持本地图标集合、尺寸/颜色继承和加载失败提示
  - [ ] `TextScroll`：支持横向/纵向、暂停、速度配置、多条数据队列
- [ ] 新增业务组件
  - [ ] `ProTable`：查询表单、分页、排序、筛选、列配置、批量操作
  - [ ] `ProDialog` / `ProDrawer`：统一弹窗表单、确认状态、footer 插槽
  - [ ] `PageContainer`：页面标题、面包屑、操作区、内容区布局
  - [ ] `EmptyState`：空状态、异常状态、操作按钮
  - [x] `Upload`：文件上传、拖拽、进度、失败重试
  - [ ] `ImagePreview`：图片预览、缩放、旋转、列表切换
  - [ ] `CopyButton`：文本复制、反馈提示、禁用态
- [ ] 组件工程规范
  - [ ] 每个组件统一 `index.ts`、`*.types.ts`、`*.stories.ts`、测试文件结构
  - [ ] 统一组件命名、事件命名、插槽命名和 CSS 变量命名
  - [ ] 建立组件新增脚手架，自动生成 SFC、类型、Story、测试和导出
  - [ ] 增加组件废弃策略和 breaking change 记录方式

## 工具库

- [ ] 完善 `@fireflymit/utils` 函数文档
- [ ] 补充 `@fireflymit/hooks` 组合式函数
- [ ] `@fireflymit/utils` 能力扩展
  - [ ] 增加 URL/query 参数处理、对象深拷贝、空值判断、格式化工具
  - [ ] 增加日期格式化、相对时间、时间范围计算工具
  - [ ] 增加浏览器能力检测、文件下载、剪贴板、Storage 封装
  - [ ] 为核心工具函数补充 Vitest 用例和边界输入测试
  - [ ] 明确工具函数 Tree Shaking、类型导出和子路径导入策略
- [ ] `@fireflymit/hooks` 能力扩展
  - [ ] 增加 `useRequest`、`usePagination`、`useTable`、`useForm` 等业务 Hooks
  - [ ] 增加 `useClipboard`、`useFullscreen`、`useResizeObserver` 等基础 Hooks
  - [ ] 为 Directives 补充使用文档、参数说明和边界行为测试
  - [ ] 明确 Hooks 与 Directives 是否继续由 `@fireflymit/ui` re-export
- [ ] `@fireflymit/uno-preset` 能力扩展
  - [ ] 梳理主题 token、快捷规则、图标规则和预设使用文档
  - [ ] 增加与 UI 组件 CSS 变量的映射说明
  - [ ] 提供 Vite / Vue 项目接入示例

## 项目基础设施

- [ ] 完善根目录 README.md 项目结构图
- [ ] 配置 CI 检查（lint + test + build）
- [ ] 完善 CONTRIBUTING.md 贡献指南
- [ ] 向 `unplugin-vue-components` 提交 PR，内置 `FireflyMitResolver`，支持
      `import { FireflyMitResolver } from 'unplugin-vue-components/resolvers'`
- [ ] CI / 质量门禁
  - [ ] GitHub Actions 增加 `pnpm install --frozen-lockfile`
  - [ ] GitHub Actions 增加 lint、typecheck、test、build、storybook build
  - [ ] 增加 PR 校验和 main 分支保护规则
  - [ ] 增加覆盖率报告和最小覆盖率阈值
  - [ ] 增加 bundle size 检查，避免组件库体积意外膨胀
- [ ] 发布流程
  - [ ] 完善 Changesets 发版流程和 changelog 规范
  - [ ] 增加 npm provenance / trusted publishing 配置
  - [ ] 增加 alpha / beta / latest 发布通道说明
  - [ ] 发布前自动执行 lint、typecheck、test、build、文档构建
  - [ ] 明确 peerDependencies 兼容范围：Vue、Element Plus、@vueuse/core
- [ ] 开发体验
  - [ ] 完善 `pnpm dev:play` 和 `pnpm dev:storybook` 的本地调试说明
  - [ ] playground 增加所有组件的可交互调试页面
  - [ ] 增加组件生成脚本文档：命名、目录、导出、Story、测试
  - [ ] 增加 VS Code 推荐插件和 workspace settings
  - [ ] 增加 Docker 开发环境使用说明和适用场景
- [ ] 仓库治理
  - [ ] 清理并忽略构建产物、缓存、临时文件
  - [ ] 统一包内 README、LICENSE、CHANGELOG、exports、files 字段
  - [ ] 增加 issue templates、PR template、CODEOWNERS
  - [ ] 增加安全策略和依赖更新策略

## 测试计划

- [ ] 单元测试
  - [ ] 为组件 props 默认值、事件、插槽渲染补充测试
  - [ ] 为工具函数补充正常输入、异常输入、边界输入测试
  - [ ] 为 Resolver 补充组件名、前缀、样式导入、未知组件测试
- [ ] 交互测试
  - [ ] 使用 Playwright 覆盖 ContextMenu、DragVerify、ProForm、SearchBar 等关键交互
  - [ ] 覆盖键盘操作、移动端触摸、弹层定位、滚动容器场景
- [ ] 视觉回归
  - [ ] Storybook 接入 Chromatic 或等价方案
  - [ ] 为主题、暗色模式、响应式布局建立截图基线
- [ ] 兼容性测试
  - [ ] 验证 Vue 3、Element Plus、Vite、pnpm 的最低支持版本
  - [ ] 验证 ESM / CJS / 类型声明 / CSS 产物可被消费端正常解析

## 版本路线图

- [ ] `0.1.x`：完善已有组件、Resolver、文档和基础测试
- [ ] `0.2.x`：新增 ProTable、ProDialog、PageContainer 等高频业务组件
- [ ] `0.3.x`：完善主题系统、暗色模式、UnoCSS preset 和视觉回归
- [ ] `1.0.0`：稳定 API、补齐文档、建立 CI/CD、明确兼容性和迁移策略
