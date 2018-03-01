<template>
	<div class="check-mobile">
		<div class="mask">
			<div class="mask-content" >
				<div class="xy-mid  text">
						请用电脑浏览器打开网址
						<br>
						<span @click="close" class="btn">知道了</span>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data (){
			return {
				
			}
		},
		methods:{
			close(){
				console.log('colse')
				history.back()
			}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>
<style lang=scss scope>
	.check-mobile{
		z-index: 10;
		.mask{
			background-color: #fff;
			.mask-content{
				top: 30%;
			}
			.text{
				width: 100vw;
				height: 50px;

			}
			.btn{
				display: inline-block;
				width: 100px;
				height: 30px;
				background-color: rgba(97,149,255,1);
				line-height: 30px;
				color: #fff;
				font-size: 14px;
				margin-top: 80px;
			}
			.btn:hover{
				background-color: rgba(97,149,255,0.65);
			}
		}
	}
	
</style>