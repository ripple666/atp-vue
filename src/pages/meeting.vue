<template>
	<div>
		<div class="main meeting-wrap">
			<div class="meeting-title">
				我的会议
			</div>
			<div class="meeting-content">
				<div class="meeting-list-head">
					<span class="name">名称</span>
					<span class="edite">编辑</span>
					<span class="delete">删除</span>
					<span class="upload-time">上传日期</span>
				</div>
				<div class="meeting-list-body noscrollbar">
					<ul>
						<li v-for="(meeting,meetingIdx) in meetings">
							<span class="name">{{meeting.title}}</span>
							<span class="edite"><i @click="editeMeeting(meeting.id)" class="icon-bg bg-edite"></i></span>
							<span class="delete"><i @click="deleteMeeting(meeting.id,meetingIdx)" class="icon-bg bg-delete"></i></span>
							<span class="upload-time">{{meeting.uploadTime}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="create-meeting-wrap">
				<router-link :to="{path:'meeting/create'}" class="create-meeting">
					创建会议
				</router-link>
		</div>
		<!-- 二次确认弹出框，此处为删除 -->
		<transition enter-active-class="animated pulse" >
			<my-toast v-show="isShowToast"  @on-submit="toastSubmit"  @on-cancel="toastCancel" :tit="toastTit" :content="toastContent"></my-toast>
		</transition>
	</div>
	
</template>
<script>
import axios from 'axios'
import myToast from '@/components/pices/my-toast'
import {validate} from '@/assets/js/validate' //注意路径
	export default{
		components:{myToast},
		data(){
			return{
				meetings:[],
				isShowToast:false,
				toastTit:'删除',
				toastContent:'确定要删除会议吗？',
				curMeetingId:'',
				curMeetingIdx:0
			}
		},
		methods:{
			editeMeeting(meetingId){//编辑会议
				window.location.href = '/#/meeting/create?meetingId='+meetingId
			},
			deleteMeeting(meetingId,meetingIdx){
				this.isShowToast=true;
				this.curMeetingId = meetingId;
				this.curMeetingIdx = meetingIdx
			},
			toastSubmit(){//删除会议


				this.isShowToast=false;

				var config={
				 data: { 'meeting_id': this.curMeetingId}
				}
				axios.delete('/pptxzs/meeting.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),config)
				.then(res=>{
					if(res.data.msg === "User or key error"){
		    			validate.reLogin()
		    		}

					this.meetings.splice(this.curMeetingIdx,1)
				})
			},
			toastCancel(){
				this.isShowToast=false;
			}
		},
		created(){//加载ppt会议列表
			axios.get('/pptxzs/meeting.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey')).then(res=>{
				if(res.data.msg === "User or key error"){
	    			validate.reLogin()
	    		}

	    		
				console.log(res.data.data)
				var arr = [];
				res.data.data.meeting_list.forEach((v,i)=>{
					arr[i] = {
						id:v.meeting_id,
						title:v.title,
						uploadTime:v.create_time.split(' ')[0]
					}
				})
				this.meetings = arr

			})
		}
	}
</script>
<style lang="scss">
.meeting-wrap{
	background-color: #fff;
	margin-top: 30px;
	
	.meeting-title{
		height: 60px;
		border-bottom: 1px solid #ccc;
		padding-left: 20px;
		font-size: 22px;
		color: #353535;
		line-height: 60px ;
		span{
			height: 60px;
			line-height: 60px;
		}
	}
	.meeting-content{
		.name,.edite,.delete,.upload-time{
			display: inline-block;
			height: 50px;
			line-height: 50px;
			text-align: center;
		}
		.name{
			width: 560px;
			text-align: left;
			padding-left: 20px;
			box-sizing: border-box;
		}
		.edite{
			width:68px;
			
		}
		.bg-edite{
			width: 18px;
			height: 18px;
			cursor: pointer;
			background-image: url("../assets/images/editor_01_03.png");
			&:hover{
				background-image: url("../assets/images/editor_02_03.png");
			}
		}
		.delete{
			width: 228px;
			
		}
		.bg-delete{
			width: 18px;
			height: 18px;
			cursor: pointer;
			background-image: url("../assets/images/trash_01_03.png");
			&:hover{
				background-image: url("../assets/images/trash_02_03.png");
			}
		}
		.upload-time{
			width: 115px;

		}
		.meeting-list-head{
			height: 50px;
			color: #353535;
			font-size: 14px;
		}
		.meeting-list-body{
			height: 656px;
			overflow-y: scroll;
		}
	}
	
}
	.create-meeting-wrap{
		position: fixed;
		bottom:0;
		left:0;
		width: 100%;
		z-index: 1;
		height: 87px;
		background-color: rgba(0, 0, 0, 0.52);
		line-height: 87px;
		text-align: center;
		.create-meeting{
			display: inline-block;
			width: 320px;
			height: 50px;
			line-height: 50px;
			background-color: #6195ff;
			border-radius: 5px;
			font-size: 22px;
			color: #ffffff;
			cursor: pointer;
		}
	}
</style>