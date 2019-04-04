import Vue from 'vue'
import Router from 'vue-router'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'
import Empty from './layout/empty.vue'
import TabBar from './layout/tabBar.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/d',
      component: TabBar,
      children: [
        {
          path: '',
          name: 'DJSHomePage',
          component: () => import(/* webpackChunkName: "DJSHomePage" */ '@/views/djs/homePage')
        },
        {
          path: 'invest',
          name: 'DJSInvestList',
          component: () => import(/* webpackChunkName: "DJSInvestList" */ '@/views/djs/investList')
        },
        {
          path: 'mine',
          name: 'DJSUserCenter',
          component: () => import(/* webpackChunkName: "DJSUserCenter" */ '@/views/djs/mine')
        }
      ]
    },
    {
      path: '/h',
      component: TabBar,
      children: [
        {
          path: '',
          name: 'HYCHomePage',
          component: () => import(/* webpackChunkName: "HYCHomePage" */ '@/views/hyc/homePage')
        },
        {
          path: 'invest',
          name: 'HYCInvestList',
          component: () => import(/* webpackChunkName: "HYCInvestList" */ '@/views/hyc/investList')
        },
        {
          path: 'mine',
          name: 'HYCUserCenter',
          component: () => import(/* webpackChunkName: "HYCUserCenter" */ '@/views/hyc/mine')
        }
      ]
    },
    // 公用
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'login-register',
          name: 'loginRegister',
          component: () => import(/* webpackChunkName: "login" */ '@/views/common/loginRegister'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'login',
          name: 'userLogin',
          component: () => import(/* webpackChunkName: "login" */ '@/views/common/login'),
          meta: {
            title: '汇有财登录'
          }
        },
        {
          path: 'register',
          name: 'userRegister',
          component: () => import(/* webpackChunkName: "register" */ '@/views/common/register'),
          meta: {
            title: '汇有财注册'
          }
        },
        {
          path: 'forgetpwd',
          name: 'forgetPWD',
          component: () => import(/* webpackChunkName: "forgetpwd" */ '@/views/common/forgetPWD'),
          meta: {
            title: '忘记密码'
          }
        },
        {
          path: 'risk-test',
          name: 'riskTest',
          component: () => import(/* webpackChunkName: "risk-test" */ '@/views/common/RiskTest/RiskTest'),
          meta: {
            title: '风险测评'
          }
        },
        {
          path: 'about-us',
          name: 'AboutUs',
          component: () => import(/* webpackChunkName: "about-us" */ '@/views/common/AboutUs/AboutUs'),
          meta: {
            title: '关于汇有财'
          }
        },
        {
          path: 'selectMeans',
          name: 'selectMeans',
          component: () => import(/* webpackChunkName: "selectMeans" */ '@/views/common/selectMeans'),
          meta: {
            title: '严选资产'
          }
        },
        {
          path: 'complianceManagement',
          name: 'complianceManagement',
          component: () => import(/* webpackChunkName: "complianceManagement" */ '@/views/common/complianceManagement'),
          meta: {
            title: '合规管理'
          }
        },
        {
          path: 'fundSafety',
          name: 'fundSafety',
          component: () => import(/* webpackChunkName: "fundSafety" */ '@/views/common/FundSafety'),
          meta: {
            title: '资产安全'
          }
        },
        {
          path: 'common_problem',
          name: 'commonProblem',
          component: () => import(/* webpackChunkName: "commonProblem" */ '@/views/common/CommonProblem'),
          meta: {
            title: '常见问题'
          }
        },
        {
          // 出借指南
          path: 'introduction',
          component: Empty,
          children: [
            {
              path: '',
              name: 'introduction',
              component: () => import(/* webpackChunkName: "introduction" */ '@/views/common/introduction'),
              meta: {
                title: '优质项目'
              }
            },
            {
              path: 'coupon',
              name: 'introduceCoupon',
              component: () => import(/* webpackChunkName: "introduceCoupon" */ '@/views/common/introduction/coupon'),
              meta: {
                title: '汇有财优惠券'
              }
            },
            {
              path: 'netLoan',
              name: 'introduceNetLoan',
              component: () => import(/* webpackChunkName: "introduceNetLoan" */ '@/views/common/introduction/netLoan'),
              meta: {
                title: '我的钱出借'
              }
            }
          ]
        },
        {
          path: 'support_banks',
          name: 'supportBanks',
          component: () => import(/* webpackChunkName: "supportBanks" */ '@/views/common/SupportBank'),
          meta: {
            title: '可用银行列表'
          }
        },
        {
          path: 'archival',
          name: 'ArchivalInfo',
          component: () => import(/* webpackChunkName: "archival" */ '@/views/common/ArchivalInfo'),
          meta: {
            title: '资金存管'
          }
        },
        {
          path: 'info_disclose',
          name: 'InfoDisclose',
          component: () => import(/* webpackChunkName: "InfoDisclose" */ '@/views/common/InfoDisclose'),
          meta: {
            title: '信息披露'
          }
        },
        {
          path: 'certificate',
          name: 'certificate',
          component: () => import(/* webpackChunkName: "certificate" */ '@/views/common/certificate'),
          meta: {
            title: '证书'
          }
        },
        {
          path: 'download',
          name: 'AppDownload',
          component: () => import(/* webpackChunkName: "AppDownload" */ '@/views/common/Download'),
          meta: {
            // title: 'App下载'
          }
        }
      ]
    },
    /* Layout布局核心是为了better-scroll，因此限制了最外边的wrapper为overflow：hidden。而活动页没有用better-scroll，所以拆开来写。 */
    // 点金石活动
    {
      path: '/d',
      component: Activity,
      children: [
        {
          path: 'activity',
          component: Empty,
          children: [
            {
              path: 'mateact',
              name: 'DJSmateAct',
              component: () => import(/* webpackChunkName: "DJSmateAct" */ '@/views/djs/activities/mateact/mateact')
            },
            {
              path: 'coupon',
              name: 'DJScoupon',
              component: () => import(/* webpackChunkName: "DJScouponAct" */ '@/views/djs/activities/coupon/index')
            },
            {
              path: 'gold',
              name: 'DJSGold',
              component: () => import(/* webpackChunkName: "DJSGoldAct" */ '@/views/djs/activities/goldact')
            },
            {
              path: 'register',
              name: 'DJSRegister',
              component: () => import(/* webpackChunkName: "DJSRegisterAct" */ '@/views/djs/activities/register')
            },
            {
              path: 'womensday',
              name: 'womensDay',
              component: () => import(/* webpackChunkName: "womensDayAct" */ '@/views/djs/activities/womensDay/index')
            },
            {
              path: 'inviteact',
              name: 'DJSinviteAct',
              component: () => import(/* webpackChunkName: "DJSinviteAct" */ '@/views/djs/activities/inviteact')
            },
            {
              path: 'yearact',
              name: 'DJSyearAct',
              component: () => import(/* webpackChunkName: "DJSyearAct" */ '@/views/djs/activities/yearact')
            },
            {
              path: 'yearact_2',
              name: 'DJSyearAct_2',
              component: () => import(/* webpackChunkName: "DJSyearAct_2" */ '@/views/djs/activities/yearact_2')
            },
            {
              path: '3000',
              name: 'DJS3000Act',
              component: () => import(/* webpackChunkName: "DJS3000Act" */ '@/views/djs/activities/3000')
            },
            {
              path: 'spell-group',
              name: 'DJSSpellGroupAct',
              component: () => import(/* webpackChunkName: "DJSSpellGroupAct" */ '@/views/djs/activities/spellGroup')
            }
          ]
        }
      ]
    },
    // 因为帮助中心标题的特殊性，所以也没有办法使用Layout布局。
    // 点金石帮助中心
    {
      path: '/d',
      component: Empty,
      children: [
        {
          path: 'help',
          component: Empty,
          children: [
            {
              path: '',
              name: 'DJSHelp',
              component: () => import(/* webpackChunkName: "DJSHelp" */ '@/views/djs/Help'),
              meta: {
                title: '帮助中心'
              }
            }
          ]
        }
      ]
    },
    // 点金石
    {
      path: '/d',
      component: Layout,
      children: [
        {
          path: 'investdetail',
          name: 'DJSInvestDetail',
          component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/djs/investDetail'),
          meta: {
            title: '出借'
          }
        },
        {
          path: 'act-center',
          name: 'DJSActivityCenter',
          component: () => import(/* webpackChunkName: "DJSActivityCenter" */ '@/views/djs/ActivityCenter/ActivityCenter'),
          meta: {
            title: '活动中心'
          }
        },
        {
          path: 'agreement',
          name: 'DJSagreement',
          component: () => import(/* webpackChunkName: "DJSagreement" */ '@/views/djs/Agreements'),
          meta: {
            title: '协议'
          }
        },
        {
          path: 'gratitude_money',
          name: 'DJSGratitudeMoney',
          component: () => import(/* webpackChunkName: "DJSGratitudeMoney" */ '@/views/djs/GratitudeMoney'),
          meta: {
            title: '我推荐的人'
          }
        },
        {
          path: 'transfer_charge',
          name: 'DJSTransferCharge',
          component: () => import(/* webpackChunkName: "DJSTransferCharge" */ '@/views/djs/TransferCharge'),
          meta: {
            title: '转账充值'
          }
        },
        {
          path: 'notice',
          component: Empty,
          children: [
            {
              path: ':id',
              name: 'DJSNoticeDetail',
              component: () => import(/* webpackChunkName: "DJSNoticeDetail" */ '@/views/djs/notice'),
              meta: {
                title: '公告详情'
              }
            }
          ]
        },
        {
          path: 'calculator',
          name: 'DJSCalculator',
          component: () => import(/* webpackChunkName: "DJSCalculator" */ '@/views/djs/calculator'),
          meta: {
            title: '理财计算器'
          }
        },
        {
          path: 'newer_direction',
          name: 'DJSNewerDirection',
          component: () => import(/* webpackChunkName: "DJSNewerDirection" */ '@/views/djs/NewerDirection'),
          meta: {
            title: '新手指引'
          }
        },
        {
          path: 'historyCard',
          name: 'HistoryCard',
          component: () => import(/* webpackChunkName: "DJShistoryCard" */ '@/views/djs/voucherBag/HistoryCard'),
          meta: {
            title: '历史卡券'
          }
        }
      ]
    },
    /* Layout布局核心是为了better-scroll，因此限制了最外边的wrapper为overflow：hidden。而活动页没有用better-scroll，所以拆开来写。 */
    // 点金石活动
    {
      path: '/h',
      component: Activity,
      children: [
        {
          path: 'activity',
          component: Empty,
          children: [
            // mate手机乐
            {
              path: 'mateact',
              name: 'HYCmateAct',
              component: () => import(/* webpackChunkName: "HYCmateAct" */ '@/views/hyc/activities/mateact/mateact')
            },
            {
              path: 'anni-cashback',
              name: 'sixthAnniCashback',
              component: () => import(/* webpackChunkName: "sixthAnniCashback" */ '@/views/hyc/activities/sixthAnniversary/index')
            }
          ]
        }
      ]
    },
    // 因为帮助中心标题的特殊性，所以也没有办法使用Layout布局。
    // 汇有财帮助中心
    {
      path: '/h',
      component: Empty,
      children: [
        {
          path: 'help',
          component: Empty,
          children: [
            {
              path: '',
              name: 'HYCHelp',
              component: () => import(/* webpackChunkName: "HYCHelp" */ '@/views/hyc/Help'),
              meta: {
                title: '帮助中心'
              }
            }
          ]
        }
      ]
    },
    // 汇有财
    {
      path: '/h',
      component: Layout,
      children: [
        // 活动列表
        {
          path: 'act-center',
          name: 'HYCActivityCenter',
          component: () => import(/* webpackChunkName: "HYCActivityCenter" */ '@/views/hyc/ActivityCenter/ActivityCenter'),
          meta: {
            title: '活动中心'
          }
        },
        // 协议
        {
          path: 'agreement',
          name: 'HYCagreement',
          component: () => import(/* webpackChunkName: "HYCagreement" */ '@/views/hyc/Agreements'),
          meta: {
            title: '协议'
          }
        },
        {
          path: 'gratitude_money',
          name: 'HYCGratitudeMoney',
          component: () => import(/* webpackChunkName: "HYCGratitudeMoney" */ '@/views/hyc/GratitudeMoney'),
          meta: {
            title: '我推荐的人'
          }
        },
        {
          path: 'transfer_charge',
          name: 'HYCTransferCharge',
          component: () => import(/* webpackChunkName: "HYCTransferCharge" */ '@/views/hyc/TransferCharge'),
          meta: {
            title: '转账充值'
          }
        },
        {
          path: 'notice',
          component: Empty,
          children: [
            {
              path: ':id',
              name: 'HYCNoticeDetail',
              component: () => import(/* webpackChunkName: "HYCNoticeDetail" */ '@/views/hyc/notice'),
              meta: {
                title: '公告'
              }
            }
          ]
        },
        {
          path: 'calculator',
          name: 'HYCCalculator',
          component: () => import(/* webpackChunkName: "HYCCalculator" */ '@/views/hyc/calculator'),
          meta: {
            title: '理财计算器'
          }
        },
        {
          path: 'newer_direction',
          name: 'HYCNewerDirection',
          component: () => import(/* webpackChunkName: "HYCNewerDirection" */ '@/views/hyc/NewerDirection'),
          meta: {
            title: '新手指引'
          }
        }
      ]
    }
  ]
})
