function isMobile(str) {
  let reg = /^1[0-9]{10}$/
  return reg.test(str) ? !0 : !1
}

function isChName(str) {
  let reg = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
  return reg.test(str)
}

function isIdcard(str) {
  let reg = /(^\d{17}(\d|X)$)/i
  return reg.test(str)
}

function isMobCode(str) {
  let reg = /^\d{6}$/i
  return reg.test(str)
}

function isBankCard(str) {
  let reg = /^\d{16,19}$/
  return reg.test(str)
}

function isNum(str, type) {
  let regInt = /^[1-9]\d{0,}$/
  let regFloat = /(^[1-9]\d{0,}$)|(^[1-9]\d{0,}\.[0-9]{1,}$)/
  return type === 'float' ? regFloat.test(str) : regInt.test(str)
}

function isPassword(str) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  return reg.test(str)
}

export {
  isMobile, // 手机号
  isChName, // 中文名称
  isIdcard, // 身份证号
  isMobCode, // 手机验证码
  isBankCard, // 银行卡
  isNum, // 数字
  isPassword // 密码
}
