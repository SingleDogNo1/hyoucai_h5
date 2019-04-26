<template>
  <div class="content">
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
      <div class="banner_btn" @click="goUse" v-show="isExperuenceGold">去使用</div>
      <div class="banner_btn_no" v-show="!isExperuenceGold">去使用</div>
    </div>
    <div class="experience_gold">
      <div class="heads">
        <div class="head-box" :class="{ actives: flag }" @click="goSwitch(1)">
          <span class="head-txt">在投体验金</span>
          <span class="head-line"></span>
        </div>
        <div class="head-box" :class="{ actives: !flag }" @click="goSwitch(2)">
          <span class="head-txt">往期体验金</span>
          <span class="head-line"></span>
        </div>
      </div>
      <div class="cast_in box" v-show="flag">
        <div class="bodys" v-show="isCastIn">
          <div class="body_box">
            <div class="body_top">
              <p class="body_top_p">
                <span class="top_number">1000.00元体验金</span>
                <span class="top_txt">正在计息</span>
                <span class="left_line"></span>
              </p>
              <p class="top_date">2019-04-19至2019-06-19</p>
            </div>
            <div class="body_bottom">
              <p class="body_bottom_p">
                <span class="bottom_txt">预计获得利息(元)</span>
                <span class="interest">10.00</span>
              </p>
              <p class="body_bottom_p">
                <span class="bottom_txt">历史年化收益率</span>
                <span class="rate-of-return">10%</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bodys no" v-show="!isCastIn">
          <span class="no_span">暂无体验金</span>
        </div>
      </div>
      <div class="past_period box" v-show="!flag">
        <div class="bodys" v-show="isPastPeriod">
          <div class="body_box">
            <div class="body_top">
              <p class="body_top_p">
                <span class="top_number">1000.00元体验金</span>
                <span class="top_txt">已过期</span>
              </p>
              <p class="top_date">2019-04-19至2019-06-19</p>
            </div>
            <div class="body_bottom">
              <p class="body_bottom_p">
                <span class="bottom_txt">历史年化收益率</span>
                <span class="rate-of-return">10%</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bodys no" v-show="!isPastPeriod">
          <span class="no_span">暂无体验金</span>
        </div>
      </div>
    </div>
    <Dialog class="dia_log" :show="isShowDialog" :showCloseBtn="false" :confirmText="confirmText" :onConfirm="onConfirm"
      >当前暂无体验品类的产品，如有疑问请联系客服400-099-7979。</Dialog
    >
  </div>
</template>

<script>
// import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'
import { collectionApi } from '@/api/djs/investment'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      flag: true,
      isExperuenceGold: true, //是否有体验金,若无体验金,则"去使用"灰化不可点击
      isCastIn: true, //是否有在投体验金
      isPastPeriod: true, //是否有往期体验金
      isShowDialog: false, //是否显示提示弹窗
      confirmText: '知道了', //弹窗提示文字
      countPage: 1, //总页数
      curPage: 1, //当前页
      investsList: [] //产品列表
    }
  },
  components: {
    // BScroll,
    Dialog
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    //去使用
    goUse() {
      let data = {}
      data.userName = '小狗'
      data.curPage = this.curPage
      // 获取产品列表
      collectionApi(data).then(res => {
        let data = res.data
        // console.log(res.data)
        this.countPage = data.countPage
        this.investsList = this.investsList.concat(data.investsList)
        if (this.curPage < this.countPage) {
          this.curPage++
          this.goUse()
        } else {
          this.investsList.map(item => {
            //是否存在体验类产品 不存在isShowDialog为true
            if (item.type != '10') {
              this.isShowDialog = true
            }
          })
          //存在体验类产品 进入产品投资详情页
          if (!this.isShowDialog) {
            this.$router.push({
              name: 'DJSInvestment'
            })
          }
        }
      })
    },
    goSwitch(val) {
      if (val === 1) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    // 点击提示弹窗确定按钮要执行的函数
    onConfirm() {
      this.isShowDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  height: 100%;
  background: rgba(249, 249, 249, 1);
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
      line-height: 0.37rem;
      text-align: center;
      border-radius: 0.19rem;
      border: 1px solid rgba(255, 255, 255, 1);
      display: block;
      margin: 0 auto;
      font-size: 0.15rem;
      color: rgba(255, 255, 255, 1);
    }
    .banner_btn_no {
      width: 1.18rem;
      height: 0.38rem;
      line-height: 0.37rem;
      text-align: center;
      border-radius: 0.19rem;
      border: 1px solid rgba(201, 201, 201, 1);
      display: block;
      margin: 0 auto;
      font-size: 0.15rem;
      color: rgba(201, 201, 201, 1);
    }
  }
  .experience_gold {
    height: 100%;
    .heads {
      height: 0.44rem;
      margin-top: 0.03rem;
      background: rgba(255, 255, 255, 1);
      display: flex;
      padding: 0;
      .head-box {
        width: 50%;
        text-align: center;
        line-height: 0.44rem;
        font-size: 0.15rem;
        color: rgba(161, 161, 161, 1);
      }
      .actives {
        position: relative;
        color: #ec5e52;
        .head-line {
          position: absolute;
          width: 0.5rem;
          height: 0.01rem;
          background: rgba(236, 94, 82, 1);
          border-radius: 0.01rem;
          bottom: 0;
          left: 0.69rem;
        }
      }
    }
    .bodys {
      padding: 0 0.15rem;
      .body_box {
        width: 3.45rem;
        height: 1.6rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0.04rem 0.1rem 0px rgba(239, 239, 239, 0.2);
        border-radius: 0.1rem;
        margin-top: 0.1rem;
        padding-left: 0.2rem;
        .body_top {
          height: 0.74rem;
          border-bottom: 1px solid rgba(249, 249, 249, 1);
          padding: 0.16rem 0;
          .body_top_p {
            margin-bottom: 0.03rem;
            position: relative;
            .top_number {
              font-size: 0.15rem;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 0.21rem;
            }
            .top_txt {
              font-size: 0.13rem;
              color: rgba(236, 94, 82, 1);
              line-height: 0.18rem;
              margin-left: 1.39rem;
            }
            .left_line {
              display: inline-block;
              width: 0.03rem;
              height: 0.13rem;
              background: rgba(236, 94, 82, 1);
              border-radius: 0px 0.12rem 0.44rem 0px;
              position: absolute;
              bottom: 0.04rem;
              left: -0.2rem;
            }
          }
          .top_date {
            font-size: 0.13rem;
            color: rgba(153, 153, 153, 1);
            line-height: 0.18rem;
          }
        }
        .body_bottom {
          padding-top: 0.17rem;
          .body_bottom_p {
            margin-bottom: 0.14rem;
            font-size: 0.13rem;
            .bottom_txt {
              display: inline-block;
              width: 1rem;
              color: rgba(153, 153, 153, 1);
              line-height: 0.18rem;
              margin-right: 0.33rem;
            }
            .interest {
              color: rgba(236, 94, 82, 1);
            }
            .rate-of-return {
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }
    }
    .past_period {
      .bodys {
        .body_box {
          height: 1.3rem;
          .body_top {
            .body_top_p {
              .top_number {
                color: rgba(153, 153, 153, 1);
              }
              .top_txt {
                color: rgba(153, 153, 153, 1);
              }
            }
            .top_date {
              color: rgba(153, 153, 153, 1);
            }
          }
          .body_bottom {
            .body_bottom_p {
              .bottom_txt {
                color: rgba(153, 153, 153, 1);
              }
              .rate-of-return {
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }
      }
    }
    .box {
      .no {
        padding-top: 1.03rem;
        .no_span {
          display: block;
          text-align: center;
          font-size: 0.15rem;
          color: rgba(153, 153, 153, 1);
          line-height: 0.21rem;
        }
      }
    }
  }
}
</style>
