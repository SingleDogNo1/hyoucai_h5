<template>
  <div class="index">
    <BScroll ref="HomePageScroll" class="index-scroll">
      <div class="wrapper">
        <header>
          <h6>汇有财</h6>
          <p>唯有赚钱不能停</p>
          <button :class="{ new: newNotice }" @click="toMsgDetail"></button>
        </header>
        <ul class="tabs">
          <li @click="showTabs('AboutUs')">
            <img src="./xxpl.png" alt="" />
            <span>信息披露</span>
          </li>
          <li @click="showTabs('ArchivalInfo')">
            <img src="./zjcg.png" alt="" />
            <span>资金存管</span>
          </li>
          <li @click="showTabs('InfoDisclose')">
            <img src="./yysj.png" alt="" />
            <span>运营数据</span>
          </li>
          <li @click="showTabs('DJSActivityCenter')">
            <img src="./hdtj.png" alt="" />
            <button>hot</button>
            <span>活动推荐</span>
          </li>
        </ul>
        <div class="notice-board">
          <div class="title"></div>
          <div class="notice swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in noticeList" :key="index" @click="toNoticeDetail(item.id)">
                <span>{{ item.title }}</span>
              </div>
            </div>
          </div>
          <p @click="showTabs('DJSNoticeList')">更多</p>
        </div>
        <div class="newbie" v-for="(item, index) in noviceProjectList" :key="index">
          <h6>新手专享</h6>
          <button>新手专享</button>
          <div class="rate">
            <span>{{ item.basicsInvestRate }}</span>
            <span>%</span>
            <span v-if="parseFloat(item.activityInvestRate) !== 0">+{{item.activityInvestRate}}%</span>
          </div>
          <p>历史年化收益率</p>
          <ul class="tags" v-if="item.tags">
            <li v-for="(tagItem, tagIndex) in item.tags" :key="tagIndex" :style="{ background: tagItem.tagColor ? tagItem.tagColor : '#fff' }">
              {{ tagItem.tagName }}
            </li>
          </ul>
          <input type="button" :value="user ? '立即赚钱' : '注册 / 登录'" @click="handleInvest(item.projectNo)" />
          <div class="tips">{{ item.projectTips }}</div>
        </div>
        <div class="hot-wrapper" v-if="popularProjectList">
          <div class="title">
            <p>热门推荐</p>
            <button @click="toInvestList">全部 <i class="iconfont icon-rightpage"></i></button>
          </div>
          <section v-for="(item, index) in popularProjectList" :key="index">
            <div class="item-title">
              <p>{{ item.projectName }}</p>
              <div v-if="item.tags">
                <template v-for="(tagItem, tagIndex) in item.tags">
                  <!-- 显示图标 -->
                  <img :key="tagIndex" v-if="tagItem.tagType === 1" :src="tagItem.icon" alt="" />
                  <!-- 显示文字 -->
                  <p :key="tagIndex" v-else-if="tagItem.tagType === 0">{{ tagItem.tagName }}</p>
                </template>
              </div>
            </div>
            <div class="item-inner">
              <div class="left">
                <ul class="rate">
                  <li>
                    <span>{{ item.basicsInvestRate }}</span>
                    <span>%</span>
                    <span v-if="parseFloat(item.activityInvestRate) !== 0">+{{item.activityInvestRate}}%</span>
                  </li>
                  <li><p>历史年化收益率</p></li>
                </ul>
                <ul class="day">
                  <li>{{ item.investMent }}</li>
                  <li><p>锁定期</p></li>
                </ul>
              </div>
              <div class="right">
                <button v-if="item.status === '1'" @click="handleInvest(item.projectNo)">授权出借</button>
                <button class="disabled" v-else>暂未开启</button>
              </div>
            </div>
          </section>
        </div>
        <footer>
          <p>
            <img src="./homepage-footer.png" alt="" />
            <span>账户资金安全由江西银行和人寿财险共同保障</span>
          </p>
          <div>网贷有风险，出借需谨慎</div>
          <template v-for="(item, index) in reportTel">
            <div :key="index" v-if="item.status === '1'">
              <span>{{ item.companyName }}</span>
              <span>{{ item.telephone }}</span>
            </div>
          </template>
        </footer>
      </div>
    </BScroll>
    <div class="dialog">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swiper from 'swiper'
import { getList, getQualityList } from '@/api/djs/homepage'
import { Toast } from 'mint-ui'
import { reportTelephoneApi, getUnreadMsgApi, openScreenMsgApi } from '@/api/common/common'
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'index',
  mixins: [],
  components: {
    BScroll
  },
  data() {
    return {
      openScreenDialog: false, // 是否显示开屏弹窗
      newNotice: false, // 是否有新公告
      noticeList: [], // 公告列表
      noviceProjectList: [], // 新手专享产品列表
      popularProjectList: [], // 热门推荐产品列表
      reportTel: null // 举报电话
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: {},
  watch: {},
  methods: {
    toMsgDetail() {
      if (!this.user) {
        this.$router.push({
          name: 'loginRegister'
        })
      } else {
        this.$router.push({
          name: 'DJSSiteMessage'
        })
      }
    },
    showTabs(router_name) {
      this.$router.push({
        name: router_name
      })
    },
    toNoticeDetail(notice_id) {
      if (!this.user) {
        this.$router.push({
          name: 'loginRegister'
        })
      } else {
        this.$router.push({
          name: 'DJSNoticeDetail',
          params: { id: notice_id }
        })
      }
    },
    handleInvest(projectNo) {
      if (this.user && this.user.userName) {
        // 已登录
        this.$router.push({
          name: 'DJSInvestDetail',
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
      this.$router.push({
        name: 'DJSInvestment'
      })
    }
  },
  created() {
    const $this = this
    ;(async function init() {
      await getList({ paramCode: 'WZGG' }).then(res => {
        const data = res.data
        if (data.resultCode === '1') {
          $this.noticeList = data.zxdtMtbdlist
          $this.$nextTick(() => {
            new Swiper('.notice', {
              direction: 'vertical',
              autoplay: true,
              loop: true
            })
          })
        } else {
          Toast(data.resultMsg)
        }
      })
      await getQualityList({
        userName: $this.user ? $this.user.userName : null
      }).then(res => {
        const data = res.data
        $this.noviceProjectList = data.noviceProjectList
        $this.popularProjectList = data.popularProjectList
      })
      await reportTelephoneApi().then(res => {
        if (res.data.resultCode === '1') {
          $this.reportTel = res.data.data
        } else {
          Toast(res.data.resultMsg)
        }
      })
      await $this.$nextTick(() => {
        $this.$refs.HomePageScroll.refresh()
      })
    })()
  },
  mounted() {
    if (this.user && this.user.userName) {
      getUnreadMsgApi().then(res => {
        const data = res.data.data
        this.newNotice = data.haveUnreadMessage
      })
    }
    openScreenMsgApi().then(res => {
      console.log(res)
      this.open
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.index {
  height: 100%;
  .index-scroll {
    height: 100%;
    background: #fff;
  }
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
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        @include square(0.38rem);
      }
      button {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateY(-95%);
        font-size: 0.13rem;
        color: #fff;
        @include cube(0.3rem, 0.2rem);
        background: #ec5e52;
        box-shadow: 0 0.02rem 0.04rem 0 rgba(236, 94, 82, 0.3);
        border-radius: 0.1rem 0.1rem 0.1rem 0;
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
    p {
      color: #333;
      padding-right: 0.1rem;
      margin-left: auto;
      line-height: 0.4rem;
    }
  }
  .newbie {
    position: relative;
    width: 3.45rem;
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
      @include border-bottom-1px(#e8e8e8);
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
      box-sizing: border-box;
      @include cube(100%, 1.22rem);
      @include border-bottom-1px(#e8e8e8);
      padding: 0.15rem;
      display: flex;
      flex-direction: column;
      .item-title {
        display: flex;
        p {
          font-size: 0.15rem;
          color: #333;
          line-height: 0.24rem;
          margin-right: 0.07rem;
        }
        div {
          display: flex;
          align-self: center;
          img {
            height: 0.16rem;
            margin-right: 0.07rem;
          }
        }
      }
      .item-inner {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .left {
          padding-top: 0.05rem;
          flex: 1;
          display: flex;
          justify-content: space-between;
          .rate {
            flex: 1;
            li {
              color: #ec5e52;
            }
            p {
              font-size: 0.13rem;
              color: #999;
              text-align: left;
              line-height: 0.24rem;
            }
            span {
              font-size: 0.16rem;
              &:first-child {
                font-size: 0.26rem;
              }
            }
          }
          .day {
            width: 1.1rem;
            li {
              font-size: 0.15rem;
              color: #333333;
              text-align: left;
              &:first-child {
                line-height: 0.37rem;
              }
            }
            p {
              font-size: 0.13rem;
              color: #999;
              text-align: left;
            }
          }
        }
        .right {
          width: 0.82rem;
          display: flex;
          align-self: center;
          button {
            @include cube(0.82rem, 0.3rem);
            line-height: 0.3rem;
            background: #ec5e52;
            border-radius: 0.04rem;
            font-size: 0.13rem;
            color: #fff;
            &.disabled {
              background: #ccc;
            }
          }
        }
      }
    }
  }
  footer {
    padding: 0.17rem 0;
    p {
      text-align: center;
      margin-bottom: 0.14rem;
      img {
        width: 0.14rem;
        margin-right: 0.05rem;
      }
      span {
        line-height: 1;
      }
    }
    div {
      font-size: 0.13rem;
      color: #999999;
      text-align: center;
      line-height: 0.24rem;
    }
  }
}
</style>
