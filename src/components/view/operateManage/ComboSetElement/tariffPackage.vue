<template>
	<div v-loading="loading">
		<div>
			<el-button type="primary" style="float: left;" @click="showAddFees">
				<i class="el-icon-plus">&nbsp;新增资费套餐</i>
			</el-button>
		</div>
		<div style="clear: both;"></div>
		<div style="margin-top: 15px;">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="自助直销" name="1">
					<div>
						<el-row>
							<el-col :md="11" :lg="7" :xl="5" v-for="(o, index) in aTotalCount1" :key="index" :offset="1" style="margin-top: 10px;">
								<el-card :body-style="{ padding: '0px'}" shadow="hover">
									<div class="add-title">{{aTableData1[index].tariffName}}</div>
									<div class="add-body">
										<el-form label-width="100px">
											<el-form-item label="类型：" class="add-item">{{aTableData1[index].type}}</el-form-item>
											<el-form-item label="套餐规则：" class="add-item">{{aTableData1[index].packageRules}}</el-form-item>
											<el-form-item label="基本功能费：" class="add-item">{{aTableData1[index].basicFunctionFee}}元</el-form-item>
											<el-form-item label="套餐内单价：" class="add-item">{{aTableData1[index].unitPrice}}元/分钟</el-form-item>
											<el-form-item label="赠送时长：" class="add-item">{{aTableData1[index].durationPresentation}}分钟</el-form-item>
											<el-form-item label="超出资费：" class="add-item">{{aTableData1[index].excessTariff}}元/分钟</el-form-item>
											<el-form-item label="套餐内容：" class="add-item">
												<el-popover placement="bottom" width="200" trigger="click" :content="aTableData1[index].packageContent">
													<el-button slot="reference" type="text" class="button">查看详情</el-button>
												</el-popover>
											</el-form-item>
											<div style="border-top: 1px solid #f5f5f5;">
												<div style="float: right;">
													<el-button type="text" class="button" @click="updateTariff(0,index)">编辑</el-button>
													<el-button type="text" class="button" @click="deleteInfo(aTableData1[index].id,'delTariff')">删除</el-button>
												</div>
											</div>
										</el-form>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
				</el-collapse-item>
				<el-collapse-item title="渠道" name="2">
					<div>
						<el-row>
							<el-col :md="11" :lg="7" :xl="5" v-for="(o, index) in aTotalCount2" :key="index" :offset="1" style="margin-top: 10px;">
								<el-card :body-style="{ padding: '0px'}" shadow="hover">
									<div class="add-title">{{aTableData2[index].tariffName}}</div>
									<div class="add-body">
										<el-form label-width="100px">
											<el-form-item label="类型：" class="add-item">{{aTableData2[index].type}}</el-form-item>
											<el-form-item label="套餐规则：" class="add-item">{{aTableData2[index].packageRules}}</el-form-item>
											<el-form-item label="基本功能费：" class="add-item">{{aTableData2[index].basicFunctionFee}}元</el-form-item>
											<el-form-item label="套餐内单价：" class="add-item">{{aTableData2[index].unitPrice}}元/分钟</el-form-item>
											<el-form-item label="赠送时长：" class="add-item">{{aTableData2[index].durationPresentation}}分钟</el-form-item>
											<el-form-item label="超出资费：" class="add-item">{{aTableData2[index].excessTariff}}元/分钟</el-form-item>
											<el-form-item label="套餐内容：" class="add-item">
												<el-popover placement="bottom" width="200" trigger="click" :content="aTableData2[index].packageContent">
													<el-button slot="reference" type="text" class="button">查看详情</el-button>
												</el-popover>
											</el-form-item>
											<div style="border-top: 1px solid #f5f5f5;">
												<div style="float: right;">
													<el-button type="text" class="button" @click="updateTariff(1,index)">编辑</el-button>
													<el-button type="text" class="button" @click="deleteInfo(aTableData2[index].id,'delTariff')">删除</el-button>
												</div>
											</div>
										</el-form>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>

		<div class="addFeesDialog">
			<el-dialog title="新增/编辑资费套餐" :visible.sync="addFeesFromDialogVisible" width="40%">
				<div>
					<el-form ref="addFeesForm" :model="addFeesForm" label-width="100px">
						<el-form-item label="套餐名称：" prop="tariffName">
							<el-input v-model="addFeesForm.tariffName" size="mini" class="el-input"></el-input>
						</el-form-item>
						<el-form-item label="类型：">
							<el-radio v-model="addFeesForm.radio" label="1" class="el-radio">按年计费</el-radio>
							<el-radio v-model="addFeesForm.radio" label="2">按月计费</el-radio>
						</el-form-item>

						<el-form-item label="套餐规则：" prop="packageRules">
							<el-input v-model="addFeesForm.packageRules" size="mini" class="el-input"></el-input>
						</el-form-item>

						<el-form-item label="基本功能费：" prop="basicFunctionFee">
							<el-input v-model="addFeesForm.basicFunctionFee" size="mini" class="el-input"></el-input>
							<span class="span">元</span>
						</el-form-item>

						<el-form-item label="单位：" prop="units">
							<el-input v-model="addFeesForm.units" size="mini" class="el-input"></el-input>
							<span class="span">月</span>
						</el-form-item>

						<el-form-item label="赠送时长：" prop="durationPresentation">
							<el-input v-model="addFeesForm.durationPresentation" size="mini" class="el-input"></el-input>
							<span class="span">分钟</span>
						</el-form-item>

						<el-form-item label="套餐内单价：" prop="unitPrice">
							<el-input v-model="addFeesForm.unitPrice" size="mini" class="el-input"></el-input>
							<span class="span">元/分钟</span>
						</el-form-item>

						<el-form-item label="超出资费：" prop="excessTariff">
							<el-input v-model="addFeesForm.excessTariff" size="mini" class="el-input"></el-input>
							<span class="span">元/分钟</span>
						</el-form-item>

						<el-form-item label="套餐内容：" prop="packageContent">
							<el-input type="textarea" :rows="5" v-model="addFeesForm.packageContent" class="el-input"></el-input>
						</el-form-item>

						<el-form-item label="渠道：">
							<el-checkbox-group v-model="addFeesForm.checkList">
								<el-checkbox label="自助直销" class="el-checkbox" :disabled="this.disabledSelf"></el-checkbox>
								<el-checkbox label="渠道" :disabled="this.disabledChannel"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addFeesFromDialogVisible = false" size="mini">取 消</el-button>
					<el-button type="primary" @click="addFees" size="mini" :style="'display:'+submitData+';'">确 定</el-button>
					<el-button type="primary" @click="updateFees" size="mini" :style="'display:'+updateData+';'">编 辑</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				addFeesFromDialogVisible: false,
				activeNames: ["1", "2"],
				buttonShow1: "inline-block",
				buttonShow2: "inline-block",
				addFeesForm: {
					tariffName: "",
					radio: "1",
					packageRules: "",
					basicFunctionFee: "",
					bottomFee: "",
					units: "",
					unitPrice: "",
					durationPresentation: "",
					excessTariff: "",
					packageContent: "",
					checkList: [],
					id: ""
				},
				aTotalCount1: "",
				aTotalCount2: "",
				aTableData1: [],
				aTableData2: [],

				updateData: "none", // 编辑和新增公用一个弹窗控制按钮显示
				submitData: "inline-block",

				disabledSelf: false,
				disabledChannel: false,
				loading: false
			};
		},
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			showAddFees() {
				this.addFeesFromDialogVisible = true;

				this.resetForm('addFeesForm');

				this.addFeesForm.id = "";

				this.updateData = "none";
				this.submitData = "inline-block";

				this.disabledSelf = false;
				this.disabledChannel = false;
			},
			// 新增资费套餐
			addFees() {
				if (
					this.addFeesForm.tariffName == "" ||
					this.addFeesForm.radio == "" ||
					this.addFeesForm.packageRules == "" ||
					this.addFeesForm.basicFunctionFee == "" ||
					this.addFeesForm.units == "" ||
					this.addFeesForm.unitPrice == "" ||
					this.addFeesForm.durationPresentation == "" ||
					this.addFeesForm.excessTariff == "" ||
					this.addFeesForm.packageContent == "" ||
					this.addFeesForm.checkList == ""
				) {
					this.$message({
						message: "存在空字段!",
						type: "warning"
					});
				} else {
					let str = "";
					if (this.addFeesForm.checkList.length == 2) {
						str = "self+channel";
					}
					if (
						this.addFeesForm.checkList.length == 1 &&
						this.addFeesForm.checkList[0] == "自助直销"
					) {
						str = "self";
					}
					if (
						this.addFeesForm.checkList.length == 1 &&
						this.addFeesForm.checkList[0] == "渠道"
					) {
						str = "channel";
					}
					this.$ajax
						.post("/vos/tariffPackage/addTariff", {
							tariff: {
								tariffName: this.addFeesForm.tariffName,
								type: this.addFeesForm.radio,
								packageRules: this.addFeesForm.packageRules,
								basicFunctionFee: this.addFeesForm.basicFunctionFee,
								units: this.addFeesForm.units,
								bottomFee: "",
								durationPresentation: this.addFeesForm
									.durationPresentation,
								excessTariff: this.addFeesForm.excessTariff,
								packageContent: this.addFeesForm.packageContent,
								channel: str,
								unitPrice: this.addFeesForm.unitPrice
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: "新增成功!",
									type: "success"
								});
								this.loadData();
							}
							if (res.code == 60000) {
								this.$message({
									message: "数据已存在!",
									type: "warning"
								});
							}
						});
				}

				this.addFeesFromDialogVisible = false;
			},

			// 编辑资费套餐
			updateTariff(num, index) {
				this.tableData = [this.aTableData1, this.aTableData2];
				this.addFeesFromDialogVisible = true;

				this.updateData = "inline-block";
				this.submitData = "none";

				this.disabledSelf = true;
				this.disabledChannel = true;

				let radio = "";
				if (this.tableData[num][index].type == "按年计费") {
					radio = "1";
				} else {
					radio = "2";
				}

				let channel = "";
				if (this.tableData[num][index].channel == "self") {
					channel = ["自助直销"];
				}
				if (this.tableData[num][index].channel == "channel") {
					channel = ["渠道"];
				}
				if (this.tableData[num][index].channel == "self+channel") {
					channel = ["自助直销", "渠道"];
				}

				this.addFeesForm.tariffName = this.tableData[num][index].tariffName;
				this.addFeesForm.radio = radio;
				this.addFeesForm.packageRules = this.tableData[num][index].packageRules;
				this.addFeesForm.basicFunctionFee = this.tableData[num][index].basicFunctionFee;
				this.addFeesForm.units = this.tableData[num][index].units;
				this.addFeesForm.unitPrice = this.tableData[num][index].unitPrice;
				this.addFeesForm.durationPresentation = this.tableData[num][index].durationPresentation;
				this.addFeesForm.excessTariff = this.tableData[num][index].excessTariff;
				this.addFeesForm.packageContent = this.tableData[num][index].packageContent;
				this.addFeesForm.checkList = channel;
				this.addFeesForm.id = this.tableData[num][index].id;
			},

			updateFees() {
				if (
					this.addFeesForm.tariffName == "" ||
					this.addFeesForm.radio == "" ||
					this.addFeesForm.packageRules == "" ||
					this.addFeesForm.basicFunctionFee == "" ||
					this.addFeesForm.units == "" ||
					this.addFeesForm.unitPrice == "" ||
					this.addFeesForm.durationPresentation == "" ||
					this.addFeesForm.excessTariff == "" ||
					this.addFeesForm.packageContent == ""
				) {
					this.$message({
						message: "存在空字段!",
						type: "warning"
					});
				} else {
					let str = "";
					if (this.addFeesForm.checkList.length == 2) {
						str = "self+channel";
					}
					if (
						this.addFeesForm.checkList.length == 1 &&
						this.addFeesForm.checkList[0] == "自助直销"
					) {
						str = "self";
					}
					if (
						this.addFeesForm.checkList.length == 1 &&
						this.addFeesForm.checkList[0] == "渠道"
					) {
						str = "channel";
					}
					this.$ajax
						.post("/vos/tariffPackage/updateTariff", {
							tariff: {
								id: this.addFeesForm.id,
								tariffName: this.addFeesForm.tariffName,
								type: this.addFeesForm.radio,
								packageRules: this.addFeesForm.packageRules,
								basicFunctionFee: this.addFeesForm.basicFunctionFee,
								units: this.addFeesForm.units,
								bottomFee: "",
								durationPresentation: this.addFeesForm
									.durationPresentation,
								excessTariff: this.addFeesForm.excessTariff,
								packageContent: this.addFeesForm.packageContent,
								channel: str,
								unitPrice: this.addFeesForm.unitPrice
							}
						})
						.then(res => {
							if (res.code == 200) {
								this.$message({
									message: "编辑成功!",
									type: "success"
								});
								this.loadData();
							}
						});
				}

				this.addFeesFromDialogVisible = false;
			},

			//删除信息
			deleteInfo(id, url) {
				this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消"
					})
					.then(() => {
						this.$ajax
							.post("/vos/tariffPackage/" + url, {
								id: id
							})
							.then(res => {
								if (res.code == 200) {
									this.$message({
										message: "删除成功!",
										type: "success"
									});
									this.loadData();
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

			loadData() {
				this.loading = true;
				this.$ajax.post("/vos/tariffPackage/getTariff", {
					tariff: {
						channel: "self"
					}
				}).then(res => {
					if (res.code == 200) {
						this.aTotalCount1 = res.data.tariffPackageList.length;
						this.aTableData1 = res.data.tariffPackageList;
						for (var i = 0; i < this.aTotalCount1; i++) {
							if (this.aTableData1[i].type == 1) {
								this.aTableData1[i].type = "按年计费";
							}
							if (this.aTableData1[i].type == 2) {
								this.aTableData1[i].type = "按月计费";
							}
						}
					}
				});
				this.$ajax.post("/vos/tariffPackage/getTariff", {
					tariff: {
						channel: "channel"
					}
				}).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.aTotalCount2 = res.data.tariffPackageList.length;
						this.aTableData2 = res.data.tariffPackageList;
						for (var i = 0; i < this.aTotalCount2; i++) {
							if (this.aTableData2[i].type == 1) {
								this.aTableData2[i].type = "按年计费";
							}
							if (this.aTableData2[i].type == 2) {
								this.aTableData2[i].type = "按月计费";
							}
						}
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
	@import "../ComboSet.scss";
</style>