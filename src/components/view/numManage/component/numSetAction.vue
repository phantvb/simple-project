<template>
	<div class="numDialog managerFormTitle lightblueTable" id="numSetAction">
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">动作名称：</div>
			<div class="form_con">
				<el-input v-model="data.label" size="mini"></el-input>
			</div>
		</div>
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">按键设置：</div>
			<div class="form_con">
				<div class="pributton">{{data.key}}</div>
			</div>
		</div>
		<div v-if="serverType==0">
			<div class="form_item">
				<div class="form_title right">业务类型：</div>
				<div class="form_con">
					<el-select v-model="serverType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">规则类型：</div>
				<div class="form_con">
					<el-select v-model="data.actionSet.ruleType" placeholder="请选择" size="mini">
						<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-date-picker v-if="data.actionSet.ruleType==4" v-model="data.actionSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.actionSet.ruleType==2" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.actionSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.actionSet.ruleType==3" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.actionSet.ruleConfig.time" size="mini">
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index<6">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index>5">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div class="srearch">
				<div class="form_item">
					<div class="form_title right">工作时间：</div>
					<div class="form_con">
						<el-time-picker v-for="(item,index) in data.actionSet.workTime" :key="index" value-format="HH:mm:ss" is-range v-model="data.actionSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
						</el-time-picker> <i style="cursor: pointer;" class="el-icon-plus" @click="addWorkTime(true)"></i> <i style="cursor: pointer;" class="el-icon-minus" @click="addWorkTime(false)"></i>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">工作时间&#12288;<br>目的码：</div>
					<div class="form_con">
						<el-table :data="data.actionSet.codeWork" border style="width: 50%" :header-row-class-name="'lightblue'">
							<el-table-column prop="code" label="目的码" min-width="150">
								<template slot-scope="scope">
									<el-select v-model="scope.row.code" placeholder="请选择" size="mini">
										<el-option v-for="item in codeOptions" :key="item.value" :value="item.label">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="80">
								<template slot-scope="scope">
									<el-button size="mini" type="text" @click="codeWorkDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="lightblue center" style="width:50%">
							<el-button size="mini" type="text" @click="codeWorkadd">添加目的码</el-button>
						</div>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">非工作时间&#12288;<br>目的码：</div>
					<div class="form_con">
						<el-table :data="data.actionSet.codeUnWork" border style="width: 50%" :header-row-class-name="'lightblue'">
							<el-table-column prop="code" label="目的码" min-width="150">
								<template slot-scope="scope">
									<el-select v-model="scope.row.code" placeholder="请选择" size="mini">
										<el-option v-for="item in codeOptions" :key="item.value" :value="item.label">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="80">
								<template slot-scope="scope">
									<el-button size="mini" type="text" @click="codeUnWorkDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="lightblue center" style="width:50%">
							<el-button size="mini" type="text" @click="codeUnWorkadd">添加目的码</el-button>
						</div>
					</div>
				</div>
				<div class="form_item">
					<div class="form_con">
						<div class="grey">
							注解：已添加目的码的顺序即为号码轮询顺序
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="serverType==1">
			<div class="form_item">
				<div class="form_title right">业务类型：</div>
				<div class="form_con">
					<el-select v-model="serverType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">语音选择：</div>
				<div class="form_con">
					<el-select v-model="data.hookSet.voiceType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="grey fmini">&#12288;语音文件需要审核后才能选用</span>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">规则类型：</div>
				<div class="form_con">
					<el-select v-model="data.hookSet.ruleType" placeholder="请选择" size="mini">
						<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-date-picker v-if="data.hookSet.ruleType==4" v-model="data.hookSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.hookSet.ruleType==2" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.hookSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.hookSet.ruleType==3" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.hookSet.ruleConfig.time" size="mini">
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index<6">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index>5">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div class="srearch">
				<div class="form_item">
					<div class="form_title right">播放时间：</div>
					<div class="form_con">
						<el-time-picker v-for="(item,index) in data.hookSet.workTime" :key="index" value-format="HH:mm:ss" is-range v-model="data.hookSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
						</el-time-picker> <i style="cursor: pointer;" class="el-icon-plus" @click="addWorkTime(true)"></i> <i style="cursor: pointer;" class="el-icon-minus" @click="addWorkTime(false)"></i>
					</div>
				</div>
			</div>
		</div>
		<div v-if="serverType==2">
			<div class="form_item">
				<div class="form_title right">业务类型：</div>
				<div class="form_con">
					<el-select v-model="serverType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">语音选择：</div>
				<div class="form_con">
					<el-select v-model="data.ivrSet.voiceType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="grey fmini">&#12288;语音文件需要审核后才能选用</span>
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">规则类型：</div>
				<div class="form_con">
					<el-select v-model="data.ivrSet.ruleType" placeholder="请选择" size="mini">
						<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-date-picker v-if="data.ivrSet.ruleType==4" v-model="data.ivrSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.ivrSet.ruleType==2" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.ivrSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.ivrSet.ruleType==3" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.ivrSet.ruleConfig.time" size="mini">
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index<6">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
						<div style="overflow: hidden; margin-bottom:15px;">
							<div v-for="(item,index) in monthOptions" :key="item.vlaue" style="float:left;" v-if="index>5">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div class="srearch">
				<div class="form_item">
					<div class="form_title right">播放时间：</div>
					<div class="form_con">
						<el-time-picker v-for="(item,index) in data.ivrSet.workTime" :key="index" value-format="HH:mm:ss" is-range v-model="data.ivrSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
						</el-time-picker> <i style="cursor: pointer;" class="el-icon-plus" @click="addIvrTime(true)"></i> <i style="cursor: pointer;" class="el-icon-minus" @click="addIvrTime(false)"></i>
					</div>
				</div>
				<div class="form_item" v-if="isFirst">
					<div class="form_title right">动作名称：</div>
					<div class="form_con">
						<el-input v-model="data.label" size="mini"></el-input>
					</div>
				</div>
			</div>
			<div class="block">
				<ul>
					<li class="l2">
						<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<span>{{ data.key?('按键'+data.key+'：'):''}}{{data.temName?data.temName:''}}{{ node.label?node.label:'未定义名称' }}</span>
									<span>
										<el-button type="text" size="mini">
											设置
										</el-button>
									</span>
								</span>
						</el-tree>
					</li>
					<li class="l2 card search">
						<div class="title">IVR主菜单按键设置：</div>
						<ul>
							<li class="l3" v-for="item in keyOptions" :key="item.value">
								<el-card :body-style="{ padding: '0px' }">
									<div style="padding: 14px;">
										<p class="center blue">{{item.value}}</p>
										<div class="bottom center">
											<el-button type="text" class="button" @click="editKey(item.value)">设置</el-button>
											<el-button type="text" class="button">清空</el-button>
										</div>
									</div>
								</el-card>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="serverType==3">
			<div class="form_item">
				<div class="form_title right">业务类型：</div>
				<div class="form_con">
					<el-select v-model="serverType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<div v-if="serverType==4">
			<div class="form_item">
				<div class="form_title right">业务类型：</div>
				<div class="form_con">
					<el-select v-model="serverType" placeholder="请选择" size="mini">
						<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>
		<el-dialog title="按键规则设置" :visible.sync="dialogVisible" width="50%" :modal="false">
			<numSetAction :type="numSetActionData.value" :data="numSetActionData" :isFirst="false"></numSetAction>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	export default {
		name: 'numSetAction',
		props: [
			'type', 'data', 'order', 'isFirst'
		],
		watch: {
			type(newV, oldV) {
				this.serverType = newV;
			},
			serverType(newV, oldV) {
				this.data.value = newV;
				if (this.isFirst) {
					this.options.map(item => {
						if (item.value == newV) {
							this.data.temName = item.label;
						}
					});
				} else {
					this.optionscopy.map(item => {
						if (item.value == newV) {
							this.data.temName = item.label;
						}
					});
				}
				this.$emit('typeChange', newV, this.order);
			}
		},
		mounted() {
			this.serverType = this.type;
			this.$emit('typeChange', this.serverType, this.order);
			this.treeData.push(this.data);
		},
		data() {
			return {
				treeData: [],
				numSetActionData: {},
				serverType: 0,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				dialogVisible: false,
				options: [{ value: 0, label: '转接' }, { value: 1, label: '放音挂机' }, { value: 2, label: 'IVR' }],
				optionscopy: [{ value: 0, label: '转接' }, { value: 1, label: '放音挂机' }, { value: 2, label: 'IVR' }, { value: 3, label: '返回上级' }, { value: 4, label: '重听' }],
				codeOptions: [{
					label: '1231211'
				}],
				ruleOptions: [{ value: 0, label: '忽略规则' }, { value: 1, label: '每天' }, { value: 2, label: '每星期' }, { value: 3, label: '每月' }, { value: 4, label: '特定日期' }],
				dayOptions: [{ value: 0, label: '周一' }, { value: 1, label: '周二' }, {
					value: 2,
					label: '周三'
				}, { value: 3, label: '周四' }, { value: 4, label: '周五' }, { value: 5, label: '周六' }, { value: 6, label: '周日' }],
				monthOptions: [{ value: 0, label: '一月' }, { value: 1, label: '二月' }, { value: 2, label: '三月' }, { value: 3, label: '四月' }, { value: 4, label: '五月' }, {
					value: 5,
					label: '六月'
				}, { value: 6, label: '七月' }, { value: 7, label: '八月' }, { value: 8, label: '九月' }, { value: 9, label: '十月' }, { value: 10, label: '十一月' }, { value: 11, label: '十二月' }],
				keyOptions: [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }, { value: '*' }, { value: '0' }, { value: '#' }, ]
			}
		},
		methods: {
			editKey(keycode) {
				var isrequire = false;
				var index = -1;
				this.data.children.map((item, _index) => {
					if (item.key == keycode) {
						isrequire = true;
						index = _index;
					}
				})
				if (isrequire) {
					this.numSetActionData = this.data.children[index];
					this.dialogVisible = true;
				} else {
					this.data.children.push({
						key: keycode,
						value: 0,
						temName: '转接',
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
						label: '一级 11',
						children: []
					});
					this.numSetActionData = this.data.children[this.data.children.length - 1];
					this.dialogVisible = true;
				}
			},
			handleNodeClick(data) {
				console.log(data);
			},
			addWorkTime(bol) {
				if (bol) {
					this.hookSet.workTime.push('');
				} else {
					if (this.hookSet.workTime.length > 1) {
						this.hookSet.workTime.pop();
					}
				}
			},
			addIvrTime(bol) {
				if (bol) {
					this.ivrSet.workTime.push('');
				} else {
					if (this.ivrSet.workTime.length > 1) {
						this.ivrSet.workTime.pop();
					}
				}
			},
			codeWorkDelete(index) {
				if (this.actionSet.codeWork.length > 1) {
					this.actionSet.codeWork.splice(index, 1);
				}
			},
			codeUnWorkDelete(index) {
				if (this.actionSet.codeWork.length > 1) {
					this.actionSet.codeUnWork.splice(index, 1);
				}
			},
			codeWorkadd() {
				this.actionSet.codeWork.push({ code: '' });
			},
			codeUnWorkadd() {
				this.actionSet.codeUnWork.push({ code: '' });
			}
		}
	}
</script>