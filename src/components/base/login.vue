<template>
	<div v-show="wxLogin">
		<div class="mask login-mask">
			<div class="mask-content login" >
				<div class="login-wrap x-mid">
					<div class="num-code-login" v-show="loginType==='numCode'">
						<p class="num-code-tit">请输入手机中显示的蓝色验证码</p>
						<input v-model="codeNum" @keyup.enter="login" class="num-code-input" type="num">
						<p @click="login" class="num-code-btn" >登录</p>
					</div>
					<div class="qr-code-login" v-show="loginType==='qrCode'">
						<div id="qrContainer" noselect>
						</div>
					</div>
				</div>
				<!-- <div class="change-login" @click="changeLoginType">
					<i v-show="loginType==='numCode'" class="icon-bg login-icon-num"></i>
					<i v-show="loginType==='qrCode'" class="icon-bg login-icon-qr"></i>
				</div> -->
			</div>
		</div>
	</div>
</template>
<script>
	import wxqrlogin from '@/assets/js/wxqrlogin'
	import axios from 'axios'
	import {validate} from '@/assets/js/validate' 
	export default {
		data (){
			return {
				site:'' , //域名
				loginType:'qrCode',//登陆方式，验证码/微信扫码
				codeNum:'',//用户输入的验证码
				wxLogin:true,//登陆，false为关闭登陆框
			}
		},
		methods:{
			wxlogin () {
				var that = this;
				var obj = new WxLogin({
                    id:"qrContainer", //用于放置微信二维码的容器
                    appid: 'wx9468877a858415b5',//微信appid
                    scope: "snsapi_login",//应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
                    redirect_uri: encodeURIComponent("http://www.pptx.info/#/wxlogin"), //页面重定向地址
                    state:Math.ceil(Math.random()*1000), //state，做安全防御
                    style: "black", //样式
              		href: "" //自定义样式
                });
			},
			changeLoginType(){
				if(this.loginType === 'qrCode'){
					this.loginType = 'numCode' //切换为验证码登陆
				}else{
					this.loginType = 'qrCode';
					this.wxlogin()
				}
				
			},
			login(){
				axios.post('/api/login',{  //发送验证码到后台进行验证
					codeNum:parseInt(this.codeNum)
				},{
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
				}).then(res=>{
					// this.wxLogin = false
				},err=>{
					// this.wxLogin = false //测试待删除
				})
			}
		},
		created(){
			var userId = window.sessionStorage.getItem('userId')
			

			// 检测userId判断用户是否登陆，如果登陆隐藏弹出框
			if(userId && userId != 'undefined' && userId != 'null'){
				this.wxLogin = false
			}else{
				
			}
		},
		mounted(){
			this.wxlogin()
		}
	}
</script>
<style scope>
	.login-mask{
		background: #f7f7f7;
	}
	.login{
		width: 500px;
		height: 400px;
		position: relative;
	}
	.login-wrap{
		
	}
	.change-login{
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.login-icon-num,.login-icon-qr{
		cursor: pointer;
		width: 50px;
		height: 50px;
		
	}
	.login-icon-num{
		background-image: url(../../assets/images/QR-code-login_01_03.png);
	}
	.login-icon-num:hover{
		background-image: url(../../assets/images/QR-code-login_02_03.png);
	}
	.login-icon-qr{
		background-image: url(../../assets/images/code-login_01_03.png);
	}
	.login-icon-qr:hover{
		background-image: url(../../assets/images/code-login_02_03.png);
	}
	.num-code-login{
		padding-top: 100px;
	}
	.num-code-tit{
		font-size: 20px;
		color: #666666;
		margin-bottom: 30px;
		text-align: left;
	}
	.num-code-input{
		width: 350px;
		height: 50px;
		background-color: #ffffff;
		border-radius: 5px;
		border: solid 1px #cccccc;
		outline: none;
		padding-left: 10px;
		color: #666666;
		font-size: 16px;
	}
	.num-code-btn{
		width: 350px;
		height: 50px;
		background-color: #6195ff;
		border-radius: 5px;
		color: #fff;
		line-height: 50px;
		font-size: 24px;
		margin-top: 30px;
		cursor: pointer;
	}
</style>