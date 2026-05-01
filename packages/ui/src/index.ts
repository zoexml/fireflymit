// src/index.ts
// 注意: 样式需要单独引入 import '@fireflymit/ui/dist/styles/index.css'
// 或者在入口文件中手动引入 styles

// 注入组件库 CSS 变量
import './styles/variables.scss'

export { default } from './components'
export * from './components'
// 获取版本号
export { version } from './version'
