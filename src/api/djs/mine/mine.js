import request from '@/assets/js/requestDJS'
import qs from 'qs'

function amountInfo(data) {
  return request({
    url: '/PersonalAccount',
    method: 'post',
    data: qs.stringify(data)
  })
}

export { amountInfo }
