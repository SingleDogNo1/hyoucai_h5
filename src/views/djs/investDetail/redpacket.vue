<template>
  <BScroll class="coupon-wrapper">
    <section>
      <header>
        <template v-for="(item, index) in usableRedPacket">
          <CouponItem
            :key="index"
            class="coupon-item active"
            :active="curIndex === index"
            :dataInfo="item"
            @choose="chooseItem(item, index)"
          ></CouponItem>
        </template>
        <button @click="back">本次不使用红包</button>
      </header>
      <footer v-if="unusableRedPacket.length > 0">
        <h6>本交易您不可以使用以下红包</h6>
        <ul>
          <li v-for="(item, index) in unusableRedPacket" :key="index">
            <p class="reason">
              原因为：<span>{{ item.invalidReason }}</span>
            </p>
            <CouponItem class="coupon-item" :dataInfo="item"></CouponItem>
          </li>
        </ul>
      </footer>
    </section>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import CouponItem from '@/components/coupon/redpacket'

import { availableRedPacketApi } from '@/api/djs/investDetail'

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'coupon',
  mixins: [],
  components: {
    BScroll,
    CouponItem
  },
  data() {
    return {
      projectNo: this.$route.params.projectNo, // 标的号
      amount: this.$route.params.amount, // 投资金额
      couponId: this.$route.params.couponId, // 投资金额
      curIndex: -1, // 已选择的卡券的索引
      usableRedPacket: [], // 可用加息券
      unusableRedPacket: [] // 不可用加息券
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState({
      checkedCoupon: state => state.djsLend.djsLendCoupon, // 已选择的加息券
      checkedRedPacket: state => state.djsLend.djsLendRedPacket, // 已选择的红包
      djsChooseCouponFlag: state => state.djsLend.djsChooseCouponFlag, // 是否操作过加息券列表
      djsChooseRedPacketFlag: state => state.djsLend.djsChooseRedPacketFlag // 是否操作过红包列表
    })
  },
  props: {},
  watch: {},
  methods: {
    chooseItem(item, index) {
      this.setRedPacketFlag(false)
      this.curIndex = index
      this.chooseRedPacket(item)
      this.$router.go(-1)
    },
    back() {
      this.setRedPacketFlag(false)
      this.clearRedPacket()
      this.$router.go(-1)
    },
    ...mapMutations({
      chooseRedPacket: 'CHOOSE_DJS_REDPACKET',
      clearRedPacket: 'CLEAN_DJS_REDPACKET',
      setCouponFlag: 'SET_DJS_CHOOSE_COUPON_FLAG',
      setRedPacketFlag: 'SET_DJS_CHOOSE_REDPACKET_FLAG'
    })
  },
  created() {
    availableRedPacketApi({
      userName: this.user.userName,
      projectNo: this.projectNo,
      amount: this.amount,
      couponId: this.couponId
    }).then(res => {
      const data = res.data.userRedPackets
      data.map(value => {
        if (value.isVailable === 1) {
          // 可用
          this.usableRedPacket.push(value)
        } else {
          this.unusableRedPacket.push(value)
        }
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    if (!JSON.parse(this.djsChooseCouponFlag)) {
      this.setCouponFlag(false)
    } else {
      this.setCouponFlag(!this.checkedCoupon)
    }

    if (this.checkedRedPacket) this.chooseRedPacket(this.checkedRedPacket)

    next()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';

.coupon-wrapper {
  height: 100%;
  overflow: hidden;
  background: #f9f9f9;
  > section {
    padding: 0.1rem 0;
    header {
      .coupon-item {
        margin-bottom: 0.08rem;
        &:last-child {
          margin: 0;
        }
      }
      button {
        display: block;
        @include cube(3.45rem, 0.44rem);
        margin: 0.16rem auto 0.24rem;
        background: #fff;
        @include border-1px(#eee);
        border-radius: 0.04rem;
        font-size: 0.15rem;
        color: #333;
      }
    }
    footer {
      h6 {
        font-size: 0.15rem;
        color: #999;
        padding-left: 0.15rem;
        margin-bottom: 0.1rem;
      }
      li {
        padding-bottom: 0.16rem;
        &:last-child {
          padding: 0;
        }
      }
      .reason {
        font-size: 0.13rem;
        color: #999;
        padding-left: 0.15rem;
        margin-bottom: 0.1rem;
        span {
          color: #ed685d;
        }
      }
    }
  }
}
</style>
