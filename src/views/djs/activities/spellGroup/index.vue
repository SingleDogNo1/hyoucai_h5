<template>
  <div :class="['spell-group', {hidden: showMask}]">
    <button ></button>
    <div class="banner"></div>
    <div class="inner">
      <div class="desc"></div>
      <div class="wrapper">
        <div class="count-down">
          <span class="title">参团倒计时：</span>
          <span class="time" v-if="day > 0">{{day}}</span>
          <span class="split" v-if="day > 0">天</span>
          <span class="time">{{hours}}</span>
          <span class="split">:</span>
          <span class="time">{{minute}}</span>
          <span class="split">:</span>
          <span class="time">{{second}}</span>
        </div>
        <div class="progress-wrapper">
          <ul class="rate">
            <li><span>加息1%</span></li>
            <li><span>加息2%</span></li>
            <li><span>加息3%</span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
          </ul>
          <div class="progress-out">
            <div class="progress-bar" :style="{width: percent}"></div>
          </div>
          <ul class="num">
            <li><span>1人</span></li>
            <li><span>10人</span></li>
            <li><span>20人</span></li>
            <li><span>30人</span></li>
            <li><span></span></li>
            <li><span></span></li>
          </ul>
        </div>
        <div class="total">
          <div class="people">当前参团人数：<span>{{currPeopleNum}}人</span></div>
          <div class="rate">加息：<span>{{couponRate}}%</span></div>
        </div>
        <!-- 活动进行中 -->
        <div class="act-wrapper" v-if="remainingTime > 0">
          <!-- 未参加 -->
          <button class="without-join" v-if="!isJoin" @click="showJoinMask">立即参团</button>
          <!-- 已参加 -->
          <div class="join" v-else>
            <div class="check"></div>
            <h6>恭喜您参与拼团成功！</h6>
            <p>现在完成账户设置，即可领取10元现金红包啦，快快下载APP提现吧！</p>
            <section>
              <button @click="download">下载APP</button>
              <button @click="shareActivity" class="clip-board"  :data-clipboard-text="clipBoardPath">分享拼团</button>
            </section>
          </div>
        </div>
        <!-- 活动已结束 -->
        <div class="no-act" v-else>
         <div></div>
          <section>
            <button @click="download">下载APP</button>
            <button class="clip-board"  :data-clipboard-text="clipBoardPath" @click="shareActivity">分享拼团</button>
          </section>
        </div>
        <div class="rules">
          <div class="title"></div>
          <p>
            1、参团人数达到10人时，即获1%加息券奖励；参团人数达到20人，获2%加息券奖励；参团人数大于30人，即获3%加息券奖励。<br>
            假设您出借<span style="color: #ff7a13;">1万元</span>，你将获得：
          </p>
          <table cellspacing="0">
            <thead>
            <tr>
              <th>出借品类</th>
              <th>年化收益率</th>
              <th>加息3%后</th>
              <th>总收益(元)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>汇选3个月</td>
              <td>10%</td>
              <td>13%</td>
              <td>250<span>+75</span></td>
            </tr>
            <tr>
              <td>汇选6个月</td>
              <td>11%</td>
              <td>14%</td>
              <td>550<span>+150</span></td>
            </tr>
            </tbody>
          </table>
          <p>
            2、加息券于拼团活动结束后1~3个工作日内发放至客户汇有财账户，仅适用于“汇选3个月（10%）”及“汇选6个月（11%）”的出借品类，有效期为发放后的7天。
          </p>
          <p>
            3、参与拼团用户，下载汇有财APP完成账户设置（含开通银行存管）后即获得10元现金红包，可提现哟。
          </p>
          <p>
            4、1%返现奖励最高300元，于4月23日-4月29日发放。
          </p>
          <p>
            5、加息券及1%返现奖励仅适用于客户首次出借奖励，且首次出借金额不低于2000元，呼朋唤友来参与拼团吧。
          </p>
          <p>
            6、为方便您获得现金红包及加息券，参与拼团即同意平台为您开通汇有财先息后本账号。账号可在汇有财APP通过短信验证码登录。
          </p>
          <p>
            7、参与拼团必须为是真实用户，若核实为虚假用户，则成团无效。
          </p>
        </div>
      </div>
    </div>
    <div class="mask-wrapper" v-if="showMask" @click.self="closeMask">
      <div class="mask">
        <section>
          <span>姓名</span>
          <input type="text" v-model="userName" placeholder="请输入姓名">
        </section>
        <section>
          <span>手机号</span>
          <input type="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号">
        </section>
        <section>
          <span>验证码</span>
          <input type="tel" maxlength="6" v-model="smsCode" placeholder="请输入验证码">
          <SMSBtn
            text="获取验证码"
            class="sms-btn"
            ref="smsBtn"
            @getSMSCode="sendSMSCode"
          />
        </section>
        <p>{{errMsg}}</p>
        <input type="button" value="参加拼团" @click="joinActivity">
      </div>
    </div>
    <div id="captcha"></div>
    <div class="share-mask" v-if="showShare">
      <img src="./images/dir_share.png" alt="">
      <p>1.点击右上角的...按钮；</p>
      <p>2.选择“发送给朋友”或“分享到朋友圈”！</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/common/activities'
import { queryProgressApi, joinActivityApi, getSMSCodeApi } from '@/api/djs/ActivitiesApi/spellGroup'
import { timeCountDown, uuid } from '@/assets/js/utils'
import SMSBtn from '@/components/smsBtn'
import { captchaId } from '@/assets/js/const'
import { Toast } from 'mint-ui'
import Cookies from 'js-cookie'
import Clipboard from 'clipboard'

export default {
  name: 'spellGroup',
  components: {
    SMSBtn
  },
  data() {
    return {
      clipBoardPath: window.location.href,
      leaderInviteCode: this.$route.query.leaderInviteCode, // 团长邀请码
      groupId: this.$route.query.groupId, // 拼团活动Id
      currPeopleNum: '0', // 当前参与人数
      couponRate: '0', // 当前可加息利率
      remainingTime: '0', // 参团倒计时
      isJoin: false, // 该用户是否参与过活动
      day: 0, // 倒计时天
      hours: 0, // 倒计时小时
      minute: 0, // 倒计时分钟
      second: 0, // 倒计时秒
      showMask: false, // 是否显示输入框
      showShare: true, // 是否显示微信分享引导图
      userName: '', // 姓名
      mobile: '', // 手机号
      smsCode: '', // 短信验证码
      errMsg: '',
      captchaIns: null, // 滑块验证码实例
      validate: '' // 滑块验证码二次验证信息
    }
  },
  methods: {
    showJoinMask() {
      this.showMask = true
    },
    joinActivity() {
      if (!this.userName) {
        this.errMsg = '请输入姓名'
      } else if (!this.mobile) {
        this.errMsg = '请输入手机号'
      } else if (!this.smsCode) {
        this.errMsg = '请输入验证码'
      } else {
        this.errMsg = ''
        joinActivityApi({
          leaderInviteCode: this.leaderInviteCode,
          name: this.userName,
          mobile: this.mobile,
          groupId: this.groupId,
          identifyCode: this.smsCode
        }).then(res => {
          if (res.data.resultCode === '1') {
            this.isJoin = true
            this.showMask = false
            this.errMsg = ''
            Toast('参与活动成功')
          } else {
            this.errMsg = res.data.resultMsg
          }
        })
      }
    },
    download() {
      this.$router.push({
        name: 'AppDownload'
      })
    },
    shareActivity() {
      function isWeixin() {
        const UA = window.navigator.userAgent.toLowerCase()
        return UA.match(/MicroMessenger/i) == 'micromessenger'
      }

      if (!isWeixin()) {
        let clipboard = new Clipboard('.clip-board')
        clipboard.on('success', () => {
          Toast('已复制分享链接，快去粘贴邀请好友吧！')
        })
      } else {
        this.showShare = true
      }
    },
    sendSMSCode() {
      this.captchaIns && this.captchaIns.popUp()
    },
    getSmsCode() {
      getSMSCodeApi({
        mobile: this.mobile,
        captchaId,
        validate: this.validate
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.$refs.smsBtn.countDown()
          this.errMsg = ''
        } else {
          this.errMsg = res.data.resultMsg
        }
      })
    },
    closeMask() {
      this.showMask = false
      this.errMsg = ''
      this.userName = ''
      this.mobile = ''
      this.smsCode = ''
    }
  },
  computed: {
    percent() {
      const max_percent = 90 // 进度条最大值

      const ori_percent = this.currPeopleNum * 1.7
      const percent = ori_percent >= max_percent ? max_percent : ori_percent
      return percent + '%'
    }
  },
  created() {
    // if (!this.leaderInviteCode) {
    //   Toast('您的推荐人邀请码为空或者不完整，请获取完整拼团链接')
    //   return
    // }

    // 设置 uuid 同一天内不变
    const key = `key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    if (!Cookies.get(key)) {
      let uuid_value = uuid()
      this.uuid = uuid_value
      Cookies.set(key, uuid_value, { expires: 1 })
    } else {
      this.uuid = Cookies.get(key)
    }

    // 初始化滑块弹出层
    window.initNECaptcha(
      {
        captchaId: captchaId,
        width: '320px',
        element: '#captcha',
        mode: 'popup',
        onVerify: (err, data) => {
          this.validate = data.validate
          this.getSmsCode()
        },
        onClose: () => {
          this.captchaIns.refresh()
        }
      },
      instance => {
        this.captchaIns = instance
      }
    )
    // 拼团活动进度查询接口
    queryProgressApi({
      leaderInviteCode: this.leaderInviteCode,
      uuid: this.uuid,
      groupId: this.groupId
    }).then(res => {
      const data = res.data
      this.currPeopleNum = data.currPeopleNum
      this.couponRate = data.couponRate
      this.remainingTime = data.remainingTime

      timeCountDown(this.remainingTime, 1, data => {
        if (data.includes('天')) {
          // 21天08:03:31
          const [days, day] = data.split('天')
          ;[this.day, [this.hours, this.minute, this.second]] = [days, day.split(':')]
        } else {
          // 21天08:03:31
          ;[this.hours, this.minute, this.second] = data.split(':')
        }
      })
    })

    // 微信分享
    const [shareTitle, shareDesc, shareLink, shareImgUrl] = [
      '六周年庆，你的收益由你定',
      '单笔出借满一万，立得现金无上限',
      window.location.href,
      'http://h5.dpandora.cn/images/spell-group.png'
    ]
    api
      .getPageSinatureApi({
        url: window.location.href
      })
      .then(res => {
        const data = res.data
        wx.config({
          debug: false,
          // appId: data.appid,
          appId: 'wx45d16cf33a73b663',
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        })
        wx.ready(() => {
          wx.onMenuShareTimeline({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle
          })
          wx.onMenuShareAppMessage({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQQ({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareWeibo({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
          wx.onMenuShareQZone({
            link: shareLink,
            imgUrl: shareImgUrl,
            title: shareTitle,
            desc: shareDesc
          })
        })
      })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

@keyframes flow {
  0% {
    background-position: left top;
  }
  100% {
    background-position: right top;
  }
}

.spell-group {
  &.hidden {
    /*height: 100vh;*/
    /*overflow: hidden;*/
  }
  .banner {
    width: 100%;
    height: 2.91rem;
    @include bg-image('./images/banner');
    background-size: contain;
  }
  .inner {
    padding: 0.15rem 0.1rem;
    background: linear-gradient(#fb4841, #fc6556);
    .desc {
      width: 100%;
      height: 2.02rem;
      margin-bottom: 0.38rem;
      background-color: #fff;
      background-position: center top;
      border-radius: 0.08rem;
      @include bg-image('./images/desc');
      background-size: cover;
    }
    .wrapper {
      width: 100%;
      background-color: #fff;
      border-radius: 0.08rem;
      position: relative;
      padding: 0.43rem 0.15rem 0.15rem;
      .count-down {
        $height: 0.48rem;
        @include cube(2.87rem, $height);
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: -$height / 2;
        background: #fff;
        box-shadow: 0 0 12px 0 rgba(248, 72, 53, 0.43);
        border-radius: $height / 2;
        display: flex;
        justify-content: center;
        align-items: center;
        .title {
          font-size: 0.16rem;
          color: #333;
        }
        .time {
          @include square(0.26rem);
          background-image: repeating-linear-gradient(-42deg, #f33932, #fd7520);
          border-radius: 0.02rem;
          color: #fff;
          text-align: center;
          line-height: 0.26rem;
        }
        .split {
          margin: 0 0.05rem;
          font-size: 0.16rem;
          color: #333;
          transform: translateY(-0.02rem);
        }
      }
      .progress-wrapper {
        margin-bottom: 0.1rem;
        .rate {
          display: flex;
          height: 0.18rem;
          li {
            flex: 1;
            font-size: 0.1rem;
            color: #f33d30;
            line-height: 0.18rem;
            text-align: right;
            span {
              display: inline-block;
              transform: translateX(50%);
            }
          }
        }
        .progress-out {
          height: 0.14rem;
          border-radius: 0.07rem;
          background: #e2dfdf;
          margin: 0.05rem 0;
          .progress-bar {
            height: 0.14rem;
            border-radius: 0.07rem;
            background-image: repeating-linear-gradient(48deg, #f33932, #fd7620);
          }
        }
        .num {
          display: flex;
          height: 0.18rem;
          li {
            flex: 1;
            font-size: 0.11rem;
            line-height: 0.18rem;
            text-align: left;
            span {
              display: inline-block;
              transform: translateX(-50%);
            }
          }
        }
      }
      .total {
        display: flex;
        justify-content: center;
        margin-bottom: 0.25rem;
        div {
          font-size: 0.14rem;
          line-height: 0.2rem;
          span {
            color: #f4432f;
          }
          &.people {
            padding-right: 0.25rem;
          }
          &.rate {
            border-left: 1px solid #626262;
            padding-left: 0.25rem;
          }
        }
      }
      .act-wrapper {
        margin-bottom: 0.25rem;
        .without-join {
          display: block;
          margin: 0 auto;
          @include radiusCube(2.68rem, 0.42rem);
          color: #fff;
          font-size: 0.18rem;
          background-image: repeating-linear-gradient(39deg, #ff5140, #fc7221);
          animation: flow 1s ease infinite;
        }
        .join {
          .check {
            @include square(0.68rem);
            margin: 0 auto;
            @include bg-image('./images/check');
            background-size: contain;
          }
          h6 {
            font-size: 0.18rem;
            color: #ff7002;
            text-align: center;
            line-height: 0.3rem;
          }
          p {
            font-size: 0.16rem;
            color: #5b5b5b;
            text-align: center;
            line-height: 0.24rem;
            margin-bottom: 0.22rem;
          }
          section {
            display: flex;
            justify-content: space-between;
            button {
              @include radiusCube(1.52rem, 0.42rem);
              font-size: 0.18rem;
              color: #fff;
              &:first-child {
                background-image: linear-gradient(-39deg, #ff5140 0%, #fc7221 100%);
              }
              &:last-child {
                background-image: repeating-linear-gradient(-262deg, #753ce4, #f24225);
              }
            }
          }
        }
      }
      .no-act {
        div {
          @include cube(3.23rem, 2.39rem);
          margin: 0 auto 0.27rem;
          @include bg-image('./images/no-act');
          background-size: contain;
        }
        section {
          display: flex;
          justify-content: space-between;
          button {
            @include radiusCube(1.52rem, 0.42rem);
            font-size: 0.18rem;
            color: #fff;
            &:first-child {
              background-image: linear-gradient(-39deg, #ff5140 0%, #fc7221 100%);
            }
            &:last-child {
              background-image: repeating-linear-gradient(-262deg, #753ce4, #f24225);
            }
          }
        }
      }
      .rules {
        margin-top: 0.24rem;
        .title {
          @include cube(1.09rem, 0.17rem);
          margin: 0 auto 0.07rem;
          @include bg-image('./images/rules');
          background-size: contain;
        }
        p {
          font-size: 0.13rem;
          color: #5b5b5b;
          line-height: 1.75;
          word-break: break-all;
          word-wrap: break-word;
        }
        table {
          width: 100%;
          border-radius: 0.02rem;
          margin: 0.06rem 0;
          th,
          td {
            width: 25%;
            border: 1px solid #ffffff;
            height: 0.34rem;
            text-align: center;
            span {
              color: #f4432f;
            }
          }
          thead {
            background: #ffe6c9;
          }
          tbody {
            background: #fff7ed;
          }
        }
      }
    }
  }
  .mask-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .mask {
      @include cube(3.15rem, 3.17rem);
      @include bg-image('./images/mask-bg');
      background-size: contain;
      padding: 0.22rem;
      input {
        &::placeholder {
          color: #c7c7cd;
        }
      }
      section {
        display: flex;
        height: 0.6rem;
        box-sizing: border-box;
        padding-top: 0.3rem;
        border-bottom: 1px solid #d4d4d4;
        position: relative;
        span {
          width: 0.5rem;
          color: #333;
          font-size: 0.15rem;
          line-height: 0.3rem;
        }
        > input {
          flex: 1;
          padding-left: 0.1rem;
        }
        .sms-btn {
          position: absolute;
          right: 0;
          bottom: 0;
          box-shadow: -0.05rem -0.05rem 0 0.1rem #fff;
          @include cube(0.9rem, 0.28rem);
          border-radius: 0.04rem;
          border: 1px solid #fe6108;
          font-size: 0.15rem;
          color: #fe6108;
          /deep/ input {
            display: block;
            width: 100%;
            height: 100%;
          }
          &.disable {
            /deep/ input {
              color: #fe6108;
            }
          }
        }
      }
      > p {
        font-size: 0.11rem;
        color: #ff5140;
        margin-top: 0.04rem;
      }
      > input {
        margin: 0.25rem auto 0;
        display: block;
        @include radiusCube(2.55rem, 0.42rem);
        background-image: repeating-linear-gradient(39deg, #ff5140, #fc7221);
        font-size: 0.18rem;
        color: #ffffff;
      }
    }
  }
  .share-mask {
    position: fixed;
    top: 0;
    left: 0;
    @include cube();
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
    img {
      width: 1rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      align-self: flex-end;
    }
    p {
      color: #fff;
      font-size: 0.16rem;
      margin-top: 0.05rem;
      line-height: 2;
    }
  }
}
</style>
