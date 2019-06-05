<template>
  <div class="history">
    <BScroll v-if="haveCard" class="box">
      <section>
        <div class="coupon" v-for="(item, index) in usedList" :key="index + 'a'">
          <div class="coupon_left">
            <p class="coupon_left_p">
              <span class="number">{{ item.voucherFaceValue }}</span>
              <span class="txt" v-if="item.voucherType !== 'VT01'">元</span>
              <span class="txt" v-else>%</span>
            </p>
            <p class="coupon_left_txt" v-if="item.voucherType !== 'VT01'">{{ item.commonUse }}与加息券一起使用</p>
            <p class="coupon_left_txt" v-else>{{ item.commonUse }}与红包一起使用</p>
          </div>
          <div class="coupon_right">
            <p class="right_p1" v-if="item.voucherType !== 'VT01'">起投金额：{{ item.amountMin }}元</p>
            <p class="right_p1" v-else>出借范围：{{ item.amountMin }}-{{ item.amountMax }}元</p>
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
            <p class="coupon_left_txt" v-if="item.voucherType !== 'VT01'">{{ item.commonUse }}与加息券一起使用</p>
            <p class="coupon_left_txt" v-else>{{ item.commonUse }}与红包一起使用</p>
          </div>
          <div class="coupon_right">
            <p class="right_p1" v-if="item.voucherType !== 'VT01'">起投金额：{{ item.amountMin }}元</p>
            <p class="right_p1" v-else>出借范围：{{ item.amountMin }}-{{ item.amountMax }}元</p>
            <p class="right_p2">适用范围：{{ item.msg }}</p>
            <p class="right_p2">有效期至：{{ item.validUseEndTime }}</p>
          </div>
        </div>
      </section>
    </BScroll>
    <NoData class="empty" type="historyCoupon" v-else></NoData>
  </div>
</template>

<script>
import { couponPacketHistory } from '@/api/djs/coupon'
import { mapGetters } from 'vuex'
import NoData from '@/components/NoData/NoData'
import BScroll from '@/components/BScroll/BScroll'

export default {
  components: {
    NoData,
    BScroll
  },
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
        let data = res.data.vouchers
        if (data) {
          data.map(item => {
            item.commonUse = parseInt(item.commonUse === 1) ? '可' : '不可'
            item.msg = ''
            let length = item.projectTypes.length - 1
            item.projectTypes.map((items, index) => {
              // 展开券的适用范围
              if (index === length) {
                item.msg += items.projectTypeName
              } else {
                item.msg += items.projectTypeName + '、'
              }
            })
            switch (item.status) {
              case 1: //已使用
                this.usedList.push(item)
                break
              case 2: //已过期
                this.expiredList.push(item)
                break
            }
          })
        } else {
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

.history {
  height: 100%;
}
.box {
  height: 100%;
  position: relative;
  background: #f6f6f6;
  overflow: hidden;
  > section {
    padding-top: 0.1rem;
  }
  .coupon {
    display: flex;
    background: url(./images/historybg.png) no-repeat;
    background-size: 3.75rem 100%;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
    &:last-child {
      margin-bottom: 0;
    }
    .coupon_left {
      width: 1.2rem;
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
        padding: 0 0.2rem;
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
      width: 2.55rem;
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
}
</style>
