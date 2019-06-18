import TabBar from '@/layout/tabBar.vue'

const router = [
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
        name: 'DJSInvestment',
        component: () => import(/* webpackChunkName: "DJSInvestment" */ '@/views/djs/investment')
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
        name: 'HYCInvestment',
        component: () => import(/* webpackChunkName: "HYCInvestment" */ '@/views/hyc/investment')
      },
      {
        path: 'mine',
        name: 'HYCUserCenter',
        component: () => import(/* webpackChunkName: "HYCUserCenter" */ '@/views/hyc/mine')
      }
    ]
  }
]

export default router
