<template>
	<div>
		<this-head></this-head>
		<router-view/>
		 <!-- 登陆 -->
   		 <login></login>
	</div>
	
</template>
<script>
import thisHead from '@/components/base/myheard'
import login from '@/components/base/login'
	export default{
		components:{
			thisHead,login
		},
		data(){
			return{

			}
		}
	}
</script>
<style>
	
</style>