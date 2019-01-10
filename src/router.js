import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
    }
  ]
})
