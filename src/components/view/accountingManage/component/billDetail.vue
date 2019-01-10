<template>
	<div id="billDetail" class="lightblueTable">
		<el-dialog title="号码月账单详情" class="left" :visible.sync="dialogVisible" @close="close">
			<div class="title">基本信息</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">400号码: {{data.numberMonthBill.number400}}</p>
						<p class="fmini">企业名称: {{data.numberMonthBill.companyName}}</p>
					</li>
					<li class="l2">
						<p class="fmini">引示号: {{data.numberMonthBill.guideNumber}}</p>
						<p class="fmini">账单月份: {{data.numberMonthBill.year+'-'+data.numberMonthBill.month}}</p>
					</li>
				</ul>
			</div>
			<div class="title">套餐信息</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">基本套餐: {{data.packageInfo.packageName}}</p>
						<p class="fmini">套餐金额: {{data.packageInfo.packageFee}} 元</p>
						<p class="fmini">套餐内时长（剩余/总量）：{{data.packageInfo.remainMinutes}}/{{data.packageInfo.totalMinutes}} 分钟</p>
					</li>
					<li class="l2">
						<p class="fmini">套餐期限: {{data.packageInfo.duration}}</p>
						<p class="fmini">套餐内计费：{{data.packageInfo.feeUsedThisMonth}} 元</p>
						<p class="fmini">套餐剩余金额: {{data.packageInfo.remainFeeThisMonth}} 元</p>
					</li>
				</ul>
			</div>
			<div class="title">时长包</div>
			<div class="block">
				<p class="fmini">充值记录:</p>
				<el-table :data="data.timePacketList" border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="name" label="时长包" min-width="150"></el-table-column>
					<el-table-column prop="num" label="数量" min-width="80"></el-table-column>
					<el-table-column prop="money" label="金额" min-width="120"></el-table-column>
				</el-table>
				<ul>
					<li class="l2">
						<p class="fmini">时长包剩余时长: {{data.numberMonthBill.timePacketRemainMinutes}} 分钟</p>
					</li>
					<li class="l2">
						<p class="fmini">时长包计费: {{data.numberMonthBill.excessFee}} 元</p>
					</li>
				</ul>
			</div>
			<div class="title">超额计费</div>
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">超额时长：{{data.numberMonthBill.excessMinute}} 分钟</p>
					</li>
					<li class="l2">
						<p class="fmini">超额计费：{{data.numberMonthBill.excessFee}} 元</p>
					</li>
				</ul>
			</div>
			<div class="title">增值业务</div>
			<div class="block">
				<el-table :data="data.ValueAddedList" border style="width: 100%" :header-row-class-name="'lightblue'">
					<el-table-column prop="valueAddedName" label="名称" min-width="150"></el-table-column>
					<el-table-column prop="num" label="数量" min-width="80"></el-table-column>
					<el-table-column prop="totalFee" label="金额" min-width="120"></el-table-column>
				</el-table>
			</div>
			<div class="total">
				<p class="left">
					费用合计：
					<span class="red">{{data.numberMonthBill.totalFee}}</span> 元
				</p>
			</div>
			<footer class="right">
				<el-button type="primary" size="mini" @click="dialogVisible=false">确定</el-button>
				<el-button type="primary" size="mini" plain @click="dialogVisible=false">取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	export default {
		name: "billDetail",
		props: ["show", "data"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				dialogVisible: false,
			};
		},
		methods: {
			close() {
				this.$emit("close");
			}
		}
	};
</script>