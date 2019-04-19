<template>
  <div class="content">
    <div class="heads">
      <div class="head-box" :class="{ actives: flag == 1 }" @click="clickGetRecord(1, null, null, page1)">
        <span class="head-txt">全部</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 2 }" @click="clickGetRecord(2, 'XSCC', null, page2)">
        <span class="head-txt">充值</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 3 }" @click="clickGetRecord(3, 'ZJQX', null, page3)">
        <span class="head-txt">提现</span>
        <span class="head-line"></span>
      </div>
      <div class="head-box" :class="{ actives: flag == 4 }" @click="clickGetRecord(4, 'TXQT', null, page4)">
        <span class="head-txt">其他</span>
        <span class="head-line"></span>
      </div>
    </div>
    <div class="bodys">
      <div class="tab_container" v-if="flag == 1">
        <b-scroll
          class="scroll"
          ref="scrollRef1"
          :data="allData"
          :beforeScroll="beforeScrollData"
          @beforeScroll="beforeScroll"
          :pullup="pullup"
          :touchend="touchend"
          :listenScroll="listenScroll"
          @scroll="scroll"
          @scrollToEnd="scrollToEnd1"
          @pulldownTouchend="pulldownTouchend"
        >
          <loading v-show="pulldownFresh" :title="pulldownFreshText"></loading>
          <div class="body-box" v-for="(item, index) in allData" :key="index">
            <div class="body-left">
              <span class="body-txt">{{ item.txDesc }}</span>
              <span class="body-date">{{ item.createTime }}</span>
            </div>
            <div class="body-right">
              <span class="body-money" :class="{ actives: item.txAmount < 0 }">{{ item.txAmount | plusFilter }}元</span>
            </div>
          </div>
          <loading v-show="hasMore1"></loading>
          <no-data v-if="!allData.length"></no-data>
        </b-scroll>
      </div>
      <div class="tab_container" v-if="flag == 2">
        <b-scroll
          class="scroll"
          ref="scrollRef2"
          :data="chargeData"
          :beforeScroll="beforeScrollData"
          @beforeScroll="beforeScroll"
          :pullup="pullup"
          :touchend="touchend"
          :listenScroll="listenScroll"
          @scroll="scroll"
          @scrollToEnd="scrollToEnd2"
          @pulldownTouchend="pulldownTouchend"
        >
          <loading v-show="pulldownFresh" :title="pulldownFreshText"></loading>
          <div class="body-box" v-for="(item, index) in chargeData" :key="index">
            <div class="body-left">
              <span class="body-txt">{{ item.txDesc }}</span>
              <span class="body-date">{{ item.createTime }}</span>
            </div>
            <div class="body-right">
              <span class="body-money" :class="{ actives: item.txAmount < 0 }">{{ item.txAmount | plusFilter }}元</span>
            </div>
          </div>
          <loading v-show="hasMore2"></loading>
          <no-data v-if="!chargeData.length"></no-data>
        </b-scroll>
      </div>
      <div class="tab_container" v-if="flag == 3">
        <b-scroll
          class="scroll"
          ref="scrollRef3"
          :data="toCashData"
          :beforeScroll="beforeScrollData"
          @beforeScroll="beforeScroll"
          :pullup="pullup"
          :touchend="touchend"
          :listenScroll="listenScroll"
          @scroll="scroll"
          @scrollToEnd="scrollToEnd3"
          @pulldownTouchend="pulldownTouchend"
        >
          <loading v-show="pulldownFresh" :title="pulldownFreshText"></loading>
          <div class="body-box" v-for="(item, index) in toCashData" :key="index">
            <div class="body-left">
              <span class="body-txt">{{ item.txDesc }}</span>
              <span class="body-date">{{ item.createTime }}</span>
            </div>
            <div class="body-right">
              <span class="body-money" :class="{ actives: item.txAmount < 0 }">{{ item.txAmount | plusFilter }}元</span>
            </div>
          </div>
          <loading v-show="hasMore3"></loading>
          <no-data v-if="!toCashData.length"></no-data>
        </b-scroll>
      </div>
      <div class="tab_container" v-if="flag == 4">
        <b-scroll
          class="scroll"
          ref="scrollRef4"
          :data="otherData"
          :beforeScroll="beforeScrollData"
          @beforeScroll="beforeScroll"
          :pullup="pullup"
          :touchend="touchend"
          :listenScroll="listenScroll"
          @scroll="scroll"
          @scrollToEnd="scrollToEnd4"
          @pulldownTouchend="pulldownTouchend"
        >
          <loading v-show="pulldownFresh" :title="pulldownFreshText"></loading>
          <div class="body-box" v-for="(item, index) in otherData" :key="index">
            <div class="body-left">
              <span class="body-txt">{{ item.txDesc }}</span>
              <span class="body-date">{{ item.createTime }}</span>
            </div>
            <div class="body-right">
              <span class="body-money" :class="{ actives: item.txAmount < 0 }">{{ item.txAmount | plusFilter }}元</span>
            </div>
          </div>
          <loading v-show="hasMore4"></loading>
          <no-data v-if="!otherData.length"></no-data>
        </b-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui' //tabItem
import { getUserTransaction } from '@/api/djs/transaction'
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading/Loading'
import BScroll from '@/components/BScroll/BScroll'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'index',
  components: {
    BScroll,
    Loading,
    NoData
  },
  data() {
    return {
      pulldown: true,
      pulldownFresh: false, // 下拉loading出现标志
      pulldownFreshText: '下拉刷新',
      beforeScrollData: true,
      pullup: true, // 开启上拉加载
      touchend: true, // 开启监听松开手指事件
      listenScroll: true, // 开启监听scroll滚动位置
      hasMore1: true,
      hasMore2: true,
      hasMore3: true,
      hasMore4: true,
      // curPage:1,
      flag: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      allData: [], //全部
      chargeData: [], //充值
      toCashData: [], //提现
      otherData: [] //其他
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.clickGetRecord(1, null, null, 1)
    // console.log(this.allData+'------')
  },
  methods: {
    clickGetRecord(val, txType, txDate, page) {
      this.flag = val
      let data = {
        userName: this.user.userName,
        timeType: 'ODLX',
        // tranType:'XSCC'
        txType: txType,
        txDate: txDate,
        curPage: page
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
          // console.log(resp)
          if (resp.resultCode == 1) {
            // console.log(resp.data)
            let list = resp.list
            let countPage = resp.countPage
            let curPage = resp.curPage
            if (txType === 'TXCZ') {
              // 充值
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
    },
    // 上拉加载数据
    scrollGetRecord(txType, txDate, page) {
      let data = {
        txType: txType,
        txDate: txDate,
        curPage: page
      }
      getUserTransaction(data).then(res => {
        let resp = res.data
        if (resp.resultCode == 1) {
          let list = resp.data.list
          if (txType === 'TXCZ') {
            if (!list.length) {
              this.hasMore2 = false
              Toast('没有更多')
              return
            } else {
              this.hasMore2 = true
            }
            this.chargeData = this.chargeData.concat(list)
          } else if (txType === 'TXTX') {
            if (!list.length) {
              this.hasMore3 = false
              Toast('没有更多')
              return
            } else {
              this.hasMore3 = true
            }
            this.toCashData = this.toCashData.concat(list)
          } else if (txType === 'TXQT') {
            if (!list.length) {
              this.hasMore4 = false
              Toast('没有更多')
              return
            } else {
              this.hasMore4 = true
            }
            this.otherData = this.otherData.concat(list)
          } else {
            if (!list.length) {
              this.hasMore1 = false
              Toast('没有更多')
              return
            } else {
              this.hasMore1 = true
            }
            this.allData = this.allData.concat(list)
          }
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    scroll(pos) {
      // 监控上下拉
      if (pos.y > 10) {
        this.pulldownFresh = true
      }
      if (pos.y > 30) {
        this.pulldownFreshText = '松开刷新'
      }
    },
    pulldownTouchend(pos) {
      // 下拉松开手指，刷新
      if (pos.y >= 0 && this.pulldownFresh) {
        // 在下拉，并且拉了超过10px的距离
        this.pulldownFreshText = '正在刷新'
        setTimeout(() => {
          this.pulldownFresh = false
          Toast('刷新成功')
          this.refresh()
        }, 500)
      }
    },
    scrollToEnd1() {
      // 上拉到底部，加载更多
      if (!this.hasMore1) {
        Toast('没有更多')
        return
      }
      this.page1++
      this.scrollGetRecord(null, null, this.page1)
    },
    scrollToEnd2() {
      // 上拉到底部，加载更多
      if (!this.hasMore2) {
        Toast('没有更多')
        return
      }
      this.page2++
      this.scrollGetRecord('TXCZ', null, this.page2)
    },
    scrollToEnd3() {
      // 上拉到底部，加载更多
      if (!this.hasMore3) {
        Toast('没有更多')
        return
      }
      this.page3++
      this.scrollGetRecord('TXTX', null, this.page3)
    },
    scrollToEnd4() {
      // 上拉到底部，加载更多
      if (!this.hasMore4) {
        Toast('没有更多')
        return
      }
      this.page4++
      this.scrollGetRecord('TXQT', null, this.page4)
    },
    beforeScroll() {
      this.$emit('beforeScroll')
    },
    matchClass(item) {
      if (item.txAmount.indexOf('-') > -1) {
        return 'minus'
      } else {
        return 'plus'
      }
    },
    refresh() {
      if (this.flag == 1) {
        this.$refs.scrollRef1.refresh()
      }
      if (this.flag == 2) {
        this.$refs.scrollRef2.refresh()
      }
      if (this.flag == 3) {
        this.$refs.scrollRef3.refresh()
      }
      if (this.flag == 4) {
        this.$refs.scrollRef4.refresh()
      }
    }
    // getUserTransaction() {
    //   getUserTransaction({ userName: '小狗' }).then(res => {
    //     console.log(res)
    //   })
    // }
  },
  filters: {
    plusFilter(data) {
      let result = data
      if (data.indexOf('-') === -1) {
        result = '+' + data
      }
      return result
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
    height: 100%;
    .tab_container {
      height: 100%;
      .scroll {
        width: 100%;
        height: 100%;
        overflow: auto;
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
            color: #f5a623;
            letter-spacing: 0;
            text-align: right;
            line-height: 0.21rem;
            margin-right: 0.15rem;
            .actives {
              color: #ec5e52;
            }
          }
        }
      }
    }
  }
}
</style>
