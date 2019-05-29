<template>
  <div class="pwd-container">
    <div class="form">
      <div class="row">
        <!--<span class="title">原密码</span>-->
        <span class="text"><input type="password" v-model="oldPWD" placeholder="原密码"/></span>
      </div>
      <div class="row">
       <!-- <span class="title">新密码</span>-->
        <span class="text"><input type="password" v-model="newPWD" placeholder="新密码" /></span>
      </div>
      <div class="row">
        <!--<span class="title">确认密码</span>-->
        <span class="text"><input type="password" v-model="confirmPWD" placeholder="确认密码" /></span>
      </div>
    </div>
    <div class="btn">
      <button @click="updatePWD" :disabled="oldPWD.trim() === '' || newPWD.trim() === '' || confirmPWD.trim() === ''">确认</button>
    </div>
  </div>
</template>

<script>
import { updateUserPsw } from '@/api/common/mine'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { isPassword } from '@/assets/js/regular'

export default {
  name: 'modifyPWD',
  data() {
    return {
      oldPWD: '',
      newPWD: '',
      confirmPWD: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    updatePWD() {
      if (!isPassword(this.newPWD)) {
        Toast('输入8-20位数字和英文组合')
        return false
      }
      if (this.newPWD !== this.confirmPWD) {
        Toast('两次密码输入不一致，请重新输入')
        return false
      }
      updateUserPsw({
        userName: this.user.userName,
        oldPassWord: this.oldPWD,
        newPassWord: this.confirmPWD
      }).then(res => {
        if (res.data.resultCode === '1') {
          Toast('修改成功')
          window.setTimeout(() => {
            this.$router.go(-1)
          }, 3000)
        } else {
          Toast(res.data.resultMsg)
        }
      })
    }
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
      height: 0.5rem;
      line-height: 0.5rem;
      border-bottom: 0.01rem solid #e8e8e8;
      /*.title {
        padding: 0 0.15rem 0 0;
        color: #ccc;
      }*/
      .text {
        flex: 1;
        input {
          width: 100%;
          height: 100%;
          font-size: 0.15rem;
          /*text-align: right;*/
        }
        &:-webkit-input-placeholder {
          color: #ccc;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .btn {
    margin-top: 0.4rem;
    height: 0.42rem;
    text-align: center;
    button {
      color: #fff;
      width: 3.45rem;
      height: 100%;
      background: #ec5e52;
      border-radius: 4px;
      font-size: 0.15rem;
      &:disabled {
        background: #ccc;
      }
    }
  }
}
</style>
