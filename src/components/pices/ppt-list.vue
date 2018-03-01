<template>
	<ul class="ppt-list-ul clearfloat">
		<li class="filename-li" ellipsis>{{title}}</li>
		<li class="edite-li"><i class="icon-bg icon-edite" @click="pptEdite"></i></li>
		<li class="delete-li"><i class="icon-bg icon-delete" @click="pptDelete"></i></li>
		<li class="date-li">{{uploadDate}}</li>
	</ul>
</template>
<script>
export default {
	props:{
		title:{
			type:String,
			default:'我的ppt'
		},
		uploadDate:{
			type:String,
			default:'2017/12/25'
		},
		pptId:{
			type:Number,
			default:0
		}
	},
	methods:{
		pptEdite(){ //点击删除触发父组件删除时间
			this.$emit('on-edite')
		},
		pptDelete(){
			this.$emit('on-delete')
		}
	}
}
</script>
<style scope>
	.ppt-list-ul{
		width: 590px;
		height: 50px;
		line-height: 50px;
	}
	.ppt-list-ul i{
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	.ppt-list-ul li{
		float: left;
		height: 100%;
		text-align: center;
	}
	.ppt-list-ul:hover{
		background-color: #eee;
	}
	.filename-li{
		width: 300px;
		text-align: left !important;
		padding-left: 20px;
	}
	.edite-li{
		width: 78px;
	}
	.delete-li{
		width: 78px;
	}
	.date-li{
		width: 95px;
		text-align: left !important;
	}
	.icon-edite{
		background-image: url(../../assets/images/editor_01_03.png);
		
	}
	.icon-edite:hover{
		background-image: url(../../assets/images/editor_02_03.png);
	}
	.icon-delete{
		background-image: url(../../assets/images/trash_01_03.png);
	}
	.icon-delete:hover{
		background-image: url(../../assets/images/trash_02_03.png);
	}
</style>