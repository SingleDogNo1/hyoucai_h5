<template>
  <div class="layout">
    <AppHeader v-if="$route.meta.title"> </AppHeader>
    <div class="container" :style="{ top: showHeaderFlag ? '0' : '0.44rem' }">
      <router-view></router-view>
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
  computed: {
    showHeaderFlag() {
      // app打开网页 || 本身是下载页， 不计算tabBar高度（0.44rem）
      return this.$route.query.mobile || this.$route.name === 'AppDownload'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins';

.layout {
  @include positionCenter();
  @include cube();
  display: flex;
  flex-direction: column;
  .container {
    position: fixed;
    bottom: 0;
    width: 100%;
    /*overflow: hidden;*/
    background: #fff;
  }
}
</style>
