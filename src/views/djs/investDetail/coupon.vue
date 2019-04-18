<template>
  <div class="coupon">hello, {{ msg }}</div>
</template>

<script>
import { availableCouponApi } from '@/api/djs/investDetail'

export default {
  name: 'coupon',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'coupon'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {
    availableCouponApi().then(res => {
      console.log(res)
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped></style>
