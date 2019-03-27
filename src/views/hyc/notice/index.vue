<template>
  <transition name="slide">
    <div class="notice">
      <b-scroll
        :beforeScroll="true"
        @beforeScroll="beforeScroll"
        class="notice_scroll"
        ref="scrollRefND">
        <div class="wrapper">
          <h2>{{data.title}}</h2>
          <div>{{data.createTime}}</div>
          <article id="content" v-html="data.content">
          </article>
        </div>
      </b-scroll>
    </div>
  </transition>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import { noticeDetailApi } from '@/api/hyc/notice'

const CODE_OK = '1'
export default {
  components: {
    BScroll
  },
  data() {
    return {
      id: this.$route.params.id,
      data: {
        title: '',
        createTime: '',
        content: ''
      }
    }
  },
  methods: {
    getDetail() {
      Indicator.open('正在加载')
      noticeDetailApi({ id: this.id }).then(res => {
        Indicator.close()
        let data = res.data
        if (data.resultCode === CODE_OK) {
          this.data.title = data.title
          this.data.createTime = data.createTime
          this.data.content = data.content
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

.notice {
  height: 100%;
  .notice_scroll {
    height: 100%;
    .wrapper {
      width: 100%;
      padding: 0.24rem 4% 0;
      h2 {
        font-size: $font-size-medium-x;
        color: $color-text-b;
      }
      div {
        margin: 0.08rem auto 0.27rem;
        font-size: $font-size-small-s;
        color: $color-text-s;
      }
      /deep/ article {
        p {
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
          text-align: left;
          font-size: $font-size-small !important;
          color: $color-text-b;
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
