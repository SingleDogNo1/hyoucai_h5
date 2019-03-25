<template>
  <div class="pageContainer" ref="container">
    <div class="inner">
      <div class="wrapper">
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/djs/ActivitiesApi/mateact'

export default {
  name: 'register',
  data() {
    return {
      title: '千元注册礼包随你拿',
      type: this.$route.query.type
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
.wrapper {
  position: relative;
  width: 100%;
  height: 19.38rem;
  background: url('./reg-bg.png') 0 / contain;
}
</style>
