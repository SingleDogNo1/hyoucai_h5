<template>
  <div class="pageContainer" ref="container">
    <AppHeader :title="title" :mobileValue="!isAppTitle" />
    <div class="wrapper">
      <b-scroll class="scroll" ref="scrollRef">
        <div>
          <header></header>
          <section>
          <div class="top">
            <ul>
              <li>
                <dl>
                  <dt></dt>
                  <dd>满足个人以3C数码消费为代表的小额消费为目的的金融需求。</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>满足个人的小额贷款要求，资金用途使用范围较广。</dd>
                </dl>
              </li>
            </ul>
          </div>
          <p>甄别债务人消费需求的真实性，评估债务人的还款能力和还款意愿。积极管理债务人按时回款和逾期催收。</p>
          <div class="title">丨合作审核措施丨</div>
          <ul class="items">
            <li>
              <dl>
                <dt></dt>
                <dd>资质评估</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt></dt>
                <dd>债务人管理</dd>
              </dl>
            </li>
          </ul>
          <div class="title">丨借款人画像丨</div>
          <ul class="list">
            <li v-for="(item, index) in list" :key="index">
              <dl>
                <dt class="border-1px-radius"></dt>
                <dd>{{ item }}</dd>
              </dl>
            </li>
          </ul>
          </section>
        </div>
      </b-scroll>
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import AppHeader from '@/components/AppHeader'

export default {
  name: 'introduction',
  components: {
    BScroll,
    AppHeader
  },
  data() {
    return {
      title: '项目介绍',
      isAppTitle: this.$route.query.mobile,
      list: [
        '23周岁以上',
        '以特定品类商品消费为融资背景或有小额资金短期周转需求',
        '信用良好',
        '拥有稳定收入来源的个人',
        '还款源自借款个人经营/工资收入等还款',
        '依托借款人自身信用'
      ]
    }
  },
  methods: {
    goBack() {
      if (window.jsBack.backCs) {
        window.jsBack.backCs()
      } else {
        this.$router.go(-1)
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.scrollRef.refresh()
      })
    }
  },
  created() {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/theme.scss';
@import '../../assets/css/mixins.scss';
.pageContainer {
  background-color: $color-background;
  .wrapper {
    height: 100%;
    box-sizing: border-box;
    .scroll {
      box-sizing: border-box;
      height: 100%;

      background-color: #fff;
      overflow: hidden;
      > div {
        header {
          height: 0.08rem;
          background: $color-background;
        }
        section {
          padding: 0 4%;
          margin-top: 0.15rem;
        }
        .top {
          width: 98%;
          height: 2.04rem;
          padding: 0.15rem;
          margin: 0 auto 0.16rem;
          background-color: #ff5e19;
          border-radius: 0.04rem;
          box-sizing: border-box;
          ul {
            box-sizing: border-box;
            color: #fff;
            li {
              margin-bottom: 0.16rem;
              dl {
                dt {
                  width: 0.35rem;
                  height: 0.3rem;
                  margin-bottom: 0.08rem;
                  background-size: 100% 100%;
                }
                dd {
                  font-size: 0.15rem;
                }
              }
              &:nth-of-type(1) {
                dl {
                  dt {
                    @include bg-image('3c');
                  }
                }
              }
              &:nth-of-type(2) {
                margin-bottom: 0;
                dl {
                  dt {
                    @include bg-image('cart');
                  }
                }
              }
            }
          }
        }
        p {
          color: $color-text-gray;
          font-size: 0.13rem;
        }
        .title {
          margin: 16px auto;
          text-align: center;
          font-size: 0.15rem;
          color: #4a90e2;
        }
        .items {
          overflow: hidden;
          font-size: 0;
          li {
            display: inline-block;
            width: 0.8rem;
            margin-right: 0.38rem;
            font-size: 0.15rem;
            color: $color-text-b;
            dl {
              dt {
                width: 0.6rem;
                height: 0.6rem;
                margin: 0 auto 0.08rem;
                border-radius: 50%;
                background-size: 100% 100%;
              }
              dd {
                text-align: center;
              }
            }
            &:nth-of-type(1) {
              dl {
                dt {
                  @include bg-image('rating');
                }
              }
            }
            &:nth-of-type(2) {
              dl {
                dt {
                  @include bg-image('person_manage');
                }
              }
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .list {
          li {
            margin-bottom: 0.06rem;
            dl {
              display: flex;
              font-size: 0;
              dt {
                width: 0.06rem;
                height: 0.06rem;
                margin-right: 0.07rem;
                margin-top: 0.06rem;
                border-radius: 50%;
                @include border-1px-radius(#ff5e19);
              }
              dd {
                flex: 1;
                font-size: $font-size-small-s;
                color: $color-text-gray;
              }
            }
          }
        }
      }
    }
  }
}
</style>
