import { Base64 } from 'js-base64'

export const Base64Utils = {
  objectToBase64(obj) {
    return Base64.encode(JSON.stringify(obj))
  },
  base64ToObject(str) {
    return str ? JSON.parse(Base64.decode(str)) : null
  }
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
