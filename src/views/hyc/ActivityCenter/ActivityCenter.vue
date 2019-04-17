<template>
  <div class="activity" ref="container">
    <div class="activity-wrapper" v-if="actList.length > 0">
      <section v-for="(item, index) in actList" :key="index" @click="linkTo(item.url)">
        <img :src="item.picUrl" alt="" />
        <p>活动日期：{{ item.startTime }}至{{ item.endTime }}</p>
      </section>
    </div>
    <NoData v-else class="no-data" type="event" />
  </div>
</template>

<script>
import NoData from '@/components/NoData/NoData'
import { getHotApi } from '@/api/hyc/ActCenter/ActCenter'

export default {
  name: 'index',
  components: {
    NoData
  },
  data() {
    return {
      title: '活动推荐',
      actList: []
    }
  },
  methods: {
    linkTo(url) {
      if (this.$route.query.userName) {
        // app交互的逻辑
        window.location.href = url + '&userName=' + this.$route.query.userName
      } else {
        // h5原生
        window.location.href = url
      }
    }
  },
  created() {
    getHotApi({
      curPage: 1,
      maxLine: 10
    }).then(res => {
      this.actList = res.data.list
    })
  },
  mounted() {
    console.log('地址=====================' + window.location.href)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.activity {
  height: 100%;
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
}
</style>
