import Activity from '@/layout/activity.vue'
import Empty from '@/layout/empty.vue'

const router = [
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
            component: () => import(/* webpackChunkName: "DJSMateAct" */ '@/views/djs/activities/mateact/mateact')
          },
          {
            path: 'coupon',
            name: 'DJScoupon',
            component: () => import(/* webpackChunkName: "DJSCouponAct" */ '@/views/djs/activities/coupon/index')
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
            component: () => import(/* webpackChunkName: "womenDayAct" */ '@/views/djs/activities/womensDay/index')
          },
          {
            path: 'inviteact',
            name: 'DJSinviteAct',
            component: () => import(/* webpackChunkName: "DJSInviteAct" */ '@/views/djs/activities/inviteact')
          },
          {
            path: 'yearact',
            name: 'DJSyearAct',
            component: () => import(/* webpackChunkName: "DJSYearAct" */ '@/views/djs/activities/yearact')
          },
          {
            path: 'yearact_2',
            name: 'DJSyearAct_2',
            component: () => import(/* webpackChunkName: "DJSYearAct_2" */ '@/views/djs/activities/yearact_2')
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
          },
          {
            path: 'king',
            name: 'DJSKing',
            component: () => import(/* webpackChunkName: "DJSKing" */ '@/views/djs/activities/king')
          },
          {
            path: 'may-recommend',
            name: 'DJSMayRecommend',
            component: () => import(/* webpackChunkName: "DJSMayRecommend" */ '@/views/djs/activities/mayRecommend')
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
          {
            path: 'mateact',
            name: 'HYCmateAct',
            component: () => import(/* webpackChunkName: "HYCMateAct" */ '@/views/hyc/activities/mateact/mateact')
          },
          {
            path: 'anni-cashback',
            name: 'sixthAnniCashback',
            component: () => import(/* webpackChunkName: "sixthAnniCashBack" */ '@/views/hyc/activities/sixthAnniversary/index')
          }
        ]
      }
    ]
  }
]

export default router
