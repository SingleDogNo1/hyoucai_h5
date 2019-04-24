import Vue from 'vue'
import Router from 'vue-router'
import Activity from './layout/activity.vue'
import Layout from './layout/layout.vue'
import Empty from './layout/empty.vue'
import TabBar from './layout/tabBar.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
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
    },
    // 公用
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
        }
      ]
    },
    /* Layout布局核心是为了better-scroll，因此限制了最外边的wrapper为overflow：hidden。而活动页没有用better-scroll，所以拆开来写。 */
    // 点金石活动
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
    // 因为帮助中心标题的特殊性，所以也没有办法使用Layout布局。
    // 点金石帮助中心
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
    // 点金石
    {
      path: '/d',
      component: Layout,
      children: [
        {
          path: 'investdetail',
          name: 'DJSInvestDetail',
          component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/djs/investDetail'),
          meta: {
            title: '产品详情'
          }
        },
        {
          path: 'easyLend',
          component: Empty,
          children: [
            {
              path: '',
              name: 'DJSInvestDetail',
              component: () => import(/* webpackChunkName: "DJSInvestDetail" */ '@/views/djs/investDetail/easyLend'),
              meta: {
                title: '授权出借'
              }
            },
            {
              path: 'coupon',
              name: 'DJSLendChooseCoupon',
              component: () => import('@/views/djs/investDetail/coupon'),
              meta: {
                title: '选择加息券'
              }
            },
            {
              path: 'redpacket',
              name: 'DJSLendChooseRedPacket',
              component: () => import('@/views/djs/investDetail/redpacket'),
              meta: {
                title: '选择红包'
              }
            }
          ]
        },
        {
          path: 'claimlist',
          name: 'DJSClaimList',
          component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/claim/claimList'),
          meta: {
            title: '债权列表'
          }
        },
        {
          path: 'claimDetail',
          name: 'DJSClaimDetail',
          component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/claim/claimDetail'),
          meta: {
            title: '债权列表详情'
          }
        },
        {
          path: 'lendRecord',
          name: 'DJSLendRecord',
          component: () => import(/* webpackChunkName: "DJSClaimList" */ '@/views/djs/lendRecord'),
          meta: {
            title: '出借记录'
          }
        },
        {
          path: 'act-center',
          name: 'DJSActivityCenter',
          component: () => import(/* webpackChunkName: "DJSActivityCenter" */ '@/views/djs/ActivityCenter/ActivityCenter'),
          meta: {
            title: '活动中心'
          }
        },
        {
          path: 'agreement',
          name: 'DJSagreement',
          component: () => import(/* webpackChunkName: "DJSagreement" */ '@/views/djs/Agreements'),
          meta: {
            title: '协议'
          }
        },
        {
          path: 'gratitude_money',
          name: 'DJSGratitudeMoney',
          component: () => import(/* webpackChunkName: "DJSGratitudeMoney" */ '@/views/djs/GratitudeMoney'),
          meta: {
            title: '我推荐的人'
          }
        },
        {
          path: 'inviteFriends',
          name: 'DJSInviteFriends',
          component: () => import(/* webpackChunkName: "DJSinviteFriends" */ '@/views/djs/mine/Invite/InviteFriends'),
          meta: {
            title: '邀请好友'
          }
        },
        {
          path: 'recommender',
          name: 'DJSRecommender',
          component: () => import(/* webpackChunkName: "DJSRecommender" */ '@/views/djs/mine/Invite/Recommender'),
          meta: {
            title: '我的推荐人'
          }
        },
        {
          path: 'transfer_charge',
          name: 'DJSTransferCharge',
          component: () => import(/* webpackChunkName: "DJSTransferCharge" */ '@/views/djs/TransferCharge'),
          meta: {
            title: '转账充值'
          }
        },
        {
          path: 'notice',
          component: Empty,
          children: [
            {
              path: '',
              name: 'DJSNoticeList',
              component: () => import(/* webpackChunkName: "DJSNoticeDetail" */ '@/views/djs/notice/list'),
              meta: {
                title: '网站公告'
              }
            },
            {
              path: ':id',
              name: 'DJSNoticeDetail',
              component: () => import(/* webpackChunkName: "DJSNoticeDetail" */ '@/views/djs/notice/detail'),
              meta: {
                title: '公告详情'
              }
            }
          ]
        },
        {
          path: 'calculator',
          name: 'DJSCalculator',
          component: () => import(/* webpackChunkName: "DJSCalculator" */ '@/views/djs/calculator'),
          meta: {
            title: '理财计算器'
          }
        },
        {
          path: 'newer_direction',
          name: 'DJSNewerDirection',
          component: () => import(/* webpackChunkName: "DJSNewerDirection" */ '@/views/djs/NewerDirection'),
          meta: {
            title: '新手指引'
          }
        },
        {
          path: 'historyCard',
          name: 'DJSHistoryCard',
          component: () => import(/* webpackChunkName: "DJShistoryCard" */ '@/views/djs/mine/voucherBag/HistoryCard'),
          meta: {
            title: '历史卡券'
          }
        },
        {
          path: 'couponList',
          name: 'DJSCouponList',
          component: () => import(/* webpackChunkName: "DJScouponList" */ '@/views/djs/mine/voucherBag/CouponList'),
          meta: {
            title: '券包'
          }
        },
        {
          path: 'experienceGold',
          name: 'DJSExperienceGold',
          component: () => import(/* webpackChunkName: "DJSExperienceGold" */ '@/views/djs/mine/voucherBag/ExperienceGold'),
          meta: {
            title: '体验金'
          }
        },
        {
          path: 'transactionRecord',
          name: 'DJSTransactionRecord',
          component: () => import(/* webpackChunkName: "DJSTransactionRecord" */ '@/views/djs/mine/TransactionRecord'),
          meta: {
            title: '交易记录'
          }
        },
        {
          path: 'message',
          name: 'DJSSiteMessage',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/message'),
          meta: {
            title: '消息'
          }
        },
        {
          path: 'couponMsg',
          name: 'CouponMsg',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/couponMsg'),
          meta: {
            title: '加息券消息'
          }
        },
        {
          path: 'couponMsgDetail',
          name: 'CouponMsgDetail',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/couponMsgDetail'),
          meta: {
            title: '加息券消息'
          }
        },
        {
          path: 'redMsg',
          name: 'RedMsg',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/redMsg'),
          meta: {
            title: '红包消息'
          }
        },
        {
          path: 'redMsgDetail',
          name: 'RedMsgDetail',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/redMsgDetail'),
          meta: {
            title: '红包消息'
          }
        },
        {
          path: 'repeatMsg',
          name: 'RepeatMsg',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/repeatMsg'),
          meta: {
            title: '复投提醒消息'
          }
        },
        {
          path: 'repeatMsgDetail',
          name: 'RepeatMsgDetail',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/repeatMsgDetail'),
          meta: {
            title: '复投消息'
          }
        },
        {
          path: 'experienceMsg',
          name: 'ExperienceMsg',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/experienceMsg'),
          meta: {
            title: '体验金消息'
          }
        },
        {
          path: 'experienceMsgDetail',
          name: 'ExperienceMsgDetail',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/djs/messages/experienceMsgDetail'),
          meta: {
            title: '体验金消息'
          }
        },
        {
          path: 'charge',
          name: 'DJSCharge',
          component: () => import(/* webpackChunkName: "DJSCharge" */ '@/views/djs/mine/charge/charge'),
          meta: {
            title: '充值',
            cancel: '取消'
          }
        },
        {
          path: 'bank-card',
          name: 'DJSBankCard',
          component: () => import(/* webpackChunkName: "DJSBankCard" */ '@/views/djs/mine/bankCard/bankCard'),
          meta: {
            title: '银行卡'
          }
        },
        {
          path: 'to-cash',
          name: 'DJSToCash',
          component: () => import(/* webpackChunkName: "DJSToCash" */ '@/views/djs/mine/toCash/toCash'),
          meta: {
            title: '提现'
          }
        }
      ]
    },
    /* Layout布局核心是为了better-scroll，因此限制了最外边的wrapper为overflow：hidden。而活动页没有用better-scroll，所以拆开来写。 */
    // 点金石活动
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
    },
    // 因为帮助中心标题的特殊性，所以也没有办法使用Layout布局。
    // 汇有财帮助中心
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
    },
    // 汇有财
    {
      path: '/h',
      component: Layout,
      children: [
        // 活动列表
        {
          path: 'act-center',
          name: 'HYCActivityCenter',
          component: () => import(/* webpackChunkName: "HYCActivityCenter" */ '@/views/hyc/ActivityCenter/ActivityCenter'),
          meta: {
            title: '活动中心'
          }
        },
        // 协议
        {
          path: 'agreement',
          name: 'HYCagreement',
          component: () => import(/* webpackChunkName: "HYCagreement" */ '@/views/hyc/Agreements'),
          meta: {
            title: '协议'
          }
        },
        {
          path: 'gratitude_money',
          name: 'HYCGratitudeMoney',
          component: () => import(/* webpackChunkName: "HYCGratitudeMoney" */ '@/views/hyc/GratitudeMoney'),
          meta: {
            title: '我推荐的人'
          }
        },
        {
          path: 'inviteFriends',
          name: 'HYCInviteFriends',
          component: () => import(/* webpackChunkName: "HYCInviteFriends" */ '@/views/hyc/mine/Invite/InviteFriends'),
          meta: {
            title: '邀请好友'
          }
        },
        {
          path: 'recommender',
          name: 'HYCRecommender',
          component: () => import(/* webpackChunkName: "HYCRecommender" */ '@/views/hyc/mine/Invite/Recommender'),
          meta: {
            title: '我的推荐人'
          }
        },
        {
          path: 'transfer_charge',
          name: 'HYCTransferCharge',
          component: () => import(/* webpackChunkName: "HYCTransferCharge" */ '@/views/hyc/TransferCharge'),
          meta: {
            title: '转账充值'
          }
        },
        {
          path: 'notice',
          component: Empty,
          children: [
            {
              path: '',
              name: 'HYCNoticeList',
              component: () => import(/* webpackChunkName: "HYCNoticeDetail" */ '@/views/hyc/notice/list'),
              meta: {
                title: '公告'
              }
            },
            {
              path: ':id',
              name: 'HYCNoticeDetail',
              component: () => import(/* webpackChunkName: "HYCNoticeDetail" */ '@/views/hyc/notice/detail'),
              meta: {
                title: '公告'
              }
            }
          ]
        },
        {
          path: 'calculator',
          name: 'HYCCalculator',
          component: () => import(/* webpackChunkName: "HYCCalculator" */ '@/views/hyc/calculator'),
          meta: {
            title: '理财计算器'
          }
        },
        {
          path: 'newer_direction',
          name: 'HYCNewerDirection',
          component: () => import(/* webpackChunkName: "HYCNewerDirection" */ '@/views/hyc/NewerDirection'),
          meta: {
            title: '新手指引'
          }
        },
        {
          path: 'transactionRecord',
          name: 'HYCTransactionRecord',
          component: () => import(/* webpackChunkName: "HYCTransactionRecord" */ '@/views/hyc/mine/TransactionRecord'),
          meta: {
            title: '交易记录'
          }
        },
        {
          path: 'message',
          name: 'HYCSiteMessage',
          component: () => import(/* webpackChunkName: "HYCSiteMessage" */ '@/views/hyc/message'),
          meta: {
            title: '消息'
          }
        },
        {
          path: 'charge',
          name: 'HYCCharge',
          component: () => import(/* webpackChunkName: "HYCCharge" */ '@/views/hyc/mine/charge/charge'),
          meta: {
            title: '充值'
          }
        },
        {
          path: 'bank-card',
          name: 'HYCBankCard',
          component: () => import(/* webpackChunkName: "HYCBankCard" */ '@/views/hyc/mine/bankCard/bankCard'),
          meta: {
            title: '银行卡'
          }
        },
        {
          path: 'to-cash',
          name: 'HYCToCash',
          component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/mine/toCash/toCash'),
          meta: {
            title: '提现'
          }
        },
        {
          path: 'investDetail',
          name: 'HYCInvestDetail',
          component: () => import(/* webpackChunkName: "HYCToCash" */ '@/views/hyc/investDetail'),
          meta: {
            title: '产品详情'
          }
        }
      ]
    }
  ]
})
