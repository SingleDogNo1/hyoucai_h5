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

export default {
 
  getInvestDetail, // 项目详情
 
}
