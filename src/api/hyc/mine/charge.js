import axios from '@/assets/js/requestHYC'
import Qs from 'qs'
// import serviceTelApi from './index'

function bankCardQueryApi(data) {
  return axios({
    url: '/bankCardQuery/query',
    method: 'post',
    data: Qs.stringify(data)
  })
}

function checkAmountApi(data) {
  return axios({
    url: '/bank/checkAmount',
    method: 'post',
    data: Qs.stringify(data)
  })
}

function rechargeApi(data) {
  return axios({
    url: '/directRecharge/recharge',
    method: 'post',
    data: Qs.stringify(data)
  })
}

function amountInfoApi(data) {
  return axios({
    url: '/personalAccount/amountInfo',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export default {
  // serviceTelApi: serviceTelApi.serviceTelApi,
  bankCardQueryApi, // 银行卡号查询
  checkAmountApi, // 充值限额查询接口
  rechargeApi, // 充值接口（江西银行页面）
  amountInfoApi // 账户总览
}
