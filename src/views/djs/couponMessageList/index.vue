<template>
  <section>
    <div class="commonList">
      <div class="title">
        <i class=""></i>
        <p>加息券消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
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
  .commonList {
    background: #fff;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 0.01rem solid #eeeeee;
    font-size: 0.13rem;
    color: #333333;

    .title {
      float: left;
      width: 70%;
      position: relative;
      padding-left: 0.15rem;
      i {
        display: inline-block;
        position: absolute;
        z-index: 2;
        width: 0.06rem;
        height: 0.5rem;
        border-radius: 20% 0 0 20%;
        background-color: #ef5c52;
        left: 0;
      }
    }
    .more {
      display: flex;
      align-items: center;
      float: right;
      height: 0.5rem;
      img {
        height: 0.14rem;
        width: 0.14rem;
        padding-right: 0.15rem;
      }
    }
  }
}
</style>
