<template>
	<div id="step_2" class="step">
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
							<el-upload class="avatar-uploader examplew" :with-credentials="true" :action="$global.uploadUrl" :show-file-list="false" :on-success="uploaded1" :before-upload="beforeAvatarUpload">
								<img v-if="file.p1!=''" :src="imageUrl.p1" class="avatar">
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
									<el-upload class="avatar-uploader exampleh" :with-credentials="true" :action="$global.uploadUrl" :show-file-list="false" :on-success="uploaded2" :before-upload="beforeAvatarUpload">
										<img v-if="file.p2!=''" :src="imageUrl.p2" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</li>
								<li class="l2">
									<el-upload class="avatar-uploader exampleh" :with-credentials="true" :action="$global.uploadUrl" :show-file-list="false" :on-success="uploaded3" :before-upload="beforeAvatarUpload">
										<img v-if="file.p3!=''" :src="imageUrl.p3" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
								</li>
							</ul>
							<ul>
								<li class="l2">
									<el-upload class="avatar-uploader exampleh" :with-credentials="true" :action="$global.uploadUrl" :show-file-list="false" :on-success="uploaded4" :before-upload="beforeAvatarUpload">
										<img v-if="file.p4!=''" :src="imageUrl.p4" class="avatar">
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
			<el-button type="primary" size="mini" plain @click="submit(false)" v-if="editType==0">暂存信息</el-button>
			<el-button type="primary" size="mini" @click="submit(true)">立刻送审</el-button>
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
		height: 169px;
	}

	.exampleh .avatar-uploader-icon {
		width: 148px;
		height: 120px;
		line-height: 120px;
	}

	.exampleh .avatar {
		width: 200px;
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
				imageUrl: {
					p1: '',
					p2: '',
					p3: '',
					p4: ''
				},
				file: {
					p1: '',
					p2: '',
					p3: '',
					p4: ''
				}
			}
		},
		watch: {
			oneData(newV, oldV) {
				this.file.p1 = newV.companyProofPic;
				this.file.p2 = newV.legalCardFrontPic;
				this.file.p3 = newV.legalCardBackPic;
				this.file.p4 = newV.legalCardHandPic;
				this.imageUrl.p1 = this.$global.serverSrc + this.file.p1;
				this.imageUrl.p2 = this.$global.serverSrc + this.file.p2;
				this.imageUrl.p3 = this.$global.serverSrc + this.file.p3;
				this.imageUrl.p4 = this.$global.serverSrc + this.file.p4;
			}
		},
		props: ['oneData', 'idData', 'isComplete', 'editType'],
		methods: {
			next(step) {
				this.$emit('next', step);
			},
			submit(bol) {
				var url = bol ? '/vos/company/sendToCompanyAudit' : '/vos/company/startAndSave';
				var data = {};
				data.company = Object.assign({}, this.oneData);
				data.company.companyProofPic = this.file.p1;
				data.company.legalCardFrontPic = this.file.p2;
				data.company.legalCardBackPic = this.file.p3;
				data.company.legalCardHandPic = this.file.p4;
				data.companyFlow = {
					flowId: this.idData.flowId || ''
				};
				if (!this.isComplete && bol) {
					this.$message.error('请先返回上一步完善信息');
				} else {
					if (this.editType == 0) {
						this.$ajax.post(url, data).then(res => {
							if (res.code == 200) {
								this.$message.success('操作成功');
								this.$emit('complete', true);
							}
						});
					} else if (this.editType == 1) {
						data.companyFlow = this.idData;
						this.$ajax.post('/vos/company/sendToModifyAudit', data).then(res => {
							if (res.code == 200) {
								this.$message.success('操作成功');
								this.$emit('complete', true);
							}
						});
					}
				}
			},
			beforeAvatarUpload(file) {
				const isLt10M = file.size / 1024 / 1024 < 10;
				if (!isLt10M) {
					this.$message.error('上传头像图片大小不能超过 10MB!');
					return false;
				} else {
					return true;
				}
			},
			uploaded1(res, files, fileList) {
				if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
					this.file.p1 = res;
					this.imageUrl.p1 = URL.createObjectURL(files.raw);
				}
				// let file = files.raw;
				// let param = new FormData(); //创建form对象
				// param.append('file', file); //通过append向form对象添加数据
				// let config = {
				// 	headers: { 'Content-Type': 'multipart/form-data' }
				// }; //添加请求头
				// this.$ajax.post('/vos/common/uploadImg', param).then(response => {
				// 	console.log(response);
				// })
			},
			uploaded2(res, files, fileList) {
				if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
					this.file.p2 = res;
					this.imageUrl.p2 = URL.createObjectURL(files.raw);
				}
			},
			uploaded3(res, files, fileList) {
				if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
					this.file.p3 = res;
					this.imageUrl.p3 = URL.createObjectURL(files.raw);
				}
			},
			uploaded4(res, files, fileList) {
				if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
					this.file.p4 = res;
					this.imageUrl.p4 = URL.createObjectURL(files.raw);
				}
			},

		},

	}
</script>