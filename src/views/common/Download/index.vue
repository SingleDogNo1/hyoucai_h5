<template>
  <BScroll class="index">
    <div class="wrapper">
      <header>
        <div class="logo"></div>
        <p class="text">唯有赚钱不能停</p>
      </header>
      <div class="tel"></div>
      <button @click="iosClick">
        <img class="ios" src="./images/icon_ios.png" alt="">
        <span>iPhone 版下载</span>
      </button>
      <button @click="androidClick">
        <img class="android" src="./images/icon_android.png" alt="" />
        <span>Android 版下载</span>
      </button>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { Toast } from 'mint-ui'

export default {
  components: {
    BScroll
  },
  methods: {
    androidClick() {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.huitong.djscg'
    },
    iosClick() {
      window.location.href = 'https://itunes.apple.com/cn/app/id1289595622?mt=8'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      switch (from.name) {
        case 'userLogin':
          // 从登录来的
          // Toast('login success')
          break
        case 'userRegister':
          // 从注册来的
          Toast('恭喜您，注册成功')
          break
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.my-scroll {
  height: 100%;
  background: #fff;
  overflow: hidden;
  header {
    width: 100%;
    height: 2.15rem;
    background: url('./images/bg_header.png') center center no-repeat;
    background-size: cover;
    padding-top: 0.53rem;
    .logo {
      margin: 0 auto;
      width: 1.36rem;
      height: 0.46rem;
      background: url('./images/icon_logo.png') center center no-repeat;
      background-size: cover;
    }
    .text {
      width: 1.26rem;
      margin: 0.08rem auto 0;
      font-size: 0.13rem;
      color: #333333;
      letter-spacing: 0.05rem;
    }
  }
  .tel {
    width: 1.78rem;
    height: 3.47rem;
    margin: -1rem auto 0.25rem;
    background: url('./images/bg_tel.png') center center no-repeat;
    background-size: cover;
    position: relative;
    z-index: 999;
  }
  button {
    display: flex;
    width: 2.2rem;
    height: 0.44rem;
    border: 0.01rem solid #333333;
    border-radius: 0.04rem;
    padding: 0.13rem 0.48rem;
    margin: 0 auto 0.12rem;
    background: #fff;
    justify-content: space-between;
    .android {
      display: inline-block;
      width: 0.16rem;
      height: 0.2rem;
    }
    .ios {
      display: inline-block;
      width: 0.16rem;
      height: 0.2rem;
    }
  }
}
</style>
