import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 忘记密码-验证手机验证码
export function forgetPwdCodeApi(data) {
  return request({
    url: 'ForgetPwdConfirmCode',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}
