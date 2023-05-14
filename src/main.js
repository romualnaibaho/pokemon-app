import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '@/assets/scss/main.scss'

import router from '@/router/router'

Vue.config.productionTip = false

new Vue({
  style,
  router,
  render: h => h(App),
}).$mount('#app')
