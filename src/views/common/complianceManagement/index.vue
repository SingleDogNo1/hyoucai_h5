<template>
  <div class="complianceManagement">
    <BScroll class="scroll">
      <div class="main">
        <div class="desc"></div>
        <p class="intro">
          汇有财出借人、借款人资金由江西银行存管，实行分账管理。客户账户开通、交易密码设置与认证、出借与放款、还款结算、账户充值、提现等各类资金交易都通过汇有财&江西银行资金存管系统实现。客户资金交易明细和余额查询以银行账户查询为准。<br />
          江西银行仅为客户交易提供支付信息转接渠道，客户与汇有财的交易争议或纠纷与江西银行无关。客户继续进行交易的行为视同客户同意并接受上述声明
        </p>
        <h3>
          <strong>专业法律团队支持</strong>
        </h3>
        <p>和中伦律师事务所达成战略合作，在汇有财业务经营的合规性评估、业务合同的起草与审查、金融产品风险控制等多方面提供法律支持。</p>
        <div class="img"></div>
        <h3>
          <strong>网贷平台的合规性</strong>
        </h3>
        <p>
          汇有财运营主体为江西汇通金融信息服务有限公司，根据《公司法》设立，已经取得了三级等保并进行了银行存管对接，设立了符合要求的信息披露专栏，平台严格按照《网络借贷信息中介机构业务活动管理暂行办法》的规定运作。
        </p>
        <h3>
          <strong>网贷业务的合规性</strong>
        </h3>
        <p>
          汇有财平台借款人不属于在校学生、无还款来源/收入来源的人；借贷用途不涉及房地产或高风险金融产品，不存在拆分借款项目的情形。借款项目均符合《网络借贷信息中介机构业务活动管理暂行办法》的要求。
        </p>
      </div>
    </BScroll>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'complianceManagement',
  components: {
    BScroll
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/mixins';
.complianceManagement {
  font-size: 0.13rem;
  color: #666;
  background: #fff;
  height: 100%;
  .scroll {
    height: 100%;
    overflow: hidden;
  }
  .main {
    padding: 0.16rem 0.15rem;
    .desc {
      @include cube(100%, 1.64rem);
      margin: 0 auto 0.3rem;
      @include bg-image('bank_manage_bg');
      background-size: contain;
    }
    h3 {
      font-size: 0.15rem;
      color: #333;
      display: flex;
      align-items: center;
      line-height: 0.21rem;
      margin-top: 0.16rem;
      margin-bottom: 0.16rem;
      &:nth-of-type(3) {
        margin-top: 0.24rem;
      }
      &:before {
        content: '';
        display: inline-block;
        width: 0.06rem;
        height: 0.06rem;
        background: #000;
        border-radius: 50%;
        margin-right: 0.1rem;
      }
    }
    p {
      line-height: 0.2rem;
    }
    .img {
      @include bg-image('layer');
      width: 1.62rem;
      height: 0.45rem;
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
}
</style>
