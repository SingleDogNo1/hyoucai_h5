import {
  getUser,
  setUser,
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
    user: getUser(),
    userBasicInfo: getUserBasicInfo(),
    personalAccount: getPersonalAccount()
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
