<template>
  <div class="act-3000">
    <div class="wrapper">
      <div>
        <p id="date">活动时间：3月28日-4月28日</p>
      </div>
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
    const [shareTitle, shareDesc, shareLink, shareImgUrl] = [
      '春天千万别开“花”，约TA一起拿红包',
      '单笔出借满一万，立得现金无上限',
      window.location.href,
      'http://h5.dpandora.cn/images/3000-act.png'
    ]

    api
      .getPageSinatureApi({
        url: window.location.href
      })
      .then(res => {
        const data = res.data
        wx.config({
          debug: false,
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
  div {
    width: 100%;
    background-size: cover;
    &:first-child {
      position: relative;
      height: 7.76rem;
      background-image: url('./01.jpg');
      p {
        width: 100%;
        font-size: 0.12rem;
        color: #0067b1;
        position: absolute;
        text-align: center;
        top: 1.8rem;
      }
    }
    &:last-child {
      height: 7.765rem;
      background-image: url('./02.jpg');
    }
  }
}
</style>
