import axios from '@/assets/js/axios'
import qs from 'qs'

function QueryQATypeApi(data, headers) {
  return axios({
    url: 'QueryQAType',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

function serviceTelApi(data, headers) {
  return axios({
    url: 'extendApi/queryExtend',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

function QueryQuestionAnswerApi(data, headers) {
  return axios({
    url: 'QueryQuestionAnswer',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export {
  QueryQATypeApi, // QA类别查询
  serviceTelApi, // 扩展信息获取接口
  QueryQuestionAnswerApi // 查询QA信息
}
