import { getErrorNum, setErrorNum } from '@/assets/js/cache'
const login = {
  state: {
    errorNum: getErrorNum() || 0
  },

  mutations: {
    SET_ERROR_NUM: (state, errorNum) => {
      state.errorNum = errorNum
      setErrorNum(errorNum)
    }
  }
}

export default login
