<template>
	<div id="foot" class="foot">
		<div class="foot-wrap main">
			{{beiAnText}}
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				beiAnText: '鄂ICP备17030055号-3',
				beiAnNum:''
			}
		}

	}
</script>
<style >
	.foot{
		background-color: #fff;
		border-top: 1px solid #eee;
		height: 40px;
		width: 100%;
		line-height: 40px;
		margin-top: 20px;
		position: fixed;
		bottom: 0;
	}
	.foot-wrap{
		text-align: center;
		font-size: 12px;
	}
	@media screen and (max-height:836px){
		.foot{
			position: relative;
		}
	}
</style>