<template>
  <div class="about-us" ref="container">
    <b-scroll class="scroll" ref="scrollRef">
      <div class="about-us-wrapper">
        <!-- 公司介绍 -->
        <section class="intro">
          <div class="title"></div>
          <div class="info com_info">
            <p>
              汇有财隶属于江西汇通金融信息服务有限公司旗下，江西汇通金融信息服务有限公司2013年3月22日在江西省南昌市红谷滩新区注册成立，通过科技驱动金融创新，为中国广大优质用户提供高效、便捷、个性化的信贷咨询服务，是江西省首批金融信息服务类企业。
            </p>
            <p>
              汇通金融所有资产均从市场调研，产品设计，渠道拓展，广告推广，订制配套的评分卡、催收策略，征信数据采集等每个专业环节都自主开发完成，确保向机构与中小出借者客户提供的资产质量的可辨、可防、可控。
            </p>
          </div>
        </section>
        <!-- 高管介绍 -->
        <div class="manager">
          <div class="title"></div>
          <div class="wrapper">
            <div class="icon"></div>
            <div class="content">
              <h2>陈跃文</h2>
              <div class="position">首席执行官 CEO</div>
              <p class="text">
                华东师范大学硕士研究生学历，拥有工科硕士学位。在公司运营、营销及风控领域拥有超过10年的管理经验，擅长金融风险管理。历任GSK（葛兰素史克），Pfizer(辉瑞制药)金融事业部核心管理岗位，对公司治理有着极深的理解。
              </p>
            </div>
          </div>
          <div class="wrapper">
            <div class="content">
              <h2>傅伟菱</h2>
              <div class="position">首席运营官 COO</div>
              <p class="text">
                拥有超过20年的风险管理经验，也是台湾最早一批加入信用卡风控领域的管理者，经历了台湾信用卡的成长及卡债风暴，积累丰富的行业经验，并且长期领导信贷风险团队取得骄人的成绩。曾任台湾汇丰银行个人零售部风险管理副理及资产管理公司法务催收资深协理。
              </p>
            </div>
            <div class="icon"></div>
          </div>
          <!--<div class="wrapper">-->
          <!--<div class="icon"></div>-->
          <!--<div class="content">-->
          <!--<h2>罗琴</h2>-->
          <!--<div class="position">首席营销官 CMO</div>-->
          <!--<p class="text">2003年毕业于英国伦敦（HAMMERSMITH OF WEST LONDON COLLEGE）-->
          <!--曾任职于建设银行、招商银行，拥有多年银行工作经验，为资深品牌营销专家，于后正式加入汇通金融，凭借着丰富的销售技巧及专业的大客户维护经验，带领销售团队屡创佳绩，在公司树立了整合营销的新标杆。</p>-->
          <!--</div>-->
          <!--</div>-->
          <div class="wrapper">
            <div class="icon"></div>
            <div class="content">
              <h2>林可正</h2>
              <div class="position">首席风控官 CRO</div>
              <p class="text">
                20年以上消费金融经验，是知名的风险专家。加入担任汇通特邀风控专家顾问之前，曾担任台湾汇丰银行信用风险资深副总裁，1995核准台湾汇丰银行第一张信用卡。2002年在美国加州Sunshine
                Investment担任underwriter，2006年主持台湾汇丰银行坏帐计算模型设计与开发，拥有美国伊利诺伊大学香槟校区财务管理硕士学位。
              </p>
            </div>
          </div>
          <div class="wrapper">
            <div class="content">
              <h2>王东东</h2>
              <div class="position">首席财务官 CFO</div>
              <p class="text">
                拥有20年以上知名企业财务会计及审计工作经验，熟悉企业内部控制和税收筹划，毕业于江西财经大学会计专业，曾任江西省诚信税务师事务所副总经理，分管金融机构审计咨询服务。
              </p>
            </div>
            <div class="icon"></div>
          </div>
        </div>
        <!-- 股东组成 -->
        <div class="shareholders">
          <div class="title"></div>
          <div class="shareholder-item" id="shareholders" ref="shareholders"></div>
        </div>
        <!-- 组织架构 -->
        <div class="organization">
          <div class="title"></div>
          <div class="big">江西汇通金融信息服务有限公司</div>
          <div class="swiper-container" id="struct">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in organization" :key="index">
                <h1>{{ item.name }}</h1>
                <ul>
                  <li v-for="value in item.include" :key="value">{{ value }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 基本信息 -->
        <div class="basic-info">
          <div class="title"></div>
          <div class="desc">
            <ul>
              <li>
                <p>公司全称：</p>
                <span>江西汇通金融信息服务有限公司</span>
              </li>
              <li>
                <p>公司简称：</p>
                <span>汇有财</span>
              </li>
              <li>
                <p>注册资本：</p>
                <span>3000 万元</span>
              </li>
              <li>
                <p>实缴资本：</p>
                <span>3000 万元</span>
              </li>
              <li>
                <p>注册地址：</p>
                <span>江西省南昌市红谷滩新区红谷中大道1669号华尔登商业中心喜来登酒店、办公楼写字楼3105-3106室</span>
              </li>
              <li>
                <p>成立时间：</p>
                <span>2013年3月22日</span>
              </li>
              <li>
                <p>经营期限：</p>
                <span>2013年03月22日至2033年03月21日</span>
              </li>
              <li>
                <p>经营状态：</p>
                <span>开业</span>
              </li>
              <li>
                <p>法人代表：</p>
                <span>陈跃文</span>
              </li>
              <li :style="{ paddingBottom: showAllInfo ? 0 : '0.24rem' }">
                <p>网站 IP 地址：</p>
                <span>112.74.159.32</span>
              </li>
            </ul>
          </div>
          <div v-if="showAllInfo">
            <ul>
              <li>
                <p>在职人数：</p>
                <span>99</span>
              </li>
              <li>
                <p>上线时间：</p>
                <span>2013年3月22日</span>
              </li>
              <li>
                <p>客服热线：</p>
                <span>400-099-7979</span>
              </li>
              <li>
                <p>统一社会信用代码：</p>
                <span>9136012506349444XD</span>
              </li>
              <li>
                <p>APP上线时间：</p>
                <span>2016年10月</span>
              </li>
              <li>
                <p>微信公众号：</p>
                <span>huiyoucaidyh</span>
              </li>
              <li>
                <p>资金存管：</p>
                <span>江西银行存管</span>
              </li>
              <li>
                <p>存管时间上线：</p>
                <span>2017年9月</span>
              </li>
              <li>
                <p>A轮融资：</p>
                <span>3000万元</span>
              </li>
              <li>
                <p>经营地址：</p>
                <span>江西省南昌市红谷滩新区红谷中大道1669号华尔登商业中心喜来登酒店、办公楼写字楼3105-3106室 </span>
              </li>
              <li>
                <p>公安部认证：</p>
                <span>公安部安全等级三级认证</span>
              </li>
              <li>
                <p>分支机构：</p>
                <span>暂无</span>
              </li>
              <li>
                <p>经营范围：</p>
                <span
                  >接受金融机构委托从事金融信息技术外包；接受金融机构委托从事金融业务流程外包；接受金融机构委托从事金融知识流程外包；金融产品的研发、设计、咨询服务；金融信息和经济信息咨询服务；市场调查（不含社会调查）及数据分析服务；计算机软硬件开发；出借管理服务；出借咨询服务；电子产品网上销售（以上项目国家有专项规定的凭许可证、资质证或其他批准文件经营）
                </span>
              </li>
            </ul>
          </div>
          <button v-show="!showAllInfo" @click="showMore">展开全部</button>
        </div>
        <!-- 重大事项信息 -->
        <div class="great-things">
          <div class="title"></div>
          <table cellspacing="0">
            <tr>
              <td>
                公司减资、合并、解散或申请破产
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司依法进入破产程序
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司被责令停业、整顿、关闭
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司涉及重大诉讼、仲裁、或者涉嫌违法违规被有关机构调查，或受到刑事处罚
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司涉及重大诉讼、仲裁、或者涉嫌违法违规被有关机构调查，或受到重大行政处罚
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司法定代表人、实际控制人、主要责任人、董事、监事、高级管理人员涉及重大诉讼、仲裁、或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司法定代表人、持股5%以上的股东，实际控制人、主要责任人、董事、监事、高级管理人员的变更信息
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                公司主要或者全部业务陷入停顿
              </td>
              <td>无</td>
            </tr>
            <tr>
              <td>
                存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动等重大事项
              </td>
              <td>无</td>
            </tr>
          </table>
        </div>
        <!-- 资质荣誉 -->
        <div class="honor">
          <div class="title"></div>
          <div class="swiper-container" id="honor">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in honorPics" :key="index" @click="fullScreen(index)">
                <img :src="item" alt="" />
              </div>
            </div>
          </div>
        </div>

        <!-- 资费标准 -->
        <div class="fee_wrapper">
          <div class="title"></div>
          <table cellspacing="0">
            <tr>
              <th width="50%">业务类型</th>
              <th width="50%">资费标准</th>
            </tr>
            <tr>
              <td>注册</td>
              <td>免费</td>
            </tr>
            <tr>
              <td>充值</td>
              <td>免费</td>
            </tr>
            <tr>
              <td>提现</td>
              <td>免费</td>
            </tr>
            <tr>
              <td>开通银行存管</td>
              <td>免费</td>
            </tr>
            <tr>
              <td>投标</td>
              <td>免费</td>
            </tr>
            <tr>
              <td>回款到账</td>
              <td>免费</td>
            </tr>
          </table>
        </div>
        <div class="zfbz">
          <img src="./zfbz.png" alt="" />
        </div>
        <!-- 联系我们 -->
        <div class="contact">
          <h1 class="title"></h1>
          <div class="map"></div>
          <div class="desc">
            <p>地址：</p>
            <span>江西省南昌市红谷滩新区红谷中大道1669号华尔登商业中心喜来登酒店、办公楼写字楼3105—3106室</span>
          </div>
          <div>
            <p>咨询、投诉、举报联系电话：</p>
            <span>400-099-7979</span>
          </div>
          <div>
            <p>联系时间：</p>
            <span>周一到周五：09：00-12：00 13：00-18：00</span>
          </div>
          <div>
            <p>咨询、投诉、举报电子邮箱：</p>
            <span>cs@idjshi.com</span>
          </div>
          <p>
            如果您在使用汇有财的过程中有任何疑问，<br />
            请您与汇有财客服人员联系。
          </p>
        </div>
        <img src="@/assets/imgs/cyw-sign.png" alt="" width="100%" height="1.41rem" />
      </div>
    </b-scroll>
    <div class="honor-mask" ref="originImg">
      <div class="swiper-wrapper"></div>
    </div>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import Swiper from 'swiper/dist/js/swiper'

import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)

export default {
  components: {
    BScroll
  },
  data() {
    return {
      mobile: this.$route.query.mobile,
      text: '关于我们',
      organization: [
        {
          name: '风控审核中心',
          include: ['风险策略部', '贷前审核部', '反欺诈部', '贷后管理部', '法务诉讼部']
        },
        {
          name: '市场营销中心',
          include: ['市场运营部', '推广部', '品牌部']
        },
        {
          name: '客户服务中心',
          include: ['电销部', '客服部']
        },
        {
          name: '运营管理中心',
          include: ['运营部', '数据分析部']
        },
        {
          name: '产品设计中心',
          include: ['产品部', '设计部', '研发部']
        },
        {
          name: '职能管理中心',
          include: ['人事行政部', '财务部', '法务部', '内部审计部']
        }
      ],
      showAllInfo: false, // 是否显示全部基本信息
      honorPics: [
        require('./zz-big01.jpg'),
        require('./zz-big02.jpg'),
        require('./zz-big03.jpg'),
        require('./zz-big04.jpg'),
        require('./zz-big05.jpg'),
        require('./zz-big06.jpg'),
        require('./zz-big07.jpg'),
        require('./zz-big08.jpg'),
        require('./zz-big09.jpg'),
        require('./zz-big10.jpg'),
        require('./zz-big11.png')
      ]
    }
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.$refs.scrollRef.refresh()
      })
    },
    initChart() {
      const [width, height] = [this.$refs.shareholders.clientWidth, this.$refs.shareholders.clientHeight]
      Highcharts.chart('shareholders', {
        navigation: {
          buttonOptions: {
            enabled: false
          }
        },
        credits: {
          enabled: false
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          height: height,
          width: width
        },
        title: {
          text: null
        },
        colors: ['#F1637C', '#FAD446', '#45a1ff'],
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [
          {
            data: [
              {
                name: '傅振锋',
                y: 41
              },
              {
                name: '刘韬',
                y: 39
              },
              {
                name: '江西恒科投资有限公司',
                y: 20
              }
            ]
          }
        ]
      })
    },
    initSwiper() {
      const width = this.$refs.container.clientWidth
      new Swiper('#struct', {
        lazy: {
          loadPrevNext: true
        },
        slidesPerView: 2.5,
        spaceBetween: 20,
        slidesOffsetBefore: width * 0.04,
        slidesOffsetAfter: width * 0.04
      })
      new Swiper('#honor', {
        lazy: {
          loadPrevNext: true
        },
        freeMode: true,
        slidesPerView: 2.5,
        spaceBetween: 20,
        slidesOffsetBefore: width * 0.04,
        slidesOffsetAfter: width * 0.04
      })
    },
    showMore() {
      this.showAllInfo = !this.showAllInfo
      this.refresh()
    },
    fullScreen(index) {
      this.swiperP.virtual.appendSlide(
        `<div class="swiper-zoom-container">
          <img src="${this.honorPics[index]}"/>
        </div>`
      )
      this.$refs.originImg.style.display = 'block'
      this.swiperStatus = true
    }
  },
  created() {
    this.$nextTick(() => {
      if (!this.mobile) {
        this.$refs.container.style.top = 0.44 + 'rem'
      }
      this.refresh()
      this.initChart()
      this.initSwiper()

      const $this = this
      this.swiperP = new Swiper('.honor-mask', {
        zoom: true,
        width: window.innerWidth,
        virtual: true,
        spaceBetween: 20,
        on: {
          click() {
            $this.$refs.originImg.style.display = 'none'
            this.virtual.slides.length = 0
            this.virtual.cache = []
            this.swiperStatus = false
          }
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
@import '../../../assets/css/mixins.scss';

/deep/ .swiper-pagination-bullet {
  background: rgba(43, 43, 43, 0.5);
}

/deep/ .swiper-pagination-bullet-active {
  background: #2b2b2b;
}

.about-us {
  height: 100%;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .about-us-wrapper {
    .intro {
      @include cube(100%, 2.77rem);
      padding: 0.24rem 0.16rem 0.13rem;
      box-sizing: border-box;
      @include bg-image('intro');
      background-size: contain;
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0 auto;
        background-size: 100% 100%;
        @include bg-image('com_infro');
      }
      .info {
        margin: 0.15rem 0 0.26rem 0;
        line-height: 0.21rem;
        font-size: $font-size-small-s;
        color: #fff;
      }
    }
    .manager {
      @include cube(100%, 10.63rem);
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: contain;
        @include bg-image('leaderintro');
      }
      .wrapper {
        display: flex;
        margin-bottom: 0.4rem;
        .icon {
          width: 1.45rem;
          height: 1.83rem;
          background-size: cover;
        }
        .content {
          flex: 1;
          padding: 0 0.15rem;
          font-size: $font-size-small-s;
          color: $color-text;
          h2 {
            font-size: $font-size-medium;
            font-weight: bold;
          }
          .position {
            margin-bottom: 0.16rem;
            color: $color-text-s;
          }
          .text {
            line-height: 0.2rem;
          }
        }
        $leaders: wangdongdong, linkezheng, fuweiling, chenyuewen;
        @each $leader in $leaders {
          $i: index($leaders, $leader);
          &:nth-last-of-type(#{$i}) {
            .icon {
              @include bg-image(#{$leader});
            }
          }
        }
      }
    }
    .shareholders {
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('holders');
      }
      .shareholder-item {
        width: 100%;
        height: 2.34rem;
      }
    }
    .organization {
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('organization');
      }
      .big {
        @include radiusCube(2.37rem, 0.45rem);
        text-align: center;
        line-height: 0.45rem;
        border: 1px solid $color-theme;
        margin: 0.2rem auto;
        font-size: $font-size-small;
        color: $color-text;
      }
      #struct {
        padding-bottom: 0.24rem;
        .swiper-slide {
          background: #f5f5f5;
          text-align: center;
          h1 {
            $height: 0.45rem;
            background-image: linear-gradient(-180deg, #fae500 0%, #f4c700 100%);
            border-radius: 0.08rem 0.08rem 0 0;
            height: $height;
            line-height: $height;
            font-size: 0.15rem;
            color: $color-text;
            font-weight: bold;
          }
          li {
            font-size: 0.13rem;
            margin: 0.1rem 0;
          }
        }
      }
    }
    .basic-info {
      padding: 0 0.16rem;
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('basicInfo');
      }
      li {
        display: flex;
        font-size: 0.15rem;
        color: $color-text;
        margin: 0.06rem 0;
        &:last-child {
          padding-bottom: 0.24rem;
        }
        span {
          flex: 1;
          color: $color-text-s;
          line-height: 1.65;
        }
      }
      button {
        @include cube(0.98rem, 0.34rem);
        display: block;
        margin: 0 auto;
        background: transparent;
        border: 1px solid $color-theme;
      }
    }
    .great-things {
      .title {
        width: 1.16rem;
        height: 0.27rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('greatThing');
      }
      table {
        font-size: 0.15rem;
        width: 92%;
        margin: 0 auto;
        border: 1px solid $color-background;
        td {
          padding: 0.15rem;
          border: 1px solid $color-background;
          &:first-child {
            width: 2.9rem;
          }
          &:last-child {
            text-align: center;
          }
        }
      }
    }
    .honor {
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('honor');
      }
      .swiper-container {
        height: 1.85rem;
      }
    }
    .fee_wrapper {
      padding: 0.24rem 4% 0.28rem;
      .title {
        width: 1.36rem;
        height: 0.27rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('fee');
      }
      table {
        width: 100%;
        border: 1px solid $color-background;
        tr {
          height: 0.34rem;
          text-align: center;
          th {
            font-size: $font-size-small;
            color: $color-text;
            border-bottom: 1px solid #eee;
            &:nth-of-type(2n + 1) {
              border-right: 1px solid #eee;
            }
          }
          td {
            font-size: $font-size-small-s;
            color: $color-text-s;
            border-bottom: 1px solid #eee;
            &:nth-of-type(2n + 1) {
              border-right: 1px solid #eee;
            }
          }
          &:nth-last-of-type(1) {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
    .zfbz {
      width: 100%;
      height: 1.8rem;
    }
    .contact {
      padding-bottom: 0.2rem;
      height: 4.64rem;
      .title {
        width: 0.8rem;
        height: 0.28rem;
        margin: 0.24rem auto 0.15rem;
        background-size: 100% 100%;
        @include bg-image('concat');
      }
      .map {
        @include cube(100%, 1.76rem);
        @include bg-image('map');
        background-size: contain;
        margin-bottom: 0.06rem;
      }
      div {
        display: flex;
        font-size: 0.15rem;
        padding: 0 4%;
        margin: 0.1rem 0;
        p {
          color: $color-text;
        }
        span {
          flex: 1;
          color: $color-text-s;
        }
      }
      > p {
        font-size: 0.13rem;
        text-align: center;
        color: $color-text-s;
      }
    }
  }
}
.honor-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  z-index: 999;
  background: #fff;
  display: none;
}
</style>
