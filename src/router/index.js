import Vue from 'vue'
import Router from 'vue-router'
import layOut from '@/pages/lay-out'
import index from '@/pages/index'
import cn from '@/pages/cn'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
  	{
  		path:'/',
  		component:layOut,
  		redirect: '/index',
  		children:[
			  {
		        path: '/index',
		        component: index,
		        meta:{
		      	    title:'Decentralized Token-based Marketing Protocol'
		        }
		    },
        {
            path: '/cn',
            component: cn,
            meta:{
                title:'去中心化数字营销协议'
            }
        }
  		]
  	}
  ]
})


