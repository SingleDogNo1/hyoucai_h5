import request from '@/assets/js/requestDJS'
import Qs from 'qs'

export function userBankCardList(data) {
  return request({
    url: '/UserBankCardList',
    method: 'POST',
    data: Qs.stringify(data)
  })
}
