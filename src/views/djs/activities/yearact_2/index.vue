<!--
  http://localhost:8080/#/d/activity/yearact_2?leaderInviteCode=d372144&groupId=1
-->

<template>
  <div class="wrapper">
    <div>
      <img src="./1.png" alt="" />
      <img src="./2.png" alt="" />
    </div>
    <div>
      <div class="area area1" @click="toActivityPage('DJSSpellGroupAct', { leaderInviteCode: leaderInviteCode, groupId: 1 })"></div>
      <div class="area area2" @click="toActivityPage('DJS3000Act')"></div>
      <div class="area area3" @click="toActivityPage('DJSyearAct')"></div>
    </div>
  </div>
</template>

<script>
import api from '@/api/common/activities'

export default {
  name: 'index',
  data() {
    return {
      // leaderInviteCode: this.$route.query.leaderInviteCode, // 团长邀请码
      leaderInviteCode: 'd600013', // 郝总邀请码
      groupId: 1 // 拼团活动Id
    }
  },
  methods: {
    toActivityPage(router_name, router_query) {
      this.$router.push({
        name: router_name,
        query: router_query
      })
    }
  },
  created: function() {
    const [shareTitle, shareDesc, shareImgUrl, shareLink] = [
      '6周年系列庆典，等你来嗨！',
      '以我6年坚守，换您6年同行。6周年感恩超大礼包，重磅来袭',
      'http://h5.dpandora.cn/images/yearact-2.png',
      window.location.href
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
    const userName = this.$route.query.userName

    console.log('网页地址============' + window.location.href)
    console.log('activityId==============' + activityId)
    console.log('userName===================' + userName)
    console.log(`是不是在APP环境中===========${window.DjsJsBridge ? '是' : '不是'}`)

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
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  img {
    width: 100%;
  }
  .area {
    position: absolute;
    background: #000;
    opacity: 0;
    width: 92%;
    height: 50px;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 8%;
    &.area1 {
      top: 43%;
      height: 10.3%;
    }
    &.area2 {
      top: 59.5%;
      height: 13%;
    }
    &.area3 {
      top: 77.3%;
      height: 18%;
    }
  }
}
</style>
