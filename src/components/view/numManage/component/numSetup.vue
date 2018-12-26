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
							<el-collapse-item :name="index" v-for="(item,index) in numSetActionType" :key="index">
								<template slot="title">
									<el-checkbox v-model="item.businessAction" :label="item.temName" :value="type"></el-checkbox>
									<div style="text-align: right;width: 100%;">
										<el-button size="mini" type="text" @click.stop="moveup(item.order)">上移</el-button>
										<el-button size="mini" type="text" @click.stop="movedown(item.order)">下移</el-button>
										&#12288;
									</div>


								</template>
								<numSetAction :type="item.value" :order="item.order" :data="item" @typeChange="typeChange" :isFirst="true"></numSetAction>
							</el-collapse-item>
						</div>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>
			<footer class="right">
				<el-button type="primary" size="mini" plain>取消</el-button>
				<el-button type="primary" size="mini" @click="test">确定</el-button>
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
					businessAction: false,
					temName: '转接',
					order: 0,
					actionSet: {
						ruleType: 0,
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: [''],
						codeWork: [{
							code: ''
						}],
						codeUnWork: [{
							code: ''
						}]
					},
					hookSet: {
						voiceType: 0,
						ruleType: 0,
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: ['']
					},
					ivrSet: {
						voiceType: 0,
						ruleType: 0,
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: ['']
					},
					label: '一级 1',
					children: []
				}],
				dialogVisible: false,
				type: '1',
				numSetup: '',
				active: '2',
				activeName: 2,
				options: [{ value: 0, label: '转接' }, { value: 1, label: '放音挂机' }, { value: 2, label: 'IVR' }],
			}
		},
		methods: {
			test() {
				console.log(this.numSetActionType, this.options);
			},
			typeChange(type, order) {
				this.options.map(item => {
					if (item.value == type) {
						this.numSetActionType[order].value = type;
						this.numSetActionType[order].temName = item.label;
					}
				});
			},
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
					var n = orders;
					var o = orders - 1;
					this.numSetActionType.map(item => {
						if (item.order == n) {
							item.order = o;
						} else if (item.order == o) {
							item.order = n;
						}
					});
				}
			},
			movedown(orders) {
				if (orders < (this.numSetActionType.length - 2)) {
					this.$refs['moveList'].insertBefore(this.$refs['moveList'].childNodes[orders], document.getElementById('moveList').childNodes[orders + 2]);
				} else if (orders == (this.numSetActionType.length - 2)) {
					this.$refs['moveList'].appendChild(this.$refs['moveList'].childNodes[orders]);
				} else {
					return
				}
				var n = orders;
				var o = orders + 1;
				this.numSetActionType.map(item => {
					if (item.order == n) {
						item.order = o;
					} else if (item.order == o) {
						item.order = n;
					}
				});
			}
		}
	}
</script>