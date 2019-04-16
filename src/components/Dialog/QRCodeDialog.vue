<template>
  <div id="QRCodeDialog" v-if="showDialog">
    <div class="dialog-wrapper">
      <div class="qrcode-inner">
        <img :src="QRCode" alt="" />
        <p>
          邀请好友扫描上方二维码；<br />
          扫描成功后，好友在打开的页面中完成注册出借，即可获得奖励。
        </p>
      </div>
      <div class="qrcode-close" @click="closeItem"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QRCodeDialog',
  data() {
    return {}
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    QRCode: {
      type: String,
      required: true
    }
  },
  methods: {
    closeItem() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/css/const.scss';
// @import '../../assets/css/mixin.scss';

#QRCodeDialog {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .dialog-wrapper {
    width: 2.6rem;
    height: 4.07rem;
    margin: 0 auto;
    position: relative;
    .qrcode-inner {
      padding: 0.15rem;
      background: #ffffff;
      img {
        width: 100%;
        margin-bottom: 0.08rem;
      }
      p {
        font-size: 0.13rem;
        color: #999;
      }
    }
    .qrcode-close {
      width: 0.44rem;
      height: 0.44rem;
      background: url('./close-ewm.png') 0 / contain;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
    }
  }
}
</style>
