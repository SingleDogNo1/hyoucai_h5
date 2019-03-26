<template>
  <div class="pageContainer" ref="container">
    <div class="inner" :class="{blur: detailFlag}">
      <div class="wrapper">
        <!--<div class="detail" @click="showDetail"></div>-->
        <img src="./bg.png" alt="">
        <div class="rule-icon" @click="showDetail"></div>
      </div>
    </div>
    <BScroll class="detail-mask" ref="scrollRef" :beforeScroll="true" @beforeScroll="beforeScroll" v-show="detailFlag">
      <div>
        <img src="./rule.png" class="rule" alt="">
        <img src="./close-btn.png" class="close" alt="" @click="closeDialog">
      </div>
    </BScroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import api from '@/api/djs/ActivitiesApi/mateact'

export default {
  name: 'womenday',
  data() {
    return {
      title: '汇通金融女王节活动',
      type: this.$route.query.type,
      detailFlag: false,
      id: '',
      msg: ''
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
  mounted() {
    const activityId = this.$route.query.activityId
    this.id = this.$route.query.activityId

    api
      .getShareInfoApi({
        id: 21
      })
      .then(res => {
        this.msg = JSON.stringify(res.data)
      })

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
