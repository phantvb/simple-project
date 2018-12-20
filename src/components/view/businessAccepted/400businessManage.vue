<template>
	<div id="fourBusinessManage">
		<el-tabs type="border-card">
			<el-tab-pane label="全部">
				<entire></entire>
			</el-tab-pane>
			<el-tab-pane label="业务受理">
				<businessHandling></businessHandling>
			</el-tab-pane>
			<el-tab-pane label="目的码审核">
				<objCodeAudit></objCodeAudit>
			</el-tab-pane>
			<el-tab-pane label="注销审核">
				<logoutAudit></logoutAudit>
			</el-tab-pane>
			<el-tab-pane label="变更审核">
				<changeAudit></changeAudit>
			</el-tab-pane>
			<el-tab-pane label="语音文件管理">
				<voiceFile></voiceFile>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import Entire from './entire';
	import BusinessHandling from './businessHandling';
	import ObjCodeAudit from './objCodeAudit';
	import LogoutAudit from './logoutAudit';
	import ChangeAudit from './changeAudit';
	import VoiceFile from './voiceFile';
	export default {
		name: 'fourBusinessManage',
		data() {
			return {};
		},
		components: {
			Entire,
			BusinessHandling,
			ObjCodeAudit,
			LogoutAudit,
			ChangeAudit,
			VoiceFile,
		},
		methods: {},
		computed: {}
	}
</script>
<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>