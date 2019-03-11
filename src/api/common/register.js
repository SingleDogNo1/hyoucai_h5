import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 手机号是否存在
export function isExistUser(data) {
  return request({
    url: '/user/isExistUser',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 钞票码和推荐码显隐状态
export function cpmOrTjm() {
  return request({
    url: '/user/cpmOrTjm',
    method: 'post'
  })
}

// 获取注册验证码
export function getSmsCode(data) {
  return request({
    url: '/SmsRegisterCode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

// 用户注册
export function userRegister(data) {
  return request({
    url: '/UserRegister',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

// 校验钞票码
export function validateCPM(data) {
  return request({
    url: '/escrow/checkCode',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 校验推荐码
export function validateTJM(data) {
  return request({
    url: '/user/getRecommendUserName',
    method: 'post',
    data: qs.stringify(data)
  })
}
