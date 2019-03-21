<template>
  <mt-header v-if="!isAppTitle" ref="mtHeader" :title="title" class="">
    <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isAppTitle: {
      type: [String, Boolean],
      default: ''
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
