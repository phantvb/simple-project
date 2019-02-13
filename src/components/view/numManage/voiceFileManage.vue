<template>
	<div id="voiceFileManage" class="managerFormTitle">
		<div class="search">
			<ul>
				<li>
					<span class="demonstration">企业名称：</span>
					<el-input v-model="form.person" placeholder="请输入内容" size="mini">
					</el-input>
				</li>
				<li>
					<span class="demonstration">时间：</span>
					<el-date-picker style="margin-right:15px;" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
					</el-date-picker>
				</li>
			</ul>
			<div class="block left">
				<div style="float:left;margin-right:15px;">
					<span class="demonstration">企业名称：</span>
					<el-input v-model="form.person" placeholder="请输入内容" size="mini">
					</el-input>
				</div>
				<el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
				<el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
			</div>
		</div>
		<section class="left block lineTop">
			<el-button type="primary" size="mini"><i class="el-icon-plus"></i> 新语音文件</el-button>
			<div style="float:right">
				<span class="fmini">状态：</span>
				<el-select v-model="status" placeholder="请选择" size="mini">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" plain size="mini">导出</el-button>
			</div>
		</section>
		<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
			<el-table-column prop="type" label="400号码" min-width="100">
			</el-table-column>
			<el-table-column prop="name" label="引示号码" min-width="100">
			</el-table-column>
			<el-table-column prop="number" label="企业名称" min-width="120">
			</el-table-column>
			<el-table-column prop="person" label="套餐名称" min-width="120">
			</el-table-column>
			<el-table-column prop="date" label="套餐到期时间" min-width="120">
			</el-table-column>
			<el-table-column prop="status" label="状态" min-width="80">
			</el-table-column>
			<el-table-column prop="name" label="操作" min-width="200">
				<template slot-scope="scope">
					<el-button size="mini" type="text" :data="scope.row">停用</el-button>
					<el-button size="mini" type="text">注销</el-button>
					<el-button size="mini" type="text">号码设置</el-button>
					<el-button size="mini" type="text">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
		</el-pagination>
		<voiceEdit :show="voiceEditShow" @close="showvoiceEdit(false)"></voiceEdit>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import voiceEdit from './component/voiceEdit.vue'
	export default {
		name: 'voiceFileManage',
		components: {
			voiceEdit
		},
		data() {
			return {
				active: '1',
				form: {
					name: '',
					person: '',
					number: '',
					date: null,
					status
				},
				voiceEditShow: false,
				status: '',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '选项2',
					label: '启用'
				}, {
					value: '选项3',
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
		methods: {
			showvoiceEdi(bol) {
				this.voiceEditShow = bol;
			},
			handleSizeChange() {

			},
			handleCurrentChange() {

			},
		}
	}
</script>