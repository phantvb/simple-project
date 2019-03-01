<template>
	<div id="numManage" class="managerFormTitle" v-loading="loading">
		<el-tabs v-model="active">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search" v-if="permission.indexOf(55)!=-1">
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="small"></el-input>
					</li>
					<li>
						<span class="demonstration">引示号码：</span>
						<el-input v-model="form.guideNumber" placeholder="请输入内容" size="small"></el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="small"></el-input>
					</li>
				</ul>
				<div class="block left" style="margin-left:68px;">
					<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="left block lineTop">
				<el-button type="primary" size="small" @click="formatusageStatus(true)" v-if="permission.indexOf(56)!=-1">启用</el-button>
				<el-button type="primary" plain size="small" @click="formatusageStatus(false)" v-if="permission.indexOf(56)!=-1">关停</el-button>
				<div style="float:right">
					<span class="fmini">状态：</span>
					<el-select v-model="form.usageStatus" placeholder="请选择" size="small" @change="fetchData()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="100"></el-table-column>
				<el-table-column prop="guideNumber" label="引示号码" min-width="100"></el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="120"></el-table-column>
				<el-table-column prop="tariffName" label="套餐名称" min-width="120"></el-table-column>
				<el-table-column prop="dueTime" label="套餐到期时间" min-width="120"></el-table-column>
				<el-table-column prop="channel" label="状态" min-width="80">
					<template slot-scope="scope">
						<span :class="scope.row.usageStatus=='Started'?'success':'red'">{{scope.row.usageStatus=='Started'?'启用':'关停'}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<div class="likeButton" v-if="permission.indexOf(56)!=-1">
							<el-button size="small" type="text" @click="formatusageStatusSimple(scope.row)">{{scope.row.usageStatus=="Started"?'停用':'启用'}}</el-button>
						</div>
						<!-- <div class="likeButton" v-if="permission.indexOf(59)!=-1">
							<el-button size="small" type="text">注销</el-button>
						</div> -->
						<div class="likeButton" v-if="permission.indexOf(60)!=-1">
							<el-button size="small" type="text" @click="editnumSetup(true,scope.row)">号码设置</el-button>
						</div>
						<!-- <el-button size="small" type="text">详情</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
			<numSetup :show="numSetupShow" @close="editnumSetup(false)" :id="numSetupData.id" :number400Data="numSetupData"></numSetup>
		</el-tabs>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>
<script>
	import numSetup from "./component/numSetup.vue";
	export default {
		name: "numManage",
		components: {
			numSetup
		},
		data() {
			return {
				active: "self",
				form: {
					number400: "",
					companyName: "",
					guideNumber: "",
					usageStatus: ""
				},
				multipleSelection: [],
				numSetupShow: false,
				numSetupData: {},
				options: [{
						value: "",
						label: "全部"
					},
					{
						value: "Started",
						label: "启用"
					},
					{
						value: "Stop",
						label: "停用"
					}
				],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				loading: false,
				permission: []
			};
		},
		watch: {
			active: function (n, o) {
				this.fetchData();
			}
		},
		mounted() {
			this.fetchData();
			console.log(this.$store.getters.getPermission(location.hash.replace(/#/, '')))
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
				this.permission.push(item.id);
			});
		},
		methods: {
			reset() {
				this.$clear(this.form);
				this.fetchData();
			},
			formatusageStatusSimple(scope) {
				var arr = [];
				if (scope.usageStatus == "Started") {
					arr.push({
						id: scope.id,
						number400: scope.number400,
						usageStatus: "Stop"
					})
				} else {
					arr.push({
						id: scope.id,
						number400: scope.number400,
						usageStatus: "Started"
					})
				};
				this.changeusageStatus(arr);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			formatusageStatus(bol) {
				var arr = [];
				if (bol) {
					this.multipleSelection.map(item => {
						arr.push({
							id: item.id,
							number400: item.number400,
							usageStatus: "Started"
						})
					});
				} else {
					this.multipleSelection.map(item => {
						arr.push({
							id: item.id,
							number400: item.number400,
							usageStatus: "Stop"
						})
					});
				};
				this.changeusageStatus(arr);
			},
			changeusageStatus(data) {
				this.loading = true;
				this.$ajax.post('/vos/num400config/setStatus', {
					number400: data
				}).then(res => {
					if (res.code = 200) {
						this.loading = false;
						this.fetchData();
					}
				})
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			editnumSetup(bol, data) {
				this.numSetupShow = bol;
				if (bol) {
					this.numSetupData = {
						id: data.id,
						number400: data.number400,
						companyName: data.companyName,
						guideNumber: data.guideNumber
					};
				}
			},
			fetchData(pageNum) {
				var data = {};
				this.loading = true;
				this.page.num = pageNum || 1;
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.number400 = this.form;
				data.number400.channel = this.active;
				this.$ajax.post("/vos/num400config/search", this.$format(data)).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.number400s;
						this.page.total = res.data.totalCount;
					}
				});
			}
		}
	};
</script>