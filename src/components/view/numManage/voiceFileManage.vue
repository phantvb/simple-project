<template>
	<div id="voiceFileManage" class="managerFormTitle" v-loading="loading">
		<Aplayer name="Aplayer" model="auto" :music_url="$global.serverSrc+voiceSrc" v-if="player" v-show="false"></Aplayer>
		<div class="search">
			<ul>
				<li>
					<span class="demonstration">企业名称：</span>
					<el-input v-model="form.companyName" placeholder="请输入内容" size="small">
					</el-input>
				</li>
				<li>
					<span class="demonstration">时间：</span>
					<el-date-picker style="margin-right:15px;" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
					</el-date-picker>
				</li>
			</ul>
			<div class="block left">
				<div style="float:left;margin-right:15px;">
					<span class="demonstration">400号码：</span>
					<el-input v-model="form.number400" placeholder="请输入内容" size="small">
					</el-input>
				</div>
				<el-button type="primary" size="small" style="width:80px;">搜索</el-button>
				<el-button type="primary" plain size="small" style="width:80px;">重置</el-button>
			</div>
		</div>
		<section class="left block lineTop">
			<el-button type="primary" size="small" @click="showvoiceEdi(true)"><i class="el-icon-plus"></i> 新语音文件</el-button>
			<div style="float:right">
				<span class="fmini">状态：</span>
				<el-select v-model="form.status" placeholder="请选择" size="small">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" plain size="small">导出</el-button>
			</div>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
			<el-table-column prop="business.companyName" label="企业名称" min-width="100">
			</el-table-column>
			<el-table-column prop="business.number400" label="400号码" min-width="100">
			</el-table-column>
			<el-table-column prop="creator" label="语音上传" min-width="120">
			</el-table-column>
			<el-table-column prop="person" label="文件名称" min-width="120">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新日期" min-width="120">
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="80">
				<template slot-scope="scope">
					<span v-if="scope.row.status=='New_Flow'">新增受理</span>
					<span v-else-if="scope.row.status=='Wait_To_Audit'" class="red">等待送审</span>
					<span v-else-if="scope.row.status=='Company_Auditing'">企业审核中</span>
					<span v-else-if="scope.row.status=='Business_Auditing'">业务受理审核</span>
					<span v-else-if="scope.row.status=='Voice_Auditing'">语音审核</span>
					<span v-else-if="scope.row.status=='DestNum_Auditing'">目的码审核</span>
					<span v-else-if="scope.row.status=='Audit_Success'" class="success">审核通过</span>
					<span v-else-if="scope.row.status=='Canceling_Auditing'">注销审核中</span>
					<span v-else-if="scope.row.status=='Modify_Auditing'" class="red">变更审核中</span>
					<span v-else-if="scope.row.status=='Terminate_Flow'" class="red">受理终止</span>
					<span v-else-if="scope.row.status=='Cancelled'" class="red">已注销</span>
					<span v-else-if="scope.row.status=='Modify_Rejected'" class="red">变更审核驳回</span>
					<span v-else-if="scope.row.status=='Freezed'">注销冷冻</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" min-width="200">
				<template slot-scope="scope">
					<!-- <el-button size="small" type="text" @click="listen(scope.row.recordAddress)">试听</el-button> -->
					<el-button size="small" type="text" @click="showvoiceEdi(true,scope.row)">修改</el-button>
					<!-- <el-button size="small" type="text">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
		</el-pagination>
		<voiceEdit :show="voiceEditShow" @close="showvoiceEdi" :vData="vData"></voiceEdit>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import voiceEdit from './component/voiceEdit.vue'
	import Aplayer from '../component/Aplayer/a_player.vue'
	export default {
		name: 'voiceFileManage',
		components: {
			voiceEdit,
			Aplayer
		},
		data() {
			return {
				form: {
					type: "Voice",
					companyName: '',
					date: [],
					number400: '',
					status: ''
				},
				voiceEditShow: false,
				vData: {},
				status: '',
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
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				loading: false,
				player: false
			}
		},
		mounted() {
			this.fetchData();
		},
		methods: {
			reset() {
				this.$clear(this.form);
				this.fetchData();
			},
			fetchData(pageNum) {
				var data = {};
				data = this.form;
				this.loading = false;
				this.page.num = pageNum || 1;
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.dateStart = this.form.date[0] || '';
				data.dateEnd = this.form.date[1] || '';
				this.$ajax.post("/vos/business/getBusinessFlowList", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.businessFlows;
						this.page.total = res.data.totalCount;
					}
				});
			},
			listen(src) {
				if (this.voiceSrc != src) {
					this.voiceSrc = src;
					this.player = false;
					this.$nextTick(() => {
						this.player = true;
					});
				} else {
					this.player = false;
				}
			},
			showvoiceEdi(bol, data, isRefresh) {
				this.vData = data || {
					business: {}
				};
				this.voiceEditShow = bol;
				if (isRefresh) {
					this.fetchData(this.page.num);
				};
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			}
		}
	}
</script>