<template>
	<div id="ComboSet">
		<header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
				<el-breadcrumb-item>资费及增值套餐管理</el-breadcrumb-item>
			</el-breadcrumb>
		</header>
		<div style="position: relative;margin-top: 20px">
			<el-tabs v-model="active" type="border-card">
				<el-tab-pane label="资费套餐" name="1">
					<tariffPackage :permission="permission"></tariffPackage>
				</el-tab-pane>
				<el-tab-pane label="增值业务" name="2">
					<valueAdded :permission="permission"></valueAdded>
				</el-tab-pane>
				<el-tab-pane label="优惠方案" name="3">
					<discount :permission="permission"></discount>
				</el-tab-pane>
				<el-tab-pane label="时长包" name="4">
					<timePacket :permission="permission"></timePacket>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import tariffPackage from './ComboSetElement/tariffPackage';
	import valueAdded from './ComboSetElement/valueAdded';
	import discount from './ComboSetElement/discount';
	import timePacket from './ComboSetElement/timePacket';

	export default {
		name: 'ComboSet',
		components: {
			tariffPackage,
			valueAdded,
			discount,
			timePacket
		},
		data() {
			return {
                active: '1',
                
				permission: []
			}
		},
		created() {
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
                this.permission.push(item.id);
            });
		}
	}
</script>

<style lang="scss" scoped>
	@import "./ComboSet.scss";
</style>