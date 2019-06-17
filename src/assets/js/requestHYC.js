import axios from 'axios'
import Router from '@/router/router'
import Hyoucai from '@/assets/js/hyoucai'
import { getAuth } from './utils'
import store from '@/store'
// import { Toast } from 'mint-ui'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_HYC_API,
  timeout: 30000,
  headers: {
    platform: 'h5',
    version: '1.0',
    'Content-type': 'application/x-www-form-urlencoded'
  }
})
$axios.interceptors.request.use(
  function(config) {
    if (getAuth()) {
      config.headers['authorization'] = getAuth()
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
      // Toast(response.data.resultMsg)
      // setTimeout(() => {
      //   Hyoucai.removeAll()
      //   Router.push({
      //     name: 'loginRegister'
      //   })
      // }, 2000)

      Hyoucai.removeAll()

      store.commit('user', null)

      Router.push({
        name: 'loginRegister'
      })
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: // 返回 401 跳转到登录页面
          Router.push({
            name: 'loginRegister'
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

export default $axios
