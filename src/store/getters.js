const getters = {
  user: state => state.user.user,
  userBasicInfo: state => state.user.userBasicInfo,
  personalAccount: state => state.user.personalAccount,
  registerMobile: state => state.register.mobile, // 注册手机号
  errorNum: state => state.login.errorNum // 登录错误次数
}
export default getters
