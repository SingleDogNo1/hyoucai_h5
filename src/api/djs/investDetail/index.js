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
  return new Promise((resolve, reject) => {
    axios.post('/BondProject', Qs.stringify(data)).then(
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
  getInvestDetail, // 项目详情
  getClaimList //债权列表
}
