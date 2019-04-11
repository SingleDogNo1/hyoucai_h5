import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getProjectDetail(data, authorization) {
  return axios({
    url: 'project/projectDetail',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      authorization: authorization
    }
  })
}

function getProductDetail(data, authorization) {
  return axios({
    url: 'collection/investDetail',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      authorization: authorization
    }
  })
}

export {
  getProjectDetail, // 散标项目详情
  getProductDetail // 优质计划产品详情
}
