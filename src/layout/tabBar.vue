<template>
  <div class="tab-bar">
    <div class="container">
      <router-view></router-view>
    </div>
    <ul class="tabs">
      <router-link class="index" tag="li" :to="{ name: platform === 'djs' ? 'DJSHomePage' : 'HYCHomePage' }">
        <div class="logo"></div>
        <p>首页</p>
      </router-link>
      <router-link class="invest" tag="li" :to="{ name: platform === 'djs' ? 'DJSInvestment' : 'HYCInvestment' }">
        <div class="logo"></div>
        <p>出借</p>
      </router-link>
      <router-link class="mine" tag="li" :to="{ name: platform === 'djs' ? 'DJSUserCenter' : 'HYCUserCenter' }">
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
  computed: {
    ...mapGetters(['platform'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins';
@import '../assets/css/theme';

.tab-bar {
  @include positionCenter();
  @include cube();
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
    flex: 1;
    background: #eee;
    overflow: hidden;
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
      }
      .logo {
        @include square(0.24rem);
        background-size: 0.23rem auto;
        background-repeat: no-repeat;
        background-position: center center;
      }
      &.router-link-exact-active {
        p {
          color: $color-main;
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
            background-image: url('./images/#{map_get($value, common)}.png');
          }
        }
        &.router-link-exact-active.#{$key} {
          .logo {
            background-image: url('./images/#{map_get($value, active)}.png');
          }
        }
      }
    }
  }
}
</style>
