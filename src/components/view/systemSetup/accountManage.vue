<template>
	<div id="selfHelp" v-loading="loading">
		<header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/systemSetup' }">系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>账号管理</el-breadcrumb-item>
			</el-breadcrumb>
		</header>
		<!--搜索表单-->
		<div class="numForm">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="searchInput">
					<el-form-item label="账号搜索：" prop="accountNumber">
						<el-input v-model="form.accountNumber" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="用户名称：" prop="userName">
						<el-input v-model="form.userName" size="mini"></el-input>
					</el-form-item>
					<el-form-item class="searchBtn">
						<el-button type="primary" size="mini" @click="searchMess('')">搜索</el-button>
						<el-button type="primary" @click="resetForm('form')" size="mini" plain>重置</el-button>
					</el-form-item>
				</div>
				<!--角色按钮-->
				<div>
					<el-form-item label="选择角色：">
						<el-button size="mini" @click="searchMess('')">全部</el-button>
						<el-button size="mini" v-for="(item,index) in this.allRoleTableData" :key="index" @click="searchMess(allRoleTableData[index].name)">{{allRoleTableData[index].nameZh}}</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<!--表格-->
		<div class="accountTable">
			<!--表格按钮和下拉框-->
			<div class="BtnSelect">
				<div class="accountBtn">
					<el-button type="primary" size="mini" @click="showAddUser">+ 新增用户</el-button>
					<el-button size="mini" @click="batchUpdatePass">批量重置密码</el-button>
					<el-button size="mini" @click="batchStartAndStop(1)">启用</el-button>
					<el-button size="mini" @click="batchStartAndStop(0)">停用</el-button>
					<el-button size="mini" @click="batchDelete">删除</el-button>
				</div>
				<div class="accountSelect">
					<el-select v-model="accountStatus" placeholder="请选择" size="mini" @change="changeTableData">
						<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</div>
			<!--表格-->
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection"></el-table-column>

				<el-table-column prop="username" label="账号"></el-table-column>

				<el-table-column prop="nameZh" label="角色"></el-table-column>

				<el-table-column prop="name" label="用户名称"></el-table-column>

				<el-table-column prop="enabled" label="状态"></el-table-column>

				<el-table-column prop="createTime" label="注册日期"></el-table-column>

				<el-table-column prop="updateTime" label="最近登录"></el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
						<el-button size="mini" type="text" @click="showDetails(scope.row)">详情</el-button>
						<!--</router-link>-->
						<el-button size="mini" type="text" @click="deleteItem(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<el-pagination style="margin-top: 10px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
		</div>

		<!--添加用户弹窗-->
		<div class="addUserDialog">
			<el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
				<div>
					<el-form ref="addTopForm" :model="addTopForm" label-width="100px">
						<div class="accountMessage">
							<p>账户信息</p>
							<el-form-item label="登陆账号：" prop="loginId">
								<el-input v-model="addTopForm.loginId" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="角色：" prop="role">
								<el-select v-model="addTopForm.role" size="mini" placeholder="请选择" @focus="loadRoleList">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in roleList" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="状态：" prop="status">
								<el-radio v-model="addTopForm.status" label="1">启用</el-radio>
								<el-radio v-model="addTopForm.status" label="0">停用</el-radio>
							</el-form-item>
						</div>
						<div class="accountMessage">
							<p>用户资料</p>

							<el-form-item label="用户名称：" prop="userName">
								<el-input v-model="addTopForm.userName" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="性别：" prop="sex">
								<el-radio v-model="addTopForm.sex" label="man">男</el-radio>
								<el-radio v-model="addTopForm.sex" label="woman">女</el-radio>
							</el-form-item>

							<el-form-item label="手机号：" prop="phoneNum">
								<el-input v-model="addTopForm.phoneNum" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="业务身份：" prop="channel">
								<el-select v-model="addTopForm.channel" placeholder="请选择" size="mini">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in channelList" :key="index"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="归属地区：" class="homeLocation">
								<el-select v-model="addTopForm.province" placeholder="请选择省份" size="mini" @focus="loadProvince" @change="loadCity">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in options.province" :key="index"></el-option>
								</el-select>
								<el-select v-model="addTopForm.city" placeholder="请选择市" size="mini" @change="loadArea">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in options.city" :key="index"></el-option>
								</el-select>
								<el-select v-model="addTopForm.district" placeholder="请选择区/镇/县" size="mini">
									<el-option :label="item.label" :value="item.value" v-for="(item,index) in options.area" :key="index"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="身份证号：" prop="IDNo">
								<el-input v-model="addTopForm.IDNo" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="邮箱：" prop="mailbox">
								<el-input v-model="addTopForm.mailbox" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="备注：" class="addUserRemark" prop="remark">
								<el-input type="textarea" :rows="5" resize="none" v-model="addTopForm.remark"></el-input>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="addUser" size="mini">确 定</el-button>
				</span>
			</el-dialog>
		</div>

		<div class="showDetails">
			<el-dialog title="详情" :visible.sync="detailsDialogVisible" width="50%" :before-close="handleClose">
				<el-form ref="addTopForm" :model="addTopForm" label-width="100px">
					<div class="accountMessage">
						<p>账户信息</p>
						<el-form-item label="登陆账号：">{{detailsDialogForm.username}}</el-form-item>
						<el-form-item label="角色：">{{detailsDialogForm.nameZh}}</el-form-item>
						<el-form-item label="状态：">{{detailsDialogForm.enabled}}</el-form-item>
					</div>
					<div class="accountMessage">
						<p>用户资料</p>

						<el-form-item label="用户名称：">{{detailsDialogForm.name}}</el-form-item>

						<el-form-item label="性别：">{{detailsDialogForm.sex}}</el-form-item>

						<el-form-item label="手机号：">{{detailsDialogForm.phone}}</el-form-item>
						<el-form-item label="业务身份：" prop="channel">
							{{detailsDialogForm.channel=="channel"?'渠道':'自助'}}
						</el-form-item>

						<el-form-item label="归属地区：">{{detailsDialogForm.province}}{{detailsDialogForm.city}}{{detailsDialogForm.area}}</el-form-item>

						<el-form-item label="身份证号：">{{detailsDialogForm.idNo}}</el-form-item>

						<el-form-item label="邮箱：">{{detailsDialogForm.email}}</el-form-item>

						<el-form-item label="最近登录：">{{detailsDialogForm.updateTime}}</el-form-item>

						<el-form-item label="创建时间：">{{detailsDialogForm.createTime}}</el-form-item>

						<el-form-item label="备注：" class="addUserRemark">{{detailsDialogForm.remark}}</el-form-item>
					</div>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" size="mini" @click="detailsDialogVisible = false">关 闭</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		name: "accountManage",
		data() {
			return {
				dialogVisible: false, //新增用户弹窗
				detailsDialogVisible: false,
				page: {
					currentPage: 1,
					size: 10,
					total: 1
				},
				form: {
					accountNumber: "",
					userName: ""
				},
				addTopForm: {
					loginId: "",
					role: "",
					userName: "",
					phoneNum: "",
					sex: "man",
					status: "1",
					channel: "",
					province: "", //省
					city: "", //市
					district: "", //区
					IDNo: "", //身份证号
					mailbox: "", //邮箱
					remark: "" //备注
				},
				detailsDialogForm: [],
				channelList: [{
						value: "self",
						label: "自助直销"
					},
					{
						value: "channel",
						label: "渠道"
					}
				],
				options: {
					province: [],
					city: [],
					area: []
				},
				roleList: [], // 角色列表
				provinceList: [], //省列表
				cityList: [], //市列表
				districtList: [], //区列表
				statusOptions: [{
						value: "1",
						label: "全部"
					},
					{
						value: "2",
						label: "启用"
					},
					{
						value: "3",
						label: "停用"
					}
				],
				accountStatus: "1", //下拉框类型
				tableData: [],
				allRoleTableData: [],
				multipleSelection: [], //选择复选框的信息数组
				ids: [], // 存放批量操作的id
				currentPage: 4, //分页
				radio: "1", //单选按钮
				loading: false
			};
		},
		methods: {
			//重置
			resetForm(form) {
				this.$refs[form].resetFields();
			},

			// 分页
			handleSizeChange(val) {
				this.page.size = val;
				this.changeTableData();
			},
			handleCurrentChange(val) {
				this.page.currentPage = val;
				this.changeTableData();
			},

			//弹窗关闭按钮
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			searchMess(roleName) {
				if (this.accountStatus == "1") {
					this.$ajax
						.post("/vos/user/searchUser2", {
							user: {
								username: this.form.accountNumber,
								roleName: roleName,
								name: this.form.userName
							},
							page: {
								pageNo: "1",
								pageSize: this.page.size
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.tableData = res.data.users;
								this.page.total = res.data.totalCount;
								for (let i = 0; i < this.tableData.length; i++) {
									if (this.tableData[i].enabled == true) {
										this.tableData[i].enabled = "启用";
									} else {
										this.tableData[i].enabled = "暂停";
									}
								}
							}
						});
				}
				if (this.accountStatus == "2") {
					this.$ajax
						.post("/vos/user/searchUser", {
							user: {
								username: this.form.accountNumber,
								roleName: roleName,
								name: this.form.userName,
								enabled: "1"
							},
							page: {
								pageNo: this.page.currentPage,
								pageSize: this.page.size
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.tableData = res.data.users;
								this.page.total = res.data.totalCount;
								for (let i = 0; i < this.tableData.length; i++) {
									if (this.tableData[i].enabled == true) {
										this.tableData[i].enabled = "启用";
									} else {
										this.tableData[i].enabled = "暂停";
									}
								}
							}
						});
				}
				if (this.accountStatus == "3") {
					this.$ajax
						.post("/vos/user/searchUser", {
							user: {
								username: this.form.accountNumber,
								roleName: roleName,
								name: this.form.userName,
								enabled: "0"
							},
							page: {
								pageNo: this.page.currentPage,
								pageSize: this.page.size
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.tableData = res.data.users;
								this.page.total = res.data.totalCount;
								for (let i = 0; i < this.tableData.length; i++) {
									if (this.tableData[i].enabled == true) {
										this.tableData[i].enabled = "启用";
									} else {
										this.tableData[i].enabled = "暂停";
									}
								}
							}
						});
				}
			},

			showAddUser() {
				this.dialogVisible = true;
				this.resetForm("addTopForm");
				this.addTopForm.province = "";
				this.addTopForm.city = "";
				this.addTopForm.district = "";
			},
			// 新增用户
			addUser() {
				if (this.addTopForm.loginId == "" ||
					this.addTopForm.role == "" ||
					this.addTopForm.userName == "" ||
					this.addTopForm.phoneNum == "" ||
					this.addTopForm.channel == "" ||
					this.addTopForm.province == "" ||
					this.addTopForm.city == "" ||
					this.addTopForm.district == "" ||
					this.addTopForm.IDNo == "" ||
					this.addTopForm.mailbox == "" ||
					this.addTopForm.remark == ""
				) {
					this.$message({
						message: "存在空字段!",
						type: "warning"
					});
				} else {
					let provinceName;
					let cityName;
					let areaName;
					let role;
					for (let i = 0; i < this.options.province.length; i++) {
						if (
							this.options.province[i].value ==
							this.addTopForm.province
						) {
							provinceName = this.options.province[i].label;
						}
					}
					for (let i = 0; i < this.options.city.length; i++) {
						if (this.options.city[i].value == this.addTopForm.city) {
							cityName = this.options.city[i].label;
						}
					}
					for (let i = 0; i < this.options.area.length; i++) {
						if (
							this.options.area[i].value == this.addTopForm.district
						) {
							areaName = this.options.area[i].label;
						}
					}

					for (let i = 0; i < this.allRoleTableData.length; i++) {
						if (this.allRoleTableData[i].id == this.addTopForm.role) {
							role = this.allRoleTableData[i].name;
						}
					}
					this.$ajax
						.post("/vos/user/saveUser", {
							user: {
								id: "",
								username: this.addTopForm.loginId,
								password: "",
								roleName: role,
								roleId: this.addTopForm.role,
								enabled: this.addTopForm.status,
								name: this.addTopForm.userName,
								phone: this.addTopForm.phoneNum,
								sex: this.addTopForm.sex,
								remark: this.addTopForm.remark,
								province: provinceName,
								provinceId: this.addTopForm.province,
								city: cityName,
								cityId: this.addTopForm.city,
								area: areaName,
								areaId: this.addTopForm.district,
								email: this.addTopForm.mailbox,
								idNo: this.addTopForm.IDNo,
								headPicture: "",
								businessType: this.addTopForm.channel
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: "新增成功!",
									type: "success"
								});
								this.changeTableData();
								this.dialogVisible = false;
							}
						});

				}
			},

			// 加载下拉列表框的所有角色
			loadRoleList() {
				this.roleList = [];
				for (let i = 0; i < this.allRoleTableData.length; i++) {
					this.roleList.push({
						value: this.allRoleTableData[i].id,
						label: this.allRoleTableData[i].nameZh
					});
				}
			},
			// 加载省份城市
			loadProvince() {
				this.options.province = [];
				this.$ajax.get("/vos/address/getAllProvince").then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.options.province.push({
								value: res.data[i].provinceId,
								label: res.data[i].province
							});
						}
					}
				});
			},
			loadCity() {
				this.addTopForm.city = "";
				this.addTopForm.district = "";
				this.options.city = [];
				this.$ajax
					.get(
						"/vos/address/getCitiesByProvinceId?provinceId=" +
						this.addTopForm.province
					)
					.then(res => {
						if (res.code == 200) {
							for (let i = 0; i < res.data.length; i++) {
								this.options.city.push({
									value: res.data[i].cityId,
									label: res.data[i].city
								});
							}
						}
					});
			},
			loadArea() {
				this.addTopForm.district = "";
				this.options.area = [];
				this.$ajax
					.get(
						"/vos/address/getAreasByCityId?cityId=" +
						this.addTopForm.city
					)
					.then(res => {
						if (res.code == 200) {
							for (let i = 0; i < res.data.length; i++) {
								this.options.area.push({
									value: res.data[i].areaId,
									label: res.data[i].area
								});
							}
						}
					});
			},

			// 批量选择
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			// 批量重置密码
			batchUpdatePass() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						type: "info",
						message: "您未选择!"
					});
				} else {
					this.$confirm("此操作将批量重置密码, 是否继续?", "提示", {
							confirmButtonText: "确定",
							cancelButtonText: "取消"
						})
						.then(() => {
							for (
								let i = 0; i < this.multipleSelection.length; i++
							) {
								this.ids.push({
									id: this.multipleSelection[i].id,
									password: "123456"
								});
							}
							this.$ajax
								.post("/vos/user/editPasswordAll", {
									user: this.ids
								})
								.then(res => {
									if (res.code == 200) {
										this.$message({
											message: "修改成功!",
											type: "success"
										});
										this.changeTableData();
									}
									if (res.code == 4005) {
										this.$message.error("您无权操作!");
									}
								});
						})
						.catch(() => {
							this.$message({
								type: "info",
								message: "已取消删除!"
							});
						});
				}
			},

			// 批量启用
			batchStartAndStop(num) {
				if (this.multipleSelection.length == 0) {
					this.$message({
						type: "info",
						message: "您未选择!"
					});
				} else {
					this.$confirm("此操作是批量操作, 是否继续?", "提示", {
							confirmButtonText: "确定",
							cancelButtonText: "取消"
						})
						.then(() => {
							for (
								let i = 0; i < this.multipleSelection.length; i++
							) {
								this.ids.push({
									id: this.multipleSelection[i].id,
									enabled: num
								});
							}
							this.$ajax
								.post("/vos/user/setEnabled", {
									user: this.ids
								})
								.then(res => {
									if (res.code == 200) {
										this.$message({
											message: "修改成功!",
											type: "success"
										});
										this.changeTableData();
									}
									if (res.code == 4005) {
										this.$message.error("您无权操作!");
									}
								});
						})
						.catch(() => {
							this.$message({
								type: "info",
								message: "已取消删除!"
							});
						});
				}
			},

			// 批量删除
			batchDelete() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						type: "info",
						message: "您未选择!"
					});
				} else {
					this.$confirm("此操作将永久删除这些信息, 是否继续?", "提示", {
							confirmButtonText: "确定",
							cancelButtonText: "取消"
						})
						.then(() => {
							for (
								let i = 0; i < this.multipleSelection.length; i++
							) {
								this.ids.push({
									id: this.multipleSelection[i].id
								});
							}
							this.$ajax
								.post("/vos/user/delete", {
									user: this.ids
								})
								.then(res => {
									if (res.code == 200) {
										this.$message({
											message: "删除成功!",
											type: "success"
										});
										this.changeTableData();
									}
									if (res.code == 4005) {
										this.$message.error("您无权操作!");
									}
								});
						})
						.catch(() => {
							this.$message({
								type: "info",
								message: "已取消删除!"
							});
						});
				}
			},

			// 单个删除
			deleteItem(row) {
				this.$confirm("此操作将永久删除这个信息, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						this.$ajax
							.post("/vos/user/delete", {
								user: [{
									id: row.id
								}]
							})
							.then(res => {
								if (res.code == 200) {
									this.$message({
										message: "删除成功!",
										type: "success"
									});
									this.changeTableData();
								}
								if (res.code == 4005) {
									this.$message.error("您无权操作!");
								}
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除!"
						});
					});
			},

			// 显示详情
			showDetails(row) {
				this.detailsDialogVisible = true;
				if (row.sex == "man") {
					row.sex = "男";
				} else {
					row.sex = "女";
				}
				this.detailsDialogForm = row;
			},

			// 下拉列表框决定表单显示数据
			changeTableData() {
				if (this.accountStatus == "1") {
					this.loadTableData("searchUser2", 1);
				}
				if (this.accountStatus == "2") {
					this.loadTableData("searchUser", 2);
				}
				if (this.accountStatus == "3") {
					this.loadTableData("searchUser", 3);
				}
			},
			loadTableData(strURL, num) {
				this.loading = true;
				let enabled;
				if (num == 1) {
					enabled = "";
				} else if (num == 2) {
					enabled = "1";
				} else {
					enabled = "0";
				}
				this.$ajax
					.post("/vos/user/" + strURL, {
						user: {
							username: "",
							roleName: "",
							name: "",
							enabled: enabled
						},
						page: {
							pageNo: this.page.currentPage,
							pageSize: this.page.size
						}
					})
					.then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.tableData = res.data.users;
							this.page.total = res.data.totalCount;
							for (let i = 0; i < this.tableData.length; i++) {
								if (this.tableData[i].enabled == true) {
									this.tableData[i].enabled = "启用";
								} else {
									this.tableData[i].enabled = "暂停";
								}
							}
						}
					});

				// 获取所有角色
				this.$ajax.get("/vos/role/getAllRoleWithoutAdmin").then(res => {
					if (res.code == 200) {
						this.allRoleTableData = res.data.data;
					}
				});
			}
		},
		created() {
			this.loadTableData("searchUser2", 1);
		}
	};
</script>

<style lang="scss" scoped>
	@import "./accountManage.scss";
</style>