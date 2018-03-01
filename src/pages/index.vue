<template>
	<div class="personal-wrap clearfloat main">
		<!-- 左侧上传ppt -->
		<div class="personal-left">
			<div>
				<!-- 拖拽上传ppt -->
				<div class="drag-upload-wrap" >
					<div class="drag-upload x-mid" @drop.prevent="drop" @dragenter.prevent="dragenter" @dragover.prevent="dragover" @dragleave.prevent="dragleave" :style="{backgroundColor:dragContainerStyle}"   noSelect >
					拖拽PPT至此框内即可上传
					</div>
				</div>
				<span class="drag-upload-tit" noSelect>可同时拖拽多个PPT</span>
				<!-- 点击上传ppt -->
				<div class="click-upload-wrap">
					<p class="click-upload-btn">选择PPT</p>
					<input hidden class="click-upload-input" type="file" multiple="multiple" @change="choosePptByBtn">
				</div>
			</div>
			<!-- 小程序二维码 -->
			<div class="wxapp-qr-code" center>
				<img src="../assets/images/applet-QR-code_03.jpg" alt="">
				<p noselect>扫描二维码至PPT小助手</p>
			</div>
		</div>
		<!-- 右侧，我的ppt管理中心 -->
		<div class="personal-right">
			<div class="my-ppt-title" noSelect>
				我的PPT
			</div>
			<!-- 操作导航栏 -->
			<div>
				<ul class="clearfloat myppt-operate-head">
					<li v-for="(v,i) in mypptOperation" noSelect :style="v.style">{{v.name}}</li>
				</ul>
			</div>
			<!-- 我的ppt内容管理区 -->
			<div class="myppt-container noscrollbar" @scroll="scrollLoad">
				<div v-if="myPptShow" >
					<!-- 新上传的ppt -->
					<ul>
						<li class="my-ppt-list" v-for="(item,index) in myNewPptList">
							<div>
								<ppt-list :title="item.title"  @on-delete="pptDelete(item.id,'new')" @on-edite="pptEdite(item.id,'new')" :pptId="item.id" :uploadDate="item.uploadDate" :cover="item.cover"></ppt-list>
							</div>
							<div>
								<progress-bar @on-abort-upload="abortUpload" :title="item.title" :isUploadPpt="isUploadPpt" :rate="item.rate" :pptId="item.id" :pptIdx="item.idx" :uploadDate="item.uploadDate"></progress-bar>
							</div>
						</li>
					</ul>
					<!-- 已经存在的ppt -->
					<ul>
						<li class="my-ppt-list" v-for="(item,index) in myPptList">
							<div>
								<ppt-list :title="item.title" @on-delete="pptDelete(item.id,'old')"  @on-edite="pptEdite(item.id,'old')" :pptId="item.id" :uploadDate="item.uploadDate"></ppt-list>
							</div>
						</li>
					</ul>
				</div>
				<div class="no-myppt"  v-else>
					<img src="../assets/images/PPT-image_03.png" alt="">
					<p>您还未上传PPT</p>
				</div>
			</div>
		</div>
		
		<!-- 二次确认弹出框，此处为删除 -->
		<transition enter-active-class="animated pulse" >
			<my-toast v-show="isShowToast"  @on-submit="toastSubmit"  @on-cancel="toastCancel" :tit="toastTit" :content="toastContent"></my-toast>
		</transition>
		<!-- 编辑弹出层 -->
		<div class="my-edite" >
			<transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
				<ppt-edite v-show="isShowEdite" @on-edite-submit="editeSubmit" @on-edite-cancel="editeCancel" :title="editeTitle" :intro="editeIntro" :cover="editeCover"></ppt-edite>
			</transition>
		</div>
		<!--  -->
		<div v-if="isShowEditeGuide" class="mask edite-guide-mask">
			<div class="mask-content my-edite-guide-container">
				<div class="my-edite-guide">
					<img noselect src="../assets/images/guide_03.png" alt="">
					<div @click="closeGuide" class="close-edite-guide"></div>
				</div>
			</div>
			
		</div>
	
		
	</div>
</template>
<script>
import axios from 'axios'
import {validate} from '@/assets/js/validate' //注意路径

import progressBar from '@/components/pices/progress-bar'
import pptList from '@/components/pices/ppt-list'
import myToast from '@/components/pices/my-toast'
import pptEdite from '@/components/pices/ppt-edite'
var CancelToken = axios.CancelToken;
var cancel;
export	default{

	components:{
		progressBar,pptList,myToast,pptEdite
	},
	data (){
		return {
			isMobile:false,//检测手机移动
			uploadmore:true,//滚动加载更多
			scrollIdx:1,//滚动加载更多索引
			isShowEditeGuide:false,//新手指导
			editeTitle:'',//点击编辑获取的title
			editeCover:'',//点击编辑获取封面图
			editeIntro:'',//点击编辑获取的简介
			operatePptType:'',//删除和编辑的时新ppt还是旧ppt
			operatePptId:0,//当前删除，编辑的pptId
			isShowEdite:false,//是否显示编辑框
			isShowToast:false,//是否显示弹出对话框
			toastTit:'删除',//弹出对话框tit
			toastContent:'确定要移除此PPT？',//弹出对话框内容
			dragContainerStyle:'#fff',//拖拽改变内容区域颜色
			myPptList:[//已经存在的ppt
				// {
				// 	title:'城市轨道交通发展趋势',
				// 	id:21,
				// 	uploadDate:'2002-05-13',
				// 	intro:''
				// }

			],
			pptEmptyChange:true,//监听在改变myNewPptList数组之前，数组为空
			newPptIdxs:0,//即将上传ppt总数            5
			newPptIdxsArray:[],//即将上传ppt总数数组，[0,1,2,3,4]
			isUploadPpt:0,//正在上传的ppt的索引
			myNewPptList:[//正在上传的ppt总数
				// {
				// 	title:'我的新上传ppt1', //上传的ppt的文件名
				// 	idx:0, //上传的ppt索引
				// 	uploadDate:'2018/04/13', //上传的ppt时间
				// 	rate:0 //上传的ppt进度
				// }
			],//我的ppt列表
			mypptOperation:[//头部ppt th栏
				{	
					style:{
						width:'300px',
						textAlign:'left',
						paddingLeft:'20px'
					},
					name:'名称'
				},
				{	style:{
						width:'78px'
					},
					name:'编辑'
				},
				{
					style:{
						width:'78px'
					},
					name:'移除'
				},
				{
					style:{
						width:'95px',
						textAlign:'left'
					},
					name:'上传日期'
				}
			]
		}
	},
	computed:{
		myPptShow(){
			return this.myNewPptList.length || this.myPptList.length
		}
	},
	watch:{
		newPptIdxsArray:{ //监听是否添加了新的ppt
			handler :function(val, oldVal) {

				console.log('所有要上传的ppt数值为')
				console.log(this.myNewPptList)
				console.log('用来控制mynewpptlist的数组为'+this.newPptIdxsArray)

				if(this.pptEmptyChange){
					this.uploadppt(this.isUploadPpt)
					//this.isUploadPpt时在上传文件成功或者失败都会加1,初始值为0,最大值为this.newPptIdxsArray.length-1
					this.pptEmptyChange = false
				}
			},
 			deep: true
		},
		isUploadPpt(val){ //监听上传完毕，如果是上传完毕，则判断用户是否是第一次上传，如果是来一次新手指导，不是则什么都不做
			if(val === this.newPptIdxs){
				// validate.delCookie('hasUploaded')
				if(!validate.getCookie('hasUploaded')){
					console.log(validate.getCookie('hasUploaded'))
					this.isShowEditeGuide = true
					validate.setCookie('hasUploaded','yes',30*24)
				}
			}
		}
	},
	methods:{
		choosePptByBtn(e){ //按钮选择上传ppt
		   let files = 	e.target.files
		   this.getProgress(files)
		},
		dragenter(){ //拖入改变样式
			this.dragContainerStyle = '#eee'
		},
		dragover(event){//拖中改变样式
			
		},
		dragleave(event){ //拖离改变样式
			this.dragContainerStyle = '#fff'
		},
		drop(event){ //释放改变样式发送请求
			this.dragContainerStyle = '#fff';
			var files = event.dataTransfer.files;
			this.getProgress(files)
		},
		abortUpload(idx){ //删除上传指定的ppt
			console.log(`正在终止的pptId为${idx}`)
			this.newPptIdxsArray[idx] = 'deleted'
			console.log(`当前已经选择ppt的数组为${this.newPptIdxsArray}`)

			var myNewPptListUploadIdx; //找出正在要中止的newpptlist
			this.myNewPptList.forEach((v,i)=>{
				if(v.idx===idx){
					myNewPptListUploadIdx = i
				}
			})
			this.myNewPptList.splice(myNewPptListUploadIdx,1)

			if(idx === this.isUploadPpt){
				console.log(`正在删除一个正在上传的ppt，会正在终止请求`)
				cancel()  //中止正在发送的请求
			}
		},
		getProgress(files){ //添加新的ppt文件，显示进度条
			[].forEach.call(files,(v,i)=>{ //将文件信息
				var  regTestFile = /\.(pptx|potx|ppt|pot|pdf|pptm|potm|ppsx|ppsm|pps|ppam|ppa)$/gi
				if(!regTestFile.test(v.name)){//过滤调不是以.pptx结尾的文件
					alert('只能上传ppt，pdf文件')
					return
				}

				var size = Math.round(v.size/1024*100)/100
				if(size>50000){
					alert('上传文件大小不能超过50M')
					return
				}
				// var myPptList = this.myPptList;//检测是否已经长传ppt
				// var pptTitle = v.name
				// myPptList.forEach((v,i)=>{
				// 	if(v.title == pptTitle){
				// 		alert('已经上传了ppt')
				// 		return
				// 	}
				// })


				
				this.myNewPptList.push({ //新ppt的数据结构
					title:v.name,
					idx:this.newPptIdxs, //上传的ppt的索引
					uploadDate:validate.formatDate('-'),
					rate:1,
					file:v,
					intro:''
				})
				this.newPptIdxsArray.push(this.newPptIdxs)
				this.newPptIdxs ++ //所有已经选择的ppt的集合数
			});
		},
		uploadppt(idx){
			console.log('正在轮询的this.newPptIdxsArray的索引为：'+idx+'，其值为'+this.newPptIdxsArray[idx])

			 //跳过已经删除的ppt
			if(this.newPptIdxsArray[idx] === 'deleted'){  	
				console.log(`------由于对该ppt执行删除操作，正在跳过newPptIdxsArray为${idx}的索引-----\n\n\n\n`)

				/**
				 * 待移入ajax完成的回掉
				 */
				//进入下一个上传 
				this.isUploadPpt++;//正在上传的ppt
	           	if(this.isUploadPpt < this.newPptIdxs){
	           		this.uploadppt(this.isUploadPpt)
	           	}else{
	           		this.pptEmptyChange  = true
	           	}
				return
			}

			

			//上传没有被删除的ppt
  			//用于显示在进度条，如果此ppt已经被删除了，就不执行
			var myNewPptListUploadIdx;   //当前正在准备上传的myNewPptList，的索引
			this.myNewPptList.forEach((v,i)=>{
				if(v.idx===idx){
					myNewPptListUploadIdx = i
				}
			})
			console.log('当前正在准备上传的myNewPptList，的索引'+myNewPptListUploadIdx)

			var file = this.myNewPptList[myNewPptListUploadIdx].file // 此时的与后端交互的file和前端进度条保持一致,
			
			
			// 进入下一个上传
  			
          



			var form = new FormData()
		    form.append('ppt_files',file) //此处填写后端需要的name名
		    var config = { //发送请求配置项
		        onUploadProgress: progressEvent => {
		            var complete = progressEvent.loaded / progressEvent.total * 100 | 0
		           this.myNewPptList[myNewPptListUploadIdx].rate = complete
		        },
		        headers: {'Content-Type': 'multipart/form-data'},
		        cancelToken: new CancelToken(function executor(c) {
				    // executor 函数接收一个 cancel 函数作为参数
				    cancel = c;
				})
		    }

		    axios.post('/pptxzs/uploadppt.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),form, config) //此处为后端接口
		    .then((res) => {
		    		if(res.data.msg === "User or key error"){
		    			validate.reLogin()
		    		}



		    		var data = res.data.data
		    		var pptUrl = data.ppt_url;
					var pptId = data.ppt_id;
					var cover = data.cover
					
					this.myNewPptList[myNewPptListUploadIdx].id = pptId;
					this.myNewPptList[myNewPptListUploadIdx].cover = cover;
					this.isUploadPpt++;//正在上传的ppt
				 	if(this.isUploadPpt < this.newPptIdxs){
		           		this.uploadppt(this.isUploadPpt)
		           	}else{
		           		this.pptEmptyChange = true
		           	}
		      
		    },(err)=>{
				this.isUploadPpt++;//正在上传的ppt
			 	if(this.isUploadPpt < this.newPptIdxs){
	           		this.uploadppt(this.isUploadPpt)
	           	}else{
	           		this.pptEmptyChange = true
	           	}
		    })
		},
		pptDelete(pptId,type){//删除ppt
			this.isShowToast = true
			this.operatePptId = pptId //每次点击,定义当前操作的pptId
			this.operatePptType = type
		},
		pptEdite(pptId,type){//ppt内容编辑

			this.isShowEdite = true
			this.operatePptId = pptId //每次点击,定义当前操作的pptId
			this.operatePptType = type

			if(this.operatePptType === 'old'){ //监听操作的ppt是新的还是旧的，根据id找到索引，找出当前ppt，改变属性
				this.myPptList.forEach((v,i)=>{
					if(v.id === this.operatePptId){
						this.editeIntro = v.intro;
						this.editeTitle = v.title;
						this.editeCover = v.cover;
					}
				})
			}else{
				this.myNewPptList.forEach((v,i)=>{
	                if(v.id === this.operatePptId){
						this.editeIntro = v.intro;
						this.editeTitle = v.title;
						this.editeCover = v.cover;
					}				
				})
			}
			
		},
		toastSubmit(){//删除提交
			this.isShowToast = false
			// var form = new FormData() //只有当有file文件时才用formData，这时请求头就是multipart/form-data
			var config={
				 data: { 'ppt_id': this.operatePptId}
			}
			axios.delete('/pptxzs/pptpicfile.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),config)
			.then(res=>{
				if(res.data.msg === "User or key error"){
	    			validate.reLogin()
	    		} 

				var myPptList = this.myPptList.filter(v=>{
					return v.id != this.operatePptId
				})
				var myNewPptList = this.myNewPptList.filter(v=>{
					return v.id != this.operatePptId
				})
				this.myPptList = myPptList
				this.myNewPptList = myNewPptList
			},err=>{
			})

		},
		toastCancel(){//取消删除
			this.isShowToast = false
		},
		editeSubmit(res){ //编辑提交
			console.log(res) //{title:'',desc:'',imgUrl}
			console.log(this.operatePptId)
			this.isShowEdite = false
			var title = res.title
			var intro = res.desc
			res.ppt_id = this.operatePptId
			
			axios.post('/pptxzs/pptpicfile.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),res,{
				headers: {'Content-Type': "application/x-www-form-urlencoded"} 
			})
			.then(res=>{
				if(res.data.msg === "User or key error"){
	    			validate.reLogin()
	    		}

				if(this.operatePptType === 'old'){
					this.myPptList.forEach((v,i)=>{
						if(v.id === this.operatePptId){
							v.title = title
							v.intro = intro
						}
					})
				}else{
					this.myNewPptList.forEach((v,i)=>{
	                    if(v.id === this.operatePptId){
							v.title = title
							v.intro = intro
						}				
					})
				}
			},err=>{
				alert(err)
			})
		},
		editeCancel(){//取消编辑
			this.isShowEdite = false
		},
		closeGuide(){
			this.isShowEditeGuide = false
		},
		scrollLoad(event){//滚动加载更多
			var wrap = 546;
			var listHeight = 50*16*(this.scrollIdx)
			if(this.uploadmore){
				if(event.target.scrollTop+50>listHeight-wrap){
					this.uploadmore = false


					var returnTrue = () =>{
						this.scrollIdx++;
						this.uploadmore = true;
						console.log(this)
					}
					this.getPptList(this.scrollIdx,returnTrue)
					
				}
			
			}
			
		},
		getPptList(pageNum,callback){//获取个人ppt列表
			var config={
				params: { 
					'page_size':16,
					'page_num':pageNum
				}
			}
			axios.get('/pptxzs/pptpicfile.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),config)
			.then(res=>{
				var arr=[];
				if(res.data.msg === "User or key error"){
	    			validate.reLogin()
	    		}
	    		
			 	// var reg =/\.(pptx|pdf)/g
				res.data.data.ppt_list.forEach((v,i)=>{
						arr[i] = {
							title:unescape(v.title),//将ppt列表的名字去掉后缀名
							id:v.ppt_id,
							uploadDate:v.create_time.split(' ')[0],
							intro:v.desc || '',
							cover:v.cover
						}
				})
				this.myPptList.push(...arr);
				},err=>{
					alert(err)
				})

				callback && callback()
			}
		
	},
	created(){
		if(sessionStorage.getItem('userId')){
			this.getPptList(0)
		}


	}

}
</script>
<style scope>
	.personal-wrap{
		margin-top: 30px;
		position: relative;
	}
	.personal-wrap>div{
		float: left;
		
		box-sizing: border-box;
	}
	.personal-left{
		width: 380px;
		height: 656px;
		margin-right: 30px;
		padding-top: 30px;
		position: relative;
		background-color: #fff;
	}
	.personal-right{
		width: 590px;
		height: 656px;
		background-color: #fff;
	}
	/*拖拽上传*/
	.drag-upload-wrap{
		height: 200px;
	}
	.drag-upload{
		width: 200px;
		height: 200px;
		border-radius: 20px;
		border: dashed 3px #cccccc;
		text-align: center;
		font-size: 20px;
		color: #666;
		padding: 73px 16px 0 16px;
		box-sizing: border-box;
		line-height: 32px;
	}
	.drag-upload-tit{
		display: inline-block;
		font-size:12px;
		color:#999;
		margin:10px 0 30px 90px;
	}
	/*点击上传*/
	.click-upload-wrap{
		width: 320px;
		height: 50px;
		background-color: #6195ff;
		border-radius: 5px;
		text-align: center;
		line-height: 50px;
		margin-left: 30px;
		color: #fff;
		font-size: 22px;
		position: relative;
	}
	.click-upload-btn,.click-upload-input{
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.click-upload-input{
		cursor: pointer;
	}
	/*微信小程序二维码*/
	.wxapp-qr-code{
		margin-top: 50px;
		font-size: 14px;
		color: #353535;
	}
	.wxapp-qr-code img{
		width: 140px;

	}
	.wxapp-qr-code>p{
		margin-top: 20px;
	}
	/*右侧我的中心操作栏*/
	.my-ppt-title{
		height: 60px;
		box-shadow: 0px 1px 0px 0px #eee;
		line-height: 60px;
		color: #353535;
		font-size: 22px;
		padding-left: 20px;
	}
	.myppt-operate-head{
		height: 50px;
		line-height: 50px;
		font-size: 14px;
	}
	.myppt-operate-head li{
		float: left;
		text-align: center;
		font-size: 14px;
		color: #353535; 
	}
	.myppt-container{
		height: 546px;
		overflow-y: scroll;
		overflow-x:hidden;
	}
	
	/*我的ppt内容区*/
	.no-myppt{
		margin-top: 246px;
		text-align: center;
		font-size: 18px;
		color: #999;
	}
	.no-myppt img{
		margin-bottom: 20px;
	}
	.my-ppt-list{
		height: 50px;
		width: 590px;
		position: relative;
		margin-bottom: 1px;
	}
	.my-ppt-list:last-child{
		margin-bottom: 0;
	}
	.my-ppt-list>div{
		position: absolute;
		left: 0;
		top: 0;
	}
	.my-edite{
		position: absolute;
		top: 0px;
		left: 0;
	}
	.edite-guide-mask{
		background-color: rgba(0,0,0,.35);
	}
	.my-edite-guide-container{
		width: 1000px;
		top: 110px;
		background-color: transparent;
	}
	.my-edite-guide{
		position: absolute;
		width: 400px;
		height: 400px;
		background-color: rgba(0,0,0,0);
		right: -10px;
		top: 100px;	
	}
	.close-edite-guide{
		position: absolute;
		width: 134px;
		height: 50px;
		cursor: pointer;
		right: 62px;
		bottom: 20px;
		z-index: 1;

	}
</style>