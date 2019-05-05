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
      <div v-if="datas.length > 0">
        <div class="module" v-for="(item, index) in datas" :key="index">
          <h2>{{ item.title }}</h2>
          <p>{{ item.message }}</p>
          <span>{{ item.createTime }}</span>
        </div>
      </div>
      <NoData v-else></NoData>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { Toast, Indicator } from 'mint-ui'
import { getSiteMessage } from '@/api/hyc/message'
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
      datas: [],
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
    getData() {
      Indicator.open()
      getSiteMessage({
        platform: 'h5',
        curPage: this.page
      }).then(res => {
        Indicator.close()
        const [list, curPage, countPage] = [res.data.data.messageList, res.data.data.curPage, res.data.data.countPage]
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
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.message_wrap {
  background: #eee;
  padding-top: 0.06rem;
  height: 100%;
  overflow: hidden;
  .module {
    width: 3.45rem;
    background: #fff;
    margin: 0 auto 0.1rem;
    padding-left: 0.16rem;
    padding-bottom: 0.21rem;
    h2 {
      font-size: 0.17rem;
      color: #333333;
      font-weight: bold;
      padding-top: 0.2rem;
    }
    p {
      font-size: 0.13rem;
      color: #999999;
      padding-top: 0.15rem;
      padding-bottom: 0.1rem;
    }
    span {
      font-size: 0.11rem;
      color: #999999;
    }
  }
}
</style>
