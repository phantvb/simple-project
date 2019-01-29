<template>
	<div id="roleManage" class="managerFormTitle">
		<div id="base">
			<header class="left">企业管理 > 详情</header>
			<section>
				<!-- <div class="block left">
					<button class="fleft passgo">新增角色</button>
        </div>-->
				<div class="block left">
					<el-tree highlight-current :data="roledata" :props="defaultProps" default-expand-all ref="roles" node-key="id" @node-click="handleNodeClick"></el-tree>
				</div>
			</section>
		</div>
		<div id="progress">
			<header class="left">省级管理员权限配置</header>
			<div class="block left">
				<el-button type="primary" size="small" @click="submit">{{isEdit?'保存':'编辑'}}</el-button>
				<!-- <el-button size="small">删除</el-button> -->
			</div>
			<div class="block" :class="{'isedit':!isEdit}">
				<el-tabs v-model="active" type="card">
					<el-tab-pane label="400业务" name="one">
						<el-collapse v-model="twoactive">
							<el-collapse-item v-for="(item,index) in menu" :key="index" :name="index">
								<template slot="title">
									<el-checkbox v-model="form[item.url.replace('/','')+'manage']" @change="handleCheckAll(item,form[item.url.replace('/','')+'manage'])">{{item.name}}</el-checkbox>
								</template>
								<div v-if="item.children.length>0&& item.children[0].url!='/'">
									<div class="wblock left underline" v-for="_item in item.children" :key="_item.id">
										<el-checkbox v-model="form[_item.url.replace('/','')+'manage']" @change="handleCheckAllChange([_item.url.replace('/','')])">{{_item.name}}</el-checkbox>
										<div class="wblock">
											<el-checkbox-group v-model="form1[_item.url.replace('/','')]" class="left" @change="handleChange([_item.url.replace('/','')])">
												<el-checkbox v-for="_i in options[_item.url.replace('/','')]" :label="_i" :key="_i.value">{{_i.label}}</el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
								</div>
								<div class="plr" v-else>
									<el-checkbox-group v-model="form1[item.url.replace('/','')]" class="left" @change="handleChange([item.url.replace('/','')])">
										<el-checkbox v-for="_item in options[item.url.replace('/','')]" :label="_item" :key="_item.value">{{_item.label}}</el-checkbox>
									</el-checkbox-group>
								</div>
							</el-collapse-item>
						</el-collapse>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	@import "./roleManage.scss";
</style>
<script>
	export default {
		name: "roleManage",
		data() {
			return {
				chooseData: {},
				roledata: [],
				defaultProps: {
					children: "children",
					label: "nameZh"
				},
				menu: {},
				form: {},
				form1: {},
				options: {},
				isEdit: false,
				active: "one",
				oneactive: 1,
				twoactive: 0
			};
		},
		created() {
			this.getMenu();
			this.getRole();
		},
		methods: {
			handleCheckAll(data, bol) {
				const name = data.url.replace("/", "");
				if (data.children.length > 0) {
					if (data.children[0].url != "/") {
						data.children.map(item => {
							this.form[item.url.replace("/", "") + "manage"] = bol;
							this.handleCheckAllChange(item.url.replace("/", ""));
						});
					} else {
						this.handleCheckAllChange(name);
					}
				}
			},
			handleCheckAllChange(name) {
				this.form1[name] = this.form[name + "manage"] ? this.options[name] : [];
			},
			handleChange(name) {
				if (this.form1[name].length > 0) {
					this.form[name + "manage"] = true;
				} else if (this.form1[name].length == 0) {
					this.form[name + "manage"] = false;
				}
			},
			handleNodeClick(data, node, el) {
				console.log(data);
				var _this = this;
				this.isEdit = false;
				this.chooseData = data;
				node.expanded = true;
				this.$ajax.get("/vos/menu/getTreeMenu?roleId=" + data.id).then(res => {
					if (res.code == 200) {
						for (let key in this.form) {
							if (this.form[key] === true) {
								this.$set(this.form, key, false);
							}
						}
						for (let key in this.form1) {
							this.$set(this.form1, key, []);
						}

						function format(arrData, parentName) {
							var op = [];
							arrData.map(item => {
								//有下级列表
								if (item.url !== "/") {
									const name = item.url.replace("/", "");
									_this.$set(_this.form, name + "manage", true);
									format(item.children, name);
								} else {
									for (let value of _this.options[parentName]) {
										if (value.value == item.id) {
											_this.form1[parentName].push(value);
											return;
										}
									}
								}
							});
						}
						format(res.data.menuList);
					}
				});
			},
			submit() {
				if (!this.isEdit) {
					this.isEdit = !this.isEdit;
				} else {
					var data = {};
					data.roleId = this.chooseData.id;
					data.menuIds = "";
					for (let key in this.form1) {
						if (this.form[key + "manage"]) {
							this.form1[key].map(item => {
								data.menuIds += item.value + ",";
							});
						}
					}
					for (let key in this.form) {
						if (this.form[key] === true && this.form[key + "Id"] != undefined) {
							data.menuIds += this.form[key + "Id"] + ",";
						}
					}
					data.menuIds = data.menuIds.substr(0, data.menuIds.length - 1);
					this.$ajax
						.post("/vos/menu/addMenuRole", {
							roleId: data.roleId,
							menuIds: data.menuIds
						})
						.then(res => {
							if (res.code == 200) {
								this.$message.success("保存成功");
							}
						});
				}
			},
			getMenu() {
				var _this = this;
				this.$ajax.get("/vos/menu/getAllMenu").then(res => {
					function format(arrData, parentName) {
						arrData.map(item => {
							//有下级列表
							if (item.url !== "/") {
								const name = item.url.replace("/", "");
								_this.$set(_this.form, name + "manage", true);
								_this.$set(_this.form, name + "manageId", item.id);
								format(item.children, name);
							} else {
								const obj = {
									label: item.name,
									value: item.id
								};
								if (_this.form1[parentName] == undefined) {
									_this.$set(_this.form1, parentName, []);
								}
								if (_this.options[parentName] == undefined) {
									_this.options[parentName] = [];
								}
								_this.form1[parentName].push(obj);
								_this.options[parentName].push(obj);
							}
						});
					}
					format(res.data.menuList);
					this.menu = res.data.menuList;
				});
			},
			getRole() {
				this.$ajax.get("/vos/role/getAllRole").then(res => {
					this.roledata = res.data.data;
					this.chooseData = res.data.data[0];
					var obj = res.data.data.filter(item => item.name == "ROLE_admin");
					this.$nextTick(() => {
						this.$refs.roles.setCurrentKey(obj[0].id);
					});
				});
			}
		}
	};
</script>