<template>
	<div id="atp">
		<div class="w100c">
			<div class="title">
				{{title}}
			</div>
			<div class="intro">
				{{intro}}
			</div>
			<img class="chian" src="../assets/images/Group.png" alt="">
			<ul class="clearfloat" style="font-size:15px;">
				<li >
					<i class="icon-bg" style="margin-right:8px;"></i>
					<span>{{en?'Advertisers':'广告主'}}</span>
				</li>
				<li>
					<i class="icon-bg" style="margin-right:8px;"></i>
					<span>{{en?'Publishers':'推广者'}}</span>
				</li>
				<li>
					<i class="icon-bg" style="margin-right:8px;"></i>
					<span>{{en?'Users':'用户'}}</span>
				</li>
			</ul>
			<div>
				<div class="bottom" :style="isMobile?{paddingLeft:'27px',position:'relative'}:{}">
					<i class="icon-bg atp-star" :style="isMobile?{position:'absolute',left:'8px',top:'2px'}:{}"></i>
					<span style="vertical-align:middle">
						{{en?'Smart contracts of the ATP will select optimal matching paths in a decentralized digital marketing environment.':'星途协议的智能合约在去中心化营销网络中会选择不同的撮合路径，撮合点代表被星途协议选择的一组优化路径。'}}
					</span>
					<br class="mobile-no">
					<span>
						{{en?'These paths are selected by ATP to realize maximum efficiency.':''}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
	export default{
		props:{
			isMobile:{
				type:Boolean,
				default:false
			},
			en:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				title:'Atlas Protocol · ATP',
				intro:'ATP pioneers and aims to lead the way in implementing blockchain technology within the digital marketing industry.'
			}
		},
		watch:{
			isMobile:{
				handler(val){
					// console.log(val)
				}
			}
		},
		created(){
			if(!this.en){
				this.title = '星途协议（ATP）'
				this.intro = '星途协议（ATP）将引领区块链技术在数字营销领域的创新。'
			}
			this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width()<720
		},
		mounted(){
			console.log('atp')
		}

	}
</script>
<style>
	#atp{
			background-color: #fff;
			padding:9.7vh 0 0 0;
			position: relative;
			height: 100vh;
			min-height: 740px;
			box-sizing: border-box;
		}
		
		#atp .title{
			font-size: 3.3vh;
			margin-bottom:1.8vh;
		}
		#atp .intro{
			color: #8c8c8c;
			font-size:15px;
			margin-bottom:7.0vh;
			font-weight: 200;
		}
		#atp ul{
			width: 100%;
			margin-bottom: 22px;
			margin-top: 7vh;
			color: #8c8c8c;
			font-weight: 200;
		}
		#atp ul>li{
			float: left;
		}
		#atp ul>li>i{
			display: inline-block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			vertical-align: middle;
		}
		#atp ul>li>span{
			vertical-align: middle;
		}
		#atp ul>li:nth-child(1){
			margin-left:355px;
		}
		#atp ul>li:nth-child(2),#atp ul>li:nth-child(3){
			margin-left:26px;
		}
		#atp ul>li:nth-child(1)>i{
			background-color: #FFBD2E;
		}
		#atp ul>li:nth-child(2)>i{
			background-color:  #3CBAC6;
		}
		#atp ul>li:nth-child(3)>i{
			background-color:  #E75977;
		}
		#atp .chian{
			height: 48vh;
		}
		
		#atp .atp-star{
			background-image:url(../assets/images/matchstar.png);width:13px;height:13px;
			width: 14px;
		    height: 14px;
		    margin-bottom: 2px;
		    margin-right: 10px;
		}
		#atp .bottom{
			font-size: 15px;
			color: #8c8c8c;
			line-height: 22px;
			font-weight: 200;
		}

		@media screen and (max-width: 720px){
			#atp{
				/*padding: 50px 0 40px;*/
				padding-top:8vh;
				height: 100vh;
				min-height: 600px;

			}
			#atp .title{
				font-size: 24px;
				margin-bottom: 6vh;
			}
			#atp .intro{
				font-size: 13px;
				line-height: 18px;
				margin-bottom:11vh;
			}
			#atp .chian{
				width:96vw;
				height: auto;
				margin-bottom: 4vh;
			}
			#atp ul{
				display: flex;
				padding: 0 8px;
				margin-bottom: 42px;
				box-sizing: border-box;
			}
			#atp ul>li{
				flex: 1;
			}
			#atp ul>li:nth-child(1){
				margin-left: 0;
				text-align: left;
			}
			#atp ul>li:nth-child(2){
				margin-left:0;
				text-indent: 20px;
			}
			#atp ul>li:nth-child(3){
				margin-left:0;
				text-align: right;
			}
			#atp .bottom{
				color:#8c8c8c;
				line-height:18px;
				font-size:12px;
				text-align: left;
			}

		}
</style>