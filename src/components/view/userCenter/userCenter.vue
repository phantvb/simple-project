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
				<p>登录账号 ：<span class="grey">{{form.username}}</span></p>
				<p>用户名称：{{form.name}}</p>
				<p>性别：{{form.sex=='man'?'男':'女'}}</p>
				<!-- <p>身份证号：{{form.}}</p> -->
				<p>邮箱：{{form.email}}</p>
				<p>手机：{{form.phone}}</p>
			</div>
			<div class="part message">
				<p>角色：{{form.phone}}</p>
				<p>地区：浙江省 杭州市 萧山区</p>
				<p>状态：启用</p>
				<p>备注：</p>
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
		<message :show="mesEdit" @close="editMes(false)"></message>
		<portrait :show="portraitEdit" @close="editPortrait(false)"></portrait>
		<password :show="passEdit" @close="editPass(false)"></password>
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
				username: '',
				mesEdit: false,
				portraitEdit: false,
				passEdit: false,
				form: {}
			}
		},
		components: {
			message,
			portrait,
			password
		},
		mounted() {
			this.username = sessionStorage.getItem("username");
			this.fetchData();
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
			},
			fetchData() {
				this.$ajax.post('/vos/user/getByUsername', { username: this.username }).then(res => {
					if (res.code == 200) {
						this.form = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './userCenter.scss';
</style>