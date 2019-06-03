import Cookies from 'js-cookie'
const djsLend = {
  state: {
    djsLendAmount: Cookies.get('djsLendAmount') || '',
    djsLendCoupon: Cookies.getJSON('djsLendCoupon') || null,
    djsLendRedPacket: Cookies.getJSON('djsLendRedPacket') || null
  },
  mutations: {
    CHOOSE_DJS_COUPON: (state, coupon) => {
      state.djsLendCoupon = coupon
      Cookies.set('djsLendCoupon', coupon)
    },
    CHOOSE_DJS_REDPACKET: (state, redPacket) => {
      state.djsLendRedPacket = redPacket
      Cookies.set('djsLendRedPacket', redPacket)
    },
    CLEAN_DJS_COUPON: state => {
      state.djsLendCoupon = null
      Cookies.remove('djsLendCoupon')
    },
    CLEAN_DJS_REDPACKET: state => {
      state.djsLendRedPacket = null
      Cookies.remove('djsLendRedPacket')
    },
    CLEAN_DJS_LEND_DATA: state => {
      state.djsLendAmount = null
      state.djsLendCoupon = null
      state.djsLendRedPacket = null
      Cookies.remove('djsLendAmount')
      Cookies.remove('djsLendCoupon')
      Cookies.remove('djsLendRedPacket')
    }
  }
}

export default djsLend
