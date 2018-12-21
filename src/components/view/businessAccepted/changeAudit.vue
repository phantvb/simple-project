<template>
	<div id="changeAudit">
		<!--搜索-->
		<div class="handlingForm">
			<el-form ref="form" :model="form" label-width="115px">
				<div class="searchInput">
					<el-form-item label="企业名称：">
						<el-input v-model="form.firmName" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="法人：">
						<el-input v-model="form.legal" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="企业联系电话：">
						<el-input v-model="form.phoneNum" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="时间：">
						<el-date-picker
								size="mini"
								v-model="form.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
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
				<div class="accountSelect">
					<span style="font-size:12px">状态：</span>
					<el-select v-model="accountStatus" placeholder="请选择" size="mini">
						<el-option
								v-for="item in statusOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</div>

			<el-table
					:data="tableData"
					style="width: 100%">

				<el-table-column
						prop="firmName"
						label="企业名称"
						width="300">
				</el-table-column>

				<el-table-column
						prop="VSMS"
						label="企业VSMS编号">
				</el-table-column>

				<el-table-column
						prop="idNumber"
						label="企业证件号">
				</el-table-column>

				<el-table-column
						prop="data"
						label="日期">
				</el-table-column>

				<el-table-column
						prop="status"
						label="状态">
				</el-table-column>

				<el-table-column
						prop="status"
						label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="text" entrance="2" @click="details(scope.row),$router.push('/logoutDetail/')">详情</el-button>
						<!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
						<el-button size="mini" type="text">撤回</el-button>
						<!--</router-link>-->
						<el-button size="mini" type="text">送审</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		name: 'changeAudit',
		data() {
			return {
                form:{
                    firmName:'',
                    phoneNum:'',
                    time:'',
                    legal:'',
                },
                tableData: [{
                    firmName: '杭州顺网科技股份有限公司',
                    VSMS:'057383171982',
                    idNumber: '22398312883217yqj',
                    date:'2018-11-28',
                    status:'等待送核',
                    data:'2018-11-28',
                }, {
                    firmName: '杭州顺网科技股份有限公司',
                    VSMS:'057383171982',
                    idNumber: '22398312883217yqj',
                    date:'2018-11-28',
                    status:'等待送核',
                    data:'2018-11-28',
                }, {
                    firmName: '杭州顺网科技股份有限公司',
                    VSMS:'057383171982',
                    idNumber: '22398312883217yqj',
                    date:'2018-11-28',
                    status:'等待送核',
                    data:'2018-11-28',
                }, {
                    firmName: '杭州顺网科技股份有限公司',
                    VSMS:'057383171982',
                    idNumber: '22398312883217yqj',
                    date:'2018-11-28',
                    status:'等待送核',
                    data:'2018-11-28',
                }],
                statusOptions: [
                    {
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
                accountStatus:'',
                currentPage: 4,   //分页
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
            //点击详情
            details(scope){
                console.log(scope);
            }
		},
		computed: {}
	}
</script>
<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>
