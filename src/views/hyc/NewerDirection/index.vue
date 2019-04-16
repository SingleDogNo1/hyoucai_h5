<template>
  <b-scroll class="scroll" ref="scrollRef" :preventDefaultException="preventClass">
    <div class="bg_white">
      <div class="point_title">
        <div class="text">输入手机号---设置登录密码---注册成功</div>
      </div>
      <div class="swiper-container swiper-container-1">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
        </div>
      </div>
      <div class="point_title">
        <div class="text">输入个人信息---签订协议</div>
      </div>
      <div class="swiper-container swiper-container-2">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
        </div>
      </div>
      <div class="point_title">
        <div class="text">点击【充值】按钮---输入充值金额及验证码---确认充值</div>
      </div>
      <div class="swiper-container swiper-container-3">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
        </div>
      </div>
      <div class="point_title">
        <div class="text">选择产品---输入出借金额---立即出借</div>
      </div>
      <div class="swiper-container swiper-container-4">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
          <div class="swiper-slide"></div>
        </div>
      </div>
    </div>
  </b-scroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Swiper from 'swiper/dist/js/swiper'

export default {
  components: {
    BScroll
  },
  data() {
    return {
      serviceTel: '400-099-7979',
      preventClass: { className: /(^|\s)longTap(\s|$)/ },
      swiper1: null,
      swiper2: null,
      swiper3: null,
      swiper4: null
    }
  },
  methods: {
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    setTimeout(() => {
      this.swiper1 = new Swiper('.swiper-container-1', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper2 = new Swiper('.swiper-container-2', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper3 = new Swiper('.swiper-container-3', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper4 = new Swiper('.swiper-container-4', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
    }, 20)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.scroll {
  height: 100%;
  overflow: hidden;
}

.longTap {
  position: relative;
  display: block;
  width: 144px;
  height: 144px;
}

.bg_white {
  background-color: #fff;
  padding-top: 0.25rem;
  .point_title {
    padding: 0 4%;
    font-size: 0;
    overflow: hidden;
    > div {
      display: inline-block;
      vertical-align: top;
    }
    .text {
      color: $color-text;
      font-size: $font-size-small-s;
      padding-left: 0.1rem;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: 0.03rem;
        height: 0.14rem;
        background: #ff5e1a;
        left: 0;
        top: 0.03rem;
      }
    }
  }
  .swiper-container {
    height: 4.9rem;
    margin: 0.24rem auto 0.4rem;
    .swiper-slide {
      background-size: 100% 100%;
    }
    &.swiper-container-1 {
      .swiper-slide:nth-child(1) {
        @include bg-image('verification');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('reg');
      }
    }
    &.swiper-container-2 {
      .swiper-slide:nth-child(1) {
        @include bg-image('open_save_account');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('sign');
      }
    }
    &.swiper-container-3 {
      .swiper-slide:nth-child(1) {
        @include bg-image('mine');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('charge');
      }
    }
    &.swiper-container-4 {
      .swiper-slide:nth-child(1) {
        @include bg-image('invest');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('input_amount');
      }
    }
  }
}
</style>
