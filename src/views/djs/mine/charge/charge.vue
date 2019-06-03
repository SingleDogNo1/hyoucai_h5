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
                  <p>付款方式</p>
                  <input v-if="!isBankcardSupport" type="text" @input="bankCardInput" />
                  <span v-else>{{ bankCardInfo.cardNo | bankCardFilter }}</span>
                  <div class="border-top-1px" v-if="!isBankcardSupport">无支持充值银行卡</div>
                  <div class="border-top-1px" v-else>{{ bankCardInfo.quota }}</div>
                </dd>
              </dl>
            </li>
            <li>
              <p>充值金额</p>
              <div class="border-bottom-1px">
                <span>¥</span>
                <input placeholder="请输入充值金额（100元起）" type="text" @input="amountInput" />
              </div>
            </li>
            <!--<li>
              <div>
                <span>可用余额</span>
                <em>{{banlance}}元</em>
              </div>
            </li>-->
          </ul>
          <ul class="bottom">
            <li>
              <label>姓名</label>
              <span>{{ bankCardInfo.showRealName }}</span>
            </li>
            <li>
              <label>身份证号</label>
              <span>{{ bankCardInfo.idCard }}</span>
            </li>
            <li>
              <label for="tel">手机号</label>
              <input v-if="!isBankcardSupport" type="text" id="tel" placeholder="请输入银行预留手机号" @input="mobileInput" />
              <span v-else>{{ bankCardInfo.mobile }}</span>
            </li>
            <li>
              <label for="smsCode">验证码</label>
              <input type="text" id="smsCode" placeholder="请输入短信验证码" v-model="smsCode" />
              <sms-btn class="sms-btn" ref="smsBtn" :totalTime="60" @getSMSCode="getSmsCode"></sms-btn>
            </li>
          </ul>
          <dl class="download-wrapper">
            <dt>如需变更银行卡请下载官方App</dt>
            <dd><router-link :to="{ name: 'AppDownload' }">下载App</router-link></dd>
          </dl>
          <div class="no1-card">
            <p>为了您的账户提现快速到账，请您绑定一类卡</p>
            <div><a href="https://mp.weixin.qq.com/s/AGl5G7v0Z8UvMfLtDGQaMg">点击了解何为一类卡></a></div>
          </div>
          <!--<mt-cell title="转账充值" is-link @click.native="toChargeTip"></mt-cell>-->
          <div class="tip border-top-1px">
            <button @click="submitCharge">确认充值</button>
          </div>
        </div>
      </b-scroll>
      <app-dialog :title="dialogTitle" :show.sync="showDialog" :confirmText="confirmText" :onConfirm="confirmCharged">
        <p class="dialog-content">{{ chargeErrText }}</p>
      </app-dialog>
    </div>
  </transition>
</template>

<script>
import { Toast } from 'mint-ui'
// import { Base64Utils } from '@/assets/js/utils'
import BScroll from '@/components/BScroll/BScroll'
import {
  queryCardInfo,
  userBankCardList,
  personalAccount,
  userRechargePreVerify,
  rechargeApiDirectPayServer,
  unionPay,
  userAndBankInfo
} from '@/api/djs/mine/charge'
import SmsBtn from '@/components/smsBtn/index'
import { isMobile } from '@/assets/js/regular'
import { AppToast } from '@/assets/js/Toast'
import AppDialog from '@/components/Dialog/Alert'
import { getUser } from '@/assets/js/cache'
import { getAuth, getRetBaseURL, plusStar } from '@/assets/js/utils'

const ERR_OK = '1'
export default {
  components: {
    BScroll,
    SmsBtn,
    AppDialog
  },
  data() {
    return {
      amount: '',
      smsCode: '',
      balance: 0.0,
      chargedBalance: 0.0,
      bankCardInfo: {
        showRealName: '',
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
        userName: '',
        iconUrl: '',
        idCard: ''
      },
      personalInfo: {
        banlance: ''
      },
      userName: getUser().userName,
      authorization: getAuth(),
      bankCardNo: '',
      showCountDown: false,
      countDown: 60,
      timeInterval: null,
      errMsg: {
        amount: '',
        smsCode: '',
        common: ''
      },
      dialogTitle: '汇有才温馨提示',
      showDialog: false,
      chargeErrText: '充值成功',
      confirmText: '我知道了',
      isBankcardSupport: false, // 快钱是否支持用户当前银行卡
      retUrl: '' // 银行跳转回来的页面，这里主要是为了从出借详情过来的，因为还要在跳转回去
    }
  },
  filters: {
    bankCardFilter(val) {
      return val.replace(/....(?!$)/g, '$& ')
    }
  },
  watch: {
    amount(ne) {
      if (!ne) {
        this.chargedBalance = this.personalInfo.banlance
      } else {
        const sumChargeAmt = parseFloat(this.balance) + ne
        if (this.balance.toString().includes('.00')) {
          this.chargedBalance = sumChargeAmt + '.00'
        } else {
          this.chargedBalance = sumChargeAmt
        }
      }
    }
  },
  methods: {
    userAndBankInfo() {
      userAndBankInfo().then(res => {
        if (res.data.userInfo.cardNo) {
          this.$set(this.bankCardInfo, 'idCard', res.data.userInfo.identityNo)
          // this.bankCardInfo.idCard = res.data.userInfo.identityNo
          this.userRechargePreVerify()
        }
      })
    },
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
      this.checkAmountInput()
    },
    mobileInput(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      if (e.target.value.length > 11) {
        e.target.value = e.target.value.slice(0, 11)
      }
      this.bankCardInfo.mobile = e.target.value
    },
    bankCardInput(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/....(?!$)/g, '$& ')
      if (e.target.value.length > 24) {
        e.target.value = e.target.value.slice(0, 24)
      }
      this.bankCardInfo.cardNo = e.target.value.replace(/\s/g, '')
    },
    checkAmountInput() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      this.errMsg.amount = ''
    },
    getSmsCode() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      if (this.bankCardInfo.mobile && this.bankCardInfo.mobile.length < 11) {
        AppToast.short('mobile', 11)
        return false
      }
      if (this.bankCardInfo.mobile && this.bankCardInfo.mobile.length > 11) {
        AppToast.overstep('mobile', 11)
        return false
      }
      if (!isMobile(this.bankCardInfo.mobile)) {
        AppToast.empty('reservedMobile')
        return false
      }
      this.$refs.smsBtn.countDown()
      let data = {
        amount: this.amount,
        userName: this.userName,
        bankCardNum: this.bankCardInfo.cardNo,
        bankCode: this.bankCardInfo.bank,
        mobileNo: this.bankCardInfo.mobile,
        rechargeType: 'KQAP',
        whichSetp: 'send',
        authorization: this.authorization
      }
      rechargeApiDirectPayServer(data).then(res => {
        let data = res.data
        // this.showDialog = true
        if (data.resultCode === ERR_OK) {
          this.errMsg.common = '验证码发送成功！'
          this.showCountDown = true
          if (this.timeInterval) {
            clearInterval(this.timeInterval)
          }
          this.timeInterval = setInterval(() => {
            this.countDown--
            if (this.countDown <= 0) {
              this.showCountDown = false
              this.countDown = 60
              clearInterval(this.timeInterval)
            }
          }, 1000)
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    submitCharge() {
      if (!this.amount) {
        AppToast.empty('chargeAmount')
        return false
      }
      if (this.amount && this.amount < 100) {
        AppToast.minVal('chargeAmount', '100元')
        return false
      }
      if (this.bankCardInfo.mobile && this.bankCardInfo.mobile.length < 11) {
        AppToast.short('mobile', 11)
        return false
      }
      if (this.bankCardInfo.mobile && this.bankCardInfo.mobile.length > 11) {
        AppToast.overstep('mobile', 11)
        return false
      }
      if (!isMobile(this.bankCardInfo.mobile)) {
        AppToast.empty('reservedMobile')
        return false
      }
      if (!this.smsCode) {
        Toast('请输入短信验证码！')
        return
      }
      let data = {
        amount: this.amount,
        userName: this.userName,
        bankCardNum: this.bankCardInfo.cardNo,
        bankCode: this.bankCardInfo.bank,
        mobileNo: this.bankCardInfo.mobile,
        rechargeType: 'KQAP',
        whichSetp: 'val',
        validCode: this.smsCode,
        authorization: this.authorization
      }
      rechargeApiDirectPayServer(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.showDialog = true
          this.dialogTitle = '充值中'
          this.chargeErrText = '预计15s内到账，请您耐心等候'
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    userRechargePreVerify() {
      userRechargePreVerify().then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.isBankcardSupport = data.isBankcardSupport
          // this.isBankcardSupport = false
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    submitUnionPay() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      let data = {
        amount: this.amount,
        rechargeType: 'KQ',
        returnUrl: this.retUrl ? getRetBaseURL() + this.retUrl : getRetBaseURL() + '/mine/charge',
        username: this.userName
      }
      unionPay(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          let map = data.map
          let redirectUrl = map.bill99MerUrl
          let options = JSON.parse(JSON.stringify(map))
          delete options.bill99MerUrl
          let params = options
          this.postcall(redirectUrl, params, '_blank')
        } else {
          Toast(data.resultMsg)
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
        opt.setAttribute('name', x)
        opt.setAttribute('value', params[x])
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
    personalAccount() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      personalAccount(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.personalInfo = data
          // this.personalInfo.banlance = 10000.89
          this.chargedBalance = this.personalInfo.banlance
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    getBasicInfo() {
      let params = {
        userName: this.userName,
        authorization: this.authorization,
        bankCardNum: this.bankCardInfo.cardNo
      }
      queryCardInfo(params).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          // this.bankCardInfo = data
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    getBankCardNo() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      userBankCardList(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.bankCardInfo = data.list[0]
          this.userAndBankInfo()
          this.bankCardInfo.showRealName = plusStar(this.bankCardInfo.accountName, 0, 1)
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    confirmCharged() {
      this.retUrl ? (window.location.href = getRetBaseURL() + this.retUrl) : this.$router.push({ name: 'DJSUserCenter' })
      // if (this.retUrl) {
      //   window.location.href = getRetBaseURL() + this.retUrl
      // } else {
      //   this.$router.push({ name: 'DJSUserCenter' })
      // }
      // this.$router.go(-1)
    }
  },
  created() {
    this.getBankCardNo()
    this.personalAccount()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyLend') {
        vm.retUrl = from.fullPath
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

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
      padding-top: 0.08rem;
      margin-bottom: 0.08rem;
      li {
        margin-bottom: 0.08rem;
        padding: 0.16rem 0 0.08rem 0.16rem;
        background-color: #fff;
        &:first-child {
          display: flex;
          @include border-bottom-1px(#eee);
          dl {
            display: flex;
            width: 100%;
            dt {
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              padding: 0.07rem;
              background-color: #eee;
              margin-right: 0.1rem;
            }
            dd {
              width: 100%;
              p {
                font-size: $font-size-small-s;
                color: #999;
              }
              input,
              span {
                display: inline-block;
                width: 100%;
                height: 0.36rem;
                line-height: 0.36rem;
                color: #333;
                font-size: $font-size-medium;
              }
              div {
                padding-top: 0.06rem;
                font-size: $font-size-small-s;
                color: $color-button;
                @include border-top-1px(#eee);
              }
            }
          }
        }
        &:nth-of-type(2) {
          > p {
            margin-bottom: 0.15rem;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
          > div {
            display: flex;
            height: 0.3rem;
            line-height: 0.3rem;
            padding-right: 0.16rem;
            span {
              margin-right: 0.08rem;
              color: $color-text-b;
              font-size: 0.24rem;
            }
            input {
              flex: 1;
              display: inline-block;
              font-size: $font-size-small;
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
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .bottom {
      margin: 0.08rem 0 0;
      background-color: #fff;
      li {
        height: 0.5rem;
        line-height: 0.5rem;
        margin-left: 0.16rem;
        @include border-bottom-1px(#eee);
        display: flex;
        label {
          width: 0.93rem;
        }
        input {
          display: inline-block;
          flex: 1;
          line-height: 0.5rem;
          font-size: $font-size-small-s;
        }
        .sms-btn {
          margin-right: 0.15rem;
        }
      }
    }
    .download-wrapper {
      display: flex;
      padding: 0.12rem 0.16rem 0.1rem;
      background-color: #efefef;
      font-size: $font-size-small;
      line-height: 30px;
      dt {
        flex: 1;
        color: #999;
        text-align: left;
      }
      dd {
        width: 0.72rem;
        height: 0.3rem;
        border-radius: 0.04rem;
        background-color: #ec5e52;
        text-align: center;
        a {
          color: #fff;
        }
      }
    }
    .no1-card {
      padding: 0.15rem;
      font-size: $font-size-small-s;
      p {
        color: $color-button;
      }
      div {
        a {
          color: #f78458;
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
      padding: 0.07rem 0.16rem;
      @include border-top-1px(#eee);
      font-size: $font-size-small-s;
      color: $color-text-s;
      background-color: #fff;
      box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
      div {
        margin-bottom: 0.08rem;
      }
      button {
        width: 100%;
        height: 0.44rem;
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
