/* eslint-disable */
new Vue({
  el: ".ruler",
  data: {
    amount: 0,
    swiper: null,
    minInvAmount: 1,
    surplusAmt: 1,
    investRate: 1,
    periodMonths: 1,
    days: 0,
    itemId: getQueryParameter("itemId"),
    projectId: getQueryParameter("projectId"),
    productId: getQueryParameter("productId")
  },
  computed: {
    step: function () {
      var result = this.surplusAmt - this.minInvAmount;
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
    expectedIncome: function () {
      if (this.productId && !this.itemId) {
        return (this.amount * this.yearRate / 100 / 360 * this.days).toFixed(2)
      } else {
        return ((this.amount * this.investRate * (1 + this.investRate) ** this.periodMonths / ((1 + this.investRate) ** this.periodMonths - 1)) * this.periodMonths - this.amount).toFixed(2)
      }
    },
    baseURL: function () {
      if (window.location.href.indexOf("localhost") > 0 || window.location.href.indexOf("127.0.0.1") > 0) {
        return "http://112.124.117.23:8082/TouchStoneServiceNew/"
      } else if (window.location.href.indexOf("112.124.117.23") > 0) {
        return "http://112.124.117.23:8082/TouchStoneServiceNew/"
      } else if (window.location.href.indexOf('115.29.250.40:8090') > 0) {
        return 'http://115.29.250.40:8083/TouchStoneServiceNew'
      } else if (window.location.href.indexOf("m.hyoucai") > 0) {
        return "https://bg.idjshi.com:8083/"
      }
    }
  },
  watch: {
    amount (val) {
      if (val > this.surplusAmt) this.amount = this.surplusAmt
      // if (val < this.minInvAmount) this.amount = this.minInvAmount
      let translate = val / this.step
      const slideWidth = parseFloat(this.swiper.slides[0].style.width)
      const bodyWidthHalf = document.body.clientWidth / 2
      this.swiper.setTranslate(-translate * slideWidth + bodyWidthHalf)
    }
  },
  methods: {
    changeSlide: function () {
      var reg = /[^0-9.]/g;
      var result = this.minInvAmount.toString().replace(reg, '');
      var index = Math.ceil(result / this.step);
      this.swiper.slideTo(index, 0)
    },
    addSlides: function () {
      var slides = [];
      for (var i = 0, j = 0; i <= Math.ceil(this.surplusAmt / this.step) * this.step; i += this.step, j += 1) {
        if (j % 10 === 0) {
          slides.push('<div class="swiper-slide"><div class="high"><span>' + i + '</span></div></div>')
        } else {
          slides.push('<div class="swiper-slide"><div class="low"></div></div>')
        }
      }
      this.swiper.appendSlide(slides)
    },
    setData: function (res) {
      this.minInvAmount = parseFloat(res.data.data.projectInfo.minInvAmount);
      this.surplusAmt = parseFloat(res.data.data.projectInfo.surplusAmt);
      this.amount = parseFloat(this.minInvAmount).toFixed(0);
      this.investRate = parseFloat(res.data.data.projectInfo.investRate / 1200);
      this.periodMonths = parseFloat(res.data.data.investDetail.periodMonths);
      this.yearRate = parseFloat(res.data.data.projectInfo.investRate);
      this.days = parseFloat(res.data.data.projectInfo.loanMent)
    },
    init: function () {
      var _this = this;
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 50,
        centeredSlides: true,
        freeMode: true,
        freeModeMomentumRatio: 0,
        on: {
          slideChange: function () {
            _this.amount = this.activeIndex * _this.step
            // if (_this.amount < _this.minInvAmount) {
            //   this.slideTo(_this.minInvAmount / _this.step)
            // }
          }
        }
      })
    }
  },
  created: function () {
    var t = this;
    if (window.location.href.indexOf("projectId") > 0) {
      axios({
        baseURL: this.baseURL,
        url: "/project/projectDetail",
        method: "post",
        params: {Authorization: "", projectNo: this.projectId}
      }).then(function (e) {
        t.setData(e);
        t.init();
        t.addSlides();
        t.changeSlide()
      })
    } else if (window.location.href.indexOf("itemId") > 0) {
      axios({
        baseURL: this.baseURL,
        url: "/collection/investDetail",
        method: "post",
        params: {Authorization: "", itemId: this.itemId}
      }).then(function (e) {
        t.setData(e);
        t.init();
        t.addSlides();
        t.changeSlide()
      })
    } else if (window.location.href.indexOf("productId") > 0) {
      axios({
        baseURL: this.baseURL,
        url: "/collection/investDetail",
        method: "post",
        params: {Authorization: "", productId: this.productId}
      }).then(function (e) {
        t.setData(e);
        t.init();
        t.addSlides();
        t.changeSlide()
      })
    }
  }
})
