<template>
  <mt-header v-show="mobileValue !== 1" ref="mtHeader" :title="font" class="is-fixed">
    <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {
      font: this.title
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    mobileValue: {
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
