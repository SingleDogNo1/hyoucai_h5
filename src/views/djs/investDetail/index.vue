<template>
  <div class="invest-detail">
     <section class="pro-info">
         <div class="pro-info-head">
            <div class="item-l"><span>汇选投(30天)</span></div>
            <div class="item-r">
            	<span class="overplus">剩余可投</span><br>
              <span class="over_amount">38.71万</span>
            </div>
         </div>
         <div class="pro-inf-middle">
         	  <center>
         	  	 <span>历史平均年化收益率</span><br>
         	  	 <strong>11.0</strong><span class="per">%</span>
         	  	 <p><i>近期表现 8.00% ～ 8.00%</i><img src="./images/quest.png"/> </p>
         	  </center>
         </div>
         <div class="pro-inf-bottom">
         	  <p><span>锁定期</span><b>90天</b></p>
         	  <p><b>1000元</b><span class="start_amout">起投</span></p>
         </div>
     </section>
     
     <section class="pro-serve">
     	  <ul>
     	  	<li class="li-one"><span>...</span><i>募集期</i></li>
     	  	<li><span>2018-11-29</span><i>投资完成</i></li>
     	  	<li><span>2018-11-30</span><i>起息</i></li>
     	  	<li><span>2019-02-28</span><i>锁定期结束</i></li>
     	  </ul>
     	  <div class="serve-info">
     	  	<span>服务</span>
     	  	<a href="javascript:;">不可提前退出</a>
     	  	<a href="javascript:;">等额本息</a>
     	  	<a href="javascript:;">0费用</a>
     	  	<img src="./images/more.png" />
     	  </div>
     </section>
  </div>
</template>

<script>
export default {
  name: 'index',
  mixins: [],
  components: {},
  data() {
    return {}
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {
    
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';

.pro-info{
	height: 246px;
	background-image:url('./images/info_bg.png');
	background-size:100%;
	.pro-info-head{
		height: 65px;
			.item-l{
				float: left;
				margin-top:11px;
					span{
					width: 94px;
					height: 22px;
					line-height: 22px;
					font-size: 16px;
					color: #333333;
					margin-left: 14px;
				}
			}
			.item-r{
				float: right;
				span{
					width: 94px;
					height: 24px;
					color: #333333;
					margin-right: 40px;
					line-height: 24px;
				}
					span.overplus{
					font-size: 13px;
	        color: #999999;
	       
				}
				  span.over_amount{
					font-size: 15px;
	        color: #333333;
				}
			}
			
	}
	.pro-inf-middle{
		height: 101px;
		span{
			font-size: 12px;
      color: #999999;
		}
		span.per{
			color: #EC5E52;
			font-size: 13px;
		}
		strong{
			font-size: 46px;
      color: #EC5E52;
		}
		p{
			width: 170px;
			height: 24px;
			background: #EFEFEF;
      border-radius: 12px;
      i{
      	font-style: normal;
      	font-size: 11px;
        color: #666666;
        line-height: 24px;
      }
      img{
      	display: inline-block;
      	vertical-align: middle;
      	height: 12px;
      	width: 12px;
      	margin-left: 4px;
      }
		}
		
	}
	.pro-inf-bottom{
		height: 80px;
		line-height: 80px;
		p{
			display:inline-block;
			width: 50%;
			text-align: center;
			span{
				font-size: 12px;
	      color: #999999;
	      margin-right: 6px;
			}
			span.start_amout{
	      margin-left: 6px;
	     }
			b{
				font-size: 16px;
	      color: #333333;
			}
		}
		
	}
}

.pro-serve{
	height: 217px;
	ul{
		height: 56px;
		li{
			display:inline-block;
			width: 93px;
			margin-top: 16px;
			span{
				font-size: 13px;
        color: #666666;
        padding-bottom: 4px;
			}
			i{
				display: block;
				height: 18px;
				font-size: 13px;
				color: #FFFFFF;
				background-image: linear-gradient(90deg, #EEEEEE 0%, #AAAAAA 100%);
			}
		}
		li.li-one{
				width: 67px;
				margin-left: 15px;
		}
	}
	.serve-info{
		padding: 16px 15px;
		span{
			font-size: 15px;
			color: #999999;
		}
		a{
			height: 9px;
			line-height: 9px;
			font-size: 11px;
			color: #EC5E52;
			letter-spacing: 0.13px;
			border: 1px solid #EC5E52;
      border-radius: 2px;
      margin-left: 8px;
      display: inline-block;
      padding: 4px;
		}
		
	}
		
}

</style>
