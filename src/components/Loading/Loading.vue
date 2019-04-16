<!-- loading 组件 -->
<template>
  <div class="loading">
    <img src="./loading.gif" height="24" width="24" />
    <span class="desc">{{ title }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;
  font-size: 0;
  img,
  span {
    display: inline-block;
    vertical-align: top;
  }
  img {
    height: 0.24rem;
    width: 0.24rem;
    margin-right: 0.1rem;
  }
  .desc {
    line-height: 0.24rem;
    font-size: 0.15rem;
    color: #999;
  }
}
</style>
