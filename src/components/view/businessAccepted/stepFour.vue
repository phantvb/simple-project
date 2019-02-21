<template>
    <div id="stepFour">
        <div id="base">
            <section>
                <div class="detailMsg">
                    <p>
                        业务材料
                    </p>
                </div>
                <el-form ref="busMaterForm" :model="busMaterForm" label-width="200px" class="busMaterForm">
                    <el-form-item label="标准协议编号：">
                        <span>ZJ93681212</span>
                    </el-form-item>
                    <el-form-item label="全套业务单据PDF模板下载：" class="model">
                        <el-button type="primary" size="mini" @click="uploadPdf()">立刻下载PDF模板</el-button>
                        <span>说明：下载自动生成的标准协议、业务受理单、授权书、信息安全责任书PDF，并打彩色印盖章后上传</span>
                    </el-form-item>
                    <el-form-item label="以下为需要上传的资料" class="cutOffRule">
                        <div></div>
                    </el-form-item>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">统一的标准协议：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew"
                                           :action="$global.uploadUrl"
                                           :show-file-list="false"
                                           :on-success="handleAvatarSuccess"
                                           :on-error="handleAvatarSuccess"
                                           :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.unionAgreementPic" :src="stepFourForm.unionAgreementPic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">业务受理单：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" :action="$global.uploadUrl"
                                           :show-file-list="false" :on-success="handlebussinSuccess"
                                           :on-error="handlebussinSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.businessHandlePic" :src="stepFourForm.businessHandlePic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">办理授权书：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" :action="$global.uploadUrl"
                                           :show-file-list="false" :on-success="handleAuthorSuccess"
                                           :on-error="handleAuthorSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.authorizationPic" :src="stepFourForm.authorizationPic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">信息安全责任书：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" :action="$global.uploadUrl"
                                           :show-file-list="false" :on-success="handleSafeSuccess"
                                           :on-error="handleSafeSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.safeAgreementPic" :src="stepFourForm.safeAgreementPic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="explain">说明：合同业务单据渠道由地市下载PDF打印盖章后上传。自助受理用户下载PDF并盖章后寄往信产，由工作人员盖章上传</div>
                            </li>

                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">目的码证明材料：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" :action="$global.uploadUrl"
                                           :show-file-list="false" :on-success="handleDestNumSuccess"
                                           :on-error="handleDestNumSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.destNumProfPic" :src="stepFourForm.destNumProfPic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="explain">说明：目的码证明材料可以是缴费材料，也可以是自助平台相关截图</div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">其他文件(非必传）：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" :action="$global.uploadUrl"
                                           :show-file-list="false" :on-success="handleOtherSuccess"
                                           :on-error="handleOtherSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.otherPic" :src="stepFourForm.otherPic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class="explain">说明：如有其它相关文件可以在此上传</div>
                            </li>
                        </ul>
                    </div>
                </el-form>
            </section>
        </div>
        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(3)">上一步</el-button>
            <el-button type="primary" size="mini" @click="addBusinessSave()" v-if="saveBtnHidden">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="addBusinessSend()">送审</el-button>
        </div>
    </div>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        name: 'stepFour',
        data() {
            return {
                busMaterForm: {},
                stepFourForm: {
                    unionAgreementPic: '',
                    businessHandlePic: '',
                    authorizationPic: '',
                    safeAgreementPic: '',
                    destNumProfPic: '',
                    otherPic: '',
                    flowId: ''
                },
                businessObj: {},  //业务参数对象
                flowId: '',
                businessIn:'',
                saveBtnHidden:true,
                storageConpanyFlow:{},
            };
        },
        components: {},
        created() {
            console.log(sessionStorage.getItem('businessIn'));
            this.storageConpanyFlow = JSON.parse(sessionStorage.getItem('objMsg'));
            console.log("storageConpanyFlow",this.storageConpanyFlow);
            this.businessIn = sessionStorage.getItem('businessIn');
            //新增受理
            if (sessionStorage.getItem('businessIn') == 1) {
                this.$root.eventHub.$on('flowId', (resp) => {
                    console.log("flowId", resp);
                    this.flowId = resp.flowId;
                });
            }else if(sessionStorage.getItem('businessIn') == 3){
                this.saveBtnHidden=false;
                this.flowId = sessionStorage.getItem('entireFlowId');
                console.log("saveBtnHidden",this.saveBtnHidden);
            }

            if(sessionStorage.getItem('entireFlowId')){
                console.log("entireFlowId", sessionStorage.getItem('entireFlowId'));
                this.flowId = sessionStorage.getItem('entireFlowId');
                if (this.businessIn==2) {
                    console.log("flowId", '123123123123123213');
                    this.stepFourForm = this.business;
                }
            }
            this.$root.eventHub.$on('dialogVisibleBusiness', (res)=>{
                this.visibleBusiness=res.visibleBusiness;
                if(res.businessIn){
                    this.businessIn = res.businessIn;
                }
            } );


            //详情
            if (sessionStorage.getItem('businessIn') == 2) {
                console.log(this.business);
                this.stepFourForm = this.business;
            }
            if(sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3 || sessionStorage.getItem('businessIn') == 4){
                this.stepFourDetail();
            }
        },
        methods: {
            // 详情
            stepFourDetail() {
                console.log("this.company",this.company);
                this.stepFourForm = this.business;
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                console.log(res);
                console.log(this.$global.serverSrc + res);
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.unionAgreementPic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.unionAgreementPic = URL.createObjectURL(file.raw);
                console.log("file.raw", file.raw);
            },
            handlebussinSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.businessHandlePic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.businessHandlePic = URL.createObjectURL(file.raw);
            },
            handleAuthorSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.authorizationPic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.authorizationPic = URL.createObjectURL(file.raw);
            },

            handleSafeSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.safeAgreementPic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.safeAgreementPic = URL.createObjectURL(file.raw);
            },
            handleDestNumSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.destNumProfPic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.destNumProfPic = URL.createObjectURL(file.raw);
            },
            handleOtherSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepFourForm.otherPic = this.$global.serverSrc + res;
                }
                // this.stepFourForm.otherPic = URL.createObjectURL(file.raw);
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
            next(val) {
                this.$emit('childNext', val);
            },
            // 新增业务保存/变更保存
            addBusinessSave() {
                console.log("business:", this.business);
                this.businessObj = Object.assign(this.business, this.stepFourForm);
                this.ChangeBusinessStatus(this.businessObj);
                // 打印business入参对象
                console.log("businessObj:", this.businessObj);
                //打印compang入参对像
                console.log("company", this.company);
                console.log("destNumber", this.destNumber);
                console.log("number400ValueAdded", this.number400ValueAdded);
                console.log("number400Concession", this.number400Concession);
                var url;
                if(this.businessIn==1 || this.businessIn==2){       //新增和编辑的暂存
                      url='/vos/business/startAndSave';
                }
                this.$ajax.post(url, {
                    "company": this.company,
                    "business": this.businessObj,
                    "destNumber": this.destNumber,
                    "number400ValueAdded": this.number400ValueAdded,
                    "number400Concession": this.number400Concession,
                    "companyFlow":{"flowId": this.flowId}
                }).then((res) => {
                    if (res.code == '200') {
                        console.log(res);
                        this.dialogVisible = false;
                        this.$root.eventHub.$emit('addAcceptSave');
                    } else {
                        this.$message.warning(res.message);
                    }
                });
            },
            //业务送审
            addBusinessSend() {
                // 必填校验
                if(this.stepFourForm.unionAgreementPic=='' ||
                    this.stepFourForm.businessHandlePic=='' ||
                    this.stepFourForm.authorizationPic=='' ||
                    this.stepFourForm.safeAgreementPic=='' ||
                    this.stepFourForm.destNumProfPic=='' ||
                    this.stepFourForm.otherPic==''){
                    this.$message.warning("请完善图片信息");
                }else{
                    console.log('没验证');
                    this.dialogVisible = false;
                    console.log("business:", this.business);
                    this.businessObj = Object.assign(this.business, this.stepFourForm);
                    this.ChangeBusinessStatus(this.businessObj);
                    // 打印business入参对象
                    console.log("businessObj:", this.businessObj);
                    //打印compang入参对像
                    console.log("company", this.company);
                    console.log("destNumber", this.destNumber);
                    console.log("number400ValueAdded", this.number400ValueAdded);
                    console.log("number400Concession", this.number400Concession);
                    console.log("businessIn", this.businessIn);
                    var url;
                    if(this.businessIn==1 || this.businessIn==2){
                        url = '/vos/business/sendToBusinessAudit';
                    }else if(this.businessIn==3){
                        url = '/vos/business/sendToModifyAudit';
                    }
                    this.$ajax.post(url, {
                        "company": this.company,
                        "business": this.businessObj,
                        "destNumber": this.destNumber,
                        "number400ValueAdded": this.number400ValueAdded,
                        "number400Concession": this.number400Concession,
                        "companyFlow": url='/vos/business/sendToModifyAudit'?this.storageConpanyFlow: {"flowId": this.flowId}
                    }).then((res) => {
                        console.log(res);
                        this.$message.success(res.data);
                        this.$root.eventHub.$emit('addAcceptSave', null);
                    });
                }

            },
            // 下载pdf
            uploadPdf(){
                // this.dialogVisible = false;
                // console.log("business:", this.business);
                this.businessObj = Object.assign(this.business, this.stepFourForm);
                this.ChangeBusinessStatus(this.businessObj);
                // 打印business入参对象
                // console.log("businessObj:", this.businessObj);
                //打印compang入参对像
                // console.log("company", this.company);
                // console.log("destNumber", this.destNumber);
                // console.log("number400ValueAdded", this.number400ValueAdded);
                // console.log("number400Concession", this.number400Concession);
                // console.log("businessIn", this.businessIn);
                this.$ajax.post('/vos/PdfOption/createAndDownloadPDF', {
                    "company": this.company,
                    "business": this.businessObj,
                    "destNumber": this.destNumber,
                    "number400ValueAdded": this.number400ValueAdded,
                    "number400Concession": this.number400Concession,
                    "companyFlow": {
                        "flowId": this.flowId
                    }
                }).then((res) => {
                    console.log(res);
                    this.$message.success(res.data);
                    // this.$root.eventHub.$emit('addAcceptSave', null);
                });
            },
            // 存vuex更新企业信息模块入参
            ChangeBusinessStatus(val) {
                return this.$store.dispatch("ChangeBusinessStatus", val);
            },
        },
        computed: {
            ...mapState({
                company: state => state.createActivities.company,
                business: state => state.createActivities.business,
                destNumber: state => state.createActivities.destNumber,
                number400ValueAdded: state => state.createActivities.number400ValueAdded,
                number400Concession: state => state.createActivities.number400Concession,
            })
        },
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #ecf5ff;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .examplew .avatar-uploader-icon {
        width: 120px;
        height: 148px;
        line-height: 148px;
    }

    .examplew .avatar {
        width: 120px;
        height: 148px;
    }

    .exampleh .avatar-uploader-icon {
        width: 148px;
        height: 120px;
        line-height: 120px;
    }

    .exampleh .avatar {
        width: 148px;
        height: 120px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
    }

    .avatar {
        display: block;
    }
</style>
<style lang="scss" scoped>
    @import './400businessManage.scss';
    @import './stepTwo.scss';
</style>
