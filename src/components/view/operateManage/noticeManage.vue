<template>
	<div id="noticeManage" v-loading="loading">
		<header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
				<el-breadcrumb-item>公告管理</el-breadcrumb-item>
			</el-breadcrumb>
		</header>
		<el-tabs>
			<div class="search" v-if="permission.indexOf(44)!=-1">
				<ul>
					<li>
						<span class="demonstration">标题内容：</span>
						<el-input v-model="form.title" placeholder="请输入内容" size="mini" style="width:auto;"></el-input>
					</li>
					<li>
						<span class="demonstration">发布人：</span>
						<el-input v-model="form.person" placeholder="请输入内容" size="mini" style="width:auto;"></el-input>
					</li>
				</ul>
				<div class="block left">
					<span class="demonstration">时间：</span>

					<el-date-picker style="margin-right:15px;" v-model="form.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
					<el-button type="primary" size="mini" style="width:80px;" @click="searchNotice()">搜索</el-button>
					<el-button type="primary" plain size="mini" style="width:80px;" @click="resetForm">重置</el-button>
				</div>
			</div>
			<section class="title left">
				<el-button type="primary" size="mini" @click="showAddNotice" v-if="permission.indexOf(49)!=-1">新增公告</el-button>
				<el-button type="primary" plain size="mini" @click="batchDelete" v-if="permission.indexOf(48)!=-1">批量删除</el-button>
			</section>
			<div>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="title" label="公告标题" width="600"></el-table-column>
					<el-table-column prop="publishMan" label="发布人" width="200"></el-table-column>
					<el-table-column prop="publishTime" label="发布时间" width="300"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)" v-if="permission.indexOf(47)!=-1">编辑详情</el-button>
							<el-button size="mini" type="text" @click="handleStick(scope.$index, scope.row)">置顶</el-button>
							<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)" v-if="permission.indexOf(48)!=-1">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" inline class="demo-table-expand">
								<el-form-item label="公告内容">
									<span v-html="props.row.content"></span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="margin-top: 10px">
				<el-pagination style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
			</div>

			<div>
				<el-dialog title="新增/编辑公告" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" @opened="lcb">
					<el-form>
						<el-form-item label="公告标题">
							<el-input v-model="title" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="公告内容"></el-form-item>
						<wangEditor v-if="dialogVisible" :addContent="getContent" :editContent="editContent" ref="lcb"></wangEditor>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
						<el-button type="primary" @click="addNotice" :style="'display:'+submitData+';'" size="mini">确 定</el-button>
						<el-button type="primary" @click="updateNotice" :style="'display:'+updateData+';'" size="mini">编 辑</el-button>
					</span>
				</el-dialog>
			</div>
		</el-tabs>
	</div>
</template>

<script>
	import wangEditor from "./wangEditor/wangEditor";

	export default {
		components: {
			wangEditor
		},
		data() {
			return {
				dialogVisible: false,
				form: {
					title: "",
					person: "",
					date: []
				},
				tableData: [],
				page: {
					currentPage: 1,
					size: 10,
					total: 1
				},
				title: "",
				addContent: "",
				editContent: "",
				id: "",

				content: "",

				selectedItems: [],
				ids: [],

				updateData: "none", // 编辑和新增公用一个弹窗控制按钮显示
				submitData: "inline-block",
                loading: false,
                permission:[]
			};
		},

		props: ["textarea"],

		methods: {
			lcb() {
				this.$refs.lcb.test();
			},

			// 得到子组件传过来的内容，用于新增
			getContent(content) {
				this.addContent = content; // 在这里接受子组件传过来的参数，赋值给data里的参数
			},

			// 修改页面显示数据大小
			handleSizeChange(val) {
                this.page.size = val;
                if (this.form.title != '' ||
					this.form.person != '' ||
					this.form.date.length != 0 ) {
					this.searchNotice();
				} else {
					this.loadData();
				}
			},

			// 修改当前显示页面
			handleCurrentChange(val) {
                this.page.currentPage = val;
                if (this.form.title != '' ||
					this.form.person != '' ||
					this.form.date.length != 0 ) {
					this.searchNotice(this.page.currentPage);
				} else {
					this.loadData();
				}
			},

			// 重置
			resetForm() {
				this.form.title = "";
				this.form.person = "";
				this.form.date = [];
				this.title = "";
				this.editContent = "";
				this.id = "";
			},

			// 搜索信息
			searchNotice(pageNum) {
                this.page.currentPage=pageNum||1;
				if (this.form.date.length == 0) {
					this.form.date[0] = "";
					this.form.date[1] = "";
				}
				this.$ajax
					.post("/vos/announcement/search", {
						ann: {
							title: this.form.title,
							publishMan: this.form.person
						},
						page: {
							pageNo: this.page.currentPage,
							pageSize: this.page.size
						},
						beforeTime: this.form.date[0],
						afterTime: this.form.date[1]
					})
					.then(res => {
						if (res.code == 200) {
							this.tableData = res.data.announcements;
							this.page.total = res.data.totalCount;
						}
					});
			},

			showAddNotice() {
				this.title = "";
				this.editContent = "";
				this.addContent = "";
				this.id = "";

				this.dialogVisible = true;

				this.updateData = "none";
				this.submitData = "inline-block";
			},

			addNotice() {
				if (this.title == "" || this.addContent == "") {
					this.$message({
						message: "存在空字段!",
						type: "warning"
					});
				} else {
					this.$ajax
						.post("/vos/announcement/add", {
							ann: {
								title: this.title,
								content: this.addContent
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: "新增成功",
									type: "success"
								});
								this.loadData();
							}
							if (res.code == 4005) {
								this.$message.error("您无权操作");
							}
						});
					this.dialogVisible = false;
				}


			},

			handleEdit(index, row) {
				this.title = "";
				this.editContent = "";
				this.addContent = "";
				this.id = "";

				this.dialogVisible = true;

				this.updateData = "inline-block";
				this.submitData = "none";

				this.title = row.title;
				this.editContent = row.content;
				this.id = row.id;
			},

			updateNotice() {
				if (this.title == "") {
					this.$message({
						message: "存在空字段!",
						type: "warning"
					});
				} else {
					this.$ajax
						.post("/vos/announcement/update", {
							ann: {
								title: this.title,
								content: this.addContent,
								id: this.id
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: "编辑成功",
									type: "success"
								});
								this.loadData();
							}
							if (res.code == 4005) {
								this.$message.error("您无权操作");
							}
						});
					this.dialogVisible = false;
				}
			},

			// 批量删除
			handleSelectionChange(val) {
				this.selectedItems = val;
			},

			batchDelete() {
				this.$confirm("此操作将永久删除这些信息, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						for (let i = 0; i < this.selectedItems.length; i++) {
							this.ids.push(this.selectedItems[i].id);
						}
						let IDS = this.ids.join(",");
						this.$ajax
							.post("/vos/announcement/delete", {
								ids: IDS
							})
							.then(res => {
								if (res.code == 200) {
									this.$message({
										message: "删除成功!",
										type: "success"
									});
								}
								if (res.code == 4005) {
									this.$message.error("您无权操作!");
								}
								this.loadData();
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},

			// 删除
			handleDelete(index, row) {
				this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						this.$ajax
							.post("/vos/announcement/delete", {
								ids: row.id
							})
							.then(res => {
								if (res.code == 200) {
									this.$message({
										message: "删除成功",
										type: "success"
									});
									this.loadData();
								}
								if (res.code == 4005) {
									this.$message.error("您无权操作");
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

			handleStick(index, row) {
				// 置顶
				this.$ajax
					.post("/vos/announcement/moveTop", {
						ann: {
							id: row.id
						}
					})
					.then(res => {
						if (res.code == 200) {
							this.$message({
								message: "置顶成功",
								type: "success"
							});
							this.loadData();
						}
						if (res.code == 4005) {
							this.$message.error("您无权操作");
						}
					});
			},

			loadData() {
				this.loading = true;
				// 加载el-table的数据
				this.$ajax
					.post("/vos/announcement/getAll", {
						ann: {
							title: "",
							publishMan: ""
						},
						page: {
							pageNo: this.page.currentPage,
							pageSize: this.page.size
						}
					})
					.then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.tableData = res.data.announcements;
							this.page.total = res.data.totalCount;
						}
					});
			},

			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		},
		created() {
            this.loadData();
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
                this.permission.push(item.id);
            });
		}
	};
</script>

<style lang="scss" scoped>
	@import "./noticeManage.scss";
</style>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		padding-top: 15px;
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
	}
</style>