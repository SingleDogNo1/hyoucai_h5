<template>
  <div class="btnArea" :class="{ disable: disable_ }">
    <input type="button" class="smsBtn" :disabled="disable_" v-model="text_" @click="getCode" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      disable_: this.disable,
      text_: this.text,
      t: null
    }
  },
  props: {
    totalTime: {
      // 重发倒计时时间
      type: Number,
      default: 60
    },
    disable: {
      // 组件禁用状态
      type: Boolean,
      default: false
    },
    text: {
      // 组件按钮文本
      type: String,
      default: '获取短信验证码'
    }
  },
  methods: {
    getCode() {
      this.$emit('getSMSCode')
    },
    countDown() {
      let time = this.totalTime
      this.disable_ = true
      this.text_ = time + 's后可重发'
      window.clearInterval(this.t)
      this.t = window.setInterval(() => {
        if (time > 0) {
          time -= 1
          this.text_ = time + 's后可重发'
        } else {
          // this.text_ = this.text
          this.text_ = '重新发送'
          this.disable_ = false
          window.clearInterval(this.t)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/theme.scss';

.btnArea {
  .smsBtn {
    width: 100%;
    font-size: $font-size-small-ss;
    color: $color-main;
    line-height: 0.25rem;
    text-align: center;
  }
  &.disable {
    .smsBtn {
      color: #999;
    }
  }
}
</style>
