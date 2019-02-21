<template>
	<!--新增/编辑语音弹窗-->
	<div class="voiceDialog">
		<el-dialog :title="voiceIn==1?'新增语音文件':'编辑语音文件'" :visible.sync="visibleVoice" width="55%" :before-close="handleClose">
			<div>
				<el-form ref="voiceForm" :model="voiceForm" label-width="90px" class="voiceForm">
					<div class="voiceMsg">

						<el-form-item label="400号码：" class="type">
							<el-input v-model="voiceForm.voiceNum" size="mini" @input="searchNum400"></el-input>
							<div id="numList" v-if="numShow">
								<ul>
									<li v-for="(item,index) in num400List" :key="index" @click="num400Lists(item)">{{item.number400 +"("+item.companyName+")"}}</li>
								</ul>
							</div>
						</el-form-item>

						<el-form-item label="企业名称：" class="input">
							<el-input v-model="voiceForm.firmName" size="mini" @input="searchFirm" :disabled="msgDisabled"></el-input>
							<div id="firmNameList" v-if="firmNameShow">
								<ul>
									<li v-for="(item,index) in firmNameList" :key="index" @click="firmNameLi(item)">{{item.companyName}}</li>
								</ul>
							</div>
						</el-form-item>

						<el-table :data="tableData" border @row-click="rowInfo" style="width: 100%;margin-bottom:30px;">

                            <el-table-column
                                    prop="voiceType"
                                    label="语音类型"
                                    width="180">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-select v-model="scope.row.voiceType" placeholder="请选择" size="mini" @change="voiceTypeChange">
                                                    <el-option
                                                            v-for="item in voiceTypeList"
                                                            :key="item.dicKey"
                                                            :label="item.dicValue"
                                                            :value="item.dicKey">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="voiceName"
                                    label="语音名称"
                                    width="180">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-input
                                                        v-model="scope.row.voiceName"
                                                        @input="voiceNameChange"
                                                        placeholder="请输入内容" size="mini"></el-input>
                                            </div>
                                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="voicefiles"
                                    label="语音文件">
                                        <template slot-scope="scope">
                                            <el-upload action=""
                                                       size="mini"
                                                       :file-list="scope.row.voicefiles"
                                                       :on-change="handleChange"
                                                       :http-request="uploadFile"
                                                       :before-upload ="beforeAvatarUpload"
                                                       accept=".flv,.mp3,.wma,.swf,.wmv,.mid,.avi,.mpg,.asf,.rm,.rmvb"
                                                       :limit="1">
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </template>
                            </el-table-column>

							<el-table-column prop="operation" label="操作">
								<template slot-scope="scope">
									<div>
										<el-button size="mini" type="text">删除</el-button>
										<el-button size="mini" type="text"></el-button>
										<el-button size="mini" type="text" @click="add(scope)" v-if="tableData.length-1 == scope.$index">添加</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
						<p style="text-align: left">注解：语音文件支持flv、mp3、wma、swf、wmv、mid、avi、mpg、asf、rm、rmvb格式，文件需小于10M</p>

						<el-form-item label="增值资费：">
							<div class="addValueSelect">
								<!--<el-select v-model="voiceForm.addValueType" placeholder="请选择"  size="mini" @change="addValueChange">-->
								<!--<el-option :label="item.tariffName" :value="item.id" v-for="item in voiceList" :key="item.id"></el-option>-->
								<!--</el-select>-->
								<span>彩铃制作</span>
							</div>
							<div class="objCodeBox">
								<div class="valAddSer">
									<div v-for="item in valueAddedList">
										<p>功能资费：{{item.tariffFee+'元'}}</p>
										<p v-if="item.presents==1">是否赠送：赠送</p>
										<p v-if="item.presents==2">是否赠送：付费</p>
										<p>功能备注：{{item.remarks}}</p>
									</div>
								</div>
							</div>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" v-if="saveBtnHidden" @click="voiceSave()">暂存信息</el-button>
				<el-button type="primary" @click="voiveAudit()" size="mini">送 审</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
    import {mapState} from "vuex";
    export default {
        name: 'dialogVoice',
        props:[
        ],
        data() {
            return{
                visibleVoice:false,
                firmNameShow:false,
                numShow:false,
                firmNameList:[],
                num400List:[],
                voiceIn:1,
                voiceForm:{
                    firmName:'',
                    voiceNum:'',
                    voicefiles:'',
                    voiceName:'',
                    voiceNumAndFile:'',
                    addValueType:'',
                },
                voiceInfo:{
                    voiType:'',
                    voiName:'',
                },
                voiceList:[],
                tableData:[{
                    voiceType:'',
                    voiceName:'',
                    voicefiles:[],
                }],
                voiceTypeList:[],
                businessType:'', //登录信息
                file: '',
                voicefiles:[],    //语音文件
                changeVoiceType:'',//语音类型
                addValueId:'',
                valueAddedList:'', //资费增值信息数组
                num400Unit:'',
                companyId:'',      //公司id
                // companyInfo:'',    //公司信息
                busIdentity:'',     //登录信息channel
                voiceFlowId:'',     //语音表格flowId
                saveBtnHidden:true,
            }
        },
        created(){
            console.log(sessionStorage.getItem("voiceIn"));
            this.$root.eventHub.$on('dialog1VisibleVoice', (res)=>{
                console.log('voiceInfo',res);
                if(res.voiceIn){
                    this.voiceIn = res.voiceIn;
                    this.visibleVoice=res.visibleVoice;
                    if(res.voiceIn==1){
                        this.voiceIn=res.voiceIn;
                        this.voiceForm.firmName='';
                        this.voiceForm.voiceNum='';
                        this.voiceInfo.voiType='';
                        this.voiceInfo.voiName='';
                        this.voiceForm.addValueType='';
                        this.tableData=[{
                            voiceType:'',
                            voiceName:'',
                            voicefiles:[],
                        }];
                        this.tableData.map((item)=>{
                            item.voicefiles = [];
                        });
                    }else if(res.voiceIn==3) {
                        this.saveBtnHidden=false;
                        this.voiceFlowId=(res.voiceIn==3)?sessionStorage.getItem('entireFlowId'):res.flowId;
                    }else {
                        console.log("res.voiceIn",res.voiceIn);
                        this.voiceIn = res.voiceIn;
                        console.log("this.voiceIn",this.voiceIn);
                        this.voiceFlowId=(res.voiceIn==2)?sessionStorage.getItem('entireFlowId'):res.flowId;
                        this.voiceDetail();
                    }
                }

			});

			console.log(sessionStorage.getItem('businessType'));
			console.log("entireFlowId", sessionStorage.getItem('entireFlowId'));
			this.busIdentity = sessionStorage.getItem('businessType');
			this.getValueAdded(this.busIdentity);
			this.addValueChange(this.busIdentity);
			this.voiceType();


		},
		components: {},
		methods: {
			//弹窗关闭按钮
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
						this.$root.eventHub.$emit('voiceList');
					})
					.catch(_ => {});
			},
			handleChange(file) {
				this.file = file.raw
				console.log(file);
			},
			rowInfo(val, event) {
				console.log("rowInfo", val);
				console.log("event", event);
			},
			// 企业模糊搜索
			searchFirm(val) {
				console.log(val);
				this.$ajax.get('/vos/company/fuzzySearch?company=' + this.voiceForm.firmName).then((res) => {
					console.log(res.data);
					this.firmNameList = res.data;
					if (this.voiceForm.firmName != '' && this.firmNameList.length != 0) {
						this.firmNameShow = true;
					}
				})
			},

			//企业名称li
			// firmNameLi(val){
			//     console.log(val);
			//     this.voiceForm.firmName = val.companyName;
			//     this.firmNameShow = false;
			//     this.companyInfo = val;
			//     this.companyId = val.id;
			// },
			searchNum400() {
				this.$ajax.post('/vos/num400config/search', {
					"page": {
						"pageNo": "1",
						"pageSize": "50"
					},
					"number400": {
						"number400": this.voiceForm.voiceNum,
					}
				}).then((res) => {

                    console.log(res.data.number400s);
                    this.num400List = res.data.number400s;
                    if(this.voiceForm.voiceNum!='' && this.voiceForm.length!=0){
                        this.numShow = true;
                    }
                    res.data.number400s.map((item)=>{
                        if(item.companyName == this.voiceForm.firmName){
                            this.changeMsgDisabled(true);
                        }else {
                            this.changeMsgDisabled(false);
                        }
                    })
                })
            },
            //400号码li
            num400Lists(val){
                console.log(val);
                this.voiceForm.voiceNum = val.number400;
                if(this.voiceForm.firmName = val.companyName){
                    this.changeMsgDisabled(true);
                }
                this.numShow = false;
                this.$ajax.get('/vos/voice/getAllBy400?number400='+this.voiceForm.voiceNum).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.voice);
                    // if(res.data.voice.length!=0){
                        this.tableData = res.data.voice;
                        this.tableData.push({
                            voiceType:'',
                            voiceName:'',
                            voicefiles:[],
                        });
                    // }
            });
                this.voiceForm.firmName = val.companyName;
                this.companyId = val.companyId;
            },
            add(scope){
                console.log(scope);
                console.log(this.tableData.length);
                this.tableData.push({
                    voiceType:'',
                    voiceName:'',
                    voicefiles:[],
                })
            },
            // 文件上传限制
            beforeAvatarUpload(file){
                console.log(file.type);
                const isVoiceType = file.type === 'audio/flv'|| file.type ==='audio/mp3' || file.type ==='audio/wma' || file.type ==='audio/swf'|| file.type ==='audio/wmv' || file.type ==='audio/mid' || file.type ==='audio/avi' || file.type ==='audio/mpg' || file.type ==='audio/asf' || file.type ==='audio/rm' || file.type ==='audio/rmvb';
                const isVoiceSize = file.size / 1024 / 1024 < 10;

				if (!isVoiceType) {
					this.$message.error('上传的语音文件只能是 flv、mp3、wma、swf、wmv、mid、avi、mpg、asf、rm、rmvb 格式!');
				}
				if (!isVoiceSize) {
					this.$message.error('上传的语音文件大小不能超过 10MB!');
				}
				return isVoiceType && isVoiceSize;
			},
			// 自定义上传
			uploadFile(item, item1) {
				let form = new FormData();
				form.append('voice', this.file);
				this.$ajax.post('/vos/common/uploadVoice', form).then((res) => {
					console.log(res);
					console.log(this.tableData);
					this.voicefiles = res;
				})

            },
            // 语音类型选择
            voiceTypeChange(val){
                console.log("语音类型",val);
                this.changeVoiceType = val;
            },
            //语音名字监听
            voiceNameChange(val){
                console.log(val);
            },
            // 增值资费列表
            getValueAdded(val){
                console.log(val);
                this.businessType = val;
                this.$ajax.post('/vos/tariffPackage/getValueAdded',{
                    "valueAdded":{
                        "id":"",
                        "channel":this.businessType
                    }
                }).then((res)=>{
                    if(res.code==200){
                        console.log(res.data.valueAddedList);
                        this.voiceList =res.data.valueAddedList;
                    }
                })
            },
            // 增值资费切换
            addValueChange(val){
                console.log(val);
                this.businessType=val;
                console.log(this.businessType);
                this.$ajax.post('/vos/tariffPackage/getValueAdded',{
                    "valueAdded":{
                        "channel":this.businessType,
                        "id":this.businessType=="self"?43:44,
                    }
                }).then((res)=>{
                    if(res.code==200){
                        console.log(res.data.valueAddedList);
                        this.valueAddedList =res.data.valueAddedList;
                        console.log(this.valueAddedList[0].id);
                    }
                })
            },
            // 语音类型
            voiceType(){
                this.$ajax.post('/vos/dic/getDicsByType',{
                    "dicType":"voiceType",
                    "status":"1"
                }).then((res)=>{
                    console.log(res);
                    console.log(res.data);
                    if(res.code==200){
                        this.voiceTypeList = res.data.dicList;
                    }
                })
            },
            // 暂存
            voiceSave(){
                console.log(this.voicefiles);
                console.log(this.voiceIn);
                var companyInfo = {};
                companyInfo.companyName = this.voiceForm.firmName;
                companyInfo.id = this.companyId;
                this.tableData.map((item)=>{
                    item.id = this.companyId;
                    item.companyid = this.companyId;
                    item.number400 = this.voiceForm.voiceNum;
                    item.valueaddedid = this.valueAddedList[0].id;
                    item.voiceFile=this.voicefiles;
                });
                this.$ajax.post('/vos/voice/startAndSave',{
                    "number400":this.voiceForm.voiceNum,
                    "voice":this.tableData,
                    "companyFlow":{
                        "flowId":this.voiceIn==2?this.voiceFlowId:""
                    },
                    "company": companyInfo,
                }).then((res)=>{
                    console.log(res);
                    if(res.code==200){
                        this.visibleVoice = false;
                        this.$root.eventHub.$emit('addAcceptSave', null);
                        this.$root.eventHub.$emit('voiceList');
                    }else{
                        if(res.message){
                            this.$message.warning(res.message);
                        }else{
                            this.$message.warning("message为空null");
                        }
                    }
                })
            },
            // 语音送审
            voiveAudit(){
                var companyInfo = {};
                companyInfo.companyName = this.voiceForm.firmName;
                companyInfo.id = this.companyId;
                this.tableData.map((item)=>{
                    item.id = this.companyId;
                    item.companyid = this.companyId;
                    item.number400 = this.voiceForm.voiceNum;
                    item.valueaddedid = this.valueAddedList[0].id;
                });
                this.$ajax.post('/vos/voice/sendToVoiceAudit',{
                    "number400":this.voiceForm.voiceNum,
                    "voice":this.tableData,
                    "companyFlow":{
                        "flowId":this.voiceIn==2?this.voiceFlowId:""
                    },
                    "company": companyInfo,
                }).then((res)=>{
                    console.log(res);
                    if(res.code==200){
                        this.visibleVoice = false;
                        this.$root.eventHub.$emit('addAcceptSave', null);
                        this.$root.eventHub.$emit('voiceList');
                    }else{
                        this.$message.warning(res.message);
                    }
                })
            },
            // 语音详情
            voiceDetail(){
             console.log(this.voiceFlowId);
             this.$ajax.get('/vos/voice/getCacheData?flowId='+this.voiceFlowId).then((res)=>{
                 console.log(res.data);
                 this.voiceForm.voiceNum = res.data.number400;
                 this.tableData = res.data.voice;
                 this.voiceForm.firmName = res.data.company.companyName;
                 this.companyId = res.data.company.id;
                 this.tableData.map((item)=>{
                     let sss=[];
                     sss.push({
                         name:item.voiceFile,
                         url:item.voicefiles
                     });
                     item.voicefiles = sss;
                 });

				})
			},
			changeMsgDisabled(val) {
				return this.$store.dispatch("changeMsgDisabledStatus", val);
			},
			// getCacheData(val){
			//     console.log(val);
			//     this.$ajax.get('/vos/destnum/getCacheData?flowId='+this.voiceFlowId).then((res)=>{
			//         console.log(res.data);
			//         if(res.code==200){
			//             if(val=='详情'){
			//                 this.$router.push({
			//                     path:'/BusinessAccepted/voiceDetial',
			//                     query: {
			//                         flowId: this.voiceFlowId,
			//                         status:this.voiceStatus ,
			//                         assigneeRole:this.voiceAssigneeRole,
			//                         creators:this.voiceCreator,
			//                     }
			//                 });
			//             }else if(val=='送审'){
			//                 this.$root.eventHub.$emit('dialog1VisibleVoice',{visibleVoice:true,voiceIn:2});
			//             }
			//         }
			//     })
			// },
		},
		computed: {
			...mapState({
				msgDisabled: state => state.createActivities.msgDisabled,
			})
		},
		watch: {},
	}
</script>
<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>