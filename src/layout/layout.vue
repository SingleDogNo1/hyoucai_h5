<template>
  <div class="layout">
    <AppHeader v-if="$route.meta.title"> </AppHeader>
    <div class="container" :style="{ top: $route.query.mobile ? '0' : '0.44rem' }">
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
