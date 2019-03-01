<template>
	<el-container>
		<el-header style="padding:0px;float:left;">
			<div class="header fmd">
				{{'您好, '+userName}}
				<button class="fmd" @click="logout">[ 退出 ]</button>
				<img :src="form.headPicture.indexOf('userHead')==-1?$global.serverSrc+form.headPicture:'/static/'+form.headPicture" @click="userR">
			</div>
		</el-header>
		<el-container class="page-component__scroll">
			<!--左侧导航栏-->
			<el-aside width="210px">
				<el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#111A2B" text-color="#fff" active-text-color="#ffd04b">
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
		color: #fff;
		line-height: 60px;
		text-align: right;
		padding-right: 20px;
		box-sizing: border-box;
	}

	.header button {
		color: #409EFF;
		cursor: pointer;
		background-color: transparent;
		border: none;
	}

	body {
		background-color: #f3f4f5;
	}

	img {
		transform: translateY(6px);
		-moz-transform: translateY(6px);
		-ms-transform: translateY(6px);
		-o-transform: translateY(6px);
		width: 24px;
		height: 24px;
		border-radius: 100%;
		cursor: pointer;
	}
</style>
<script>
	import SidebarItem from './component/Sidebar/SidebarItem.vue'

	export default {
		name: 'layout',
		data() {
			return {
				isCollapse: false,
				userName: '',
				router: {},
				form: {
					headPicture: 'userHead1.png'
				}
			};
		},
		components: {
			SidebarItem
		},
		mounted() {
			this.userName = sessionStorage.getItem('username');
			this.$ajax.get('/vos/menu/getTreeMenu?roleId=' + sessionStorage.getItem('roleId')).then(res => {
				if (res.code == 200) {
					this.router = res.data.menuList;
				}
			});
			this.fetchData();
		},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			logout() {
				this.$ajax.get('/vos/user/logout').then(res => {
					if (res == 'OK') {
						this.$router.push({ path: '/login' });
					}
				});
			},
			fetchData() {
				this.$ajax.get('/vos/user/getDetail').then(res => {
					if (res.code == 200) {
						this.form = res.data;
					}
				});
			},
			userR() {
				this.$router.push('/Layout/userCenter');
			}
		}
	}
</script>