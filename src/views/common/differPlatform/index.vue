<template>
  <div class="index"></div>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'index'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {
    showFlag().then(res => {
      const data = res.data
      if (res.data.resultCode === '1') {
        this.setPlatform(data.data.platformFlag === '1' ? 'djs' : 'hyc')
        // switch (data.data.platformFlag) {
        //   case '1':
        //     // 点金石
        //     this.$router.push({ name: 'DJSHomePage' })
        //     break
        //   case '2':
        //     // 汇有财
        //     this.$router.push({ name: 'HYCHomePage' })
        //     break
        // }
      }
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>
