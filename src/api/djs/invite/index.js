import request from '@/assets/js/requestDJS'
import qs from 'qs'

// 查询用户的推荐码
// export function userInviteCode(data) {
//   return request({
//     url: '/user/myInviteCode',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }

// 用户二维码
export function getQRCode(data) {
  return request({
    url: '/QRCodeShare',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 邀请有礼、我推荐的人
export function userInviteInfo(data) {
  return request({
    url: '/user/userInviteInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 补录推荐码
export function saveInviteCode(data) {
  return request({
    url: '/ModifyInviteCode',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取协议
export function getProtocaol(data) {
  return request({
    url: 'obtainProtocol',
    method: 'post',
    headers: {
      version: '2.0'
    },
    data: qs.stringify(data)
  })
}
