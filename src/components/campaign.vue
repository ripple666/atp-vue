<template>
	<div id="campaign">
			<div class="w100c" style="position:relative;">
				<div class="title">{{en?'The First Decentralized Ad Campaign':'你的第一次去中心化广告体验'}}</div>
				<div class="container" :style="isMobile?{marginLeft:campaignMarginLeft}:''">
					<div class="first clearfloat">	
						<div class="advertises">
						 	<div class="advertises-text">	
						 		<span>{{en?'Advertisers':'广告主'}}</span>
						 		<i class="circle" style="background-color:#FFBD2E; margin-left:9px"></i>
						 	</div>
							<!-- advertise -->
						 	<div  class="advertises-content"   @click="advertise">	
								<img class="advertises-img" src="../assets/images/adv.png" alt="">
								<transition
									    v-on:leave="advertisesLeave"
									 >
									<div class="advertises-content-text"   id="ad-cont" v-if="isShwoAdBox" >
										<span @click="advertise">{{adText}}</span>
										<!-- <transition
										    v-on:leave="leaveFinger"
										 > -->
											<i v-show="isShowFinger" class="icon-bg finger" ></i>
										<!-- </transition> -->
									</div>
								</transition>	
								<img class="retry" v-if="isRetry" style=""  src="../assets/images/retry.svg" alt="">
								<span  class="advertises-content-text change-text" style="z-index:1000;color: #8c8c8c;" v-show="isPubText&&!isShowMidMatch&&!isMatch">{{publisText}}</span>
								<img class="enter" id="ad-6"  :src="adImgs[1]" v-show="isMatch&&!isRetry" alt="">
								<img class="enter" id="ad-5"  :src="adImgs[2]" v-show="isMatch&&!isRetry" alt="">
								<img class="enter" id="ad-4"  :src="adImgs[3]" v-show="isMatch&&!isRetry" alt="">
								<img class="enter" id="ad-3"  :src="adImgs[4]" v-show="isMatch&&!isRetry" alt="">
								<img class="enter" id="ad-2"  :src="adImgs[5]" v-show="isMatch&&!isRetry" alt="">
								<img class="enter" id="ad-1"  :src="adImgs[1]" v-show="isMatch&&!isRetry" alt="">
						 	</div>
						</div>
						<!-- publish -->
						<div class="contract">	
							<div class="mobile-yes contract-text">	
								<i  class="circle " style="background-color:#3CBAC6; margin-right:9px"></i>
						 		<span>{{en?'Publishers':'推广者'}}</span>
						 	</div>	

								<div class="contract-content" >	
									<img  class="contract-img" src="../assets/images/pub.png" alt="">
									<span style="" v-show="!isShowMidMatch&&!isMatch">{{publisText}}</span>
							 	</div>

								<img class="enter" id="pub-6"  :src="pubImgs[1]" v-show="isMatch" alt="">
								<img class="enter" id="pub-5"  :src="pubImgs[4]" v-show="isMatch" alt="">
								<img class="enter" id="pub-4"  :src="pubImgs[5]" v-show="isMatch" alt="">
								<img class="enter" id="pub-3"  :src="pubImgs[2]" v-show="isMatch" alt="">
								<img class="enter" id="pub-2"  :src="pubImgs[3]" v-show="isMatch" alt="">
								<img class="enter" id="pub-1"  :src="pubImgs[4]" v-show="isMatch" alt="">
							 <!-- 	<transition 
									 v-on:enter="pubEnter"
									>
									<img class="enter"  :src="pubImgs[pubRandomNum]" v-show="isShowMidMatch&&isMatch" alt="">
								</transition> -->
							 	<!-- <div v-if="!isShwPubBox" class="contract-content"></div> -->
						 
							<div  class="mobile-no contract-text">	
								<i  class="circle" style="background-color:#3CBAC6; margin-right:9px"></i>
						 		<span>{{en?'Publishers':'推广者'}}</span>
						 	</div>	
						</div>
					</div>
					<div class="second">
						<transition
						    v-on:enter="enter1"
						    v-on:leave="leave1"
						  >
						 	 <span v-if="isShowLin1" class="line line1"></span>
						 </transition>
						<transition
						    v-on:enter="enter2"
						    v-on:leave="leave2"
						  >
							<span  v-if="isShowLin2" class="line line2"></span>
						</transition>
						<transition
						    v-on:enter="enter3"
						  >
							<span  v-if="isShowLin3" class="line line3"></span>
						</transition>
						<!-- 
						<i class="icon-bg circle">
							<img :class="{rotate:isRotate}" src="../assets/images/match point.png" alt="">
						</i> -->
						<i class="icon-bg circle">
							<transition 
								  v-on:enter="matchEnter"
								>
								<img class="enter"  id="enter-match" :src="imgs[matchIndex]" v-show="isShowMidMatch&&isMatch" alt="">
							</transition>
							<transition 
								  v-on:enter="matchLeaveEnter"
								>
								<img id="leave-match" style="top:15px;opacity:0" class="enter" v-show="isShowMidLeaveMatch&&isMatch" :src="imgs[LeaveMatchIndex]"  alt="">
							</transition>
						</i>

						<div class="right">
							<transition
							    v-on:enter="matchStepEnter"
							  >
								<div class="step1" id="match-step" v-if="isShowMidMatch&&isMatch">
									<i class="icon-bg"></i>
									<span :style="matchIndex==5&&!en?{width:'45px'}:{}">
										{{matchArr[matchIndex]}} 
									</span>
									<br v-if="isMobile&&en" >
									<a  target="_blank" v-show="matchIndex==5" style="vertical-align: middle;" :href="'https://explorer.nebulas.io/#/tx/'+tx_id">{{en?'View ad transaction data.':'查看交易记录'}}</a>
								</div>
							</transition>
						</div>
					</div>
				</div>
				<div class="third">
					<img  class="img-bg" id="ad-img-bg"  style="width:526px;height:300px;" src="../assets/images/user.png" alt="">
					<div class="ad-img-content"  >
						<transition
							   v-on:enter="showAdImg"
							  >
							<img id="ad-img" :src="adImgUrl" class="ad-img" v-show="isShowAdImg" alt="">
						</transition>
					</div>
				</div>
				<div class="users">
					<i></i>
					<span>{{en?'Users':'用户'}}</span>
				</div>
				<div class="bottom" style="">

					<a target="_blank" :href="githubHref">{{en?'View code on Github.':'想了解更多？查看详细代码'}}</a>
				</div>
			</div>
		</div>
</template>
<script>
import axios from 'axios'
import $ from 'jquery'
import  Velocity from 'velocity-animate'
export default{
	props:{
		en:{
			type:Boolean,
			default:true
		},
		mobile:{
			type:Boolean,
			default:false
		},
		campaignPosition:{
			type:String,
			default:''
		}
	},
	data(){
		return{
			isMobile:false,
			campaignMarginLeft:'opx',
			isPubText:false,
			isRetry:false,
			isMatch:false,
			matchIndex:0,
			LeaveMatchIndex:0,
			isShowMidMatch:false,
			isShowMidLeaveMatch:false,
			adText:'Publish an Ad',
			isShwoAdBox:true,
			isShowLin1:false,
			isShowLin2:false,
			isShowLin3:false,
			isShowFinger:true,
			isRotate:false,
			ishowMatchStep:true,
			isShowAdImg:false,
			adImgUrl:require('../assets/images/ad-01.svg'),
			publisText:'Waiting for Ad…',
			tx_id:'979143c9d3138f6f703792c129f1b7edde21ce2fbf92be1f6840ba0c82eb3746',
			contract_add:"e697a66efb237211d574bc964047c9d06ae221022b6c3fe0",
			pic_url:'https://mobo-bkc.s3-ap-southeast-1.amazonaws.com/atlasp/file/ad-01.svg',
			githubHref:'#',
			imgs:[
				require('../assets/images/matching.svg'),
				require('../assets/images/analysis.svg'),
				require('../assets/images/conversion.svg'),
				require('../assets/images/payment.svg'),
				require('../assets/images/tracking.svg'),
				require('../assets/images/matching.svg'),
			],
			publishImgs:[
				require('../assets/images/matching.svg'),
				require('../assets/images/analysis.svg'),
				require('../assets/images/conversion.svg'),
				require('../assets/images/payment.svg'),
				require('../assets/images/tracking.svg'),
				require('../assets/images/matching.svg'),
			],
			matchArr:[
				'Calculating Ranking ...','Matching.','Matching..','Matching...','Matching.','Success!'
			],
			adImgs:[
				require('../assets/images/AD_1.png'),
				require('../assets/images/AD_2.png'),
				require('../assets/images/AD_3.png'),
				require('../assets/images/AD_4.png'),
				require('../assets/images/AD_5.png'),
				require('../assets/images/AD_1.png')
			],
			pubImgs:[
				require('../assets/images/pub_1.png'),
				require('../assets/images/pub_2.png'),
				require('../assets/images/pub_3.png'),
				require('../assets/images/pub_4.png'),
				require('../assets/images/pub_5.png'),
				require('../assets/images/pub_1.png')
			],
			erci:false,
			isClick:true
		}
	},
	computed:{
		matchNextIndex(){
			return this.matchIndex >= 5 ? 0 : this.matchIndex+1
		}
	},
	watch:{
		matchIndex:{
			handler(val){
				if(val === 5){
					this.clearInv()
					this.rotate = false
					this.isRotate = false
					this.publisText = this.en?'Success!':'成功'
				}
			}
		},
		mobile:{
			handler(val){
				this.isMobile = val
			}
		},
		campaignPosition:{ //属性不能变化，只有监听属性变化从而改变data变化实现数据绑定
			handler(val){
				this.campaignMarginLeft = val
			},
			deep: true
		}
	},
	methods:{
		advertise(event){
			if(!this.isClick){
				return
			}
			this.isClick = false
			this.matchIndex = 0
			this.LeaveMatchIndex = 0
			this.isShowFinger = false
			this.isRetry = false
			this.isShowAdImg = false
			this.ishowMatchStep=false
			this.isShowLin3 = false
			this.isPubText = true
			this.isShwoAdBox = false
			this.isMatch = false
			this.isShowMidMatch = false
			this.isShowMidLeaveMatch = false
			this.publisText=this.en?'Waiting...':'等待...'

			$('#enter-match').css({
				opacity:0,
				top:'80px'
			})
			$('#pub-1').add('#pub-2').add('#pub-3').add('#pub-4').add('#pub-5').add('#pub-6').css('opacity',1)
			$('#ad-1').add('#ad-2').add('#ad-3').add('#ad-4').add('#ad-5').add('#ad-6').css('opacity',1)
			if(this.erci){
				this.isShowLin1 = true
				this.isShowLin2 = true
			}
			document.getElementById('ad-img').style.top = '-360px'
			document.getElementById('ad-img').style.opacity = 0
			
			$('#match-step').css({
				opacity:0
			})
			this.getAdData()
		},
		advertisesLeave(el,done){
			$(el).animate( { opacity:'0' }, { 
				duration:200 ,
				complete:()=>{
					this.isShowLin1 = true
					this.isShowLin2 = true
				}
			})
		},
		pubEnter(el,done){
			$('#ad-1').animate({
				opacity:0
				},{
				duration:1000 ,
				complete:()=>{
					$('#ad-2').animate({
						opacity:0
						},{
						duration:1000 ,
						complete:()=>{
							$('#ad-3').animate({
								opacity:0
								},{
								duration:1000 ,
								complete:()=>{
									$('#ad-4').animate({
										opacity:0
										},{
										duration:1000 ,
										complete:()=>{
											$('#ad-5').animate({
												opacity:0
												},{
												duration:1000 ,
												complete:()=>{
													
												}
											})
										}
									})
								}
							})
						}
					})
				}
			})
			$('#pub-1').animate({
				opacity:0
				},{
				duration:1000 ,
				complete:()=>{
					$('#pub-2').animate({
						opacity:0
						},{
						duration:1000 ,
						complete:()=>{
							$('#pub-3').animate({
								opacity:0
								},{
								duration:1000 ,
								complete:()=>{
									$('#pub-4').animate({
										opacity:0
										},{
										duration:1000 ,
										complete:()=>{
											$('#pub-5').animate({
												opacity:0
												},{
												duration:1000 ,
												complete:()=>{
													
												}
											})
										}
									})
								}
							})
						}
					})
					
				}
			})
		},
		enter1(el,done){
			if(this.isMobile){
				$(el).animate({
					width:'82px'
				},{
					duration:800
				})
				return
			}
			Velocity(el, { width: '120px' }, { duration:800 })
		},
		leave1(el,done){
			if(this.isMobile){
				$('.line1').animate({
					opacity:0
				},{
					duration:800
				})
				return
			}
			Velocity(el, { opacity:0 }, { duration: 800 })
		},
		enter2(el,done){

			const that = this
			console.log(that.isMobile)
			function donecb(){
				that.isPubText = true
				that.publisText = that.en?'Matching…':'撮合中…'
				that.isMatch = true
				that.pubEnter()
				that.ishowMatchStep = true
				that.runInv();
			}
			if(that.isMobile){
				$(el).animate({
					width:'87px'
				},{
					duration:800,
					complete:()=>{
						donecb()
					}
				})
				return
			}
			Velocity(el, { width:'120px' }, { 
				duration: 800,
				complete:()=>{
					donecb()
				}
			})
		},
		leave2(el,done){
			const that = this;
			function cb(){
				that.isShowLin3 = true
			}
			if(this.isMobile){
				$(el).animate({
					opacity:0
				},{
					duration:800,
					complete:function(){
						cb()
					}
				})
				return
			}
			Velocity(el, { opacity:0 }, { duration: 800,complete:function(){
				cb()
			} })
		},
		enter3(el,done){
			const that = this
			function donecb(){
				that.isShowAdImg = true
			}
			if(this.isMobile){
				$('.line3').animate({
					width:'60px'
				},{
					duration:800,
					complete:()=>{
						donecb()
					}
				})
				return
			}
			Velocity(el, { width:this.isMobile?'60px':'55px'}, { duration:800,complete:()=>{
				donecb()
			}})
		},
		matchEnter(el){
			const that = this;
			$(el).animate({
				opacity:1,
				top:'15px'
			},{
				duration:300,
				complete:()=>{
					if(that.matchIndex!==5){
						$(el).animate({
							opacity:0,
							top:'80px'
						},{
							duration:0,
							complete:function(){
								
							}
						})
					}else{
						this.isShowLin1 = false //中间切换掉上面两个线
						this.isShowLin2 = false
					}
					
				}
			})
		},
		matchLeaveEnter(el){
			const that = this
			$(el).animate({
				opacity:1
			},{
				duration:0,
				complete:function(){
					if(that.LeaveMatchIndex ===5 ){
						return
					}
					$(el).delay(350).animate({
						opacity:0,
						top:'0'
					},{
						duration:300,
						complete:function(){
							$('#leave-match').css({
								top:'15px',
								opacity:0
							})
						}
					})
				}
			})
		},
		matchStepEnter(el,down){
			const that = this;
			if(that.matchIndex>1&&that.matchIndex<5){
				$(el).animate({
					opacity:1,
					top:that.isMobile?'20px':'0px'
				},{
					duration:0,
					complete:()=>{
					}
				})
				return
			}
			$(el).animate({
				opacity:1,
				top:that.isMobile?'20px':'0px'
			},{
				duration:300,
				complete:()=>{
					if(that.matchIndex===5  || that.matchIndex===1){
						return
					}
					$(el).delay(300).animate({
						opacity:0,
						top:that.isMobile?'10px':'-12px'
					},{
						duration:200,
						complete:function(){
							$(el).css('top','50px')
						}
					})
				}
			})
		},
		showAdImg(el,done){
			$('#ad-img-bg').css(
				'box-shadow','rgb(231, 68, 112) 0px 0px 15px'
			)
			setTimeout(()=>{
				$('#ad-img-bg').css(
					'box-shadow','rgb(166, 166, 166) 0px 0px 15px'
				)


				$('#ad-img').animate({ 
					top:'0px',
					opacity:1
				}, { 
					duration:1000,
					complete:()=>{
						setTimeout(()=>{
							this.isPubText = false
							this.isRetry = true
							this.isShwoAdBox = false

							this.adText = 'Retry'
							
							this.isShowFinger=true
							this.isRotate=false
							this.erci = true

							this.isClick = true
							
						},2000)
					}
				})
			},400)
		},
		getAdData(){ //发送请求
			// const that = this
			// axios.post('http://52.77.243.94/bkc/bkc.json')
			// .then(res=>{
			// 	const data = res.data.data 
			// },err=>{

			// })
		},
	    runInv () {
    	  	setTimeout(()=>{
    	  		this.isShowMidLeaveMatch = true
	    	    this.midInv = setInterval(() => {
		      			this.isShowMidLeaveMatch = false
		      			this.LeaveMatchIndex ++
						setTimeout(()=>{
							this.isShowMidLeaveMatch = true
						},10)
		        },750)
    	  	},300)
	    	this.isShowMidMatch = true
		    this.invId = setInterval(() => {
      			this.isShowMidMatch = false
      			this.matchIndex ++
				setTimeout(()=>{
					this.isShowMidMatch = true
				},10)
		     },750)
	    },
	    clearInv () {
	      clearInterval(this.invId)
	      clearInterval(this.midInv)
	    }
	},
	created(){
		this.campaignMarginLeft = ($(window).width()-362)/2+'px'
		this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width()<720
		if(!this.en){
			this.matchArr = ['计算Ranking分数中...','撮合中.','撮合中..','撮合中...','撮合中.','成功!']
			this.publisText = '广告位虚位以待...'
			this.adText = '发布广告'
		}
	},
	mounted(){
		console.log('campaign')
	}

}
</script>


<style>
	#campaign{
		background-color: #fff;
		position: relative;
	}
	#campaign .users i{
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		vertical-align: middle;
		background-color:  #E75977;
	}
	#campaign{
		padding: 123.3px 0 54px 0;
	}
	#campaign .title{
		font-size: 3.3vh;
		margin-bottom: 41px;
	}
	#campaign .finger{
		width:41px;
		height: 42px;
		position: absolute;
		right:-20px;
		top: 14px;
		background-image:url(../assets/images/finger.gif)
	}
	#campaign .first{

	}
	#campaign .first>div{
		float: left;
		height: 184px;
		line-height: 220px;
	}
	#campaign .first .advertises{
		margin-right: 53.5px;
		min-width: 460px;
	}
	#campaign .first .advertises>div{
		float: left;
		height: 22px;
		
	}
	#campaign .first .advertises-text{
		/*margin:0 12.5px 0 113px  ;*/
		width: 233px;
		text-align: right;
	}
	#campaign .first .advertises-content{
		width: 224px;
		height: 140px !important;
		position: relative;
	}
	#campaign .advertises-content .enter,#campaign .contract .enter{
		position: absolute;
		width: 40px;
		top:94px; 
		left: 109px;
	}

	#campaign .first .advertises-content .retry{
		position: absolute;
		 z-index: 1111; 
		 width: 33px; 
		 top:94px; 
		 left: 109px;
		 cursor:pointer
	}
	#campaign .first .advertises-content span{
		font-size: 14px;
		z-index:10;

	}
	#campaign .first .advertises-img {
		width: 253px;
		position: absolute;
		left: 0;
		top: 0;
	}
	#campaign .first span.change-text{
		background-color:#fff  ;
		color:#000  ;
		font-size: 15px;
	}
	#campaign .contract{

		position: relative;
	}
	#campaign .contract>div{
		float: left;
		line-height: 21px;
		text-align: center;
		padding-top: 102px;
		box-sizing: border-box;
	}
	#campaign .contract-content{
		position: relative;
		width: 253px;
		margin-right: 3px;
		text-align: center;
	}
	#campaign .contract-content span{
		font-size: 15px;
		z-index:10;
		color: #8c8c8c;
		position: absolute;
		left:50%;
		width: 140px;
		transform: translateX(-50%);
	}
	.advertises-content-text{
		position: absolute;
		width:130px;
		height: 31px;
		line-height: 16px;
		background-color: #000;
		color: #fff;
		padding: 3px 6px;
		border-radius: 4px;
		left:60px;
		top:95px;
		line-height: 31px;
		cursor: pointer;
	}
	#campaign .contract-img{
		width: 253px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
	}
	#campaign .first .circle{
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;

	}
	#campaign .second{
		position: relative;
		height: 142px;
	}
	#campaign .second .line{
		display: inline-block;
		height: 1px;
		width:0;
		background-color:#000;
		position: absolute;
		z-index: 1;
		transform-origin: 0 0;
	}
	#campaign .second .line1{
		left: 362px;
		transform: rotate(26deg);
		width:0;
	}
	#campaign .second .line2{
		left: 640px;
		width:0;
		top: 3px;
		transform: rotate(155deg);
	}
	#campaign .second .line3{
		transform: rotate(90deg);
		left: 500px;
		width:0;
		top: 108px;
	}
	#campaign .second .circle{
		background-image: url(../assets/images/combined_shape.svg);
		width: 68px;
		height: 77px;
		margin-top: 32px;
		position: relative;
	}
	#campaign .second .circle img{
		position: absolute;
	    width: 45px;
	    height: 46px;
		top:80px;
		left: 50%;
		opacity: 0;
		transform: translateX(-50%);
	}

	#campaign .second .right{
		width: 160px;
		position: absolute;
		text-align: left;
		left: 550px;
		top: 64px;
	}
	#campaign .second .right>div{
		margin-bottom: 5px;
		opacity: 0;
		position: absolute;
		width:330px;
	}
	#campaign .second .right a{
		font-size: 14px;

	}
	#campaign .second .right .step1{
		left: 40px;
		top:50px;
	}
	#campaign .second .right i{
		width: 14px;
		height: 14px;
		background-image: url(../assets/images/success.png);
	}
	#campaign .second .right span{
		vertical-align: middle;
		font-size: 14px;
	}
	#campaign .third{
		position: relative;
		margin-bottom: 30px;
	}
	#campaign .third .img-bg{
		border-radius: 22px;
		box-shadow: rgb(136, 136, 136) 0 0 15px;
	}
	.ad-img-content{
		position: absolute;
		overflow: hidden;
		top: 33px;
		height: 331px;
		width: 100%;
	}
	#campaign .third img.ad-img{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -360px ;
		opacity:0;
		width: 528px;
	}
	#campaign .bottom{
		font-size:15px;
		margin-top:118px;
	}

		



@media screen and (max-width: 720px){
	.mobile-yes{
		display: block;
	}
	.mobile-no{
		display: none;
	}

	#campaign {
		padding: 50px 0 40px;
	}
	#campaign .title{

		font-size: 23.02px;
	}
	#campaign .first>div{
		line-height: 90px;
		height: 142px;
	}
	#campaign .first .advertises-text{
		width: 100%;
		margin-left: 0;
		text-align: center;
	}
	#campaign .first{
	}
	#campaign .first>div{
	}
	#campaign .first .advertises{
		width: 140px;
		min-width: auto;
		margin-right:40px;
		margin-left: 8px;
	}
	#campaign .first .advertises>div{
		height: auto;
		line-height: 22px;
		width: 100%;
		margin-right: 0;
		padding-left: 10px;

	}
	#campaign .first .change-text{
		background-color:#fff;color:#000;font-size: 14px !important;
	}
	#campaign .first .advertises-content,#campaign .contract-content{
		width: 150px;
		height:100%;
	}
	#campaign .first .advertises-content .retry{
		position: absolute;
		 z-index: 1111; 
		 width: 28px; 
		 top:49px; 
		 left: 61px;
		 cursor:pointer
	}
	#campaign .advertises-content .enter, #campaign .contract .enter{
 		width: 26px;	
	    top: 73px;
	    left: 62px;
	}
    #campaign .advertises-content .enter{
   	top:53px;
    }
   #campaign .second .right a{
	   	font-size: 11px;
	   	display: inline-block;
		text-indent: -20px;
   }
	#campaign .first .advertises-img{
		width: 100%;
	}
	#campaign .contract{
		width: 140px;
	}
	#campaign .container{
		width: 330px;
		box-sizing: border-box;
	}
	#campaign .contract > div {
		padding-top: 0;
	}
	
	#campaign .contract .contract-text{
		text-align: center;
		width: 100%;
		text-indent: 10px;
	}
	#campaign .contract-img{
		width: 100%;
	}

	.advertises-content-text{
		width: 64px;
		font-size: 12px;
		height: 20px;
		line-height:20px;
		left: 36px;
		top: 50px;
	}
	#campaign .finger{
		width: 30px;
		height:31px;
		right: -18px;
		top: 11px;
	}
	#campaign .contract-content span{
		margin-left: 0;
		display: inline-block;
		margin-top: 54px;
		font-size: 14px;
	}
	#campaign .first .circle{
	
	}
	#campaign .second .right{
		left:226px;
		
	}
	#campaign .second .right span{
		vertical-align: middle;
		font-size: 10px;
		display: inline-block;
		width: 150px;
	}
	#campaign .second .right .step1{
		left:-6px;
		top:40px;
	}
	#campaign .second .line1{
		left:83px;
		width: 0px;
		top: -12px;
		transform: rotate(43deg);
	}
	#campaign .second .line2{
		left:271px;
		top: -11px;
		width: 0px;
		transform: rotate(138deg);
	}
	#campaign .second .line3{
		left:175.5px;
		opacity: 1;
		width:0px;
		top: 99px;
		transform: rotate(90deg);
	}
	#campaign .second .circle{
		margin-top: 25px;
			position: absolute;
			left: 141px;

	}
	#campaign .third{
		/*margin-top: 320px;*/
	}
	#campaign .third>img{
		width: 327px !important;
		height: 197px !important;
	}
	#campaign .third img.ad-img{
		width: 329px !important;
		
		height: auto !important;
	

	}
	#campaign .first .advertises-content span{
		font-size: 10px;
		z-index:10;
	}
	#campaign .bottom{
		font-size:15px;
		margin-top:58px;
	}
	.ad-img-content{
		height: 168px;
		top: 31px;
	}
	
}
</style>