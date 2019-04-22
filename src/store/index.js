import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/register'
import login from './modules/login'
import user from './modules/user'
import platform from './modules/common'
import djsLend from './modules/djsLend'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    register,
    user,
    platform,
    djsLend
  },
  getters
})

export default store
