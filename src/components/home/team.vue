<template>
	<div id="team">
		<div class="w100c">
			<div class="title">{{en?'Team':'团队'}}</div>
			<div class="content">
				<ul class="content-ul clearfloat">
					<li v-for="(person,index) in team">
						<img class="head-img-url" :src="person.headImgUrl" alt="">
						<div class="name">{{person.name}}</div>
						<div  class="title">{{person.title}}</div>
						<div class="intro">
							<p v-for="text in person.intro">{{text}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			en:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				team:[

					{
						headImgUrl:require('../../assets/images/team-liutiefeng.png'),
						name:'Tiefeng Liu',
						title:'Founder & CEO',
						intro:['Founder and former CEO of Dolphin Browser, which has over 200 million global users.',
							   'Former CTO of Dolphin Browser.',
                               'Former Senior Software Engineer of Microsoft Research Asia.',
                               'Author of Beauty of Programming, a decade-long bestseller, dubbed as “Bible for Microsoft Interviews”.',
                               'Member of W3C Global Standardization Committee.']
					},
					{
						headImgUrl:require('../../assets/images/team-liuduran.png'),
						name:'Duran Liu',
						title:'Co-founder & CTO',
						intro:['Director of the Nebulas Labs.',
							   'Former Senior Software Engineer in Google’s US headquarter, initiating and overseeing multiple machine learning projects in Google.',
                               'Senior Software Engineer in FreeWheel (acquired by Comcast), initiating and developing FreeWheel’s mobile video Ad network.',
                               'Former software engineer in the web2.0 team of  IBM China Development Lab.',
                               'Rich experience in Internet and blockchain technology development.']
					},
					{
						headImgUrl:require('../../assets/images/team-liuleiyu.png'),
						name:'Leiyu Liu',
						title:'Co-founder & VP of Operation',
						intro:['Former Manager of Dolphin Browser commercialization project, experienced in data monetization and user-base 	growing. ',
								'Former Manager of Mobogenie APP Store and China Telecom Store.',
								'Former Operational Manager of ZTE mobile phone APP Store.',
								'Over a decade’s experience in Internet development and operation.'
							]
					},
					{
						headImgUrl:require('../../assets/images/team-tongjin.png'),
						name:'Jin Tong',
						title:'Partner & Senior Product Managing Director',
							intro:['Former Senior Product Managing Director of Dolphin Browser, overseeing product design and operation that serves over hundreds of millions of customers.',
								'Former Senior Product Manager in Alibaba’s Digital Product Department, responsible for digital content development, including E-books, videos and other forms of digital media. ',
								'Over a decade’s experience in Internet product design and development.',
								'A graduate in Telecommunications from Huazhong University of Science and Technology.'
						]
					},
					{
						headImgUrl:require('../../assets/images/team-jiangming.png'),
						name:'Ming Jiang',
						title:'Senior Director of Engineering',
						intro:['Former R&D Director of Dolphin Browser, overseeing product structure design and operation.',
								'Former Senior Development Engineer of Tencent, responsible for the risk control system for Wechat Red Packet and the design and development of the user system for QQ lottery.',
								'Former Senior Development Engineer of Huawei.',
								'Near a decade’s experience in Internet development.',
								'A graduate with master’s degree from Huazhong University of Science and Technology.'
						]
					}
				]
			}
		},
		created(){
			if(!this.en){
				this.team = [
					{
						headImgUrl:require('../../assets/images/team-liutiefeng.png'),
						name:'刘铁锋',
						title:'创始人、CEO',
						intro:['前海豚浏览器创始人兼CEO，其带领团队开发的海豚浏览器超过全球2亿用户的下载。',
							   '前海豚浏览器CTO。',
                               '前微软亚洲研究院高级软件开发工程师。',
                               '著有《编程之美》一书，畅销近10年，被誉为“微软面试圣经”。',
                               '全球W3C标准化委员会成员。']
					},
					{
						headImgUrl:require('../../assets/images/team-liuduran.png'),
						name:'刘杜然',
						title:'联合创始人、CTO',
						intro:['星云实验室负责人。',
							   '前谷歌美国总部资深工程师，带领并研发多个谷歌机器学习产品项目。',
                               '前FreeWheel（被Comcast收购）高级软件工程师，发起并研发了FreeWheel的移动视频广告系统。',
                               '前IBM中国研发中心web2.0组软件工程师。',
                               '有丰富的互联网产品开发和区块链项目经验。']
					},
					{
						headImgUrl:require('../../assets/images/team-liuleiyu.png'),
						name:'刘雷雨',
						title:'联合创始人、运营副总',
						intro:['前海豚浏览器商业化负责人、高级运营总监，负责流量变现和用户获取。',
								'前Mobogenie应用商店负责人、前中国电信天翼空间应用商店负责人。',
								'前中兴手机应用商店运营负责人。',
								'超过10年互联网开发和运营经验。'
							]
					},
					{
						headImgUrl:require('../../assets/images/team-tongjin.png'),
						name:'童锦',
						title:'合伙人、高级产品总监',
							intro:['前海豚浏览器高级产品总监，所负责的产品用户过亿。',
								'前阿里巴巴数字产品业务部门高级产品经理，负责电子书、视频等数字媒体相关的产品服务。',
								'超过10年互联网产品设计和开发经验。',
								'毕业于华中科技大学电信系。'
						]
					},
					{
						headImgUrl:require('../../assets/images/team-jiangming.png'),
						name:'江铭',
						title:'高级技术总监',
						intro:['前海豚浏览器研发总监，负责海豚浏览器各主要产品的架构设计和运维。',
								'前腾讯高级开发工程师，负责微信红包风控系统及QQ彩票用户系统的设计和开发。',
								'前华为高级开发工程师。',
								'近10年互联网开发经验。',
								'华中科技大学电子科学与技术硕士.'
						]
					}
				] 
			}
		},
		mounted(){
			console.log('team')
		}

	}
	
</script>

<style lang="scss">
	#team{
		position:relative;
		background: #F9F9F9;
		padding-top:52px;
		.title{
			font-size: 3.3vh;
    		margin-bottom: 41px;
		}
		.content{
			.content-ul{
				li{
					margin-bottom:57px;
					float:left;
					width:250px;
					text-align:center;
					box-sizing:border-box;
					&:nth-child(1){
						margin-left:81px;
					}
					&:nth-child(2){
						margin-left: 50px;
						margin-right: 50px;
					}
					&:nth-child(4){
						margin-left:223px ;
						margin-right:103px;
					}
					.head-img-url{
						height: 124.6px ;
						width: 141.2px;
					}
					.name{
						color:#3CBAC6 ;
						font-size:18px;
						font-size: 18px;
						margin:25px 0 8px;

						font-weight:400 !important;
					}
					.title{
						color:#E75977;
						margin-bottom:20px;
						font-size: 12px;
					}
					.intro{
						font-size: 10px;
						color: #000000;
						line-height: 16px;
						text-align:left;
					}
				}
			}
			
		}
	}
	@media screen and (max-width: 720px){

		#team{
			background: #F9F9F9;
			padding-top:52px;
			.title{
				font-size: 23px;
	    		margin-bottom:6vh;
			}
			.content{
				.content-ul{
					li{
						padding:0 32px;
						margin-bottom:57px;
						float:left;
						width:100%;
						text-align:center;
						box-sizing:border-box;
						&:nth-child(1){
							margin-left:0;
						}
						&:nth-child(2){
							margin-left: 0;
							margin-right: 0;
						}
						&:nth-child(4){
							margin-left:0 ;
							margin-right:0;
						}
						.head-img-url{
							height: 124.6px ;
							width: 141.2px;
						}
						.name{
							color:#3CBAC6 ;
							font-size:18px;
							font-size: 18px;
							margin:25px 0 8px;

							font-weight:400 !important;
						}
						.title{
							color:#E75977;
							margin-bottom:20px;
							font-size: 12px;
						}
						.intro{
							font-size: 10px;
							color: #000000;
							line-height: 16px;
							text-align:left;
						}
					}
				}
				
			}
		}

	}
</style>
<style>
	a{
		text-align:center ;
		box-sizing: ;
	}
</style>