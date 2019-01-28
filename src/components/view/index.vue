<template>
	<el-container>
		<el-header style="padding:0px;float:left;">
			<div class="header"></div>
		</el-header>
		<el-container class="page-component__scroll">
			<!--左侧导航栏-->
			<el-aside width="210px">
				<el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
					<SidebarItem :data='router' :base-path="router.url"></SidebarItem>
				</el-menu>
			</el-aside>
			<!--右侧空白页-->
			<el-main class="page-component__scroll body">
				<router-view class="content" />
			</el-main>
		</el-container>
	</el-container>
</template>
<style>
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 210px;
		min-height: 100vh;
	}
</style>
<style scoped>
	.page-component__scroll {
		height: calc(-60px + 100vh);
	}

	.content {
		background-color: #fff;
	}

	.header {
		height: 100%;
		background-color: #111A2B;
		background-image: url('../../assets/logo.png');
		background-repeat: no-repeat;
	}

	body {
		background-color: #f3f4f5;
	}
</style>
<script>
	import SidebarItem from './component/Sidebar/SidebarItem.vue'

	export default {
		name: 'layout',
		data() {
			return {
				isCollapse: false,
				//router: {}
			};
		},
		components: {
			SidebarItem
		},
		mounted() {
			this.$ajax.post('/vos/user/apiLogin', {
				username: 'admin',
				password: '123456'
			}).then(res => {
				if (res.code == 200) {
					for (let key in res.data) {
						sessionStorage.setItem(key, res.data[key]);
						this.$root.eventHub.$emit('getLoginInfo', res.data);
					}
				}
			});
			// this.$ajax.get('/vos/menu/getTreeMenu').then(res => {
			// 	if (res.code == 200) {
			// 		this.router = [{
			// 				"id": 16,
			// 				"url": "/numManage",
			// 				"path": null,
			// 				"component": null,
			// 				"name": "号码管理",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [{
			// 						"id": 21,
			// 						"url": "/ObjCodeManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "目的码管理",
			// 						"iconCls": null,
			// 						"parentId": 16,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 20,
			// 						"url": "/blacklistManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "黑名单管理",
			// 						"iconCls": null,
			// 						"parentId": 16,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 19,
			// 						"url": "/voiceFileManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "语音文件管理",
			// 						"iconCls": null,
			// 						"parentId": 16,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 18,
			// 						"url": "/ticketManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "话单管理",
			// 						"iconCls": null,
			// 						"parentId": 16,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 17,
			// 						"url": "/numManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "号码管理",
			// 						"iconCls": null,
			// 						"parentId": 16,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					}
			// 				],
			// 				"meta": null,
			// 				"type": "0",
			// 				"checked": null
			// 			},
			// 			{
			// 				"id": 26,
			// 				"url": "/operateManage",
			// 				"path": null,
			// 				"component": null,
			// 				"name": "运营管理",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [{
			// 						"id": 30,
			// 						"url": "/IndustryCategory",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "行业类别管理",
			// 						"iconCls": null,
			// 						"parentId": 26,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 29,
			// 						"url": "/numPoolManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "号码池管理",
			// 						"iconCls": null,
			// 						"parentId": 26,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 28,
			// 						"url": "/noticeManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "公告管理",
			// 						"iconCls": null,
			// 						"parentId": 26,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 27,
			// 						"url": "/comboSet",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "资费及增值套餐设置",
			// 						"iconCls": null,
			// 						"parentId": 26,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					}
			// 				],
			// 				"meta": null,
			// 				"type": "0",
			// 				"checked": null
			// 			},
			// 			{
			// 				"id": 24,
			// 				"url": "/businessAccepted",
			// 				"path": null,
			// 				"component": null,
			// 				"name": "业务受理",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [{
			// 					"id": 25,
			// 					"url": "/400businessManage",
			// 					"path": null,
			// 					"component": null,
			// 					"name": "400业务受理",
			// 					"iconCls": null,
			// 					"parentId": 24,
			// 					"roles": null,
			// 					"children": [],
			// 					"meta": null,
			// 					"type": "0",
			// 					"checked": null
			// 				}],
			// 				"meta": null,
			// 				"type": "0",
			// 				"checked": null
			// 			},
			// 			{
			// 				"id": 1,
			// 				"url": "/systemSetup",
			// 				"path": "/",
			// 				"component": "USER",
			// 				"name": "系统设置",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [{
			// 						"id": 23,
			// 						"url": "/roleManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "角色管理",
			// 						"iconCls": null,
			// 						"parentId": 1,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 22,
			// 						"url": "/systemLog",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "系统日志",
			// 						"iconCls": null,
			// 						"parentId": 1,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 6,
			// 						"url": "/accountManage",
			// 						"path": "/",
			// 						"component": "USER",
			// 						"name": "账号管理",
			// 						"iconCls": null,
			// 						"parentId": 1,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "m",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 2,
			// 						"url": "/layout/userCenter",
			// 						"path": "/",
			// 						"component": "USER",
			// 						"name": "用户中心",
			// 						"iconCls": null,
			// 						"parentId": 1,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "m",
			// 						"checked": null
			// 					}
			// 				],
			// 				"meta": null,
			// 				"type": "m",
			// 				"checked": null
			// 			},
			// 			{
			// 				"id": 11,
			// 				"url": "/accountingManage",
			// 				"path": null,
			// 				"component": null,
			// 				"name": "账务管理",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [{
			// 						"id": 15,
			// 						"url": "/bollotManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "开票管理",
			// 						"iconCls": null,
			// 						"parentId": 11,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 14,
			// 						"url": "/chargeManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "充值管理",
			// 						"iconCls": null,
			// 						"parentId": 11,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 13,
			// 						"url": "/billManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "账单管理",
			// 						"iconCls": null,
			// 						"parentId": 11,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					},
			// 					{
			// 						"id": 12,
			// 						"url": "/accountingManage",
			// 						"path": null,
			// 						"component": null,
			// 						"name": "账务管理",
			// 						"iconCls": null,
			// 						"parentId": 11,
			// 						"roles": null,
			// 						"children": [],
			// 						"meta": null,
			// 						"type": "0",
			// 						"checked": null
			// 					}
			// 				],
			// 				"meta": null,
			// 				"type": "0",
			// 				"checked": null
			// 			},
			// 			{
			// 				"id": 10,
			// 				"url": "/layout/businessInform",
			// 				"path": "/",
			// 				"component": null,
			// 				"name": "企业管理",
			// 				"iconCls": null,
			// 				"parentId": 0,
			// 				"roles": null,
			// 				"children": [],
			// 				"meta": null,
			// 				"type": "m",
			// 				"checked": null
			// 			}
			// 		];
			// 	}
			// });
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			deepClone(obj, nobj) {
				var nobj = nobj || {};
				var toStr = Object.prototype.toString;
				for (let key in obj) {
					if (typeof obj[key] == 'object' && obj[key] !== null) {
						if (toStr.call(obj[key]) == '[object Array]') {
							nobj[key] = [];
						} else {
							nobj[key] = {};
						}
						this.deepClone(obj[key], nobj[key]);
					} else {
						nobj[key] = obj[key];
					}
				}
				return nobj;
			}
		},
		computed: {
			router() {
				var format = function (fdata) {
					fdata.url = fdata.path;
					if (fdata.children) {
						fdata.children.map((item, index) => {
							item.url = item.path;
							if (item.hidden) {
								fdata.children.splice(index, 1);
							} else {
								if (item.children) {
									format(item)
								}
							}
						})
					}
				}
				var routerData = this.deepClone(this.$router.options.routes);

				for (let key in routerData) {
					format(routerData[key])
				}
				return routerData;
			}
		}
	}
</script>