<!--
  TODO
  BScroll滚动影响按钮文字上下晃动
-->

<template>
  <div class="invest-detail">
    <BScroll class="inner">
      <div>
        <section class="pro-info">
          <div class="pro-info-head">
            <div class="item-l">
              <span>{{ investDetail.projectName }}</span>
            </div>
            <div class="item-r">
              <span class="overplus">剩余可投</span><br />
              <span class="over_amount">{{ investDetail.surplusAmount }}万</span>
            </div>
          </div>
          <div class="pro-info-middle">
            <span>历史平均年化收益率</span><br />
            <strong>{{ investDetail.investRate }}</strong
            ><span class="per">%</span>
            <p>
              <i>{{ investDetail.recentShow }}</i>
              <img @click="showQuestDlg()" src="./images/quest.png" alt="" />
            </p>
          </div>
          <div class="pro-info-bottom">
            <p>
              <span>锁定期</span><b>{{ investDetail.investMent }}天</b>
            </p>
            <p>
              <b>{{ investDetail.minInvAmt }}元</b><span class="start_amout">起投</span>
            </p>
          </div>
        </section>
        <section class="pro-serve">
          <ul>
            <li class="li-one"><span>...</span><i>募集期</i></li>
            <li>
              <span>{{ investDetail.endData }}</span
              ><i>投资完成</i>
            </li>
            <li>
              <span>{{ investDetail.breathDate }}</span
              ><i>起息</i>
            </li>
            <li><span>2019-02-28</span><i>锁定期结束</i></li>
          </ul>
          <div class="serve-info" v-if="investDetail.projectServiceEntity && investDetail.projectServiceEntity.length > 0">
            <span>服务</span>
            <div>
              <a href="javascript:void(0);" v-for="(item, index) in investDetail.projectServiceEntity" :key="index">{{ item.serviceName }}</a>
            </div>
            <p @click="judge"><i class="iconfont icon-rightpage"></i></p>
          </div>
          <div class="activity" v-if="activity.activityInfo">
            <span class="title">活动</span>
            <span class="desc">{{ activity.activityInfo }}</span>
            <p><i class="iconfont icon-rightpage"></i></p>
          </div>
        </section>
        <section class="user-numbers" @click="showLendRecord">
          <div class="number">
            <img src="./images/users_img.png" alt="" />
            <span>
              &middot;&nbsp;&middot;&nbsp;&middot;&nbsp;已有<b>{{ investDetail.investPeople }}</b> 位用户投标成功
            </span>
          </div>
        </section>
        <section class="serve-detail">
          <p class="tip">服务介绍</p>
          <p class="content">{{ investDetail.appDesc }}</p>
          <dl>
            <dt><img src="./images/icon_01.png" alt="" /></dt>
            <dd>
              <span>自动投标</span>
              <br />
              <i>系统自动根据用户确认的投标条件完成分散投标以降低风险</i>
            </dd>
          </dl>
          <dl>
            <dt><img src="./images/icon_02.png" alt="" /></dt>
            <dd>
              <span>轻松出借</span>
              <br />
              <i>出借、回款0费用；简单出借，乐享收益</i>
            </dd>
          </dl>
          <div class="risk_assess common">
            <p class="risk_title">项目风险评估及可能产生的风险结果</p>
            <p class="risk_content">
              根据借款人当前情况进行评估，借款人具有偿还贷款的能力，但不排除未来借款人因收入下降、过度举债等因素导致财务状况恶化，从而发生逾期的可能。
            </p>
          </div>
          <div class="lend_tip common">
            <p class="lend_title">出借人适当性管理提示</p>
            <p class="lend_content">
              1.该标的的每一个借款人在本平台借款余额未超过20万元，符合监管政策要求；<br />
              2.出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任，包括但不限于可能的本息损失。网贷有风险，出借需谨慎。
            </p>
          </div>
        </section>
        <section class="claims">
          <div class="claims_list">
            <h2>债权列表</h2>
            <p @click="showClaimList">全部<img src="./images/more.png" alt="" /></p>
          </div>
          <table>
            <tr v-for="(item, index) in creditListData" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.amount }}</td>
              <td @click="showClaimDetail()">详情</td>
            </tr>
          </table>
        </section>
        <section class="manage-info">
          <p class="tip">服务介绍</p>
          <div class="manage">
            <ul @click="complianceManagement()">
              <li><img src="./images/icon_03.png" alt="" /></li>
              <li><span>合规管理</span></li>
            </ul>
            <ul @click="selectMeans()">
              <li><img src="./images/icon_04.png" alt="" /></li>
              <li><span>严选资产</span></li>
            </ul>
            <ul @click="fundSafety()">
              <li><img src="./images/icon_05.png" alt="" /></li>
              <li><span>资金安全</span></li>
            </ul>
          </div>
        </section>
        <section class="risk_tips commonType">
          <h2>风险告知书</h2>
          <p><img src="./images/more.png" alt="" /></p>
        </section>
        <section class="questions commonType">
          <h2>常见问题</h2>
          <p><img src="./images/more.png" alt="" /></p>
        </section>
        <section class="company_info">
          <p>由江西汇通金融信息服务有限公司提供网络借贷信息中介服务</p>
          <span>网贷有风险，借贷需谨慎</span>
        </section>
        <!-- 服务弹窗 -->
        <div v-if="showQuest" class="questDlgWrap">
          <div class="questDlg">
            <span>{{ investDetail.recentTips }}</span>
          </div>
        </div>
        <Dialog class="serve-dialog" :show.sync="serveDialog.show">
          <div>
            <p>aaaa</p>
          </div>
        </Dialog>
      </div>
    </BScroll>
    <section class="to-lend">
      <div class="lend_btns">
        <p>授权出借</p>
        <span>剩余可投{{ investDetail.surplusAmount }}万</span>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Serve'
import { getInvestDetail } from '@/api/djs/investDetail'
export default {
  name: 'index',
  mixins: [],
  components: {
    BScroll,
    Dialog
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      investDetail: {
        projectServiceEntity: [], // 服务
        projectName: '', //产品名称
        surplusAmount: '', //剩余可投
        investRate: '', //年化收益
        recentShow: '', //近期表现
        investMent: '', //锁定期
        minInvAmt: '' //起投
      }, // 出借详情
      creditListData: [], // 债权列表
      investEndTimestamp: 0, // 募集倒计时
      serveDialog: {
        show: false
      },
      showQuest: false,
      activity: '' //活动
    }
  },
  props: {},
  watch: {},
  methods: {
    showLendRecord() {
      this.$router.push({
        name: 'DJSLendRecord',
        query: {
          projectNo: this.projectNo
        }
      })
    },
    showClaimList() {
      this.$router.push({
        name: 'DJSClaimList',
        query: {
          projectNo: this.projectNo
        }
      })
    },
    showClaimDetail(id) {
      this.$router.push({
        name: 'DJSClaimDetail',
        query: {
          id: id
        }
      })
    },
    judge() {
      //服务弹框
      this.serveDialog.show = true
    },
    showQuestDlg() {
      //点击问号弹框
      //this.showQuest = true
    },
    selectMeans() {
      //跳转到严选资产
      this.$router.push({
        path: `/selectMeans`
      })
    },
    complianceManagement() {
      //跳转到合规管理
      this.$router.push({
        path: `/complianceManagement`
      })
    },
    fundSafety() {
      //跳转到资金安全
      this.$router.push({
        path: `/fundSafety`
      })
    }
  },
  computed: {},
  created() {
    //出借详情
    getInvestDetail({
      projectNo: this.projectNo
    }).then(res => {
      this.investDetail = res.data
      this.creditListData = res.data.creditList
      this.activity = res.data.activity
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.invest-detail {
  background: #eeeeee;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .inner {
    flex: 1;
    overflow: hidden;
    .pro-info {
      height: 2.45rem;
      background: url('./images/info_bg.png') 0 / contain;
      .pro-info-head {
        height: 0.65rem;
        .item-l {
          float: left;
          margin-top: 0.11rem;
          span {
            @include cube(0.65rem, 0.22rem);
            font-size: 0.16rem;
            line-height: 0.22rem;
            color: #333333;
            margin-left: 0.14rem;
          }
        }
        .item-r {
          float: right;
          span {
            @include cube(0.95rem, 0.24rem);
            color: #333333;
            margin-right: 0.4rem;
            line-height: 0.24rem;
          }
          span.overplus {
            font-size: 0.13rem;
            color: #999;
          }
          span.over_amount {
            font-size: 0.15rem;
            color: #333;
          }
        }
      }
      .pro-info-middle {
        height: 1rem;
        text-align: center;
        span {
          font-size: 0.12rem;
          color: #999;
        }
        span.per {
          color: #ec5e52;
          font-size: 0.13rem;
        }
        strong {
          font-size: 0.46rem;
          color: #ec5e52;
        }
        p {
          @include cube(1.7rem, 0.24rem);
          margin: 0 auto;
          background: #efefef;
          border-radius: 0.12rem;
          text-align: center;
          i {
            font-style: normal;
            font-size: 0.11rem;
            line-height: 0.24rem;
            color: #666;
            padding-left: 0.11rem;
          }
          img {
            vertical-align: middle;
            @include square(0.12rem);
            padding-left: 0.04rem;
          }
        }
      }
      .pro-info-bottom {
        height: 0.8rem;
        line-height: 0.8rem;
        z-index: -1;
        p {
          display: inline-block;
          width: 50%;
          text-align: center;
          span {
            font-size: 0.12rem;
            color: #999999;
            margin-right: 0.06rem;
          }
          span.start_amout {
            margin-left: 0.06rem;
          }
          b {
            font-size: 0.16rem;
            color: #333333;
          }
        }
      }
    }

    .pro-serve {
      background: #fff;
      ul {
        height: 0.56rem;
        padding-bottom: 0.08rem;
        li {
          display: inline-block;
          width: 0.93rem;
          margin-top: 0.16rem;
          span {
            font-size: 0.13rem;
            display: block;
            color: #666666;
            padding-bottom: 0.04rem;
          }
          i {
            display: block;
            height: 0.18rem;
            font-size: 0.13rem;
            color: #ffffff;
            background-image: linear-gradient(90deg, #eee, #aaa);
            padding-left: 0.04rem;
          }
        }
        li.li-one {
          width: 0.67rem;
          margin-left: 0.15rem;
        }
      }
      .serve-info {
        padding: 0.16rem 0.15rem;
        display: flex;
        justify-content: space-between;
        @include border-bottom-1px(#eee);
        span {
          width: 0.5rem;
          align-self: center;
          font-size: 0.15rem;
          color: #999;
        }
        div {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          a {
            align-self: center;
            height: 0.09rem;
            line-height: 0.09rem;
            font-size: 0.11rem;
            color: #ec5e52;
            @include border-1px(#ec5e52);
            border-radius: 0.02rem;
            margin: 0.04rem 0 0.04rem 0.08rem;
            display: inline-block;
            padding: 0.04rem;
          }
        }
        p {
          width: 0.16rem;
          font-size: 0.16rem;
          align-self: center;
          color: #999;
        }
      }
      .activity {
        height: 0.53rem;
        padding: 0.16rem 0.15rem;
        font-size: 0.15rem;
        .title {
          color: #999;
        }
        .desc {
          color: #ec5e52;
          margin-left: 0.16rem;
        }
        p {
          float: right;
          align-items: center;
          color: #999;
          font-size: 0.16rem;
        }
      }
    }
    .user-numbers {
      height: 0.5rem;
      padding: 0.08rem 0 0.08rem;
      background: #eeeeee;
      display: flex;
      align-items: center;
      .number {
        @include cube(3075rem, 0.5rem);
        background: #fff;
        font-size: 0.15rem;
        color: #999;
        img {
          @include cube(0.52rem, 0.29rem);
          margin: 0.1rem 0.08rem 0.1rem 0.51rem;
        }
        span {
          padding: 0.15rem 0;
          display: inline-block;
        }
        b {
          color: #151515;
          font-weight: normal;
        }
      }
    }
    .serve-detail {
      padding-bottom: 0.16rem;
      background: #fff;
      margin-bottom: 0.08rem;
      p.tip {
        height: 0.2rem;
        font-size: 0.15rem;
        color: #999999;
        padding: 0.16rem 0 0.08rem 0.15rem;
      }
      p.content {
        width: 3.45rem;
        font-size: 0.13rem;
        color: #333333;
        line-height: 0.22rem;
        padding-left: 0.15rem;
        margin-bottom: 0.16rem;
        padding-bottom: 0.16rem;
      }
      dl {
        height: 0.47rem;
        margin-bottom: 0.16rem;
        dt {
          float: left;
          img {
            @include square(0.36rem);
            padding-left: 0.15rem;
          }
        }
        dd {
          float: right;
          margin-right: 0.15rem;
          span {
            font-size: 0.15rem;
            color: #333333;
            padding-bottom: 0.03rem;
          }
          i {
            display: block;
            font-size: 0.13rem;
            color: #999;
            @include cube(2.93rem, 0.36rem);
          }
        }
      }
      .risk_assess {
        margin-top: 0.08rem;
        margin-bottom: 0.16rem;
      }
      .common p:nth-child(1) {
        font-size: 0.15rem;
        color: #333333;
        margin-bottom: 0.08rem;
        padding-left: 0.15rem;
      }
      .common p:nth-child(2) {
        font-size: 0.13rem;
        color: #999999;
        padding-left: 0.15rem;
        width: 3.45rem;
      }
    }
    .claims {
      height: 2rem;
      margin-bottom: 0.08rem;
      background: #fff;
      .claims_list {
        height: 0.53rem;
        @include border-bottom-1px(#eee);
        h2 {
          font-size: 0.15rem;
          color: #333333;
          float: left;
          padding: 0.16rem 0 0.16rem 0.15rem;
        }
        p {
          font-size: 0.13rem;
          color: #999999;
          float: right;
          display: flex;
          align-items: center;
          padding: 0.15rem;
          img {
            @include square(0.1rem);
            display: inline-block;
            margin-left: 0.06rem;
          }
        }
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
        tr {
          height: 0.49rem;
          td {
            width: auto;
            font-size: 0.13rem;
            color: #333333;
            @include border-bottom-1px(#eee);
            &:nth-of-type(1) {
              padding: 0.16rem 0 0.15rem 0.15rem;
            }
            &:nth-of-type(2) {
              text-align: center;
            }
            &:nth-last-of-type(1) {
              font-size: 0.13rem;
              color: #ec5e52;
              text-align: right;
              padding-right: 0.15rem;
            }
          }
        }
      }
    }
    .manage-info {
      height: 1.4rem;
      background: #fff;
      @include border-bottom-1px(#eee);
      .tip {
        font-size: 0.15rem;
        color: #999;
        padding: 0.16rem 0 0.24rem 0.15rem;
      }
      .manage {
        ul {
          display: inline-block;
          width: 33%;
          li {
            margin-top: 0.1rem;
            text-align: center;
            img {
              @include cube(0.28rem, 0.24rem);
            }
            span {
              font-size: 0.13rem;
              color: #333333;
            }
          }
        }
      }
    }
    .commonType {
      height: 0.5rem;
      background: #fff;
      margin-bottom: 0.08rem;
      h2 {
        font-size: 0.15rem;
        color: #333333;
        float: left;
        padding: 0.16rem 0 0.16rem 0.15rem;
      }
      p {
        display: flex;
        align-items: center;
        height: 0.5rem;
        float: right;
        margin-right: 0.15rem;
        img {
          @include square(0.1rem);
        }
      }
    }

    .company_info {
      box-shadow: inset 0 0.01rem 0 0 #eeeeee;
      height: 0.94rem;
      p {
        font-size: 0.13rem;
        color: #999;
        @include cube(2.55rem, 0.36rem);
        margin: 0.09rem auto 0.16rem;
        text-align: center;
      }
      span {
        display: block;
        font-size: 0.13rem;
        color: #999999;
        @include cube(1.45rem, 0.18rem);
        margin: 0 auto 0.16rem;
      }
    }
  }

  .to-lend {
    width: 100%;
    padding: 0.06rem 0;
    background: #ffffff;
    @include border-top-1px(#eee);
    .lend_btns {
      @include cube(3.45rem, 0.44rem);
      margin: 0 auto;
      background: #ec5e52;
      border-radius: 0.03rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        font-size: 0.15rem;
        color: #fff;
      }
      span {
        font-size: 0.11rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .questDlgWrap {
    position: fixed;
    z-index: 9999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.2);
    .questDlg {
      background-image: url(./images/quest_bg.png);
      background-size: 100%;
      width: 3rem;
      position: absolute;
      left: 3.5%;
      top: 31%;
      text-align: center;
      z-index: 1;
      span {
        font-size: 0.13rem;
        color: #333333;
        line-height: 0.2rem;
        display: block;
        @include cube(2.6rem, 0.4rem);
        padding: 0.27rem 0.2rem 0.18rem;
      }
    }
  }
}
</style>
