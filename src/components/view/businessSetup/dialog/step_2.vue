<template>
	<div id="step_2">
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<div>
			<div class="title">
				企业资料
			</div>
			<div class="block data">
				<div>
					<div style="float:left;">
						<span class="grey fmini">企业资质证明文件：</span>
					</div>
					<ul>
						<li class="l2">
							<el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</li>
						<li class="l2 example">
							<p class="grey fmini" style="margin-top:0px;">参考示例：</p>
							<img class="examplew" src="../../../../assets/example_1.png" alt="">
						</li>
						<p class="grey fmini">◆ 请提供证件的原件照片或者彩色扫描件（正副本均可）,文字/盖章清晰可辨认，并说明材料优先级 参考样式</p>
						<p class="grey fmini">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
					</ul>
				</div>
			</div>
			<div class="title">
				法人资料
			</div>
			<div class="block person_data">
				<div>
					<div style="float:left;">
						<span class="grey fmini">法人身份证：</span>
					</div>
					<ul>
						<li class="l2">
							<ul>
								<li class="l2">
									<el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</li>
								<li class="l2">
									<el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</li>
							</ul>
							<ul>
								<li class="l2">
									<el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</li>
							</ul>
						</li>
						<li class="l2">
							<ul>
								<li class="l2 example">
									<img class="exampleh" src="../../../../assets/example_2.png" alt="">
								</li>
								<li class="l2 example">
									<img class="exampleh" src="../../../../assets/example_3.png" alt="">
								</li>
							</ul>
							<ul>
								<li class="l2 example">
									<img class="exampleh" src="../../../../assets/example_4.png" alt="">
								</li>
							</ul>
						</li>
						<p class="grey fmini">◆ 请提供身份证的原件照片或者彩色扫描件文字清晰可辨认，如正反面复印件在一页上只需上传一张。</p>
						<p class="grey fmini">◆ 法人持身份证照片法人外貌必须和证件文字必须清晰可辨认</p>
						<p class="grey fmini">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
					</ul>
				</div>
			</div>
		</div>
		<footer class="right">
			<el-button type="primary" size="mini" @click="next(1)" plain>上一步</el-button>
			<el-button type="primary" size="mini" plain>暂存信息</el-button>
			<el-button type="primary" size="mini" @click="next(3)">立刻送审</el-button>
		</footer>
	</div>
</template>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		background-color: #ecf5ff;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.examplew .avatar-uploader-icon {
		width: 120px;
		height: 148px;
		line-height: 148px;
	}

	.examplew .avatar {
		width: 120px;
		height: 148px;
	}

	.exampleh .avatar-uploader-icon {
		width: 148px;
		height: 120px;
		line-height: 120px;
	}

	.exampleh .avatar {
		width: 148px;
		height: 120px;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		text-align: center;
	}

	.avatar {
		display: block;
	}
</style>

<style lang="scss" scoped>
	@import './company.scss';
</style>
<script>
	export default {
		name: 'baseMes',
		data() {
			return {
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		methods: {
			next(step) {
				this.$emit('next', step);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleAvatarSuccess(res, file) {
				console.log(1);
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				// this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return true;
			}
		},

	}
</script>