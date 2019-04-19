import Cookies from 'js-cookie'
const djsLend = {
  state: {
    djsLendAmount: Cookies.get('djsLendAmount') || '',
    djsLendCoupon: Cookies.getJSON('djsLendCoupon') || null,
    djsLendRedPacket: Cookies.getJSON('djsLendRedPacket') || null
  },
  mutations: {
    SET_LEND_AMOUNT: (state, amount) => {
      state.djsLendAmount = amount
      Cookies.set('djsLendAmount', amount)
    },
    CHOOSE_COUPON: (state, coupon) => {
      state.djsLendCoupon = coupon
      Cookies.set('djsLendCoupon', coupon)
    },
    CHOOSE_REDPACKET: (state, redPacket) => {
      state.djsLendRedPacket = redPacket
      Cookies.set('djsLendRedPacket', redPacket)
    },
    CLEAN_LEND_DATA: state => {
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
