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
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function personalAccount(data) {
  return request({
    url: '/PersonalAccount',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function userRechargePreVerify(data) {
  return request({
    url: '/bankCard/userRechargePreVerify',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function rechargeApiDirectPayServer(data) {
  return request({
    url: '/RechargeApiDirectPayServer',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function unionPay(data) {
  return request({
    url: '/RechargeServer',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function userAndBankInfo(data) {
  return request({
    url: '/userAndBankInfo',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}
