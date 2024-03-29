<template>
  <transition name="fade">
    <div class="gratitude" ref="container">
      <b-scroll
        class="scroll"
        ref="scrollRef"
        v-show="referers.length"
        :probeType="probeType"
        :listen-scroll="listenScroll"
        :pullup="pullup"
        @scrollToEnd="scrollToEnd"
        @scroll="scroll"
      >
        <div>
          <div class="my_recommonder">
            <div class="container">
              <div class="wrapper">
                <div class="slide border-bottom-1px" v-for="(referer, index) in referers" :key="index">
                  <div class="avator"></div>
                  <dl>
                    <dt>{{ referer.name }}</dt>
                    <dd>注册日期：{{ referer.createTime }}</dd>
                  </dl>
                  <span v-if="referer.investStatus === 0" class="uninvest">未出借</span>
                  <span v-if="referer.investStatus === 1" class="invested">已出借</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-scroll>
      <no-data v-if="!referers.length" class="no-data" />
    </div>
  </transition>
</template>

<script>
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import Swiper from 'swiper/dist/js/swiper'
import api from '@/api/djs/gratitude_money'
import NoData from '@/components/NoData/NoData'
import Hyoucai from '@/assets/js/hyoucai'

const CODE_OK = '1'
export default {
  components: {
    BScroll,
    NoData
  },
  data() {
    return {
      text: '我推荐的人',
      pulldownFreshText: '下拉刷新',
      probeType: 3,
      mobile: this.$route.query.mobile,
      authorization: Hyoucai.getItem('authorization'),
      showModel: false,
      refererAmt: '0', // 推荐人出借总额
      listenScroll: true,
      swiperHBanner: [],
      gratitudeMoney: ['12', '34', '56', '78'],
      referers: [],
      pullup: true,
      page: 1,
      hasMore: true
    }
  },
  methods: {
    getRecommender() {
      let headers = {
        version: '1.0'
      }
      let userName = ''
      if (this.$route.query.t) {
        headers.authorization = decodeURIComponent(this.$route.query.t)
        userName = this.$route.query.u
      }
      api
        .getRecommenderApi(
          {
            userName: userName,
            curPage: this.page
          },
          headers
        )
        .then(res => {
          if (res.data.resultCode === CODE_OK) {
            const list = res.data.inviteUser
            let curPage = res.data.curPage
            let countPage = res.data.countPage
            if (!list.length) {
              this.hasMore = false
              Toast('暂无数据')
            } else {
              this.hasMore = curPage < countPage
            }
            this.referers = [...this.referers, ...list]
            this.$nextTick(() => {
              this.refresh()
            })
          } else {
            Toast(res.data.resultMsg)
          }
        })
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    },
    scroll(pos) {
      if (pos.y > 10) {
        this.BScrollOptions.pulldownFresh = true
      }
      if (pos.y > 30) {
        this.pulldownFreshText = '松开刷新'
      }
    },
    scrollToEnd() {
      // 上拉到底部，加载更多
      if (this.hasMore) {
        this.page++
        this.getRecommender()
      }
    }
  },
  created() {
    if (this.$route.query.t) {
      this.authorization = decodeURIComponent(this.$route.query.t)
      Hyoucai.setItem('authorization', this.authorization)
      setTimeout(() => {
        this.getRecommender()
      }, 100)
    } else {
      this.getRecommender()
    }
    setTimeout(() => {
      new Swiper('.swiper-container-h', {
        slidesPerView: 3.5,
        spaceBetween: 8,
        freeMode: true
      })
    }, 100)
    this.$nextTick(() => {
      this.refresh()
    })
  },
  destroyed() {
    Hyoucai.removeItem('authorization')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/deep/ .swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  position: absolute;
  z-index: 999;
}

/deep/ .swiper-pagination-bullet {
  width: 5px;
  height: 5px;
  background: #fff;
  opacity: 0.4;
}

/deep/ .swiper-pagination-bullet-active {
  background: #fff;
  opacity: 1;
}

.gratitude {
  height: 100%;
  font-size: 0;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
      background-color: #fff;
    }
    .swiper_container {
      padding-top: 0.08rem;
      background-color: #eee;
      .swiper-container-h {
        position: relative;
        height: 1.52rem;
        padding: 0.16rem 0.3rem 0.16rem 0;
        overflow: hidden;
        background-color: #fff;
        .swiper-wrapper {
          padding-left: 0.15rem;
          .swiper-slide {
            width: 1rem;
            height: 1.2rem;
            .inn {
              height: 100%;
              padding: 0.16rem 0.08rem;
              @include bg-image('gratitude_money');
              background-size: 100% 100%;
              color: #fff;
              div {
                margin-bottom: 0.32rem;
                font-size: $font-size-small-s;
              }
              p {
                font-size: $font-size-small;
              }
            }
          }
        }
      }
    }
    .notice_wrapper {
      display: block;
      width: 100%;
      height: 0.44rem;
      margin: 0.08rem auto;
      font-size: 0;
      > div {
        width: 92%;
        height: 0.44rem;
        display: flex;
        padding: 0 0.15rem;
        margin: 0 auto;
        background-color: #eee;
        border-radius: 10000px;
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 0.41rem;
          height: 0.41rem;
          margin: 0.015rem 0.09rem 0 0;
          @include bg-image('notice');
          background-size: 100% 100%;
        }
        .swiper-container-v {
          display: inline-block;
          vertical-align: top;
          height: 0.2rem;
          margin-top: 0.11rem;
          flex: 1;
          font-size: $font-size-small;
          overflow: hidden;
          .swiper-wrapper {
            height: 0.2rem;
          }
          .swiper-slide {
            height: 100%;
            text-align: left;
            a {
              display: inline-block;
              vertical-align: top;
              width: 2.06rem;
              color: $color-text;
              @include no-wrap();
            }
            span {
              vertical-align: top;
              color: $color-button;
            }
          }
        }
      }
    }
    .my_recommonder {
      padding: 0.16rem 0 0.2rem 0.16rem;
      margin: 0 0 0.08rem;
      background-color: #fff;
      .title_wrapper {
        h1 {
          font-size: $font-size-medium;
          color: $color-text;
          padding-right: 5%;
          text-align: left;
        }
      }
      .container {
        .slide {
          display: flex;
          padding: 0.16rem 0;
          @include border-bottom-1px(#eee);
          .avator {
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.16rem;
            border-radius: 50%;
            background-size: cover;
            @include bg-image('avatar');
          }
          dl {
            flex: 1;
            dt {
              font-size: $font-size-small;
              color: $color-text;
            }
            dd {
              font-size: $font-size-small-s;
              color: $color-text-s;
            }
          }
          span {
            width: 0.5rem;
            margin: 0.04rem 0.39rem 0 0;
            font-size: $font-size-small;
            &.invested {
              color: $color-text;
            }
            &.uninvest {
              color: $color-text-s;
            }
          }
          &:last-child {
            &:after {
              border: none;
            }
          }
        }
      }
    }
  }
}

.no-data {
  background: #fff;
  /deep/ .event {
    color: $color-placeholder;
  }
}
</style>
