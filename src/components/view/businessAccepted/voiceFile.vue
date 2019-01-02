<template>
	<div id="voiceFile">
		<!--新增/编辑弹窗-->
		<div class="voiceDialog">
			<el-dialog
					:title="voiceIn==1?'新增语音文件':'编辑语音文件'"
					:visible.sync="dialogVisible"
					width="40%"
					:before-close="handleClose">
				<div>
					<el-form ref="voiceForm" :model="voiceForm" label-width="90px" class="voiceForm">
						<div class="objCodeMsg">
							<el-form-item label="企业名称：" class="input">
								<el-input v-model="voiceForm.firmName" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="400号码：" class="type">
								<el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">
									<el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>
								</el-select>
								<el-button type="primary" size="mini">搜索</el-button>
							</el-form-item>

							<el-form-item label="语音类型：" class="type">
								<el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">
									<el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="语音文件：" class="voiceType">
								<el-input v-model="voiceForm.voiceFile" size="mini"></el-input>
								<el-button type="primary" size="mini">上传</el-button>
							</el-form-item>

							<el-form-item label="语音名称：" class="input">
								<el-input v-model="voiceForm.voiceName" size="mini"></el-input>
							</el-form-item>

							<el-form-item label="增值资费：" class="type">
								<el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">
									<el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-input
									type="textarea"
									autosize
									placeholder="请输入内容"
									v-model="textarea2">
							</el-input>
						</div>
					</el-form>
				</div>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">暂存信息</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="mini">送 审</el-button>
        </span>
			</el-dialog>
		</div>

		<!--搜索-->
		<div class="handlingForm">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="searchInput">
					<el-form-item label="企业名称：">
						<el-input v-model="form.firmName" size="mini"></el-input>
					</el-form-item>

					<el-form-item label="时间：">
						<el-date-picker
								size="mini"
								v-model="form.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="400电话：">
						<el-input v-model="form.phoneNum" size="mini"></el-input>
					</el-form-item>

					<el-form-item class="searchBtn">
						<el-button type="primary" size="mini">搜索</el-button>
						<el-button @click="resetForm('form')" size="mini">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<!--表格-->
		<div class="entireTable">
			<!--表格按钮和下拉框-->
			<div class="BtnSelect">
				<div class="accountBtn">
					<el-button type="primary" size="mini" @click="voiceIn=1,voiceAdd()">+新增语音文件</el-button>
				</div>
				<div class="accountSelect">
					<el-select v-model="accountStatus" placeholder="请选择" size="mini">
						<el-option
								v-for="item in statusOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</div>

			<el-table
					:data="tableData"
					style="width: 100%">
				<el-table-column
						prop="firmName"
						label="企业名称"
						width="300">
				</el-table-column>

				<el-table-column
						prop="fourPhone"
						label="400电话">
				</el-table-column>

				<el-table-column
						prop="voiceType"
						label="语音类型">
				</el-table-column>

				<el-table-column
						prop="fileName"
						label="文件名称">
				</el-table-column>

				<el-table-column
						prop="date"
						label="日期">
				</el-table-column>

				<el-table-column
						prop="status"
						label="状态">
				</el-table-column>

				<el-table-column
						prop="status"
						label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="text">试听</el-button>
						<el-button size="mini" type="text" @click="voiceDetial(scope.row),$router.push('/voiceDetial/')">详情</el-button>
						<el-button size="mini" type="text" @click="voiceIn=2,voiceAdd()">编辑</el-button>
						<el-button size="mini" type="text">送审</el-button>
						<el-button size="mini" type="text">删除</el-button>
						<!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
						<!--</router-link>-->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
		</el-pagination>
	</div>
</template>
<script>
	export default {
		name: 'voiceFile',
		data() {
			return {
                dialogVisible:false,
                voiceIn:1,
                active:4,
                form:{
                    firmName:'',
                    phoneNum:'',
                    time:'',
                    receiver:'',
                },
                voiceForm:{
                    firmName:'',
                    fourNum:'',
                    voiceType:'',
                    voiceFile:'',
                    voiceName:'',
                },
                tableData: [{
                    firmName: '杭州顺网科技股份有限公司',
                    fourPhone: '5876552',
                    voiceType:'MP4',
                    fileName:'轻音乐',
                    date:'2019/01/01',
                    status:'等待送核'
                }],
                statusOptions: [
                    {
                        value: '1',
                        label: '等待审核'
                    }, {
                        value: '2',
                        label: '待审核'
                    }, {
                        value: '3',
                        label: '审核通过'
                    },
                    {
                        value: '4',
                        label: '被驳回'
                    }
                ],
                voiceList:[{
                    value:'1',
                    title:'彩铃',
				},{
                    value:'2',
                    title:'导航音',
				}],
                accountStatus:'',
                currentPage: 4,   //分页
                textarea2:'',
			};
		},
		components: {},
		methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //弹窗关闭按钮
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            voiceAdd(){
                this.dialogVisible = true;
			},
            voiceDetial(scope){
               console.log(scope);
			}
		},
		computed: {}
	}
</script>
<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>
