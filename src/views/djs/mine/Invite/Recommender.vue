<template>
  <div class="content">
    <div class="image"></div>
    <div class="recommendation_code" v-show="!hasRecommender">
      <input class="txt" placeholder="请输入推荐人推荐码" />
    </div>
    <div class="recommendation_code actives" v-show="hasRecommender">
      <p class="txt">我推荐的人</p>
      <p class="txt bottom">财**** d666666</p>
    </div>
    <div class="btn" v-show="!hasRecommender">
      <button class="confirm">
        <img src="./images/confirm.png" alt />
      </button>
    </div>
    <div class="btns" v-show="hasRecommender">
      <button class="btn scan">
        <img src="./images/scan.png" alt />
      </button>
      <button class="btn share">
        <img src="./images/scan.png" alt />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasRecommender: false //是否有推荐人
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-family: PingFangSC-Regular;
  background: #321ed1;
  height: 100%;
  .image {
    height: 2.66rem;
  }
  .recommendation_code {
    background: #1e11ad;
    border: 0.03rem solid #715fff;
    box-shadow: inset 0 0 0.15rem 0 rgba(9, 0, 113, 0.6);
    border-radius: 0.08rem;
    width: 3.45rem;
    margin: 0 auto;
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
    width: 3.48rem;
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
    width: 3.48rem;
    margin: 0.54rem auto 0;
    display: flex;
    justify-content: space-between;
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
