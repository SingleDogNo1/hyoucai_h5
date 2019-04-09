import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 当前平台展现标识
export function showFlag(data) {
  return request({
    url: 'Platform/showFlag',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 举报电话查询接口
export function reportTelephoneApi(data) {
  return request({
    url: 'reportTelephone/query',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 是否有未读站内信
export function getUnreadMsgApi(data) {
  return request({
    url: 'siteMessage/haveUnreadMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
