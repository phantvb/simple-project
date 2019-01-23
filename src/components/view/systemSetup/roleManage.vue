<template>
	<div id="roleManage" class="managerFormTitle">
		<div id="base">
			<header class="left">
				企业管理 > 详情
			</header>
			<section>
				<div class="block left">
					<button class="fleft passgo">新增角色</button>
					<el-tree class="filter-tree" :data="roledata" :props="defaultProps" default-expand-all ref="roles" node-key="id" @node-click="handleNodeClick">
					</el-tree>
				</div>
			</section>
		</div>
		<div id="progress">
			<header class="left">
				省级管理员权限配置
			</header>
			<div class="block left">
				<el-button type="primary" size="small" @click="isEdit=true">{{isEdit?'保存':'编辑'}}</el-button>
				<el-button size="small">删除</el-button>
			</div>
			<div class="block" :class="{'isedit':!isEdit}">
				<el-tabs v-model="active" type="card">
					<el-tab-pane label="400业务" name="one">
						<el-collapse v-model="twoactive">
							<el-collapse-item name="1">
								<template slot="title">
									<el-checkbox v-model="form1.accountingManage">账务管理</el-checkbox>
								</template>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.accounting" @change="handleCheckAllChange('accounting')">账务管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.accounting" class="left" @change="handleChange('accounting')">
											<el-checkbox v-for="item in accounting" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.bollot" @change="handleCheckAllChange('bollot')">开票管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.bollot" class="left" @change="handleChange('bollot')">
											<el-checkbox v-for="item in bollot" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.bill" @change="handleCheckAllChange('bill')">账单管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.bill" class="left" @change="handleChange('bill')">
											<el-checkbox v-for="item in bill" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.charge" @change="handleCheckAllChange('charge')">充值管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.charge" class="left" @change="handleChange('charge')">
											<el-checkbox v-for="item in charge" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
							</el-collapse-item>
							<el-collapse-item name="2">
								<template slot="title">
									<el-checkbox v-model="form1.numManage">号码管理</el-checkbox>
								</template>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.num" @change="handleCheckAllChange('num')">号码管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.num" class="left" @change="handleChange('num')">
											<el-checkbox v-for="item in num" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.ticket" @change="handleCheckAllChange('ticket')">话单管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.ticket" class="left" @change="handleChange('ticket')">
											<el-checkbox v-for="item in ticket" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.voiceFile" @change="handleCheckAllChange('voiceFile')">语音文件管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.voiceFile" class="left" @change="handleChange('voiceFile')">
											<el-checkbox v-for="item in voiceFile" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.blacklist" @change="handleCheckAllChange('blacklist')">黑名单管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.blacklist" class="left" @change="handleChange('blacklist')">
											<el-checkbox v-for="item in blacklist" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.ObjCode" @change="handleCheckAllChange('ObjCode')">目的码管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.ObjCode" class="left" @change="handleChange('ObjCode')">
											<el-checkbox v-for="item in ObjCode" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
							</el-collapse-item>
							<el-collapse-item name="3">
								<template slot="title">
									<el-checkbox v-model="form1.businessManage" @change="handleCheckAllChange('businessSetup')">企业管理</el-checkbox>
								</template>
								<div class="plr">
									<el-checkbox-group v-model="form.businessSetup" class="left" @change="handleChange('businessSetup')">
										<el-checkbox v-for="item in businessSetup" :label="item" :key="item.value">{{item.label}}</el-checkbox>
									</el-checkbox-group>
								</div>
							</el-collapse-item>
							<el-collapse-item name="4">
								<template slot="title">
									<el-checkbox v-model="form1.businessAccepted" @change="handleCheckAllChange('businessAccepted')">400业务管理</el-checkbox>
								</template>
								<div class="plr">
									<el-checkbox-group v-model="form.businessAccepted" class="left" @change="handleChange('businessAccepted')">
										<el-checkbox v-for="item in businessAccepted" :label="item" :key="item.value">{{item.label}}</el-checkbox>
									</el-checkbox-group>
								</div>
							</el-collapse-item>
							<el-collapse-item name="5">
								<template slot="title">
									<el-checkbox v-model="form1.operateManage">运营管理</el-checkbox>
								</template>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.Industry" @change="handleCheckAllChange('Industry')">行业类别管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.Industry" class="left" @change="handleChange('Industry')">
											<el-checkbox v-for="item in Industry" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.Combo" @change="handleCheckAllChange('Combo')">资费及增值套餐管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.Combo" class="left" @change="handleChange('Combo')">
											<el-checkbox v-for="item in Combo" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.notice" @change="handleCheckAllChange('notice')">公告管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.notice" class="left" @change="handleChange('notice')">
											<el-checkbox v-for="item in notice" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.slideshow" @change="handleCheckAllChange('slideshow')">轮播图管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.slideshow" class="left" @change="handleChange('slideshow')">
											<el-checkbox v-for="item in slideshow" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="wblock left underline">
									<el-checkbox v-model="form1.numPool" @change="handleCheckAllChange('numPool')">号码池管理</el-checkbox>
									<div class="wblock">
										<el-checkbox-group v-model="form.numPool" class="left" @change="handleChange('numPool')">
											<el-checkbox v-for="item in numPool" :label="item" :key="item.value">{{item.label}}</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
							</el-collapse-item>
							<el-collapse-item name="6">
								<template slot="title">
									<el-checkbox v-model="form1.messageCenter">消息中心</el-checkbox>
								</template>
							</el-collapse-item>
						</el-collapse>

					</el-tab-pane>
					<el-tab-pane label="系统模块" name="second">
						<el-collapse v-model="oneactive">
							<el-collapse-item name="1">
								<template slot="title">
									<el-checkbox v-model="form1.pandect">总览</el-checkbox>
								</template>
							</el-collapse-item>
							<el-collapse-item name="2">
								<template slot="title">
									<el-checkbox v-model="form1.userCenter" @change="handleCheckAllChange('userCenter')">用户中心</el-checkbox>
								</template>
								<div class="plr">
									<el-checkbox-group v-model="form.userCenter" class="left" @change="handleChange('userCenter')">
										<el-checkbox v-for="item in userCenter" :label="item" :key="item.value">{{item.label}}</el-checkbox>
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
	@import './roleManage.scss';
</style>
<script>
	const options = {
		//用户中心
		userCenterOption: [{ label: '编辑资料', value: 'edit' }, { label: '修改头像', value: 'editPic' }, { label: '修改密码', value: 'editPass' }],
		//账务管理
		accountingOption: [{ label: '搜索', value: 'search' }, { label: '导出列表', value: 'outputB' }, { label: '导出详单', value: 'outputD' }, { label: '添加优惠', value: 'favourable' }, { label: '修改到账', value: 'transfer' }],
		//开票管理
		bollotOption: [{ label: '搜索', value: 'search' }, { label: '导出列表', value: 'outputB' }, { label: '导出详单', value: 'outputD' }, { label: '确认开票', value: 'bollot' }, { label: '修改', value: 'edit' }],
		//账单管理
		billOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }],
		//充值管理
		chargeOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '新增', value: 'add' }],
		//号码管理
		numOption: [{ label: '搜索', value: 'search' }, { label: '关启', value: 'swith' }, { label: '续费', value: 'renew' }, { label: '停用', value: 'block' }, { label: '注销', value: 'cancel' }, { label: '号码设置', value: 'efit' }],
		//话单管理
		ticketOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '试听', value: 'listen' }],
		//语音文件管理
		voiceFileOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '试听', value: 'listen' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//黑名单管理
		blacklistOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//目的码管理
		ObjCodeOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//企业管理
		businessSetupOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '送审', value: 'edit' }, { label: '通过审核', value: 'pass' }, { label: '驳回', value: 'back' }, { label: '注销', value: 'cancel' }, { label: '新增', value: 'add' }],
		//400业务管理
		businessAcceptedOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '送审', value: 'edit' }, { label: '通过审核', value: 'pass' }, { label: '驳回', value: 'back' }, { label: '注销', value: 'cancel' }, { label: '新增受理', value: 'add_s' }, { label: '新增语音文件', value: 'add_v' }, { label: '新增目的码', value: 'add_o' }],
		//行业类别管理
		IndustryOption: [{ label: '编辑', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//资费及增值套餐管理
		ComboOption: [{ label: '编辑', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//公告管理
		noticeOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//轮播图管理
		slideshowOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//号码池管理
		numPoolOption: [{ label: '搜索', value: 'search' }, { label: '导出', value: 'output' }, { label: '修改', value: 'edit' }, { label: '删除', value: 'remove' }, { label: '新增', value: 'add' }],
		//消息中心
	}
	export default {
		name: 'roleManage',
		data() {
			return {
				form1: {
					accountingManage: true,
					numManage: true,
					businessManage: true,
					businessAccepted: true,
					operateManage: true,
					messageCenter: true,
					pandect: true,
					userCenter: true,
					accounting: true,
					bollot: true,
					bill: true,
					charge: true,
					num: true,
					ticket: true,
					voiceFile: true,
					blacklist: true,
					ObjCode: true,
					Industry: true,
					Combo: true,
					notice: true,
					slideshow: true,
					numPool: true,
				},
				form: {
					userCenter: options.userCenterOption,
					accounting: options.accountingOption,
					bollot: options.bollotOption,
					bill: options.billOption,
					charge: options.chargeOption,
					num: options.numOption,
					ticket: options.ticketOption,
					voiceFile: options.voiceFileOption,
					blacklist: options.blacklistOption,
					ObjCode: options.ObjCodeOption,
					businessSetup: options.businessSetupOption,
					businessAccepted: options.businessAcceptedOption,
					Industry: options.IndustryOption,
					Combo: options.ComboOption,
					notice: options.noticeOption,
					slideshow: options.slideshowOption,
					numPool: options.numPoolOption

				},
				userCenter: options.userCenterOption,
				accounting: options.accountingOption,
				bollot: options.bollotOption,
				bill: options.billOption,
				charge: options.chargeOption,
				num: options.numOption,
				ticket: options.ticketOption,
				voiceFile: options.voiceFileOption,
				blacklist: options.blacklistOption,
				ObjCode: options.ObjCodeOption,
				businessSetup: options.businessSetupOption,
				businessAccepted: options.businessAcceptedOption,
				Industry: options.IndustryOption,
				Combo: options.ComboOption,
				notice: options.noticeOption,
				slideshow: options.slideshowOption,
				numPool: options.numPoolOption,
				roledata: [{
					id: 1,
					label: '管理员',
					children: [{
						id: 4,
						label: '审核员',
						children: [{
							id: 9,
							label: '业务员'
						}]
					}, {
						id: 5,
						label: '运营人员',
					}, {
						id: 6,
						label: '财务人员',
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				isEdit: false,
				active: 'one',
				oneactive: 1,
				twoactive: 1
			}
		},
		methods: {
			handleCheckAllChange(name) {
				this.form[name] = this.form1[name] ? options[name + 'Option'] : [];
			},
			handleChange(name) {
				if (this.form[name].length > 0) {
					this.form1[name] = true;
				} else if (this.form[name].length == 0) {
					this.form1[name] = false;
				}
			},
			handleNodeClick(data, node, el) {
				console.log(data, node, el);
			}
		}
	}
</script>