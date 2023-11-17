
// 새로운 라이브러리를 설치하면, 가장 상위 인스턴스인 본 파일 
// main.js에 추가해주어야 한다.


import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

//전역으로 axios 사용하기 위해 추가하는 구문
Vue.prototype.$axios = axios
//다른 컴포넌트에서 import 없이 this.$axios 로 사용 가능

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
