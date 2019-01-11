<template>
	<div :id="active==2?'company_dialog':''">
		<el-dialog title="新增企业/编辑/变更企业" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<el-steps :active="active" align-center>
				<el-step title="填写企业基本信息"></el-step>
				<el-step title="上传企业资料"></el-step>
				<el-step title="送审"></el-step>
			</el-steps>
			<baseMes v-show="active==1" @next="next" :oldData="oldData"></baseMes>
			<baseData v-show="active==2" @next="next" :oneData="oneData" :id="flowId" @complete='complete'></baseData>
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
		props: ['show', 'flowId'],
		components: {
			baseMes,
			baseData
		},
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				this.active = 1;
			},
			flowId(n, o) {
				if (n) {
					this.$ajax.get('/vos/company/getCacheData?flowId=' + this.flowId).then(res => {
						if (res.code == 200) {
							this.oldData = res.data.company;
						}
					})
				}
			}
		},
		data() {
			return {
				active: 1,
				dialogVisible: false,
				oneData: {},
				oldData: {}
			}
		},
		methods: {
			complete() {
				this.dialogVisible = false;
				this.close();
			},
			close() {
				this.$emit('close');
			},
			next(step, data) {
				if (step == 2) {
					this.oneData = data;
				}
				this.active = step;
			}
		}
	}
</script>