import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { nav, sidebar } from './utils/index'

const uiSrc = fileURLToPath(new URL('../../../packages/ui/src', import.meta.url))
const hooksSrc = fileURLToPath(new URL('../../../packages/hooks/src', import.meta.url))
const utilsSrc = fileURLToPath(new URL('../../../packages/utils/src', import.meta.url))

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/fireflymit/',
  title: 'fireflymit',
  description: '物料库',
  srcDir: 'src',
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/fireflymit/bitbug_favicon.ico',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    // 开启搜索
    search: { provider: 'local' },
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zoexml/fireflymit' },
    ],
  },
  vite: {
    resolve: {
      // 演示页直接消费 packages/ui 源码，必须保证整个文档站只有一份 Vue 运行时
      dedupe: ['vue', 'element-plus'],
      alias: [
        // ui 包样式入口在 dist 中，源码场景指向 scss 源文件
        { find: /^@fireflymit\/ui\/style\.css$/, replacement: `${uiSrc}/styles/index.scss` },
        // 指向源码而非 dist，文档站无需先构建 ui 包
        { find: /^@fireflymit\/ui$/, replacement: `${uiSrc}/index.ts` },
        { find: /^@fireflymit\/hooks$/, replacement: `${hooksSrc}/index.ts` },
        { find: /^@fireflymit\/utils$/, replacement: `${utilsSrc}/index.ts` },
        // ui 源码内部使用 "~/_utils" 形式引用自身模块
        { find: '~', replacement: uiSrc },
      ],
    },
  },
})
