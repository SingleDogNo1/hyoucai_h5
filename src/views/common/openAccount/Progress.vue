<template>
  <BScroll class="progress-wrapper">
    <div class="progress">
      <div class="line">
        <div class="ball" :class="{ active: ['openAccount', 'setTradePWD', 'signAgreement'].includes($route.name) }"></div>
        <div class="ball" :class="{ active: ['signAgreement'].includes($route.name) }"></div>
      </div>
      <div class="steps">
        <div class="step" :class="{ active: ['openAccount', 'setTradePWD', 'signAgreement'].includes($route.name) }">实名开户</div>
        <div class="step" :class="{ active: ['signAgreement'].includes($route.name) }">业务授权</div>
      </div>
    </div>
    <router-view></router-view>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'openAccountProgress',
  components: {
    BScroll
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.progress-wrapper {
  font-size: $font-size-small-s;
  .progress {
    height: 1.12rem;
    background: #fff;
    margin-top: 0.44rem;
    padding: 0.24rem 0.15rem;
    .line {
      margin-top: 0.09rem;
      height: 0.02rem;
      width: 3.45rem;
      background: linear-gradient(to right, rgba(238, 238, 238, 0.2) 20%, rgba(238, 238, 238, 1) 50%, rgba(238, 238, 238, 0.2) 100%);
      position: relative;
      display: flex;
      justify-content: space-around;
      .ball {
        background: #fff;
        border: 0.07rem solid #eeeeee;
        border-radius: 50%;
        width: 0.2rem;
        height: 0.2rem;
        margin-top: -0.1rem;
        &.active {
          border: 0.07rem solid #ec5e52;
        }
      }
    }
    .steps {
      display: flex;
      justify-content: space-around;
      margin-top: 0.25rem;
      .step {
        background: #eeeeee;
        border-radius: 1rem;
        width: 0.85rem;
        height: 0.28rem;
        line-height: 0.28rem;
        text-align: center;
        font-size: $font-size-small-ss;
        &.active {
          background: #ec5e52;
          color: #fff;
        }
      }
    }
  }
}
</style>
