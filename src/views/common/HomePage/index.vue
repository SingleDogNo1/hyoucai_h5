<template>
  <div class="home pageContainer" ref="container">
    <AppHeader :title="title" :mobileValue="!isAppTitle" />
    <div class="login-form">
      <header class="logo"></header>
      <h6 class="slogan">唯有赚钱不能停</h6>
      <input
        type="number"
        maxlength="11"
        autofocus="autofocus"
        placeholder="请输入您的手机号"
        v-model="mobile" />
      <button @click="checkTelNum">下一步</button>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import { Toast } from 'mint-ui'
import { isMobile } from '@/assets/js/regular'

export default {
  name: 'home',
  components: {
    AppHeader
  },
  data() {
    return {
      title: '汇有财',
      isAppTitle: this.$route.query.mobile,
      mobile: ''
    }
  },
  methods: {
    checkTelNum() {
      if (!this.mobile) {
        Toast({
          message: '请输入手机号'
        })
      } else if (!isMobile(this.mobile)) {
        Toast({
          message: '请输入正确的手机号'
        })
      } else {
        isExistUser({ mobile: this.mobile }).then(res => {
          if (res.data.data.isExistUser === '1') {
            this.errorMsg = '该手机号已经存在!!'
          } else {
            this.setRegisterMobile(this.mobile)
            this.$router.push({ name: 'registerForm' })
          }
        })
      }

      Toast({
        message: '12312'
      })
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.isAppTitle) {
        this.$refs.container.style.top = '0'
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.pageContainer {
  position: absolute;
  width: 100%;
  top: 0.44rem;
  bottom: 0;
  box-sizing: border-box;
  &.home {
    padding-top: 0.2rem;
    /*background: #fff;*/
    height: auto;
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
        margin: 0.07rem auto 0.5rem;
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
      input {
        margin: 0 auto 0.34rem;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        font-size: 0.13rem;
        color: #999999;
        border-bottom: 0.01rem solid #f4f4f4;
      }
      button {
        margin: 0 auto;
        display: block;
        width: 3.45rem;
        height: 0.45rem;
        border-radius: 0.04rem;
        background: $color-main;
        font-size: 0.15rem;
        color: #ffffff;
        border-bottom: 0.01rem solid #f4f4f4;
      }
    }
  }
}
</style>
