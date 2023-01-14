import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from '@/router'
const app = createApp(App)
app.use(router)
app.mount('#app')
