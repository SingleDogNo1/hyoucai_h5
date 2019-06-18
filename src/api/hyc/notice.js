import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function noticeDetailApi(data) {
  return axios({
    url: 'ZxdtMtbdDetailMsg',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export {
  noticeDetailApi // QA类别查询
}
