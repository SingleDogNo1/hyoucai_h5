<template>
  <transition name="fade">
    <div class="pageContainer" ref="container">
      <b-scroll class="scroll"
                ref="scrollRef">
        <div>
          <ul class="top">
            <li class="border-bottom-1px">
              <dl>
                <dt><img v-lazy="bankCardInfo.iconUrl" alt=""></dt>
                <dd>
                  <p>付款方式</p>
                  <input v-if="!isBankcardSupport" type="text" v-model="bankCardInfo.cardNo" />
                  <span v-else>{{ bankCardInfo.cardNo }}</span>
                  <div class="border-top-1px">{{bankCardInfo.quota}}</div>
                </dd>
              </dl>
            </li>
            <li>
              <p>充值金额</p>
              <div class="border-bottom-1px">
                <span>¥</span>
                <input placeholder="请输入充值金额（100元起）" type="text" @input="amountInput">
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
              <!--<input disabled type="text" id="name" placeholder="请输入姓名" v-model="plusStar(bankCardInfo.accountName, 1, 0)">-->
              <span>{{plusStar(bankCardInfo.accountName, 0, 1)}}</span>
            </li>
            <li>
              <label>身份证号</label>
              <!--<input disabled type="text" id="idNo" placeholder="请输入身份证号" v-model="this.bankCardInfo.idCard">-->
              <span>{{bankCardInfo.idCard}}</span>
            </li>
            <li>
              <label for="tel">手机号</label>
              <input v-if="!isBankcardSupport" type="text" id="tel" placeholder="请输入银行预留手机号" @input="mobileInput">
              <span v-else>{{ bankCardInfo.mobile }}</span>
            </li>
            <li>
              <label for="smsCode">验证码</label>
              <input type="text" id="smsCode" placeholder="请输入短信验证码" v-model="smsCode">
              <sms-btn class="sms-btn"></sms-btn>
            </li>
          </ul>
          <!--<mt-cell title="转账充值" is-link @click.native="toChargeTip"></mt-cell>-->
          <div class="tip">
            <button @click="submitCharge">确认充值</button>
          </div>
        </div>
      </b-scroll>
      <app-dialog
        :title="dialogTitle"
        :show.sync="showDialog">
        <p class="dialog-content">{{chargeErrText}}</p>
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
} from '@/api/djs/charge'
import SmsBtn from '@/components/smsBtn/index'
// import { isMobile } from '@/assets/js/regular'
// import { AppToast } from '@/assets/js/Toast'
import AppDialog from '@/components/Dialog/Alert'
import { getUser } from '@/assets/js/cache'
import { getAuth, getRetBaseURL } from '@/assets/js/utils'

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
      mobile: '',
      balance: 0.0,
      chargedBalance: 0.0,
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
      isBankcardSupport: false, // 快钱是否支持用户当前银行卡
      retUrl: '' // 银行跳转回来的页面，这里主要是为了从出借详情过来的，因为还要在跳转回去
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
    plusStar(str, frontNO, endNo) {
      if (str && str.length) {
        let len = str.length - frontNO - endNo
        let star = ''
        for (let i = 0; i < len; i++) {
          star += '*'
        }
        return str.substring(0, frontNO) + star + str.substring(str.length - endNo)
      } else {
        return ''
      }
    },
    userAndBankInfo() {
      userAndBankInfo().then(res => {
        if (res.data.userInfo.cardNo) {
          this.bankCardInfo.idCard = res.data.userInfo.identityNo
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
        this.showDialog = true
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
          this.errMsg.common = data.resultMsg
        }
      })
    },
    submitCharge() {
      this.checkAmountInput()
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
          this.chargeErrText = '预计15s内到账，请您耐心等候。'
        } else {
          this.errMsg.smsCode = data.resultMsg
        }
      })
    },
    userRechargePreVerify() {
      userRechargePreVerify().then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.isBankcardSupport = data.isBankcardSupport
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
        }
      })
    },
    getBasicInfo() {
      let params = {
        userName: this.userName,
        authorization: this.authorization,
        bankCardNum: this.bankCardNo
      }
      queryCardInfo(params).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.bankCardInfo = data
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
          let nos = JSON.parse(JSON.stringify(this.bankCardInfo.cardNo))
          let len = nos.length
          this.bankCardNo = nos.substring(0, 4) + '*******' + nos.substring(len - 4, len)
          this.getBasicInfo()
        }
      })
    },
    confirmCharged() {
      this.retUrl ? getRetBaseURL() + this.retUrl : this.$router.push({ name: 'overview' })
    },
    closeDialog() {
      this.showDialog = false
    }
  },
  created() {
    this.getBankCardNo()
    this.personalAccount()
    // this.userRechargePreVerify()
    this.userAndBankInfo()
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyDetail') {
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
  top: 0.44rem;
  font-size: $font-size-small-s;
  background-color: #eee;
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
      margin: 0.08rem 0;
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
