<template>
  <div class="layout">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  mixins: [],
  components: {},
  data() {
    return {
      mobile: this.$route.query.mobile
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  height: 100vh;
}
</style>
