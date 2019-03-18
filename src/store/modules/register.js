import { getRegisterMobile, setRegisterMobile } from '@/assets/js/cache'
const register = {
  state: {
    mobile: getRegisterMobile()
  },

  mutations: {
    SET_REGISTER_MOBILE: (state, mobile) => {
      state.mobile = mobile
      setRegisterMobile(mobile)
    }
  },

  actions: {}
}

export default register
