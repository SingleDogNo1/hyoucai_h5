<template>
  <div class="investment" ref="investment">
    <mt-navbar v-model="selected" v-if="user">
      <template v-for="(item, index) in cataList">
        <mt-tab-item v-if="item.isDisplay === '1'" class="tab_item" :id="item.id" :key="index"> {{ item.modelName }} </mt-tab-item>
      </template>
    </mt-navbar>
    <div class="tab-container-wrapper" ref="tabContainer">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item class="tab_container" id="1">
          <b-scroll
            class="scroll"
            ref="scrollRef1"
            :data="yZhiJiHuaDataCompute"
            :pullup="pullup"
            :touchend="touchend"
            :listenScroll="listenScroll"
            @scroll="scroll"
            @scrollToEnd="scrollToEnd1"
            @pulldownTouchend="pulldownTouchend"
          >
            <div>
              <ul>
                <li v-for="(item, index) in yZhiJiHuaData" :key="index" @click="selectYZhiJiHuaItem(item)">
                  <investment-item :itemData="item"></investment-item>
                </li>
              </ul>
              <dl class="tips">
                <dt><img src="./image/cunguan.png" alt="" /></dt>
                <dd>账户资金安全由江西银行和人寿财险共同保障</dd>
              </dl>
            </div>
            <no-data v-if="!yZhiJiHuaData.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item class="tab_container" id="2">
          <b-scroll
            class="scroll"
            ref="scrollRef2"
            :data="sanBiaoDataCompute"
            :pullup="pullup"
            :touchend="touchend"
            :listenScroll="listenScroll"
            @scroll="scroll"
            @scrollToEnd="scrollToEnd2"
            @pulldownTouchend="pulldownTouchend"
          >
            <div>
              <ul>
                <li v-for="(item, index) in sanBiaoData" :key="index" @click="selectSanBiaoItem(item)">
                  <investment-item :itemData="item"></investment-item>
                </li>
              </ul>
              <dl class="tips">
                <dt><img src="./image/cunguan.png" alt="" /></dt>
                <dd>账户资金安全由江西银行和人寿财险共同保障</dd>
              </dl>
            </div>
            <no-data v-if="!sanBiaoData.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
        <mt-tab-container-item class="tab_container" id="3">
          <b-scroll class="scroll" ref="scrollRef3">
            <div></div>
            <no-data v-if="!zQuanZhuanRang.length"></no-data>
          </b-scroll>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import InvestmentItem from '@/components/InvestmentItem/InvestmentItem'
import { collectionApi, pageConfig, projectApi } from '@/api/hyc/investment'
import NoData from '@/components/NoData/NoData'
import { mapGetters } from 'vuex'

const CODE_OK = '1'

function initTime(t = 0) {
  if (t <= 0) {
    return '00:00:00'
  }
  let d = (t - (t % 86400)) / 86400
  let h = ((t - (t % 3600)) / 3600) % 24
  let i = ((t - (t % 60)) / 60) % 60
  let s = t % 60
  let result = ''
  if (d > 0) {
    result += d + '天'
  }
  result += h.toString().padStart(2, 0) + ':'
  result += i.toString().padStart(2, 0) + ':'
  result += s.toString().padStart(2, 0)
  return result
}

let Timer1 = null // 优质计划计时器
let Timer2 = null // 散标计时器
export default {
  components: {
    BScroll,
    InvestmentItem,
    NoData
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
      yZhiJiHuaData: [],
      sanBiaoData: [],
      zQuanZhuanRang: [],
      showYZhiJiHua: false,
      showSanBiao: false,
      showZQuanZhuanRang: false,
      type: '',
      id: '',
      showFiltered: false,
      cataList: []
    }
  },
  props: ['redPacketId', 'couponId'],
  watch: {
    selected(val) {
      if (val === '1' && !this.yZhiJiHuaData.length) {
        this.getYZhiJiHuaList()
        this.refresh()
      }
      if (val === '2' && !this.sanBiaoData.length) {
        this.getSanBiaoList()
        this.refresh()
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    setNavShow() {
      pageConfig().then(res => {
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          let list = resp.data.list
          list.map(item => {
            if (item.modelCode === 'TZ_YZJH') {
              item['id'] = '1'
              this.cataList.push(item)
            }
            if (item.modelCode === 'TZ_SB') {
              item['id'] = '2'
              this.cataList.push(item)
            }
            if (item.modelCode === 'TZ_ZQZR') {
              item['id'] = '3'
              this.cataList.push(item)
            }
          })
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
            name: 'HYCInvestDetail',
            query: {
              projectNo: item.projectNo,
              redPacketId: this.redPacketId,
              couponId: this.couponId
            }
          })
        } else {
          this.$router.push({
            name: 'HYCInvestDetail',
            query: {
              projectNo: item.projectNo
            }
          })
        }
      }
    },
    getSanBiaoList() {
      let data = {
        maxLine: this.perpage,
        curPage: this.page2
      }
      Indicator.open('正在加载')
      projectApi(data).then(res => {
        Indicator.close()
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          this.sanBiaoData = []
          let list = resp.data.list
          let curPage = resp.data.curPage
          let countPage = resp.data.countPage
          this.sanBiaoDataCompute = [...this.sanBiaoDataCompute, ...list]
          this.countDown('sanBiao', this.sanBiaoData, this.sanBiaoDataCompute)
          if (!list.length) {
            this.hasMore2 = false
            Toast('无记录')
          } else if (curPage >= countPage) {
            this.hasMore2 = false
          } else {
            this.hasMore2 = true
          }
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
      this.getSanBiaoList()
    },
    // 优质计划
    selectYZhiJiHuaItem(item) {
      if (item.status !== 3) {
        if (this.type && this.showFiltered) {
          this.$router.push({
            name: 'HYCInvestDetail',
            query: {
              productId: item.productId,
              itemId: item.itemId,
              redPacketId: item.redPacketId,
              couponId: item.couponId
            }
          })
        } else {
          if (item.projectType === 2) {
            // 集合标
            this.$router.push({
              name: 'HYCInvestDetail',
              query: {
                productId: item.productId,
                itemId: item.itemId
              }
            })
          }
          if (item.projectType === 1) {
            // 债转标
            this.$router.push({
              name: 'HYCInvestDetail',
              query: {
                productId: item.productId
              }
            })
          }
        }
      }
    },
    getYZhiJiHuaList() {
      let data = {
        maxLine: this.perpage,
        curPage: this.page1
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
          list[0]['status'] = 1
          list[0]['remainingSeconds'] = 5555
          list[0]['investEndTimestamp'] = 55555
          list[0]['investPercent'] = 3
          this.yZhiJiHuaDataCompute = [...this.yZhiJiHuaDataCompute, ...list]
          this.countDown('yZhiJiHua', this.yZhiJiHuaData, this.yZhiJiHuaDataCompute)
          this.refresh()
          if (!list.length) {
            this.hasMore1 = false
            Toast('无记录')
          } else if (curPage >= countPage) {
            this.hasMore1 = false
          } else {
            this.hasMore1 = true
          }
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
      this.getYZhiJiHuaList()
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
        this.$refs.scrollRef1.refresh()
      }
      if (this.selected === '2') {
        this.$refs.scrollRef2.refresh()
      }
      if (this.selected === '3') {
        this.$refs.scrollRef3.refresh()
      }
    },
    countDown(type, data, list) {
      let listRes = list
      listRes.map(obj => {
        if (obj.remainingSeconds && obj.remainingSeconds > 0) {
          this.$set(obj, 'djs', initTime(obj.remainingSeconds))
        }
      })
      data = listRes
      if (type === 'yZhiJiHua') {
        if (Timer1) {
          clearInterval(Timer1)
        }
        this.yZhiJiHuaData = []
        this.yZhiJiHuaData = listRes
        Timer1 = setInterval(() => {
          if (data.some(item => (item.remainingSeconds && item.remainingSeconds > 0) || item.status === 1)) {
            data.map(el => {
              let t = el['remainingSeconds']
              if (t < 1) {
                el['status'] = 2
                el['remainingSeconds'] = 0
                el['investEndTimestamp'] = 55555
                el['investPercent'] = 99.99
              } else {
                el['remainingSeconds']--
                el['djs'] = initTime(t)
              }
            })
          } else {
            clearInterval(Timer1)
          }
          this.yZhiJiHuaData = data
        }, 1000)
      }
      if (type === 'sanBiao') {
        if (Timer2) {
          clearInterval(Timer2)
        }
        this.sanBiaoData = []
        this.sanBiaoData = listRes
        Timer2 = setInterval(() => {
          if (data.some(item => (item.remainingSeconds && item.remainingSeconds > 0) || item.status === 1)) {
            data.map(el => {
              let t = el['remainingSeconds']
              if (t < 1) {
                el['status'] = 2
                el['remainingSeconds'] = 0
                el['investEndTimestamp'] = 55555
                el['investPercent'] = 99.99
              } else {
                el['remainingSeconds']--
                el['djs'] = initTime(t)
              }
            })
          } else {
            clearInterval(Timer2)
          }
          this.sanBiaoData = data
        }, 1000)
      }
    }
  },
  created() {
    this.yZhiJiHuaDataCompute = []
    this.sanBiaoDataCompute = []
    this.getYZhiJiHuaList()
    this.$nextTick(() => {
      if (!this.user) {
        this.$refs.tabContainer.style.top = 0 + 'rem'
      } else {
        this.setNavShow()
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

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.mint-navbar {
  height: 0.44rem;
  margin-bottom: 0.08rem;
  box-shadow: inset 0 -1px 0 0 #eeeeee;
  .tab_item.mint-tab-item {
    font-size: $font-size-small-s;
    position: relative;
    color: #a1a1a1;
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
        &:first-child {
          /deep/ .prod_item {
            padding-top: 0.1rem;
            .cata_title {
              margin-top: 0;
            }
          }
        }
      }
    }
    .tips {
      text-align: center;
      font-size: 0;
      padding: 0.09rem 0;
      dt,
      dd {
        display: inline-block;
        vertical-align: top;
      }
      dt {
        width: 0.13rem;
        margin-right: 0.05rem;
        margin-top: 0.02rem;
      }
      dd {
        font-size: $font-size-small-s;
        color: #999;
      }
    }
  }
}
</style>
