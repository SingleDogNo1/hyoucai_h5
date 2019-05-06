<template>
  <div class="mine">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <div class="statistics">
          <div class="total-count">
            <p class="title">总资产(元)<span @click="showModel = true"></span></p>
            <p class="content">
              <span v-if="showAmount">{{ amountInfo.totalAmount }}</span
              ><span v-else>****</span>
            </p>
            <span class="icon-hidden" :class="{ show: !showAmount, hide: showAmount }" @click="showAmountFn"></span>
          </div>
          <div class="other-counts">
            <div>
              <p class="title">在投本金（元）</p>
              <p class="content">
                <span v-if="showAmount">{{ amountInfo.waitBackPrincipal }}</span
                ><span v-else>****</span>
              </p>
            </div>
            <div>
              <p class="title">累积收益（元）</p>
              <p class="content">
                <span v-if="showAmount">{{ amountInfo.totalIncome }}</span
                ><span v-else>****</span>
              </p>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="buttons">
            <div class="btn">
              <div class="btn-image" @click="$router.push({ name: 'DJSCouponList' })">
                <img src="./coupon.png" alt="" />
              </div>
              <p>券包</p>
            </div>
            <div class="btn" @click="$router.push({ name: 'DJSTransactionRecord' })">
              <div class="btn-image">
                <img src="./record.png" alt="" />
              </div>
              <p>交易记录</p>
            </div>
            <div class="btn" @click="$router.push({ name: 'DJSBankCard' })">
              <div class="btn-image">
                <img src="./bankcard.png" alt="" />
              </div>
              <p>银行卡</p>
            </div>
          </div>
          <div class="actions">
            <div class="amount">
              可用金额(元) <span v-if="showAmount">{{ amountInfo.banlance }}</span
              ><span v-else>****</span>
            </div>
            <div class="action">
              <input type="button" value="提现" />
              <input type="button" value="充值" @click="$router.push({ name: 'DJSCharge' })" />
            </div>
          </div>
          <div class="links">
            <div class="link" @click="$router.push({ name: 'DJSInviteFriends' })">
              <span>邀请好友</span>
              <span>大家有钱一起赚</span>
            </div>
            <div class="link" @click="$router.push({ name: 'DJSIRecommender' })">
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
          <span><img src="./close.png" alt="" @click="closeDownload" />如需要查看资产详情，请下载官方App</span>
          <input type="button" value="下载App" @click="$router.push({ name: 'AppDownload' })" />
        </div>
      </div>
    </b-scroll>
    <div class="model" v-if="showModel" @click="showModel = false">
      <div class="amount">
        <ul>
          <li>可用余额(元) <span v-if="showAmount">0.00</span><span v-else>****</span></li>
          <li>在投本金(元) <span v-if="showAmount">200000000.00</span><span v-else>****</span></li>
          <li>待收利息(元) <span v-if="showAmount">4.50</span><span v-else>****</span></li>
          <li>冻结金额(元) <span v-if="showAmount">0.00</span><span v-else>****</span></li>
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

    <!-- 复投弹窗 -->
    <Dialog class="auto-lend-dialog" :show.sync="repeatUnreadDialogOptions.show" :onConfirm="confirmRepeat" :onClose="closeRepeat">
      <mt-radio align="right" v-model="autoLendType" :options="autoLendTypeRadio"></mt-radio>
      <p class="agre">自动出借服务条款></p>
    </Dialog>

    <!-- 全局错误弹窗(resultCode !== '1') -->
    <Dialog :show="errDialogOptions.show">
      <div>{{ errDialogOptions.errMsg }}</div>
    </Dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'

import { mapMutations, mapGetters } from 'vuex'
import { Toast } from 'mint-ui'

import { amountInfo } from '@/api/djs/mine/mine'
import { getAlertInfoApi, getUserCompleteInfoApi, alertInfoAcceptApi } from '@/api/common/mine'
import { repeatInvestApi, UpdateMessageApi } from '@/api/djs/mine/mine'

export default {
  name: 'index',
  components: {
    BScroll,
    Dialog
  },
  mixins: [],
  data() {
    return {
      showModel: false,
      showAmount: true,
      showDownload: true,
      amountInfo: {},
      routerName: undefined,
      routerParams: {},
      userCompleteDialogOptions: {
        // 用户信息未完善弹窗
        show: false,
        msg: '',
        title: '汇有财温馨提示',
        confirmText: '确定'
      },
      repeatInvestUnreadMsgList: [],
      repeatCouponRate: null,
      userCompleteIsOver: false, // getAlertInfo type === evaluate 为true，标识用户信息已完善
      repeatUnreadDialogOptions: {
        // 复投弹窗
        show: false,
        msg: ''
      },
      autoLendTypeRadio: [
        {
          label: '本金到期后自动出借',
          value: '1'
        },
        {
          label: '本息到期后自动出借',
          value: '2'
        }
      ],
      autoLendType: '1', // 1:本金到期后自动出借  2:本息到期后自动出借
      errDialogOptions: {
        // 错误弹窗（resultCode !== '1'）
        show: false,
        msg: ''
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    showAmountFn() {
      this.showAmount = !this.showAmount
    },
    getAmountInfo() {
      amountInfo().then(res => {
        this.amountInfo = res.data
      })
    },
    switchSystem() {
      this.setPlatform('hyc')
      this.$router.push({ name: 'HYCUserCenter' })
    },
    closeDownload() {
      this.showDownload = false
      this.$refs.scrollRef.refresh()
    },
    confirmUserComplete() {
      if (this.userCompleteIsOver) {
        // 用户信息完善，点击确认关闭提示弹窗
        alertInfoAcceptApi({ type: 'evaluate' })
      } else {
        // 用户信息未完善，根据参数跳转到对应的页面完善信息
        if (this.routerName) {
          this.$router.push({
            name: this.routerName,
            params: this.routerParams
          })
        }
      }
    },
    getAlertInfo() {
      getAlertInfoApi().then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          console.log(data)
          if (data.haveAlert) {
            this.userCompleteDialogOptions.show = true
            switch (data.type) {
              case 'redPacket':
                this.userCompleteDialogOptions.title = '您收到' + data.count + '个红包'
                this.userCompleteDialogOptions.msg = data.count + '个红包已存入您的账户'
                this.userCompleteDialogOptions.confirmText = '查看我的红包'
                this.routerName = 'DJSCouponList'
                break
              case 'coupon':
                this.userCompleteDialogOptions.title = '您收到' + data.count + '个加息券'
                this.userCompleteDialogOptions.msg = data.count + '个加息券已存入您的账户'
                this.userCompleteDialogOptions.confirmText = '查看我的加息券'
                this.routerName = 'DJSCouponList'
                break
              case 'refund':
                // TODO 没有我的出借，这段逻辑跳转到哪去
                this.userCompleteDialogOptions.msg = `银行系统原因，您有${data.count}笔出借退款项未匹配成功，已退回`
                this.userCompleteDialogOptions.confirmText = '去查看'
                break
              case 'refundBeforeDueDate':
                this.userCompleteDialogOptions.title = '提前还款通知'
                this.userCompleteDialogOptions.msg = data.message
                this.userCompleteDialogOptions.confirmText = '我知道了'
                break
              case 'evaluate':
                // 用户信息已经完善，该标识设置为true
                this.userCompleteIsOver = true
                this.userCompleteDialogOptions.msg = data.message
                this.userCompleteDialogOptions.confirmText = '我知道了'
                break
              default:
                this.userCompleteDialogOptions.title = '汇有财温馨提示'
                this.userCompleteDialogOptions.msg = `您有${data.count}笔出借提前还款`
                this.userCompleteDialogOptions.confirmText = '我知道了'
            }
          }
        }
      })
    },
    getUserCompleteInfo() {
      getUserCompleteInfoApi().then(res => {
        const data = res.data.data
        if (res.data.resultCode === '1') {
          // 复投弹窗在点击取消时，向cookie保存一个一天后过期的值。再次进入个人中心时，读取这个值，如果能拿的到说明不是第一次登陆，不显示
          const key = `repeat-key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
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
              if (this.platform === 'djs' && !Cookie.get(key)) {
                // 点金石复投弹窗
                repeatInvestApi({
                  userName: this.user.userName
                }).then(res => {
                  const data = res.data
                  if (res.data.resultCode === '1') {
                    if (data.list.length > 0) {
                      this.repeatCouponRate = data.couponRate
                      this.repeatUnreadDialogOptions.show = true
                      this.repeatInvestUnreadMsgList = res.data.list
                    } else {
                      this.getAlertInfo()
                    }
                  } else {
                    Toast(res.data.resultMsg)
                  }
                  console.log()
                })
              } else {
                // 汇有财逻辑
                this.repeatUnreadDialogOptions.show = false
                this.repeatInvestUnreadMsgList = []
                this.getAlertInfo()
              }
          }
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    confirmRepeat() {
      this.repeatInvestUnreadMsgList.forEach(value => {
        UpdateMessageApi({
          invId: value.id,
          userName: this.user.userName,
          projectNo: value.projectNo,
          repeatStatus: this.autoLendType
        }).then(res => {
          if (res.data.resultCode !== '1') {
            this.errDialogOptions.show = true
            this.errDialogOptions.msg = res.data.resultMsg
          }
        })
      })
    },
    closeRepeat() {
      const key = `repeat-key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      Cookie.set(key, 'down', { expires: 1 })
    },
    ...mapMutations({
      setPlatform: 'SET_PLATFORM'
    })
  },
  computed: {
    ...mapGetters(['user', 'platform'])
  },
  created() {
    this.getAmountInfo()
    this.getUserCompleteInfo()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (['DJSInvestDetail', 'HYCInvestDetail'].includes(from.name)) {
        vm.beforeRouterPath = from.fullPath
      }
    })
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
          border: 0.01rem solid #999;
          border-radius: 0.04rem;
          margin-left: 0.1rem;
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
  .auto-lend-dialog {
    /deep/ .mint-cell-wrapper {
      background-image: none;
    }
    /deep/ .mint-cell {
      background-image: none;
      min-height: 0.5rem;
    }
    .agre {
      font-size: 0.13rem;
      color: #666;
      text-align: center;
    }
  }
}
</style>
