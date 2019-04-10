<template>
  <div class="investment" ref="investment">
    <mt-navbar v-model="selected" v-if="user">
      <mt-tab-item v-if="showYZhiJiHua" class='tab_item' id="1">轻松投</mt-tab-item>
      <mt-tab-item v-if="showSanBiao" class='tab_item' id="2">自选投</mt-tab-item>
      <mt-tab-item v-if="showZQuanZhuanRang" class='tab_item' id="3">债权转让</mt-tab-item>
    </mt-navbar>
    <div class="tab-container-wrapper" ref="tabContainer">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item class='tab_container' id='1'>
          <b-scroll
            class="scroll"
            ref="scrollRef1"
            :data="yZhiJiHuaDataCompute"
            :pullup="pullup"
            :touchend="touchend"
            :listenScroll="listenScroll"
            @scroll="scroll"
            @scrollToEnd="scrollToEnd1"
            @pulldownTouchend="pulldownTouchend">
            <div>
              <ul>
                <li v-for="(item, index) in yZhiJiHuaData" :key="index" @click="selectYZhiJiHuaItem(item)">
                  <investment-item :itemData="item"></investment-item>
                </li>
              </ul>
            </div>
            <no-data v-if="!yZhiJiHuaData.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item class='tab_container' id='2'>
          <b-scroll
            class='scroll'
            ref='scrollRef2'
            :data="sanBiaoDataCompute"
            :pullup="pullup"
            :touchend="touchend"
            :listenScroll="listenScroll"
            @scroll="scroll"
            @scrollToEnd="scrollToEnd2"
            @pulldownTouchend="pulldownTouchend">
            <div>
              <ul>
                <li v-for="(item, index) in sanBiaoData" :key="index" @click="selectSanBiaoItem(item)">
                  <investment-item :itemData="item"></investment-item>
                  <div class="progress_wrapper" v-if="item.status !== 0">
                    <mt-progress :value="item.investPercent">
                      <div slot="end" :class="{text_dis:item.status !== 0}">已投{{item.showInvestPercent}}</div>
                    </mt-progress>
                  </div>
                  <div class="set_countdown" v-if="item.status === 0">
                    <div class="set_countdown"
                         v-if="item.status === 0 && item.remainingSeconds && item.remainingSeconds > 0">
                      <span>距离开售：</span>
                      <em>{{item.djs}}</em>
                    </div>
                  </div>
                  <div v-if="item.status === 2" class="full"></div>
                </li>
              </ul>
              <button v-if="showFiltered" class="all_prods" @click="allProds">查看全部产品</button>
            </div>
            <no-data v-if="!sanBiaoData.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item class='tab_container' id='3'>
          <b-scroll class='scroll'
                    ref='scrollRef3'>
            <div>
            </div>
            <no-data v-if="!zQuanZhuanRang.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  // Progress,
  Indicator
} from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import InvestmentItem from '@/components/InvestmentItem/InvestmentItem'
import Hyoucai from '@/assets/js/hyoucai'
// import apiIndex from '@/api/index'
import { collectionApi } from '@/api/hyc/investment/index'
// import NoData from '@/components/NoData/NoData'
import { mapGetters } from 'vuex'
import { timeCountDown } from '@/assets/js/utils'

const CODE_OK = '1'

function InitTime(endtime) {
  let dd = ''
  let hh = ''
  let mm = ''
  let ss = ''
  let time = endtime
  if (time <= 0) {
    return 0
  } else {
    let d
    d = (time - (time % 86400)) / 86400
    if (dd > 0 && dd < 10) {
      dd = '0' + d + ':'
    }
    if (dd >= 10) {
      dd = d + ':'
    }
    hh = ((time - (time % 3600)) / 3600) % 24
    mm = ((time - (time % 60)) / 60) % 60
    ss = time % 60
    hh = hh < 10 ? '0' + hh : hh
    mm = mm < 10 ? '0' + mm : mm
    ss = ss < 10 ? '0' + ss : ss
    let str = dd + hh + ':' + mm + ':' + ss
    return str
  }
}

let Timer1 = null // 优质计划计时器
let Timer2 = null // 散标计时器
export default {
  components: {
    // Progress,
    BScroll,
    InvestmentItem
    // NoData
  },
  data() {
    return {
      pulldown: true,
      pulldownFresh: false, // 下拉loading出现标志
      pulldownFreshText: '下拉刷新',
      pullup: true, // 开启上拉加载
      touchend: true, // 开启监听松开手指事件
      listenScroll: true, //  开启监听scroll滚动位置
      selected: '1',
      perpage: 15,
      page1: 1,
      page2: 1,
      page3: 1,
      hasMore1: true,
      hasMore2: true,
      hasMore3: true,
      authorization: Hyoucai.getItem('g_authorization'),
      yZhiJiHuaData: [],
      sanBiaoData: [],
      zQuanZhuanRang: [],
      showYZhiJiHua: false,
      showSanBiao: false,
      showZQuanZhuanRang: false,
      type: '',
      id: '',
      showFiltered: false
    }
  },
  props: ['redPacketId', 'couponId'],
  watch: {
    selected() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    goBack() {
      switch (this.type) {
        case 'C':
          this.$router.push({ name: 'coupons' })
          break
        case 'R':
          this.$router.push({ name: 'red_packets' })
          break
      }
    },
    allProds() {
      this.showFiltered = false
      this.$refs.tabContainer.style.top = 0.44 + 'rem'
      if (this.selected === '1') {
        this.clickGetYZhiJiHuaData()
      }
      if (this.selected === '2') {
        this.clickGetSanBiaoData()
      }
      this.refresh()
    },
    setNavShow() {
      apiIndex.getPageConfigApi().then(res => {
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          this.showYZhiJiHua = resp.data.TZ_YZJH === CODE_OK
          this.showSanBiao = resp.data.TZ_SB === CODE_OK
          this.showZQuanZhuanRang = resp.data.TZ_ZQZR === CODE_OK
          this.refresh()
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    // 散标
    selectSanBiaoItem(item) {
      if (item.status !== 2 && item.status !== 3) {
        if (this.type && this.showFiltered) {
          this.$router.push({
            path: `/investment/investDetail/${item.projectNo}`,
            query: { redPacketId: this.redPacketId, couponId: this.couponId }
          })
        } else {
          this.$router.push({
            path: `/investment/investDetail/${item.projectNo}`
          })
        }
      }
    },
    clickGetSanBiaoData(maxLine, curPage) {
      let data = {
        maxLine: maxLine,
        curPage: curPage
      }
      if (this.type && this.showFiltered) {
        data.extendType = this.type
        data.extendId = this.id
      }
      Indicator.open('正在加载')
      // api.projectApi(data).then(res => {
      //   Indicator.close()
      //   let resp = res.data
      //   if (resp.resultCode === CODE_OK) {
      //     this.sanBiaoData = []
      //     let list = resp.data.list
      //     let curPage = resp.data.curPage
      //     let countPage = resp.data.countPage
      //     if (!list.length) {
      //       this.hasMore2 = false
      //       Toast('无记录')
      //       return false
      //     } else if (curPage >= countPage) {
      //       this.hasMore2 = false
      //     } else {
      //       this.hasMore2 = true
      //     }
      //     this.sanBiaoDataCompute = [...list]
      //     this.countDown('sanBiao', this.sanBiaoData, this.sanBiaoDataCompute)
      //   } else {
      //     Toast(resp.resultMsg)
      //   }
      // })
    },
    scrollGetSanBiaoData(maxLine, curPage) {
      let data = {
        maxLine: maxLine,
        curPage: curPage
      }
      if (this.type && this.showFiltered) {
        data.extendType = this.type
        data.extendId = this.id
      }
      Indicator.open('正在加载')
      api.projectApi(data).then(res => {
        Indicator.close()
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          let list = resp.data.list
          let curPage = resp.data.curPage
          let countPage = resp.data.countPage
          if (!list.length) {
            this.hasMore2 = false
            Toast('没有更多')
            return
          } else if (curPage >= countPage) {
            this.hasMore2 = false
          } else {
            this.hasMore2 = true
          }
          this.sanBiaoDataCompute = [...this.sanBiaoData, ...list]
          this.countDown('sanBiao', this.sanBiaoData, this.sanBiaoDataCompute)
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    scrollToEnd2() {
      if (!this.hasMore2) {
        Toast('没有更多')
        return
      }
      this.page2++
      this.scrollGetSanBiaoData(this.perpage, this.page2)
    },
    // 优质计划
    selectYZhiJiHuaItem(item) {
      if (item.status !== 3) {
        if (this.type && this.showFiltered) {
          this.$router.push({
            path: `/investment/planDetail/${item.productId}/item/${item.itemId}`,
            query: { redPacketId: this.redPacketId, couponId: this.couponId }
          })
        } else {
          if (item.itemId) {
            // 集合标
            this.$router.push({
              path: `/investment/planDetail/${item.productId}/item/${item.itemId}`
            })
          } else {
            // 债转标
            this.$router.push({
              path: `/investment/planDetail/${item.productId}`
            })
          }
        }
      }
    },
    clickGetYZhiJiHuaData(maxLine, curPage) {
      let data = {
        maxLine: maxLine,
        curPage: curPage
      }
      if (this.type && this.showFiltered) {
        data.extendType = this.type
        data.extendId = this.id
      }
      Indicator.open('正在加载')
      collectionApi(data).then(res => {
        Indicator.close()
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          let list = resp.data.list
          list[0].status = 1
          list[0].remainingSeconds = 27836
          let curPage = resp.data.curPage
          let countPage = resp.data.countPage
          this.yZhiJiHuaData = []
          if (!list.length) {
            this.hasMore1 = false
            Toast('无记录')
            return
          } else if (curPage >= countPage) {
            this.hasMore1 = false
          } else {
            this.hasMore1 = true
          }
          this.yZhiJiHuaDataCompute = [...list]
          this.countDown('yZhiJiHua', this.yZhiJiHuaData, this.yZhiJiHuaDataCompute)
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    scrollGetYZhiJiHuaData(maxLine, curPage) {
      let data = {
        maxLine: maxLine,
        curPage: curPage
      }
      if (this.type && this.showFiltered) {
        data.extendType = this.type
        data.extendId = this.id
      }
      Indicator.open('正在加载')
      collectionApi(data).then(res => {
        Indicator.close()
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          let list = resp.data.list
          let curPage = resp.data.curPage
          let countPage = resp.data.countPage
          if (!list.length) {
            this.hasMore1 = false
            Toast('无记录')
            return
          } else if (curPage >= countPage) {
            this.hasMore1 = false
          } else {
            this.hasMore1 = true
          }
          this.yZhiJiHuaDataCompute = [...this.yZhiJiHuaData, ...list]
          this.countDown('yZhiJiHua', this.yZhiJiHuaData, this.yZhiJiHuaDataCompute)
          this.$refs.scrollRef1.refresh()
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    scrollToEnd1() {
      // 上拉到底部，加载更多
      if (!this.hasMore1) {
        Toast('没有更多')
        return
      }
      this.page1++
      this.scrollGetYZhiJiHuaData(this.perpage, this.page1)
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
        this.pulldownFreshText = '正在刷新'
        setTimeout(() => {
          this.pulldownFresh = false
          Toast('刷新成功')
          this.refresh()
        }, 500)
      }
    },
    refresh() {
      if (this.selected === '1') {
        if (this.showYZhiJiHua) {
          if (!this.yZhiJiHuaData.length) {
            this.clickGetYZhiJiHuaData(this.perpage, 1)
          }
          this.$refs.scrollRef1.refresh()
        }
      }
      if (this.selected === '2') {
        if (this.showSanBiao) {
          if (!this.sanBiaoData.length) {
            this.clickGetSanBiaoData(this.perpage, 1)
          }
          this.$refs.scrollRef2.refresh()
        }
      }
      if (this.selected === '3') {
        this.$refs.scrollRef3.refresh()
      }
    },
    countDown(type, data, list) {
      let listRes = list
      listRes.map(obj => {
        if (obj.remainingSeconds && obj.remainingSeconds > 0) {
          this.$set(obj, 'djs', InitTime(obj.remainingSeconds))
        }
      })
      data = JSON.parse(JSON.stringify(listRes))
      if (type === 'yZhiJiHua') {
        clearInterval(Timer1)
        this.yZhiJiHuaData = []
        this.yZhiJiHuaData = JSON.parse(JSON.stringify(listRes))
        // for (let key = 0; key < data.length; key++) {
        //   if (data[key]['remainingSeconds'] && data[key]['remainingSeconds'] >= 0 && data[key]['status'] === 1) {
        //     let t = data[key]['remainingSeconds']
        //     console.log(t)
        //     var that = this
        //     data[key]['djs'] = timeCountDown(t, 1, () => {
        //       this.yZhiJiHuaData = data
        //       console.log(this.yZhiJiHuaData[0]['djs'])
        //     })
        //   }
        // }

        Timer1 = setInterval(() => {
          for (let key = 0; key < data.length; key++) {
            if (data[key]['remainingSeconds'] && data[key]['remainingSeconds'] >= 0 && data[key]['status'] === 1) {
              let t = data[key]['remainingSeconds']
              timeCountDown(t, 1)
              if (t <= 0) {
                data[key]['status'] = 1
                data[key]['remainingSeconds'] = 0
              }
              data[key]['remainingSeconds']--
              let d = (t - (t % 86400)) / 86400
              let h = ((t - (t % 3600)) / 3600) % 24
              let i = ((t - (t % 60)) / 60) % 60
              let s = t % 60
              let result = ''
              if (d > 0) {
                result += d + '天'
              }
              result += h < 10 ? '0' + h + ':' : h + ':'
              result += i < 10 ? '0' + i + ':' : i + ':'
              result += s < 10 ? '0' + s : s
              data[key]['djs'] = result
            }
          }
          this.yZhiJiHuaData = data
        }, 1000)
      }
      if (type === 'sanBiao') {
        clearInterval(Timer2)
        this.sanBiaoData = []
        this.sanBiaoData = JSON.parse(JSON.stringify(listRes))
        Timer2 = setInterval(() => {
          for (let key = 0; key < data.length; key++) {
            if (data[key]['remainingSeconds'] >= 0 && data[key]['status'] === 0) {
              let t = data[key]['remainingSeconds']
              if (t <= 0) {
                data[key]['status'] = 1
                data[key]['remainingSeconds'] = 0
              }
              data[key]['remainingSeconds']--
              let d = (t - (t % 86400)) / 86400
              let h = ((t - (t % 3600)) / 3600) % 24
              let i = ((t - (t % 60)) / 60) % 60
              let s = t % 60
              let result = ''
              if (d > 0) {
                result += d + '天'
              }
              result += h < 10 ? '0' + h + ':' : h + ':'
              result += i < 10 ? '0' + i + ':' : i + ':'
              result += s < 10 ? '0' + s : s
              data[key]['djs'] = result
            }
          }
          this.sanBiaoData = data
        }, 1000)
      }
    }
  },
  created() {
    if (this.redPacketId) {
      this.type = 'R'
      this.id = this.redPacketId
    }
    if (this.couponId) {
      this.type = 'C'
      this.id = this.couponId
    }
    this.yZhiJiHuaDataCompute = []
    this.sanBiaoDataCompute = []
    this.clickGetYZhiJiHuaData()
    // this.setNavShow()
    this.$nextTick(() => {
      if (this.type) {
        this.showFiltered = true
        this.$refs.tabContainer.style.top = 0.88 + 'rem'
      }
      if (!this.user) {
        this.$refs.tabContainer.style.top = 0 + 'rem'
      }
    })
  },
  mounted() {},
  destroyed() {
    clearInterval(Timer1)
    clearInterval(Timer2)
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.mint-navbar {
  height: 0.44rem;
  margin-bottom: 0.08rem;
  box-shadow: inset 0 -1px 0 0 #eeeeee;
  .tab_item.mint-tab-item {
    font-size: $font-size-small-s;
    position: relative;
    /deep/ .mint-tab-item-label {
      font-size: $font-size-small-s;
    }
    &.is-selected {
      border-bottom: none;
      /deep/ .mint-tab-item-label {
        color: $color-button;
      }
      &:after {
        position: absolute;
        content: ' ';
        background-color: $color-button;
        width: 0.2rem;
        height: 0.02rem;
        bottom: 0.03rem;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
      }
    }
  }
}

.tab-container-wrapper {
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .mint-tab-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    /deep/ .mint-tab-container-wrap {
      height: 100%;
      .mint-tab-container-item.tab_container {
        height: 100%;
      }
    }
  }
}

.investment {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0.49rem;
  left: 0;
  margin: auto;
  font-size: 0;
  .scroll {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    ul {
      li {
        position: relative;
        background-color: #fff;
      }
    }
    .all_prods {
      display: block;
      width: 92%;
      height: 0.44rem;
      margin: 0.32rem auto 0;
      border-radius: 0.04rem;
      background-color: $color-button;
      font-size: $font-size-small;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
