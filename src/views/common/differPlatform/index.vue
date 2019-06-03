<!--
  相当于项目根目录index.vue，进入从这里开始分流
-->
<template>
  <div class="index"></div>
</template>

<script>
import { showFlag } from '@/api/common/common'
import { mapMutations } from 'vuex'
import Cookie from 'js-cookie'

export default {
  name: 'differPlatform',
  methods: {
    ...mapMutations({
      setPlatform: 'SET_PLATFORM'
    })
  },
  created() {
    if (this.$route.query.mediasource) {
      Cookie.set('app-invite-code', this.$route.query.mediasource)
    }

    showFlag().then(res => {
      const data = res.data
      if (res.data.resultCode === '1') {
        this.setPlatform(data.data.platformFlag === '1' ? 'djs' : 'hyc')
        // switch (data.data.platformFlag) {
        //   case '1':
        //     // 点金石
        //     this.$router.push({ name: 'DJSHomePage' })
        //     break
        //   case '2':
        //     // 汇有财
        //     this.$router.push({ name: 'HYCHomePage' })
        //     break
        // }
      }
    })
  }
}
</script>
