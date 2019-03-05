<template>
	<div id="billManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="active">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="left">
				<button :class="billType==0?'active':'plain'" @click="billTypeSel(0)">号码月账单</button>
				<button :class="billType==1?'active':'plain'" @click="billTypeSel(1)">每月总账单</button>
			</div>
			<div class="search" v-if="permission.indexOf(90)!=-1" @keyup.enter="fetchData()">
				<ul v-if="billType==0">
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="small"></el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="small"></el-input>
					</li>
					<li>
						<span class="demonstration">套餐：</span>
						<el-select v-model="form.packageName" placeholder="请选择" size="small">
							<el-option v-for="item in packageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration" v-if="billType==0">月份：</span>
					<el-date-picker style="margin-right:15px;" v-if="billType==0" v-model="form.time" type="month" placeholder="请选择月份" size="small" format="yyyy 年 MM 月" value-format="yyyy-MM" @change="fetchData()"></el-date-picker>
					<span class="demonstration" v-if="billType==1">开始月份：</span>
					<el-date-picker style="margin-right:15px;" v-if="billType==1" v-model="monthTotalBillForm.timeS" type="month" placeholder="请选择月份" size="small" format="yyyy 年 MM 月" value-format="yyyy-MM" @change="fetchData()"></el-date-picker>
					<span class="demonstration" v-if="billType==1">结束月份：</span>
					<el-date-picker style="margin-right:15px;" v-if="billType==1" v-model="monthTotalBillForm.timeE" type="month" placeholder="请选择月份" size="small" format="yyyy 年 MM 月" value-format="yyyy-MM" @change="fetchData()"></el-date-picker>
					<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" plain size="small" @click="outPut" v-if="permission.indexOf(91)!=-1">导出</el-button>
			</section>
			<el-table v-show="billType==0" :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="month" label="月份" min-width="80">
					<template slot-scope="scope">{{scope.row.monthTime.substring(0,7)}}</template>
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="100"></el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="120"></el-table-column>
				<el-table-column prop="packageName" label="套餐" min-width="150"></el-table-column>
				<el-table-column prop="feeUsed" label="套餐内计费" min-width="100"></el-table-column>
				<el-table-column prop="excessFee" label="超额计费" min-width="80"></el-table-column>
				<el-table-column prop="excessMinute" label="时长包计费" min-width="80"></el-table-column>
				<el-table-column prop="feeValueAdded" label="增值业务费用" min-width="100"></el-table-column>
				<el-table-column prop="totalFee" label="·费用合计" min-width="80"></el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="showBillDetail(true,scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-table v-show="billType==1" :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="month" label="月份" min-width="80">
					<template slot-scope="scope">{{scope.row.monthTime.substring(0,7)}}</template>
				</el-table-column>
				<el-table-column prop="usedTime" label="当月使用时长(秒)" min-width="100"></el-table-column>
				<el-table-column prop="usedMinutes" label="当月使用分钟数" min-width="100"></el-table-column>
				<el-table-column prop="inpackageFee" label="当月套餐计费(元)" min-width="120"></el-table-column>
				<el-table-column prop="excessFee" label="当月超额计费(元)" min-width="100"></el-table-column>
				<el-table-column prop="shouldReceive" label="当月应收合计(元)" min-width="120"></el-table-column>
				<el-table-column prop="lineCost" label="当月线路成本(元)" min-width="100"></el-table-column>
				<el-table-column prop="profit" label="当月利润(元)" min-width="100"></el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
		</el-tabs>
		<billDetail :show="billDetail" @close="close" :data="billDetailData"></billDetail>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>
<script>
	import billDetail from "./component/billDetail.vue";
	export default {
		name: "billManage",
		components: {
			billDetail
		},
		data() {
			return {
				form: {
					number400: "",
					companyName: "",
					packageName: "",
					time: ""
				},
				monthTotalBillForm: {
					timeS: "",
					timeE: ""
				},
				billDetailData: {
					numberMonthBill: {},
					ValueAddedList: [],
					timePacketList: [],
					packageInfo: {}
				},
				active: "self",
				billType: 0,
				loading: false,
				billDetail: false,
				packageOptions: [],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				permission: []
			};
		},
		watch: {
			active(n, o) {
				this.fetchData();
			}
		},
		mounted() {
			this.fetchData();
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
				this.permission.push(item.id);
			});
		},
		methods: {
			billTypeSel(type) {
				this.billType = type;
				this.fetchData();
			},
			close() {
				this.showBillDetail(false, {});
				//this.fetchData();
			},
			showBillDetail(bol, data) {
				if (data.id) {
					this.$ajax.get("/vos/monthBill/getDetail/" + data.id).then(res => {
						if (res.code == 200) {
							res.data.ValueAddedList.map((item) => {
								item.amount = item.numOfMonth;
								if (item.units == "perMonth") {
									item.unit = item.valueAddedFee + "元/月";
									item.amounts = item.amount + "月";
								} else if (item.units == "perOne") {
									item.unit = item.valueAddedFee + "元/个";
									item.amounts = item.numOfOne + "个";
								} else if (item.units == "perMonthOne") {
									item.unit = item.valueAddedFee + "元/月/个";
									item.amounts = item.amount + "月" + item.numOfOne + "个";
								}

								if (item.presents == 1) {
									item.present = "赠送"
								} else {
									item.present = "付费"
								}
							});
							this.billDetailData = res.data;
							this.billDetail = bol;
						}
					});
				} else {
					this.billDetail = bol;
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
				this.$clear(this.monthTotalBillForm);
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
				data.channel = this.active;

				function tob(num) {
					var n = parseInt(num);
					num++;
					return n > 9 ? n : "0" + n;
				}
				if (this.billType == 0) {
					data.numberMonthBill = Object.assign({}, this.form);
					delete data.numberMonthBill["time"];
					data.startTime = this.form.time ? this.form.time + "-01 0:00:00" : "";
					// var e = this.form.time ? new Date((this.form.time + '-01 0:00:00').replace(/-/g, '/')) : "";
					// if()
					data.endTime = this.form.time ?
						this.form.time.split("-")[0] +
						"-" +
						tob(this.form.time.split("-")[1]) +
						"-01 0:00:00" :
						"";
					this.$ajax.post("/vos/monthBill/search", data).then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.tableData = res.data.numberMonthBill;
							this.page.total = res.data.totalCount;
						}
					});
				} else {
					data.startTime = this.monthTotalBillForm.timeS ?
						this.monthTotalBillForm.timeS + "-01 0:00:00" :
						"";
					data.endTime = this.monthTotalBillForm.timeE ?
						this.monthTotalBillForm.timeE.split("-")[0] +
						"-" +
						tob(this.monthTotalBillForm.timeE.split("-")[1]) +
						"-01 0:00:00" :
						"";
					this.$ajax.post("/vos/monthTotalBill/search", data).then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.tableData = res.data.monthTotalBills;
							this.page.total = res.data.totalCount;
						}
					});
				}
			},
			outPut() {
				if (this.billType == 0) {
					window.open('/vos/excel/monthBill');
				} else {
					window.open('/vos/excel/monthTotalBill');
				};
			}
		}
	};
</script>