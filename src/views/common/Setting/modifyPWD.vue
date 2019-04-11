<template>
  <div class="pwd-container">
    <div class="form">
      <div class="row">
        <span class="title">原密码</span>
        <span class="text"><input type="password"></span>
      </div>
      <div class="row">
        <span class="title">新密码</span>
        <span class="text"><input type="password"></span>
      </div>
      <div class="row">
        <span class="title">确认密码</span>
        <span class="text"><input type="password"></span>
      </div>
    </div>
    <div class="btn">
      <button>确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modifyPWD'
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
      .title {
        padding: 0 0.15rem 0 0;
        color: #ccc;
      }
      .text {
        flex: 1;
        input {
          width: 100%;
          height: 100%;
          text-align: right;
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
    }
  }
}
</style>
