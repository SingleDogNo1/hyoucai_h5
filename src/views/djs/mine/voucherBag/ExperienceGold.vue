<template>
  <div class="content">
    <b-scroll class="scroll" ref="scrollRef">
      <div class="banner">
        <div class="banner_div">
          <p class="banner_p">
            <span class="banner_txt">当前可用体验金(元)</span>
            <span class="banner_number">200000.00</span>
          </p>
          <p class="banner_p">
            <span class="banner_txt">累计计息收益(元)</span>
            <span class="banner_number">120.09</span>
          </p>
        </div>
        <div class="banner_btn">去使用</div>
      </div>
      <div class="experience_gold"></div>
    </b-scroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
export default {
  data() {
    return {}
  },
  componets: {
    BScroll
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  .scroll {
    .banner {
      height: 1.71rem;
      background-color: #fff;
      background-image: url(./images/gold_bg.png);
      background-repeat: no-repeat;
      background-size: 3.75rem 1.71rem;
      .banner_div {
        display: flex;
        padding: 0.28rem 0 0.14rem 0;
        .banner_p {
          width: 50%;
          text-align: center;
          span {
            display: block;
            font-size: 0.13rem;
          }
          .banner_txt {
            color: rgba(255, 255, 255, 1);
            line-height: 0.18rem;
            margin-bottom: 0.18rem;
          }
          .banner_number {
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.25rem;
          }
        }
      }
      .banner_btn {
        width: 1.18rem;
        height: 0.38rem;
        line-height: 0.38rem;
        text-align: center;
        border-radius: 0.19rem;
        border: 1px solid rgba(255, 255, 255, 1);
        display: block;
        margin: 0 auto;
        font-size: 0.15rem;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
