import axios from '@/assets/js/axios'
import qs from 'qs'

function getEvaInvLimitApi(data) {
  return axios({
    url: 'evaluate/getEvaInvLimit',
    method: 'post',
    data: qs.stringify(data)
  })
}

function saveEvaluatingResultApi(data) {
  return axios({
    url: 'user/saveEvaluatingResult',
    method: 'post',
    data: qs.stringify(data)
  })
}

function userBasicInfo(data) {
  return axios({
    url: 'UserBasicInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getEvaInvLimitApi, // 获取风险测评各个级别对应的信息（限额、期限）
  saveEvaluatingResultApi, // 保存风险测评结果
  userBasicInfo
}
