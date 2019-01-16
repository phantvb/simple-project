<template>
	<div id="password">
		<el-dialog title="修改密码" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-form-item label="原密码" prop="oldpass">
					<el-input type="password" v-model="form.oldpass" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="pass">
					<el-input type="password" v-model="form.pass" autocomplete="off" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="form.checkPass" autocomplete="off" size="mini"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="close" size="mini">取 消</el-button>
				<el-button type="primary" @click="submitForm('form')" size="mini">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped>
	@import './dialog.scss';
</style>
<script>
	export default {
		name: 'password',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					var bol = false;
					['_', '-', '+', '=', '*', '!', '@', '#', '$', '%', '^', '&', '(', ')'].map(item => {
						if (value.indexOf(item) != -1 && value.search(/[0-9]/g) != -1 && value.search(/[a-zA-Z]/g) != -1) {
							bol = true;
						}
					})
					if (bol) {
						if (this.form.checkPass !== '') {
							this.$refs.form.validateField('checkPass');
						}
						callback();
					} else {
						callback(new Error('密码必须包含数字、字母及特殊字符'));
					}
				}
			};
			var validateOldPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					var bol = false;
					['_', '-', '+', '=', '*', '!', '@', '#', '$', '%', '^', '&', '(', ')'].map(item => {
						if (value.indexOf(item) != -1 && value.search(/[0-9]/g) != -1 && value.search(/[a-zA-Z]/g) != -1) {
							bol = true;
						}
					})
					if (bol) {
						callback();
					} else {
						callback(new Error('密码必须包含数字、字母及特殊字符'));
					}
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				dialogVisible: false,
				form: {
					pass: '',
					checkPass: '',
					oldpass: ''
				},
				rules: {
					oldpass: [
						{ validator: validateOldPass, trigger: 'blur' }
					],
					pass: [
						{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass2, trigger: 'blur' }
					]
				}
			}
		},
		props: ['show', 'data'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		methods: {
			close() {
				this.init();
				this.$emit('close');
			},
			init() {
				for (let key in this.form) {
					this.form[key] = '';
				}
			},
			submitForm(formName) {
				var _this = this;
				this.$ajax.post('/vos/user/editPassword', {
					"userId": this.data.id,
					"oldPassword": this.form.oldpass,
					"newPassword": this.form.pass
				}).then(res => {
					if (res.code == 200) {
						_this.$message({
							message: '修改成功!',
							type: 'success'
						});
						_this.close();
					}
				});
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$ajax.post('/vos/user/editPassword', {
							"userId": this.data.id,
							"oldPassword": this.form.oldpass,
							"newPassword": this.form.pass
						}).then(res => {
							if (res.code == 200) {
								_this.$message({
									message: '修改成功!',
									type: 'success'
								});
								_this.close();
							}
						});
					} else {
						return false;
					}
				});
			}
		}
	}
</script>