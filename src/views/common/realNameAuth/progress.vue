<template>
  <div class="progress-wrapper">
    <section>
      <div class="progress">
        <div class="line">
          <div class="ball" :class="{ active: true }"></div>
          <div class="ball" :class="{ active: ['signAgreement'].includes($route.name) }"></div>
        </div>
        <div class="steps">
          <div class="step" :class="{ active: true }">实名</div>
          <div class="step" :class="{ active: ['signAgreement'].includes($route.name) }">绑卡</div>
        </div>
      </div>
      <div class="flow">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      status: ''
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {}
}
</script>
<style scoped lang="scss">
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.progress-wrapper {
  font-size: $font-size-small-s;
  height: 100%;
  background: #f9f9f9;
  > section {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .progress {
    height: 1.12rem;
    background: #fff;
    padding: 0.24rem 0.15rem;
    .line {
      margin-top: 0.09rem;
      height: 0.02rem;
      width: 3.45rem;
      background: linear-gradient(to right, rgba(238, 238, 238, 0.2) 20%, rgba(238, 238, 238, 1) 50%, rgba(238, 238, 238, 0.2) 100%);
      position: relative;
      display: flex;
      justify-content: space-around;
      .ball {
        background: #fff;
        border: 0.07rem solid #eeeeee;
        border-radius: 50%;
        width: 0.2rem;
        height: 0.2rem;
        margin-top: -0.1rem;
        &.active {
          border: 0.07rem solid #ff5e19;
        }
      }
    }
    .steps {
      display: flex;
      justify-content: space-around;
      margin-top: 0.25rem;
      .step {
        background: #eeeeee;
        border-radius: 1rem;
        width: 0.85rem;
        height: 0.28rem;
        line-height: 0.28rem;
        text-align: center;
        font-size: $font-size-small-ss;
        color: #999;
        &.active {
          background: #ff5e19;
          color: #fff;
        }
      }
    }
  }
  .flow {
    padding-top: 0.08rem;
    flex: 1;
    overflow: hidden;
  }
}
</style>
