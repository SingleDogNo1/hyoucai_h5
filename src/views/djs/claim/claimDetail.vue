<template>
  <section class="claimDetail">
    <p></p>
    <div class="lender_info info">
      <h2>借款人信息</h2>
      <table>
        <tr>
          <td><span>姓名</span></td>
          <td>
            <i>{{ claimDetail.ownBondName }}</i>
          </td>
        </tr>
        <tr>
          <td><span>性别</span></td>
          <td>
            <i>{{ claimDetail.gender }}</i>
          </td>
        </tr>
        <tr>
          <td><span>年龄</span></td>
          <td>
            <i>{{ claimDetail.age }}</i>
          </td>
        </tr>
      </table>
    </div>

    <div class="loan_info info">
      <h2>贷款信息</h2>
      <table>
        <tr>
          <td><span>流水号</span></td>
          <td>
            <i>{{ claimDetail.applicationNo }}</i>
          </td>
        </tr>
        <tr>
          <td><span>贷款金额</span></td>
          <td>
            <i>{{ claimDetail.totalBondAmt }}元</i>
          </td>
        </tr>
        <tr>
          <td><span>贷款期限</span></td>
          <td>
            <i>{{ claimDetail.loanTerm }}</i>
          </td>
        </tr>
        <tr>
          <td><span>还款方式</span></td>
          <td>
            <i>{{ claimDetail.repayTypeName }}</i>
          </td>
        </tr>
        <tr>
          <td><span>还款进度</span></td>
          <td>
            <i>{{ claimDetail.numberPeriod }}/{{ claimDetail.repaymentPeriod }}</i>
          </td>
        </tr>
        <tr>
          <td><span>还款状态</span></td>
          <td>
            <i>{{ claimDetail.repaymentStatus }}</i>
          </td>
        </tr>
        <tr>
          <td><span>借款人约定的借款利率</span></td>
          <td>
            <i>{{ claimDetail.investRate }}%</i>
          </td>
        </tr>
        <tr>
          <td><span>募标起始日期</span></td>
          <td>
            <i>{{ claimDetail.loanSignDate }}</i>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import { getClaimDetail } from '@/api/djs/investDetail'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      appNo: this.$route.query.appNo,
      claimDetail: ''
    }
  },

  methods: {
    getClaimDetail() {
      getClaimDetail({
        appNo: this.appNo,
        platform: 'h5'
      }).then(res => {
        this.claimDetail = res.data.list[0]
      })
    }
  },
  created() {
    this.getClaimDetail()
  }
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
