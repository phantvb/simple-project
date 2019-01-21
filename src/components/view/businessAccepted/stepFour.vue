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
                        <el-button type="primary" size="mini">立刻下载PDF模板</el-button>
                        <span>说明：下载自动生成的标准协议、业务受理单、授权书、信息安全责任书PDF，并打彩色印盖章后上传</span>
                    </el-form-item>
                    <el-form-item label="以下为需要上传的资料" class="cutOffRule">
                        <div></div>
                    </el-form-item>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">统一的标准协议：</span>
                        </div>
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.unionAgreementPic" :src="stepFourForm.unionAgreementPic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">业务受理单：</span>
                        </div>
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handlebussinSuccess" :on-error="handlebussinSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.businessHandlePic" :src="stepFourForm.businessHandlePic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">办理授权书：</span>
                        </div>
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAuthorSuccess" :on-error="handleAuthorSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.authorizationPic" :src="stepFourForm.authorizationPic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div style="float:left;">
                            <span class="grey fmini titleWidth">信息安全责任书：</span>
                        </div>
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleSafeSuccess" :on-error="handleSafeSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.safeAgreementPic" :src="stepFourForm.safeAgreementPic" class="avatar">
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
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleDestNumSuccess" :on-error="handleDestNumSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepFourForm.destNumProfPic" :src="stepFourForm.destNumProfPic" class="avatar">
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
                        <ul>
                            <li class="8">
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleOtherSuccess" :on-error="handleOtherSuccess" :before-upload="beforeAvatarUpload">
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
            <el-button type="primary" size="mini" @click="addBusinessSave()">暂存信息</el-button>
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
                busMaterForm:{

                },
                stepFourForm:{
                    unionAgreementPic:'',
                    businessHandlePic:'',
                    authorizationPic:'',
                    safeAgreementPic:'',
                    destNumProfPic:'',
                    otherPic:'',
                },
                businessObj:{},  //业务参数对象
            };
        },
        components: {},
        methods: {
            // 图片上传
            handleAvatarSuccess(res, file) {
                this.stepFourForm.unionAgreementPic = URL.createObjectURL(file.raw);
            },
            handlebussinSuccess(res, file) {
                this.stepFourForm.businessHandlePic = URL.createObjectURL(file.raw);
            },
            handleAuthorSuccess(res, file) {
                this.stepFourForm.authorizationPic = URL.createObjectURL(file.raw);
            },
            handleSafeSuccess(res, file) {
                this.stepFourForm.safeAgreementPic = URL.createObjectURL(file.raw);
            },
            handleDestNumSuccess(res, file) {
                this.stepFourForm.destNumProfPic = URL.createObjectURL(file.raw);
            },
            handleOtherSuccess(res, file) {
                this.stepFourForm.otherPic = URL.createObjectURL(file.raw);
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
            next(val){
                this.$emit('childNext', val);
            },
            // 新增业务保存
            addBusinessSave(){
                this.dialogVisible = false;
                console.log("business:",this.business);
                this.businessObj = Object.assign(this.business,this.stepFourForm);
                this.ChangeBusinessStatus(this.businessObj);
                // 打印business入参对象
                console.log("businessObj:",this.businessObj);
                //打印compang入参对像
                console.log("company",this.company);
                console.log("destNumber",this.destNumber);
                console.log("number400ValueAdded",this.number400ValueAdded);
                console.log("number400Concession",this.number400Concession);
                this.$ajax.post('/vos/business/startAndSave', {
                    "company":this.company,
                    "business":this.businessObj,
                    "number400ValueAdded":this.number400ValueAdded,
                    "number400Concession":this.number400Concession,
                    "companyFlow":{
                        "flowId":""
                    }
                }).then((res)=>{
                    if(res.code=='200'){
                        console.log(res);
                    }else{

                    }

                })
                this.$root.eventHub.$emit('addAcceptSave');
            },
            // 新增业务送审
            addBusinessSend(){
                this.dialogVisible = false;
                console.log("business:",this.business);
                this.businessObj = Object.assign(this.business,this.stepFourForm);
                this.ChangeBusinessStatus(this.businessObj);
                // 打印business入参对象
                console.log("businessObj:",this.businessObj);
                //打印compang入参对像
                console.log("company",this.company);
                console.log("destNumber",this.destNumber);
                console.log("number400ValueAdded",this.number400ValueAdded);
                console.log("number400Concession",this.number400Concession);
                this.$ajax.post('/vos/business/startAndSave', {
                    "company":this.company,
                    "business":this.businessObj,
                    "number400ValueAdded":this.number400ValueAdded,
                    "number400Concession":this.number400Concession,
                    "companyFlow":{
                        "flowId":""
                    }
                }).then((res)=>{
                    console.log(res);
                });
                this.$root.eventHub.$emit('addAcceptSave',null);
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
