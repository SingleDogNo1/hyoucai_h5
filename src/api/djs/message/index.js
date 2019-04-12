import request from '@/assets/js/requestDJS'
import qs from 'qs'

//公司简介/动态列表数据
function getList(data) {
  return request({
    url: '/siteMessage/query',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  getList, // 消息
}

