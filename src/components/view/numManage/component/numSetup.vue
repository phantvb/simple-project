<template>
	<div id="numSetup" class="numDialog managerFormTitle">
		<el-dialog title="编辑号码设置" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">
							400号码: 4008818611
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							企业名称: 杭州顺网科技股份有限公司
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							引示号码： 4008272566
						</p>
					</li>
				</ul>
			</div>
			<el-tabs v-model="active">
				<el-tab-pane label="基本配置" name="1">
					<div class="block search">
						<div class="form_item">
							<div class="form_title right">振铃策略：</div>
							<div class="form_con">
								<el-select v-model="baseSet.person" placeholder="请选择" size="mini">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">冷却时长：</div>
							<div class="form_con">
								<el-input v-model="baseSet.person" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">坐席超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.person" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">未接置忙：</div>
							<div class="form_con">
								<el-select v-model="baseSet.person" placeholder="请选择" size="mini">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">等待超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.person" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="业务动作" name="2">

				</el-tab-pane>
			</el-tabs>
			<footer class="right">
				<el-button type="primary" size="mini" plain>取消</el-button>
				<el-button type="primary" size="mini">确定</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>

<script>
	export default {
		name: 'numSetup',
		props: ['show'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			}
		},
		data() {
			return {
				baseSet: {
					person: ''
				},
				dialogVisible: true,
				type: '1',
				numSetup: '',
				active: '1',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '选项2',
					label: '等待送审'
				}, {
					value: '选项3',
					label: '待审核'
				}, {
					value: '选项4',
					label: '审核通过'
				}, {
					value: '选项5',
					label: '被驳回'
				}],
			}
		},
		methods: {
			close() {
				this.$emit('close');
			}
		}
	}
</script>