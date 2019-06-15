import Layout from '@/layout/layout.vue'
import Empty from '@/layout/empty.vue'

const router = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'login-register',
        name: 'loginRegister',
        component: () => import(/* webpackChunkName: "loginRegister" */ '@/views/common/loginRegister'),
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
        component: () => import(/* webpackChunkName: "openAccountProgress" */ '@/views/common/openAccount/Progress'),
        redirect: 'open-account/open',
        children: [
          {
            path: 'open',
            name: 'openAccount',
            component: () => import(/* webpackChunkName: "openAccount" */ '@/views/common/openAccount/OpenAccount'),
            meta: {
              title: '开通汇有财账户'
            }
          },
          {
            path: 'sign',
            name: 'signAgreement',
            component: () => import(/* webpackChunkName: "signAgreement" */ '@/views/common/openAccount/SignAgreement'),
            meta: {
              title: '业务授权'
            }
          }
        ]
      },
      {
        path: 'realNameAuth',
        name: 'realNameAuthProgress',
        component: () => import(/* webpackChunkName: "realNameAuthProgress" */ '@/views/common/realNameAuth/progress'),
        children: [
          {
            path: 'name',
            name: 'realNameAuthCheckName',
            component: () => import(/* webpackChunkName: "realNameAuthCheckName" */ '@/views/common/realNameAuth/name'),
            meta: {
              title: '开通汇有财账户'
            }
          },
          {
            path: 'card',
            name: 'realNameAuthBindCard',
            component: () => import(/* webpackChunkName: "realNameAuthBindCard" */ '@/views/common/realNameAuth/card'),
            meta: {
              title: '开通汇有财账户'
            }
          }
        ]
      },
      {
        path: 'forgetpwd',
        name: 'forgetPWD',
        component: () => import(/* webpackChunkName: "forgetPWD" */ '@/views/common/forgetPWD'),
        meta: {
          title: '忘记密码'
        }
      },
      {
        path: 'risk-test',
        name: 'riskTest',
        component: () => import(/* webpackChunkName: "riskTest" */ '@/views/common/RiskTest/RiskTest'),
        meta: {
          title: '风险测评'
        }
      },
      {
        path: 'about-us',
        name: 'AboutUs',
        component: () => import(/* webpackChunkName: "AboutUs" */ '@/views/common/AboutUs/AboutUs'),
        meta: {
          title: '信息披露'
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
      // TODO 可用银行卡列表已拆分两端，汇有财端给app用的还是旧地址/support_bank，下一次app迭代再把这个地址替换成/h/support_bank,把这个路由删掉
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
        component: () => import(/* webpackChunkName: "ArchivalInfo" */ '@/views/common/ArchivalInfo'),
        meta: {
          title: '资金存管'
        }
      },
      {
        path: 'info_disclose',
        name: 'InfoDisclose',
        component: () => import(/* webpackChunkName: "InfoDisclose" */ '@/views/common/InfoDisclose'),
        meta: {
          title: '运营数据'
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
        // TODO 下载app落地页没有标题？
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
        component: () => import(/* webpackChunkName: "loginPassword" */ '@/views/common/Setting/modifyPWD.vue'),
        meta: {
          title: '修改登录密码'
        }
      },
      {
        path: 'setting/receiveAddress',
        name: 'receiveAddress',
        component: () => import(/* webpackChunkName: "receiveAddress" */ '@/views/common/Setting/receiveAddress'),
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
            name: 'prizeDraw',
            component: () => import(/* webpackChunkName: "prizeDraw" */ '@/views/common/activities/prizeDraw')
          },
          {
            path: 'spellTeam',
            name: 'spellTeam',
            component: () => import(/* webpackChunkName: "spellTeam" */ '@/views/common/activities/spellTeam')
          },
          {
            path: 'king', // 6月王者加息券
            name: 'DJSKingJune',
            component: () => import(/* webpackChunkName: "DJSKingJune" */ '@/views/common/activities/king')
          }
        ]
      },
      {
        path: 'calculator',
        component: () => import(/* webpackChunkName: "calculator" */ '@/views/hyc/calculator')
      }
    ]
  }
]

export default router
