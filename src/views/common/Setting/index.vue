<template>
  <div class="setting-container">
    <div class="form">
      <div class="row">
        <span>手机号</span>
        <span>{{ user.mobile | secret }}</span>
      </div>
      <div class="row" @click="$router.push({ name: 'loginPassword' })">
        <span>修改登录密码</span>
        <span class="suffix"></span>
      </div>
      <div class="row" @click="$router.push({ name: 'receiveAddress' })">
        <span>收货地址管理</span>
        <span class="suffix"></span>
      </div>
    </div>
    <div class="btn">
      <button @click="toLogout">退出登录</button>
    </div>
    <Confirm :show.sync="showDialog" :onConfirm="doLogout" title="温馨提示" confirmText="确认">
      您确认要退出登录？
    </Confirm>
    <div class="download" v-if="showDownload">
      <span><img src="./close.png" alt="" @click="closeDownload" />如需要查看资产详情，请下载官方App</span>
      <input type="button" value="下载App" @click="$router.push({ name: 'AppDownload' })" />
    </div>
  </div>
</template>

<script>
import { userLogout } from '@/api/common/mine'
import { mapGetters, mapActions } from 'vuex'
import Confirm from '@/components/Dialog/Confirm'
export default {
  name: 'index',
  data() {
    return {
      showDialog: false,
      showDownload: true
    }
  },
  components: { Confirm },
  computed: {
    ...mapGetters(['user', 'platform'])
  },
  methods: {
    toLogout() {
      this.showDialog = true
    },
    doLogout() {
      userLogout({ userName: this.user.nickname, logoutFrom: 'h5' }).then(res => {
        if (res.data.resultCode === '1') {
          this.$router.push({ name: this.platform === 'djs' ? 'DJSHomePage' : 'HYCHomePage' })
          this.logout()
        }
      })
    },
    closeDownload() {
      this.showDownload = false
      this.$refs.scrollRef.refresh()
    },
    ...mapActions(['logout'])
  },
  filters: {
    secret(mobile) {
      return mobile ? mobile.substr(0, 3) + '****' + mobile.substr(7) : ''
    }
  }
}
</script>

<style scoped lang="scss">
.setting-container {
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
      &:last-child {
        border-bottom: none;
      }
      .suffix:after {
        content: '';
        display: inline-block;
        background: url(./more.png);
        width: 0.057rem;
        height: 0.114rem;
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
  }
  .btn {
    height: 0.53rem;
    margin-top: 0.54rem;
    text-align: center;
    button {
      width: 100%;
      height: 100%;
      background: #fff;
      font-size: 0.15rem;
    }
  }
  .download {
    display: flex;
    align-items: center;
    height: 0.52rem;
    padding: 0 0.15rem;
    justify-content: space-between;
    position: fixed;
    bottom: 0.1rem;
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
      margin-left: 0.1rem;
    }
  }
}
</style>
