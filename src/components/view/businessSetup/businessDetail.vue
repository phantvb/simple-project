<template>
	<div id="businessDetail">
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
					<p class="fmini">企业名称： 杭州顺网科技股份有限公司 </p>
					<p class="fmini">证件编号： 营业执照【91340100MA2MQFKG1Q】 </p>
					<p class="fmini">企业性质： 私营 企业等级： 大客A 行业类型： 科研技术</p>
					<p class="fmini">注册地址： 龙岗开发区静安新城别墅区S6幢102 </p>
					<p class="fmini">办公地址： 龙岗开发区静安新城别墅区S6幢102 </p>
					<p class="fmini">企业电话： 055164328333 </p>
					<div>
						<div style="float:left;">
							<span class="fmini">企业资质证明文件：</span>
						</div>
						<ul>
							<li class="l2">
								<img class="examplew" src="../../../assets/example_1.png" alt="">
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
					<p class="fmini">法人姓名： 华勇 法人电话： 15678987654</p>
					<p class="fmini">法人证件： 身份证 350203198505143020</p>
					<p class="fmini">身份证住址： 杭州拱墅区仓基新村9幢7单元601室</p>
					<p class="fmini">身份证有效期： 2011.5.5-2031.5.5</p>
					<div>
						<!-- <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div> -->
						<ul class="basedata">
							<li>
								<img class="exampleh" src="../../../assets/example_2.png" alt="">
								<p class="fmini center">法人身份证（正面）</p>
							</li>
							<li>
								<img class="exampleh" src="../../../assets/example_3.png" alt="">
								<p class="fmini center">法人身份证（反面）</p>
							</li>
						</ul>
						<ul class="basedata">
							<li>
								<img class="exampleh" src="../../../assets/example_4.png" alt="">
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
				passEdit: false
			}
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