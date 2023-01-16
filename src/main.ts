import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// 让所有浏览器初始化的样式统一，并不是清除所有的 margin padding 之类的
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
import XtxUI from './components/index'
const app = createApp(App)
const pinia = createPinia()
app.use(XtxUI)
app.use(router)
app.use(pinia)
app.mount('#app')
