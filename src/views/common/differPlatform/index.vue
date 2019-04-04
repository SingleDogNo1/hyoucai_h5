<!--
  相当于项目根目录index.vue，进入从这里开始分流
-->
<template>
  <div class="index"></div>
</template>

<script>
import { showFlag } from '@/api/common/common'

export default {
  name: 'differPlatform',
  created() {
    showFlag().then(res => {
      const data = res.data
      if (res.data.resultCode === '1') {
        switch (data.data.platformFlag) {
          case '1':
            // 点金石
            this.$router.push({ name: 'DJSHomePage' })
            break
          case '2':
            // 汇有财
            this.$router.push({ name: 'HYCHomePage' })
            break
        }
      }
    })
  }
}
</script>
