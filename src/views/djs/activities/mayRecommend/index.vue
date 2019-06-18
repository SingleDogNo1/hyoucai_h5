<template>
  <section class="may-recommender">
    <img src="./may-recommender.png" alt="五月推新活动" />
  </section>
</template>

<script>
import api from '@/api/common/activities'

export default {
  name: 'mayRecommender',
  created() {
    // const [shareTitle, shareDesc, shareLink, shareImgUrl] = [
    //   '五月推新活动',
    //   '五月推新活动',
    //   window.location.href,
    //   'http://h5.dpandora.cn/images/3000-act.png'
    // ]
    //
    // api
    //   .getPageSinatureApi({
    //     url: window.location.href
    //   })
    //   .then(res => {
    //     const data = res.data
    //     wx.config({
    //       debug: false,
    //       // appId: data.appid,
    //       appId: 'wx45d16cf33a73b663',
    //       timestamp: data.timestamp,
    //       nonceStr: data.noncestr,
    //       signature: data.signature,
    //       jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
    //     })
    //     wx.ready(() => {
    //       wx.onMenuShareTimeline({
    //         link: shareLink,
    //         imgUrl: shareImgUrl,
    //         title: shareTitle
    //       })
    //       wx.onMenuShareAppMessage({
    //         link: shareLink,
    //         imgUrl: shareImgUrl,
    //         title: shareTitle,
    //         desc: shareDesc
    //       })
    //       wx.onMenuShareQQ({
    //         link: shareLink,
    //         imgUrl: shareImgUrl,
    //         title: shareTitle,
    //         desc: shareDesc
    //       })
    //       wx.onMenuShareWeibo({
    //         link: shareLink,
    //         imgUrl: shareImgUrl,
    //         title: shareTitle,
    //         desc: shareDesc
    //       })
    //       wx.onMenuShareQZone({
    //         link: shareLink,
    //         imgUrl: shareImgUrl,
    //         title: shareTitle,
    //         desc: shareDesc
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

<style lang="scss" scoped></style>
