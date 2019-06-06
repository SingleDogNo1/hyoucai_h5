import Cookies from 'js-cookie'

const Hyoucai = {
  getItem: function(key) {
    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
      if (localStorage.getItem(key) && localStorage.getItem(key).indexOf('{') > -1) {
        return JSON.parse(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : ''
      } else {
        return localStorage.getItem(key) ? localStorage.getItem(key) : ''
      }
    } else {
      Cookies.get(key)
    }
  },
  setItem: function(key, value) {
    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
      if (typeof value === 'object') value = JSON.stringify(value)
      localStorage.setItem(key, value)
    } else {
      Cookies.set(key, value)
    }
  },
  removeItem: function(key) {
    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
      localStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  },
  removeAll: function() {
    _clearAllCookie()
    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
      localStorage.clear()
    }
  },
  getRetBaseURL: function() {
    let index = window.location.href.indexOf('#')
    return window.location.href.substr(0, index + 1)
  }
}

function _clearAllCookie() {
  let strCookie = document.cookie
  let arrCookie = strCookie.split('; ')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (arr.length > 0) {
      Cookies.remove(arr[0])
    }
  }
}

export default Hyoucai
