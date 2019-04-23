<template>
  <section>
    <div class="module" v-for="(item, index) in datas" :key="index">
      <h2>{{ item.title }}</h2>
      <p>{{ item.message }}</p>
      <span>{{ item.createTime }}</span>
    </div>
  </section>
</template>

<script>
import api from '@/api/hyc/message'
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      datas: []
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {
    let data = {
      platform: 'h5'
    }
    api.getSiteMessage(data).then(res => {
      let data = res.data.data
      this.datas = data.messageList
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
section {
  background: #eee;
  padding-top: 0.06rem;
  height: 100%;
  overflow-y: scroll;
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
      padding-bottom: 0.1rem;
    }
    span {
      font-size: 0.11rem;
      color: #999999;
      font-family: PingFang-SC-Regular;
    }
  }
}
</style>
