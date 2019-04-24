<template>
  <BScroll class="claim_wrap">
    <p></p>
    <table class="claim_list" v-if="claimListData.length > 0">
      <thead>
        <tr>
          <td>借款人/出让人</td>
          <td>剩余可投/出让本息</td>
          <td>债权详情</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in claimListData" :key="index">
          <td>{{ item.borrowerUsername }}</td>
          <td>{{ item.loanAmt }}</td>
          <td @click="linkTo('HYCClaimDetail', { projectNo: item.projectNo, itemId: itemId })">详情</td>
        </tr>
      </tbody>
    </table>
    <NoData v-else></NoData>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { getClaimList } from '@/api/hyc/investDetail'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'index',
  components: {
    BScroll,
    NoData
  },
  data() {
    return {
      productId: this.$route.query.productId,
      itemId: this.$route.query.itemId,
      claimListData: []
    }
  },
  methods: {
    linkTo(routerName, routerQuery = {}) {
      this.$router.push({
        name: routerName,
        query: routerQuery
      })
    }
  },
  created() {
    getClaimList({
      productId: this.productId,
      itemId: this.itemId,
      curPage: '1',
      maxLine: 100
    }).then(res => {
      this.claimListData = res.data.data.list
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.claim_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  p {
    height: 0.1rem;
    background: #eee;
  }
  .claim_list {
    flex: 1;
    overflow: hidden;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    background: #fff;
    thead {
      tr {
        height: 0.5rem;
        border-bottom: 0.01rem solid #eeeeee;
        td {
          font-size: 0.13rem;
          color: #999999;
          letter-spacing: 0.0016rem;
          text-align: center;

          &:nth-of-type(1) {
            width: 0.47rem;
            height: 0.36rem;
            padding: 0.07rem 0.82rem 0.07rem 0.15rem;
          }
          &:nth-of-type(2) {
            width: 0.6rem;
            height: 0.36rem;
            padding: 0.07rem 1.03rem 0.07rem 0;
          }
          &:nth-last-of-type(1) {
            padding: 0 0.15rem 0 0;
          }
        }
      }
    }

    tbody {
      tr {
        height: 0.5rem;
        border-bottom: 0.01px solid #eeeeee;
        td {
          width: 33%;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0.016rem;
          &:nth-of-type(1) {
            padding: 0.16rem 0.15rem;
            text-align: left;
          }
          &:nth-last-of-type(1) {
            font-size: 0.13rem;
            color: #ec5e52;
            letter-spacing: 0.0016rem;
            text-align: right;
            padding: 0.16rem 0.28rem 0.16rem 0;
          }
        }
      }
    }
  }
}
</style>
