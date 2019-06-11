<template>
  <div class="lend-wrapper">
    <BScroll class="lend">
      <section>
        <div class="huge">
          <ul>
            <li>
              <span>{{ projectInfo.basicsInvestRate }}</span>
              <span class="pre">%</span>
              <label v-if="projectInfo.activityInvestRate && parseFloat(projectInfo.activityInvestRate) !== 0">+</label>
              <em class="act" v-if="projectInfo.activityInvestRate && parseFloat(projectInfo.activityInvestRate) !== 0">{{
                projectInfo.activityInvestRate
              }}</em>
              <span class="pre" v-if="projectInfo.activityInvestRate && parseFloat(projectInfo.activityInvestRate) !== 0">%</span>
            </li>
            <li>
              <h5>{{ projectInfo.itemName }}</h5>
              <h6>锁定期{{ projectInfo.loanMentNumber }}天</h6>
            </li>
          </ul>
          <p>
            <span>剩余可投</span>
            <span v-if="projectInfo.surplusAmt / 10000 > 1">{{ (projectInfo.showSurplusAmt / 10000).toFixed(2) }}万</span>
            <span v-else>{{ projectInfo.surplusAmt }}元</span>
          </p>
        </div>
        <div class="amount-block">
          <h6>投标金额</h6>
          <section>
            <div>¥</div>
            <input type="number" :placeholder="projectInfo.minInvAmount + '元起投，单笔限额' + projectInfo.maxInvAmount + '元'" v-model="amount" />
          </section>
          <p class="err-msg">{{ errMsg }}</p>
          <div class="ctrl">
            <div>
              <p>
                <span class="key"><i class="iconfont icon-ti-shi"></i>可用余额</span>
                <span class="value">{{ amountInfo.banlance }}元</span>
              </p>
              <p>
                <span class="key">预估收益：</span>
                <span class="value">{{ expectedIncome }}</span>
              </p>
            </div>
            <button :class="{ active: lendAllFlag }" @click="lendAll">全部投标</button>
          </div>
        </div>
        <ul class="coupon">
          <li @click="chooseCoupon">
            <span>加息券</span>
            <div>
              <p v-if="!checkedCoupon">{{ couponNum }}张</p>
              <label v-else>{{ checkedCoupon.validDays }}天{{ checkedCoupon.couponRate }}%加息券</label>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
          <li @click="chooseRedPacket">
            <span>红包</span>
            <div>
              <p v-if="!checkedRedPacket">{{ redPacketNum }}张</p>
              <label v-else>{{ checkedRedPacket.redPacketAmount }}元红包</label>
              <i class="iconfont icon-rightpage"></i>
            </div>
          </li>
        </ul>
        <div class="agree">
          <div v-for="(agreement, index) in protocolData" :key="index">
            <input type="checkbox" id="isCheck" :checked="agree" :class="{ active: agree }" v-if="agreement.isChecked" />
            <label for="isCheck" @click="changeStatus" v-if="agreement.isChecked"></label>
            <span v-for="(item, index2) in agreement.list" :key="index2">
              <span>
                <span>{{ item.description1 }}</span>
                <span @click="showAgre(item.showUrl)" class="agreement">{{ item.name }}</span>
                <span>{{ item.description2 }}</span>
              </span>
            </span>
          </div>
        </div>
        <p class="state">本人已清楚了解投标规则及项目风险，并谨此授权依据该投标规则进行投标。</p>
      </section>
    </BScroll>

    <div class="invest-btn">
      <section :class="{ active: canILend && agree }" @click="invest">
        <h6>{{ lendBtnMsg }}</h6>
        <p v-if="parseFloat(projectInfo.minInvAmount) > parseFloat(amountInfo.banlance)">
          还需余额{{ parseFloat(projectInfo.minInvAmount) - parseFloat(amountInfo.banlance) }}
        </p>
      </section>
    </div>

    <!-- 未签约弹窗 && 未进行风险测评 -->
    <Dialog class="sign-dialog" :show.sync="signAndRiskDialogOptions.show" :confirmText="signAndRiskDialogOptions.confirmText" :onConfirm="toSign">
      <div>
        <p>{{ signAndRiskDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 出借手机乐成功弹窗 -->
    <Dialog
      class="sjl-dialog"
      :show.sync="lendSJLSuccessDialogOptions.show"
      :confirmText="lendSJLSuccessDialogOptions.confirmText"
      :title="lendSJLSuccessDialogOptions.title"
      :onConfirm="toAddress"
    >
      <div>
        <p>{{ lendSJLSuccessDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 出借普通产品成功弹窗 -->
    <Dialog
      class="sjl-dialog"
      :show.sync="investDialogOptions.show"
      :title="investDialogOptions.title"
      :confirmText="investDialogOptions.confirmText"
      :onConfirm="toInvestList"
    >
      <div>
        <p>{{ investDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 风险测评有问题弹窗 -->
    <Dialog
      class="risk-test-dialog"
      :show.sync="riskTestDialogOptions.show"
      :title="riskTestDialogOptions.title"
      :confirmText="riskTestDialogOptions.confirmText"
      :onConfirm="confirmRiskText"
    >
      <div>
        <h6>{{ riskTestDialogOptions.title }}</h6>
        <p>{{ riskTestDialogOptions.msg }}</p>
      </div>
    </Dialog>

    <!-- 充值弹窗 -->
    <Confirm :show.sync="chargeDialogOption.show" :confirmText="chargeDialogOption.confirmText" :onConfirm="confirmCharge">
      <p>账户余额不足，请充值！</p>
    </Confirm>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'
import Confirm from '@/components/Dialog/Confirm'

import { Toast, Indicator } from 'mint-ui'
import { getRetBaseURL, JumpJX } from '@/assets/js/utils'

import { getProtocaol } from '@/api/hyc/invite'
import {
  getInvestDetail, // 优质计划-投资详情
  getPersonalAccount, // 获取账户信息
  expectedIncome, // 计算预期收益
  couponPackageApi, // 查询可用红包加息券
  investApi, // 投资接口
  systemMaintenance // 查询系统是否维护
} from '@/api/hyc/investDetail'
// 查询用户信息完善接口
import { userInfoCompleteNoticeApi } from '@/api/common/user'
import debounce from '@/assets/js/debounce'

import { mapGetters, mapState, mapMutations } from 'vuex'
import Cookie from 'js-cookie'
import { getQueryParameter } from '@/assets/js/utils'

export default {
  name: 'invest',
  components: {
    BScroll,
    Dialog,
    Confirm
  },
  data() {
    return {
      productId: this.$route.query.productId,
      itemId: this.$route.query.itemId,
      projectType: this.$route.query.projectType, // 0-散标 1-债转 2-集合标
      protocolData: [], // 协议数据
      lendBtnMsg: '提交', // 投资按钮的内容
      canILend: false, // 投资按钮是否可点击
      agree: false, // 协议是否选中
      amount: Cookie.get('hycEasyAmount') ? Cookie.get('hycEasyAmount') : '', // 投资金额
      projectInfo: {},
      amountInfo: '', // 账户金额详情
      expectedIncome: '- -', // 预期收益
      lendAllFlag: false, // 当前是否为全投状态
      errMsg: '', // 错误提示
      redPacketNum: 0, // 可用红包数量
      couponNum: 0, // 可用加息券数量
      investErrDialogOptions: {
        // 出借错误弹窗（resultCode !== '1'）
        show: false,
        msg: ''
      },
      riskTestIsMax: '', // 风险测评类型是否达到最大
      riskTestDialogOptions: {
        // 风险测评有问题弹窗
        show: false,
        msg: '',
        title: '',
        confirmText: '重新评测'
      },
      signAndRiskDialogOptions: {
        show: false,
        msg: '你没签约',
        confirmText: '去签约'
      },
      lendSJLSuccessDialogOptions: {
        // 出借手机乐成功弹窗
        show: false,
        title: '',
        msg: '出借手机乐成功弹窗',
        confirmText: '填写地址'
      },
      investDialogOptions: {
        // 出借普通产品成功弹窗
        show: false,
        title: '恭喜您，出借成功',
        msg: '还有很多优质产品，总还有一款适合您',
        confirmText: '查看更多'
      },
      chargeDialogOption: {
        show: false,
        confirmText: '去充值'
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState({
      checkedCoupon: state => state.hycLend.hycLendCoupon, // 已选择的加息券
      checkedRedPacket: state => state.hycLend.hycLendRedPacket, // 已选择的红包
      hycChooseCouponFlag: state => state.hycLend.hycChooseCouponFlag, // 是否操作过加息券列表
      hycChooseRedPacketFlag: state => state.hycLend.hycChooseRedPacketFlag // 是否操作过红包列表
    })
  },
  watch: {
    amount: debounce(function(value) {
      // 输入的金额保留两位小数
      if (value.toString().indexOf('.') > 0 && value.toString().length - (value.toString().indexOf('.') + 1) > 2) {
        this.amount = ((value * 100) / 100).toFixed(2)
      }

      // cookie保存投资金额，保证红包 && 加息券页路由会跳时不会丢失数据
      Cookie.set('hycEasyAmount', this.amount)

      // 项目剩余可投
      const surplusAmount = this.projectInfo.surplusAmt

      // 判断全投状态
      this.lendAllFlag = parseFloat(value) - parseFloat(surplusAmount) === 0 || parseFloat(value) - parseFloat(this.amountInfo.banlance) === 0

      // 对比输入金额和可用金额case
      if (value !== '' && value - 0 < this.projectInfo.minInvAmount - 0) {
        this.errMsg = '申购金额需' + this.projectInfo.minInvAmount + '元起'
      } else if (parseFloat(value) - parseFloat(surplusAmount) > 0) {
        this.errMsg = '已超过限额' + surplusAmount + '元'
      } else {
        this.errMsg = ''
      }

      // 根据投资金额获取可用的红包 && 加息券
      this.getCouponPackage(value)

      // 判断投资按钮的可点击状态
      this.canILend =
        parseFloat(value) - parseFloat(this.projectInfo.minInvAmount) >= 0 && parseFloat(value) <= parseFloat(this.projectInfo.surplusAmt)
    })
  },
  methods: {
    toSign() {
      this.$router.push({
        name: 'openAccountProgress'
      })
    },
    showAgre(url) {
      const agreementType = getQueryParameter(url, 'agreementType')
      this.$router.push({
        name: 'HYCAgreement',
        query: { agreementType }
      })
    },
    toAddress() {
      this.$router.push({
        name: 'receiveAddress'
      })
    },
    toInvestList() {
      this.$router.push({
        name: 'HYCInvestment'
      })
    },
    changeStatus() {
      this.agree = !this.agree
    },
    getExpectedIncome() {
      expectedIncome({
        invAmount: this.amount,
        investRate: this.projectInfo.investRate,
        couponRate: this.checkedCoupon ? this.checkedCoupon.couponRate : null,
        productId: this.productId,
        validDays: this.checkedCoupon ? this.checkedCoupon.validDays : null
        // invDays: this.projectInfo.loanMentNumber,
        // redpacketID: this.checkedRedPacket ? this.checkedRedPacket.id : null,
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          this.expectedIncome = data.expectedIncome
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    lendAll() {
      this.amount = this.amountInfo.banlance
      this.lendAllFlag = true
    },
    chooseCoupon() {
      let [checkedCoupon, checkedRedPacket] = []
      if (this.checkedCoupon) {
        if (this.checkedCoupon.couponInfoId) {
          checkedCoupon = this.checkedCoupon.couponInfoId
        } else {
          checkedCoupon = this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if (this.checkedRedPacket) {
        if (this.checkedRedPacket.redPacketId) {
          checkedRedPacket = this.checkedRedPacket.redPacketId
        } else {
          checkedRedPacket = this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      this.$router.push({
        name: 'HYCLendChooseCoupon',
        params: {
          productId: this.productId,
          amount: this.amount,
          redPacketId: checkedRedPacket,
          couponId: checkedCoupon
        }
      })
    },
    chooseRedPacket() {
      let [checkedCoupon, checkedRedPacket] = []
      if (this.checkedCoupon) {
        if (this.checkedCoupon.couponInfoId) {
          checkedCoupon = this.checkedCoupon.couponInfoId
        } else {
          checkedCoupon = this.checkedCoupon.id
        }
      } else {
        checkedCoupon = null
      }

      if (this.checkedRedPacket) {
        if (this.checkedRedPacket.redPacketId) {
          checkedRedPacket = this.checkedRedPacket.redPacketId
        } else {
          checkedRedPacket = this.checkedRedPacket.id
        }
      } else {
        checkedRedPacket = null
      }

      this.$router.push({
        name: 'HYCLendChooseRedPacket',
        params: {
          productId: this.productId,
          amount: this.amount,
          couponId: checkedCoupon,
          redPacketId: checkedRedPacket
        }
      })
    },
    getCouponPackage(amount) {
      Indicator.open()
      couponPackageApi({
        userName: this.user.userName,
        productId: this.productId,
        investAmount: amount
      }).then(res => {
        Indicator.close()
        const data = res.data.data
        ;[this.redPacketNum, this.couponNum] = [data.availableRedPacketCount, data.availableCouponCount]

        if (JSON.parse(this.hycChooseCouponFlag)) {
          if (data.availableCouponCount > 0) {
            this.initCoupon(data.optimalCoupon)
          } else {
            this.clearCoupon()
          }
        } else {
          this.initCoupon(this.checkedCoupon)
        }

        if (JSON.parse(this.hycChooseRedPacketFlag)) {
          if (data.availableRedPacketCount > 0) {
            this.initRedPacket(data.optimalRedpacket)
          } else {
            this.clearRedPacket()
          }
        } else {
          this.initRedPacket(this.checkedRedPacket)
        }

        // 根据最优券包计算预期收益
        this.getExpectedIncome()
      })
    },
    invest() {
      if (!this.canILend) return

      if (!this.agree) return

      if (this.amount - 0 > this.amountInfo.banlance - 0) {
        this.chargeDialogOption.show = true
        return
      }

      userInfoCompleteNoticeApi().then(completeNotice => {
        const status = completeNotice.data.data.status
        if (status === 'OPEN_ACCOUNT' || status === 'SET_PASSWORD') {
          Toast('未开户，请先开户')
          this.$router.push({
            name: 'openAccountProgress'
          })
        } else {
          systemMaintenance().then(res => {
            if (res.data.resultCode === '60056') {
              // 此时段为系统维护
              this.investErrDialogOptions.show = true
              this.investErrDialogOptions.msg = res.data.resultMsg
            } else {
              if (!this.agree) {
                Toast('请确认并同意《风险告知书》')
                return
              }
              let checkedCoupon, checkedRedPacket
              switch (status) {
                case 'SIGN_PROTOCOL': // 未签约
                  this.signAndRiskDialogOptions.show = true
                  this.signAndRiskDialogOptions.msg = '你没签约'
                  this.signAndRiskDialogOptions.confirmText = '去签约'
                  break
                case 'EVALUATE':
                  this.signAndRiskDialogOptions.show = true
                  this.signAndRiskDialogOptions.msg = completeNotice.data.data.message
                  this.signAndRiskDialogOptions.confirmText = '去评测'
                  break
                case 'COMPLETE':
                  if (this.checkedCoupon) {
                    if (this.checkedCoupon.userCouponId) {
                      checkedCoupon = this.checkedCoupon.userCouponId
                    } else {
                      checkedCoupon = this.checkedCoupon.id
                    }
                  } else {
                    checkedCoupon = null
                  }

                  if (this.checkedRedPacket) {
                    if (this.checkedRedPacket.userCouponId) {
                      checkedRedPacket = this.checkedRedPacket.userRedPacketId
                    } else {
                      checkedRedPacket = this.checkedRedPacket.id
                    }
                  } else {
                    checkedRedPacket = null
                  }

                  investApi({
                    projectNo: this.itemId ? this.itemId : null,
                    invAmount: this.amount,
                    userCouponId: checkedCoupon,
                    userRedPacketId: checkedRedPacket,
                    investSource: 'h5',
                    forgotPwdUrl: getRetBaseURL() + '/forgetpwd',
                    retUrl: window.location.href,
                    projectType: this.projectType
                  }).then(res => {
                    const data = res.data.data
                    switch (res.data.resultCode) {
                      case '1':
                        if (data.type === '1') {
                          JumpJX(data.redirectUrl, data.paramReq)
                        } else {
                          switch (data.investType) {
                            case 'SJLHD':
                              this.lendSJLSuccessDialogOptions.show = true
                              this.lendSJLSuccessDialogOptions.msg = data.data.successInfo
                              this.lendSJLSuccessDialogOptions.title = data.data.successTitle
                              break
                            case 'GENERAL':
                              this.investDialogOptions.show = true
                              break
                          }
                        }
                        break
                      case '90021':
                        // 风险测评出借额度不够
                        this.riskTestDialogOptions.show = true
                        this.riskTestDialogOptions.title = '风险测评等级不符'
                        this.riskTestDialogOptions.msg = res.data.resultMsg

                        if (['JINX'].includes(res.data.data.evaluatingResult)) {
                          this.riskTestDialogOptions.confirmText = '我知道了'
                          this.riskTestIsMax = true
                        }
                        break
                      case '90022':
                        // 出借期限不够
                        this.riskTestDialogOptions.show = true
                        this.riskTestDialogOptions.title = '风险测评出借期限不够'
                        this.riskTestDialogOptions.msg = res.data.resultMsg

                        if (['JINX'].includes(res.data.data.evaluatingResult)) {
                          this.riskTestDialogOptions.confirmText = '我知道了'
                          this.riskTestIsMax = true
                        }
                        break
                      default:
                        this.investErrDialogOptions.show = true
                        this.investErrDialogOptions.msg = res.data.resultMsg
                    }
                  })
                  break
              }
            }
          })
        }
      })
    },
    confirmCharge() {
      this.$router.push({ name: 'HYCCharge' })
    },
    confirmRiskText() {
      if (!this.riskTestIsMax) {
        this.$router.push({
          name: 'riskTest'
        })
      }
    },
    ...mapMutations({
      cleanData: 'CLEAN_HYC_LEND_DATA',
      initCoupon: 'CHOOSE_HYC_COUPON',
      clearCoupon: 'CLEAN_HYC_COUPON',
      clearRedPacket: 'CLEAN_HYC_REDPACKET',
      initRedPacket: 'CHOOSE_HYC_REDPACKET',
      setCouponFlag: 'SET_HYC_CHOOSE_COUPON_FLAG',
      setRedPacketFlag: 'SET_HYC_CHOOSE_REDPACKET_FLAG'
    })
  },
  created() {
    const $this = this
    ;(async function initData() {
      // 集合标 && 债转标详情
      await getInvestDetail({
        itemId: $this.itemId,
        productId: $this.productId,
        userName: $this.user.userName
      }).then(res => {
        const data = res.data.data
        $this.projectInfo = data.projectInfo
        if ($this.amount - 0 >= data.projectInfo.minInvAmount - 0) {
          $this.canILend = true
        }
      })

      await getProtocaol({
        type: 'TZZF',
        projectType: $this.projectType
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data.data
          $this.protocolData = data.result
          $this.agree = data.result[0].isChecked
        } else {
          Toast(res.data.resultMsg)
        }
      })
      await getPersonalAccount({
        userName: $this.user.userName
      }).then(res => {
        const data = res.data
        $this.amountInfo = data
        if ($this.amount !== '') {
          if (data.banlance - 0 === $this.amount - 0) {
            $this.lendAllFlag = true
          }
          if (parseFloat(data.banlance) < parseFloat($this.projectInfo.minInvAmount)) {
            $this.lendBtnMsg = '账户余额不足'
            $this.canILend = false
          }
          $this.getExpectedIncome()
        }
      })
      await $this.getCouponPackage($this.amount)
    })()
  },
  beforeRouteLeave(to, from, next) {
    // 如果不是跳转到选择卡券页面，重置投资金额
    if (!['HYCLendChooseCoupon', 'HYCLendChooseRedPacket'].includes(to.name)) {
      Cookie.remove('hycEasyAmount')
      this.clearCoupon()
      this.clearRedPacket()
      this.setCouponFlag(true)
      this.setRedPacketFlag(true)
    }

    next()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.lend-wrapper {
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .lend {
    flex: 1;
    overflow: hidden;
    .huge {
      @include cube(100%, auto);
      margin-bottom: 0.08rem;
      background-color: #ec5e52;
      padding: 0 0.15rem;
      ul {
        padding: 0.2rem 0;
        @include border-bottom-1px(rgba(255, 255, 255, 0.5));
        display: flex;
        justify-content: space-between;
        li {
          flex: 1;
          align-self: center;
          color: #ffffff;
          font-size: 0.15rem;
          span {
            font-size: 0.36rem;
            &.pre {
              font-size: 0.15rem;
            }
          }
          label {
            font-size: 0.18rem;
          }
          em {
            font-size: 0.18rem;
          }
          h5 {
            font-size: 0.15rem;
            line-height: 1.75;
          }
          h6 {
            font-size: 0.13rem;
            line-height: 1.75;
          }
        }
      }
      > p {
        color: #fff;
        font-size: 0.13rem;
        line-height: 0.32rem;
        span:last-child {
          margin-left: 0.16rem;
        }
      }
    }
    .amount-block {
      background: #fff;
      padding-top: 0.16rem;
      position: relative;
      margin-bottom: 0.08rem;
      h6 {
        padding: 0 0.15rem;
        font-size: 0.13rem;
        color: #999999;
      }
      section {
        padding: 0 0.15rem;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        @include border-bottom-1px(#eee);
        div {
          width: 0.25rem;
          padding-right: 0.1rem;
          font-size: 0.24rem;
          line-height: 0.5rem;
          color: #333;
        }
        input {
          flex: 1;
          padding: 0.08rem 0;
          font-size: 0.15rem;
          &::placeholder {
            color: #999;
          }
        }
      }
      .err-msg {
        line-height: 0.24rem;
        background: rgba(255, 0, 0, 0.15);
        padding: 0 0.15rem;
        font-size: 0.11rem;
        color: #f14b4b;
      }
      .ctrl {
        padding: 0 0.15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
          p {
            margin: 0.08rem 0;
            font-size: 0.11rem;
            span {
              i {
                font-size: 0.1rem;
                margin-right: 0.05rem;
              }
              &.key {
                color: #999;
              }
              &.value {
                font-size: 0.11rem;
                color: #ec5e52;
                margin-left: 0.05rem;
              }
            }
          }
        }
        button {
          @include radiusCube(0.78rem, 0.28rem);
          font-size: 0.13rem;
          line-height: 0.26rem;
          background: #ffffff;
          border: 0.01rem solid #333;
          &.active {
            border: 0.01rem solid #ec5e52;
            color: #ec5e52;
          }
        }
      }
    }
    .coupon {
      background: #ffffff;
      padding-left: 0.15rem;
      margin-bottom: 0.08rem;
      li {
        height: 0.5rem;
        padding-right: 0.15rem;
        &:first-child {
          @include border-bottom-1px(#eee);
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.15rem;
        }
        p,
        label {
          display: inline-block;
          font-size: 0.15rem;
          color: #999;
        }
        label {
          color: #ec5e52;
        }
        i {
          font-size: 0.13rem;
          color: #999;
          margin-left: 0.1rem;
        }
      }
    }
    .agree {
      margin: 0.16rem auto 0.08rem;
      padding: 0 0.15rem 0 0.37rem;
      font-size: $font-size-small-s;
      line-height: 0.18rem;
      position: relative;
      input[type='checkbox'] {
        display: none;
      }
      label {
        position: absolute;
        left: 0.15rem;
        &:before {
          box-sizing: border-box;
          content: '';
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background-color: #fff;
          border: 0.05rem solid #ccc;
          border-radius: 0.2rem;
          margin-right: 0.1rem;
          vertical-align: middle;
        }
      }
      input.active + label:before {
        border: 0.05rem solid $color-button;
      }
      section {
        line-height: 1.7;
      }
      .agreement {
        color: $color-button;
      }
    }
    .state {
      box-sizing: border-box;
      width: 3.2rem;
      margin: 0 auto;
      padding-left: 0.1rem;
      font-size: 0.13rem;
      color: #999;
      line-height: 0.18rem;
    }
  }
  .invest-btn {
    @include cube(100%, 0.56rem);
    background: #fff;
    box-shadow: inset 0 0.01rem 0 0 #eee;
    section {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 0.07rem auto;
      @include cube(3.45rem, 0.42rem);
      border-radius: 0.04rem;
      background: #ccc;
      transition: 0.4s;
      &.active {
        background: #ec5e52;
      }
      h6 {
        font-size: 0.15rem;
        color: #fff;
        text-align: center;
      }
      p {
        font-size: 0.12rem;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
      }
    }
  }
}
</style>
