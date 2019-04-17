<!--
  http://localhost:8080/#/activity/spellTeam?groupId=2&teamCode=zd1

  http://localhost:8080/#/d/activity/spell-group?groupId=1&leaderInviteCode=djs312775xb
-->

<template>
  <div class="spell-group">
    <BScroll ref="spellGroup" class="scroll">
      <div :class="[{ hidden: showMask }]">
        <img src="./spellTeam/banner.png" class="banner" alt="" />
        <div class="inner">
          <img src="./spellTeam/desc.png" class="desc" alt="" />
          <div class="count-down">
            <span class="title bold">参团倒计时</span>
            <span class="time" v-if="day > 0">{{ day }}</span>
            <span class="split bold" v-if="day > 0">天</span>
            <span class="time">{{ hours }}</span>
            <span class="split bold">:</span>
            <span class="time">{{ minute }}</span>
            <span class="split bold">:</span>
            <span class="time">{{ second }}</span>
          </div>
          <div class="wrapper">
            <div class="progress-wrapper">
              <ul class="rate">
                <li><span></span></li>
                <li><span>加息1%</span></li>
                <li><span>加息2%</span></li>
                <li><span>加息3%</span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
              </ul>
              <div class="progress-out">
                <div class="progress-bar" :style="{ width: percent }"></div>
                <template v-for="item in 4">
                  <div
                    :key="item"
                    class="dot"
                    :style="{ left: ((item / 7) * 100).toFixed(2) + '%' }"
                    v-if="parseFloat(percent) / 10 > item * 1.5"
                  ></div>
                </template>
              </div>
              <ul class="num">
                <li><span></span></li>
                <li><span>1人</span></li>
                <li><span>10人</span></li>
                <li><span>20人</span></li>
                <li><span>30人</span></li>
                <li><span></span></li>
                <li><span></span></li>
              </ul>
            </div>
            <div class="total">
              <div class="people">
                当前参团人数：<span>{{ currPeopleNum }}人</span>
              </div>
              <div class="rate">
                加息：<span>{{ couponRate }}%</span>
              </div>
            </div>
            <!-- 活动进行中 -->
            <div class="act-wrapper" v-if="!isOverdue">
              <!-- 未参加 -->
              <button class="without-join" v-if="!isJoin" @click="showJoinMask">立即参团</button>
              <!-- 已参加 -->
              <div class="join" v-else>
                <div class="desc1">
                  <img src="./spellTeam/check.png" alt="" />
                  <h6>恭喜您参与拼团成功！</h6>
                </div>
                <p>现在完成账户设置，即可领取10元现金红包啦，快快下载APP提现吧！</p>
                <section>
                  <button @click="download">下载APP</button>
                  <button @click="shareActivity" class="clip-board">立即注册</button>
                </section>
              </div>
            </div>
            <!-- 活动已结束 -->
            <div class="no-act" v-else>
              <img src="./spellTeam/no-act.png" alt="" />
              <section>
                <button @click="download">下载APP</button>
                <button class="clip-board" @click="shareActivity">立即注册</button>
              </section>
            </div>
          </div>
          <div class="rules">
            <div class="title">活动细则</div>
            <section>
              <p>
                <i>1</i>参团人数达到10人时，即获1%加息券奖励；参团人数达到20人，获2%加息券奖励；参团人数大于30人，即获3%加息券奖励。<br />
                假设您出借<span style="color: #ff7a13;">1万元</span>，你将获得：
              </p>
              <ul>
                <li class="thead">
                  <p>出借品类</p>
                  <p>年化收益率</p>
                  <p>加息3%后</p>
                  <p>总收益(元)</p>
                </li>
                <li class="tbody">
                  <p>汇选3个月</p>
                  <p>10%</p>
                  <p>13%</p>
                  <p>250<span>+75</span></p>
                </li>
                <li class="tbody">
                  <p>汇选6个月</p>
                  <p>11%</p>
                  <p>14%</p>
                  <p>550<span>+150</span></p>
                </li>
              </ul>
              <p>
                <i>2</i>
                加息券于拼团活动结束后1~3个工作日内发放至客户汇有财账户，仅适用于“汇选3个月（10%）”及“汇选6个月（11%）”的出借品类，有效期为发放后的7天。
              </p>
              <p>
                <i>3</i>
                参与拼团用户，下载汇有财APP完成账户设置（含开通银行存管）后即获得10元现金红包，可提现哟。
              </p>
              <p><i>4</i>1%返现奖励最高300元，于4月23日-4月29日发放。</p>
              <p><i>5</i>加息券及1%返现奖励仅适用于客户首次出借奖励，且首次出借金额不低于2000元，呼朋唤友来参与拼团吧。</p>
              <p><i>6</i>为方便您获得现金红包及加息券，参与拼团即同意平台为您开通汇有财先息后本账号。账号可在汇有财APP通过短信验证码登录。</p>
              <p><i>8</i>参与拼团必须为是真实用户，若核实为虚假用户，则成团无效。</p>
            </section>
          </div>
          <footer>- 网贷有风险 出借需谨慎 -</footer>
        </div>
        <div id="captcha"></div>
      </div>
    </BScroll>
    <div class="mask-wrapper" v-if="showMask">
      <div class="mask">
        <section>
          <span>姓名</span>
          <input type="text" v-model="userName" placeholder="请输入姓名" />
        </section>
        <section>
          <span>手机号</span>
          <input type="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号" />
        </section>
        <section>
          <span>验证码</span>
          <input type="tel" maxlength="6" v-model="smsCode" placeholder="请输入验证码" />
          <SMSBtn text="获取验证码" class="sms-btn" ref="smsBtn" @getSMSCode="sendSMSCode" />
        </section>
        <p>{{ errMsg }}</p>
        <input type="button" value="参加拼团" @click="joinActivity" />
      </div>
      <img src="./spellTeam/close.png" alt="" @click.self="closeMask" />
    </div>
  </div>
</template>

<script>
import SMSBtn from '@/components/smsBtn'
import BScroll from '@/components/BScroll/BScroll'
import api from '@/api/common/activities'
import { queryProgressApi, joinActivityApi, getSMSCodeApi } from '@/api/djs/ActivitiesApi/spellGroup'
import { timeCountDown, uuid } from '@/assets/js/utils'

import { captchaId } from '@/assets/js/const'
import { Toast } from 'mint-ui'
import Cookies from 'js-cookie'

export default {
  name: 'spellGroup',
  components: {
    SMSBtn,
    BScroll
  },
  data() {
    return {
      leaderInviteCode: this.$route.query.teamCode, // 团长邀请码
      groupId: this.$route.query.groupId, // 拼团活动Id
      currPeopleNum: 0, // 当前参与人数
      couponRate: 0, // 当前可加息利率
      remainingTime: 1111111, // 参团倒计时
      isOverdue: false,
      isJoin: false, // 该用户是否参与过活动
      day: 0, // 倒计时天
      hours: 0, // 倒计时小时
      minute: 0, // 倒计时分钟
      second: 0, // 倒计时秒
      showMask: false, // 是否显示输入框
      userName: '', // 姓名
      mobile: '', // 手机号
      smsCode: '', // 短信验证码
      errMsg: '',
      captchaIns: null, // 滑块验证码实例
      validate: '' // 滑块验证码二次验证信息
    }
  },
  methods: {
    shareWX() {
      const [shareTitle, shareDesc, shareLink, shareImgUrl] = [
        '六周年庆，你的收益由你定',
        '注册即送10元现金红包，拼团立抢3%加息大放送，投资更享1%现金返利！',
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
    },
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
      this.$router.push({
        name: 'home'
      })
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
    },
    splitTime() {
      timeCountDown(this.remainingTime, 1, data => {
        if (data.includes('天')) {
          const [days, day] = data.split('天')
          ;[this.day, [this.hours, this.minute, this.second]] = [days, day.split(':')]
        } else if (data !== '00:00:00') {
          // 21天08:03:31
          ;[this.hours, this.minute, this.second] = data.split(':')
        } else if (data === '00:00:00') {
          this.isOverdue = true
          this.second = '0'
        }
      })
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

    // 设置 uuid 同一天内不变
    const key = `key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    if (!Cookies.get(key)) {
      let uuid_value = uuid()
      this.uuid = uuid_value
      Cookies.set(key, uuid_value, { expires: 1 })
    } else {
      this.uuid = Cookies.get(key)
    }

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
      this.splitTime()
      if (res.data.resultCode === '37314' || res.data.resultCode === '202') {
        Toast('您的推荐人邀请码为空或者不完整，请获取完整拼团链接')
      } else if (res.data.resultCode !== '1') {
        Toast(res.data.resultMsg)
      }
    })
    this.shareWX()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.spell-group {
  height: 100%;
  &.hidden {
    /*height: 100vh;*/
    /*overflow: hidden;*/
  }
  .scroll {
    height: 100%;
  }
  .inner {
    padding: 0.15rem;
    background: linear-gradient(#ffb55a, #f66056);
    .desc {
      height: 1.65rem;
      margin: 0 auto 0.2rem;
      border-radius: 0.08rem;
      box-shadow: 0 0.08rem 0.14rem 0 rgba(207, 0, 0, 0.3);
    }
    .count-down {
      @include cube(3.45rem, 0.57rem);
      margin: 0 auto 0.08rem;
      padding-bottom: 0.1rem;
      background: #fff;
      box-shadow: 0 0.08rem 0.14rem 0 rgba(206, 105, 0, 0.2);
      border-radius: 0.16rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .bold {
        font-weight: bold;
      }
      .title {
        font-size: 0.16rem;
        color: #f26961;
        margin-right: 0.08rem;
      }
      .time {
        @include square(0.3rem);
        background: #f97956;
        border-radius: 0.04rem;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.3rem;
      }
      .split {
        margin: 0 0.05rem;
        font-size: 0.16rem;
        color: #f26961;
      }
      &:before,
      &:after {
        content: '';
        @include cube(0.14rem, 0.37rem);
        background: url('./spellTeam/yuanhuan.png') 0 / contain;
        position: absolute;
        top: 73%;
      }
      &:before {
        left: 14%;
      }
      &:after {
        right: 14%;
      }
    }
    .wrapper {
      width: 100%;
      background-color: #fff;
      border-radius: 0.16rem;
      padding: 0.43rem 0.15rem 0.15rem;
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
          position: relative;
          height: 0.18rem;
          border-radius: 0.09rem;
          background: #e2dfdf;
          margin: 0.05rem 0;
          .progress-bar {
            height: 0.18rem;
            border-radius: 0.09rem;
            background: #f98e52;
          }
          .dot {
            position: absolute;
            @include radiusCube(0.18rem);
            background: #f77a65;
            border: 0.05rem solid #ffc79d;
            top: 0;
            transform: translateX(-50%);
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
            color: #f26961;
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
        .without-join {
          display: block;
          margin: 0 auto;
          @include radiusCube(2.64rem, 0.4rem);
          line-height: 0.4rem;
          color: #fff;
          font-size: 0.16rem;
          background-image: linear-gradient(90deg, #f9c18b, #f66056);
        }
        .join {
          text-align: center;
          img {
            @include square(0.38rem);
            margin-right: 0.1rem;
          }
          .desc1 {
            margin-bottom: 0.1rem;
          }
          h6 {
            display: inline-block;
            font-size: 0.18rem;
            color: #ff7002;
            text-align: center;
            line-height: 0.38rem;
          }
          p {
            font-size: 0.12rem;
            color: #666;
            font-weight: 500;
            text-align: center;
            line-height: 0.17rem;
            margin-bottom: 0.13rem;
          }
          section {
            display: flex;
            justify-content: space-between;
            button {
              @include radiusCube(1.52rem, 0.42rem);
              font-size: 0.18rem;
              color: #fff;
              background: linear-gradient(90deg, #f9c18b, #f66056);
            }
          }
        }
      }
      .no-act {
        img {
          width: 1.8rem;
          display: block;
          margin: 0.2rem auto;
        }
        section {
          display: flex;
          justify-content: space-between;
          button {
            @include radiusCube(1.52rem, 0.42rem);
            font-size: 0.18rem;
            color: #fff;
            background: linear-gradient(90deg, #f9c18b, #f66056);
          }
        }
      }
    }
    .rules {
      margin-top: 0.2rem;
      .title {
        margin-bottom: 0.05rem;
        line-height: 1;
        font-size: 0.24rem;
        font-weight: 600;
        color: #fff;
      }
      section {
        background: #fff;
        padding: 0.16rem 0.1rem;
        border-radius: 0.16rem;
        > p {
          font-size: 0.13rem;
          color: #5b5b5b;
          line-height: 1.75;
          margin-bottom: 0.1rem;
          word-break: break-all;
          word-wrap: break-word;
          padding-left: 0.2rem;
          position: relative;
          i {
            position: absolute;
            left: 0;
            top: 0.2em;
            @include radiusCube(0.16rem);
            font-size: 0.13rem;
            text-align: center;
            line-height: 0.16rem;
            color: #ffffff;
            background: #f67958;
          }
        }
      }

      ul {
        margin: 0.16rem 0;
        li {
          display: flex;
          line-height: 0.34rem;
          margin: 0.03rem 0;
          border-radius: 0.04rem;
          p {
            flex: 1;
            text-align: center;
          }
          &.thead {
            background: rgba(249, 153, 119, 0.26);
            color: #f67958;
            font-weight: 600;
          }
          &.tbody {
            background: rgba(220, 220, 220, 0.24);
            color: #666;
            span {
              color: #f66050;
            }
          }
        }
      }
    }
    footer {
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      line-height: 1;
      padding: 0.14rem 0 0.09rem;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mask {
    @include cube(3.15rem, 3.25rem);
    background-image: url('./spellTeam/mask-bg.png');
    background-size: contain;
    padding: 0.75rem 0.22rem 0.22rem;
    input {
      &::placeholder {
        color: #c7c7cd;
      }
    }
    section {
      display: flex;
      height: 0.5rem;
      box-sizing: border-box;
      padding-top: 0.2rem;
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
        border: 1px solid #f76659;
        font-size: 0.15rem;
        color: #f76659;
        /deep/ input {
          display: block;
          width: 100%;
          height: 100%;
        }
        &.disable {
          /deep/ input {
            color: #f76659;
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
  img {
    @include radiusCube(0.4rem);
    margin-top: 0.6rem;
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
</style>
