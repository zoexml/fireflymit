import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import AutoImport from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     '@vueuse/core',
    //   ],
    //   dts: 'src/types/auto-imports.d.ts',
    //   resolvers: [ElementPlusResolver()],
    //   vueTemplate: true,
    // }),
    dts({
      entryRoot: './src', // 入口源码目录
      outDir: ['dist/es', 'dist/lib'], // 同时生成 ES 和 CJS 类型声明
      tsconfigPath: './tsconfig.json',
    }),
    // Components({
    //   // 不开起自动生成声明文件 dts: false
    //   dts: false,
    //   // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
    //   resolvers: [ElementPlusResolver({ importStyle: false })],
    // }),
    // dts({
    //   // 包含的文件类型
    //   include: ['src/**/*.{vue,ts,tsx}'],
    //   exclude: ['src/__tests__/*', 'src/**/*.{test,spec,stories,demo}.{vue,ts,tsx}'],
    //   // 输出目录
    //   outDir: ['dist/types'],
    //   // 写入文件前的处理
    //   beforeWriteFile: (filePath, content) => ({
    //     // 替换文件路径中的 '/src/' 为 '/'，不然类型产物都会被放在src文件夹下面
    //     filePath: filePath.replace('/src/', '/'),
    //     content,
    //   }),
    // }),
    // // 自定义复制插件（可以使用 vite-plugin-static-copy 插件代替）
    // {
    //   name: 'copy-global-dts',
    //   closeBundle() {
    //   },
    // },
  ],

  build: {
    target: 'esnext', // 目标版本: 编译目标为 ES Modules（支持现代浏览器）
    outDir: 'dist', // 输出目录
    emptyOutDir: true, // 清空输出目录
    minify: false, // 压缩 方便查看打包后的代码（排查问题），禁用最小化混淆，默认为esbuild
    // css分离
    // cssCodeSplit: true,
    // 库配置
    lib: {
      // 入口文件
      entry: 'src/index.ts',
      name: 'art-ui',
      // 输出格式
      formats: ['es', 'cjs'],
      // 输出文件名
      // fileName: (format) => {
      //   return `${format === 'es' ? 'esm' : 'cjs'}/[name].${format === 'es' ? 'mjs' : 'js'}`
      // },
      // CSS 输出文件名
      cssFileName: 'style',
    },
    rollupOptions: {
      // 排除依赖的库,css
      external: ['vue', '@element-plus/icons-vue', /\.scss/], // 'element-plus','@vueuse/core'
      // 入口地址
      input: ['src/index.ts'],
      // 输出配置
      output: [
        // {
        //   format: 'iife',
        //   entryFileNames: 'yh.min.js',
        //   dir: 'dist',
        //   name: 'ArtUI',
        //   globals: {
        //     'vue': 'Vue',
        //     '@vueuse/core': 'VueUse',
        //   },
        //   inlineDynamicImports: false,
        // },
        {
          exports: 'named',
          format: 'es', // 按需加载 vite tree shaking
          entryFileNames: '[name].mjs', // 不用打包成.es.js,这里我们想把它打包成.js // xxx.esm-browser.js
          dir: 'dist/es',
          // 保留原始模块结构，而不是将所有模块合并成一个大文件
          preserveModules: true,
          // 将 src 目录设置为模块的根目录，这样输出的文件就会直接从 src 的子目录开始，去掉 src 这一层。dist/es/components/Badge/Badge.vue  // 不再有 src 前缀
          preserveModulesRoot: 'src',
          inlineDynamicImports: false, // 不内联动态 import
        },
        {
          exports: 'named',
          format: 'cjs', // ssr lib commonjs
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: 'dist/lib',
          inlineDynamicImports: false,
        },
      ],
    },
  },
})
