<template>
	<div id="businessDetail" class="managerFormTitle">
		<div id="base">
			<header class="left">
				企业管理 > 详情
			</header>
			<section>
				<div class="title left">
					企业基本信息
					<p class="edit">
						<i class="el-icon-edit-outline"></i>
						<el-button type="text" @click="editMes(true)">编辑</el-button>
					</p>
				</div>
				<div class="block left">
					<p class="fmini">企业名称： {{detail.companyName}} </p>
					<p class="fmini">证件编号： {{detail.companyCardNo}} </p>
					<p class="fmini">企业性质： {{detail.companyCharacter}} 企业等级： {{detail.companyRank}} 行业类型： {{detail.industryType}}</p>
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
					<p class="fmini">法人证件： {{detail.legalCard}} {{detail.cardNum}}</p>
					<p class="fmini">身份证住址： {{detail.idCardAddress}}</p>
					<p class="fmini">身份证有效期： {{detail.cardStartDate}}-{{detail.cardEndDate}}</p>
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
		<div id="progress">
			<header class="left">
				审核流程 > 企业审核/变更/注销
			</header>
			<div class="block underline">
				<div class="step">
					<el-steps direction="vertical" :active="1">
						<el-step title="业务员(姚明)" description="递交 12月08日 16:59"></el-step>
						<el-step title="管理员" description="审批 12月08日 16:59"></el-step>
					</el-steps>
				</div>
				<button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
			</div>
			<div class="block">
				<button class="pass passback">撤回</button>
				<div>
					<button class="fleft passgo">送审</button>
					<button class="fright passback">删除</button>
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
				mesEdit: false,
				portraitEdit: false,
				passEdit: false,
				detail: {}
			}
		},
		mounted() {
			this.$ajax.get('/vos/company/getCacheData?flowId=' + this.$route.query.flowId).then(res => {
				if (res.code == 200) {
					this.detail = res.data.company;
				}
			})
		},
		methods: {
			editMes(bol) {
				this.mesEdit = bol;
			},
			editPortrait(bol) {
				this.portraitEdit = bol;
			},
			editPass(bol) {
				this.passEdit = bol;
			}
		}
	}
</script>