import request from '@/assets/js/requestHYC'
import qs from 'qs'

function amountInfo(data) {
  return request({
    url: '/personalAccount/amountInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

export { amountInfo }
