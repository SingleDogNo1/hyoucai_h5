<template>
  <div class="transfer-charge" ref="container">
    <b-scroll class="scroll" ref="scrollRef">
        <div class="wrapper">
          <dl class="top">
            <dt></dt>
            <dd>您可以使用您注册汇有财时绑定的银行卡，通过线下跨行转账（柜台、网银、手机银行APP）方式将资金充值到江西银行存管账户。</dd>
          </dl>
          <div class="items">
            <dl>
              <dt>收款方户名:</dt>
              <dd>江西汇通金融信息服务有限公司</dd>
            </dl>
            <dl>
              <dt>收款方账号:</dt>
              <dd>791913314800301 <span class="copy_num" :data-clipboard-text="791913314800301">复制</span></dd>
            </dl>
            <dl>
              <dt>收款银行:</dt>
              <dd>江西银行</dd>
            </dl>
            <dl>
              <dt>收款方开户行:</dt>
              <dd>江西银行股份有限公司南昌铁路支行营业部</dd>
            </dl>
          </div>
          <h6 @click="showInfo">线下充值流程更改说明，点击查看>></h6>
          <p>温馨提示：以上账户为汇有财平台在江西银行的存管账户，平台将根据您的转账金额自动发放至您的电子账户，资金安全由第三方江西银行全权保障。</p>
          <p>充值过程中收取的转账费用，以银行规定为准，汇有财不收取任何手续费用。</p>
          <p>如资金未到账，请联系汇有财客服：<a href="javascript:;">{{serviceTel}}</a></p>
        </div>
    </b-scroll>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import { serviceTelApi } from '@/api/hyc/help'

export default {
  components: {
    BScroll
  },
  data() {
    return {
      serviceTel: '400-099-7979'
    }
  },
  watch: {
    selected() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  methods: {
    showInfo() {
      this.$router.push({
        name: 'HYCNoticeDetail',
        params: { id: 2156 }
      })
    },
    getServiceTel() {
      serviceTelApi({ type: '1' }).then(res => {
        let resultCode = res.data.resultCode
        let resultMsg = res.data.resultMsg
        if (resultCode === '1') {
          this.serviceTel = res.data.data
        } else {
          Toast(resultMsg)
        }
      })
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    let clipboard = new Clipboard('.copy_num')
    clipboard.on('success', function() {
      Toast('复制成功')
    })
    this.getServiceTel()
    this.$nextTick(() => {
      this.refresh()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

.transfer-charge {
  height: 100%;
  padding-top: 0.24rem;
}

.scroll {
  height: 100%;
  overflow: hidden;
  .wrapper {
    padding: 0 4% 0.16rem;
    background-color: #fff;
    .top {
      display: flex;
      dt {
        width: 0.82rem;
        height: 0.51rem;
        margin-right: 0.08rem;
        background-size: 100% 100%;
        @include bg-image('un');
      }
      dd {
        flex: 1;
        font-size: $font-size-small-s;
        color: $color-text;
      }
    }
    .items {
      padding: 0.24rem 0 0;
      dl {
        margin-bottom: 0.16rem;
        overflow: hidden;
        font-size: 0;
        &:last-child {
          margin-bottom: 0;
        }
        dt,
        dd {
          display: inline-block;
          font-size: $font-size-small-s;
        }
        dt {
          margin-right: 0.08rem;
          color: $color-text-s;
        }
        dd {
          color: $color-text;
          .copy_num {
            display: inline-block;
            padding: 0.02rem 0.06rem 0.02rem 0.05rem;
            margin-left: 0.2rem;
            background-color: #fab645;
            color: #fff;
            border-radius: 3px;
            font-size: $font-size-small-ss;
          }
        }
      }
    }
    h6 {
      font-size: $font-size-small-s;
      margin: 0.1rem 0;
      text-align: center;
      color: $color-button;
    }
    > p {
      font-size: $font-size-small-s;
      color: $color-text-s;
      a {
        color: $color-button;
      }
    }
  }
}
</style>
