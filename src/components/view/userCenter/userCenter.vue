<template>
	<div id="userCenter">
		<header>
			用户中心
		</header>
		<section>
			<div class="title">
				基本资料
				<p class="edit">
					<i class="el-icon-edit-outline"></i>
					<el-button type="text" @click="editMes(true)">编辑</el-button>
				</p>
			</div>
			<div class="part center portrait">
				<img :src="form.headPicture.indexOf('userHead')==-1?$global.serverSrc+form.headPicture:'/static/'+form.headPicture">
				<el-button type="text" class="button" @click="editPortrait(true)">修改头像</el-button>
			</div>
			<div class="part message">
				<p>登录账号 ：<span class="grey">{{form.username}}</span></p>
				<p>用户名称：{{form.name}}</p>
				<p>性别：{{form.sex=='man'?'男':'女'}}</p>
				<p>身份证号：{{form.idNo}}</p>
				<p>邮箱：{{form.email}}</p>
				<p>手机：{{form.phone}}</p>
			</div>
			<div class="part message">
				<p>角色：{{form.nameZh}}</p>
				<p>业务身份：{{form.businessType=="channel"?'渠道':'自助'}}</p>
				<p>地区：{{form.province}}{{form.city}}{{form.area}}</p>
				<p>状态：{{form.enabled?'启用':'关闭'}}</p>
				<p>备注：{{form.remark}}</p>
			</div>
		</section>
		<section>
			<div class="title">
				安全设置
			</div>
			<div class="part">
				<el-button type="text" class="button" @click="editPass(true)">修改密码</el-button>
			</div>
		</section>
		<section>
			<div class="title">
				企业信息管理
			</div>
			<el-row :gutter="12" class="block">
				<el-col :span="6">
					<el-card shadow="hover" class="center">
						<div class="card">
							<img src="/static/userPic_1.png" alt="">
							<el-button type="primary" size="small" @click="addCompany(true)"><i class="el-icon-plus"></i>新增企业</el-button>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card shadow="hover">
						<div class="card cardY">
							<p class="center">企业信息新增审核</p>
							<p class="fxl center bold" :class="checkForm.cpAuditingNum==0?'grey':'blue'">{{checkForm.cpAuditingNum}}</p>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card shadow="hover">
						<div class="card cardY">
							<p class="center">企业信息变更审核</p>
							<p class="fxl center bold" :class="checkForm.cpModifyAuditingNum==0?'grey':'blue'">{{checkForm.cpModifyAuditingNum}}</p>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card shadow="hover">
						<div class="card cardY">
							<p class="center">企业信息注销审核</p>
							<p class="fxl center bold" :class="checkForm.cpCancelingAuditingNum==0?'grey':'blue'">{{checkForm.cpCancelingAuditingNum}}</p>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</section>
		<section>
			<div class="title">
				业务受理
			</div>
			<el-row :gutter="12">
				<el-col :span="6">
					<el-card shadow="never" class="center">
						<div class="card">
							<img src="/static/userPic_1.png" alt="">
							<el-button type="primary" size="small" @click="addBusiness(true)"><i class="el-icon-plus"></i>新增预受理</el-button>
						</div>
					</el-card>
				</el-col>
				<el-col :span="18">
					<el-row :gutter="12">
						<el-col :span="6">
							<el-card shadow="never">
								<div class="card cardY2">
									<p class="center">正式受理审核</p>
									<p class="fxl center bold" :class="checkForm.bsAuditingNum==0?'grey':'blue'">{{checkForm.bsAuditingNum}}</p>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6">
							<el-card shadow="never">
								<div class="card cardY2">
									<p class="center">注销审核</p>
									<p class="fxl center bold" :class="checkForm.bsCancelingAuditingNum==0?'grey':'blue'">{{checkForm.bsCancelingAuditingNum}}</p>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6">
							<el-card shadow="never">
								<div class="card cardY2">
									<p class="center">变更审核</p>
									<p class="fxl center bold" :class="checkForm.bsModifyAuditingNum==0?'grey':'blue'">{{checkForm.bsModifyAuditingNum}}</p>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6">
							<el-card shadow="never">
								<div class="card cardY2">
									<p class="center">语音文件审核</p>
									<p class="fxl center bold" :class="checkForm.vsAuditingNum==0?'grey':'blue'">{{checkForm.vsAuditingNum}}</p>
								</div>
							</el-card>
						</el-col>
						<el-col :span="6">
							<el-card shadow="never">
								<div class="card cardY2">
									<p class="center">业务目的码审核</p>
									<p class="fxl center bold" :class="checkForm.dsAuditingNum==0?'grey':'blue'">{{checkForm.dsAuditingNum}}</p>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</section>
		<message :show="mesEdit" :data="form" @close="editMes(false)"></message>
		<portrait :show="portraitEdit" :data="form" @close="editPortrait(false)"></portrait>
		<password :show="passEdit" :data="form" @close="editPass(false)"></password>
		<company :show="addCompanys" @close="closeCompany" :flowIdData="{}" :editCompanyType="0"></company>
	</div>
</template>

<script>
	import message from './dialog/message.vue'
	import portrait from './dialog/portrait.vue'
	import password from './dialog/password.vue'
	import company from '../businessSetup/dialog/company.vue'
	import DialogBusiness from '../businessAccepted/dialogBusiness';
	export default {
		name: 'userCenter',
		data() {
			return {
				mesEdit: false,
				portraitEdit: false,
				passEdit: false,
				form: {
					headPicture: 'userHead1.png'
				},
				checkForm: {},
				addCompanys: false
			}
		},
		components: {
			message,
			portrait,
			password,
			company,
			DialogBusiness
		},
		methods: {
			addBusiness() {
				this.$root.eventHub.$emit('dialogVisibleBusiness', { visibleBusiness: true, businessIn: 1 });
			},
			addCompany(bol, data = {}) {
				this.addCompanys = bol;
			},
			closeCompany(bol) {
				if (bol) {
					this.fetchAggData();
				}
				this.addCompany(false);
			},
			fetchAggData() {
				this.$ajax.get('/vos/user/getAggData').then(res => {
					if (res.code == 200) {
						this.checkForm = res.data;
					}
				})
			},
			editMes(bol) {
				this.mesEdit = bol;
				this.fetchData();
			},
			editPortrait(bol) {
				this.portraitEdit = bol;
				this.fetchData();
			},
			editPass(bol) {
				this.passEdit = bol;
				this.fetchData();
			},
			fetchData() {
				this.$ajax.get('/vos/user/getDetail').then(res => {
					if (res.code == 200) {
						this.form = res.data;
					}
				});
			}
		},
		created() {
			this.fetchData();
			this.fetchAggData();
		}
	}
</script>

<style lang="scss" scoped>
	@import './userCenter.scss';
</style>