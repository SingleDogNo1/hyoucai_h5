<template>
  <div class="layout">
    <AppHeader v-if="$route.meta.title"> </AppHeader>
    <div class="container">
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
    top: 0.44rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #fff;
  }
}
</style>
