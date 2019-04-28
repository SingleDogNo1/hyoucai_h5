import axios from '@/assets/js/requestHYC'
import Qs from 'qs'

// 出借详情
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

// 获取个人账户信息
export function getProjectDetail(data) {
  return axios({
    url: 'project/projectDetail',
    method: 'post',
    data: Qs.stringify(data)
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

// 获取投资记录
export function getInvestRecord(data) {
  return axios({
    url: '/collection/investRecord',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 债权详情
export function getLoanDetail(data) {
  return axios({
    url: '/collection/loanDetail',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 互联网资信报告
export function getInternetInformation(data) {
  return axios({
    url: '/auditInfo/internetInformation',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 借款人详细信息
export function getBorrowerDetail(data) {
  return axios({
    url: '/jxLoanPeopleInfo/detail',
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
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 查询用户可用加息券
export function availableCouponApi(data) {
  return axios({
    url: 'AvailableCoupon',
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
    url: 'InvestProject',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 到期自动复投
export function expireRepeatApi(data) {
  return axios({
    url: 'ExpireRepeat',
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
