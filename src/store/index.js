import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import register from './modules/register'
import login from './modules/login'
import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    register,
    user
  },
  getters
})

export default store
