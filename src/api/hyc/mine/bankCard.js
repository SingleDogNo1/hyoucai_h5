import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getUserBankCardInfo(data) {
  return axios({
    url: 'bankCardQuery/query',
    method: 'post',
    data: qs.stringify(data)
  })
}

// function bindCardApi(data) {
// //   return axios({
// //     url: 'cardBindPage/bind',
// //     method: 'post',
// //     data: qs.stringify(data)
// //   })
// // }
// //
// // function unbindCardApi(data) {
// //   return axios({
// //     url: 'cardUnbind/unbindPage',
// //     method: 'post',
// //     data: qs.stringify(data)
// //   })
// // }

export {
  // bindCardApi,
  getUserBankCardInfo
  // unbindCardApi
}
