<template>
  <div class="box">
    <div class="have" v-show="haveCard">
      <div class="coupon">
        <div class="coupon_left">
          <p class="coupon_left_p">
            <span class="number">30.00</span>
            <span class="txt">元</span>
          </p>
          <p class="coupon_left_txt">
            可与加息券
            <br />一起使用
          </p>
        </div>
        <div class="coupon_right">
          <p class="right_p1">起投金额：100.00元</p>
          <p class="right_p2">适用范围：点选投30天、点选投90天、点选投180天</p>
          <p class="right_p2">有效期至：2018-10-11</p>
        </div>
      </div>
      <div class="coupon">
        <div class="coupon_left">
          <p class="coupon_left_p">
            <span class="number">30.00</span>
            <span class="txt">元</span>
          </p>
          <p class="coupon_left_txt">
            可与加息券
            <br />一起使用
          </p>
        </div>
        <div class="coupon_right">
          <p class="right_p1">起投金额：100.00元</p>
          <p class="right_p2">适用范围：点选投30天、点选投90天、点选投180天</p>
          <p class="right_p2">有效期至：2018-10-11</p>
        </div>
      </div>
    </div>
    <div class="nothing" v-show="!haveCard">
      <div class="no_img">
        <img src="./images/bg.png" alt />
      </div>
      <p class="no_txt">暂无红包加息券</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      haveCard: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';
.box {
  height: 100%;
  position: relative;
  font-family: PingFangSC-Regular;
  background: #f6f6f6;
  overflow: hidden;
  .coupon {
    margin-top: 0.1rem;
    height: 1.02rem;
    display: flex;
    background: #fff;
    .coupon_left {
      width: 1.2rem;
      margin-top: 0.18rem;
      .coupon_left_p {
        text-align: center;
        letter-spacing: 0.26px;
        line-height: 0.33rem;
        .number {
          font-size: 0.24rem;
          color: #999999;
        }
        .txt {
          font-size: 0.11rem;
          color: #3f3f3f;
        }
      }
      .coupon_left_txt {
        text-align: center;
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: 0.12px;
      }
    }
    .coupon_right {
      padding-left: 0.13rem;
      padding-right: 0.14rem;
      .right_p1 {
        margin-top: 0.1rem;
        font-size: 0.13rem;
        color: #999999;
        letter-spacing: 0.14px;
      }
      .right_p2 {
        margin-top: 0.08rem;
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: 0.12px;
      }
    }
  }
  .nothing {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 1.36rem;
    .no_img {
      height: 0.83rem;
      width: 1.5rem;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .no_txt {
      text-align: center;
      font-size: 0.15rem;
      color: #999999;
      letter-spacing: 0;
      margin-top: 0.32rem;
    }
  }
}
</style>
