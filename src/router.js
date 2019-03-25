import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/common/HomePage'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'
import Empty from './layout/empty.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    // 公用
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            title: '首页'
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
          component: () => import('@/views/common/SupportBank'),
          meta: {
            title: '可用银行列表'
          }
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
            },
            {
              path: 'register',
              name: 'DJSRegister',
              component: () => import('@/views/djs/activities/register')
            },
            {
              path: 'womensday',
              name: 'womensDay',
              component: () => import('@/views/djs/activities/womensDay/index')
            },
            {
              path: 'inviteact',
              name: 'DJSinviteAct',
              component: () => import('@/views/djs/activities/inviteact')
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
            },
            {
              path: 'anni-cashback',
              name: 'sixthAnniCashback',
              component: () => import('@/views/hyc/activities/sixthAnniversary/index')
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
