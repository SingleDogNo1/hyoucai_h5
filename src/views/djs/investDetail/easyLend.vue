<!--
  TODO
  点击红包加息券选择功能
-->
<template>
  <div class="lend-wrapper">
    <BScroll class="lend">
      <section>
        <div class="huge">
          <ul>
            <li>
              <span>{{ investDetail.investRate }}</span>
              <span>%</span>
            </li>
            <li>
              <h5>{{ investDetail.projectName }}</h5>
              <h6>锁定期{{ investDetail.investMent }}天</h6>
            </li>
          </ul>
          <p>
            <span>剩余可投</span>
            <span>{{ investDetail.surplusAmount }}万</span>
          </p>
        </div>
        <div class="amount-block">
          <h6>投标金额</h6>
          <section>
            <div>¥</div>
            <input type="number" placeholder="请输入金额" v-model="amount" />
          </section>
          <p class="err-msg">{{ errMsg }}</p>
          <div class="ctrl">
            <div>
              <p>
                <span class="key"><i class="iconfont icon-ti-shi"></i>可用余额</span>
                <span class="value">{{ amountInfo.banlance }}元</span>
              </p>
              <p>
                <span class="key">预估收益：</span>
                <span class="value">{{ expectedIncome }}</span>
              </p>
            </div>
            <button :class="{ active: lendAllFlag }" @click="lendAll">全部投标</button>
          </div>
        </div>
        <ul class="coupon">
          <li>
            <span>加息券</span>
            <div>
              <!--<p>2张</p>-->
              <label>15天2.0%加息券</label>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
          <li>
            <span>红包</span>
            <div>
              <p>2张</p>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
        </ul>
        <div class="agree">
          <div v-for="(agreement, index) in protocolData" :key="index">
            <input type="checkbox" id="isCheck" :checked="agree" :data-check="agree" v-if="agreement.isSelect === '1'" />
            <label for="isCheck" @click="changeStatus" v-if="agreement.isSelect === '1'"></label>
            <div>
              <p>
                {{ agreement.tipsBefore }}
                <a :href="agreement.protocolUrl" class="agreement">{{ agreement.protocolName }}</a>
              </p>
              <p>{{ agreement.tipsAfter }}</p>
            </div>
          </div>
        </div>
      </section>
    </BScroll>

    <div class="invest-btn">
      <section @click="invest">
        <h6>账户余额不足</h6>
        <p>还需余额10000.00</p>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

import { Toast } from 'mint-ui'

import { getProtocaol } from '@/api/djs/invite'
import { getInvestDetail, getPersonalAccount, expectedIncome } from '@/api/djs/investDetail'

import { mapGetters } from 'vuex'

export default {
  name: 'invest',
  mixins: [],
  components: {
    BScroll
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      protocolData: [],
      agree: false,
      amount: '',
      investDetail: '',
      amountInfo: '',
      expectedIncome: '- -',
      lendAllFlag: false,
      errMsg: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    amount(value) {
      // 项目剩余可投和账户余额取小
      const maxLendAmount =
        parseFloat(this.amountInfo.banlance) <= parseFloat(this.investDetail.surplusAmount)
          ? this.amountInfo.banlance
          : this.investDetail.surplusAmount
      if (value !== maxLendAmount) {
        this.lendAllFlag = false
      }

      if (value - 0 < this.investDetail.minInvAmt - 0) {
        this.errMsg = '申购金额需' + this.investDetail.minInvAmt + '元起'
      } else {
        this.errMsg = ''
      }
      expectedIncome({
        invAmount: value,
        projectNo: this.investDetail.projectNo,
        investRate: this.investDetail.investRate,
        invDays: this.investDetail.investMent
      }).then(res => {
        this.expectedIncome = res.data.expectedIncome
      })
    }
  },
  methods: {
    changeStatus() {
      this.agree = !this.agree
    },
    lendAll() {
      this.amount = this.amountInfo.banlance
      this.lendAllFlag = true
    },
    invest() {
      console.log()
    }
  },
  created() {
    getInvestDetail({
      projectNo: this.projectNo
    }).then(res => {
      this.investDetail = res.data
    })
    getProtocaol({
      type: 'TZJE'
    }).then(res => {
      if (res.data.resultCode === '1') {
        this.protocolData = res.data.protocolData
        this.agree = res.data.protocolData[0].isSelect === '1'
      } else {
        Toast(res.data.resultMsg)
      }
    })

    getPersonalAccount({
      userName: this.user.userName
    }).then(res => {
      this.amountInfo = res.data
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.lend-wrapper {
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .lend {
    flex: 1;
    overflow: hidden;
    .huge {
      @include cube(100%, 1.2rem);
      margin-bottom: 0.08rem;
      background-color: #ec5e52;
      padding: 0 0.15rem;
      ul {
        padding: 0.2rem 0;
        @include border-bottom-1px(rgba(255, 255, 255, 0.5));
        display: flex;
        justify-content: space-between;
        li {
          flex: 1;
          align-self: center;
          color: #ffffff;
          font-size: 0.15rem;
          span {
            &:first-child {
              font-size: 0.36rem;
            }
          }
          h5 {
            font-size: 0.15rem;
            line-height: 1.75;
          }
          h6 {
            font-size: 0.13rem;
            line-height: 1.75;
          }
        }
      }
      > p {
        color: #fff;
        font-size: 0.13rem;
        line-height: 0.32rem;
        span:last-child {
          margin-left: 0.16rem;
        }
      }
    }
    .amount-block {
      background: #fff;
      padding-top: 0.16rem;
      position: relative;
      margin-bottom: 0.08rem;
      h6 {
        padding: 0 0.15rem;
        font-size: 0.13rem;
        color: #999999;
      }
      section {
        padding: 0 0.15rem;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        @include border-bottom-1px(#eee);
        div {
          width: 0.25rem;
          padding-right: 0.1rem;
          font-size: 0.24rem;
          line-height: 0.5rem;
          color: #333;
        }
        input {
          flex: 1;
          padding: 0.08rem 0;
          font-size: 0.18rem;
          &::placeholder {
            color: #999;
          }
        }
      }
      .err-msg {
        line-height: 0.24rem;
        background: rgba(255, 0, 0, 0.15);
        padding: 0 0.15rem;
        font-size: 0.11rem;
        color: #f14b4b;
      }
      .ctrl {
        padding: 0 0.15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          p {
            margin: 0.08rem 0;
            font-size: 0.11rem;
            span {
              i {
                font-size: 0.1rem;
                margin-right: 0.05rem;
              }
              &.key {
                color: #999;
              }
              &.value {
                font-size: 0.11rem;
                color: #ec5e52;
                margin-left: 0.05rem;
              }
            }
          }
        }
        button {
          @include radiusCube(0.78rem, 0.28rem);
          font-size: 0.13rem;
          line-height: 0.26rem;
          background: #ffffff;
          border: 0.01rem solid #333;
          &.active {
            border: 0.01rem solid #ace;
            color: #ace;
          }
        }
      }
    }
    .coupon {
      background: #ffffff;
      padding-left: 0.15rem;
      margin-bottom: 0.08rem;
      li {
        height: 0.5rem;
        padding-right: 0.15rem;
        &:first-child {
          @include border-bottom-1px(#eee);
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.15rem;
        }
        p,
        label {
          display: inline-block;
          font-size: 0.15rem;
          color: #999;
        }
        label {
          color: #ec5e52;
        }
        i {
          font-size: 0.13rem;
          color: #999;
          margin-left: 0.1rem;
        }
      }
    }
    .agree {
      margin: 0.16rem auto;
      padding: 0 0.15rem 0 0.37rem;
      font-size: $font-size-small-s;
      line-height: 0.18rem;
      position: relative;
      input[type='checkbox'] {
        display: none;
      }
      label {
        position: absolute;
        left: 0.15rem;
        &:before {
          box-sizing: border-box;
          content: '';
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background-color: #fff;
          border: 0.05rem solid #ccc;
          border-radius: 0.2rem;
          margin-right: 0.1rem;
          vertical-align: middle;
        }
      }
      input:checked + label:before {
        border: 0.05rem solid $color-button;
      }
      .agreement {
        color: $color-button;
      }
    }
  }
  .invest-btn {
    @include cube(100%, 0.56rem);
    background: #fff;
    box-shadow: inset 0 0.01rem 0 0 #eee;
    section {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0.07rem auto;
      @include cube(3.45rem, 0.42rem);
      border-radius: 0.04rem;
      background: #ccc;
      &.active {
        background: #ec5e52;
      }
      h6 {
        font-size: 0.15rem;
        color: #fff;
        text-align: center;
      }
      p {
        font-size: 0.12rem;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
      }
    }
  }
}
</style>
