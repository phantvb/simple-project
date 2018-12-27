<template>
	<div id="blacklistManage" class="managerFormTitle">
		<el-tabs v-model="active">
			<el-tab-pane label="企业黑名单" name="1"></el-tab-pane>
			<el-tab-pane label="全局黑名单" name="2"></el-tab-pane>
			<div class="search">
				<ul>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.person" placeholder="请输入内容" size="mini">
						</el-input>
					</li>
					<li>
						<span class="demonstration">拉黑时间：</span>
						<el-date-picker style="margin-right:15px;" v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
						</el-date-picker>
					</li>
				</ul>
				<div class="block left" :class="{'indent':active==2}">
					<div style="float:left;margin-right:15px;" v-if="active==1">
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.person" placeholder="请输入内容" size="mini">
						</el-input>
					</div>
					<div style="float:left;margin-right:15px;" v-if="active==1">
						<span class="demonstration">拉黑号码：</span>
						<el-input v-model="form.person" placeholder="请输入内容" size="mini">
						</el-input>
					</div>
					<el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
					<el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
				</div>
			</div>
			<section class="left block lineTop">
				<el-button type="primary" size="mini" @click="showblackEdit(true)"><i class="el-icon-plus"></i> {{active==1?'新增企业黑名单':'新增全局黑名单'}}</el-button>
				<el-button type="primary" plain size="mini">删除</el-button>
				<div style="float:right">
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;" v-show="active==1">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="type" label="企业名称" min-width="100">
				</el-table-column>
				<el-table-column prop="name" label="400号码" min-width="100">
				</el-table-column>
				<el-table-column prop="number" label="拉黑号码" min-width="120">
				</el-table-column>
				<el-table-column prop="person" label="拉黑时间" min-width="120">
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text">修改</el-button>
						<el-button size="mini" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;" v-show="active==2">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="number" label="拉黑号码" min-width="120">
				</el-table-column>
				<el-table-column prop="person" label="拉黑时间" min-width="120">
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="text">修改</el-button>
						<el-button size="mini" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<blackEdit :type="active" :show="blackEditShow" @close="showblackEdit(false)"></blackEdit>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';

	.indent {
		margin-left: 74px;
	}
</style>
<script>
	import blackEdit from './component/blackEdit.vue'
	export default {
		name: 'blacklistManage',
		components: {
			blackEdit
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
				blackEditShow: false,
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
			showblackEdit(bol) {
				console.log(bol)
				this.blackEditShow = bol;
			},
			handleSizeChange() {

			},
			handleCurrentChange() {

			},
		}
	}
</script>