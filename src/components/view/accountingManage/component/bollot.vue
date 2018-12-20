<template>
	<div id="bollot" class="lightblueTable">
		<el-dialog title="号码月账单详情" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
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
				<div style="border-bottom:1px solid #ccc;margin-bottom:15px;padding-bottom:15px;">
					<div style="float:left;line-height:28px;" class="fsm">
						收款：
					</div>
					<ul>
						<li class="l2">
							<p class="fmini">
								应收金额: 1300
							</p>
							<p class="fmini">
								未收金额: <span class="red">23323</span>
							</p>
						</li>
						<li class="l2">
							<p class="fmini">
								已收金额: 1200
							</p>
						</li>
					</ul>
				</div>
				<div>
					<div style="float:left;line-height:28px;" class="fsm">
						开票：
					</div>
					<ul>
						<li class="l2">
							<p class="fmini">
								到账未开票金额: 0
							</p>
							<p class="fmini">
								剩余开票金额: <span class="red">23323</span>
							</p>
						</li>
						<li class="l2">
							<p class="fmini">
								已开票金额: 1200
							</p>
						</li>
					</ul>
				</div>
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
					<el-table-column prop="money" label="已开票金额" min-width="100">
					</el-table-column>
					<el-table-column prop="money" label="发票编号" min-width="80">
					</el-table-column>
					<el-table-column prop="money" label="开票日期" min-width="80">
					</el-table-column>
					<el-table-column prop="money" label="快递编号" min-width="120">
						<template slot-scope="scope">
							<el-select v-model="money" placeholder="请选择" size="mini">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
							<el-input v-model="money" placeholder="请输入内容" size="mini">
							</el-input>
						</template>
					</el-table-column>
					<el-table-column prop="money" label="寄件人" min-width="100">
					</el-table-column>
				</el-table>
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
		name: 'bollot',
		props: ['show'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: true,
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