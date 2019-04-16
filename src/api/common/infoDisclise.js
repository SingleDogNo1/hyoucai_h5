import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getInfoApi(data) {
  return axios({
    url: 'info/operationalData',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  getInfoApi // 信息披露中心-运营数据
}
