<template>
  <div class="pageContainer" ref="container">
    <div class="inner" :class="{blur: detailFlag}">
      <div class="wrapper">
        <div class="detail" @click="showDetail"></div>
      </div>
    </div>
    <div class="detail-mask" v-if="detailFlag">
      <img src="./off.png" class="close" alt="" @click="closeDialog">
      <img src="./dialog.png" alt="">
    </div>
  </div>
</template>

<script>
// import BScroll from '@/components/BScroll/BScroll'
import axios from 'axios'

export default {
  name: 'coupon',
  components: {
    // BScroll,
  },
  data() {
    return {
      title: '春节迎财神大狂欢,加息券大派送',
      type: this.$route.query.type,
      detailFlag: false
    }
  },
  methods: {
    beforeScroll() {
      this.$refs.scrollRef.refresh()
    },
    showDetail() {
      this.detailFlag = true
    },
    closeDialog() {
      this.detailFlag = false
    }
  },
  created() {
    axios
      .get('https://api.idjshi.com:8443/wechat/getPageSinature', {
        params: {
          url: window.location.href
        }
      })
      .then(res => {
        const data = res.data
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        })
        wx.ready(() => {
          wx.onMenuShareTimeline({
            link: 'https://m.idjshi.com/website/activity.html#/coupon?mobile=1&type=0',
            imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
            title: '你有加息券可以使用，加息1%-4%',
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareAppMessage({
            link: 'https://m.idjshi.com/website/activity.html#/coupon?mobile=1&type=0',
            imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
            title: '你有加息券可以使用，加息1%-4%',
            desc: '只要您用，我们就送，加息多少自己说了算，收益拿到手软',
            type: '',
            dataUrl: '',
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareQQ({
            link: 'https://m.idjshi.com/website/activity.html#/coupon?mobile=1&type=0',
            imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
            title: '你有加息券可以使用，加息1%-4%',
            desc: '只要您用，我们就送，加息多少自己说了算，收益拿到手软',
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareWeibo({
            link: 'https://m.idjshi.com/website/activity.html#/coupon?mobile=1&type=0',
            imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
            title: '你有加息券可以使用，加息1%-4%',
            desc: '只要您用，我们就送，加息多少自己说了算，收益拿到手软',
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareQZone({
            link: 'https://m.idjshi.com/website/activity.html#/coupon?mobile=1&type=0',
            imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
            title: '你有加息券可以使用，加息1%-4%',
            desc: '只要您用，我们就送，加息多少自己说了算，收益拿到手软',
            success: function() {},
            cancel: function() {}
          })
        })
      })

    const activityId = this.$route.query.activityId
    const t = setInterval(() => {
      if (window.DjsJsBridge && activityId) {
        axios({
          methods: 'post',
          url: 'https://api.idjshi.com:8443/activity/getShareInfo',
          headers: {
            'Content-Type': 'X-WWW-FORM-URLENCODED'
          },
          params: {
            id: activityId
          }
        }).then(res => {
          if (res.data.resultCode === '1') {
            const params = {
              title: res.data.title,
              content: res.data.description,
              url: window.location.href,
              imgUrl: res.data.iconUrl
            }
            var shareInfo = JSON.stringify(params)
            window.DjsJsBridge.getShareKey(shareInfo)
            clearInterval(t)
          }
        })
      }
    }, 400)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';

.inner.blur {
  filter: blur(4px);
}

.wrapper {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 13.8rem;
  background: url('mate-bg11@3x.png') no-repeat;
  background-size: contain;
}

.bg-img {
  opacity: 0;
  display: block;
  width: 100%;
}

.btn-wrapper {
  position: fixed;
  width: 100%;
  height: 0.6rem;
  bottom: 0;
  left: 0;
  display: flex;
  background: rgb(204, 52, 41);
  &.all {
    .btn {
      font-weight: bold;
      transform: scale(0.85) translateY(0.05rem);
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 0.3rem;
      background: linear-gradient(#fefe64, #fec530);
      box-shadow: 0 4px 4px #ff911e;
      font-size: 0.2rem;
      &:first-child {
        @include border-right-1px(#ef263d);
      }
      span {
        font-size: 0.22rem;
        font-weight: bold;
      }
    }
  }
  &.half {
    .btn {
      font-weight: 700;
      transform: scale(0.85) translateY(0.05rem);
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 0.3rem;
      background: linear-gradient(#fefe64, #fec530);
      box-shadow: 0 4px 4px #ff911e;
      font-size: 0.2rem;
    }
  }
}

.detail {
  width: 0.7rem;
  height: 0.23rem;
  position: absolute;
  background: url('detail.png') 0 / contain;
  top: 0.15rem;
  right: 0;
}
.btn {
  flex: 1;
  font-size: 0.16rem;
  text-align: center;
  line-height: 0.55rem;
  color: #ef263d;
}

.detail-mask {
  position: fixed;
  z-index: 9999999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.15rem;
  background: rgba(0, 0, 0, 0.4);
  .close {
    @include radiusCube(0.23rem);
    align-self: flex-end;
    margin-bottom: 0.15rem;
  }
}
</style>
