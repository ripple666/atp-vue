<template>
	<div id="advisors">
		<div class="w100c">
			<div class="title">{{en?'Advisors':'顾问'}}</div>
			<div class="content">
				<ul class="content-ul clearfloat">
					<li v-for="(advisor,index) in advisors">
						<img class="head-img-url" :src="advisor.headImgUrl" alt="">
						<div class="name">{{advisor.name}}</div>
						<div class="intro">
							<p v-for="text in advisor.intro">{{text}}</p>
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
				advisors:[
					{
						headImgUrl:require('../assets/images/advisors-example.png'),
						name:'Hitters Xu',
						intro:["Founder & CEO of Nebulas, Founder of AntShares (NEO), a blockchain pioneer in China, Former Director of Ant Financial's Blockchain Platform (Alibaba’s financial arm) and part of Google's Search & Anti-Fraud team. Since 2013, Hitters has founded BitsClub (the very first Blockchain/Bitcoin community in China), ICO365 (one of the largest ICO platforms) and FBG Capital (one of the earliest Crypto funds)."]
					},
					{
						headImgUrl:require('../assets/images/advisors-example.png'),
						name:'Edith Yeung',
						intro:["Inc Magazine’s pick of “Silicon Valley Must Meet” investor.\
Head of 500 Startups Greater China and partner of 500 Mobile Collective Fund.\
Investing experience in over 40 mobile, VR, AR, AI and machine learning startups including Hooked (a reading app topping the app store), DayDayCook (hosting one of Asia’s largest cooking enthusiasts community), Fleksy (acquired by Pinterest), Human (acquired by Mapbox), AISense, etc. ."]
					},
					{
						headImgUrl:require('../assets/images/advisors-example.png'),
						name:'Andy Tian',
						intro:["CEO of Asia Innovations Group (its star products Uplive, SUPER FANS CLUB, Phalanx Heroes, etc.).A senior product person, A blockchain and blockchain-based industry investor.Former GM of Zynga China. Led Google’s mobile business in China, introduced Android to China.A MIT graduate with a bachelor’s degrees in computer science and a master’s degree in literature."]
					}
				]
			}
		},
		created(){
			if(!this.en){
				this.advisors = [
						{
							headImgUrl:require('../assets/images/advisors-example.png'),
							name:'徐义吉',
							intro:["星云链（Nebulas）& 小蚁（AntShares、NEO）创始人，前蚂蚁金服区块链平台部负责人，前谷歌反作弊小组成员，同济大学计算机学士。2013年起创办了中国首个区块链技术社区比特创业营（BitsClub）、中国首个专注于区块链行业投资基金FBG。"]
						},
						{
							headImgUrl:require('../assets/images/advisors-example.png'),
							name:'Edith Yeung',
							intro:["Inc杂志\"硅谷Must Meet\"投资者之一，硅谷著名风险投资公司和孵化器500 Startups的大中华区负责人，同时管理一支千万美元的Mobile Collective基金。她投资了40多家移动互联网、VR、AR和人工智能创业公司，包括Hooked（app store排名第一的读书类APP）、日日煮（亚洲最大的美食社之一）、Fleksy（被Pinterest收购）、Human（被Mapbox收购）、AISense等。"]
						},
						{
							headImgUrl:require('../assets/images/advisors-example.png'),
							name:'Andy Tian',
							intro:["亚洲创新集团CEO，成功连续创业企业家（亚洲创新集团为第四次创业），资深产品人，区块链及相关产业投资人，前Zynga中国总经理，谷歌中国移动行业负责人，曾将Android引进中国。MIT计算机学士和文学硕士。目前亚洲创新集团有Uplive、超级星饭团、碰碰等明星产品。"]
						}

				]
			}
		}
	}
	
</script>

<style lang="scss">
	#advisors{
		background: #fff;
		padding-top:52px;
    	padding-bottom:43px;
		position:relative;
		
		.title{
			font-size: 3.3vh;
    		margin-bottom: 6vh;
		}
		.content{
			// padding-left:77px;
			.content-ul{
				li{
					
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
						margin:28px 0 16px;

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
		#advisors{
		background: #fff;
		padding-top:52px;
    	padding-bottom:43px;
		position:relative;
		
		.title{
			font-size: 23px;
    		margin-bottom: 55px;
		}
		.content{
			// padding-left:77px;
			.content-ul{
				li{
					padding:0 32px;
					float:left;
					width:100%;
					margin-bottom:57px;
					text-align:center;
					box-sizing:border-box;
					&:nth-child(1){
						margin-left:0;
					}
					&:nth-child(2){
						margin-left: 0;
						margin-right: 0;
					}
					&:nth-child(3){
						margin-left:0 ;
						margin-right:0;
						margin-bottom:0;
					}
					.head-img-url{
						height: 124.6px ;
						width: 141.2px;
					}
					.name{
						color:#3CBAC6 ;
						font-size:18px;
						margin:28px 0 16px;

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