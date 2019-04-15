<template>
  <section>
    <div class="module">
      <h2>送您一张3.0%加息券</h2>
      <p>已存入您的账户，立即使用加息15天！</p>
      <span>2017.12.14 13:12:44</span>
    </div>
    <div class="module">
      <h2>送您一个100元红包</h2>
      <p>已存入您的账户，立即使用增加100元！</p>
      <span>2017.12.14 13:12:44</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {}
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
section {
  background: #eee;
  padding-top: 0.06rem;
  height: 100%;
  .module {
    height: 1.38rem;
    width: 3.45rem;
    background: #fff;
    margin: 0 auto 0.1rem;
    padding-left: 0.16rem;
    h2 {
      font-size: 0.17rem;
      color: #333333;
      font-weight: bold;
      padding-top: 0.2rem;
      font-family: PingFangSC-Semibold;
    }
    p {
      font-size: 0.13rem;
      color: #999999;
      font-family: PingFang-SC-Regular;
      padding-top: 0.15rem;
      padding-bottom: 0.24rem;
    }
    span {
      font-size: 0.11rem;
      color: #999999;
      font-family: PingFang-SC-Regular;
    }
  }
}
</style>
