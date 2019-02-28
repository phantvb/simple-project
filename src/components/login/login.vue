<template>
	<div id="login">
		<section class="form">
			<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
				<div class="title">用户登录</div>
				<el-form-item prop="name">
					<el-input placeholder="请输入账号" v-model="loginForm.name">
						<template slot="prepend">账号</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input placeholder="请输入密码" v-model="loginForm.pass" type="password" @keyup.enter.native="submitForm" autocomplete="off">
						<template slot="prepend">密码</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="code">
					<el-input placeholder="请输入验证码" v-model="loginForm.code" @keyup.enter.native="submitForm">
						<template slot="append">
							<img v-if="codeImg" :src="$global.serverSrc+url" id="code" @click="changeImg">
						</template>
					</el-input>
				</el-form-item>
				<el-button type="primary" @click="submitForm" class="submit">登录
					<i class="el-icon-loading" v-show="loading"></i>
				</el-button>
			</el-form>
		</section>
	</div>
</template>

<style scoped>
	@import "./login.scss";
</style>


<script>
	export default {
		name: "login",
		data() {
			var checkName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("账号不能为空"));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else if (value.length < 6) {
					callback(new Error("密码长度不足"));
				} else if (
					!(/[a-z]/.test(value) && /[a-zA-Z]/.test(value) && /\W/.test(value))
				) {
					callback(new Error("密码强度弱,建议修改"));
				} else {
					callback();
				}
			};
			return {
				url: "code/image",
				loading: false,
				loginForm: {
					name: "",
					pass: "",
					code: ""
				},
				rules: {
					name: [{ validator: checkName, trigger: "blur" }],
					pass: [{ validator: validatePass, trigger: "blur" }]
				},
				codeImg: true
			};
		},
		mounted() {},
		methods: {
			submitForm() {
				var _this = this;
				this.loading = true;
				_this.$ajax
					.post(
						"/vos/user/login?username=" +
						this.loginForm.name +
						"&password=" +
						this.loginForm.pass +
						"&imageCode=" +
						this.loginForm.code
					)
					// .post('/vos/user/apiLogin', {
					// 	username: this.loginForm.name,
					// 	password: this.loginForm.pass,
					// 	imageCode: this.loginForm.code
					// })
					.then(resp => {
						if (resp.code == 200) {
							_this.loading = false;
							for (let key in resp.data) {
								sessionStorage.setItem(key, resp.data[key]);
							}
							_this.$ajax.get("/vos/menu/getTreeMenu?roleId=" + sessionStorage.getItem("roleId"))
								.then(res => {
									if (res.code == 200) {
										_this.$store.commit("addRoute", res.data.menuList);
										_this.$router.push("/Layout/userCenter");
									}
								});
						}

					});
			},

			changeImg() {
				//document.getElementById('code').src = this.url;
				this.codeImg = false;
				this.$nextTick(() => {
					this.codeImg = true;
				});
			}
		}
	};
</script>