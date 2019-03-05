<template>
	<div id="voiceEdit" class="numDialog">
		<el-dialog title="新增/编辑语音文件" class="left" :visible.sync="dialogVisible" @close="close" v-if="dialogVisible" :close-on-click-modal="false">
			<div class="block">
				<div class="form_item">
					<div class="form_title right">企业名称：</div>
					<div class="form_con">
						<el-input v-model="vData.business.companyName" size="small" placeholder="请输入企业名称，在列表中选择企业">
						</el-input>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">400号码：</div>
					<div class="form_con">
						<el-select v-model="detail.number400" filterable remote reserve-keyword placeholder="请输入400号" :remote-method="remoteMethod" :loading="loading" size="small" value-key="id">
							<el-option v-for="(item,index) in numberOptions" :key="index" :label="item.number400" :value="item.number400">
							</el-option>
						</el-select>
						<el-button type="primary" size="small">搜索</el-button>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">语音文件：</div>
					<div class="form_con">
						<el-table :data="voiceData" border style="width: 100%;margin-bottom:30px;">
							<el-table-column prop="voiceType" label="语音类型" min-width="100">
								<template slot-scope="scope">
									<div>
										<el-select v-model="scope.row.voiceType" placeholder="请选择" size="small">
											<el-option v-for="item in voiceTypeList" :key="item.dicKey" :label="item.dicValue" :value="item.dicKey">
											</el-option>
										</el-select>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="voiceName" label="语音名称" min-width="100">
								<template slot-scope="scope">
									<div>
										<el-input v-model="scope.row.voiceName" placeholder="请输入内容" size="small"></el-input>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="voiceFile" label="语音文件" min-width="150">
								<template slot-scope="scope">
									<el-upload size="small" action="/vos/common/uploadVoice" :http-request="uploadFile" :file-list="scope.row.voicefiles" :before-upload="beforeAvatarUpload" accept=".flv,.mp3,.wma,.swf,.wmv,.mid,.avi,.mpg,.asf,.rm,.rmvb" :limit="1">
										<el-button size="small" type="primary" @click="activeIndex=scope.$index">点击上传</el-button>
									</el-upload>
								</template>
							</el-table-column>
							<el-table-column prop="operation" label="操作" min-width="100">
								<template slot-scope="scope">
									<div>
										<el-button size="small" type="text" @click="addVoice(true)">添加</el-button>
										<el-button size="small" type="text" @click="addVoice(false,scope.$index)">删除</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<p class="grey fmini">支持flv、mp3、wma、swf、wmv、mid、avi、mpg、<br>asf、rm、rmvb格式，文件需小于10M</p>
					</div>
				</div>
				<div class="form_item">
					<div class="form_title right">增值资费：</div>
					<div class="form_con">
						彩铃制作
						<div class="search padding">
							<div v-for="item in valueAddedList" :key="item.id">
								<p>功能资费：{{item.tariffFee+'元'}}</p>
								<p v-if="item.presents==1">是否赠送：赠送</p>
								<p v-if="item.presents==2">是否赠送：付费</p>
								<p>功能备注：{{item.remarks}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="greyline"></div>
			<footer class="right">
				<el-button type="primary" size="small" @click="submit">确定</el-button>
				<el-button type="primary" size="small" plain @click="close">取消</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import "./common.scss";
</style>

<script>
	export default {
		name: "voiceEdit",
		props: ["show", "vData"],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			},
			'vData.flowId': function (n, o) {
				if (n != undefined) {
					this.getData(this.vData.flowId);
				};
			}
		},
		data() {
			return {
				loading: false,
				detail: {
					id: '',
					number400: '',
					flowId: ''
				},
				activeIndex: '',
				voiceData: [],
				dialogVisible: false,
				voiceTypeList: [],
				valueAddedList: [],
				numberOptions: []
			};
		},
		created() {
			this.getVoiceType();
			this.getValueAdded();
		},
		methods: {
			close(bol) {
				this.$emit("close", false, null, bol);
			},
			submit() {
				var data = {};
				data.number400 = this.detail.number400;
				data.companyFlow = {
					id: this.detail.id,
					flowId: this.detail.flowId
				};
				data.voice = this.voiceData;
				this.$ajax.post('/vos/voice/updateAuditDirectly', data).then(res => {
					if (res.code == 200) {
						this.close(true);
					}
				});
			},
			addVoice(bol, index) {
				if (bol) {
					this.voiceData.push({
						id: '',
						voicefiles: [],
						voicename: "",
						voicetype: ""
					})
				} else {
					this.voiceData.splice(index, 1);
				}
			},
			getVoiceType() {
				this.$ajax.post('/vos/dic/getDicsByType', {
					"dicType": "voiceType",
					"status": "1"
				}).then((res) => {
					if (res.code == 200) {
						this.voiceTypeList = res.data.dicList;
					}
				})
			},
			getValueAdded(val) {
				this.$ajax.post('/vos/tariffPackage/getValueAdded', {
					valueAdded: {
						id: sessionStorage.getItem('businessType') == "self" ? 43 : 44
					}
				}).then((res) => {
					if (res.code == 200) {
						this.valueAddedList = res.data.valueAddedList;
					}
				})
			},
			getData(flowId) {
				this.$ajax.get('/vos/voice/getCacheData?flowId=' + flowId).then(res => {
					if (res.code == 200) {
						res.data.voice.map(item => {
							item.voicefiles = [{ name: item.voiceFile }];
						});
						this.voiceData = res.data.voice;
						this.detail = res.data.companyFlow;
						this.detail.number400 = res.data.number400;
					}
				});
			},
			beforeAvatarUpload(file) {
				const isVoiceType = file.type === 'audio/flv' || file.type === 'audio/mp3' || file.type === 'audio/wma' || file.type === 'audio/swf' || file.type === 'audio/wmv' || file.type === 'audio/mid' || file.type === 'audio/avi' || file.type === 'audio/mpg' || file.type === 'audio/asf' || file.type === 'audio/rm' || file.type === 'audio/rmvb';
				const isVoiceSize = file.size / 1024 / 1024 < 10;
				if (!isVoiceType) {
					this.$message.error('上传的语音文件只能是 flv、mp3、wma、swf、wmv、mid、avi、mpg、asf、rm、rmvb 格式!');
				} else if (!isVoiceSize) {
					this.$message.error('上传的语音文件大小不能超过 10MB!');
				}
				return isVoiceType && isVoiceSize;
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					this.$ajax.post('/vos/num400config/search', {
						page: {
							pageNo: 1,
							pageSize: 20
						},
						number400: {
							number400: query,
							channel: this.active,
							status: "CanUse"
						}
					}).then(res => {
						if (res.code == 200) {
							this.loading = false;
							this.numberOptions = res.data.number400s;
						}
					})
				} else {
					this.numberOptions = [];
				}
			},
			uploadFile(file) {
				let form = new FormData();
				form.append('voice', file.file);
				this.$ajax.post('/vos/common/uploadVoice', form).then(res => {
					this.voiceData[this.activeIndex].voiceFile = res;
				})
			}
		}
	};
</script>