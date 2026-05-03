import fs from 'node:fs'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/**
 * 合并 dist/es 下所有 CSS 文件为 dist/index.css
 * 参照 Element Plus 的做法：全量样式输出到 dist/index.css
 * 消费者使用: import '@fireflymit/ui/dist/index.css'
 */
function concatStylesPlugin() {
  return {
    name: 'concat-styles',
    closeBundle() {
      const esDir = path.resolve(import.meta.dirname, 'dist/es')
      const distDir = path.resolve(import.meta.dirname, 'dist')
      const cssFiles = fs.readdirSync(esDir).filter(f => f.endsWith('.css'))

      // 确保变量和公共样式文件排在最前面
      const priorityFiles = ['index.css', 'variables.css', 'config.css', 'mixins.css']
      const sorted = cssFiles.sort((a, b) => {
        const aPriority = priorityFiles.indexOf(a)
        const bPriority = priorityFiles.indexOf(b)
        if (aPriority !== -1 && bPriority !== -1) {
          return aPriority - bPriority
        }
        if (aPriority !== -1) {
          return -1
        }
        if (bPriority !== -1) {
          return 1
        }
        return a.localeCompare(b)
      })

      const combined = sorted.map(f => fs.readFileSync(path.join(esDir, f), 'utf-8')).join('\n')
      fs.writeFileSync(path.join(distDir, 'index.css'), combined)
    },
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    concatStylesPlugin(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true,
    }),
    dts({
      // 入口源码目录
      entryRoot: './src',
      // 同时生成 ES 和 CJS 类型声明
      outDir: ['dist/es', 'dist/lib'],
      tsconfigPath: './tsconfig.json',
      // 包含的文件类型
      include: ['src/**/*.{vue,ts,tsx}'],
      exclude: ['src/__tests__/*', 'src/**/*.{test,spec,stories,demo}.{vue,ts,tsx}'],
    }),
  ],

  build: {
    target: 'esnext', // 目标版本: 编译目标为 ES Modules（支持现代浏览器）
    outDir: 'dist', // 输出目录
    emptyOutDir: true, // 清空输出目录
    minify: false, // 压缩 方便查看打包后的代码（排查问题），禁用最小化混淆，默认为esbuild
    // css分离
    cssCodeSplit: true,
    // 库配置
    lib: {
      // 入口文件
      entry: 'src/index.ts',
      name: 'art-ui',
      // 输出格式
      formats: ['es', 'cjs'],
      // CSS 输出文件名
      cssFileName: 'style',
    },
    rolldownOptions: {
      // 排除依赖的库
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        '@iconify/vue',
        '@vueuse/core',
      ],
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
