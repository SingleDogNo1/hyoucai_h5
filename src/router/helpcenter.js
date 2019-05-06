import Empty from '@/layout/empty.vue'

const router = [
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
  }
]

export default router
