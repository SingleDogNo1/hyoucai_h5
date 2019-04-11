<template>
	<section class="lend_record">
	   <div class="day01 day">
	      <h2>2018年11月</h2>
	      <div class="menu">
	      	<p><span>138******65</span><i>30000.00</i></p>
	      	<a>11-28 17:48</a>
	      </div>
	      <div class="menu">
	      	<p><span>138******65</span><i>30000.00</i></p>
	      	<a>11-28 17:48</a>
	      </div>
	   </div>  
	   <div class="day01 day">
	      <h2>2018年10月</h2>
	      <div class="menu">
	      	<p><span>138******65</span><i>30000.00</i></p>
	      	<a>11-28 17:48</a>
	      </div>
	      <div class="menu">
	      	<p><span>138******65</span><i>30000.00</i></p>
	      	<a>11-28 17:48</a>
	      </div>
	   </div>  
	</section>
</template>

<script>

export default {
  name: 'index',
  components: {},
  data() {
    return {
    	
    }
  },
  methods: {
  	
  },
  created:{
    
  }
}
</script>

<style lang="scss" scoped>
 section{
 	background: #eee;
 	padding-top:6px;
 	.day{
 		background:#fff;
 		h2{
 			font-size: 11px;
			color: #333333;
			letter-spacing: 0.13px;
			height: 16px;
			padding: 8px 15px;
			border-bottom: 1px solid #EEEEEE;
 		}
 		.menu{
 			height: 67px;
 			border-bottom: 1px solid #EEEEEE;
 			margin-bottom:6px;
 			p{
 				font-size: 15px;
				color: #333333;
				letter-spacing: 0.18px;
				height: 21px;
				padding: 15px 0 0 15px;
 				span{
 					float: left;
 					
 				}
 				i{
 					float: right;
 					margin-right: 15px;
 				}
 			}
 			a{
 				font-size: 11px;
				color: #999999;
				letter-spacing: 0.13px;
				margin: 15px 0 15px 15px;
 			}
 		}
 	}
 }
</style>
