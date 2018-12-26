<template>
	<div id="blackEdit" class="numDialog">
		<el-dialog :title="type==1?'新增/编辑企业黑名单':'新增/编辑全局黑名单'" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
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
					<div class="form_title right">黑名单号码：</div>
					<div class="form_con">
						<el-input v-model="person" size="mini" placeholder="请输入黑名单号码">
						</el-input>
						<el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">
						企业黑名单
						<div class="search padding">
							<p>功能资费： 100 元/首</p>
							<p>是否赠送： 收费</p>
							<p>功能备注： 限制黑名单上的号码呼入400号码</p>
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
		name: "blackEdit",
		props: ["show", "type"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				person: '',
				dialogVisible: true,
				options: [{ value: 0, label: '转接' }, { value: 1, label: '放音挂机' }, { value: 2, label: 'IVR' }],
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