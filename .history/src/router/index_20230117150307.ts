import { createRouter, createWebHashHistory } from 'vue-router'
// Layout 除了登录等某些页面以外，都是需要懒加载的，不建议懒加载
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',
      component: Layout,
      children: [
        {path: '', component: Home},
        {
          path:'/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component:() => import('@/views/category/sub.vue')
        }
      ]
    },

    { path: '/login', component: () => import('@/views/login/index.vue') },
    {path: '/playground',component: () => import('@/views/playground/index.vue')}
  ]
})
export default router
