<template>
    <div class="setting-container">
      <div class="form">
        <div class="row">
          <span>手机号</span>
          <span>186****4327</span>
        </div>
        <div class="row" @click="$router.push({name:'loginPassword'})">
          <span>修改登录密码</span>
          <span class="suffix"></span>
        </div>
        <div class="row" @click="$router.push({name:'receiveAddress'})">
          <span>收货地址管理</span>
          <span class="suffix"></span>
        </div>
      </div>
      <div class="btn">
        <button>退出登录</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
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
}
</style>
