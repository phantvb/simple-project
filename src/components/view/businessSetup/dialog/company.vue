<template>
	<div :id="active==2?'company_dialog':''">
		<el-dialog title="新增企业/编辑/变更企业" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<el-steps :active="active" align-center>
				<el-step title="填写企业基本信息"></el-step>
				<el-step title="上传企业资料"></el-step>
				<el-step title="送审"></el-step>
			</el-steps>
			<baseMes v-if="active==1" @next="next"></baseMes>
			<baseData v-if="active==2" @next="next"></baseData>
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
		props: ['show'],
		components: {
			baseMes,
			baseData
		},
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				active: 1,
				dialogVisible: false,
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			next(step) {
				console.log(step);
				this.active = step;
			}
		}
	}
</script>