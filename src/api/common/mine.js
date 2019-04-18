import request from '@/assets/js/requestHYC'
import qs from 'qs'

function updateUserPsw(data) {
  return request({
    url: '/UpdateUserPsw',
    method: 'post',
    data: qs.stringify(data)
  })
}

function queryMailingAddress(data) {
  return request({
    url: '/QueryMailingAddress',
    method: 'post',
    data: qs.stringify(data)
  })
}

function saveMailingAddress(data) {
  return request({
    url: '/SaveMailingAddress',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

function userLogout(data) {
  return request({
    url: '/UserLogout',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  updateUserPsw, // 修改登录密码
  queryMailingAddress, // 查询收货地址
  saveMailingAddress, // 保存收货地址
  userLogout // 用户登出
}
