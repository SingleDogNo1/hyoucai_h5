<template>
  <div class="act-3000">
    <div class="wrapper">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import api from '@/api/djs/ActivitiesApi/mateact'

export default {
  name: 'register',
  data() {
    return {}
  },
  created() {
    const [shareTitle, shareDesc, shareLink, shareImgUrl] = ['活动标题', '活动描述', window.location.href, 'http://h5.dpandora.cn/images/favicon.ico']
    api
      .getPageSinatureApi({
        url: window.location.href
      })
      .then(res => {
        const data = res.data
        console.log(res.data)
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
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareAppMessage({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc,
            type: '',
            dataUrl: '',
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareQQ({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc,
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareWeibo({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc,
            success: function() {},
            cancel: function() {}
          })
          wx.onMenuShareQZone({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc,
            success: function() {},
            cancel: function() {}
          })
        })
      })

    const activityId = this.$route.query.activityId

    // 如果是从h5活动列表进入的，用我们自己的分享逻辑
    // 如果是直接进入活动详情，app用自己的分享功能
    if (window.history.length > 1) {
      const t = setInterval(() => {
        if (window.DjsJsBridge && activityId) {
          api
            .getShareInfoApi({
              id: activityId
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
.act-3000 {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.wrapper {
  position: relative;
  background: url('./bg.jpg') 0 / contain;
  div {
    width: 100%;
    background-size: cover;
    &:first-child {
      height: 7.76rem;
      background-image: url('./01.jpg');
    }
    &:last-child {
      height: 7.765rem;
      background-image: url('./02.jpg');
    }
  }
}
</style>
