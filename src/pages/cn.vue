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
import {validate} from '@/assets/js/validate' //注意路径

import protocol from '@/components/home/protocol'
import team from '@/components/home/team'
import chain from '@/components/home/chain'
import advisors from '@/components/home/advisors'
import partner from '@/components/home/partner'
import myFoot from '@/components/home/foot'
import atp from '@/components/home/atp'
import campaign from '@/components/home/campaign'

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