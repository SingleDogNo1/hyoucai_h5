<template>
  <section>
    <div class="topH">
      <span>复投提醒</span>
    </div>
    <div class="msg">
      <span>您有一笔出借将于</span>
      <p><em>2018年05月28日</em></p>
      <p><i>到期</i></p>
    </div>
  </section>
</template>

<script>
// import api from '@/api/djs/message'
// import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'index',
  mixins: [],
  components: {
    // BScroll
  },
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
  .topH {
    padding: 0.1rem 0 0.05rem 0.15rem;
    span {
      font-weight: bold;
      font-size: 0.11rem;
      color: #333;
    }
  }
  .msg {
    height: 1.11rem;
    background-image: url(./msgDetailBg.png);
    background-repeat: no-repeat;
    background-position: 0.1rem;
    margin-right: 0.1rem;
    margin-bottom: 0.15rem;
    span {
      color: #fff;
      font-size: 0.12rem;
      display: block;
      text-align: center;
      padding-top: 0.25rem;
    }
    p {
      em {
        color: #fff;
        font-size: 0.18rem;
        font-weight: bold;
        font-style: normal;
        display: block;
        text-align: center;
        box-shadow: 0.02rem 0 0 #dbd624;
        padding-top: 0.1rem;
      }
      i {
        color: #fff;
        font-size: 0.12rem;
        font-style: normal;
        display: block;
        text-align: center;
        padding-top: 0.05rem;
      }
    }
  }
}
</style>
