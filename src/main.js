// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.css'
import MyAxios from '@/plugins/MyAxios'
import moment from 'moment'
Vue.config.productionTip = false
// 注册
Vue.use(ElementUi)
Vue.use(MyAxios)
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
});

// 根目录
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
