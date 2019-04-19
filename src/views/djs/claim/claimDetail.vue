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
.claimDetail {
  background: #eee;
  font-family: PingFangSC-Regular;
  p {
    height: 10px;
    background: #eee;
  }
  .info {
    background: #fff;
    h2 {
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.18px;
      padding: 15px 0 14px 14.5px;
      border-bottom: 1px solid #e8e8e8;
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
            font-size: 13px;
            color: #666666;
            letter-spacing: 0.16px;
          }
          i {
            font-size: 13px;
            color: #333333;
            letter-spacing: 0.16px;
          }
        }
        &:nth-of-type(1) td {
          padding: 12px 0 9px 15px;
        }
        &:nth-of-type(2) td {
          padding: 0px 0 9px 15px;
        }
        &:nth-of-type(n + 3) td {
          padding: 0px 0 15px 15px;
        }
      }
    }
  }
  .lender_info {
    height: 150px;
    margin-bottom: 10px;
  }
  .loan_info {
    height: 296px;
  }
}
</style>
