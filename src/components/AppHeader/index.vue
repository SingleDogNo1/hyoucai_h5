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
      isAppTitle: this.$route.query.mobile,
      // 标题右边的可操作的按钮标题
      handle: this.$route.meta.handle ? this.$route.meta.handle : ''
    }
  },
  methods: {
    goBack() {
      if (window.DjsJsBridge) {
        // 可能会调用app方法
      } else {
        const back_router_name = this.$route.meta.backTo
        if (back_router_name) {
          this.$router.push({ name: back_router_name })
        } else {
          this.$router.go(-1)
        }
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
      console.log(to)
      this.title = to.meta.title
      this.isAppTitle = to.query.mobile
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
