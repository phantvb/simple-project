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
							400号码: {{data.number400}}
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							企业名称: {{data.companyName}}
						</p>
					</li>
				</ul>
			</div>
			<div class="title">
				账务详情
			</div>
			<div class="block">
				<div style="border-bottom:1px solid #ccc;margin-bottom:15px;padding-bottom:15px;">
					<div style="float:left;line-height:28px;" class="fsm">
						收款：
					</div>
					<ul>
						<li class="l2">
							<p class="fmini">
								应收金额: {{data.shouldReceive}}
							</p>
							<p class="fmini">
								未收金额: <span class="red">{{data.shouldReceive-data.realReceive}}</span>
							</p>
						</li>
						<li class="l2">
							<p class="fmini">
								已收金额: {{data.realReceive}}
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
								到账未开票金额: {{data.arrivedNoInvoice}}
							</p>
							<p class="fmini">
								剩余开票金额: <span class="red">{{data.leftNoInvoice}}</span>
							</p>
						</li>
						<li class="l2">
							<p class="fmini">
								已开票金额: {{data.haveInvoiced}}
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="block">
				<el-table :data="recordData" border style="width: 100%" :header-row-class-name="'lightblue'" show-summary :summary-method="getSummaries">
					<el-table-column prop="accountNo" label="到账编号" min-width="80">
					</el-table-column>
					<el-table-column prop="accountTime" label="到账日期" min-width="140">
					</el-table-column>
					<el-table-column prop="realIncome" label="实收" min-width="60">
					</el-table-column>
					<el-table-column prop="haveInvoice" label="已开票金额" min-width="100">
						<template slot-scope="scope">
							<el-input v-if="type==0" v-model="scope.row.haveInvoice" size="small"></el-input>
							<span v-if="type==1">{{scope.row.haveInvoice}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="invoiceNo" label="发票编号" min-width="100">
						<template slot-scope="scope">
							<el-input v-if="type==0" v-model="scope.row.invoiceNo" size="small"></el-input>
							<span v-if="type==1">{{scope.row.invoiceNo}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="invoiceDate" label="开票日期" min-width="120">
						<template slot-scope="scope">
							<el-date-picker v-if="type==0" style="margin-right:15px;" v-model="scope.row.invoiceDate" type="datetime" placeholder="请选择日期" size="small" value-format="yyyy-MM-dd HH:mm:00">
							</el-date-picker>
							<span v-if="type==1">{{scope.row.invoiceDate}}</span>
						</template>
					</el-table-column>
					<el-table-column label="快递编号" min-width="150">
						<template slot-scope="scope">
							<el-select v-if="type==0" v-model="scope.row.expressName" placeholder="请选择快递类型" size="small">
								<el-option v-for="item in options" :key="item.dicKey" :label="item.dicValue" :value="item.dicKey">
								</el-option>
							</el-select>
							<el-input v-if="type==0" v-model="scope.row.expressNo" placeholder="请输入快递编号" size="small">
							</el-input>
							<span v-if="type==1">{{scope.row.expressName+' '+scope.row.expressNo}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="senderName" label="寄件人" min-width="100">
						<template slot-scope="scope">
							<el-input v-if="type==0" v-model="scope.row.senderName" size="small"></el-input>
							<span v-if="type==1">{{scope.row.senderName}}</span>
						</template>
					</el-table-column>
				</el-table>
				<!-- <div class="lightblue center" v-if="data.invoiceStatus!='TotalInvoiced'">
					<el-button type="text" size="small" @click="addRecord">新增开票信息</el-button>
				</div> -->
			</div>
			<footer class="right">
				<el-button type="primary" size="small" plain>取消</el-button>
				<el-button type="primary" size="small" @click="submit">确定</el-button>
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
		props: ['show', 'data', 'type'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			},
			'data.id': function (n, o) {
				if (n) {
					this.getAccountsTotal(n);
				}
			}
		},
		data() {
			return {
				dialogVisible: false,
				options: [],
				recordData: []
			}
		},
		mounted() {
			this.$ajax.post('/vos/dic/getDicsByType', { dicType: 'express', status: '1' }).then(res => {
				if (res.code == 200) {
					this.options = res.data.dicList;
				}
			})
		},
		methods: {
			close() {
				this.$emit('close');
			},
			getAccountsTotal() {
				this.$ajax.post('/vos/accountsTotal/getDetail', { accountsTotal: { id: this.data.id } }).then(res => {
					if (res.code == 200) {
						this.recordData = res.data.realReceive;
					}
				})
			},
			submit() {
				this.$ajax.post('/vos/accountsTotal/confirmInvoice', { realReceives: this.recordData, accountType: 'Total', id: this.data.id }).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
					}
				})
			},
			addRecord() {
				this.recordData.push({
					accountNo: '',
					accountTime: '',
					accountsTotalId: '',
					channel: '',
					companyName: '',
					expressName: '',
					expressNo: '',
					haveInvoice: '',
					id: '',
					invoiceDate: '',
					invoiceNo: '',
					number400: '',
					realIncome: '',
					senderName: ''
				})
			},
			getSummaries(param) {
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '总计';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
					} else {
						sums[index] = '';
					}
				});
				sums[4] = '';
				return sums;
			}
		}
	}
</script>