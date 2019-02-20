<template>
	<div id="systemLog">
		<!--账号信息弹窗-->
		<!--添加用户弹窗-->
		<div class="checkUserDialog">
			<el-dialog title="查看用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
				<div>
					<el-form ref="addTopForm" :model="addTopForm" label-width="100px">
						<div class="accountMessage">
							<p>账户信息</p>
							<el-form-item label="登陆账号：">
								<el-input v-model="addTopForm.loginId" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="角色：">
								<el-select v-model="addTopForm.role" size="mini" placeholder="请选择活动区域">
									<el-option :label="item.nameZh" :value="item.name" v-for="(item,index) in roleData" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="状态：">
								<el-radio v-model="addTopForm.status" label="true">启用</el-radio>
								<el-radio v-model="addTopForm.status" label="false">停用</el-radio>
							</el-form-item>
						</div>
						<div class="accountMessage">
							<p>用户资料</p>

							<div style="width: 100%;overflow: hidden">
								<el-form-item label="用户名称：">
									<el-input v-model="addTopForm.userName" size="mini"></el-input>
								</el-form-item>
							</div>

							<el-form-item label="性别：">
								<el-radio v-model="addTopForm.sex" label="man">男</el-radio>
								<el-radio v-model="addTopForm.sex" label="woman">女</el-radio>
							</el-form-item>

							<el-form-item label="手机号：">
								<el-input v-model="addTopForm.phoneNum" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="归属地区：" class="homeLocation">
								<el-select v-model="addTopForm.province" placeholder="请选择省份" size="mini">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in provinceList" :key="index"></el-option>
								</el-select>
								<el-select v-model="addTopForm.city" placeholder="请选择市" size="mini">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in cityList" :key="index"></el-option>
								</el-select>
								<el-select v-model="addTopForm.district" placeholder="请选择区/镇/县" size="mini">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in districtList" :key="index"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="身份证号：">
								<el-input v-model="addTopForm.IDNo" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="邮箱：">
								<el-input v-model="addTopForm.mailbox" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="备注：" class="addUserRemark">
								<el-input type="textarea" v-model="addTopForm.remark"></el-input>
							</el-form-item>

						</div>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<!--搜索-->
		<div class="logForm">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="searchInput">
					<el-form-item label="描述信息：">
						<el-input v-model="form.descMsg" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="操作账号：">
						<el-input v-model="form.operAccount" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="时间：">
						<el-date-picker size="mini" v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
						</el-date-picker>
					</el-form-item>

					<el-form-item class="searchBtn">
						<el-button type="primary" size="mini" @click="systemLogList()">搜索</el-button>
						<el-button @click="resetForm" size="mini">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>

		<!--表格-->
		<div class="LogTable">
			<div class="LogSelect">
				<div style="float:right">
					<el-form ref="LogSelectForm" :model="LogSelectForm" label-width="100px">
						<el-form-item label="操作类型：">
							<el-select v-model="operateType" placeholder="请选择" size="mini" @change="operTypeChange">
								<el-option v-for="item in operateTypeList" :key="item.value" :label="item.dicValue" :value="item.dicKey">
								</el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="操作角色：">
							<el-select v-model="operateRole" placeholder="请选择" size="mini" @change="operRole">
								<el-option v-for="item in operateRoleList" :key="item.value" :label="item.nameZh" :value="item.name">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div style="overflow: hidden;margin-bottom:20px;">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="actionRoleName" label="操作角色">
					</el-table-column>

					<el-table-column label="操作账号">
						<template slot-scope="scope">
							<el-button type="text" @click="operAccount(scope.row)">{{scope.row.username}}</el-button>
						</template>
					</el-table-column>

					<el-table-column prop="ipAddress" label="IP地址">
					</el-table-column>

					<el-table-column prop="optTime" label="操作时间">
					</el-table-column>

					<el-table-column prop="description" label="描述">
					</el-table-column>

				</el-table>
			</div>
			<!--分页-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'systemLog',
		data() {
			return {
				dialogVisible: false,
				form: {
					descMsg: '',
					operAccount: '',
					time: [],
				},
				addTopForm: {
					loginId: '',
					role: '',
					userName: '',
					phoneNum: '',
					sex: 'man',
					status: 1,
					province: '', //省
					city: '', //市
					district: '', //区
					IDNo: '', //身份证号
					mailbox: '', //邮箱
					remark: '', //备注
				},
				LogSelectForm: {
					operateType: '',
					operateRole: '',
				},
				operateTypeList: [],//操作类型列表
                operateRoleList: [], //操作角色列表
                operateType: '', //操作类型
				operateRole: '', //操作角色
				provinceList: [{
						value: '1',
						label: '广东省'
					},
					{
						value: '1',
						label: '浙江省'
					}
				], //省列表
				cityList: [{
						value: '1',
						label: '中山市'
					},
					{
						value: '1',
						label: '杭州市'
					}
				], //市列表
				districtList: [{
						value: '1',
						label: '小榄镇'
					},
					{
						value: '1',
						label: '滨江区'
					}
				], //区列表
				tableData: [],
				currentPage: 4,
				totalPage: 0,
				pageSize: 10,
				page: 1,
				
				roleData: []
			}
		},
		created() {
			this.systemLogList();
			// 获取所有角色
            this.getRole();
            //获取所有操作类型
            this.getOperate();

            this.resetForm();   //日期范围初始值不是当前时间，在重置后更新为当前时间。
		},
		methods: {
			getRole() {
				this.$ajax.get("/vos/role/getAllRoleWithoutAdmin").then(res => {
					if (res.code == 200) {
                        this.roleData = res.data.data;
                        this.operateRoleList=res.data.data;
					}
				});
            },
            getOperate(){
                this.$ajax.post("/vos/dic/getDicsByType",{
                    "dicType":"actionLogType",
                    "status":1
                }).then(res => {
					if (res.code == 200) {
                        this.operateTypeList=res.data.dicList;
					}
				});
            },
            resetForm() {
				this.form.descMsg = "";
				this.form.operAccount = "";
				this.form.time = [];
			},
			// 分页
			handleSizeChange(val) {
				this.pageSize = val;
				this.systemLogList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.systemLogList();
			},
			//弹窗关闭按钮
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
            },

			//日志表格
			systemLogList() {
                if (this.form.time.length == 0) {
					this.form.time[0] = "";
					this.form.time[1] = "";
				}
				this.$ajax.post('/vos/actionLog/search', {
					"actionLog": {
						"actionRoleName": this.operateRole, //操作角色
						"optType": this.operateType, //操作类型
						"username": this.form.operAccount, //操作账号
						"description": this.form.descMsg, //描述
					},
					"beforeTime": this.form.time[0],
					"afterTime": this.form.time[1],
					"page": {
						"pageNo": this.page,
						"pageSize": this.pageSize
					}
				}).then((res) => {
					// ;
					// ;
					this.tableData = res.data.actionLogs;
					this.totalPage = res.data.totalCount;
				})
			},

			//操作类型下拉框
			operTypeChange(data) {
				// ;
				this.operateType = data;
				this.systemLogList();
			},
			// 操作角色下拉框
			operRole(data) {
				// ;
				this.operateRole = data;
				this.systemLogList();
			},
			//操作账号
			operAccount(val) {
				this.dialogVisible = true;
				// ;
				this.$ajax.post('/vos/user/getByUsername', {
					"username": val.username
				}).then((res) => {
					// ;
					let data = res.data;
					this.addTopForm.loginId = data.username;
					this.addTopForm.role = data.roleName;
					this.addTopForm.status = data.enabled;
					this.addTopForm.userName = data.name;
					this.addTopForm.sex = data.sex;
					this.addTopForm.phoneNum = data.phone;
					this.addTopForm.province = data.province;
					this.addTopForm.city = data.city;
					this.addTopForm.district = data.area;
					this.addTopForm.IDNo = data.idNo;
					this.addTopForm.mailbox = data.email;
					this.addTopForm.remark = data.remark;
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './systemLog.scss';
</style>