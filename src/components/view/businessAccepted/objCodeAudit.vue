<template>
  <div id="objCodeAudit">
    <!--搜索-->
    <div class="handlingForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="objCodeSearch">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker
                    size="mini"
                    v-model="form.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="searchBtn">
            <el-button type="primary" size="mini" @click="objCodeLists()">搜索</el-button>
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
          <el-button type="primary" size="mini" @click="addObjCodeBtn()">+新增目的码</el-button>
        </div>
        <div class="accountSelect">
          <span style="font-size:12px">状态:</span>
          <el-select v-model="accountStatus" placeholder="请选择" size="mini" @change="statusChange">
            <el-option
                    v-for="item in statusOptions"
                    :key="item.dicKey"
                    :label="item.dicValue"
                    :value="item.dicKey">
            </el-option>
          </el-select>
          <el-button type="primary" plain size="mini">导出</el-button>
        </div>
      </div>

      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                prop="business.companyName"
                label="企业名称"
                width="200">
        </el-table-column>

        <el-table-column
                prop="business.number400"
                label="400电话">
        </el-table-column>

        <el-table-column
                prop="assignee"
                label="受理人">
        </el-table-column>

        <el-table-column
                prop="createTime"
                label="创建时间">
        </el-table-column>

        <el-table-column
                prop="status"
                label="状态">
        </el-table-column>

        <el-table-column
                prop="operation"
                label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="details(scope.row),$router.push('/objCodeDetail/')">详情</el-button>
            <!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
            <el-button size="mini" type="text">撤回</el-button>
            <el-button size="mini" type="text">变更</el-button>
            <el-button size="mini" type="text">注销</el-button>
            <el-button size="mini" type="text">通过审核</el-button>
            <el-button size="mini" type="text">驳回</el-button>
            <el-button size="mini" type="text" @click="objCodeEdit(scope.row)">编辑</el-button>
            <!--</router-link>-->
            <el-button size="mini" type="text">送审</el-button>
            <el-button size="mini" type="text">删除</el-button>
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
    import Dialog1 from './dialog1';
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
                    // companyName: "",
                    // companyCardType: "",
                    // companyCardNo: "",
                    // companyCharacter: "",
                    // companyRank: "",
                    // industryType: "",
                    // registProvince: "",
                    // registProvinceId: null,
                    // registCity: null,
                    // registCityId: null,
                    // registArea: null,
                    // registaAreaId: null,
                    // registAddress: null,
                    // officeCity: "",
                    // officeCityId: "",
                    // officeProvince: null,
                    // officeProvinceId: null,
                    // officeArea: null,
                    // officeAreaId: null,
                    // officeAddress: null,
                    // phone: "",
                    // legalPerson: "",
                    // legalPhone: null,
                    // legalCard: null,
                    // cardNum: "",
                    // idCardAddress: null,
                    // cardStartDate: null,
                    // cardEndDate: null,
                    // companyProofPic: "",
                    // legalCardFrontPic: "",
                    // legalCardBackPic: null,
                    // legalCardHandPic: null,
                    // usable: "",
                    // source: ""
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
            };
        },
        components: {
            Dialog1
        },
        created(){
            this.objCodeLists();
            this.statusList();
            this.$root.eventHub.$on('getLoginInfo', (resp)=>{
                this.addTariff(resp);
            } )
        },
        methods: {
            // 分页
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
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
            // 图片上传
            handleAvatarSuccess(res, file) {
                this.acceptForm.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
            details(scope){
                console.log(scope);
            },
            // 目的码列表
            objCodeLists(){
                // console.log(this.form.time[0]);
                // console.log(this.form.time[1]);
                let dateStart = new Date(this.form.time[0]);
                let dateEnd = new Date(this.form.time[1]);
                let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate();
                let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate();
                // console.log(dateStart_value);
                // console.log(dateEnd_value);
                this.$ajax.post('/vos/business/getBusinessFlowList',{
                    "type":"Destnum",
                    "dateStart":this.form.time[0]==undefined?'':dateStart_value,
                    "dateEnd":this.form.time[1]==undefined?'':dateEnd_value,
                    "companyName":this.form.firmName,
                    "status":this.accountStatus,
                    "number400":this.acceptForm.fourNum,
                    "page":{
                        "pageNo":this.pageObj.page,
                        "pageSize":this.pageObj.pageSize,
                    }
                }).then((res)=>{
                    console.log(res.data.businessFlows);
                    this.tableData = res.data.businessFlows;
                    this.tableData.map((item)=>{
                        if(item.status=='Wait_To_Audit'){
                            item.status='等待送审'
                        }else if(item.status=='Audit_Success'){
                            item.status='审核通过'
                        }else if(item.status=='DestNum_Auditing'){
                            item.status='审核中'
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
                            param.destnumber=item.destnumber;
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
                                if(item.destnumber==''){
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
            // 目的码详情
            objCodeDetail(data){
                this.$ajax.post('/vos/destnum/getDetail',{
                    "companyFlow":{
                        "flowId": data.flowId,
                        "companyId":data.companyId,
                    },
                }).then((res)=>{
                    if(res.code==200){
                        console.log(res.data);
                        console.log(res.data.destNumber);
                        console.log(res.data.company);
                        this.acceptForm.firmName = res.data.company.companyName;
                        this.acceptForm.imageUrl = res.data.company.companyProofPic;
                        this.acceptForm.fourNum = res.data.number400;
                        res.data.destNumber.map((item)=>{
                            this.acceptForm.firmName = item.companyName;
                            this.acceptForm.imageUrl = item.companyProofPic;
                            this.acceptForm.fourNum = item.number400;
                            this.acceptForm.usage = item.destnumUsage;
                        })

                    }
                })
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
                            param.destnumber=item.destnumber;
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
