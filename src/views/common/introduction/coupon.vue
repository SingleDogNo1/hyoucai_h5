<template>
  <div class="couponPage pageContainer">
    <BScroll class="scroll" ref="scrollRef">
      <div class="main">
        <h5><span class="title-1">优惠券有哪些</span></h5>
        <p class="tips">点金石提供了加息券、体验金、现金红包、抵扣红包、投资红包五种类型的优惠券，各自功用如下：</p>
        <div class="coupons">
          <div class="coupon">
            <div class="couponImg img-0"></div>
            <p class="into">具有额外赠送收益性质的优惠券</p>
            <p class="detail">用券收益=加息年化*加息天数*投资金额/360</p>
          </div>
          <div class="coupon">
            <div class="couponImg img-1"></div>
            <p class="into">一种虚拟资产，模拟现金并获取投资收益</p>
            <p class="detail">使用后可提现对应收益，体验金本身不可提现。体验金不可与其他券叠加使用</p>
          </div>
          <div class="coupon">
            <div class="couponImg img-2"></div>
            <p class="into">具有现金性质的优惠券</p>
            <p class="detail">收到现金红包可直接提现至绑定的银行卡，也可投资享受收益</p>
          </div>
          <div class="coupon">
            <div class="couponImg img-3"></div>
            <p class="into">具有现金抵用性质的优惠券</p>
            <p class="detail">满足条件使用时，可抵消部分应付金额</p>
          </div>
          <div class="coupon">
            <div class="couponImg img-4"></div>
            <p class="into">具有现金性质的优惠券</p>
            <p class="detail">满足使用条件后，可提现至绑定的银行卡，也可去投资享受收益</p>
          </div>
        </div>
        <h5><span class="title-2">获取途径</span></h5>
        <p class="tips">平台用户有多种方式获取优惠券，新客户注册、推荐好友注册、参加优惠活动等，具体获取途径介绍如下：</p>
        <div class="channels">
          <div class="channel">
            <h6><i class="mine"></i><span>我的-券包</span></h6>
            <p>新用户注册：注册后可直接获得投资红包、加息券等优惠券</p>
            <p>推荐好友注册：推荐好友注册，填写您的邀请码，可获得不同面额的投资红包</p>
          </div>
          <div class="channel">
            <h6><i class="other"></i><span>其他优惠活动</span></h6>
            <p>点金石将不定期推出优惠活动，客户可以参加活动获取优惠券</p>
          </div>
        </div>
      </div>
    </BScroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'coupon',
  components: {
    BScroll
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/mixins';

.couponPage {
  font-size: 0.13rem;
  color: #666;
  background: #f2f2f2;
  padding-top: 0.08rem;
  height: 100%;
  .scroll {
    height: 100%;
    overflow: hidden;
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
        }
        &.title-1:after {
          left: 0.06rem;
          top: -0.02rem;
        }
        &.title-2:after {
          left: -0.09rem;
          top: -0.02rem;
        }
      }
    }
    .coupons {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.32rem;
      .coupon {
        width: 1.55rem;
        margin-right: 0.17rem;
        text-align: right;
        .couponImg {
          margin-top: 0.16rem;
          width: 1.13rem;
          height: 0.57rem;
          display: inline-block;
          margin-right: 0.17rem;
          background-size: 100% 100%;
        }
        .img-0 {
          @include bg-image('coupon');
        }
        .img-1 {
          @include bg-image('experience');
        }
        .img-2 {
          @include bg-image('cashRP');
        }
        .img-3 {
          @include bg-image('dikou');
        }
        .img-4 {
          @include bg-image('touzi');
        }
        p.into {
          color: #333;
          height: 0.36rem;
          text-align: left;
          margin: 0.08rem 0 0.06rem;
        }
        p.detail {
          height: 0.48rem;
          font-size: 0.11rem;
          color: #999;
          text-align: left;
        }
      }
    }
    .tips {
      color: #666;
    }
    .channels {
      .channel {
        margin-top: 0.08rem;
        h6 {
          font-size: 0.13rem;
          color: #333;
          display: flex;
          align-items: center;
          margin-bottom: 0.08rem;
          i {
            width: 0.3rem;
            height: 0.3rem;
            background-size: 100% 100%;
            margin-right: 0.1rem;
            &.mine {
              @include bg-image('mine');
            }
            &.other {
              @include bg-image('other');
            }
          }
          span {
            display: inline-block;
            position: relative;
            &:after {
              content: '';
              display: block;
              position: absolute;
              width: 0.73rem;
              height: 0.13rem;
              background: #ffad89;
              z-index: -1;
              top: 0.07rem;
              left: -0.06rem;
            }
          }
        }
      }
    }
  }
}
</style>
