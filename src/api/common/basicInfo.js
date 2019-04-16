import request from '@/assets/js/requestHYC'
import qs from 'qs'

// 获取基本信息
export function getBasicInfo(data) {
  return request({
    url: 'user/basicInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
