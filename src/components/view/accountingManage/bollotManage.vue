<template>
	<div id="bollotManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="form.channel">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search">
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">到账状态：</span>
					<el-select v-model="form.accountStatus" placeholder="请选择" size="mini" style="width:23%;max-width:150px;">
						<el-option v-for="item in accountStatusOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="demonstration">开票状态：</span>
					<el-select v-model="form.bollotStatus" placeholder="请选择" size="mini" style="width:23%;max-width:150px;">
						<el-option v-for="item in bollotOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
					<el-button type="primary" plain size="mini" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" plain size="mini">导出列表</el-button>
				<el-button type="primary" plain size="mini">导出详单</el-button>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="30">
				</el-table-column>
				<el-table-column prop="type" label="400号码" min-width="80">
				</el-table-column>
				<el-table-column prop="name" label="企业名称" min-width="200">
				</el-table-column>
				<el-table-column prop="number" label="应收款金额" min-width="100">
				</el-table-column>
				<el-table-column prop="person" label="未收款金额" min-width="100">
				</el-table-column>
				<el-table-column prop="date" label="已收款金额" min-width="100">
				</el-table-column>
				<el-table-column prop="status" label="到账编号/时间" min-width="120">
				</el-table-column>
				<el-table-column prop="status" label="到账状态 " min-width="80">
				</el-table-column>
				<el-table-column prop="status" label="到账未开票金额" min-width="120">
				</el-table-column>
				<el-table-column prop="status" label="已开票金额" min-width="100">
				</el-table-column>
				<el-table-column prop="status" label="发票编号" min-width="100">
				</el-table-column>
				<el-table-column prop="status" label="剩余未开票金额" min-width="140">
				</el-table-column>
				<el-table-column prop="status" label="开票状态" min-width="120">
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="100">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="addbollot(true,scope.row)">添加开票</el-button>
						<el-button size="mini" type="text">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<!-- <bollot :show="bollot" @close="addbollot(false)"></bollot> -->
		<transfer :show="bollot" @close="closebollot" :transferType="transferType" :data="bollotData"></transfer>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	// import bollot from './component/bollot.vue'
	import transfer from './component/transfer.vue'
	export default {
		name: 'ballot',
		components: {
			transfer
		},
		data() {
			return {
				bollot: false,
				form: {
					number400: "",
					companyName: "",
					accountStatus: "",
					bollotStatus: "",
					channel: 'self'
				},
				loading: false,
				accountStatusOptions: [{
					value: "",
					label: "全部"
				}, {
					value: "NotArrive",
					label: "未到账"
				}, {
					value: "Cleared",
					label: "已清款"
				}, {
					value: "PartArrive",
					label: "部分到账"
				}],
				bollotOptions: [{
					value: "",
					label: "全部"
				}, {
					value: "NotArrive",
					label: "未开票"
				}, {
					value: "Cleared",
					label: "全部开票"
				}, {
					value: "PartArrive",
					label: "部分开票"
				}],
				bollotData: {},
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				transferType: 2,
			}
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			reset() {
				this.$clear(this.form);
				this.form.channel = 'self';
				this.fetchData();
			},
			addbollot(bol, data) {
				this.bollotData = data || {};
				this.bollot = bol;
			},
			closebollot(bol) {
				if (bol) {
					this.fetchData();
				}
				this.addbollot(false);
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			fetchData(pageNum) {
				this.page.num = pageNum || 1;
				this.loading = true;
				var data = {};
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.totalAccounts = Object.assign({}, this.form);
				this.$ajax.post("/vos/accountsTotal/search", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.accountsTotals;
						this.page.total = res.data.totalCount;
					}
				});

			}
		}
	}
</script>