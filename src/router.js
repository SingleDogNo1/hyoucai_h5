import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // 风险测评(共用)
    {
      path: '/risk-test',
      name: 'riskTest',
      component: () => import('@/views/common/RiskTest/RiskTest')
    },
    // 关于我们(共用)
    {
      path: '/about-us',
      component: Layout,
      children: [
        {
          path: '',
          name: 'AboutUs',
          component: () => import('@/views/common/AboutUs/AboutUs')
        }
      ]
    },
    // 严选资产(共用)
    {
      path: '/selectMeans',
      component: Layout,
      children: [
        {
          path: '',
          name: 'selectMeans',
          component: () => import('@/views/common/selectMeans')
        }
      ]
    },
    // 合规管理(共用)
    {
      path: '/complianceManagement',
      component: Layout,
      children: [
        {
          path: '',
          name: 'complianceManagement',
          component: () => import('@/views/common/complianceManagement/index')
        }
      ]
    },
    // 资产安全(共用)
    {
      path: '/fundSafety',
      component: Layout,
      children: [
        {
          path: '',
          name: 'fundSafety',
          component: () => import('@/views/common/FundSafety')
        }
      ]
    },
    // 常见问题(共用)
    {
      path: '/common_problem',
      component: Layout,
      children: [
        {
          path: '',
          name: 'commonProblem',
          component: () => import('@/views/common/CommonProblem')
        }
      ]
    },
    // 出借指南(共用)
    {
      path: '/introduction',
      component: Layout,
      children: [
        // 出借指南-优质项目
        {
          path: '',
          name: 'introduction',
          component: () => import('@/views/common/introduction')
        },
        // 出借指南-汇有财优惠券
        {
          path: 'coupon',
          name: 'introduceCoupon',
          component: () => import('@/views/common/introduction/coupon')
        },
        // 出借指南-我的钱出借
        {
          path: 'netLoan',
          name: 'introduceNetLoan',
          component: () => import('@/views/common/introduction/netLoan')
        }
      ]
    },
    // 可用银行列表(共用)
    {
      path: '/support_banks',
      component: Layout,
      children: [
        {
          path: '',
          name: 'supportBanks',
          component: () => import('@/views/common/SupportBank')
        }
      ]
    },
    // 资金存管(共用)
    {
      path: '/archival',
      component: Layout,
      children: [
        {
          path: '',
          name: 'ArchivalInfo',
          component: () => import('@/views/common/ArchivalInfo')
        }
      ]
    },
    // 信息披露(共用)
    {
      path: '/info_disclose',
      component: Layout,
      children: [
        {
          path: '',
          name: 'InfoDisclose',
          component: () => import('@/views/common/InfoDisclose')
        }
      ]
    },
    // 证书(共用)
    {
      path: '/certificate',
      component: Layout,
      children: [
        {
          path: '',
          name: 'certificate',
          component: () => import('@/views/common/certificate')
        }
      ]
    },
    // 下载页
    {
      path: '/download',
      component: Layout,
      children: [
        {
          path: '',
          name: 'AppDownload',
          component: () => import('@/views/common/Download')
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
          component: () => import('@/views/djs/investDetail')
        },
        {
          path: 'act-center',
          component: Layout,
          children: [
            {
              path: '',
              name: 'DJSActivityCenter',
              component: () => import('@/views/djs/ActivityCenter/ActivityCenter')
            }
          ]
        },
        {
          path: 'activity',
          component: Activity,
          children: [
            // mate手机乐
            {
              path: 'mateact',
              name: 'DJSmateAct',
              component: () => import('@/views/djs/activities/mateact/mateact')
            },
            {
              path: 'coupon',
              name: 'DJScoupon',
              component: () => import('@/views/djs/activities/coupon/index')
            },
            {
              path: 'gold',
              name: 'DJSGold',
              component: () => import('@/views/djs/activities/goldact')
            }
          ]
        },
        {
          path: 'agreement',
          component: Layout,
          children: [
            {
              path: '',
              name: 'DJSagreement',
              component: () => import('@/views/djs/Agreements')
            }
          ]
        },
        {
          path: 'help',
          component: Layout,
          children: [
            {
              path: '',
              name: 'DJSHelp',
              component: () => import('@/views/djs/Help')
            }
          ]
        },
        {
          path: 'gratitude_money',
          component: Layout,
          children: [
            {
              path: '',
              name: 'DJSGratitudeMoney',
              component: () => import('@/views/djs/GratitudeMoney')
            }
          ]
        },
        {
          path: 'transfer_charge',
          component: Layout,
          children: [
            {
              path: '',
              name: 'DJSTransferCharge',
              component: () => import('@/views/djs/TransferCharge')
            }
          ]
        },
        {
          path: 'notice',
          component: Layout,
          children: [
            {
              path: ':id',
              name: 'DJSNoticeDetail',
              component: () => import('@/views/djs/notice')
            }
          ]
        },
        {
          path: 'calculator',
          name: 'DJSCalculator',
          component: () => import('@/views/djs/calculator')
        },
        {
          path: 'newer_direction',
          name: 'DJSNewerDirection',
          component: () => import('@/views/djs/NewerDirection')
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
          component: () => import('@/views/hyc/ActivityCenter/ActivityCenter')
        },
        // 活动详情
        {
          path: 'activity',
          component: Activity,
          children: [
            // mate手机乐
            {
              path: 'mateact',
              name: 'HYCmateAct',
              component: () => import('@/views/hyc/activities/mateact/mateact')
            }
          ]
        },
        // 协议
        {
          path: 'agreement',
          component: Layout,
          children: [
            {
              path: '',
              name: 'HYCagreement',
              component: () => import('@/views/hyc/Agreements')
            }
          ]
        },
        {
          path: 'help',
          component: Layout,
          children: [
            {
              path: '',
              name: 'Help',
              component: () => import('@/views/hyc/Help')
            }
          ]
        },
        {
          path: 'gratitude_money',
          component: Layout,
          children: [
            {
              path: '',
              name: 'HYCGratitudeMoney',
              component: () => import('@/views/hyc/GratitudeMoney')
            }
          ]
        },
        {
          path: 'transfer_charge',
          component: Layout,
          children: [
            {
              path: '',
              name: 'HYCTransferCharge',
              component: () => import('@/views/hyc/TransferCharge')
            }
          ]
        },
        {
          path: 'notice',
          component: Layout,
          children: [
            {
              path: ':id',
              name: 'HYCNoticeDetail',
              component: () => import('@/views/hyc/notice')
            }
          ]
        },
        {
          path: 'calculator',
          name: 'HYCCalculator',
          component: () => import('@/views/hyc/calculator')
        },
        {
          path: 'newer_direction',
          name: 'HYCNewerDirection',
          component: () => import('@/views/hyc/NewerDirection')
        }
      ]
    }
  ]
})
