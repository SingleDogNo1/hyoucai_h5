<template>
  <div class="item">
    <div class="left">
      <header>
        <strong>3.0</strong>
        <span>%</span>
      </header>
      <footer>可与红包一起使用</footer>
    </div>
    <div class="right">
      <h4>出借范围：100.00-10000.00元</h4>
      <h6>适用范围：<span>点选头30天</span><span>点选头90天</span><span>点选头130天</span></h6>
      <p>有效期至：2018-10-11</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'index'
    }
  },
  props: {
    unclaimed: {
      type: Object
    }
  },
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins';

.item {
  @include cube(100%, 1.02rem);
  background: #fff;
  display: flex;
  justify-content: space-between;
  .left {
    width: 1.23rem;
  }
}
</style>
