<template>
  <div class="login pageContainer">
    <AppHeader :title="title" :mobileValue="!isAppTitle" />
    <div class="login-form">
      <header class="logo"></header>
      <h6 class="slogan">唯有赚钱不能停</h6>
      <p>当前登录使用手机号：
        <span>{{registerMobile | splitTelNum}}</span>
      </p>
      <input
        v-if="isPassword"
        type="password"
        maxlength="20"
        autofocus="autofocus"
        placeholder="请输入密码(8位及以上数字加英文组合)"
        v-model="password" />
      <div class="sms-code" v-else>
        <input
          type="number"
          maxlength="11"
          autofocus="autofocus"
          placeholder="请输入短信验证码"
          v-model="smsCode" />
        <SMSBtn
          class="sms-btn"
          ref="smsBtn"
          @getSMSCode="sendSMSCode"
        />
      </div>
      <button :class="{active: activeBtn()}" @click="login">登录</button>
     <div class="other">
       <span v-if="isPassword" @click="isPassword = false">使用短信验证码登录</span>
       <span v-else @click="isPassword = true">使用密码登录</span>
       <span v-if="isPassword" @click="$router.push({name: 'forgetPWD'})">忘记密码</span>
     </div>
    </div>
    <div id="captcha_pwd"></div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { mapGetters, mapMutations } from 'vuex'
import { captchaId } from '@/assets/js/const'
import { userLogin, smsLogin, userLoginVcode } from '@/api/common/login'
import { setLoginUsername } from '@/assets/js/cache'
import { Toast } from 'mint-ui'
import SMSBtn from '@/components/smsBtn'

export default {
  name: 'login',
  components: {
    AppHeader,
    SMSBtn
  },
  data() {
    return {
      isAppTitle: this.$route.query.mobile,
      title: '汇有财',
      isPassword: true, // 是否是密码登录 ? 密码 : 短信验证码,
      captchaIns_pwd: null, // 滑块验证码实例
      validate_pwd: '', // 滑块验证码二次验证信息
      captchaIns_sms: null, // 滑块验证码实例
      validate_sms: '', // 滑块验证码二次验证信息
      password: '',
      smsCode: ''
    }
  },
  computed: {
    ...mapGetters(['registerMobile', 'errorNum'])
  },
  filters: {
    splitTelNum: function(value) {
      value = value.toString()
      return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`
    }
  },
  methods: {
    activeBtn() {
      if (this.isPassword) {
        return this.password !== ''
      } else {
        return this.smsCode !== ''
      }
    },
    login() {
      if (this.isPassword) {
        // 密码登录
        this.loginWithPassword()
      } else {
        // 短信验证码登录
        this.loginWithSMSCode()
      }
    },
    loginWithPassword() {
      if (this.password === '') {
        // Toast('请输入密码')
        return
      }

      if (this.errorNum >= 3 && !this.captchaIns_pwd) {
        this.initPWDCaptcha()
        this.captchaIns_pwd && this.captchaIns_pwd.popUp()
        return
      }

      if (this.errorNum >= 3 && this.validate_pwd === '') {
        this.initPWDCaptcha()
        this.captchaIns_pwd && this.captchaIns_pwd.popUp()
        Toast('请将滑块验证码划到正确的位置')
        return
      }

      this.doLogin()
    },
    doLogin() {
      userLogin({
        userName: this.registerMobile,
        passWord: btoa(this.password)
      }).then(res => {
        if (res.data.resultCode === '1') {
          console.log(res.data)
          let user = res.data.data
          this.setUser(user)
          setLoginUsername(this.userName)
          this.setErrorNum(0)
          this.loginSuccess()
        } else {
          Toast(res.data.resultMsg)
          this.setErrorNum(this.errorNum + 1)
        }
      })
    },
    loginWithSMSCode() {
      let postData = {
        userName: this.registerMobile,
        smsCode: this.smsCode
      }
      userLoginVcode(postData).then(res => {
        if (res.data.resultCode === '1') {
          let user = res.data.data
          this.setUser(user)
          setLoginUsername(this.userName)
          this.setErrorNum(0)
          this.loginSuccess()
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    initPWDCaptcha() {
      window.initNECaptcha(
        {
          captchaId: captchaId,
          width: '320px',
          mode: 'popup',
          element: '#captcha_pwd',
          onVerify: (err, data) => {
            this.validate_pwd = data.validate
            this.doLogin()
          },
          onClose: () => {
            this.captchaIns_pwd.refresh()
          }
        },
        instance => {
          this.captchaIns_pwd = instance
        }
      )
    },
    loginSuccess() {
      this.$router.push({
        name: 'AppDownload'
      })
    },
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
    ...mapMutations({
      setUser: 'SET_USER',
      setErrorNum: 'SET_ERROR_NUM'
    })
  },
  created() {}
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
  &.login {
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
      > input {
        box-sizing: border-box;
        margin: 0 auto 0.34rem;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        font-size: 0.13rem;
        color: #999999;
        border-bottom: 0.01rem solid #f4f4f4;
      }
      .sms-code {
        display: flex;
        justify-content: space-between;
        width: 3.45rem;
        height: 0.45rem;
        margin: 0 auto 0.34rem;
        input {
          margin: 0 auto;
          display: block;
          width: 3.45rem;
          height: 0.45rem;
          font-size: 0.13rem;
          color: #999999;
          border-bottom: 0.01rem solid #f4f4f4;
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
      button {
        margin: 0 auto;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        border-radius: 0.04rem;
        font-size: 0.15rem;
        color: #ffffff;
        background: #ccc;
        &.active {
          background: $color-main;
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
