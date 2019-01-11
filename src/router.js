import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/risk-test',
      name: 'riskTest',
      component: () => import('@/views/RiskTest/RiskTest')
    },
    {
      path: '/act-center',
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
      path: '/about-us',
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
    }
  ]
})
