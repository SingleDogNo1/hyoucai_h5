<template>
  <div class="layout">
      <router-view></router-view>
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
.layout {
  height: 100vh;
}
</style>
