// src/index.ts
// 全量样式请在项目入口手动引入，避免逻辑入口产生 CSS 副作用:
// import '@fireflymit/ui/style.css'

export { default } from './components'
export * from './components'
// 获取版本号
export { version } from './version'
// re-export hooks & directives
export * from '@fireflymit/hooks'
// re-export utils
export * from '@fireflymit/utils'
