import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      // 生成自动导入声明文件
      dts: './src/types/auto-import.d.ts',
      // resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      // 使用本地UI库，ui组件修改实时变化，提高调试效率。
      '~/@fireflymit/ui': resolve(import.meta.dirname, '../packages/ui/src/index.ts'),
      '~': resolve(import.meta.dirname, '../packages/ui/src'),
    },
  },
  server: {
    port: 4444,
  },
  optimizeDeps: {
    include: ['vue', 'element-plus'],
  },
})

//
//
// import Components from 'unplugin-vue-components/vite'
// // import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//

//     Components({
//     // 不开起自动生成声明文件 dts: false
//       dts: false,
//       // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
//       // resolvers: [ElementPlusResolver({ importStyle: false })],
//     }),
//   ],
// })

// // import Components from 'unplugin-vue-components/vite'
// // import DefineOptions from 'unplugin-vue-define-options/vite';
// export default defineConfig({
//   plugins: [

//     // AutoImport({
//     //   resolvers: [ElementPlusResolver({
//     //     importStyle: 'sass',
//     //   })],
//     // }),

//     // Components({
//     //   resolvers: [ElementPlusResolver({
//     //     importStyle: 'sass',
//     //   })],
//     // })
//   ],
// })
