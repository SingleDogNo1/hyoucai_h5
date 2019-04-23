<template>
  <div class="pwd-container">
    <div class="form">
      <div class="row">
        <span class="title">收货人</span>
        <span class="text"><input type="text" placeholder="姓名" v-model="consigneeName"/></span>
      </div>
      <div class="row">
        <span class="title">联系电话</span>
        <span class="text"><input type="tel" placeholder="11位手机号" v-model="consigneePhone" maxlength="11"/></span>
      </div>
      <div class="row">
        <span class="text"><textarea rows="2" placeholder="详细地址（例：街道/小区/门牌号）" v-model="address"></textarea></span>
      </div>
    </div>
    <div class="btn-area" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { queryMailingAddress, saveMailingAddress } from '@/api/common/mine'
import { mapGetters } from 'vuex'
import { Toast, Indicator } from 'mint-ui'

export default {
  name: 'modifyPWD',
  data() {
    return {
      consigneeName: '',
      consigneePhone: '',
      address: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    saveAddress() {
      Indicator.open()
      saveMailingAddress({
        userName: this.user.nickname,
        consigneeName: this.consigneeName,
        consigneePhone: this.consigneePhone,
        address: this.address
      }).then(res => {
        Indicator.close()
        if (res.data.resultCode === '1') {
          Toast('地址保存成功')
          window.setTimeout(() => {
            this.$router.go(-1)
          }, 3000)
        } else {
          Toast(res.data.resultMsg)
        }
      })
    }
  },
  created() {
    Indicator.open()
    queryMailingAddress({ userName: this.user.nickname }).then(res => {
      Indicator.close()
      if (res.data.resultCode === '1') {
        this.address = res.data.data.address
        this.consigneeName = res.data.data.consigneeName
        this.consigneePhone = res.data.data.consigneePhone
      }
    })
  }
}
</script>

<style scoped lang="scss">
.pwd-container {
  font-size: 0.15rem;
  height: 100%;
  background: #f9f9f9;
  padding-top: 0.1rem;
  .form {
    background: #fff;
    padding-left: 0.15rem;
    .row {
      padding-right: 0.15rem;
      display: flex;
      justify-content: space-between;
      /*height: 0.5rem;*/
      line-height: 0.5rem;
      font-size: 0.15rem;
      border-bottom: 0.01rem solid #e8e8e8;
      .title {
        padding: 0 0.15rem 0 0;
        flex: 1;
      }
      .text {
        flex: 3;
        input {
          width: 100%;
          height: 100%;
          font-size: 0.15rem;
          &::placeholder {
            color: #cccccc;
          }
        }
        textarea {
          width: 100%;
          height: 100%;
          font-size: 0.15rem;
          line-height: 0.35rem;
          &::placeholder {
            color: #cccccc;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .btn-area {
    width: 0.5rem;
    position: fixed;
    right: 0;
    top: 0.12rem;
    color: red;
    text-align: center;
  }
}
</style>
