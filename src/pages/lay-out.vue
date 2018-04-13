<template>
	<div>
		<router-view/>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		created(){
		}
	}
</script>
<style>
	#en #advisors .intro,#en #team .intro{
		font-family: "Open Sans";
		color: #333;
	}
	#protocol,#atp,#chain,#campaign,#team,#advisors,#partner{
		border-bottom: 1px solid rgba(0,0,0,.1);
	}
</style>