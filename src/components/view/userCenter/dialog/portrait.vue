<template>
	<div id="portrait">
		<el-dialog title="修改头像" :visible.sync="dialogVisible" @close="close">
			<el-tabs v-model="active">
				<el-tab-pane label="选择头像" name="1">
					<ul class="portrait">
						<li style="width:60%;border-right:1px solid #ccc;box-sizing: border-box;" class="left" @click="chooseImg">
							<p class="grey note">从个性头像库里选择一张图片作为头像</p>
							<ul>
								<li class="l3">
									<img src="/static/userHead1.png" alt="userHead1.png">
								</li>
								<li class="l3">
									<img src="/static/userHead2.png" alt="userHead2.png">
								</li>
								<li class="l3">
									<img src="/static/userHead3.png" alt="userHead3.png">
								</li>
							</ul>
							<ul>
								<li class="l3">
									<img src="/static/userHead4.png" alt="userHead4.png">
								</li>
								<li class="l3">
									<img src="/static/userHead5.png" alt="userHead5.png">
								</li>
								<li class="l3">
									<img src="/static/userHead6.png" alt="userHead6.png">
								</li>
							</ul>
						</li>
						<li style="width:40%" class="preview left">
							<img src="/static/userHead1.png" ref="preview">
							<p>头像预览</p>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="本地上传" name="2">
					<el-upload class="upload-demo" :with-credentials="true" :action="$global.uploadUrl" :on-success="uploaded" :limit="1" :before-upload="beforeAvatarUpload">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">
							<p class="grey note">从电脑里挑选一张好图作为头像吧</p>
							<p class="grey note">支持jpg/png格式图片，文件需小于2M</p>
						</div>
					</el-upload>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="submit" size="mini">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped>
	@import './dialog.scss';

	img {
		width: 80%;
		height: 80%;
		border-radius: 100%;
	}
</style>
<script>
	export default {
		name: 'portrait',
		data() {
			return {
				active: "1",
				dialogVisible: false,
				fileList: [],
				fileAlt: 'userHead1.png',
				form: {
					id: '',
					username: '',
					password: '',
					roleName: '',
					roleId: '',
					enabled: '',
					name: '',
					phone: '',
					sex: '',
					remark: '',
					province: '',
					provinceId: '',
					city: '',
					cityId: '',
					area: '',
					areaId: '',
					email: '',
					idNo: '',
					headPicture: '',
					businessType: '',
					remark: ''
				},
			}
		},
		props: ['show', 'data'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			},
			data(n, o) {
				for (let key in n) {
					if (key in this.form) {
						this.form[key] = n[key];
					}
				};
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			chooseImg(e) {
				var src = e.target.getAttribute('src');
				var alt = e.target.getAttribute('alt');
				this.$refs.preview.setAttribute('src', src);
				this.fileAlt = alt;
			},
			uploaded(res, file, fileList) {
				this.fileList = fileList;
			},
			submit() {
				if (this.active == 1) {
					this.form.headPicture = this.fileAlt;
				} else {
					if (this.fileList.length == 0) {
						this.$message({
							message: '请先选择图片!',
							type: 'error'
						});
						return;
					} else {
						this.form.headPicture = this.fileList[0].response;
					}
				}
				this.$ajax.post('/vos/user/saveUser', { user: this.form }).then(res => {
					if (res.code == 200) {
						this.$message({
							message: '编辑成功!',
							type: 'success'
						});
						this.close();
					}
				});
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					return false;
				} else {
					return true;
				}
			},
		}
	}
</script>