<template>
<div>
	<div class="meeting-upload main" >
		<div class="meeting-header">
			<i class="icon-bg meeting-header-icon"></i>
			<span>会议上传</span>
		</div>
		<div class="upload-content clearfloat">
			<div class="upload-left">
				<div class="upload-title" noselect>大会日程</div>
				<div class="upload-content">
					<div class="schedule-day">
						<div noselect>
							{{schedulesDays[processDaysIdx].date}} 
						</div>
						<div v-show="processDaysIdx!==0" @click="lastDay" noselect  class="last-day">
							上一天
						</div>
						<div v-show="processDaysIdx!==schedulesDays.length-1" @click="nextDay" noselect  class="next-day">
							下一天
						</div>
					</div>
					<div class="schedule-info">
						<div>
							<div v-for="(schedule,scheduleIdx) in schedulesDays[processDaysIdx].schedules" :key="scheduleIdx">
								<div class="schedule-info-duration">{{schedule.timeStart.HH+':'+schedule.timeStart.mm+'-'+schedule.timeEnd.HH+':'+schedule.timeEnd.mm}}</div>
								<div >
									<div class="schedulePices" v-for="(schedulePice,schedulePiceIdx) in schedule.schedulePices" :key="schedulePiceIdx"> 
										<div class="schedule-info-other" v-if="schedulePice.sessionType==='other'">
											{{schedulePice.title}}
										</div>
										<div class="schedule-info-speak-wrap" v-else>
											<div class="schedule-info-speak clearfloat" :style="isProcessDaysIdx===processDaysIdx&&isSchedulePiceIdx===schedulePiceIdx&&isScheduleIdx===scheduleIdx?{backgroundColor:'#cdffb7'}:{}">
												<div class="speak-model">{{schedulePice.tag||'标签'}}</div>
												<div class="speak-info" >
													<img class="speaker-header" :src="schedulePice.head">
													<div class="speaker-wrap">
														<div class="speak-title" ellipsis>{{schedulePice.title}}</div>
														<div class="spaker">{{schedulePice.speakerName||'演讲者'}}</div>
													</div>
													
													<div class="pice-edite">
														<span @click="schedulePiceEdite(processDaysIdx,scheduleIdx,schedulePiceIdx)"  v-if="!schedulePice.edited">{{isProcessDaysIdx===processDaysIdx&&isSchedulePiceIdx===schedulePiceIdx&&isScheduleIdx===scheduleIdx?'编辑中...':'编辑'}}</span>
														<i v-else class="icon-bg pice-edited-icon"></i>
													</div>
												</div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div class="upload-right" v-show="isShowRight">
				<div class="upload-right-create">
					<label for="">作者信息：</label>
					<input v-model="speakerName" placeholder="请输入作者姓名" type="text">
					<span  class="upload-header-wrap">
						上传头像
						<img class="upload-header-preview" :src="previewHeadUrl" alt="">
						<input id="head-img" title="点击上传头像" @change="chooseHeadImg" class="upload-header-input" type="file">
					</span>
					
				</div>
				<div class="upload-right-create" style="margin-top:0;">
					<label for="">演讲标签：</label>
					<input v-model="tag"  class="upload-header-input" type="text" placeholder="请输入演讲标签">
				</div>
				<div class="upload-right-upload clearfloat">
					<label for="">上传ppt：</label>
					<div  class="right-upload-content">
							<span class="upload-btn-wrap">
								<span class="upload-btn">上传PPT</span>
								<input id="ppt-file" @change="choosePpt"  title="点击上传PPT"  class="upload-btn-input" type="file">
							</span>
							
							<br>
							<span class="upload-tit">或拖拽PPT至此处</span>
							
							<div v-show="pptName" class="upload-progress" :style="{backgroundImage:'linear-gradient(to right,rgba(97,149,225,1) 0%,rgba(97,149,225,1)' + progress + ',rgba(97,149,225,0.25)' + progress + ',rgba(97,149,225,0.25) 100%)'}">
								{{rate===100?'请稍候...':pptName}}
							</div>
					</div>
				</div>
				<div class="upload-right-intro">
					<label for="">PPT简介：</label>
					<textarea v-model="pptIntro" class="right-intro-content" name="" id="" cols="30" rows="10"></textarea>
				</div>
				<div @click="savePice" style="font-size:16px;color: #6195ff;margin:14px 0 0 4px;cursor:pointer;">
					<label for="" style="opacity:0">PPT简介：</label>
					<span class="save-this">保存当前</span>
				</div>
			</div>

		</div>
		<div class="meeting-nav" v-show="isShowSubmit">
				<!-- <router-link class="meeting-cancel" :to="{path: 'create'}">取消</router-link> -->
				<span class="meeting-sumbit" @click="sendData">完成</span>
		</div>
	</div>
	 <!-- 登陆 -->
   	<login></login>
</div>
</template>
<script>
import {validate} from '@/assets/js/validate' //注意路径
import	login from "@/components/base/login"
import axios from 'axios'
var CancelToken = axios.CancelToken;
var cancel;
	export default{
		components:{login},
		data(){
			return{
				isShowSubmit:false,
				schedulesDays:[],//上个页面传来的日程安排
				daysIdx:0,//天的索引用来切换填写当天日程
				previewHeadUrl:'',//右边编辑区域选择图片的本地路径
				currentSpeakerImgFile:null,//右边编辑区域选择图片文件，.png/jpg/jpeg
				speakerName:'',//右边当前操作ppt的演讲人
				pptIntro:'',//右边ppt简介
				pptfile:null,//右侧每个所选择的ppt文件 ，.pptx
				scheduleIdx:0,
				schedulePiceIdx:0,
				isProcessDaysIdx:-1,
				isScheduleIdx:-1,
				isSchedulePiceIdx:-1,
				tag:'',
				isShowRight:false,//右边编辑栏
				rate:0,
				pptName:'',
				fileType:'',
				isSaving:false,
				isSendData:true
			}
		},
		computed:{
			processDaysIdx(){ //当前操作天数
				return Math.min(this.schedulesDays.length,Math.max(0,this.daysIdx))
			},
			progress (){
				var rate = Math.min(this.rate,100)
				return rate +'%'
			}
		},
		watch:{
			pptfile:{
				handler(val){
					if(!val){
						return
					}
					console.log(val)
					this.pptName = val.name || ''
					this.fileType =  val.name.substring(val.name.lastIndexOf('.')) || ''
				},
				deep:true
			}
		},
		methods:{
			lastDay(){
				this.daysIdx--
				// let idx = 	this.daysIdx - 1
				// this.daysIdx = Math.min(this.schedulesDays.length-1,Math.max(0,idx))
			},
			nextDay(){
				this.daysIdx++
				// let idx = 	this.daysIdx + 1
				// this.daysIdx = Math.min(this.schedulesDays.length-1,Math.max(0,idx))
			},
			schedulePiceEdite(processDaysIdx,scheduleIdx,schedulePiceIdx){
				var meetingId = validate.getQueryString('meetingId')//从会议列表页面进来

				this.isProcessDaysIdx = processDaysIdx
				this.isScheduleIdx = scheduleIdx
				this.isSchedulePiceIdx = schedulePiceIdx
				this.schedulePiceIdx = schedulePiceIdx; //指定当前操作日程块内ppt索引
				this.scheduleIdx = scheduleIdx;//指定当前操作日程分区索引
				this.isShowRight = true;

				let currentPice = this.schedulesDays[processDaysIdx].schedules[scheduleIdx].schedulePices[schedulePiceIdx]

				if(!meetingId){  //上传
					this.clearData()
				}else{  //编辑

					this.previewHeadUrl = currentPice.head;
					this.speakerName = currentPice.speakerName;
					this.pptIntro = currentPice.pptIntro;
					this.tag = currentPice.tag;
					this.pptName = currentPice.pptName;

					this.pptfile = null; 
					this.currentSpeakerImgFile = null;
					document.getElementById('head-img').value = ''
					document.getElementById('ppt-file').value = ''
				}
				
			},
			chooseHeadImg(e){//选择每个用户的头像
				let file = e.target.files[0]


				var  regTestFile = /\.(jpg|jpeg|png)$/gi
				if(regTestFile.test(file.name)){
					this.currentSpeakerImgFile = file
			   		this.previewHeadUrl = window.URL.createObjectURL(file);
				}else{
					alert('目前支持jpg、jpeg、png格式的图片')
				}
				
			},
			dragenter(){ //拖入ppt改变样式
				this.dragContainerStyle = '#eee'
			},
			dragover(){//拖中改变样式
			},
			dragleave(){ //拖离改变样式
				this.dragContainerStyle = '#fff'
			},
			drop(event){ //释放ppt改变样式发送请求
				this.dragContainerStyle = '#fff';
				var files = event.dataTransfer.files;
				this.pptfile = this.checkFile(files[0]) ? files[0] : null
			},
			choosePpt(e){ //点击按钮选择PPT
				let files = e.target.files;
				this.pptfile = this.checkFile(files[0]) ? files[0] : null
			},
			checkFile(v){
				var  regTestFile = /\.(pptx|potx|ppt|pot|pdf|pptm|potm|ppsx|ppsm|pps|ppam|ppa)$/gi
				if(!regTestFile.test(v.name)){//过滤调不是以.pptx结尾的文件
					alert('只能上传ppt，pdf文件')
					return false
				}
				var size = Math.round(v.size/1024*100)/100
				if(size>50000){
					alert('上传文件大小不能超过50M')
					return false
				}
				return true
			},
			clearData(){

				this.previewHeadUrl = '';
				this.speakerName='';
				this.pptIntro='';
				this.tag = '';
				this.pptName = '';

				this.pptfile = null; 
				this.currentSpeakerImgFile = null;
				document.getElementById('head-img').value = ''
				document.getElementById('ppt-file').value = ''
			},
			savePice(){//点击保存按钮，将数据放到对应的schedulePice里面
				this.isSendData = false


				if(this.isSaving){
					alert('正在上传，请等待。。。')
					return
				}
				this.isSaving = true;



				let currentPice = this.schedulesDays[this.processDaysIdx].schedules[this.scheduleIdx].schedulePices[this.schedulePiceIdx]				 
				console.log(currentPice)

				var meetingId = validate.getQueryString('meetingId')//从会议列表页面进来
				if(!this.pptfile&&!meetingId){
					alert('请选择议程的ppt文件')
					return
				}





				let form = new FormData() //上传ppt
		    	form.append('ppt_files',this.pptfile) //此处填写后端需要的name名

		    	var config = { //发送请求配置项
			        onUploadProgress: progressEvent => {
			            this.rate = progressEvent.loaded / progressEvent.total * 100 | 0
			            console.log( this.rate)
			        },
			        headers: {'Content-Type': 'multipart/form-data'}
			    }
				axios.post('http://www.pptx.info/pptxzs/uploadppt.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),form,config) 
			    .then((res) => {
				    	if(res.data.msg === "User or key error"){
			    			validate.reLogin()
			    		}
			    		let data = res.data.data
			    		let pptId = res.data.ret != 0 ? currentPice.pptId : data.ppt_id;;
			    		
						if(res.data.ret === 0){ //上传ppt完成
							this.pptfile = null;  //清空ppt以隐藏进度条
							this.rate = 0; //让进度为0
							this.pptName = 0;
						}





						let form = new FormData()  //上传头像
						form.append('images',this.currentSpeakerImgFile) 
						axios.post('/pptxzs/uploadimage.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),form) 
						.then((res)=>{

							if(res.data.msg === "User or key error"){
				    			validate.reLogin()
				    		}


							let auth_head = this.currentSpeakerImgFile ? res.data.data.url : currentPice.head 
							let auth_name = this.speakerName //演讲者
							let desc = this.pptIntro //ppt简介
							let title = currentPice.title //上个页面编辑的议程名字


							currentPice.head = auth_head  //动态改变当前编辑栏的内容
							currentPice.tag = this.tag //标签
							currentPice.pptId = pptId 
							currentPice.content = title 
							currentPice.edited = true
							//重新设置储存中的meetingInfo的内容
							window.sessionStorage.setItem('schedulesDays',JSON.stringify(this.schedulesDays))






							// 编辑ppt
							axios.post('/pptxzs/pptpicfile.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),{
								title:title+ this.fileType||'',
								auth_head,
								auth_name,
								desc,
								ppt_id:pptId
							},{
								headers: {'Content-Type': "application/x-www-form-urlencoded"} 
							})
							.then(res=>{

								if(res.data.msg === "User or key error"){
					    			validate.reLogin()
					    		}



								if(res.data.ret === 0){
									console.log(currentPice)
								}else{
									alert(res.data.msg)
								}


								let editedNum = 0; //检测是否编辑完所有议程
								this.schedulesDays.forEach((v,i)=>{
									v.schedules.forEach((v,i)=>{
										v.schedulePices.forEach((v,i)=>{
											if( !v.edited && v.sessionType === 'speak'){
												editedNum++
											}
										})
									})
								})
								if(!editedNum){
									this.isShowSubmit = true
								}

								this.clearData()
								this.isShowRight = false;
								this.isSendData = false//是否允许提交会议
								this.isSaving = false;
								
							})
						},(err)=>{

						})
						
			    },(err)=>{

			    })
			},
			sendData(){
				var nopptlists = 0;

		
				let meetInfo = this.meetInfo                 //将添加的数据保存meetInfo中
				let head = meetInfo.meetingHeader


				var obj = {}
				obj.title = head.title ;
				obj.start_date = head.meetingDuration.timeStart;
				obj.end_date = head.meetingDuration.timeEnd
				obj.address = head.addressData
				obj.cover_with_title = head.cover_with_title;
				obj.address['district'] =  obj.address['area'];
				delete obj.address['area'];
				obj.cover = meetInfo.cover;


				var schedule = [];
				meetInfo.schedulesDays.forEach((schedulesDay,i)=>{//三重遍历，每层还是定义一个变量
					var arr1 = []
					schedulesDay.schedules.forEach((schedule,j)=>{
						var arr2 = [];
						schedule.schedulePices.forEach((schedulePice,k)=>{
							if(schedulePice.sessionType==='speak'){
								if(!schedulePice.pptId){//检测没有上传ppt的列表数目
									nopptlists++
								}


								arr2[k] = {
									subject:1,
									ppt_id:schedulePice.pptId||null,
									tag:schedulePice.tag||null,
									content:schedulePice.content||null
								}
							}else{
								arr2[k] = {
									subject:0,
									content:schedulePice.title
								}
							}
							
						})		
						arr1[j]= {
							start_time:schedule.timeStart.HH+':'+schedule.timeStart.mm,
							end_time:schedule.timeEnd.HH+':'+schedule.timeEnd.mm,
							agenda:arr2
						}
					})
					schedule[i] = arr1;
				})
				obj.schedule = schedule;



				if(nopptlists){ //检测没有上传ppt的演讲议程
					alert('您还没有将会议填写完整')
					return
				}



				var meetingId = validate.getQueryString('meetingId')//会议编辑

				if(!this.isSendData){//检测是否正在发送
					return
				}
				this.isSendData = false



				if(meetingId){ 
					obj.meeting_id = meetingId
					axios.post('/pptxzs/meeting.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),obj)
					.then(res=>{
						if(res.data.msg === "User or key error"){
			    			validate.reLogin()
			    		}


						window.location.href="/#/meeting"
					})
				}else{
					axios.post('/pptxzs/meeting.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),obj)
					.then(res=>{
						if(res.data.msg === "User or key error"){
			    			validate.reLogin()
			    		}
						window.location.href="/#/meeting"
					})
				}
				
			}
		},
		created(){

			var meetInfo = JSON.parse(sessionStorage.getItem('meetInfo'))//获取从上个页面穿个的json数据
			console.log(meetInfo)

			var schedulesDays = meetInfo.schedulesDays

			var speakNum = 0; //监听是否存在演讲
			schedulesDays.forEach((v,i)=>{ 
				v.schedules.forEach((v,i)=>{
					v.schedulePices.forEach((v,i)=>{
						if(v.pptId){
							speakNum ++
						}
					})
				})
			})
			if(!speakNum){
				this.isShowSubmit = true
			}




			this.schedulesDays = schedulesDays
			this.meetInfo = meetInfo;

			// let currentPice_0 = this.schedulesDays[0].schedules[0].schedulePices[0]
			// this.isShowRight = currentPice_0.sessionType === 'speak' ? false : false

			// if(currentPice_0.sessionType === 'speak'){ //初始化编辑栏的信息
			// 	this.speakerName = currentPice_0.speakerName
			// 	this.pptIntro = currentPice_0.pptIntro
			// 	this.tag = currentPice_0.tag
			// 	this.pptName = currentPice_0.pptName || ''
			// }



			var meetingId = validate.getQueryString('meetingId')//会议编辑
			if(meetingId){
				this.isShowSubmit = true
				// if(currentPice_0.sessionType === 'speak'){
				// 	this.previewHeadUrl = currentPice_0.head
				// }
			}



			if(this.meetInfo.cover.indexOf('data:image')>0){//图片传来是链接，
				var formData = new FormData(); 
				var file = validate.convertBase64UrlToBlob(meetInfo.cover)
				formData.append("images",file);  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
				axios.post('/pptxzs/uploadimage.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),formData,{
					 headers: {'Content-Type': 'multipart/form-data'}
				}).then(res=>{

					if(res.data.msg === "User or key error"){
		    			validate.reLogin()
		    		}  
					this.meetInfo.cover = res.data.data.url
					
				})
			}
			
		},

	}
</script>
<style lang="scss" >
	.meeting-upload{
		margin-top: 30px;
		background-color: #FFF;
		padding-bottom: 30px;

		min-height:600px;
		.meeting-header{
			height:103px;
			padding:20px 0 0 20px;
			.meeting-header-icon{
				background-image:url("../../assets/images/upload-meeting_03.png");
				width: 57px;
				height: 47px;
			}
		}
		.upload-content{
			.upload-left{
				width: 363px;
				float:left;
				margin-left: 20px;
				.upload-title{
						font-size: 24px;
						color: #353535; 
						text-align: center;
						margin-bottom: 20px;
				}
				.upload-content{
					border: solid 1px #999999;
					
					.schedule-day{
						position: relative;
						color: #6195ff;
						font-size: 16px;
						text-align: center;
						height: 40px;
						line-height: 40px;
						.next-day,.last-day{
							position: absolute;
							width: 60px;
							height:40px;
							top:0;
							cursor: pointer;
						}
						.next-day{
							right: 10px;
						}
						.last-day{
							left: 10px;
						}
						
					}
					.schedule-info{
						.schedule-info-duration{
							height: 20px;
							border-bottom: solid 1px #999999;
							border-top: solid 1px #999999;
							line-height: 20px;
							color: #999999;
							font-size: 12px;
						}
						.schedulePices{
							border-bottom: solid 1px #999999;
							.schedule-info-other{
								height: 40px;
								
								line-height: 40px;
								text-align: center;
								font-size: 16px;
							}
							.schedule-info-speak-wrap{
									
								.schedule-info-speak{
									
									height: 60px;
									line-height: 60px;
								
									.speak-model{
										float: left;
										width: 120px;
										border-right:solid 1px #999999;
										text-align: center;
										font-size: 16px;
									}
									.speak-info{
										position: relative;
										padding-left: 10px;
										box-sizing: border-box;
										float: left;
										width: 240px;
										.speaker-header{
											width: 32px;
											height: 32px;
											border-radius: 50%;
											background-color: #eee;
											float: left;
											margin-top: 14px;
										}
										.speaker-wrap{
											float: left;
											line-height: 30px;
											color:#888;
											padding-left: 10px;
											box-sizing: border-box;
											.speak-title{
												// display: inline-block;
												font-size: 14px;
												height: 30px;
												width: 180px;
											}
											.spaker{
												// display: inline-block;
												height: 30px;
												font-size: 12px;
												width: 180px;
											}
										}
										.pice-edite{
											position: absolute;
											width: 54px;
											height:40px;
											right:-60px;
											cursor: pointer;
											color: #6195ff;
											font-size: 13px;
											line-height: 40px;
											margin-top: 12px;
											.pice-edited-icon{
												background-image: url("../../assets/images/complish_03.png");
												width:24px;
												height:24px;
											}
										}

									}
									
								}
							}
						}
						.schedulePices:last-child{
							border-bottom:none;
						}
						
						
					}
					
				}
			}
			.upload-right{
				float:left;
				width: 482px;
				padding-left: 80px;
				label{
					width: 80px;
					text-align: right;
				}
				.upload-right-create{
					height:60px;
					margin-top: 42px;
					line-height: 60px;
					label{
						font-size: 16px;
					}
					input{
						height: 30px;
						width: 120px;
						padding-left: 10px;
						box-sizing: border-box;
					}
					margin-bottom: 20px;
					.upload-header-wrap{
						display: inline-block;
						width: 60px;
						height: 60px;
						font-size: 12px;
						text-align: center;
						line-height: 60px;
						border-radius: 50%;
						margin-left: 20px;
						position: relative;
						vertical-align: middle;
						background-color: #999;
						input,img{
							width: 100%;
							height: 100%;
							position: absolute;
							left: 0;
							right: 0;
							border-radius: 50%;
						}
						.upload-header-preview{
							cursor: pointer;
						}
						.upload-header-input{
							opacity: 0;
							z-index: 1;
							cursor: pointer;
						}
					}

				}
				.upload-right-upload{
					margin: 0 0 30px 0;
					label{
						float: left;
						font-size: 16px;
					}
					.right-upload-content{
						float: left;
						width: 320px;
						height: 180px;
						text-align: center;
						font-size: 16px;
						margin-left: 4px;
						position: relative;
						border: solid 1px #999;
						.upload-btn-wrap{
							position: relative;
							display: inline-block;
							width: 140px;
							height: 30px;
							background-color: #6195ff;
							border-radius: 5px;
							color: #ffffff;
							line-height: 30px;
							margin: 61px 0 10px;
							span,input{
								position: absolute;
								width: 100%;
								height: 100%;
								left: 0;
								top: 0;
							}
							.upload-btn{
								
							}
							.upload-btn-input{
								opacity: 0;
								z-index: 1;
								cursor: pointer;

							}

						}
						
						.upload-tit{
							color: #999999;
						}
						.upload-progress{
							position:absolute;
							bottom:0px;
							border-top:1px solid #999;
							height:26px;
							line-height: 26px;
							width:322px;
							left:0;
						}
					}


				}
				.upload-right-intro{
					
					label{
						
						font-size: 16px;
					}
					.right-intro-content{
						margin-left: 4px;
						vertical-align: top;
						width: 320px;
						height: 140px;
					}

				}
				.save-this{
					display:inline-block;
					padding:0 20px;
					height:40px;
					color:#fff;
					line-height:40px;
					text-align:center;
					cursor:pointer;
					border-radius:5px;
					background-color:#6195ff;
				}
			}
		}
		.meeting-nav{
			text-align: center;
			margin-top:40px;
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
			
		}
	}
</style>