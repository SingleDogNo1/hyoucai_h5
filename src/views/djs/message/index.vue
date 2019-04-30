<template>
  <section>
    <div class="commonList" @click="linkTo('CouponMsg')">
      <div class="title">
        <i v-if="couponShow"></i>
        <p>加息券消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('RedMsg')">
      <div class="title">
        <i v-if="redShow" class="red_dot"></i>
        <p>红包消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('ExperienceMsg')">
      <div class="title">
        <i v-if="tasteShow"></i>
        <p>体验金消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('RepeatMsg')">
      <div class="title">
        <i v-if="repeatShow" class="repeat_dot"></i>
        <p>复投提醒消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
  </section>
</template>

<script>
import api from '@/api/djs/message'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {
      couponShow: false, //判断加息券消息红点
      redShow: false, //判断红包消息红点
      tasteShow: false, //判断体验金消息红点
      repeatShow: false //判断复投消息红点
    }
  },
  props: {},
  watch: {},
  methods: {
    linkTo(routerName) {
      this.$router.push({ name: routerName })
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    let data = {
      userName: this.user.userName,
      readStatus: '0'
    }
    //加息券未读消息中心接口
    api.getCouponUnreadCount(data).then(res => {
      let data = res.data.message
      let couponUnReadCount = data.couponUnRead.length
      if (couponUnReadCount > 0) {
        this.couponShow = true
      }
    })
    //红包消息接口
    api.getRedPacketCount(data).then(res => {
      let data = res.data.message
      if (data.length > 0) {
        this.redShow = true
      }
    })
    //体验金消息接口
    api.getTasteGoldCount(data).then(res => {
      let data = res.data.message
      if (data.length > 0) {
        this.tasteShow = true
      }
    })
    //复投消息接口
    api.getRepeatUnreadCount(data).then(res => {
      let data = res.data.message
      let repeatUnReadCount = data.repeatUnRead.length
      if (repeatUnReadCount > 0) {
        this.repeatShow = true
      }
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
section {
  background: #eee;
  padding-top: 0.06rem;
  .commonList {
    background: #fff;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 0.01rem solid #eeeeee;
    font-size: 0.13rem;
    color: #333333;
    padding-left: 0.15rem;
    .title {
      float: left;
      width: 70%;
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        z-index: 2;
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        background-color: #ef5c52;
        top: 42%;
        left: 26%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      .red_dot {
        left: 21%;
      }
      .repeat_dot {
        left: 31%;
      }
    }
    .more {
      display: flex;
      align-items: center;
      float: right;
      height: 0.5rem;
      img {
        height: 0.14rem;
        width: 0.14rem;
        padding-right: 0.15rem;
      }
    }
  }
}
</style>
