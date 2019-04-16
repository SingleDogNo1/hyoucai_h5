import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 用户信息完善提醒
export function userInfoCompleteNoticeApi(data) {
  return request({
    url: 'user/userInfoCompleteNotice',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 用户三要素验证
export function userInfoAuth(data) {
  return request({
    url: 'user/userInfoAuth',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询协议
export function queryAgreementCatalog(data) {
  return request({
    url: 'extendApi/queryAgreementCatalog',
    method: 'post',
    data: qs.stringify(data)
  })
}
