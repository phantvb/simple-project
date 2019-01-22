<template>
	<div :id="active==2?'company_dialog':''">
		<el-dialog title="新增企业/编辑/变更企业" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<el-steps :active="active" align-center>
				<el-step title="填写企业基本信息"></el-step>
				<el-step title="上传企业资料"></el-step>
				<el-step title="送审"></el-step>
			</el-steps>
			<baseMes v-show="active==1" @next="next" :oldData="oldData" @isComplete="isCom"></baseMes>
			<baseData v-show="active==2" :isComplete="isOneComplete" @next="next" :oneData="oneData" :idData="flowIdData" @complete='complete' :editType="editType"></baseData>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import './company.scss';
</style>
<script>
	import baseMes from './step_1.vue';
	import baseData from './step_2.vue';
	export default {
		name: 'company',
		props: ['show', 'flowIdData', 'editCompanyType'],
		components: {
			baseMes,
			baseData
		},
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				this.active = 1;
			},
			'flowIdData.flowId': function (n, o) {
				if (n) {
					this.$ajax.get('/vos/company/getCacheData?flowId=' + this.flowIdData.flowId).then(res => {
						if (res.code == 200) {
							this.oldData = res.data.company;
						}
					});
				}
			}
		},
		computed: {
			editType() {
				return this.editCompanyType;
			}

		},
		data() {
			return {
				active: 1,
				dialogVisible: false,
				oneData: {},
				oldData: {},
				isOneComplete: false
			}
		},
		methods: {
			complete(bol) {
				this.dialogVisible = false;
				this.close(bol);
			},
			close(bol) {
				this.$emit('close', bol);
			},
			next(step, data) {
				if (step == 2) {
					this.oneData = data;
				}
				this.active = step;
			},
			isCom(bol) {
				this.isOneComplete = bol;
			}
		}
	}
</script>