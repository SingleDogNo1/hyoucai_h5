import request from '@/assets/js/requestDJS'
import qs from 'qs'

//历史卡券
export function couponPacketHistory(data) {
  return request({
    url: 'couponPacketHistory',
    method: 'post',
    data: qs.stringify(data)
  })
}
