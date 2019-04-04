<template>
  <div class="index">
    <header>
      <h6>汇有财</h6>
      <p>唯有赚钱不能停</p>
      <button :class="{new: newNotice}"></button>
    </header>
    <ul class="tabs">
      <li>信息披露</li>
      <li>资金存管</li>
      <li>运营数据</li>
      <li>活动推荐</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      newNotice: true // 是否有新公告
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.index {
  header {
    position: relative;
    h6 {
      font-size: 0.24rem;
      color: $color-text-b;
      text-align: center;
      line-height: 0.44rem;
      font-weight: bold;
    }
    p {
      font-size: 0.14rem;
      color: #999;
      letter-spacing: 0.85em;
      text-align: center;
      margin-bottom: 0.15rem;
    }
    button {
      position: absolute;
      top: 0.1rem;
      right: 0.15rem;
      @include cube(0.25rem, 0.19rem);
      background: url('./notice.png') center/contain no-repeat;
      &.new {
        background-image: url('./notice-new.png');
      }
    }
  }
  .tabs {
    display: flex;
    justify-content: space-around;
  }
}
</style>
