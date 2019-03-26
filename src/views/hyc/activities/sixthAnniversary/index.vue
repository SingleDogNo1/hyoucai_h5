<template>
  <div class="pageContainer" ref="container">
    <div class="inner" :class="{blur: detailFlag}">
      <div class="wrapper">
        <!--<div class="detail" @click="showDetail"></div>-->
        <img src="./bg.png" alt="">
        <div class="rule-icon" @click="showDetail"></div>
      </div>
    </div>
    <div class="detail-mask" v-if="detailFlag">
      <img src="./rule.png" alt="">
      <img src="./close-btn.png" class="close" alt="" @click="closeDialog">
    </div>
  </div>
</template>

<script>
import api from '@/api/hyc/ActivitiesApi/mateact'

export default {
  name: 'mateact',
  data() {
    return {
      title: '汇通金融六周年返现活动',
      type: this.$route.query.type,
      detailFlag: false
    }
  },
  methods: {
    showDetail() {
      this.detailFlag = true
    },
    closeDialog() {
      this.detailFlag = false
    }
  },
  created() {
    // api
    //   .getPageSinatureApi({
    //     url: window.location.href
    //   })
    //   .then(res => {
    //     const data = res.data
    //     wx.config({
    //       debug: false,
    //       appId: data.appid,
    //       timestamp: data.timestamp,
    //       nonceStr: data.noncestr,
    //       signature: data.signature,
    //       jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
    //     })
    //     wx.ready(() => {
    //       wx.onMenuShareTimeline({
    //         link: 'https://m.idjshi.com/website/activity.html#/mateact?mobile=1&type=0',
    //         imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
    //         title: '元旦抢先"机" 开心迎新年',
    //         success: function() {},
    //         cancel: function() {}
    //       })
    //       wx.onMenuShareAppMessage({
    //         link: 'https://m.idjshi.com/website/activity.html#/mateact?mobile=1&type=0',
    //         imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
    //         title: '元旦抢先"机" 开心迎新年',
    //         desc: '开心迎新年 Mate20&iPhone免费拿',
    //         type: '',
    //         dataUrl: '',
    //         success: function() {},
    //         cancel: function() {}
    //       })
    //       wx.onMenuShareQQ({
    //         link: 'https://m.idjshi.com/website/activity.html#/mateact?mobile=1&type=0',
    //         imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
    //         title: '元旦抢先"机" 开心迎新年',
    //         desc: '开心迎新年 Mate20&iPhone免费拿',
    //         success: function() {},
    //         cancel: function() {}
    //       })
    //       wx.onMenuShareWeibo({
    //         link: 'https://m.idjshi.com/website/activity.html#/mateact?mobile=1&type=0',
    //         imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
    //         title: '元旦抢先"机" 开心迎新年',
    //         desc: '开心迎新年 Mate20&iPhone免费拿',
    //         success: function() {},
    //         cancel: function() {}
    //       })
    //       wx.onMenuShareQZone({
    //         link: 'https://m.idjshi.com/website/activity.html#/mateact?mobile=1&type=0',
    //         imgUrl: 'http://h5.dpandora.cn/images/favicon.ico',
    //         title: '元旦抢先"机" 开心迎新年',
    //         desc: '开心迎新年 Mate20&iPhone免费拿',
    //         success: function() {},
    //         cancel: function() {}
    //       })
    //     })
    //   })

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
                const data = res.data.data
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
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';

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
  background: url('./rule.png') 0 / contain;
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
  background-color: rgba(0, 0, 0, 0.6);
  .close {
    @include radiusCube(0.25rem);
    margin: 0.2rem auto 0;
  }
}
</style>
