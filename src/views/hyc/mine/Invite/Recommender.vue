<template>
  <div class="content">
    <b-scroll class="scroll" ref="scrollRef">
      <div>
        <div class="image">
          <img src="./images/invite-banner.png" alt />
        </div>
        <div class="recommendation_code" v-show="!hasRecommender">
          <input class="txt" placeholder="请输入推荐人推荐码" v-model="newRecommendCode" />
        </div>
        <div class="recommendation_code actives" v-show="hasRecommender">
          <p class="txt">我的推荐人</p>
          <p class="txt bottom">{{ refereeName }}</p>
        </div>
        <div class="btn" v-show="!hasRecommender">
          <button class="confirm" @click="saveInviteCode">
            <img src="./images/confirm.png" alt />
          </button>
        </div>
        <div class="btns" v-show="hasRecommender">
          <button class="btn scan" @click="scan">
            <img src="./images/scan.png" alt />
          </button>
        </div>
      </div>
    </b-scroll>
    <Dialog class="dialog" :show="showDialog" :onConfirm="onConfirm" :showCloseBtn="false">{{ msgDialog }}</Dialog>
    <AppDialog :show-dialog="dialogOption.show" :QRCode="QRCode" :show-close-btn="dialogOption.showClose" @close="closeItem"></AppDialog>
  </div>
</template>

<script>
import { saveInviteCode, userInviteCode, getQRCode } from '@/api/hyc/invite'
import Dialog from '@/components/Dialog/Alert'
import AppDialog from '@/components/Dialog/QRCodeDialog'
import BScroll from '@/components/BScroll/BScroll'
import { mapGetters } from 'vuex'
import { Indicator, Toast } from 'mint-ui'
export default {
  data() {
    return {
      dialogOption: {
        //扫一扫弹窗
        show: false,
        showTitle: false,
        showClose: false
      },
      QRCode: '',
      refereeName: '', // 推荐人姓名 我的推荐人
      hasRecommender: true, // 是否有推荐人
      showDialog: false, // 提示弹窗
      msgDialog: '请输入推荐码', // 提示弹窗内容
      newRecommendCode: '', // 输入推荐吗
      newReferrer: '' // 新添加推荐码对应的姓名
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    // 补录推荐码
    saveInviteCode() {
      if (!this.newRecommendCode) {
        this.msgDialog = '请输入推荐码'
        this.showDialog = true
      } else {
        Indicator.open('加载中')
        saveInviteCode({ inviteCode: this.newRecommendCode }).then(res => {
          Indicator.close()
          const data = res.data
          if (data.resultCode === '1') {
            this.hasRecommender = true
            this.newReferrer = data.data.refereeName
          } else {
            Toast(data.resultMsg)
          }
        })
      }
    },
    // 提示弹窗点击确定执行的函数
    onConfirm() {
      this.showDialog = false
    },
    // 获取我的推荐人姓名
    userInviteCode() {
      Indicator.open('加载中...')
      userInviteCode({
        userName: this.user.userName
      }).then(res => {
        Indicator.close()
        // console.log(res.data.data)
        let data = res.data
        if (data.resultMsg == 'SUCCESS') {
          if (data.data.refereeName) {
            this.hasRecommender = true
            this.refereeName = data.data.refereeName
          } else {
            this.hasRecommender = false
          }
        } else {
          Toast(data.resultMsg)
        }
      })
    },
    scan() {
      // 面对面扫一扫
      Indicator.open('加载中')
      getQRCode({
        userName: this.user.userName
      }).then(res => {
        Indicator.close()
        let data = res.data
        if (data.data.qrPicUrl) {
          this.QRCode = data.data.qrPicUrl //二维码图片地址
        }
        this.dialogOption.show = true
      })
    },
    closeItem() {
      this.dialogOption.show = false
    }
  },
  components: {
    Dialog,
    AppDialog,
    BScroll
  },
  mounted() {
    this.userInviteCode()
    // console.log(this.user.realName)
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  background: #321ed1;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
      padding-bottom: 0.3rem;
      .image {
        height: 2.66rem;
      }
      .recommendation_code {
        background: #1e11ad;
        border: 0.03rem solid #715fff;
        box-shadow: inset 0 0 0.15rem 0 rgba(9, 0, 113, 0.6);
        border-radius: 0.08rem;
        width: 3.45rem;
        margin: 0.08rem auto 0;
        padding-left: 0.24rem;
        font-size: 0.15rem;
        color: #ffffff;
        letter-spacing: -0.36px;
        .txt {
          width: 100%;
          line-height: 0.68rem;
          font-size: 0.15rem;
          color: #ffffff;
          letter-spacing: -0.36px;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #ffffff;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #ffffff;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #ffffff;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #ffffff;
        }
      }
      .actives {
        text-align: center;
        padding-left: 0;
        padding-top: 0.24rem;
        padding-bottom: 0.36rem;
        .txt {
          line-height: 0.21rem;
        }
        .bottom {
          margin-top: 0.23rem;
        }
      }
      .btn {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        .confirm {
          background: #321ed1;
          display: block;
          width: 1.62rem;
          height: 0.51rem;
          margin-top: 0.27rem;
          img {
            width: 100%;
          }
        }
      }
      .btns {
        display: flex;
        justify-content: center;
        margin-top: 0.54rem;
        .btn {
          display: block;
          width: 1.62rem;
          height: 0.51rem;
          background: #321ed1;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
