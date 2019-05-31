import request from '@/assets/js/requestHYC'
import requestDJS from '@/assets/js/requestDJS'
import qs from 'qs'

// 修改登录密码
export function updateUserPsw(data) {
  return request({
    url: '/UpdateUserPsw',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询收货地址(汇有财)
export function queryHYCMailingAddress(data) {
  return request({
    url: '/QueryMailingAddress',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询收货地址(点金石)
export function queryDJSMailingAddress(data) {
  return requestDJS({
    url: '/QueryMailingAddress',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 保存收货地址
export function saveHYCMailingAddress(data) {
  return request({
    url: '/SaveMailingAddress',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 保存收货地址
export function saveDJSMailingAddress(data) {
  return requestDJS({
    url: '/SaveMailingAddress',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

// 用户登出
export function userLogout(data) {
  return request({
    url: '/UserLogout',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 签约、开户等状态
export function getUserCompleteInfoApi(data) {
  return request({
    url: 'user/userInfoCompleteNotice',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 签约、开户等状态
export function getAlertInfoApi(data) {
  return request({
    url: 'alert/alertInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 确认看到了弹窗（目前只有风险评测）
export function alertInfoAcceptApi(data) {
  return request({
    url: 'alert/alertInfoAccept',
    method: 'post',
    data: qs.stringify(data)
  })
}
