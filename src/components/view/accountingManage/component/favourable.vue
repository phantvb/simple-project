<template>
	<div id="favourable">
		<el-dialog title="添加优惠" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="form_item">
				<div class="form_title right">400号码：</div>
				<div class="form_con">4008272566</div>
			</div>
			<div class="form_item">
				<div class="form_title right">优惠类型：</div>
				<div class="form_con">
					<el-radio v-model="type" label="1">系统优惠</el-radio>
					<el-radio v-model="type" label="2">特殊优惠</el-radio>
				</div>
			</div>
			<div class="form_item">
				<div class="form_con grey fmini">
					系统优惠为系统设置的标准优惠方案，修改后该号码的业务受理单记录也会做相应更改。特殊优惠为单独优惠方案，用于运营活动，不影响业务受理记录
				</div>
			</div>
			<div class="form_item" v-if="type==1">
				<div class="form_title right">系统优惠：</div>
				<div class="form_con">
					<el-select v-model="favourable" placeholder="请选择" size="mini">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item" v-if="type==2">
				<div class="form_title right">特殊优惠名称：</div>
				<div class="form_con">
					<el-input v-model="favourable" style="max-width:220px;" size="mini" placeholder="填写该优惠方案名称"></el-input>
				</div>
			</div>
			<div class="form_item" v-if="type==2">
				<div class="form_title right">指定时间：</div>
				<div class="form_con">
					<el-date-picker v-model="favourable" size="mini" type="date" placeholder="选择日期">
					</el-date-picker>
				</div>
			</div>
			<div class="form_item" v-if="type==2">
				<div class="form_title right">优惠金额：</div>
				<div class="form_con">
					<el-input v-model="favourable" style="max-width:220px;" size="mini" placeholder="填写优惠金额"></el-input>
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
		name: 'favourable',
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
				favourable: '',
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