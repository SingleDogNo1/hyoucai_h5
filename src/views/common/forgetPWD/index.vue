<template>
  <div class="forget-pwd pageContainer">
    <AppHeader :title="title" :mobileValue="isAppTitle"></AppHeader>
    <div class="login-form">
      <header class="logo"></header>
      <h6 class="slogan">唯有赚钱不能停</h6>
      <p v-if="step === 0">当前登录使用手机号：
        <span>{{registerMobile | splitTelNum}}</span>
      </p>
      <p v-if="step === 1">为您的账号重新设置一个密码</p>
      <div class="sms-code" v-if="step === 0">
        <input
          type="tel"
          maxlength="6"
          autofocus="autofocus"
          placeholder="请输入短信验证码"
          v-model="smsCode" />
        <SMSBtn
          class="sms-btn"
          ref="smsBtn"
          @getSMSCode="sendSMSCode"
        />
      </div>
      <div class="sms-code" v-if="step === 1">
        <input
          type="password"
          maxlength="20"
          autofocus="autofocus"
          placeholder="请输入密码(8位及以上数字加英文组合)"
          v-model="password" />
        <password-strength
          class="password-strength"
          :pwd="password"
          v-show="password !== ''"
        ></password-strength>
      </div>
      <input
        type="button"
        value="下一步"
        v-if="step === 0"
        :disabled="smsCode === ''"
        @click="nextStep"
      >
      <input
        type="button"
        value="确认并登录"
        v-if="step === 1"
        :disabled="password === ''"
        @click="login"
      >
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { mapGetters } from 'vuex'
import SMSBtn from '@/components/smsBtn'
import PasswordStrength from '@/components/passwordStrength'
import { captchaId } from '@/assets/js/const'
import { smsLogin, forgetPwdResetCode } from '@/api/common/login'
import { forgetPwdCodeApi } from '@/api/common/forgetPWD'
import { Toast } from 'mint-ui'

export default {
  name: 'forgetPWD',
  components: {
    AppHeader,
    SMSBtn,
    PasswordStrength
  },
  data() {
    return {
      isAppTitle: this.$route.query.mobile,
      title: '汇有财',
      smsCode: '',
      step: 0, // 记录忘记密码的流程 0： 输入验证码 1： 可以重置密码
      password: ''
    }
  },
  computed: {
    ...mapGetters(['registerMobile'])
  },
  methods: {
    sendSMSCode() {
      smsLogin({
        mobile: this.registerMobile,
        captchaId,
        validate: this.validate_sms
      }).then(res => {
        this.$refs.smsBtn.countDown()
        if (res.data.resultCode !== '1') {
          Toast('验证码发送失败')
        }
      })
    },
    nextStep() {
      forgetPwdCodeApi({
        mobile: this.registerMobile,
        verifyCode: this.smsCode
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.step++
        } else {
          Toast(res.data.resultMsg)
        }
        console.log(res.data)
      })
    },
    login() {
      forgetPwdResetCode({
        mobile: this.registerMobile,
        newPassword: this.password
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.$router.push({
            name: 'AppDownload'
          })
        } else {
          Toast(res.data.resultMsg)
        }
      })
    }
  },
  filters: {
    splitTelNum: function(value) {
      value = value.toString()
      return `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7)}`
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
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
  width: 100%;
  top: 0.44rem;
  bottom: 0;
  box-sizing: border-box;
  &.forget-pwd {
    height: auto;
    padding-top: 0.2rem;
    background: #fff;
    .login-form {
      .logo {
        @include cube(1.36rem, 0.45rem);
        margin: 0 auto;
        @include bg-image(Hyoucai_logo);
        background-size: contain;
      }
      .slogan {
        position: relative;
        font-size: 0.15rem;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        margin: 0.07rem auto 0.43rem;
        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 0.7em;
          height: 1px;
          background: rgba(0, 0, 0, 0.5);
          top: 50%;
          left: 50%;
          margin-left: -0.7rem;
        }
        &:after {
          margin-left: 0.6rem;
        }
      }
      p {
        width: 3.45rem;
        margin: 0 auto 0.1rem;
        font-size: 0.13rem;
        color: #666;
        line-height: 0.18rem;
        span {
          color: #151515;
        }
      }
      .sms-code {
        display: flex;
        justify-content: space-between;
        width: 3.45rem;
        height: 0.45rem;
        margin: 0 auto 0.34rem;
        position: relative;
        input {
          margin: 0 auto;
          display: block;
          width: 3.45rem;
          height: 0.45rem;
          font-size: 0.13rem;
          color: #999999;
          border-bottom: 0.01rem solid #f4f4f4;
        }
        .password-strength {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
          height: 0.25rem;
          /deep/ .part {
            width: 0.3rem;
            p {
              font-size: 0.1rem;
            }
          }
        }
        .sms-btn {
          width: 1rem;
          border-bottom: 1px solid #f4f4f4;
          /deep/ input {
            line-height: 0.45rem;
            font-size: 0.13rem;
          }
        }
      }
      > input[type='button'] {
        margin: 0 auto;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        border-radius: 0.04rem;
        font-size: 0.15rem;
        color: #ffffff;
        background: $color-main;
        &:disabled {
          background: #ccc;
        }
      }
      button {
        &.active {
        }
      }
      .other {
        display: flex;
        justify-content: space-between;
        width: 3.45rem;
        margin: 0.16rem auto 0;
        color: $color-main;
        font-size: 0.15rem;
        line-height: 0.21rem;
        span {
        }
      }
    }
  }
}
</style>
