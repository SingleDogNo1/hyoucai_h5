<template>
  <transition name="fade">
    <div class="pageContainer" ref="container">
      <b-scroll class="scroll" ref="scrollRef">
        <div>
          <ul class="top">
            <li class="border-bottom-1px">
              <dl>
                <dt><img v-lazy="bankCardInfo.iconUrl" alt="" /></dt>
                <dd>
                  <p>{{ bankCardInfo.bankName }}（尾号{{ bankCardInfo.cardNo.slice(-4) }}）</p>
                  <div>{{ bankCardInfo.quota }}</div>
                </dd>
              </dl>
            </li>
            <li>
              <div class="border-bottom-1px">
                <input placeholder="请输入充值金额，百元起充" type="text" @input="amountInput" />
                <span>元</span>
              </div>
            </li>
            <li>
              <div>
                <span>可用余额</span>
                <em>{{ banlance }}元</em>
              </div>
            </li>
          </ul>
          <ul class="bottom">
            <li>
              <div>
                <input placeholder="请输入银行预留手机号" type="text" @input="mobileInput" />
              </div>
            </li>
          </ul>
          <mt-cell title="转账充值" is-link @click.native="toChargeTip"></mt-cell>
          <div class="tip">
            <button @click="checkAmount">提交</button>
          </div>
        </div>
      </b-scroll>
      <app-dialog :showDialog="showDialog" :confirmType="confirmType" :title="dialogTitle">
        <p class="dialog-content">{{ chargeErrText }}</p>
      </app-dialog>
    </div>
  </transition>
</template>

<script>
import { Toast } from 'mint-ui'
import { Base64Utils } from '@/assets/js/utils'
import BScroll from '@/components/BScroll/BScroll'
import api from '@/api/hyc/mine/charge'
import { isMobile } from '@/assets/js/regular'
import Hyoucai from '@/assets/js/hyoucai'
import { AppToast } from '@/assets/js/Toast'
import AppDialog from '@/components/Dialog/Alert'

export default {
  components: {
    BScroll,
    AppDialog
  },
  data() {
    return {
      text: '充值',
      amount: '',
      smsCode: '',
      mobile: '',
      isValid: true,
      banlance: 0,
      bankCardInfo: {
        accountId: '',
        area: '',
        bankNo: '',
        cardNo: '',
        city: '',
        fullName: '',
        mobile: '',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '',
        userName: ''
      },
      userName: Hyoucai.getItem('userInfo').userName,
      authorization: Hyoucai.getItem('g_authorization'),
      showDialog: false,
      confirmType: 0,
      dialogTitle: '友情提示',
      chargeErrText: ''
    }
  },
  filters: {
    chaptcherFilter(data) {
      return data.replace(/[^0-9-]+/, '')
    }
  },
  props: ['entrance'],
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
      this.amount = e.target.value
    },
    mobileInput(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      if (e.target.value.length > 11) {
        e.target.value = e.target.value.slice(0, 11)
      }
      this.mobile = e.target.value
    },
    checkAmount() {
      if (!this.amount) {
        AppToast.empty('chargeAmount')
        return false
      }
      if (this.amount && this.amount < 100) {
        AppToast.minVal('chargeAmount', '100元')
        return false
      }
      if (this.mobile && this.mobile.length < 11) {
        AppToast.short('mobile', 11)
        return false
      }
      if (this.mobile && this.mobile.length > 11) {
        AppToast.overstep('mobile', 11)
        return false
      }
      if (!isMobile(this.mobile)) {
        AppToast.empty('reservedMobile')
        return false
      }
      let data = {
        userName: this.userName,
        authorization: this.authorization,
        bankCode: this.bankCardInfo.bankCode,
        amount: this.amount
      }
      api.checkAmountApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.reCharge()
        } else {
          Toast(resultMsg)
        }
      })
    },
    reCharge() {
      let path
      if (this.entrance) {
        path = Base64Utils.base64ToObject(this.entrance).fullPath
      } else {
        path = '/mine'
      }
      let forgetUrl = Hyoucai.getRetBaseURL() + '/mine'
      let data = {
        userName: this.userName,
        authorization: this.authorization,
        txAmount: this.amount,
        retUrl: Hyoucai.getRetBaseURL() + path,
        forgotPwdUrl: forgetUrl,
        mobile: this.mobile,
        platform: 'h5'
      }
      api.rechargeApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
        } else if (res.data.resultCode === '90101') {
          this.showDialog = true
          this.chargeErrText = res.data.resultMsg
        } else {
          Toast(resultMsg)
        }
      })
    },
    postcall(url, params, target) {
      let tempform = document.createElement('form')
      tempform.setAttribute('name', 'form')
      tempform.action = url
      tempform.method = 'post'
      tempform.style.display = 'none'
      if (target) {
        tempform.target = target
      }

      for (let x in params) {
        let opt = document.createElement('input')
        opt.name = x
        opt.value = params[x]
        tempform.appendChild(opt)
      }

      let opt = document.createElement('input')
      opt.type = 'submit'
      opt.setAttribute('id', '_submit')
      tempform.appendChild(opt)
      document.body.appendChild(tempform)
      tempform.submit()
      document.body.removeChild(tempform)
    },
    getBankCardQuery() {
      api.bankCardQueryApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankCardInfo = data.data
        } else {
          Toast(resultMsg)
        }
      })
    },
    toChargeTip() {
      this.$router.push('./transfer_charge')
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    this.getBankCardQuery()
    api.amountInfoApi().then(res => {
      if (res.data.resultCode === '1') {
        const data = res.data.data
        this.banlance = data.banlance
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.pageContainer {
  height: 100%;
  top: 0.44rem;
  font-size: $font-size-small-s;
  background-color: #f9f9f9;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top {
      margin-top: 0.08rem;
      margin-bottom: 0.08rem;
      li {
        background-color: #fff;
        &:first-child {
          display: flex;
          padding: 0.16rem;
          @include border-bottom-1px(#eee);
          dl {
            display: flex;
            dt {
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              margin-right: 0.08rem;
              margin-top: 0.08rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            dd {
              p {
                font-size: $font-size-small;
                color: #333;
              }
              div {
                font-size: $font-size-small-s;
                color: $color-text-s;
              }
            }
          }
        }
        &:nth-of-type(2) {
          > div {
            display: flex;
            height: 0.5rem;
            margin-left: 0.16rem;
            padding-right: 0.16rem;
            line-height: 0.5rem;
            @include border-bottom-1px(#eee);
            input {
              flex: 1;
              display: inline-block;
              font-size: $font-size-small;
            }
            span {
              width: 0.16rem;
              color: $color-text;
            }
          }
        }
        &:nth-of-type(3) {
          > div {
            height: 0.32rem;
            margin-left: 0.16rem;
            padding-right: 0.16rem;
            line-height: 0.32rem;
            font-size: $font-size-small-ss;
            span {
              margin-right: 0.08rem;
              color: $color-text;
            }
            em {
              color: $color-button;
            }
          }
        }
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
          padding: 0 0.16rem;
          font-size: $font-size-small-s;
          border-bottom: 2px solid #eee;
          span {
            display: inline-block;
            width: 0.4rem;
            margin-right: 0.16rem;
            color: $color-text;
          }
          input {
            display: inline-block;
            flex: 1;
            line-height: 0.5rem;
            font-size: $font-size-small-s;
          }
          em {
            display: inline-block;
            width: 0.09rem;
            height: 0.15rem;
            margin-top: 0.17rem;
            background-size: 100% 100%;
            background-image: url('./image/more@3x.png');
          }
        }
        &:last-child {
          height: auto;
          padding: 0.08rem 0;
          line-height: 1;
          font-size: $font-size-small-ss;
          > div {
            display: flex;
            height: auto;
            border-bottom: none;
            > input {
              flex: 1;
              color: $color-text;
            }
          }
        }
      }
    }
    /deep/ .mint-cell {
      height: 0.44rem;
      color: $color-text;
      .mint-cell-wrapper {
        padding: 0 0.16rem;
        background-image: none;
        font-size: $font-size-small-s;
      }
      .mint-cell-allow-right {
        &:after {
          width: 10px;
          height: 10px;
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
  .dialog-content {
    color: $color-text-s;
    text-align: center;
    font-size: 0.13rem;
    margin: 0 0.2rem 0.2rem 0.2rem;
    line-height: 1.5;
  }
}
</style>
