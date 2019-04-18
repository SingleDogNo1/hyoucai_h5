import request from '@/assets/js/requestDJS'
import qs from 'qs'

//加息券未读消息中心接口
function getCouponUnreadCount(data) {
  return request({
    url: '/CouponUnreadMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
//红包消息接口
function getRedPacketCount(data) {
  return request({
    url: '/RedPacketMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
//体验金消息接口
function getTasteGoldCount(data) {
  return request({
    url: '/tasteGoldMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
//复投消息接口
function getRepeatUnreadCount(data) {
  return request({
    url: '/RepeatUnreadMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}
export default {
  getCouponUnreadCount, // 加息券未读消息
  getRedPacketCount, //红包消息
  getTasteGoldCount, //体验金消息
  getRepeatUnreadCount //复投消息
}
