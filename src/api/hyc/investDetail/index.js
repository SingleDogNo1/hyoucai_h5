import axios from '@/assets/js/requestHYC'
import Qs from 'qs'

// 优质计划-标的详情
export function getInvestDetail(data) {
  return axios({
    url: '/collection/investDetail',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 散标-标的详情
export function getProjectDetail(data) {
  return axios({
    url: 'project/projectDetail',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

//债权列表
export function getClaimList(data) {
  return axios({
    url: '/collection/loanRecord',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取出借记录
export function investUserCountMsg(data) {
  return axios({
    url: '/InvestUserCountMsg',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 债权详情
export function getInternetInformation(data) {
  return axios({
    url: '/collection/loanDetail',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 预期收益计算
export function expectedIncome(data) {
  return axios({
    url: 'ExpectedIncome',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 券包最优搭配
export function couponPackageApi(data) {
  return axios({
    url: 'CouponPackage',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 查询用户可用红包
export function availableRedPacketApi(data) {
  return axios({
    url: 'redPacketAndCoupon/getAvailableRedPacket',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 查询用户可用加息券
export function availableCouponApi(data) {
  return axios({
    url: 'redPacketAndCoupon/getAvailableCoupon',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 用户投资
export function investApi(data) {
  return axios({
    url: 'userInvest/invest',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 获取个人账户信息
export function getPersonalAccount(data) {
  return axios({
    url: '/PersonalAccount',
    method: 'post',
    data: Qs.stringify(data)
  })
}
