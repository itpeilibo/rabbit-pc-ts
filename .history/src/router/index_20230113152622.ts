import { createRouter, createWebHashHistory } from 'vue-router'
// Layout 除了登录等某些页面以外，都是需要懒加载的，不建议懒加载
import Layout from '@/views/layout/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Layout },
    {path: ''}
  ]
})
export default router