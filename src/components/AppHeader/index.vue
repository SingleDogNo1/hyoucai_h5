<template>
  <mt-header v-show="!isAppTitle" ref="mtHeader" :title="title">
    <mt-button icon="back" slot="left" @click="goBack">
      <span v-if="cancel">{{ cancel }}</span>
    </mt-button>
  </mt-header>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.meta.title,
      cancel: this.$route.meta.cancel,
      // 首页不显示标题（首页当做是和app一样处理）
      isAppTitle: this.$route.query.mobile
    }
  },
  methods: {
    goBack() {
      if (window.DjsJsBridge) {
        // 可能会调用app方法
      } else {
        const back_router_name = this.$route.meta.backTo
        if (back_router_name) {
          this.$router.push({ name: back_router_name })
        } else {
          this.$router.go(-1)
        }
      }
    },
    getMore() {
      this.$emit('getMore')
    },
    judgeAgreementTitle(type) {
      switch (type) {
        case 'fxts':
          this.title = '风险告知书'
          break
        case 'ywsq':
          this.title = '汇有财授权签约协议'
          break
        case 'jkxy':
          this.title = '三方协议'
          break
        case 'zqzr':
          this.title = '债权转让协议'
          break
        case 'zcxy':
          this.title = '汇有财注册协议'
          break
        case 'sqxy':
          this.title = '用户授权协议'
          break
        case 'jxsf':
          this.title = '江西银行网络交易资金账户服务三方协议'
          break
        case 'zdtz':
          this.title = '自动出借服务条款'
          break
        default:
          this.title = '协议'
      }
    }
  },
  watch: {
    $route(to) {
      this.title = to.meta.title
      if (to.name.indexOf('agreement') > -1) {
        this.judgeAgreementTitle(to.query.agreementType)
      }
      this.isAppTitle = to.query.mobile
    }
  }
}
</script>

<style lang="scss" scoped></style>
