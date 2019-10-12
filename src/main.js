// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import Vuex from 'vuex'
import store from './store/store'


Vue.use(ElementUI);
Vue.use(Vuex);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// router.beforeEach((to, from, next) => {
//   if (to.fullPath !== '/'&&to.fullPath !== '/uregiste'&&sessionStorage.getItem('user')===null) {
//     next({
//       path: '/'
//     })
//     return
//   }
//   next()
// })
