import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 账户金额信息
export function amountInfo(data) {
  return request({
    url: '/PersonalAccount',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 复投消息中心接口
export function repeatInvestApi(data) {
  return request({
    url: 'ExpireProject',
    method: 'post',
    data: qs.stringify(data)
  })
}

//消息标记成已读接口
export function UpdateMessageApi(data) {
  return request({
    url: 'ExpireRepeat',
    method: 'post',
    data: qs.stringify(data)
  })
}
