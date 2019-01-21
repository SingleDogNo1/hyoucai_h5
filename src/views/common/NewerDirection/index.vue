<template>
  <div class="pageContainer" ref="container">
    <header-title :title="text" :mobileValue="mobile"></header-title>
    <b-scroll
      class="scroll"
      ref="scrollRef"
      :preventDefaultException="preventClass">
      <div>
        <div class="top">
          <div class="top_inn">
            <div class="title com_title"></div>
            <div class="info com_info">
              <p>
                汇有财隶属于江西汇通金融信息服务有限公司旗下，江西汇通金融信息服务有限公司2013年3月22日在江西省南昌市红谷滩新区注册成立，通过科技驱动金融创新，为中国广大优质用户提供高效、便捷、个性化的信贷咨询服务，是江西省首批金融信息服务类企业。
              </p>
              <p>
                汇通金融所有资产均从市场调研，产品设计，渠道拓展，广告推广，订制配套的评分卡、催收策略，征信数据采集等每个专业环节都自主开发完成，确保向机构与中小出借者客户提供的资产质量的可辨、可防、可控。
              </p>
            </div>
          </div>
        </div>
        <div class="bg_white">
          <div class="prods">
            <div class="title prod_title"></div>
            <div class="info">
              <dl>
                <dt>
                  <p>10%</p>
                  <div>历史平均年化收益率</div>
                </dt>
                <dd>
                  <p>3个月产品</p>
                  <div></div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <p>11%</p>
                  <div>历史平均年化收益率</div>
                </dt>
                <dd>
                  <p>6个月产品</p>
                  <div></div>
                </dd>
              </dl>
            </div>
          </div>
          <div class="steps_title"></div>
          <div class="point_title">
            <div class="point"></div>
            <div class="text">输入手机号---设置登录密码---注册成功</div>
          </div>
          <div class="swiper-container swiper-container-1">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
              </div>
              <div class="swiper-slide">
              </div>
            </div>
          </div>
          <div class="point_title">
            <div class="point"></div>
            <div class="text">输入三要素---签订协议</div>
          </div>
          <div class="swiper-container swiper-container-2">
            <div class="swiper-wrapper">
              <div class="swiper-slide"></div>
              <div class="swiper-slide"></div>
              <!--<div class="swiper-slide"></div>-->
            </div>
          </div>
          <div class="point_title">
            <div class="point"></div>
            <div class="text">输入充值金额---填写手机号---充值成功</div>
          </div>
          <div class="swiper-container swiper-container-3">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
              </div>
            </div>
          </div>
          <div class="point_title">
            <div class="point"></div>
            <div class="text">选择产品---输入出借金额---立即出借</div>
          </div>
          <div class="swiper-container swiper-container-4">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
              </div>
              <div class="swiper-slide">
              </div>
            </div>
          </div>
          <div class="tip">
            <div class="title prod_title"></div>
            <div class="info">
              <div class="left">
                <dl>
                  <dt>客服热线：</dt>
                  <dd>{{serviceTel}}</dd>
                </dl>
                <dl>
                  <dt>服务时间：<br>工作日</dt>
                  <dd>
                    <div>上午09:00 - 12:00</div>
                    <div>下午13:00 - 18:00</div>
                  </dd>
                </dl>
              </div>
              <div class="right">
                <img class="longTap" width="100%" height="100%" src="./qr_code@3x.png" alt="">
              </div>
            </div>
            <p>若您在使用汇有财APP的过程中有任何建议，可以关注汇有财微信公众号（微信搜索huiyoucaidyh)告知我们。汇有财团队将会不断完善产品为您带来更好的服务！</p>
          </div>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import HeaderTitle from '@/components/AppHeader'
import BScroll from '@/components/BScroll/BScroll'
import Swiper from 'swiper/dist/js/swiper'
import { serviceTelApi } from '@/api/common/help'

export default {
  components: {
    HeaderTitle,
    BScroll
  },
  data() {
    return {
      text: '新手指引',
      mobile: this.$route.query.mobile,
      serviceTel: '400-099-7979',
      preventClass: { className: /(^|\s)longTap(\s|$)/ }
    }
  },
  watch: {},
  methods: {
    getServiceTel() {
      serviceTelApi({ type: '1' }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.serviceTel = data.data
        } else {
          Toast(resultMsg)
        }
      })
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  computed: {},
  created() {
    this.getServiceTel()
    setTimeout(() => {
      this.swiper1 = new Swiper('.swiper-container-1', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper2 = new Swiper('.swiper-container-2', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper3 = new Swiper('.swiper-container-3', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
      this.swiper4 = new Swiper('.swiper-container-4', {
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -24,
          depth: 200,
          modifier: 1,
          slideShadows: false
        }
      })
    }, 20)
    if (!this.mobile) {
      this.$nextTick(() => {
        this.$refs.container.style.top = 0.44 + 'rem'
        this.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.longTap {
  position: relative;
  display: block;
  width: 144px;
  height: 144px;
}

.top {
  padding: 0.08rem 0;
  .top_inn {
    padding: 0.28rem 4% 0.16rem;
    @include bg-image('bg');
    background-size: 100% 100%;
  }
  .title {
    width: 0.98rem;
    height: 0.28rem;
    margin: 0 auto;
    background-size: 100% 100%;
    @include bg-image('hyc_intro');
  }
  .info {
    margin: 0.15rem 0 0 0;
    line-height: 0.26rem;
    font-size: $font-size-small-s;
  }
}

.bg_white {
  background-color: #fff;
  .prods {
    padding: 0.24rem 0 0.16rem;
    .title {
      width: 0.98rem;
      height: 0.28rem;
      margin: 0 auto;
      background-size: 100% 100%;
      @include bg-image('our_prod');
    }
    .info {
      display: flex;
      padding: 0.24rem 0 0.33rem;
      dl {
        position: relative;
        flex: 1;
        font-size: 0;
        text-align: center;
        div {
          color: $color-text-s;
        }
        dt {
          width: 0.95rem;
          height: 0.95rem;
          box-sizing: border-box;
          padding-top: 0.2rem;
          margin: 0 auto;
          border: 1px solid #f4c700;
          border-radius: 50%;
          p {
            font-size: 0.24rem;
            color: $color-button;
          }
          div {
            font-size: $font-size-small-ss;
          }
        }
        dd {
          margin-top: 0.08rem;
          p {
            font-size: $font-size-small-s;
            color: $color-text;
          }
          div {
            font-size: $font-size-small-ss;
          }
        }
      }
    }
  }
  .steps_title {
    width: 2.94rem;
    height: 0.47rem;
    margin: 0 auto 0.4rem;
    background-size: cover;
    @include bg-image('steps_title');
  }
  .point_title {
    padding: 0 4%;
    font-size: 0;
    overflow: hidden;
    > div {
      display: inline-block;
      vertical-align: top;
    }
    .point {
      width: 0.12rem;
      height: 0.12rem;
      margin-top: 0.03rem;
      margin-right: 0.08rem;
      border-radius: 50%;
      background-image: linear-gradient(-180deg, #fae500 0%, #f4c700 100%);
    }
    .text {
      color: $color-text;
      font-size: $font-size-small-s;
    }
  }
  .swiper-container {
    height: 4.9rem;
    margin: 0.24rem auto 0.4rem;
    .swiper-slide {
      background-size: 100% 100%;
    }
    &.swiper-container-1 {
      .swiper-slide:nth-child(1) {
        @include bg-image('verification');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('reg');
      }
    }
    &.swiper-container-2 {
      .swiper-slide:nth-child(1) {
        @include bg-image('open_save_account');
      }
      /*  .swiper-slide:nth-child(2) {
          @include bg-image('set_deal_pwd')
        }*/
      .swiper-slide:nth-child(2) {
        @include bg-image('sign');
      }
    }
    &.swiper-container-3 {
      .swiper-slide:nth-child(1) {
        @include bg-image('charge');
      }
    }
    &.swiper-container-4 {
      .swiper-slide:nth-child(1) {
        @include bg-image('invest');
      }
      .swiper-slide:nth-child(2) {
        @include bg-image('input_amount');
      }
    }
  }
  .tip {
    width: 100%;
    padding: 0 4% 0.2rem;
    .title {
      width: 0.8rem;
      height: 0.28rem;
      margin: 0 auto;
      background-size: 100% 100%;
      @include bg-image('tip');
    }
    .info {
      display: flex;
      margin-top: 0.33rem;
      .left {
        flex: 1;
        dl {
          display: flex;
          line-height: 0.2rem;
          font-size: $font-size-small-s;
          dt {
            width: 0.76rem;
            color: $color-text;
          }
          dd {
            flex: 1;
            color: $color-text-s;
          }
          &:nth-child(1) {
            margin-bottom: 0.08rem;
          }
        }
      }
      .right {
        width: 1.44rem;
        height: 1.44rem;
      }
    }
    p {
      padding: 0.16rem 0 0;
      font-size: $font-size-small-s;
      color: $color-text-s;
    }
  }
}
</style>
