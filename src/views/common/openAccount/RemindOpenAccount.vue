<template>
  <BScroll class="remind-scroll" ref="remindScrollRef">
    <div>
      <img class="banner" src="./remind.png" alt="" />
      <p>
        汇有财已上线江西银行资金存管，即汇有财的所有用户都将在江西银行存管系统内进行充值、出借、提现等操作，每个用户都会单独开通个人专属的江西银行存管电子账户，并由江西银行负责资金存管，更大程度保证用户的账户安全。
      </p>
      <div class="flow"></div>
      <button>开通江西银行存款账户，资金安全有保障</button>
      <footer @click="openAccount">立即开启</footer>
    </div>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'remindOpenAccount',
  components: {
    BScroll
  },
  data() {
    return {
      title: '提醒开户'
    }
  },
  methods: {
    openAccount() {
      this.$router.push({
        name: 'openAccount'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.remind-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0;
  .banner {
    width: 100%;
    height: 2.14rem;
  }
  p {
    padding: 0.24rem 4% 0.16rem;
    font-size: 0.13rem;
    color: $color-text;
    line-height: 20px;
  }
  .flow {
    @include cube(3.67rem, 1.75rem);
    margin: 0 auto;
    background: url('./bank_manage_bg.png') 0 / contain;
  }
  button {
    width: 3.45rem;
    height: 0.54rem;
    border-radius: 0.27rem;
    display: block;
    margin: 0.16rem auto 0.18rem;
    background: #f2f2f2;
    font-size: 0.15rem;
    color: $color-button;
  }
  footer {
    width: 100%;
    height: 0.5rem;
    background: $color-button;
    font-size: 0.15rem;
    line-height: 0.5rem;
    text-align: center;
    color: #ffffff;
  }
}
</style>
