<template>
  <section>
      	<div class="commonList">
            <div class="title">
                <i class=""></i>
                <p>加息券消息</p>
            </div>
            <div class="more"><img src="./more_icon.png"/></div>
        </div>
        <div class="commonList ">
            <div class="title">
                <i class="red_dot"></i>
                <p>红包消息</p>
            </div>
            <div class="more"><img src="./more_icon.png"/></div>
        </div>
         <div class="commonList ">
            <div class="title">
                <i class=""></i>
                <p>体验金消息</p>
            </div>
            <div class="more"><img src="./more_icon.png"/></div>
        </div>
         <div class="commonList">
            <div class="title">
                <i class="repeat_dot"></i>
                <p>复投提醒消息</p>
            </div>
            <div class="more"><img src="./more_icon.png"/></div>
        </div>
  </section>
</template>

<script>
import api from '@/api/djs/message'
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'index',
  mixins: [],
  components: {
  	BScroll
  },
  data() {
    return {
 
    }
  },
  props: {},
  watch: {},
  methods: {
 
  },
  computed: {},
  created() {
  	
  },
  mounted() {
  	
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
	 section{
	 	background: #eee;
	 	padding-top: 0.06rem;
	 	.commonList{
	 		background: #fff;
	 		height: 0.5rem;
	 		line-height: 0.5rem;
	 		border-bottom: 0.01rem solid #EEEEEE;
	 		font-size: 0.13rem;
      color: #333333;
      padding-left: 0.15rem;
      .title{
      	 float: left;
      	 width: 70%;
      	 position: relative;
      	 i{
      	 	 display:inline-block;
            position: absolute;
            z-index: 2;
            width: 0.06rem;
            height: 0.06rem;
            border-radius:50%;
            background-color:#ef5c52;
            top: 42%; 
            left:26%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
      	 }
      	 .red_dot{
      	 	  left:21%;
      	 }
      	 .repeat_dot{
      	 	  left: 31%;
      	 }
      }
      .more{
      	display: flex;
      	align-items: center;
      	float: right;
      	height: 0.5rem;
      	img{
      		height: 0.14rem;
      		width: 0.14rem;
      		padding-right: 0.15rem;
      	}
      }
	 	}
	 }
</style>
