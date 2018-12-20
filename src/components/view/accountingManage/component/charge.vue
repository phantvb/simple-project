<template>
	<div id="charge">
		<el-dialog title="时长包充值" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="form_item">
				<div class="form_title right">400号码：</div>
				<div class="form_con">4008272566</div>
			</div>
			<div class="form_item">
				<div class="form_title right">企业名称：</div>
				<div class="form_con">杭州凯悦餐饮管理有限公司</div>
			</div>
			<div class="form_item">
				<div class="form_title right">时长包：</div>
				<div class="form_con">
					<el-select v-model="charge" placeholder="请选择" size="mini">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">数量：</div>
				<div class="form_con">
					<el-input v-model="charge" style="max-width:220px;" size="mini" placeholder="填写该优惠方案名称"></el-input> 个
				</div>
			</div>
			<footer class="right">
				<el-button type="primary" size="mini" plain>取消</el-button>
				<el-button type="primary" size="mini">确定</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>

<script>
	export default {
		name: 'charge',
		props: ['show'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: false,
				type: '1',
				charge: '',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '选项2',
					label: '等待送审'
				}, {
					value: '选项3',
					label: '待审核'
				}, {
					value: '选项4',
					label: '审核通过'
				}, {
					value: '选项5',
					label: '被驳回'
				}],
			}
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	}
</script>