<template>
	<div id="foot">
		<img style="position:absolute;top:10px;right:0;width:100vw;" src="../../assets/images/bottom-morse-code.svg" alt="">
		<div class="w100c">
			<div>
				<img style="width:225px" src="../../assets/images/AtlasLogo_HW.svg"  alt="">
			</div>
			<div class="contact">
				contact@atlasp.io
			</div>
			<div class="right">
				Copyright © 2018 atlasp.io
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

			}
		},
		mounted(){
			console.log('foot')
		}

	}
</script>
<style>
	#foot{
		background-color: #000;
		padding: 68px 0 72px;
		color: #fff;
		position: relative;
	}
	#foot .contact{
		margin-top: 40px;
		font-size: 15px;
	}
	#foot .right{
		margin-top: 13px;
		color: #9c9c9c;
		font-size: 13px;
	}
	@media screen and (max-width: 720px){
		#foot{
			padding: 50px 0 40px;
		}
	}
</style>