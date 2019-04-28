import request from '@/assets/js/requestHYC'
import qs from 'qs'

//历史卡券
export function couponPacketHistory(data) {
  return request({
    url: 'redPacketAndCoupon/couponPacketHistory',
    method: 'post',
    data: qs.stringify(data)
  })
}

//券包列表接口
export function CouponPacketList(data) {
  return request({
    url: 'redPacketAndCoupon/couponPacketList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//领取红包
export function ReceiveRedPacket(data) {
  return request({
    url: 'ReceiveRedPacket',
    method: 'post',
    data: qs.stringify(data)
  })
}

//领取加息券
export function ReceiveCoupon(data) {
  return request({
    url: 'ReceiveCoupon',
    method: 'post',
    data: qs.stringify(data)
  })
}
