<template>
  <div class="open-account">
    <div class="form">
      <div class="row">
        <input type="text" placeholder="请输入姓名" v-model="name">
      </div>
      <div class="row">
        <input type="text" placeholder="请输入身份证号" v-model="idCard" maxlength="18">
      </div>
      <div class="row">
        <input type="tel" placeholder="请输入银行预留手机号" maxlength="11" v-model="mobile" :disabled="mobileDisable">
        <p @click="toSupportBank">查看可用银行卡列表</p>
      </div>
    </div>
    <p class="agreements">
      <template v-for="(agreement,index) in agreements">
        <div :key="index">
          <input type="checkbox" id="isCheck" v-model="agree" v-if="agreement.checkBox">
          <label for="isCheck" v-if="agreement.checkBox"></label>
          <span v-for="(item,index) in agreement.list" :key="index">
              {{item.description1}}<a :href="item.showUrl" class="agreement">{{item.name}}</a>{{item.description2}}
            </span>
        </div>
      </template>
    </p>
    <div class="btn" key="unselected" v-if="!continueFlag">确认</div>
    <div class="btn on" key="selected" v-if="continueFlag" @click="submit">确认</div>
    <dl>
      <dd>温馨提示</dd>
      <dt>请保持所填信息与本人身份证信息一致，否则将开户失败。</dt>
    </dl>
  </div>
</template>

<script>
import { userInfoAuth, queryAgreementCatalog, getBasicInfo } from '@/api/common/user'
import { Toast } from 'mint-ui'
import { AppToast } from '@/assets/js/Toast'
import Hyoucai from '@/assets/js/hyoucai'
import { isChName, isIdcard } from '@/assets/js/regular'
import { JumpJX } from '@/assets/js/utils'

export default {
  name: '',
  data() {
    return {
      agree: true,
      idType: '01',
      idNo: '',
      name: '',
      idCard: '',
      mobile: '',
      agreements: [],
      mobileDisable: false // 银行预留手机号是否禁用
    }
  },
  computed: {
    retUrl() {
      return Hyoucai.getRetBaseURL() + '/open-account'
    },
    continueFlag() {
      return this.name && this.mobile && this.idCard && this.agree
    }
  },
  methods: {
    // 6216912104561546
    // 140181199303273213
    toSupportBank() {
      this.$router.push({ name: 'supportBanks' })
    },
    submit() {
      if (!this.name) {
        AppToast.empty('name')
        return false
      }
      if (!isChName(this.name)) {
        AppToast.direct('chineseName')
        return false
      }
      if (!this.idCard) {
        AppToast.empty('idCardNum')
        return false
      }
      if (this.idCard < 18) {
        AppToast.short('idCardNum', 18)
        return false
      }
      if (!isIdcard(this.idCard)) {
        AppToast.direct('idCardErr')
        return false
      }
      if (!this.mobile) {
        AppToast.empty('reservedMobile')
        return false
      }
      if (this.mobile.length < 11) {
        AppToast.short('mobile', 11)
        return false
      }
      if (this.mobile.length > 11) {
        AppToast.overstep('mobile', 11)
        return false
      }
      if (!this.agree) {
        AppToast.direct('needAgreement')
        return false
      }

      userInfoAuth({
        name: this.name,
        mobile: this.mobile,
        identityNo: this.idCard
      }).then(res => {
        // 性别
        let gender = res.data.data.gender
        if (res.data.data.isSuccess === '1') {
          JumpJX('escrow/accountOpenEncryptPage', {
            name: this.name,
            mobile: this.mobile,
            retUrl: this.retUrl,
            gender: gender
          })
        } else {
          Toast(res.data.data.message)
        }
      })
    }
  },
  created() {
    queryAgreementCatalog({ type: 'KH' }).then(res => {
      if (res.data.resultCode === '1') {
        this.agreements = res.data.data.result
      } else {
        Toast(res.data.resultMsg)
      }
    })
    getBasicInfo().then(res => {
      // 银行预留手机号
      this.mobile = res.data.data.mobile
      // 手机号是否能编辑
      this.mobileDisable = res.data.data.isMobileEdit === '0'
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.form {
  margin-top: 0.08rem;
  background: #fff;
  padding-left: 0.15rem;
  .row {
    height: 0.5rem;
    line-height: 0.5rem;
    padding-right: 0.15rem;
    border-bottom: 0.01rem solid #eeeeee;
    display: flex;
    input {
      flex: 1;
      width: 100%;
    }
    p {
      font-size: 0.13rem;
      color: $color-button;
    }
    div {
      font-size: 0.13rem;
      color: $color-text;
      display: flex;
      align-items: center;
      flex: 1;
      span {
        width: 0.88rem;
        height: 0.32rem;
        line-height: calc(0.32rem - 2px);
        text-align: center;
        border: 1px solid $color-button;
        border-radius: 100px;
        color: $color-button;
        &:first-child {
          margin-right: 0.08rem;
        }
        &.on {
          background: $color-button;
          color: #ffffff;
        }
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.agreements {
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

.btn {
  margin: 0.32rem 0.15rem 0 0.15rem;
  width: 3.45rem;
  font-size: $font-size-small;
  border-radius: 0.04rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  background: $color-placeholder;
  color: #ffffff;
  &.on {
    background: $color-button;
  }
}

dl {
  margin: 0.32rem auto 0;
  width: 3.45rem;
  font-size: $font-size-small-s;
  color: $color-text-s;
  dd {
    margin-bottom: 0.08rem;
  }
  dt {
    line-height: 1.5;
  }
}
</style>
