<template>
	<div id="businessDetail" class="managerFormTitle" v-loading="loading">
		<div id="base">
			<header class="left flg">
				<span class="return flg" @click="back">企业管理</span> / 详情
			</header>
			<section>
				<div class="title left">
					企业基本信息
				</div>
				<div class="block left">
					<p class="fmini">企业名称： {{detail.companyName}} </p>
					<p class="fmini">证件编号： {{detail.companyCardNo}} </p>
					<p class="fmini">企业性质： {{detail.companyCharacter}} &#12288;企业等级： {{detail.companyRank}} &#12288;行业类型： {{detail.industryType}}</p>
					<p class="fmini">注册地址： {{detail.registProvince}}{{detail.registCity}}{{detail.registArea}}{{detail.registAddress}} </p>
					<p class="fmini">办公地址： {{detail.officeProvince}}{{detail.officeCity}}{{detail.officeArea}}{{detail.officeAddress}} </p>
					<p class="fmini">企业电话： {{detail.phone}} </p>
					<div>
						<div style="float:left;">
							<span class="fmini">企业资质证明文件：</span>
						</div>
						<ul>
							<li class="l2">
								<img class="examplew" :src="$global.serverSrc+detail.companyProofPic" alt="">
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
					<p class="fmini">法人姓名： {{detail.legalPerson}} &#12288;法人电话： {{detail.legalPhone}}</p>
					<p class="fmini">法人证件： {{detail.legalCardStr}} {{detail.cardNum}}</p>
					<p class="fmini" v-if="detail.legalCard=='id_card'">身份证住址： {{detail.idCardAddress}}</p>
					<p class="fmini" v-if="detail.legalCard=='id_card'">身份证有效期： {{detail.cardStartDate}}-{{detail.cardEndDate}}</p>
					<div>
						<!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
						<ul class="basedata">
							<li>
								<img class="exampleh" :src="$global.serverSrc+detail.legalCardFrontPic" alt="">
								<p class="fmini center">法人身份证（正面）</p>
							</li>
							<li>
								<img class="exampleh" :src="$global.serverSrc+detail.legalCardBackPic" alt="">
								<p class="fmini center">法人身份证（反面）</p>
							</li>
						</ul>
						<ul class="basedata">
							<li>
								<img class="exampleh" :src="$global.serverSrc+detail.legalCardHandPic" alt="">
								<p class="fmini center">法人手持身份证（正面）</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
		<div id="progress" v-if="$route.query.flowId">
			<header class="left">
				审核流程 > 企业审核/变更/注销
			</header>
			<div class="block underline">
				<div class="step">
					<el-steps direction="vertical">
						<el-step v-for="(item,index) in record" :key="item.operateTime" :title="item.title" :description="item.description+'\n'+item.message" :status='index==(record.length-1)?"finish":""'></el-step>
					</el-steps>
				</div>
				<!-- <button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);" v-if="companyFlowData.status=='Audit_Success'"></i> 审核通过</button> -->
				<p class="grey">{{'下一步由'+nextRecord.assginessRoleStr+'('+nextRecord.assginee+') 操作'}}</p>
			</div>
			<el-input class="block" v-if="(companyFlowData.status=='Company_Auditing'||companyFlowData.status=='Canceling_Auditing'||companyFlowData.status=='Modify_Auditing')&&(baseData.roleName==companyFlowData.assigneeRole||baseData.roleName=='ROLE_admin')" type="textarea" :rows="6" placeholder="请输入审核意见" v-model="desc">
			</el-input>
			<div class="block">
				<div>
					<button class="fleft passgo" v-if="(companyFlowData.status=='Company_Auditing'||companyFlowData.status=='Canceling_Auditing'||companyFlowData.status=='Modify_Auditing')&&(baseData.roleName==companyFlowData.assigneeRole||baseData.roleName=='ROLE_admin')" @click="passCompany">通过审核</button>
					<button class="fright passback" v-if="(companyFlowData.status=='Company_Auditing'||companyFlowData.status=='Canceling_Auditing'||companyFlowData.status=='Modify_Auditing')&&(baseData.roleName==companyFlowData.assigneeRole||baseData.roleName=='ROLE_admin')" @click="backCompany">驳回</button>
					<button class="fright passback" style="width:100%" v-if="companyFlowData.status=='Audit_Success'" @click="back">返回</button>
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
				loading: false,
				companyFlowData: {},
				roledata: [],
				nextRecord: {
					assginessRoleStr: '',
					assginee: ''
				}
			}
		},
		async mounted() {
			await this.getRole();
			this.fetchData();
		},
		methods: {
			fetchData() {
				let _this = this;
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
				}];
				this.baseData.username = sessionStorage.getItem("username");
				this.baseData.roleName = sessionStorage.getItem("roleName");
				this.loading = true;
				if (this.$route.query.flowId) {
					this.$ajax.get('/vos/company/getCacheData?flowId=' + this.$route.query.flowId).then(res => {
						if (res.code == 200) {
							this.loading = false;
							for (let item of legalCardOptions) {
								if (item.value == res.data.company.legalCard) {
									res.data.company.legalCardStr = item.label;
								}
							}
							this.detail = res.data.company;
							res.data.flowRecord.map((item, index) => {
								if (index == (res.data.flowRecord.length - 1)) {
									for (let val of _this.roledata) {
										if (val.name == item.assginessRole) {
											_this.nextRecord.assginessRoleStr = val.nameZh;
										};
									};
									_this.nextRecord.assginee = item.assginee;
								};
								for (let val of _this.roledata) {
									if (val.name == item.operatorRole) {
										item.operatorRoleStr = val.nameZh;
									}
								};
								item.title = `${item.operatorRoleStr?item.operatorRoleStr:'业务员'}(${item.operator})`;
								item.description = `${item.opeation} ${item.operateTime}`;
							})
							this.record = res.data.flowRecord;
							this.companyFlowData = res.data.companyFlow;
						}
					});
				} else {
					this.$ajax.post('/vos/company/getDetail', { company: { id: this.$route.query.Id } }).then(res => {
						if (res.code == 200) {
							this.loading = false;
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
						}
					});
				}
			},
			getRole() {
				return this.$ajax.get("/vos/role/getAllRole").then(res => {
					this.roledata = res.data.data;
				});
			},
			back() {
				//this.$router.push({ path: "/Layout/businessInform" });
				this.$router.go(-1);
			},
			passCompany() {
				var obj = {};
				var url;
				this.loading = true;
				if (this.companyFlowData.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditPass';
				} else if (this.companyFlowData.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditPass';
				} else if (this.companyFlowData.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditPass';
				};
				obj.companyFlow = {
					flowId: this.companyFlowData.flowId,
					creator: this.companyFlowData.creator,
					assigneeRole: this.companyFlowData.assigneeRole
				};
				obj.message = this.desc;
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.fetchData();
						this.$message.success('操作成功');
					}
				});
			},
			backCompany() {
				this.loading = true;
				var obj = {};
				var url;
				if (this.companyFlowData.status == 'Company_Auditing') {
					url = '/vos/company/companyAuditReject';
				} else if (this.companyFlowData.status == 'Modify_Auditing') {
					url = '/vos/company/modifyAuditReject';
				} else if (this.companyFlowData.status == 'Canceling_Auditing') {
					url = '/vos/company/cancelAuditReject';
				};
				obj.companyFlow = {
					flowId: this.companyFlowData.flowId,
					creator: this.companyFlowData.creator,
					assigneeRole: this.companyFlowData.assigneeRole
				};
				obj.message = this.desc;
				this.$ajax.post(url, obj).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.fetchData();
						this.$message.success('操作成功');
					}
				});
			},
			submit() {
				this.loading = true;
				var url = '/vos/company/sendToCompanyAudit';
				var data = {};
				data.company = this.detail;
				data.companyFlow = {
					flowId: this.companyFlowData.flowId
				};
				this.$ajax.post(url, data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.$message.success('操作成功');
					}
				});
			}
		}
	}
</script>