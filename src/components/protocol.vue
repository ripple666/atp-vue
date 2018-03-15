<template>
	<div id="protocol">
		<img class="logo-top" src="../assets/images/logo-top.svg" style="" alt="">
		<router-link :to="{path:en?'cn':'index'}" class="nav-cn">
			{{en?'CN':'EN'}}
		</router-link>
		<div class="w100c">
			<div class="title">{{en?'Decentralized Token-based Marketing Protocol':'去中心化数字营销协议'}}</div>
			<div class="logo">
				<img src="../assets/images/AtlasLogo_VB.svg" alt="">
			</div>
			<div class="power">	
				<!-- <span>Powered by</span> -->
				<img :src="en?powerEnImg:powerCnImg" alt="">
			</div>
			<div class="code">
				<img src="../assets/images/Morse.png" alt="">
			</div>
			<div class="bottom">
				<!-- <span class="whitepaper">Whitepaper</span> -->
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
				powerEnImg:require('../assets/images/powered by.svg'),
				powerCnImg:require('../assets/images/p1-powered-cn.svg')
			}
		},
		mounted(){
			console.log('protocol')
		}

	}
</script>
<style>
    #protocol{
		background: #fff  50% 0 no-repeat;
		width:100%;
		text-align: center;
		padding-top:13vh;
		height: 100vh;
		min-height: 740px;
		box-sizing: border-box;
	}
	#protocol .logo-top,.nav-cn{
		
		top:26px;
		position:absolute;
	}
	#protocol .logo-top{
		width:115px;
		left:77px;

	}
	#protocol .nav-cn{
		font-size: 12px;
		right: 77px;
		color: #000;
		text-decoration: none;
	}
	#protocol .title{
		height: 23px;
		font-size:3.3vh;
		color: #000000;
		font-family: Roboto;
		font-weight: 100;
	}
	#protocol .logo img{
		height: 39vh;
		margin: 7.9vh 0 15px;
	}
	#protocol .power{
		margin-bottom:6vh;
		font-size: 1.7vh;
		letter-spacing: 0.08px;
	}
	#protocol .power img{
		margin-left: 6px;
		height:3.4vh;
	}
	#protocol .code img{
		margin-bottom: 14.3px;
		width: 581px;
	}
	#protocol .bottom{
		margin-top: 8.7vh;
	}
	#protocol .bottom .whitepaper{
		display: inline-block;
		background: #000000;
		border-radius: 4px;
		width: 152px;
		height: 32px;
		line-height: 32px;
		color: #fff;
		font-size: 14px;
		cursor: pointer;
		letter-spacing: 0.3px;
	}

	@media screen and (max-width: 720px){
		#protocol .logo-top{
			width:80px;
			left:23px;
			top:23px;
			position:absolute;
		}
		#protocol{
			padding-top:10vh;
			height: 100vh;
			min-height: 600px;
		}
		#protocol .title{
			font-size: 24px;
		}
		#protocol .nav-cn{
			right: 23px;
		}
		#protocol .logo img{
			width: 196px;
			margin: 7.9vh 0 0;
		}
		#protocol .bottom{
			margin-top: 40px;
		}
		
		#protocol .bottom{
			font-size: 38px;
		}
		#protocol .code img{
			width: 100%;
		}
	}
		

</style>