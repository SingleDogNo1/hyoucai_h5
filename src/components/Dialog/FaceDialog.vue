<template>
  <div id="face-dialog" v-if="showDialog">
    <div class="dialog-wrapper">
      <div>
        <img class="photo" :src="imgData" alt="" />
      </div>
      <img src="./close-ewm.png" class="close" @click="closeItem" />
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
    imgData: {
      // 要显示的数据
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
//@import '../../assets/css/const.scss';
//@import '../../assets/css/mixin.scss';

#face-dialog {
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
    width: 2.85rem;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    div {
      width: 100%;
      height: 1.77rem;
      background: #fff;
      border-radius: 0.04rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:first-child {
        margin-bottom: 0.08rem;
      }
      img {
        width: 1.14rem;
      }
    }
    .close {
      display: block;
      width: 0.44rem;
      height: 0.44rem;
      margin: 0.4rem auto 0;
    }
  }
}
</style>
