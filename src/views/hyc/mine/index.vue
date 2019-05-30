<template>
  <div class="mine">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <div class="statistics">
          <div class="total-count">
            <p class="title">总资产(元)<span @click="showModel = true"></span></p>
            <p class="content">
              <span v-if="showAmount">{{ amountInfo.totalAmount }}</span>
              <span v-else>****</span>
            </p>
            <span class="icon-hidden" :class="{ show: showAmount, hide: !showAmount }" @click="showAmountFn"></span>
          </div>
          <div class="other-counts">
            <div>
              <p class="title">在投本金（元）</p>
              <p class="content">
                <span v-if="showAmount">{{ amountInfo.totalInvAmount }}</span>
                <span v-else>****</span>
              </p>
            </div>
            <div>
              <p class="title">累积收益（元）</p>
              <p class="content">
                <span v-if="showAmount">{{ amountInfo.totalIncome }}</span>
                <span v-else>****</span>
              </p>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="buttons">
            <div class="btn">
              <div class="btn-image" @click="$router.push({ name: 'HYCCouponList' })">
                <img src="./coupon.png" alt="" />
              </div>
              <p>券包</p>
            </div>
            <div class="btn" @click="$router.push({ name: 'HYCTransactionRecord' })">
              <div class="btn-image">
                <img src="./record.png" alt="" />
              </div>
              <p>交易记录</p>
            </div>
            <div class="btn" @click="$router.push({ name: 'HYCBankCard' })">
              <div class="btn-image">
                <img src="./bankcard.png" alt="" />
              </div>
              <p>银行卡</p>
            </div>
          </div>
          <div class="actions">
            <div class="amount">
              可用金额(元) <span v-if="showAmount">{{ amountInfo.banlance }}</span>
              <span v-else>****</span>
            </div>
            <div class="action">
              <input type="button" value="提现" @click="$router.push({ name: 'HYCToCash' })" />
              <input type="button" value="充值" @click="$router.push({ name: 'HYCCharge' })" />
            </div>
          </div>
          <div class="links">
            <div class="link" @click="$router.push({ name: 'HYCInviteFriends' })">
              <span>邀请好友</span>
              <span>大家有钱一起赚</span>
            </div>
            <div class="link" @click="$router.push({ name: 'HYCRecommender' })">
              <span>我的推荐人</span>
              <span></span>
            </div>
            <div class="link" @click="switchSystem" v-if="user.platformFlag === '3'">
              <span>系统切换</span>
              <span></span>
            </div>
            <div class="link" @click="$router.push({ name: 'Setting' })">
              <span>设置</span>
              <span></span>
            </div>
          </div>
          <div class="customer-service">
            <span class="phone">客服热线 400-099-7979</span>
            <span class="service-time">工作日：上午 9:00-12:00 下午13:00-18:00</span>
          </div>
        </div>
        <div class="download" v-if="showDownload">
          <span><img src="./close.png" alt="" @click="closeDownLoad" />如需要查看资产详情，请下载官方App</span>
          <input type="button" value="下载App" @click="$router.push({ name: 'AppDownload' })" />
        </div>
      </div>
    </b-scroll>
    <div class="model" v-if="showModel" @click="showModel = false">
      <div class="amount">
        <ul>
          <li>
            <span>可用余额(元) </span>
            <span v-if="showAmount">{{amountInfo.banlance}}</span>
            <span v-else>****</span>
          </li>
          <li>
            <span>在投本金(元) </span>
            <span v-if="showAmount">{{amountInfo.waitBackPrincipal}}</span>
            <span v-else>****</span>
          </li>
          <li>
            <span>待收利息(元) </span>
            <span v-if="showAmount">{{amountInfo.waitBackInterest}}</span>
            <span v-else>****</span>
          </li>
          <li>
            <span>冻结金额(元) </span>
            <span v-if="showAmount">{{amountInfo.freezeAmount}}</span>
            <span v-else>****</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 用户信息未完善弹窗 -->
    <Dialog
      :show.sync="userCompleteDialogOptions.show"
      :confirmText="userCompleteDialogOptions.confirmText"
      :title="userCompleteDialogOptions.title"
      :onConfirm="confirmUserComplete"
    >
      <div>{{ userCompleteDialogOptions.msg }}</div>
    </Dialog>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'

import { amountInfo } from '@/api/hyc/mine/mine'
import { mapMutations, mapGetters } from 'vuex'
import { getAlertInfoApi, getUserCompleteInfoApi, alertInfoAcceptApi } from '@/api/common/mine'

export default {
  name: 'index',
  components: {
    BScroll,
    Dialog
  },
  data() {
    return {
      showModel: false,
      showAmount: true,
      showDownload: true,
      amountInfo: {},
      routerName: undefined,
      routerParams: {},
      userStatus: null,
      userCompleteDialogOptions: {
        // 用户信息未完善弹窗
        show: false,
        msg: '',
        title: '汇有财温馨提示',
        confirmText: '确定'
      }
    }
  },
  methods: {
    showAmountFn() {
      this.showAmount = !this.showAmount
    },
    getAmountInfo() {
      amountInfo().then(res => {
        this.amountInfo = res.data.data
      })
    },
    switchSystem() {
      this.setPlatform('djs')
      this.$router.push({ name: 'DJSUserCenter' })
    },
    closeDownLoad() {
      this.showDownload = false
      this.$refs.scrollRef.refresh()
    },
    confirmUserComplete() {
      if (this.userCompleteIsOver) {
        // 用户信息完善，点击确认关闭提示弹窗
        alertInfoAcceptApi({ type: 'evaluate' })
      } else {
        // 用户信息未完善，根据参数跳转到对应的页面完善信息
        alertInfoAcceptApi({ type: this.userStatus }).then(res => {
          if (res.data.resultCode === '1') {
            if (this.routerName) {
              this.$router.push({
                name: this.routerName,
                params: this.routerParams
              })
            }
          }
        })
      }
    },
    getUserCompleteInfo() {
      getUserCompleteInfoApi().then(res => {
        const data = res.data.data
        if (res.data.resultCode === '1') {
          this.userCompleteDialogOptions.msg = data.message
          switch (data.status) {
            case 'OPEN_ACCOUNT':
              this.userCompleteDialogOptions.confirmText = '开通存管账户'
              this.userCompleteDialogOptions.show = true
              this.routerName = 'openAccount'
              break
            case 'SET_PASSWORD':
              this.userCompleteDialogOptions.confirmText = '设置交易密码'
              this.userCompleteDialogOptions.show = true
              this.routerName = 'openAccount'
              break
            case 'SIGN_PROTOCOL':
              this.userCompleteDialogOptions.confirmText = '签约'
              this.userCompleteDialogOptions.show = true
              this.routerName = 'signAgreement'
              break
            case 'EVALUATE':
              this.userCompleteDialogOptions.confirmText = '风险评测'
              this.userCompleteDialogOptions.show = true
              this.routerName = 'riskTest'
              break
            default:
              this.getAlertInfo()
          }
        }
      })
    },
    getAlertInfo() {
      getAlertInfoApi().then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          if (data.haveAlert) {
            this.userCompleteDialogOptions.show = true
            switch (data.type) {
              case 'redPacket':
                this.userCompleteDialogOptions.title = '您收到' + data.count + '个红包'
                this.userCompleteDialogOptions.msg = data.count + '个红包已存入您的账户'
                this.userCompleteDialogOptions.confirmText = '查看我的红包'
                this.userStatus = 'redPacket'
                this.routerName = 'HYCCouponList'
                break
              case 'coupon':
                this.userCompleteDialogOptions.title = '您收到' + data.count + '个加息券'
                this.userCompleteDialogOptions.msg = data.count + '个加息券已存入您的账户'
                this.userCompleteDialogOptions.confirmText = '查看我的加息券'
                this.userStatus = 'coupon'
                this.routerName = 'HYCCouponList'
                break
              case 'redCoupon':
                this.userCompleteDialogOptions.msg = '您当前有未使用红包/加息券！'
                this.userCompleteDialogOptions.confirmText = '立即查看'
                this.userStatus = 'redCoupon'
                this.routerName = 'HYCCouponList'
                break
              case 'refund':
                this.userCompleteDialogOptions.msg = `银行系统原因，您有${data.count}笔出借退款项未匹配成功，已退回`
                this.userCompleteDialogOptions.confirmText = '去查看'
                this.userStatus = 'refund'

                // TODO 没有我的出借，这段逻辑跳转到哪去
                // this.routerName = 'HYCCouponList'
                break
              case 'refundBeforeDueDate':
                this.userCompleteDialogOptions.title = '提前还款通知'
                this.userCompleteDialogOptions.msg = data.message
                this.userCompleteDialogOptions.confirmText = '我知道了'
                this.userStatus = 'refundBeforeDueDate'
                break
              case 'evaluate':
                // 用户信息已经完善，该标识设置为true
                this.userCompleteIsOver = true
                this.userCompleteDialogOptions.msg = data.message
                this.userCompleteDialogOptions.confirmText = '我知道了'
                this.userStatus = 'evaluate'
                break
            }
          }
        }
      })
    },
    ...mapMutations({
      setPlatform: 'SET_PLATFORM'
    })
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getAmountInfo()
    this.getUserCompleteInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins.scss';
.mine {
  height: 100%;
  .scroll {
    height: 100%;
    overflow: hidden;
    .statistics {
      background: #ec5e52;
      padding: 0.15rem;
      height: 1.68rem;
      color: #fff;

      .total-count {
        position: relative;
        .title {
          font-size: 0.13rem;
          line-height: 0.18rem;
          span {
            margin-left: 0.1rem;
            vertical-align: middle;
            display: inline-block;
            width: 0.12rem;
            height: 0.12rem;
            background-image: url(./question.png);
            background-size: 100% 100%;
          }
        }
        .content {
          font-size: 0.36rem;
          line-height: 0.5rem;
        }
        .icon-hidden {
          position: absolute;
          top: 0;
          right: 0.07rem;
          width: 0.19rem;
          height: 0.13rem;
          &.hide {
            background: url(./hide.png);
            background-size: 100% 100%;
          }
          &.show {
            background: url(./show.png);
            background-size: 100% 100%;
          }
        }
      }
      .other-counts {
        margin-top: 0.09rem;
        display: flex;
        & > div {
          flex: 1;
        }
        .title {
          font-size: 0.12rem;
        }
        .content {
          font-size: 0.16rem;
          margin-top: 0.08rem;
        }
      }
    }
    .main {
      background: #f9f9f9;
      .buttons {
        position: relative;
        top: -0.1rem;
        background: #fff;
        border-radius: 0.04rem;
        width: 3.45rem;
        height: 0.9rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .btn {
          .btn-image {
            height: 0.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          img {
            width: 0.26rem;
            height: 0.19rem;
          }
          p {
            margin-top: 0.12rem;
            font-size: 0.13rem;
            line-height: 0.18rem;
          }
          &:nth-child(2) img {
            width: 0.2rem;
            height: 0.24rem;
          }
        }
      }
      .actions {
        background: #fff;
        padding: 0 0.15rem;
        line-height: 0.52rem;
        display: flex;
        justify-content: space-between;
        color: #999;
        .amount {
          font-size: 0.13rem;
          span {
            font-size: 0.16rem;
            color: #ec5e52;
            vertical-align: middle;
            margin-left: 0.08rem;
          }
        }
        input[type='button'] {
          width: 0.58rem;
          height: 0.28rem;
          margin-left: 0.1rem;
          border: 0.01rem solid #999;
          border-radius: 0.04rem;
          color: #999;
          &:nth-of-type(2) {
            color: #ec5e52;
            border-color: #ec5e52;
          }
        }
      }
      .links {
        margin-top: 0.1rem;
        background: #fff;
        padding: 0 0 0 0.15rem;
        .link {
          height: 0.5rem;
          line-height: 0.5rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.01rem solid #e8e8e8;
          padding-right: 0.15rem;
          span:first-child {
            font-size: 0.15rem;
          }
          span:last-child {
            font-size: 0.13rem;
            color: #999;
            &:after {
              content: '';
              display: inline-block;
              background: url(./more.png);
              width: 0.057rem;
              height: 0.114rem;
              background-size: 100% 100%;
              vertical-align: middle;
              margin-left: 0.08rem;
            }
          }
        }
      }
      .customer-service {
        background: #fff;
        text-align: center;
        display: flex;
        font-size: 0.11rem;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 0.89rem;
        .phone {
          width: 1.82rem;
          height: 0.28rem;
          color: #999999;
          line-height: 0.28rem;
          border: 0.01rem solid #ccc;
          border-radius: 0.14rem;
          margin-top: 0.2rem;
          &:before {
            content: '';
            display: inline-block;
            width: 0.15rem;
            height: 0.15rem;
            background: url(./customer_service.png);
            background-size: 100% 100%;
            margin-right: 0.08rem;
            vertical-align: middle;
          }
        }
        .service-time {
          color: #ccc;
          margin-bottom: 0.18rem;
        }
      }
    }
    .download {
      display: flex;
      align-items: center;
      height: 0.52rem;
      padding: 0 0.15rem;
      justify-content: space-between;
      img {
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0.08rem;
      }
      span {
        font-size: 0.13rem;
        color: #999999;
      }
      input {
        background: #ec5e52;
        border-radius: 4px;
        color: #fff;
        width: 0.72rem;
        height: 0.3rem;
      }
    }
  }
  .model {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    .amount {
      position: relative;
      top: 0.43rem;
      left: 0.54rem;
      display: inline-block;
      background: #fff;
      border-radius: 0.04rem;
      font-size: 0.11rem;
      line-height: 0.16rem;
      color: #333333;
      padding: 0.06rem 0.09rem 0.07rem 0.09rem;
      &:before {
        content: '';
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid #fff;
        top: -0.08rem;
        left: 0.32rem;
        position: absolute;
      }
      li {
        margin-bottom: 0.02rem;
      }
    }
  }
}
</style>
