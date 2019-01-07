<template>
	<div id="businessInform" class="managerFormTitle">
		<header class="flg">
			企业管理
		</header>
		<el-tabs v-model="active">
			<el-tab-pane label="全部" name=""></el-tab-pane>
			<el-tab-pane label="企业审核" name="Company_Auditing"></el-tab-pane>
			<el-tab-pane label="变更审核" name="Modify_Auditing"></el-tab-pane>
			<el-tab-pane label="注销审核" name="Canceling_Auditing"></el-tab-pane>
			<el-tab-pane label="已过审企业" name="Audit_Success"></el-tab-pane>
			<el-tab-pane label="已注销企业" name="Cancelled"></el-tab-pane>
			<div class="search">
				<ul>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.name" placeholder="请输入内容" size="mini" style="width:200px;">
						</el-input>
					</li>
					<li>
						<span class="demonstration">法人：</span>
						<el-input v-model="form.person" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
					<li>
						<span class="demonstration">证件编号：</span>
						<el-input v-model="form.number" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">提交日期：</span>
					<el-date-picker style="margin-right:15px;" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
					</el-date-picker>
					<el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
					<el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
				</div>
			</div>
			<section class="addCompany left">
				<el-button type="primary" size="mini" @click="addCompany(true)">新增企业</el-button>
				<div>
					<span>状态：</span>
					<el-select v-model="form.status" size="mini" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column label="类型" min-width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='Company'">企业审核</span>
						<span v-else-if="scope.row.status=='Business'">业务受理</span>
						<span v-else-if="scope.row.status=='Destnum'">目的码审核</span>
						<span v-else-if="scope.row.status=='Voice'">语音审核</span>
					</template>
				</el-table-column>
				<el-table-column prop="company.companyName" label="企业名称" min-width="200">
				</el-table-column>
				<el-table-column prop="company.companyCardNo" label="证件编号" min-width="150">
				</el-table-column>
				<el-table-column prop="company.legalPerson" label="法人" min-width="80">
				</el-table-column>
				<el-table-column prop="createTime" label="提交日期" min-width="100">
				</el-table-column>
				<el-table-column label="状态" min-width="80">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='New_Flow'">新增受理</span>
						<span v-else-if="scope.row.status=='Wait_To_Audit'" class="red">等待送审</span>
						<span v-else-if="scope.row.status=='Company_Auditing'">企业审核</span>
						<span v-else-if="scope.row.status=='Business_Auditing'">业务受理审核</span>
						<span v-else-if="scope.row.status=='Voice_Auditing'">语音审核</span>
						<span v-else-if="scope.row.status=='DestNum_Auditing'">目的码审核</span>
						<span v-else-if="scope.row.status=='Audit_Success'" class="success">审核通过</span>
						<span v-else-if="scope.row.status=='Canceling_Auditing'">注销审核中</span>
						<span v-else-if="scope.row.status=='Modify_Auditing'" class="red">变更审核</span>
						<span v-else-if="scope.row.status=='Terminate_Flow'" class="red">受理终止</span>
						<span v-else-if="scope.row.status=='Cancelled'" class="red">已注销</span>
						<span v-else-if="scope.row.status=='Modify_Rejected'" class="red">变更审核驳回</span>
						<span v-else-if="scope.row.status=='Freezed'">注销冷冻</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text">详情</el-button>
						<el-button size="mini" type="text">编辑</el-button>
						<el-button size="mini" type="text">送审</el-button>
						<el-button size="mini" type="text">撤回</el-button>
						<el-button size="mini" type="text">变更</el-button>
						<el-button size="mini" type="text">注销</el-button>
						<el-button size="mini" type="text">通过审核</el-button>
						<el-button size="mini" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<company :show="addCompanys" @close="addCompany(false)"></company>
	</div>
</template>
<style lang="scss" scoped>
	@import './businessInform.scss';
</style>
<script>
	import company from './dialog/company.vue'
	export default {
		name: 'businessInform',
		components: {
			company
		},
		data() {
			return {
				active: '',
				addCompanys: false,
				baseData: {},
				form: {
					name: '',
					person: '',
					number: '',
					status
				},
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '选项2',
					label: '等待送审'
				}, {
					value: '选项3',
					label: '待审核'
				}, {
					value: '选项4',
					label: '审核通过'
				}, {
					value: '选项5',
					label: '被驳回'
				}],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				}
			}
		},
		watch: {
			active(newV, oldV) {
				this.fetchData();
			}
		},
		mounted() {
			this.baseData.businessType = sessionStorage.getItem("businessType");
			this.baseData.roleName = sessionStorage.getItem("roleName");
			this.baseData.username = sessionStorage.getItem("username");
			this.fetchData();
		},
		methods: {
			addCompany(bol) {
				this.addCompanys = bol;
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			fetchData(pageNum) {
				var data = {};
				this.page.num = pageNum || 1;
				data = this.form;
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.source = this.baseData.businessType;
				data.type = 'Company';
				this.$ajax.post("/vos/company/getAllCompanyList", this.$format(data)).then(res => {
					if (res.code == 200) {
						this.tableData = res.data.companyFlows;
						this.page.total = res.data.totalCount;
					}
				});
			},
		}
	}
</script>