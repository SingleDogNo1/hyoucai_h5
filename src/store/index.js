import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/register'
import login from './modules/login'
import user from './modules/user'
import platform from './modules/common'
import djsLend from './modules/djsLend'
import hycLend from './modules/hycLend'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    login,
    register,
    user,
    platform,
    djsLend,
    hycLend
  },
  getters
})

export default store
