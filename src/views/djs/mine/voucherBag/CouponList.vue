<template>
  <div class="box">
    <div class="have" v-show="haveCard">
      <!-- 待领取券包 -->
      <div
        class="coupon"
        v-for="(item, index) in unclaimed"
        :key="index + 'a'"
        :class="[
          { receive1: item.voucherType == 'VT01' }, //加息券
          { receive2: item.secondType == 1 }, //抵扣红包
          { receive2_1: item.secondType == 2 } //投资红包
        ]"
      >
        <div class="coupon_left">
          <p class="coupon_left_p">
            <span class="number">{{ item.voucherFaceValue }}</span>
            <span class="txt" v-show="item.voucherType != 'VT01'">元</span>
            <span class="txt" v-show="item.voucherType == 'VT01'">%</span>
          </p>
          <p class="coupon_left_txt" v-show="item.voucherType != 'VT01'">{{ item.commonUse }}与加息券一起使用</p>
          <p class="coupon_left_txt" v-show="item.voucherType == 'VT01'">{{ item.commonUse }}与红包一起使用</p>
        </div>
        <div class="coupon_right">
          <p class="right_p1" v-show="item.voucherType != 'VT01'">起投金额：{{ item.amountMin }}元</p>
          <p class="right_p1" v-show="item.voucherType == 'VT01'">出借范围：{{ item.amountMin }}-{{ item.amountMax }}元</p>
          <p class="right_p2">适用范围：{{ item.msg }}</p>
          <p class="right_p2 right_p3">有效期至：{{ item.validUseEndTime }}</p>
          <div class="coupon_right_btn" @click="receiveCoupon(item.id)">
            <img src="./images/btn.png" alt />
          </div>
        </div>
      </div>
      <!-- 已领取券包 -->
      <div
        class="coupon"
        v-for="(item, index) in haveReceived"
        :key="index + 'b'"
        @click="touse()"
        :class="[
          { receive1: item.voucherType == 'VT01' }, //加息券
          { receive2: item.secondType == 1 }, //抵扣红包
          { receive2_1: item.secondType == 2 } //投资红包
        ]"
      >
        <div class="coupon_left">
          <p class="coupon_left_p">
            <span class="number">{{ item.voucherFaceValue }}</span>
            <span class="txt" v-show="item.voucherType != 'VT01'">元</span>
            <span class="txt" v-show="item.voucherType == 'VT01'">%</span>
          </p>
          <p class="coupon_left_txt" v-show="item.voucherType != 'VT01'">{{ item.commonUse }}与加息券一起使用</p>
          <p class="coupon_left_txt" v-show="item.voucherType == 'VT01'">{{ item.commonUse }}与红包一起使用</p>
        </div>
        <div class="coupon_right">
          <p class="right_p1" v-show="item.voucherType != 'VT01'">起投金额：{{ item.amountMin }}元</p>
          <p class="right_p1" v-show="item.voucherType == 'VT01'">出借范围：{{ item.amountMin }}-{{ item.amountMax }}元</p>
          <p class="right_p2">适用范围：{{ item.msg }}</p>
          <p class="right_p2 right_p3">有效期至：{{ item.validUseEndTime }}</p>
        </div>
      </div>
    </div>
    <div class="nothing" v-show="!haveCard">
      <div class="no_img">
        <img src="./images/bg.png" alt />
      </div>
      <p class="no_txt">暂无红包加息券</p>
    </div>
    <div class="see_history">
      <button class="see_btn" @click="seeHistoryCard">查看历史卡券</button>
    </div>
  </div>
</template>

<script>
import { CouponPacketList, ReceiveCoupon, ReceiveRedPacket } from '@/api/djs/coupon'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      haveCard: true, //有没有券
      unclaimed: [], //待领取券
      haveReceived: [] //已领取待使用券
    }
  },
  created() {
    this.CouponPacketList()
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    CouponPacketList() {
      CouponPacketList({ userName: this.user.userName, clientType: 'QD03' }).then(res => {
        // console.log(res.data.vouchers)
        let data = res.data.vouchers
        data.map(item => {
          if (item.commonUse == 1) {
            // 判断是否可共用
            item.commonUse = '可'
          } else {
            item.commonUse = '不可'
          }
          item.projectTypes.map(items => {
            // 展开券的适用范围
            if ((index = item.projectTypes.length)) {
              item.msg = items.projectTypeName
            } else {
              item.msg = items.projectTypeName + '、'
            }
          })
          if (item.status == 2) {
            // 判断是否可领取
            this.haveReceived.push(item)
          } else {
            this.unclaimed.push(item)
          }
        })
      })
    },
    // 领取加息券
    receiveCoupon: function(id) {
      this.isShow1 = true
      let obj = {}
      obj.userName = this.user.userName
      obj.couponId = id
      ReceiveCoupon(obj)
    },
    // 领取红包
    receiveRedPacket: function(id) {
      this.isShow2 = true
      let obj = {}
      obj.userName = this.user.userName
      obj.redPacketId = id
      ReceiveRedPacket(obj)
    },
    //去使用
    touse() {
      this.$router.push({
        name: 'DJSInvestment'
      })
    },
    //查看历史卡券
    seeHistoryCard() {
      this.$router.push({
        name: 'DJSHistoryCard'
      })
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
  position: relative;
  .have {
    overflow: hidden;
    height: 5.42rem;
    .coupon {
      margin-top: 0.1rem;
      height: 1.02rem;
      display: flex;
      background-size: 3.75rem 1.02rem;
      .coupon_left {
        width: 1.2rem;
        margin-top: 0.18rem;
        .coupon_left_p {
          text-align: center;
          letter-spacing: 0.26px;
          line-height: 0.33rem;
          color: #ec5e52;
          .number {
            font-size: 0.24rem;
          }
          .txt {
            font-size: 0.11rem;
          }
        }
        .coupon_left_txt {
          text-align: center;
          font-size: 0.11rem;
          color: #999999;
          letter-spacing: 0.12px;
        }
        // .actives{
        //   width: .89rem;
        //   text-align: center;
        // }
      }
      .coupon_right {
        padding-left: 0.13rem;
        padding-right: 0.14rem;
        color: #333;
        position: relative;
        .right_p1 {
          margin-top: 0.1rem;
          font-size: 0.13rem;
          letter-spacing: 0.14px;
        }
        .right_p2 {
          margin-top: 0.08rem;
          font-size: 0.11rem;
          letter-spacing: 0.12px;
        }
        .right_p3 {
          color: #999;
        }
        .coupon_right_btn {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.75rem;
          height: 0.24rem;
          img {
            width: 100%;
          }
          // line-height: .24rem;
          // background-color: #ec5e52;
          // color: #fff;
          // border-radius: .24rem 0 0 0;
        }
      }
    }
    .receive1 {
      background-image: url(./images/jiaxi.png);
    }
    .receive2 {
      background-image: url(./images/dikou.png);
    }
    .receive2_1 {
      background-image: url(./images/touzi.png);
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
  .see_history {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-bottom: 0.08rem;
    .see_btn {
      display: block;
      font-size: 0.15rem;
      color: #999999;
      letter-spacing: 0.18px;
      width: 1.26rem;
      margin: 0 auto;
      line-height: 0.21rem;
      background: #f6f6f6 url(./images/see.png) no-repeat;
      background-position: 1.15rem center;
      background-size: 0.07rem 0.14rem;
    }
  }
}
</style>
