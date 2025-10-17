import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({
    entryRoot: './src', // 入口源码目录
    outDir: ['dist/es', 'dist/lib'], // 同时生成 ES 和 CJS 类型声明
    tsconfigPath: './tsconfig.json',
  })],
  build: {
    target: 'esnext', // 编译目标为 ES Modules（支持现代浏览器）
    minify: false, // 压缩
    outDir: 'dist', // 打包文件目录
    // css分离
    // cssCodeSplit: true,
    rollupOptions: {
      // 排除依赖的库,css
      external: ['vue', '@vueuse/core', '@element-plus/icons-vue', /\.scss/], // 'element-plus',
      input: ['src/index.ts'], // 入口地址
      output: [
        // {
        //   format: 'iife',
        //   entryFileNames: 'yh.min.js',
        //   dir: 'dist',
        //   name: 'YhUI',
        //   globals: {
        //     'vue': 'Vue',
        //     '@vueuse/core': 'VueUse',
        //   },
        //   inlineDynamicImports: false,
        // },
        {
          format: 'es', // 按需加载 vite tree shaking
          entryFileNames: '[name].mjs', // 不用打包成.es.js,这里我们想把它打包成.js // erabbit.esm-browser.js
          dir: 'dist/es',
          preserveModules: true, // 保留原始文件结构，不合并成单个文件
          inlineDynamicImports: false, // 不内联动态 import
          exports: 'named',
        },
        {
          format: 'cjs', // ssr lib commonjs
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'dist/lib',
          inlineDynamicImports: false,
          exports: 'named',
        },
      ],
    },
    // Vite 的库打包模式
    lib: {
      entry: 'src/index.ts',
      name: 'art-ui',
      formats: ['es', 'cjs'],
    },
  },
})
