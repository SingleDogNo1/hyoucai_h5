<template>
  <div class="wrapper">
    <div class="top">
      <div class="inn">
        <dl>
          <dt>
            <div class="logo-wrapper">
              <img :src="bankCardInfo.iconUrl" alt="" />
            </div>
            <div class="bank-name">
              {{ bankCardInfo.bankName }}
            </div>
          </dt>
          <dd>
            {{ bankCardInfo.showCardNo }}
          </dd>
        </dl>
      </div>
    </div>
    <dl class="download-wrapper">
      <dt>如需变更银行卡请下载官方App</dt>
      <dd><router-link :to="{ name: '' }">下载App</router-link></dd>
    </dl>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { getUserBankCardInfo } from '@/api/hyc/mine/bankCard'
import { plusStar } from '@/assets/js/utils'
const ERR_OK = '1'
export default {
  components: {},
  data() {
    return {
      bankCardInfo: {
        bankName: '',
        cardNo: '',
        showCardNo: ''
      }
    }
  },
  methods: {
    getBankCard() {
      getUserBankCardInfo().then(res => {
        if (res.data.resultCode === ERR_OK) {
          if (res.data.data) {
            this.bankCardInfo = res.data.data
            let cardNo = this.bankCardInfo.cardNo
            let remainder = cardNo.length % 4
            remainder = remainder === 0 ? 4 : remainder
            this.bankCardInfo.showCardNo = plusStar(cardNo, 0, cardNo.length - remainder).replace(/....(?!$)/g, '$& ')
          }
        } else {
          Toast(res.data.resultMsg)
        }
      })
    }
  },
  created() {
    this.getBankCard()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';
.wrapper {
  background-color: #f9f9f9;
  .top {
    padding: 0.1rem 0.15rem;
    .inn {
      box-sizing: border-box;
      height: 1.2rem;
      padding: 0.16rem 0 0 0.14rem;
      background-color: #d62629;
      border-radius: 0.08rem;
      dl {
        dt {
          display: flex;
          color: #fff;
          .logo-wrapper {
            width: 0.28rem;
            height: 0.28rem;
            margin-right: 0.08rem;
            background-color: #fff;
            border-radius: 50%;
            padding: 0.02rem;
            img {
              width: 0.24rem;
              height: 0.24rem;
            }
          }
          .bank-name {
            flex: 1;
            line-height: 0.28rem;
            font-size: $font-size-medium;
          }
        }
        dd {
          margin-top: 0.23rem;
          margin-left: 0.32rem;
          font-size: 0.22rem;
          color: #fff;
        }
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
}
</style>
