import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getRecommenderApi(data, headers) {
  return axios({
    url: 'user/getRecommendUserList',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export default {
  getRecommenderApi
}
