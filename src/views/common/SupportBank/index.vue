<template>
  <div class="bank" ref="container">
    <b-scroll class="scroll" ref="scrollRef">
      <ul ref="scrollUl">
        <li v-for="(item, index) in bankList" :key="index">
          <div class="border-bottom-1px">
            <dl>
              <dt><img :src="item.iconUrl" alt="" /></dt>
              <dd>{{ item.bankName }}</dd>
            </dl>
            <div class="info">
              <dl>
                <dt>{{ item.onceLimit }}</dt>
                <dd>单笔限额</dd>
              </dl>
              <dl>
                <dt>{{ item.dayLimit }}</dt>
                <dd>单日限额</dd>
              </dl>
              <dl>
                <dt>{{ item.monthLimit }}</dt>
                <dd>单月限额</dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
    </b-scroll>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import { supportBankListApi } from '@/api/common/support_bank'

const CODE_OK = '1'
export default {
  components: {
    BScroll
  },
  data() {
    return {
      bankList: []
    }
  },
  methods: {
    getList() {
      supportBankListApi().then(res => {
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          this.bankList = resp.data.list
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    this.getList()
    this.$nextTick(() => {
      this.refresh()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.bank {
  height: 100%;
}
.scroll {
  height: 100%;
  overflow: hidden;
  ul {
    padding-top: 0.08rem;
    li {
      background-color: #fff;
      > div {
        padding: 0.18rem 0;
        margin-left: 0.18rem;
        @include border-bottom-1px(#eee);
        > dl {
          display: flex;
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
          dt {
            width: 0.24rem;
            height: 0.24rem;
            margin-right: 0.08rem;
            border-radius: 50%;
          }
          dd {
            flex: 1;
            color: #333;
            font-size: $font-size-small;
          }
        }
        .info {
          display: flex;
          dl {
            flex: 1;
            dt {
              color: $color-button;
              font-size: $font-size-small;
            }
            dd {
              color: #333;
              font-size: $font-size-small-ss;
            }
          }
        }
      }
      &:last-child {
        > div {
          &:after {
            border: none;
          }
        }
      }
    }
  }
}
</style>
