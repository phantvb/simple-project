<template>
	<div id="blackEdit" class="numDialog">
		<el-dialog :title="type=='one'?'新增/编辑企业黑名单':'新增/编辑全局黑名单'" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<div class="form_item" v-if="type=='one'">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						<el-select v-model="number400" filterable remote reserve-keyword placeholder="请输入400号" :remote-method="remoteMethod" :loading="loading" size="small" value-key="id">
							<el-option v-for="(item,index) in numberOptions" :key="index" :label="item.number400" :value="item">
							</el-option>
						</el-select>
						<el-button type="primary" size="small">搜索</el-button>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">黑名单号码：</div>
					<div class="form_con">
						<div v-for="(item,index) in blackList" :key="index" style="margin-bottom:10px;">
							<el-input v-model="item.num" size="small" placeholder="请输入黑名单号码"></el-input>
							<el-button v-if="type=='all'&&index==0" type="primary" icon="el-icon-plus" size="small" @click="addBlack(true)"></el-button>
							<el-button v-if="type=='all'&&index>0" type="primary" icon="el-icon-minus" size="small" @click="addBlack(false,index)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item" v-show="type=='one'">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">{{valueAdded.tariffName}}
						<div class="search padding">
							<p>功能资费： {{valueAdded.tariffFee}} 元</p>
							<p v-if="item.presents==1">是否赠送：赠送</p>
							<p v-if="item.presents==2">是否赠送：付费</p>
							<p>功能备注：{{item.remarks}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="small" @click="submit">确定</el-button>
				<el-button type="primary" size="small" plain @click="close">取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	export default {
		name: "blackEdit",
		props: ["show", "type", "data"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				if (this.data.id) {
					this.getValueAdded();
					this.number400 = this.data.number400;
					this.blackList[0].num = this.data.blackNumber;
				} else {
					this.number400 = "";
					this.blackList = [];
					this.blackList.push({ num: "" });
				}
			}
		},
		data() {
			return {
				number400: "",
				blackList: [{
					num: ""
				}],
				valueAdded: {},
				dialogVisible: false,
				numberOptions: [],
				loading: false,
			};
		},
		mounted() {},
		methods: {
			submit() {
				var data = {};
				data.blacklist = [];
				var url = '';
				if (this.data.id) {
					//编辑
					if (this.type == 'one') {
						url = '/vos/blacklist/update';
						data.blacklist.push({
							id: this.data.id,
							number400: this.data.number400,
							blackType: this.type,
							blackNumber: this.blackList[0].num,
							companyName: this.data.companyName,
							valueAddedId: this.valueAdded.id,
							tariffName: this.valueAdded.tariffName,
							tariffFee: this.valueAdded.tariffFee,
							presents: this.valueAdded.presents,
							units: this.valueAdded.units
						});
					} else {
						url = '/vos/blacklist/update';
						this.blackList.map(item => {
							data.blacklist.push({
								blackNumber: item.num,
								blackType: this.type,
								id: this.data.id
							})
						});
					}
				} else {
					//新增
					if (this.type == 'one') {
						url = '/vos/blacklist/add';
						data.blacklist.push({
							number400: this.number400.number400,
							blackType: this.type,
							blackNumber: this.blackList[0].num,
							companyName: this.number400.companyName,
							valueAddedId: this.valueAdded.id,
							tariffName: this.valueAdded.tariffName,
							tariffFee: this.valueAdded.tariffFee,
							presents: this.valueAdded.presents,
							units: this.valueAdded.units
						});
					} else {
						url = '/vos/blacklist/add';
						this.blackList.map(item => {
							data.blacklist.push({
								blackNumber: item.num,
								blackType: this.type
							})
						});
					}
				}
				this.$ajax.post(url, data).then(res => {
					if (res.code == 200) {
						this.dialogVisible = false;
						this.close(true);
					}
				})
			},
			close(bol) {
				this.$emit("close", bol);
			},
			addBlack(bol, index) {
				if (bol) {
					this.blackList.push({ num: "" });
				} else {
					if (this.blackList.length > 1) {
						this.blackList.splice(index, 1);
					}
				}
			},
			getValueAdded() {
				this.$ajax.get('/vos/blacklist/getValueAdded/' + (sessionStorage.getItem('businessType') == 'self' ? 51 : 52)).then(res => {
					if (res.code == 200) {
						this.valueAdded = res.data || {};
					}
				})
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
		}
	};
</script>