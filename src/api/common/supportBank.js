import axios from '@/assets/js/requestHYC'
import qs from 'qs'

// 查询支持的银行列表
export function supportBankListApi(data) {
  return axios({
    url: 'bank/supportBankList',
    method: 'post',
    data: qs.stringify(data)
  })
}
