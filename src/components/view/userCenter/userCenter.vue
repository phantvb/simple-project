<template>
	<div id="userCenter">
		<header>
			用户中心
		</header>
		<section>
			<div class="title">
				基本资料
				<p class="edit">
					<i class="el-icon-edit-outline"></i>
					<el-button type="text" @click="editMes(true)">编辑</el-button>
				</p>
			</div>
			<div class="part center portrait">
				<img src="../../../assets/portrait_1.png">
				<el-button type="text" class="button" @click="editPortrait(true)">修改头像</el-button>
			</div>
			<div class="part message">
				<p>登录账号 ：<span class="grey">{{tableData.username}}</span></p>
				<p>用户名称：{{tableData.name}}</p>
				<p>性别：{{sex}}</p>
				<p>身份证号：{{tableData.idNo}}</p>
				<p>邮箱：{{tableData.email}}</p>
				<p>手机：{{tableData.phone}}</p>
			</div>
			<div class="part message">
				<p>角色：{{tableData.nameZh}}</p>
				<p>地区：{{tableData.province}}{{tableData.city}}{{tableData.area}}</p>
				<p>状态：{{tableData.enabled}}</p>
				<p>备注：{{tableData.remark}}</p>
			</div>
		</section>
		<section>
			<div class="title">
				安全设置
			</div>
			<div class="part">
				<el-button type="text" class="button" @click="editPass(true)">修改密码</el-button>
			</div>
		</section>
		<message :show="mesEdit" :data="tableData" @close="editMes(false)"></message>
		<portrait :show="portraitEdit" :data="tableData" @close="editPortrait(false)"></portrait>
		<password :show="passEdit" :data="tableData" @close="editPass(false)"></password>
	</div>
</template>

<script>
	import message from './dialog/message.vue'
	import portrait from './dialog/portrait.vue'
	import password from './dialog/password.vue'

	export default {
		name: 'userCenter',
		data() {
			return {
				mesEdit: false,
				portraitEdit: false,
				passEdit: false,
				tableData: [],
				sex: '', // 存放翻译之后的性别
			}
		},
		components: {
			message,
			portrait,
			password
		},
		methods: {
			editMes(bol) {
				this.mesEdit = bol;
			},
			editPortrait(bol) {
				this.portraitEdit = bol;
			},
			editPass(bol) {
				this.passEdit = bol;
			}
		},
		created() {
			this.$ajax.get('/vos/user/getDetail').then(res => {
				if (res.code == 200) {
					this.tableData = res.data;
					if (this.tableData.sex == 'man') {
						this.sex = '男';
					}
					if (this.tableData.sex == 'woman') {
						this.sex = '女';
					}
					if (this.tableData.enabled == true) {
						this.tableData.enabled = '启用';
					}
					if (this.tableData.enabled == false) {
						this.tableData.enabled = '关闭';
					}
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import './userCenter.scss';
</style>