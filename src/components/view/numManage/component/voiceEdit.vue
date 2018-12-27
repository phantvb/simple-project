<template>
	<div id="voiceEdit" class="numDialog">
		<el-dialog title="新增/编辑语音文件" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<div class="form_item">
					<div class="form_title right">企业名称：</div>
					<div class="form_con">
						<el-input v-model="person" size="mini" placeholder="请输入企业名称，在列表中选择企业">
						</el-input>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						<el-select v-model="person" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-button type="primary" size="mini">搜索</el-button>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">语音类型：</div>
					<div class="form_con">
						<el-select v-model="person" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">语音文件：</div>
					<div class="form_con">
						<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :limit="3" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">上传</el-button>
						</el-upload>
						<p class="grey fmini">支持flv、mp3、wma、swf、wmv、mid、avi、mpg、<br>asf、rm、rmvb格式，文件需小于10M</p>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">语音名称：</div>
					<div class="form_con">
						<el-input v-model="person" placeholder="该语音方案的名称" size="mini">
						</el-input>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">
						彩铃制作
						<div class="search padding">
							<p>功能资费： 100 元/首</p>
							<p>是否赠送： 收费</p>
							<p>功能备注： 将企业提出的文字制作为彩铃（限50字以内）</p>
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

<script>
	export default {
		name: "voiceEdit",
		props: ["show"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				person: '',
				dialogVisible: false,
				options: [{ value: 0, label: '转接' }, { value: 1, label: '放音挂机' }, { value: 2, label: 'IVR' }],
				fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]

			};
		},
		methods: {
			close() {
				this.$emit("close");
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			}
		}
	};
</script>