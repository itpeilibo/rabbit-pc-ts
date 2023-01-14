import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
