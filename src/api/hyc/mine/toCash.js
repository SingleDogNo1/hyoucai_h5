import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function bankCardQueryApi(data) {
  return axios({
    url: '/bankCardQuery/query',
    method: 'post',
    data: qs.stringify(data)
  })
}

function getBankUnionNumberUrlApi(data) {
  return axios({
    url: '/extendApi/getBankUnionNumberUrl',
    method: 'post',
    data: qs.stringify(data)
  })
}

function sysProvinceListApi(data) {
  return axios({
    url: '/SysProvinceList',
    method: 'post',
    data: qs.stringify(data)
  })
}

function sysCityListApi(data) {
  return axios({
    url: '/SysCityList',
    method: 'post',
    data: qs.stringify(data)
  })
}

function sysBankAreaListApi(data) {
  return axios({
    url: '/SysBankAreaList',
    method: 'post',
    data: qs.stringify(data)
  })
}

function sysBranceBankListApi(data) {
  return axios({
    url: '/SysBranceBankList',
    method: 'post',
    data: qs.stringify(data)
  })
}

function withdrawApi(data) {
  return axios({
    url: '/withdraw/withdraw',
    method: 'post',
    data: qs.stringify(data)
  })
}

function amountInfoApi(data) {
  return axios({
    url: '/personalAccount/amountInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  bankCardQueryApi, // 获取银行卡信息
  getBankUnionNumberUrlApi, // 联行号获取
  sysProvinceListApi, // 省份
  sysCityListApi, // 城市
  sysBankAreaListApi, // 区
  sysBranceBankListApi, // 银行
  withdrawApi, // 提现
  amountInfoApi // 获取账户余额
}
