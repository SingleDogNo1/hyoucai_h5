import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getEvaInvLimitApi(data, headers) {
  return axios({
    url: 'evaluate/getEvaInvLimit',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

function saveEvaluatingResultApi(data, headers) {
  return axios({
    url: 'user/saveEvaluatingResult',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

function userBasicInfo(data, headers) {
  return axios({
    url: 'UserBasicInfo',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export {
  getEvaInvLimitApi, // 获取风险测评各个级别对应的信息（限额、期限）
  saveEvaluatingResultApi, // 保存风险测评结果
  userBasicInfo
}
