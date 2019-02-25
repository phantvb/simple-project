<template>
	<div id="businessInform" class="managerFormTitle" v-loading="loading">
		<header class="flg">
			企业管理
		</header>
		<el-tabs v-model="active">
			<el-tab-pane label="全部企业" name="0">
				<div class="search">
					<ul>
						<li>
							<span class="demonstration">企业名称：</span>
							<el-input v-model="form.companyName" placeholder="请输入内容" size="small" style="width:200px;">
							</el-input>
						</li>
						<li>
							<span class="demonstration">法人：</span>
							<el-input v-model="form.legalPerson" placeholder="请输入内容" size="small">
							</el-input>
						</li>
						<li>
							<span class="demonstration">证件编号：</span>
							<el-input v-model="form.companyCardNo" placeholder="请输入内容" size="small">
							</el-input>
						</li>
					</ul>
					<div class="block left">
						<span class="demonstration">企业来源：</span>
						<el-select v-model="form.source" placeholder="请选择内容" size="small" style="width:200px;" @change="fetchData()">
							<el-option v-for="item in sourceOptions" :key="item.label" :label="item.label" :value="item.value">
							</el-option>
						</el-select>

						<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
						<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="企业流程" name="1">
				<div class="search">
					<ul>
						<li>
							<span class="demonstration">企业名称：</span>
							<el-input v-model="form2.companyName" placeholder="请输入内容" size="small" style="width:200px;">
							</el-input>
						</li>
						<li>
							<span class="demonstration">法人：</span>
							<el-input v-model="form2.legalPerson" placeholder="请输入内容" size="small">
							</el-input>
						</li>
						<li>
							<span class="demonstration">证件编号：</span>
							<el-input v-model="form2.companyCardNo" placeholder="请输入内容" size="small">
							</el-input>
						</li>
					</ul>
					<div class="block left">
						<span class="demonstration">企业来源：</span>
						<el-select v-model="form2.source" placeholder="请选择内容" size="small" style="width:200px;" @change="fetchAllData()">
							<el-option v-for="item in sourceOptions" :key="item.label" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="demonstration" style="margin-left:15px;">提交日期：</span>
						<el-date-picker style="margin-right:15px;" value-format="yyyy-MM-dd" v-model="form2.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
						</el-date-picker>
						<el-button type="primary" size="small" style="width:80px;" @click="fetchAllData()">搜索</el-button>
						<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
					</div>
				</div>
			</el-tab-pane>

			<section class="addCompany left">
				<el-button type="primary" size="small" @click="addCompany(true)">新增企业</el-button>
				<div>
					<span>状态：</span>
					<el-select v-if="active==0" v-model="form.status" size="small" placeholder="请选择" @change="fetchData()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-if="active==1" v-model="form2.status" size="small" placeholder="请选择" @change="fetchAllData()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="small">导出</el-button>
				</div>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column prop="company.companyName" label="企业名称" min-width="200">
				</el-table-column>
				<el-table-column prop="company.companyCardNo" label="证件编号" min-width="150">
				</el-table-column>
				<el-table-column prop="company.legalPerson" label="法人" min-width="80">
				</el-table-column>
				<el-table-column prop="createTime" label="提交日期" min-width="100" v-if="active=='1'">
				</el-table-column>
				<el-table-column label="状态" min-width="80" v-if="active=='1'">
					<template slot-scope="scope">
						<span v-if="scope.row.status=='New_Flow'">新增受理</span>
						<span v-else-if="scope.row.status=='Wait_To_Audit'" class="red">等待送审</span>
						<span v-else-if="scope.row.status=='Company_Auditing'" class="red">企业审核中</span>
						<span v-else-if="scope.row.status=='Business_Auditing'">业务受理审核</span>
						<span v-else-if="scope.row.status=='Voice_Auditing'">语音审核</span>
						<span v-else-if="scope.row.status=='DestNum_Auditing'">目的码审核</span>
						<span v-else-if="scope.row.status=='Audit_Success'" class="success">审核通过</span>
						<span v-else-if="scope.row.status=='Canceling_Auditing'" class="red">注销审核中</span>
						<span v-else-if="scope.row.status=='Modify_Auditing'" class="red">变更审核中</span>
						<span v-else-if="scope.row.status=='Terminate_Flow'" class="red">受理终止</span>
						<span v-else-if="scope.row.status=='Cancelled'" class="red">已注销</span>
						<span v-else-if="scope.row.status=='Modify_Rejected'" class="red">变更审核驳回</span>
						<span v-else-if="scope.row.status=='Freezed'">注销冷冻</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="checkDetail(scope.row)">详情</el-button>
						<div v-if="active=='1'" style="display:inline-block;">
							<el-button size="small" type="text" v-if="scope.row.status=='Wait_To_Audit'&&(scope.row.creator==baseData.username||baseData.roleName=='ROLE_admin')" @click="addCompany(true,scope.row)">编辑送审</el-button>
							<el-button size="small" type="text" v-if="(scope.row.status=='Audit_Success'||scope.row.status=='Modify_Rejected')&&(scope.row.assignee==baseData.username||baseData.roleName=='ROLE_admin')" @click="editCompany(scope.row)">变更</el-button>
							<el-button size="small" type="text" v-if="(scope.row.status=='Audit_Success'||scope.row.status=='Modify_Rejected')&&(scope.row.assignee==baseData.username||baseData.roleName=='ROLE_admin')" @click="cancelCompany(scope.row)">注销</el-button>
							<el-button size="small" type="text" v-if="(scope.row.status=='Company_Auditing'||scope.row.status=='Canceling_Auditing'||scope.row.status=='Modify_Auditing')&&(baseData.roleName==scope.row.assigneeRole||baseData.roleName=='ROLE_admin')" @click="passCompany(scope.row)">通过审核</el-button>
							<el-button size="small" type="text" v-if="(scope.row.status=='Company_Auditing'||scope.row.status=='Canceling_Auditing'||scope.row.status=='Modify_Auditing')&&(baseData.roleName==scope.row.assigneeRole||baseData.roleName=='ROLE_admin')" @click="backCompany(scope.row)">驳回</el-button>
							<!-- <el-button size="small" type="text" v-if="scope.row.status=='Canceling_Auditing'||scope.row.status=='Modify_Auditing'" @click="endCompany(scope.row)">终止</el-button> -->
							<el-button size="small" type="text" v-if="scope.row.status=='Wait_To_Audit'&&(scope.row.creator==baseData.username||baseData.roleName=='ROLE_admin')" @click="removeCompany(scope.row)">删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<company :show="addCompanys" @close="closeCompany" :flowIdData="flowIdData" :editCompanyType="editCompanyType"></company>
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
				loading: false,
				active: '1',
				addCompanys: false,
				editCompanyType: 0, //0新建1编辑
				baseData: {},
				flowIdData: {},
				form: {
					legalPerson: '',
					companyName: '',
					companyCardNo: '',
					time: [],
					source: ''
				},
				form2: {
					legalPerson: '',
					companyName: '',
					companyCardNo: '',
					time: [],
					source: ''
				},
				options: [{
					value: '',
					label: '全部'
				}, {
					value: 'Wait_To_Audit',
					label: '等待送审'
				}, {
					value: 'Company_Auditing',
					label: '企业审核中'
				}, {
					value: 'Audit_Success',
					label: '审核通过'
				}, {
					value: 'Modify_Auditing',
					label: '变更审核中'
				}, {
					value: 'Cancelled',
					label: '已注销'
				}, {
					value: 'Modify_Rejected',
					label: '变更审核驳回'
				}],
				sourceOptions: [{
					value: '',
					label: '全部'
				}, {
					value: 'self',
					label: '自营'
				}, {
					value: 'ali',
					label: '阿里'
				}],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				permission: []
			}
		},
		watch: {
			active(newV, oldV) {
				if (newV == 1) {
					this.fetchData();
				} else {
					this.fetchAllData();
				}
			}
		},
		mounted() {
			console.log(this.$store.getters.getPermission(location.hash.replace(/#/, '')))
			this.permission = this.$store.getters.getPermission(location.hash.replace(/#/, ''));
			this.baseData.businessType = sessionStorage.getItem("businessType");
			this.baseData.roleName = sessionStorage.getItem("roleName");
			this.baseData.username = sessionStorage.getItem("username");
			this.fetchData();
		},
		methods: {
			checkDetail(data) {
				this.flowIdData = data;
				if (this.active == 0) {
					this.$router.push({ path: '/BusinessInform/businessDetail', query: { Id: data.id } });
				} else {
					this.$router.push({ path: '/BusinessInform/businessDetail', query: { flowId: data.flowId } });
				}

			},
			closeCompany(bol) {
				if (bol) {
					this.fetchData();
				}
				this.addCompany(false);
			},
			editCompany(data) {
				this.editCompanyType = 1;
				this.flowIdData = data || {};
				this.addCompanys = true;
			},
			addCompany(bol, data) {
				this.editCompanyType = 0;
				this.flowIdData = data || {};
				this.addCompanys = bol;
			},
			async passCompany(data) {
				var obj = {};
				var url;
				if (data.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditPass';
				} else if (data.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditPass';
				} else if (data.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditPass';
				};
				obj.companyFlow = {
					flowId: data.flowId,
					creator: data.creator,
					assigneeRole: data.assigneeRole
				};
				obj.message = await this.prompt();
				if (obj.message === false) {
					return;
				}
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						if (this.active == 0) {
							this.fetchAllData(this.page.num);
						} else {
							this.fetchData(this.page.num);
						}
					}
				});
			},
			async backCompany(data) {
				var obj = {};
				var url;
				if (data.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditReject';
				} else if (data.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditReject';
				} else if (data.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditReject';
				};
				obj.companyFlow = {
					flowId: data.flowId,
					creator: data.creator,
					assigneeRole: data.assigneeRole
				};
				obj.message = await this.prompt();
				if (obj.message === false) {
					return;
				}
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						if (this.active == 0) {
							this.fetchAllData(this.page.num);
						} else {
							this.fetchData(this.page.num);
						}
					}
				});
			},
			cancelCompany(data) {
				var obj = {};
				var url;
				url = '/vos/company/sendToCancelAudit';
				obj.companyFlow = {
					flowId: data.flowId,
					creator: data.creator,
					assigneeRole: data.assigneeRole,
					assignee: data.assignee
				};
				obj.message = '';
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						if (this.active == 0) {
							this.fetchAllData(this.page.num);
						} else {
							this.fetchData(this.page.num);
						}
					}
				});
			},
			endCompany(data) {
				var obj = {};
				var url;
				url = '/vos/company/terminateFlow';
				obj.companyFlow = {
					flowId: data.flowId,
					creator: data.creator,
					assigneeRole: data.assigneeRole
				};
				obj.message = '';
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						if (this.active == 0) {
							this.fetchAllData(this.page.num);
						} else {
							this.fetchData(this.page.num);
						}
					}
				});
			},
			removeCompany(data) {
				var obj = {};
				var url;
				url = '/vos/business/deleteFlow';
				obj.companyFlow = {
					flowId: data.flowId,
					creator: data.creator,
					businessId: data.businessId,
					type: data.type,
					companyId: data.companyId
				};
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
						if (this.active == 0) {
							this.fetchAllData(this.page.num);
						} else {
							this.fetchData(this.page.num);
						}
					}
				});
			},
			prompt() {
				return this.$prompt('请输入审核意见', '审核', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					return value || '';
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
					return false;
				});
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			fetchData(pageNum) {
				var data = {};
				this.loading = true;
				this.page.num = pageNum || 1;
				data = this.form;
				data.dateStart = this.form.time && this.form.time.length > 1 ? this.form.time[0] : '';
				data.dateEnd = this.form.time && this.form.time.length > 1 ? this.form.time[1] : '';
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				//data.source = this.baseData.businessType || '';
				data.type = 'Company';
				this.$ajax.post("/vos/company/getAllCompanyList", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.companyFlows;
						this.page.total = res.data.totalCount;
					}
				});
			},
			fetchAllData(pageNum) {
				var data = {};
				this.loading = true;
				this.page.num = pageNum || 1;
				data = this.form2;
				//data.dateStart = this.form2.time[0] || '';
				//data.dateEnd = this.form2.time[1] || '';
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				this.$ajax.post("/vos/company/getCompanyList", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						res.data.company.map(item => {
							item.company = item;
						});
						this.tableData = res.data.company;
						this.page.total = res.data.totalCount;
					}
				});
			},
			reset() {
				if (this.active == 0) {
					this.$clear(this.form2);
					this.fetchAllData();
				} else {
					this.$clear(this.form);
					this.fetchData();
				}
			}
		}
	}
</script>