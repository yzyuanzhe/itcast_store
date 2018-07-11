import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login.vue'
import Home from '@/view/home.vue'
import User from '@/view/user/user.vue'
import Right from '@/view/quanxian/right.vue'
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
      path: '/',
      name: 'home',
      component:Home,
      children:[
        {
          name:'user',
          path:'/user',
          component:User
        },
        {
          name:'right',
          path:'/right',
          component:Right
        }
      ]
    }
  ]
})
