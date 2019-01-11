import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'

Vue.config.productionTip = false
Vue.use(Mint)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
