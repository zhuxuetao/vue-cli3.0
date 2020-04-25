import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'common/sass/main.scss'
import 'common/Vant'
import { post, get } from 'common/axios'
import 'common/rem'
import './components'

Vue.prototype.$axios = { post, get }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
