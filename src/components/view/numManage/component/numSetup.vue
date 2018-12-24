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
					<div class="block search" style="background-color: #fff;">
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
					<section class="left lineTop" id="addaction">
						<el-button type="primary" size="mini"><i class="el-icon-plus"></i> 新增业务动作</el-button>
						<el-button type="info" plain size="mini">删除</el-button>
					</section>
					<el-collapse v-model="activeName" accordion>
						<div id="moveList" ref="moveList">
							<numSetAction v-for="(item,index) in numSetActionType" :key="index" :type="item.value" :activeName="index" :order="item.order" @moveup="moveup" @movedown="movedown"></numSetAction>
						</div>
					</el-collapse>
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
	import numSetAction from './numSetAction.vue'
	export default {
		name: 'numSetup',
		props: ['show'],
		components: {
			numSetAction
		},
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				if (!newV) {
					this.clear(baseSet);
					this.clear(actionSet);
				}
			}
		},
		data() {
			return {
				baseSet: {
					person: ''
				},
				numSetActionType: [{
					value: 0,
					order: 0
				}, {
					value: 1,
					order: 1
				}],
				dialogVisible: true,
				type: '1',
				numSetup: '',
				active: '2',
				activeName: 1,
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
			},
			clear(obj) {
				var toStr = Object.prototype.toString;
				for (let key in obj) {
					if (typeof obj[key] == 'object' && obj[key] !== null) {
						if (toStr.call(obj[key]) == '[object Array]') {
							obj[key] = [];
						} else {
							this.clear(obj[key]);
						}
					} else {
						obj[key] = '';
					}
				}
				return obj;
			},
			moveup(orders) {
				if (orders > 0) {
					this.$refs['moveList'].insertBefore(this.$refs['moveList'].childNodes[orders], document.getElementById('moveList').childNodes[orders - 1]);
					var n = this.numSetActionType[orders].order;
					var o = this.numSetActionType[orders - 1].order;
					this.numSetActionType[orders].order = o;
					this.numSetActionType[orders - 1].order = n;
				}
			},
			movedown(orders) {
				if (orders < (this.numSetActionType.length - 2)) {
					this.$refs['moveList'].insertBefore(this.$refs['moveList'].childNodes[orders], document.getElementById('moveList').childNodes[orders + 1]);
				} else if (orders == (this.numSetActionType.length - 2)) {
					this.$refs['moveList'].appendChild(this.$refs['moveList'].childNodes[orders]);
				}
				var n = this.numSetActionType[orders].order;
				var o = this.numSetActionType[orders + 1].order;
				this.numSetActionType[orders].order = o;
				this.numSetActionType[orders + 1].order = n;
			}
		}
	}
</script>