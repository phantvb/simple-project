<template>
    <!--新增/编辑目的码弹窗-->
    <div class="objCodeDialog">
        <el-dialog
                :title="objCodeIn==1?'新增目的码':'编辑目的码'"
                :visible.sync="visible"
                width="80%"
                :before-close="handleClose">
            <div>
                <el-form ref="acceptForm" :rules="rules" :model="acceptForm" label-width="140px">
                    <div class="objCodeMsg">

                        <el-form-item label="400号码：" class="firmName" prop="fourNum">
                            <el-input
                                    v-model="acceptForm.fourNum"
                                    size="mini"
                                    placeholder=" 请搜索400号码" @input="searchFourNum"></el-input>
                            <div id="fourNumList" v-if="numShow">
                                <ul>
                                    <li v-for="(item,index) in fourNumList" :key="index" @click="num400li(item)">{{item.number400+"("+item.companyName+")"}}</li>
                                </ul>
                            </div>
                        </el-form-item>

                        <el-form-item label="企业名称：" class="firmName" id="firmName" prop="firmName">
                            <el-input
                                    v-model="acceptForm.firmName"
                                    :disabled="msgDisabled"
                                    size="mini"
                                    @input="searchFirm"
                                    placeholder=" 营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称">
                            </el-input>
                            <div id="firmNameList" v-if="firmNameShow">
                                <ul>
                                    <li v-for="(item,index) in firmNameList" :key="index" @click="firmNameLi(item)">{{item.companyName}}</li>
                                </ul>
                            </div>
                        </el-form-item>

                        <el-form-item label="使用用途：" class="identity" prop="usage">
                            <el-select v-model="acceptForm.usage" placeholder="请选择" size="mini">
                                <el-option :label="item.dicValue" :value="item.dicKey" v-for="(item,index) in usage" :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="目的码证明材料：" class="materials" prop="imageUrl">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="$global.uploadUrl"
                                    accept=".png,.jpeg,.jpg"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="acceptForm.imageUrl" :src="acceptForm.imageUrl" class="avatar" style="width: 120px;height: auto;">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <div class="uploadTips"><p>说明：目的码证明材料可以是缴费材料，也可以是自助平台相关截图</p></div>
                        </el-form-item>

                        <el-form-item label="目的码：">
                            <div>
                                <div class="objCodeBox">
                                    <el-button type="primary" size="mini" @click="addObjCodes()">+新增目的码</el-button>
                                    <div v-for="(item,index) in objCodeList" :key="index">
                                        <div class="addObjCode">
                                            <el-input v-model="item.destNumber" size="mini"></el-input>
                                            <el-button type="primary" icon="el-icon-minus" size="mini" @click="delObjCodes(index)"></el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="增值资费：">
                            <div>
                                <div class="objCodeBox">
                                    <span>增加目的码</span>
                                    <div class="valAddSer">
                                        <p>功能资费：{{tariffFee+'元'}}</p>
                                        <p>是否赠送：{{presents}}</p>
                                        <p>功能备注：{{remarks}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="objCodeSave('acceptForm')">暂存信息</el-button>
            <el-button type="primary" @click="objCodeSubmit('acceptForm')" size="mini">送 审</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    export default {
        name: 'dialog1',
        data() {
            return {
                visible:false,
                objCodeIn:1,
                firmNameShow:false,
                numShow:false,
                form:{
                    firmName:'',
                    time:'',
                },
                acceptForm:{
                    firmName:'',
                    usage:'',
                    imageUrl: '',    //上传图片
                    fourNum:'',
                    desc:'',
                    objCount:1,     //目的码数量
                    delObjCode:'',  //删减目的码
                },
                companyInfo:{},  //企业信息


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
                usage:[],
                objCodeList:[], //目的码数组
                firmNameList:[],  //公司名称数组
                fourNumList:[],   //400号码列表
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
                tariffFee:'', //功能资费
                presents:'',  //是否赠送;1 赠送；2 付费
                remarks:'',  //功能描述
                objFlowId:'',
                entireFlowId:'',
                objEntrance:'',
                companyId:'',
                busIdentity:'',  //登录信息channel
            };
        },
        created(){
            console.log(sessionStorage.getItem('businessType'));
            console.log(sessionStorage.getItem('objFlowId'));
            console.log(sessionStorage.getItem('objCodeIn'));
            // this.objFlowId = sessionStorage.getItem('objFlowId');

            this.busIdentity = sessionStorage.getItem('businessType');
            this.usageList();
            this.$root.eventHub.$on('dialog1Visible', (res)=>{
                console.log(res);
                this.visible=res.visible;
                if(res.objCodeIn){
                    this.objCodeIn=res.objCodeIn;
                    if(this.objCodeIn==1){
                        this.acceptForm.firmName='';
                        this.acceptForm.usage='';
                        this.acceptForm.imageUrl='';
                        this.acceptForm.fourNum='';
                        this.objCodeList=[];
                    }else if(res.objCodeIn==2){
                        this.entireFlowId = sessionStorage.getItem('entireFlowId');
                        this.objFlowId = this.entireFlowId;
                        console.log("this.objFlowId",this.objFlowId);
                        this.objCodeDetail();
                    }else if(res.objCodeIn==5){
                        this.objFlowId =  sessionStorage.getItem('objFlowId');
                        console.log("this.objFlowId",this.objFlowId);
                        this.objCodeDetail();
                    }
                }

            });
            this.addTariff(this.busIdentity);

        },
        components: {},
        methods: {
            //弹窗关闭按钮
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            // 使用用途列表
            usageList(){
                this.$ajax.post('/vos/dic/getDicsByType',{
                    "dicType":"usage",
                    "status":1
                }).then((res)=>{
                    console.log(res);
                    this.usage = res.data.dicList;
                })
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                console.log(res);
                console.log(this.$global.serverSrc + res);
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.acceptForm.imageUrl = this.$global.serverSrc + res;
                }
                // this.acceptForm.imageUrl = URL.createObjectURL(file.raw);
                console.log("file.raw", file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG、PNG格式!');
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
                // if(this.objCodeList.length<3){
                //
                // }else{
                //     this.$message({
                //         message: '目的码最多添加3条',
                //         type: 'warning'
                //     });
                // }
            },
            // 删除目的码
            delObjCodes(index){
                console.log(index);
                this.objCodeList.splice(index,1);
            },
            // 企业模糊搜索
            searchFirm(val){
                console.log(val);
                this.$ajax.get('/vos/company/fuzzySearch?company='+this.acceptForm.firmName).then((res)=>{
                    console.log(res.data);
                    this.firmNameList = res.data;
                    if(this.acceptForm.firmName!='' && this.firmNameList.length!=0){
                        this.firmNameShow = true;
                    }
                })
            },
            //400号码搜索
            searchFourNum(){
                this.$ajax.post('/vos/num400config/search',{
                    "page":{
                        "pageNo":"1",
                        "pageSize":"50"
                    },
                    "number400":{
                        "number400":this.acceptForm.fourNum,
                    }
                }).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.number400s);
                    this.fourNumList = res.data.number400s;
                    if(this.acceptForm.fourNum!='' && this.fourNumList.length!=0){
                        this.numShow = true;
                    }
                    this.fourNumList.map((item)=>{
                        if(item.companyName==this.acceptForm.firmName){
                            this.changeMsgDisabled(true);
                        }else{
                            this.changeMsgDisabled(false);
                        }
                        if(this.acceptForm.fourNum==item.number400){
                            this.searchObjCode();
                        }
                    })
                })
            },
            //企业名称li
            firmNameLi(val){
                console.log(val);
                this.acceptForm.firmName = val.companyName;
                this.companyInfo = val;
                this.firmNameShow = false;
            },
            //400号码li
            num400li(val){
                console.log(val);
                this.numShow = false;
                this.acceptForm.fourNum = val.number400;
                this.acceptForm.firmName = val.companyName;
                this.changeMsgDisabled(true);
                this.companyId = val.companyId;
                if(this.acceptForm.fourNum!=''){
                    this.searchObjCode();
                }
            },
            //目的码
            searchObjCode(){
                this.$ajax.get('/vos/destnum/getDestNumbersToModify?number400='+this.acceptForm.fourNum).then((res)=>{
                    if(res.data.destNumber.length!=0){
                        console.log(res.data.destNumber);
                        this.objCodeList = res.data.destNumber;
                        this.acceptForm.imageUrl =  res.data.destNumber[0].destnumProofPic;
                        this.acceptForm.usage =  res.data.destNumber[0].destnumUsage;
                    }
                    console.log("objCodeList",this.objCodeList);
                })
            },
            // 增值资费
            addTariff(val){
                console.log(val);
                let businessType = val;
                if(businessType=='self'){
                    businessType = 30;
                }else if(businessType=='channel'){
                    businessType = 31;
                }
                console.log(businessType);
                this.$ajax.get('/vos/blacklist/getValueAdded/'+businessType).then((res)=>{
                    console.log(res);
                    if(res.data!=null){
                        this.tariffFee = res.data.tariffFee;
                        this.presents = res.data.presents;
                        if(this.presents=='1'){
                            this.presents = '赠送';
                        }else{
                            this.presents = '付费';
                        }
                        this.remarks = res.data.remarks;
                    }
                })
            },

            // 目的码暂存
            objCodeSave(){
                console.log(" this.companyId",this.companyId);
                var companyInfo = {};
                companyInfo.companyName = this.acceptForm.firmName;
                companyInfo.id = this.companyId;
                let paramList=[];
                this.objCodeList.map((item)=>{
                    let param={};
                    param.id=item.id;
                    param.destNumber=item.destNumber;
                    param.destnumproofpic=this.acceptForm.imageUrl;
                    param.destnumUsage=this.acceptForm.usage;
                    param.number400=this.acceptForm.fourNum;
                    param.companyid=this.companyId;
                    paramList.push(param);
                });
                this.searchObjCode();
                this.$ajax.post('/vos/destnum/startAndSave',{
                    "destNumber":paramList,
                    "number400": this.acceptForm.fourNum,
                    "company":companyInfo,
                    "companyFlow":{
                        "flowId":(this.objCodeIn=='2'||this.objCodeIn=='5')?this.objFlowId:'',
                    }
                }).then((res)=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message.success("保存成功");
                        this.visible = false;
                        this.$root.eventHub.$emit('addAcceptSave', null);
                    }else{
                        this.$message({type:'warning',message:res.message});
                    }
                })

            },

            // 目的码送审
            objCodeSubmit(formName){
                let companyInfo = {};
                let returnBoolean = false;
                companyInfo.companyName = this.acceptForm.firmName;
                companyInfo.id = this.companyId;

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.objCodeList.length==0){
                            this.$message.warning("请添加目的码");
                            return
                        }else{
                            this.objCodeList.map((item)=>{
                                if(!item.destNumber){
                                    returnBoolean = true;
                                }
                            });
                            if(returnBoolean){
                                this.$message.warning("请填写空白目的码");
                                return
                            }
                        }
                        let paramList=[];
                        this.objCodeList.map((item)=>{
                            let param={};
                            param.id=item.id;
                            param.destNumber=item.destNumber;
                            param.destnumproofpic=this.acceptForm.imageUrl;
                            param.destnumUsage=this.acceptForm.usage;
                            param.number400=this.acceptForm.fourNum;
                            param.companyid=this.companyId;
                            paramList.push(param);
                        });
                        this.$ajax.post('/vos/destnum/sendToDestNumberAudit',{
                            "destNumber":paramList,
                            "number400": this.acceptForm.fourNum,
                            "company":companyInfo,
                            "companyFlow":{
                                "flowId":this.objCodeIn=='2'?this.objFlowId:'',
                            }
                        }).then((res)=>{
                            console.log(res);
                            if(res.code==200){
                                this.visible = false;
                                this.$root.eventHub.$emit('addAcceptSave', null);
                            }else{
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 目的码详情
            objCodeDetail(){
                console.log("目的码详情");
                console.log("目的码flowId");
                console.log(this.entireFlowId);
                console.log(this.objFlowId);
                this.$ajax.get('/vos/destnum/getCacheData?flowId='+this.objFlowId).then((res)=>{
                    if(res.code==200){
                        console.log(res);
                        console.log(res.data.destNumber);
                        console.log(res.data.company);
                        console.log(res.data.company.companyName);
                        this.objCodeList = res.data.destNumber;
                        this.acceptForm.firmName = res.data.company.companyName;
                        this.companyId = res.data.company.id;
                        // this.acceptForm.imageUrl = res.data.company.companyProofPic;
                        this.acceptForm.fourNum = res.data.number400;
                        res.data.destNumber.map((item)=>{
                            this.acceptForm.imageUrl = item.destnumproofpic;
                            this.acceptForm.fourNum = item.number400;
                            this.acceptForm.usage = item.destnumUsage;
                        })


                    }
                })
            },
            changeMsgDisabled(val) {
                return this.$store.dispatch("changeMsgDisabledStatus", val);
            },
        },
        computed: {
            ...mapState({
                msgDisabled: state => state.createActivities.msgDisabled,
            })
        }
    }
</script>
<style>
    /*图片上传--start*/
    .avatar-uploader{
        text-align: left;
        width:140px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        width:128px;
        font-size: 28px;
        color: #8c939d;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    /*图片上传--end*/
</style>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
