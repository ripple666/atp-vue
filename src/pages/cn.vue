<template>
	<div id="cn">
		<protocol :en="false"></protocol>
		<atp :en="false" :isMobile="isMobile"></atp>
		<chain :en="false"></chain>
		<campaign :mobile="isMobile" :campaignPosition="campaignPosition" :en="false"></campaign>
		<team :en="false"></team>
		<advisors :en="false"></advisors>
		<partner :en="false"></partner>
		<my-foot :en="false"></my-foot>
	</div>
</template>
<script>
import $ from 'jquery'
import {validate} from '@/assets/js/validate' //注意路径


import protocol from '@/components/protocol'
import team from '@/components/team'
import chain from '@/components/chain'
import advisors from '@/components/advisors'
import partner from '@/components/partner'
import myFoot from '@/components/foot'
import atp from '@/components/atp'
import campaign from '@/components/campaign'
export	default{
	components:{
		team,chain,advisors,partner,myFoot,atp,protocol,campaign
	},
	data (){
		return {
			isMobile:false,
			campaignPosition:'0px'
		}
	},
	created(){
		validate.index_cn_init(this) //监听页面是否滚动
	}
}
</script>
<style scope>
	#cn {
	    font-family: "Open Sans",'Helvetica Neue',Helvetica,arial,sans-serif;
	}
	#cn .nav-cn{
		font-family:Roboto;
	}

</style>