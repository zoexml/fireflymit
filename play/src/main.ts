import { createApp } from 'vue'
// 统一入口默认导出的是 installer
// import ArtUI from '@fireflymit/ui'
import ArtUI from '../../packages/ui/src/index'
import App from './App.vue'

import './style.css'

const app = createApp(App)

app.use(ArtUI)
app.mount('#app')
