import axios from '@/assets/js/requestHYC'
import Qs from 'qs'

// 优质计划
export function collectionApi(data) {
  // 出借列表
  return axios({
    url: '/collection/investList',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

export function projectApi(data) {
  return new Promise((resolve, reject) => {
    axios.post('/project/investList', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export function getLoanDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/collection/loanDetail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

export function getBorrowerDetail(data) {
  return new Promise((resolve, reject) => {
    axios.post('/jxLoanPeopleInfo/detail', Qs.stringify(data)).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}

// 散标项目详情
export function getProjectDetail(data, authorization) {
  return axios({
    url: 'project/projectDetail',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      authorization: authorization
    }
  })
}

// 优质计划产品详情
export function getProductDetail(data, authorization) {
  return axios({
    url: 'collection/investDetail',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      authorization: authorization
    }
  })
}
