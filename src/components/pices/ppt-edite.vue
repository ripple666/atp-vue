<template>
	<div class="edite-container">
		<div class="ppt-edite-wrap">
			<div class="title-wrap">
				<label for="">标题：</label>
				<input class="title-input" @keyup="changeTitle" @blur="changeTitle" v-model.trim="title_data"  placeholder="请需要输入您需要修改的标题（20字以内）" type="text">
			</div>
			<!-- <div class="cover-wrap">
				<label for="">封面图片：</label>
				<canvas class="coverimg" id="cover"></canvas>
				<span class="chooseImgBtn">
					<span  @click="showAblum">选择图片</span>
					<input class="attach-input" type="checkbox" @change="changeTitle" id="checkbox" v-model="attchChecked">
					<label class="attach-label"    for="checkbox">附上标题</label>
				</span>
			</div> -->
			<div class="intro-wrap">
				<label for="">简介：</label>
				<textarea @focus="clearPlacehold" @blur="putPlacehold" v-model.trim="intro_data"  name="" id="" class="ppt-textarea" :placeholder="textPlaceholder"></textarea>
			</div>
			<div class="ppt-operate">
				<span class="ppt-operate-submit" @click="submit">完成</span>
				<span class="ppt-operate-cancel" @click="cancel">取消</span>
			</div>
		</div>
		<!--  -->
		<ablum  v-show="isShowAblum" @on-cancel="cancelAblum" @on-submit="submitAblum"></ablum>
	</div>
</template>
<script>
import ablum from '@/components/pices/ablum.vue'
import axios from 'axios'
import {validate} from '@/assets/js/validate' //注意路径
	export	default{
		components:{ablum},
		props:{
			title:{
				type:String,
				default:''
			},
			intro:{
				type:String,
				default:''
			},
			cover:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				textPlaceholder:"请输入一段文字来介绍一下您的ppt吧",
				isShowAblum:false,
				title_data:'',
				intro_data:'',
				attchChecked:true,
				dataUrl:'',//canva绘制完成后的base64编码
				fileType:'',//文件类型
				cover:require('../../assets/images/background-01.png')
			}
		},
		computed:{
		},
		watch:{
			title:{ //有与双向绑定只能监听data里面的数据，而我要绑定父组件的数据，所以监听从父组件过来的数据变化，把值赋给data,来实现双向绑定
				handler(val){
					var reg =/\.(pptx|potx|ppt|pot|pdf|pptm|potm|ppsx|ppsm|pps|ppam|ppa)$/gi
					this.title_data = val.replace(reg,'')
					this.fileType = val.substring(val.lastIndexOf('.'))
				}
			},
			intro:{
				handler(val){
					this.intro_data = this.intro
				}
			}
		},
		methods:{
			clearPlacehold(){
				this.textPlaceholder = ''
			},
			putPlacehold(){
				this.textPlaceholder = "请输入一段文字来介绍一下您的ppt吧"
			},
			submit(){
				var data = {
					title:this.title_data+this.fileType,desc:this.intro_data
				}
				if(!this.title_data){
					alert('请输入标题')
					return
				}
				// 点击确定将base64转成file文件发送至服务端
				// var form=document.forms[0];
				// var formData = new FormData(form);   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
				//  //convertBase64UrlToBlob函数是将base64编码转换为Blob
				// var file = validate.convertBase64UrlToBlob(this.dataUrl)
				// formData.append("ppt_files",file);  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
				// axios.post('/pptxzs/uploadppt.json?user_id='+sessionStorage.getItem('userId')+'&user_key='+sessionStorage.getItem('userKey'),formData,{
				// 	 headers: {'Content-Type': 'multipart/form-data'}
				// }).then(res=>{
				// 	console.log(res)
					
				// })

				this.$emit('on-edite-submit',data)
			},
			cancel(){
				this.$emit('on-edite-cancel')
			},
			showAblum(){
				this.isShowAblum = true;
			},
			// ,
			// chooseCover(e){
			// 	let files = e.target.files
			// 	var file = files[0]



			// 	var form = new FormData()  //上传文件到服务端
			// 	form.append('files',form)
			// 	axios.post('/',form,{
			// 		 headers: {'Content-Type': 'multipart/form-data'}
			// 	}).then(res=>{
			// 		var data = res.data.data
			// 		this.cover = data.cover
			// 	},err=>{

			// 	})
		
			// },
			changeTitle(){
				// this.setTextInCanvas()
			},
			cancelAblum(){
				this.isShowAblum = false
			},
			submitAblum(cover){
				this.cover = cover
				// this.setTextInCanvas()
				this.isShowAblum = false
			},
			setTextInCanvas(title){
				var canvas = document.getElementById('cover')
				var ctx = canvas.getContext("2d")
				var img = new Image();
		        img.onload  =()=>{
		        	var width = img.width;
		        	var height = img.height;
		        	canvas.width = width
		        	canvas.height = height
		            ctx.drawImage(img,0,0,width,height)
		            if(!this.attchChecked){
		            	return
		            }
		            var title = this.title_data 
		            ctx.font="30px microsoft yahei";  //定义水印样式
					ctx.fillStyle = "rgba(255,255,255,0.8)";
					ctx.textAlign = "center"
					ctx.textBaseline = "middle"
			
					var lineheight = 40;//canvas换行
					for(var i = 1; validate.getTrueLength(title) > 0; i++){
			            var tl = validate.cutString(title, 25);
			            ctx.fillText(title.substr(0, tl).replace(/^\s+|\s+$/, ""), width/2, i * lineheight + 50);
			            title = title.substr(tl);
			        }
					
					var dataUrl = canvas.toDataURL("image/png"); //生成base64
					this.dataUrl = dataUrl
		        }
		        img.src = this.cover;
			}
		},
		created(){
			this.title_data  = this.title
			this.intro_data = this.intro
		},
		mounted(){
			// this.setTextInCanvas()
		}
	}
</script>
<style scope>
	.edite-container{
		height: 675px;
		width: 1000px;
		background-color: #fff;
		position: relative;
	}
	.ppt-edite-wrap{
		position: absolute;
		width: 800px;
		left: 50%;
		padding-top: 30px;
		transform: translateX(-50%);
	}
	.title-wrap{
		margin-bottom: 70px;
	}
	.intro-wrap{
		margin-bottom: 100px;
	}
	.title-wrap label{
		margin-top: 6px;
	}
	.title-input{
		width: 420px;
		height: 30px;
		line-height: 30px;
		background-color: #fafafa;
		border-radius: 5px;
		border: solid 1px #999999;
		padding-left: 20px;
		font-size: 14px;
		color: rgba(0,0,0,0.8);
	}
	.ppt-edite-wrap>div>label{ 
		display: inline-block;
		width:110px;
		text-align: right;
		font-size: 16px;
		height: 30px;
		line-height: 30px;
		color: #666666;
		vertical-align: top;
	}
	.ppt-textarea{
		width: 600px;
		height: 200px;
		font-size:14px;
		background-color: #fafafa;
		border-radius: 5px;
		border: solid 1px #999999;
		padding: 20px 0 0 20px;
		color: rgba(0,0,0,0.8);
		font-family: "微软雅黑";

	}
	.ppt-operate {
		text-align: center;
	}
	.ppt-operate span{
		display: inline-block;
		width: 180px;
		height: 50px;
		background-color: #6195ff;
		border-radius: 6px;
		color: #fff;
		font-size: 22px;
		line-height: 50px;
		cursor: pointer;
	}
	.ppt-operate-submit{
		margin-right: 40px;
	}
	.ppt-operate-cancel{
		margin-left: 40px;
	}
	.cover-wrap{
		position: relative;
		margin-bottom: 30px;
	}
	.coverimg{
		width: 353px;
		height: 160px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.cover-wrap span{
		vertical-align: bottom;
		margin-left:5px;
		color: #6195ff;
		cursor: pointer;
	}
	.chooseImgBtn{
		display: inline-block;
		width: 200px;
		height: 40px;
		line-height: 50px;
	}
	.attach-input{
		vertical-align: middle;
		margin-left: 20px;
	}
	.attach-label{
		cursor: pointer;
	}
	
</style>