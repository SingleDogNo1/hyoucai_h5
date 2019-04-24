<template>
  <section class="claimDetail">
    <p></p>
    <div class="lender_info info">
      <h2>借款人信息</h2>
      <table>
        <tr>
          <td><span>姓名</span></td>
          <td><i>王**</i></td>
        </tr>
        <tr>
          <td><span>性别</span></td>
          <td><i>男</i></td>
        </tr>
        <tr>
          <td><span>年龄</span></td>
          <td><i>32</i></td>
        </tr>
      </table>
    </div>

    <div class="loan_info info">
      <h2>贷款信息</h2>
      <table>
        <tr>
          <td><span>流水号</span></td>
          <td><i>319010219022XX</i></td>
        </tr>
        <tr>
          <td><span>贷款金额</span></td>
          <td><i>2200.00元</i></td>
        </tr>
        <tr>
          <td><span>贷款期限</span></td>
          <td><i>0期</i></td>
        </tr>
        <tr>
          <td><span>还款方式</span></td>
          <td><i></i></td>
        </tr>
        <tr>
          <td><span>还款进度</span></td>
          <td><i>1/3期</i></td>
        </tr>
        <tr>
          <td><span>还款状态</span></td>
          <td><i>正常还款</i></td>
        </tr>
        <tr>
          <td><span>借款人约定的借款利率</span></td>
          <td><i>10.0%</i></td>
        </tr>
        <tr>
          <td><span>募标起始日期</span></td>
          <td><i>2019-02-20</i></td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {}
  },

  methods: {},
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.claimDetail {
  background: #eee;
  p {
    height: 0.1rem;
    background: #eee;
  }
  .info {
    background: #fff;
    h2 {
      font-size: 0.15rem;
      color: #333333;
      padding: 0.15rem 0 0.14rem 0.145rem;
      @include border-1px(#e8e8e8);
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      width: 100%;
      tr {
        width: 49%;

        td {
          span {
            font-size: 0.13rem;
            color: #666666;
          }
          i {
            font-size: 0.13rem;
            color: #333333;
          }
        }
        &:nth-of-type(1) td {
          padding: 0.12rem 0 0.09rem 0.15rem;
        }
        &:nth-of-type(2) td {
          padding: 0 0 0.09rem 0.15rem;
        }
        &:nth-of-type(n + 3) td {
          padding: 0 0 0.15rem 0.15rem;
        }
      }
    }
  }
  .lender_info {
    height: 1.5rem;
    margin-bottom: 0.01rem;
  }
  .loan_info {
    height: 2.96rem;
  }
}
</style>
