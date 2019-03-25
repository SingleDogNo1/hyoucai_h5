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
    // 点金石
    {
      path: '/d',
      component: Activity,
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
          path: 'activity',
          component: Empty,
          children: [
            // mate手机乐
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
            }
          ]
        },
        {
          path: 'agreement',
          name: 'DJSagreement',
          component: () => import('@/views/djs/Agreements')
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
