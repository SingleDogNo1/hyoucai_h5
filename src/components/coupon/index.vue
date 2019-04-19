<template>
  <div class="item" @click="choose">
    <div class="left">
      <header>
        <strong>{{ dataInfo.couponRate }}</strong>
        <span>%</span>
      </header>
      <footer v-if="dataInfo.commonUse === 1">可与红包一起使用</footer>
      <footer v-else>不可与红包一起使用</footer>
    </div>
    <div class="right">
      <h4>出借范围：{{ dataInfo.amountMin }}-{{ dataInfo.amountMax }}元</h4>
      <h6 v-if="dataInfo.projects">
        适用范围：<span v-for="(item, index) in dataInfo.projects" :key="index">{{ item.projectName }}</span>
      </h6>
      <p>有效期至：{{ dataInfo.validUseEndTime }}</p>
    </div>
    <img v-if="active" src="./btn.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {}
  },
  props: {
    dataInfo: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  methods: {
    choose() {
      this.$emit('choose')
    }
  },
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
  border-left: 0.02rem solid #999;
  position: relative;
  img {
    @include square(0.24rem);
    position: absolute;
    top: 0;
    right: 0;
  }
  .left {
    $size: 0.1rem;
    position: relative;
    width: 1.23rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    border-right: 0.01rem dashed #eee;
    &:before,
    &:after {
      content: '';
      position: absolute;
      @include radiusCube($size);
      background: #f9f9f9;
      right: -$size / 2;
    }
    &:before {
      top: -$size / 2;
    }
    &:after {
      bottom: -$size / 2;
    }
    strong {
      font-size: 0.24rem;
    }
    span {
      font-size: 0.11rem;
    }
    footer {
      color: #999;
      font-size: 0.11rem;
    }
  }
  .right {
    flex: 1;
    padding-left: 0.1rem;
    padding-right: 0.24rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #999;
    h4 {
      font-size: 0.13rem;
      line-height: 1;
      margin-bottom: 0.1rem;
    }
    h6 {
      font-size: 0.11rem;
      margin-bottom: 0.1rem;
      span {
        padding-right: 0.05rem;
      }
    }
    p {
      font-size: 0.1rem;
      color: #999;
    }
  }
  &.active {
    border-left-color: #fac90f;
    header {
      color: #fac90f;
    }
    .right {
      color: #333;
    }
  }
}
</style>
