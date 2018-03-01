<template>
	<div class="mask toast-mask">
		<div class="my-toast mask-content">
			<div  noselect class="tit">{{tit}}</div>
			<div noselect class="content">{{content}}</div>
			<div>
				<span class="cancel" noSelect @click="cancel">取消</span>
				<span class="submit" noSelect @click="submit">确定</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			tit:{
				type:String,
				default:'删除'
			},
			content:{
				type:String,
				default:'确定要移除次PPT？'
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			submit (){
				
         		this.$emit('on-submit')
				
			},
			cancel(){
				this.$emit('on-cancel')
			}
		}
	}
</script>
<style scope>
	.toast-mask{
		background-color: rgba(0,0,0,.15);
	}
	.my-toast{
		width: 400px;
		height: 200px;
		background-color: #ffffff;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.44);
		border-radius: 5px;
	}
	.tit{
		width: 400px;
		height: 40px;
		background-color: #5786e5;
		color: #fff;
		font-size: 18px;
		padding-left: 20px;
		line-height: 40px;
		box-sizing: border-box;
		text-align:left;
	}
	.content{
		height: 110px;
		line-height: 110px;
		text-align: center;
		font-size: 20px;
		color: #000;
		border-bottom: 1px solid #ccc;
	}
	.submit,.cancel{
		display: inline-block;
		width: 80px;
		height: 30px;
		border-radius: 2px;
		border: solid 1px #bbbbbb;
		float: right;
		line-height: 30px;
		text-align: center;
		font-size: 18px;
		margin-top: 10px;
		cursor: pointer;
	}
	.submit{
		background-color: #5786e5;
		color: #fff;
	}
	.cancel{
		margin-left: 10px;
		margin-right: 14px;
	}
</style>