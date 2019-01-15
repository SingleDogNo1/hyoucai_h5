import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/risk-test', // 风险测评
      name: 'riskTest',
      component: () => import('@/views/RiskTest/RiskTest')
    },
    {
      path: '/act-center', // 活动列表
      name: 'ActivityCenter',
      component: () => import('@/views/ActivityCenter/ActivityCenter')
    },
    {
      path: '/activity',
      redirect: '/activity/mateact',
      component: Activity,
      children: [
        {
          path: 'mateact',
          name: 'mateAct',
          component: () => import('@/views/activities/mateact/mateact')
        }
      ]
    },
    {
      path: '/about-us', // 关于我们
      component: Layout,
      children: [
        {
          path: '',
          name: 'AboutUs',
          component: () => import('@/views/AboutUs/AboutUs')
        }
      ]
    },
    {
      path: '/selectMeans', // 严选资产
      component: Layout,
      children: [
        {
          path: '',
          name: 'selectMeans',
          component: () => import('@/views/selectMeans')
        }
      ]
    },
    {
      path: '/complianceManagement', // 合规管理
      component: Layout,
      children: [
        {
          path: '',
          name: 'complianceManagement',
          component: () => import('@/views/complianceManagement/index')
        }
      ]
    },
    {
      path: '/fundSafety', // 资产安全
      component: Layout,
      children: [
        {
          path: '',
          name: 'fundSafety',
          component: () => import('@/views/FundSafety')
        }
      ]
    },
    {
      path: '/common_problem', // 常见问题
      component: Layout,
      children: [
        {
          path: '',
          name: 'commonProblem',
          component: () => import('@/views/CommonProblem')
        }
      ]
    },
    {
      path: '/agreement', // 协议
      component: Layout,
      children: [
        {
          path: '',
          name: 'agreement',
          component: () => import('@/views/Agreements')
        }
      ]
    },
    {
      path: '/introduction',
      component: Layout,
      children: [
        {
          path: '',
          name: 'introduction',
          component: () => import('@/views/introduction')
        },
        {
          path: 'coupon',
          name: 'introduceCoupon',
          component: () => import('@/views/introduction/coupon')
        },
        {
          path: 'netLoan',
          name: 'introduceNetLoan',
          component: () => import('@/views/introduction/netLoan')
        }
      ]
    },
    {
      path: '/support_banks',
      component: Layout,
      children: [
        {
          path: '',
          name: 'supportBanks',
          component: () => import('@/views/SupportBank')
        }
      ]
    },
    {
      path: '/archival',
      component: Layout,
      children: [
        {
          path: '',
          name: 'ArchivalInfo',
          component: () => import('@/views/ArchivalInfo')
        }
      ]
    },
    {
      path: '/info_disclose',
      component: Layout,
      children: [
        {
          path: '',
          name: 'InfoDisclose',
          component: () => import('@/views/InfoDisclose')
        }
      ]
    },
    {
      path: '/newer_direction',
      component: Layout,
      children: [
        {
          path: '',
          name: 'NewerDirection',
          component: () => import('@/views/NewerDirection')
        }
      ]
    },
    {
      path: '/help',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Help',
          component: () => import('@/views/Help')
        }
      ]
    },
    {
      path: '/certificate',
      component: Layout,
      children: [
        {
          path: '',
          name: 'certificate',
          component: () => import('@/views/certificate')
        }
      ]
    }
  ]
})
