<template>
    <div class="wrapper">
      <div>
        <img src="./1.png" alt="">
        <img src="./2.png" alt="">
      </div>
      <div>
        <div class="area area1" @click="toActivityPage('DJSSpellGroupAct', {  })"></div>
        <div class="area area2" @click="toActivityPage('DJS3000Act')"></div>
        <div class="area area3" @click="toActivityPage('DJSyearAct')"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    toActivityPage(router_name, router_query) {
      this.$router.push({
        name: router_name,
        query: router_query
      })
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  img {
    width: 100%;
  }
  .area {
    position: absolute;
    background: #000;
    opacity: 0;
    width: 92%;
    height: 50px;
    margin: 0 auto;
    top: 0;
    left: calc(50% - 46%);
    border-radius: 8%;
    &.area1 {
      top: 43%;
      height: 10.3%;
    }
    &.area2 {
      top: 59.5%;
      height: 13%;
    }
    &.area3 {
      top: 77.3%;
      height: 18%;
    }
  }
}
</style>
