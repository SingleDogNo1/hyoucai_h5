<template>
  <div class="index">
    <!--<BScroll>-->
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
    <!--</BScroll>-->
  </div>
</template>

<script>
// import BScroll from '@/components/BScroll/BScroll'

export default {
  components: {
    // BScroll
  },
  methods: {
    androidClick() {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.huitong.djscg'
    },
    iosClick() {
      window.location.href = 'https://itunes.apple.com/cn/app/id1289595622?mt=8'
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  background: #fff;
  .my-scroll {
    height: 100%;
    overflow: hidden;
  }
  .wrapper {
    background: #ffffff;
  }
  header {
    width: 100%;
    height: 215px;
    background: url('./images/bg_header.png') center center no-repeat;
    background-size: cover;
    padding-top: 53px;
    .logo {
      margin: 0 auto;
      width: 136px;
      height: 46px;
      background: url('./images/icon_logo.png') center center no-repeat;
      background-size: cover;
    }
    .text {
      width: 126px;
      margin: 8px auto 0;
      font-size: 13px;
      color: #333333;
      letter-spacing: 5px;
    }
  }
  .tel {
    width: 178px;
    height: 347px;
    margin: -100px auto 25px;
    background: url('./images/bg_tel.png') center center no-repeat;
    background-size: cover;
    position: relative;
    z-index: 999;
  }
  button {
    display: flex;
    width: 220px;
    height: 44px;
    border: 1px solid #333333;
    border-radius: 4px;
    padding: 13px 48px;
    margin: 0 auto 12px;
    background: #fff;
    justify-content: space-between;
    .android {
      display: inline-block;
      width: 16px;
      height: 20px;
    }
    .ios {
      display: inline-block;
      width: 16px;
      height: 20px;
    }
  }
}
</style>
