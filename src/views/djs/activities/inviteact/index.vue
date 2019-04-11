<template>
  <div class="invite">
    <div class="inner" :class="{ blur: detailFlag }">
      <div class="wrapper">
        <img src="./invite-bg.png" alt="" />
        <div class="rule-icon" @click="showDetail"></div>
      </div>
    </div>
    <BScroll class="detail-mask" ref="scrollRef" :beforeScroll="true" @beforeScroll="beforeScroll" v-show="detailFlag">
      <div>
        <img src="./rule.png" class="rule" alt="" />
        <img src="./close-btn.png" class="close" alt="" @click="closeDialog" />
      </div>
    </BScroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import api from '@/api/common/activities'

export default {
  name: 'inviteact',
  data() {
    return {
      detailFlag: false
    }
  },
  components: {
    BScroll
  },
  methods: {
    showDetail() {
      this.detailFlag = true
      this.$nextTick(() => {
        this.refresh()
      })
    },
    closeDialog() {
      this.detailFlag = false
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    },
    beforeScroll() {
      this.refresh()
    }
  },
  created() {
    const [shareTitle, shareDesc, shareImgUrl, shareLink] = [
      'shareTitle',
      'shareDesc',
      'http://h5.dpandora.cn/images/favicon.ico',
      window.location.href
    ]
    api
      .getPageSinatureApi({
        url: window.location.href
      })
      .then(res => {
        const data = res.data
        wx.config({
          debug: true,
          // appId: data.appid,
          appId: 'wx45d16cf33a73b663',
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        })
        wx.ready(() => {
          wx.onMenuShareTimeline({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle
          })
          wx.onMenuShareAppMessage({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQQ({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareWeibo({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQZone({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
        })
      })

    const activityId = this.$route.query.activityId
    const userName = this.$route.query.userName

    // 如果是从h5活动列表进入的，用我们自己的分享逻辑
    // 如果是直接进入活动详情，app用自己的分享功能
    if (window.history.length > 1) {
      const t = setInterval(() => {
        if (window.DjsJsBridge && activityId) {
          api
            .getShareInfoApi({
              id: activityId,
              userName: userName
            })
            .then(res => {
              if (res.data.resultCode === '1') {
                const data = res.data
                const params = {
                  title: data.title,
                  content: data.description,
                  imgUrl: data.iconUrl,
                  shareType: data.shareType,
                  backPicUrl: data.backPicUrl,
                  qrPicUrl: data.qrPicUrl,
                  url: window.location.href
                }
                let shareInfo = JSON.stringify(params)
                window.DjsJsBridge.getShareKey(shareInfo)
                clearInterval(t)
              }
            })
        }
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

.inner.blur {
  filter: blur(4px);
}

.wrapper {
  position: relative;
  width: 100%;
  img {
    width: 100%;
  }
  .rule-icon {
    position: fixed;
    z-index: 999999;
    right: 0;
    top: 0.24rem;
    width: 0.7rem;
    height: 0.22rem;
    background-image: url('./rule-icon.png');
    background-size: 100% 100%;
  }
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
  background: url('rule.png') 0 / contain;
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
  background-color: rgba(0, 0, 0, 0.6);
  overflow: auto;
  > div {
    padding: 0.15rem;
  }
  .rule {
    width: 100%;
  }
  .close {
    display: block;
    @include radiusCube(0.25rem);
    margin: 0.2rem auto;
  }
}
</style>
