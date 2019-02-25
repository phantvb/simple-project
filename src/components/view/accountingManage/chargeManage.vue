<template>
	<div id="chargeManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="active">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search">
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="small" style="min-width:200px;">
						</el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="small">
						</el-input>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">充值时间：</span>
					<el-date-picker style="margin-right:15px;" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd 00:00:00" @change="fetchData()">
					</el-date-picker>
					<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" style="float:left" size="small" @click="showcharge(true)"><i class="el-icon-plus"></i> 新增充值</el-button>
				<el-button type="primary" plain size="small">导出</el-button>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="120">
				</el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="100">
				</el-table-column>
				<el-table-column prop="timePacketName" label="时长包" min-width="120">
				</el-table-column>
				<el-table-column prop="amount" label="数量" min-width="80">
				</el-table-column>
				<el-table-column prop="totalFee" label="充值金额" min-width="100">
				</el-table-column>
				<el-table-column prop="totalTime" label="充值时间" min-width="100">
				</el-table-column>
				<el-table-column prop="operator" label="操作员" min-width="100">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<charge :show="addcharge" :active="active" @close="showcharge(false)"></charge>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import charge from './component/charge.vue';
	export default {
		name: 'chargeManage',
		components: {
			charge
		},
		data() {
			return {
				active: 'self',
				addcharge: false,
				form: {
					number400: '',
					companyName: '',
					time: []
				},
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				loading: false
			}
		},
		watch: {
			active(n, o) {
				this.fetchData();
			}
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			showcharge(bol) {
				this.addcharge = bol;
				if (!bol) {
					this.fetchData();
				}
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			reset() {
				this.$clear(this.form);
				this.fetchData();
			},
			fetchData(pageNum) {
				this.loading = true;
				this.page.num = pageNum || 1;
				var data = {};
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.number400TimePacket = Object.assign({}, this.form);
				data.number400TimePacket.channel = this.active;
				delete data.number400TimePacket["time"];
				data.beforeTime = this.form.time[0] || '';
				data.afterTime = this.form.time[1] || '';
				this.$ajax.post("/vos/number400TimePacket/search", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.number400TimePackets;
						this.page.total = res.data.totalCount;
					}
				});
			}
		}
	}
</script>