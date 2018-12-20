<template>
	<div id="entire">
		<!--搜索-->
		<div class="entireForm">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="searchInput">
					<el-form-item label="企业名称：">
						<el-input v-model="form.firmName" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="400电话：">
						<el-input v-model="form.phoneNum" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="时间：">
						<el-date-picker size="mini" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>

					<el-form-item class="searchBtn">
						<el-button type="primary" size="mini">搜索</el-button>
						<el-button @click="resetForm('form')" size="mini">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<!--表格-->
		<div class="entireTable">
			<!--表格按钮和下拉框-->
			<div class="BtnSelect">
				<div class="accountBtn">
					<el-button type="primary" size="mini" @click="addUser()">+新增受理</el-button>
					<el-button type="primary" size="mini">+新增语音文件</el-button>
					<el-button type="primary" size="mini">+新增目的码</el-button>
				</div>
				<div class="accountSelect">
					<el-select v-model="accountStatus" placeholder="请选择" size="mini">
						<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="type" label="类型">
				</el-table-column>

				<el-table-column prop="firmName" label="企业名称" width="300">
				</el-table-column>

				<el-table-column prop="fourPhone" label="400电话">
				</el-table-column>

				<el-table-column prop="date" label="日期">
				</el-table-column>

				<el-table-column prop="status" label="状态">
				</el-table-column>

				<el-table-column prop="status" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="text">详情</el-button>
						<!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
						<el-button size="mini" type="text">撤回</el-button>
						<el-button size="mini" type="text">变更</el-button>
						<el-button size="mini" type="text">注销</el-button>
						<el-button size="mini" type="text">通过审核</el-button>
						<el-button size="mini" type="text">驳回</el-button>
						<el-button size="mini" type="text">编辑</el-button>
						<!--</router-link>-->
						<el-button size="mini" type="text">送审</el-button>
						<el-button size="mini" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		name: 'entire',
		data() {
			return {
				form: {
					firmName: '',
					phoneNum: '',
					time: '',
				},
				tableData: [{
					type: '业务受理',
					firmName: '杭州顺网科技股份有限公司',
					fourPhone: '5876552',
					date: '2018-11-28',
					status: '等待送核'
				}, {
					type: '业务受理',
					firmName: '杭州顺网科技股份有限公司',
					fourPhone: '5876552',
					date: '2018-11-28',
					status: '等待送核'
				}, {
					type: '业务受理',
					firmName: '杭州顺网科技股份有限公司',
					fourPhone: '5876552',
					date: '2018-11-28',
					status: '等待送核'
				}, {
					type: '业务受理',
					firmName: '杭州顺网科技股份有限公司',
					fourPhone: '5876552',
					date: '2018-11-28',
					status: '等待送核'
				}],
				statusOptions: [{
						value: '1',
						label: '等待审核'
					}, {
						value: '2',
						label: '待审核'
					}, {
						value: '3',
						label: '审核通过'
					},
					{
						value: '4',
						label: '被驳回'
					}
				],
				currentPage: 4, //分页
				accountStatus: '',
			};
		},
		components: {},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
		},
		computed: {}
	}
</script>
<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>