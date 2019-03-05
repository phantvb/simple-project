<template>
	<div id="ticketManage" class="managerFormTitle" v-loading="loading">
		<Aplayer name="Aplayer" model="auto" :music_url="$global.serverSrc+voiceSrc" v-if="player" v-show="false"></Aplayer>
		<el-tabs v-model="active">
			<el-tab-pane label="自助直销" name="self"></el-tab-pane>
			<el-tab-pane label="渠道" name="channel"></el-tab-pane>
			<div class="search" v-if="permission.indexOf(61)!=-1" @keyup.enter="fetchData()">
				<ul>
					<li>
						<span class="demonstration">企业名称：</span>
						<el-input v-model="form.companyName" placeholder="企业名称" size="small">
						</el-input>
					</li>
					<li>
						<span class="demonstration">时间：</span>
						<el-date-picker style="margin-right:15px;" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd 00:00:00" @change="fetchData()">
						</el-date-picker>
					</li>
				</ul>
				<ul>
					<li>
						<span class="demonstration">400号码：</span>
						<el-input v-model="form.number400" placeholder="请输入内容" size="small">
						</el-input>
					</li>
					<li>
						<span class="demonstration">主叫号码：</span>
						<el-input v-model="form.callingNumber" placeholder="请输入内容" size="small">
						</el-input>
					</li>
					<li>
						<span class="demonstration">被叫号码：</span>
						<el-input v-model="form.calledNumber" placeholder="请输入内容" size="small">
						</el-input>
					</li>
				</ul>
				<div class="block left">
					<div style="float:left;margin-right:15px;">
						<span class="demonstration">通话时长：</span>
						<el-input v-model="form.callDurationStart" size="small" style="max-width:100px;">
						</el-input>
						<span class="demonstration"> - </span>
						<el-input v-model="form.callDurationEnd" size="small" style="max-width:100px;">
						</el-input>
						<span class="demonstration"> 秒</span>
					</div>
					<el-button type="primary" size="small" style="width:80px;" @click="fetchData()">搜索</el-button>
					<el-button type="primary" plain size="small" style="width:80px;" @click="reset">重置</el-button>
				</div>
			</div>
			<section class="right block lineTop">
				<el-button type="primary" plain size="small" @click="outPut" v-if="permission.indexOf(62)!=-1">导出</el-button>
			</section>
			<el-table :data="tableData" style="width: 100%;margin-bottom:15px;">
				<el-table-column prop="companyName" label="企业名称" min-width="100">
				</el-table-column>
				<el-table-column prop="number400" label="400号码" min-width="100">
				</el-table-column>
				<el-table-column prop="callingNumber" label="主叫号码" min-width="100">
				</el-table-column>
				<el-table-column prop="calledNumber" label="被叫号码" min-width="100">
				</el-table-column>
				<el-table-column prop="createTime" label="时间" min-width="120">
				</el-table-column>
				<el-table-column prop="callDuration" label="通话时长（秒）" min-width="100">
				</el-table-column>
				<el-table-column prop="name" label="操作" min-width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="listen(scope.row.recordAddress)" v-if="permission.indexOf(63)!=-1">试听</el-button>
						<el-button size="small" type="text" @click="showTicketDetail(true,scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.num" :page-sizes="$global.pageSize" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
			</el-pagination>
		</el-tabs>
		<ticketDetail :show="ticketDetailShow" @close="showTicketDetail(false)" :data="ticketDetailData"></ticketDetail>

	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>
<script>
	import ticketDetail from './component/ticketDetail.vue'
	import Aplayer from '../component/Aplayer/a_player.vue'
	export default {
		name: 'ticketManage',
		components: {
			ticketDetail,
			Aplayer
		},
		data() {
			return {
				active: 'self',
				form: {
					companyName: '',
					number400: '',
					callingNumber: '',
					calledNumber: '',
					callDurationStart: '',
					callDurationEnd: '',
					time: []
				},
				voiceSrc: 'c9965168-20a9-40ef-9858-1827256a119d.mp3',
				ticketDetailShow: false,
				ticketDetailData: {},
				status: '',
				options: [{
					value: '',
					label: '全部'
				}, {
					value: '选项2',
					label: '启用'
				}, {
					value: '选项3',
					label: '停用'
				}],
				tableData: [],
				page: {
					num: 1,
					size: 10,
					total: 1
				},
				loading: false,
				player: false,
				permission: []
			}
		},
		watch: {
			active(n, o) {
				this.fetchData();
			}
		},
		mounted() {
			this.fetchData();
			this.$store.getters.getPermission(location.hash.replace(/#/, '')).map(item => {
				this.permission.push(item.id);
			});
		},
		methods: {
			reset() {
				this.$clear(this.form);
				this.fetchData();
			},
			outPut() {
				window.open('/vos/excel/callRecord');
			},
			listen(src) {
				if (this.voiceSrc != src) {
					this.voiceSrc = src;
					this.player = false;
					this.$nextTick(() => {
						this.player = true;
					});
				} else {
					this.player = false;
				}
			},
			showTicketDetail(bol, data) {
				this.ticketDetailData = data || {};
				this.ticketDetailShow = bol;
			},
			handleSizeChange() {
				this.fetchData();
			},
			handleCurrentChange(val) {
				this.fetchData(val);
			},
			fetchData(pageNum) {
				var data = {};
				this.loading = false;
				this.page.num = pageNum || 1;
				data.page = {
					pageNo: this.page.num,
					pageSize: this.page.size
				};
				data.callRecords = {};
				data.callRecords.channel = this.active;
				data.callRecords.companyName = this.form.companyName;
				data.callRecords.number400 = this.form.number400;
				data.callRecords.callingNumber = this.form.callingNumber;
				data.callRecords.calledNumber = this.form.calledNumber;
				data.callDurationStart = this.form.callDurationStart;
				data.callDurationEnd = this.form.callDurationEnd;
				data.timeStart = this.form.time[0] || '';
				data.timeEnd = this.form.time[1] || '';
				this.$ajax.post("/vos/callRecord/search", data).then(res => {
					if (res.code == 200) {
						this.loading = false;
						this.tableData = res.data.callRecordList;
						this.page.total = res.data.totalCount;
					}
				});
			}
		}
	}
</script>