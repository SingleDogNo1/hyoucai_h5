<template>
  <div class="prod_item" :class="itemData.last === '1' ? 'last_one' : ''">
    <div class="cata_title" v-if="itemData.head">
      <img v-if="itemData.head.icon" :src="itemData.head.icon" alt="" />
      <span>{{ itemData.head.title }}</span>
    </div>
    <div class="item_wrapper" :class="matchClass(itemData)">
      <div class="item_title">
        <p>{{ itemData.projectName }}</p>
        <ul v-if="itemData.tags && itemData.tags.length">
          <template v-for="(el, i) in itemData.tags">
            <!-- 显示图标 -->
            <li :key="i" v-if="parseInt(el.tagType) === 1">
              <img :src="el.icon" alt="" />
            </li>
            <!-- 显示文字 -->
            <li
              :key="i"
              v-else-if="parseInt(el.tagType) === 2"
              :style="{
                background: el.tagColor ? el.tagColor : '#efefef',
                color: el.tagColor ? '#fff' : '#b27c50'
              }"
            >
              {{ el.tagName }}
            </li>
          </template>
        </ul>
      </div>
      <div class="item_info">
        <dl>
          <dt>
            <i>{{ itemData.basicsInvestRate }}</i>
            <span>%</span>
            <span class="extra" v-if="itemData.activityInvestRate && parseFloat(itemData.activityInvestRate) !== 0">
              +{{ itemData.activityInvestRate }}%
            </span>
          </dt>
          <dd>历史平均年化收益率</dd>
        </dl>
        <dl>
          <dt v-if="itemData.investMent">{{ itemData.investMent }}天</dt>
          <dt v-if="itemData.loanMent">{{ itemData.loanMent }}</dt>
          <dd>锁定期</dd>
        </dl>
        <!--hyoucai 优质计划-->
        <div v-if="itemData.projectType && itemData.projectType === 2">
          <template v-if="itemData.status === 1">
            <button>暂未开启</button>
          </template>
          <template v-else-if="itemData.status === 2">
            <button>授权出借</button>
          </template>
          <template v-else-if="itemData.investPercent >= 100 || itemData.investEndTimestamp <= 0 || itemData.status === 3">
            <button disabled>还款中</button>
          </template>
          <template v-else>
            <button disabled>
              <dl>
                <dt>距离开售</dt>
                <dd>{{ itemData.djs }}</dd>
              </dl>
            </button>
          </template>
        </div>
        <!--散标-->
        <div v-else-if="itemData.projectType && itemData.projectType === 0">
          <template v-if="itemData.status === 3">
            <!--3.满标(包括item.investPercent >= 100 || item.investEndTimestamp <= 0 || item.status === 3)-->
            <button disabled>还款中</button>
          </template>
          <template v-else-if="itemData.status === 2">
            <button disabled>满标</button>
          </template>
          <template v-else-if="itemData.status === 1">
            <button disabled>授权出借</button>
          </template>
          <template v-else>
            <button disabled>
              <dl>
                <dt>距离开售</dt>
                <dd>{{ itemData.djs }}</dd>
              </dl>
            </button>
          </template>
        </div>
        <!--djs-->
        <div v-else-if="!itemData.projectType">
          <template v-if="itemData.status === '1' && parseFloat(itemData.enablAmt) !== 0">
            <button>授权出借</button>
          </template>
          <template v-else-if="itemData.status === '1' && parseFloat(itemData.enablAmt) === 0">
            <button disabled>还款中</button>
          </template>
          <template v-else>
            <button v-if="itemData.enablAmt > 0">预售中</button>
            <button disabled v-else>还款中</button>
          </template>
        </div>
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
  },
  methods: {
    matchClass(itemData) {
      if (itemData.projectType && itemData.projectType === 2) {
        // 优质计划
        if (itemData.investPercent >= 100 || itemData.investEndTimestamp <= 0 || itemData.status === 3 || itemData.status === 1) {
          return 'disabled-item'
        }
      } else if (itemData.projectType && itemData.projectType === 0) {
        // 散标（自选投）
        if (itemData.investPercent >= 100 || itemData.investEndTimestamp <= 0 || itemData.status === 3 || itemData.status === 2) {
          return 'disabled-item'
        }
      } else {
        // 点金石
        if ((itemData.status === '1' && parseFloat(itemData.enablAmt) === 0) || itemData.status === '0') {
          return 'disabled-item'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
  .item_wrapper {
    background-color: #fff;
    .item_title {
      display: flex;
      text-align: left;
      padding-top: 0.16rem;
      margin: 0 0 0.08rem 0.15rem;
      p {
        margin-right: 0.07rem;
        font-size: $font-size-small;
        color: $color-text-b;
      }
      ul {
        display: flex;
        align-self: center;
        font-size: 0.1rem;
        li {
          font-size: 0.11rem;
          padding: 0.02rem 0.05rem;
          img {
            height: 0.16rem;
            margin-right: 0.07rem;
          }
        }
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
            font-size: 0.26rem;
            color: $color-button;
            i {
              display: inline-block;
              vertical-align: bottom;
            }
            span {
              display: inline-block;
              vertical-align: bottom;
              font-size: 0.2rem;
              font-weight: 600;
              &.extra {
                font-size: 0.15rem;
                line-height: 0.23rem;
                text-align: center;
                color: $color-button;
              }
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
        dl {
          text-align: center;
          line-height: 1;
          dt {
            width: auto !important;
            font-size: $font-size-small-ss !important;
            color: #333 !important;
          }
          dd {
            color: #333 !important;
          }
        }
      }
    }
    &.disabled-item {
      color: #ccc;
      .item_title {
        span {
          color: #ccc;
        }
      }
      .item_info {
        dl {
          dt {
            color: #ccc;
            span.extra {
              color: #999;
            }
          }

          dd {
            color: #ccc;
          }
          &:first-child {
            dt {
              color: #999;
            }
          }
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
