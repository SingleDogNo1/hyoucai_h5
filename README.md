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
  
**注意： [环境变量要以VUE_APP_开头。](#explain-a)**
  
## 项目结构
**这里只列举了关键的文件**

├─public
│  ├─static  不想参与打包的所有静态文件,build之后依然在根目录下static中
│  ├─favicon.ico
│  ├─index.html
│  ├─rem.js
├─src
│  ├─api  所有请求都放在这里，接口名 === 模块名
│  │  ├─common  两端通用的接口
│  │  ├─djs  点金石的接口
│  │  └─hyc  汇有财的接口
│  ├─assets  [需要参与打包的公共静态资源](#explain-b)
│  │  ├─css
│  │  │  ├─base.css  项目自身的全局css （只需要改这里）
│  │  │  ├─mixins.scss  全局mixins，欢迎继续补充
│  │  │  └─themes.scss  全局主题变量，包括字体大小、颜色
│  │  ├─js
│  │  │  ├─cache.js  [get || set cookie的方法](#explain-c)
│  │  │  ├─const.js  全局常量（倒计时时间、滑块验证码id、server返回resultCode等）
│  │  │  ├─requestDJS.js  封装的axios请求（点金石方向）
│  │  │  ├─requestHYC.js  封装的axios请求（汇有财方向）
│  │  │  └─utils.js  工具类
│  ├─components  组件库[封装组件的规则](#explain-d)
│  │  ├─BScroll [封装的滑动组件](http://ustbhuangyi.github.io/better-scroll/doc/api.html)
│  │  ├─djs  点金石的接口
│  │  └─hyc  汇有财的接口
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

## 说明
+ <div id="explain-a"> 环境变量要以VUE_APP_开头的环境变量可以在应用代码中全局访问到。访问方式：process.env.VUE_APP_VAR (参考App.vue检测UA代码)。 </div>
+ <div id="explainB">这里的资源指的是
  - 已经在多个模块中被复用。 比如：首页、个人中心、我的投资、投资详情四个模块都会用到的图片。
  - 只在全局加载的文件。比如：全局的css文件、封装好的js请求。
  - 有极大可能将会被多个模块复用的资源。比如：新加入的模块中使用了的字体文件，90%可能也会用到其他模块中。</div>
+ <div id="explain-c"> 这个项目中使用cookie的主要目的是为了vuex服务。具体逻辑如下：在需要储存数据时存放到vuex中，同时储存到cookie。刷新网页的时候再从cookie中取对应的值回填到vuex中，以此保证vuex数据不会在刷新时丢失。 </div>
+ <div id="explain-d">
  -  每个组件创建单独的文件夹，以便组件单独的资源文件管理。
  -  组件文件命名为index.vue，这样的话引用组件时可以不用添加具体的文件名，方便开发。
  - 所有组件的命名必须使用驼峰命名，**并且首字母大写。**避免引用时造成不必要的错误。
  </div>
