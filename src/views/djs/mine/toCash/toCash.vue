<template>
  <div class='pageContainer' ref='container'>
    <b-scroll class='scroll' ref='scrollRef'>
      <div>
        <dl class="top">
          <dt><img src="https://file.hyoucai.com/huiyoucaifiles/picture/bank/icon/CMB.png" alt=""></dt>
          <dd>招商银行</dd>
        </dl>
        <div class="amount-wrapper">
          <div class="brand"><span>姓名</span> <em>{{bankCardInfo.fullName}}</em></div>
          <div class="input-wrapper">
            <div>¥</div>
            <div><input ref="amountRef" placeholder="0.00" type="text" @input="amountInput" /></div>
            <mt-checklist
              class="all"
              align="right"
              v-model="all"
              :options="options">
            </mt-checklist>
          </div>
        </div>
        <div class="mid"><span>可提现余额</span> <em>{{bankCardInfo.balance}}</em></div>
        <ul class="bottom">
          <li>
            <div class="border-bottom-1px">
              <span>开户地区</span>
              <input placeholder="请选择开户地区" ref="cardBankCnapsInput" @focus="focusScroll" type="number">
              <!--<em @click="showSelector = true"></em>-->
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>开户网点</span>
              <input placeholder="请选择开户网点" ref="cardBankCnapsInput" @focus="focusScroll" type="number">
              <!--<em @click="showSelector = true"></em>-->
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>手机号</span>
              <input class="phone-input" placeholder="请输入手机号" ref="cardBankCnapsInput" @focus="focusScroll" type="number">
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>验证</span>
              <input placeholder="请输入验证码" ref="cardBankCnapsInput" @focus="focusScroll" type="number">
              <div class="sms-wrapper"><sms-btn text="获取验证码"></sms-btn></div>
            </div>
          </li>
        </ul>
        <div class="tip">
          <div>温馨提示</div>
          <p>在你申请提现前，请先在页面下方或“基本信息”账户信息页面绑定银行卡收到你的体现请求后，我们将在1个工作日（双休日或法定节假日顺延）处理你的提现申请，请你注意查收为保障你的账户资金安全，申请提现时，你选择的银行卡开户名必须与你汇有财网账户实名认证一致否则体现申请将不予受理。
          </p>
          <!--<p>2.提现手续费0元，每日限10笔。</p>-->
          <!--<p>3.提现中有任何疑问，请立即联系汇有财客服：</p>-->
          <!--<p>400-099-7979。</p>-->
          <button>确认提现</button>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
// import AppDialog from '@/components/Dialog/Alert'
import { browser } from '@/assets/js/utils'
import SmsBtn from '@/components/smsBtn/index'
export default {
  components: {
    BScroll,
    SmsBtn
    // AppDialog
  },
  data() {
    return {
      options: [
        {
          label: '全部',
          value: '0'
        }
      ],
      all: [],
      amount: '0.00',
      bankCardInfo: {
        accountId: '6212462190000950068',
        area: '',
        bankNo: '',
        cardNo: '6222988812340041',
        city: '',
        fullName: '测试账号41',
        mobile: '17000000041',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '100',
        userName: 'djs776205tt',
        balance: '787878'
      }
    }
  },
  props: {
    text: {}
  },
  watch: {
    all(val) {
      if (val.length) {
        this.$refs.amountRef.value = this.bankCardInfo.balance
      } else {
        this.$refs.amountRef.value = '0.00'
      }
    }
  },
  methods: {
    amountInput(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if (e.target.value.indexOf('.') < 0 && e.target.value !== '') {
        e.target.value = parseFloat(e.target.value)
      }
      this.amount = parseFloat(e.target.value)
    },
    focusScroll() {
      if (browser.versions.android) {
        this.$refs.scrollRef.scrollTo(0, -220)
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';
.pageContainer {
  height: 100%;
  top: 0.44rem;
  font-size: $font-size-small-s;
  background-color: #efefef;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top {
      box-sizing: border-box;
      display: flex;
      height: 0.4rem;
      line-height: 0.28rem;
      margin: 0.1rem 0;
      padding-top: 0.08rem;
      padding-left: 0.16rem;
      background-color: #fff;
      dt {
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.1rem;
      }
      dd {
        flex: 1;
        font-size: 0.14rem;
      }
    }
    .amount-wrapper {
      padding: 0.16rem 0.16rem 0.24rem;
      background-color: #fff;
      .brand {
        margin-bottom: 0.4rem;
        color: $color-text-s;
        font-size: $font-size-small;
        span {
          margin-right: 0.1rem;
        }
      }
      .input-wrapper {
        overflow: hidden;
        height: 0.3rem;
        line-height: 0.3rem;
        div {
          float: left;
          input {
            font-size: 0.28rem;
          }
          &:first-child {
            width: 0.15rem;
            margin-right: 0.13rem;
            color: $color-text-b;
            font-size: 0.28rem;
          }
          &:nth-of-type(2) {
            width: 2.5rem;
          }
          &.all {
            width: 0.65rem;
            /deep/ .mint-checklist-title {
              margin: 0;
            }
            /deep/ .mint-cell {
              background-image: none;
              min-height: 0.3rem;
            }
            /deep/ .mint-cell-wrapper {
              padding: 0;
              background-image: none;
              line-height: inherit;
              .mint-checklist-label {
                padding: 0;
                .mint-checkbox-label {
                  font-size: 0.14rem;
                  color: $color-text-s;
                }
              }
            }
          }
        }
        /*span {
          display: inline-block;

        }
        .all {
          width: 0.5rem;
        }
        input {
          flex: 1;
          font-size: 0.28rem;
        }*/
      }
    }
    .mid {
      height: 0.35rem;
      line-height: 0.35rem;
      padding: 0 0.16rem;
      margin-bottom: 0.1rem;
      color: $color-text-s;
      font-size: $font-size-small;
      span {
        margin-right: 0.15rem;
      }
      em {
        color: $color-button;
      }
    }
    .bottom {
      margin: 0.08rem 0;
      background-color: #fff;
      li {
        height: 0.5rem;
        line-height: 0.5rem;
        > div {
          display: flex;
          padding: 0 0.16rem 0 0;
          margin-left: 0.16rem;
          font-size: $font-size-small-s;
          @include border-bottom-1px(#eee);
          span {
            display: inline-block;
            width: 0.6rem;
            margin-right: 0.16rem;
            color: $color-text;
          }
          input {
            display: inline-block;
            flex: 1;
            line-height: 0.5rem;
            font-size: $font-size-small-s;
            &.phone-input {
              text-align: right;
            }
          }
          em {
            display: inline-block;
            width: 0.27rem;
            height: 0.3rem;
            margin-top: 0.1rem;
            background: url('./image/more.png') no-repeat center center;
            background-size: 0.09rem 0.15rem;
          }
        }
        &:last-child {
          div {
            &.sms-wrapper {
              width: 1.1rem;
              height: 0.28rem;
              margin-top: 0.1rem;
              border-radius: 0.04rem;
              background-color: $color-button;
              /deep/ .btnArea {
                line-height: 0.28rem;
                input {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .tip {
      padding: 0.16rem;
      font-size: $font-size-small-s;
      color: $color-text-s;
      div {
        margin-bottom: 0.08rem;
      }
      button {
        width: 100%;
        height: 0.44rem;
        margin-top: 0.24rem;
        background-color: $color-button;
        color: #fff;
        font-size: $font-size-small;
        border-radius: 0.04rem;
      }
    }
  }
}
</style>
