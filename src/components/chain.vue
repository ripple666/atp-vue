<template>
	<div id="chain">
		<div class="w100c">
			<div class="title">{{en?'ATP’s Underlying Public Chain—Nebulas':'星途协议的底层公链——星云链'}}</div>
			<div class="content clearfloat">
				<div class="right">
					<img :src="en?enImgUrl:cnImgUrl" alt="">
					<p>{{en?'ATP Architecture':'星途协议架构'}}</p>
				</div>
				<div class="left">
					<p>
						{{en?'ATP is the first application protocol based on Nebulas\' technology.':'星途协议是星云链上的首个应用层协议。'}}
					</p>
					<p>
						{{en?'Nebulas is the new generation public chain. Nebulas Rank is the core algorithm used to rank addresses, smart contracts, decentralized applications (Dapps) and other entities on the blockchain. Another feature, Developer Incentive Protocol, encourages the growth of a healthy ecosystem through a positive feedback system that encourages developers, creators, and users.':'星云链是新维度区块链生态系统。星云指数作为核心排序算法，能够衡量地址、智能合约及去中心化应用等对象的影响力；开发者激励协议用于构建正反馈区块链生态系统。'}}
						
					</p>
					<div class="nav"><a target="_blank" :href="en?'https://nebulas.io/':'https://nebulas.io/cn/index.html'">{{en?'Learn More about Nebulas':'了解星云链'}}</a></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			en:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				enImgUrl:require('../assets/images/ATP Architecture.svg'),
				cnImgUrl:require('../assets/images/advisors-example-cn.svg')
			}
		},
		mounted(){
			console.log('chain')
		}


	}
</script>
<style lang="scss">
	#chain{
		background-color:#F9F9F9;
		position:relative;
		padding-top:60px;
		padding-bottom:73px;
		.title{
			font-size: 3.3vh;
			margin-bottom: 61px;
		}
		.content{
			padding-right:100px;
			.left,.right{
				float:right;
			}
			.left{
				width:224px;
				font-size:12px;
				text-align:left;
				letter-spacing: 0.37px;
				line-height: 21px;
				color:#8c8c8c;
				p{
					margin-bottom:30px;
					&:nth-child(1){
						margin-bottom:0;
					}
				}
			}
			.right{
				width:548px;
				margin-left:32.5px;
				img{
					width:100%;
					margin-bottom:14px;
				}
				p{
					text-indent:141px;
					font-size:12px;
				}
			}
		}
	}
	@media screen and (max-width: 720px){
		
		#chain {
			.title{
				font-size: 24px;
		    	margin-bottom: 6vh;
			}
			.content{
				padding-right:0;
				.right{
					width:100%;
					margin-left:0px;
					margin-bottom:30px;
					img{
						width:100%;
						margin-bottom:14px;
					}
					p{
						text-indent:0;
						font-size:12px;
					}
					
				}
				.left{
					width:100%;
					font-size:12px;
					text-align:left;
					letter-spacing: 0.37px;
					line-height: 21px;
					.nav{
						text-align:center;
					}
					p{
						margin-bottom:30px;
						&:nth-child(1){
							margin-bottom:0;
						}
					}
				}
			}
		}
		
	}
</style>