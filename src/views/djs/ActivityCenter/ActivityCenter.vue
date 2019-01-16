<template>
  <div class="activity pageContainer" ref="container">
      <div class="activity-wrapper" v-if="actList.length > 0">
        <section v-for="(item, index) in actList" :key="index" @click="linkTo(item.url)">
          <img :src="item.picUrl" alt="">
          <p>
            活动日期：{{item.startTime}}至{{item.endTime}}
          </p>
        </section>
      </div>
    <NoData
      v-else
      class="no-data"
      type="event"
    />
  </div>
</template>

<script>
import NoData from '@/components/NoData/NoData'
import { getHotApi } from '@/api/djs/ActCenter/ActCenter'

export default {
  name: 'index',
  components: {
    NoData
  },
  data() {
    return {
      title: '活动推荐',
      actList: ['', '']
    }
  },
  methods: {
    linkTo(url) {
      window.location.href = url
    }
  },
  created() {
    getHotApi({
      curPage: 1,
      maxLine: 10
    }).then(res => {
      this.actList = res.data.list
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.pageContainer {
  background: #eee;
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
