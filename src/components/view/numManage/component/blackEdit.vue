<template>
	<div id="blackEdit" class="numDialog">
		<el-dialog :title="type=='one'?'新增/编辑企业黑名单':'新增/编辑全局黑名单'" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<div class="form_item" v-if="type=='one'">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						<el-select v-model="number400" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-button type="primary" size="mini">搜索</el-button>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">黑名单号码：</div>
					<div class="form_con">
						<div v-for="(item,index) in blackList" :key="index" style="margin-bottom:10px;">
							<el-input v-model="item.num" size="mini" placeholder="请输入黑名单号码"></el-input>
							<el-button v-if="type=='all'&&index==0" type="primary" icon="el-icon-plus" size="mini" @click="addBlack(true)"></el-button>
							<el-button v-if="type=='all'&&index>0" type="primary" icon="el-icon-minus" size="mini" @click="addBlack(false,index)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item" v-if="type=='one'&&this.valueAdded.id">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">{{valueAdded.tariffName}}
						<div class="search padding">
							<p>功能资费： {{valueAdded.tariffFee}} 元/{{valueAdded.presents}}首</p>
							<p>是否赠送： 收费</p>
							<p>功能备注： {{valueAdded.remarks}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="mini" @click="submit">确定</el-button>
				<el-button type="primary" size="mini" plain @click="dialogVisible=false">取消</el-button>
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
					this.number400 = this.data.number400;
					this.blackList[0].num = this.data.blackNumber;
					if (this.type == 'one') {
						this.getValueAdded(this.data.valueAddedId);
					} else {

					}
				} else {
					this.number400 = "";
					this.blackList = [];
					this.blackList.push({ num: "" });
					this.valueAdded = {};
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
				options: [
					{ value: 0, label: "转接" },
					{ value: 1, label: "放音挂机" },
					{ value: 2, label: "IVR" }
				]
			};
		},
		mounted() {
			//this.$ajax.get('/vos/number400/getAll')
		},
		methods: {
			submit() {
				var data = {};
				var url = '';
				if (this.data.id) {
					//编辑
					if (this.type == 'one') {
						url = '/vos/blacklist/update';
						data.blacklist = {
							id: this.data.id || '',
							number400: this.number400,
							blackType: this.type,
							blackNumber: this.blackList[0].num
						}
					} else {
						url = '/vos/blacklist/update';
						data.blacklist = {
							id: 5,
							number400: 400100009,
							blackType: 'one',
							blackNumber: 123456789
						}

					}
				} else {
                    //新增
                    if (this.type == 'one') {
						url = '/vos/blacklist/update';
						data.blacklist = {
							id: this.data.id || '',
							number400: this.number400,
							blackType: this.type,
							blackNumber: this.blackList[0].num
						}
					} else {
						url = '/vos/blacklist/update';
						data.blacklist = {
							id: 5,
							number400: 400100009,
							blackType: 'one',
							blackNumber: 123456789
						}

					}
				}

			},
			close() {
				this.$emit("close");
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
			getValueAdded(id) {
				this.$ajax.get('/vos/blacklist/getValueAdded/' + id).then(res => {
					if (res.code == 200) {
						this.valueAdded = res.data;
					}
				})
			}
		}
	};
</script>