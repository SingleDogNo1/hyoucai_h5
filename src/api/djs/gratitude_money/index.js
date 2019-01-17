import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getRecommenderApi(data) {
  return axios({
    url: 'user/getRecommendUserList',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  getRecommenderApi
}
