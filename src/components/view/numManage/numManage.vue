<template>
	<div id="numManage" class="managerFormTitle">
		<el-tabs v-model="active">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search">
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
					<li>
						<span class="demonstration">引示号码：</span>
						<el-input v-model="form.guideNumber" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
				</ul>
				<div class="block left" style="margin-left:68px;">
					<el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
					<el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
				</div>
			</div>
			<section class="left block lineTop">
				<el-button type="primary" size="mini">启用</el-button>
				<el-button type="primary" plain size="mini">关停</el-button>
				<div style="float:right">
					<span class="fmini">状态：</span>
					<el-select v-model="form.status" placeholder="请选择" size="mini">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="100">
				</el-table-column>
				<el-table-column prop="guideNumber" label="引示号码" min-width="100">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" min-width="120">
				</el-table-column>
				<el-table-column prop="tariffName" label="套餐名称" min-width="120">
				</el-table-column>
				<el-table-column prop="dueTime" label="套餐到期时间" min-width="120">
				</el-table-column>
				<el-table-column prop="channel" label="状态" min-width="80">
					<template slot-scope="scope">
						{{scope.row.channel=='channel'?'渠道':'自助直销'}}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text">停用</el-button>
						<el-button size="mini" type="text">注销</el-button>
						<el-button size="mini" type="text" @click="editnumSetup(true,scope.row)">号码设置</el-button>
						<el-button size="mini" type="text">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
			<numSetup :show="numSetupShow" @close="editnumSetup(false)" :number400Data="numSetupData"></numSetup>
		</el-tabs>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import numSetup from './component/numSetup.vue'
	export default {
		name: 'numManage',
		components: {
			numSetup
		},
		data() {
			return {
				active: 'self',
				form: {
					number400: '',
					companyName: '',
					guideNumber: '',
					status: ''
				},
				numSetupShow: false,
				numSetupData: {},
				status: '',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: 'Used',
					label: '启用'
				}, {
					value: 'CanUse',
					label: '停用'
				}],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				}
			}
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			fetchData(pageNum) {
				var data = {};
				data.page = {
					pageNo: pageNum || 1,
					pageSize: this.page.size
				};
				data.number400 = this.form;
				data.number400.channel = this.active;
				this.$ajax.post('/vos/num400config/getAll', data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.tableData = res.data.number400s;
						this.page.total = res.data.totalCount;
					}
				})
			},
			handleSizeChange() {

			},
			handleCurrentChange() {

			},
			editnumSetup(bol, data) {
				this.numSetupShow = bol;
				if (bol) {
					this.numSetupData = {
						number400: data.number400,
						companyName: data.companyName,
						guideNumber: data.guideNumber
					};
				}
			}
		}
	}
</script>