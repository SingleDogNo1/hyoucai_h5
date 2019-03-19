import request from '@/assets/js/requestHYC'
import qs from 'qs'

function userLogin(data) {
  return request({
    url: '/UserLogin',
    method: 'post',
    data: qs.stringify(data)
  })
}

function userBasicInfo(data) {
  return request({
    url: '/UserBasicInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

function forgetPwdSendVerCode(data) {
  return request({
    url: '/ForgetPwdSendVerCode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

function forgetPwdConfirmCode(data) {
  return request({
    url: '/ForgetPwdConfirmCode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

function forgetPwdResetCode(data) {
  return request({
    url: '/ForgetPwdResetCode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}

function smsLogin(data) {
  return request({
    url: '/smsLogin',
    method: 'post',
    headers: {
      // version: '2.0'
    },
    data: qs.stringify(data)
  })
}

function userLoginVcode(data) {
  return request({
    url: '/UserLoginVcode',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
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
  userLogin, // 用户登录
  userBasicInfo, // 用户基本信息
  smsLogin, // 登录发送短信验证码
  forgetPwdSendVerCode, // 忘记密码发送验证码
  forgetPwdConfirmCode, // 验证验证码
  forgetPwdResetCode, // 重置密码
  userLoginVcode, // 短信验证码登录
  userLogout // 用户登出
}
