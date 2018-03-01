<template>
	<div v-show="isShowAblum" class="mask">
		<div class="mask-content ablum-content">
			<div  v-show="chooseDefaultImg" class="ablum-container" >
				<div class="title">
					选择背景图景
				</div>
				<ul  class="img-container clearfloat">
					<li v-for="(pic,picIdx) in  defaultPics" :key="picIdx">
						<img  @click="chooseImga(picIdx)" :src="pic.imgurl" alt="">
						<i v-show="pic.imgChoosed" class="icon-bg choose-img xy-mid"></i>
					</li>
					<li class="self-img">
						<span>自定义</span>
						<input @change="chooseSelfCover" title="选择本地封面图"  type="file">
					</li>
				</ul>
				<div class="ablum-bottom">
					<span>
						<span class="cancel" @click="cancel">取消</span>
						<span class="submit" @click="submit">确定</span>
					</span>
				</div>
			</div>
			<div v-show="chooseSlefImg" class="ablum-container">
				<div class="title">
					裁剪图片
				</div>
				<div class="img-container" style="padding-top:10px;overflow:hidden;" >
					<div class="self-img-container">
						<canvas id="c1"></canvas>
						<i :style="{top:cutBoxDist+'px',height:cutBoxHeight+'px'}" class="icon-bg cut-box" @mousedown="moveStart" @mousemove="move" @mouseup="moveEnd"></i>
					</div>
				</div>
				<div class="ablum-bottom">
					<span>
						<span class="cancel" @click="cancelSelf">取消</span>
						<span class="submit" @click="submit">确定</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			isShowAblum:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				chooseDefaultImg:true,
				chooseSlefImg:false,
				defaultPics:[
					{
						imgurl:require('../../assets/images/background-01.png'),
						imgChoosed:false
					},
					{
						imgurl:require('../../assets/images/background-02.png'),
						imgChoosed:false
					}
					,
					{
						imgurl:require('../../assets/images/background-03.png'),
						imgChoosed:false
					}
					,
					{
						imgurl:require('../../assets/images/background-04.png'),
						imgChoosed:false
					}
					,
					{
						imgurl:require('../../assets/images/background-05.jpg'),
						imgChoosed:false
					}
				],
				
				currentCover:"",
				cutBoxWidth:570,
				cutBoxHeight:264,
				cutBoxY:0,
				beginTop:90,
				cutBoxDist:90,
				cutBoxMove:false

			}
		},
		methods:{
			chooseImga(picIdx){
				this.currentCover = this.defaultPics[picIdx].imgurl;
				this.defaultPics.forEach((v,i)=>{
					v.imgChoosed = false
				})
				this.defaultPics[picIdx].imgChoosed = true;
			},
			cancel(){
				this.$emit('on-cancel')
			},
			submit(){
				if(this.chooseSlefImg){
					var canvas1 = document.getElementById("c1")
				   	var cxt1 = canvas1.getContext("2d")
					var dataImg = cxt1.getImageData(0,this.cutBoxDist,570,this.cutBoxHeight)//2获取到指定位置的ImageData
					var canvas = document.createElement("canvas")//建立一个中间canvas用来图形传递
	   				var cxt2=canvas.getContext("2d")
	   				canvas.width = this.cutBoxWidth;//必须要设置canvas宽高
	        		canvas.height =this.cutBoxHeight;
	   				cxt2.putImageData(dataImg,0,0,0,0,canvas.width,canvas.height)//3在需要显示的另一个canvas绘制图形
	   				var img2 = canvas.toDataURL("image/png");//4将另一个canvas绘制的图形转换成base64模式
	   				this.currentCover = img2
				}
				this.$emit('on-submit',this.currentCover)
			},
			chooseSelfCover(e){ //选择本地图片
				let file = e.target.files[0]


				var  regTestFile = /\.(jpg|jpeg|png)$/gi
				if(!regTestFile.test(file.name)){
					alert('目前支持jpg、jpeg、png格式的图片')
					return
				}
			   	var previewImgUrl = window.URL.createObjectURL(file);
			   	var preveImg = document.getElementById("c1")
			   	preveImg.width = 570;
			   	preveImg.height = 424;
			   	var cxt1 = preveImg.getContext("2d")
			   	var img = new Image()
			   	
			   	img.onload = ()=>{
			   			console.log(preveImg.width*(img.height/img.width))
			   			cxt1.drawImage(img,0,0,preveImg.width,preveImg.width*(img.height/img.width));//1获取到图片后先绘制图片
					   	this.chooseDefaultImg = false
					   	this.chooseSlefImg = true
			   	}
			   

			   	img.src = previewImgUrl
			},
			moveStart(e){ //开始移动剪切板
				console.log(e)
				this.cutBoxY = e.clientY
				this.cutBoxMove = true
			},
			move(e){
				 //移动剪切板
				if(this.cutBoxMove===true){
					this.cutBoxDist = e.clientY-this.cutBoxY+this.beginTop
					console.log(this.cutBoxDist)
				}
			},
			moveEnd(e){ //滑动剪切板
				this.cutBoxMove = false
				this.beginTop = this.cutBoxDist
			},
			cancelSelf(){
				this.chooseDefaultImg = true
			    this.chooseSlefImg = false
			}
		}
		// ,
		// mounted(){
		// 	// console.log(this.chooseImga)
		// }
	}
</script>
<style lang="scss">
.ablum-content{
	width: 600px;
	.ablum-container{
		width: 600px;
		height: 560px;
		
		.title{
			height: 60px;
			line-height: 60px;
			padding-left: 20px;
			font-size: 16px;
			padding-left: 20px;
			color: #353535;
			text-align: left;
			border-bottom: 1px solid #ccc;
		}
		.img-container{
			overflow-y:scroll;
			border-bottom: 1px solid #ccc;
			padding-top: 20px;
			box-sizing: border-box;
			height: 445px;
			li{
				width: 260px;
				height: 118px;
				float:left;
				cursor: pointer;
				margin-bottom: 20px;
				position: relative;
				img{
					width: 260px;
					height: 118px;
				}
				.choose-img{
					background-image: url("../../assets/images/choice.png");
					width: 40px;
					height: 40px;

				}
				
			}
			li:nth-child(2n+1){
					margin: 0 20px 20px 20px;
			}
			.self-img{
				border:1px solid #ccc;
				line-height: 118px;
				color: #6195ff;
				font-size: 14px;
				position: relative;
				input{
					position: absolute;
					width: 100%;
					height: 100%;
					left:0;
					top:0;
					opacity: 0;
					cursor: pointer;
				}

			}
		}
		.self-img-container{
			background-color: #353535;
			position: relative;
			padding-top: 0;
			padding-left: 0;
			overflow-y: visible;
			margin-left: 10px;
			width: 580px;
			height: 444px;
			.cut-box{
				width: 570px;
				height: 264px;
				background-image: url('../../assets/images/cut-box.png') ;
				position: absolute;
				top:91px;
				left:5px;
				cursor: move;
			}
		}
		.ablum-bottom{
			height: 50px;
			line-height: 50px;
			text-align: right;
			padding-right: 20px;
			.submit,.cancel{
				display: inline-block;
				width: 80px;
				height: 30px;
				border-radius: 2px;
				border: solid 1px #bbbbbb;
				float: right;
				line-height: 30px;
				text-align: center;
				font-size: 18px;
				margin-top: 10px;
				cursor: pointer;
			}
			.submit{
                background-color: #5786e5;
				color: #fff;
				margin-right:20px;
			}
			.cancel{
				margin-left: 10px;
				margin-right: 14px;
			}
		}
		
	}
}
</style>