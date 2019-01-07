<template>
  <div class="activity">
    <header>header</header>
    <div class="activity-box">
      <router-view></router-view>
    </div>
    <footer>footer</footer>
  </div>
</template>

<script>
export default {
  name: 'activity',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'activity'
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
