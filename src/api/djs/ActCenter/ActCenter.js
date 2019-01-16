import axios from '@/assets/js/requestDJS'
import qs from 'qs'

function getHotApi(data) {
  return axios({
    url: 'activity/getHot',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getHotApi // 热门活动列表接口
}
