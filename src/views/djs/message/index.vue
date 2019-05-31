<template>
  <section>
    <div class="commonList" @click="linkTo('DJSCouponMsg')">
      <div class="title">
        <i v-if="couponShow"></i>
        <p>加息券消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('DJSRedMsg')">
      <div class="title">
        <i v-if="redShow" class="red_dot"></i>
        <p>红包消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('DJSExperienceMsg')">
      <div class="title">
        <i v-if="tasteShow"></i>
        <p>体验金消息</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
    <div class="commonList" @click="linkTo('DJSRepeatMsg')">
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
      platform: 'h5',
      readStatus: '0'
    }
    api.getUnReadMessage(data).then(res => {
      let data = res.data.message
      let tasteGoldMessageUnRead = data.tasteGoldMessageUnRead
      let couponMessageUnRead = data.couponMessageUnRead
      let repeatMsgUnRead = data.repeatMsgUnRead
      let redPacketMessageUnRead = data.redPacketMessageUnRead

      if (tasteGoldMessageUnRead == '1') {
        this.tasteShow = true
      }
      if (couponMessageUnRead == '1') {
        this.couponShow = true
      }
      if (repeatMsgUnRead == '1') {
        this.repeatShow = true
      }
      if (redPacketMessageUnRead == '1') {
        this.redShow = true
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
    justify-content: flex-end;
    display: flex;
    .title {
      flex: 1;
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
        left: 20%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      .red_dot {
        left: 16%;
      }
      .repeat_dot {
        left: 24%;
      }
    }
    .more {
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
