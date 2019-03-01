<template>
    <div id="stepTwo">
        <el-form ref="stepTwoForm" :model="stepTwoForm">
            <div>
                <div class="title left">
                    企业资料
                </div>
                <div class="block data">
                    <div>
                        <div style="float:left;">
                            <span class="grey fmini">企业资质证明文件：</span>
                        </div>
                        <ul class="abc">
                            <li class="8">
                                <el-upload class="avatar-uploader examplew"
                                           :action="$global.uploadUrl"
                                           accept=".png,.jpeg,.jpg"
                                           :show-file-list="false"
                                           :on-success="handleAvatarSuccess"
                                           :on-error="handleAvatarSuccess"
                                           :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.companyProofPic"
                                         :src="$global.serverSrc+stepTwoForm.companyProofPic"
                                         class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                            <li class="8 example">
                                <div style="float:left;">
                                    <span class="grey fmini">参考示例：</span>
                                </div>
                                <img class="examplew left" src="../../../assets/example_1.png" alt="">
                            </li>
                        </ul>
                        <div class="stepTwotips">
                            <p class="grey">◆ 请提供证件的原件照片或者彩色扫描件（正副本均可）,文字/盖章清晰可辨认，并说明材料优先级 参考样式</p>
                            <p class="grey">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
                        </div>
                    </div>
                </div>
                <div class="title left">
                    法人资料
                </div>
                <div class="block person_data">
                    <div>
                        <div style="float:left;">
                            <span class="grey fmini">法人身份证：</span>
                        </div>
                        <ul class="abc">
                            <li class="l2">
                                <ul class="abc">
                                    <li class="l2">
                                        <el-upload class="avatar-uploader exampleh"
                                                   :action="$global.uploadUrl"
                                                   :show-file-list="false"
                                                   accept=".png,.jpeg,.jpg"
                                                   :on-success="handleFrontSuccess"
                                                   :on-error="handleFrontSuccess"
                                                   :before-upload="beforeAvatarUpload">
                                            <img v-if="stepTwoForm.legalCardFrontPic"
                                                 :src="$global.serverSrc+stepTwoForm.legalCardFrontPic" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </li>
                                    <li class="l2">
                                        <el-upload class="avatar-uploader exampleh"
                                                   :action="$global.uploadUrl"
                                                   :show-file-list="false"
                                                   accept=".png,.jpeg,.jpg"
                                                   :on-success="handleContrarySuccess"
                                                   :on-error="handleContrarySuccess"
                                                   :before-upload="beforeAvatarUpload">
                                            <img v-if="stepTwoForm.legalCardBackPic"
                                                 :src="$global.serverSrc+stepTwoForm.legalCardBackPic"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </li>
                                </ul>
                                <ul class="abc">
                                    <li class="l2">
                                        <el-upload class="avatar-uploader exampleh"
                                                   :action="$global.uploadUrl"
                                                   :show-file-list="false"
                                                   accept=".png,.jpeg,.jpg"
                                                   :on-success="handleSelfSuccess"
                                                   :on-error="handleSelfSuccess"
                                                   :before-upload="beforeAvatarUpload">
                                            <img v-if="stepTwoForm.legalCardHandPic"
                                                 :src="$global.serverSrc+stepTwoForm.legalCardHandPic"
                                                 class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </li>
                                </ul>
                            </li>
                            <li class="l2">
                                <ul class="abc">
                                    <li class="l2 example">
                                        <img class="exampleh" src="../../../assets/example_2.png" alt="">
                                    </li>
                                    <li class="l2 example">
                                        <img class="exampleh" src="../../../assets/example_3.png" alt="">
                                    </li>
                                </ul>
                                <ul class="abc">
                                    <li class="l2 example">
                                        <img class="exampleh" src="../../../assets/example_4.png" alt="">
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="stepTwotips">
                            <p class="grey">◆ 请提供身份证的原件照片或者彩色扫描件文字清晰可辨认，如正反面复印件在一页上只需上传一张。</p>
                            <p class="grey">◆ 法人持身份证照片法人外貌必须和证件文字必须清晰可辨认</p>
                            <p class="grey">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
                        </div>

                    </div>
                </div>
            </div>

        </el-form>
        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(1)">上一步</el-button>
            <el-button type="primary" size="mini" @click="addBusinessSave()" v-if="saveBtnHidden">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="next(3)">下一步</el-button>
        </div>

    </div>
</template>
<script>
    import {mapState} from "vuex";

    export default {
        name: 'stepTwo',
        data() {
            return {
                stepTwoForm: {
                    companyProofPic: '',      //企业证明材料
                    legalCardFrontPic: '',    //正面照
                    legalCardBackPic: '',    //反面照
                    legalCardHandPic: '',     //本人手持证件照
                },
                campanyObj: {},        //企业信息对象
                flowId: '',
                saveBtnHidden: true,
                companySaveInfo: [],
            };
        },
        components: {},
        created() {
            // this.companySaveInfo = JSON.parse(sessionStorage.getItem("firmNameListItem"));
            // console.log("this.companySaveInfo",this.companySaveInfo);
            // console.log("businessIn",sessionStorage.getItem('businessIn'));
            this.$root.eventHub.$on('flowId', (resp) => {
                // console.log("flowId", resp);
                this.flowId = resp;
            });

            if (sessionStorage.getItem('businessIn') == 3) {
                this.saveBtnHidden = false;
                // console.log("saveBtnHidden",this.saveBtnHidden);
            }
            if (sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3 || sessionStorage.getItem('businessIn') == 4) {
                // console.log("11111111111111");
                this.stepThreeDetail();
            }
            this.$root.eventHub.$on('firmNameListItem', (resp) => {
                // console.log("firmNameListItem",resp);
                this.stepTwoForm = resp;
            });
        },
        methods: {
            // 详情
            stepThreeDetail() {
                console.log("this.company", this.company);
                this.stepTwoForm = this.company;
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                console.log(res);
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepTwoForm.companyProofPic = res;
                }
                // this.stepTwoForm.companyProofPic = URL.createObjectURL(file.raw);
            },
            handleFrontSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepTwoForm.legalCardFrontPic = res;
                }
                // this.stepTwoForm.legalCardFrontPic = URL.createObjectURL(file.raw);
            },
            handleContrarySuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepTwoForm.legalCardBackPic = res;
                }
                // this.stepTwoForm.legalCardBackPic = URL.createObjectURL(file.raw);
            },
            handleSelfSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepTwoForm.legalCardHandPic = res;
                }
                // this.stepTwoForm.legalCardHandPic = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            next(val) {
                if (val == 1) {
                    this.$emit('childNext', val);
                } else {
                    //必填校验
                    if(this.stepTwoForm.companyProofPic=='' || this.stepTwoForm.legalCardFrontPic=='' || this.stepTwoForm.legalCardBackPic=='' || this.stepTwoForm.legalCardHandPic==''){
                        this.$message.warning('请完善图片信息');
                    }else{
                    this.$emit('childNext', val);
                    // 改变vuex的值
                    if (val == 3) {
                        this.campanyObj = Object.assign(this.company, this.stepTwoForm);
                        console.log(this.campanyObj);
                        this.ChangeCompanyStatus(this.campanyObj);
                    }
                    }
                }
            },
            // 暂存按钮
            addBusinessSave() {
                this.campanyObj = Object.assign(this.company, this.stepTwoForm);
                console.log(this.campanyObj);
                this.ChangeCompanyStatus(this.campanyObj);
                this.$ajax.post('/vos/business/startAndSave', {
                    "company": this.campanyObj,
                    "business": this.business,
                    "destNumber": this.destNumber,
                    "number400ValueAdded": this.number400ValueAdded,
                    "number400Concession": this.number400Concession,
                    "companyFlow": {
                        "flowId": this.flowId
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.dialogVisible = false;
                        this.$message.success("保存成功");
                        this.$root.eventHub.$emit('addAcceptSave');
                    }
                });
            },
            // 存vuex更新企业信息模块入参
            ChangeCompanyStatus(val) {
                return this.$store.dispatch("ChangeCompanyStatus", val);
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
    @import './stepTwo.scss';
</style>
