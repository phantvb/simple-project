<template>
	<div id="ticketDetail" class="numDialog">
		<el-dialog title="话单详情" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<Aplayer name="Aplayer" model="auto" :music_url="$global.serverSrc+data.recordAddress" v-if="player"></Aplayer>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">400号码: {{data.number400}}</p>
						<p class="fmini">主叫号码: {{data.callingNumber}}</p>
					</li>
					<li class="l2">
						<p class="fmini">引示号: {{data.calledNumber}}</p>
						<p class="fmini">被叫号码: {{data.guideNumber}}</p>
					</li>
				</ul>
			</div>
			<div class="greyline"></div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">主叫开始时间: {{data.callingStartTime}}</p>
						<p class="fmini">主叫应答时间: {{data.callingResponseTime}}</p>
						<p class="fmini">主叫呼叫时长: {{data.callingCallDuration}} </p>
						<p class="fmini">被叫开始时间: {{data.calledStartTime}}</p>
						<p class="fmini">被叫应答时间: {{data.calledResponseTime}}</p>
						<p class="fmini">被叫呼叫时长: {{data.calledRingTime}} </p>
						<p class="fmini">是否录音: {{data.record}} </p>
					</li>
					<li class="l2">
						<p class="fmini">主叫振铃时间: {{data.callingRingTime}} </p>
						<p class="fmini">主叫挂机时间: {{data.callingHangTime}}</p>
						<p class="fmini"> </p>
						<p class="fmini">被叫振铃时间: {{data.calledRingTime}}</p>
						<p class="fmini">被叫挂机时间: {{data.calledHangTime}} </p>
						<p class="fmini">挂机状态: {{data.hangStatus}}</p>
						<p class="fmini">挂机方: {{data.hangSide}} </p>
					</li>
				</ul>
			</div>
			<div class="block">
				录音文件地址:{{data.recordAddress}} &#12288;<el-button type="text" @click="listen">试听</el-button>
			</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">创建时间: {{data.createTime}}</p>
					</li>
				</ul>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="small" @click="close">确定</el-button>
				<el-button type="primary" size="small" plain @click="close">取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	import Aplayer from '@/components/view/component/Aplayer/a_player.vue'
	export default {
		name: "ticketDetail",
		components: {
			Aplayer
		},
		props: ["show", "data"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: false,
				player: false
			};
		},
		methods: {
			close() {
				this.$emit("close");
			},
			listen(src) {
				this.player = !this.player;
			},
		}
	};
</script>