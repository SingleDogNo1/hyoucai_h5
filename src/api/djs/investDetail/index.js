import axios from '@/assets/js/requestDJS'
import Qs from 'qs'

// 出借详情
export function getInvestDetail(data) {
  return axios({
    url: '/InvestCountProjectMsg',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '3.0'
    }
  })
}

//债权列表
export function getClaimList(data) {
  return axios({
    url: '/BondProject',
    method: 'post',
    data: Qs.stringify(data)
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
    url: 'AvailableRedPacket',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 查询用户可用加息券
export function availableCouponApi(data) {
  return axios({
    url: 'AvailableCoupon',
    method: 'post',
    data: Qs.stringify(data)
  })
}
