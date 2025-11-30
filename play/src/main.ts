import { createApp } from 'vue'
// 统一入口默认导出的是 installer
// import ArtUI from '@fireflymit/ui'
import ArtUI from '../../packages/ui/src/index'
import App from './App.vue'

import './style.css'

const app = createApp(App)

app.use(ArtUI)
app.mount('#app')

// import { createApp } from 'vue';

// import App from './App.vue';
// import router from './router';
// // 引入antdv
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
// // 引入@mylib/ui
// import MyLibUI from '@mylib/ui';
// import '@mylib/ui/style.css';

// const app = createApp(App);
// app.use(Antd); // 全局引入antdv组件
// app.use(MyLibUI); // 全局引入@mylib/ui组件
// app.use(router);
// app.mount('#app');

// import YhUI from '@yhclt/ui/src/index'

// import ElementPlus from 'element-plus'
// import { createApp } from 'vue'

// import App from '../../play/src/App1.vue'
// import 'element-plus/dist/index.css'
// import './style.css'

// // const plugins = [Badge, Empty]

// const app = createApp(App)

// // plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了
// app.use(ElementPlus)
// app.use(YhUI)
// app.mount('#app')
