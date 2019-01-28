<template>
	<div id="roleManage" class="managerFormTitle">
		<div id="base">
			<header class="left">企业管理 > 详情</header>
			<section>
				<div class="block left">
					<button class="fleft passgo">新增角色</button>
				</div>
				<div class="block left">
					<el-tree highlight-current :data="roledata" :props="defaultProps" default-expand-all ref="roles" node-key="id" @node-click="handleNodeClick"></el-tree>
				</div>

			</section>
		</div>
		<div id="progress">
			<header class="left">省级管理员权限配置</header>
			<div class="block left">
				<el-button type="primary" size="small" @click="submit">{{isEdit?'保存':'编辑'}}</el-button>
				<el-button size="small">删除</el-button>
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
				roledata: [{
					id: 1,
					nameZh: "管理员",
					children: [{
							id: 4,
							nameZh: "审核员",
							children: [{
								id: 9,
								nameZh: "业务员"
							}]
						},
						{
							id: 5,
							nameZh: "运营人员"
						},
						{
							id: 6,
							nameZh: "财务人员"
						}
					]
				}],
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
				console.log(data, node, el)
				this.isEdit = false;
				this.chooseData = data;
				node.expanded = true;
			},
			submit() {
				if (!this.isEdit) {
					this.isEdit = !this.isEdit;
				} else {
					var data = {};
					data.roleId = this.chooseData.id;
					data.menuIds = '';
					for (let key in this.form1) {
						if (this.form[key + "manage"]) {
							this.form1[key].map(item => {
								data.menuIds += item.value + ',';
							})
						}
					};
					data.menuIds = data.menuIds.substr(0, data.menuIds.length - 1);
					this.$ajax.post('/vos/menu/addMenuRole', { roleId: data.roleId, menuIds: data.menuIds }).then(res => {
						if (res.code == 200) {
							this.$message.success('保存成功');
						}
					})

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
					var obj = res.data.data.filter(item => item.name == 'ROLE_admin');
					this.$nextTick(() => {
						this.$refs.roles.setCurrentKey(obj[0].id);
					})

				});
			}
		}
	};
</script>