<template>
  <div class="layout">
    <AppHeader v-if="$route.meta.title" @getMore="getMore">
      <div>{{ appTitleParams.handle }}</div>
    </AppHeader>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/*
 * 怎么控制右上角的小标题显示文字和样式（路由不变）
 * 登录从短信登录到密码登录，短信右上角忘记密码，验证码右上角啥也没有
 * */
import AppHeader from '@/components/AppHeader'

export default {
  name: 'layout',
  components: {
    AppHeader
  },
  data() {
    return {
      appTitleParams: {
        // 标题右边的可操作的按钮标题
        handle: this.$route.meta.handle ? this.$route.meta.handle : ''
      }
    }
  },
  methods: {
    getMore() {
      alert(1111)
    }
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
