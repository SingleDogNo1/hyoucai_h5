<template>
  <section class="lend_record">
    <div class="day01 day">
      <h2>2018年11月</h2>
      <div class="menu">
        <p><span>138******65</span><i>30000.00</i></p>
        <a>11-28 17:48</a>
      </div>
      <div class="menu">
        <p><span>138******65</span><i>30000.00</i></p>
        <a>11-28 17:48</a>
      </div>
    </div>
    <div class="day01 day">
      <h2>2018年10月</h2>
      <div class="menu">
        <p><span>138******65</span><i>30000.00</i></p>
        <a>11-28 17:48</a>
      </div>
      <div class="menu">
        <p><span>138******65</span><i>30000.00</i></p>
        <a>11-28 17:48</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {}
  },
  methods: {},
  created: {}
}
</script>

<style lang="scss" scoped>
section {
  background: #eee;
  padding-top: 0.06rem;
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
