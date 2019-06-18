import Cookies from 'js-cookie'

import {
  getUser,
  setUser,
  setAmountFlag,
  removeUser,
  getUserBasicInfo,
  setUserBasicInfo,
  removeUserBasicInfo,
  getPersonalAccount,
  setPersonalAccount,
  removePersonalAccount
} from '@/assets/js/cache'

const user = {
  state: {
    user: getUser() || null,
    userBasicInfo: getUserBasicInfo(),
    personalAccount: getPersonalAccount(),
    showAmount: Cookies.get('amountFlag') || false
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
      setUser(user)
    },
    SET_USERBASICINFO: (state, info) => {
      state.userBasicInfo = info
      setUserBasicInfo(info)
    },
    SET_PERSONALACCOUNT: (state, personalAccount) => {
      state.personalAccount = personalAccount
      setPersonalAccount(personalAccount)
    },
    SET_SHOW_AMOUNT_FLAG: (state, status) => {
      state.showAmount = status
      setAmountFlag(status)
    }
  },

  actions: {
    logout: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_USER', '')
        commit('SET_USERBASICINFO', '')
        commit('SET_PERSONALACCOUNT', '')
        removeUser()
        removeUserBasicInfo()
        removePersonalAccount()
        resolve()
      })
    }
  }
}

export default user
