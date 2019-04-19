<template>
  <transition name="fade">
    <div class="pageContainer" ref="container">
      <b-scroll class="scroll" ref="scrollRef">
        <div>
          <ul class="top">
            <li class="border-bottom-1px">
              <dl>
                <dt><img src="./image/jiangxi.png" alt="" /></dt>
                <dd>江西银行电子账户</dd>
              </dl>
              <div class="long_arrow"></div>
              <dl>
                <dt>
                  <img :src="bankCardInfo.iconUrl" alt="" />
                </dt>
                <dd>{{ bankCardInfo.bankName }}</dd>
              </dl>
            </li>
            <li>
              <div class="border-bottom-1px">
                <input ref="amountRef" placeholder="请输入提现金额" type="text" @input="amountInput" />
                <span>元</span>
              </div>
            </li>
            <li>
              <div>
                <span>江西银行电子账户</span>
                <em>{{ balance }}元</em>
                <i @click="toCashAll">全部提现</i>
              </div>
            </li>
          </ul>
          <ul class="mid">
            <li>
              <div class="border-bottom-1px">
                <span>提现至</span>
                <em>{{ bankCardInfo.cardNo }}</em>
              </div>
            </li>
            <li>
              <div>
                <div class="top">
                  <mt-radio
                    title="提现方式"
                    v-model="type"
                    :options="[
                      {
                        label: '实时',
                        value: '1'
                      },
                      {
                        label: '大额',
                        value: '2'
                      }
                    ]"
                  >
                  </mt-radio>
                </div>
                <ul class="btm">
                  <li v-show="smallAmountFlag">支持5万（含5万）以下资金提现，实时到账</li>
                  <li v-show="largeAmountFlag">
                    支持5万以上资金提现，提现时间为工作日9:00-16:45。到账时间为30分钟左右，依据发卡行不同可能略有差异。
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul class="bottom" v-show="largeAmountFlag">
            <li>
              <div class="border-bottom-1px">
                <span>联行号</span>
                <input placeholder="请输入联行号" ref="cardBankCnapsInput" @focus="focusScroll" type="number" v-model="cardBankCnaps" />
                <em @click="showSelector = true"></em>
              </div>
            </li>
            <li>
              <div>
                <span>不知道联行号？请</span>
                <a :href="bankUnionNumberUrl">点击查询</a>
              </div>
            </li>
          </ul>
          <div class="tip">
            <div>温馨提示</div>
            <p>1.江西银行电子账户遵守资金同卡进出原则，资金只能提现至您绑定充值的银行卡中。</p>
            <p>2.提现手续费0元，每日限10笔。</p>
            <p>3.提现中有任何疑问，请立即联系汇有财客服：</p>
            <p>400-099-7979。</p>
            <button @click="withDraw">确认提现</button>
          </div>
        </div>
      </b-scroll>
      <div class="select_bank" v-show="showSelector">
        <mt-header :title="text1" class="is-fixed">
          <mt-button icon="back" slot="left" @click="clickBackArrow"></mt-button>
        </mt-header>
        <mt-search v-model="searchVal" :show="true" :result.sync="filterResult">
          <mt-cell v-for="(item, index) in filterResult" :key="index" :title="item.name" :value="item.code" @click.native="selectItem(item)">
          </mt-cell>
        </mt-search>
      </div>
      <app-dialog :show="showDialog" :confirmType="confirmType" :title="dialogTitle" @close="closeDialog" @ensure="closeDialog">
        <p class="dialog-content">{{ chargeErrText }}</p>
      </app-dialog>
    </div>
  </transition>
</template>

<script>
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import api from '@/api/hyc/mine/toCash'
import { browser } from '@/assets/js/utils'
import Hyoucai from '@/assets/js/hyoucai'
import { AppToast } from '@/assets/js/Toast'
import AppDialog from '@/components/Dialog/Alert'

export default {
  components: {
    BScroll,
    AppDialog
  },
  data() {
    return {
      text: '提现',
      mobile: this.$route.query.mobile,
      text1: '选择银行开户地址',
      amount: null,
      type: '1', // 2：大额， 1: 实时
      smallAmountFlag: true,
      largeAmountFlag: false,
      balance: 0,
      cardBankCnaps: '', // 联行号
      bankCardInfo: {
        accountId: '6212462190000950068',
        area: '',
        bankNo: '',
        cardNo: '6222988812340041',
        city: '',
        fullName: '测试账号41',
        mobile: '17000000041',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '100',
        userName: 'djs776205tt'
      },
      idNo: '',
      retUrl: '',
      forgotPwdUrl: '',
      bankUnionNumberUrl: '',
      showSelector: false,
      searchVal: '',
      result: [],
      provinceCode: '',
      cityCode: '',
      areaCode: '',
      progress: '',
      showDialog: false,
      confirmType: 0,
      dialogTitle: '友情提示',
      chargeErrText: ''
    }
  },
  watch: {
    type() {
      if (this.type === '1') {
        this.smallAmountFlag = true
        this.largeAmountFlag = false
      } else {
        this.smallAmountFlag = false
        this.largeAmountFlag = true
      }
    }
  },
  methods: {
    amountInput(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if (e.target.value.indexOf('.') < 0 && e.target.value !== '') {
        e.target.value = parseFloat(e.target.value)
      }
      if (this.type === '1' && e.target.value > 50000) {
        AppToast.maxVal('toCashAmount', '5万', '实时')
        e.target.value = 50000
      }
      if (this.type === '2' && e.target.value > parseFloat(this.balance)) {
        e.target.value = parseFloat(this.balance)
        Toast('输入金额不能大于可提现余额，请重新输入。')
      }
      this.amount = e.target.value
    },
    toCashAll() {
      this.$refs.amountRef.value = this.balance
    },
    clickBackArrow() {
      if (this.progress === 'province') {
        this.showSelector = false
      }
      if (this.progress === 'city') {
        this.getSysProvinceList()
      }
      if (this.progress === 'area') {
        this.getSysCityList(this.provinceCode)
      }
      if (this.progress === 'bank') {
        this.getSysBankAreaList(this.cityCode)
      }
    },
    selectItem(item) {
      if (item.provinceCode) {
        this.provinceCode = item.provinceCode
        this.getSysCityList(item.provinceCode)
      }
      if (item.cityCode) {
        this.cityCode = item.cityCode
        this.getSysBankAreaList(item.cityCode)
      }
      if (item.areaCode) {
        this.areaCode = item.areaCode
        this.getSysBranceBankList(item.areaCode, this.bankCardInfo.bankNo, this.serachVal)
      }
      if (item.bankNum) {
        this.cardBankCnaps = item.bankNum
        this.showSelector = false
      }
    },
    withDraw() {
      if (!this.amount) {
        AppToast.empty('toCashAmount')
        return
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        Toast('输入金额不能大于可提现余额，请重新输入!')
        return
      }
      if (this.type === '2' && !this.cardBankCnaps) {
        AppToast.empty('unionBankNo')
        return
      }
      let url = Hyoucai.getRetBaseURL() + '/mine'
      let forgetUrl = Hyoucai.getRetBaseURL() + '/personal_info'
      let data = {
        txAmount: this.amount,
        routeCode: this.type,
        retUrl: url,
        forgotPwdUrl: forgetUrl,
        platform: 'H5'
      }
      if (this.type === '2') {
        data.cardBankCnaps = this.cardBankCnaps
      }
      if (this.provinceCode) {
        data.provinceCode = this.provinceCode
      }
      if (this.cityCode) {
        data.cityCode = this.cityCode
      }
      if (this.areaCode) {
        data.areaCode = this.areaCode
      }
      if (this.bankCardInfo.bankName) {
        data.bankName = this.bankCardInfo.bankName
      }
      if (this.idNo) {
        data.idNo = this.bankCardInfo.bankName
      }
      if (this.bankCardInfo.mobile) {
        data.mobile = this.bankCardInfo.mobile
      }
      api.withdrawApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
        } else if (res.data.resultCode === '90101') {
          this.showDialog = true
          this.chargeErrText = res.data.resultMsg
        } else {
          Toast(resultMsg)
        }
      })
    },
    postcall(url, params, target) {
      let tempform = document.createElement('form')
      tempform.setAttribute('name', 'form')
      tempform.action = url
      tempform.method = 'post'
      tempform.style.display = 'none'
      if (target) {
        tempform.target = target
      }

      for (let x in params) {
        let opt = document.createElement('input')
        opt.name = x
        opt.value = params[x]
        tempform.appendChild(opt)
      }

      let opt = document.createElement('input')
      opt.type = 'submit'
      opt.setAttribute('id', '_submit')
      tempform.appendChild(opt)
      document.body.appendChild(tempform)
      tempform.submit()
      document.body.removeChild(tempform)
    },
    getSysBranceBankList(areaCode, bankNo, keyWord) {
      let data = { areaCode: areaCode }
      if (bankNo) {
        data.bankNo = bankNo
      }
      if (keyWord) {
        data.keyWord = keyWord
      }
      api.sysBranceBankListApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.result = data.data.list
          if (!this.result.length) {
            Toast('无数据')
            this.getSysBankAreaList(this.cityCode)
            this.progress = 'area'
            return
          }
          this.progress = 'bank'
          this.result.map(obj => {
            if (obj.bankNum) {
              this.$set(obj, 'code', obj.bankNum)
              this.$set(obj, 'name', obj.bankName)
            }
          })
        } else {
          Toast(resultMsg)
        }
      })
    },
    getSysBankAreaList(cityCode) {
      api.sysBankAreaListApi({ cityCode: cityCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.result = data.data.list
          if (!this.result.length) {
            Toast('无数据')
            this.getSysCityList(this.provinceCode)
            this.progress = 'city'
            return
          }
          this.progress = 'area'
          this.result.map(obj => {
            if (obj.areaCode) {
              this.$set(obj, 'code', obj.areaCode)
              this.$set(obj, 'name', obj.areaName)
            }
          })
        } else {
          Toast(resultMsg)
        }
      })
    },
    getSysCityList(provinceCode) {
      api.sysCityListApi({ provinceCode: provinceCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.result = data.data.list
          if (!this.result.length) {
            Toast('无数据')
            this.getSysProvinceList()
            this.progress = 'province'
            return
          }
          this.progress = 'city'
          this.result.map(obj => {
            if (obj.cityCode) {
              this.$set(obj, 'code', obj.cityCode)
              this.$set(obj, 'name', obj.cityName)
            }
          })
        } else {
          Toast(resultMsg)
        }
      })
    },
    getSysProvinceList() {
      api.sysProvinceListApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.result = data.data.list
          if (!this.result.length) {
            Toast('无数据')
            this.progress = ''
            return
          }
          this.progress = 'province'
          this.result.map(obj => {
            if (obj.provinceCode) {
              this.$set(obj, 'code', obj.provinceCode)
              this.$set(obj, 'name', obj.provinceName)
            }
          })
        } else {
          Toast(resultMsg)
        }
      })
    },
    getBankUnionNumberUrl() {
      api.getBankUnionNumberUrlApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankUnionNumberUrl = data.data.url
        } else {
          Toast(resultMsg)
        }
      })
    },
    getBankCardQuery() {
      api.bankCardQueryApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankCardInfo = data.data
        } else {
          Toast(resultMsg)
        }
      })
    },
    getServiceTel() {
      api.serviceTelApi({ type: '1' }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.serviceTel = data.data
        } else {
          Toast(resultMsg)
        }
      })
    },
    // 移动端遮挡input处理
    focusScroll() {
      if (browser.versions.android) {
        this.$refs.scrollRef.scrollTo(0, -220)
      }
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    },
    closeDialog() {
      this.showDialog = false
    }
  },
  computed: {
    filterResult() {
      let data = this.result.filter(value => new RegExp(this.searchVal, 'i').test(value.name))
      return data
    }
  },
  created() {
    this.getBankCardQuery()
    this.getBankUnionNumberUrl()
    this.getSysProvinceList()
    api.amountInfoApi().then(res => {
      if (res.data.resultCode === '1') {
        const data = res.data.data
        this.balance = data.banlance
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pageContainer {
  height: 100%;
  top: 0.44rem;
  font-size: $font-size-small-s;
  background-color: #efefef;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top {
      padding-top: 0.08rem;
      margin-bottom: 0.08rem;
      li {
        background-color: #fff;
        &:first-child {
          display: flex;
          padding: 0.16rem;
          @include border-bottom-1px(#eee);
          dl {
            display: flex;
            &:first-child {
              width: 1.4rem;
            }
            &:last-child {
              flex: 1;
            }
            dt {
              width: 0.21rem;
              height: 0.21rem;
              border-radius: 50%;
              margin-right: 0.08rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            dd {
              line-height: 0.23rem;
            }
          }
          .long_arrow {
            width: 0.63rem;
            height: 0.1rem;
            margin-right: 0.08rem;
            margin-top: 0.06rem;
            background-image: url('./image/long_arrow.png');
            background-size: 100% 100%;
          }
        }
        &:nth-of-type(2) {
          > div {
            display: flex;
            height: 0.5rem;
            margin-left: 0.16rem;
            padding-right: 0.16rem;
            line-height: 0.5rem;
            @include border-bottom-1px(#eee);
            input {
              flex: 1;
              display: inline-block;
              font-size: $font-size-small;
            }
            span {
              width: 0.16rem;
              color: $color-text;
            }
          }
        }
        &:nth-of-type(3) {
          > div {
            height: 0.32rem;
            margin-left: 0.16rem;
            padding-right: 0.16rem;
            line-height: 0.32rem;
            font-size: $font-size-small-ss;
            span {
              margin-right: 0.08rem;
              color: $color-text;
            }
            em {
              color: $color-button;
            }
            i {
              float: right;
              color: $color-button;
            }
          }
        }
      }
    }
    .mid {
      li {
        background-color: #fff;
        > div {
          padding: 0.16rem 0 0.16rem 0;
          margin-left: 0.16rem;
        }
        &:nth-of-type(1) {
          > div {
            @include border-bottom-1px(#eee);
            span {
              margin-right: 0.08rem;
              color: $color-text-s;
            }
          }
        }
        &:nth-of-type(2) {
          .top {
            position: relative;
            z-index: 99;
            height: 0.2rem;
            padding-top: 0;
            font-size: 0;
            /deep/ .mint-radiolist {
              overflow: hidden;
              font-size: 0;
              .mint-radiolist-title {
                display: inline-block;
                vertical-align: top;
                width: 0.53rem;
                margin: 0 0.24rem 0 0;
                font-size: $font-size-small-s;
              }
              .mint-cell {
                display: inline-block;
                vertical-align: top;
                margin-right: 0.32rem;
                min-height: 0;
                .mint-cell-wrapper {
                  padding: 0;
                  background-image: none;
                  font-size: $font-size-small-s;
                  .mint-radiolist-label {
                    padding: 0;
                  }
                  .mint-radio-core {
                    width: 14px;
                    height: 14px;
                    &:after {
                      width: 4px;
                      height: 4px;
                      top: 4px;
                      left: 4px;
                    }
                  }
                }
                &:last-child {
                  background-image: none;
                }
              }
            }
          }
          .btm {
            li {
              position: relative;
              width: 2.68rem;
              margin-left: 0.77rem;
              margin-top: 0.08rem;
              padding: 0.08rem;
              border-radius: 4px;
              background-color: #f2f2f2;
              color: $color-text-s;
              &:before {
                position: absolute;
                display: block;
                z-index: 0;
                width: 0;
                height: 0;
                content: ' ';
                top: -20px;
                border: 10px solid;
                border-bottom-color: #f2f2f2;
                border-top-color: #fff;
                border-left-color: #fff;
                border-right-color: #fff;
              }
              &:nth-of-type(1) {
                &:before {
                  left: 0.25rem;
                }
              }
              &:nth-of-type(2) {
                &:before {
                  left: 1.09rem;
                }
              }
              &.active {
                display: block;
              }
            }
          }
        }
      }
    }
    .bottom {
      margin: 0.08rem 0;
      background-color: #fff;
      li {
        height: 0.5rem;
        line-height: 0.5rem;
        &:first-child {
          > div {
            @include border-bottom-1px(#eee);
          }
        }
        > div {
          display: flex;
          padding: 0 0.16rem;
          font-size: $font-size-small-s;
          span {
            display: inline-block;
            width: 0.4rem;
            margin-right: 0.16rem;
            color: $color-text;
          }
          input {
            display: inline-block;
            flex: 1;
            line-height: 0.5rem;
            font-size: $font-size-small-s;
          }
          em {
            display: inline-block;
            width: 0.27rem;
            height: 0.3rem;
            margin-top: 0.1rem;
            background: url('./image/more.png') no-repeat center center;
            background-size: 0.09rem 0.15rem;
          }
        }
        &:last-child {
          height: auto;
          padding: 0.08rem 0;
          line-height: 1;
          font-size: $font-size-small-ss;
          div {
            display: block;
            height: auto;
            border-bottom: none;
            span {
              width: auto;
              margin-right: 0;
              color: $color-text-s;
            }
            a {
              color: $color-button;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .tip {
      padding: 0.16rem;
      font-size: $font-size-small-s;
      color: $color-text-s;
      div {
        margin-bottom: 0.08rem;
      }
      button {
        width: 100%;
        height: 0.44rem;
        margin-top: 0.24rem;
        background-color: $color-button;
        color: #fff;
        font-size: $font-size-small;
        border-radius: 0.04rem;
      }
    }
    .mat {
      height: 300px;
    }
  }
  .select_bank {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    /deep/ .mint-searchbar {
      margin-top: 0.44rem;
      padding: 0.08rem 0.1rem;
      .mint-searchbar-inner {
        height: 0.28rem;
        padding: 0.04rem 0.06rem;
        .mintui-search {
          font-size: 0.12rem;
        }
        .mint-searchbar-core {
          font-size: 0.13rem;
        }
      }
    }
    /deep/ .mint-search-list {
      padding-top: 0.88rem;
      .mint-cell-value {
        display: none;
      }
    }
  }
  .dialog-content {
    color: $color-text-s;
    text-align: center;
    font-size: 0.13rem;
    margin: 0 0.2rem 0.2rem 0.2rem;
    line-height: 1.5;
  }
}
</style>
