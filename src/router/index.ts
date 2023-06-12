import {createRouter, createWebHashHistory, useRouter} from 'vue-router'
// Layout 除了登录等某些页面以外，都是需要懒加载的，不建议懒加载
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from "@/store";
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
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
        },
        {
          path: '/goods/:id',
          component: () => import('@/views/goods/index.vue')
        },
        {
          path: '/cart',
          component: () => import('@/views/cart/index.vue')
        },
        {
          path: '/member/checkout',
          component: () => import('@/views/member/pay/checkout.vue')
        },
        {
          path: '/member/pay',
          component: () => import('@/views/member/pay/index.vue')
        },
        {
          path: '/pay/callback',
          component: () => import('@/views/member/pay/callback.vue')
        },
        {
          path: '/member',
          component: () => import('@/views/member/layout/index.vue'),
          children: [
            {
              // /member
              path: '',
              component: () => import('@/views/member/home/index.vue')
            },
              // /member/order
            {
              path: 'order',
              component: () => import('@/views/member/order/index.vue')
            }
          ]
        }

      ]
    },

    { path: '/login', component: () => import('@/views/login/index.vue') },
    {path: '/playground',component: () => import('@/views/playground/index.vue')},
    {path: '/login/callback',component: () => import('@/views/login/callback.vue')}
  ]
})

// 配置路由前置守卫
router.beforeEach((to,from,next) => {
  // 判断用户是否登录
  const { cart } = useStore()
  if (cart.isLogin) {
    // 如果用户是已登录状态，直接放行
    next()
  } else {
    // 目前是游客状态，需要看看你想去哪
    if (to.path.includes('/member')) {
      // 这个不是你随便能访问的
      // next('/login')
      next({
        path:'/login',
        query: {
          redirectUrl: to.fullPath,
        }
      })
    } else {
      // 其他页面：首页、详情页、购物车页... 直接放行
      next()
    }
  }
})

// next 和 push 的语法一致
// this.$router.push(...)
// this.$router.push({ path: 'login' })
// this.$router.push({ path: '/login', query: { a: '123' }}) // 拼在地址栏 （刷新不丢失）
// this.$router.push({name: 'login', params: { a: '123'}}) // 内存中（刷新会丢失）
export default router
