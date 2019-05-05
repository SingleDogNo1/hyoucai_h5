<template>
  <div class="card">
    <BScroll class="card-scroll">
      <section>
        <div class="amount-wrapper">
          <h6>充值金额</h6>
          <div class="amount">
            <span>¥</span>
            <input type="text" placeholder="请输入充值金额（100元起）" v-model="amount" />
          </div>
        </div>
        <div class="form">
          <div class="block">
            <span>姓名</span>
            <input type="text" v-model="name" placeholder="请输入姓名" disabled />
          </div>
          <div class="block">
            <span>银行卡号</span>
            <input type="text" maxlength="20" v-model="bankCard" placeholder="请输入银行卡号" />
            <img src="./tips.png" alt="" @click="toSupportBank" />
          </div>
          <div class="block">
            <span>手机号</span>
            <input type="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号" />
          </div>
          <div class="block">
            <span>验证码</span>
            <input type="tel" maxlength="6" v-model="smsCode" placeholder="请输入短信验证码" />
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
import { captchaId } from '@/assets/js/const'
import { isMobile, isBankCard, isMobCode } from '@/assets/js/regular'
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
      smsCode: ''
    }
  },
  methods: {
    sendSMSCode() {
      this.captchaIns && this.captchaIns.popUp()
    },
    getSmsCode() {
      console.log(1)
      this.$refs.smsBtn.countDown()
    },
    toSupportBank() {
      this.$router.push({
        name: 'supportBanks'
      })
    },
    bindCard() {
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
      console.log(111)
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
      padding: 0.16rem 0.15rem 0.1rem;
      background: #ffffff;
      margin-bottom: 0.08rem;
      h6 {
        font-size: 0.13rem;
        color: #999;
        line-height: 0.18rem;
        margin-bottom: 0.1rem;
      }
      .amount {
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
