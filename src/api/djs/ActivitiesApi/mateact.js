import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getShareInfoApi(data) {
  return axios({
    url: 'activity/getShareInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getPageSinatureApi(data) {
  return axios({
    url: 'wechat/getPageSinature',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default {
  getShareInfoApi, // 获取活动分享信息
  getPageSinatureApi // 微信分享链接请求微信签名接口
}
