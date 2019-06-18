import request from '@/assets/js/requestDJS'
import Qs from 'qs'

export function userBankCardList(data) {
  return request({
    url: '/UserBankCardList',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

export function queryCardInfo(data) {
  return request({
    url: '/query_cardinfo',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

export function personalAccount(data) {
  return request({
    url: '/PersonalAccount',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

// 第一次充值校验
export function userRechargePreVerify(data) {
  return request({
    url: '/bankCard/userRechargePreVerify',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

export function rechargeApiDirectPayServer(data) {
  return request({
    url: '/RechargeApiDirectPayServer',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

export function unionPay(data) {
  return request({
    url: '/RechargeServer',
    method: 'POST',
    data: Qs.stringify(data)
  })
}

export function userAndBankInfo(data) {
  return request({
    url: '/userAndBankInfo',
    method: 'get',
    data: Qs.stringify(data)
  })
}
