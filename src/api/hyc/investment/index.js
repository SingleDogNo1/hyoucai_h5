import axios from '@/assets/js/requestHYC'
import Qs from 'qs'

function collectionApi(data) {
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

function pageConfig(data) {
  return axios({
    url: '/pageConfig/getPageConfig',
    method: 'post',
    data: Qs.stringify(data),
    headers: {
      version: '2.0'
    }
  })
}

function projectApi(data) {
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

function getLoanDetail(data) {
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

function getBorrowerDetail(data) {
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

function getProjectDetail(data, authorization) {
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

function getProductDetail(data, authorization) {
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

export {
  collectionApi, // 优质计划
  projectApi, // 散标
  pageConfig, // 获取分类
  getLoanDetail,
  getBorrowerDetail,
  getProjectDetail, // 散标项目详情
  getProductDetail // 优质计划产品详情
}
