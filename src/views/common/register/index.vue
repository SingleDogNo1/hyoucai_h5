<template>
  <div class="register">
    <section>
      <div class="block sms-code">
        <input ref="smsInput" type="tel" placeholder="请输入短信验证码" maxlength="6" v-model="form.identifyCode" @blur="smsCodeBlur" />
        <SMSBtn class="sms-btn" ref="smsBtn" @getSMSCode="sendSMSCode" />
      </div>
      <div class="block pwd">
        <input ref="pwdInput" type="password" v-model="form.passWord" placeholder="输入8-20位字母和数字组合" maxlength="20" @blur="passwordBlur" />
        <password-strength class="password-strength" :pwd="form.passWord" v-show="form.passWord !== ''"></password-strength>
      </div>
      <div class="block repeat-pwd">
        <input ref="repeatPWDInput" type="password" v-model="form.repeatPassword" placeholder="请再次输入密码" @blur="repeatPWDInput" />
      </div>

      <div class="block invite-code" v-if="cpm">
        <input type="text" :disabled="disableInviteCode" v-model="inviteCode" placeholder="输入推荐码(选填)" />
      </div>
      <div class="form-item" v-if="tjm">
        <input type="text" :disabled="disableInviteCode" v-model="recommendCode" placeholder="输入推荐码(选填)" />
      </div>
      <input
        :class="[
          'block',
          'submit',
          {
            active: form.identifyCode && form.passWord.length >= 8 && form.repeatPassword.length >= 8
          }
        ]"
        type="button"
        value="注册"
        :disabled="!form.identifyCode || !form.passWord || !form.repeatPassword"
        @click="register"
      />
      <p class="agre">注册即表示同意<span @mousedown.stop="toAgreement">《汇有财注册协议》</span></p>
      <div id="captcha"></div>
    </section>
  </div>
</template>

<script>
import PasswordStrength from '@/components/passwordStrength'
import SMSBtn from '@/components/smsBtn'
import { isMobCode, isPassword } from '@/assets/js/regular'
import { mapGetters, mapMutations } from 'vuex'
import { cpmOrTjm, getSmsCode, userRegister, validateCPM, validateTJM } from '@/api/common/register'
import { getUserCompleteInfoApi } from '@/api/common/mine'
import { captchaId } from '@/assets/js/const'
import { Toast } from 'mint-ui'
import { userLogin } from '@/api/common/login'
import Cookie from 'js-cookie'

export default {
  name: 'register',
  mixins: [],
  components: {
    PasswordStrength,
    SMSBtn
  },
  data() {
    return {
      title: '欢迎注册汇有财',
      isAppTitle: this.$route.query.mobile,
      form: {
        identifyCode: '',
        passWord: '',
        repeatPassword: '',
        registerFrom: 'h5'
      },
      inviteCode: undefined,
      recommendCode: undefined,
      cpm: false, // 钞票码显隐标识
      tjm: false, // 推荐码显隐标识
      captchaIns: null, // 滑块验证码实例
      validate: '', // 滑块验证码二次验证信息
      countDownText: '获取验证码',
      hasCountDown: false,
      errorMsg: '',
      isFormComplete: false,
      disableInviteCode: Cookie.get('app-invite-code')
    }
  },
  computed: {
    ...mapGetters(['user', 'registerMobile', 'platform'])
  },
  methods: {
    sendSMSCode() {
      this.captchaIns && this.captchaIns.popUp()
    },
    getSmsCode() {
      getSmsCode({
        mobile: this.registerMobile,
        captchaId,
        validate: this.validate
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.$refs.smsBtn.countDown()
        } else {
          Toast(res.data.data.resultMsg)
        }
      })
    },
    smsCodeBlur() {
      if (!this.form.identifyCode) {
        Toast('请输入短信验证码')
        return
      }
      return this.form.identifyCode
    },
    passwordBlur() {
      if (this.smsCodeBlur()) {
        if (!this.form.passWord) {
          Toast('请输入密码')
          return
        }
        return this.form.passWord
      }
    },
    repeatPWDInput() {
      if (this.passwordBlur()) {
        if (!this.form.repeatPassword) {
          Toast('请重新输入密码')
          return
        }
        return this.form.repeatPassword
      }
    },
    async register() {
      if (!isMobCode(this.form.identifyCode)) {
        Toast('短信验证码格式错误')
      } else if (!isPassword(this.form.passWord)) {
        Toast('密码格式错误')
      } else if (this.form.repeatPassword !== this.form.passWord) {
        Toast('两次密码输入不一致，请重新输入')
      } else {
        if (this.cpm && this.inviteCode) {
          await new Promise((resolve, reject) => {
            validateCPM({
              inviteCode: this.inviteCode
            }).then(res => {
              if (res.data.data) {
                resolve()
              } else {
                Toast('推荐码不正确')
                reject()
              }
            })
          })
        }

        if (this.tjm && this.recommendCode) {
          await new Promise((resolve, reject) => {
            validateTJM({
              recommendCode: this.recommendCode
            }).then(res => {
              if (res.data.data) {
                resolve()
              } else {
                Toast('推荐码不正确')
                reject()
              }
            })
          })
        }
        userRegister(
          Object.assign(this.form, {
            mobile: this.registerMobile,
            inviteCode: this.inviteCode ? this.inviteCode : undefined,
            recommendCode: this.recommendCode ? this.recommendCode : undefined
          })
        )
          .then(res => {
            if (res.data.resultCode === '1') {
              return userLogin({
                userName: this.registerMobile,
                passWord: btoa(this.form.passWord)
              })
            } else {
              Toast(res.data.resultMsg)
              throw new Error()
            }
          })
          .then(res => {
            if (res.data.resultCode === '1') {
              let user = res.data.data
              this.setUser(user)
              getUserCompleteInfoApi().then(res => {
                if (res.data.resultCode === '1') {
                  const data = res.data.data
                  switch (data.status) {
                    case 'OPEN_ACCOUNT':
                      this.$router.push({ name: 'remindOpenAccount' })
                      break
                    case 'REAL_NAME':
                      this.$router.push({ name: 'realNameAuthCheckName' })
                      break
                  }
                } else {
                  Toast(res.data.resultMsg)
                }
              })
            } else {
              Toast(res.data.resultMsg)
            }
          })
      }
    },
    toAgreement() {
      this.$router.push({
        name: 'HYCAgreement',
        query: {
          agreementType: 'zcxy'
        }
      })
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },
  created() {
    cpmOrTjm().then(res => {
      if (res.data.resultCode === '1') {
        this.cpm = res.data.data.cpm === 'true'
        this.tjm = res.data.data.tjm === 'true'
        if (this.cpm) {
          this.inviteCode = Cookie.get('app-invite-code') ? Cookie.get('app-invite-code') : undefined
        }
        if (this.tjm) {
          this.recommendCode = Cookie.get('app-invite-code') ? Cookie.get('app-invite-code') : undefined
        }
      }
    })
    window.initNECaptcha(
      {
        // config对象，参数配置
        captchaId: captchaId,
        width: '320px',
        element: '#captcha',
        mode: 'popup',
        onVerify: (err, data) => {
          this.validate = data.validate
          this.getSmsCode()
        },
        onClose: () => {
          this.captchaIns.refresh()
        }
      },
      instance => {
        this.captchaIns = instance
      }
    )
  },
  beforeRouteLeave(to, from, next) {
    const toastWrapper = document.getElementsByClassName('mint-toast')
    for (let i = 0; i < toastWrapper.length; i++) {
      toastWrapper[i].style.display = 'none'
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';

input {
  color: #333;
  transition: 0.3s;
  &::placeholder {
    color: #999;
  }
}
.register {
  background: #ffffff;
  padding-top: 0.23rem;
  .block {
    width: 3.45rem;
    height: 0.45rem;
    margin: 0 auto;
    &.sms-code {
      padding-top: 0.2rem;
      display: flex;
      justify-content: space-between;
      input {
        width: 2.2rem;
        font-size: $font-size-small-ss;
        border-bottom: 1px solid #f4f4f4;
        &:focus {
          border-bottom: 1px solid red;
        }
      }
      .sms-btn {
        width: 1rem;
        border-bottom: 1px solid #f4f4f4;
      }
    }
    &.pwd {
      display: flex;
      transition: 0.3s;
      position: relative;
      input {
        width: 100%;
        padding-top: 0.2rem;
        font-size: $font-size-small-ss;
        border-bottom: 1px solid #f4f4f4;
        &:focus {
          border-bottom: 1px solid red;
        }
      }
      .password-strength {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        height: 0.25rem;
      }
    }
    &.repeat-pwd {
      display: flex;
      transition: 0.3s;
      position: relative;
      input {
        width: 100%;
        padding-top: 0.2rem;
        font-size: $font-size-small-ss;
        border-bottom: 1px solid #f4f4f4;
        &:focus {
          border-bottom: 1px solid red;
        }
      }
    }
    &.invite-code {
      display: flex;
      transition: 0.3s;
      position: relative;
      input {
        width: 100%;
        padding-top: 0.2rem;
        font-size: $font-size-small-ss;
        border-bottom: 1px solid #f4f4f4;
        &:focus {
          border-bottom: 1px solid red;
        }
      }
    }
    &.submit {
      display: block;
      margin-top: 0.3rem;
      background: #ccc;
      border-radius: 4px;
      font-size: 0.15rem;
      color: #fff;
      &.active {
        background: $color-main;
      }
    }
  }
  .agre {
    width: 3.45rem;
    margin: 0.2rem auto 0;
    font-size: 0.13rem;
    color: #666;
    span {
      color: $color-main;
    }
  }
}
</style>
