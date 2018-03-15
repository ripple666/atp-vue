// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import 'animate.css'

Vue.config.productionTip = false //关闭生产模式下给出的提示


Vue.directive('mounton', {  //自定义指令
  inserted: function (el) {  // 当被绑定的元素插入到 DOM 中时……
   
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
