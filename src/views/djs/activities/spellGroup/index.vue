<template>
  <div class="spell-group">
    <div class="banner"></div>
    <div class="inner">
      <div class="desc"></div>
      <div class="wrapper">
        <div class="count-down">
          <span class="title">参团倒计时：</span>
          <span class="time hours">99</span>
          <span class="split">:</span>
          <span class="time hours">99</span>
          <span class="split">:</span>
          <span class="time hours">99</span>
        </div>
        <div class="progress-wrapper">
          <ul class="rate">
            <li>加息1%</li>
            <li>加息2%</li>
            <li>加息3%</li>
          </ul>
          <div class="progress-wrapper">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getShareInfoApi, getPageSinatureApi } from '@/api/common/activities'
// import { queryProgressApi, joinActivityApi } from '@/api/djs/ActivitiesApi/spellGroup'

export default {
  name: 'spellGroup',
  mixins: [],
  components: {},
  data() {
    return {
      inviteCode: this.$route.query.mediasource,
      info: null
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {
    // queryProgressApi({
    //   leaderInviteCode: this.inviteCode
    // }).then(res => {
    //   const data = res.data
    //   this.info = data
    // })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

.spell-group {
  .banner {
    width: 100%;
    height: 2.91rem;
    @include bg-image('./images/banner');
    background-size: contain;
  }
  .inner {
    padding: 0.15rem 0.1rem;
    background: linear-gradient(#fb4841, #fc6556);
    .desc {
      width: 100%;
      height: 2.02rem;
      margin-bottom: 0.38rem;
      background-color: #fff;
      background-position: center top;
      border-radius: 0.08rem;
      @include bg-image('./images/desc');
      background-size: cover;
    }
    .wrapper {
      width: 100%;
      height: 1000px;
      background-color: #fff;
      border-radius: 0.08rem;
      position: relative;
      padding-top: 0.43rem;
      .count-down {
        $height: 0.48rem;
        @include cube(2.48rem, $height);
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: -$height / 2;
        background: #fff;
        box-shadow: 0 0 12px 0 rgba(248, 72, 53, 0.43);
        border-radius: $height / 2;
        display: flex;
        justify-content: center;
        align-items: center;
        .title {
          font-size: 0.16rem;
          color: #333;
        }
        .time {
          @include square(0.26rem);
          background-image: repeating-linear-gradient(-42deg, #f33932, #fd7520);
          border-radius: 0.02rem;
          color: #fff;
          text-align: center;
          line-height: 0.26rem;
        }
        .split {
          margin: 0 0.05rem;
          font-size: 0.16rem;
          color: #f95f27;
          transform: translateY(-0.02rem);
        }
      }
    }
  }
}
</style>
