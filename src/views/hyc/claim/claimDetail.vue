<template>
  <div class="dialog">
    <BScroll class="scroll" ref="scrollRef">
      <div class="info">
        <div>
          <div class="item">
            <div class="left">基本信息</div>
            <div class="right">
              <p>
                <span class="title">项目名称</span>
                <span class="content" v-if="productDetail.itemName">{{ productDetail.itemName }}</span>
                <span class="content" v-else-if="productDetail.projectName">{{ productDetail.projectName }}</span>
              </p>
              <p>
                <span class="title">借贷期限</span>
                <span class="content">{{ productDetail.loanMent }}</span>
              </p>
              <p>
                <span class="title">历史平均年化收益率</span>
                <span class="content">{{ productDetail.investRate }}</span>
              </p>
              <p>
                <span class="title">合同编号</span>
                <span class="content">{{ productDetail.contractNum }}</span>
              </p>
              <p>
                <span class="title">还款方式</span>
                <span class="content">{{ productDetail.repaymentWay }}</span>
              </p>
              <p>
                <span class="title">申请日期</span>
                <span class="content">{{ productDetail.loanDate }}</span>
              </p>
              <p>
                <span class="title">项目类型</span>
                <span class="content">{{ productDetail.productName }}</span>
              </p>
              <p>
                <span class="title">借款金额</span>
                <span class="content">{{ productDetail.loanAmt }}</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="left">审核信息</div>
            <div class="right">
              <template v-for="auditInfo in productDetail.auditInfoList">
                <div :key="auditInfo.key" class="identLabel" v-if="auditInfo.val">
                  <h6>{{ auditInfo.key }}</h6>
                  <span v-if="auditInfo.field === 'haveIDCard'" class="click" @click="showPhoto(auditInfo.result)">详情</span>
                  <span v-else-if="auditInfo.field === 'faceRecognition'" class="click" @click="showFace(auditInfo.result)">详情</span>
                  <span v-else-if="auditInfo.field === 'signing'" class="click" @click="showSign(auditInfo.result)">详情</span>
                  <span v-else-if="auditInfo.field === 'internetInformation'" class="click" @click="showInternetInfo">详情</span>
                  <span v-else>{{ auditInfo.result }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="item">
            <div class="left">还款来源</div>
            <div class="right">
              <p>
                <span class="title">{{ productDetail.repaymentSafeguard }}</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="left">相关费用</div>
            <div class="right">
              <p>
                <span class="title">{{ productDetail.relatedExpenses }}</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="left">借款人信息</div>
            <div class="right">
              <p>
                <span class="title">借款人姓名</span>
                <span class="content">{{ borrowerDetail.borrowerName }}</span>
              </p>
              <p>
                <span class="title">性别</span>
                <span class="content">{{ borrowerDetail.sex }}</span>
              </p>
              <p>
                <span class="title">身份证号</span>
                <span class="content">{{ borrowerDetail.idNum }}</span>
              </p>
              <p>
                <span class="title">年龄</span>
                <span class="content">{{ borrowerDetail.age }}</span>
              </p>
              <p>
                <span class="title">行业</span>
                <span class="content">{{ borrowerDetail.industry }}</span>
              </p>
              <p>
                <span class="title">居住地址</span>
                <span class="content">{{ borrowerDetail.domicile }}</span>
              </p>
              <p>
                <span class="title">婚姻状况</span>
                <span class="content">{{ borrowerDetail.maritalStatus }}</span>
              </p>
              <p>
                <span class="title">月收入</span>
                <span class="content">{{ borrowerDetail.income }}</span>
              </p>
              <p>
                <span class="title">借款金额</span>
                <span class="content">{{ borrowerDetail.prinAmt }}</span>
              </p>
              <p>
                <span class="title">借款用途</span>
                <span class="content">{{ borrowerDetail.loanAim }}</span>
              </p>
              <p>
                <span class="title">借款人主体性质</span>
                <span class="content">{{ borrowerDetail.borrowerTheme }}</span>
              </p>
              <p>
                <span class="title">还款来源</span>
                <span class="content">{{ borrowerDetail.paymentSource }}</span>
              </p>
              <p>
                <span class="title">借款期限</span>
                <span class="content">{{ borrowerDetail.loanDay }}</span>
              </p>
              <p>
                <span class="title">逾期金额</span>
                <span class="content">{{ borrowerDetail.amountOverride }}</span>
              </p>
              <p>
                <span class="title">征信报告</span>
                <span class="content">{{ borrowerDetail.creditReport }}</span>
              </p>
              <p>
                <span class="title">在其他网络借贷平台借款情况</span>
                <span class="content">
                  {{ borrowerDetail.borrowSituation }}
                  <a class="link_pdf" target="_blank" :href="borrowerDetail.guaranteeProtocolUrl" v-if="borrowerDetail.guaranteeProtocolUrl">查看</a>
                </span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="top">贷后情况</div>
            <div class="btm">
              <p>
                <span class="title">平台历史逾期次数</span>
                <span class="content">{{ postLoanSituation.platformOverdueCut }}</span>
              </p>
              <p>
                <span class="title">平台历史逾期金额</span>
                <span class="content">{{ postLoanSituation.platformOverdueAmt }}</span>
              </p>
              <p>
                <span class="title">借款资金运用情况</span>
                <span class="content">{{ postLoanSituation.loanUseInfo }}</span>
              </p>
              <!--<p>-->
              <!--<span class="title">借款人经营状况及财务状况</span>-->
              <!--<span class="content">{{postLoanSituation.financeInfo}}</span>-->
              <!--</p>-->
              <p>
                <span class="title">借款人还款能力变化情况</span>
                <span class="content">{{ postLoanSituation.repaymentAbilityChg }}</span>
              </p>
              <p>
                <span class="title">借款人涉诉情况 </span>
                <span class="content">{{ postLoanSituation.involvedInAppeal }}</span>
              </p>
              <p>
                <span class="title">借款人受行政处罚情况</span>
                <span class="content">{{ postLoanSituation.administrativePenalty }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BScroll>
    <IdCardDialog v-if="imgData" :showDialog="showIdCardDialog" :imgData="imgData" @close="closeIdCard"> </IdCardDialog>
    <FaceDialog v-if="faceData" :showDialog="showFaceDialog" :imgData="faceData" @close="closeFace"> </FaceDialog>
    <transition name="fade">
      <div v-show="showInternetCreditInfo" class="internetInfo_wrapper">
        <div class="model" @click="showInternetCreditInfo = false"></div>
        <div class="internetInfo_wrapper_inn">
          <span @click="showInternetCreditInfo = false">×</span>
          <b-scroll class="scroll" ref="scrollRefInternetCreditInfo">
            <div>
              <dl v-for="(item, index) in internetCreditInfo" :key="index">
                <dt>{{ item.key }}</dt>
                <dd>{{ item.value }}</dd>
              </dl>
            </div>
          </b-scroll>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { getLoanDetail, getInternetInformation, getBorrowerDetail, peopleLoanInfo } from '@/api/hyc/investDetail'
import IdCardDialog from '@/components/Dialog/ProDetailDialog'
import FaceDialog from '@/components/Dialog/FaceDialog'
const CODE_OK = '1'
export default {
  name: 'index',
  components: {
    BScroll,
    IdCardDialog,
    FaceDialog
  },
  data() {
    return {
      projectNo: this.$route.query.projectNo,
      productId: this.$route.query.productId,
      itemId: this.$route.query.itemId,
      showIdCardDialog: false,
      showFaceDialog: false,
      productDetail: {
        projectName: '',
        loanMent: '',
        investRate: '',
        contractNum: '',
        repaymentWay: '',
        loanDate: '',
        productName: '',
        loanAmt: ''
      },
      borrowerDetail: {
        borrowerName: '',
        sex: '',
        idNum: '',
        age: '',
        industry: '',
        domicile: '',
        maritalStatus: '',
        income: '',
        prinAmt: '',
        loanAim: '',
        borrowerTheme: '',
        guaranteeProtocolUrl: 'https://www.baidu.com',
        paymentSource: '',
        loanDay: '',
        assure: '',
        amountOverride: '',
        creditReport: ''
      },
      postLoanSituation: {
        // 贷后情况
      },
      imgData: [], // 点击身份证详情 -> 保存要展示的图片
      faceData: '', // 点击人脸详情 -> 保存要展示的图片
      showInternetCreditInfo: false,
      internetCreditInfo: []
    }
  },

  methods: {
    showPhoto(data) {
      let imgWrapper = []
      const [imgA, imgB] = [data.split(',')[0], data.split(',')[1]]
      imgWrapper.push(imgA, imgB)
      this.imgData = imgWrapper
      this.showIdCardDialog = true
    },
    showFace(data) {
      this.faceData = data
      this.showFaceDialog = true
    },
    showSign(data) {
      window.location.href = data
    },
    showInternetInfo() {
      this.showInternetCreditInfo = true
      this.getInternetInformation()
      this.$nextTick(() => {
        this.$refs.scrollRefInternetCreditInfo.refresh()
      })
    },
    closeFace() {
      this.showFaceDialog = false
    },
    closeIdCard() {
      this.showIdCardDialog = false
    },

    //互联网资信报告
    getInternetInformation() {
      getInternetInformation({
        projectNo: this.projectNo
      }).then(res => {
        let resp = res.data
        if (resp.resultCode === CODE_OK) {
          this.internetCreditInfo = resp.data.internetInformationList
        } else {
          Toast(resp.resultMsg)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    let postData = {
      projectNo: this.projectNo,
      itemId: this.itemId,
      userName: this.userName
    }
    //优质计划-债权详情
    getLoanDetail(postData).then(res => {
      let resp = res.data
      if (resp.resultCode === CODE_OK) {
        this.productDetail = resp.data
      } else {
        Toast(resp.resultMsg)
      }
    })

    //借款人详细信息
    getBorrowerDetail({
      projectNo: this.projectNo,
      nameEncrypt: true
    }).then(res => {
      this.borrowerDetail = res.data.data
    })

    let productType = this.itemId && this.productId ? 2 : 1 // 同时有itemId和productId是集合标
    peopleLoanInfo({
      productId: this.projectNo,
      productType: productType
    }).then(res => {
      this.postLoanSituation = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
@import '../../../assets/css/mixins';
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dialog {
  /*  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;*/
  background: #eee;
  .scroll {
    height: calc(100% - 0.44rem);
    .info {
      font-size: 0;
      background: #ffffff;
      .item {
        font-size: $font-size-small-s;
        margin-left: 0.15rem;
        padding: 0.16rem 0.15rem 0.16rem 0;
        border-bottom: 0.01rem solid #eeeeee;
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        .left {
          vertical-align: top;
          font-size: $font-size-small;
          font-weight: bold;
          float: left;
          width: 0.69rem;
          text-align: left;
          &.long {
            width: 0.75rem;
          }
        }
        .right {
          float: right;
          width: 2.6rem;
          margin-left: 0.16rem;
          &.short {
            width: 2.43rem;
          }
          p {
            padding-bottom: 0.08rem;
            line-height: 0.18rem;
            display: flex;
            span {
              &.title {
                color: $color-text-s;
                margin-right: 0.1rem;
                a {
                  color: $color-button;
                }
              }
              &.content {
                a {
                  color: $color-button;
                  &.link_pdf {
                    display: inline-block;
                    width: 100%;
                    text-align: right;
                    text-decoration: underline;
                    font-size: $font-size-small-s;
                  }
                }
              }
            }
          }
          .identLabel {
            line-height: 0.18rem;
            padding-bottom: 0.08rem;
            display: flex;
            color: $color-text-s;
            h6 {
              width: 0.9rem;
            }
            span {
              width: calc(100% - 0.9rem);
              &.click {
                color: $color-button;
              }
            }
          }
        }
        .top {
          font-weight: bold;
          text-align: left;
          font-size: 0.15rem;
          color: #2b2b2b;
          margin-bottom: 0.08rem;
        }
        .btm {
          p {
            height: 0.3rem;
            line-height: 0.3rem;
            display: flex;
            justify-content: space-between;
            .title {
              color: #999;
            }
            .content {
              color: #2b2b2b;
            }
          }
        }
      }
    }
  }
}

.internetInfo_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 999;
  .model {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    content: ' ';
    background-color: #000;
    opacity: 0.5;
  }
  .internetInfo_wrapper_inn {
    background-color: #fff;
    width: 2.82rem;
    position: relative;
    margin: 0 auto;
    border-radius: 0.04rem;
    padding: 0.16rem;
    .scroll {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    span {
      display: inline-block;
      position: absolute;
      width: 0.27rem;
      height: 0.27rem;
      right: 0.06rem;
      top: 0.06rem;
      line-height: 0.27rem;
      font-size: 0.26rem;
      color: #eee;
      text-align: center;
      z-index: 999;
    }
    dl {
      display: flex;
      margin-bottom: 0.08rem;
      line-height: 0.17rem;
      overflow: hidden;
      font-size: 0;
      &:last-child {
        margin-bottom: 0;
      }
      dt,
      dd {
        font-size: $font-size-small-s;
      }
      dt {
        margin-right: 0.08rem;
        color: $color-text-s;
      }
      dd {
        flex: 1;
        width: 1.77rem;
        color: $color-text;
      }
    }
  }
}
</style>
