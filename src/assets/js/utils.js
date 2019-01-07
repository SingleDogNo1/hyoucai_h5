import { Base64 } from 'js-base64'

export const Base64Utils = {
  objectToBase64(obj) {
    return Base64.encode(JSON.stringify(obj))
  },
  base64ToObject(str) {
    return str ? JSON.parse(Base64.decode(str)) : null
  }
}
