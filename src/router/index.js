import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import layout from '@/components/view/index';
import userCenter from '@/components/view/userCenter/userCenter';
import accountManage from '@/components/view/systemSetup/accountManage';
import systemLog from '@/components/view/systemSetup/systemLog';
import roleManage from '@/components/view/systemSetup/roleManage';
import businessInform from '@/components/view/businessSetup/businessInform';
import businessDetail from '@/components/view/businessSetup/businessDetail';
import accountingManage from '@/components/view/accountingManage/accountingManage';
import billManage from '@/components/view/accountingManage/billManage';
import chargeManage from '@/components/view/accountingManage/chargeManage';
import numManage from '@/components/view/numManage/numManage';
import blacklistManage from '@/components/view/numManage/blacklistManage';
import ObjCodeManage from '@/components/view/numManage/ObjCodeManage';
import ticketManage from '@/components/view/numManage/ticketManage';
import voiceFileManage from '@/components/view/numManage/voiceFileManage';
import fourBusinessManage from '@/components/view/businessAccepted/400businessManage';
import comboSet from '@/components/view/operateManage/ComboSet';
import noticeManage from '@/components/view/operateManage/noticeManage';
import lineCostSetting from '@/components/view/operateManage/lineCostSetting';
import messageCenter from '@/components/view/messageCenter/messageCenter';
import numPoolManage from '@/components/view/operateManage/numPoolManage';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/layout',
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      hidden: true,
      children: [
        {
          path: 'userCenter',
          name: '用户中心',
          component: userCenter
        },
        {
          path: 'businessInform',
          name: '企业管理',
          component: businessInform
        },
        {
          path: 'messageCenter',
          name: '消息中心',
          component: messageCenter
        }
      ],
    },
    {
      path: '/businessInform',
      name: 'layout',
      component: layout,
      hidden: true,
      children: [
        {
          path: 'businessDetail',
          name: '企业审核详情',
          hidden: true,
          component: businessDetail
        }
      ],
    },
    {
      path: '/accountingManage',
      name: '账务管理',
      component: layout,
      children: [
        {
          path: 'accountingManage',
          name: '账务管理',
          component: accountingManage
        },
        {
          path: 'billManage',
          name: '账单管理',
          component: billManage
        },
        {
          path: 'chargeManage',
          name: '充值管理',
          component: chargeManage
        }
      ],
    },
    {
      path:'/numManage',
      name:'号码管理',
      component:layout,
      children:[
        {
          path:'numManage',
          name:'号码管理',
          component:numManage
        },
        {
          path:'ticketManage',
          name:'话单管理',
          component:ticketManage
        },
        {
          path:'voiceFileManage',
          name:'语音文件管理',
          component:voiceFileManage
        },
        {
          path:'blacklistManage',
          name:'黑名单管理',
          component:blacklistManage
        },
        {
          path:'ObjCodeManage',
          name:'目的码管理',
          component:ObjCodeManage
        }
      ],
    },
    {
      path:'/systemSetup',
      name:'系统设置',
      component:layout,
      children:[
      path: '/systemSetup',
      name: '系统设置',
      component: layout,
      children: [
        {
          path: 'accountManage',
          name: '账号管理',
          component: accountManage
        },
        {
          path: 'systemLog',
          name: '系统日志',
          component: systemLog
        },
        {
          path: 'roleManage',
          name: '角色管理',
          component: roleManage
        }
      ]
    },
    {
      path: '/businessAccepted',
      name: '业务受理',
      component: layout,
      children: [
        {
          path: '400businessManage',
          name: '400业务管理',
          component: fourBusinessManage
        },
      ]
    },
    {
      path: '/operateManage',
      name: '运营管理',
      component: layout,
      children: [
        {
          path: 'comboSet',
          name: '资费及增值套餐设置',
          component: comboSet
        },
        {
          path: 'noticeManage',
          name: '公告管理',
          component: noticeManage
        },
        {
          path: 'lineCostSetting',
          name: '线路成本设置',
          component: lineCostSetting
        },
        {
          path:'numPoolManage',
          name:'号码池管理',
          component:numPoolManage
        }
      ]
    }
  ]
})
