<template>
  <div class="content">
    <div class="heads">
      <div class="head-box" :class="{ actives: flag == 1 }" @click="clickGetRecord(1, null, page1)">
        <span class="head-txt">全部</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 2 }" @click="clickGetRecord(2, 'TXCZ', page2)">
        <span class="head-txt">充值</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 3 }" @click="clickGetRecord(3, 'TXTX', page3)">
        <span class="head-txt">提现</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 4 }" @click="clickGetRecord(4, 'TXQT', page4)">
        <span class="head-txt">其他</span>
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
// import { Toast, Indicator, tabItem } from 'mint-ui' //Indicator
import { getUserTransaction } from '@/api/djs/transaction'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    // tabItem,
    // Indicator,
    // Toast
  },
  data() {
    return {
      flag: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      allData: [],
      chargeData: [],
      toCashData: [],
      otherData: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.clickGetRecord(1, null, null, 1)
  },
  methods: {
    clickGetRecord(val, txType, page) {
      this.flag = val
      let data = {
        userName: this.user.userName,
        timeType: 'ODLX',
        tranType: 'XSCC',
        // txType: txType,
        // txDate: txDate,
        page: page
      }
      if (
        (txType === 'TXCZ' && this.chargeData.length === 0) ||
        (txType === 'TXTX' && this.toCashData.length === 0) ||
        (txType === 'TXQT' && this.otherData.length === 0) ||
        this.allData.length === 0
      ) {
        // 有分页点击tab时，只有之前没有数据才发请求。否则，不发
        Indicator.open('加载中')
        getUserTransaction(data).then(res => {
          Indicator.close()
          let resp = res.data
          if (resp.resultCode === CODE_OK) {
            let list = resp.data.list
            let countPage = resp.data.countPage
            let curPage = resp.data.curPage
            if (txType === 'TXCZ') {
              if (!list.length) {
                this.hasMore2 = false
                Toast('无记录')
                return
              } else if (curPage >= countPage) {
                this.hasMore2 = false
              } else {
                this.hasMore2 = true
              }
              this.chargeData = this.chargeData.concat(list)
            } else if (txType === 'TXTX') {
              if (!list.length) {
                this.hasMore3 = false
                Toast('无记录')
                return
              } else if (curPage >= countPage) {
                this.hasMore3 = false
              } else {
                this.hasMore3 = true
              }
              this.toCashData = this.toCashData.concat(list)
            } else if (txType === 'TXQT') {
              if (!list.length) {
                this.hasMore4 = false
                Toast('无记录')
                return
              } else if (curPage >= countPage) {
                this.hasMore4 = false
              } else {
                this.hasMore4 = true
              }
              this.otherData = this.otherData.concat(list)
            } else {
              if (!list.length) {
                this.hasMore1 = false
                Toast('无记录')
                return
              } else if (curPage >= countPage) {
                this.hasMore1 = false
              } else {
                this.hasMore1 = true
              }
              this.allData = this.allData.concat(list)
            }
          } else {
            Toast(resp.resultMsg)
          }
        })
      }
    }
    // getUserTransaction() {
    //   getUserTransaction({ userName: '小狗' }).then(res => {
    //     console.log(res)
    //   })
    // }
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
