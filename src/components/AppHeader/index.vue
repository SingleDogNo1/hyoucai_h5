<template>
  <mt-header v-show="mobile === ''" ref="mtHeader" :title="font" class="is-fixed">
    <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {
      font: this.title,
      mobile: this.mobileValue
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    mobileValue: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
