<template>
  <BScroll class="coupon">
    <section>
      <template v-for="(item, index) in couponLists">
        <CouponItem :key="index"></CouponItem>
      </template>
    </section>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import CouponItem from '@/components/coupon'

import { availableCouponApi } from '@/api/djs/investDetail'

import { mapGetters } from 'vuex'

export default {
  name: 'coupon',
  mixins: [],
  components: {
    BScroll,
    CouponItem
  },
  data() {
    return {
      projectNo: this.$route.params.projectNo,
      amount: this.$route.params.amount,
      couponLists: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: {},
  watch: {},
  methods: {},

  created() {
    availableCouponApi({
      userName: this.user.userName,
      projectNo: this.projectNo,
      amount: this.amount
    }).then(res => {
      console.log(res)
      this.couponLists = res.data.coupons
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.coupon {
  height: 100%;
  background: #eee;
  padding-top: 0.1rem;
}
</style>
