<template>
	<el-container>
		<el-header style="padding:0px;float:left;">
			<div class="header"></div>
		</el-header>
		<el-container class="page-component__scroll">
			<!--左侧导航栏-->
			<el-aside width="210px">
				<el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
					<SidebarItem :data='router' :base-path="router.path"></SidebarItem>
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
				isCollapse: false
			};
		},
		components: {
			SidebarItem
		},
		mounted() {
			this.$ajax.post('/vos/user/apiLogin', {
				username: 'jeq',
				password: '123456'
			}).then(res => {
				if (res.code == 200) {
					for (let key in res.data) {
						sessionStorage.setItem(key, res.data[key]);
					}
				}
			})
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
					if (fdata.children) {
						fdata.children.map((item, index) => {
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