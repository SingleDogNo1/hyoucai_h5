import axios from '@/assets/js/axios'
import qs from 'qs'

function supportBankListApi(data, headers) {
  return axios({
    url: 'bank/supportBankList',
    method: 'post',
    data: qs.stringify(data),
    headers: headers
  })
}

export {
  supportBankListApi // 查询支持的银行列表
}
