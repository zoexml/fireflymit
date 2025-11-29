import { defineBuildConfig } from 'unbuild'

const enableOut = process.argv.includes('--out')

export default defineBuildConfig({
  // 每次构建之前，输出目录（outDir）将被清空
  clean: true,
  declaration: true,
  // 指定要打包的入口文件
  entries: ['src/index'],
  sourcemap: enableOut,
  outDir: enableOut ? 'out' : 'dist',
})
