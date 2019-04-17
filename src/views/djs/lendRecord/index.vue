<template>
  <section class="lend_record">
    <div class="day01 day" v-for="(item, index) in lendRecordData" :key="index">
      <h2>{{ item.timeGroup }}</h2>
      <div class="menu">
        <p>
          <span>{{ item.userName }}</span
          ><i>{{ item.invAmt }}</i>
        </p>
        <a>{{ item.invTime }}</a>
      </div>
    </div>
  </section>
</template>

<script>
import { investUserCountMsg } from '@/api/djs/investDetail'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      lendRecordData: {}
    }
  },
  methods: {},
  created() {
    investUserCountMsg({
      projectNo: this.projectNo,
      curPage: '1',
      maxLine: 100
    }).then(res => {
      this.lendRecordData = res.data.invUserList
    })
  }
}
</script>

<style lang="scss" scoped>
section {
  background: #eee;
  padding-top: 0.06rem;
  height: 100%;
  overflow-y: scroll;
  .day {
    background: #fff;
    h2 {
      font-size: 0.11rem;
      color: #333333;
      letter-spacing: 0.0013rem;
      height: 0.16rem;
      padding: 0.08rem 0.15rem;
      border-bottom: 0.01rem solid #eeeeee;
    }
    .menu {
      height: 0.67rem;
      border-bottom: 0.01rem solid #eeeeee;
      margin-bottom: 0.06rem;
      p {
        font-size: 0.15rem;
        color: #333333;
        letter-spacing: 0.0018rem;
        height: 0.21rem;
        padding: 0.15rem 0 0 0.15rem;
        span {
          float: left;
        }
        i {
          float: right;
          margin-right: 0.15rem;
        }
      }
      a {
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: 0.0013rem;
        margin: 0.15rem 0 0.15rem 0.15rem;
      }
    }
  }
}
</style>
