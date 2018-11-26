import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/index'
import layout from '@/components/view/index'
import userCenter from '@/components/view/userCenter/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
      hidden:true
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path:'/layout',
      name:'layout',
      component:layout,
      children:[
        {
          path:'userCenter',
          name:'用户中心',
          component:userCenter
        }
      ]
    },
    
  ]
})
