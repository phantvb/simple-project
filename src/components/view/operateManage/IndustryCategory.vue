<template>
	<div id="IndustryCategory" v-loading="loading">
		<header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
				<el-breadcrumb-item>行业类别管理</el-breadcrumb-item>
			</el-breadcrumb>
		</header>
		<div style="margin-top: 15px;overflow: hidden;">
			<div style="float: left;">
				<el-button type="primary" size="mini" @click="showAddDialog">
					<i class="el-icon-plus">&nbsp;新增行业类别</i>
				</el-button>
			</div>
			<div style="float:right;">
				<span style="font-size: 12px;">状态说明：</span>
				<el-checkbox v-model="checked1" disabled>显示</el-checkbox>
				<el-checkbox v-model="checked2" disabled style="margin-left: 0;">隐藏</el-checkbox>
			</div>
		</div>
		<div v-for="(item,index) in totalCount" :key="index" class="item">
			<el-checkbox class="checkbox" v-model="tableData[index].status" disabled></el-checkbox>
			<span class="itemTitle">{{tableData[index].dicValue}}</span>
			<div class="deleteBtn">
				<el-button type="text" @click="updateItem(index)">编辑</el-button>
				<el-button type="text" @click="deleteItem(index)">删除</el-button>
			</div>
		</div>

		<div>
			<el-dialog title="新增/编辑行业类别" :visible.sync="addIndustryCategoryDialogVisible" width="30%" :before-close="handleClose">
				<div>
					<el-form ref="addIndustryCategory" :model="addIndustryCategory" label-width="100px">
						<el-form-item label="类型名称：">
							<el-input v-model="addIndustryCategory.name" size="mini" class="el-input"></el-input>
						</el-form-item>

						<el-form-item label="关键字：" v-if="this.updateData =='none'">
							<el-input v-model="addIndustryCategory.key" size="mini" class="el-input"></el-input>
						</el-form-item>

						<el-form-item label="状态：" style="float: left;margin-left: 0;">
							<el-radio-group v-model="addIndustryCategory.radio">
								<el-radio :label="1">显示</el-radio>
								<el-radio :label="2">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addIndustryCategoryDialogVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="submitAdd" size="mini" :style="'display:'+submitData+';'">确 定</el-button>
					<el-button type="primary" @click="updateMess" size="mini" :style="'display:'+updateData+';'">编 辑</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				addIndustryCategoryDialogVisible: false,
				checked1: true,
				checked2: false,
				addIndustryCategory: {
					name: "",
					key: "",
					radio: 1
				},
				totalCount: "",
				tableData: [],

				id: "", // 保存编辑的id

				updateData: "none", // 编辑和新增公用一个弹窗控制按钮显示
				submitData: "inline-block",
				loading: false
			};
		},
		methods: {
			showAddDialog() {
				this.addIndustryCategoryDialogVisible = true;
				this.addIndustryCategory.name = "";
				this.addIndustryCategory.key = "";
				this.addIndustryCategory.radio = 1;

				this.updateData = "none";
				this.submitData = "inline-block";
			},

			submitAdd() {
				if (
					this.addIndustryCategory.name == "" ||
					this.addIndustryCategory.key == ""
				) {
					this.$message({
						type: "warning",
						message: "存在空字段!"
					});
				} else {
					let status;
					if (this.addIndustryCategory.radio == 1) {
						status = "show";
					}
					if (this.addIndustryCategory.radio == 2) {
						status = "hidden";
					}
					this.$ajax
						.post(
							"/vos/dic/addDic?dicKey=" +
							this.addIndustryCategory.key +
							"&dicValue=" +
							this.addIndustryCategory.name +
							"&dicType=industry_category&status=" +
							status
						)
						.then(res => {
							if (res.code == 200) {
								this.$message({
									type: "success",
									message: "新增成功!"
								});
								this.loadData();
							}
							if (res.code == 400) {
								this.$message.error("新增失败，存在空字段!");
							}
						});
				}

				this.addIndustryCategoryDialogVisible = false;
			},

			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			updateItem(index) {
				this.updateData = "inline-block";
				this.submitData = "none";

				this.addIndustryCategoryDialogVisible = true;
				this.addIndustryCategory.name = this.tableData[index].dicValue;
				if (this.tableData[index].status == false) {
					this.addIndustryCategory.radio = 2;
				}
				if (this.tableData[index].status == true) {
					this.addIndustryCategory.radio = 1;
				}
				this.id = this.tableData[index].id;
			},

			updateMess() {
				if (this.addIndustryCategory.name == "") {
					this.$message({
						type: "warning",
						message: "存在空字段!"
					});
				} else {
					let status;
					if (this.addIndustryCategory.radio == 1) {
						status = "show";
					}
					if (this.addIndustryCategory.radio == 2) {
						status = "hidden";
					}
					this.$ajax
						.post(
							"/vos/dic/editDic?dicValue=" +
							this.addIndustryCategory.name +
							"&dicType=industry_category&status=" +
							status +
							"&id=" +
							this.id
						)
						.then(res => {
							if (res.code == 200) {
								this.$message({
									type: "success",
									message: "编辑成功!"
								});
								this.loadData();
							}
							if (res.code == 400) {
								this.$message.error("编辑失败!");
							}
						});
				}

				this.addIndustryCategoryDialogVisible = false;
			},

			deleteItem(index) {
				this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						this.$ajax
							.post("/vos/dic/delDic?id=" + this.tableData[index].id)
							.then(res => {
								if (res.code == 200) {
									this.$message({
										type: "success",
										message: "删除成功!"
									});
									this.loadData();
								}
								if (res.code == 400) {
									this.$message.error("删除失败!");
								}
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			loadData() {
				this.loading = true;
				this.$ajax
					.post("/vos/dic/getDicsByType", {
						dicType: "industry_category",
						status: ""
					})
					.then(res => {
						if (res.code == 200) {
							this.totalCount = res.data.totalCount;
							this.tableData = res.data.dicList;
							for (let i = 0; i < this.totalCount; i++) {
								if (this.tableData[i].status == "show") {
									this.tableData[i].status = true;
								}
								if (this.tableData[i].status == "hidden") {
									this.tableData[i].status = false;
								}
							}
							this.loading = false;
						}
					});
			}
		},
		created() {
			this.loadData();
		}
	};
</script>
<style lang="scss" scoped>
	@import "./IndustryCategory.scss";
</style>