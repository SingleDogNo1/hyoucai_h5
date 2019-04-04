<template>
  <div class="tab-bar">
    <div class="container">
      <router-view></router-view>
    </div>
    <ul class="tabs">
      <router-link class="index" tag="li" :to="{name: platform === 'djs' ? 'DJSHomePage' : 'HYCHomePage'}">
        <div class="logo"></div>
        <p>首页</p>
      </router-link>
      <router-link class="invest" tag="li" :to="{name: platform === 'djs' ? 'DJSInvestList' : 'HYCInvestList'}">
        <div class="logo"></div>
        <p>出借</p>
      </router-link>
      <router-link class="mine" tag="li" :to="{name: platform === 'djs' ? 'DJSUserCenter' : 'HYCUserCenter'}">
        <div class="logo"></div>
        <p>我的</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tabBar',
  mixins: [],
  components: {},
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['platform'])
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins';

.tab-bar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
    flex: 1;
    background: #fff;
  }
  .tabs {
    display: flex;
    height: 0.5rem;
    border-top: 0.01rem solid #eee;
    background: #fff;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      p {
        font-size: 0.1rem;
        color: #2b2b2b;
        margin-top: 0.05rem;
      }
      .logo {
        /* TODO 尺寸看UI */
        @include square(20px);
        background-size: contain;
      }
      &.router-link-exact-active {
        p {
          color: red;
        }
      }
      $navOptions: (
        index: (
          common: index,
          active: index-active
        ),
        invest: (
          common: invest,
          active: invest-active
        ),
        mine: (
          common: mine,
          active: mine-active
        )
      );
      @each $key, $value in $navOptions {
        &.#{$key} {
          .logo {
            background-image: url('./images/#{map_get($value, common)}.jpg');
          }
        }
        &.router-link-exact-active.#{$key} {
          .logo {
            background-image: url('./images/#{map_get($value, active)}.jpg');
          }
        }
      }
    }
  }
}
</style>
