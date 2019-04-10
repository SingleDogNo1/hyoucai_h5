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

//券包列表接口
export function CouponPacketList(data) {
  return request({
    url: 'CouponPacketList',
    method: 'post',
    data: qs.stringify(data)
  })
}
