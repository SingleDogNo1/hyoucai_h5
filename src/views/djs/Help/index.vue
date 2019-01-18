<template>
  <div class="pageContainer" ref="container">
    <!--app用-->
    <div v-if="mobile" v-show="!showItem" class="tel" @click="callTel">
    </div>
    <!--H5 用-->
    <div v-else v-show="!showItem" class="tel">
      <a :href="'tel:' + serviceTel"></a>
    </div>
    <mt-header class="is-fixed" v-show="!showItem && !mobile" title="帮助中心">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <mt-header class="is-fixed" v-show="showItem" :title="itemTitle">
      <mt-button icon="back" slot="left" @click="clickArrow('帮助中心', questionType[0].dicCode)"></mt-button>
    </mt-header>
    <div class="top" v-show="!showItem">
      <div class="left">
        <dl>
          <dt>客服热线</dt>
          <dd>{{serviceTel}}</dd>
        </dl>
        <dl>
          <dt>服务时间<br>工作日</dt>
          <dd>
            <div>上午： 09:00 - 12:00</div>
            <div>下午： 13:00 - 18:00</div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="question_wrapper" ref="questionWrapper">
      <mt-navbar v-show="!showItem" v-model="selected">
        <mt-tab-item class="tab_item" id="1" @click.native="clickArrow('安全措施', questionType[1].dicCode)">
          <dl>
            <dt></dt>
            <dd>安全措施</dd>
          </dl>
        </mt-tab-item>
        <mt-tab-item class="tab_item" id="2" @click.native="clickArrow('项目介绍', questionType[2].dicCode)">
          <dl>
            <dt></dt>
            <dd>项目介绍</dd>
          </dl>
        </mt-tab-item>
        <mt-tab-item class="tab_item" id="3" @click.native="clickArrow('平台特色', questionType[3].dicCode)">
          <dl>
            <dt></dt>
            <dd>平台特色</dd>
          </dl>
        </mt-tab-item>
        <mt-tab-item class="tab_item" id="4" @click.native="clickArrow('网站操作', questionType[4].dicCode)">
          <dl>
            <dt></dt>
            <dd>网站操作</dd>
          </dl>
        </mt-tab-item>
      </mt-navbar>
      <div v-show="!showItem" class="common_questions">
        <b-scroll class="scroll"
                  ref="scrollRef">
          <div>
            <div class="title">
              <div class="inn border-bottom-1px">{{questionType[0].dicName}}</div>
            </div>
            <div class="item" v-for="(item, index) in commonQuestions" :key="index">
              <div class="inn border-bottom-1px">
                <div class="question" @click="toggleItems(commonQuestions, index)">
                  <span>Q：</span>
                  <em>{{item.question}}</em>
                  <transition name="rotate-min">
                    <i v-if="item.flag_min"></i>
                  </transition>
                  <transition name="rotate-plus">
                    <b v-if="item.flag_plus"></b>
                  </transition>
                </div>
                <div class="answer" v-if="item.flag_min">
                  <dl>
                    <dt>A：</dt>
                    <dd v-html="item.answer">
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </b-scroll>
      </div>
      <div v-show="showItem" class="mt-tab-container-wrapper" ref="mtTabContainer">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item class="tab_container" id="1">
            <b-scroll class="scroll"
                      ref="scrollRef1">
              <div>
                <div class="title">
                  <div class="inn" v-if="questionType.length">{{questionType[1].dicName}}</div>
                </div>
                <div class="item" v-for="(item, index) in securityQuestions" :key="index">
                  <div class="inn">
                    <div class="question" @click="toggleItems(securityQuestions, index)">
                      <span>Q：</span>
                      <em>{{item.question}}</em>
                      <transition name="rotate-min">
                        <i v-if="item.flag_min"></i>
                      </transition>
                      <transition name="rotate-plus">
                        <b v-if="item.flag_plus"></b>
                      </transition>
                    </div>
                    <div class="answer" v-if="item.flag_min">
                      <dl>
                        <dt>A：</dt>
                        <dd v-html="item.answer">
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </b-scroll>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="2">
            <b-scroll class="scroll"
                      ref="scrollRef2">
              <div>
                <div class="title" @click="getQuestions(questionType[2].dicCode)">
                  <div class="inn" v-if="questionType.length">{{questionType[2].dicName}}</div>
                </div>
                <div class="item" v-for="(item, index) in projectIntro" :key="index">
                  <div class="inn">
                    <div class="question" @click="toggleItems(projectIntro, index)">
                      <span>Q：</span>
                      <em>{{item.question}}</em>
                      <transition name="rotate-min">
                        <i v-if="item.flag_min"></i>
                      </transition>
                      <transition name="rotate-plus">
                        <b v-if="item.flag_plus"></b>
                      </transition>
                    </div>
                    <div class="answer" v-if="item.flag_min">
                      <dl>
                        <dt>A：</dt>
                        <dd v-html="item.answer">
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </b-scroll>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="3">
            <b-scroll class="scroll"
                      ref="scrollRef3">
              <div>
                <div class="title" @click="getQuestions(questionType[3].dicCode)">
                  <div class="inn" v-if="questionType.length">{{questionType[3].dicName}}</div>
                </div>
                <div class="item" v-for="(item, index) in platformCharacteristic" :key="index">
                  <div class="inn">
                    <div class="question" @click="toggleItems(platformCharacteristic, index)">
                      <span>Q：</span>
                      <em>{{item.question}}</em>
                      <transition name="rotate-min">
                        <i v-if="item.flag_min"></i>
                      </transition>
                      <transition name="rotate-plus">
                        <b v-if="item.flag_plus"></b>
                      </transition>
                    </div>
                    <div class="answer" v-if="item.flag_min">
                      <dl>
                        <dt>A：</dt>
                        <dd v-html="item.answer">
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </b-scroll>
          </mt-tab-container-item>
          <mt-tab-container-item class="tab_container" id="4">
            <b-scroll class="scroll"
                      ref="scrollRef4">
              <div>
                <div class="title" @click="getQuestions(questionType[4].dicCode)">
                  <div class="inn" v-if="questionType.length">{{questionType[4].dicName}}</div>
                </div>
                <div class="item" v-for="(item, index) in websitOprate" :key="index">
                  <div class="inn">
                    <div class="question" @click="toggleItems(websitOprate, index)">
                      <span>Q：</span>
                      <em>{{item.question}}</em>
                      <transition name="rotate-min">
                        <i v-if="item.flag_min"></i>
                      </transition>
                      <transition name="rotate-plus">
                        <b v-if="item.flag_plus"></b>
                      </transition>
                    </div>
                    <div class="answer" v-if="item.flag_min">
                      <dl>
                        <dt>A：</dt>
                        <dd v-html="item.answer">
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </b-scroll>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, tabItem, Toast } from 'mint-ui'
import BScroll from '@/components/BScroll/BScroll'
import {
  QueryQATypeApi,
  // serviceTelApi,
  QueryQuestionAnswerApi
} from '@/api/djs/help'

const CODE_OK = '1'
export default {
  components: {
    BScroll,
    // eslint-disable-next-line
      Navbar,
    // eslint-disable-next-line
      tabItem
  },
  data() {
    return {
      text: '帮助中心',
      mobile: this.$route.query.mobile,
      serviceTel: '400-000-7979',
      selected: '1',
      showItem: false,
      itemTitle: '',
      commonQuestions: [],
      securityQuestions: [],
      projectIntro: [],
      platformCharacteristic: [],
      websitOprate: [],
      questionType: [
        {
          dicName: ''
        },
        {
          dicName: ''
        },
        {
          dicName: ''
        },
        {
          dicName: ''
        },
        {
          dicName: ''
        }
      ]
    }
  },
  watch: {
    selected() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  methods: {
    callTel() {
      window.jsCall.callCs(this.serviceTel)
    },
    goBack() {
      if (window.DjsJsBridge) {
        window.DjsJsBridge.close()
      } else {
        this.$router.go(-1)
      }
    },
    clickArrow(title, code) {
      this.itemTitle = title || ''
      this.showItem = !this.showItem
      if (this.showItem) {
        this.$refs.questionWrapper.style.top = 0
        this.$refs.mtTabContainer.style.top = 0
      } else {
        this.$refs.questionWrapper.style.top = 1.77 + 'rem'
        this.$refs.mtTabContainer.style.top = 1.07 + 'rem'
      }
      this.getQuestions(code)
    },
    toggleItems(arr, index) {
      let time = null
      clearTimeout(time)
      if (arr[index].flag_plus) {
        arr[index].flag_plus = !arr[index].flag_plus
        time = setTimeout(() => {
          arr[index].flag_min = !arr[index].flag_min
        }, 300)
      } else {
        arr[index].flag_min = !arr[index].flag_min
        time = setTimeout(() => {
          arr[index].flag_plus = !arr[index].flag_plus
        }, 300)
      }
    },
    getQuestions(code) {
      if (
        (code === this.questionType[0].dicCode && !this.commonQuestions.length) ||
        (code === this.questionType[1].dicCode && !this.securityQuestions.length) ||
        (code === this.questionType[2].dicCode && !this.projectIntro.length) ||
        (code === this.questionType[3].dicCode && !this.platformCharacteristic.length) ||
        (code === this.questionType[4].dicCode && !this.websitOprate.length)
      ) {
        QueryQuestionAnswerApi({
          helpCode: code
        }).then(res => {
          let data = res.data
          let resultCode = data.resultCode
          let resultMsg = data.resultMsg
          if (resultCode === CODE_OK) {
            let list = data.list
            for (let k = 0; k < list.length; k++) {
              list[k]['flag_min'] = false
              list[k]['flag_plus'] = true
            }
            if (code === this.questionType[0].dicCode) {
              this.commonQuestions = list
              return false
            }
            if (code === this.questionType[1].dicCode) {
              this.securityQuestions = list
              return false
            }
            if (code === this.questionType[2].dicCode) {
              this.projectIntro = list
              return false
            }
            if (code === this.questionType[3].dicCode) {
              this.platformCharacteristic = list
              return false
            }
            if (code === this.questionType[4].dicCode) {
              this.websitOprate = list
              return false
            }
          } else {
            Toast(resultMsg)
          }
        })
      }
    },
    getQueryQAType() {
      QueryQATypeApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === CODE_OK) {
          this.questionType = data.list
          this.getQuestions(this.questionType[0].dicCode)
          this.$refs.scrollRef.refresh()
        } else {
          Toast(resultMsg)
        }
      })
    },
    getServiceTel() {
      // serviceTelApi({
      //   type: '1'
      // }).then(res => {
      //   let data = res.data
      //   let resultCode = data.resultCode
      //   let resultMsg = data.resultMsg
      //   if (resultCode === CODE_OK) {
      //     this.serviceTel = data.data
      //   } else {
      //     Toast(resultMsg)
      //   }
      // })
    },
    refresh() {
      if (this.selected === CODE_OK) {
        this.$refs.scrollRef1.refresh()
      }
      if (this.selected === '2') {
        this.$refs.scrollRef2.refresh()
      }
      if (this.selected === '3') {
        this.$refs.scrollRef3.refresh()
      }
      if (this.selected === '4') {
        this.$refs.scrollRef4.refresh()
      }
    }
  },
  created() {
    this.getQueryQAType()
    this.getServiceTel()
    this.$nextTick(() => {
      if (!this.mobile) {
        this.$refs.container.style.top = 0.44 + 'rem'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.rotate-plus-enter-active,
.rotate-plus-leave-active,
.rotate-min-enter-active,
.rotate-min-leave-active,
.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition: all 0.3s;
}

.rotate-plus-enter,
.rotate-plus-leave-to {
  opacity: 0;
}

.rotate-min-enter,
.rotate-min-leave-to {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pageContainer {
  padding-top: 0.44rem;
}

.mint-navbar {
  height: auto;
  padding: 0.25rem 0 0.16rem;
  .tab_item.mint-tab-item {
    position: relative;
    padding: 0;
    font-size: $font-size-small-s;
    /deep/ .mint-tab-item-label {
      font-size: $font-size-small-s;
      dl {
        dt {
          width: 0.32rem;
          height: 0.32rem;
          margin: 0 auto 0.1rem;
          background-size: 100% 100%;
        }
        dd {
          color: $color-text;
          font-size: $font-size-small-s;
        }
      }
    }
    &:nth-child(1) {
      dt {
        @include bg-image('security');
      }
    }
    &:nth-child(2) {
      dt {
        @include bg-image('proj_intro');
      }
    }
    &:nth-child(3) {
      dt {
        @include bg-image('platform_characteristic');
      }
    }
    &:nth-child(4) {
      dt {
        @include bg-image('websit_op');
      }
    }
    &.is-selected {
      border-bottom: none;
      &:after {
        position: absolute;
        content: ' ';
        background-color: transparent;
        width: 0.2rem;
        height: 0.02rem;
        bottom: 0.03rem;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
      }
    }
  }
}

.tel {
  position: fixed;
  z-index: 99;
  right: 0.15rem;
  bottom: 1.77rem;
  width: 0.54rem;
  height: 0.54rem;
  border-radius: 50%;
  @include bg-image('service_fixed');
  background-size: cover;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.common_questions,
mt-tab-container-wrapper {
  position: absolute;
  top: 0.96rem;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.common_questions {
  .title {
    padding: 0.08rem 0 0 0;
  }
}

.mint-tab-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /deep/ .mint-tab-container-wrap {
    height: 100%;
    .mint-tab-container-item.tab_container {
      height: 100%;
    }
  }
}

.top {
  display: flex;
  padding: 0.33rem 4% 0.26rem;
  background-image: url('service@3x.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .left {
    flex: 1;
    line-height: 0.2rem;
    dl {
      display: flex;
      font-size: $font-size-small;
      dt {
        width: 0.76rem;
        color: $color-text-s;
      }
      dd {
        flex: 1;
        color: $color-text;
        font-weight: 600;
      }
      &:nth-child(1) {
        margin-bottom: 0.16rem;
      }
    }
  }
}

.question_wrapper {
  position: absolute;
  top: 1.77rem;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 0;
  .scroll {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .title {
      color: $color-text;
      font-size: $font-size-small;
      .inn {
        padding: 0.16rem 0 0 0.16rem;
        background-color: #fff;
      }
    }
    .item {
      padding-left: 0.16rem;
      background-color: #fff;
      .inn {
        padding: 0.16rem 0.16rem 0.16rem 0;
        @include border-bottom-1px(#eee);
      }
      &:last-child {
        .inn {
          border-bottom: none;
        }
      }
      .question {
        position: relative;
        display: flex;
        font-size: $font-size-small-s;
        span {
          display: inline-block;
          width: 0.24rem;
          color: $color-button;
        }
        em {
          flex: 1;
          color: $color-text;
        }
        i {
          position: absolute;
          display: inline-block;
          top: 0;
          right: 0;
          width: 0.15rem;
          height: 0.15rem;
          @include bg-image('-');
          background-position: center;
        }
        b {
          position: absolute;
          display: inline-block;
          top: 0;
          right: 0;
          width: 0.15rem;
          height: 0.15rem;
          @include bg-image('+');
          background-position: center;
        }
      }
      .answer {
        margin-top: 0.08rem;
        dl {
          display: flex;
          font-size: $font-size-small-s;
          dt {
            display: inline-block;
            width: 0.24rem;
            color: $color-button;
          }
          dd {
            flex: 1;
            color: $color-text-s;
          }
        }
      }
    }
  }
}
</style>
