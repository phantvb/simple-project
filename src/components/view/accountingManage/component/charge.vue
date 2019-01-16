<template>
	<div id="charge">
		<el-dialog title="时长包充值" class="left" :visible.sync="dialogVisible" @close="close">
			<div class="form_item">
				<div class="form_title right">400号码：</div>
				<div class="form_con">
					<el-select v-model="form.number400" @change="number400Change" filterable remote reserve-keyword placeholder="请输入400号" :remote-method="remoteMethod" :loading="loading" size="mini" value-key="id">
						<el-option v-for="item in numberOptions" :key="item.id" :label="item.number400" :value="item">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">企业名称：</div>
				<div class="form_con">{{form.companyName===null?'未绑定公司名':form.companyName}}</div>
			</div>
			<div class="form_item">
				<div class="form_title right">时长包：</div>
				<div class="form_con">
					<el-select v-model="form.charge" placeholder="请选择" size="mini" value-key="id">
						<el-option v-for="item in timePacketOptions" :key="item.id" :label="item.timePacketName" :value="item">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">数量：</div>
				<div class="form_con">
					<el-input v-model="form.amount" style="max-width:220px;" size="mini" placeholder="填写该优惠方案名称"></el-input> 个
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">优惠：</div>
				<div class="form_con">
					<el-select v-model="form.concession" placeholder="请选择" size="mini" value-key="id">
						<el-option v-for="item in concessionOptions" :key="item.id" :label="item.concessionName" :value="item">
						</el-option>
					</el-select>
				</div>
			</div>
			<footer class="right">
				<el-button type="primary" size="mini" plain @click="dialogVisible=false">取消</el-button>
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
		name: 'charge',
		props: ['show', 'active'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				if (newV) {
					this.getTimePacket();
					this.form.amount = 1;
				}
			},
			'form.charge': {
				handler: function (n, o) {
					if (n.rechargeLimit != 0 && this.form.amount != 0) {
						this.getConcession();
					}
				},
			},
			'form.amount': {
				handler: function (n, o) {
					if (n != 0 && this.form.charge.rechargeLimit != 0) {
						this.getConcession();
					}
				},
			}
		},
		data() {
			return {
				dialogVisible: false,
				form: {
					number400: '',
					companyName: '',
					amount: 0,
					charge: {},
					concession: {},
				},
				loading: false,
				timePacketOptions: [],
				concessionOptions: [],
				numberOptions: []
			}
		},
		mounted() {
			this.getTimePacket();
		},
		methods: {
			submit() {
				var data = {};
				data.channel = this.active;
				data = Object.assign(data, this.form);
				data = Object.assign(data, this.form.charge);
				delete data.id;
				delete data.charge;
				delete data.concession;
				data.number400 = data.number400.number400;
				if (this.form.number400 == '' || !this.form.charge.timePacketName || !this.form.concession.concessionName) {
					this.$message({
						message: '请先完善信息',
						type: 'warning'
					});
					return;
				}

				this.$ajax.post('/vos/number400TimePacket/add', { number400TimePacket: data, concessionScheme: this.form.concession }).then(res => {
					if (res.code == 200) {
						this.dialogVisible = false;
						this.close();
					}
				})
			},
			close() {
				this.$clear(this.form);
				this.$emit('close');
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					this.$ajax.post('/vos/num400config/search', {
						page: {
							pageNo: 1,
							pageSize: 20
						},
						number400: {
							number400: query,
							channel: this.active,
							status: "CanUse"
						}
					}).then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.numberOptions = res.data.number400s;
						}
					})
				} else {
					this.numberOptions = [];
				}
			},
			number400Change(val) {
				this.form.companyName = val.companyName;
			},
			getTimePacket() {
				this.$ajax.post('/vos/tariffPackage/getTimePacket', { timePacket: { channel: this.active } }).then(res => {
					if (res.code == 200) {
						this.timePacketOptions = res.data.timePacketList;
					}
				});
			},
			getConcession() {
				var data = {};
				data.rechargeLimit = this.form.charge.rechargeLimit || 0;
				data.amount = this.form.amount;
				this.$ajax.post('/vos/number400TimePacket/searchConcession', { number400TimePacket: data }).then(res => {
					if (res.code == 200) {
						this.concessionOptions = res.data.concessionSchemes;
					}
				})
			}
		}
	}
</script>