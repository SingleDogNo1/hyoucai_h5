<template>
  <div class="layout">
    <AppHeader :title="title" :isAppTitle="isAppTitle" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'layout',
  components: {
    AppHeader
  },
  data() {
    return {
      title: this.$route.meta.title,
      // 首页不显示标题（首页当做是和app一样处理）
      // TODO 目前登录注册输入手机号页当成首页在使用，后期需求会更改首页
      isAppTitle: this.$route.name === 'home' ? true : this.$route.query.mobile
    }
  },
  created() {
    console.log(this.$route.name)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name === 'home') {
        vm.title = to.meta.title
        vm.isAppTitle = true
      } else {
        vm.title = to.meta.title
        vm.isAppTitle = to.query.mobile
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    overflow: hidden;
    background: #fff;
  }
}
</style>
