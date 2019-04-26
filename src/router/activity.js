// 首页 && 出借 && 我的 一级带tab-bar的路由
import Activity from '@/layout/activity.vue'
import Empty from '@/layout/empty.vue'

export default [
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
  }
]
