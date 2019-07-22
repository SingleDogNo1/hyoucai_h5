<template>
  <transition name="slide">
    <div class="notice" ref="container">
      <span v-if="!mobile" @click="$router.push({ name: 'DJSHomePage' })"></span>
      <b-scroll :beforeScroll="true" @beforeScroll="beforeScroll" class="notice_scroll" ref="scrollRefND">
        <div class="wrapper">
          <h2>{{ detail.title }}</h2>
          <div>{{ detail.createTime }}</div>
          <article id="content" v-html="detail.content"></article>
        </div>
      </b-scroll>
    </div>
  </transition>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import { noticeDetailApi } from '@/api/djs/notice'

const CODE_OK = '1'
export default {
  components: {
    BScroll
  },
  data() {
    return {
      text: '公告详情',
      mobile: this.$route.query.mobile,
      id: this.$route.params.id,
      detail: {}
    }
  },
  methods: {
    getDetail() {
      Indicator.open('正在加载')
      noticeDetailApi({ id: this.id }).then(res => {
        Indicator.close()
        let data = res.data
        if (data.resultCode === CODE_OK) {
          this.detail = data
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    refresh() {
      this.$refs.scrollRefND.refresh()
    },
    beforeScroll() {
      this.refresh()
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.notice {
  height: 100%;
  position: relative;
  > span {
    $size: 0.22rem; // 背景图尺寸
    $padding: 0.05rem; // 点击扩展区域尺寸
    position: fixed;
    z-index: 99;
    @include square($size);
    padding: 0.05rem;
    background-image: url('./homepage.png');
    background-size: $size;
    background-position: center;
    background-repeat: no-repeat;
    top: (0.44rem - $size -$padding * 2) / 2;
    right: 4%;
  }
  .notice_scroll {
    height: 100%;
    overflow: hidden;
    .wrapper {
      width: 100%;
      padding: 0.24rem 4% 0;
      text-align: center;
      h2 {
        font-size: 0.19rem;
        color: #333;
        word-break: break-all;
        text-align: center;
      }
      div {
        margin: 0.08rem auto 0.27rem;
        font-size: $font-size-small-s;
        color: #999;
      }
      /deep/ article {
        p {
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
          font-size: 0.15rem;
          color: #333;
          width: 3.27rem;
          text-align: left;
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
