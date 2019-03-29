import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function queryProgressApi(data) {
  return axios({
    url: 'spellGroup/query',
    method: 'post',
    data: qs.stringify(data)
  })
}

function joinActivityApi(data) {
  return axios({
    url: 'spellGroup/insert',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getSMSCodeApi(data) {
  return axios({
    url: 'smsVerifyCode',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  queryProgressApi, // 拼团活动进度查询
  joinActivityApi, // 拼团活动参与
  getSMSCodeApi // 获取短信验证码
}
