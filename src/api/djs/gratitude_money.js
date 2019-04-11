import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getRecommenderApi(data, headers) {
  return axios({
    url: 'user/userInviteInfo',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export default {
  getRecommenderApi
}
