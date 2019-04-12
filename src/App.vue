<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
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
  }
}
</script>

<style lang="scss">
#app {
  max-width: 540px;
  margin: 0 auto;
}
</style>
