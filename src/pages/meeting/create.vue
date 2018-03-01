<template>
	<div class="main meeting">
		<div class="meeting-header">
			<i class="icon-bg meeting-header-icon"></i>
			<span>新建会议</span>
		</div>
		<div class="meeting-form">
			<ul>
				<li>
					<label for="title">会议名称：</label>
					<input style="width:520px" id="title" v-model="title"  maxlength="30"   @keyup="checkTitle"  placeholder="请输入会议名称(20字以内)" type="text">
				</li>
				<li>
					<label for="">会议时间：</label>
					 <vue-datepicker-local  placeholder="请选择开始时间" v-model="timeStart" />
					 <vue-datepicker-local  placeholder="请选择结束时间" v-model="timeEnd" />
				</li>
				<li>
					<label for="">会议地址：</label>
					<v-distpicker class="distpicker" @selected="onSelected" :province="select.province" :city="select.city" :area="select.area" :placeholders="placeholders" ></v-distpicker>
				</li>
				<li class="detail-address" v-show="isShowAddressSecond"> 
					<label style="opacity:0" for="">会议地址：</label>
					<input type="text" placeholder="请输入会议详细地址" v-model="addressSecond" @blur="getPosition">
				</li>
				<li>
					<label for="">背景图片：</label>
					<span class="imgbg-choose">
						<!-- <input @change="previewBgImg" type="file"> -->
						<span @click="showAblum">选择图片</span>
					</span>
				</li>
				<li class="img-preview" style="position:relative">
					<label style="vertical-align:top" for="">封面预览：</label>
					<canvas class="coverimg" style="width: 353px;height: 160px;" id="cover"></canvas>
					<input class="attach-input" type="checkbox"  id="checkbox" v-model="attchChecked">
					<label class="attach-label"  style="cursor:pointer;"  for="checkbox">附上标题</label>
					<p v-show="isShowTitle" class="cover-title" style="">{{title}}</p>
				</li>
			</ul>
		</div>
		<div class="meeting-content">
			<ul>
				<li class="meeting-content-li" v-for="(item,schedulesDayIdx) in schedulesDays">
					<!-- 当天的日期信息 -->
					<div class="schedule-head">
						<span class="schedule-head-sortday">{{item.sortDay}}</span>
						<span class="schedule-head-date">{{item.date}}</span>
						<span class="schedule-head-week">{{item.week}}</span>
					</div>
					<!-- 当天的日程安排 -->
					<ul>
						<li class="schedules" v-for="(schedule,scheduleIdx) in item.schedules" :key="scheduleIdx">
							<!-- 删除增加时间段控件 -->
							<div class="schedule-operate">
								<div v-show="scheduleIdx !== 0">
									<i class="icon-bg sub-schedule" @click="deleteSchedule(schedulesDayIdx,scheduleIdx)"></i>
								</div>
								<div v-show="scheduleIdx===item.schedules.length-1">
									<i class="icon-bg add-schedule" @click="addSchedule(schedulesDayIdx,scheduleIdx)"></i>
									<span  @click="addSchedule(schedulesDayIdx,scheduleIdx)">添加进程</span>
								</div>
								
							</div>
							<!-- 一天内某一个时间段 -->
							<div class="schedule-duration">
								<label for="">议程时间：</label>
								<vue-timepicker v-model="schedule.timeStart"  @change="changeScheduleDuration($event,schedulesDayIdx,scheduleIdx)" ></vue-timepicker>
								<span> 至 </span>
								<vue-timepicker v-model="schedule.timeEnd"  ></vue-timepicker>
							
							</div>
							<!-- 当前时间段所有会议 -->
							<ul>
								<li class="schedule-detail" v-for="(schedulePice,schedulePiceIdx) in schedule.schedulePices" :key="schedulePiceIdx">
									<label for="">主题内容：</label>
									<select v-model="schedulePice.sessionType" @change="changeSessionType(schedulesDayIdx,scheduleIdx,schedulePiceIdx)"  :disabled="schedulePiceIdx>0" :style="schedulePiceIdx>0?{backgroundColor:'#eee'}:{}">
									  <option v-for="meetType in schedulePice.meetTypes" v-bind:value="meetType.value">
									    {{ meetType.text }}
									  </option>
									</select>
									<input v-model="schedulePice.title"  class="speak-title" :style="schedulePice.sessionType ==='other'?{width:'330px'}:{}"  :placeholder="schedulePice.sessionType ==='other'?'请输入活动名称  如：入场签到/休息/圆桌论坛...':'请输入演讲主题'"  type="text">
									<span class="meeting-opreat-wrap">
										<span v-show="schedulePiceIdx!==0" class="cancel-meeting" @click="cancelMeeting(schedulesDayIdx,scheduleIdx,schedulePiceIdx)">删除</span>
										<span class="add-meeting" v-show="schedulePice.sessionType !=='other'" @click="addMeeting(schedulesDayIdx,scheduleIdx,schedulePiceIdx)">添加演讲</span>
									</span>
									
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="meeting-nav">
				<span class="meeting-cancel" @click="goback">取消</span>

				<!-- 事件捕获，先获取数据，然后跳转页面 -->
				
				<!-- <router-link class="nav-upload" target="_blank" :to="{path: 'upload',query:{meetingId: meetingId}}">
					<span @click.capture="tansmitData" class="meeting-sumbit">
						下一步
					</span>
				</router-link> -->
				<a class="nav-upload meeting-sumbit" @click="tansmitData" target="_blank" :href="'http://www.pptx.info/#/meeting/upload?meetingId='+meetingId">下一步</a>
				
				
		</div>
	    <!-- 登陆 -->
   		 <login></login>
   		 <!--  -->
		<ablum  v-show="isShowAblum" @on-cancel="cancelAblum" @on-submit="submitAblum"></ablum>
	</div>
</template>
	
	
<script>
import {validate} from '@/assets/js/validate' //注意路径
import qqmap from '@/assets/js/map.qq.js' //注意路径,只需引入就可以了，qq是全局变量，不能再取名字qq

import axios from 'axios'
import vueDatepickerLocal from 'vue-datepicker-local'
import vDistpicker from 'v-distpicker'
import vueTimepicker from 'vue2-timepicker'
import login from '@/components/base/login'
import ablum from '@/components/pices/ablum.vue'

	export default{
		components:{
			vueDatepickerLocal,vDistpicker,vueTimepicker,login,ablum
		},
		data(){
			return{
				meetingId:'',
				dataUrl:'',//canvas绘制之后得到的base64编码
				cover_with_title:true,
				attchChecked:true,
				isShowAblum:false,//是否显示编辑相册框
				title:'',
				timeStart:new Date(),//会议开始时间
				timeEnd: new Date(),
				placeholders: {
		        	province: '------- 省 --------',//默认提示选择地址
		          	city: '--- 市 ---',
		          	area:'--- 区 ---'
		        },
		        select:{//默认地址
		         	province: '',
		          	city: '',
		          	area:''
		        },
		        addressData:{},
		        addressFirst:'',//一级地址内容
		        addressSecond:'',//二级地址内容
		        address:'',//会议详细地址
		        latlng:{},//会议地址的经纬度
		        isShowAddressSecond:false,//监听选择地址后显示详细地址输入框
		        cover:require('../../assets/images/background-01.png'),//会议封面背景
		        schedulesDays:[],//会议日程表的时间数组
		        callbacks:{//初始化时将获取用户地址,成功的回掉和失败的回掉继承到qq.map.Geocoder中
		        	 //若服务请求成功，则运行以下函数，并将结果传入 
				    complete:(result)=>{ 
				        var latlng = result.detail.location; 
				        this.latlng = latlng
				        this.addressData.latlng = latlng
				    }, 
				    error:function(err){  
				    } 
		        },
		        isShowTitle:true//是否显示封面图水印
			}
		},
		watch:{
			attchChecked(){
				this.cover_with_title = this.isShowTitle = this.attchChecked
			},
			timeStart(val){
				if(this.timeEnd === new Date()){
					this.timeEnd = this.timeStart
				}
				
				var arr = this.getLocalDateArray()//监听日期改变，变化日程安排表
				this.schedulesDays = arr

			},
			timeEnd(){
				var arr = this.getLocalDateArray()
				this.schedulesDays = arr
			},
			schedulesDays:{
				handler(val){

				}
			}
		},
		methods:{
			setTextInCanvas(){
				var canvas = document.getElementById('cover')
				var ctx = canvas.getContext("2d")
				var img = new Image();

		        img.onload  =()=>{
		        	var width = img.width;
		        	var height = img.height;
		        	canvas.width = width
		        	canvas.height = height
		            ctx.drawImage(img,0,0,width,height)
		   //          if(!this.attchChecked){
		   //          	return
		   //          }
		   //          var title = this.title
		   //          ctx.font="30px microsoft yahei";  //定义水印样式
					// ctx.fillStyle = "rgba(255,255,255,0.8)";
					// ctx.textAlign = "center"
					// ctx.textBaseline = "middle"
			
					// var lineheight = 40;//canvas换行
					// for(var i = 1; validate.getTrueLength(title) > 0; i++){
			  //           var tl = validate.cutString(title, 25);
			  //           ctx.fillText(title.substr(0, tl).replace(/^\s+|\s+$/, ""), width/2, i * lineheight + 50);
			  //           title = title.substr(tl);
			  //       }
					
					var dataUrl = canvas.toDataURL("image/png"); //生成base64
					this.dataUrl = dataUrl
		        }
		        img.src = this.cover;
			},
			checkTitle(){
				if(validate.getTrueLength(this.title) > 30){

				}
				
				// this.setTextInCanvas()
			},
			onSelected(res){ //选择位置
				let province =  res.province.value;
				let city = res.city.value;
				let area =  res.area.value
				this.addressFirst = province + city + area;
				this.addressData = {
					province,city,area
				}
				this.isShowAddressSecond = true
				this.getPosition()
			},
			getPosition(){ //获取位置经纬度

				var address = this.addressFirst + this.addressSecond
				this.address = address
				var geocoder = new qq.maps.Geocoder(this.callbacks);
				geocoder.getLocation(address)
			},
			getLocalDateArray(){//获取所有日期信息
				var timeStart = this.timeStart;
				var timeEnd = this.timeEnd;
				timeStart = validate.formatDate('-',timeStart);
				timeEnd = validate.formatDate('-',timeEnd)
				return validate.dataScope(timeStart,timeEnd)
			},
			addSchedule(schedulesDayIdx,scheduleIdx){
				var obj = {  //必须重新定义一个新的对象不能用之前的，如果是之前的，vue会将原来的数据和新添加的数据视为一个新的值
            		timeStart:{
            			"HH": "HH",
						"mm": "mm"
            		},
            		timeEnd:{
            			"HH": "HH",
						"mm": "mm"
            		},
            		schedulePices:[
            			{
            				sessionType:'speak',
	                		meetTypes:[
	                			{
	                				text:'活动',
	                				value:'other'
	                			},
	                			{
	                				text:'演讲',
	                				value:'speak'
	                			}
	                		],
		            		head:require('../../assets/images/head-image_03.png')
		            		
            			}
            		]
            		
            	}	
				this.schedulesDays[schedulesDayIdx].schedules.splice(scheduleIdx+1, 0, obj);  //在当天日程安排表的数组中插入新的数组
			},
			deleteSchedule(schedulesDayIdx,scheduleIdx){
				this.schedulesDays[schedulesDayIdx].schedules.splice(scheduleIdx,1); //在当天日程安排表的数组中移除新的数组
			},
			addMeeting(schedulesDayIdx,scheduleIdx,schedulePiceIdx){
				var obj = {
    				sessionType:'speak',
            		meetTypes:[
            			{
            				text:'活动',
            				value:'other'
            			},
            			{
            				text:'演讲',
            				value:'speak'
            			}
            		],
            		head:require('../../assets/images/head-image_03.png')
    			}
    			//在当天日程安排表的数组中的时间段数组中插入新的数组
    			this.schedulesDays[schedulesDayIdx].schedules[scheduleIdx].schedulePices.splice(schedulePiceIdx+1, 0, obj);
			},
			cancelMeeting(schedulesDayIdx,scheduleIdx,schedulePiceIdx){
				//在当天日程安排表的数组中的时间段数组中移除新的数组
				this.schedulesDays[schedulesDayIdx].schedules[scheduleIdx].schedulePices.splice(schedulePiceIdx,1);
			},
			changeScheduleDuration(eventData,schedulesDayIdx,scheduleIdx){ //改变会议时间duration
				var timeDate = eventData.data;
				let pices = this.schedulesDays[schedulesDayIdx].schedules[scheduleIdx]
				let timeEnd = pices.timeEnd
				console.log(timeEnd)
				if(timeEnd.HH === 'HH' || timeEnd.mm === 'NaN' || timeEnd.mm === 'mm'  ){
				console.log('是的')

					pices.timeEnd={
						"HH": timeDate.HH,
	      				"mm": timeDate.mm ==='NaN'?'mm': timeDate.mm
					}
				}
				
			},
			changeSessionType(schedulesDayIdx,scheduleIdx,schedulePiceIdx){
				var schedulePices = this.schedulesDays[schedulesDayIdx].schedules[scheduleIdx].schedulePices
				
				if(!schedulePiceIdx){
					schedulePices.splice(1)
					// .splice()
				}		
			},
			tansmitData(event){
			
				if(!this.title){
					alert('请填写会议标题')
					event.preventDefault()
					return 
				}else if(validate.getTrueLength(this.title) > 40){
					alert('会议标题过长')
					event.preventDefault()
					return
				}else if(!this.addressSecond){
					alert('请填写会议地址')
					event.preventDefault()
					return 
				}else if(!this.cover&&!this.dataUrl){
					alert('请选择会议封面图')
					event.preventDefault()
					return 
				}



				this.addressData.detail = this.addressSecond
				var meetInfo = {
					cover:this.dataUrl||this.cover,
					meetingHeader:{
						title:this.title,//会议title
						meetingDuration:{//会议持续时间
							timeStart:this.timeStart.getTime(),
							timeEnd:this.timeEnd.getTime(),
						},
						cover_with_title : this.cover_with_title,
						address:this.address,//会议详细地址
						latlng:this.latlng,//会议经纬度
						addressData:this.addressData
					},
					schedulesDays:this.schedulesDays
				}



				let contentNum = 0 ; //日程表单检测
				let timeNum = 0 ;
				let timeSameNum = 0;
				this.schedulesDays.forEach((v,i)=>{
					v.schedules.forEach((v,i)=>{
						if(v.timeStart.HH === 'HH' || v.timeEnd.mm === 'mm'){
							timeNum ++
						}
						if(v.timeStart.HH === v.timeEnd.HH && v.timeStart.mm === v.timeEnd.mm){
							timeSameNum ++
						}
						v.schedulePices.forEach((v,i)=>{
							if(!v.title){
								contentNum ++
							}
						})
					})
				})
				if(contentNum){
					alert('请将议程主题填写完整')
					event.preventDefault()
					return 
				}else if(timeNum){
					alert('请将议程时间填写完整')
					event.preventDefault()
					return
				}else if(timeSameNum){
					alert('议程时间不能相同')
					event.preventDefault()
					return
				}

				window.sessionStorage.setItem('meetInfo',JSON.stringify(meetInfo))  //将数据传递到下一个页面
				
			},

			showAblum(){
				this.isShowAblum = true;
			},
			cancelAblum(){
				this.isShowAblum = false
			},
			submitAblum(cover){
				this.cover = cover
				this.setTextInCanvas()
				this.isShowAblum = false
			},
			goback(){
				history.back()
			},
			init(){
				this.schedulesDays = this.getLocalDateArray()
				this.setTextInCanvas()
			}
		},
		mounted(){
			var meetingId = validate.getQueryString('meetingId')//从会议列表页面进来
			if(meetingId){  // 将会议内容填充到页面
				axios.get('/pptxzs/meeting.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),{
					params:{ 'meeting_id': meetingId}
				})
				.then(res=>{
					if(res.data.msg === "User or key error"){
		    			validate.reLogin()
		    		}

		    		
					let meeting =  res.data.data.meeting


					let address = meeting.address
					this.select = {//默认地址
			         	province:address.province,
			          	city: address.city,
			          	area:address.district
			        }
			        this.addressSecond = address.detail
			        this.title = meeting.title
			        this.timeStart = new Date(meeting.start_date)
			        this.cover = meeting.cover
			        this.attchChecked = this.cover_with_title = meeting.cover_with_title


			        setTimeout(()=>{
			        	this.timeEnd = new Date(meeting.end_date)

			        	setTimeout(()=>{
			        		var schedulesDays = this.schedulesDays

				        	meeting.schedule.forEach((v,i)=>{
				        		var arr_j = []
				        		v.forEach((v,j)=>{
				        			var arr_k = []
				        			v.agenda.forEach((v,k)=>{
				        				console.log(v)
				        				if(v.subject === 1){
				        					let ppt = v.ppt
				        					arr_k[k] = {
												sessionType: "speak",
												meetTypes: [
													{
														text: "活动",
														value: "other"
													},
													{
														text: "演讲",
														value: "speak"
													}
												],
												title: v.content,
												tag: v.tag,
												pptId: ppt.ppt_id,
												content:v.content,
												head:ppt.auth_head||ppt.owner_head,
												speakerName : ppt.auth_name||ppt.owner_name,
												pptIntro:ppt.desc||'',
												pptName:ppt.title
											}
				        				}else{
				        					arr_k[k] = {
												sessionType: "other",
												meetTypes: [
													{
														text: "活动",
														value: "other"
													},
													{
														text: "演讲",
														value: "speak"
													}
												],
												title:v.content
											}
				        				}
					        			
					        		})
				        			arr_j[j] = {
					        			timeStart: {
											HH: v.start_time.split(':')[0],
											mm: v.start_time.split(':')[1]
										},
										timeEnd: {
											HH: v.end_time.split(':')[0],
											mm: v.end_time.split(':')[1]
										},
										schedulePices: arr_k
									}

				        		})
				        		schedulesDays[i].schedules = arr_j
				        	})
				        	this.schedulesDays = schedulesDays
			        	},300)
			        	
			        },300)
			      
			        this.init()

			        this.meetingId = meetingId
				})
			}else{
				this.init()
				this.meetingId = ''
			}

			
		}
	}
</script>
<style lang="scss">

	.meeting{
		margin-top: 30px;
		background-color: #FFF;
		.meeting-header{
			height:103px;
			padding:20px 0 0 20px;
			.meeting-header-icon{
				background-image: url("../../assets/images/upload-meeting_03.png");
				width: 57px;
				height: 47px;
			}
			span{
				font-size: 30px;
				color: #353535;
				margin-left: 7px;
				vertical-align: middle;
			}
		}
		.meeting-form{
			padding-left: 84px;
			li{
				height:auto;
				margin-bottom: 17px;
				label{
					font-size: 16px;
					color: #353535;
					margin-right: 10px;
					
				}
				#checkbox{
					height:auto ;
				}
				input,select{
					height:30px ;
					outline:none;
					border: solid 1px #999999;
					border-radius: 5px;
					font-size: 14px;
					padding: 0;
					margin: 0;
					box-sizing: border-box;
					padding-left: 10px;
				}
				.distpicker{
					display: inline-block;
				}
				.imgbg-choose{
					position: relative;
					width: 100px;
					display: inline-block;
					height: 30px;
					line-height: 30px;
					text-align: center;
					background-color: #6195ff;
					border-radius: 5px;
					color:#fff;
					vertical-align: middle;
					input,span{
						position: absolute;
						top:0;
						left:0;
						width:100%;
						height:100%;
						cursor:pointer;
					}
					input{
						z-index: 1;
						opacity: 0;
					}
				}

			}
			.img-preview{
				margin-bottom: 60px;
				label{
					padding-top:5px;display:inline-block
				}
				img{
					vertical-align:top;
					border-radius:5px;
					width: 420px;
					height: 190px;
				}
				.cover-title{
					position:absolute;
					left:120px;
					top:28%;
					color: rgb(231, 231, 231);
					width:300px;
					word-wrap:break-word;
					overflow:hidden;
					text-align:center;
					line-height:38px;
					font-size:25px;
				}
			}
			.detail-address{
				input{
					width:330px;
				}
			}
		}
		.meeting-content{
			padding-left: 84px;

			.meeting-content-li{
				margin:60px 0 40px;
				width: 620px;
				
				.schedule-head{
					font-size: 20px;
					color: #353535;
					margin-bottom:20px;
					.schedule-head-date{
						margin: 0 18px;
					}
				}
				.schedules{
					border: solid 1px #999999;
					position: relative;
					margin-bottom: 20px;
					.schedule-operate{
						position: absolute;
						right: -254px;
						top:10px;
						color: #6195ff;
						font-size: 16px;
						width: 234px;
						div{
							float: left;
							.add-schedule,.sub-schedule{
								width: 20px;
								height: 20px;
								vertical-align: middle;
								margin-right: 10px;
								cursor: pointer;
							}
							.sub-schedule{
								background-image: url("../../assets/images/cancel.png")
							}
							.add-schedule{
								background-image: url("../../assets/images/addition_03.png")
							}
							span{
								cursor: pointer;
								vertical-align: middle;
							}

						}
						div:first-child{
							margin-right: 10px;
						}
					}
					.schedule-duration,.schedule-detail{
						height: 50px;
						padding:10px 0 0 10px;
						box-sizing:border-box;
						label{
							font-size: 16px;
							color: #353535;
							margin-right: 10px;
						}
						select{
							margin-right: 27px;
						}
						option{
							border:solid 1px #999999;
						}
						input,select{
							height:30px ;
							outline:none;
							border: solid 1px #999999;
							border-radius: 5px;
							font-size: 14px;
							padding: 0;
							margin: 0;
							box-sizing: border-box;
							padding-left: 8px;
							color: #353535;
						}
						input.speak-title{
							width:270px;
						}
						select{
							width:70px;
							margin-right:10px;
						}
					}
					.schedule-duration{
						border-bottom: solid 1px #999999;
					}
					.schedule-detail{
						border-bottom: solid 1px #999999;
						.meeting-opreat-wrap{
							float:right;
							width:100px;
							margin:8px 10px 0 0;
							.add-meeting,.cancel-meeting{
								font-size: 14px;
								color: #6195ff;
								cursor: pointer;
								margin-right:10px;

							}
							.add-meeting{
								margin-right: 10px;
							}
						}
						
					}
					.schedule-detail:last-child{
						border: none;
					}
				}
				.schedules:last-child{
					margin-bottom: 0;
				}
				
			}
		}
		.meeting-nav{
			text-align: center;

			.meeting-cancel,.meeting-sumbit{
				display: inline-block;
				width: 180px;
				height: 50px;
				line-height: 50px;
				background-color: #6195ff;
				border-radius: 5px;
				font-size: 22px;
				color:#fff;
				cursor: pointer;
			}
			.meeting-cancel{
				margin-right: 120px;
			}
			
				.nav-upload{
					display: inline-block;
				}
			
			
		}
		padding-bottom: 60px;
	}
</style>