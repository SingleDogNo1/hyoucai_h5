import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/hyc-mint.scss'

import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'
Vue.config.productionTip = false
Vue.use(Mint)

// import VConsole from 'vconsole'
// new VConsole()

// router.beforeEach((to,from,next) => {
//   console.log(to)
//   next(() => {
//     console.log(to,from)
//   })
//   // switch (to.name) {
//   //   // case 'home':
//   //   //   vm.title = to.meta.title
//   //   //   vm.isAppTitle = true
//   //   //   break
//   //   // default:
//   //   //   vm.title = to.meta.title
//   //   //   vm.isAppTitle = to.query.mobile
//   // }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
