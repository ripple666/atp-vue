<template>
	<div id="en">
		<protocol :en="true"></protocol>
		<atp :isMobile="isMobile"  :en="true"></atp>
		<chain :en="true"></chain>
		<campaign :mobile="isMobile" :campaignPosition="campaignPosition" :en="true"></campaign>
		<team :en="true"></team>
		<advisors :en="true"></advisors>
		<partner :en="true"></partner>
		<my-foot :en="true"></my-foot>
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
	data(){
		return {
			isMobile:false,
			campaignPosition:'0px'
		}
	},
	created(){
		validate.index_cn_init(this)
	}
}
</script>
<style scope>
	#en{
	  font-family: Roboto,'Helvetica Neue',Helvetica,arial,sans-serif;
	  font-weight: 100;
	}	
</style>