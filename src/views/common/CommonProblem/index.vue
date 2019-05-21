<template>
  <div class="common-problem">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <div class="item" v-for="(item, index) in commonQuestions" :key="index">
          <div class="inn border-bottom-1px">
            <section class="question" @click="toggleItems(commonQuestions, index)">
              <em>{{ item.question }}</em>
              <transition name="rotate-min">
                <i v-if="item.flag_min"></i>
              </transition>
              <transition name="rotate-plus">
                <b v-if="item.flag_plus"></b>
              </transition>
            </section>
            <div class="answer" v-if="item.flag_min">
              <dl><dd v-html="item.answer"></dd></dl>
            </div>
          </div>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'introduction',
  components: {
    BScroll
  },
  data() {
    return {
      title: '常见问题',
      commonQuestions: [
        {
          question: '1、注册有什么条件？',
          flag_min: true,
          flag_plus: false,
          answer: `
            <span>年满18周岁，具有完全民事权利能力和民事行为能力，可以在汇有财网站上进行注册、完成实名认证和江西银行的存管账户开户和绑卡，成为汇有财客户。您在汇有财借贷平台的出借方式所适用的法律法规、监管规定对您的资格有其他要求的，您还应当符合相应要求。</span>
          `
        },
        {
          question: '2、实名认证不通过怎么办？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>（1）请检查您的姓名、身份证号码是否输入正确；</span><br>
            <span>（2）请检查您的身份证号是否已在其它用户名上做过实名认证；</span><br>
            <span>（3）可以联系客服400-099-7979。</span>
          `
        },
        {
          question: '3、在汇有财注册后，可以不开立银行存管账户就进行出借吗？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>不可以。存管子账户用于分账管理用户的交易与资金信息，如不开立，无法进行后续的操作。</span>
          `
        },
        {
          question: '4、可以直接使用银行卡出借吗？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>目前汇通金融旗下网贷平台汇有财出借服务需要使用可用余额进行交易，您需要先把银行卡资金充值到可用余额，才可以进行出借。</span>
          `
        },
        {
          question: '5、为什么绑定银行卡会失败？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>(1)银行卡信息问题：请确认姓名、身份证、手机号与用户平台信息是否完全一致；</span><br>
            <span>(2)您输入的银行卡没有开通网上银行业务；</span><br>
            <span>(3)江西银行不支持您使用的银行卡，目前暂不支持绑定信用卡；</span><br>
            <span>(4)银行卡账户冻结或正在办理挂失。</span>
          `
        },
        {
          question: '6、为什么会登录失败？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>请您核对以下几点，这些可能是导致您登录失败的原因：</span><br>
            <span>(1)请您确认输入的用户名是否正确；</span><br>
            <span>(2)请您确认输入的密码是否正确。如果忘记密码，您可以点击【忘记密码】找回密码；</span><br>
            <span>(3)请您确认输入的图形验证码是否正确。如果看不清楚，可以点击图片重新获取；</span><br>
            <span>(4)网络问题也会造成登录失败；</span><br><span>(5)如果提示网页有错误，建议您稍后尝试。</span>
          `
        },
        {
          question: '7、借款人未按时还款怎么办？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>若借款人逾期未归还款项，为保护出借人的权益，汇通金融将会采取以下措施：</span><br>
            <span>(1)催收部门对借款人开展大力度催收；</span><br>
            <span>(2)根据电子协议中关于罚息的规定，对借款人收取逾期罚息。</span>
          `
        },
        {
          question: '8、出借回款是回到银行卡吗？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>不是，项目到期后系统自动将回款注入到账户余额，可到手机客户端-我的-可用余额-操作转出至银行卡或继续出借。</span>
           `
        },
        {
          question: '9、提现时收不到验证码，怎么办？',
          flag_min: false,
          flag_plus: true,
          answer: `
            <span>（1）请检查您的手机号码是否输入正确；</span><br>
            <span>（2）请检查您的手机拦截功能是否被开启；</span><br>
            <span>（3）请检查是否设置拒收本平台信息；</span><br>
            <span>（4）若以上三种情况都无误，请重新获取验证码并联系客服：400-099-7979。</span>
          `
        }
      ]
    }
  },
  methods: {
    toggleItems(arr, index) {
      alert(1)
      let time = null
      clearTimeout(time)
      if (arr[index].flag_plus) {
        arr[index].flag_plus = !arr[index].flag_plus
        time = setTimeout(() => {
          arr[index].flag_min = !arr[index].flag_min
        }, 300)
      } else {
        arr[index].flag_min = !arr[index].flag_min
        time = setTimeout(() => {
          arr[index].flag_plus = !arr[index].flag_plus
        }, 300)
      }
    },
    goBack() {
      if (window.jsBack.backCs) {
        window.jsBack.backCs()
      } else {
        this.$router.go(-1)
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.scrollRef.refresh()
      })
    }
  },
  created() {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.rotate-plus-enter-active,
.rotate-plus-leave-active,
.rotate-min-enter-active,
.rotate-min-leave-active {
  transition: all 0.3s;
}

.rotate-plus-enter,
.rotate-plus-leave-to {
  opacity: 0;
}

.rotate-min-enter,
.rotate-min-leave-to {
  opacity: 0;
}
.common-problem {
  background-color: $color-background;
  height: 100%;
  box-sizing: border-box;
  .scroll {
    height: 100%;
    overflow: hidden;
    > div {
      .item {
        background-color: #fff;
        margin-bottom: 0.08rem;
        .inn {
        }
        &:last-child {
          .inn {
            border-bottom: none;
          }
        }
        .question {
          position: relative;
          display: flex;
          padding: 0.12rem 4%;
          line-height: 1.75;
          font-size: $font-size-small-s;
          span {
            display: inline-block;
            width: 0.24rem;
            color: $color-button;
          }
          em {
            flex: 1;
            color: $color-text;
            padding-right: 0.2rem;
          }
          i {
            position: absolute;
            display: inline-block;
            top: 50%;
            margin-top: -0.05rem;
            right: 4%;
            width: 0.15rem;
            height: 0.1rem;
            @include bg-image('up');
            background-size: 100% 100%;
            background-position: center;
          }
          b {
            position: absolute;
            display: inline-block;
            top: 50%;
            margin-top: -0.05rem;
            right: 4%;
            width: 0.15rem;
            height: 0.1rem;
            @include bg-image('down');
            background-size: 100% 100%;
            background-position: center;
          }
        }
        .answer {
          padding: 0.16rem 4%;
          background-color: $color-background;
          dl {
            display: flex;
            font-size: $font-size-small-s;
            dt {
              display: inline-block;
              width: 0.24rem;
              color: $color-button;
            }
            dd {
              flex: 1;
              color: $color-text-s;
            }
          }
        }
      }
    }
  }
}
</style>
