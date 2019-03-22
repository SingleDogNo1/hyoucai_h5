<template>
  <div class="selectMeans">
    <BScroll class="scroll">
    <div class="main">
      <div class="img img-1"></div>
      <p
        class="content content-1"
      >汇有财优质小额分散的资产能有效分散客户的出借风险，保障客户资金安全；风险控制是一个平台稳定运营的核心，而小额分散使汇有财风控中的数据模型更为普适化，科学化。</p>
      <div class="img img-2"></div>
      <p
        class="content content-2"
      >因汇有财小额分散资产特性，出借人的一笔投资资金将会通过汇有财大数据系统智能拆分匹配到多个全国不同地域、不同年龄、不同职业、不同性别、不同学历的优质借款人手中，从而保证不同借款人还款行为的独立性，避免由于某个区域，某个行业出现波动而产生大面积逾期的可能性。</p>
      <div class="img img-3"></div>
      <p
        class="content content-3"
      >小额分散的资产是一种被监管意见要求的P2P经营模式，顺应了“合规”的刚性潮流；坚持小额分散的原则，不仅是汇通金融发展的初心，也是在当下的国内互联网金融行业市场坏境和信用环境下，P2P网络借贷行业的必然选择。</p>
    </div>
    </BScroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'index',
  components: {
    BScroll
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.selectMeans {
  background-color: #fff;
  font-size: 0.13rem;
  height: 100%;
  top: 0;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.44rem;
    .head_gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 0.44rem;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text;
      background-color: #fff;
      opacity: 0;
      box-shadow: inset 0 -1px 0 0 #eeeeee;
    }
    span {
      position: absolute;
      top: 0.1rem;
      left: 4%;
      width: 0.24rem;
      height: 0.24rem;
      background-size: 34% 60%;
      background-position: left center;
      @include bg-image('back');
    }
  }
  .main {
    padding: 0.3rem 0.15rem 0.17rem;
    background: #ffffff;
    .img {
      width: 100%;
      background-position: 50%;
    }
    .img-1 {
      height: 1.55rem;
      @include bg-image('1');
      background-size: 50% 100%;
    }
    .content-1 {
      box-sizing: border-box;
      width: 3.35rem;
      height: 1.01rem;
      margin: 0.24rem auto 0.43rem;
      border: 1px solid rgba(255, 94, 25, 0.5);
      border-radius: 0.04rem;
      padding: 0.1rem;
      line-height: 0.18rem;
    }
    .img-2 {
      @include bg-image('2');
      height: 2.5rem;
      background-size: 80% 100%;
    }
    .content-2 {
      box-sizing: border-box;
      width: 3.35rem;
      margin: 0.24rem auto 0.16rem;
      line-height: 0.18rem;
    }
    .img-3 {
      margin: 0 auto;
      @include bg-image('3');
      width: 2.69rem;
      height: 0.84rem;
      background-size: contain;
    }
    .content-3 {
      margin: 0.13rem auto 0;
    }
  }
}
</style>
