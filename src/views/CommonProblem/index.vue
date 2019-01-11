<template>
  <div class="pageContainer" ref="container">
    <div class="wrapper">
      <b-scroll class="scroll" ref="scrollRef">
        <div>
          <div class="item" v-for="(item, index) in commonQuestions" :key="index">
            <div class="inn border-bottom-1px">
              <div class="question" @click="toggleItems(commonQuestions, index)">
                <em>{{ item.question }}</em>
                <transition name="rotate-min">
                  <i v-if="item.flag_min"></i>
                </transition>
                <transition name="rotate-plus">
                  <b v-if="item.flag_plus"></b>
                </transition>
              </div>
              <div class="answer" v-if="item.flag_min">
                <dl><dd v-html="item.answer"></dd></dl>
              </div>
            </div>
          </div>
        </div>
      </b-scroll>
    </div>
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
          question: '1、可以直接使用银行卡投资吗？',
          flag_min: true,
          flag_plus: false,
          answer: '<span>目前汇通金融旗下网贷平台汇友财投资服务需要使用可用余额进行交易，您需要先把银行卡资金充值到可用余额，才可以进行投资。</span>'
        },
        {
          question: '2、充值资金在账户余额有收益吗？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>资金在账户余额是不计算收益的。</span>'
        },
        {
          question: '3、平台的投资收益是如何计算的？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>投资收益是根据历史平均收益率计算的，计算公式为：总利息=您投资的金额*历史平均收益率/360*投资期限。</span>'
        },
        {
          question: '4、投标后可以撤回吗？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>投标后不允许撤回，投标成功后，您投资的资金将会转入匹配的借款人账户。</span>'
        },
        {
          question: '5、可用余额转出到银行卡收费吗？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>可用余额转出到银行卡不收取您任何费用。</span>'
        },
        {
          question: '6、投资回款是回到银行卡吗？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>不是，项目到期后系统自动将回款注入到账户余额，可至“我的账户-可用余额”，操作转出至银行卡或继续投资。</span>'
        },
        {
          question: '7、如何退出半月嗨\\月月盈\\吉季盈\\禄陆丰？',
          flag_min: false,
          flag_plus: true,
          answer:
            '<span>半月嗨月月盈吉季盈禄陆丰暂不支持中途提前退出，投资期限到期后本金及最后一期利息会自动打入汇友财账户余额，您可以选择提现到银行卡或继续投资。</span>'
        },
        {
          question: '8、出借金额是否有限制？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>半月嗨最低2000元起投，最高50000元；月月盈、吉季盈、禄陆丰及其他活动标起投金额100元，最高不可超过标的开放额度。</span>'
        },
        {
          question: '9、出借完成后什么时候开始计息？',
          flag_min: false,
          flag_plus: true,
          answer: '<span>从出借成功后次日开始计息。</span>'
        },
        {
          question: '10、提现需要多久可以到账？',
          flag_min: false,
          flag_plus: true,
          answer:
            '<span style="color:#C75000">工作日15:00之前提现，当日到账；15:00以后提现，次日到账。</span><span>依据发卡行不同可能略有差异。周末的提现请求顺延至工作日进行处理。</span>'
        },
        {
          question: '11、提现时收不到验证码，怎么办？',
          flag_min: false,
          flag_plus: true,
          answer:
            '<span>（1）请检查您的手机号码是否输入正确；</span><br><span>（2）请检查您的手机拦截功能是否被开启；</span><br><span>（3）请检查是否设置拒收本平台信息；</span><br><span>（4）若以上三种情况都无误，请重新获取验证码并联系客服：400-099-7979。</span>'
        }
      ]
    }
  },
  methods: {
    toggleItems(arr, index) {
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
@import '../../assets/css/theme.scss';
@import '../../assets/css/mixins.scss';
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
.pageContainer {
  background-color: $color-background;
  height: 100%;
  .wrapper {
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    .scroll {
      height: 100%;
      overflow: hidden;
      background: $color-background;
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
            height: 0.5rem;
            line-height: 0.5rem;
            padding: 0 4%;
            font-size: $font-size-small-s;
            span {
              display: inline-block;
              width: 0.24rem;
              color: $color-button;
            }
            em {
              flex: 1;
              color: $color-text;
            }
            i {
              position: absolute;
              display: inline-block;
              top: 40%;
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
              top: 40%;
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
}
</style>
