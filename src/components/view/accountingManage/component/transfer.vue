<template>
	<div id="transfer" class="lightblueTable">
		<el-dialog :title="transferTypeStr" class="left" :visible.sync="dialogVisible" @close="close">
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
			<div class="title" v-if="transferType==0">
				账务信息
			</div>
			<div class="total" v-if="transferType==0">
				<p class="left">应收合计：<span class="red">{{data.shouldReceive}}</span> 元</p>
				<p class="left">实收合计：<span class="red">{{data.realReceive}}</span> 元</p>
			</div>
			<div class="block" v-if="transferType==0">
				<el-table :data="recordData" border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="accountNo" label="到账编号" min-width="80">
						<template slot-scope="scope">
							<el-input v-model="scope.row.accountNo" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="accountTime" label="到账日期" min-width="120">
						<template slot-scope="scope">
							<el-date-picker style="margin-right:15px;" v-model="scope.row.accountTime" type="datetime" placeholder="请选择日期" size="small" value-format="yyyy-MM-dd HH:mm:00">
							</el-date-picker>
						</template>
					</el-table-column>
					<el-table-column prop="realIncome" label="实收" min-width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.realIncome" size="small"></el-input>
						</template>
					</el-table-column>
				</el-table>
				<div class="lightblue center">
					<el-button type="text" size="small" @click="addRecord">新增到账信息</el-button>
				</div>
			</div>
			<div class="title" v-if="transferType==0">
				开通设置
			</div>
			<div class="block" v-if="transferType==0">
				号码开通时间：
				<el-date-picker style="margin-right:15px;" v-model="openTime" type="datetime" placeholder="请选择日期" size="small" value-format="yyyy-MM-dd HH:mm:00" :picker-options="pickerOptions" :default-value='defaultValue'>
				</el-date-picker>
			</div>
			<div class="title" v-if="transferType==1||transferType==2">
				应收详情
			</div>
			<div class="block" v-if="transferType==1||transferType==2">
				<el-table :data="shouldReceiveData" :span-method="spanMethod" show-summary border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="accountsType" label="类别" min-width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.accountsType=='Package'">基本套餐</span>
							<span v-else-if="scope.row.accountsType=='ValueAdded'">增值业务</span>
							<span v-else-if="scope.row.accountsType=='Concession'">优惠信息</span>
							<span v-else-if="scope.row.accountsType=='TimePacket'">时长包</span>
							<span v-else>{{scope.row.accountsType}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="名称" min-width="120">
					</el-table-column>
					<el-table-column prop="amount" label="数量" min-width="60">
					</el-table-column>
					<el-table-column prop="unit" label="单位" min-width="60">
					</el-table-column>
					<el-table-column prop="accountTime" label="起止时间" min-width="120">
						<template slot-scope="scope">
							{{scope.row.startTime?scope.row.startTime.substring(0,10):''}} 至 {{scope.row.endTime?scope.row.endTime.substring(0,10):'长期'}}
						</template>
					</el-table-column>
					<el-table-column prop="shouldReceive" label="应收" min-width="60">
					</el-table-column>
				</el-table>
			</div>
			<div class="title" v-if="transferType==1">
				实收详情
			</div>
			<div class="block" v-if="transferType==1">
				<el-table :data="recordData" show-summary border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="accountNo" label="到账编号" min-width="80">
					</el-table-column>
					<el-table-column prop="accountTime" label="到账日期" min-width="120">
					</el-table-column>
					<el-table-column prop="realIncome" label="实收" min-width="120">
					</el-table-column>
				</el-table>
			</div>
			<footer class="right">
				<el-button type="primary" size="small" plain @click="close(false)">取消</el-button>
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
		name: 'billDetail',
		props: ['show', 'data', 'transferType'],
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
		computed: {
			transferTypeStr() {
				var str;
				if (this.transferType == 0) {
					str = '确认/修改到账';
				} else if (this.transferType == 1) {
					str = '应收详单';
				} else if (this.transferType == 2) {
					str = '开票详单';
				}
				return str;
			}
		},
		data() {
			return {
				dialogVisible: false,
				recordData: [],
				shouldReceiveData: [],
				openTime: null,
				defaultValue: new Date().getTime() + 10 * 60 * 1000,
				pickerOptions: {
					disabledDate: (time) => {
						var d = new Date();
						d.setDate(new Date().getDate() - 1);
						return time.getTime() < d.getTime();
					},
					shortcuts: [{
						text: '三分钟后',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() + 3 * 60 * 1000);
							picker.$emit('pick', date);
						}
					}]
				}
			}
		},
		methods: {
			close(bol) {
				this.$emit('close', bol);
			},
			submit() {
				var data = {};

				if (this.transferType == 1) {
					this.close(false);
					return;
				};
				if (new Date(this.openTime.replace(/-/g, '/')) < new Date()) {
					// let d = new Date(new Date().getTime() + 1 * 60 * 1000);
					// this.formatTime(d);
					// data.openTime =this.openTime;
					this.$throw('建议在5分钟或者之后开通号码');
					return;
				} else {
					data.openTime = this.openTime;
				}
				data.realReceives = this.recordData;
				data.id = this.data.id;
				this.$ajax.post('/vos/accountsTotal/addRealReceive', data).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						this.close(true);
					}
				})
			},
			getAccountsTotal() {
				this.$ajax.post('/vos/accountsTotal/getDetail', { accountsTotal: { id: this.data.id } }).then(res => {
					if (res.code == 200) {
						res.data.shouldReceive.map((item) => {
							if (item.units == "perMonth") {
								item.unit = "月";
								item.amount = item.numOfMonth;
							} else if (item.units == "perOne") {
								item.unit = "个";
								item.amount = item.numOfOne;
							} else if (item.units == "perMonthOne") {
								item.unit = "月/个";
								item.amount = item.numOfMonth + " / " + item.numOfOne;
							} else if (item.units == "year") {
								item.unit = "年";
								item.amount = item.numOfOne;
							} else if (item.units == "month") {
								item.unit = "月";
								item.amount = item.numOfOne;
							} else if (item.accountsType == "Package") {
								item.unit = item.units;
								item.amount = item.numOfOne;
							}
						});
						this.openTime = res.data.accountsTotal.openTime;
						this.recordData = res.data.realReceive;
						this.shouldReceiveData = res.data.shouldReceive;
					}
				})
			},
			addRecord() {
				this.recordData.push({
					number400: this.data.number400,
					companyName: this.data.companyName,
					accountNo: '',
					realIncome: '',
					channel: this.data.channel,
					accountTime: ''
				})
			},
			formatTime(time) {
				var d = time;

				function tob(num) {
					var n = parseInt(num);
					num++;
					return n > 9 ? n : "0" + n;
				};
				return d.getFullYear() + '-' + tob(d.getMonth() + 1) + '-' + tob(d.getDate()) + ' ' + tob(d.getHours()) + ':' + tob(d.getMinutes()) + ':' + tob(d.getSeconds());
			},
			spanMethod({ row, column, rowIndex, columnIndex }) {
				var type = row.accountsType;
				var _rowspan = 0;
				var _this = this;

				function check(_index) {
					if (_this.shouldReceiveData[_index + 1] && _this.shouldReceiveData[_index + 1].accountsType == type) {
						_rowspan++;
						check(_index + 1);
					} else {
						return;
					}
				}
				if (columnIndex === 0) {
					if (rowIndex == 0 || this.shouldReceiveData[rowIndex - 1].accountsType != type) {
						_rowspan++;
						check(rowIndex);
					};
					if (_rowspan !== 0) {
						return {
							rowspan: _rowspan,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}

			}
		}
	}
</script>