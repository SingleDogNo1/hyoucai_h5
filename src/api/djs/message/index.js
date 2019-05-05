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

//加息券消息中心接口
function getCouponMessage(data) {
  return request({
    url: '/CouponMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//红包消息中心接口
function getRedPacketMessage(data) {
  return request({
    url: '/RedPacketMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//复投消息中心接口
function getRepeatMessage(data) {
  return request({
    url: '/RepeatMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//消息标记成已读接口
function getUpdateMessage(data) {
  return request({
    url: '/UpdateMessage',
    method: 'post',
    data: qs.stringify(data)
  })
}

//未读信息标识
function getUnReadMessage(data) {
  return request({
    url: '/UnReadMessage/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}
export default {
  getCouponUnreadCount, // 加息券未读消息
  getRedPacketCount, //红包消息
  getTasteGoldCount, //体验金消息
  getRepeatUnreadCount, //复投消息
  getCouponMessage, //加息券消息中心接口
  getUpdateMessage, //消息标记成已读接口
  getRedPacketMessage, //红包消息接口
  getRepeatMessage, //复投消息接口
  getUnReadMessage
}
