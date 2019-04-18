import axios from '@/assets/js/requestDJS'
import Qs from 'qs'

function getInvestDetail(data) {
  // 出借详情
  return axios({
    url: '/InvestCountProjectMsg',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '3.0'
    }
  })
}

function getClaimList(data) {
  return axios({
    url: '/BondProject',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取出借记录
function investUserCountMsg(data) {
  return axios({
    url: '/InvestUserCountMsg',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export {
  getInvestDetail, // 项目详情
  getClaimList, //债权列表
  investUserCountMsg //出借记录
}
