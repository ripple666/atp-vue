<template>
	<div class="head">
		<div class="head-wrap main">
			<i class="head-icon icon-bg"></i>
			<span noSelect @click="navToIndex" class="title">PPT小助手</span>
			<div class="head-right">
				<!-- <router-link class="nav-to-meeting" :to="{path: '/meeting/create'}"  >创建会议</router-link> -->
				<span class="login-out" @click="loginOut">退出</span>
				<img class="user-head" :src="userHead" alt="">
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
	export default{
		data(){
			return {
				title: '这是也个上传pptplus的页面',
				userHead:require("../../assets/images/addition_03.png")
			}
		},
		methods:{
			loginOut(){
				window.sessionStorage.setItem('userId',null)
				window.sessionStorage.setItem('userKey',null)
				window.location.reload()
				window.location.href = "/#/"
			},
			navToIndex(){
				window.location.href = "/#/"
			}
		},
		created(){
			this.userHead = window.sessionStorage.getItem('userHeadImg')
		
		}

	}
</script>
<style  scope>
	.head{
		background-color: #fff;
		box-shadow: 0px 1px 0px 0px #cccccc;
	}
	.head-wrap{
		height: 80px;
		line-height: 80px;
		position: relative;
	}
	.head-icon{
		background-image: url(../../assets/images/logo_03.png);
		width: 57px;
		height: 58px;
		margin-right: 20px;
	}
	.title{
		font-size: 36px;
		color: #6195ff;
		vertical-align: middle;
		cursor: pointer;
	}
	.head-right{
		position: absolute;
		right: 0;
		top: 0;
		
	}
	.nav-to-meeting{
		color:#6195ff;
		cursor: pointer;
		font-size: 12px;
	}
	.login-out{
		cursor: pointer;
		font-size: 12px;
		margin:0 10px 10px;
	}
	.user-head{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		
		
		background-color: #ccc;
	}
</style>