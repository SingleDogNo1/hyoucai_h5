<template>
  <div class="risk">
    <b-scroll class="scroll" ref="scrollRef" :probeType="probeType" :listen-scroll="listenScroll">
      <div>
        <div class="top" v-if="num === 0 && !showResult">
          <div class="rectangle">
            <div class="rectangle_inn">
              <div class="font"></div>
              <div class="pic"></div>
            </div>
          </div>
          <div class="ellip"></div>
        </div>
        <div class="content" v-if="num === 0 && !showResult">
          <dl>
            <dt></dt>
            <dd>
              我们将对您的风险承担能力进行评估，请根据您的自身实际情况如实填写问卷，以便我们了解您的风险承担类型，进而根据您的风险承担能力提供适合您的产品。
            </dd>
          </dl>
          <dl>
            <dt></dt>
            <dd>评估结果仅供参考，不构成出借建议。为了及时了解您的风险承受能力，建议您持续做好动态评估，我们承诺对您的所有个人资料保密。</dd>
          </dl>
          <p>本问卷包含10个问题，每个问题请根据您的自身实际情况选择一个选项。</p>
          <button @click="startTest">确认</button>
        </div>
        <div class="question_wrapper" v-if="num && num !== 11 && !showResult">
          <div class="title">已完成 {{ num }}/10</div>
          <template v-for="(item, index) in questions">
            <div class="item" :key="index" v-if="num === index + 1">
              <p>{{ item.title }}</p>
              <div :class="matchClass(answer)" v-for="(answer, i) in item.answers" :key="i" @click="selectAnswer(answer, index, i)">
                {{ answer.des }}
              </div>
            </div>
          </template>

          <div v-if="num !== '' && num !== 1 && num !== 11" class="prev" @click="backPrev">返回上一题</div>
        </div>
        <transition name="fade">
          <div class="result" ref="result" v-if="showResult">
            <p class="tip">您的风险评测结果为</p>
            <p class="title">{{ resultTitle }}</p>
            <p class="para">{{ resultFont }}</p>
            <p class="desc">本次评测有效期6个月</p>
            <!--invests1给app通知，关闭webview-->
            <button class="right_now" @click="judgeJumpTo">立即出借</button>
            <button class="re_test" @click="reTest">重新评测</button>
          </div>
        </transition>
      </div>
    </b-scroll>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import Hyoucai from '@/assets/js/hyoucai'
import { getEvaInvLimitApi, saveEvaluatingResultApi, userBasicInfo } from '@/api/common/riskTest'
import { mapGetters } from 'vuex'

export default {
  components: {
    BScroll
  },
  data() {
    return {
      title: '风险评测',
      probeType: 3,
      listenScroll: true,
      mobile: this.$route.query.mobile,
      num: 0,
      sum: 0,
      score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      questions: [
        {
          title: '1.您的年龄是？',
          answers: [
            {
              des: 'A. 60岁以上',
              score: 1,
              flag: false
            },
            {
              des: 'B. 50 - 60岁',
              score: 2,
              flag: false
            },
            {
              des: 'C. 30 - 49岁',
              score: 3,
              flag: false
            },
            {
              des: 'D. 18 - 29岁',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '2.您家庭年收入大概是多少？',
          answers: [
            {
              des: 'A. 小于5万',
              score: 1,
              flag: false
            },
            {
              des: 'B. 5 - 20万',
              score: 2,
              flag: false
            },
            {
              des: 'C. 10 - 50万',
              score: 3,
              flag: false
            },
            {
              des: 'D. 50 -100万',
              score: 4,
              flag: false
            },
            {
              des: 'E. 100万以上',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '3.在您每年的家庭收入中，可用于出借的比例为？',
          answers: [
            {
              des: 'A. 10%以下',
              score: 1,
              flag: false
            },
            {
              des: 'B. 10% - 25%',
              score: 2,
              flag: false
            },
            {
              des: 'C. 25% - 50%',
              score: 3,
              flag: false
            },
            {
              des: 'D. 50%以上',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '4.当选择一个网贷产品进行出借后,您通常会觉得：',
          answers: [
            {
              des: 'A. 对自己的决定很有信心和期待',
              score: 5,
              flag: false
            },
            {
              des: 'B. 轻松,基本持乐观态度',
              score: 3,
              flag: false
            },
            {
              des: 'C. 比较担心出借结果',
              score: 2,
              flag: false
            },
            {
              des: 'D. 非常担心出借结果',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '5.当您进行出借时，需要明确可能获得出借收益，但同时也面临着出借风险。',
          answers: [
            {
              des: 'A. 清楚,能接受',
              score: 5,
              flag: false
            },
            {
              des: 'B. 不能接受',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '6.您选择过哪些类型的金融产品？',
          answers: [
            {
              des: 'A. 只选择银行存款或购买国债等低风险且收益较稳定的产品',
              score: 1,
              flag: false
            },
            {
              des: 'B. 除银行外，少部分选择基金、P2P、股票等产品',
              score: 2,
              flag: false
            },
            {
              des: 'C. 资产均匀分布在国债、股票、基金、P2P等金融产品中',
              score: 3,
              flag: false
            },
            {
              des: 'D. 大部分选择基金、P2P、股票、期货、外汇等金融项目中，较少选择银行存款',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '7.当选择非保本产品时，您会愿意接受下列哪项出借年限？',
          answers: [
            {
              des: 'A. 3年以上',
              score: 5,
              flag: false
            },
            {
              des: 'B. 2 - 3年',
              score: 3,
              flag: false
            },
            {
              des: 'C. 1 - 2年',
              score: 2,
              flag: false
            },
            {
              des: 'D. 1年以下',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '8.您的出借目标是？',
          answers: [
            {
              des: 'A. 资产保值,我不愿意承担任何出借风险',
              score: 1,
              flag: false
            },
            {
              des: 'B. 尽可能保证本金安全,不在乎收益率比较低',
              score: 2,
              flag: false
            },
            {
              des: 'C. 产生较多的收益,可以承担一定的出借风险',
              score: 3,
              flag: false
            },
            {
              des: 'D. 实现资金大幅增长,愿意承担较大的出借风险',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '9.您选择银行产品、基金专户、券商计划、信托计划等产品主要用于什么目的？',
          answers: [
            {
              des: 'A. 平时生活保障，赚点补贴家用',
              score: 2,
              flag: false
            },
            {
              des: 'B. 养老',
              score: 1,
              flag: false
            },
            {
              des: 'C. 资产增值',
              score: 5,
              flag: false
            },
            {
              des: 'D. 家庭富裕',
              score: 3,
              flag: false
            }
          ]
        },
        {
          title: '10.您选择的金融产品出现何种程度的波动时,您会呈现明显的焦虑？',
          answers: [
            {
              des: 'A. 本金无损失,但收益未达到预期',
              score: 1,
              flag: false
            },
            {
              des: 'B. 出现轻微本金损失',
              score: 2,
              flag: false
            },
            {
              des: 'C. 本金10%以内的损失',
              score: 3,
              flag: false
            },
            {
              des: 'D. 本金50%以上损失',
              score: 5,
              flag: false
            }
          ]
        }
      ],
      showResult: false,
      resultType: '',
      resultTitle: '',
      resultFont: '',
      resultMoney: 0,
      resultTerm: 0,
      arr: [],
      evaluatingCode: '',
      reTestFlag: false,
      preventCircle: true // 防止首次进入循环调用结果接口
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getBasicInfo() {
      let [data, headers] = [{}, {}]

      data.userName = this.$route.query.u ? this.$route.query.u : this.user.userName
      if (this.authorization) {
        headers.authorization = this.authorization
      }

      userBasicInfo(data, headers).then(res => {
        let data = res.data.data
        if (res.data.resultCode === '1') {
          if (!this.reTestFlag && this.preventCircle) {
            // 首次进入才会触发，与重新评测无关，重新评测还走getLimit、saveResult逻辑
            if (data.evaluatingResult) {
              this.evaluatingCode = data.evaluatingResult.evaluatingCode
              if (this.evaluatingCode) {
                this.showResult = true
                this.title = '风险评测结果'
                this.getLimit()
              }
            }
          }
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    getResult() {
      userBasicInfo({
        userName: this.user.userName
      }).then(res => {
        let data = res.data.data
        if (res.data.resultCode === '1') {
          if (!this.reTestFlag && this.preventCircle) {
            // 首次进入才会触发，与重新评测无关，重新评测还走getLimit、saveResult逻辑
            if (data.evaluatingResult) {
              this.evaluatingCode = data.evaluatingResult.evaluatingCode
              if (this.evaluatingCode) {
                this.showResult = true
                this.title = '风险评测结果'
                this.getLimit()
              }
            }
          }
        } else {
          Toast(res.data.resultMsg)
        }
      })
    },
    getLimit() {
      let [data, headers] = [{}, {}]

      data.userName = this.$route.query.u ? this.$route.query.u : this.user.userName
      if (this.authorization) {
        headers.authorization = this.authorization
      }

      getEvaInvLimitApi(data, headers).then(res => {
        let resp = res.data
        if (resp.resultCode === '1') {
          let list = resp.data.list
          for (let k = 0; k < list.length; k++) {
            if (this.sum) {
              // 首次评测
              if (this.sum <= 10 && list[k].grade === 'BSX') {
                // 保守型
                this.resultTitle = '保守型'
                this.resultType = 'BSX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人对风险非常敏感，风险承受度较低，对比收益更关心的是本金安全，出借时建议选择风险水平偏低的产品，适当回避风险的同时保证收益，跑赢通胀，故出借人在平台的最高出借金额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              } else if (this.sum > 10 && this.sum <= 29 && list[k].grade === 'WJX') {
                // 谨慎型
                this.resultTitle = '谨慎型'
                this.resultType = 'WJX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人能够承担较低的出借风险和波动，在出借时倾向以短期、持续、渐进的出借方式获取收益。故出借人在平台的最高出借金额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              } else if (this.sum >= 30 && this.sum <= 41 && list[k].grade === 'JJX') {
                // 积极型
                this.resultTitle = '积极型'
                this.resultType = 'JJX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人有一定的风险承受能力，对出借收益比较敏感，期望进行长期且持续的出借，愿意通过分散化的出借以取得出借组合的均衡发展。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              } else if (this.sum >= 42 && this.sum <= 49 && list[k].grade === 'JQX') {
                // 进取型
                this.resultTitle = '进取型'
                this.resultType = 'JQX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人愿意通过承担较高的风险来换取更高的出借回报，在出借时倾向以流动性较低、收益较高的出借方式获取收益。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              } else if (this.sum === 50 && list[k].grade === 'JINX') {
                // 激进型
                this.resultTitle = '激进型'
                this.resultType = 'JINX'
                this.resultMoney = list[k].limitAmt
                this.resultFont = `出借人有较高的风险承受能力，是富有冒险精神的激进型出借人，在出借收益波动的情况下，仍然能保持激进的出借理念。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，可选择任意出借期限的产品。`
              }
            } else {
              // 已经评测过
              if (this.evaluatingCode === 'BSX' && list[k].grade === 'BSX') {
                // 保守型
                this.resultTitle = '保守型'
                this.resultType = 'BSX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人对风险非常敏感，风险承受度较低，对比收益更关心的是本金安全，出借时建议选择风险水平偏低的产品，适当回避风险的同时保证收益，跑赢通胀，故出借人在平台的最高出借金额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              }
              if (this.evaluatingCode === 'WJX' && list[k].grade === 'WJX') {
                // 谨慎型
                this.resultTitle = '谨慎型'
                this.resultType = 'WJX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人能够承担较低的出借风险和波动，在出借时倾向以短期、持续、渐进的出借方式获取收益。故出借人在平台的最高出借金额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              }
              if (this.evaluatingCode === 'JJX' && list[k].grade === 'JJX') {
                // 积极型
                this.resultTitle = '积极型'
                this.resultType = 'JJX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人有一定的风险承受能力，对出借收益比较敏感，期望进行长期且持续的出借，愿意通过分散化的出借以取得出借组合的均衡发展。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              }
              if (this.evaluatingCode === 'JQX' && list[k].grade === 'JQX') {
                // 进取型
                this.resultTitle = '进取型'
                this.resultType = 'JQX'
                this.resultMoney = list[k].limitAmt
                this.resultTerm = list[k].term
                this.resultFont = `出借人愿意通过承担较高的风险来换取更高的出借回报，在出借时倾向以流动性较低、收益较高的出借方式获取收益。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，出借期限建议为${this.resultTerm}个月内（包括${this.resultTerm}个月）。`
              }
              if (this.evaluatingCode === 'JINX' && list[k].grade === 'JINX') {
                // 激进型
                this.resultTitle = '激进型'
                this.resultType = 'JINX'
                this.resultMoney = list[k].limitAmt
                this.resultFont = `出借人有较高的风险承受能力，是富有冒险精神的激进型出借人，在出借收益波动的情况下，仍然能保持激进的出借理念。故出借人在平台的最高出借额不得超过${
                  this.resultMoney
                }人民币，可选择任意出借期限的产品。`
              }
            }
          }
          this.saveResult()
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    saveResult() {
      let data = {
        evaluatingResult: this.resultType
      }
      let headers = {
        authorization: this.authorization
      }
      saveEvaluatingResultApi(data, headers).then(res => {
        let resp = res.data
        if (resp.resultCode === '1') {
          this.preventCircle = false // 保存结果后，置false，结束循环调用
          this.getBasicInfo()
        } else {
          Toast(resp.resultMsg)
        }
      })
    },
    startTest() {
      this.num = 1
      this.title = '风险评测'
      // this.$refs.head_gradient.style.opacity = 1
    },
    judgeJumpTo() {
      this.reTestFlag = false
      if (this.mobile) {
        // 为app使用，检测‘finishEvaluationAction’
        window.location.href = 'https://m.hyoucai.com/finishEvaluationAction.html'
      } else {
        // 从哪来回哪去
        this.$router.push({
          path: this.enterPath
        })
      }
    },
    reTest() {
      this.reTestFlag = true
      this.num = 0
      this.title = ''
      this.score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.sum = 0
      this.questions = [
        {
          title: '1.您的年龄是？',
          answers: [
            {
              des: 'A. 60岁以上',
              score: 1,
              flag: false
            },
            {
              des: 'B. 50 - 60岁',
              score: 2,
              flag: false
            },
            {
              des: 'C. 30 - 49岁',
              score: 3,
              flag: false
            },
            {
              des: 'D. 18 - 29岁',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '2.您家庭年收入大概是多少？',
          answers: [
            {
              des: 'A. 小于5万',
              score: 1,
              flag: false
            },
            {
              des: 'B. 5 - 20万',
              score: 2,
              flag: false
            },
            {
              des: 'C. 10 - 50万',
              score: 3,
              flag: false
            },
            {
              des: 'D. 50 -100万',
              score: 4,
              flag: false
            },
            {
              des: 'E. 100万以上',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '3.在您每年的家庭收入中，可用于出借的比例为？',
          answers: [
            {
              des: 'A. 10%以下',
              score: 1,
              flag: false
            },
            {
              des: 'B. 10% - 25%',
              score: 2,
              flag: false
            },
            {
              des: 'C. 25% - 50%',
              score: 3,
              flag: false
            },
            {
              des: 'D. 50%以上',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '4.当选择一个网贷产品进行出借后,您通常会觉得：',
          answers: [
            {
              des: 'A. 对自己的决定很有信心和期待',
              score: 5,
              flag: false
            },
            {
              des: 'B. 轻松,基本持乐观态度',
              score: 3,
              flag: false
            },
            {
              des: 'C. 比较担心出借结果',
              score: 2,
              flag: false
            },
            {
              des: 'D. 非常担心出借结果',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '5.当您进行出借时，需要明确可能获得出借收益，但同时也面临着出借风险。',
          answers: [
            {
              des: 'A. 清楚,能接受',
              score: 5,
              flag: false
            },
            {
              des: 'B. 不能接受',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '6.您选择过哪些类型的金融产品？',
          answers: [
            {
              des: 'A. 只选择银行存款或购买国债等低风险且收益较稳定的产品',
              score: 1,
              flag: false
            },
            {
              des: 'B. 除银行外，少部分选择基金、P2P、股票等产品',
              score: 2,
              flag: false
            },
            {
              des: 'C. 资产均匀分布在国债、股票、基金、P2P等金融产品中',
              score: 3,
              flag: false
            },
            {
              des: 'D. 大部分出借于基金、P2P、股票、期货、外汇等金融项目中，较少选择银行存款',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '7.当选择非保本产品时，您会愿意接受下列哪项出借年限？',
          answers: [
            {
              des: 'A. 3年以上',
              score: 5,
              flag: false
            },
            {
              des: 'B. 2 - 3年',
              score: 3,
              flag: false
            },
            {
              des: 'C. 1 - 2年',
              score: 2,
              flag: false
            },
            {
              des: 'D. 1年以下',
              score: 1,
              flag: false
            }
          ]
        },
        {
          title: '8.您的出借目标是？',
          answers: [
            {
              des: 'A. 资产保值,我不愿意承担任何出借风险',
              score: 1,
              flag: false
            },
            {
              des: 'B. 尽可能保证本金安全,不在乎收益率比较低',
              score: 2,
              flag: false
            },
            {
              des: 'C. 产生较多的收益,可以承担一定的出借风险',
              score: 3,
              flag: false
            },
            {
              des: 'D. 实现资金大幅增长,愿意承担较大的出借风险',
              score: 5,
              flag: false
            }
          ]
        },
        {
          title: '9.您选择银行产品、基金专户、券商计划、信托计划等产品主要用于什么目的？',
          answers: [
            {
              des: 'A. 平时生活保障，赚点补贴家用',
              score: 2,
              flag: false
            },
            {
              des: 'B. 养老',
              score: 1,
              flag: false
            },
            {
              des: 'C. 资产增值',
              score: 5,
              flag: false
            },
            {
              des: 'D. 家庭富裕',
              score: 3,
              flag: false
            }
          ]
        },
        {
          title: '10.您选择的金融产品出现何种程度的波动时,您会呈现明显的焦虑？',
          answers: [
            {
              des: 'A. 本金无损失,但收益未达到预期',
              score: 1,
              flag: false
            },
            {
              des: 'B. 出现轻微本金损失',
              score: 2,
              flag: false
            },
            {
              des: 'C. 本金10%以内的损失',
              score: 3,
              flag: false
            },
            {
              des: 'D. 本金50%以上损失',
              score: 5,
              flag: false
            }
          ]
        }
      ]
      this.showResult = false
      this.refresh()
    },
    backPrev() {
      this.num--
    },
    selectAnswer(answer, index, i) {
      if (answer.flag === true) {
        answer.flag = false
        this.score[index] = 0
      } else {
        this.num++
        answer.flag = true
        this.score[index] = answer.score
        for (let k = 0; k < this.questions[index].answers.length; k++) {
          if (k !== i) {
            this.questions[index].answers[k].flag = false
          }
        }
      }
      if (this.num === 11) {
        for (let k = 0; k < this.score.length; k++) {
          this.sum += this.score[k]
        }
        this.getLimit()
        this.showResult = true
        this.title = '风险评测结果'
        this.refresh()
        // this.$nextTick(() => {
        //   this.$refs.head_gradient.style.opacity = 1
        // })
      }
    },
    matchClass(answer) {
      let result = ''
      if (answer.flag === true) {
        result = 'active'
      } else {
        result = ''
      }
      return result
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.scrollRef.refresh()
      })
    }
  },
  created() {
    if (this.$route.query.t) {
      this.authorization = decodeURIComponent(this.$route.query.t)
      this.reTestFlag = false
      this.preventCircle = true
      setTimeout(() => {
        this.getBasicInfo()
      }, 100)
    } else {
      this.getResult()
    }
    this.$nextTick(() => {
      this.refresh()
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.enterPath = from.fullPath
    })
  },
  destroyed() {
    Hyoucai.removeItem('authorization')
    this.reTestFlag = false
    this.preventCircle = true
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.risk {
  height: 100%;
  font-size: 0;
  background-color: #eee;
  header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.44rem;
    .head_gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 0.44rem;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text;
      background-color: #fff;
      opacity: 0;
      box-shadow: inset 0 -1px 0 0 #eeeeee;
    }
    span {
      position: absolute;
      top: 0.1rem;
      left: 4%;
      width: 0.24rem;
      height: 0.24rem;
      background-size: 34% 60%;
      background-position: left center;
      @include bg-image('back');
    }
  }
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #eee;
    .top {
      @include bg-image('bg');
      .rectangle {
        height: 2rem;
        background-color: #f4c700;
        .rectangle_inn {
          display: flex;
          padding: 0.6rem 0.16rem 0;
          .pic {
            width: 1.61rem;
            height: 0.92rem;
            background-size: 100% 100%;
            @include bg-image('bg');
          }
          .font {
            flex: 1;
            height: 0.44rem;
            margin-top: 0.24rem;
            background-size: 100% 100%;
            @include bg-image('font');
          }
        }
      }
      .ellip {
        height: 0.64rem;
        border-radius: 50% / 0 0 80% 80%;
        background-color: #f4c700;
      }
    }
    .content {
      width: 92%;
      margin: -0.94rem auto 0;
      padding: 0.32rem 0.24rem 0;
      border-radius: 0.04rem;
      background-color: #fff;
      transform: translateY(-0.08rem);
      dl {
        display: flex;
        margin-bottom: 0.15rem;
        dt {
          width: 0.06rem;
          height: 0.06rem;
          margin: 0.06rem 0.08rem 0 0;
          border-radius: 50%;
          background-color: #f4c700;
        }
        dd {
          flex: 1;
          font-size: $font-size-small;
          color: #333;
        }
      }
      p {
        margin: 0.01rem 0 0.32rem 0;
        color: $color-text-s;
        font-size: $font-size-small-s;
      }
      button {
        width: 100%;
        height: 0.44rem;
        color: #fff;
        font-size: $font-size-small;
        border-radius: 0.04rem;
        background-color: $color-button;
      }
    }
    .question_wrapper {
      height: 100%;
      padding-top: 0.44rem;
      background-color: #fff;
      .title {
        text-align: center;
        color: $color-button;
        font-size: $font-size-small;
      }
      .item {
        padding: 0 4%;
        margin-bottom: 0.2rem;
        color: $color-text;
        font-size: $font-size-small-s;
        p {
          padding: 0.2rem;
        }
        div {
          padding: 0.2rem;
          margin-bottom: 0.2rem;
          border-radius: 0.04rem;
          background-color: #eee;
          &.active {
            color: #fff;
            background-color: $color-button;
          }
        }
      }
      .prev {
        padding-bottom: 0.1rem;
        text-align: center;
        color: $color-text-s;
        font-size: $font-size-small-s;
      }
    }
    .result {
      height: 7rem;
      padding: 0.44rem 4% 0;
      background-color: #fff;
      text-align: center;
      .pic {
        width: 1.87rem;
        height: 1.04rem;
        margin: 0.4rem auto;
        background-size: 100% 100%;
        &.BSX {
          @include bg-image('conservative');
        }
        &.WJX {
          @include bg-image('steady');
        }
        &.JJX {
          @include bg-image('aggressive');
        }
      }
      .tip {
        padding: 0.48rem 0 0.16rem;
        font-size: $font-size-small-ss;
        color: $color-text-s;
        text-align: center;
      }
      .title {
        margin-bottom: 0.4rem;
        font-size: 0.36rem;
        color: $color-text;
      }
      .para {
        line-height: 0.24rem;
        font-size: $font-size-small;
        color: $color-text-s;
        text-align: left;
      }
      .desc {
        font-size: $font-size-small;
        color: $color-text-s;
        text-align: center;
        margin-top: 0.2rem;
      }
      button {
        width: 100%;
        height: 0.44rem;
        border-radius: 0.04rem;
        font-size: $font-size-small;
        &.right_now {
          margin: 0.4rem auto 0.2rem;
          background-color: $color-button;
          color: #fff;
        }
        &.re_test {
          background-color: #fff;
          color: $color-button;
        }
      }
    }
  }
}
</style>
