<template>
  <div class="ruler" v-if="show">
    <div class="title" @click="changeSlide">欲出借金额(元)</div>
    <div class="amount">
      <input
        type="tel"
        ref="input"
        v-model="amount"
      >
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper"></div>
    </div>
    <div class="title">预期收益(元)</div>
    <div class="amount">
      <span>{{expectedIncome}}</span>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import { getProductDetail, getProjectDetail } from '@/api/hyc/investment'

export default {
  name: '',
  data() {
    return {
      amount: 0,
      swiper: null,
      minInvAmount: 1, // 最低起投
      surplusAmt: 1, // 剩余可投
      investRate: 1, // 月利率
      periodMonths: 1, // 出借期数
      show: true,
      days: 0
    }
  },
  computed: {
    step() {
      let result = this.surplusAmt - this.minInvAmount
      if (result > 1000 && result <= 10000) {
        return 10
      } else if (result > 10000 && result <= 100000) {
        return 100
      } else if (result > 100000 && result <= 1000000) {
        return 1000
      } else if (result > 1000000 && result <= 10000000) {
        return 10000
      } else if (result > 10000000 && result <= 100000000) {
        return 100000
      } else {
        return 10
      }
    },
    expectedIncome() {
      if (this.productId && !this.itemId) {
        // 债转预期收益
        return (((this.amount * this.yearRate) / 100 / 360) * this.days).toFixed(2)
      } else {
        // 集合标 && 散标预期收益
        return (
          ((this.amount * this.investRate * (1 + this.investRate) ** this.periodMonths) / ((1 + this.investRate) ** this.periodMonths - 1)) *
            this.periodMonths -
          this.amount
        ).toFixed(2)
      }
    }
  },
  props: {
    itemId: {
      // 集合标id
      type: [Number, String]
    },
    productId: {
      // 债转标id
      type: [Number, String]
    },
    projectId: {
      // 散标id
      type: [Number, String]
    }
  },
  watch: {
    amount(val) {
      if (val > this.surplusAmt) this.amount = this.surplusAmt
      // if (val < this.minInvAmount) this.amount = this.minInvAmount
      let translate = val / this.step
      const slideWidth = parseFloat(this.swiper.slides[0].style.width)
      const bodyWidthHalf = document.body.clientWidth / 2
      this.swiper.setTranslate(-translate * slideWidth + bodyWidthHalf)
    }
  },
  methods: {
    changeSlide() {
      const reg = /[^0-9.]/g
      const result = this.minInvAmount.toString().replace(reg, '')
      const index = Math.ceil(result / this.step)
      this.swiper.slideTo(index, 0)
    },
    addSlides() {
      let slides = []
      for (let i = 0, j = 0; i <= Math.ceil(this.surplusAmt / this.step) * this.step; i += this.step, j += 1) {
        if (j % 10 === 0) {
          slides.push(`<div class="swiper-slide"><div class="high"><span>${i}</span></div></div>`)
        } else {
          slides.push('<div class="swiper-slide"><div class="low"></div></div>')
        }
      }
      this.swiper.appendSlide(slides)
    },
    setData(res) {
      this.minInvAmount = parseFloat(res.data.data.projectInfo.minInvAmount)
      this.surplusAmt = parseFloat(res.data.data.projectInfo.surplusAmt)
      this.amount = parseFloat(this.minInvAmount).toFixed(0)
      this.investRate = parseFloat(res.data.data.projectInfo.investRate / 1200)
      this.periodMonths = parseFloat(res.data.data.investDetail.periodMonths)
      // 债转
      this.yearRate = parseFloat(res.data.data.projectInfo.investRate)
      this.days = parseFloat(res.data.data.projectInfo.loanMent)
    },
    init() {
      let _this = this
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 50,
        centeredSlides: true,
        freeMode: true,
        freeModeMomentumRatio: 0,
        on: {
          slideChange() {
            _this.amount = this.activeIndex * _this.step
            // if (_this.amount < _this.minInvAmount) {
            //   this.slideTo(_this.minInvAmount / _this.step)
            // }
          }
        }
      })
    }
  },
  created() {
    if (this.projectId) {
      getProjectDetail({ projectNo: this.projectI }, decodeURIComponent(this.$route.query.t)).then(res => {
        this.setData(res)
        this.init()
        this.addSlides()
        this.changeSlide()
      })
    } else if (this.itemId) {
      getProductDetail({ itemId: this.itemId }, decodeURIComponent(this.$route.query.t)).then(res => {
        this.setData(res)
        this.init()
        this.addSlides()
        this.changeSlide()
      })
    } else if (this.productId) {
      getProductDetail({ productId: this.productId }, decodeURIComponent(this.$route.query.t)).then(res => {
        this.setData(res)
        this.init()
        this.addSlides()
        this.changeSlide()
      })
    }
  }
}
</script>
<style lang="scss">
.ruler {
  background: #fff;
  border-top: 0.01rem solid #eee;
  padding-top: 0.16rem;
  padding-bottom: 0.01rem;
  .title {
    text-align: center;
    font-size: 0.13rem;
    color: #999999;
  }
  .amount {
    margin-top: 0.08rem;
    margin-bottom: 0.08rem;
    color: #ea5e1b;
    text-align: center;
    font-size: 0.18rem;
    input {
      width: 50%;
      font-size: 0.32rem;
      line-height: 0.36rem;
      color: #ea5e1b;
      text-align: center;
      border-bottom: 0.01rem solid #ccc;
    }
  }
}

.ruler .swiper-container {
  width: 100%;
  height: 55px;
  margin: 20px auto;
  border-bottom: 0.01rem solid #eee;
  position: relative;
  .swiper-wrapper {
    position: relative;
    border-bottom: 0.01rem solid #eee;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      div {
        box-sizing: content-box;
        width: 1px;
        height: 10px;
        background-color: #ccc;
        position: absolute;
        bottom: 0;
        &.high {
          height: 25px;
        }
        span {
          font-size: 0.11rem;
          position: absolute;
          top: -75%;
          left: -0.16rem;
          color: #ccc;
        }
      }
    }
  }
}

.ruler .swiper-container:before {
  content: '';
  display: block;
  box-sizing: content-box;
  background: red;
  width: 2px;
  height: 40px;
  position: absolute;
  left: calc(50% - 0.5px);
  bottom: 0;
  z-index: 999;
}
</style>
