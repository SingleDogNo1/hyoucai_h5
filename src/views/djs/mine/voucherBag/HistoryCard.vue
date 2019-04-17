<template>
  <div class="box">
    <div class="have" v-show="haveCard">
      <div class="coupon" v-for="(item, index) in usedList" :key="index + 'a'">
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
          <p class="right_p2">有效期至：{{ item.validUseEndTime }}</p>
        </div>
      </div>
      <div class="coupon" v-for="(item, index) in expiredList" :key="index + 'b'">
        <div class="coupon_left">
          <p class="coupon_left_p">
            <span class="number">{{ item.voucherFaceValue }}</span>
            <span class="txt">元</span>
          </p>
          <p class="coupon_left_txt" v-show="item.voucherType != 'VT01'">{{ item.commonUse }}与加息券一起使用</p>
          <p class="coupon_left_txt" v-show="item.voucherType == 'VT01'">{{ item.commonUse }}与红包一起使用</p>
        </div>
        <div class="coupon_right">
          <p class="right_p1" v-show="item.voucherType != 'VT01'">起投金额：{{ item.amountMin }}元</p>
          <p class="right_p1" v-show="item.voucherType == 'VT01'">出借范围：{{ item.amountMin }}-{{ item.amountMax }}元</p>
          <p class="right_p2">适用范围：{{ item.msg }}</p>
          <p class="right_p2">有效期至：{{ item.validUseEndTime }}</p>
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
import { couponPacketHistory } from '@/api/djs/coupon'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      haveCard: true, // 是否有历史卡券
      usedList: [], // 已使用卡券
      expiredList: [] // 已过期卡券
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.couponPacketHistory()
  },
  methods: {
    couponPacketHistory() {
      couponPacketHistory({ userName: this.user.userName }).then(res => {
        // console.log(res.data.vouchers)
        let data = res.data.vouchers // 历史卡券
        if (data) {
          //存在历史卡券
          data.map(item => {
            if (item.commonUse == 1) {
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
            switch (item.status) {
              case 1:
                this.usedList.push(item) //已使用加息券
                break
              case 2:
                this.expiredList.push(item) //已过期加息券
                break
            }
          })
        } else {
          //无历史卡券
          this.haveCard = false
        }
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
  overflow: auto;
  .coupon {
    margin-top: 0.1rem;
    height: 1.02rem;
    display: flex;
    background: url(./images/historybg.png);
    background-size: 3.75rem 1.02rem;
    .coupon_left {
      width: 1.4rem;
      margin-top: 0.18rem;
      .coupon_left_p {
        text-align: center;
        letter-spacing: 0.26px;
        line-height: 0.3rem;
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
        width: 0.76rem;
        text-align: center;
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: 0.12px;
        margin: 0 auto;
      }
      .actives {
        width: 100%;
        text-align: center;
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: 0.12px;
      }
    }
    .coupon_right {
      padding-left: 0.03rem;
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
