import request from '@/assets/js/requestDJS'
import qs from 'qs'

//未读信息标识
function getUnReadMessage(data) {
  return request({
    url: '/UnReadMessage/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}

//加息券消息中心接口
function getCouponMessage(data) {
  return request({
    url: '/CouponMessage/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}

//红包消息中心接口
function getRedPacketMessage(data) {
  return request({
    url: '/RedPacketMessage/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}

//体验金消息接口
function getTasteGoldMsg(data) {
  return request({
    url: '/tasteGoldMessage/2.0',
    method: 'post',
    data: qs.stringify(data)
  })
}

//复投消息中心接口
function getRepeatMsg(data) {
  return request({
    url: '/RepeatMsg/2.0',
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

export default {
  getUnReadMessage, //未读信息标识获取
  getCouponMessage, //加息券消息中心接口
  getRedPacketMessage, //红包消息接口
  getTasteGoldMsg, //体验金消息接口
  getRepeatMsg, //复投消息接口
  getUpdateMessage //消息标记成已读接口
}
