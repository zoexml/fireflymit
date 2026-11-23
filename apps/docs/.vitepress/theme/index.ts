import type { Theme } from 'vitepress'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Demo from './components/Demo.vue'
// Element Plus 基础样式，必须早于 ui 包的变量覆盖
import 'element-plus/dist/index.css'
// 通过 vite 别名指向 packages/ui/src/styles/index.scss（无需先构建 ui 包）
import '@fireflymit/ui/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 全局注册组件演示容器，页面里直接写 <Demo name="..." />
    app.component('Demo', Demo)
    // SSG 下 Element Plus 的 id / zIndex 需要固定起点，否则水合时 id 对不上
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
} satisfies Theme
