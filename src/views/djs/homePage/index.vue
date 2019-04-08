<template>
  <div class="index">
    <header>
      <h6>汇有财</h6>
      <p>唯有赚钱不能停</p>
      <button :class="{new: newNotice}" @click="toMsgDetail"></button>
    </header>
    <ul class="tabs">
      <li @click="showTabs('AboutUs')">
        <img src="./xxpl.png" alt="">
        <span>信息披露</span>
      </li>
      <li @click="showTabs('ArchivalInfo')">
        <img src="./zjcg.png" alt="">
        <span>资金存管</span>
      </li>
      <li @click="showTabs('InfoDisclose')">
        <img src="./yysj.png" alt="">
        <span>运营数据</span>
      </li>
      <li @click="showTabs('DJSActivityCenter')">
        <img src="./hdtj.png" alt="">
        <span>活动推荐</span>
      </li>
    </ul>
    <div class="notice-board">
      <div class="title"></div>
      <div class="notice swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in noticeList"
            :key="index"
            @click="toNoticeDetail(item.id)"
          ><span>{{item.title}}</span></div>
        </div>
      </div>
    </div>
    <div class="newbie" v-for="(item, index) in noviceProjectList" :key="index">
      <h6>新手专享</h6>
      <button>新手专享</button>
      <div class="rate">
        <span>{{item.investRate}}</span>
        <span>%</span>
      </div>
      <p>历史年化收益率</p>
      <ul class="tags" v-if="item.tags">
        <li v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" :style="{background: tagItem.tagColor ? tagItem.tagColor : '#fff'}">{{tagItem.tagName}}</li>
      </ul>
      <input type="button" :value="user ? '立即赚钱': '注册 / 登录'" @click="handleInvest(item.projectNo)">
      <div class="tips">{{item.projectTips}}</div>
    </div>
    <div class="hot-wrapper">
      <div class="title">
        <p>热门推荐</p>
        <button @click="toInvestList">全部 <i class="iconfont icon-rightpage"></i></button>
      </div>
      <section v-for="(item, index) in popularProjectList" :key="index">
        <!--{{item}}-->
        <div class="item-title">
          <p>{{item.projectName}}</p>
          <ul v-if="item.tags">
            <li v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex">
              <img :src="tagItem.icon" alt="">
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swiper from 'swiper'
import { getList, getQualityList } from '@/api/djs/homepage'
import { Toast } from 'mint-ui'

export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      newNotice: true, // 是否有新公告
      noticeList: [], // 公告列表
      noviceProjectList: null, // 新手专享产品列表
      popularProjectList: null // 热门推荐产品列表
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: {},
  watch: {},
  methods: {
    toMsgDetail() {
      // TODO 消息中心未完成
      console.log(`to-msg-detail`)
      // this.$router.push({
      //   name: ''
      // })
    },
    showTabs(router_name) {
      this.$router.push({
        name: router_name
      })
    },
    toNoticeDetail(notice_id) {
      this.$router.push({
        name: 'DJSNoticeDetail',
        params: { id: notice_id }
      })
    },
    handleInvest(projectNo) {
      if (this.user && this.user.userName) {
        // 已登录
        // TODO 跳转到对应的标的 routerName && routerQuery
        this.$router.push({
          name: '',
          query: {
            projectNo: projectNo
          }
        })
      } else {
        // 未登录
        this.$router.push({
          name: 'loginRegister'
        })
      }
    },
    toInvestList() {
      // TODO 点金石投资列表页 routerName
      this.$router.push({
        name: ''
      })
    }
  },
  created() {
    getList({ paramCode: 'WZGG' }).then(res => {
      const data = res.data
      if (data.resultCode === '1') {
        this.noticeList = data.zxdtMtbdlist
        this.$nextTick(() => {
          new Swiper('.notice', { direction: 'vertical' })
        })
      } else {
        Toast(data.resultMsg)
      }
    })
    getQualityList({
      userName: this.user ? this.user.userName : null
      // userName: 'djs836690ad'
    }).then(res => {
      const data = res.data
      this.noviceProjectList = data.noviceProjectList

      this.noviceProjectList = [
        {
          accumulativeInvAmt: '150000.00',
          accumulativeProfitAmt: '0.00',
          activityTagEntity: null,
          appDesc: '1',
          enablAmt: '0.00',
          enableAmtShowMax: '',
          head: null,
          iconUrl: null,
          interestSumMode: 'REDY',
          investMent: '15天',
          investPropleCount: '12',
          investRate: '8.0',
          investStatus: null,
          investTimes: '',
          investType: null,
          isShowEnableAmt: null,
          last: null,
          maxInvAmount: '50000.00',
          maxInvTotalAmt: '150000.00',
          minInvAmt: '2000.00',
          priority: 209,
          projectName: '新手标三期',
          projectNo: '20181125003',
          projectServiceEntity: null,
          projectTips: ' 2000元起购 您还剩余50000.00元新手额度',
          promptDes: '',
          safeguardLevel: '1',
          showInterestRates: '8.0%',
          showInvestPercent: '100.00%',
          status: '1',
          tags: [
            {
              tagCode: 1,
              tagName: '找陈敏',
              tagColor: '#ace'
            },
            {
              tagCode: 12,
              tagName: '何杉'
            },
            {
              tagCode: 123,
              tagName: '汪洪强',
              tagColor: '#ace'
            }
          ],
          type: '01',
          url: null
        }
      ]

      this.popularProjectList = data.popularProjectList
    })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.index {
  header {
    position: relative;
    h6 {
      font-size: 0.24rem;
      color: $color-text-b;
      text-align: center;
      line-height: 0.44rem;
      font-weight: bold;
    }
    p {
      font-size: 0.14rem;
      color: #999;
      letter-spacing: 0.85em;
      text-align: center;
      margin-bottom: 0.15rem;
    }
    button {
      position: absolute;
      top: 0.1rem;
      right: 0.15rem;
      @include cube(0.25rem, 0.19rem);
      background: url('./notice.png') center/contain no-repeat;
      &.new {
        background-image: url('./notice-new.png');
      }
    }
  }
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 0.25rem;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        @include square(0.38rem);
      }
      span {
        margin-top: 0.04rem;
        text-align: center;
        font-size: 0.14rem;
        color: $color-text-b;
      }
    }
  }
  .notice-board {
    @include cube(3.45rem, 0.4rem);
    margin: 0 auto;
    background: #f6f6f6;
    border-radius: 0.04rem;
    display: flex;
    .title {
      width: 0.6rem;
      position: relative;
      background: url('./notice-title.png') center no-repeat;
      background-size: 0.28rem auto;
      &:after {
        content: '';
        position: absolute;
        width: 0.01rem;
        height: 0.1rem;
        background: #e8e8e8;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 0;
      }
    }
    .notice {
      flex: 1;
      .swiper-slide {
        padding: 0 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.13rem;
        color: $color-text-b;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .newbie {
    position: relative;
    @include cube(3.45rem, 2.5rem);
    margin: 0.3rem auto 0.2rem;
    background: #fff;
    box-shadow: 0 0.02rem 0.16rem 0 rgba(204, 204, 204, 0.4);
    border-radius: 0.04rem;
    padding-top: 0.16rem;
    button {
      position: absolute;
      @include cube(0.7rem, 0.22rem);
      background: #f76b1c;
      border-top-right-radius: 0.04rem;
      border-bottom-left-radius: 0.1rem;
      top: 0;
      right: 0;
      font-size: 0.13rem;
      line-height: 0.22rem;
      color: #fff;
    }
    h6 {
      position: relative;
      font-size: 0.17rem;
      color: #ab917c;
      text-align: center;
      &:before,
      &:after {
        content: '';
        position: absolute;
        @include cube(0.5rem, 0.01rem);
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
      &:before {
        background: linear-gradient(90deg, #fff, #ab917c);
        left: 22%;
      }
      &:after {
        background: linear-gradient(-90deg, #fff, #ab917c);
        right: 22%;
      }
    }
    .rate {
      margin-top: 0.12rem;
      font-size: 0.17rem;
      color: #ec5e52;
      text-align: center;
      span:first-child {
        font-size: 0.37rem;
        line-height: 0.52rem;
      }
    }
    p {
      font-size: 0.13rem;
      color: #999;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    .tags {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.15rem;
        padding: 0.05rem;
        font-size: 0.11rem;
        color: #ab917c;
      }
    }
    input {
      @include cube(3.15rem, 0.4rem);
      margin: 0.2rem auto 0;
      background: #ec5e52;
      border-radius: 0.04rem;
      font-size: 0.16rem;
      color: #fff;
      text-align: center;
      display: block;
    }
    .tips {
      font-size: 0.13rem;
      color: #333;
      text-align: center;
      line-height: 0.25rem;
    }
  }
  .hot-wrapper {
    margin-top: 0.1rem;
    .title {
      padding: 0 0.15rem;
      height: 0.48rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid #e8e8e8;
      p {
        position: relative;
        font-size: 0.17rem;
        line-height: 1;
        color: #333333;
        padding-left: 0.1rem;
        &:before {
          content: '';
          position: absolute;
          @include radiusCube(0.03rem, 0.17rem);
          background-color: #333333;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto 0;
        }
      }
      button {
        padding: 0;
        background: #fff;
        color: #999999;
        i {
          font-size: 0.12rem;
        }
      }
    }
    section {
      @include cube(100%, 1.22rem);
      padding: 0.15rem;
      .item-title {
        display: flex;
        p {
          font-size: 0.15rem;
          color: #333;
          line-height: 0.24rem;
          margin-right: 0.07rem;
        }
      }
    }
  }
}
</style>
