<template>
  <div class="s1">
    <b-scroll>
      <p class="tips">完成以下操作，就可以进行出借啦！</p>
      <div class="agreements">
        <div class="agreement" v-for="(agree, index) in agreements" :key="index">
          <div class="title">{{ agree.description1 }}</div>
          <div class="name">
            <a v-if="agree.signStatus" href="javascript:void(0);" @click="showAgre(agree)">{{ agree.name }}</a>
            <a v-else href="javascript:void(0);" @click="toAgreement(agree.showUrl)">{{ agree.name }}</a>
          </div>
          <div class="remark">{{ agree.description2 }}</div>
          <div class="btn">
            <input type="button" value="已授权" v-if="!agree.buttonEnable" />
            <input type="button" value="授权" @click="sign(agree.signUrl)" class="unsigned" v-else />
          </div>
        </div>
      </div>
    </b-scroll>
    <Dialog :show.sync="isSignOver" title="开户成功" :onConfirm="confirmSignOver">
      <div>您已完成开户签约，快去出借啦</div>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'

import { getRetBaseURL, JumpJX, getQueryParameter } from '@/assets/js/utils'

import { queryKHAgreementList, getProtocolPdf } from '@/api/common/user'

export default {
  name: 'sign',
  components: {
    BScroll,
    Dialog
  },
  data() {
    return {
      isSignOver: false,
      status: this.$route.query.status ? this.$route.query.status : null, // 自动债转为1 自动投标为0 默认为空
      agreements: []
    }
  },
  computed: {
    ...mapGetters(['user', 'platform'])
  },
  methods: {
    sign(url) {
      debugger
      let params = {
        retUrl: `${getRetBaseURL()}/open-account/sign`,
        forgotPwdUrl: `${getRetBaseURL()}/${this.platform === 'djs' ? 'd' : 'h'}/mine`
      }

      switch (this.status) {
        case '1':
          params.autoCredit = 1
          break
        case '0':
          params.autoBid = 1
          break
      }

      JumpJX(url, params)
    },
    showAgre(agre) {
      getProtocolPdf({
        loginUsername: this.user.userName,
        protocolType: agre.protocolType
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          window.location.href = data.protocolPdfPath
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    toAgreement(url) {
      const agreementType = getQueryParameter(url, 'agreementType')
      this.$router.push({
        name: 'HYCAgreement',
        query: { agreementType }
      })
    },
    confirmSignOver() {
      if (this.platform === 'djs') {
        this.$router.push({
          name: 'DJSInvestment'
        })
      } else {
        this.$router.push({
          name: 'HYCInvestment'
        })
      }
    }
  },
  created() {
    queryKHAgreementList().then(res => {
      const data = res.data.data
      this.agreements = data.result[0].list
      let signStatus = true
      this.agreements.forEach(value => {
        if (!value.signStatus) {
          signStatus = false
        }
      })
      if (signStatus && this.comeFrom !== 'lend') {
        // 如果不是从投资三级页来的，弹出来这个弹窗引导投资（投资三级页会跳转到这一页来重新签约，这个情况下不能弹出窗口）
        this.isSignOver = !this.status
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 从投资三级页来的
      if (from.name.toLowerCase().includes('easylend') || from.name.toLowerCase().includes('optionallend')) {
        vm.comeFrom = 'lend'
      }
    })
  }
}
</script>
<style scoped lang="scss">
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.s1 {
  text-align: center;
  font-size: $font-size-small;
  .tips {
    margin: 0.16rem;
    text-align: center;
    color: #999;
    font-size: 0.15rem;
  }
  .mobile {
    padding-left: 0.15rem;
    text-align: left;
  }
  .sms-wrapper {
    width: 100%;
    height: 0.32rem;
    padding: 0 0.15rem;
    margin: 0.14rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sms-box {
      min-height: 0;
      height: 100%;
      padding: 0 0.15rem;
      flex: 1;
    }
    .sms-btn {
      margin-left: 0.15rem;
    }
  }
  .agreements {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 0.15rem;
    .agreement {
      margin-bottom: 0.08rem;
      width: 1.9rem;
      height: 2.4rem;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 0.04rem;
      position: relative;
      background: linear-gradient(225deg, transparent 0.18 * 1.5rem, #fff 0);
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0.36rem;
        height: 0.36rem;
        background: linear-gradient(225deg, transparent 50%, #fff 0);
        transform-origin: bottom right;
        border-bottom-left-radius: inherit;
        box-shadow: -0.2em 0.2em 0.3em -0.1em rgba(0, 0, 0, 0.1);
      }
      .title {
        margin-top: 0.24rem;
        padding: 0 0.15rem;
        @include no-wrap();
      }
      .name {
        margin-top: 0.08rem;
        a {
          color: $color-button;
        }
      }
      .remark {
        font-size: $font-size-small-s;
        margin-top: 0.32rem;
        display: inline-block;
        width: 1.22rem;
        color: $color-text-s;
      }
      .btn {
        margin-top: 0.32rem;
        input {
          width: 0.75rem;
          height: 0.32rem;
          border-radius: 1rem;
          background: $color-background;
          color: $color-text-s;
          &.unsigned {
            background: $color-button;
            color: #ffffff;
          }
        }
      }
    }
  }
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    .dialog {
      width: 2.82rem;
      height: 2.59rem;
      background-image: url('./dialog.png');
      background-size: 2.82rem;
      position: absolute;
      left: calc(50% - 1.41rem);
      top: calc(50% - 1.23rem);
      .top {
        height: 0.86rem;
      }
      .down {
        padding: 0.15rem;
        .title {
          margin-top: 0.09rem;
          font-size: $font-size-medium;
        }
        .content {
          margin-top: 0.16rem;
          font-size: $font-size-small-s;
          color: $color-text-s;
        }
        .btn {
          margin-top: 0.32rem;
          background: $color-button;
          width: 100%;
          font-size: $font-size-small;
          border-radius: 0.04rem;
          height: 0.44rem;
          line-height: 0.44rem;
          text-align: center;
          input {
            color: #fff;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
