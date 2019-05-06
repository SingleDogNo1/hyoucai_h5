<template>
  <div class="Dialog" v-if="show">
    <div class="inner">
      <div class="dlg">
        <header>服务</header>
        <div v-if="showCloseBtn" class="close" @click="closeDialog">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
      <section>
        <div class="content_01 content">
          <a href="javascript:;">利息分配计划</a>
          <p>投资当日开始生息，次日入账，投资当日开始生息，次日入账</p>
        </div>
        <div class="content_02 content">
          <a href="javascript:;">费用说明</a>
          <p>无费用</p>
        </div>
        <div class="content_03 content">
          <a href="javascript:;">退出机制</a>
          <p>每月结息</p>
        </div>
      </section>
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
    bottom: -40%;
    left: 50%;
    width: 101%;
    height: 3.8rem;
    padding: 0 0.1rem;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .dlg {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      height: 53px;
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
        font-size: 15px;
        color: #333333;
        letter-spacing: 0.18px;
        text-align: center;
        line-height: 0.24rem;
        padding: 0.05rem;
      }
    }

    section {
      margin-bottom: 0.46rem;
      font-size: 0.13rem;
      .content {
        height: 77px;
        border-bottom: 1px solid #eeeeee;
        a {
          font-size: 11px;
          color: #ec5e52;
          letter-spacing: 0.13px;
          border: 1px solid #ec5e52;
          border-radius: 2px;
          max-width: 75px;
          height: 17px;
          display: inline-block;
          margin-bottom: 8px;
          margin-top: 5px;
          padding: 2px;
        }
        p {
          font-size: 15px;
          color: #333333;
          letter-spacing: 0.18px;
          width: 344px;
        }
      }
      .content_01 {
        height: 98px;
      }
    }
  }
}
</style>
