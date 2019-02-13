<template>
	<div id="numSetup" class="numDialog managerFormTitle">
		<el-dialog title="编辑号码设置" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">
							400号码: {{number400Data.number400}}
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							企业名称: {{number400Data.companyName}}
						</p>
					</li>
					<li class="l2">
						<p class="fmini">
							引示号码：{{number400Data.guideNumber}}
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
								<el-select v-model="baseSet.ringStrategy" placeholder="请选择" size="mini">
									<el-option v-for="item in ringStrategyOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">冷却时长：</div>
							<div class="form_con">
								<el-input v-model="baseSet.coolSeconds" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">坐席超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.sitTimeOut" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">未接置忙：</div>
							<div class="form_con">
								<el-select v-model="baseSet.busySetting" placeholder="请选择" size="mini">
									<el-option v-for="item in busySettingOptions" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">等待超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.waitTimeOut" placeholder="请输入内容" size="mini">
								</el-input> 秒
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="业务动作" name="2">
					<section class="left lineTop" id="addaction">
						<el-button type="primary" size="mini" @click="addNumSetAction"><i class="el-icon-plus"></i> 新增业务动作</el-button>
						<el-button type="info" plain size="mini">删除</el-button>
					</section>
					<el-collapse v-model="activeName" accordion>
						<div id="moveList" ref="moveList">
							<el-collapse-item :name="index" v-for="(item,index) in numSetActionData" :key="index">
								<template slot="title">
									<el-checkbox v-model="businessAction" :label="item.temName"></el-checkbox>
									<!-- <div style="text-align: right;width: 100%;">
                                        <el-button size="mini" type="text" @click.stop="moveup(item.order,$event,index)">上移</el-button>
                                        <el-button size="mini" type="text" @click.stop="movedown(item.order)">下移</el-button>
                                        &#12288;
                                    </div> -->
								</template>
								<numSetAction :allType="allType" :number400Data="number400Data" :order="item.order" :allData="item" :index="index" @typeChange="typeChange" :isFirst="true"></numSetAction>
							</el-collapse-item>
						</div>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>
			<footer class="right">
				<el-button type="primary" size="mini" plain @click="dialogVisible=false">取消</el-button>
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
		props: ['show', 'number400Data', 'id'],
		components: {
			numSetAction
		},
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
				if (newV) {
					this.fetchDate();
				}
			},
			active(newV, oldV) {
				if (oldV == 1) {
					this.upbaseSet();
				}
			},
			numSetActionData(newV, oldV) {
				this.allTypeChange(newV);
			}
		},
		mounted() {
			this.allTypeChange(this.numSetActionData);
		},
		data() {
			return {
				baseSet: {
					id: "",
					ringStrategy: "order",
					coolSeconds: "",
					sitTimeOut: "",
					busySetting: "no",
					waitTimeOut: "30",
				},
				businessAction: [],
				numSetActionData: [],
				allType: [],
				dialogVisible: false,
				type: '1',
				numSetup: '',
				active: '1',
				activeName: 2,
				options: [{
					value: 'transfer',
					label: '转接'
				}, {
					value: 'playback',
					label: '放音挂机'
				}, {
					value: 'IVR',
					label: 'IVR'
				}],
				ringStrategyOptions: [{
					value: 'order',
					label: '顺序振铃'
				}, {
					value: 'memory',
					label: '记忆轮询'
				}],
				busySettingOptions: [{
					value: 'yes',
					label: '是'
				}, {
					value: 'no',
					label: '否'
				}],
			}
		},
		methods: {
			fetchDate() {
				this.$ajax.get('/vos/num400config/getBasicDetail/' + this.number400Data.number400).then(res => {
					if (res.code == 200) {
						Object.assign(this.baseSet, res.data);
					}
				});
				this.$ajax.get('/vos/num400config/getTransferDetail/' + this.number400Data.number400).then(res => {
					if (res.code == 200) {
						var obj = {
							id: "",
							businessType: 'transfer',
							temName: '转接',
							order: 0,
							actionName: '一级',
							actionSet: {
								ruleType: 'ignore',
								ruleConfig: {
									time: [],
									date: ''
								},
								workTime: [''],
								codeWork: [],
								codeUnWork: []
							},
							hookSet: {
								voiceType: 0,
								ruleType: 'ignore',
								ruleConfig: {
									time: [],
									date: ''
								},
								workTime: ['']
							},
							ivrSet: {
								voiceType: 0,
								ruleType: 'ignore',
								ruleConfig: {
									time: [],
									date: ''
								},
								workTime: ['']
							},
							label: '一级 1',
							children: []
						};
						res.data.map(item => {
							Object.assign(item, obj);
						});
						this.numSetActionData = res.data;
					}
				});
			},
			typeChange(type, index, temName) {
				this.numSetActionData[index].businessType = type;
				this.numSetActionData[index].temName = temName;
				this.allTypeChange(this.numSetActionData);
			},
			allTypeChange(newv) {
				this.allType = [];
				newv.map(item => {
					this.allType.push(item.businessType)
				});
			},
			close() {
				this.$emit('close');
			},
			moveup(orders, e, index) {
				if (orders > 0) {
					this.$refs['moveList'].insertBefore(this.$refs['moveList'].childNodes[orders], document.getElementById('moveList').childNodes[orders - 1]);
					var n = orders;
					var o = orders - 1;
					this.numSetActionData.map(item => {
						if (item.order == n) {
							item.order = o;
						} else if (item.order == o) {
							item.order = n;
						}
					});
				}
			},
			movedown(orders) {
				if (orders < (this.numSetActionData.length - 2)) {
					this.$refs['moveList'].insertBefore(this.$refs['moveList'].childNodes[orders], document.getElementById('moveList').childNodes[orders + 2]);
				} else if (orders == (this.numSetActionData.length - 2)) {
					this.$refs['moveList'].appendChild(this.$refs['moveList'].childNodes[orders]);
				} else {
					return
				}
				var n = orders;
				var o = orders + 1;
				this.numSetActionData.map(item => {
					if (item.order == n) {
						item.order = o;
					} else if (item.order == o) {
						item.order = n;
					}
				});
			},
			upbaseSet() {
				var data = {};
				data = Object.assign(this.number400Data, this.baseSet);
				this.$ajax.post('/vos/num400config/saveBasic', {
					num400BasicConfig: data
				});
			},
			addNumSetAction() {
				var numSetAction = '';
				for (let i = 0; i < this.options.length; i++) {
					var isrequire = true;
					this.numSetActionData.map(item => {
						if (item.businessType == this.options[i].value) {
							isrequire = false;
						}
					});
					if (isrequire) {
						numSetAction = {
							type: this.options[i].value,
							temName: this.options[i].label,
							order: this.numSetActionData.length,
							actionName: 'lala'
						};
						break;
					}
				}
				numSetAction ? this.numSetActionData.push({
					id: "",
					businessType: numSetAction.type,
					temName: numSetAction.temName,
					order: numSetAction.order,
					actionName: numSetAction.actionName,
					actionSet: {
						ruleType: 'ignore',
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: [''],
						codeWork: [],
						codeUnWork: []
					},
					hookSet: {
						voiceType: 0,
						ruleType: 'ignore',
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: ['']
					},
					ivrSet: {
						voiceType: 0,
						ruleType: 'ignore',
						ruleConfig: {
							time: [],
							date: ''
						},
						workTime: ['']
					},
					label: '一级 1',
					children: []
				}) : '';
			},
		}
	}
</script>