<template>
  <BScroll class="coupon-wrapper">
    <section>
      <header>
        <template v-for="(item, index) in usableCoupons">
          <CouponItem
            :key="index"
            class="coupon-item active"
            :active="curIndex === index"
            :dataInfo="item"
            @choose="chooseItem(item, index)"
          ></CouponItem>
        </template>
        <button @click="$router.go(-1)">本次不使用加息券</button>
      </header>
      <footer v-if="unusableCoupon.length > 0">
        <h6>本交易您不可以使用以下加息券</h6>
        <ul>
          <li v-for="(item, index) in unusableCoupon" :key="index">
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
import CouponItem from '@/components/coupon/coupon'

import { availableCouponApi } from '@/api/djs/investDetail'

import { mapGetters, mapMutations } from 'vuex'

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
      redPacketId: this.$route.params.redPacketId, // 投资金额
      curIndex: -1, // 已选择的卡券的索引
      usableCoupons: [], // 可用加息券
      unusableCoupon: [] // 不可用加息券
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: {},
  watch: {},
  methods: {
    chooseItem(item, index) {
      this.curIndex = index
      this.chooseCoupon(item)
      this.$router.go(-1)
    },
    ...mapMutations({
      chooseCoupon: 'CHOOSE_COUPON'
    })
  },
  created() {
    availableCouponApi({
      userName: this.user.userName,
      projectNo: this.projectNo,
      amount: this.amount,
      redPacketId: this.redPacketId
    }).then(res => {
      const data = res.data.coupons
      data.map(value => {
        if (value.isVailable === 1) {
          // 可用
          this.usableCoupons.push(value)
        } else {
          this.unusableCoupon.push(value)
        }
      })
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';

.coupon-wrapper {
  height: 100%;
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
