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
