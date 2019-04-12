<template>
    <div class="wrapper">
      <div class="activity">
        <div class="prize-pool">
          <p class="tips" v-if="!aHour">未到抽奖时间</p>
          <p class="tips" v-else>今天还剩<span> {{remainingNumber}} </span>次抽奖机会</p>
          <p class="time" v-if="!aHour">下次抽奖时间 {{nextDrawTime}}</p>
          <p class="time" v-else><span v-if="remainingSecond > 0"><img src="./priceDraw/clock.png" alt="">本次活动倒计时 {{remainingTime}}</span></p>
          <div class="prize-container">
            <div :class="{active:current%8 === 0}" class="item prize">
              <img src="./priceDraw/Mate20.png" alt="" style="height:0.45rem;">
              <span>Mate20RS<br/>保时捷手机</span>
            </div>
            <div :class="{active:current%8 === 1}" class="item prize">
              <span>谢谢参与</span>
            </div>
            <div :class="{active:current%8 === 2}" class="item prize">
              <img src="./priceDraw/XS.png" alt="" style="height:0.45rem;">
              <span>iPhone Xs Max 235GB 金色</span>
            </div>
            <div :class="{active:current%8 === 7}" class="item prize">
              <img src="./priceDraw/JD1666.png" alt="" style="height:0.315rem;">
              <span style="margin-top:0.1rem;">1666元京东E卡</span>
            </div>
            <div class="item btn" :class="{'disabled': !canDraw}">
              <img src="./priceDraw/drawBtn.png" alt="" @click="getReward">
            </div>
            <div :class="{active:current%8 === 3}" class="item prize">
              <span>谢谢参与</span>
            </div>
            <div :class="{active:current%8 === 6}" class="item prize">
              <img src="./priceDraw/JD666.png" alt="" style="height:0.315rem;">
              <span style="margin-top:0.1rem;">666元京东E卡</span>
            </div>
            <div :class="{active:current%8 === 5}" class="item prize">
              <span>谢谢参与</span>
            </div>
            <div :class="{active:current%8 === 4}" class="item prize">
              <img src="./priceDraw/gifts.png" alt="" style="height:0.45rem;">
              <span>汇通六周年大礼包</span>
            </div>
          </div>
        </div>
        <div class="button-area">
          <button @click="showRule = true">活动规则</button>
          <button @click="showLog = true">中奖纪录</button>
        </div>
        <div class="model" v-if="showRule||showResult||showLog">
          <div class="dialog rule animated zoomIn faster" v-if="showRule">
            <span class="close" @click="showRule=false"></span>
            <h3>活动规则</h3>
            <table>
              <tr>
                <td><span>1</span></td>
                <td>抽奖日当天在投余额有20万的有一次抽奖机会，在投有40万的有2次抽奖机会，依次类推，每次抽奖一个人最多5次;</td>
              </tr>
              <tr>
                <td><span>2</span></td>
                <td>
                  抽奖时间定为每月22日的10:00~16:00，未在指定时间内登录app抽奖页面参与抽奖的视为自动放弃;</td>
              </tr>
              <tr>
                <td><span>3</span></td>
                <td>在投余额按每月22日8:00的在投余额计算，由系统自动计算并在当日9:00前向客户展示对应的抽奖次数;</td>
              </tr>
              <tr>
                <td><span>4</span></td>
                <td>在抽奖后的5个工作日内完成发货，若遇无货则相应延后。</td>
              </tr>
            </table>
          </div>
          <div class="dialog result animated faster" :class="{'jackInTheBox':isGetReward,'zoomIn':!isGetReward}" v-if="showResult">
            <h3 class="sorry" v-if="!isGetReward">很遗憾，未中奖</h3>
            <h3 class="congratulation" v-else>恭喜您中奖了</h3>
            <div class="reward" v-if="isGetReward">
              <div v-if="reward.key === 0">
                <img src="./priceDraw/Mate20.png" alt="">
                <p>HUAWEI Mate20RS 保时捷手机</p>
              </div>
              <div v-if="reward.key === 2">
                <img src="./priceDraw/XS.png" alt="">
                <p>iPhone Xs Max 235GB 金色</p>
              </div>
              <div v-if="reward.key === 4">
                <img src="./priceDraw/gifts.png" alt="" style=" margin-bottom: 0">
                <p>汇通六周年大礼包</p>
              </div>
              <div v-if="reward.key === 6">
                <img src="./priceDraw/JD666.png" alt="">
                <p>666元京东E卡</p>
              </div>
              <div v-if="reward.key === 7">
                <img src="./priceDraw/JD1666.png" alt="">
                <p>1666元京东E卡</p>
              </div>
            </div>
            <div class="no-reward" v-else></div>
            <button @click="showResult=false">确认</button>
          </div>
          <div class="dialog log animated zoomIn faster" v-if="showLog">
            <span class="close" @click="showLog=false"></span>
            <h3>中奖纪录</h3>
            <div class="hasReward" v-if="rewardList.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>奖品</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prize in rewardList" :key="prize.prize">
                    <td>{{prize.winningDate}}</td>
                    <td>{{prize.prize}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="noReward" v-else>
              <span>暂无中奖纪录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'prizeDraw',
  data() {
    return {
      rewards: [
        { key: 0, name: 'Mate20RS 保时捷手机' },
        { key: 1, name: '谢谢参与' },
        { key: 2, name: 'iPhone Xs Max 235GB 金色' },
        { key: 3, name: '谢谢参与' },
        { key: 4, name: '汇通六周年大礼包' },
        { key: 5, name: '谢谢参与' },
        { key: 6, name: '666元京东E卡' },
        { key: 7, name: '1666元京东E卡' }
      ],
      reward: 1,
      current: -1, // 当前走过的步数
      onGoing: false, // 抽奖进行中标识
      showRule: false, // 显示活动规则
      showLog: false, // 显示中奖纪录
      showResult: false, // 显示抽奖结果,
      remainingNumber: 5, // 剩余抽奖次数
      aHour: true, // 是否开始前一小时内
      remainingSecond: 10, // 活动倒计时
      nextDrawTime: '2019年4月22日 10:00', // 下次抽奖时间
      rewardList: []
    }
  },
  computed: {
    target() {
      return this.reward.key - 0 + 80
    },
    canDraw() {
      return !this.onGoing && this.remainingNumber > 0 && this.remainingSecond === 0
    },
    isGetReward() {
      return ![1, 3, 5].includes(this.reward.key)
    },
    remainingTime() {
      let minute = Math.floor(this.remainingSecond / 60)
      let second = this.remainingSecond % 60
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return `${minute}分${second}秒`
    }
  },
  methods: {
    mock() {
      this.reward = this.rewards[Math.floor(Math.random() * 8)]
      if (this.isGetReward) this.rewardList.push({ winningDate: '2019-04-12', prize: this.reward.name })
      this.remainingNumber--
    },
    getReward() {
      this.mock()
      this.current = 0
      this.onGoing = true
      this.nextStep()
    },
    nextStep() {
      this.current++
      let num = this.target - this.current
      let intervalTime = 0
      if (num > 30) {
        intervalTime = 50
      } else if (num > 20) {
        intervalTime = 100
      } else if (num > 10) {
        intervalTime = 200
      } else if (num > 5) {
        intervalTime = 300
      } else if (num > 1) {
        intervalTime = 600
      } else if (num <= 1) {
        intervalTime = 700
      }
      if (num !== 0) {
        window.setTimeout(() => {
          this.nextStep()
        }, intervalTime)
      } else {
        window.setTimeout(() => {
          this.showResult = true
          this.onGoing = false
        }, 500)
      }
    }
  },
  created() {
    let t = window.setInterval(() => {
      if (this.remainingSecond > 0) {
        this.remainingSecond--
      } else {
        window.clearInterval(t)
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  background-color: #f33932;
  .activity {
    color: #9d3c00;
    font-size: 0.15rem;
    font-weight: 600;
    text-align: center;
    max-width: 540px;
    margin: 0 auto;
    height: 100%;
    background: url(./priceDraw/bg.png) no-repeat;
    background-size: contain;
    padding-top: 1.5rem;
    .prize-pool {
      width: 3.45rem;
      height: 3.695rem;
      background: url(./priceDraw/prizePool.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      .tips {
        height: 0.4rem;
        line-height: 0.4rem;
        span {
          color: red;
          font-size: 0.2rem;
        }
      }
      .time {
        font-size: 0.11rem;
        margin-top: 0.16rem;
        line-height: 0.21rem;
        height: 0.21rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.05rem;
        }
      }
      .prize-container {
        margin: 0.12rem auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        width: 3.1rem;
        height: 2.6rem;
        .item {
          margin-bottom: 0.05rem;
          width: 1rem;
          height: 0.84rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.115rem;
          font-weight: normal;
          &.prize {
            background: #fff3dd;
            border-radius: 0.11rem;
          }
          &.btn {
            position: relative;
            img {
              width: 0.84rem;
              height: 0.84rem;
            }
            &.disabled:after {
              content: '';
              position: absolute;
              width: 0.84rem;
              height: 0.84rem;
              background: #000;
              opacity: 0.6;
              border-radius: 50%;
            }
          }
          &.active {
            box-shadow: 0 0 0 2px red;
          }
        }
      }
    }
    .button-area {
      display: flex;
      justify-content: center;
      margin-top: 0.12rem;
      button {
        color: #9d3c00;
        width: 1.4rem;
        height: 0.5rem;
        background: url(./priceDraw/btn.png);
        background-size: 100% 100%;
        margin: 0 0.175rem;
        font-size: 0.15rem;
        font-weight: 600;
      }
    }
    .model {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      .dialog {
        position: relative;
        border-radius: 0.03rem;
        background: rgba(255, 243, 221, 1);
        h3 {
          display: inline-block;
          font-weight: bold;
          font-size: 0.18rem;
          margin-top: 0.35rem;
          background: url(./priceDraw/title.png) no-repeat bottom;
          background-size: 100% 50%;
        }
        .close {
          position: absolute;
          width: 0.18rem;
          height: 0.18rem;
          background: url(./priceDraw/close.png);
          background-size: 100% 100%;
          top: 0.1rem;
          right: 0.1rem;
        }
      }
      .rule {
        width: 3.45rem;
        height: 3.35rem;
        h3 {
          width: 0.88rem;
        }
        table {
          font-weight: normal;
          font-size: 0.13rem;
          margin: 0.33rem 0.16rem;
          tr {
            td {
              vertical-align: text-top;
              span {
                display: inline-block;
                width: 0.17rem;
                height: 0.17rem;
                background: #f9b659;
                border-radius: 50%;
              }
              &:first-child {
                width: 0.3rem;
                font-weight: bold;
              }
              &:last-child {
                text-align: left;
                padding-bottom: 0.1rem;
              }
            }
          }
        }
      }
      .log {
        width: 3.45rem;
        h3 {
          width: 0.89rem;
        }
        .noReward {
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.13rem;
        }
        .hasReward {
          width: 2.9rem;
          margin: 0.3rem auto;
          table {
            width: 100%;
            border: 1px solid rgba(157, 60, 0, 1);
            td,
            th {
              height: 0.5rem;
              border: 1px solid rgba(157, 60, 0, 1);
            }
          }
        }
      }
      .result {
        width: 2.75rem;
        h3 {
          position: relative;
          z-index: 1;
          &.congratulation {
            width: 1.165rem;
          }
          &.sorry {
            width: 1.34rem;
          }
        }
        .reward {
          width: 2.3rem;
          height: 2rem;
          margin: -0.4rem auto 0;
          background: url(./priceDraw/light.png);
          background-size: 100% 100%;
          img {
            margin-top: 0.6rem;
            margin-bottom: 0.19rem;
          }
        }
        .no-reward {
          height: 0.685rem;
        }
        button {
          width: 2.5rem;
          height: 0.36rem;
          background: rgba(236, 94, 82, 1);
          border-radius: 0.03rem;
          color: #fff;
          margin-bottom: 0.15rem;
          font-size: 0.13rem;
        }
        h3 {
          width: 1.165rem;
        }
      }
    }
  }
}
</style>
