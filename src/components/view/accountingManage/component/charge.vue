<template>
	<div id="charge">
		<el-dialog title="时长包充值" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="form_item">
				<div class="form_title right">400号码：</div>
				<div class="form_con">
					<el-select v-model="form.number400" @change="number400Change" filterable remote reserve-keyword placeholder="请输入400号" :remote-method="remoteMethod" :loading="loading" size="mini" value-key="id">
						<el-option v-for="item in numberOptions" :key="item.number400" :label="item.number400" :value="item">
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
					<el-select v-model="charge" placeholder="请选择" size="mini" value-key="id">
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
			},
			active(n, o) {
				this.getTimePacket(n);
			}
		},
		data() {
			return {
				dialogVisible: false,
				charge: '',
				form: {
					number400: '',
					companyName: '',
					amount: 1
				},
				loading: false,
				timePacketOptions: [],
				numberOptions: []
			}
		},
		mounted() {
			this.getTimePacket(this.active);
		},
		methods: {
			submit() {
				var data = {};
				data.timePacketName = this.charge.timePacketName;
				data.rechargeLimit = this.charge.rechargeLimit;
				data.dialingTime = this.charge.dialingTime;
				data.channel = this.active;
				data.timePacketName = this.charge.timePacketName;
				data = Object.assign(data, this.form);
				data.number400 = data.number400.number400;
				this.$ajax.post('/vos/number400TimePacket/add', { number400TimePacket: data }).then(res => {
					if (res.code == 200) {
						this.dialogVisible = false;
						this.close();
					}
				})
			},
			close() {
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
			getTimePacket(n) {
				this.$ajax.post('/vos/tariffPackage/getTimePacket', { timePacket: { channel: n } }).then(res => {
					if (res.code == 200) {
						this.timePacketOptions = res.data.timePacketList;
					}
				})
			}
		}
	}
</script>