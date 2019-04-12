<template>
  <BScroll class="index">
      <div class="module" @click="handleClick" v-for="(item, index) in list" :key="index">
          <p><img src="./time_icon.png"/><span>{{item.createTime}}</span></p>
          <div class="content">
          	<span>{{item.title}}</span>
          	<img src="./more_arrow.png" />
          </div>
      </div>
  </BScroll>
</template>

<script>
import { getList } from '@/api/djs/message'
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'index',
  mixins: [],
  components: {
  	BScroll
  },
  data() {
    return {
      page: 1,
      size: 1000,
      list: [],
    }
  },
  props: {},
  watch: {},
  methods: {
  	  handleClick() {
	      
	    },
	    getList() {
			  let postData = {
			    curPage: this.page,
			    maxLine: this.size,
			    paramCode: 'WZGG'
			  }
			  getList(postData).then(res => {
			    let data = res.data
			    this.list = data.zxdtMtbdlist
			    
			  })
    }
  },
  computed: {},
  created() {},
  mounted() {
  	this.getList()
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
	.index{
		font-family: PingFangSC-Regular;
	  overflow-y: auto;
    height: 100%;
		.module{
			height: 0.75rem;
			border: 0.01rem solid #EEEEEE;
			p{
				font-size: 0.11rem;
        color: #999999;
        display: flex;
        align-items: center;
        span{
        	padding: 0.16rem 0rem 0.06rem 0rem;
        }
        img{
        	height: 0.11rem;
        	width: 0.11rem;
        	padding: 0.19rem 0.08rem 0.08rem 0.15rem;
        }
			}
			.content{
        display: flex;
        align-items: center;
        span{
        	letter-spacing: -0.0036rem;
        	font-size: 0.15rem;
          color: #333333;
          padding-left: 0.15rem;
          display: inline-block;
          width: 2.9rem;
          overflow:hidden;
			    text-overflow:ellipsis;
			    white-space:nowrap
        }
        img{
        	height: 0.14rem;
        	width: 0.14rem;
        	padding-left: 0.4rem;
        }
			}
		}
	}
</style>
