# 文档说明
点汇合一开发文档。       
**注意以下重点加粗部分的详细内容**

## 根目录文件
>  绝大多数情况下,根目录下除了.env开头的文件之外,都不需要修改(已经配置好了),除非你知道自己改的是什么

.env开头的是配置文件,关于环境的配置都在这里,名字为对应环境的名字。现有的配置：
- VUE_APP_BASE_DJS_API: 点金石接口地址
- VUE_APP_BASE_HYC_API: 汇有财接口地址
- VUE_APP_PROJECT_ADDRESS_H5: H5对应环境的地址
  VUE_APP_PROJECT_ADDRESS_PC: PC对应环境的地址
  
**注意： [环境变量要以VUE_APP_开头。](#explainA)**
  
## 项目结构

├─public
│  ├─static  不想参与打包的所有静态文件,build之后依然在根目录下static中
│  ├─favicon.ico
│  ├─index.html
│  ├─rem.js
├─src
│  ├─api  所有请求都放在这里，接口名 === 模块名
│  │  ├─common  两端通用的接口
│  │  ├─djs  点金石的接口
│  │  ├─hyc  汇有财的接口
│  ├─assets  [需要参与打包的公共静态资源](#explainB)
│  │  ├─help
│  │  ├─infoDisclise
│  │  ├─riskTest
│  │  └─support_bank
│  ├─djs
│  │  ├─ActCenter
│  │  ├─ActivitiesApi
│  │  ├─gratitude_money
│  │  ├─help
│  │  └─notice
│  └─hyc
│      ├─ActCenter
│      ├─ActivitiesApi
│      ├─agreement
│      ├─gratitude_money
│      ├─help
│      ├─investment
│      └─notice
├─assets
│  ├─css
│  ├─imgs
│  └─js
├─components
│  ├─AppHeader
│  ├─BScroll
│  ├─NoData
│  ├─passwordStrength
│  ├─Ruler
│  └─smsBtn
├─layout
├─store
│  └─modules
└─views
    ├─common
    │  ├─AboutUs
    │  ├─ArchivalInfo
    │  ├─certificate
    │  ├─CommonProblem
    │  ├─complianceManagement
    │  ├─Download
    │  │  └─images
    │  ├─forgetPWD
    │  ├─FundSafety
    │  ├─HomePage
    │  ├─InfoDisclose
    │  │  └─reports
    │  │      ├─2017-01
    │  │      ├─2017-02
    │  │      ├─2017-03
    │  │      ├─2017-04
    │  │      ├─2018-01
    │  │      ├─2018-Aug
    │  │      ├─2018-firsthalf
    │  │      ├─2018-July
    │  │      ├─2018-Nov
    │  │      ├─2018-Oct
    │  │      └─2018-Sep
    │  ├─introduction
    │  ├─login
    │  ├─register
    │  ├─RiskTest
    │  ├─selectMeans
    │  ├─SupportBank
    │  └─TransferCharge
    ├─djs
    │  ├─activities
    │  │  ├─coupon
    │  │  ├─goldact
    │  │  ├─inviteact
    │  │  ├─mateact
    │  │  ├─register
    │  │  ├─womensDay
    │  │  └─yearact
    │  ├─ActivityCenter
    │  ├─Agreements
    │  ├─calculator
    │  ├─GratitudeMoney
    │  ├─Help
    │  ├─investDetail
    │  ├─NewerDirection
    │  ├─notice
    │  └─TransferCharge
    └─hyc
        ├─activities
        │  ├─mateact
        │  └─sixthAnniversary
        ├─ActivityCenter
        ├─Agreements
        ├─calculator
        ├─GratitudeMoney
        ├─Help
        ├─NewerDirection
        ├─notice
        └─TransferCharge

- 每一页的标题放在router文件的meta中

### 说明
+ <span id="explainA">环境变量要以VUE_APP_开头的环境变量可以在应用代码中全局访问到。访问方式：process.env.VUE_APP_VAR (参考App.vue检测UA代码)。</span>
+ <span id="explainB">这里的资源指的是
  - 已经在多个模块中被复用。 比如：首页、个人中心、我的投资、投资详情四个模块都会用到的图片。
  - 只在全局加载的文件。比如：全局的css文件、封装好的js请求。
  - 有极大可能将会被多个模块复用的资源。比如：新加入的模块中使用了的字体文件，90%可能也会用到其他模块中。
</span>
