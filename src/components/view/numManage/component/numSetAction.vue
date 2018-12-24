<template>
	<div class="numDialog managerFormTitle lightblueTable">
		<el-collapse-item :name="activeName">
			<template slot="title">
				<el-checkbox v-model="businessAction" :label="temName" :value="type"></el-checkbox>
				<el-button size="mini" type="text" @click.stop="$emit('moveup',order)">上移</el-button>
				<el-button size="mini" type="text" @click.stop="$emit('movedown',order)">下移</el-button>
			</template>
			<div v-if="serverType==0">
				<div class="form_item">
					<div class="form_title right">业务类型：</div>
					<div class="form_con">
						<el-select v-model="serverType" placeholder="请选择" size="mini" @change="serverTypeChange">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">规则类型：</div>
					<div class="form_con">
						<el-select v-model="actionSet.ruleType" placeholder="请选择" size="mini">
							<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-date-picker v-if="actionSet.ruleType==4" v-model="actionSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
						</el-date-picker>
					</div>
				</div>
				<div v-if="actionSet.ruleType==2" class="form_item">
					<div class="form_con">
						<el-checkbox-group v-model="actionSet.ruleConfig.time" size="mini">
							<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</el-checkbox-group>
					</div>
				</div>
				<div v-if="actionSet.ruleType==3" class="form_item">
					<div class="form_con">
						<el-checkbox-group v-model="actionSet.ruleConfig.time" size="mini">
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
							<el-time-picker v-for="(item,index) in actionSet.workTime" :key="index" value-format="HH:mm:ss" is-range v-model="actionSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
							</el-time-picker> <i style="cursor: pointer;" class="el-icon-plus" @click="addWorkTime(true)"></i> <i style="cursor: pointer;" class="el-icon-minus" @click="addWorkTime(false)"></i>
						</div>
					</div>
					<div class="form_item">
						<div class="form_title right">工作时间&#12288;<br>目的码：</div>
						<div class="form_con">
							<el-table :data="actionSet.codeWork" border style="width: 50%" :header-row-class-name="'lightblue'">
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
							<el-table :data="actionSet.codeUnWork" border style="width: 50%" :header-row-class-name="'lightblue'">
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
						<el-select v-model="serverType" placeholder="请选择" size="mini" @change="serverTypeChange">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">语音选择：</div>
					<div class="form_con">
						<el-select v-model="hookSet.voiceType" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<span class="grey fmini">&#12288;语音文件需要审核后才能选用</span>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">规则类型：</div>
					<div class="form_con">
						<el-select v-model="hookSet.ruleType" placeholder="请选择" size="mini">
							<el-option v-for="item in ruleOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<el-date-picker v-if="hookSet.ruleType==4" v-model="hookSet.ruleConfig.date" type="date" placeholder="选择日期" size="mini">
						</el-date-picker>
					</div>
				</div>
				<div v-if="hookSet.ruleType==2" class="form_item">
					<div class="form_con">
						<el-checkbox-group v-model="hookSet.ruleConfig.time" size="mini">
							<div v-for="item in dayOptions" :key="item.vlaue" style="float:left;">
								<el-checkbox-button size="mini" :value='item.vlaue' :label="item.label"></el-checkbox-button>&#12288;
							</div>
						</el-checkbox-group>
					</div>
				</div>
				<div v-if="hookSet.ruleType==3" class="form_item">
					<div class="form_con">
						<el-checkbox-group v-model="hookSet.ruleConfig.time" size="mini">
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
							<el-time-picker v-for="(item,index) in hookSet.workTime" :key="index" value-format="HH:mm:ss" is-range v-model="hookSet.workTime[index]" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" size="mini" style="margin-bottom:10px;">
							</el-time-picker> <i style="cursor: pointer;" class="el-icon-plus" @click="addWorkTime(true)"></i> <i style="cursor: pointer;" class="el-icon-minus" @click="addWorkTime(false)"></i>
						</div>
					</div>
				</div>
			</div>
		</el-collapse-item>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	export default {
		name: 'numSetAction',
		props: [
			'type', 'activeName', 'order'
		],
		watch: {
			type(newV, oldV) {
				this.serverType = newV;
			}
		},
		mounted() {
			this.serverType = this.type;
		},
		data() {
			return {
				serverType: 0,
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
				temName: '转接',
				businessAction: true,
				options: [{
					value: 0,
					label: '转接'
				}, {
					value: 1,
					label: '放音挂机'
				}, {
					value: 2,
					label: 'IVR'
				}],
				codeOptions: [{
					label: '1231211'
				}],
				ruleOptions: [{
					value: 0,
					label: '忽略规则'
				}, {
					value: 1,
					label: '每天'
				}, {
					value: 2,
					label: '每星期'
				}, {
					value: 3,
					label: '每月'
				}, {
					value: 4,
					label: '特定日期'
				}],
				dayOptions: [{
					value: 0,
					label: '周一'
				}, {
					value: 1,
					label: '周二'
				}, {
					value: 2,
					label: '周三'
				}, {
					value: 3,
					label: '周四'
				}, {
					value: 4,
					label: '周五'
				}, {
					value: 5,
					label: '周六'
				}, {
					value: 6,
					label: '周日'
				}],
				monthOptions: [{
					value: 0,
					label: '一月'
				}, {
					value: 1,
					label: '二月'
				}, {
					value: 2,
					label: '三月'
				}, {
					value: 3,
					label: '四月'
				}, {
					value: 4,
					label: '五月'
				}, {
					value: 5,
					label: '六月'
				}, {
					value: 6,
					label: '七月'
				}, {
					value: 7,
					label: '八月'
				}, {
					value: 8,
					label: '九月'
				}, {
					value: 9,
					label: '十月'
				}, {
					value: 10,
					label: '十一月'
				}, {
					value: 11,
					label: '十二月'
				}],
			}
		},
		methods: {
			serverTypeChange() {
				this.options.map(item => {
					if (item.value == this.serverType) {
						this.temName = item.label;
					}
				})
			},
			addWorkTime(bol) {
				if (bol) {
					this.actionSet.workTime.push('');
				} else {
					if (this.actionSet.workTime.length > 1) {
						this.actionSet.workTime.pop();
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