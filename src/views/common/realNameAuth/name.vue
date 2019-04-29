<template>
  <div class="name">
    <div class="form">
      <input type="text" v-model="name" placeholder="请输入姓名" />
      <input type="tel" maxlength="20" v-model="idCard" placeholder="请输入身份证号" />
    </div>
    <div class="tip">
      <p class="title">温馨提示</p>
      <p>1.请保持姓名和身份证号一致；</p>
      <p>2.请勿使用过期证件。</p>
    </div>
    <div class="submit">
      <button :class="{ active: name && idCard }" @click="nextStep">下一步</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { isChName, isIdcard } from '@/assets/js/regular'

import { realNameApi } from '@/api/common/user'

export default {
  name: 'name',
  mixins: [],
  components: {},
  data() {
    return {
      name: '',
      idCard: ''
    }
  },
  props: {},
  watch: {},
  methods: {
    nextStep() {
      if (!this.name || !isChName(this.name)) {
        Toast('请输入正确的姓名')
        return
      }
      if (!this.idCard || !isIdcard(this.idCard)) {
        Toast('请输入正确的身份证号')
        return
      }
      realNameApi({
        realName: this.name,
        identityNo: this.idCard,
        identityType: 1
      }).then(res => {
        const data = res.data
        if (res.data.resultCode === '1') {
          // TODO 实名成功怎么办
          console.log(data)
        } else {
          Toast(res.data.resultMsg)
        }
      })
    }
  },
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';

input {
  font-size: 0.17rem;
  &::placeholder {
    color: #ccc;
  }
}

.form {
  padding: 0 0.15rem;
  background: #fff;
  input {
    display: block;
    box-sizing: border-box;
    @include cube(100%, 0.5rem);
    border-bottom: 0.01rem solid #eee;
    &:last-child {
      border: none;
    }
  }
}
.tip {
  margin-top: 0.17rem;
  padding-left: 0.15rem;
  p {
    font-size: 0.13rem;
    color: #999;
    line-height: 0.18rem;
    &.title {
      margin-bottom: 0.08rem;
    }
  }
}
.submit {
  @include cube(100%, 0.56rem);
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 1px 0 0 #eee;
  button {
    @include cube(3.45rem, 0.42rem);
    display: block;
    margin: 0.07rem auto;
    background: #ccc;
    border-radius: 0.04rem;
    font-size: 0.15rem;
    color: #fff;
    transition: 0.4s;
    &.active {
      background: #ec5e52;
    }
  }
}
</style>
