// src/index.ts
// import './style/variables.scss'

// 将utils 抽离到了 @fireflymit/utils, 内部使用的_utils 不进行导出
// export * from './_utils'

export { default } from './components'
export * from './components'
// 获取版本号
export { version } from './version'
