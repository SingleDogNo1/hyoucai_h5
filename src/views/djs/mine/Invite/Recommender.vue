<template>
  <div class="content">
    <div class="image">
      <img src="./images/invite-banner.png" alt />
    </div>
    <div class="recommendation_code" v-show="!hasRecommender">
      <input class="txt" placeholder="请输入推荐人推荐码" v-model="newRecommendCode" />
    </div>
    <div class="recommendation_code actives" v-show="hasRecommender">
      <p class="txt">我的推荐人</p>
      <p class="txt bottom">{{ myReferrer }}</p>
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
      <!-- <button class="btn share">
        <img src="./images/scan.png" alt>
      </button>-->
    </div>
    <Dialog class="dialog" :show="showDialog" :onConfirm="onConfirm" :showCloseBtn="false">{{ msgDialog }}</Dialog>
    <AppDialog :show-dialog="dialogOption.show" :QRCode="QRCode" :show-close-btn="dialogOption.showClose" @close="closeItem"></AppDialog>
  </div>
</template>

<script>
import { saveInviteCode, userInviteCode, getQRCode } from '@/api/djs/invite'
import Dialog from '@/components/Dialog/Alert'
import AppDialog from '@/components/Dialog/QRCodeDialog'
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
      hasRecommender: true, // 是否有推荐人
      showDialog: false, // 提示弹窗
      msgDialog: '请输入推荐码', // 提示弹窗内容
      newRecommendCode: '', // 输入推荐吗
      newReferrer: '', // 新添加推荐码对应的姓名
      myReferrer: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    saveInviteCode() {
      // Indicator.open()
      if (!this.newRecommendCode) {
        this.msgDialog = '请输入推荐码'
        this.showDialog = true
      } else {
        Indicator.open()
        saveInviteCode({ recommendCode: this.newRecommendCode }).then(res => {
          Indicator.close()
          console.log(res)
          const data = res.data
          if (data.resultCode === '1') {
            this.newReferrer = data.data.name
            this.showDialog = true
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
      userInviteCode({
        userName: this.user.userName
      }).then(res => {
        this.myReferrer = res.data.data.recommendName
        this.hasRecommender = true
      })
    },
    scan() {
      // 面对面扫一扫
      getQRCode({
        userName: this.user.userName
      }).then(res => {
        // console.log(res.data)
        this.QRCode = res.data.qrPicUrl //二维码图片地址
        this.dialogOption.show = true
      })
    },
    closeItem() {
      this.dialogOption.show = false
    }
  },
  components: {
    Dialog,
    AppDialog
  },
  mounted() {
    this.userInviteCode()
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: PingFangSC-Regular;
  background: #321ed1;
  height: 100%;
  // display: flex;
  // justify-content: center;
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
    // width: 3.48rem;
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
    // width: 3.48rem;
    // margin: 0.54rem auto 0;
    margin-top: 0.54rem;
    display: flex;
    justify-content: center;
    .btn {
      background: #321ed1;
      display: block;
      width: 1.62rem;
      height: 0.51rem;
      img {
        width: 100%;
      }
    }
  }
}
</style>
