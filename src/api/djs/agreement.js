import axios from '@/assets/js/requestDJS'
import qs from 'qs'

// 查询债权转让协议填充数据
function bondProtocolApi(data, headers) {
  return axios({
    url: 'BondProtocol',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export { bondProtocolApi }
