import request from '@/assets/js/requestHYC'

// 当前平台展现标识
export function showFlag() {
  return request({
    url: 'Platform/showFlag',
    method: 'POST'
  })
}

// 举报电话查询接口
export function reportTelephoneApi() {
  return request({
    url: 'reportTelephone/query',
    method: 'POST'
  })
}
