<template>
  <div class="content">
    <div class="box">
      <div class="box-top">
        <span class="top-image">
          <img src="./images/time.png" alt />
        </span>
        <span class="top-time">2017.12.14 13:12:44</span>
      </div>
      <div class="box-bottom">
        <span class="bottom-txt">2017年12月14日，将暂停一切定期理财、活2017年12月14日，将暂停一切定期理财、活</span>
        <span class="bottom-image">
          <img src="./images/more.png" alt />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  padding-left: 0.15rem;
  .box {
    height: 0.75rem;
    border-bottom: 1px solid #e8e8e8;
    padding-top: 0.16rem;
    .box-top {
      //   line-height: .16rem;
      display: flex;
      align-items: center;
      .top-image {
        display: inline-block;
        width: 0.11rem;
        height: 0.11rem;
        img {
          width: 100%;
        }
      }
      .top-time {
        margin-left: 0.08rem;
        font-size: 0.11rem;
        color: #999999;
        letter-spacing: -0.27px;
      }
    }
    .box-bottom {
      margin-top: 0.06rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 0.16rem;
      .bottom-txt {
        display: inline-block;
        width: 2.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.15rem;
        color: #333333;
        letter-spacing: -0.36px;
      }
      .bottom-image {
        display: inline-block;
        width: 0.09rem;
        height: 0.18rem;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
