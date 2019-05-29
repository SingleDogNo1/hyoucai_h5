import request from '@/assets/js/requestDJS'
import qs from 'qs'

//用户资金交易记录
export function getUserTransaction(data) {
  return request({
    url: 'TrasactionList',
    method: 'post',
    data: qs.stringify(data)
  })
}

//用户充值提现记录
export function getTranByCzTxList(data) {
  return request({
    url: 'TranByCzTxList',
    method: 'post',
    data: qs.stringify(data)
  })
}
