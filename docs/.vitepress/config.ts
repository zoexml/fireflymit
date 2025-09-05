import { defineConfig } from 'vitepress'
import { nav, sidebar } from './utils/index'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/fireflymit/',
  title: 'fireflymit-FE',
  description: '物料库',
  srcDir: 'src',
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
      { icon: 'github', link: 'https://github.com/Joetoo/fireflymit' },
    ],
  },
})
