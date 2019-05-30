/*
* vue-router meta对象值
* meta.title: 每个路由对应的标题
* meta.handle: 导航栏右侧的副标题
* meta.cancel: 返回键显示的文字
* meta.backTo: 点击返回按钮返回到哪里（对应的router_name）*/

import Vue from 'vue'
import Router from 'vue-router'
import Empty from '@/layout/empty.vue'

import tabBarRouter from './tabBar'
import helpCenterRouter from './helpcenter'
import publicRouter from './public'
import activityRouter from './activity'
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
    ...tabBarRouter, // tab-bar一级路由
    ...publicRouter, // 共用路由
    ...activityRouter, // 活动路由
    ...investRouter, // 投资相关的路由
    ...helpCenterRouter // 帮助中心路由
  ]
})
