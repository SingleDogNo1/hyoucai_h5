import { Toast, Indicator } from 'mint-ui'

const il8n = {
  promptMsg: {
    register: '注册中',
    login: '正在登录',
    waiting: '请等待',
    smsCode: '获取短信验证码'
  },
  validateTips: {
    // 短信验证码
    sms_code: '验证码',

    // 手机号
    mobile: '手机号',
    oldMobile: '原手机号',
    newMobile: '新手机号',
    reservedMobile: '银行预留手机号',

    // 密码
    password: '密码',
    oldPassword: '原密码',
    newPassword: '新密码',

    // 其他类型
    noNetwork: '网络请求失败，请稍后重试。',
    ModifySuccess: '修改成功',
    smsCodeSendSuccess: '验证码已发送到您的手机，请注意查收!',
    unbindBankCard: '成功解绑银行卡',
    name: '姓名',
    idCardNum: '身份证号码',
    bankCardNum: '银行卡号',
    captchaCode: '图片验证码',
    account: '账号',
    amount: '金额',
    unionBankNo: '联行号',
    chargeAmount: '充值金额',
    toCashAmount: '提现金额',
    investAmount: '出借金额',
    loginNameFormat: '登录名只能包含字母、数字、_、-、/',
    IDCardNumFormat: '身份证号只允许数字和英文X',
    IDCardNumOverstep: '身份证号位数不能超过18位',
    IDCardNumShort: '身份证号位数不足18位',
    needAgreement: '请勾选协议',
    passwordMaxlength: '密码最大位数为20位，请重新输入。',
    recCode: '推荐码输入有误',
    chineseName: '请输入中文字符',
    idCardErr: '身份证号码输入有误'
  }
}

export const AppToast = {
  direct(item, during) {
    // 保持原格式输出
    return Toast({
      message: il8n.validateTips[item],
      duration: during === undefined ? 3000 : during
    })
  },
  empty(item) {
    // 请输入账号 | 请认真阅读并同意上述协议
    if (item === 'agreement') {
      return Toast('请认真阅读并同意上述协议。')
    } else {
      return Toast('请输入' + il8n.validateTips[item] + '。')
    }
  },
  correct(item) {
    // 请输入正确的密码
    if (item === 'smsCode') {
      return Toast('验证码格式输入有误，请重新输入。')
    } else if (item === 'password') {
      return Toast('请输入8位以上数字和英文组合。')
    } else {
      return Toast('请输入正确的' + il8n.validateTips[item] + '。')
    }
  },
  retentionNumber(item, val) {
    Toast(il8n.validateTips[item] + '请保留' + val + '小数。')
  },
  compare(item) {
    // 两次密码输入不一致，请重新输入。
    return Toast('两次' + il8n.validateTips[item] + '输入不一致，请重新输入。')
  },
  confirm(item) {
    // 请再次输入账号
    return Toast('请再次输入' + il8n.validateTips[item] + '!')
  },
  overstep(item, num) {
    // 手机号位数不能超过11位
    return Toast(il8n.validateTips[item] + '位数不能超过' + num + '位，请查证后重新输入。')
  },
  short(item, num) {
    // 手机号不足11位
    return Toast(il8n.validateTips[item] + '不足' + num + '位，请查证后重新输入。')
  },
  minVal(item, val, type) {
    // 充值金额不得小于100元
    let toast = null
    if (type) {
      toast = Toast(type + il8n.validateTips[item] + '不得小于' + val + '。')
    } else {
      toast = Toast(il8n.validateTips[item] + '不得小于' + val + '。')
    }
    return toast
  },
  maxVal(item, val, type) {
    // 实时提现金额不得大于5万
    let toast = null
    if (type) {
      toast = Toast(type + il8n.validateTips[item] + '不得大于' + val + '。')
    } else {
      toast = Toast(il8n.validateTips[item] + '不得大于' + val + '。')
    }
    return toast
  }
}

export const AppIndicator = {
  open(item) {
    return Indicator.open({
      spinnerType: 'fading-circle',
      text: il8n.promptMsg[item] + '...'
    })
  },
  close() {
    return Indicator.close()
  }
}
