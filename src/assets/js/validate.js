//插件
var validate = function(){

}
var obj = {
	letterSort:function(arry){ //首字母排序
		return arry.sort(function(a, b){return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'})})
	},
	trim:function(str){  //除去空格
		var reg = /(^\s*)|(\s*$)/g
		return str.replace(reg,'')
	},
	deleteString:function(str,name){  //删除指定字符串
		var reg = new RegExp(''+name+'','ig')
		return str.replace(reg,'')
	},
	objKeySort:function(dataList) { 
        var newArr = Object.keys(dataList).sort();　　 
        var newObj = {}; 
        for(var i = 0; i < newArr.length; i++) {
            newObj[newArr[i]] = dataList[newArr[i]]; 
        }
        return newObj; 
    },
	lengthRange:function(str,minlength,maxlength){
		return str.length>=minlength&&str.length<=maxlength
	},
	isOverLength:function(str,length){
		return str.length>length?true:false
	}
	,
	isEmpty:function(str){ //是否为空
		var reg = /.+?/;
		return reg.test(str)
	},
	isTell:function(str){  //电话
		var reg = /^1[34578]\d{9}$/;
		return reg.test(str)
	},
	isName:function(str){ //合法用户名
		var reg = /[^\w\u4E00-\u9FA5]+/;
		return !reg.test(str);	
	},
	isLoginName:function(str){//合法注册用户名
		var reg = /[^\w]+/;
		return !reg.test(str);	
	},
	isChinaName:function(str) { //中文名用户名
		 var reg = /^[\u4E00-\u9FA5]{1,6}$/;
		 return reg.test(str);
	},
	isEmail:function(str){	//邮箱
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		return reg.test(str); 
	},
	sliceString:function(str,length){//截取字符串
		return str.length>length?str.substring(0,length)+'...':str;
	},
	getSimpleText:function(html) { //提取富文本中内容
        var reg = new RegExp("(<.+?>|&nbsp;?|\\s|\\r|\\n)", "g"); 
        if(html == null ) return ''; return html.replace(reg,'') 
    },
	getQueryString:function(name){ 	//截取search
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)",'i');
	    var str = window.location.href
	    var r = str.substr(str.indexOf('?')+1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	},
	formatDate:function(type,date){
		date = date||new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		month = changeLength(month)
		day = changeLength(day)
		function changeLength(str){
			return str/10 < 1 ? '0'+str : str
		}
		return year+type+month+type+day
	},
	 dataScope:function(value1, value2,obj) {  
	    var getDate = function(str) {  //将格式化成"2017-07-07"的格式转换成标准格式
	        var tempDate = new Date();  
	        var list = str.split("-");  
	        tempDate.setFullYear(list[0]);  
	        tempDate.setMonth(list[1] - 1);  
	        tempDate.setDate(list[2]);  
	        return tempDate;  
	    }
	    var week  =['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
	    function getweek(date){  //根据日期获取天数
	    	return week[date.getDay()]
	    }
	    var date1 = getDate(value1);  //将'2018-05-12'获取天数格式
	    var date2 = getDate(value2); 
	    var dateArr = [];  
	    if (date1 <= date2) { 
	      	var i = 0;  
		    while (date1 <= date2) {  
		         var dayStr =date1.getDate().toString();  
		            if(dayStr.length ==1){  
		                dayStr="0"+dayStr;  
		            }  
		        dateArr[i] = { //当天的会议安排
		        		date:date1.getFullYear() + "年" + (date1.getMonth() + 1) + "月"  
		                + dayStr,//当天日期
		                sortDay:'第'+(i+1)+'天', //当天时在总天数的第几天
		                week:getweek(date1),//当天的星期数
		                schedules:[ //某一天的根据时间安排细节
		                	{
		                		timeStart:{
			            			"HH": "HH",
									"mm": "mm"
			            		},
			            		timeEnd:{
			            			"HH": "HH",
									"mm": "mm"
			            		},
		                		schedulePices:[ //当前时间段（节点或者会议）列表总数
		                			{	
		                				
		                				sessionType:'speak',//当前时间段是节点或会议
				                		meetTypes:[//下拉列表，选择值
				                			{
				                				text:'活动',
				                				value:'other'
				                			},
				                			{
				                				text:'演讲',
				                				value:'speak'
				                			}
				                		],
				                		head:require('../images/head-image_03.png')
				   
		                			}
		                		]
		                		
		                	}
		                ]
		            };  
		        i++;
		        date1.setDate(date1.getDate() + 1);  //将天数+1来使得日期加1
		    }   
	    } 
	    return dateArr;  
	},
	setCookie:function(name,value,hours){ //设置cookie
		var exp = new Date();
		exp.setTime(exp.getTime() + hours*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp;
	},
	getCookie:function(name){ //获取cookie
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	delCookie:function(name){ //删除cookie
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}

		function getCookie(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return unescape(arr[2]);
			}else{
				return null;
			}
		}
	},
	getTrueLength(str){//获取字符串的真实长度（字节长度）
		 var len = str.length, truelen = 0;
            for(var x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    truelen += 2;
                }else{
                    truelen += 1;
                }
            }
            return truelen;
    },
    cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
        var len = str.length, tlen = len, nlen = 0;
        for(var x = 0; x < len; x++){
            if(str.charCodeAt(x) > 128){
                if(nlen + 2 < leng){
                    nlen += 2;
                }else{
                    tlen = x;
                    break;
                }
            }else{
                if(nlen + 1 < leng){
                    nlen += 1;
                }else{
                    tlen = x;
                    break;
                }
            }
        }
        return tlen;
    },
    convertBase64UrlToBlob(urlData){//将base64编码转换为Blob
	    var bytes=window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
	    
	    //处理异常,将ascii码小于0的转换为大于0
	    var ab = new ArrayBuffer(bytes.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < bytes.length; i++) {
	        ia[i] = bytes.charCodeAt(i);
	    }
	    return new Blob( [ab] , {type : 'image/png'});
	},
	shareToSina : function(title,url,picurl){	//分享到新浪
		var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
		window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
	},
	shareToQQ:function(title,url,picurl){	//分享到qq
		var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl;
		window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
	},
	shareToQQfriends:function(){		 //分享到qq好友
		var qqfriends = 'http://connect.qq.com/widget/shareqq/index.html?url='+url+'&showcount=0&desc='+desc+'&summary='+summary+'&title='+title+'&site='+site+'&pics='+picurl
	},
	reLogin:function(){
		var userId =  window.sessionStorage.getItem('userId')
		if(userId && userId != 'undefined' && userId != 'null'){
			window.sessionStorage.setItem('userId',null)
			window.sessionStorage.setItem('userKey',null)
			window.location.reload()
		}
		
	}
}
for(var key in obj){
	validate.prototype[key] = obj[key]
}
var validate = new validate()
export { //很关键
  validate
}




