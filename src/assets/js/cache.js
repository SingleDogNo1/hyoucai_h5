import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token) {
  Cookies.set('token', token)
}

export function getUser() {
  return Cookies.getJSON('user')
}

export function setUser(user) {
  Cookies.set('user', user)
}

export function removeUser() {
  Cookies.remove('user')
}

export function getUserBasicInfo() {
  return Cookies.getJSON('userBasicInfo')
}

export function setUserBasicInfo(info) {
  Cookies.set('userBasicInfo', info)
}

export function removeUserBasicInfo() {
  Cookies.remove('userBasicInfo')
}

export function getRegisterMobile() {
  return Cookies.getJSON('registerMobile')
}

export function setRegisterMobile(mobile) {
  Cookies.set('registerMobile', mobile)
}

export function getErrorNum() {
  return Cookies.getJSON('errorNum')
}

export function setErrorNum(errorNum) {
  Cookies.set('errorNum', errorNum)
}

export function setLoginUsername(username) {
  Cookies.set('loginUsername', username)
}

export function getLoginUsername() {
  return Cookies.get('loginUsername')
}

export function setInvTotalAmt(invTotalAmt) {
  Cookies.set('invTotalAmt', invTotalAmt)
}

export function getInvTotalAmt() {
  return Cookies.get('invTotalAmt')
}

export function setTackBackInt(tackBackInt) {
  Cookies.set('tackBackInt', tackBackInt)
}

export function getTackBackInt() {
  return Cookies.get('tackBackInt')
}

export function getPersonalAccount() {
  return Cookies.getJSON('personalAccount')
}

export function setPersonalAccount(personalAccount) {
  Cookies.set('personalAccount', personalAccount)
}

export function removePersonalAccount() {
  Cookies.remove('personalAccount')
}
