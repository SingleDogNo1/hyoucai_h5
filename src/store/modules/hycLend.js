import Cookies from 'js-cookie'
const hycLend = {
  state: {
    hycEasyAmount: Cookies.get('hycEasyAmount') || '',
    hycOptionAmount: Cookies.get('hycOptionAmount') || '',
    hycLendCoupon: Cookies.getJSON('hycLendCoupon') || null,
    hycLendRedPacket: Cookies.getJSON('hycLendRedPacket') || null,
    hycChooseCouponFlag: Cookies.get('hycCouponFlag') || true,
    hycChooseRedPacketFlag: Cookies.get('hycRedPacketFlag') || true
  },
  mutations: {
    CHOOSE_HYC_COUPON: (state, coupon) => {
      state.hycLendCoupon = coupon
      Cookies.set('hycLendCoupon', coupon)
    },
    CLEAN_HYC_COUPON: state => {
      state.hycLendCoupon = null
      Cookies.remove('hycLendCoupon')
    },
    CHOOSE_HYC_REDPACKET: (state, redPacket) => {
      state.hycLendRedPacket = redPacket
      Cookies.set('hycLendRedPacket', redPacket)
    },
    CLEAN_HYC_REDPACKET: state => {
      state.hycLendRedPacket = null
      Cookies.remove('hycLendRedPacket')
    },
    SET_HYC_CHOOSE_COUPON_FLAG: (state, value) => {
      state.hycChooseCouponFlag = value
      Cookies.set('hycCouponFlag', value)
    },
    SET_HYC_CHOOSE_REDPACKET_FLAG: (state, value) => {
      state.hycChooseRedPacketFlag = value
      Cookies.set('hycRedPacketFlag', value)
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
