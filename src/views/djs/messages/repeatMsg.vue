<template>
  <BScroll
    class="message_wrap"
    ref="messageWrapper"
    :probeType="BScrollOption.probeType"
    :listen-scroll="BScrollOption.listenScroll"
    :pullup="BScrollOption.pullup"
    @scrollToEnd="scrollToEnd"
  >
    <div>
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
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { Toast, Indicator } from 'mint-ui'
import { mapGetters } from 'vuex'
import api from '@/api/djs/message'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'index',
  mixins: [],
  components: {
    BScroll,
    NoData
  },
  data() {
    return {
      repeatShow: false, //是否已读
      datas: [], //列表
      BScrollOption: {
        probeType: 3,
        listenScroll: true,
        pullup: true
      },
      page: 1,
      hasMore: true
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
          name: 'DJSRepeatMsgDetail',
          query: { invOverDate }
        })
      })
    },
    getData() {
      Indicator.open()
      api
        .getRepeatMsg({
          userName: this.user.userName,
          curPage: this.page
        })
        .then(res => {
          Indicator.close()
          const [list, curPage, countPage] = [res.data.message, res.data.curPage, res.data.countPage]

          if (!list.length) {
            this.hasMore = false
            Toast('没有更多数据了')
          } else {
            this.hasMore = parseInt(curPage) <= parseInt(countPage)
          }
          this.datas = [...this.datas, ...list]
          this.$nextTick(() => {
            this.$refs.messageWrapper.refresh()
          })
        })
    },
    scrollToEnd() {
      if (this.hasMore) {
        this.page++
        this.getData()
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getData()
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.message_wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
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
        display: flex;
        .title {
          flex: 1;
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
          justify-content: flex-end;
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
  }
}
</style>
