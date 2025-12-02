import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // 每次构建之前，输出目录（outDir）将被清空
  clean: true,
  // 自动生成 .d.ts 类型声明
  declaration: true,
  // 指定要打包的入口文件
  entries: ['src/index'],
})
