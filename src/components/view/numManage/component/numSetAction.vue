<template>
	<div class="numDialog managerFormTitle lightblueTable" id="numSetAction">
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">动作名称：</div>
			<div class="form_con">
				<el-input v-model="data.actionName" size="mini"></el-input>
			</div>
		</div>
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">按键设置：</div>
			<div class="form_con">
				<div class="pributton">{{data.keyNumber}}</div>
			</div>
		</div>
		<div v-if="serverType=='transfer'">
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
					<el-date-picker v-if="data.actionSet.ruleType=='specificDate'" v-model="data.actionSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.actionSet.ruleType=='week'" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.actionSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.actionSet.ruleType=='month'" class="form_item">
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
						<div v-for="(item,index) in data.actionSet.workTime" :key="index" style="margin-bottom:10px">
							<el-time-picker value-format="HH:mm:ss" is-range v-model="data.actionSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
							</el-time-picker>
							<el-button v-if="index==0" type="primary" size="mini" icon="el-icon-plus" @click="addactTime(true)"></el-button>
							<el-button v-if="index>0" type="primary" size="mini" icon="el-icon-minus" @click="addactTime(false)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">工作时间&#12288;<br>目的码：</div>
					<div class="form_con">
						<el-table :data="data.actionSet.codeWork" border style="width: 50%" :header-row-class-name="'lightblue'">
							<el-table-column prop="code" label="目的码" min-width="150">
								<template slot-scope="scope">
									<el-select v-model="data.actionSet.codeWork[scope.$index]" placeholder="请选择" size="mini">
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
									<el-select v-model="data.actionSet.codeUnWork[scope.$index]" placeholder="请选择" size="mini">
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
		<div v-if="serverType=='playback'">
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
					<el-date-picker v-if="data.hookSet.ruleType=='specificDate'" v-model="data.hookSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.hookSet.ruleType=='week'" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.hookSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.hookSet.ruleType=='month'" class="form_item">
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
						<div v-for="(item,index) in data.hookSet.workTime" :key="index" style="margin-bottom:10px">
							<el-time-picker value-format="HH:mm:ss" is-range v-model="data.hookSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
							</el-time-picker>
							<el-button v-if="index==0" type="primary" size="mini" icon="el-icon-plus" @click="addactTime(true)"></el-button>
							<el-button v-if="index>0" type="primary" size="mini" icon="el-icon-minus" @click="addactTime(false)"></el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="serverType=='IVR'">
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
					<el-date-picker v-if="data.ivrSet.ruleType=='specificDate'" v-model="data.ivrSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
					</el-date-picker>
				</div>
			</div>
			<div v-if="data.ivrSet.ruleType=='week'" class="form_item">
				<div class="form_con">
					<el-checkbox-group v-model="data.ivrSet.ruleConfig.time" size="mini">
						<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
							<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
						</div>
					</el-checkbox-group>
				</div>
			</div>
			<div v-if="data.ivrSet.ruleType=='month'" class="form_item">
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
						<div v-for="(item,index) in data.ivrSet.workTime" :key="index" style="margin-bottom:10px">
							<el-time-picker value-format="HH:mm:ss" is-range v-model="data.ivrSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
							</el-time-picker>
							<el-button v-if="index==0" type="primary" size="mini" icon="el-icon-plus" @click="addactTime(true)"></el-button>
							<el-button v-if="index>0" type="primary" size="mini" icon="el-icon-minus" @click="addactTime(false)"></el-button>
						</div>
					</div>
				</div>
				<div class="form_item" v-if="isFirst">
					<div class="form_title right">动作名称：</div>
					<div class="form_con">
						<el-input v-model="data.actionName" size="mini"></el-input>
					</div>
				</div>
			</div>
			<div class="block">
				<ul>
					<li class="l2" v-if="isFirst">
						<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<span>{{ data.keyNumber?('按键'+data.keyNumber+'：'):''}}{{data.temName?data.temName:''}}{{ data.actionName?data.actionName:'未定义名称' }}</span>
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
		<div v-if="serverType=='returnLast'">
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
		<div v-if="serverType=='reListen'">
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
		<el-dialog title="按键规则设置" :visible.sync="dialogVisible" width="50%" :modal="false" @close="close">
			<numSetAction :type="numSetActionData.businessType" :data="numSetActionData" :isFirst="false"></numSetAction>
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
			'type', 'data', 'order', 'isFirst', 'number400'
		],
		watch: {
			type(newV, oldV) {
				console.log(newV);
				this.serverType = newV;
			},
			serverType(newV, oldV) {
				this.data.businessType = newV;
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
					label: 'actionName'
				},
				dialogVisible: false,
				//transfer转接 playback放音挂机 returnLast返回上一级 reListen重听  IVR
				options: [{ value: 'transfer', label: '转接' }, { value: 'playback', label: '放音挂机' }, { value: 'IVR', label: 'IVR' }],
				optionscopy: [{ value: 'transfer', label: '转接' }, { value: 'playback', label: '放音挂机' }, { value: 'IVR', label: 'IVR' }, { value: 'returnLast', label: '返回上级' }, { value: 'reListen', label: '重听' }],
				codeOptions: [{
					label: '1231211'
				}],
				//ignore忽略规则 day每天 week星期 month月 specificDate特定日期
				ruleOptions: [{ value: 'ignore', label: '忽略规则' }, { value: 'day', label: '每天' }, { value: 'week', label: '每星期' }, { value: 'month', label: '每月' }, { value: 'specificDate', label: '特定日期' }],
				dayOptions: [{ value: 1, label: '周一' }, { value: 2, label: '周二' }, {
					value: 3,
					label: '周三'
				}, { value: 4, label: '周四' }, { value: 5, label: '周五' }, { value: 6, label: '周六' }, { value: 7, label: '周日' }],
				monthOptions: [{ value: 1, label: '一月' }, { value: 2, label: '二月' }, { value: 3, label: '三月' }, { value: 4, label: '四月' }, { value: 5, label: '五月' }, { value: 6, label: '六月' }, { value: 7, label: '七月' }, { value: 8, label: '八月' }, { value: 9, label: '九月' }, { value: 10, label: '十月' }, { value: 11, label: '十一月' }, { value: 12, label: '十二月' }],
				keyOptions: [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }, { value: '*' }, { value: '0' }, { value: '#' }, ]
			}
		},
		methods: {
			close() {
				console.log(this.data);
				this.updata();
			},
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
						id: "",
						keyNumber: keycode,
						number400: this.number400,
						businessType: 'transfer',
						temName: '转接',
						actionName: '一级 11',
						actionSet: {
							ruleType: 'ignore',
							ruleConfig: {
								time: [],
								date: ''
							},
							workTime: [],
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
							workTime: []
						},
						ivrSet: {
							voiceType: 0,
							ruleType: 'ignore',
							ruleConfig: {
								time: [],
								date: ''
							},
							workTime: []
						},
						children: []
					});
					this.numSetActionData.businessType = 'transfer';
					this.numSetActionData = this.data.children[this.data.children.length - 1];
					this.dialogVisible = true;
				}
			},
			updata() {
				var postdata = {};
				postdata.id = this.data.id;
				postdata.keyNumber = this.data.keyNumber;
				postdata.number400 = this.number400;
				postdata.businessType = this.data.businessType;
				if (this.data.businessType == 'transfer') {
					postdata.workDestNumbers = this.data.actionSet.codeWork.join(',');
					postdata.nonWorkDestNumbers = this.data.actionSet.codeUnWork.join(',');
					this.data.actionSet.workTime.map((item, index) => {
						postdata['workTime' + (index + 1) + 'Start'] = item[0];
						postdata['workTime' + (index + 1) + 'End'] = item[1];
					});
					postdata.ruleType = this.data.actionSet.ruleType;
					if (this.data.actionSet.ruleType == 'week' || this.data.actionSet.ruleType == 'month') {
						postdata.specificDate = this.data.actionSet.ruleConfig.time.join(',');
					} else if (this.data.actionSet.ruleType == 'specificDate') {
						postdata.specificDate = this.data.actionSet.ruleConfig.date;
					}
					//postdata.parentId=this.data.actionSet;
				} else if (this.data.businessType == 'playback') {
					this.data.hookSet.workTime.map((item, index) => {
						postdata['workTime' + (index + 1) + 'Start'] = item[0];
						postdata['workTime' + (index + 1) + 'End'] = item[1];
					});
					postdata.ruleType = this.data.hookSet.ruleType;
					if (this.data.hookSet.ruleType == 'week' || this.data.hookSet.ruleType == 'month') {
						postdata.specificDate = this.data.hookSet.ruleConfig.time.join(',');
					} else if (this.data.hookSet.ruleType == 'specificDate') {
						postdata.specificDate = this.data.hookSet.ruleConfig.date;
					}
					postdata.voiceId = this.data.hookSet.voiceType;
				} else if (this.data.businessType == 'IVR') {
					postdata.actionName = this.data.actionName;
					this.data.ivrSet.workTime.map((item, index) => {
						postdata['workTime' + (index + 1) + 'Start'] = item[0];
						postdata['workTime' + (index + 1) + 'End'] = item[1];
					});
					postdata.ruleType = this.data.ivrSet.ruleType;
					if (this.data.ivrSet.ruleType == 'week' || this.data.ivrSet.ruleType == 'month') {
						postdata.specificDate = this.data.ivrSet.ruleConfig.time.join(',');
					} else if (this.data.ivrSet.ruleType == 'specificDate') {
						postdata.specificDate = this.data.ivrSet.ruleConfig.date;
					}
					postdata.voiceId = this.data.ivrSet.voiceType;
				} else {
					postdata.businessType = this.data.businessType;
				};
				this.$ajax.post('/vos/num400config/saveKey', postdata).then(res => {

				})
			},
			handleNodeClick(data) {
				console.log(data);
			},
			addactTime(bol) {
				if (bol) {
					this.data.actionSet.workTime.push('');
				} else {
					if (this.data.actionSet.workTime.length > 1) {
						this.data.actionSet.workTime.pop();
					}
				}
			},
			addWorkTime(bol) {
				if (bol) {
					this.data.hookSet.workTime.push('');
				} else {
					if (this.data.hookSet.workTime.length > 1) {
						this.data.hookSet.workTime.pop();
					}
				}
			},
			addIvrTime(bol) {
				if (bol) {
					this.data.ivrSet.workTime.push('');
				} else {
					if (this.data.ivrSet.workTime.length > 1) {
						this.data.ivrSet.workTime.pop();
					}
				}
			},
			codeWorkDelete(index) {
				if (this.data.actionSet.codeWork.length > 1) {
					this.data.actionSet.codeWork.splice(index, 1);
				}
			},
			codeUnWorkDelete(index) {
				if (this.data.actionSet.codeWork.length > 1) {
					this.data.actionSet.codeUnWork.splice(index, 1);
				}
			},
			codeWorkadd() {
				this.data.actionSet.codeWork.push('');
			},
			codeUnWorkadd() {
				this.data.actionSet.codeUnWork.push('');
			}
		}
	}
</script>