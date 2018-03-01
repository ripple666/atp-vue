<!-- 微信扫码重定向页面 -->
<template>
	<div></div>
</template>
<script>
import {validate} from '@/assets/js/validate' //注意路径
import axios from 'axios'
	export default{
		data(){
			return{

			}
		},
		methods:{
		},
		created(){
			var code = validate.getQueryString('code')
			if(code){
				axios.get('/pptxzs/weblogin.json?method=web&code='+code,{
				},{
					headers: {'Content-Type': "application/x-www-form-urlencoded"} ,
				}).then(res=>{
					var data = res.data.data
					if(res.data.ret===0){
						window.sessionStorage.setItem('userId',data.user_id)
						window.sessionStorage.setItem('userKey',data.user_key)
						window.sessionStorage.setItem('userName',data.nickname)
						window.sessionStorage.setItem('userHeadImg',data.headimgurl)
						window.location.href="/#/"
					}else{
						alert(res.data.msg)
						window.location.href="/#/"
					}
					
				},err=>{
					window.location.href="/#/"
				})
			}else{
				
			}
		}
	}
</script>
<style>
	
</style>
