<template>
	<div id="codeEdit" class="numDialog">
		<el-dialog title="新增/编辑目的码" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible" :close-on-click-modal="false">
			<div class="block">
				<div class="form_item input">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						{{vData.business.number400}}
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">企业名称：</div>
					<div class="form_con">
						<el-input v-model="vData.business.companyName" placeholder="请输入企业名称，在列表中选择企业" size="small">
						</el-input>
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">使用用途：</div>
					<div class="form_con">
						<el-select v-model="form.usage" placeholder="请选择" size="small">
							<el-option :label="item.dicValue" :value="item.dicKey" v-for="item in options" :key="item.dicKey"></el-option>
						</el-select>
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">目的码证明材料：</div>
					<div class="form_con">
						{{$global.serverSrc}}
						<el-upload class="avatar-uploader examplew" :action="$global.uploadUrl" :show-file-list="false" accept=".png,.jpeg,.jpg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :with-credentials="true">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="grey">说明：目的码证明材料可以是缴费材料，也可以是自助平台相关截图</p>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">目的码：</div>
					<div class="form_con">
						<div v-for="(item,index) in codeList" :key="index" style="margin-bottom:10px;">
							<el-input v-model="item.destNumber" size="small" placeholder="请输入目的码"></el-input>
							<el-button v-if="index==0" type="primary" icon="el-icon-plus" size="small" @click="addcode(true)"></el-button>
							<el-button v-if="index>0" type="primary" icon="el-icon-minus" size="small" @click="addcode(false,index)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">增加目的码
						<div class="search padding">
							<div v-for="item in valueAddedList" :key="item.id">
								<p>功能资费：{{item.tariffFee+'元'}}</p>
								<p v-if="item.presents==1">是否赠送：赠送</p>
								<p v-if="item.presents==2">是否赠送：付费</p>
								<p>功能备注：{{item.remarks}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="small" @click="submit">确定</el-button>
				<el-button type="primary" size="small" plain @click="close(flase)">取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>
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

<script>
	export default {
		name: "codeEdit",
		props: ["show", "vData"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			},
			'vData.flowId': function (n, o) {
				if (n != undefined) {
					this.getData(this.vData.flowId);
				};
			}
		},
		data() {
			return {
				form: {
					usage: '',
					imageUrl: ''
				},
				imageUrl: '',
				codeList: [{
					destNumber: '',
					id: ''
				}],
				valueAddedList: [],
				imageUrl: '',
				companyFlow: {},
				dialogVisible: false,
				options: [],
				companyFlow: {},
				company: {}
			};
		},
		mounted() {
			this.getUsage();
			this.getValueAdded();
		},
		methods: {
			close(bol) {
				this.$emit("close", false, null, bol);
			},
			addcode(bol, index) {
				if (bol) {
					this.codeList.push({
						destNumber: '',
						id: ''
					});
				} else {
					if (this.codeList.length > 1) {
						this.codeList.splice(index, 1);
					}
				}
			},
			submit() {
				var companyInfo = {};
				companyInfo.number400 = this.vData.business.number400;
				companyInfo.companyFlow = this.companyFlow;
				companyInfo.company = this.company;
				companyInfo.destNumber = [];
				this.codeList.map((item) => {
					companyInfo.destNumber.push({
						id: item.id,
						destNumber: item.destNumber,
						destnumProofPic: this.form.imageUrl,
						destnumUsage: this.form.usage,
						number400: this.vData.business.number400,
						companyid: this.company.id
					})

				});
				this.$ajax.post('/vos/destnum/updateDirectly', companyInfo).then((res) => {
					if (res.code == 200) {
						this.$message.success('修改目的码成功');
						this.close(true);
					}
				})
			},
			getData(flowId) {
				let _this = this;
				this.$ajax.get('/vos/destnum/getCacheData?flowId=' + flowId).then(res => {
					if (res.code == 200) {
						this.imageUrl = this.$global.serverSrc + res.data.destNumber[0].destnumProofPic;
						let pic = res.data.destNumber[0].destnumProofPic.split('/');
						this.form.imageUrl = pic[pic.length - 1];
						this.form.usage = res.data.destNumber[0].destnumUsage;
						this.companyFlow = res.data.companyFlow;
						this.company = res.data.company;
						this.codeList = [];
						res.data.destNumber.map(item => {
							_this.codeList.push({
								destNumber: item.destNumber,
								id: item.id
							})
						});
					}
				});
			},
			beforeAvatarUpload(file) {
				//const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				// this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
					return false;
				}
				return true;
			},
			handleAvatarSuccess(res, files, fileList) {
				if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
					this.form.imageUrl = res;
					this.imageUrl = URL.createObjectURL(files.raw);
				}
			},
			getValueAdded(val) {
				this.$ajax.get('/vos/blacklist/getValueAdded/' + (sessionStorage.getItem('businessType') == 'self' ? 30 : 31)).then((res) => {
					if (res.code == 200) {
						this.valueAddedList = [];
						this.valueAddedList.push(res.data);
					}
				})
			},
			getUsage() {
				this.$ajax.post('/vos/dic/getDicsByType', {
					"dicType": "usage",
					"status": 1
				}).then((res) => {
					this.options = res.data.dicList;
				})
			}
		}
	};
</script>