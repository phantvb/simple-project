<template>
	<div id="ticketDetail" class="numDialog">
		<el-dialog title="话单详情" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">400号码: 4008818611</p>
						<p class="fmini">主叫号码: 15622771295</p>
					</li>
					<li class="l2">
						<p class="fmini">引示号: 057186694234</p>
						<p class="fmini">被叫号码: 2018-10</p>
					</li>
				</ul>
			</div>
			<div class="greyline"></div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">主叫开始时间: 2018-10-19 16:28:57</p>
						<p class="fmini">主叫应答时间: 2018-10-19 16:28:57</p>
						<p class="fmini">主叫呼叫时长: 52 </p>
						<p class="fmini">被叫开始时间: 2018-10-19 16:28:57</p>
						<p class="fmini">被叫应答时间: 2018-10-19 16:29:01</p>
						<p class="fmini">被叫呼叫时长: 48 </p>
						<p class="fmini">是否录音: 是 </p>
					</li>
					<li class="l2">
						<p class="fmini">主叫振铃时间: 2018-10-19 16:28:57 </p>
						<p class="fmini">主叫挂机时间: 2018-10-19 16:29:49</p>
						<p class="fmini"> </p>
						<p class="fmini">被叫振铃时间: 2018-10-19 16:29:01</p>
						<p class="fmini">被叫挂机时间: 2018-10-19 16:29:49 </p>
						<p class="fmini">挂机状态: 主叫正常挂机</p>
						<p class="fmini">挂机方: 主叫 </p>
					</li>
				</ul>
			</div>
			<div class="block">
				录音文件地址:168.16.12_15622771295_057128827571.wav &#12288;<el-button type="text">试听</el-button>
			</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">创建时间: 2018-10-19 16:31:24</p>
					</li>
				</ul>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="mini">确定</el-button>
				<el-button type="primary" size="mini" plain>取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	export default {
		name: "ticketDetail",
		props: ["show"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: false
			};
		},
		methods: {
			close() {
				this.$emit("close");
			}
		}
	};
</script>