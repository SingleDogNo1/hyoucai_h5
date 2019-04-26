import axios from '@/assets/js/requestHYC'
import Qs from 'qs'

// 出借详情
export function getInvestDetail(data) {
  return axios({
    url: '/collection/investDetail',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

//债权列表
export function getClaimList(data) {
  return axios({
    url: '/collection/loanRecord',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取投资记录
export function getInvestRecord(data) {
  return axios({
    url: '/collection/investRecord',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 债权详情
export function getLoanDetail(data) {
  return axios({
    url: '/collection/loanDetail',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 互联网资信报告
export function getInternetInformation(data) {
  return axios({
    url: '/auditInfo/internetInformation',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 借款人详细信息
export function getBorrowerDetail(data) {
  return axios({
    url: '/jxLoanPeopleInfo/detail',
    method: 'post',
    data: Qs.stringify(data)
  })
}
