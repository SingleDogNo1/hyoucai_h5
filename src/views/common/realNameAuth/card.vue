<template>
  <div class="card">
    <BScroll class="card-scroll">
      <section>
        <div class="amount-wrapper">
          <h6>充值金额</h6>
          <div class="amount">
            <span>¥</span>
            <input type="text" placeholder="请输入充值金额（100元起）" @input="amountInput" />
          </div>
          <p class="amount-err">{{ amountErrMsg }}</p>
        </div>
        <div class="form">
          <div class="block">
            <span>姓名</span>
            <input type="text" :value="`${user.realName.substr(0, 1)}**`" placeholder="请输入姓名" disabled />
          </div>
          <div class="block">
            <span>银行卡号</span>
            <input type="text" maxlength="20" @input="numberInput($event, 'bankCard')" placeholder="请输入银行卡号" />
            <img src="./tips.png" alt="" @click="toSupportBank" />
          </div>
          <div class="block">
            <span>手机号</span>
            <input type="tel" maxlength="11" @input="numberInput($event, 'mobile')" placeholder="请输入手机号" />
          </div>
          <div class="block">
            <span>验证码</span>
            <input type="tel" maxlength="6" @input="numberInput($event, 'smsCode')" v-model="smsCode" placeholder="请输入短信验证码" />
            <SMSBtn text="获取验证码" class="sms-btn" ref="smsBtn" @getSMSCode="sendSMSCode" />
          </div>
        </div>
        <p>为了您的账户提现快速到账，请您使用一类卡充值</p>
        <a href="https://mp.weixin.qq.com/s/AGl5G7v0Z8UvMfLtDGQaMg">点击了解何为一类卡></a>
      </section>
    </BScroll>
    <div class="submit">
      <button :class="{ active: bankCard && mobile && amount && smsCode }" @click="bindCard">确认绑卡</button>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import SMSBtn from '@/components/smsBtn'
import { mapGetters } from 'vuex'

import { captchaId } from '@/assets/js/const'

import { isMobile, isBankCard, isMobCode } from '@/assets/js/regular'
import { rechargeApiDirectPayServer, queryCardInfo } from '@/api/djs/mine/charge'
import { Toast } from 'mint-ui'

export default {
  name: 'card',
  components: {
    BScroll,
    SMSBtn
  },
  data() {
    return {
      captchaIns: null, // 滑块验证码实例
      validate: '', // 滑块验证码二次验证信息
      amount: '',
      name: '***',
      bankCard: '',
      mobile: '',
      smsCode: '',
      bankCode: '',
      amountErrMsg: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'platform'])
  },
  watch: {
    amount(value) {
      if (value !== '' && value - 0 < 100) {
        this.amountErrMsg = '充值金额最少100元起'
      } else {
        this.amountErrMsg = ''
      }
    }
  },
  methods: {
    sendSMSCode() {
      this.captchaIns && this.captchaIns.popUp()
    },
    getSmsCode() {
      if (!this.amount) {
        Toast('请输入充值金额')
        return
      }
      if (!this.amount < 100) {
        Toast('充值金额100元起')
        return
      }
      if (!isBankCard(this.bankCard)) {
        Toast('请输入正确的银行卡号')
        return
      }
      if (!isMobile(this.mobile)) {
        Toast('请输入正确的手机号')
        return
      }

      this.$refs.smsBtn.countDown()
      queryCardInfo({
        bankCardNum: this.bankCard
      }).then(res => {
        this.bankCode = res.data.bankCode
        rechargeApiDirectPayServer({
          amount: this.amount,
          userName: this.user.userName,
          bankCardNum: this.bankCard,
          bankCode: this.bankCode,
          mobileNo: this.mobile,
          rechargeType: 'KQAP',
          whichSetp: 'send',
          validCode: this.smsCode
        }).then(res => {
          if (res.data.resultCode === '1') {
            Toast('验证码发送成功')
          }
        })
      })
    },
    toSupportBank() {
      this.$router.push({
        name: 'DJSSupportBank'
      })
    },
    bindCard() {
      if (!this.amount) {
        Toast('请输入充值金额')
        return
      }
      if (!isBankCard(this.bankCard)) {
        Toast('请输入正确的银行卡号')
        return
      }
      if (!isMobile(this.mobile)) {
        Toast('请输入正确的手机号')
        return
      }
      if (!isMobCode(this.smsCode)) {
        Toast('请输入正确的验证码')
        return
      }
      rechargeApiDirectPayServer({
        amount: this.amount,
        userName: this.user.userName,
        bankCardNum: this.bankCard,
        bankCode: this.bankCode,
        mobileNo: this.mobile,
        rechargeType: 'KQAP',
        whichSetp: 'val',
        validCode: this.smsCode
      }).then(res => {
        if (res.data.resultCode === '1') {
          if (this.platform === 'djs') {
            this.$router.push({ name: 'DJSHomePage' })
          } else {
            this.$router.push({ name: 'HYCHomePage' })
          }
        } else {
          Toast(res.data.resultMsg)
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
      this.amount = e.target.value
    },
    numberInput(e, type) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace('.', '$#$').replace(/\./g, '')
      switch (type) {
        case 'bankCard':
          this.bankCard = e.target.value
          break
        case 'mobile':
          this.mobile = e.target.value
          break
        case 'smsCode':
          this.smsCode = e.target.value
          break
      }
    }
  },
  created() {
    // 初始化滑块弹出层
    window.initNECaptcha(
      {
        captchaId: captchaId,
        width: '320px',
        element: '#captcha',
        mode: 'popup',
        onVerify: (err, data) => {
          this.validate = data.validate
          this.getSmsCode()
        },
        onClose: () => {
          this.captchaIns.refresh()
        }
      },
      instance => {
        this.captchaIns = instance
      }
    )
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';

input {
  font-size: 0.15rem;
  &::placeholder {
    color: #ccc;
  }
}

.card {
  height: 100%;
  .card-scroll {
    height: calc(100% - 0.56rem);
    overflow: hidden;
    .amount-wrapper {
      padding: 0.16rem 0 0.1rem;
      background: #ffffff;
      margin-bottom: 0.08rem;
      h6 {
        font-size: 0.13rem;
        padding: 0 0.15rem;
        color: #999;
        line-height: 0.18rem;
        margin-bottom: 0.1rem;
      }
      .amount {
        padding: 0 0.15rem;
        display: flex;
        justify-content: space-between;
        span {
          width: 0.2rem;
          font-size: 0.24rem;
          line-height: 0.33rem;
        }
        input {
          flex: 1;
          font-size: 0.15rem;
          padding-left: 0.05rem;
        }
      }
      .amount-err {
        margin-top: 0.05rem;
        background: #ec5e52;
        line-height: 2;
        color: #fff;
        font-size: 0.1rem;
        padding: 0 0.15rem;
      }
    }
    .form {
      padding-left: 0.15rem;
      background: #ffffff;
      margin-bottom: 0.15rem;
      .block {
        @include cube(100%, 0.5rem);
        padding-right: 0.15rem;
        @include border-bottom-1px(#eee);
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          width: 0.9rem;
          font-size: 0.15rem;
        }
        input {
          flex: 1;
        }
        img {
          @include square(0.16rem);
        }
        .sms-btn {
          /deep/ input {
            font-size: 0.15rem;
            color: #ec5e52;
          }
        }
      }
    }
    section {
      > p {
        padding-left: 0.15rem;
        font-size: 0.13rem;
        color: #999;
        line-height: 0.2rem;
      }
      > a {
        padding-left: 0.15rem;
        margin-top: 0.04rem;
        font-size: 0.13rem;
        color: #ec5e52;
        line-height: 0.2rem;
      }
    }
  }
  .submit {
    @include cube(100%, 0.56rem);
    background: #fff;
    box-shadow: 0 1px 0 0 #eee;
    padding-top: 0.07rem;
    button {
      @include cube(3.45rem, 0.42rem);
      display: block;
      margin: 0 auto;
      background: #ccc;
      border-radius: 0.04rem;
      font-size: 0.15rem;
      color: #fff;
      transition: 0.4s;
      &.active {
        background: #ec5e52;
      }
    }
  }
}
</style>
