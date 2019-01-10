<template>
  <div class="layout">
   <header v-if="!mobile">header</header>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer v-if="!mobile">footer</footer>
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
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
</style>
