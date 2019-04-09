<template>
  <div class='prod_item' :class="itemData.last ? 'last_one' : ''">
    <div class="cata_title" v-if="itemData.status == 3 || itemData.status == 1">
      <img src="https://file.hyoucai.com/huiyoucaifiles/picture/icon/huixuan_PC.png" alt="">
      <span>手机乐</span>
      <i>投资送手机</i>
    </div>
    <div class="item_wrapper">
      <div class='item_title'>
          <span>{{itemData.itemName}}</span>
      </div>
      <div class='item_info'>
        <dl>
          <dt>6.00<span>&nbsp;%</span></dt>
          <dd>历史平均年化收益率</dd>
        </dl>
        <dl>
          <dt>180天</dt>
          <dd>锁定期</dd>
        </dl>
        <button>
          <span>授权出借</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.typeString
    }
  },
  props: {
    typeString: {
      type: String,
      default: ''
    },
    itemData: {
      type: Object,
      default: function() {
        return {
          accumulativeInvAmt: '19700.00',
          enablAmt: '9980300.00',
          loanMent: '30',
          investRate: '12.0',
          minInvAmount: '100.00',
          projectName: '新鑫盈2期(30天)',
          projectNo: '1611100101',
          showInterestRates: '100.0%',
          status: '1',
          tags: null,
          last: ''
        }
      }
    }
  },
  filters: {
    replace(data) {
      return data.replace('%', '')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/css/theme.scss';
@import '../../assets/css/mixins.scss';

.prod_item {
  background-color: #eee;
  .cata_title {
    font-size: 0;
    padding: 0.15rem;
    margin-top: 0.1rem;
    background-color: #fff;
    @include border-bottom-1px(#e8e8e8);
    img {
      display: inline-block;
      vertical-align: middle;
      margin-top: 0.06rem;
      width: 0.16rem;
    }
    span {
      display: inline-block;
      vertical-align: top;
      margin: 0 0.09rem 0 0.04rem;
      font-size: 0.17rem;
      color: #333;
    }
    i {
      display: inline-block;
      vertical-align: top;
      padding: 3px 0.05rem;
      font-size: 0.11rem;
      color: #b27c50;
      border-radius: 0.01rem;
      letter-spacing: 0;
      text-align: center;
      background-color: #efefef;
    }
  }
  .item_wrapper {
    background-color: #fff;
    .item_title {
      height: 0.15rem;
      text-align: left;
      margin-bottom: 0.08rem;
      span {
        vertical-align: top;
        line-height: 1.1;
        font-size: $font-size-small;
        color: $color-text-b;
      }
      img {
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        margin: 0 0 0 0.08rem;
      }
    }
    .item_info {
      display: flex;
      margin-left: 0.15rem;
      padding: 0 0.15rem 0.15rem 0;
      font-size: 0;
      @include border-bottom-1px(#e8e8e8);
      dl {
        flex: 1;
        text-align: left;
        dd {
          font-size: 0.15rem;
          color: $color-text-s;
        }
        &:nth-of-type(1) {
          dt {
            width: 1.53rem;
            font-size: 0.28rem;
            color: $color-button;
            span {
              font-size: 0.15rem;
            }
          }
        }
        &:nth-of-type(2) {
          position: relative;
          dt {
            position: absolute;
            bottom: 0.3rem;
            left: 15%;
            font-size: $font-size-small;
            color: $color-text-b;
          }
          dd {
            position: absolute;
            left: 15%;
            bottom: 0;
          }
        }
      }
      button {
        display: inline-block;
        width: 0.82rem;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-top: 0.2rem;
        font-size: $font-size-small-s;
        border-radius: 0.04rem;
        background-color: $color-button;
        color: #fff;
        &[disabled],
        &.look {
          color: $color-text-s;
          background-image: none;
          background-color: #eee;
          box-shadow: none;
        }
      }
    }
  }
  &.last_one {
    border: 0;
    .item_wrapper {
      .item_info {
        &:after {
          border: 0;
        }
      }
    }
  }
}
</style>
