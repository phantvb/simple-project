<template>
	<div class="numDialog managerFormTitle lightblueTable" id="numSetAction">
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">动作名称：</div>
			<div class="form_con">
				<el-input v-model="allData.actionName" size="mini"></el-input>
			</div>
		</div>
		<div class="form_item" v-if="!isFirst">
			<div class="form_title right">按键设置：</div>
			<div class="form_con">
				<div class="pributton">{{allData.keyNumber}}</div>
			</div>
		</div>
		<div class="form_item">
			<div class="form_title right">业务类型：</div>
			<div class="form_con">
				<el-select v-model="allData.businessType" placeholder="请选择" size="mini">
					<el-option v-for="item in (isFirst?options:optionscopy)" :disabled="allType?allType.indexOf(item.value)!=-1:false" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="form_item" v-if="allData.businessType=='playback'||allData.businessType=='IVR'">
			<div class="form_title right">语音选择：</div>
			<div class="form_con">
				<el-select v-model="allData[allData.businessType].voiceType" placeholder="请选择" size="mini">
					<el-option v-for="item in (isFirst?options:optionscopy)" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<span class="grey fmini">&#12288;语音文件需要审核后才能选用</span>
			</div>
		</div>
		<div class="form_item" v-if="allData.businessType=='transfer'||allData.businessType=='playback'||allData.businessType=='IVR'">
			<div class="form_title right">规则类型：</div>
			<div class="form_con">
				<el-select v-model="allData[allData.businessType].ruleType" placeholder="请选择" size="mini" multiple collapse-tags @change="handleRuleTypeChange">
					<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="(allData[allData.businessType].ruleType.indexOf('ignore')!=-1&&item.value!='ignore')||(item.value=='day'&&(allData[allData.businessType].ruleType.indexOf('week')!=-1||allData[allData.businessType].ruleType.indexOf('month')!=-1))||(item.value=='week'&&(allData[allData.businessType].ruleType.indexOf('day')!=-1||allData[allData.businessType].ruleType.indexOf('month')!=-1))||(item.value=='month'&&(allData[allData.businessType].ruleType.indexOf('day')!=-1||allData[allData.businessType].ruleType.indexOf('week')!=-1))">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="form_item" v-if="allData.businessType=='transfer'||allData.businessType=='playback'||allData.businessType=='IVR'">
			<el-tabs v-model="ActiveName[allData.businessType]" type="card" size="small">
				<el-tab-pane :label="_value.label" :name="_key" v-for="(_value,_key,_index) in allData[allData.businessType].ruleConfig" :key="_index" v-if="allData[allData.businessType].ruleType.indexOf(_key)!=-1">
					<div style="overflow: hidden;margin-bottom:15px;">
						<el-checkbox-group v-if="_key=='week'" v-model="_value.specificDate" size="mini">
							<div v-for="item in dayOptions" :key="item.value" style="float:left;">
								<el-checkbox-button size="mini" :label="item.value">{{item.label}}</el-checkbox-button>&#12288;
							</div>
						</el-checkbox-group>
						<el-checkbox-group v-else-if="_key=='month'" v-model="_value.specificDate" size="mini">
							<div v-for="item in monthOptions" :key="item.value" style="float:left;">
								<el-checkbox-button size="mini" :label="item.value">{{item.label}}</el-checkbox-button>&#12288;
							</div>
						</el-checkbox-group>
						<el-date-picker v-else-if="_key=='specificDate'" v-model="_value.specificDate" type="date" placeholder="选择日期" size="mini">
						</el-date-picker>
					</div>
					<div class="srearch">
						<div class="form_item">
							<div class="form_title right">{{allData.businessType=='transfer'?'工作时间':'播放时间'}}：</div>
							<div class="form_con">
								<div v-for="(item,index) in _value.workTime" :key="index" style="margin-bottom:10px">
									<el-time-picker value-format="HH:mm:ss" is-range v-model="_value.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
									</el-time-picker>
									<el-button v-if="index==0" type="primary" size="mini" icon="el-icon-plus" @click="addactTime(_value,true)"></el-button>
									<el-button v-if="index>0" type="primary" size="mini" icon="el-icon-minus" @click="addactTime(_value,false)"></el-button>
								</div>
							</div>
						</div>
						<div class="form_item" v-if="allData.businessType=='transfer'">
							<div class="form_title right">工作时间&#12288;<br>目的码：</div>
							<div class="form_con">
								<el-table :data="_value.codeWork" border :header-row-class-name="'lightblue'">
									<el-table-column prop="code" label="目的码" min-width="150">
										<template slot-scope="scope">
											<el-select v-model="_value.codeWork[scope.$index]" placeholder="请选择" size="mini">
												<el-option v-for="item in codeOptions" :key="item.value" :value="item.label">
												</el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column label="操作" min-width="80">
										<template slot-scope="scope">
											<el-button size="mini" type="text" @click="codeWorkDelete(scope.$index, _value)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<div class="lightblue center" style="width:100%">
									<el-button size="mini" type="text" @click="codeWorkadd(_value)">添加目的码</el-button>
								</div>
							</div>
						</div>
						<div class="form_item" v-if="allData.businessType=='transfer'">
							<div class="form_title right">非工作时间&#12288;<br>目的码：</div>
							<div class="form_con">
								<el-table :data="_value.codeUnWork" border :header-row-class-name="'lightblue'">
									<el-table-column prop="code" label="目的码" min-width="150">
										<template slot-scope="scope">
											<el-select v-model="_value.codeUnWork[scope.$index]" placeholder="请选择" size="mini">
												<el-option v-for="item in codeOptions" :key="item.value" :value="item.label">
												</el-option>
											</el-select>
										</template>
									</el-table-column>
									<el-table-column label="操作" min-width="80">
										<template slot-scope="scope">
											<el-button size="mini" type="text" @click="codeUnWorkDelete(scope.$index, _value)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
								<div class="lightblue center" style="width:100%">
									<el-button size="mini" type="text" @click="codeUnWorkadd(_value)">添加目的码</el-button>
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

				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="form_item" v-if="allData.businessType=='IVR'">
			<div class="srearch">
				<div class="form_item" v-if="isFirst">
					<div class="form_title right">动作名称：</div>
					<div class="form_con">
						<el-input v-model="allData.actionName" size="mini"></el-input>
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
											<el-button type="text" size="mini" class="button" @click="editKey(item.value)">设置</el-button>
											<el-button type="text" size="mini" style="float:right" class="button">清空</el-button>
										</div>
									</div>
								</el-card>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<el-dialog title="按键规则设置" :visible.sync="dialogVisible" width="50%" :modal="false">
			<numSetAction :number400Data="number400Data" :allData="allData.children[numSetActionIndex]" :isFirst="false"></numSetAction>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="submit(allData.children[numSetActionIndex])" size="mini">确 定</el-button>
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
			'allData', 'order', 'isFirst', 'number400Data', 'index', 'allType'
		],
		watch: {
			"allData.businessType": {
				handler: function (newV, oldV) {
					if (this.allData.businessType == "IVR") {
						this.updata(this.allData, true);
					}
					if (this.isFirst) {
						this.options.map(item => {
							if (item.value == newV) {
								this.allData.temName = item.label;
							}
						});
					} else {
						this.optionscopy.map(item => {
							if (item.value == newV) {
								this.allData.temName = item.label;
							}
						});
					}
					this.$emit('typeChange', newV, this.index, this.allData.temName);
				}
			}
		},
		data() {
			return {
				//allData: {},
				ActiveName: {
					transfer: 'ignore',
					playback: 'ignore',
					IVR: 'ignore'
				},
				treeData: [],
				numSetActionIndex: 0,
				defaultProps: {
					children: 'children',
					label: 'actionName'
				},
				dialogVisible: false,
				//transfer转接 playback放音挂机 returnLast返回上一级 reListen重听  IVR
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
				optionscopy: [{
					value: 'transfer',
					label: '转接'
				}, {
					value: 'playback',
					label: '放音挂机'
				}, {
					value: 'IVR',
					label: 'IVR'
				}, {
					value: 'returnLast',
					label: '返回上级'
				}, {
					value: 'reListen',
					label: '重听'
				}],
				codeOptions: [{
					label: '1231211'
				}],
				//ignore忽略规则 day每天 week星期 month月 specificDate特定日期
				ruleOptions: [{
					value: 'ignore',
					label: '忽略规则'
				}, {
					value: 'day',
					label: '每天'
				}, {
					value: 'week',
					label: '每星期'
				}, {
					value: 'month',
					label: '每月'
				}, {
					value: 'specificDate',
					label: '特定日期'
				}],
				dayOptions: [{
					value: '1',
					label: '周一'
				}, {
					value: '2',
					label: '周二'
				}, {
					value: '3',
					label: '周三'
				}, {
					value: '4',
					label: '周四'
				}, {
					value: '5',
					label: '周五'
				}, {
					value: '6',
					label: '周六'
				}, {
					value: '7',
					label: '周日'
				}],
				monthOptions: [{
					value: '1',
					label: '一月'
				}, {
					value: '2',
					label: '二月'
				}, {
					value: '3',
					label: '三月'
				}, {
					value: '4',
					label: '四月'
				}, {
					value: '5',
					label: '五月'
				}, {
					value: '6',
					label: '六月'
				}, {
					value: '7',
					label: '七月'
				}, {
					value: '8',
					label: '八月'
				}, {
					value: '9',
					label: '九月'
				}, {
					value: '10',
					label: '十月'
				}, {
					value: '11',
					label: '十一月'
				}, {
					value: '12',
					label: '十二月'
				}],
				keyOptions: [{
					value: '1'
				}, {
					value: '2'
				}, {
					value: '3'
				}, {
					value: '4'
				}, {
					value: '5'
				}, {
					value: '6'
				}, {
					value: '7'
				}, {
					value: '8'
				}, {
					value: '9'
				}, {
					value: '*'
				}, {
					value: '0'
				}, {
					value: '#'
				}, ]
			}
		},
		created() {
			this.treeData.push(this.allData);
		},
		methods: {
			submit(data) {
				console.log(data);
				//this.updata(data, false);
				this.dialogVisible = false;
			},
			editKey(keycode) {
				var isrequire = false;
				var index = -1;
				this.allData.children.map((item, _index) => {
					if (item.keyNumber == keycode) {
						isrequire = true;
						index = _index;
					}
				});
				if (isrequire) {
					this.numSetActionIndex = index;
					this.dialogVisible = true;
				} else {
					let obj = {
						id: "",
						keyNumber: keycode,
						number400Data: this.number400Data,
						businessType: 'transfer',
						temName: '转接',
						actionName: '一级 11',
						transfer: {
							ruleType: [],
							ruleConfig: {}
						},
						playback: {
							voiceType: 0,
							ruleType: [],
							ruleConfig: {}
						},
						IVR: {
							voiceType: 0,
							ruleType: [],
							ruleConfig: {}
						},
						children: []
					};
					this.ruleOptions.map(item => {
						obj.transfer.ruleConfig[item.value] = {
							id: "",
							label: item.label,
							workTime: [''],
							codeWork: [''],
							codeUnWork: [''],
							specificDate: []
						};
						obj.playback.ruleConfig[item.value] = {
							id: "",
							label: item.label,
							workTime: [''],
							specificDate: []
						};
						obj.IVR.ruleConfig[item.value] = {
							id: "",
							label: item.label,
							workTime: [''],
							specificDate: []
						};
					});
					this.allData.children.push(obj);
					this.numSetActionIndex = this.allData.children.length - 1;
					this.dialogVisible = true;
				}
			},
			updata(objData, bol /*判断是否位第一层数据*/ ) {
				var postdata = {};
				postdata.id = objData.id;
				if (this.isFirst && bol) {
					postdata.parentId = '';
				} else {
					postdata.parentId = this.data.id;
				}
				postdata.keyNumber = objData.keyNumber;
				postdata.number400 = this.number400Data.number400;
				postdata.businessType = objData.businessType;
				if (objData.businessType == 'transfer') {
					objData.transfer.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.ruleType = item;
						cData.workDestNumbers = objData.transfer.ruleConfig[item].codeWork.join(',');
						cData.nonWorkDestNumbers = objData.transfer.ruleConfig[item].codeUnWork.join(',');
						objData.transfer.ruleConfig.workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objDa.tatransfer.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.transfer.ruleConfig[item].specificDate;
						};
						console.log(cData)
						this.sendUp('saveTransfer', cData)
					})
				} else if (objData.businessType == 'playback') {
					objData.playback.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.ruleType = item;
						objData.playback.ruleConfig.workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objData.playback.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.playback.ruleConfig[item].specificDate;
						};
						cData.voiceId = objData.playback.voiceType;
						this.sendUp('savePlayback', cData)
					})
				} else if (objData.businessType == 'IVR') {
					objData.IVR.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.ruleType = item;
						cData.actionName = objData.actionName;
						objData.IVR.ruleConfig.workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objData.IVR.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.IVR.ruleConfig[item].specificDate;
						};
						cData.voiceId = objData.IVR.voiceType;
						this.sendUp('saveIVR', cData);
					})
				} else {
					let cData = Object.assign({}, postdata);
					cData.businessType = objData.businessType;
					this.sendUp('saveKey', cData);
				};
			},
			sendUp(url, postdata) {
				if (!this.isFirst) {
					this.$ajax.post('/vos/num400config/saveKey', {
						num400KeyConfig: postdata
					}).then(res => {
						if (res.code == 200) {
							objData.id = res.data;
						}
					});
				} else {
					//saveTransfer,savePlayback,saveIVR
					this.$ajax.post('/vos/num400config/' + url, {
						num400TransferConfig: postdata
					}).then(res => {
						if (res.code == 200) {
							objData.id = res.data;
						}
					});
				}
			},
			handleNodeClick(data) {
				console.log(this.treeData);
			},
			handleRuleTypeChange(val) {
				if (val.indexOf('ignore') != -1) {
					val.splice(0, val.length, 'ignore');
				};
			},
			addactTime(target, bol) {
				if (bol && target.workTime.length < 2) {
					target.workTime.push('');
				} else {
					if (target.workTime.length > 1) {
						target.workTime.pop();
					}
				}
			},
			codeWorkDelete(index, target) {
				if (target.codeWork.length > 1) {
					target.codeWork.splice(index, 1);
				}
			},
			codeUnWorkDelete(index, target) {
				if (target.codeWork.length > 1) {
					target.codeUnWork.splice(index, 1);
				}
			},
			codeWorkadd(target) {
				target.codeWork.push('');
			},
			codeUnWorkadd(target) {
				target.codeUnWork.push('');
			}
		}
	}
</script>