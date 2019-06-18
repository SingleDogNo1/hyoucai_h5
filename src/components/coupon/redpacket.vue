<!--
  @tips
  左上角的红包类型，不可用display: none
-->
<template>
  <div class="item" @click="choose">
    <div class="left">
      <header>
        <strong>{{ dataInfo.redPacketAmount }}</strong>
        <span>元</span>
      </header>
      <footer v-if="parseInt(dataInfo.commonUse) === 1">可与加息券一起使用</footer>
      <footer v-else>不可与加息券一起使用</footer>
      <img class="type" v-if="parseInt(dataInfo.secondType) === 1" src="./dikou.png" alt="" />
      <img class="type" v-else-if="parseInt(dataInfo.secondType) === 2" src="./touzi.png" alt="" />
    </div>
    <div class="right">
      <h4>起投金额：{{ dataInfo.investMinAmount }}元</h4>
      <h6 v-if="dataInfo.projectTypes">
        适用范围：<span v-for="(item, index) in dataInfo.projectTypes" :key="index">{{ item.projectTypeName }}</span>
      </h6>
      <p>有效期至：{{ dataInfo.usableExpireDate }}</p>
    </div>
    <img class="choose" v-if="active" src="./btn.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'index',
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
  methods: {
    choose() {
      this.$emit('choose')
    }
  }
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
  .choose {
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
    padding: 0 0.26rem;
    text-align: center;
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
    .type {
      position: absolute;
      @include square(0.35rem);
      left: 0;
      top: 0;
      display: none;
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
    border-left-color: #ff5e19;
    header {
      color: #ff5e19;
    }
    .right {
      color: #333;
    }
    .type {
      display: block;
    }
  }
}
</style>
