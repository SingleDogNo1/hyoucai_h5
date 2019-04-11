<template>
  <div class="claim_wrap">
    <p></p>
    <table class="claim_list" :data="projectCompositionData">
      <thead>
        <tr>
          <td>借款人/出让人</td>
          <td>剩余可投/出让本息</td>
          <td>债权详情</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>孟**</td>
          <td>3,000.00</td>
          <td>详情</td>
        </tr>
        <tr>
          <td>孟**</td>
          <td>3,000.00</td>
          <td>详情</td>
        </tr>
        <tr>
          <td>孟**</td>
          <td>3,000.00</td>
          <td>详情</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.claim_wrap {
  p {
    height: 10px;
    background: #eee;
  }
  .claim_list {
    font-family: PingFangSC-Regular;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    background: #fff;
    thead {
      tr {
        height: 50px;
        border-bottom: 1px solid #eeeeee;
        td {
          font-size: 13px;
          color: #999999;
          letter-spacing: 0.16px;
          text-align: center;

          &:nth-of-type(1) {
            width: 47px;
            height: 36px;
            padding: 7px 82px 7px 15px;
          }
          &:nth-of-type(2) {
            width: 60px;
            height: 36px;
            padding: 7px 103px 7px 0px;
          }
          &:nth-last-of-type(1) {
            padding: 0px 15px 0 0;
          }
        }
      }
    }

    tbody {
      tr {
        height: 50px;
        border-bottom: 1px solid #eeeeee;
        td {
          width: 33%;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0.16px;
          &:nth-of-type(1) {
            padding: 16px 15px;
            text-align: left;
          }
          &:nth-last-of-type(1) {
            font-size: 13px;
            color: #ec5e52;
            letter-spacing: 0.16px;
            text-align: right;
            padding: 16px 28px 16px 0;
          }
        }
      }
    }
  }
}
</style>
