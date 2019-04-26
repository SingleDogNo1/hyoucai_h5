// 双平台共用路由
import Layout from '@/layout/layout.vue'
import Empty from '@/layout/empty.vue'

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'login-register',
        name: 'loginRegister',
        component: () => import(/* webpackChunkName: "login" */ '@/views/common/loginRegister'),
        meta: {
          title: '登录'
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
        path: 'remind-open-account',
        name: 'remindOpenAccount',
        component: () => import(/* webpackChunkName: "remindOpenAccount" */ '@/views/common/openAccount/RemindOpenAccount'),
        meta: {
          title: '提醒开户'
        }
      },
      {
        path: 'open-account',
        name: 'openAccountProgress',
        component: () => import(/* webpackChunkName: "openAccount" */ '@/views/common/openAccount/Progress'),
        children: [
          {
            path: 'open',
            name: 'openAccount',
            component: () => import(/* webpackChunkName: "openAccount" */ '@/views/common/openAccount/OpenAccount'),
            meta: {
              title: '开通存管账户'
            }
          },
          {
            path: 'sign',
            name: 'signAgreement',
            component: () => import(/* webpackChunkName: "openAccount" */ '@/views/common/openAccount/SignAgreement'),
            meta: {
              title: '业务授权'
            }
          }
        ]
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
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import(/* webpackChunkName: "Setting" */ '@/views/common/Setting'),
        meta: {
          title: '设置'
        }
      },
      {
        path: 'setting/loginPassword',
        name: 'loginPassword',
        component: () => import(/* webpackChunkName: "Setting" */ '@/views/common/Setting/modifyPWD.vue'),
        meta: {
          title: '修改登录密码'
        }
      },
      {
        path: 'setting/receiveAddress',
        name: 'receiveAddress',
        component: () => import(/* webpackChunkName: "Setting" */ '@/views/common/Setting/receiveAddress'),
        meta: {
          title: '地址管理'
        }
      },
      {
        path: 'activity',
        component: Empty,
        children: [
          {
            path: 'prizeDraw',
            component: () => import(/* webpackChunkName: "Activity" */ '@/views/common/activities/prizeDraw')
          },
          {
            path: 'spellTeam',
            component: () => import(/* webpackChunkName: "spellTeam" */ '@/views/common/activities/spellTeam')
          }
        ]
      }
    ]
  }
]
