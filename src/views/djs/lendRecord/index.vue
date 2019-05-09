<template>
  <BScroll
    class="lend_record"
    ref="scrollRef"
    :probeType="BScrollOption.probeType"
    :listen-scroll="BScrollOption.listenScroll"
    :pullup="BScrollOption.pullup"
    @scrollToEnd="scrollToEnd"
  >
    <div>
      <section v-if="lendRecordList.length > 0">
        <div class="day" v-for="(lendRecord, index) in lendRecordList" :key="index">
          <h2>{{ lendRecord.timeGroup }}</h2>
          <div class="menu" v-for="(lendRecordItem, lendRecordIndex) in lendRecord.record" :key="lendRecordIndex">
            <p>
              <span>{{ lendRecordItem.userName }}</span>
              <i>{{ lendRecordItem.invAmt }}</i>
            </p>
            <a>{{ lendRecordItem.invTime }}</a>
          </div>
        </div>
      </section>
      <NoData v-else></NoData>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

import { Toast, Indicator } from 'mint-ui'

import { investUserCountMsg } from '@/api/djs/investDetail'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'index',
  components: {
    BScroll,
    NoData
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      BScrollOption: {
        probeType: 3,
        listenScroll: true,
        pullup: true
      },
      page: 1,
      hasMore: true,
      originData: [],
      lendRecordList: []
    }
  },
  methods: {
    getData() {
      Indicator.open()
      investUserCountMsg({
        projectNo: this.projectNo,
        curPage: this.page
      }).then(res => {
        Indicator.close()
        const [list, curPage, countPage] = [res.data.invUserList, res.data.curPage, res.data.countPage]
        if (!list.length) {
          this.hasMore = false
          Toast('没有更多数据了')
        } else {
          this.hasMore = parseInt(curPage) <= parseInt(countPage)
        }

        this.originData = [...this.originData, ...list]

        let timeGroups = [],
          lendRecordList = []
        this.originData.map(value => {
          if (!timeGroups.includes(value.timeGroup)) {
            timeGroups.push(value.timeGroup)
          }
        })
        timeGroups.forEach(value => {
          lendRecordList.push({
            timeGroup: value,
            record: []
          })
        })

        this.originData.forEach(originValue => {
          lendRecordList.forEach((value, index) => {
            if (originValue.timeGroup === value.timeGroup) {
              lendRecordList[index].record.push(originValue)
            }
          })
        })

        this.lendRecordList = lendRecordList

        this.$nextTick(() => {
          this.$refs.scrollRef.refresh()
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
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.lend_record {
  height: 100%;
  overflow: hidden;
  > div {
    section {
      padding-top: 0.06rem;
      background: #eee;
      .day {
        background: #fff;
        h2 {
          font-size: 0.11rem;
          color: #333333;
          letter-spacing: 0.0013rem;
          height: 0.16rem;
          padding: 0.08rem 0.15rem;
          border-bottom: 0.01rem solid #eeeeee;
        }
        .menu {
          height: 0.67rem;
          border-bottom: 0.01rem solid #eeeeee;
          margin-bottom: 0.06rem;
          p {
            font-size: 0.15rem;
            color: #333333;
            letter-spacing: 0.0018rem;
            height: 0.21rem;
            padding: 0.15rem 0 0 0.15rem;
            display: flex;
            span {
              flex: 1;
            }
            i {
              justify-content: flex-end;
              margin-right: 0.15rem;
            }
          }
          a {
            font-size: 0.11rem;
            color: #999999;
            letter-spacing: 0.0013rem;
            margin: 0.15rem 0 0.15rem 0.15rem;
          }
        }
      }
    }
  }
}
</style>
