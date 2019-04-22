<template>
  <div class="lend-wrapper">
    <BScroll class="lend">
      <section>
        <div class="huge">
          <ul>
            <li>
              <span>{{ investDetail.investRate }}</span>
              <span>%</span>
            </li>
            <li>
              <h5>{{ investDetail.projectName }}</h5>
              <h6>锁定期{{ investDetail.investMent }}天</h6>
            </li>
          </ul>
          <p>
            <span>剩余可投</span>
            <span>{{ investDetail.surplusAmount }}万</span>
          </p>
        </div>
        <div class="amount-block">
          <h6>投标金额</h6>
          <section>
            <div>¥</div>
            <input type="number" placeholder="请输入金额" v-model="amount" />
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
            <input type="checkbox" id="isCheck" :checked="agree" :data-check="agree" v-if="agreement.isSelect === '1'" />
            <label for="isCheck" @click="changeStatus" v-if="agreement.isSelect === '1'"></label>
            <div>
              <p>
                {{ agreement.tipsBefore }}
                <a :href="agreement.protocolUrl" class="agreement">{{ agreement.protocolName }}</a>
              </p>
              <p>{{ agreement.tipsAfter }}</p>
            </div>
          </div>
        </div>
      </section>
    </BScroll>

    <div class="invest-btn">
      <section :class="{ active: canILend }" @click="invest">
        <h6>{{ lendBtnMsg }}</h6>
        <p v-if="parseFloat(investDetail.minInvAmt) > parseFloat(amountInfo.banlance)">
          还需余额{{ parseFloat(investDetail.minInvAmt) - parseFloat(amountInfo.banlance) }}
        </p>
      </section>
    </div>

    <!-- 复投弹窗 -->
    <Dialog class="auto-lend-dialog" :show.sync="autoInvestDialogOptions.show" :title="autoInvestDialogOptions.title" :onConfirm="confirmAutoInvest">
      <mt-radio align="right" v-model="autoLendType" :options="autoLendTypeRadio"> </mt-radio>
      <p class="agre">自动出借服务条款></p>
    </Dialog>

    <!-- 自动出借设置成功弹窗 -->
    <Dialog
      class="auto-lend-sxs-dialog"
      :show.sync="autoLendSuccessDialogOptions.show"
      :title="autoLendSuccessDialogOptions.title"
      :confirmText="autoLendSuccessDialogOptions.confirmText"
      :onConfirm="confirmAutoLendSXS"
    >
      <img src="./images/auto-lend-success.png" alt="" />
      <p>{{ autoLendSuccessDialogOptions.msg }}</p>
    </Dialog>

    <!-- 风险测评弹窗 -->
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
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Alert'

import { Toast, Indicator } from 'mint-ui'

import { getProtocaol } from '@/api/djs/invite'
import { getInvestDetail, getPersonalAccount, expectedIncome, couponPackageApi, investApi, expireRepeatApi } from '@/api/djs/investDetail'

import { mapGetters, mapState, mapMutations } from 'vuex'
import Cookie from 'js-cookie'

export default {
  name: 'invest',
  components: {
    BScroll,
    Dialog
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo, // 标的号
      protocolData: [], // 协议数据
      lendBtnMsg: '提交', // 投资按钮的内容
      canILend: false, // 投资按钮是否可点击
      agree: false, // 协议是否选中
      amount: Cookie.get('djsLendAmount') ? Cookie.get('djsLendAmount') : '', // 投资金额
      investDetail: '', // 标的详情
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
      autoInvestDialogOptions: {
        // 自动出借产品成功弹窗
        show: false,
        title: '设置自动出借，省心赚钱'
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
      autoLendType: '1',
      invId: -1,
      investType: '',
      autoLendSuccessDialogOptions: {
        show: false,
        title: '恭喜您，出借成功',
        msg: '',
        confirmText: ''
      },
      generalMsg: '还有很多优质产品，总还有一款适合您',
      autoLendSuccessType: -1, // 自动出借设置成功后判断出借类型的标识 0：普通标 1：手机乐活动标
      riskTestIsMax: '', // 风险测评类型是否达到最大
      riskTestDialogOptions: {
        show: false,
        msg: '',
        title: '',
        confirmText: '重新评测'
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState({
      checkedCoupon: state => state.djsLend.djsLendCoupon, // 已选择的加息券
      checkedRedPacket: state => state.djsLend.djsLendRedPacket // 已选择的红包
    })
  },
  watch: {
    amount(value) {
      // cookie保存投资金额，保证红包 && 加息券页路由会跳时不会丢失数据
      Cookie.set('djsLendAmount', value)

      // 项目剩余可投和账户余额取小，得到可投资的极限金额
      const maxLendAmount =
        parseFloat(this.amountInfo.banlance) <= parseFloat(this.investDetail.surplusAmount)
          ? this.amountInfo.banlance
          : this.investDetail.surplusAmount

      // 判断全投状态
      this.lendAllFlag = value === maxLendAmount

      // 对比输入金额和可用金额case
      if (value - 0 < this.investDetail.minInvAmt - 0) {
        this.errMsg = '申购金额需' + this.investDetail.minInvAmt + '元起'
      } else if (value - 0 === maxLendAmount) {
        this.errMsg = '已经到极限了'
      } else if (value - 0 > maxLendAmount) {
        this.amount = maxLendAmount
      } else {
        this.errMsg = ''
      }

      // 根据投资金额获取可用的红包 && 加息券
      this.getCouponPackage(value)

      // 计算预期收益
      this.getExpectedIncome()

      // 判断投资按钮的可点击状态
      this.canILend = value - 0 >= this.investDetail.minInvAmt - 0
    }
  },
  methods: {
    changeStatus() {
      this.agree = !this.agree
    },
    getExpectedIncome() {
      expectedIncome({
        invAmount: this.amount,
        investRate: this.investDetail.investRate,
        invDays: this.investDetail.investMent,
        couponRate: this.checkedCoupon ? this.checkedCoupon.couponRate : null,
        validDays: this.checkedCoupon ? this.checkedCoupon.validDays : null,
        redpacketID: this.checkedRedPacket ? this.checkedRedPacket.id : null
      }).then(res => {
        this.expectedIncome = res.data.expectedIncome
      })
    },
    lendAll() {
      this.amount = this.amountInfo.banlance
      this.lendAllFlag = true
    },
    chooseCoupon() {
      this.$router.push({
        name: 'DJSLendChooseCoupon',
        params: {
          projectNo: this.projectNo,
          amount: this.amount,
          redPacketId: this.checkedRedPacket && this.checkedRedPacket.id
        }
      })
    },
    chooseRedPacket() {
      this.$router.push({
        name: 'DJSLendChooseRedPacket',
        params: {
          projectNo: this.projectNo,
          amount: this.amount,
          couponId: this.checkedCoupon && this.checkedCoupon.id
        }
      })
    },
    getCouponPackage(amount) {
      Indicator.open()
      couponPackageApi({
        userName: this.user.userName,
        projectNo: this.projectNo,
        amount: amount
      }).then(res => {
        Indicator.close()
        const data = res.data
        ;[this.redPacketNum, this.couponNum] = [data.availableRedPacketCount, data.availableCouponCount]
      })
    },
    invest() {
      if (this.canILend) {
        investApi({
          userName: this.user.userName,
          projectNo: this.projectNo,
          invAmount: this.amount,
          userCouponId: this.checkedCoupon ? this.checkedCoupon.id : null,
          userRedPacketId: this.checkedRedPacket ? this.checkedRedPacket.id : null,
          investSource: 'H5'
        }).then(res => {
          const data = res.data
          if (data.resultCode === '1') {
            this.cleanData()
            if (this.investDetail.doubleBonuCouponEntity.dbCouponRate || this.investDetail.doubleBonuCouponEntity.dbValidDays !== null) {
              // 可以加息复投
              this.invId = data.id
              this.investType = data.investType
              this.autoInvestDialogOptions.show = true
              this.generalMsg = data.successInfo
            } else {
              this.autoLendSuccessDialogOptions.show = true
              if (data.investType === 'SJLHD') {
                // 手机乐活动
                this.autoLendSuccessDialogOptions.msg = this.generalMsg
                this.autoLendSuccessDialogOptions.confirmText = '去设置'
                this.autoLendSuccessType = 1
              } else {
                // 普通产品
                this.autoLendSuccessDialogOptions.msg = '还有很多优质产品，总还有一款适合您'
                this.autoLendSuccessDialogOptions.confirmText = '查看更多'
                this.autoLendSuccessType = 0
              }
            }
          } else if (data.resultCode === '90021') {
            // 风险测评等级不符
            this.riskTestDialogOptions.show = true
            this.riskTestDialogOptions.title = '风险测评等级不符'
            this.riskTestDialogOptions.msg = res.data.resultMsg
            if (['JINX'].includes(data.data.evaluatingResult)) {
              // 激进型
              this.riskTestIsMax = true
              this.riskTestDialogOptions.confirmText = '我知道了'
            }
          } else if (data.resultCode === '90022') {
            // 风险测评过期
            this.riskTestDialogOptions.show = true
            this.riskTestDialogOptions.title = '风险测评过期'
            this.riskTestDialogOptions.msg = res.data.resultMsg
            this.riskTestIsMax = false
          } else {
            Toast(data.resultMsg)
          }
        })
      }
    },
    confirmAutoInvest() {
      expireRepeatApi({
        invId: this.invId,
        projectNo: this.projectNo,
        repeatStatus: this.autoLendType
      }).then(res => {
        const data = res.data
        if (data.resultCode === '1') {
          switch (this.investType) {
            case 'GENERAL':
              // 普通标
              this.autoLendSuccessDialogOptions.msg = '还有很多优质产品，总还有一款适合您'
              this.autoLendSuccessType = 0
              this.autoLendSuccessDialogOptions.confirmText = '查看更多'
              break
            case 'SJLHD':
              // 手机乐活动
              this.autoLendSuccessDialogOptions.msg = this.generalMsg
              this.autoLendSuccessType = 1
              this.autoLendSuccessDialogOptions.confirmText = '去设置'
              break
          }
          this.autoLendSuccessDialogOptions.show = true
        } else {
          this.investErrDialogOptions.show = true
          this.investErrDialogOptions.msg = data.resultMsg
        }
      })
    },
    confirmAutoLendSXS() {
      switch (this.autoLendSuccessType) {
        case 0:
          this.$router.push({
            name: 'DJSInvestment'
          })
          break
        case 1:
          this.$router.push({
            name: 'receiveAddress'
          })
          break
      }
    },
    confirmRiskText() {
      if (!this.riskTestIsMax) {
        this.$router.push({
          name: 'riskTest'
        })
      }
    },
    ...mapMutations({
      cleanData: 'CLEAN_LEND_DATA'
    })
  },
  created() {
    const $this = this
    ;(async function initData() {
      await getInvestDetail({
        projectNo: $this.projectNo
      }).then(res => {
        const data = res.data
        $this.investDetail = data
        if ($this.amount >= data.minInvAmt) {
          $this.canILend = true
        }
      })
      await getProtocaol({
        type: 'TZJE'
      }).then(res => {
        if (res.data.resultCode === '1') {
          $this.protocolData = res.data.protocolData
          $this.agree = res.data.protocolData[0].isSelect === '1'
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
          if (data.banlance < $this.investDetail.minInvAmt) {
            $this.lendBtnMsg = '账户余额不足'
            $this.canILend = false
          }
          $this.getExpectedIncome()
        }
      })
      await $this.getCouponPackage()
    })()
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
      @include cube(100%, 1.2rem);
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
            &:first-child {
              font-size: 0.36rem;
            }
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
          font-size: 0.18rem;
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
            border: 0.01rem solid #ace;
            color: #ace;
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
      margin: 0.16rem auto;
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
      input:checked + label:before {
        border: 0.05rem solid $color-button;
      }
      .agreement {
        color: $color-button;
      }
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
  .auto-lend-sxs-dialog {
    /deep/ .inner {
      padding-top: 1rem;
    }
    img {
      position: absolute;
      @include square(1.3rem);
      left: 0;
      right: 0;
      top: 0;
      margin: 0 auto;
      transform: translateY(-50%);
    }
  }
}
</style>
