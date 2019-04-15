import { Base64 } from 'js-base64'
import { getUser } from './cache'
import requestHYC from './requestHYC'
import qs from 'qs'
import { Toast } from 'mint-ui'

export const Base64Utils = {
  objectToBase64(obj) {
    return Base64.encode(JSON.stringify(obj))
  },
  base64ToObject(str) {
    return str ? JSON.parse(Base64.decode(str)) : null
  }
}

export function getAuth() {
  const user = getUser()
  if (!user) return null
  let userName = user.userName
  let token = user.token
  let spile = Base64.encode(`${userName}:${token}`)
  return `DSCJ ${spile}`
}

export function uuid() {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

//格式化时间倒计时(将XXX秒格式化为X天 HH:MM:DD，status为0，倒计时停止)
/**
 * @param t {string | number} 倒计时时间
 * @param status {number} 为0时只读一次，不会每秒倒计时
 * @param callback {function} 成功回调
 * @callback data
 */
export function timeCountDown(t, status = 0, callback = () => {}) {
  let d = (t - (t % 86400)) / 86400
  let h = ((t - (t % 3600)) / 3600) % 24
  let i = ((t - (t % 60)) / 60) % 60
  let s = t % 60
  let stime = ''
  if (d > 0) {
    stime += d + '天'
  }
  stime += h < 10 ? '0' + h + ':' : h + ':'
  stime += i < 10 ? '0' + i + ':' : i + ':'
  stime += s < 10 ? '0' + s : s
  callback(stime)
  if (status === 0) return
  let timeOut = null
  t--
  if (t >= 0) {
    timeOut = setTimeout(() => {
      timeCountDown(t, status, callback)
    }, 1000)
  } else {
    clearTimeout(timeOut)
    // setTimeout(function() {
    //   timeCountDown(0, status, callback)
    // }, 1000)
  }
}

function postcall(url, params, target) {
  let tempform = document.createElement('form')
  tempform.setAttribute('name', 'form')
  tempform.action = url
  tempform.method = 'post'
  tempform.style.display = 'none'
  if (target) {
    tempform.target = target
  }

  for (let x in params) {
    let opt = document.createElement('input')
    opt.name = x
    opt.value = params[x]
    tempform.appendChild(opt)
  }

  let opt = document.createElement('input')
  opt.type = 'submit'
  opt.setAttribute('id', '_submit')
  tempform.appendChild(opt)
  document.body.appendChild(tempform)
  tempform.submit()
  document.body.removeChild(tempform)
}

/**
 * 接口跳转到江西银行
 * @param url String 请求的chunk地址
 * @param data Object 请求的参数
 */
export function JumpJX(url, data) {
  requestHYC({
    url: url,
    method: 'post',
    data: qs.stringify(data)
  }).then(res => {
    if (res.data.resultCode === '1') {
      const infoDict = res.data.data
      postcall(infoDict.redirectUrl, infoDict.paramReq)
    } else {
      Toast(res.data.resultMsg)
    }
  })
}

export function getRetBaseURL() {
  let index = window.location.href.indexOf('#')
  return window.location.href.substr(0, index + 1)
}

export function plusStar(str, frontNO, endNo) {
  if (str && str.length) {
    let len = Math.abs(frontNO - endNo)
    let star = ''.padStart(len, '*')
    return str.substring(0, frontNO) + star + str.substring(endNo)
  } else {
    return ''
  }
}
