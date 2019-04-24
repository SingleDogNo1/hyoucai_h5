<template>
  <div class="invest-detail">
    <BScroll class="inner">
      <div>
        <section class="pro-info">
          <div class="pro-info-head">
            <div class="item-l">
              <span>{{ projectInfo.itemName }}</span>
            </div>
            <div class="item-r">
              <span class="overplus">剩余可投</span><br />
              <span class="over_amount">{{ projectInfo.showSurplusAmt }}</span>
            </div>
          </div>
          <div class="pro-info-middle">
            <span>历史平均年化收益率</span><br />
            <strong>{{ projectInfo.investRate }}</strong
            ><span class="per">%</span>
            <p>
              <i>{{ projectInfo.recentShow }}</i>
              <img @click="showQuestDlg()" src="./images/quest.png" alt="" />
            </p>
          </div>
          <div class="pro-info-bottom">
            <p>
              <span>锁定期</span><b>{{ projectInfo.loanMentNumber }}天</b>
            </p>
            <p>
              <b>{{ projectInfo.minInvAmount }}元</b><span class="start_amout">起投</span>
            </p>
          </div>
        </section>
        <section class="pro-serve">
          <ul>
            <li class="li-one"><span>...</span><i>募集期</i></li>
            <li>
              <span>{{ projectInfo.assumptiveInvestDate }}</span
              ><i>投资完成</i>
            </li>
            <li>
              <span>{{ projectInfo.assumptiveInterestDate }}</span
              ><i>起息</i>
            </li>
            <li>
              <span>{{ projectInfo.assumptiveIncomeDate }}</span
              ><i>锁定期结束</i>
            </li>
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
        <section class="user-numbers" @click="linkTo('DJSLendRecord', { projectNo: projectNo })">
          <div class="number">
            <img src="./images/users_img.png" alt="" />
            <span>
              &middot;&nbsp;&middot;&nbsp;&middot;&nbsp;已有<b>{{ projectInfo.investPeopleCount }}</b> 位用户投标成功
            </span>
          </div>
        </section>
        <section class="serve-detail">
          <p class="tip">服务介绍</p>
          <p class="content">{{ investDetail.appDesc }}</p>
          <ul v-for="(item, index) in investDetail.projectServiceEntity" :key="index">
            <li v-if="item.isShowPic === '1'">
              <img src="./images/icon_01.png" alt="" />
            </li>
            <li>
              <h6>{{ item.serviceName }}</h6>
              <p>{{ item.serviceMessage }}</p>
            </li>
          </ul>
          <div class="risk_assess common">
            <p class="risk_title">项目风险评估及可能产生的风险结果</p>
            <p class="risk_content">{{ investDetail.riskAppraisal }}</p>
          </div>
          <div class="lend_tip common">
            <p class="lend_title">出借人适当性管理提示</p>
            <p class="lend_content">{{ investDetail.riskManagementTip }}</p>
          </div>
        </section>
        <section class="claims">
          <div class="claims_list">
            <h2>债权列表</h2>
            <p @click="linkTo('DJSClaimList', { projectNo: projectNo })">
              <span>全部</span>
              <span class="iconfont icon-rightpage"></span>
            </p>
          </div>
          <table>
            <tr v-for="(item, index) in claimListData" :key="index">
              <td>{{ item.borrowerUsername }}</td>
              <td>{{ item.loanAmt }}</td>
              <td @click="linkTo('DJSClaimDetail', { id: item.id })">详情</td>
            </tr>
          </table>
        </section>
        <section class="manage-info">
          <p class="tip">服务介绍</p>
          <div class="manage">
            <ul @click="linkTo('complianceManagement')">
              <li><img src="./images/icon_03.png" alt="" /></li>
              <li><span>合规管理</span></li>
            </ul>
            <ul @click="linkTo('selectMeans')">
              <li><img src="./images/icon_04.png" alt="" /></li>
              <li><span>严选资产</span></li>
            </ul>
            <ul @click="linkTo('fundSafety')">
              <li><img src="./images/icon_05.png" alt="" /></li>
              <li><span>资金安全</span></li>
            </ul>
          </div>
        </section>
        <section class="risk_tips commonType">
          <h2>风险告知书</h2>
          <p><i class="iconfont icon-rightpage"></i></p>
        </section>
        <section class="questions commonType">
          <h2>常见问题</h2>
          <p><i class="iconfont icon-rightpage"></i></p>
        </section>
        <section class="company_info">
          <p>由江西汇通金融信息服务有限公司提供网络借贷信息中介服务</p>
          <span>网贷有风险，借贷需谨慎</span>
        </section>
      </div>
    </BScroll>
    <!-- 服务弹窗 -->
    <div v-if="showQuest" class="questDlgWrap" @click="showQuest = !showQuest">
      <div class="questDlg">
        <span>{{ projectInfo.recentTips }}</span>
      </div>
    </div>
    <Dialog class="serve-dialog" :show.sync="serveDialog.show">
      <div>
        <p>aaaa</p>
      </div>
    </Dialog>
    <section class="to-lend">
      <div class="lend_btns" @click="invest">
        <p>授权出借</p>
        <span>剩余可投{{ projectInfo.showSurplusAmt }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'
import { getInvestDetail, getClaimList } from '@/api/hyc/investDetail'
export default {
  name: 'index',
  components: {
    BScroll
  },
  data() {
    return {
      productId: this.$route.query.productId,
      itemId: this.$route.query.itemId,
      userName: getUser().userName,
      authorization: getAuth(),
      projectInfo: {
        investRate: '', // 利率
        itemName: '', // 集合标项目名称
        showSurplusAmt: '', // 剩余可投金额
        investPeopleCount: '', // 已购人次
        minInvAmount: '', // 起投金额
        assumptiveInvestDate: '', //投资完成
        assumptiveInterestDate: '', //起息
        assumptiveIncomeDate: '', //锁定期结束
        projectServiceEntity: [] // 服务
      },
      investDetail: {
        appDesc: '', // 项目介绍
        riskAppraisal: '', // 项目风险评估及可能产生的风险结果
        riskManagementTip: '' // 出借人适当性管理提示
      },
      claimListData: [], //债权列表
      serveDialog: {
        show: false
      },
      showQuest: false,
      activity: [] //活动
    }
  },
  methods: {
    linkTo(routerName, routerQuery = {}) {
      this.$router.push({
        name: routerName,
        query: routerQuery
      })
    },
    judge() {
      //服务弹框
      this.serveDialog.show = true
    },
    showQuestDlg() {
      //点击问号弹框
      this.showQuest = true
    },
    invest() {
      this.$router.push({
        name: 'DJSInvestFlow',
        query: {
          projectNo: this.projectNo
        }
      })
    }
  },
  created() {
    let postData = {
      productId: this.productId,
      itemId: this.itemId,
      userName: this.userName,
      authorization: this.authorization
    }
    //出借详情
    getInvestDetail(postData).then(res => {
      let data = res.data.data
      this.projectInfo = data.projectInfo
      this.investDetail = data.investDetail
      this.activity = data.activityInfoVos
    })

    postData.curPage = '1'
    postData.maxLine = '3'
    getClaimList(postData).then(res => {
      this.claimListData = res.data.data.list
    })
  }
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
            &.overplus {
              font-size: 0.13rem;
              color: #999;
            }
            &.over_amount {
              font-size: 0.15rem;
              color: #333;
            }
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
      ul {
        padding: 0.08rem 0.15rem;
        display: flex;
        margin-bottom: 0.08rem;
        li {
          &:first-child {
            width: 0.5rem;
          }
          &:last-child {
            flex: 1;
          }
          img {
            @include square(0.36rem);
            margin-right: 0.16rem;
          }
          h6 {
            font-size: 0.15rem;
            margin-bottom: 0.1rem;
          }
          p {
            display: block;
            font-size: 0.13rem;
            color: #999;
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
      margin-bottom: 0.08rem;
      padding-bottom: 0.16rem;
      background: #fff;
      .claims_list {
        height: 0.53rem;
        display: flex;
        justify-content: space-between;
        @include border-bottom-1px(#eee);
        h2 {
          font-size: 0.15rem;
          color: #333333;
          padding: 0.16rem 0 0.16rem 0.15rem;
        }
        p {
          color: #999999;
          display: flex;
          align-items: center;
          padding: 0.15rem;
          span {
            font-size: 0.13rem;
            &:last-child {
              font-size: 0.12rem;
              margin-left: 0.1rem;
              transform: translateY(0.01rem);
            }
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
        i {
          color: #999;
          font-size: 0.13rem;
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
