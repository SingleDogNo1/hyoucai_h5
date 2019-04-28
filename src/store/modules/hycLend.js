import Cookies from 'js-cookie'
const hycLend = {
  state: {
    hycEasyAmount: Cookies.get('hycEasyAmount') || '',
    hycOptionAmount: Cookies.get('hycOptionAmount') || '',
    hycLendCoupon: Cookies.getJSON('hycLendCoupon') || null,
    hycLendRedPacket: Cookies.getJSON('hycLendRedPacket') || null
  },
  mutations: {
    CHOOSE_HYC_COUPON: (state, coupon) => {
      state.hycLendCoupon = coupon
      Cookies.set('hycLendCoupon', coupon)
    },
    CHOOSE_HYC_REDPACKET: (state, redPacket) => {
      state.hycLendRedPacket = redPacket
      Cookies.set('hycLendRedPacket', redPacket)
    },
    CLEAN_HYC_LEND_DATA: state => {
      state.hycEasyAmount = null
      state.hycLendCoupon = null
      state.hycLendRedPacket = null
      Cookies.remove('hycEasyAmount')
      Cookies.remove('hycOptionAmount')
      Cookies.remove('hycLendCoupon')
      Cookies.remove('hycLendRedPacket')
    }
  }
}

export default hycLend
