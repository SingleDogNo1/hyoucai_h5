<template>
  <div class="content">
    <div class="heads">
      <div class="head-box" :class="{ actives: flag == 1 }" @click="changeFlag(1)">
        <span class="head-txt">申请中</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 2 }" @click="changeFlag(2)">
        <span class="head-txt">出借中</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 3 }" @click="changeFlag(3)">
        <span class="head-txt">已结清</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 4 }" @click="changeFlag(4)">
        <span class="head-txt">已退款</span>
        <span class="head-line"></span>
      </div>
    </div>
    <div class="bodys">
      <div class="body-box">
        <div class="body-left">
          <span class="body-txt">提现冻结资金</span>
          <span class="body-date">2018-12-13 16:37:26</span>
        </div>
        <div class="body-right">
          <span class="body-money">-118.88元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserTransaction } from '@/api/djs/transaction'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      flag: 1
    }
  },
  created() {
    this.getUserTransaction()
  },
  methods: {
    changeFlag(val) {
      this.flag = val
    },
    getUserTransaction() {
      getUserTransaction({ userName: '12111000040' }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  font-family: PingFang-SC-Medium;
  background: #f6f6f6;
  height: 100%;
  .heads {
    background: #ffffff;
    height: 0.44rem;
    display: flex;
    margin: 0;
    padding: 0;
    .head-box {
      width: 25%;
      text-align: center;
      line-height: 0.44rem;
      font-size: 0.15rem;
      color: #030303;
      letter-spacing: 0;
    }
    .actives {
      position: relative;
      color: #ec5e52;
      .head-line {
        position: absolute;
        width: 0.2rem;
        height: 0.02rem;
        border-radius: 0.01rem;
        background: #ec5e52;
        bottom: 0.03rem;
        left: 0.38rem;
      }
    }
  }
  .bodys {
    background: #fff;
    padding-left: 0.15rem;
    margin-top: 0.1rem;
    .body-box {
      height: 0.7rem;
      border-bottom: 0.01rem solid #e8e8e8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .body-left {
        float: left;
        .body-txt {
          display: block;
          font-size: 0.15rem;
          color: #333333;
          letter-spacing: 0;
          line-height: 0.21rem;
        }
        .body-date {
          font-size: 0.13rem;
          color: #999999;
          letter-spacing: 0;
          line-height: 0.18rem;
        }
      }
      .body-right {
        font-size: 0.15rem;
        color: #ec5e52;
        letter-spacing: 0;
        text-align: right;
        line-height: 0.21rem;
        margin-right: 0.15rem;
      }
    }
  }
}
</style>
