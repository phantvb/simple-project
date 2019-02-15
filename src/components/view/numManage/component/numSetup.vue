<template>
	<div id="numSetup" class="numDialog managerFormTitle">
		<el-dialog title="编辑号码设置" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible">
			<div class="block">
				<ul>
					<li class="l2">
						<p class="fmini">400号码: {{number400Data.number400}}</p>
					</li>
					<li class="l2">
						<p class="fmini">企业名称: {{number400Data.companyName}}</p>
					</li>
					<li class="l2">
						<p class="fmini">引示号码：{{number400Data.guideNumber}}</p>
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
									<el-option v-for="item in ringStrategyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">冷却时长：</div>
							<div class="form_con">
								<el-input v-model="baseSet.coolSeconds" placeholder="请输入内容" size="mini"></el-input>秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">坐席超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.sitTimeOut" placeholder="请输入内容" size="mini"></el-input>秒
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">未接置忙：</div>
							<div class="form_con">
								<el-select v-model="baseSet.busySetting" placeholder="请选择" size="mini">
									<el-option v-for="item in busySettingOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="form_title right">等待超时时间：</div>
							<div class="form_con">
								<el-input v-model="baseSet.waitTimeOut" placeholder="请输入内容" size="mini"></el-input>秒
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="业务动作" name="2">
					<section class="left lineTop" id="addaction">
						<el-button type="primary" size="mini" @click="addNumSetAction">
							<i class="el-icon-plus"></i> 新增业务动作
						</el-button>
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
                                    </div>-->
								</template>
								<numSetAction :allType="allType" :number400Data="number400Data" :order="item.order" :allData="item" :index="index" @typeChange="typeChange" :isFirst="true"></numSetAction>
							</el-collapse-item>
						</div>
					</el-collapse>
				</el-tab-pane>
			</el-tabs>
			<footer class="right">
				<el-button type="primary" size="mini" plain @click="dialogVisible=false">取消</el-button>
				<el-button type="primary" size="mini" @click="submit(numSetActionData)">确定</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	import numSetAction from "./numSetAction.vue";
	export default {
		name: "numSetup",
		props: ["show", "number400Data", "id"],
		components: {
			numSetAction
		},
		mixins: [{ methods: { updata() { numSetAction.methods.updata } } }],
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
					waitTimeOut: "30"
				},
				businessAction: [],
				numSetActionData: [],
				allType: [],
				dialogVisible: false,
				type: "1",
				numSetup: "",
				active: "1",
				activeName: 2,
				options: [{
						value: "transfer",
						label: "转接"
					},
					{
						value: "playback",
						label: "放音挂机"
					},
					{
						value: "IVR",
						label: "IVR"
					}
				],
				ringStrategyOptions: [{
						value: "order",
						label: "顺序振铃"
					},
					{
						value: "memory",
						label: "记忆轮询"
					}
				],
				busySettingOptions: [{
						value: "yes",
						label: "是"
					},
					{
						value: "no",
						label: "否"
					}
				],
				//ignore忽略规则 day每天 week星期 month月 specificDate特定日期
				ruleOptions: [{
						value: "ignore",
						label: "忽略规则"
					},
					{
						value: "day",
						label: "每天"
					},
					{
						value: "week",
						label: "每星期"
					},
					{
						value: "month",
						label: "每月"
					},
					{
						value: "specificDate",
						label: "特定日期"
					}
				]
			};
		},
		methods: {
			fetchDate() {
				this.$ajax
					.get("/vos/num400config/getBasicDetail/" + this.number400Data.number400)
					.then(res => {
						if (res.code == 200) {
							Object.assign(this.baseSet, res.data);
						}
					});
				this.getDetail("Transfer", "转接", "transfer");
				this.getDetail("Playback", "放音挂机", "playback");
				this.getDetail("IVR", "IVR", "IVR");
			},
			submit(data) {
				data.map(item => {
					this.updata(item);
				});
			},
			getDetail(url, tem, temSet) {
				this.$ajax.get("/vos/num400config/get" + url + "Detail/" + this.number400Data.number400).then(res => {
					if (res.code == 200 && res.data.length > 0) {
						let obj = this.createdSet();
						obj.businessType = res.data[0].businessType;
						obj.temName = tem;
						if (url == "Transfer") {
							res.data.map(item => {
								obj[temSet].ruleType.push(item.ruleType);
								Object.assign(obj[temSet].ruleConfig[item.ruleType], {
									id: item.id,
									workTime: [
										[item.workTime1Start || '', item.workTime1End || ''],
										[item.workTime2Start || '', item.workTime2End || '']
									],
									codeWork: item.workDestNumbers.split(","),
									codeUnWork: item.nonWorkDestNumbers.split(","),
									specificDate: item.specificDate ? item.specificDate.split(",") : item.specificDate
								});
							});
						} else {
							res.data.map(item => {
								obj[temSet].ruleType.push(item.ruleType);
								Object.assign(obj[temSet].ruleConfig[item.ruleType], {
									id: item.id,
									workTime: [
										[item.workTime1Start, item.workTime1End],
										[item.workTime2Start, item.workTime2End]
									],
									specificDate: item.specificDate.split(",")
								});
							});
						}
						console.log(obj);
						this.numSetActionData.push(obj);
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
					this.allType.push(item.businessType);
				});
			},
			close() {
				this.$emit("close");
			},
			moveup(orders, e, index) {
				if (orders > 0) {
					this.$refs["moveList"].insertBefore(
						this.$refs["moveList"].childNodes[orders],
						document.getElementById("moveList").childNodes[orders - 1]
					);
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
				if (orders < this.numSetActionData.length - 2) {
					this.$refs["moveList"].insertBefore(
						this.$refs["moveList"].childNodes[orders],
						document.getElementById("moveList").childNodes[orders + 2]
					);
				} else if (orders == this.numSetActionData.length - 2) {
					this.$refs["moveList"].appendChild(
						this.$refs["moveList"].childNodes[orders]
					);
				} else {
					return;
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
				this.$ajax.post("/vos/num400config/saveBasic", {
					num400BasicConfig: data
				});
			},
			addNumSetAction() {
				var numSetAction = "";
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
							actionName: "lala"
						};
						break;
					}
				};
				let obj = this.createdSet();
				obj.businessType = numSetAction.type;
				obj.temName = numSetAction.temName;
				obj.order = numSetAction.order;
				obj.actionName = numSetAction.actionName;
				numSetAction ? this.numSetActionData.push(obj) : "";
			},
			createdSet() {
				var obj = {
					id: "",
					businessType: '',
					temName: '',
					order: 0,
					actionName: "一级",
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
					label: "一级 1",
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
				return obj;
			},
			updata(objData) {
				console.log(objData);
				var postdata = {};
				postdata.parentId = '';
				postdata.number400 = this.number400Data.number400;
				postdata.businessType = objData.businessType;
				if (objData.businessType == 'transfer') {
					let pData = [];
					objData.transfer.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.id = item.id;
						cData.ruleType = item;
						cData.workDestNumbers = objData.transfer.ruleConfig[item].codeWork.join(',');
						cData.nonWorkDestNumbers = objData.transfer.ruleConfig[item].codeUnWork.join(',');
						objData.transfer.ruleConfig[item].workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objData.transfer.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.transfer.ruleConfig[item].specificDate;
						};
						pData.push(cData);
					});
					this.sendUp('saveTransfer', pData)
				} else if (objData.businessType == 'playback') {
					let pData = [];
					objData.playback.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.id = item.id;
						cData.ruleType = item;
						objData.playback.ruleConfig[item].workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objData.playback.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.playback.ruleConfig[item].specificDate;
						};
						cData.voiceId = objData.playback.voiceType;
						pData.push(cData);
					});
					this.sendUp('savePlayback', pData)
				} else if (objData.businessType == 'IVR') {
					let pData = [];
					objData.IVR.ruleType.map(item => {
						let cData = Object.assign({}, postdata);
						cData.id = item.id;
						cData.ruleType = item;
						cData.actionName = objData.actionName;
						objData.IVR.ruleConfig[item].workTime.map((_item, _index) => {
							cData['workTime' + (_index + 1) + 'Start'] = _item[0];
							cData['workTime' + (_index + 1) + 'End'] = _item[1];
						});
						if (item == 'week' || item == 'month') {
							cData.specificDate = objData.IVR.ruleConfig[item].specificDate.join(',');
						} else {
							cData.specificDate = objData.IVR.ruleConfig[item].specificDate;
						};
						cData.voiceId = objData.IVR.voiceType;
						pData.push(cData);
					});
					this.sendUp('saveIVR', cData);
				}
			},
			sendUp(url, postdata) {
				this.$ajax.post('/vos/num400config/' + url, {
					num400TransferConfigs: postdata
				}).then(res => {
					if (res.code == 200) {
						this.$message.success(res.data);
					}
				});
			},
		}
	};
</script>