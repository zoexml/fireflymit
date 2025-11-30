import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
//
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// // import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//
//     AutoImport({
//     // 自动导入 Vue 相关函数，如:ref, reactive, toRef 等
//       imports: ['vue'],
//       // 生成自动导入声明文件
//       dts: './auto-imports.d.ts',
//       // resolvers: [ElementPlusResolver()],
//     }),
//     Components({
//     // 不开起自动生成声明文件 dts: false
//       dts: false,
//       // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
//       // resolvers: [ElementPlusResolver({ importStyle: false })],
//     }),
//   ],
// })

// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// // import AutoImport from 'unplugin-auto-import/vite'
// // import Components from 'unplugin-vue-components/vite'
// // import DefineOptions from 'unplugin-vue-define-options/vite';
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueJsx(),

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
//   resolve: {
//     alias: {
//
//     },
//   },
// })
