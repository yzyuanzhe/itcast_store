import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login.vue'
// 加载组件 配置路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/#/',
      name: 'home',
      component: { name: 'login' }
    }
  ]
})
