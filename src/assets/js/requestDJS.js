import axios from 'axios'
import { Base64 } from 'js-base64'
import Router from '@/router'
import Hyoucai from '@/assets/js/hyoucai'

function getAuth() {
  let userInfo = Hyoucai.getItem('userInfo')
  if (!userInfo) return null
  let userName = userInfo.userName
  let token = userInfo.token
  let spile = Base64.encode(`${userName}:${token}`)
  return `DSCJ ${spile}`
}

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_DJS_API,
  timeout: 5000,
  headers: {
    platform: 'h5',
    'Content-type': 'application/x-www-form-urlencoded'
  }
})
$axios.interceptors.request.use(
  function(config) {
    if (getAuth()) {
      config.headers['authorization'] = authorization
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  response => {
    if (response.constructor.method !== 'options' && (response.data.resultCode === '505' || response.data.resultCode === '506')) {
      setTimeout(() => {
        Hyoucai.removeAll()
        Router.push({
          name: 'login'
        })
      }, 2000)
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: // 返回 401 跳转到登录页面
          Router.push({
            path: 'login'
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default $axios
