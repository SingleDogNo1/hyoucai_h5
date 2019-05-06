import Vue from 'vue'
import Router from 'vue-router'
import Empty from '@/layout/empty.vue'
// tab-bar两端各自一级路由
import tabBarRouter from './tabBar'
// 帮助中心路由
import helpCenterRouter from './helpcenter'
// 双端共用路由
import publicRouter from './public'
// 两端各自活动路由
import activityRouter from './activity'
// 两端各自其他路由
import investRouter from './invest'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: Empty,
      children: [
        {
          path: '',
          name: 'differPlatform',
          component: () => import(/* webpackChunkName: "differPlatform" */ '@/views/common/differPlatform')
        }
      ]
    },
    ...tabBarRouter,
    ...publicRouter,
    ...activityRouter,
    ...investRouter,
    ...helpCenterRouter
  ]
})
