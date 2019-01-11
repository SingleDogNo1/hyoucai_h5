<template>
  <div class="fundSafety pageContainer">
    <div class="main">
      <h3>全方位风控体系建设</h3>
      <p class="content">汇友财坚持将稳健合规运营作为平台运营发展的根本原则，建立了健全而高效的八道风控工序，并利用大数据技术打造出完美的风控闭环，为用户资金提供五重安全保障。</p>
      <h3>反欺诈行为监控</h3>
      <p class="content">汇友财基于移动互联网及大数据技术进行风控创新，广泛采集多维度信息及用户授权数据进行交叉比对，通过自动化征信体系和反欺诈系统，实现智能决策，并以云技术数据处理中心提供强大数据支撑。</p>
      <div class="items">
        <div class="item">
          <h3>
            信息<br>安全
          </h3>
          <p>通过国家公安部监制信息安全等级保护三级安全备案，获得《信息系统安全等级保护三级认证》</p>
        </div>
        <div class="item">
          <h3>
            账户<br>安全
          </h3>
          <p>引入中国人寿财险，为借贷双方提供账户保险服务，让广大出借人更安心。</p>
        </div>
        <div class="item">
          <h3>交易<br>安全</h3>
          <p>正式接入电子存证、上线电子签章，令每一笔借贷交易受到法律保护，有效保障用户的合法权益。</p>
        </div>
        <div class="item">
          <h3>数据<br>安全</h3>
          <p>所有涉及汇友财网站数据皆收到SSL数据加密，能够有效防范来自外界的恶意网络攻击。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fundSafety'
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixins';

.fundSafety {
  font-size: 0.13rem;
  color: #666;
  background: #fff;
  .main {
    padding: 0.2rem;
    h3 {
      width: 1.76rem;
      height: 0.3rem;
      color: #fff;
      background: #787eff;
      border-radius: 0.15rem;
      text-align: center;
      line-height: 0.3rem;
      margin: 0 auto 0.16rem;
    }
    p {
      letter-spacing: 0.0016rem;
      line-height: 0.18rem;
    }
    p.content {
      width: 3.15rem;
      margin: 0 auto 0.24rem;
    }
    .items {
      width: 3.22rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 1.5rem;
        margin-bottom: 0.24rem;
        &:nth-child(odd) {
          margin-right: 0.22rem;
        }
        h3 {
          @include radiusCube(0.68rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 0.16rem;
          box-sizing: border-box;
          line-height: 0.19rem;
          background-image: linear-gradient(-180deg, #ff9736, #ff5e19);
        }
      }
    }
  }
}
</style>
