<template>
  <BScroll
    class="wrapper"
    ref="noticeWrapper"
    :probeType="BScrollOption.probeType"
    :listen-scroll="BScrollOption.listenScroll"
    :pullup="BScrollOption.pullup"
    @scrollToEnd="scrollToEnd"
  >
    <div class="content">
      <div class="box" v-for="(item, index) in noticeList" :key="index" @click="toDetail(item.id)">
        <div class="box-top">
          <span class="top-image">
            <img src="./time.png" alt="" />
          </span>
          <span class="top-time">{{ item.createTime }}</span>
        </div>
        <div class="box-bottom">
          <span class="bottom-txt">{{ item.title }}</span>
          <span class="bottom-image">
            <img src="./more.png" alt />
          </span>
        </div>
      </div>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

import { Toast } from 'mint-ui'

import { getList } from '@/api/djs/homepage'

export default {
  name: 'DJSNoticeList',
  components: {
    BScroll
  },
  data() {
    return {
      page: 1,
      noticeList: [],
      BScrollOption: {
        probeType: 3,
        listenScroll: true,
        pullup: true
      },
      hasMore: true
    }
  },
  methods: {
    getData() {
      getList({
        paramCode: 'WZGG',
        curPage: this.page
      }).then(res => {
        if (res.data.resultCode === '1') {
          const list = res.data.zxdtMtbdlist
          let curPage = res.data.curPage
          let countPage = res.data.countPage
          if (!list.length) {
            this.hasMore = false
            Toast('暂无数据')
          } else {
            this.hasMore = parseInt(curPage) <= parseInt(countPage)
          }
          this.noticeList = [...this.noticeList, ...list]
          this.$nextTick(() => {
            this.$refs.noticeWrapper.refresh()
          })
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    scrollToEnd() {
      if (this.hasMore) {
        this.page++
        this.getData()
      }
    },
    toDetail(id) {
      this.$router.push({
        name: 'DJSNoticeDetail',
        params: { id: id }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';

.wrapper {
  background: #fff;
  padding-left: 0.15rem;
  height: 100%;
  .box {
    height: 0.75rem;
    @include border-bottom-1px(#e8e8e8);
    padding-top: 0.16rem;
    .box-top {
      display: flex;
      align-items: center;
      .top-image {
        display: inline-block;
        @include square(0.11rem);
      }
      .top-time {
        margin-left: 0.08rem;
        font-size: 0.11rem;
        color: #999;
      }
    }
    .box-bottom {
      margin-top: 0.06rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0.16rem;
      .bottom-txt {
        display: inline-block;
        width: 3.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.15rem;
        color: #333333;
      }
      .bottom-image {
        display: inline-block;
        @include cube(0.09rem, 0.18rem);
      }
    }
  }
}
</style>
