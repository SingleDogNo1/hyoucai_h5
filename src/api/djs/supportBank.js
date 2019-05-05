import axios from '@/assets/js/requestDJS'

export default function sysBankList() {
  return axios({
    url: 'SysBankList',
    method: 'get'
  })
}
