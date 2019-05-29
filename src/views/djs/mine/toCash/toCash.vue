<template>
  <div class="pageContainer" ref="container">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <dl class="top">
          <dt><img :src="bankCardInfo.iconUrl" alt="" /></dt>
          <dd>{{ bankCardInfo.bankName }}({{ bankCardInfo.cardNo.slice(bankCardInfo.cardNo.length - 4) }})</dd>
        </dl>
        <div class="amount-wrapper">
          <div class="brand">
            <span>姓名</span> <em>{{ bankCardInfo.accountName }}</em>
          </div>
          <div class="input-wrapper">
            <div>¥</div>
            <div><input ref="amountRef" placeholder="0.00" type="text" @input="amountInput" /></div>
            <mt-checklist class="all" align="right" v-model="all" :options="options"> </mt-checklist>
          </div>
        </div>
        <div class="mid">
          <span>可提现余额</span> <em>{{ balance }}元</em>
        </div>
        <ul class="bottom">
          <li>
            <div class="border-bottom-1px">
              <span>开户地区</span>
              <input placeholder="请选择开户地区" ref="cardBankCnapsInput" @focus="focusScroll" type="text" v-model="areaName" />
              <em @click="showProvince"></em>
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>开户网点</span>
              <input placeholder="请选择开户网点" ref="cardBankCnapsInput" @focus="focusScroll" type="text" v-model="bankName" />
              <em @click="showBank"></em>
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>手机号</span>
              <input
                class="phone-input"
                placeholder="请输入手机号"
                ref="cardBankCnapsInput"
                @focus="focusScroll"
                type="number"
                disabled
                v-model="bankCardInfo.mobile"
              />
            </div>
          </li>
          <li>
            <div class="border-bottom-1px">
              <span>验证</span>
              <input placeholder="请输入验证码" ref="cardBankCnapsInput" @focus="focusScroll" type="number" />
              <div class="sms-wrapper"><sms-btn text="获取验证码" @getSMSCode="getSmsCode"></sms-btn></div>
            </div>
          </li>
        </ul>
        <div class="tip">
          <div class="no1-card">
            <p>为了您的账户提现快速到账，请您绑定一类卡</p>
            <div><a href="https://mp.weixin.qq.com/s/AGl5G7v0Z8UvMfLtDGQaMg">点击了解何为一类卡></a></div>
          </div>
          <div class="title">温馨提示</div>
          <p>
            在你申请提现前，请先在页面下方或“基本信息”账户信息页面绑定银行卡收到你的体现请求后，我们将在1个工作日（双休日或法定节假日顺延）处理你的提现申请，请你注意查收为保障你的账户资金安全，申请提现时，你选择的银行卡开户名必须与你汇有财网账户实名认证一致否则体现申请将不予受理。
          </p>
        </div>
        <div class="btn-wrapper">
          <button @click="withDraw">确认提现</button>
        </div>
      </div>
    </b-scroll>
    <div class="select_bank" v-show="showSelector">
      <mt-header :title="selectorTitle" class="is-fixed">
        <mt-button icon="back" slot="left" @click="clickBackArrow"></mt-button>
      </mt-header>
      <mt-search v-model="searchVal" :show="true" :result.sync="filterResult">
        <mt-cell v-for="(item, index) in filterResult" :key="index" :title="item.name" :value="item.code" @click.native="selectItem(item)"> </mt-cell>
      </mt-search>
    </div>
    <app-dialog :show.sync="showDialog" class="to-cash-dialog">
      <div>{{ dialogDis }}</div>
    </app-dialog>
  </div>
</template>

<script>
import {
  bankCardQueryApi,
  sysProvinceListApi,
  sysCityListApi,
  sysBankAreaListApi,
  sysBranceBankListApi,
  amountInfoApi,
  getSmsCode,
  toCashApply
} from '@/api/djs/mine/toCash'
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import AppDialog from '@/components/Dialog/Alert'
import { browser } from '@/assets/js/utils'
import SmsBtn from '@/components/smsBtn/index'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'

const ERR_OK = '1'
export default {
  components: {
    BScroll,
    SmsBtn,
    AppDialog
  },
  data() {
    return {
      options: [
        {
          label: '全部',
          value: '0'
        }
      ],
      all: [],
      amount: null,
      largeAmountFlag: false,
      balance: 2309480230,
      fee: '0.00', // 手续费
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
      selectorTitle: '选择银行开户地址',
      showSelector: false,
      searchVal: '',
      progress: 'province', // 联行号选择步骤
      result: [], // 联行号结果
      provinceCode: '',
      cityCode: '',
      areaCode: '',
      areaName: '', // 选择的区域
      bankName: '', // 选择的银行
      userName: getUser().userName,
      authorization: getAuth(),
      showDialog: false,
      showCountDown: false,
      countDown: 60,
      smsCode: '',
      dialogDis: '我们将在1个工作日内处理您的提现申请，请您耐心等候。'
    }
  },
  watch: {
    all(val) {
      if (val.length) {
        this.$refs.amountRef.value = this.balance
        this.amount = this.balance
      } else {
        this.$refs.amountRef.value = '0.00'
        this.amount = 0
      }
    }
  },
  methods: {
    selectItem(item) {
      if (item.provinceCode) {
        this.provinceCode = item.provinceCode
        this.areaName = ''
        this.areaName = `${item.provinceName}`
        this.getSysCityList(item.provinceCode)
      }
      if (item.cityCode) {
        this.cityCode = item.cityCode
        if (this.areaName.includes('/') && this.areaName.split('/').length) {
          this.areaName = this.areaName.split('/')[0].toString()
        }
        this.areaName = `${this.areaName}/${item.cityName}`
        this.getSysBankAreaList(item.cityCode)
      }
      if (item.areaCode) {
        this.areaCode = item.areaCode
        if (this.areaName.includes('/') && this.areaName.split('/').length) {
          this.areaName = `${this.areaName.split('/')[0]}/${this.areaName.split('/')[1]}`
        }
        this.areaName = `${this.areaName}/${item.areaName}`
        this.bankName = ''
        this.cardBankCnaps = ''
        this.getSysBranceBankList(item.areaCode, this.bankCardInfo.bankNo, this.serachVal)
        this.showSelector = false
      }
      if (item.bankNum) {
        this.cardBankCnaps = item.bankNum
        this.bankName = item.bankName
        this.showSelector = false
      }
    },
    getSmsCode() {
      this.smsCode = ''
      if (!this.amount) {
        Toast('输入提现金额！')
        return
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        Toast('输入金额不能大于可提现余额，请重新输入！')
        return
      }

      if (!this.cardBankCnaps || this.cardBankCnaps.length != 12) {
        Toast('输入正确的联行号！')
        return
      }
      let data = {
        userName: this.userName,
        mobileNo: this.bankCardInfo.mobile,
        authorization: getAuth()
      }
      this.showCountDown = true
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
      }
      this.timeInterval = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          this.showCountDown = false
          this.countDown = 60
          clearInterval(this.timeInterval)
        }
      }, 1000)
      getSmsCode(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          Toast('短信发送成功！')
        }
      })
    },
    withDraw() {
      if (!this.amount) {
        Toast('输入提现金额！')
        return
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        Toast('输入金额不能大于可提现余额，请重新输入！')
        return
      }
      if (!this.cardBankCnaps || this.cardBankCnaps.length !== 12) {
        Toast('请输入正确的联行号！')
        return
      }
      if (!this.smsCode) {
        Toast('请输入验证码！')
        return
      }

      let data = {
        userName: this.userName,
        bankCardId: this.bankCardInfo.id,
        amount: this.amount,
        identifyCode: this.smsCode,
        province: this.provinceCode,
        city: this.cityCode,
        area: this.areaCode,
        openBankCode: this.cardBankCnaps,
        authorization: getAuth()
      }
      toCashApply(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === ERR_OK) {
          this.showDialog = true
          this.dialogDis = '我们将在1个工作日内处理您的提现申请，请您耐心等候。'
          setTimeout(() => {
            this.$router.push({ name: 'overview' })
          }, 1000)
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
      sysBranceBankListApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === ERR_OK) {
          this.result = data.list
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
      sysBankAreaListApi({ cityCode: cityCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === ERR_OK) {
          this.result = data.list
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
      sysCityListApi({ provinceCode: provinceCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === ERR_OK) {
          this.result = data.list
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
      sysProvinceListApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === ERR_OK) {
          this.result = data.list
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
    clickBackArrow() {
      if (this.progress === 'province') {
        this.showSelector = false
        this.progress = 'province'
      }
      if (this.progress === 'city') {
        this.getSysProvinceList()
        this.progress = 'city'
      }
      if (this.progress === 'area') {
        this.getSysCityList(this.provinceCode)
        this.progress = 'area'
      }
      if (this.progress === 'bank') {
        this.showSelector = false
        this.progress = 'bank'
      }
    },
    showProvince() {
      this.showSelector = true
      this.selectorTitle = '选择银行开户地区'
      if (this.progress === 'province') {
        this.getSysProvinceList()
      }
      if (this.progress === 'area' || this.progress === 'bank') {
        this.getSysBankAreaList(this.cityCode)
      }
    },
    showBank() {
      if (!this.areaCode) {
        Toast('请先选择开户地区！')
        return false
      }
      this.showSelector = true
      this.progress = 'bank'
      this.getSysBranceBankList(this.areaCode, this.bankCardInfo.bankNo, this.serachVal)
      this.selectorTitle = '选择开户行网点名称'
    },
    getBankCardQuery() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      bankCardQueryApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        if (resultCode === ERR_OK) {
          this.bankCardInfo = data.list[0]
          if (this.bankCardInfo.openBankCode) {
            this.cardBankCnaps = this.bankCardInfo.openBankCode
            this.bankName = this.bankCardInfo.openBank
            this.provinceCode = this.bankCardInfo.province
            this.cityCode = this.bankCardInfo.city
            this.areaCode = this.bankCardInfo.area
            sysProvinceListApi()
              .then(res => {
                let data = res.data
                let resultCode = data.resultCode
                let resultMsg = data.resultMsg
                if (resultCode === ERR_OK) {
                  if (!data.list.length) {
                    Toast('无数据')
                    return
                  }
                  data.list.map(obj => {
                    if (obj.provinceCode) {
                      if (obj.provinceCode === this.provinceCode) {
                        this.areaName = `${obj.provinceName}`
                      }
                    }
                  })
                } else {
                  Toast(resultMsg)
                }
              })
              .then(() => {
                sysCityListApi({ provinceCode: this.provinceCode })
                  .then(res => {
                    let data = res.data
                    let resultCode = data.resultCode
                    let resultMsg = data.resultMsg
                    if (resultCode === ERR_OK) {
                      if (!data.list.length) {
                        Toast('无数据')
                        return
                      }
                      data.list.map(obj => {
                        if (obj.cityCode) {
                          if (obj.cityCode === this.cityCode) {
                            this.areaName = `${this.areaName}/${obj.cityName}`
                          }
                        }
                      })
                    } else {
                      Toast(resultMsg)
                    }
                  })
                  .then(() => {
                    sysBankAreaListApi({ cityCode: this.cityCode }).then(res => {
                      let data = res.data
                      let resultCode = data.resultCode
                      let resultMsg = data.resultMsg
                      if (resultCode === ERR_OK) {
                        if (!data.list.length) {
                          Toast('无数据')
                          return
                        }
                        data.list.map(obj => {
                          if (obj.areaCode) {
                            if (obj.areaCode === this.areaCode) {
                              this.areaName = `${this.areaName}/${obj.areaName}`
                            }
                          }
                        })
                      } else {
                        Toast(resultMsg)
                      }
                    })
                  })
              })
          }
        }
      })
    },
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
      if (e.target.value > parseFloat(this.balance)) {
        e.target.value = parseFloat(this.balance)
        Toast('输入金额不能大于可提现余额!')
      }
      this.amount = parseFloat(e.target.value)
    },
    focusScroll() {
      if (browser.versions.android) {
        this.$refs.scrollRef.scrollTo(0, -220)
      }
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
    this.getSysProvinceList()
    amountInfoApi().then(res => {
      if (res.data.resultCode === ERR_OK) {
        const data = res.data
        this.balance = data.banlance
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
@import '../../../../assets/css/mixins.scss';
.pageContainer {
  height: 100%;
  top: 0.44rem;
  font-size: $font-size-small-s;
  background-color: #efefef;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
      padding-top: 0.1rem;
    }
    .top {
      box-sizing: border-box;
      display: flex;
      height: 0.4rem;
      line-height: 0.25rem;
      margin: 0 0 0.1rem;
      padding-top: 0.08rem;
      padding-left: 0.16rem;
      background-color: #fff;
      dt {
        width: 0.24rem;
        height: 0.24rem;
        margin-right: 0.1rem;
      }
      dd {
        flex: 1;
        font-size: 0.14rem;
      }
    }
    .amount-wrapper {
      padding: 0.16rem 0.16rem 0.24rem;
      background-color: #fff;
      .brand {
        margin-bottom: 0.4rem;
        color: $color-text-s;
        font-size: $font-size-small;
        span {
          margin-right: 0.1rem;
        }
      }
      .input-wrapper {
        overflow: hidden;
        line-height: 0.3rem;
        div {
          float: left;
          input {
            font-size: 0.28rem;
          }
          &:first-child {
            width: 0.15rem;
            line-height: 0.4rem;
            margin-right: 0.13rem;
            color: $color-text-b;
            font-size: 0.28rem;
          }
          &:nth-of-type(2) {
            width: 2.5rem;
          }
          &.all {
            width: 0.65rem;
            padding-top: 0.03rem;
            /deep/ .mint-checklist-title {
              margin: 0;
            }
            /deep/ .mint-cell {
              background-image: none;
              min-height: auto;
            }
            /deep/ .mint-cell-wrapper {
              padding: 0;
              background-image: none;
              line-height: inherit;
              .mint-checklist-label {
                padding: 0;
                .mint-checkbox {
                  .mint-checkbox-input:checked + .mint-checkbox-core {
                    background-color: $color-button;
                    border-color: $color-button;
                  }
                  .mint-checkbox-core::after {
                    left: 7px;
                  }
                }
                .mint-checkbox-label {
                  font-size: 0.14rem;
                  color: $color-text-s;
                }
              }
            }
          }
        }
        /*span {
          display: inline-block;

        }
        .all {
          width: 0.5rem;
        }
        input {
          flex: 1;
          font-size: 0.28rem;
        }*/
      }
    }
    .mid {
      height: 0.35rem;
      line-height: 0.35rem;
      padding: 0 0.16rem;
      margin-bottom: 0.1rem;
      color: $color-text-s;
      font-size: $font-size-small;
      span {
        margin-right: 0.15rem;
      }
      em {
        color: $color-button;
      }
    }
    .bottom {
      margin: 0.08rem 0;
      background-color: #fff;
      li {
        height: 0.5rem;
        line-height: 0.5rem;
        > div {
          display: flex;
          padding: 0 0.16rem 0 0;
          margin-left: 0.16rem;
          font-size: $font-size-small-s;
          @include border-bottom-1px(#eee);
          span {
            display: inline-block;
            width: 0.6rem;
            margin-right: 0.16rem;
            color: $color-text;
          }
          input {
            display: inline-block;
            flex: 1;
            line-height: 0.5rem;
            font-size: $font-size-small-s;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            &.phone-input {
              text-align: right;
            }
            &:disabled {
              color: $color-text-s;
            }
          }
          em {
            display: inline-block;
            width: 0.07rem;
            height: 0.3rem;
            padding-left: 0.2rem;
            margin-top: 0.1rem;
            background: url('./image/more.png') no-repeat right center;
            background-size: 0.09rem 0.15rem;
          }
        }
        &:last-child {
          div {
            &.sms-wrapper {
              width: 1.1rem;
              height: 0.28rem;
              margin-top: 0.1rem;
              border-radius: 0.04rem;
              background-color: $color-button;
              /deep/ .btnArea {
                line-height: 0.28rem;
                input {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .tip {
      padding: 0.07rem 0.16rem;
      @include border-bottom-1px(#eee);
      font-size: $font-size-small-s;
      color: $color-text-s;
      .no1-card {
        margin-bottom: 0.14rem;
        font-size: $font-size-small-s;
        p {
          color: $color-button;
        }
        div {
          a {
            color: #f78458;
          }
        }
      }
      .title {
        margin-bottom: 0.08rem;
      }
    }
    .btn-wrapper {
      padding: 0.07rem 0.15rem;
      background-color: #fff;
      button {
        width: 100%;
        height: 0.44rem;
        background-color: $color-button;
        color: #fff;
        font-size: $font-size-small;
        border-radius: 0.04rem;
      }
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
      background-color: #f2f2f2;
      .mint-searchbar-inner {
        height: 0.36rem;
        padding: 0.04rem 0.06rem;
        border-radius: 1000px;
        border: 1px solid #979797;
        .mintui-search {
          display: none;
        }
        .mint-searchbar-core {
          font-size: 0.13rem;
          padding: 0 0.1rem;
        }
      }
      .mint-searchbar-cancel {
        display: none;
      }
    }
    /deep/ .mint-search-list {
      padding-top: 1rem;
      .mint-cell-text {
        line-height: 0.25rem;
      }
      .mint-cell-value {
        display: none;
      }
    }
  }
}
</style>
