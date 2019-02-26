<template>
	<div id="accountingManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="form.channel">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search" v-if="permission.indexOf(80)!=-1">
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
					<li>
						<span class="demonstration">套餐：</span>
						<el-select v-model="form.packageName" placeholder="请选择" size="small">
							<el-option v-for="item in packageOptions" :key="item.tariffName" :label="item.tariffName" :value="item.tariffName" @change="fetchData()">
							</el-option>
						</el-select>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">起止时间：</span>
					<el-date-picker style="margin-right:15px;" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" format="yyyy 年 MM 月 dd日" value-format="yyyy-MM-dd 00:00:00" @change="fetchData()">
					</el-date-picker>
					<span class="demonstration">到账状态：</span>
					<el-select v-model="form.accountStatus" placeholder="请选择" size="small" @change="fetchData()">
						<el-option v-for="item in accountStatusOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" plain size="small" @click="outPut(true)" v-if="permission.indexOf(81)!=-1">导出列表</el-button>
				<el-button type="primary" plain size="small" @click="outPut(false)" v-if="permission.indexOf(82)!=-1">导出详单</el-button>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="100">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="100">
				</el-table-column>
				<el-table-column prop="packageName" label="基本套餐" min-width="120">
				</el-table-column>
				<el-table-column label="套餐时间" min-width="150">
					<template slot-scope="scope">
						{{scope.row.startTime?scope.row.startTime.substring(0,10):''}} 至 {{scope.row.endTime?scope.row.endTime.substring(0,10):'长期'}}
					</template>
				</el-table-column>
				<el-table-column prop="shouldReceive" label="应收合计" min-width="80">
				</el-table-column>
				<el-table-column prop="realReceive" label="实收合计" min-width="80">
				</el-table-column>
				<el-table-column prop="accountStatus" label="到账状态" min-width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.accountStatus=='NotArrive'">未到账</span>
						<span v-if="scope.row.accountStatus=='Cleared'">已清款</span>
						<span v-if="scope.row.accountStatus=='PartArrive'">部分到账</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="addfavourable(true,scope.row)" v-if="permission.indexOf(83)!=-1">添加优惠</el-button>
						<el-button size="small" type="text" @click="addtransfer(true,scope.row,0)" v-if="permission.indexOf(84)!=-1">确认到账</el-button>
						<el-button size="small" type="text" @click="addtransfer(true,scope.row,1)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<favourable :show="favourable" @close="closefavourable" :data="favourableData" :active="this.form.channel"></favourable>
		<transfer :show="transfer" @close="closetransfer" :transferType="transferType" :data="transferData"></transfer>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import favourable from './component/favourable.vue'
	import transfer from './component/transfer.vue'
	export default {
		name: 'accountingManage',
		components: {
			favourable,
			transfer
		},
		data() {
			return {
				favourable: false,
				transferType: 0, //0:编辑1查看
				transfer: false,
				form: {
					number400: "",
					companyName: "",
					packageName: "",
					accountStatus: "",
					time: [],
					channel: 'self'
				},
				favourableData: {},
				transferData: {},
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
				packageOptions: [],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				loading: false,
				permission: []
			}
		},
		watch: {
			'form.channel': function (n, o) {
				this.fetchData();
			}
		},
		mounted() {
			this.getPackage();
			this.fetchData();
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
				this.permission.push(item.id);
			});
		},
		methods: {
			addfavourable(bol, data) {
				this.favourableData = data || {};
				this.favourable = bol;
			},
			addtransfer(bol, data, type) {
				this.transferType = type;
				this.transferData = data || {};
				this.transfer = bol;
			},
			closefavourable(bol) {
				if (bol) {
					this.fetchData();
				}
				this.addfavourable(false);
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
			reset() {
				this.$clear(this.form);
				this.form.channel = 'self';
				this.fetchData();
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
				data.totalAccounts.packageName = data.totalAccounts.packageName == "全部" ? "" : data.totalAccounts.packageName;
				delete data.totalAccounts["time"];
				data.startTime = this.form.time[0] || "";
				data.endTime = this.form.time[1] || "";
				this.$ajax.post("/vos/accountsTotal/search", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.accountsTotals;
						this.page.total = res.data.totalCount;
					}
				});
			},
			getPackage() {
				var data = {
					id: "",
					channel: this.form.channel
				}
				this.$ajax.post('/vos/tariffPackage/getTariff', { tariff: data }).then(res => {
					if (res.code == 200) {
						this.packageOptions = res.data.tariffPackageList;
						this.packageOptions.unshift({
							tariffName: '时长包'
						});
						this.packageOptions.unshift({
							tariffName: '全部'
						});
					}
				})
			},
			outPut(bol) {
				if (bol) {
					window.open('/vos/excel/accounts');
				} else {
					window.open('/vos/excel/accountsDetail');
				};
			}
		}
	}
</script>