<template>
	<div v-show="isShow" class="progress-bar">
		<div class="progress-detail">
			<div class="progress-detail-name">{{title}}</div>
			<div class="progress-detail-num">
				<span v-if="rate<100">{{progress==='1%'?'排队中...':progress}}</span>
				<span v-else>请稍后...</span>
			</div>
		</div>
		<div class="progress-mask"  :style="{backgroundImage:'linear-gradient(to right,rgba(0,0,0,0) 0%,rgba(0,0,0,0) '+progress+',rgba(255,255,255,0.25) '+progress+',rgba(255,255,255,0.25) 100%)'}"></div>
		<i  class="abort-upload icon-bg"  @click="abortUpload"></i>
	</div>
</template>
<script>
	export default{
		props:{
			title:{
				type:String,
				default:''
			},
			rate:{
				type:Number,
				default:20
			},
			pptId:{
				type:Number,
				default:20
			},
			pptIdx:{
				type:Number,
				default:20
			},
			isUploadPpt:{
				type:Number,
				default:20
			}
		},
		watch:{
			pptId:{
				handler(val){
					this.isShow=false
				}
			},
			rate:{
				handler(val){
					this.isShow = true
				}
			}
		},
		data(){
			return {
				isShow:true
			}
		},
		computed:{
			progress (){
				var rate = Math.min(this.rate,100)
				return rate +'%'
			}
		},
		methods:{
			abortUpload(){
				this.$emit('on-abort-upload',this.pptIdx)
			}
		}

	}
</script>
<style  scope>

	.progress-bar{
		position: relative;
		width: 590px;
		height: 50px;
	}
	.progress-mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.progress-detail{
		width: 100%;
		height: 100%;
		line-height: 50px;
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #6195ff;
	}
	.progress-detail-name{
		padding-left: 20px;
	}
	.progress-detail-num{
		position: absolute;
		font-size: 14px;
		right: 60px;
		top: 0px;
	}
	.abort-upload{
		width: 20px;
		height: 20px; 
		position: absolute;
		right: 39px;
		top: 15px;
		background-image: url(../../assets/images/cancel_03.png);
		cursor: pointer;
	}
</style>