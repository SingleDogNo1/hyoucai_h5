import axios from '@/assets/js/requestDJS'
import Qs from 'qs'

export function userBankCardList(data) {
  return axios({
    url: '/UserBankCardList',
    method: 'post',
    data: Qs.stringify(data)
  })
}
