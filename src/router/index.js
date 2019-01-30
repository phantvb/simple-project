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
import businessData from '@/components/view/businessAccepted/businessData';
import businessDetial from '@/components/view/businessAccepted/businessDetial';
import accountingManage from '@/components/view/accountingManage/accountingManage';
import billManage from '@/components/view/accountingManage/billManage';
import chargeManage from '@/components/view/accountingManage/chargeManage';
import bollotManage from '@/components/view/accountingManage/bollotManage';
import numManage from '@/components/view/numManage/numManage';
import blacklistManage from '@/components/view/numManage/blacklistManage';
import ObjCodeManage from '@/components/view/numManage/ObjCodeManage';
import ticketManage from '@/components/view/numManage/ticketManage';
import voiceFileManage from '@/components/view/numManage/voiceFileManage';
import fourBusinessManage from '@/components/view/businessAccepted/400businessManage';
import objCodeDetail from '@/components/view/businessAccepted/objCodeDetail';
import logoutDetail from '@/components/view/businessAccepted/logoutDetail';
import comboSet from '@/components/view/operateManage/ComboSet';
import noticeManage from '@/components/view/operateManage/noticeManage';
import lineCostSetting from '@/components/view/operateManage/lineCostSetting';
import IndustryCategory from '@/components/view/operateManage/IndustryCategory';
import messageCenter from '@/components/view/messageCenter/messageCenter';
import numPoolManage from '@/components/view/operateManage/numPoolManage';
import customNavigation from '@/components/view/customNavigation/customNavigation';
import reviewHomepage from '@/components/view/reviewHomepage/reviewHomepage';
import voiceDetial from '@/components/view/businessAccepted/voiceDetial';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login',
			hidden: true
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			hidden: true
		},
		{
			path: '/BusinessInform',
			name: 'layout',
			component: layout,
			hidden: true,
			children: [{
				path: 'businessDetail',
				name: '企业审核详情',
				hidden: true,
				component: businessDetail
			}]
		},
		{
			path: '/AccountingManage',
			name: '账务管理',
			component: layout,
			children: [{
				path: 'accountingManage',
				name: '账务管理 ',
				component: accountingManage
			}, {
				path: 'billManage',
				name: '账单管理',
				component: billManage
			}, {
				path: 'chargeManage',
				name: '充值管理',
				component: chargeManage
			}, {
				path: 'bollotManage',
				name: '开票管理',
				component: bollotManage
			}]
		},
		{
			path: '/NumManage',
			name: '号码管理',
			component: layout,
			children: [{
				path: 'numManage',
				name: '号码管理 ',
				component: numManage
			}, {
				path: 'ticketManage',
				name: '话单管理',
				component: ticketManage
			}, {
				path: 'voiceFileManage',
				name: '语音文件管理',
				component: voiceFileManage
			}, {
				path: 'blacklistManage',
				name: '黑名单管理',
				component: blacklistManage
			}, {
				path: 'ObjCodeManage',
				name: '目的码管理',
				component: ObjCodeManage
			}]
		},
		{
			path: '/SystemSetup',
			name: '系统设置',
			component: layout,
			children: [{
				path: 'accountManage',
				name: '账号管理 ',
				component: accountManage
			}, {
				path: 'systemLog',
				name: '系统日志',
				component: systemLog
			}, {
				path: 'roleManage',
				name: '角色管理',
				component: roleManage
			}]
		},
		{
			path: '/BusinessAccepted',
			name: '业务受理',
			component: layout,
			children: [{
				path: '400businessManage',
				name: '400业务管理',
				component: fourBusinessManage
			}, {
				path: 'objCodeDetail',
				name: '目的码详情',
				component: objCodeDetail,
				hidden: true,
			}, {
				path: 'logoutDetail',
				name: '注销审核详情',
				component: logoutDetail,
				hidden: true,
			}, {
				path: 'businessData',
				name: '业务详情',
				component: businessData,
				hidden: true,
			}, {
				path: 'businessDetial',
				name: '业务详情',
				component: businessDetial,
				hidden: true,
			}, {
				path: 'voiceDetial',
				name: '语音详情',
				component: voiceDetial,
				hidden: true
			}]
		},
		{
			path: '/OperateManage',
			name: '运营管理',
			component: layout,
			children: [{
				path: 'comboSet',
				name: '资费及增值套餐设置',
				component: comboSet
			}, {
				path: 'noticeManage',
				name: '公告管理',
				component: noticeManage
			}, {
				path: 'numPoolManage',
				name: '号码池管理',
				component: numPoolManage
			}, {
				path: 'IndustryCategory',
				name: '行业类别管理',
				component: IndustryCategory
			}]
		},
		{
			path: '/Layout',
			name: 'layouts',
			component: layout,
			hidden: true,
			children: [{
				path: 'userCenter',
				name: '用户中心',
				component: userCenter
			}, {
				path: 'businessInform',
				name: '企业管理',
				component: businessInform
			}, {
				path: 'messageCenter',
				name: '消息中心',
				component: messageCenter
			}, {
				path: 'reviewHomepage',
				name: '总览首页',
				component: reviewHomepage
			}, {
				path: 'customNavigation',
				name: '自定义导航',
				component: customNavigation,
			}]
		},
	],
})