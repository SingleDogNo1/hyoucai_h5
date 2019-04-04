<template>
  <div class="index">
    <header>
      <h6>汇有财</h6>
      <p>唯有赚钱不能停</p>
      <button :class="{new: newNotice}"></button>
    </header>
    <ul class="tabs">
      <li @click="showTabs('AboutUs')">
        <img src="./xxpl.png" alt="">
        <span>信息披露</span>
      </li>
      <li @click="showTabs('ArchivalInfo')">
        <img src="./zjcg.png" alt="">
        <span>资金存管</span>
      </li>
      <li @click="showTabs('InfoDisclose')">
        <img src="./yysj.png" alt="">
        <span>运营数据</span>
      </li>
      <li @click="showTabs('DJSActivityCenter')">
        <img src="./hdtj.png" alt="">
        <span>活动推荐</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      newNotice: true // 是否有新公告
    }
  },
  computed: {
    ...mapGetters(['platform'])
  },
  props: {},
  watch: {},
  methods: {
    showTabs(router_name) {
      this.$router.push({
        name: router_name
      })
    }
  },

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
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        @include square(0.38rem);
      }
      span {
        margin-top: 0.04rem;
        text-align: center;
        font-size: 0.14rem;
        color: $color-text-b;
      }
    }
  }
}
</style>
