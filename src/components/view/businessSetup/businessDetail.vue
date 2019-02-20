<template>
	<div id="businessDetail" class="managerFormTitle" v-loading="loading">
		<div id="base">
			<header class="left flg" @click="back">
				<span class="return flg">企业管理</span> / 详情
			</header>
			<section>
				<div class="title left">
					企业基本信息
				</div>
				<div class="block left">
					<p class="fmini">企业名称： {{detail.companyName}} </p>
					<p class="fmini">证件编号： {{detail.companyCardNo}} </p>
					<p class="fmini">企业性质： {{detail.companyCharacterStr}} 企业等级： {{detail.companyRank}} 行业类型： {{detail.industryType}}</p>
					<p class="fmini">注册地址： {{detail.registProvince}}{{detail.registCity}}{{detail.registArea}}{{detail.registAddress}} </p>
					<p class="fmini">办公地址： {{detail.officeProvince}}{{detail.officeCity}}{{detail.officeArea}}{{detail.officeAddress}} </p>
					<p class="fmini">企业电话： {{detail.phone}} </p>
					<div>
						<div style="float:left;">
							<span class="fmini">企业资质证明文件：</span>
						</div>
						<ul>
							<li class="l2">
								<img class="examplew" :src="'http://192.168.0.117:5480/vos/'+detail.companyProofPic" alt="">
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section>
				<div class="title left">
					法人基本信息
				</div>
				<div class="block left">
					<p class="fmini">法人姓名： {{detail.legalPerson}} 法人电话： {{detail.legalPhone}}</p>
					<p class="fmini">法人证件： {{detail.legalCardStr}} {{detail.cardNum}}</p>
					<p class="fmini" v-if="detail.legalCard=='id_card'">身份证住址： {{detail.idCardAddress}}</p>
					<p class="fmini" v-if="detail.legalCard=='id_card'">身份证有效期： {{detail.cardStartDate}}-{{detail.cardEndDate}}</p>
					<div>
						<!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
						<ul class="basedata">
							<li>
								<img class="exampleh" :src="'http://192.168.0.117:5480/vos/'+detail.legalCardFrontPic" alt="">
								<p class="fmini center">法人身份证（正面）</p>
							</li>
							<li>
								<img class="exampleh" :src="'http://192.168.0.117:5480/vos/'+detail.legalCardBackPic" alt="">
								<p class="fmini center">法人身份证（反面）</p>
							</li>
						</ul>
						<ul class="basedata">
							<li>
								<img class="exampleh" :src="'http://192.168.0.117:5480/vos/'+detail.legalCardHandPic" alt="">
								<p class="fmini center">法人手持身份证（正面）</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
		<div id="progress" v-if="$route.query.status">
			<header class="left">
				审核流程 > 企业审核/变更/注销
			</header>
			<div class="block underline">
				<div class="step">
					<el-steps direction="vertical">
						<el-step v-for="(item,index) in record" :key="item.operateTime" :title="item.title" :description="item.description+'\n'+item.message" :status='index==(record.length-1)?"finish":""'></el-step>
					</el-steps>
				</div>
				<button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);" v-if="$route.query.status=='Audit_Success'"></i> 审核通过</button>
			</div>
			<el-input class="block" v-if="($route.query.status=='Company_Auditing'||$route.query.status=='Canceling_Auditing'||$route.query.status=='Modify_Auditing')&&(baseData.roleName==$route.query.assigneeRole||baseData.roleName=='ROLE_admin')" type="textarea" :rows="6" placeholder="请输入审核意见" v-model="desc">
			</el-input>
			<div class="block">
				<div>
					<button class="fleft passgo" v-if="$route.query.status=='Wait_To_Audit'&&($route.query.creator==baseData.username||baseData.roleName=='ROLE_admin')" @click="submit">送审</button>
					<button class="fleft passgo" v-if="($route.query.status=='Company_Auditing'||$route.query.status=='Canceling_Auditing'||$route.query.status=='Modify_Auditing')&&(baseData.roleName==$route.query.assigneeRole||baseData.roleName=='ROLE_admin')" @click="passCompany">通过审核</button>
					<button class="fright passback" v-if="($route.query.status=='Company_Auditing'||$route.query.status=='Canceling_Auditing'||$route.query.status=='Modify_Auditing')&&(baseData.roleName==$route.query.assigneeRole||baseData.roleName=='ROLE_admin')" @click="backCompany">驳回</button>
					<button class="fright passback" style="width:100%" v-if="$route.query.status=='Audit_Success'" @click="back">返回</button>

				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './businessInform.scss';
</style>
<script>
	export default {
		name: 'businessDetail',
		data() {
			return {
				detail: {},
				desc: '',
				baseData: {},
				record: {},
				loading: false
			}
		},
		mounted() {
			this.baseData.username = sessionStorage.getItem("username");
			this.baseData.roleName = sessionStorage.getItem("roleName");
			this.loading = true;
			this.$ajax.post('/vos/company/getDetail', { company: { id: this.$route.query.Id } }).then(res => {
				if (res.code == 200) {
					this.loading = false;
					const companyCharacterOptions = [{
						value: 'state-owned',
						label: '国有'
					}, {
						value: 'cooperation',
						label: '合作'
					}, {
						value: 'joint_venture',
						label: '合资'
					}, {
						value: 'sole_proprietorship',
						label: '独资'
					}, {
						value: 'collective',
						label: '集体'
					}, {
						value: 'private',
						label: '私营'
					}, {
						value: 'individual_business',
						label: '个体工商户'
					}];
					const legalCardOptions = [{
						value: 'id_card',
						label: '身份证'
					}, {
						value: 'officer_card',
						label: '军官证'
					}, {
						value: 'passport',
						label: '护照'
					}];
					const statusOptions = [{
						value: 'Wait_To_Audit',
						label: '等待送审'
					}, {
						value: 'Company_Auditing',
						label: '企业审核中'
					}, {
						value: 'Business_Auditing',
						label: '业务受理审核'
					}, {
						value: 'Voice_Auditing',
						label: '语音审核'
					}, {
						value: 'DestNum_Auditing',
						label: '目的码审核'
					}, {
						value: 'Audit_Success',
						label: '审核通过'
					}, {
						value: 'Canceling_Auditing',
						label: '注销审核中'
					}, {
						value: 'Modify_Auditing',
						label: '变更审核中'
					}, {
						value: 'Terminate_Flow',
						label: '受理终止'
					}, {
						value: 'Cancelled',
						label: '已注销'
					}, {
						value: 'Modify_Rejected',
						label: '变更审核驳回'
					}, {
						value: 'Freezed',
						label: '注销冷冻'
					}, ];
					for (let item of companyCharacterOptions) {
						if (item.value == res.data.company1.companyCharacter) {
							res.data.company1.companyCharacterStr = item.label;
							//return;
						}
					}
					for (let item of legalCardOptions) {
						if (item.value == res.data.company1.legalCard) {
							res.data.company1.legalCardStr = item.label;
							//return;
						}
					}
					this.detail = res.data.company1;
					res.data.company1.map(item => {
						item.title = `${item.assginessRole=='ROLE_admin'?'管理员':'业务员'}(${item.operator})`;
						var m = '';
						for (let _item of statusOptions) {
							if (_item.value == item.currentStatus) {
								m = _item.label;
								//return;
							};
						};
						item.description = `${m} ${item.operateTime}`;
					})
					this.record = res.data.company1;
				}
			});
		},
		methods: {
			back() {
				this.$router.push({ path: "/Layout/businessInform" });
			},
			passCompany() {
				var obj = {};
				var url;
				if (this.$route.query.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditPass';
				} else if (this.$route.query.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditPass';
				} else if (this.$route.query.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditPass';
				};
				obj.companyFlow = {
					flowId: this.$route.query.flowId,
					creator: this.$route.query.creator,
					assigneeRole: this.$route.query.assigneeRole
				};
				obj.message = this.desc;
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$router.push({ path: '/BusinessInform/businessDetail', query: { flowId: this.$route.query.flowId, status: res.data, creator: this.$route.query.creator, assigneeRole: this.$route.query.assigneeRole } });
						this.$message.success('操作成功');
					}
				});
			},
			backCompany() {
				var obj = {};
				var url;
				if (this.$route.query.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditReject';
				} else if (this.$route.query.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditReject';
				} else if (this.$route.query.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditReject';
				};
				obj.companyFlow = {
					flowId: this.$route.query.flowId,
					creator: this.$route.query.creator,
					assigneeRole: this.$route.query.assigneeRole
				};
				obj.message = this.desc;
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.$router.push({ path: '/BusinessInform/businessDetail', query: { flowId: this.$route.query.flowId, status: res.data, creator: this.$route.query.creator, assigneeRole: this.$route.query.assigneeRole } });
						this.$message.success('操作成功');
					}
				});
			},
			submit() {
				var url = '/vos/company/sendToCompanyAudit';
				var data = {};
				data.company = this.detail;
				data.companyFlow = {
					flowId: this.$route.query.flowId
				};
				this.$ajax.post(url, data).then(res => {
					if (res.code == 200) {
						this.$message.success('操作成功');
					}
				});
			}
		}
	}
</script>