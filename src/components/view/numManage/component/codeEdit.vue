<template>
	<div id="codeEdit" class="numDialog">
		<el-dialog title="新增/编辑目的码" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<div class="form_item input">
					<div class="form_title right">企业名称：</div>
					<div class="form_con">
						<el-input v-model="person" placeholder="请输入企业名称，在列表中选择企业" size="mini">
						</el-input>
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">使用用途：</div>
					<div class="form_con">
						<el-select v-model="person" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						<el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="grey">说明：目的码证明材料可以是缴费材料，也可以是自助平台相关截图</p>
					</div>
				</div>
				<div class="form_item input">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						40023842844
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">目的码：</div>
					<div class="form_con">
						<div v-for="(item,index) in codeList" :key="index" style="margin-bottom:10px;">
							<el-input v-model="item.num" size="mini" placeholder="请输入黑名单号码"></el-input>
							<el-button v-if="index==0" type="primary" icon="el-icon-plus" size="mini" @click="addcode(true)"></el-button>
							<el-button v-if="index>0" type="primary" icon="el-icon-minus" size="mini" @click="addcode(false,index)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">增加目的码
						<div class="search padding">
							<p>功能资费： 100 元/首</p>
							<p>是否赠送： 收费</p>
							<p>功能备注： 每个企业默认可设置3个目的码，增加可呼转的目的码数量需要收费。</p>
						</div>
					</div>
				</div>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="mini">确定</el-button>
				<el-button type="primary" size="mini" plain>取消</el-button>
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
		props: ["show", "type"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				person: "",
				codeList: [{
					num: ""
				}],
				imageUrl: '',
				dialogVisible: false,
				options: [
					{ value: 0, label: "转接" },
					{ value: 1, label: "放音挂机" },
					{ value: 2, label: "IVR" }
				]
			};
		},
		methods: {
			close() {
				this.$emit("close");
			},
			addcode(bol, index) {
				if (bol) {
					this.codeList.push({ num: "" });
				} else {
					if (this.codeList.length > 1) {
						this.codeList.splice(index, 1);
					}
				}
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
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
		}
	};
</script>