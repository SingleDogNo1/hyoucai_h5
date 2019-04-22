<template>
  <div class="Dialog" v-if="show">
    <div class="inner">
      <div v-if="showCloseBtn" class="close" @click="closeDialog"><i class="iconfont icon-guanbi"></i></div>
      <header v-if="showTitle">{{ title }}</header>
      <section>
        <slot></slot>
      </section>
      <button @click="confirmItem">{{ confirmText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  mixins: [],
  props: {
    // 是否显示弹框
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示右上角的关闭按钮
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    // 标题文字
    title: {
      type: String,
      default: '汇有财温馨提示'
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 按钮文字
    confirmText: {
      type: String,
      default: '确定'
    },
    // 点击确定执行的函数
    onConfirm: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 存在异常状态时点击确认，阻止触发关闭弹窗
    preventClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false)
    },
    confirmItem() {
      this.onConfirm()
      if (!this.preventClose) {
        this.closeDialog()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/theme';
@import '../../assets/css/mixins';

.Dialog {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.15rem;
    padding: 0.44rem 0.2rem 0.2rem;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.04rem;
    .close {
      position: absolute;
      right: 0.05rem;
      top: 0.05rem;
      padding: 0.03rem;
      line-height: 0.15rem;
      text-align: center;
      font-size: 18px;
    }
    header {
      font-size: 0.17rem;
      color: #333;
      text-align: center;
      line-height: 0.24rem;
      margin-bottom: 0.36rem;
      font-weight: bold;
    }
    section {
      margin-bottom: 0.3rem;
      font-size: 0.13rem;
      text-align: center;
    }
    button {
      @include cube(2.75rem, 0.4rem);
      border-radius: 0.04rem;
      font-size: 0.16rem;
      color: #ffffff;
      background: #ec5e52;
    }
  }
}
</style>
