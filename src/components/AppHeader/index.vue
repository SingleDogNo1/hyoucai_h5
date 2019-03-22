<template>
  <mt-header v-show="!isAppTitle" ref="mtHeader" :title="title">
    <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    <mt-button slot="right" @click="getMore">
      <slot></slot>
    </mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.meta.title,
      // 首页不显示标题（首页当做是和app一样处理）
      // TODO 目前登录注册输入手机号页当成首页在使用，后期需求会更改首页
      isAppTitle: this.$route.name === 'home' ? true : this.$route.query.mobile,
      // 标题右边的可操作的按钮标题
      handle: this.$route.meta.handle ? this.$route.meta.handle : ''
    }
  },
  methods: {
    getMore() {
      this.$emit('getMore')
    }
  },
  watch: {
    $route(to) {
      switch (to.name) {
        case 'home':
          this.title = to.meta.title
          this.isAppTitle = true
          break
        default:
          this.title = to.meta.title
          this.isAppTitle = to.query.mobile
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .mint-header {
  .mint-header-title {
    font-weight: bold;
  }
}
</style>
