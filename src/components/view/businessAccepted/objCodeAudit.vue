<template>
	<div id="objCodeAudit">
		<!--搜索-->
		<div class="handlingForm">
			<el-form ref="form" :model="form" label-width="100px">
				<div class="objCodeSearch">
					<el-form-item label="企业名称：">
						<el-input v-model="form.firmName" size="mini"></el-input>
					</el-form-item>
                    <el-form-item label="400电话：">
                        <el-input v-model="form.phoneNum" size="mini"></el-input>
                    </el-form-item>
					<el-form-item label="创建时间：">
						<!--<el-date-picker size="mini" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">-->
						<!--</el-date-picker>-->
                        <el-date-picker
                                v-model="form.time"
                                size="mini"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
					</el-form-item>

					<el-form-item class="searchBtn">
						<el-button type="primary" size="mini" @click="objCodeLists()">搜索</el-button>
						<el-button @click="resetForm()" size="mini">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<!--表格-->
		<div class="entireTable">
			<!--表格按钮和下拉框-->
			<div class="BtnSelect">
				<div class="accountBtn">
					<el-button type="primary" size="mini" @click="addObjCodeBtn()" v-if="authority.indexOf(110)!=-1">+新增目的码</el-button>
				</div>
				<div class="accountSelect">
					<span style="font-size:12px">状态:</span>
					<el-select v-model="accountStatus" placeholder="请选择" size="mini" @change="statusChange">
						<el-option v-for="item in statusOptions" :key="item.dicKey" :label="item.dicValue" :value="item.dicKey">
						</el-option>
					</el-select>
					<el-button type="primary" plain size="mini">导出</el-button>
				</div>
			</div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="business.companyName" label="企业名称" width="250">
				</el-table-column>

				<el-table-column prop="business.number400" label="400电话">
				</el-table-column>

				<el-table-column prop="assignee" label="受理人">
				</el-table-column>

				<el-table-column prop="createTime" label="创建时间">
				</el-table-column>

				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<span :style="{color:scope.row.color}" size="mini" type="text">{{scope.row.status}}</span>
					</template>
				</el-table-column>

        <el-table-column
                prop="operation"
				width="250"
                label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-for="(item,index) in scope.row.btnList" :key="index" @click="details(item.label,scope.row)">{{item.label}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageObj.total">
    </el-pagination>
  </div>
</template>
<script>
    import DialogObjCode from './dialogObjCode';
    import {formatDate} from '../../../utils/screen';
    export default {
        name: 'objCodeAudit',
        data() {
            return {
                dialog1Visible:false,
                firmNameShow:false,
                numShow:false,
                dialogVisible:false, //新增、编辑目的码弹窗显示状态
                objCodeIn:1,
                form:{
                    firmName:'',
                    phoneNum:'',
                    time:'',
                },
                acceptForm:{
                    firmId:'',
                    firmName:'',
                    usage:'',
                    imageUrl: '',    //上传图片
                    fourNum:'',
                    desc:'',
                    objCount:1,     //目的码数量
                    delObjCode:'',  //删减目的码
                },
                companyInfo:{   //企业信息

                },
                rules:{
                    firmName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    usage:[
                        { required: true, message: '请选择使用用途', trigger: 'change' }
                    ],
                    imageUrl:[
                        { required: true, message: '请上传目的码证明材料', trigger: 'change' }
                    ],
                    fourNum:[
                        { required: true, message: '请输入400号码', trigger: 'blur' }
                    ],
                },
                tableData: [],
                statusOptions: [],
                usage:[   //证件类型
                    {
                        value: 'DestNum_Auditing',
                        label: '审核中'
                    }, {
                        value: 'Audit_Success',
                        label: '审核通过'
                    }, {
                        value: 'Wait_To_Audit',
                        label: '等待送审'
                    }
                ],
                objCodeList:[], //目的码数组
                currentPage: 1,   //当前页
                accountStatus:'',
                addObjCode:'',  //添加目的码
                pageObj:{
                    total:0,
                    page:1,
                    pageSize:10,
                },
                searchNumPage:{
                    total:0,
                    page:1,
                    pageSize:10,
                },
                tariffFee:0, //功能资费
                presents:'1',  //是否赠送;1 赠送；2 付费
                remarks:'',  //功能描述
                flowId:'',
                companyId:'',
                baseData:{
                    roleName:'',
                    username:'',
                },
                objFlowId:'',  //目的码表格id
                objStatus:'',  //目的码表格状态
                objCreator:'', //目的码表格creator
                objCompanyId:'', //目的码表格companyId
                objAssigneeRole:'', //目的码表格assigneeRole
                authority:[],   //权限数组
            };
        },
        components: {
            DialogObjCode
        },
        created(){
            console.log("权限",this.$store.getters.getPermission(location.hash.replace(/#/, '')));
            this.$store.getters.getPermission(location.hash.replace(/#/, '')).map((item)=>{
                this.authority.push(item.id);
            });
            this.baseData.roleName = sessionStorage.getItem("roleName");
            this.baseData.username = sessionStorage.getItem("username");
            console.log("roleName",this.baseData.roleName);
            console.log("username",this.baseData.username);
            this.objCodeLists();
            this.statusList();
            this.$root.eventHub.$on('getLoginInfo', (resp)=>{
                this.addTariff(resp);
            } );
            this.$root.eventHub.$on('addAcceptSave', (resp) => {
                this.objCodeLists();
            });
        },
        methods: {
            // 分页
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                this.objCodeLists();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
                this.objCodeLists();
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
            // 新增目的码按钮
            addObjCodeBtn(){
                this.$root.eventHub.$emit('dialog1Visible',{visible:true,objCodeIn:1});
            },

            //新增目的码
            addObjCodes(){
                let unit = {};
                this.objCodeList.push(unit);
            },
            // 删除目的码
            delObjCodes(index){
                console.log(index);
                this.objCodeList.splice(index,1);
            },

            //点击详情
            details(val,objData){
                console.log(val);
                console.log(objData);
                let objCodeMsg = objData;
                this.objFlowId = objCodeMsg.flowId;
                this.objStatus = objCodeMsg.status;
                this.objCreator = objCodeMsg.creator;
                this.objCompanyId = objCodeMsg.companyId;
                this.objAssigneeRole = objCodeMsg.assigneeRole;
                sessionStorage.setItem('objFlowId',this.objFlowId);
                if(val=='送审'){
                    sessionStorage.setItem("objCodeIn",5);
                    this.getCacheData(val);
                }else if(val=='详情'){
                    console.log('详情入口');
                    console.log(this.objStatus);
                    // 详情接口
                    this.getCacheData(val);
                }else if(val=='通过审核'){
                    console.log("11111");
                    this.passCompany(val,objData);
                }else if(val=='驳回'){
                    console.log("22222");
                    this.backCompany(val,objData);
                }else if(val=='删除'){
                    this.$confirm('此操作将永久删除该业务, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.$ajax.post('/vos/business/deleteFlow',{
                            "companyFlow": objData
                        }).then((res)=>{
                            console.log(res);
                            this.objCodeLists();
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            //详情接口
            getCacheData(val){
                console.log(val);
                // this.$ajax.get('/vos/destnum/getCacheData?flowId='+this.objFlowId).then((res)=>{
                //     console.log(res.data);
                //     if(res.code==200){
                //         // this.companyInfo = res.data.company;
                //         // this.destNumInfo = res.data.destNumber;
                //         // let objCodeTableObj = {};
                //         // objCodeTableObj.number400 = res.data.number400;
                //
                //     }
                // })

                if(val=='详情'){
                    this.$router.push({
                        path:'/BusinessAccepted/objCodeDetail',   //跳转的路径
                        query:{                                   //路由传参时push和query搭配使用 ，作用时传递参数
                            flowId:this.objFlowId ,
                        }
                    })
                }else if(val=='送审'){
                    this.$root.eventHub.$emit('dialog1Visible',{visible:true,objCodeIn:5,flowId:this.objFlowId});
                }
            },

            async passCompany(val,data) {
                console.log(data);
                var obj = {};
                var url;
                if (data.status == 'Business_Auditing') {
                    //目的码审核通过
                    url = '/vos/destnum/auditPass';
                }
                obj.companyFlow = {
                    flowId: data.flowId,
                    creator: data.creator,
                    assigneeRole: data.assigneeRole
                };
                obj.message = await this.prompt(val);
                if (obj.message === false) {
                    return;
                }
                this.$ajax.post(url, obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success('操作成功');
                        this.fetchData(this.pageObj.page);
                    }
                });
            },
            async backCompany(val,data) {
                console.log(val);
                console.log(data);
                var obj = {};
                var url;
                //目的码驳回
                url = '/vos/destnum/auditReject';
                console.log(url);
                obj.companyFlow = {
                    flowId: data.flowId,
                    creator: data.creator,
                    assigneeRole: data.assigneeRole
                };
                obj.message = await this.prompt(val);
                if (obj.message === false) {
                    return;
                }
                this.$ajax.post(url, obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success('操作成功');
                        this.fetchData(this.pageObj.page);
                    }
                });
            },
            //通过审核和驳回弹窗
            prompt(data) {
                return this.$prompt('请输入审核意见', data, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    return value || '';
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                    return false;
                });
            },
            fetchData(pageNum) {
                this.loading = true;
                this.pageObj.page = pageNum || 1;
                var data = {};
                data.page = {
                    pageNo: this.pageObj.page,
                    pageSize: this.pageObj.pageSize
                };
                data.blacklist = Object.assign({}, this.form);
                data.blacklist.blackType = this.active;
                delete data.blacklist["time"];
                data.beforeTime = this.form.time[0] || '';
                data.afterTime = this.form.time[1] || '';
                this.$ajax.post("/vos/blacklist/search", data).then(res => {
                    if (res.code == 200) {
                        this.loading = false;
                        this.tableData = res.data.blacklists;
                        this.pageObj.total = res.data.totalCount;
                    }
                });
            },
            resetForm(){
                this.form.firmName='';
                this.form.phoneNum='';
                this.form.time='';
                this.objCodeLists();
            },
            // 目的码列表
            objCodeLists(){
                // console.log(this.form.time[0]);
                // console.log(this.form.time[1]);
                let dateStart = new Date(this.form.time[0]);
                let dateEnd = new Date(this.form.time[1]);
                // let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate()+dateStart.getHours()+':'+dateStart.getMinutes()+':'+dateStart.getSeconds();
                // let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()+dateStart.getHours()+':'+dateStart.getMinutes()+':'+dateStart.getSeconds();
                let dateStart_value = formatDate(dateStart,"yyyy-MM-dd hh:mm:ss");
                let dateEnd_value = formatDate(dateEnd,"yyyy-MM-dd hh:mm:ss");
                // console.log(dateStart_value);
                // console.log(dateEnd_value);
                console.log("companyName",this.form.firmName);

                this.$ajax.post('/vos/business/getBusinessFlowList',{
                    "type":"Destnum",
                    "dateStart":this.form.time[0]==undefined?'':dateStart_value,
                    "dateEnd":this.form.time[1]==undefined?'':dateEnd_value,
                    "companyName":this.form.firmName,
                    "status":this.accountStatus,
                    "source":'',
                    "number400":this.form.phoneNum,
                    "page":{
                        "pageNo":this.pageObj.page,
                        "pageSize":this.pageObj.pageSize,
                    }
                }).then((res)=>{
                    console.log(res.data.businessFlows);
                    this.tableData = res.data.businessFlows;
                    this.tableData.map((item)=>{
                        if(item.status=='Wait_To_Audit'){
                            item.color = '#67C23A';
                            item.status='等待送审';
                            item.btnList=[];
                            if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                                if(this.authority.indexOf(104)!=-1){
                                    item.btnList.push({label:'送审'})
                                }
                                if(this.authority.indexOf(128)!=-1){
                                    item.btnList.push({label:'删除'})
                                }
                                item.btnList.push({label:'详情'});
                            }else{
                                item.btnList.push({label:'详情'});
                            }
                        }else if(item.status=='Audit_Success'){
                            item.status='审核通过';
                            item.color = '#67C23A';
                            item.btnList=[];
                            if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                                item.btnList.push({label:'详情'});
                            }
                        }else if(item.status=='DestNum_Auditing'){
                            item.status='审核中';
                            item.color = '#F56C6C';
                            item.btnList=[];
                            if(this.baseData.roleName=='ROLE_admin' || item.assigneeRole==this.baseData.roleName){
                                if(this.authority.indexOf(105)!=-1){
                                    item.btnList.push({label:'审核通过'})
                                }
                                if(this.authority.indexOf(106)!=-1){
                                    item.btnList.push({label:'驳回'})
                                }
                                item.btnList.push({label:'详情'});
                            }else{
                                item.btnList.push({label:'详情'});
                            }
                        }else if(item.status=='Canceling_Auditing'){
                            item.status='注销审核';
                            item.color = '#F56C6C';
                            item.btnList=[];
                            if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                                if(this.authority.indexOf(105)!=-1){
                                    item.btnList.push({label:'审核通过'})
                                }
                                if(this.authority.indexOf(129)!=-1){
                                    item.btnList.push({label:'终止'})
                                }
                                item.btnList.push({label:'详情'});
                            }else{
                                item.btnList.push({label:'详情'});
                            }
                        }else if(item.status=='Cancelled'){
                            item.status='已注销';
                            item.color = '#67C23A';
                            item.btnList=[];
                            item.btnList.push({label:'详情'});
                        }else if(item.status=='Terminate_Flow'){
                            item.status='受理终止';
                            item.btnList=[];
                            item.btnList.push({label:'详情'});
                        }
                    })
                })
            },
            //状态列表
            statusList(){
                this.$ajax.post('/vos/dic/getDicsByType',{
                    "dicType":"flowType",
                    "status":this.accountStatus,
                }).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.dicList);
                    console.log(res.data.totalCount);
                    this.statusOptions = res.data.dicList;
                    this.pageObj.total = res.data.totalCount;
                    console.log(this.pageObj.total);
                })
            },
            //状态转换
            statusChange(val){
                this.statusList();
            },
            // 增值资费
            addTariff(val){
                console.log(val);
                let businessType = val.businessType;
                if(businessType=='self'){
                    businessType = 30;
                }else if(businessType=='channel'){
                    businessType = 31;
                }
                this.$ajax.get('/vos/blacklist/getValueAdded/'+businessType).then((res)=>{
                    // console.log(res);
                    // console.log(res.data);
                    // this.tariffFee = res.data.tariffFee;
                    // this.presents = res.data.presents;
                    // if(this.presents=='1'){
                    //     this.presents = '赠送';
                    // }else{
                    //     this.presents = '付费';
                    // }
                    // this.remarks = res.data.remarks;
                })
            },

            // 目的码暂存
            objCodeSave(acceptForm){
                this.$refs[acceptForm].validate((valid) => {
                    if (valid) {
                        let paramList=[];
                        this.objCodeList.map((item)=>{
                            let param={};
                            param.id=item.id;
                            param.destNumber=item.destNumber;
                            param.destnumproofpic=this.acceptForm.imageUrl;
                            param.destnumUsage=this.acceptForm.usage;
                            param.number400=this.acceptForm.fourNum;
                            param.companyid=this.acceptForm.firmId;
                            paramList.push(param);
                        });
                        if(this.objCodeList.length==0){
                            this.$message({type:'warning',message:'请新增目的码'});
                            return
                        }else{
                            this.objCodeList.map((item)=>{
                                if(item.destNumber==''){
                                    this.$message({type:'warning',message:'请填写或删除空的目的码'});
                                    return
                                }
                            })
                        };
                        this.$ajax.post('/vos/destnum/startAndSave',{
                            "destNumber":paramList,
                            "number400": this.acceptForm.fourNum,
                            "company":this.companyInfo,
                            "companyFlow":{
                                "flowId":""
                            }
                        }).then((res)=>{
                            console.log(res);
                            if(res.code==200){
                                this.dialogVisible = false;
                                this.objCodeLists();
                            }else{
                                this.$message({type:'warning',message:res.message});
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //目的码编辑
            objCodeEdit(val){
                this.$root.eventHub.$emit('dialog1Visible',{visible:true,objCodeIn:2});
                console.log(val);
                this.flowId = val.flowId;
                this.companyId = val.companyId;
                this.objCodeDetail(val);
            },
            // 目的码送审
            objCodeSubmit(acceptForm){
                this.$refs[acceptForm].validate((valid) => {
                    if (valid) {
                        let paramList=[];
                        this.objCodeList.map((item)=>{
                            let param={};
                            param.id=item.id;
                            param.destNumber=item.destNumber;
                            param.destnumproofpic=this.acceptForm.imageUrl;
                            param.destnumUsage=this.acceptForm.usage;
                            param.number400=this.acceptForm.fourNum;
                            param.companyid=this.acceptForm.firmId;
                            paramList.push(param);
                        });
                        this.$ajax.post('/vos/destnum/sendToDestNumberAudit',{
                            "destNumber":paramList,
                            "number400": this.acceptForm.fourNum,
                            "company":this.companyInfo,
                            "companyFlow":{
                                "flowId":""
                            }
                        }).then((res)=>{
                            console.log(res);
                            if(res.code==200){
                                this.dialogVisible = false;
                                this.objCodeLists();
                            }else{
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
	@import './400businessManage.scss';
</style>
