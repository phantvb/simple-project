<template>
	<div id="transfer" class="lightblueTable">
		<el-dialog title="确认/修改到账" class="left" :visible.sync="dialogVisible" @close="close">
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
				账务信息
			</div>
			<div class="total">
				<p class="left">应收合计：<span class="red">{{data.shouldReceive}}</span> 元</p>
				<p class="left">实收合计：<span class="red">{{data.realReceive}}</span> 元</p>
			</div>
			<div class="block">
				<el-table :data="recordData" border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="accountNo" label="到账编号" min-width="80">
						<template slot-scope="scope">
							<el-input v-model="scope.row.accountNo" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="accountTime" label="到账日期" min-width="120">
						<template slot-scope="scope">
							<el-date-picker style="margin-right:15px;" v-model="scope.row.accountTime" type="datetime" placeholder="请选择日期" size="mini" value-format="yyyy-MM-dd HH:mm:00">
							</el-date-picker>
						</template>
					</el-table-column>
					<el-table-column prop="realIncome" label="实收" min-width="120">
						<template slot-scope="scope">
							<el-input v-model="scope.row.realIncome" size="mini"></el-input>
						</template>
					</el-table-column>
				</el-table>
				<div class="lightblue center">
					<el-button type="text" size="mini" @click="addRecord">新增到账信息</el-button>
				</div>
			</div>
			<div class="title">
				开通设置
			</div>
			<div class="block">
				号码开通时间：
				<el-date-picker style="margin-right:15px;" v-model="openTime" type="datetime" placeholder="请选择日期" size="mini" value-format="yyyy-MM-dd HH:mm:00" :picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<footer class="right">
				<el-button type="primary" size="mini" plain @click="close">取消</el-button>
				<el-button type="primary" size="mini" @click="submit">确定</el-button>
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
		props: ['show', 'data'],
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
				recordData: [],
				openTime: '',
				pickerOptions: {
					disabledDate: (time) => {
						var d = new Date();
						d.setDate(new Date().getDate() - 1);
						return time.getTime() < d.getTime();
					}
				}
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			submit() {
				var data = {};
				data.realReceives = this.recordData;
				var d = new Date(new Date().getTime() + 1 * 60 * 1000);
				data.openTime = new Date(this.openTime.replace(/-/g, '/')) < new Date() ? this.formatTime(d) : this.openTime;
				data.id = this.data.id;
				this.$ajax.post('/vos/accountsTotal/addRealReceive', data).then(res => {
					if (res.code == 200) {
						this.$message('success');
						this.close();
					}
				})
			},
			getAccountsTotal() {
				this.$ajax.post('/vos/accountsTotal/getDetail', { accountsTotal: { id: this.data.id } }).then(res => {
					if (res.code == 200) {
						this.recordData = res.data.realReceive;
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
			}
		}
	}
</script>