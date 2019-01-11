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
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
                                <el-upload class="avatar-uploader examplew" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepTwoForm.proveFile" :src="stepTwoForm.proveFile" class="avatar">
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
            <el-button type="primary" size="mini" @click="">送审</el-button>
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
                stepTwoForm:{
                    proveFile:'',
                    reference:'',
                    frontImageUrl:'',        //正面照
                    contraryImageUrl: '',    //反面照
                    selfImageUrl:'',         //本人手持证件照
                }
            };
        },
        components: {},
        methods: {
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
            next(val){
                this.$emit('childNext', val);
            },
            // 新增业务保存
            addBusinessSave(){
                this.dialogVisible = false;
                console.log(this.company);
                // this.$ajax.post('/vos/business/startAndSave', {
                //     "company":{
                //         "id":64,
                //         "companyCardType":"business_license",   //企业类型
                //         "companyName":"高通"                    //企业名字
                //     },
                //     "business":{
                //         "number400":"400142520651",
                //         "companyId":64,
                //         "needCompanySave":false,
                //         "tariffPackageId":1,
                //         "authorizationPic":"xxxaadff.png",
                //         "tariffName":"400商务热线300套餐",
                //         "type":1,
                //         "packageRules":"1200元套餐",
                //         "basicFunctionFee":0,
                //         "units":12,
                //         "amount":2,
                //         "bottomFee":1200,
                //         "durationPresentation":9000,
                //         "excessTariff":0,
                //         "packageContent":"套餐内免费通话95000分钟，超出部分按照0.1元/分钟收费",
                //         "channel":"channel"
                //
                //     },
                //     "number400ValueAdded":[{
                //         "number400":"100009",
                //         "valueAddedName":"来电显示1",
                //         "amount":2,
                //         "valueAddedId":1,
                //         "presents":1,
                //         "remarks":"查看详情",
                //         "valueAddedFee":10,
                //         "units":"元/月"
                //
                //     },{
                //         "number400":"100009",
                //         "valueAddedName":"彩铃制作",
                //         "amount":3,
                //         "valueAddedId":4,
                //         "presents":2,
                //         "remarks":"客户拨打400电话，听到一段语音”您好，欢迎致电话我公司，我们将竭诚为您服务，电话接通中，请稍后",
                //         "valueAddedFee":10,
                //         "units":"首"
                //
                //     }],
                //     "number400Concession":[{
                //         "number400":"100009",
                //         "concessionName":"套餐价格优惠222",
                //         "concessionWay":2,
                //         "packageDeals":100,
                //         "availableTime":1000,
                //         "channel":"channel",
                //         "amount":1,
                //         "units":"year"
                //
                //     }
                //     ],
                //     "companyFlow":{
                //         "flowId":""
                //     }
                // }).then((res)=>{
                //
                // })
            }
        },
        computed: {
            ...mapState({
                company: state => state.createActivities.company,
                business: state => state.createActivities.business,
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
