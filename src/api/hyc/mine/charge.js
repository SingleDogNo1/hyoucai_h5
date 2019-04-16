import axios from '@/assets/js/requestHYC'
import Qs from 'qs'
// import serviceTelApi from './index'

function bankCardQueryApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/bankCardQuery/query', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function checkAmountApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/bank/checkAmount', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function rechargeApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/directRecharge/recharge', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

function amountInfoApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/personalAccount/amountInfo', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default {
  // serviceTelApi: serviceTelApi.serviceTelApi,
  bankCardQueryApi, // 银行卡号查询
  checkAmountApi, // 充值限额查询接口
  rechargeApi, // 充值接口（江西银行页面）
  amountInfoApi // 账户总览
}
