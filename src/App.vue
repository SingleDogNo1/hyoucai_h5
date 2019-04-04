<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { showFlag } from '@/api/common/common'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapMutations({
      setPlatform: 'SET_PLATFORM'
    })
  },
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // mobile
      if (window.location.href.indexOf(process.env.VUE_APP_PROJECT_ADDRESS_PC) > -1) {
        //SIT
        window.location.href = process.env.VUE_APP_PROJECT_ADDRESS_H5
      }
    } else {
      // PC
      if (window.location.href.indexOf(process.env.VUE_APP_PROJECT_ADDRESS_H5) > -1) {
        //SIT
        window.location.href = process.env.VUE_APP_PROJECT_ADDRESS_PC
      }
    }

    showFlag().then(res => {
      const data = res.data
      if (res.data.resultCode === '1') {
        this.setPlatform(data.data.platformFlag === '1' ? 'djs' : 'hyc')
      }
    })
  }
}
</script>

<style lang="scss">
</style>
