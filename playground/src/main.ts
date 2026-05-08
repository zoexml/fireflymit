// 引入@fireflymit/ui
import FireflyUI from '@fireflymit/ui'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import 'element-plus/dist/index.css'
import '@fireflymit/ui/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(FireflyUI)
app.use(router)
app.mount('#app')
