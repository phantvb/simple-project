<template>
	<div id="login">
		<section class="form">
			<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
				<div class="title">
					用户登录
				</div>
				<el-form-item prop="name">
					<el-input placeholder="请输入账号" v-model="loginForm.name">
						<template slot="prepend">账号</template>
					</el-input>
					<!-- <el-input type="password" v-model="loginForm.name" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item prop="pass">
					<el-input placeholder="请输入密码" v-model="loginForm.pass">
						<template slot="prepend">密码</template>
					</el-input>
					<!-- <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item prop="code">
					<el-input placeholder="请输入验证码" v-model="loginForm.code">
						<template slot="append"><img :src=url id="code" @click="changeImg" />
						</template>
					</el-input>
					<!-- <el-input v-model.number="loginForm.code"></el-input> -->
				</el-form-item>
				<el-button type="primary" @click="submitForm" class="submit">登录<i class="el-icon-loading"></i>
				</el-button>
			</el-form>
		</section>
	</div>
</template>

<style scoped>
	@import './login.scss';
</style>


<script>
	export default {
		name: 'login',
		data() {
			var checkName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('账号不能为空'));
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				}
			};
			return {
				url: 'http://192.168.0.154:5480/vos/code/image',
				loading: false,
				loginForm: {
					name: '',
					pass: '',
					code: ''
				},
				rules: {
					name: [
						{ validator: checkName, trigger: 'blur' }
					],
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					// code: [
					//   { validator: checkName, trigger: 'blur' }
					// ]
				}
			}
		},
		methods: {
			submitForm() {
				var _this = this;
				this.loading = true;
				_this.$ajax.post('/vos/user/apiLogin', {
					username: this.loginForm.name,
					password: this.loginForm.pass,
					imageCode: this.loginForm.code
				}).then(resp => {
					console.log(resp)
					_this.loading = false;
					this.$router.push('/accountingManage/accountingManage')
				});
			},
			changeImg() {
				document.getElementById('code').src = this.url;
			}
		}
	}
</script>