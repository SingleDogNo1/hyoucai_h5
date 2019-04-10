<template>
  <BScroll class="invest-detail">
     <section class="pro-info">
         <div class="pro-info-head">
            <div class="item-l"><span>汇选投(30天)</span></div>
            <div class="item-r">
            	<span class="overplus">剩余可投</span><br>
              <span class="over_amount">38.71万</span>
            </div>
         </div>
         <div class="pro-info-middle">
         	  <center>
         	  	 <span>历史平均年化收益率</span><br>
         	  	 <strong>11.0</strong><span class="per">%</span>
         	  	 <p><i>近期表现 8.00% ～ 8.00%</i><img src="./images/quest.png"/> </p>
         	  </center>
         </div>
         <div class="pro-info-bottom">
         	  <p><span>锁定期</span><b>90天</b></p>
         	  <p><b>1000元</b><span class="start_amout">起投</span></p>
         </div>
     </section>
     
     <section class="pro-serve">
     	  <ul>
     	  	<li class="li-one"><span>...</span><i>募集期</i></li>
     	  	<li><span>2018-11-29</span><i>投资完成</i></li>
     	  	<li><span>2018-11-30</span><i>起息</i></li>
     	  	<li><span>2019-02-28</span><i>锁定期结束</i></li>
     	  </ul>
     	  <div class="serve-info">
     	  	<span>服务</span>
     	  	<a href="javascript:;">不可提前退出</a>
     	  	<a href="javascript:;">等额本息</a>
     	  	<a href="javascript:;">0费用</a>
     	  	<p @click="judge()"><img src="./images/more.png" /></p>
     	  </div>
     	  <div class="countdown">
     	  	<span class="title">募集倒计时</span>
          <span class="large">9天 10:45:44</span>
     	  </div>
     	  <div class="activity">
     	  	<span class="title">活动</span>
          <span class="desc">投资6,95万，免费送华为mate手机</span>
          <p><img src="./images/more.png" /></p>
     	  </div>
     </section>
     <section class="user-numbers">
     	 <div class="number">
     	 	 <img src="./images/users_img.png" />
     	 	 <span>··· 已有<b>158537</b>位用户投标成功</span>
     	 </div>
     </section>
     <section class="serve-detail">
     	  <p class="tip">服务介绍</p>
     	  <p class="content">随着房产市场竞争的日益激烈， 企业越早获得准确的房屋信息就能越早和业主建立直接的联系， 从而成功把握更多的商机。我们在在北京的信息员均有着多年的房产信息收集经验， 能够通过各种媒体渠道、</p>
     	  <dl>
     	  	<dt><img src="./images/icon_01.png" /></dt>
     	  	<dd><span>自动投标</span><br><i>系统自动根据用户确认的投标条件完成分散投标以降低风险</i></dd>
     	  </dl>
     	  <dl>
     	  	<dt><img src="./images/icon_02.png" /></dt>
     	  	<dd><span>自动投标</span><br><i>系统自动根据用户确认的投标条件完成分散投标以降低风险</i></dd>
     	  </dl>
     	  <div class="risk_assess common">
     	  	<p class="risk_title">项目风险评估及可能产生的风险结果</p>
     	  	<p class="risk_content">根据借款人当前情况进行评估，借款人具有偿还贷款的能力，但不排除未来借款人因收入下降、过度举债等因素导致财务状况恶化，从而发生逾期的可能。</p>
     	  </div>
     	  <div class="lend_tip common">
     	  	<p class="lend_title">出借人适当性管理提示</p>
     	  	<p class="lend_content">1.该标的的每一个借款人在本平台借款余额未超过20万元，符合监管政策要求；<br>
2.出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任，包括但不限于可能的本息损失。网贷有风险，出借需谨慎。</p>
     	  </div>
     </section>
     <section class="claims">
     	  <div class="claims_list">
     	  	<h2>债权列表</h2>
     	  	<p @click="pathClaim('DJSClaimList')">全部<img src="./images/more.png" /></p>
     	  </div>
     	  <table>
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
     	  </table>
     </section>
     <section class="manage-info">
     	 <p class="tip" >服务介绍</p>
     	 <div class="manage">
     	 	  <ul>
     	 	  	<li><img src="./images/icon_03.png" /></li>
     	 	  	<li><span>合规管理</span></li>
     	 	  </ul>
     	 	  <ul>
     	 	  	<li><img src="./images/icon_04.png" /></li>
     	 	  	<li><span>严选资产</span></li>
     	 	  </ul>
     	 	  <ul>
     	 	  	<li><img src="./images/icon_05.png" /></li>
     	 	  	<li><span>资金安全</span></li>
     	 	  </ul>
     	 </div>
     </section>
     <section class="risk_tips commonType">
     	 	 <h2>风险告知书</h2>
     	   <p><img src="./images/more.png" /></p>
     </section>
     <section class="questions commonType">
     	  <h2>常见问题</h2>
     	  <p><img src="./images/more.png" /></p>
     </section>
     <section class="company_info">
     	  <p>由江西汇通金融信息服务有限公司提供网络借贷信息中介服务</p>
     	  <span>网贷有风险，借贷需谨慎</span>
     </section>
     <section class="to-lend">
     	  <div class="lend_btns">
     	  	<p>授权出借</p>
     	  	<span>剩余可投57.29万</span>
     	  </div>
     </section>
    <!-- 服务弹窗 -->
    <Dialog class="serve-dialog" :show.sync="serveDialog.show">
      <div>
        <p>aaaa</p>
      </div>
    </Dialog>
  </BScroll>
</template>


<script>
import BScroll from '@/components/BScroll/BScroll'
import Dialog from '@/components/Dialog/Serve'
export default {
  name: 'index',
  mixins: [],
  components: {
    BScroll,
    Dialog
  },
  data() {
    return {
      serveDialog: {
        show: false
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    pathClaim(router_name) {
      this.$router.push({
        name: router_name
      })
    },
    judge() {
      this.serveDialog.show = true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/theme';
.invest-detail {
  background: #eeeeee;
  overflow-y: auto;
  height: 100%;
  .pro-info {
    height: 246px;
    background-image: url('./images/info_bg.png');
    background-size: 100%;
    .pro-info-head {
      height: 65px;
      .item-l {
        float: left;
        margin-top: 11px;
        span {
          width: 94px;
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          color: #333333;
          margin-left: 14px;
        }
      }
      .item-r {
        float: right;
        span {
          width: 94px;
          height: 24px;
          color: #333333;
          margin-right: 40px;
          line-height: 24px;
        }
        span.overplus {
          font-size: 13px;
          color: #999999;
        }
        span.over_amount {
          font-size: 15px;
          color: #333333;
        }
      }
    }
    .pro-info-middle {
      height: 101px;
      span {
        font-size: 12px;
        color: #999999;
      }
      span.per {
        color: #ec5e52;
        font-size: 13px;
      }
      strong {
        font-size: 46px;
        color: #ec5e52;
      }
      p {
        width: 170px;
        height: 24px;
        background: #efefef;
        border-radius: 12px;
        display: flex;
        align-items: center;
        i {
          font-style: normal;
          font-size: 11px;
          color: #666666;
          line-height: 24px;
          padding-left: 11px;
        }
        img {
          display: inline-block;
          vertical-align: middle;
          height: 12px;
          width: 12px;
          padding-left: 4px;
        }
      }
    }
    .pro-info-bottom {
      height: 80px;
      line-height: 80px;
      p {
        display: inline-block;
        width: 50%;
        text-align: center;
        span {
          font-size: 12px;
          color: #999999;
          margin-right: 6px;
        }
        span.start_amout {
          margin-left: 6px;
        }
        b {
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }

  .pro-serve {
    height: 217px;
    background: #fff;
    ul {
      height: 56px;
      li {
        display: inline-block;
        width: 93px;
        margin-top: 16px;
        span {
          font-size: 13px;
          color: #666666;
          padding-bottom: 4px;
        }
        i {
          display: block;
          height: 18px;
          font-size: 13px;
          color: #ffffff;
          background-image: linear-gradient(90deg, #eeeeee 0%, #aaaaaa 100%);
          padding-left: 4px;
        }
      }
      li.li-one {
        width: 67px;
        margin-left: 15px;
      }
    }
    .serve-info {
      padding: 16px 15px;
      border-bottom: 1px solid #eeeeee;
      span {
        font-size: 15px;
        color: #999999;
      }
      a {
        height: 9px;
        line-height: 9px;
        font-size: 11px;
        color: #ec5e52;
        letter-spacing: 0.13px;
        border: 1px solid #ec5e52;
        border-radius: 2px;
        margin-left: 8px;
        display: inline-block;
        padding: 4px;
      }
      p {
        float: right;
        align-items: center;
        img {
          height: 10px;
          width: 10px;
          margin: 6px auto;
        }
      }
    }
    .countdown {
      height: 53px;
      border-bottom: 1px solid #eeeeee;
      padding: 16px 15px;
      font-size: 15px;
      color: #999999;
      .title {
        letter-spacing: 0.18px;
      }
      .large {
        float: right;
      }
    }
    .activity {
      height: 53px;
      padding: 16px 15px;
      font-size: 15px;
      .desc {
        color: #ec5e52;
        margin-left: 16px;
      }
      p {
        float: right;
        align-items: center;
        img {
          height: 10px;
          width: 10px;
          margin: 6px auto;
        }
      }
    }
  }
  .user-numbers {
    height: 50px;
    padding: 8px 0 8px;
    background: #eeeeee;
    display: flex;
    align-items: center;
    .number {
      height: 50px;
      width: 375px;
      background: #fff;
      font-size: 15px;
      color: #999999;
      img {
        height: 20px;
        width: 52px;
        margin: 15px 8px 15px 51px;
      }
      span {
        padding: 15px 0px;
        display: inline-block;
      }
      b {
        color: #151515;
        font-weight: normal;
      }
    }
  }
  .serve-detail {
    height: 526px;
    background: #fff;
    margin-bottom: 8px;
    p.tip {
      height: 21px;
      width: 61px;
      font-size: 15px;
      color: #999999;
      letter-spacing: 0.18px;
      padding: 16px 0 8px 15px;
    }
    p.content {
      width: 345px;
      height: 89px;
      font-size: 13px;
      color: #333333;
      letter-spacing: 0.16px;
      line-height: 22px;
      padding-left: 15px;
      margin-bottom: 16px;
    }
    dl {
      height: 47px;
      margin-bottom: 16px;
      dt {
        float: left;
        img {
          height: 36px;
          width: 36px;
          padding-left: 15px;
        }
      }
      dd {
        float: right;
        margin-right: 15px;
        span {
          font-size: 15px;
          color: #333333;
          letter-spacing: 0.18px;
          padding-bottom: 3px;
        }
        i {
          display: block;
          font-size: 13px;
          color: #999999;
          letter-spacing: 0.16px;
          width: 293px;
          height: 36px;
        }
      }
    }
    .risk_assess {
      margin-top: 8px;
      margin-bottom: 16px;
    }
    .common p:nth-child(1) {
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.18px;
      margin-bottom: 8px;
      padding-left: 15px;
    }
    .common p:nth-child(2) {
      font-size: 13px;
      color: #999999;
      letter-spacing: 0.16px;
      padding-left: 15px;
      width: 345px;
    }
  }
  .claims {
    height: 203px;
    margin-bottom: 8px;
    background: #fff;
    .claims_list {
      height: 53px;
      border-bottom: 1px solid #eeeeee;
      h2 {
        font-size: 15px;
        color: #333333;
        letter-spacing: 0.18px;
        float: left;
        padding: 16px 0 16px 15px;
      }
      p {
        font-size: 13px;
        color: #999999;
        letter-spacing: 0.16px;
        float: right;
        display: flex;
        align-items: center;
        padding: 15px;
        img {
          height: 10px;
          width: 10px;
          display: inline-block;
          margin-left: 6px;
        }
      }
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      width: 100%;
      tr {
        height: 49px;
        td {
          width: auto;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0.16px;
          border-bottom: 1px solid #eeeeee;
          &:nth-of-type(1) {
            padding: 16px 0 15px 15px;
          }
          &:nth-of-type(2) {
            text-align: center;
          }
          &:nth-last-of-type(1) {
            font-size: 13px;
            color: #ec5e52;
            letter-spacing: 0.16px;
            text-align: right;
            padding-right: 15px;
          }
        }
      }
    }
  }
  .manage-info {
    height: 141px;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    .tip {
      font-size: 15px;
      color: #999;
      letter-spacing: 0.18px;
      padding: 16px 0 24px 15px;
    }
    .manage {
      ul {
        display: inline-block;
        width: 33%;
        li {
          margin-top: 10px;
          text-align: center;
          img {
            height: 28px;
            width: 24px;
          }
          span {
            font-size: 13px;
            color: #333333;
          }
        }
      }
    }
  }
  .commonType {
    height: 50px;
    background: #fff;
    margin-bottom: 8px;
    h2 {
      font-size: 15px;
      color: #333333;
      letter-spacing: 0.18px;
      float: left;
      padding: 16px 0 16px 15px;
    }
    p {
      display: flex;
      align-items: center;
      height: 50px;
      float: right;
      margin-right: 15.1px;
      img {
        height: 10px;
        width: 10px;
      }
    }
  }

  .company_info {
    box-shadow: inset 0 1px 0 0 #eeeeee;
    height: 94px;
    p {
      font-size: 13px;
      color: #999999;
      letter-spacing: 0.16px;
      height: 36px;
      width: 255px;
      margin: auto;
      margin: 9px auto 16px;
      text-align: center;
    }
    span {
      font-size: 13px;
      color: #999999;
      letter-spacing: 0.16px;
      width: 145px;
      height: 18px;
      display: block;
      margin: 0 auto 16px;
    }
  }
  .to-lend {
    height: 56px;
    .lend_btns {
      margin: 6px 15px;
      width: 345px;
      height: 44px;
      background: #ec5e52;
      border-radius: 3px;
      text-align: center;
      p {
        font-size: 15px;
        color: #ffffff;
        letter-spacing: 0.18px;
        padding-top: 4px;
      }
      span {
        font-size: 11px;
        color: #ffffff;
        letter-spacing: 0.13px;
        opacity: 0.6;
      }
    }
  }
}
</style>
