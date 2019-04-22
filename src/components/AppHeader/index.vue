<template>
  <mt-header v-show="!isAppTitle" ref="mtHeader" :title="title">
    <mt-button icon="back" slot="left" @click="goBack">
      <span v-if="cancel">{{ cancel }}</span>
    </mt-button>
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
      cancel: this.$route.meta.cancel,
      // 首页不显示标题（首页当做是和app一样处理）
      // TODO 目前登录注册输入手机号页当成首页在使用，后期需求会更改首页
      isAppTitle: this.$route.name === 'home' ? true : this.$route.query.mobile,
      // 标题右边的可操作的按钮标题
      handle: this.$route.meta.handle ? this.$route.meta.handle : ''
    }
  },
  methods: {
    goBack() {
      if (window.DjsJsBridge) {
        // 可能会调用app方法
      } else {
        this.$router.go(-1)
      }
    },
    setTitle() {
      this.$emit('setTitle')
    },
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

<style lang="scss" scoped></style>
