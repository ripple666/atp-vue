<template>
  <div id="app">
    <div v-if="!mobile">
        <!-- <keep-alive> -->
        <router-view/>
        <!-- </keep-alive> -->
        <this-foot></this-foot>
    </div>
   
   <div v-if="mobile" class="check-mobile">
    <div class="mask">
      <div class="mask-content" >
        <div class="xy-mid  text">
            请用电脑浏览器打开网址
            <br>
            <!-- <span @click="close" class="btn">知道了</span> -->
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

import thisFoot from './components/base/myfoot'


export default {
  components:{thisFoot},
  data(){
    return{
      mobile:false
    }
  },
  methods:{
    close(){
      
    }
  },
  created(){
      if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){
           this.mobile  = true
      }else{
                     
      }
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
textarea{
  overflow:hidden;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
/*自定义全局样式*/
body {
  background: #f7f7f7;
  font-family:"Microsoft YaHei","PingFangSC-Regular","Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
[ellipsis]{
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
[noSelect]{
  -webkit-user-select:none;
     -moz-user-select:none;
      -ms-user-select:none; 
        user-select:none;
}
[center]{
  text-align: center !important;
}
[hidden]{
  filter: opacity(0);
  opacity: 0
}
img,i{
    vertical-align: middle;
}
/*清楚浮动*/
.clearfloat{
    zoom:1;
}

.clearfloat:after{
    content: "";
    display:block;
    height: 0;
    clear: both;
    visibility: hidden;
}
/*遮罩层*/
.mask{
    z-index:1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.25);
}
/*遮罩层内容*/
.mask-content{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    background-color: #fff;
    text-align: center;
}
/*全局公共宽度*/
.main{
    width: 1000px;
    margin:0 auto;
}
/*全居中*/
.xy-mid{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
/*水平居中*/
.x-mid{ 
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
}
/*垂直居中*/
.y-mid{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
}
/*背景图标公共样式*/
.icon-bg{
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
}
/*改变placeholder的颜色*/
.choose-input::-webkit-input-placeholder {
    color: rgba(0,0,0,0.45)
}
.choose-input::-moz-placeholder {
    color: rgba(0,0,0,0.45)
}
.choose-input::-ms-input-placeholder {
    color: rgba(0,0,0,0.45)
}


/*谷歌wekit内核隐藏滚动条*/
  .noscrollbar::-webkit-scrollbar {
      width:0px;
      height:0px;
  }
  .noscrollbar::-webkit-scrollbar-button    {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar-track     {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar-track-piece {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar-thumb{
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar-corner {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar-resizer  {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-webkit-scrollbar {
      width:10px;
      height:10px;
  }
  /*o内核*/
  .noscrollbar .-o-scrollbar{
      -moz-appearance: none !important;   
      background: rgba(0,255,0,0) !important;  
  }
  .noscrollbar::-o-scrollbar-button    {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-o-scrollbar-track     {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-o-scrollbar-track-piece {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-o-scrollbar-thumb{
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-o-scrollbar-corner {
      background-color:rgba(0,0,0,0);
  }
  .noscrollbar::-o-scrollbar-resizer  {
      background-color:rgba(0,0,0,0);
  }
  /*IE10,IE11,IE12 隐藏滚动条*/
  .noscrollbar{
      -ms-scroll-chaining: chained;
      -ms-overflow-style: none;
      -ms-content-zooming: zoom;
      -ms-scroll-rails: none;
      -ms-content-zoom-limit-min: 100%;
      -ms-content-zoom-limit-max: 500%;
      -ms-scroll-snap-type: proximity;
      -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
      -ms-overflow-style: none;
      overflow: auto;
  }
  

  
</style>
<style lang=scss>
  .check-mobile{
    z-index: 10;
    .mask{
      background-color: #fff;
      .mask-content{
        top: 30%;
      }
      .text{
        width: 100vw;
        height: 50px;

      }
      .btn{
        display: inline-block;
        width: 100px;
        height: 30px;
        background-color: rgba(97,149,255,1);
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        margin-top: 80px;
      }
      .btn:hover{
        background-color: rgba(97,149,255,0.65);
      }
    }
  }
</style>
