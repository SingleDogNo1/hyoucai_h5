<template>
  <div class="pageContainer" ref="container">
    <header-title :title="text" :mobileValue="mobile"></header-title>
    <b-scroll
      class="scroll"
      ref="scrollRef"
      :beforScroll="true"
      @beforeScroll="beforeScroll"
      :preventDefaultException="preventDefaultException"
      @touchmove.native="touchMove">
      <div>
        <div class="op_data" ref="opData">
          <div class="top">
            <div class="inn">
              <p>运营数据</p>
              <p>数据截止至：{{info.loanStatisticsEndTime}}</p>
            </div>
          </div>
          <div class="data_table">
            <table>
              <tr>
                <td>
                  <p class="num">{{info.accumulatedLoanAmount}}</p>
                  <p class="title">累计借贷金额(万元)</p>
                </td>
                <td>
                  <p class="num">{{info.accumulativeLoanCount}}</p>
                  <p class="title">累计借贷笔数(笔)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.creditBalance}}</p>
                  <p class="title">借贷余额(万元)</p>
                </td>
                <td>
                  <p class="num">{{info.loanBalanceCount}}</p>
                  <p class="title">借款余额笔数(笔）</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.cumulativeNumberOfLender}}</p>
                  <p class="title">累计出借人数量（人）</p>
                </td>
                <td>
                  <p class="num">{{info.cumulativeNumberOfBorrower}}</p>
                  <p class="title">累计借款人数量（人）</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.currentNumberOfLender}}</p>
                  <p class="title">当前出借人数量（人）</p>
                </td>
                <td>
                  <p class="num">{{info.currentNumberOfBorrower}}</p>
                  <p class="title">当前借款人数量（人）</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="borrow_data" ref="borrowData">
          <div class="top"></div>
          <div class="data_table">
            <table>
              <tr>
                <td>
                  <p class="num">{{info.proportionOfOutstandingAmountTopTenBorrower}}</p>
                  <p class="title">前十大借款人待还金额占比</p>
                </td>
                <td>
                  <p class="num">{{info.proportionOfLargestSingleBorrowerOutstandingAmount}}</p>
                  <p class="title">最大单一借款人待还金额占比</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.numberOfLoanBalancesAmount}}</p>
                  <p class="title">关联关系借款余额（万元）</p>
                </td>
                <td>
                  <p class="num">{{info.numberOfLoanBalances}}</p>
                  <p class="title">关联关系借款余额笔数(笔)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.overdueAmount}}</p>
                  <p class="title">逾期金额(出借人到期未到账)(万元)</p>
                </td>
                <td>
                  <p class="num">{{info.overdueCount}}</p>
                  <p class="title">逾期笔数(出借人到期未到账)(笔)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.overdueAmountMoreThan90}}</p>
                  <p class="title">逾期90天(不含)以上金额(万元)</p>
                </td>
                <td>
                  <p class="num">{{info.overdueCountMoreThan90}}</p>
                  <p class="title">逾期90天(不含)以上笔数(笔)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.accumulativeCompensationAmount}}</p>
                  <p class="title">累计代偿金额(万元)</p>
                </td>
                <td>
                  <p class="num">{{info.accumulativeCompensation}}</p>
                  <p class="title">累计代偿笔数(笔)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.accumulativeLoanAmountPerCapita}}</p>
                  <p class="title">人均累计借款金额(元)</p>
                </td>
                <td>
                  <p class="num">{{info.accumulativeOutLoanAmountPerCapita}}</p>
                  <p class="title">人均累计出借金额(元)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="num">{{info.proportionOfLargestSingleLendingBalance}}</p>
                  <p class="title">最大单户出借余额占比</p>
                </td>
                <td>
                  <p class="num">{{info.proportionOfLargestTenLendingBalance}}</p>
                  <p class="title">最大十户出借余额占比</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <mt-navbar v-model="selected">
          <mt-tab-item class="tab_item" id="1">出借对比</mt-tab-item>
          <mt-tab-item class="tab_item" id="2">性别比例</mt-tab-item>
          <mt-tab-item class="tab_item" id="3">终端分布</mt-tab-item>
          <mt-tab-item class="tab_item" id="4">人数占比</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item class="tab_container" id="1">
            <h3>P2P网贷各年龄段人群出借对比</h3>
            <div class="tip_04 tip">
              <dl>
                <dt></dt>
                <dd>人数百分比</dd>
              </dl>
              <dl>
                <dt></dt>
                <dd>出借金额(万)</dd>
              </dl>
            </div>
            <div id="investChart" class="chart"></div>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="2">
            <h3>P2P网贷出借人群性别比例</h3>
            <div id="sexChart" class="chartCircle"></div>
            <div class="tip_02 tip">
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingGenderDistributeMale}}%</p>
                  <span>男</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingGenderDistributeFemale}}%</p>
                  <span>女</span>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="3">
            <h3>P2P网贷出借终端分布</h3>
            <div id="endChart" class="chartCircle"></div>
            <div class="tip_01 tip">
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingTerminalDistributeWeb}}%</p>
                  <span>web端</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingTerminalDistributeMobile}}%</p>
                  <span>移动端</span>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="4">
            <h3>P2P网贷出借金额区间的人数占比</h3>
            <div id="peopleChart" class="chartCircle"></div>
            <div class="tip_03 tip">
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingAmountDistribute1}}%</p>
                  <span>1万以下</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingAmountDistribute5}}%</p>
                  <span>1–5万</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingAmountDistribute10}}%</p>
                  <span>5–10万</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingAmountDistribute20}}%</p>
                  <span>10–20万</span>
                </li>
              </ul>
              <ul>
                <li>
                  <h2></h2>
                </li>
                <li>
                  <p>{{info.lendingAmountDistributeAbove20}}%</p>
                  <span>20万以上</span>
                </li>
              </ul>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <div class="operate-report" id="operate-report">
          <div class="title"></div>
          <div class="report-wrapper">
            <div class="swiper-container" id="report">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in reports"
                  :key="index"
                  :style="{backgroundImage: 'url('+ item.poster +')'}"
                  @click="showReport(item.images)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="review-info" id="review-info">
          <div class="title"></div>
          <ul>
            <li>
              <div class="left">2017年</div>
              <div class="right">
                <div class="top">2017年财务审计报告（1-12月份）</div>
                <div class="btm" @click="showPDF('auditReport2017')">
                  <img src="./finance-2017.png" alt="">
                </div>
              </div>
            </li>
            <li>
              <div class="left">2016年</div>
              <div class="right">
                <div class="top">2016年财务审计报告（1-12月份）</div>
                <div class="btm" @click="showPDF('auditReport2016')">
                  <img src="./finance-2016.png" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ul class="others">
          <li class="hegui">
            办理中…
          </li>
          <li class="shenji">
            办理中…
          </li>
        </ul>
        <img src="./cyw-sign.png" alt="">
      </div>
    </b-scroll>

    <div
      class="report-mask"
      :style="{display: 'none'}"
      ref="originImg"
    >
      <div class="swiper-container" id="report-mask">
        <div class="swiper-wrapper"></div>
      </div>
    </div>

  </div>
</template>

<script>
import HeaderTitle from '@/components/AppHeader'
import { Navbar, tabItem } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import Swiper from 'swiper'

import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)

import { getInfoApi } from '@/api/common/infoDisclise'

export default {
  components: {
    HeaderTitle,
    // eslint-disable-next-line
    Navbar,
    // eslint-disable-next-line
    tabItem,
    BScroll
  },
  data() {
    return {
      text: '信息披露',
      mobile: this.$route.query.mobile,
      selected: '1',
      preventDefaultException: { tagName: /^(HTML|DIV|BODY)$/ },
      reportMask: '', // 运营报告container
      reports: [
        {
          name: '2017年第一季度',
          poster: require('./reports/2017-01/poster.png'),
          images: [
            require('./reports/2017-01/1.jpg'),
            require('./reports/2017-01/2.jpg'),
            require('./reports/2017-01/3.jpg'),
            require('./reports/2017-01/4.jpg'),
            require('./reports/2017-01/5.jpg'),
            require('./reports/2017-01/6.jpg'),
            require('./reports/2017-01/7.jpg'),
            require('./reports/2017-01/8.jpg'),
            require('./reports/2017-01/9.jpg')
          ]
        },
        {
          name: '2017年第二季度',
          poster: require('./reports/2017-02/poster.png'),
          images: [
            require('./reports/2017-02/1.jpg'),
            require('./reports/2017-02/2.jpg'),
            require('./reports/2017-02/3.jpg'),
            require('./reports/2017-02/4.jpg'),
            require('./reports/2017-02/5.jpg'),
            require('./reports/2017-02/6.jpg'),
            require('./reports/2017-02/7.jpg'),
            require('./reports/2017-02/8.jpg'),
            require('./reports/2017-02/9.jpg'),
            require('./reports/2017-02/10.jpg')
          ]
        },
        {
          name: '2017年第三季度',
          poster: require('./reports/2017-03/poster.png'),
          images: [
            require('./reports/2017-03/1.jpg'),
            require('./reports/2017-03/2.jpg'),
            require('./reports/2017-03/3.jpg'),
            require('./reports/2017-03/4.jpg'),
            require('./reports/2017-03/5.jpg'),
            require('./reports/2017-03/6.jpg'),
            require('./reports/2017-03/7.jpg'),
            require('./reports/2017-03/8.jpg'),
            require('./reports/2017-03/9.jpg'),
            require('./reports/2017-03/10.jpg')
          ]
        },
        {
          name: '2017年第四季度',
          poster: require('./reports/2017-04/poster.png'),
          images: [require('./reports/2017-04/1.jpg'), require('./reports/2017-04/2.jpg'), require('./reports/2017-04/3.jpg')]
        },
        {
          name: '2018年第一季度',
          poster: require('./reports/2018-01/poster.png'),
          images: [
            require('./reports/2018-01/1.jpg'),
            require('./reports/2018-01/2.jpg'),
            require('./reports/2018-01/3.jpg'),
            require('./reports/2018-01/4.jpg'),
            require('./reports/2018-01/5.jpg'),
            require('./reports/2018-01/6.jpg'),
            require('./reports/2018-01/7.jpg'),
            require('./reports/2018-01/8.jpg'),
            require('./reports/2018-01/9.jpg'),
            require('./reports/2018-01/10.jpg')
          ]
        },
        {
          name: '2018年上半年',
          poster: require('./reports/2018-firsthalf/poster.png'),
          images: [
            require('./reports/2018-firsthalf/1.jpg'),
            require('./reports/2018-firsthalf/2.jpg'),
            require('./reports/2018-firsthalf/3.jpg'),
            require('./reports/2018-firsthalf/4.jpg'),
            require('./reports/2018-firsthalf/5.jpg'),
            require('./reports/2018-firsthalf/6.jpg'),
            require('./reports/2018-firsthalf/7.jpg'),
            require('./reports/2018-firsthalf/8.jpg'),
            require('./reports/2018-firsthalf/9.jpg'),
            require('./reports/2018-firsthalf/10.jpg'),
            require('./reports/2018-firsthalf/11.jpg')
          ]
        },
        {
          name: '2018年7月份',
          poster: require('./reports/2018-July/poster.png'),
          images: [
            require('./reports/2018-July/1.jpg'),
            require('./reports/2018-July/2.jpg'),
            require('./reports/2018-July/3.jpg'),
            require('./reports/2018-July/4.jpg'),
            require('./reports/2018-July/5.jpg'),
            require('./reports/2018-July/6.jpg'),
            require('./reports/2018-July/7.jpg'),
            require('./reports/2018-July/8.jpg'),
            require('./reports/2018-July/9.jpg'),
            require('./reports/2018-July/10.jpg'),
            require('./reports/2018-July/11.jpg')
          ]
        },
        {
          name: '2018年8月份',
          poster: require('./reports/2018-Aug/poster.png'),
          images: [
            require('./reports/2018-Aug/1.jpg'),
            require('./reports/2018-Aug/2.jpg'),
            require('./reports/2018-Aug/3.jpg'),
            require('./reports/2018-Aug/4.jpg'),
            require('./reports/2018-Aug/5.jpg'),
            require('./reports/2018-Aug/6.jpg'),
            require('./reports/2018-Aug/7.jpg'),
            require('./reports/2018-Aug/8.jpg'),
            require('./reports/2018-Aug/9.jpg'),
            require('./reports/2018-Aug/10.jpg'),
            require('./reports/2018-Aug/11.jpg')
          ]
        },
        {
          name: '2018年9月份',
          poster: require('./reports/2018-Sep/poster.png'),
          images: [
            require('./reports/2018-Sep/1.jpg'),
            require('./reports/2018-Sep/2.jpg'),
            require('./reports/2018-Sep/3.jpg'),
            require('./reports/2018-Sep/4.jpg'),
            require('./reports/2018-Sep/5.jpg'),
            require('./reports/2018-Sep/6.jpg'),
            require('./reports/2018-Sep/7.jpg'),
            require('./reports/2018-Sep/8.jpg'),
            require('./reports/2018-Sep/9.jpg'),
            require('./reports/2018-Sep/10.jpg'),
            require('./reports/2018-Sep/11.jpg'),
            require('./reports/2018-Sep/12.jpg')
          ]
        },
        {
          name: '2018年10月份',
          poster: require('./reports/2018-Oct/poster.png'),
          images: [
            require('./reports/2018-Oct/1.jpg'),
            require('./reports/2018-Oct/2.jpg'),
            require('./reports/2018-Oct/3.jpg'),
            require('./reports/2018-Oct/4.jpg'),
            require('./reports/2018-Oct/5.jpg'),
            require('./reports/2018-Oct/6.jpg'),
            require('./reports/2018-Oct/7.jpg'),
            require('./reports/2018-Oct/8.jpg'),
            require('./reports/2018-Oct/9.jpg'),
            require('./reports/2018-Oct/10.jpg'),
            require('./reports/2018-Oct/11.jpg'),
            require('./reports/2018-Oct/12.jpg'),
            require('./reports/2018-Oct/13.jpg'),
            require('./reports/2018-Oct/14.jpg')
          ]
        },
        {
          name: '2018年11月份',
          poster: require('./reports/2018-Nov/poster.png'),
          images: [
            require('./reports/2018-Nov/1.jpg'),
            require('./reports/2018-Nov/2.jpg'),
            require('./reports/2018-Nov/3.jpg'),
            require('./reports/2018-Nov/4.jpg'),
            require('./reports/2018-Nov/5.jpg'),
            require('./reports/2018-Nov/6.jpg'),
            require('./reports/2018-Nov/7.jpg'),
            require('./reports/2018-Nov/8.jpg'),
            require('./reports/2018-Nov/9.jpg'),
            require('./reports/2018-Nov/10.jpg'),
            require('./reports/2018-Nov/11.jpg'),
            require('./reports/2018-Nov/12.jpg')
          ]
        }
      ],
      PDFFlag: false, // 是否显示审计报告弹框
      routerType: this.$route.query.type, // 路由的重定向
      info: {}
    }
  },
  watch: {
    selected() {
      setTimeout(() => {
        if (this.selected === '1') {
          this.drawInvestChart()
        }
        if (this.selected === '2') {
          this.drawSexChartf()
        }
        if (this.selected === '3') {
          this.drawEndchart()
        }
        if (this.selected === '4') {
          this.drawPeopleChart()
        }
        this.refresh()
      }, 20)
    }
  },
  methods: {
    autoScroll() {
      let target = document.getElementById(this.routerType)
      this.$refs.scrollRef.scrollToElement(target, 300)
    },
    touchMove(ev) {
      ev = ev || event
      ev.preventDefault()
    },
    drawPeopleChart() {
      Highcharts.chart('peopleChart', {
        credits: {
          enabled: false
        },
        chart: {
          type: 'variablepie',
          height: 260,
          width: 350,
          style: { margin: '0 auto', transform: 'translateX(0)' }
        },
        plotOptions: {
          variablepie: {
            cursor: 'pointer',
            borderColor: '#fff',
            borderWidth: '4',
            size: 230,
            dataLabels: {
              softConnector: false, // 是否使用曲线
              distance: 10, // 数据标签与扇区距离
              connectorPadding: 30, // 数据标签与连接线的距离
              enabled: false,
              useHTML: true
            }
          }
        },
        title: {
          text: null
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' + '<br/><b>{point.y}%</b><br/>'
        },
        series: [
          {
            type: 'pie',
            innerSize: '40%',
            name: 'countries',
            zMin: 10,
            data: [
              {
                name: '1万以下',
                y: parseFloat(this.info.lendingAmountDistribute1),
                z: 200,
                color: '#ff7f70',
                dataLabels: {
                  color: '#ff7f70'
                }
              },
              {
                name: '1-5万',
                y: parseFloat(this.info.lendingAmountDistribute5),
                z: 150,
                color: '#50befc',
                dataLabels: {
                  color: '#50befc'
                }
              },
              {
                name: '5-10万',
                y: parseFloat(this.info.lendingAmountDistribute10),
                z: 120,
                color: '#6ee7f7',
                dataLabels: {
                  color: '#6ee7f7'
                }
              },
              {
                name: '10–20万',
                y: parseFloat(this.info.lendingAmountDistribute20),
                z: 80,
                color: '#bbed2f',
                dataLabels: {
                  color: '#bbed2f'
                }
              },
              {
                name: '20万以上',
                y: parseFloat(this.info.lendingAmountDistributeAbove20),
                z: 60,
                color: '#ffd04b',
                dataLabels: {
                  color: '#ffd04b'
                }
              }
            ]
          }
        ],
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      })
    },
    drawEndchart() {
      Highcharts.chart('endChart', {
        credits: {
          enabled: false
        },
        chart: {
          type: 'pie',
          height: 260,
          width: 300,
          style: { margin: '0 auto', transform: 'translateX(0)' }
        },
        plotOptions: {
          variablepie: {
            borderColor: '#fff',
            borderWidth: '4',
            cursor: 'pointer',
            size: 230,
            dataLabels: {
              enabled: false,
              useHTML: true
            }
          }
        },
        title: {
          text: null
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' + '<br/><b>{point.y}%</b><br/>'
        },
        series: [
          {
            type: 'pie',
            minPointSize: 5,
            innerSize: '40%',
            zMin: 0,
            name: 'countries',
            data: [
              {
                name: 'web端',
                y: parseFloat(this.info.lendingTerminalDistributeWeb),
                z: 80,
                color: '#ff7f24',
                dataLabels: {
                  color: '#ff7f24'
                }
              },
              {
                name: '移动端',
                y: parseFloat(this.info.lendingTerminalDistributeMobile),
                z: 160,
                color: '#fed842',
                dataLabels: {
                  color: '#fed842'
                }
              }
            ]
          }
        ],
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      })
    },
    drawSexChartf() {
      Highcharts.chart('sexChart', {
        credits: {
          enabled: false
        },
        chart: {
          type: 'pie',
          height: 260,
          width: 350,
          style: { margin: '0 auto', transform: 'translateX(0px)' }
        },
        title: {
          text: null
        },
        plotOptions: {
          variablepie: {
            borderColor: '#000',
            borderWidth: '4',
            cursor: 'pointer',
            size: 230,
            dataLabels: {
              enabled: false,
              useHTML: true
            }
          }
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' + '<br/><b>{point.y}%</b><br/>'
        },
        series: [
          {
            type: 'pie',
            innerSize: '40%',
            zMin: 0,
            data: [
              {
                name: '男',
                y: parseFloat(this.info.lendingGenderDistributeMale),
                z: 150,
                color: '#50befc',
                dataLabels: {
                  color: '#50befc'
                }
              },
              {
                name: '女',
                y: parseFloat(this.info.lendingGenderDistributeFemale),
                z: 70,
                color: '#ff6f8d',
                dataLabels: {
                  color: '#ff6f8d'
                }
              }
            ]
          }
        ],
        legend: {
          enabled: false
        },
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      })
    },
    drawInvestChart() {
      Highcharts.chart('investChart', {
        chart: {
          zoomType: 'xy'
        },
        credits: {
          enabled: false
        },
        title: {
          text: 'P2P网贷各年龄段人群出借对比',
          useHTML: true
        },
        xAxis: [
          {
            categories: ['18-19', '20-29', '30-39', '40-49', '50以上'],
            crosshair: true,
            useHTML: true
          }
        ],
        yAxis: [
          {
            labels: {
              format: '{value}万',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: '出借金额',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            lineColor: '#9b9b9b',
            lineWidth: 1,
            max: 12000,
            min: 0
          },
          {
            title: {
              text: '人数百分比',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              format: '{value} %',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true,
            lineColor: '#9b9b9b',
            lineWidth: 1,
            max: 100,
            min: 0
          }
        ],
        tooltip: {
          shared: true
        },
        plotOptions: {
          series: {
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [[0, '#FF7473'], [1, '#FFD2A0']]
            },
            pointWidth: 25
          }
        },
        series: [
          {
            name: '出借金额',
            type: 'column',
            data: [
              parseFloat(this.info.lendingAgeDistributeAmount18),
              parseFloat(this.info.lendingAgeDistributeAmount20),
              parseFloat(this.info.lendingAgeDistributeAmount30),
              parseFloat(this.info.lendingAgeDistributeAmount40),
              parseFloat(this.info.lendingAgeDistributeAmount50)
            ],
            tooltip: {
              valueSuffix: ' 万'
            }
          },
          {
            name: '人数百分比',
            type: 'spline',
            data: [
              parseFloat(this.info.lendingAgeDistributePer18),
              parseFloat(this.info.lendingAgeDistributePer20),
              parseFloat(this.info.lendingAgeDistributePer30),
              parseFloat(this.info.lendingAgeDistributePer40),
              parseFloat(this.info.lendingAgeDistributePer50)
            ],
            tooltip: {
              valueSuffix: '%'
            },
            color: '#21adec',
            yAxis: 1
          }
        ],
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      })
    },
    renderReport() {
      new Swiper('#report', {
        loop: false,
        loopAdditionalSlides: 1,
        initialSlide: 0,
        effect: 'coverflow',
        slidesPerView: 1.2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: -40,
          depth: 230,
          modifier: 1,
          slideShadows: false
        }
      })
    },
    showPDF(name) {
      window.location.href = `/static/PDF/${name}.pdf`
    },
    showReport(value) {
      let reports = []
      value.forEach(v => {
        const temp = `
          <div class="swiper-slide">
            <img src="${v}" alt="">
          </div>
        `
        reports.push(temp)
      })
      this.reportMask.removeAllSlides()
      this.reportMask.appendSlide(reports)
      this.reportMask.init()
      this.$refs.originImg.style.display = 'block'
    },
    beforeScroll() {
      this.refresh()
    },
    refresh() {
      this.$refs.scrollRef.refresh()
    }
  },
  created() {
    getInfoApi().then(res => {
      this.info = res.data.data
      this.drawInvestChart()
    })
  },
  mounted() {
    const $this = this
    switch (this.routerType) {
      case 'operate-report':
        this.text = '运营报告'
        break
      case 'review-info':
        this.text = '审核信息'
        break
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.autoScroll()
      }, 20)
      this.renderReport()
      this.refresh()
      this.reportMask = new Swiper('#report-mask', {
        direction: 'vertical',
        zoom: true,
        width: window.innerWidth,
        observer: true,
        observeParents: true,
        spaceBetween: 20,
        on: {
          click() {
            $this.$refs.originImg.style.display = 'none'
          }
        }
      })
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.pageContainer {
  .scroll {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
}

.mint-tab-container-item.tab_container {
  background-color: #fff;
  h3 {
    margin-top: 0.2rem;
    font-size: 0.14rem;
    text-align: center;
  }
  .tip {
    display: flex;
    font-size: 0.12rem;
    dl {
      display: flex;
      flex: 1;
      padding: 0.2rem;
      dt {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.1rem;
      }
      dd {
        flex: 1;
      }
      &:nth-child(1) dt {
        background-color: #21adec;
      }
      &:nth-child(2) dt {
        background-image: linear-gradient(-180deg, #ff7373, #ffd2a0);
      }
    }
    ul {
      padding: 0.2rem;
      display: inline-block;
      width: 49%;
      text-align: center;
      box-sizing: border-box;
      li {
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        h2 {
          width: 0.19rem;
          height: 0.19rem;
          margin-right: 0.1rem;
        }
        p {
          margin-bottom: 0.08rem;
          font-size: 0.2rem;
          color: #5a5a5a;
        }
        span {
          font-size: 0.12rem;
          color: #5a5a5a;
        }
      }
    }
    &.tip_02 ul:nth-child(1) li h2 {
      width: 0.19rem;
      height: 0.29rem;
      background-size: cover;
      background-image: url('man.png');
    }
    &.tip_02 ul:nth-child(2) li h2 {
      width: 0.19rem;
      height: 0.29rem;
      background-size: cover;
      background-image: url('women.png');
    }
    &.tip_01 ul:nth-child(1) li h2 {
      background-color: #ff7f24;
    }
    &.tip_01 ul:nth-child(2) li h2 {
      background-color: #fed842;
    }
    &.tip_03 {
      display: block;
      ul {
        display: inline-block;
        width: 49%;
        height: 0.8rem;
        &:nth-child(1) li h2 {
          background-color: #ff7f70;
        }
        &:nth-child(2) li h2 {
          background-color: #50befc;
        }
        &:nth-child(3) li h2 {
          background-color: #6ee7f7;
        }
        &:nth-child(4) li h2 {
          background-color: #bbed2f;
        }
        &:nth-child(5) li h2 {
          background-color: #ffd04b;
        }
      }
    }
    .chart {
      min-height: 4rem;
      margin: 0 auto;
      height: auto;
    }
  }
}

.op_data {
  font-size: 0;
  .top {
    display: table;
    width: 100%;
    height: 1.9rem;
    background-size: 100% 100%;
    @include bg-image('op_data_bg');
    color: #fff;
    text-align: center;
    text-shadow: 0 3px 2px #e4604b;
    .inn {
      display: table-cell;
      vertical-align: middle;
      p {
        &:nth-of-type(1) {
          margin-bottom: 0.05rem;
          font-size: 0.28rem;
        }
        &:nth-of-type(2) {
          font-size: $font-size-small-s;
        }
      }
    }
  }
  .data_table {
    position: relative;
    margin: -0.15rem auto 0.08rem;
    padding: 0 4%;
  }
}

.borrow_data {
  padding-top: 0.16rem;
  margin: 0 4% 0.08rem;
  background-color: #fff;
  .top {
    width: 0.9rem;
    height: 0.3rem;
    margin: 0 auto 0.08rem;
    background-size: 100% 100%;
    @include bg-image('borrow_data');
  }
}

.mint-navbar {
  .tab_item.mint-tab-item {
    font-size: $font-size-small-s;
    position: relative;
    /deep/ .mint-tab-item-label {
      font-size: $font-size-small-s;
    }
    &.is-selected {
      border-bottom: none;
      color: $color-button;
      &:after {
        position: absolute;
        content: '';
        background-color: $color-button;
        width: 0.2rem;
        height: 0.02rem;
        bottom: 0.03rem;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
      }
    }
  }
}

table {
  width: 100%;
  background-color: #fff;
  border-radius: 0.04rem;
  text-align: center;
  vertical-align: middle;
  tr {
    height: 0.8rem;
    td {
      p {
        &.num {
          margin-bottom: 0.04rem;
          font-size: 0.2rem;
          color: $color-button;
        }
        &.title {
          font-size: $font-size-small-ss;
          color: $color-text;
        }
      }
      &:nth-of-type(2n + 1) {
        border-bottom: 2px solid #eee;
        border-right: 2px solid #eee;
      }
      &:nth-of-type(2n) {
        border-bottom: 2px solid #eee;
      }
    }
    &:nth-last-of-type(1) {
      td {
        &:nth-of-type(1) {
          border-bottom: none;
        }
        &:nth-of-type(2) {
          border-bottom: none;
        }
      }
    }
  }
}

.operate-report {
  background: #fff;
  padding-top: 0.08rem;
  .title {
    width: 0.9rem;
    height: 0.3rem;
    margin: 0 auto 0.16rem;
    background-size: 100% 100%;
    @include bg-image('report-title');
  }
  .swiper-slide {
    height: 1.55rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.review-info {
  padding-bottom: 0.16rem;
  padding-top: 0.32rem;
  background: #fff;
  .title {
    width: 0.9rem;
    height: 0.3rem;
    margin: 0 auto 0.16rem auto;
    background-size: 100% 100%;
    @include bg-image('review');
  }
  ul {
    li {
      display: flex;
      color: $color-text-s;
      .left {
        font-size: $font-size-small-ss;
        width: 0.6rem;
        text-align: center;
      }
      .right {
        position: relative;
        font-size: $font-size-small-s;
        flex: 1;
        box-sizing: border-box;
        padding-left: 0.12rem;
        padding-bottom: 0.16rem;
        border-left: 1px solid $color-theme;
        .top {
          margin-bottom: 0.08rem;
        }
        .btm {
          margin-bottom: 0.08rem;
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: -0.04rem;
          @include radiusCube(0.07rem);
          background: $color-theme;
        }
      }
      &:nth-last-child(1) {
        .right {
          padding-bottom: 0;
          .btm {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.others {
  display: flex;
  justify-content: space-around;
  justify-content: space-evenly;
  background: #fff;
  font-size: 0;
  padding-bottom: 0.2rem;
  li {
    @include cube(1.68rem, 1rem);
    color: #fff;
    text-align: center;
    font-size: $font-size-small-ss;
    line-height: 1.65rem;
    $bgImgs: hegui, shenji;
    @each $item in $bgImgs {
      &.#{$item} {
        @include bg-image(#{$item});
        background-size: contain;
        background-position: center;
      }
    }
  }
}

.report-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.62);
  .swiper-container {
    width: 100%;
    height: 100%;
  }
}
</style>
