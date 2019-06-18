<template>
  <div class="Dialog" v-if="show">
    <div class="inner">
      <div class="dlg">
        <header>服务</header>
        <div v-if="showCloseBtn" class="close" @click="closeDialog">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </div>
      <BScroll class="serveice">
        <section>
          <div class="content_01 content" v-for="(item, index) in data" :key="index">
            <a href="javascript:;">{{ item.serviceName }}</a>
            <p>{{ item.serviceMessage }}</p>
          </div>
        </section>
      </BScroll>
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'Dialog',
  mixins: [],
  components: {
    BScroll
  },
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
    },
    data: {
      type: Array
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
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.8rem;
    overflow: hidden;
    padding: 0 0.1rem;
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
    .serveice {
      height: calc(3.8rem - 53px);
      overflow: hidden;
    }

    section {
      margin-bottom: 0.46rem;
      font-size: 0.13rem;
      .content {
        border-bottom: 1px solid #eeeeee;
        a {
          font-size: 11px;
          color: #ec5e52;
          letter-spacing: 0.13px;
          border: 1px solid #ec5e52;
          border-radius: 2px;
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
    }
  }
}
</style>
