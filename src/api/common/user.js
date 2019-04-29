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

// 业务授权二合一协议
export function investorsAuth(data) {
  return request({
    url: '/termsAuth/investorsAuth',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 查询签约协议以及签约状态
export function queryKHAgreementList(data) {
  return request({
    url: '/extendApi/queryKHAgreementListNew',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取PDF地址
export function getProtocolPdf(data) {
  return request({
    url: '/protocol/getProtocolPdf',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 实名认证
export function realNameApi(data) {
  return request({
    url: 'RealNameCertification',
    method: 'post',
    data: qs.stringify(data)
  })
}
