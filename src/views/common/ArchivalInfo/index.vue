<template>
  <div class="archival" ref="container">
    <b-scroll :beforeScroll="true" @beforeScroll="beforeScroll" class="scroll" ref="scrollRef">
      <div>
        <div class="risk_manage" id="risk">
          <div class="title"></div>
          <ul class="types">
            <li>
              <div></div>
              <p>江西银行资金存管</p>
            </li>
            <li>
              <div></div>
              <p>2017年6月签约资金存管</p>
            </li>
            <li>
              <div></div>
              <p>2017年9月资金存管业务上线</p>
            </li>
          </ul>
        </div>
        <div class="desc"></div>
        <p class="intro">
          汇有财出借人、借款人资金由江西银行存管，实行分账管理。客户账户开通、交易密码设置与认证、出借与放款、还款结算、账户充值、提现等各类资金交易都通过汇有财&江西银行资金存管系统实现。客户资金交易明细和余额查询以银行账户查询为准。<br />
          <!--江西银行仅为客户交易提供支付信息转接渠道，客户与汇有财的交易争议或纠纷与江西银行无关。客户继续进行交易的行为视同客户同意并接受上述声明-->
        </p>
        <div class="frame">
          <div class="title"></div>
          <div class="frame-item"></div>
        </div>
        <div class="assess">
          <div class="title"></div>
          <div class="assess-item"></div>
        </div>
        <div class="risk">
          <div class="title"></div>
          <div class="risk-item"></div>
        </div>
        <div class="collection">
          <div class="title"></div>
          <div class="collection-item"></div>
        </div>
        <div class="records">
          <div class="title"></div>
          <ul>
            <li>
              <p>备案登记地方金融监管部门：</p>
              <p>待完成申请备案后披露</p>
            </li>
            <li>
              <p>备案登记时间：</p>
              <p>待完成申请备案后披露</p>
            </li>
            <li>
              <p>备案登记编号：</p>
              <p>待完成申请备案后披露</p>
            </li>
          </ul>
        </div>
        <div class="police">
          <div class="title"></div>
          <h1>公安机关核发网站备案图标编号</h1>
          <h2>赣ICP备13002945号-11</h2>
          <div class="police-item"></div>
        </div>
        <div class="licence">
          <div class="title"></div>
          <p>
            汇有财将严格依据监管部门的有关规定<br />
            积极准备网络借贷信息中介机构ICP证件的申领工作
          </p>
        </div>
        <div class="policy" id="policy">
          <div class="title"></div>
          <ul>
            <li @click="showBorrowerMask">出借人教育</li>
            <li @click="showLegalMask">法人承诺函</li>
          </ul>
        </div>
        <footer></footer>
      </div>
    </b-scroll>
    <BScroll class="borrower-edu-mask" v-if="showBorerEdu" ref="borrowerEduMask">
      <div @click="closeBorrowerMask">
        <header>
          《网络借贷信息中介机构业务活动管理暂行办法》第九条规定网络借贷信息终结机构应当履行下列义务：“持续开展网络借贷知识普及和风险教育活动，加强信息披露工作，引导出借人以小额分散的方式参与网络借贷，确保出借人充分知悉借贷风险”。汇有财平台根据监管规定开立专门的出借人教育专栏，供平台用户了解学习。
        </header>
        <h1>
          一、汇有财的合法性解读
        </h1>
        <h6>
          1.关于汇有财平台提供居间撮合服务的合法性
        </h6>
        <p class="text">
          根据《中华人民共和国合同法》第四百二十四条规定“居间合同是居间人向委托人报告订立合同的机会或者提供订立合同的媒介服务，委托人支付报酬的合同。”第四百二十六条规定“居间人促成合同成立的，委托人应当按照约定支付报酬。”汇有财平台作为合法设立的中介服务机构，为民间借贷提供居间服务，为借贷双方提供联系、介绍服务，促成借贷双方形成借贷关系的行为有着明确的法律基础。
        </p>
        <h6>
          2.关于汇有财电子合同的有效性
        </h6>
        <p class="text">
          根据《中华人民共和国合同法》第十条的规定“当事人订立合同，有书面形式、口头形式和其他形式。”，第十一条的规定，当事人可以采用合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等形式订立合同。并通过以电子形式所含、所附用于识别签名人身份并表明签名人认可其中内容的数据电文等电子签名方式进行签署，当事人不能仅因合同采用电子签名、数据电文的形式就否定其法律效力。电子合同是法律认可的书面合同形式之一。汇有财平台采取实名认证用户在网上点击确认的方式签署电子合同。该等电子合同符合《中华人民共和国合同法》规定的合同成立、生效的要件，为合法有效合同。
        </p>
        <h6>
          3.关于资金借出方在汇有财平台获得收益的合法性
        </h6>
        <p class="text">
          根据最高人民法院《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十六条：“借贷双方约定的利率未超过年利率24%，出借人请求借款人按照约定的利率支付利息的，人民法院应予支持。”汇有财平台上资金借出方向资金借入方出借资金并按照约定利.率收取利息，该等利率未超过年利率24%，为合法利息收益，受到法律保护。
        </p>
        <h1>
          二、风险提示
        </h1>
        <h2>
          您可能会面临包括但不限于以下风险：
        </h2>
        <p class="title"><strong>1.信息风险：</strong>本平台提供的各种信息及资料仅供参考，您应依其独立判断做出其决策，并承担可能的出借风险。</p>
        <p class="title">
          <strong>2.违约风险：</strong
          >项目融资方因死亡、失踪、停业、解散、撤销、破产，或者被有关监管机构撤销相关业务许可等原因导致不能按时履行还款职责的风险。
        </p>
        <p class="title">
          <strong>3.技术风险：</strong
          >本平台的业务均通过电子通讯技术及电脑技术实现信息展现及交易处理，您需通过网络数据传输来进行查看及交易，如您或本平台的终端设备或软件系统可能会遭到非法攻击或病毒感染，可能会导致您的平台账号及密码信息泄露或身份被仿冒，本平台会尽力保障平台正常运行，但您应承担您的终端设备或软件系统及本平台以外因素导致系统故障而产生的风险。
        </p>
        <p class="title">
          <strong>4.政策风险：</strong
          >融资人所处行业或区域的法律、法规及政策可能发生变化，或本平台的交易规则发生变化，可能使融资人产生经营及信息披露的波动，而本平台仅能在法律、法规及本平台规则允许的范围内尽可能完整地向您进行信息披露，可能使您产生亏损的风险。
        </p>
        <p class="title">
          <strong>5.不可抗力因素导致的风险：</strong
          >由于战争、动乱、自然灾害、公共网络瘫痪等不可抗力因素的出现而可能导致您无法按时足额获得出借本金及收益。
        </p>
        <p class="text">
          <strong>6.操作风险：</strong
          >由于您密码失密、操作不当、出借决策失误等原因可能会使您发生损失；网上委托、热键操作完毕后未及时退出，他人进行恶意操作而造成的损失；网上交易未及时退出还可能遭遇黑客攻击，从而造成损失；委托他人代理出借，致使他人恶意操作而造成的损失；其他意外事件造成的损失；上述损失都将由您自行承担。
        </p>
        <h1>
          三、网贷平台禁止性行为提示
        </h1>
        <p class="text">
          2016年8月24日国家颁布了《网络借贷信息中介机构业务活动管理暂行办法》，其中第三章第十条中明确规定了网贷平台绝对不能触碰的“十三条红线”，出借人可据此判断一家网贷平台的合规程度。<br />
          《网络借贷信息中介机构业务活动管理暂行办法》第十条规定如下：<br />
          第十条 网络借贷信息中介机构不得从事或者接受委托从事下列活动
        </p>
        <footer>
          <img src="./edu-1.png" alt="" />
          <img src="./edu-2.png" alt="" />
          <img src="./edu-3.png" alt="" />
          <img src="./edu-4.png" alt="" />
          <img src="./edu-5.png" alt="" />
          <img src="./edu-6.png" alt="" />
          <img src="./edu-7.png" alt="" />
          <img src="./edu-8.png" alt="" />
          <img src="./edu-9.png" alt="" />
          <img src="./edu-10.png" alt="" />
          <img src="./edu-11.png" alt="" />
          <img src="./edu-12.png" alt="" />
        </footer>
      </div>
    </BScroll>
    <div class="legal-mask" v-if="showLegal" @click="closeLegalMask">
      <img src="./frcnh.png" alt="" />
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  components: {
    BScroll
  },
  data() {
    return {
      type: this.$route.query.type,
      showBorerEdu: false,
      showLegal: false
    }
  },
  methods: {
    autoScroll() {
      let target = document.getElementById(this.type)
      this.$refs.scrollRef.scrollToElement(target, 300)
    },
    beforeScroll() {
      this.refresh()
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    },
    showBorrowerMask() {
      this.showBorerEdu = true
      setTimeout(() => {
        this.$refs.borrowerEduMask.refresh()
      }, 20)
    },
    closeBorrowerMask() {
      this.showBorerEdu = false
    },
    showLegalMask() {
      this.showLegal = true
    },
    closeLegalMask() {
      this.showLegal = false
    }
  },
  created() {
    switch (this.type) {
      case 'policy':
        this.text = '政策法规'
    }

    this.$nextTick(() => {
      this.refresh()
      setTimeout(() => {
        this.autoScroll()
      }, 20)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.archival {
  height: 100%;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  font-size: 0;
  .risk_manage {
    padding: 0.24rem 4% 0.24rem;
    background-color: #fff;
    .title {
      width: 1.16rem;
      height: 0.25rem;
      margin: 0 auto 0.08rem;
      background-size: 100% 100%;
      @include bg-image('money-title');
    }
    .types {
      display: flex;
      justify-content: space-around;
      margin: 0.16rem 0 0.24rem;
      li {
        @include cube(1.1rem, auto);
        div {
          @include square(0.54rem);
          background-size: contain;
          margin: 0 auto;
        }
        p {
          font-size: $font-size-small-s;
          color: $color-text;
          text-align: center;
          margin-top: 0.08rem;
        }
        $bgImgs: 'bank', '2017-6', '2017-9';
        @each $bg in $bgImgs {
          $i: index($bgImgs, $bg);
          &:nth-of-type(#{$i}) {
            div {
              @include bg-image(#{$bg});
            }
          }
        }
      }
    }
  }
  .desc {
    @include cube(3.67rem, 1.75rem);
    margin: 0 auto 0.32rem;
    @include bg-image('bank_manage_bg');
    background-size: contain;
  }
  .intro {
    padding: 0 4%;
    font-size: $font-size-small-s;
    color: $color-text;
    margin-top: 0.08rem;
    line-height: 0.22rem;
    margin-bottom: 0.32rem;
  }
  .frame {
    margin-bottom: 0.32rem;
    .title {
      width: 1.17rem;
      height: 0.25rem;
      margin: 0 auto 0.24rem;
      background-size: contain;
      @include bg-image('frame-title');
    }
    .frame-item {
      @include cube(3.48rem, 2.71rem);
      margin: 0 auto;
      @include bg-image('frame');
      background-size: contain;
    }
  }
  .assess {
    margin-bottom: 0.32rem;
    .title {
      @include cube(1.17rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('assess-title');
    }
    .assess-item {
      @include cube(3.47rem, 2.04rem);
      margin: 0 auto;
      @include bg-image('assess');
      background-size: contain;
    }
  }
  .risk {
    margin-bottom: 0.32rem;
    .title {
      @include cube(1.17rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('risk-title');
    }
    .risk-item {
      @include cube(3.45rem, 0.7rem);
      margin: 0 auto;
      @include bg-image('risk');
      background-size: contain;
    }
  }
  .collection {
    margin-bottom: 0.32rem;
    .title {
      @include cube(0.78rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('collection-title');
    }
    .collection-item {
      @include cube(3.45rem, 0.7rem);
      margin: 0 auto;
      @include bg-image('collection');
      background-size: contain;
    }
  }
  .records {
    margin-bottom: 0.32rem;
    .title {
      @include cube(1.17rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('record-title');
    }
    ul {
      li {
        display: flex;
        justify-content: center;
        font-size: $font-size-small-s;
        margin: 0.08rem 0;
        p {
          &:first-child {
            flex: 1;
            color: $color-text;
            text-align: right;
          }
          &:last-child {
            color: #3f3f3f;
            flex: 1;
          }
        }
      }
    }
  }
  .police {
    margin-bottom: 0.32rem;
    .title {
      @include cube(1.17rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('police-title');
    }
    h1 {
      font-size: $font-size-small-s;
      color: $color-text-s;
      text-align: center;
      margin-bottom: 0.08rem;
    }
    h2 {
      font-size: $font-size-small-s;
      color: $color-text;
      text-align: center;
      margin-bottom: 0.08rem;
    }
    .police-item {
      @include cube(1.92rem, 0.86rem);
      background-size: contain;
      background-position: center;
      margin: 0 auto;
      @include bg-image('police');
    }
  }
  .licence {
    margin-bottom: 0.32rem;
    .title {
      @include cube(1.74rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('licence-title');
    }
    p {
      font-size: $font-size-small-s;
      color: $color-text-s;
      text-align: center;
      line-height: 2;
    }
  }
  .policy {
    margin-bottom: 0.16rem;
    .title {
      @include cube(0.78rem, 0.25rem);
      margin: 0 auto 0.16rem;
      background-size: contain;
      @include bg-image('policy-title');
    }
    ul {
      display: flex;
      justify-content: space-around;
      li {
        $height: 0.4rem;
        @include cube(1.5rem, $height);
        border-radius: 0.04rem;
        background: $color-theme;
        color: $color-text;
        font-size: $font-size-small;
        text-align: center;
        line-height: $height;
      }
    }
  }
  footer {
    @include cube(100%, 1.41rem);
    background-size: contain;
    @include bg-image('sign');
    img {
    }
  }
}

.borrower-edu-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  > div {
    padding: 0.36rem 0.15rem;
  }
  header {
    font-size: $font-size-small-s;
    color: $color-text-b;
    line-height: 1.65;
    margin-bottom: 0.16rem;
  }
  h1 {
    font-size: $font-size-medium;
    color: $color-text-b;
    margin-bottom: 0.16rem;
    font-weight: bold;
  }
  h6 {
    font-size: $font-size-small-s;
    color: $color-text-b;
    margin-bottom: 0.08rem;
  }
  p {
    font-size: $font-size-small-s;
    color: $color-text;
    line-height: 1.65;
    &.text {
      margin-bottom: 0.16rem;
    }
    &.title {
      margin-bottom: 0.04rem;
    }
  }
  h2 {
    font-size: $font-size-small;
    color: $color-text-b;
    font-weight: bold;
    margin-bottom: 0.08rem;
  }
  strong {
    color: $color-text-b;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    img {
      @include radiusCube(0.575rem);
    }
  }
}
.legal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: $color-highlight-background;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
