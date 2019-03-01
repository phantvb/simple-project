<template>
	<div id="bollotManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="form.channel">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search" v-if="permission.indexOf(85)!=-1">
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="small">
						</el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="small">
						</el-input>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">到账状态：</span>
					<el-select v-model="form.accountStatus" placeholder="请选择" size="small" style="width:23%;max-width:150px;">
						<el-option v-for="item in accountStatusOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="demonstration">开票状态：</span>
					<el-select v-model="form.invoiceStatus" placeholder="请选择" size="small" style="width:23%;max-width:150px;">
						<el-option v-for="item in invoiceOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" size="small" style="width:80px;">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" plain size="small" @click="outPut(true)" v-if="permission.indexOf(86)!=-1">导出列表</el-button>
				<el-button type="primary" plain size="small" @click="outPut(false)" v-if="permission.indexOf(87)!=-1">导出详单</el-button>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="30">
				</el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="110">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="150">
				</el-table-column>
				<el-table-column prop="shouldReceive" label="应收款金额" min-width="100">
				</el-table-column>
				<el-table-column prop="person" label="未收款金额" min-width="100">
					<template slot-scope="scope">
						{{scope.row.shouldReceive-scope.row.realReceive}}
					</template>
				</el-table-column>
				<el-table-column prop="realReceive" label="已收款金额" min-width="100">
				</el-table-column>
				<el-table-column prop="status" label="到账状态" min-width="120">
					<template slot-scope="scope">
						<span v-for="item in accountStatusOptions" :key="item.value" v-show="item.value==scope.row.accountStatus">{{item.label}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="arrivedNoInvoice" label="到账未开票金额" min-width="120">
				</el-table-column>
				<el-table-column prop="haveInvoiced" label="已开票金额" min-width="100">
				</el-table-column>
				<el-table-column prop="leftNoInvoice" label="剩余未开票金额" min-width="140">
				</el-table-column>
				<el-table-column prop="invoiceStatus" label="开票状态" min-width="80">
					<template slot-scope="scope">
						<span v-for="item in invoiceOptions" :key="item.value" v-show="item.value==scope.row.invoiceStatus">{{item.label}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" v-if="scope.row.invoiceStatus!='TotalInvoiced'&&permission.indexOf(88)!=-1" @click="addbollot(true,scope.row,0)">添加开票</el-button>
						<el-button size="small" type="text" v-if="scope.row.invoiceStatus=='TotalInvoiced'&&permission.indexOf(89)!=-1" @click="addbollot(true,scope.row,0)">修改</el-button>
						<el-button size="small" type="text" @click="addbollot(true,scope.row,1)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<bollot :show="bollot" @close="addbollot(false)" :data="bollotData" :type="bollotType" @fresh="fetchData(page.num)"></bollot>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import bollot from './component/bollot.vue'
	export default {
		name: 'ballot',
		components: {
			bollot
		},
		data() {
			return {
				bollot: false,
				form: {
					number400: "",
					companyName: "",
					accountStatus: "",
					invoiceStatus: "",
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
				invoiceOptions: [{
					value: "",
					label: "全部"
				}, {
					value: "NotInvoice",
					label: "未开票"
				}, {
					value: "TotalInvoiced",
					label: "全部开票"
				}, {
					value: "PartInvoiced",
					label: "部分开票"
				}],
				bollotData: {},
				transferData: {},
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				bollotType: 0,
				permission: []
			}
		},
		mounted() {
			this.fetchData();
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
				this.permission.push(item.id);
			});
		},
		methods: {
			reset() {
				this.$clear(this.form);
				this.form.channel = 'self';
				this.fetchData();
			},
			addbollot(bol, data, type) {
				this.bollotData = data || {};
				this.bollotType = type;
				this.bollot = bol;
			},
			addtransfer(bol, data) {
				this.transferData = data || {};
				this.transfer = bol;
			},
			closetransfer(bol) {
				if (bol) {
					this.fetchData();
				}
				this.addtransfer(false);
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
				data.startTime = '';
				data.endTime = '';
				this.$ajax.post("/vos/accountsTotal/search", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.accountsTotals;
						this.page.total = res.data.totalCount;
					}
				});
			},
			outPut(bol) {
				if (bol) {
					window.open('/vos/excel/accountsTotal');
				} else {
					window.open('/vos/excel/accountsTotalDetail');
				};
			}
		}
	}
</script>