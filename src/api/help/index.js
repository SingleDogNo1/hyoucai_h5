import axios from '@/assets/js/axios'
import qs from 'qs'

function QueryQATypeApi(data) {
  return axios({
    url: 'QueryQAType',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

function serviceTelApi(data) {
  return axios({
    url: 'extendApi/queryExtend',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

function QueryQuestionAnswerApi(data) {
  return axios({
    url: 'QueryQuestionAnswer',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export {
  QueryQATypeApi, // QA类别查询
  serviceTelApi, // 扩展信息获取接口
  QueryQuestionAnswerApi // 查询QA信息
}
