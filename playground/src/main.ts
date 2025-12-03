import ElementPlus from 'element-plus'
import { createApp } from 'vue'
// 引入@fireflymit/ui
import ArtUI from '~/@fireflymit/ui'
import App from './App.vue'
import router from './router'
// import '@fireflymit/ui/styles.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

// plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了

app.use(ElementPlus)
app.use(ArtUI)
app.use(router)
app.mount('#app')
