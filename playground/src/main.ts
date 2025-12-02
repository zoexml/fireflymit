// 引入@fireflymit/ui
import ArtUI from '@fireflymit/ui/src/index'
// import ArtUI from '@fireflymit/ui'
// 引入antdv
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
// import '@fireflymit/ui/style.css';
import App from './App.vue'

//
import router from './router'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/reset.css'

// import './style.css'
// const plugins = [Badge, Empty]

const app = createApp(App)

// plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了

app.use(ElementPlus)
app.use(Antd)
app.use(ArtUI)
app.use(router)
app.mount('#app')
