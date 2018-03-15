<template>
	<div id="partner">
		<div class="w100c">
			<div class="title">{{en?'Partner':'合作伙伴'}}</div>
			<div class="content clearfloat">
				<ul>
					<li v-for="(partner,index) in partners">
						<img :src="partner.imgurl" :style="partner.style" alt="">
					</li>
				</ul>
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
				partners:[
					{
						imgurl:require('../assets/images/partner-nebulas.svg'),
						style:{
							width:'119px'
						}

					},
					{
						imgurl:require('../assets/images/partner-gifto.svg'),
						style:{
							width:'119px'
						}

					},
					{
						imgurl:require('../assets/images/partner-dolphin.svg'),
						style:{
							width:'119px'
						}

					},
					{
						imgurl:require('../assets/images/partner-token365.svg'),
						style:{
							width:'119px'
						}

					},{
						imgurl:require('../assets/images/partner-opentoken.svg'),
						style:{
							width:'125px'
						}

					}
				]
			}
		},
		mounted(){
			console.log('partner')
		}

	}
</script>
<style lang="scss">
	#partner{
		background-color:#f9f9f9;
		position:relative;
		padding-top:60px;
		padding-bottom:73px;
		.title{
			font-size: 3.3vh;
			margin-bottom: 61px;
		}
		.content{
			padding-left:81px;
			li{
				float:left;
				width:119px;
				&:nth-child(2){
					margin:0 45px 0 56px;
				}
				&:nth-child(4){
					margin:0 84px 0 70px;
				}
				// img{
				// 	width:119px;
				// }
			}
			
		}
	}
	@media screen and (max-width: 720px){
	#partner{
		position:relative;
		padding-top:60px;
		padding-bottom:73px;
		.title{
			font-size: 23px;
			margin-bottom: 6vh;
		}
		.content{
			padding-left:0;
			li{
				float:left;
				width:50%;
				padding-bottom:30px;
				&:nth-child(1){
					margin:0;
				}
				&:nth-child(2){
					margin:0;
				}
				&:nth-child(4){
					margin:0;
				}
				&:nth-child(5){
					padding-bottom:0;
				}
				// img{
				// 	width:119px;
				// }
			}
			
		}
	}
}
</style>