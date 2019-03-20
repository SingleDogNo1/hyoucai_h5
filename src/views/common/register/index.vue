<template>
  <div class="register pageContainer">
    <AppHeader :title="title" :mobileValue="isAppTitle"></AppHeader>
    <section>
      <div class="block sms-code">
        <input
          ref="smsInput"
          type="number"
          autofocus="autofocus"
          placeholder="请输入短信验证码"
          maxlength="6"
          v-model="form.identifyCode"
          @blur="smsCodeBlur"
        />
        <SMSBtn
          class="sms-btn"
          ref="smsBtn"
          @getSMSCode="sendSMSCode"
        />
      </div>
      <div class="block pwd">
        <input
          ref="pwdInput"
          type="password"
          v-model="form.passWord"
          placeholder="输入8-20位字母和数字组合"
          maxlength="20"
          @blur="passwordBlur"
        />
        <password-strength class="password-strength" :pwd="form.passWord"></password-strength>
      </div>
      <div class="block repeat-pwd">
        <input
          ref="repeatPWDInput"
          type="password"
          v-model="form.repeatPassword"
          placeholder="请再次输入密码"
          @blur="repeatPWDInput"
        >
      </div>

      <div class="block invite-code" v-if="cpm">
        <input v-if="form.inviteCode" type="text" disabled="disabled" v-model="form.inviteCode" placeholder="">
        <input ref="inviteCodeInput" v-else type="text" v-model="form.inputInviteCode" placeholder="输入推荐码(选填)">
      </div>
      <div class="form-item" v-if="tjm">
        <input v-if="form.inviteCode" type="text" disabled="disabled" v-model="form.inviteCode" placeholder="">
        <input ref="inviteCodeInput" v-else type="text" v-model="form.inputRecommendCode" placeholder="输入推荐码(选填)">
      </div>
      <input
        :class="['block', 'submit', {
          active: form.identifyCode && form.passWord.length >= 8 && form.repeatPassword.length >= 8
        }]"
        type="button"
        value="注册"
        :disabled="!form.identifyCode || !form.passWord || !form.repeatPassword"
        @click="register"
      />
      <div id="captcha"></div>
    </section>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import PasswordStrength from '@/components/passwordStrength'
import SMSBtn from '@/components/smsBtn'
import { isMobCode, isPassword } from '@/assets/js/regular'
import { mapGetters, mapMutations } from 'vuex'
import { cpmOrTjm, getSmsCode, userRegister, validateCPM, validateTJM } from '@/api/common/register'
import { captchaId } from '@/assets/js/const'
import { Toast } from 'mint-ui'

export default {
  name: 'register',
  mixins: [],
  components: {
    AppHeader,
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
        inviteCode: this.$route.query.mediasource,
        recommendCode: this.$route.query.mediasource,
        inputInviteCode: '',
        inputRecommendCode: '',
        registerFrom: 'H5'
      },
      cpm: false, // 钞票码显隐标识
      tjm: false, // 推荐码显隐标识
      captchaIns: null, // 滑块验证码实例
      validate: '', // 滑块验证码二次验证信息
      countDownText: '获取验证码',
      hasCountDown: false,
      errorMsg: '',
      isFormComplete: false
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
      if (!isMobCode(this.form.identifyCode)) {
        Toast('短信验证码格式错误')
      }
      return isMobCode(this.form.identifyCode)
    },
    passwordBlur() {
      if (this.smsCodeBlur()) {
        if (!this.form.passWord) {
          Toast('请输入密码')
          return
        }
        if (!isPassword(this.form.passWord)) {
          Toast('密码格式错误')
        }
        return isPassword(this.form.passWord)
      }
    },
    repeatPWDInput() {
      if (this.passwordBlur()) {
        if (!this.form.repeatPassword) {
          Toast('请重新输入密码')
          return
        }
        if (this.form.repeatPassword !== this.form.passWord) {
          Toast('两次密码输入不一致，请重新输入')
          return
        }
        return this.form.repeatPassword === this.form.passWord
      }
    },
    async register() {
      if (this.form.repeatPassword === this.form.passWord) {
        if (this.cpm && this.form.inviteCode) {
          await new Promise((resolve, reject) => {
            validateCPM({
              inviteCode: this.form.inviteCode ? this.form.inviteCode : this.form.inputInviteCode
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

        if (this.tjm && this.form.recommendCode) {
          await new Promise((resolve, reject) => {
            validateTJM({
              recommendCode: this.form.recommendCode ? this.form.recommendCode : this.form.inputRecommendCode
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
            mobile: this.registerMobile
          })
        )
          .then(res => {
            if (res.data.dresultCode === '1') {
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
              // switch (this.user.platformFlag) {
              //   case '1':
              //     window.location.href = '/djs/#/bankAccount/openAccount'
              //     break
              //   case '2':
              //     window.location.href = '/hyc/#/bankAccount/openAccount'
              //     break
              //   default:
              //     this.$router.push({ name: 'account' })
              // }
              this.$router.push({
                name: 'AppDownload'
              })
            } else {
              Toast(res.data.resultMsg)
            }
          })
      } else {
        Toast('两次密码输入不一致，请重新输入')
      }
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

.pageContainer {
  position: absolute;
  top: 0.44rem;
  bottom: 0;
  width: 100%;
  height: auto;
  &.register {
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
  }
}
</style>
