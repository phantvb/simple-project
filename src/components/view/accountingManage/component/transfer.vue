<template>
	<div id="transfer" class="lightblueTable">
		<el-dialog title="确认/修改到账" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="title">
				基本信息
			</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">
							400号码: 4008818611
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							企业名称: 杭州顺网科技股份有限公司
						</p>
					</li>
				</ul>
			</div>
			<div class="title">
				账务信息
			</div>
			<div class="block">
				<el-table :data="recordData" border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="name" label="名称" min-width="120">
					</el-table-column>
					<el-table-column prop="num" label="金额" min-width="60">
					</el-table-column>
					<el-table-column prop="money" label="实收" min-width="60">
					</el-table-column>
					<el-table-column prop="money" label="到账编号" min-width="80">
					</el-table-column>
					<el-table-column prop="money" label="到账日期" min-width="100">
					</el-table-column>
					<el-table-column prop="money" label="备注" min-width="80">
					</el-table-column>
				</el-table>
			</div>
			<div class="total">
				<p class="left">应收合计：<span class="red">23323</span> 元</p>
				<p class="left">实收合计：<span class="red">23323</span> 元</p>
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
		name: 'billDetail',
		props: ['show'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: false,
				recordData: [{
					name: '500元5000分钟',
					num: 1,
					money: 500
				}]
			}
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	}
</script>