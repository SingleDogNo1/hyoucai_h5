<template>
  <section v-if="datas.length > 0">
    <div class="commonList" v-for="(item, index) in datas" :key="index" :class="item.readStatus == 1 ? 'isRead' : ''">
      <div class="title" @click="toRepeatDetail(item.id, item.invOverDate)">
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
      repeatShow: false, //是否已读
      datas: [] //列表
    }
  },
  props: {},
  watch: {},
  methods: {
    toRepeatDetail(id, invOverDate) {
      let param = {
        id: id,
        userName: this.userName,
        authorization: this.authorization,
        messageType: 'FTXI'
      }
      api.getUpdateMessage(param).then(res => {
        console.log(res)
        this.$router.push({
          name: 'RepeatMsgDetail',
          query: { invOverDate }
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
    //复投消息接口
    api.getRepeatMessage(data).then(res => {
      let data = res.data.message
      let repeatUnReadData = data.repeatUnRead
      let repeatReadData = data.repeatRead

      this.datas = repeatReadData.concat(repeatUnReadData)
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
      width: 80%;
      position: relative;
      padding-left: 0.15rem;
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
