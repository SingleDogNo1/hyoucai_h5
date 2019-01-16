import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getInfoApi(data, headers) {
  return axios({
    url: 'info/operationalData',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export {
  getInfoApi // 信息披露中心-运营数据
}
