import Vue from 'vue'
import Router from 'vue-router'
import layOut from '@/pages/lay-out'
import index from '@/pages/index'
import meeting from '@/pages/meeting'
import create from '@/pages/meeting/create'
import upload from '@/pages/meeting/upload'
import wxlogin from '@/pages/wxlogin'
import mobile from '@/pages/mobile'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
  	{
  		path:'/',
  		component:layOut,
  		redirect: '/person',
  		children:[
  				{
			        path: '/person',
			        component: index,
			        meta:{
			      	    title:'ppt小助手'
			        }
			    },
			    {
					path: '/meeting',
					component:meeting,
					meta:{
				  		title:'ppt小助手'
				  	}
				},
			    {
					path: '/meeting/create',
					component:create,
					meta:{
				  		title:'ppt小助手'
				  	}
				},
				{
					path: '/meeting/upload',
					component: upload,
					meta:{
				  		title:'ppt小助手'
				  	}
				}
  		]
  	},
	{
		path: '/wxlogin',
		component:wxlogin,
		meta:{
	  		title:'ppt小助手'
	  	}
	},
	{
		path: '/mobile',
		component:mobile,
		meta:{
	  		title:'ppt小助手'
	  	}
	}
  ]
})

