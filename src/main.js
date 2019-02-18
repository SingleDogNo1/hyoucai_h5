import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/hyc-mint.scss'

import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'
// import VConsole from 'vconsole'
Vue.config.productionTip = false
Vue.use(Mint)
// new VConsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
