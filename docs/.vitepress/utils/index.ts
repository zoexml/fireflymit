// @see: https://vitepress-sidebar.jooy2.com/
import { generateSidebar } from 'vitepress-sidebar'

// 顶部导航栏
export const nav = [
  { text: '工具', link: '/tools/Get Start/installation' },
  { text: '需求方案', link: '/demand-plan' },
  { text: 'UI', link: 'https://zoexml.github.io/fireflymit/ui/' },
  { text: '开发规范', link: '/standard/index' },
  {
    text: '相关链接',
    items: [
      {
        text: 'Vue 3',
        items: [
          { text: 'Vue 3 文档', link: 'https://cn.vuejs.org/' },
          { text: 'Vue Router', link: 'https://router.vuejs.org/zh/' },
          { text: 'VueUse', link: 'https://vueuse.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/zh/' },
        ],
      },
      {
        text: '工具链',
        items: [
          { text: 'Vite', link: 'https://vite.dev/' },
          { text: 'VitePress', link: 'https://vitepress.dev/' },
          { text: 'pnpm', link: 'https://pnpm.io/' },
          { text: 'Turborepo', link: 'https://turbo.build/repo' },
        ],
      },
      {
        text: 'UI & 样式',
        items: [
          { text: 'Element Plus', link: 'https://element-plus.org/zh-CN/' },
          { text: 'UnoCSS', link: 'https://unocss.dev/' },
        ],
      },
    ],
  },
]

// 侧边栏
export const sidebar = generateSidebar([
  {
    documentRootPath: 'docs/src',
    scanStartPath: 'tools',
    resolvePath: '/tools/',
    useTitleFromFrontmatter: true,
    manualSortFileNameByPriority: ['Get Start', 'cli', 'plugins'],
    collapsed: false,
  },
  {
    documentRootPath: 'docs/src',
    scanStartPath: 'demand-plan',
    resolvePath: '/demand-plan/',
    useTitleFromFrontmatter: true,
  },
])
