<template>
  <div class="activity pageContainer" ref="container">
    <BScroll
      ref="scrollRef"
      v-if="actList.length > 0"
    >
      <div class="activity-wrapper">
        <section v-for="(item, index) in actList" :key="index" @click="linkTo(item.url)">
          <img :src="item.picUrl" alt="">
          <p>
            活动日期：{{item.startTime}}至{{item.endTime}}
          </p>
        </section>
      </div>
    </BScroll>

    <NoData
      v-else
      class="no-data"
      type="event"
    />
  </div>
</template>

<script>
import NoData from '@/components/NoData/NoData'
import BScroll from '@/components/BScroll/BScroll'
import { getHotApi } from '@/api/djs/ActCenter/ActCenter'

export default {
  name: 'index',
  components: {
    NoData,
    BScroll
  },
  data() {
    return {
      title: '活动推荐',
      actList: []
    }
  },
  methods: {
    linkTo(url) {
      window.location.href = url
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    getHotApi({
      curPage: 1,
      maxLine: 10
    }).then(res => {
      this.actList = res.data.list
      this.refresh()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.pageContainer {
  background: #eee;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.my-scroll {
  height: 100%;
  overflow: hidden;
}

.activity-wrapper {
  background: #fff;
  padding: 0 0.16rem 0.16rem;
  section {
    margin-top: 0.08rem;
    padding-top: 0.16rem;
    p {
      font-size: 0.13rem;
      color: $color-text-s;
      margin-top: 0.16rem;
    }
  }
}

.no-data {
  background: #fff;
  /deep/ .event {
    color: $color-placeholder;
  }
}
</style>
