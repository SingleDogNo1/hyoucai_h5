<template>
  <section v-if="datas.length > 0">
    <div class="commonList" v-for="(item, index) in datas" :key="index" :class="item.readStatus == 1 ? 'isRead' : ''">
      <div class="title" @click="toCouponDetail(item.id, item.couponRate, item.validDays)">
        <i></i>
        <p>{{ item.msg }}</p>
      </div>
      <div class="more"><img src="./more_icon.png" /></div>
    </div>
  </section>
  <NoData v-else class="noData">
    <p><img alt="" src="./noData.png" /></p>
    <p>暂无消息</p>
  </NoData>
</template>

<script>
import api from '@/api/djs/message'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'index',
  mixins: [],
  components: {
    NoData
  },
  data() {
    return {
      userName: getUser().userName,
      authorization: getAuth(),
      couponShow: false, //是否已读
      datas: ''
    }
  },
  props: {},
  watch: {},
  methods: {
    toCouponDetail(id, couponRate, validDays) {
      let param = {
        id: id,
        userName: this.userName,
        authorization: this.authorization,
        messageType: 'JXQXI'
      }
      api.getUpdateMessage(param).then(res => {
        console.log(res)
        this.$router.push({
          name: 'CouponMsgDetail',
          query: { couponRate, validDays }
        })
      })
    }
  },
  computed: {},
  created() {
    let data = {
      userName: this.userName,
      authorization: this.authorization
    }
    //加息券消息接口
    api.getCouponMessage(data).then(res => {
      let data = res.data.message
      let couponUnReadData = data.couponUnRead
      let couponReadData = data.couponRead

      this.datas = couponReadData.concat(couponUnReadData)
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
  height: 100%;
  .commonList {
    background: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
    border-bottom: 0.01rem solid #eeeeee;
    font-size: 0.13rem;
    color: #333333;
    margin-bottom: 0.06rem;
    border-radius: 0.05rem;
    .title {
      float: left;
      width: 70%;
      position: relative;
      padding-left: 0.15rem;
      i {
        display: inline-block;
        position: absolute;
        z-index: 2;
        width: 0.06rem;
        height: 0.4rem;
        border-radius: 0.05rem 0 0 0.05rem;
        background-color: #ef5c52;
        left: 0;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .more {
      display: flex;
      align-items: center;
      float: right;
      height: 0.4rem;
      img {
        height: 0.14rem;
        width: 0.14rem;
        padding-right: 0.15rem;
      }
    }
  }
  .isRead {
    color: #ccc;
    .title {
      i {
        background-color: #ccc;
      }
    }
  }
  .noData {
    p {
      text-align: center;
      color: #999;
      font-size: 0.15rem;
    }
    img {
      margin-top: 0.5rem;
      width: 35%;
    }
  }
}
</style>
