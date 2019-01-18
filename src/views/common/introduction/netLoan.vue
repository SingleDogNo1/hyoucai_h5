<template>
    <div class="netLoan pageContainer">
        <BScroll class="scroll" ref="scrollRef">
            <div class="main">
            <h5><span>严选资产</span></h5>
            <p>汇有财严选小额分散的优质资产，通过严格的风控手段，确保资产是有具体场景支撑、有指定用途、有还款能力保障、有客群限制，坏账率低、不良率低。发布个人借款信息，匹配撮合出借人的出借信息，帮助借款人解决资金需求。</p>
            <div class="img-1"></div>
            <h5><span>出借用途</span></h5>
            <p>借款用途均来自于家具家居、家用电器、教育、健康医疗、旅游、日常消费、租房、手机数码、结婚等用途。</p>
            <div class="img-2"></div>
            <p class="warning">法律红线坚决不碰触</p>
            <div class="img-3"></div>
            <h5><span>严格审核</span></h5>
            <p>汇有财建立了健全而高效的八道风控工序，并利用大数据技术打造出完美的风控闭环，为用户提供资金的五重安全保障。广泛采集多维度信息及用户授权数据进行交叉比对，通过自动化征信体系和反欺诈系统，实现智能决策，并以云技术数据处理中心提供强大数据支撑。</p>
            <div class="loan-avater">
                <div class="avater"></div>
                <div class="info">
                    <b>借款人画像</b>
                    <p>年龄 23-35</p>
                    <p>征信 无逾期记录</p>
                    <p>职业 白领、公务员</p>
                    <p>地区 集中于东部沿海城市</p>
                </div>
            </div>
            <h5><span>还款意愿强</span></h5>
            <p>对接真实消费场景，每月分期还款，还款难度低。</p>
            <p>借款人信用良好。如有稳定收入、高学历等</p>
            <p>逾期或违约将影响个人征信。</p>
        </div>
        </BScroll>
    </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
export default {
  name: 'netLoan',
  components: {
    BScroll
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/mixins';
.netLoan {
  font-size: 0.13rem;
  color: #666;
  background: #f2f2f2;
  padding-top: 0.08rem;
  height: 100%;
  .scroll {
    height: 100%;
  }
  .main {
    padding: 0.08rem 0.15rem 0.38rem;
    background: #fff;
    position: relative;
    z-index: 10;
    h5 {
      font-size: 0.15rem;
      text-align: center;
      color: #333;
      margin-top: 0.18rem;
      margin-bottom: 0.15rem;
      font-weight: 600;
      span {
        display: inline-block;
        position: relative;
        &:after {
          content: '';
          display: block;
          position: absolute;
          width: 0.73rem;
          height: 0.16rem;
          background: #ffad89;
          z-index: -1;
          left: -0.09rem;
          top: -0.02rem;
        }
        &:last-child:after {
          left: -0.02rem;
          top: -0.02rem;
        }
      }
    }
    .img-1 {
      width: 3.24rem;
      height: 0.66rem;
      margin: 0.2rem auto 0;
      background-size: 100% 100%;
      @include bg-image('selectMeans');
    }
    .img-2 {
      margin: 0.24rem auto 0;
      width: 2.53rem;
      height: 1.88rem;
      background-size: 100% 100%;
      @include bg-image('loanUse');
    }
    p.warning {
      margin: 0.34rem auto 0.24rem;
      font-size: 0.11rem;
      color: #d0021b;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before {
        content: '';
        border-top: 0.01rem solid #d0021b;
        display: inline-block;
        width: 0.28rem;
        margin-right: 0.07rem;
      }
      &:after {
        content: '';
        border-top: 0.01rem solid #d0021b;
        display: inline-block;
        width: 0.28rem;
        margin-left: 0.07rem;
      }
    }
    .img-3 {
      margin: 0 auto;
      width: 3.03rem;
      height: 1.5rem;
      background-size: 100% 100%;
      @include bg-image('law');
    }
    .loan-avater {
      display: flex;
      margin-top: 0.27rem;
      margin-bottom: 0.34rem;
      .avater {
        width: 1.12rem;
        height: 1.12rem;
        @include bg-image('avater');
        background-size: 100% 100%;
        margin-right: 0.3rem;
      }
      b {
        font-size: 0.15rem;
        color: #333;
      }
      p {
        line-height: 0.18rem;
        margin-top: 0.04rem;
      }
    }
  }
}
</style>
